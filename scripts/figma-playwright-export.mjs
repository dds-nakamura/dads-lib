#!/usr/bin/env node
// Figma のファイルをブラウザ操作 (Playwright) で開き、各ページの top-level frame を
// PNG として一括エクスポートする。REST API を使わないので rate limit に当たらない。
//
// 前提: 事前に `pnpm figma:login` を 1 回実行して scripts/.figma-auth.json を作成済み。
//
// 環境変数:
//   FIGMA_FILE_KEY        対象ファイルの key (URL の /design/<key>/ の部分)
//   OUT_DIR               出力先 (default: dads-document-figma)
//   FIGMA_AUTH_PATH       認証状態 (default: scripts/.figma-auth.json)
//   HEADLESS              '0' でヘッドフル起動 (default: '1')
//   PAGE_FILTER           対象ページ名の正規表現 (default: 全件)
//   SLOWMO_MS             各操作後の待機ms (bot 検知抑制) default: 250
//   SCALE                 1|2|3|4 default: 2 (export モードのみ)
//   MAX_PAGES             テスト用: 何ページ目まで処理するか (default: 全件)
//   EXPORT_MODE           'screenshot' (default, canvas 領域を viewport キャプチャ)
//                         'figma-export' (Figma の Export ダイアログを操作)
//   DEBUG                 '1' で各操作後にスクショを残す

import { mkdir, stat, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { chromium } from 'playwright'

const FILE_KEY = process.env.FIGMA_FILE_KEY
const OUT_DIR = process.env.OUT_DIR ?? 'dads-document-figma'
const AUTH_PATH = process.env.FIGMA_AUTH_PATH ?? 'scripts/.figma-auth.json'
const HEADLESS = process.env.HEADLESS !== '0'
const PAGE_FILTER = process.env.PAGE_FILTER ? new RegExp(process.env.PAGE_FILTER, 'i') : null
const SLOWMO_MS = Number(process.env.SLOWMO_MS ?? 250)
const SCALE = Number(process.env.SCALE ?? 2)
const MAX_PAGES = process.env.MAX_PAGES ? Number(process.env.MAX_PAGES) : Infinity
const EXPORT_MODE = process.env.EXPORT_MODE ?? 'screenshot' // 'screenshot' | 'figma-export'
const DEBUG = process.env.DEBUG === '1'

if (!FILE_KEY) {
  console.error('FIGMA_FILE_KEY が未設定です。.env を確認してください。')
  process.exit(1)
}

async function exists(p) {
  try {
    await stat(p)
    return true
  } catch {
    return false
  }
}

if (!(await exists(AUTH_PATH))) {
  console.error(`認証ファイルがありません: ${AUTH_PATH}`)
  console.error(`先に \`pnpm figma:login\` を実行してください。`)
  process.exit(1)
}

const sanitize = (s) =>
  s
    .replace(/[\/\\:*?"<>|\s]+/g, '_')
    .replace(/_+/g, '_')
    .trim()

// Figma が表示する勧誘モーダル / 通知トースト等を閉じる。
// なければ静かに何もしない。
async function dismissBlockingOverlays(page) {
  const closeSelectors = [
    // 一般的な「閉じる」ボタン (英語 / 日本語 / aria-label)
    'button[aria-label="Close"]',
    'button[aria-label="閉じる"]',
    'button[aria-label="後で"]',
    'button[aria-label="Not now"]',
    'button[aria-label="No thanks"]',
    'button[aria-label="Dismiss"]',
    // Figma のアップグレード勧誘モーダル
    '[role="dialog"] button:has-text("後で")',
    '[role="dialog"] button:has-text("閉じる")',
    '[role="dialog"] button:has-text("Maybe later")',
    '[role="dialog"] button:has-text("Not now")',
    // 通知 X アイコン
    '[role="alert"] button[aria-label*="close" i]',
  ]
  for (const sel of closeSelectors) {
    const loc = page.locator(sel)
    const count = await loc.count().catch(() => 0)
    if (count > 0) {
      try {
        await loc.first().click({ timeout: 1_500 })
        await page.waitForTimeout(300)
      } catch {
        /* クリック失敗は無視 */
      }
    }
  }
  // 最後に Escape を 1 回入れて漂うポップオーバーを閉じる
  await page.keyboard.press('Escape').catch(() => {})
  await page.waitForTimeout(200)
}

await mkdir(OUT_DIR, { recursive: true })

console.log(`Launching browser (headless=${HEADLESS})...`)
const browser = await chromium.launch({ headless: HEADLESS, slowMo: SLOWMO_MS })
const ctx = await browser.newContext({
  storageState: AUTH_PATH,
  viewport: { width: 1600, height: 1000 },
  acceptDownloads: true,
})
const page = await ctx.newPage()

const fileUrl = `https://www.figma.com/design/${FILE_KEY}/`
console.log(`Opening file: ${fileUrl}`)
await page.goto(fileUrl, { waitUntil: 'domcontentloaded' })

// Canvas が描画されるまで待つ (Figma のロードはやや遅い)
console.log('Waiting for editor canvas...')
await page.waitForSelector('canvas', { timeout: 90_000 })
// 追加で少し待ってサイドバー描画も完了させる
await page.waitForTimeout(3_000)

console.log('Locating pages panel...')

// --- ページ一覧の取得 -------------------------------------------------------
// Figma の DOM はバージョンで変わるため、複数の候補を順に試す。
async function listPages() {
  // 1) 厳密な aria/data-testid ベース (英語 / 日本語両対応)
  const ariaCandidates = [
    '[data-testid="pages-panel"] [role="treeitem"]',
    '[data-testid="page-list"] [role="treeitem"]',
    '[aria-label="Pages"] [role="treeitem"]',
    '[aria-label="ページ"] [role="treeitem"]',
    '[role="tree"][aria-label*="page" i] [role="treeitem"]',
    '[role="tree"][aria-label*="ページ"] [role="treeitem"]',
    'div[class*="pages_panel"] [role="treeitem"]',
    // Figma 2024+ で観察された internal class 名
    'div[class*="left_sidebar--pagesPanel"] [role="row"]',
    'div[class*="left_sidebar"] [data-onboarding-key*="page"]',
  ]
  for (const sel of ariaCandidates) {
    const count = await page.locator(sel).count()
    if (count > 0) {
      console.log(`  → pages selector hit (aria): ${sel} (${count} items)`)
      return { mode: 'selector', selector: sel, count }
    }
  }

  // 2) 構造ベース: 「ページ」見出しの直下の兄弟群から、次の見出し ("レイヤー" 等) までを抽出
  // Figma のサイドバーは見出しに role="heading" を付けていることが多いが、
  // テキスト一致で見つけるのが最も堅牢。
  const headingTexts = ['ページ', 'Pages', 'PAGES']
  for (const ht of headingTexts) {
    // 見出しの要素を取得 (button/h2/h3 等いずれでもテキスト一致で)
    const heading = page.getByText(ht, { exact: true }).first()
    if ((await heading.count()) === 0) continue

    // 見出しから JSON 化された "兄弟" のテキストリストを抽出する。
    // 戦略: heading の最近接の "見出しっぽい子供を持つ" 共通祖先を探し、
    // その下のクリック可能な要素のテキストを次の見出し ("レイヤー" / "Layers") まで列挙。
    const names = await page.evaluate((headingText) => {
      const all = Array.from(document.querySelectorAll('*'))
      const heading = all.find(
        (el) => el.textContent?.trim() === headingText && el.offsetParent !== null,
      )
      if (!heading) return []

      // heading の親をたどって "兄弟にレイヤー/Layers 見出しが入っているコンテナ" を探す
      let container = heading.parentElement
      const STOP_HEADINGS = new Set([
        'レイヤー',
        'Layers',
        'LAYERS',
        'アセット',
        'Assets',
        'スタイル',
        'Styles',
      ])
      for (let depth = 0; depth < 5 && container; depth++) {
        const childTexts = Array.from(container.children).map((c) => c.textContent?.trim() ?? '')
        if (childTexts.some((t) => STOP_HEADINGS.has(t))) break
        container = container.parentElement
      }
      if (!container) return []

      // container 内で heading の後の要素を辿り、STOP_HEADINGS が出るまで抽出
      const out = []
      let started = false
      const walk = (node) => {
        if (node === heading) {
          started = true
          return
        }
        if (!started) return
        const txt = node.textContent?.trim() ?? ''
        if (STOP_HEADINGS.has(txt)) {
          started = false
          return
        }
        // 葉ノード or 短いテキストを持つ要素を抽出
        if (node.children.length === 0 && txt) {
          out.push(txt)
        }
      }
      const recurse = (n) => {
        if (!started && n !== heading && !n.contains(heading)) return
        if (n.nodeType === 1) walk(n)
        for (const c of n.childNodes) recurse(c)
      }
      recurse(container)
      return out.filter((t) => t.length > 0 && t.length < 100)
    }, ht)

    if (names.length > 0) {
      // 見出しテキスト自身 / アップグレード勧誘 / 警告文 などのノイズを除去
      const filtered = names.filter((n) => {
        if (n === ht) return false // 「ページ」見出しそのもの
        if (n.endsWith('。')) return false // 「無料ページはすべて使用済みです。」等
        if (/^(無料|無制限|Free|Get unlimited|Upgrade)/i.test(n)) return false // アップグレード文言
        if (n.length > 80) return false // 異常に長いテキスト
        if (n.length < 1) return false
        return true
      })
      console.log(
        `  → pages selector hit (structural via "${ht}"): raw=${names.length}, after-filter=${filtered.length}`,
      )
      console.log(`     names: ${JSON.stringify(filtered)}`)
      return { mode: 'byText', names: filtered }
    }
  }

  return null
}

const pagesInfo = await listPages()
if (!pagesInfo) {
  console.error('Pages 一覧の DOM が見つかりませんでした。')
  console.error(
    '左サイドバーの HTML 構造を _debug-sidebar.html に保存しますので、内容を共有してください。',
  )

  await page.screenshot({ path: join(OUT_DIR, '_debug-no-pages-panel.png'), fullPage: true })
  console.error(`スクリーンショット: ${join(OUT_DIR, '_debug-no-pages-panel.png')}`)

  // 左サイドバー領域の HTML を dump
  const sidebarHtml = await page.evaluate(() => {
    // 一番左の固定パネルを探す。Figma は通常画面左 280px 程度
    const candidates = Array.from(document.querySelectorAll('aside, nav, div'))
      .filter((el) => {
        const r = el.getBoundingClientRect()
        return r.left < 50 && r.width > 150 && r.width < 400 && r.height > 400
      })
      .sort((a, b) => b.getBoundingClientRect().height - a.getBoundingClientRect().height)
    return candidates[0]?.outerHTML?.slice(0, 50_000) ?? '(no sidebar found)'
  })
  await writeFile(join(OUT_DIR, '_debug-sidebar.html'), sidebarHtml)
  console.error(`サイドバー HTML: ${join(OUT_DIR, '_debug-sidebar.html')}`)
  process.exit(2)
}

const pageNames =
  pagesInfo.mode === 'byText'
    ? pagesInfo.names
    : await page.locator(pagesInfo.selector).allInnerTexts()
console.log(`Pages: ${pageNames.length}`)
for (const n of pageNames) console.log(`  - ${n}`)

// --- 各ページを巡って top-level frame をエクスポート ------------------------
let done = 0
let okCount = 0
let failCount = 0

for (let i = 0; i < pageNames.length && i < MAX_PAGES; i++) {
  const pageName = pageNames[i].trim()
  if (PAGE_FILTER && !PAGE_FILTER.test(pageName)) {
    console.log(`(skip) ${pageName}`)
    continue
  }
  console.log(`\n[Page ${i + 1}/${pageNames.length}] ${pageName}`)

  const pageDir = join(OUT_DIR, sanitize(pageName))
  await mkdir(pageDir, { recursive: true })

  // ページを選択
  try {
    if (pagesInfo.mode === 'byText') {
      // テキスト一致でクリック
      await page.getByText(pageName, { exact: true }).first().click({ timeout: 5_000 })
    } else {
      await page.locator(pagesInfo.selector).nth(i).click({ timeout: 5_000 })
    }
  } catch (e) {
    console.warn(`  ! ページ選択失敗 (${pageName}): ${e.message}`)
    failCount++
    continue
  }
  await page.waitForTimeout(2_000) // ページ切替アニメ + canvas 再描画待ち

  const isMac = process.platform === 'darwin'

  if (EXPORT_MODE === 'screenshot') {
    // ---- viewport スクショ方式 ------------------------------------------
    const savePath = join(pageDir, `${sanitize(pageName)}.png`)

    // resume: 既存 PNG があればスキップ (OVERWRITE=1 で再取得)
    if (process.env.OVERWRITE !== '1' && (await exists(savePath))) {
      console.log(`  (resume) skip existing: ${savePath}`)
      okCount++
      done++
      continue
    }

    try {
      // 0. Figma がモーダル / 通知を出していたら閉じる
      await dismissBlockingOverlays(page)

      // 1. canvas にフォーカスを当てる (タイムアウト短めで諦める)
      await page
        .locator('canvas')
        .first()
        .click({
          position: { x: 800, y: 500 },
          timeout: 8_000,
        })
      await page.waitForTimeout(300)

      // 2. ESC で選択解除
      await page.keyboard.press('Escape')
      await page.waitForTimeout(200)

      // 3. Shift+1 で "Zoom to fit"
      await page.keyboard.press('Shift+1')
      await page.waitForTimeout(1_500)

      // 4. canvas 領域の bounding box を取得してその範囲を撮影
      const canvasEl = page.locator('canvas').first()
      const box = await canvasEl.boundingBox()
      if (!box) {
        throw new Error('canvas bounding box が取得できない')
      }

      await page.screenshot({
        path: savePath,
        clip: { x: box.x, y: box.y, width: box.width, height: box.height },
      })
      console.log(`  ✓ ${savePath} (${Math.round(box.width)}×${Math.round(box.height)})`)
      okCount++
      done++

      if (DEBUG) {
        await page.screenshot({
          path: join(pageDir, `_debug-fullpage-${i}.png`),
          fullPage: true,
        })
      }
    } catch (e) {
      console.warn(`  ! 失敗 (${pageName}): ${e.message.split('\n')[0]}`)
      try {
        await page.screenshot({
          path: join(pageDir, `_debug-fail-${i}.png`),
          fullPage: true,
        })
      } catch {
        /* スクショ自体も失敗するケースは諦める */
      }
      failCount++
    }
  } else if (EXPORT_MODE === 'figma-export') {
    // ---- Figma Export ダイアログ方式 ------------------------------------
    // 完全な動作確認はまだ。viewport モードでは取れない 2x 高解像度が必要な時のオプション。

    // canvas にフォーカス → 全選択 → Cmd+Shift+E
    await page
      .locator('canvas')
      .first()
      .click({ position: { x: 800, y: 500 } })
    await page.waitForTimeout(300)
    await page.keyboard.press(isMac ? 'Meta+a' : 'Control+a')
    await page.waitForTimeout(500)

    // 複数 download を拾うため event listener で収集
    const downloads = []
    const handler = (d) => downloads.push(d)
    page.on('download', handler)

    await page.keyboard.press(isMac ? 'Meta+Shift+e' : 'Control+Shift+e')
    await page.waitForTimeout(1_500)

    if (DEBUG) {
      await page.screenshot({
        path: join(pageDir, `_debug-after-shortcut-${i}.png`),
        fullPage: true,
      })
    }

    // ダイアログ内の Export ボタンを探す (複数候補)
    const exportSelectors = [
      '[role="dialog"] button:has-text("エクスポート")',
      '[role="dialog"] button:has-text("Export")',
      'button[type="submit"]:has-text("エクスポート")',
      'button[type="submit"]:has-text("Export")',
      // フォールバック: ページ全体で「エクスポート」を含むボタンの最後
      'button:has-text("エクスポート"):visible',
      'button:has-text("Export"):visible',
    ]

    let clicked = false
    for (const sel of exportSelectors) {
      const loc = page.locator(sel)
      if ((await loc.count()) > 0) {
        try {
          await loc.last().click({ timeout: 3_000 })
          clicked = true
          console.log(`  ↗ export click via ${sel}`)
          break
        } catch {
          /* 次の selector を試す */
        }
      }
    }

    if (!clicked) {
      console.warn(`  ! Export ボタンが見つからない (${pageName})`)
      await page.screenshot({
        path: join(pageDir, `_debug-no-export-btn-${i}.png`),
        fullPage: true,
      })
      page.off('download', handler)
      failCount++
      await page.keyboard.press('Escape').catch(() => {})
      continue
    }

    // ダウンロードが始まるのを待つ
    await page.waitForTimeout(8_000)
    page.off('download', handler)

    if (downloads.length === 0) {
      console.warn(`  ! ダウンロード受信なし (${pageName})`)
      failCount++
      continue
    }

    for (const d of downloads) {
      const fn = d.suggestedFilename() || `${sanitize(pageName)}.zip`
      const savePath = join(pageDir, fn)
      await d.saveAs(savePath)
      console.log(`  ✓ ${savePath}`)
      okCount++
    }
    done++

    // ダイアログを閉じる
    await page.keyboard.press('Escape').catch(() => {})
  } else {
    console.error(`Unknown EXPORT_MODE: ${EXPORT_MODE}`)
    process.exit(1)
  }

  // クールダウン
  await page.waitForTimeout(1_500)
}

// --- manifest ---------------------------------------------------------------
const manifestPath = join(OUT_DIR, 'playwright-manifest.json')
await writeFile(
  manifestPath,
  JSON.stringify(
    {
      fileKey: FILE_KEY,
      exportedAt: new Date().toISOString(),
      pages: pageNames,
      ok: okCount,
      fail: failCount,
      scale: SCALE,
    },
    null,
    2,
  ),
)

console.log(`\nDone — ok=${okCount} fail=${failCount} → ${manifestPath}`)
await browser.close()
process.exit(failCount > 0 ? 1 : 0)
