# MenuList

メニュー項目を束ねたコンポーネント。コンテンツエリアのローカルメニューや、ドロップダウン / メガメニュー内のリスト要素として利用する。`<a>` で遷移リンク、`<button>` でアクションを表現でき、ネスト構造・現在地ハイライト・アイコンに対応する。

## 基本

`items` 配列に `{ label, href }` を渡すと `<a>` として描画される。

<script setup>
import { ref } from 'vue'
import { DadsMenuList } from '@dads/vue'

const basicItems = [
  { label: 'ホーム', href: '/' },
  { label: '商品一覧', href: '/products' },
  { label: 'サポート', href: '/support' },
]

const currentItems = [
  { label: 'ホーム', href: '/' },
  { label: '商品一覧', href: '/products', active: true },
  { label: 'サポート', href: '/support' },
]

const disabledItems = [
  { label: '利用可能', href: '/ok' },
  { label: '準備中', href: '/wip', disabled: true },
  { label: 'アクション (無効)', disabled: true },
]

const sizeItems = [
  { label: 'ダッシュボード', href: '/dash' },
  { label: 'プロジェクト', href: '/projects' },
  { label: '設定', href: '/settings' },
]

const nestedItems = [
  { label: '項目 1', href: '/1' },
  {
    label: '項目 2',
    expanded: true,
    endIcon: 'mdi-chevron-up',
    children: [
      { label: '項目 2-1', href: '/2/1' },
      { label: '項目 2-2', href: '/2/2', active: true },
      { label: '項目 2-3', href: '/2/3' },
    ],
  },
  { label: '項目 3', href: '/3' },
]

const iconItems = [
  { label: 'ホーム', href: '/', frontIcon: 'mdi-home' },
  { label: '受信トレイ', href: '/inbox', frontIcon: 'mdi-email-outline' },
  {
    label: '外部サイト',
    href: 'https://design.digital.go.jp/dads/',
    frontIcon: 'mdi-link',
    tailIcon: 'mdi-open-in-new',
    tailIconLabel: '新規タブで開きます',
  },
  { label: '設定', href: '/settings', frontIcon: 'mdi-cog', endIcon: 'mdi-chevron-right' },
]

const lastClicked = ref('')
const onClickItem = (item) => {
  lastClicked.value = item.label
}
</script>

<div class="demo">
  <DadsMenuList :items="basicItems" />
</div>

```vue
<script setup>
import { DadsMenuList } from '@dads/vue'

const items = [
  { label: 'ホーム', href: '/' },
  { label: '商品一覧', href: '/products' },
  { label: 'サポート', href: '/support' },
]
</script>

<template>
  <DadsMenuList :items="items" />
</template>
```

## 現在地のハイライト (active)

`active: true` を渡した項目は強調表示され、`aria-current="page"` が自動付与される。

<div class="demo">
  <DadsMenuList :items="currentItems" />
</div>

```ts
const items = [
  { label: 'ホーム', href: '/' },
  { label: '商品一覧', href: '/products', active: true },
  { label: 'サポート', href: '/support' },
]
```

## 非活性項目 (disabled)

`disabled: true` を渡した項目はクリック・ナビゲーションが抑止される。`href` を持っていても `<button disabled>` として描画される。

<div class="demo">
  <DadsMenuList :items="disabledItems" />
</div>

## サイズとスタイル

`size` (`regular` / `small`) と `type` (`standard` / `box`) でバリアントを切り替える。デフォルトは `regular` / `standard`。

<div class="demo">
  <span class="demo-label">standard / regular (default)</span>
  <DadsMenuList :items="sizeItems" />
  <span class="demo-label" style="margin-top:1rem">standard / small</span>
  <DadsMenuList :items="sizeItems" size="small" />
  <span class="demo-label" style="margin-top:1rem">box / regular</span>
  <DadsMenuList :items="sizeItems" type="box" />
</div>

```vue
<DadsMenuList :items="items" size="small" />
<DadsMenuList :items="items" type="box" />
```

## ネスト (子メニュー)

`children` を持つ項目は再帰的にネスト描画される。`--menu-list-indentation` が自動で 1 ずつ加算されるためインデント幅が制御される。`expanded: true` を付けると `data-expanded` 属性と `aria-expanded="true"` が付与される (end-icon は 180 度回転する)。

<div class="demo">
  <DadsMenuList :items="nestedItems" />
</div>

```ts
const items = [
  { label: '項目 1', href: '/1' },
  {
    label: '項目 2',
    expanded: true,
    endIcon: 'mdi-chevron-up',
    children: [
      { label: '項目 2-1', href: '/2/1' },
      { label: '項目 2-2', href: '/2/2', active: true },
    ],
  },
]
```

## アイコン

`frontIcon` (項目先頭) / `tailIcon` (ラベル末尾) / `endIcon` (項目末尾) に Material Design Icons のクラス名を渡せる。`tailIconLabel` を付けると `role="img"` + `aria-label` で読み上げ対象になる (外部リンクアイコン等)。  
※ カタログ側では `@mdi/font` を読み込んでいないため見た目は表示されない。利用側で CSS を読み込む前提。

```vue
<DadsMenuList :items="iconItems" aria-label="サイドナビゲーション" />
```

```ts
const iconItems = [
  { label: 'ホーム', href: '/', frontIcon: 'mdi-home' },
  {
    label: '外部サイト',
    href: 'https://design.digital.go.jp/dads/',
    frontIcon: 'mdi-link',
    tailIcon: 'mdi-open-in-new',
    tailIconLabel: '新規タブで開きます',
  },
  { label: '設定', href: '/settings', frontIcon: 'mdi-cog', endIcon: 'mdi-chevron-right' },
]
```

## クリックイベント

`click:item` でリンク / ボタンクリックを検知できる。`disabled` 項目では発火しない。ネストした子項目のクリックもルートまでバブリングする。

<div class="demo">
  <DadsMenuList :items="basicItems" @click:item="onClickItem" />
  <span class="demo-label" style="margin-top:0.5rem">最後にクリックされた項目: {{ lastClicked || '(none)' }}</span>
</div>

```vue
<DadsMenuList :items="items" @click:item="(item, event) => console.log(item.label)" />
```

## nav ラッパとして使う

`ariaLabel` を渡すと `<nav aria-label="...">` でリストを包み、独立したナビゲーションランドマークとして扱える。

```vue
<DadsMenuList :items="items" aria-label="セクション内ナビゲーション" />
```

## Props

| Prop          | 型                     | デフォルト   | 説明                                                               |
| ------------- | ---------------------- | ------------ | ------------------------------------------------------------------ |
| `items`       | `DadsMenuListItem[]`   | (必須)       | メニュー項目配列                                                   |
| `type`        | `'standard' \| 'box'`  | `'standard'` | 項目スタイル (角丸 / 矩形)                                         |
| `size`        | `'regular' \| 'small'` | `'regular'`  | 項目サイズ                                                         |
| `indentation` | `number`               | `0`          | `--menu-list-indentation` の初期値 (ネスト時は子で自動加算される)  |
| `ariaLabel`   | `string`               | -            | 指定すると `<nav aria-label="...">` でラップし、ランドマーク化する |

### `DadsMenuListItem`

| Key             | 型                   | 説明                                                                       |
| --------------- | -------------------- | -------------------------------------------------------------------------- |
| `label`         | `string`             | 表示テキスト (必須)                                                        |
| `href`          | `string`             | 指定時は `<a href>` でレンダリング、未指定なら `<button>`                  |
| `active`        | `boolean`            | 現在地ハイライト。`aria-current="page"` も付与                             |
| `disabled`      | `boolean`            | 操作不可化。`href` があっても `<button disabled>` として描画               |
| `frontIcon`     | `string`             | 項目先頭のアイコン (MDI クラス名)                                          |
| `tailIcon`      | `string`             | ラベル末尾の補助アイコン (MDI クラス名)                                    |
| `tailIconLabel` | `string`             | tail icon に `role="img"` + `aria-label` を付与し読み上げ対象にする        |
| `endIcon`       | `string`             | 項目末尾のアイコン (`expanded` 時は 180 度回転)                            |
| `expanded`      | `boolean`            | 子メニューが展開中であることを示す。`data-expanded` / `aria-expanded` 付与 |
| `children`      | `DadsMenuListItem[]` | 子メニュー。再帰的に `<DadsMenuList>` として描画される                     |

## Events

| Event        | Payload                                       | 説明                                                                                     |
| ------------ | --------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `click:item` | `(item: DadsMenuListItem, event: MouseEvent)` | 有効な項目クリック時に発火 (`disabled` 項目は対象外)。ネストの子項目もルートで受け取れる |

## アクセシビリティ

- 項目は `<a>` (リンク) または `<button>` (アクション) で描画し、ネイティブのキーボード操作・支援技術への露出が確保される
- `active: true` の項目には `aria-current="page"` を付与し、スクリーンリーダーに現在地として伝える
- 子を持つ `<button>` には `aria-expanded` を付与し、展開状態を支援技術に通知する
- アイコンは既定で `aria-hidden="true"`。`tailIconLabel` を指定したときのみ `role="img"` + `aria-label` で読み上げ対象になる
- `ariaLabel` を渡すと `<nav>` ランドマークとなり、ページ内に複数のナビゲーションがあっても識別できる
- フォーカスリングはキーボード操作時のみ表示される共通スタイル (黒アウトライン + 黄色 outer ring)
