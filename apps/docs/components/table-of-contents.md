# TableOfContents

ページ内の見出しへのアンカーリンク (目次 / Table of Contents) を表すナビゲーション。長い記事や仕様ページの右側に配置し、`href="#section-id"` でページ内の各セクションへジャンプする。`activeId` を指定すると現在地のセクションがハイライトされ、`aria-current="location"` が付与される。

> 旧 `DadsPageNavigation` (TOC) はこの `DadsTableOfContents` にリネームされた。Figma 公式 `Page Navigation` フレームは pagination (ページ送り) のため、新しい `DadsPageNavigation` は pagination 用途で再実装されている。

## 基本

`items` 配列に `{ id, label }` の組を渡すだけで使える。`href` を省略すると自動で `#${id}` が href に展開されるため、ページ内アンカーリンクとして即利用できる。

<script setup>
import { ref } from 'vue'
import { DadsTableOfContents } from '@dads/vue'

const items = [
  { id: 'intro', label: 'はじめに' },
  { id: 'usage', label: '使い方' },
  { id: 'api', label: 'API' },
  { id: 'accessibility', label: 'アクセシビリティ' },
]

const nestedItems = [
  {
    id: 'getting-started',
    label: 'Getting Started',
    children: [
      { id: 'install', label: 'インストール' },
      { id: 'setup', label: 'セットアップ' },
    ],
  },
  {
    id: 'reference',
    label: 'リファレンス',
    children: [
      { id: 'props', label: 'Props' },
      { id: 'events', label: 'Events' },
    ],
  },
  { id: 'faq', label: 'FAQ' },
]

const activeId = ref('usage')
const lastClicked = ref('')
const onItemClick = (item) => {
  activeId.value = item.id
  lastClicked.value = `${item.id}: ${item.label}`
}
</script>

<div class="demo">
  <DadsTableOfContents :items="items" />
</div>

```vue
<script setup>
import { DadsTableOfContents } from '@dads/vue'

const items = [
  { id: 'intro', label: 'はじめに' },
  { id: 'usage', label: '使い方' },
  { id: 'api', label: 'API' },
]
</script>

<template>
  <DadsTableOfContents :items="items" />
</template>
```

## ネスト

`children` プロパティで 1 階層のネストを表現できる。子項目は左に縦罫線とインデントが付き、視覚的に親子関係を表す。

<div class="demo">
  <DadsTableOfContents :items="nestedItems" />
</div>

```ts
const items = [
  {
    id: 'getting-started',
    label: 'Getting Started',
    children: [
      { id: 'install', label: 'インストール' },
      { id: 'setup', label: 'セットアップ' },
    ],
  },
  { id: 'faq', label: 'FAQ' },
]
```

## activeId

現在地のセクション id を `activeId` で渡すと、その項目に `aria-current="location"` が付与され、ハイライト表示される。scroll-spy などの仕組みは呼び出し側で実装する想定 (`IntersectionObserver` 等)。

<div class="demo">
  <DadsTableOfContents :items="items" :active-id="activeId" @click:item="onItemClick" />
  <span class="demo-label" style="margin-top:0.5rem">activeId: {{ activeId }} / 最後にクリック: {{ lastClicked || '(none)' }}</span>
</div>

```vue
<script setup>
import { ref } from 'vue'
import { DadsTableOfContents } from '@dads/vue'

const activeId = ref('usage')
const onItemClick = (item) => {
  activeId.value = item.id
}
</script>

<template>
  <DadsTableOfContents :items="items" :active-id="activeId" @click:item="onItemClick" />
</template>
```

## カスタム href

外部リンクや別ページのアンカーを指す場合は `href` を明示する。`href` が指定されていれば、そちらが優先される。

```ts
const items = [
  { id: 'intro', label: 'はじめに' }, // href: '#intro' (自動)
  { id: 'spec', label: '仕様書', href: '/spec/' }, // 別ページへ
  { id: 'gh', label: 'GitHub', href: 'https://github.com/example' },
]
```

## aria-label のカスタマイズ

`ariaLabel` で `<nav>` 要素の `aria-label` を上書きする。デフォルトは `'このページの目次'`。

```vue
<DadsTableOfContents :items="items" aria-label="On this page" />
```

## Props

| Prop        | 型                          | デフォルト           | 説明                                                              |
| ----------- | --------------------------- | -------------------- | ----------------------------------------------------------------- |
| `items`     | `DadsTableOfContentsItem[]` | (必須)               | 目次項目。フラット / ネストいずれにも対応                         |
| `activeId`  | `string`                    | `undefined`          | 現在アクティブなセクションの `id`。一致する項目がハイライトされる |
| `ariaLabel` | `string`                    | `'このページの目次'` | `<nav>` 要素の `aria-label`                                       |

### `DadsTableOfContentsItem`

| プロパティ | 型                          | デフォルト | 説明                                             |
| ---------- | --------------------------- | ---------- | ------------------------------------------------ |
| `id`       | `string`                    | (必須)     | ページ内 fragment 識別子                         |
| `label`    | `string`                    | (必須)     | 表示テキスト                                     |
| `href`     | `string`                    | `#${id}`   | リンク先 URL。省略時は `#${id}` が自動で使われる |
| `children` | `DadsTableOfContentsItem[]` | -          | ネストした子項目                                 |

## Events

| Event        | Payload                                              | 説明                                       |
| ------------ | ---------------------------------------------------- | ------------------------------------------ |
| `click:item` | `(item: DadsTableOfContentsItem, event: MouseEvent)` | 目次のリンクがクリックされたときに発火する |

## アクセシビリティ

- ルート要素は `<nav>` で、デフォルトで `aria-label="このページの目次"` が付与される (`ariaLabel` で上書き可能)
- `activeId` に一致する項目には `aria-current="location"` が付与される (W3C で定められたページ内アンカー向けの値)
- リンクはキーボードフォーカス可能で、フォーカス時には共通のフォーカスリングが表示される
- forced-colors モードではシステムのリンクカラー (`LinkText`) と Highlight 色が使用される
- ネストした子項目も同じ `aria-current` ルールに従う。1 ページに複数の目次を置く場合は `ariaLabel` で識別可能な名称を必ず付けること
