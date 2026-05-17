#!/usr/bin/env node
// 1 回だけ実行: Figma にブラウザでログインし、認証状態を scripts/.figma-auth.json に保存する。
// 以後の figma-playwright-export.mjs はこのファイルを読み込んでヘッドレスで動く。

import { mkdir } from 'node:fs/promises'
import { dirname } from 'node:path'
import { chromium } from 'playwright'

const AUTH_PATH = process.env.FIGMA_AUTH_PATH ?? 'scripts/.figma-auth.json'
const FIGMA_HOME = 'https://www.figma.com/files/recent'

console.log('Figma ログイン用ブラウザを起動します...')
const browser = await chromium.launch({ headless: false })
const ctx = await browser.newContext({
  viewport: { width: 1400, height: 900 },
})
const page = await ctx.newPage()

await page.goto('https://www.figma.com/login', { waitUntil: 'domcontentloaded' })

console.log('')
console.log('---------------------------------------------------------------')
console.log('ブラウザでログインしてください (2FA / SSO 含めて完了させる)。')
console.log('ログイン後、Figma のファイル一覧が表示されたら、')
console.log('ターミナルに戻って **Enter** キーを押してください。')
console.log('---------------------------------------------------------------')

await new Promise((resolve) => {
  process.stdin.setEncoding('utf8')
  process.stdin.resume()
  const onData = (chunk) => {
    if (chunk.includes('\n') || chunk.includes('\r')) {
      process.stdin.removeListener('data', onData)
      process.stdin.pause()
      resolve()
    }
  }
  process.stdin.on('data', onData)
})

// ログイン後の URL を確認
const currentUrl = page.url()
if (!currentUrl.includes('figma.com')) {
  console.warn(`現在の URL が figma.com ではありません: ${currentUrl}`)
}

// ログイン直後の cookie / localStorage を保存
await mkdir(dirname(AUTH_PATH), { recursive: true })
await ctx.storageState({ path: AUTH_PATH })

// 動作確認用に Figma ホームに遷移してログイン状態であることを目視確認
try {
  await page.goto(FIGMA_HOME, { waitUntil: 'domcontentloaded', timeout: 15_000 })
} catch {
  /* 移動失敗は無視 */
}

console.log('')
console.log(`認証状態を保存しました: ${AUTH_PATH}`)
console.log('ブラウザはこのまま開いたままにします。確認後 Ctrl+C で終了してください。')

// 終了は Ctrl+C 任せ (ブラウザを残してユーザーに動作確認させる)
