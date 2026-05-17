#!/usr/bin/env node
// Vendor drift detector: VENDORED.md に書かれた取り込み情報と、
// 実ファイル (package.json / manifest.json / mtime / file count) を突き合わせ、
// 「README/MD は古いままだが中身は更新済み」のような乖離 (drift) を検出する。
//
// 使い方:
//   pnpm vendor:status                  人間向けレポート (✓ / ⚠ / ✗ マーカー付き)
//   pnpm vendor:status -- --json        機械可読 JSON
//   pnpm vendor:status -- --quiet       drift がある時だけ exit 1 (CI 用、出力は最小)
//
// 何を比較するか:
//   GitHub vendor 3 件:
//     - VENDORED.md の `上流バージョン` と <dir>/package.json の version を比較
//   Site snapshot (md / html):
//     - VENDORED.md の `抽出日` と実ディレクトリの最新 mtime を比較 (3 日以上の差で warn)
//     - ファイル数も再計算して併記
//   Figma snapshot (2 manifest):
//     - VENDORED.md の `fileKey` / `exportedAt` と manifest.json / playwright-manifest.json の値を比較

import { readFile, stat, readdir } from 'node:fs/promises'
import { join, resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const VENDORED_MD = join(ROOT, 'VENDORED.md')

const args = new Set(process.argv.slice(2))
const JSON_OUT = args.has('--json')
const QUIET = args.has('--quiet')

// ---------- 共通ユーティリティ ----------

const MARK = { ok: '✓', warn: '⚠', err: '✗' }
const COLOR = process.stdout.isTTY && !JSON_OUT
  ? { ok: '\x1b[32m', warn: '\x1b[33m', err: '\x1b[31m', dim: '\x1b[2m', reset: '\x1b[0m' }
  : { ok: '', warn: '', err: '', dim: '', reset: '' }

function fmtSize(bytes) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

async function walk(dir) {
  const out = []
  let entries
  try {
    entries = await readdir(dir, { withFileTypes: true })
  } catch {
    return out
  }
  for (const e of entries) {
    const p = join(dir, e.name)
    if (e.isDirectory()) {
      if (e.name === 'node_modules' || e.name === '.git' || e.name === 'dist') continue
      out.push(...(await walk(p)))
    } else if (e.isFile()) {
      out.push(p)
    }
  }
  return out
}

async function dirStats(dir, filterExt) {
  const files = await walk(dir)
  const filtered = filterExt ? files.filter((f) => f.endsWith(filterExt)) : files
  let totalBytes = 0
  let newestMtime = 0
  for (const f of filtered) {
    try {
      const s = await stat(f)
      totalBytes += s.size
      if (s.mtimeMs > newestMtime) newestMtime = s.mtimeMs
    } catch {
      // ignore
    }
  }
  return {
    count: filtered.length,
    totalAll: files.length,
    bytes: totalBytes,
    newestMtime: newestMtime || null,
  }
}

function daysBetween(isoA, isoB) {
  const a = new Date(isoA).getTime()
  const b = new Date(isoB).getTime()
  if (isNaN(a) || isNaN(b)) return null
  return Math.abs(a - b) / (1000 * 60 * 60 * 24)
}

function toIsoDate(ms) {
  return new Date(ms).toISOString().slice(0, 10)
}

// ---------- VENDORED.md パース ----------

async function parseVendoredMd() {
  const text = await readFile(VENDORED_MD, 'utf8')
  const lines = text.split('\n')

  // table 行 (| ... | ... |) のうち、各セクションに属するものを拾う
  const rows = []
  let section = null
  for (const line of lines) {
    const h = /^##\s+(.+)$/.exec(line)
    if (h) {
      section = h[1].trim()
      continue
    }
    if (!section) continue
    if (!line.startsWith('|')) continue
    // ヘッダ行 / 区切り行 (---) を除外
    if (/^\|[\s-:|]+\|\s*$/.test(line)) continue
    const cells = line
      .split('|')
      .slice(1, -1)
      .map((c) => c.trim())
    if (cells.length === 0) continue
    // 1 列目が `<dir>/` っぽいか (バッククォート囲み)
    if (!/^`[^`]+\/`/.test(cells[0])) continue
    rows.push({ section, cells })
  }
  return rows
}

function extractDir(cell) {
  const m = /^`([^`]+)`/.exec(cell)
  return m ? m[1].replace(/\/$/, '') : null
}

function extractDate(cell) {
  const m = /\b(20\d{2}-\d{2}-\d{2})\b/.exec(cell)
  return m ? m[1] : null
}

function extractVersion(cell) {
  const m = /\bv?(\d+\.\d+\.\d+)\b/.exec(cell)
  return m ? m[1] : null
}

function extractCommit(cell) {
  const m = /`([0-9a-f]{7,40})`/.exec(cell)
  return m ? m[1] : null
}

function extractFileKey(cell) {
  const m = /fileKey[=\s]*`?([A-Za-z0-9]{15,})`?/.exec(cell)
  return m ? m[1] : null
}

function extractExportedAtIso(cell) {
  // "2026-05-16T14:54Z" 形式を補完して ISO 化
  const m = /(20\d{2}-\d{2}-\d{2})T(\d{2}):(\d{2})/.exec(cell)
  if (!m) return null
  return `${m[1]}T${m[2]}:${m[3]}:00Z`
}

// ---------- 検証ロジック ----------

const results = [] // { dir, section, status: ok|warn|err, recorded, actual, notes[] }

function push(r) {
  results.push(r)
}

async function checkGithubVendor(row) {
  const dir = extractDir(row.cells[0])
  if (!dir) return
  const recordedVersion = extractVersion(row.cells[2])
  const recordedCommit = extractCommit(row.cells[3])
  const recordedDate = extractDate(row.cells[4])
  const pkgPath = join(ROOT, dir, 'package.json')
  let actualVersion = null
  try {
    const pkg = JSON.parse(await readFile(pkgPath, 'utf8'))
    actualVersion = pkg.version
  } catch {
    // package.json なし
  }
  const notes = []
  let status = 'ok'
  if (recordedVersion && actualVersion && actualVersion !== '0.0.0') {
    if (recordedVersion !== actualVersion) {
      status = 'err'
      notes.push(`version drift: VENDORED.md=${recordedVersion} / package.json=${actualVersion}`)
    }
  } else if (actualVersion === '0.0.0') {
    notes.push(`package.json version=0.0.0 → commit hash ${recordedCommit?.slice(0, 7) ?? '?'} で判定`)
  }
  push({
    dir,
    section: row.section,
    status,
    recorded: { version: recordedVersion, commit: recordedCommit, date: recordedDate },
    actual: { version: actualVersion },
    notes,
  })
}

async function checkSiteSnapshot(row) {
  const dir = extractDir(row.cells[0])
  if (!dir) return
  const recordedDate = extractDate(row.cells[3])
  // dads-document-md: .md, dads-document-html: .html ファイルだけ数えると表記と一致しやすい
  const ext = dir.endsWith('-md') ? '.md' : dir.endsWith('-html') ? '.html' : null
  const fullPath = join(ROOT, dir)
  let dStat
  try {
    await stat(fullPath)
    dStat = await dirStats(fullPath, ext)
  } catch {
    push({
      dir,
      section: row.section,
      status: 'err',
      recorded: { date: recordedDate },
      actual: null,
      notes: ['ディレクトリが存在しない'],
    })
    return
  }
  const notes = []
  let status = 'ok'
  if (dStat.newestMtime && recordedDate) {
    const newestDate = toIsoDate(dStat.newestMtime)
    const diff = daysBetween(recordedDate, newestDate)
    if (diff !== null && diff > 3) {
      status = 'warn'
      notes.push(`mtime drift: 記録 ${recordedDate} に対しファイル mtime 最新 ${newestDate} (差 ${diff.toFixed(0)} 日)`)
    }
  }
  push({
    dir,
    section: row.section,
    status,
    recorded: { date: recordedDate },
    actual: {
      filesMatchingExt: dStat.count,
      filesTotal: dStat.totalAll,
      bytes: dStat.bytes,
      newestMtime: dStat.newestMtime ? toIsoDate(dStat.newestMtime) : null,
    },
    notes,
  })
}

async function checkFigma(row) {
  const dir = extractDir(row.cells[0])
  if (!dir) return
  const info = row.cells[2]
  const recordedDate = extractDate(row.cells[3])
  const recordedFileKey = extractFileKey(info)
  const recordedExportedAt = extractExportedAtIso(info)
  const refCell = row.cells[4]
  const manifestNameMatch = /`([^`]+)`/.exec(refCell)
  const manifestName = manifestNameMatch
    ? manifestNameMatch[1].split('/').pop()
    : info.includes('playwright')
      ? 'playwright-manifest.json'
      : 'manifest.json'
  const manifestPath = join(ROOT, dir, manifestName)
  let actual = null
  try {
    actual = JSON.parse(await readFile(manifestPath, 'utf8'))
  } catch {
    push({
      dir: `${dir}:${manifestName}`,
      section: row.section,
      status: 'warn',
      recorded: { fileKey: recordedFileKey, exportedAt: recordedExportedAt, date: recordedDate },
      actual: null,
      notes: [`${manifestName} 不在 (gitignore 対象。再生成: pnpm figma:pw-export)`],
    })
    return
  }
  const notes = []
  let status = 'ok'
  if (recordedFileKey && actual.fileKey && recordedFileKey !== actual.fileKey) {
    status = 'err'
    notes.push(`fileKey drift: VENDORED.md=${recordedFileKey} / manifest=${actual.fileKey}`)
  }
  if (recordedExportedAt && actual.exportedAt) {
    const recordedDay = recordedExportedAt.slice(0, 10)
    const actualDay = actual.exportedAt.slice(0, 10)
    if (recordedDay !== actualDay) {
      const diff = daysBetween(recordedExportedAt, actual.exportedAt)
      if (diff !== null && diff > 1) {
        status = status === 'err' ? 'err' : 'warn'
        notes.push(`exportedAt drift: VENDORED.md=${recordedDay} / manifest=${actualDay}`)
      }
    }
  }
  push({
    dir: `${dir}:${manifestName}`,
    section: row.section,
    status,
    recorded: { fileKey: recordedFileKey, exportedAt: recordedExportedAt, date: recordedDate },
    actual: {
      fileKey: actual.fileKey,
      fileName: actual.fileName,
      exportedAt: actual.exportedAt,
      lastModified: actual.lastModified,
      pages: Array.isArray(actual.pages) ? actual.pages.length : undefined,
    },
    notes,
  })
}

// ---------- 出力 ----------

function renderHuman() {
  const out = []
  out.push('Vendor drift status (compared against VENDORED.md):')
  out.push('')
  let lastSection = null
  for (const r of results) {
    if (r.section !== lastSection) {
      out.push(`${COLOR.dim}── ${r.section} ──${COLOR.reset}`)
      lastSection = r.section
    }
    const c = COLOR[r.status] || ''
    out.push(`${c}${MARK[r.status]}${COLOR.reset} ${r.dir}`)
    if (r.recorded) {
      const parts = []
      if (r.recorded.version) parts.push(`v${r.recorded.version}`)
      if (r.recorded.commit) parts.push(r.recorded.commit.slice(0, 7))
      if (r.recorded.fileKey) parts.push(`fileKey ${r.recorded.fileKey.slice(0, 8)}…`)
      if (r.recorded.exportedAt) parts.push(`exportedAt ${r.recorded.exportedAt.slice(0, 10)}`)
      if (r.recorded.date) parts.push(`@ ${r.recorded.date}`)
      if (parts.length) out.push(`    ${COLOR.dim}recorded:${COLOR.reset} ${parts.join('  ')}`)
    }
    if (r.actual) {
      const parts = []
      if (r.actual.version) parts.push(`v${r.actual.version}`)
      if (r.actual.fileKey) parts.push(`fileKey ${r.actual.fileKey.slice(0, 8)}…`)
      if (r.actual.exportedAt) parts.push(`exportedAt ${r.actual.exportedAt.slice(0, 10)}`)
      if (r.actual.pages !== undefined) parts.push(`${r.actual.pages} pages`)
      if (r.actual.filesMatchingExt !== undefined)
        parts.push(`${r.actual.filesMatchingExt} files (total ${r.actual.filesTotal}, ${fmtSize(r.actual.bytes)})`)
      if (r.actual.newestMtime) parts.push(`newest mtime ${r.actual.newestMtime}`)
      if (parts.length) out.push(`    ${COLOR.dim}actual:  ${COLOR.reset} ${parts.join('  ')}`)
    }
    for (const n of r.notes) out.push(`    ${COLOR.warn}↳${COLOR.reset} ${n}`)
  }
  out.push('')
  const errs = results.filter((r) => r.status === 'err').length
  const warns = results.filter((r) => r.status === 'warn').length
  out.push(`Summary: ${results.length - errs - warns} ok, ${warns} warn, ${errs} err`)
  return out.join('\n')
}

// ---------- main ----------

async function main() {
  const rows = await parseVendoredMd()
  for (const row of rows) {
    if (row.section.startsWith('取り込みバージョン')) {
      await checkGithubVendor(row)
    } else if (row.section.startsWith('サイト')) {
      const dir = extractDir(row.cells[0])
      if (dir?.includes('figma')) {
        await checkFigma(row)
      } else {
        await checkSiteSnapshot(row)
      }
    }
  }

  const hasError = results.some((r) => r.status === 'err')
  const hasWarn = results.some((r) => r.status === 'warn')

  if (JSON_OUT) {
    console.log(JSON.stringify({ results }, null, 2))
  } else if (QUIET) {
    if (hasError || hasWarn) {
      console.log(renderHuman())
    }
  } else {
    console.log(renderHuman())
  }

  process.exit(hasError ? 1 : 0)
}

main().catch((e) => {
  console.error(e)
  process.exit(2)
})
