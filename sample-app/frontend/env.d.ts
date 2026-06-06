/// <reference types="vite/client" />

// CSS-only エントリ (パッケージ subpath exports) の side-effect import 用宣言。
// `*.css` のファイル import は vite/client が型を提供するが、拡張子を持たない
// パッケージ subpath (`@dads/tokens/css` 等) は個別に宣言する必要がある。
declare module '@dads/tokens/css'
declare module '@dads/vue/styles'

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<Record<string, unknown>, Record<string, unknown>, unknown>
  export default component
}
