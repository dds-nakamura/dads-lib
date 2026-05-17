#!/usr/bin/env node
// Figma REST API 経由で DADS の Figma ファイルを一括 PNG/SVG/PDF エクスポートする。
// 使い方は scripts/README.md を参照。

import { mkdir, readFile, stat, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'

// ---------- 設定 ----------

const TOKEN = process.env.FIGMA_TOKEN
const FILE_KEY = process.env.FIGMA_FILE_KEY
const OUT_DIR = process.env.OUT_DIR ?? 'dads-document-figma'
const FORMAT = process.env.FORMAT ?? 'png' // png | jpg | svg | pdf
const SCALE = process.env.SCALE ?? '2' // 1〜4 (svg/pdf では無視)
const MODE = process.env.MODE ?? 'frame' // 'page' | 'frame'
const BATCH = Number(process.env.BATCH ?? 5) // 1 リクエストで render する id 数。Figma は 5 前後が安定
const COOLDOWN_MS = Number(process.env.COOLDOWN_MS ?? 1500) // バッチ間の待機 (rate limit 対策)
const RETRY = Number(process.env.RETRY ?? 3) // 429 / 5xx / render timeout のリトライ最大回数
const MAX_WAIT_SEC = Number(process.env.MAX_WAIT_SEC ?? 300) // 1 回のリトライ待機上限 (秒)。超過したら abort
const OVERWRITE = process.env.OVERWRITE === '1' // 既存ファイルがあっても再 DL する
const PAGE_FILTER = process.env.PAGE_FILTER // 対象ページ名フィルタ (正規表現)
const DRY_RUN = process.env.DRY_RUN === '1'

if (!TOKEN || !FILE_KEY) {
  console.error('Usage: FIGMA_TOKEN=xxx FIGMA_FILE_KEY=yyy pnpm figma:export')
  console.error('Optional env:')
  console.error('  MODE=page|frame                        (default frame)')
  console.error('  FORMAT=png|jpg|svg|pdf                 (default png)')
  console.error('  SCALE=1|2|3|4                          (default 2)')
  console.error('  OUT_DIR=path                           (default dads-document-figma)')
  console.error('  PAGE_FILTER=regex                      (default なし)')
  console.error('  BATCH=N                                (default 5)')
  console.error('  COOLDOWN_MS=N                          (default 1500)')
  console.error('  RETRY=N                                (default 3)')
  console.error('  OVERWRITE=1                            (既存ファイルを上書き)')
  console.error('  DRY_RUN=1                              (DL せず対象一覧のみ)')
  console.error('  MAX_WAIT_SEC=N                         (default 300, 1 回のリトライ待機上限)')
  process.exit(1)
}

const API = 'https://api.figma.com/v1'
const headers = { 'X-Figma-Token': TOKEN }

// ---------- ユーティリティ ----------

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

const sanitize = (name) =>
  name
    .replace(/[\/\\:*?"<>|\s]+/g, '_')
    .replace(/_+/g, '_')
    .trim()

const chunk = (arr, size) => {
  const out = []
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size))
  return out
}

async function exists(path) {
  try {
    await stat(path)
    return true
  } catch {
    return false
  }
}

// 429 / 5xx / "Render timeout" を対象に、Retry-After を尊重しつつ指数バックオフでリトライ。
async function fetchJsonWithRetry(url, label) {
  let lastErr
  for (let attempt = 0; attempt <= RETRY; attempt++) {
    const r = await fetch(url, { headers })

    if (r.status === 429) {
      const retryAfterHeader = Number(r.headers.get('retry-after'))
      let baseWaitSec =
        Number.isFinite(retryAfterHeader) && retryAfterHeader > 0
          ? retryAfterHeader
          : Math.pow(2, attempt + 1) * 5 // 10s, 20s, 40s, 80s...

      // Figma が ms 単位で返してくる事例があるため、秒として非現実的に長い場合は ms とみなして補正
      if (baseWaitSec > 24 * 3600) {
        const asMs = baseWaitSec / 1000
        console.warn(
          `    ⚠ Retry-After=${baseWaitSec} は秒として長すぎるため ms と解釈: ${asMs.toFixed(1)}s`,
        )
        baseWaitSec = asMs
      }

      if (baseWaitSec > MAX_WAIT_SEC) {
        throw new Error(
          `429 ${label}: Retry-After=${baseWaitSec}s が MAX_WAIT_SEC=${MAX_WAIT_SEC}s を超過。` +
            ` Figma が長期クールダウンを適用しています。時間をおいて再実行するか、別ネットワーク/別 token をお試しください。` +
            ` 強制的に待つ場合は MAX_WAIT_SEC=<秒数> で上限を引き上げてください。`,
        )
      }

      console.warn(
        `    ⏳ 429 ${label} → ${baseWaitSec}s 待機 (attempt ${attempt + 1}/${RETRY + 1})`,
      )
      await sleep(baseWaitSec * 1000)
      continue
    }

    let json = null
    try {
      json = await r.json()
    } catch {
      // JSON でなければ後段で fallthrough
    }

    const renderTimeout = json?.err && /render timeout/i.test(json.err)
    const serverError = r.status >= 500

    if (renderTimeout || serverError) {
      const waitSec = Math.pow(2, attempt) * 2 + Math.random() // 2〜3s, 4〜5s, 8〜9s
      lastErr = new Error(`${json?.err ?? r.status} ${label}`)
      console.warn(
        `    ⏳ ${json?.err ?? r.status} ${label} → ${waitSec.toFixed(1)}s 待機 (attempt ${attempt + 1}/${RETRY + 1})`,
      )
      await sleep(waitSec * 1000)
      continue
    }

    if (!r.ok || json?.err) {
      const body = json?.err ?? JSON.stringify(json)?.slice(0, 200) ?? ''
      throw new Error(`${label} ${r.status}: ${body}`)
    }

    return json
  }
  throw lastErr ?? new Error(`${label}: リトライ上限到達`)
}

async function getFile() {
  console.log(`Fetching file structure: ${FILE_KEY}`)
  const json = await fetchJsonWithRetry(`${API}/files/${FILE_KEY}?depth=2`, 'getFile')
  return json
}

async function renderImages(ids, label) {
  const params = new URLSearchParams({
    ids: ids.join(','),
    format: FORMAT,
    scale: SCALE,
  })
  const json = await fetchJsonWithRetry(
    `${API}/images/${FILE_KEY}?${params.toString()}`,
    `render(${label})`,
  )
  return json.images ?? {}
}

// バッチが renderTimeout で恒久的に落ちた場合、1 件ずつにフォールバックする。
async function renderBatchOrFallback(tasks) {
  if (tasks.length === 0) return {}
  try {
    return await renderImages(
      tasks.map((t) => t.id),
      `batch[${tasks.length}]`,
    )
  } catch (e) {
    if (tasks.length === 1) {
      console.warn(`    × 単発 render も失敗: ${tasks[0].label} (${e.message})`)
      return {}
    }
    console.warn(`    ↘ batch 失敗 (${e.message}) → 1 件ずつフォールバック`)
    const images = {}
    for (const t of tasks) {
      try {
        const single = await renderImages([t.id], `single[${t.label}]`)
        Object.assign(images, single)
      } catch (e2) {
        console.warn(`      × ${t.label}: ${e2.message}`)
      }
      await sleep(COOLDOWN_MS) // 単発も rate limit に配慮
    }
    return images
  }
}

async function download(url, path) {
  const r = await fetch(url)
  if (!r.ok) throw new Error(`download ${r.status} ${path}`)
  const buf = Buffer.from(await r.arrayBuffer())
  await mkdir(dirname(path), { recursive: true })
  await writeFile(path, buf)
}

// ---------- 対象収集 ----------

function collectTasks(document) {
  const pages = document.children ?? []
  const filter = PAGE_FILTER ? new RegExp(PAGE_FILTER, 'i') : null

  const tasks = []
  for (const page of pages) {
    if (page.type !== 'CANVAS') continue
    if (filter && !filter.test(page.name)) continue

    const pageDir = sanitize(page.name)

    if (MODE === 'page') {
      tasks.push({
        id: page.id,
        path: join(OUT_DIR, `${pageDir}.${FORMAT}`),
        label: page.name,
      })
      continue
    }

    for (const frame of page.children ?? []) {
      if (!['FRAME', 'COMPONENT', 'COMPONENT_SET', 'SECTION'].includes(frame.type)) continue
      tasks.push({
        id: frame.id,
        path: join(OUT_DIR, pageDir, `${sanitize(frame.name)}.${FORMAT}`),
        label: `${page.name} / ${frame.name}`,
      })
    }
  }
  return tasks
}

// ---------- main ----------

const start = Date.now()

const file = await getFile()
console.log(`File: ${file.name} (lastModified=${file.lastModified})`)

const allTasks = collectTasks(file.document)
console.log(
  `Mode=${MODE} format=${FORMAT} scale=${SCALE} batch=${BATCH} cooldown=${COOLDOWN_MS}ms retry=${RETRY}`,
)
console.log(`対象: ${allTasks.length} 件`)

// 既存ファイルの skip 判定 (OVERWRITE=1 で無効化)
const tasks = []
const skipped = []
for (const t of allTasks) {
  if (!OVERWRITE && (await exists(t.path))) {
    skipped.push(t)
  } else {
    tasks.push(t)
  }
}
if (skipped.length) {
  console.log(`既存スキップ: ${skipped.length} 件 (OVERWRITE=1 で再 DL)`)
}
console.log(`今回処理: ${tasks.length} 件`)

if (DRY_RUN) {
  for (const t of tasks) console.log(`  - ${t.id}\t${t.path}`)
  console.log(`(DRY_RUN — 何も DL しません)`)
  process.exit(0)
}

await mkdir(OUT_DIR, { recursive: true })

// manifest は逐次保存。途中中断しても進捗が残る。
const manifestPath = join(OUT_DIR, 'manifest.json')
const manifest = {
  fileKey: FILE_KEY,
  fileName: file.name,
  lastModified: file.lastModified,
  startedAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  mode: MODE,
  format: FORMAT,
  scale: SCALE,
  ok: 0,
  fail: 0,
  skipped: skipped.length,
  items: [],
}
// 既存 manifest があれば items を引き継ぐ (resume 用途)
if (await exists(manifestPath)) {
  try {
    const prev = JSON.parse(await readFile(manifestPath, 'utf8'))
    if (prev?.items) {
      // 既存 path が今回 skip 対象 (= ファイル現存) のものだけ残し、重複を排除
      const seen = new Set()
      manifest.items = prev.items.filter((it) => {
        if (!it?.id || seen.has(it.id)) return false
        seen.add(it.id)
        return true
      })
    }
  } catch {
    /* ignore — 破損していたら新規作成 */
  }
}

async function saveManifest() {
  manifest.updatedAt = new Date().toISOString()
  await writeFile(manifestPath, JSON.stringify(manifest, null, 2))
}

let ok = 0
let fail = 0
let processed = 0
const total = tasks.length
const batches = chunk(tasks, BATCH)

for (const [bi, batch] of batches.entries()) {
  console.log(`\nBatch ${bi + 1}/${batches.length} (${batch.length} 件)`)
  const images = await renderBatchOrFallback(batch)

  for (const t of batch) {
    processed++
    const url = images[t.id]
    if (!url) {
      console.warn(`  [${processed}/${total}] × no URL: ${t.label}`)
      fail++
      manifest.fail = fail
      continue
    }
    try {
      await download(url, t.path)
      manifest.items.push({ id: t.id, label: t.label, path: t.path })
      manifest.ok = ++ok
      console.log(`  [${processed}/${total}] ✓ ${t.path}`)
    } catch (e) {
      console.error(`  [${processed}/${total}] ! download failed (${t.label}): ${e.message}`)
      fail++
      manifest.fail = fail
    }
  }
  await saveManifest() // バッチ単位で保存

  // 最後のバッチでなければクールダウン
  if (bi < batches.length - 1) {
    await sleep(COOLDOWN_MS)
  }
}

await saveManifest()

const sec = ((Date.now() - start) / 1000).toFixed(1)
console.log(`\nDone in ${sec}s — ok=${ok} fail=${fail} skipped=${skipped.length} → ${manifestPath}`)
process.exit(fail > 0 ? 1 : 0)
