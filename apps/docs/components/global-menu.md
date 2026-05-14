# GlobalMenu

サイト全体の最上位ナビゲーション。横並びのリンク列をヘッダ直下に置き、現在地ハイライト・ドロップダウン (子メニュー) ・無効化に対応する。

`DadsMenuList` がドロップダウン / メガメニュー内のリスト要素を担うのに対し、`DadsGlobalMenu` はヘッダ直下の最上位リンク列を担う。

## 基本

`items` 配列に `{ label, href }` を渡すと `<a>` として横並びに描画される。

<script setup>
import { ref } from 'vue'
import { DadsGlobalMenu } from '@dads/vue'

const basicItems = [
  { label: 'ホーム', href: '/' },
  { label: 'サービス', href: '/services' },
  { label: 'お知らせ', href: '/news' },
  { label: 'サポート', href: '/support' },
]

const activeItems = [
  { label: 'ホーム', href: '/' },
  { label: 'サービス', href: '/services', active: true },
  { label: 'お知らせ', href: '/news' },
  { label: 'サポート', href: '/support' },
]

const disabledItems = [
  { label: 'ホーム', href: '/' },
  { label: '準備中', href: '/wip', disabled: true },
  { label: 'お知らせ', href: '/news' },
  { label: 'アクション (無効)', disabled: true },
]

const nestedItems = [
  { label: 'ホーム', href: '/' },
  {
    label: '製品',
    expanded: true,
    children: [
      { label: '商品 A', href: '/products/a' },
      { label: '商品 B', href: '/products/b' },
    ],
  },
  {
    label: 'サポート',
    children: [
      { label: 'よくある質問', href: '/support/faq' },
      { label: 'お問い合わせ', href: '/support/contact' },
    ],
  },
]

const iconItems = [
  { label: 'ホーム', href: '/', frontIcon: 'mdi-home' },
  { label: 'お知らせ', href: '/news', frontIcon: 'mdi-bell-outline' },
  { label: '設定', href: '/settings', frontIcon: 'mdi-cog' },
]

const lastClicked = ref('')
const onClickItem = (item) => {
  lastClicked.value = item.label
}
</script>

<div class="demo">
  <DadsGlobalMenu :items="basicItems" />
</div>

```vue
<script setup>
import { DadsGlobalMenu } from '@dads/vue'

const items = [
  { label: 'ホーム', href: '/' },
  { label: 'サービス', href: '/services' },
  { label: 'お知らせ', href: '/news' },
  { label: 'サポート', href: '/support' },
]
</script>

<template>
  <DadsGlobalMenu :items="items" />
</template>
```

## 現在地のハイライト (active)

`active: true` を渡した項目は強調表示され、`aria-current="page"` が自動付与される。デザイン上は青系の下線 4px で示される。

<div class="demo">
  <DadsGlobalMenu :items="activeItems" />
</div>

```ts
const items = [
  { label: 'ホーム', href: '/' },
  { label: 'サービス', href: '/services', active: true },
  { label: 'お知らせ', href: '/news' },
]
```

## 非活性項目 (disabled)

`disabled: true` を渡した項目はクリック・ナビゲーションが抑止される。リンク項目では `aria-disabled="true"` + `tabindex="-1"` が付与され、`href` も外される。ボタン項目では `disabled` 属性が付く。

<div class="demo">
  <DadsGlobalMenu :items="disabledItems" />
</div>

## 子メニュー (ドロップダウン)

`children` を持つ項目は `<button aria-haspopup="menu">` として描画され、末尾にシェブロンアイコンが表示される。`expanded: true` を付けると `aria-expanded="true"` が付与され、シェブロンは 180 度回転する。

子メニューの開閉アニメーション・ドロップダウン本体の表示は呼び出し側の責務となる (`DadsMenuList` を組み合わせるのが推奨パターン)。

<div class="demo">
  <DadsGlobalMenu :items="nestedItems" />
</div>

```ts
const items = [
  { label: 'ホーム', href: '/' },
  {
    label: '製品',
    expanded: true,
    children: [
      { label: '商品 A', href: '/products/a' },
      { label: '商品 B', href: '/products/b' },
    ],
  },
]
```

## アイコン付き

`frontIcon` に Material Design Icons のクラス名を渡すと、ラベル左にアイコンが表示される。  
※ カタログ側では `@mdi/font` を読み込んでいないため見た目は表示されない。利用側で CSS を読み込む前提。

<div class="demo">
  <DadsGlobalMenu :items="iconItems" />
</div>

```vue
<DadsGlobalMenu :items="iconItems" />
```

```ts
const iconItems = [
  { label: 'ホーム', href: '/', frontIcon: 'mdi-home' },
  { label: 'お知らせ', href: '/news', frontIcon: 'mdi-bell-outline' },
  { label: '設定', href: '/settings', frontIcon: 'mdi-cog' },
]
```

## クリックイベント

`click:item` でリンク / ボタンクリックを検知できる。`disabled` 項目では発火しない。

<div class="demo">
  <DadsGlobalMenu :items="basicItems" @click:item="onClickItem" />
  <span class="demo-label" style="margin-top:0.5rem">最後にクリックされた項目: {{ lastClicked || '(none)' }}</span>
</div>

```vue
<DadsGlobalMenu :items="items" @click:item="(item, event) => console.log(item.label)" />
```

## aria-label のカスタマイズ

ルート `<nav>` の `aria-label` はデフォルト `'グローバルメニュー'`。同一ページに複数の `<nav>` を置く場合は識別のため上書きする。

```vue
<DadsGlobalMenu :items="items" aria-label="メインメニュー" />
```

## Props

| Prop        | 型                     | デフォルト             | 説明                                            |
| ----------- | ---------------------- | ---------------------- | ----------------------------------------------- |
| `items`     | `DadsGlobalMenuItem[]` | (必須)                 | メニュー項目配列                                |
| `ariaLabel` | `string`               | `'グローバルメニュー'` | ルート `<nav>` の `aria-label` (ランドマーク名) |

### `DadsGlobalMenuItem`

| Key         | 型                     | 説明                                                                              |
| ----------- | ---------------------- | --------------------------------------------------------------------------------- |
| `label`     | `string`               | 表示テキスト (必須)                                                               |
| `href`      | `string`               | 指定時は `<a href>` でレンダリング、未指定 (または `children` あり) は `<button>` |
| `active`    | `boolean`              | 現在地ハイライト。`aria-current="page"` を付与                                    |
| `disabled`  | `boolean`              | 操作不可化。リンクは `aria-disabled` + tabindex=-1、ボタンは `disabled` 属性      |
| `frontIcon` | `string`               | 項目先頭のアイコン (MDI クラス名)                                                 |
| `children`  | `DadsGlobalMenuItem[]` | 子メニュー。`<button aria-haspopup="menu">` として描画され、シェブロンが付く      |
| `expanded`  | `boolean`              | 子メニューが展開中であることを示す。`aria-expanded="true"` 付与                   |

## Events

| Event        | Payload                                         | 説明                                                       |
| ------------ | ----------------------------------------------- | ---------------------------------------------------------- |
| `click:item` | `(item: DadsGlobalMenuItem, event: MouseEvent)` | 有効な項目クリック時に発火 (`disabled` 項目では発火しない) |

## アクセシビリティ

- ルート要素は `<nav aria-label>` (ランドマーク)。ページ内に複数のナビゲーションがあっても識別できる
- 項目は `<a>` (リンク) または `<button>` (子メニュー / アクション) で描画し、ネイティブのキーボード操作・支援技術への露出が確保される
- `active: true` の項目には `aria-current="page"` を付与し、スクリーンリーダに現在地として伝える
- 子を持つ `<button>` には `aria-haspopup="menu"` と `aria-expanded` を付与し、展開状態を支援技術に通知する
- 無効な項目は `aria-disabled` (リンク) / `disabled` (ボタン) で操作不可状態を支援技術にも通知する
- フォーカスリングはキーボード操作時のみ表示される共通スタイル (黒アウトライン + 黄色 outer ring)
- 強制カラーモード (Windows High Contrast 等) では `Highlight` / `CanvasText` / `GrayText` で OS の配色を尊重
