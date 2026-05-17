# PageNavigation

ページ送り (pagination) を表すナビゲーション。検索結果やテーブル、アーカイブの一覧などで「現在ページ / 総ページ数」を提示し、前後のページや任意のページへ移動できる。Figma 公式 `Page Navigation` フレーム準拠。

> ページ内目次 (Table of Contents) を表現したい場合は [`DadsTableOfContents`](./table-of-contents.md) を使用する。

## 基本

`modelValue` (1-indexed の現在ページ) と `totalPages` を渡すだけで使える。前後ボタン + ページ番号ボタンが描画され、`update:modelValue` イベントで現在ページが更新される。

<script setup>
import { ref } from 'vue'
import { DadsPageNavigation } from '@dads/vue'

const page1 = ref(1)
const page2 = ref(10)
const page3 = ref(50)
const page4 = ref(1)
const page5 = ref(5)
</script>

<div class="demo">
  <DadsPageNavigation v-model="page1" :total-pages="5" />
  <span class="demo-label" style="margin-top:0.5rem">現在ページ: {{ page1 }} / 5</span>
</div>

```vue
<script setup>
import { ref } from 'vue'
import { DadsPageNavigation } from '@dads/vue'

const page = ref(1)
</script>

<template>
  <DadsPageNavigation v-model="page" :total-pages="5" />
</template>
```

## 大量ページ (省略表示)

`totalPages > maxPageButtons` (既定 7) のとき、現在ページ前後 + 先頭/末尾を残して `…` で省略表示される。

<div class="demo">
  <DadsPageNavigation v-model="page2" :total-pages="50" />
  <span class="demo-label" style="margin-top:0.5rem">現在ページ: {{ page2 }} / 50</span>
</div>

```vue
<DadsPageNavigation v-model="page" :total-pages="50" />
```

## 最初 / 最後ボタン

`showFirstLast` を有効にすると、`<<` / `>>` のジャンプボタンが追加される。

<div class="demo">
  <DadsPageNavigation v-model="page3" :total-pages="100" show-first-last />
  <span class="demo-label" style="margin-top:0.5rem">現在ページ: {{ page3 }} / 100</span>
</div>

```vue
<DadsPageNavigation v-model="page" :total-pages="100" show-first-last />
```

## ページ番号を非表示にする

`maxPageButtons="0"` を渡すと、ページ番号ボタンを描画せず前後ボタンのみのシンプルな pagination になる。長い記事の前後ページ移動などに適している。

<div class="demo">
  <DadsPageNavigation v-model="page4" :total-pages="10" :max-page-buttons="0" />
  <span class="demo-label" style="margin-top:0.5rem">現在ページ: {{ page4 }} / 10</span>
</div>

```vue
<DadsPageNavigation v-model="page" :total-pages="10" :max-page-buttons="0" />
```

## disabled

`disabled` を渡すとすべてのボタンが操作不能になる。

<div class="demo">
  <DadsPageNavigation v-model="page5" :total-pages="10" disabled />
</div>

```vue
<DadsPageNavigation v-model="page" :total-pages="10" disabled />
```

## Props

| Prop             | 型        | デフォルト       | 説明                                                                   |
| ---------------- | --------- | ---------------- | ---------------------------------------------------------------------- |
| `modelValue`     | `number`  | (必須)           | 1-indexed の現在ページ番号 (v-model)                                   |
| `totalPages`     | `number`  | (必須)           | 総ページ数 (1 以上)                                                    |
| `maxPageButtons` | `number`  | `7`              | 同時に表示するページ番号ボタンの最大数。`0` でページ番号を非表示にする |
| `showPrevNext`   | `boolean` | `true`           | 前後ボタンの表示                                                       |
| `showFirstLast`  | `boolean` | `false`          | 最初 / 最後ボタンの表示                                                |
| `prevLabel`      | `string`  | `'前のページ'`   | 前ボタンのラベル                                                       |
| `nextLabel`      | `string`  | `'次のページ'`   | 次ボタンのラベル                                                       |
| `firstLabel`     | `string`  | `'最初のページ'` | 最初ボタンの aria-label                                                |
| `lastLabel`      | `string`  | `'最後のページ'` | 最後ボタンの aria-label                                                |
| `ariaLabel`      | `string`  | `'ページ送り'`   | `<nav>` 要素の `aria-label`                                            |
| `disabled`       | `boolean` | `false`          | すべてのボタンを無効化                                                 |

## Events

| Event               | Payload    | 説明                                         |
| ------------------- | ---------- | -------------------------------------------- |
| `update:modelValue` | `(number)` | 現在ページが変わったとき (v-model)           |
| `change`            | `(number)` | `update:modelValue` と同タイミングで発火する |

## アクセシビリティ

- ルート要素は `<nav>` で `aria-label="ページ送り"` が付与される (`ariaLabel` で上書き可能)
- 現在ページのボタンに `aria-current="page"` が付与される
- 最初/最後ボタンは見た目がアイコンのみのため `aria-label` (`firstLabel` / `lastLabel`) が付与される
- 端 (最初/最後ページ) では前後ボタンが native `disabled` 属性で操作不能
- すべてのボタンはキーボードフォーカス可能で、フォーカス時に共通のフォーカスリングが表示される
- forced-colors モードでは `LinkText` / `Highlight` / `HighlightText` を使ったハイコントラスト表示に切り替わる
