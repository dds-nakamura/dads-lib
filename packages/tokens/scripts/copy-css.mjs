/**
 * @digital-go-jp/design-tokens の CSS 配布物をローカル dist/ にコピーする。
 *
 * pnpm の strict isolation で node_modules パスを exports に直書きすると壊れ
 * やすいため、ビルド時にコピーして自身の dist/ から提供する。
 */

import { copyFileSync, mkdirSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const pkgRoot = resolve(__dirname, '..')

const srcDir = resolve(pkgRoot, 'node_modules/@digital-go-jp/design-tokens/dist')
const destDir = resolve(pkgRoot, 'dist')

const files = ['tokens.css', 'tokens-simple.css']

mkdirSync(destDir, { recursive: true })

for (const file of files) {
  const src = resolve(srcDir, file)
  const dest = resolve(destDir, file)
  if (!existsSync(src)) {
    console.error(`[copy-css] source not found: ${src}`)
    process.exit(1)
  }
  copyFileSync(src, dest)
  console.log(`[copy-css] ${file} -> dist/${file}`)
}
