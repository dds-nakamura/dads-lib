---
layout: home

hero:
  name: DADS Vue Components
  text: デジタル庁デザインシステムの Vue 3 実装
  tagline: WCAG 2.1 AA 準拠 / Vuetify-free / Vue 3 SFC
  actions:
    - theme: brand
      text: コンポーネント一覧へ
      link: /components/button
    - theme: alt
      text: GitHub
      link: https://github.com/digital-go-jp/design-system-example-components-html

features:
  - title: DADS 準拠
    details: デジタル庁デザインシステム (DADS) の公式仕様に準拠した 26 コンポーネント。
  - title: 依存最小化
    details: Vue 3 を peerDependency として、ランタイム依存は実質ゼロ。
  - title: アクセシブル
    details: WCAG 2.1 AA を満たす aria 属性とキーボード操作を実装済み。
---

## このカタログについて

`@dads/vue` パッケージに含まれる 26 個の Vue 3 コンポーネントを VitePress 上でブラウズできます。

- **パッケージ**: `@dads/vue` (workspace 内で参照)
- **依存**: `vue@^3.4` (peer)
- **スタイル**: `@dads/tokens/css` + `@dads/vue/styles` を本サイト全体に読み込み済み

最初のサンプルとして [Button](./components/button) を御覧ください。
