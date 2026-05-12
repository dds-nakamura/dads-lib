// VitePress テーマ — 既定テーマに DADS のトークン + コンポーネント CSS を上乗せする。
// design.md §3.4 のとおり @dads/tokens/css (CSS 変数定義) を最初に、
// @dads/vue/styles (コンポーネント CSS) を次に読み込む。

import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'

import '@dads/tokens/css'
import '@dads/vue/styles'
import './custom.css'

export default {
  extends: DefaultTheme,
} satisfies Theme
