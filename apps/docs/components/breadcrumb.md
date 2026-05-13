# Breadcrumb

現在地までの階層リンクを表すナビゲーション。最後の項目（現在地）は常に `<span>` として描画され、`aria-current="page"` が付与される。

## 基本

最小構成。`items` 配列の先頭から末尾の順に項目を渡す。末尾の項目に `href` を付けても自動的にリンクにはならず、現在地として描画される。

<script setup>
import { ref } from 'vue'
import { DadsBreadcrumb } from '@dads/vue'

const items = [
  { title: 'ホーム', href: '/' },
  { title: '商品一覧', href: '/products' },
  { title: '商品詳細' },
]

const itemsWithDisabled = [
  { title: 'ホーム', href: '/' },
  { title: 'お知らせ', href: '/news', disabled: true },
  { title: '詳細' },
]

const longItems = [
  { title: 'ホーム', href: '/' },
  { title: '行政手続', href: '/admin' },
  { title: 'マイナンバー', href: '/admin/mynumber' },
  { title: '電子申請', href: '/admin/mynumber/online' },
  { title: '申請フォーム' },
]

const lastClicked = ref('')
const onItemClick = (item, index) => {
  lastClicked.value = `${index}: ${item.title}`
}
</script>

<div class="demo">
  <DadsBreadcrumb :items="items" />
</div>

```vue
<script setup>
import { DadsBreadcrumb } from '@dads/vue'

const items = [
  { title: 'ホーム', href: '/' },
  { title: '商品一覧', href: '/products' },
  { title: '商品詳細' },
]
</script>

<template>
  <DadsBreadcrumb :items="items" />
</template>
```

## Separator

`separator` で項目間の区切り文字を変更する。デフォルトは `'》'`。

<div class="demo">
  <span class="demo-label">デフォルト（》）</span>
  <DadsBreadcrumb :items="items" />
  <span class="demo-label" style="margin-top:1rem">スラッシュ</span>
  <DadsBreadcrumb :items="items" separator="/" />
  <span class="demo-label" style="margin-top:1rem">矢印</span>
  <DadsBreadcrumb :items="items" separator="›" />
</div>

```vue
<DadsBreadcrumb :items="items" separator="/" />
```

## 非活性項目

`disabled: true` の項目は `href` を持っていてもリンクにならず、`aria-disabled="true"` 付きの `<span>` として描画される。

<div class="demo">
  <DadsBreadcrumb :items="itemsWithDisabled" />
</div>

```ts
const items = [
  { title: 'ホーム', href: '/' },
  { title: 'お知らせ', href: '/news', disabled: true },
  { title: '詳細' },
]
```

## 長い階層

階層が深い場合は折り返して表示される（`flex-wrap`）。

<div class="demo">
  <DadsBreadcrumb :items="longItems" />
</div>

## クリックイベント

`click:item` でリンク項目クリックを検知できる。`disabled` 項目および末尾の現在地項目では発火しない。

<div class="demo">
  <DadsBreadcrumb :items="items" @click:item="onItemClick" />
  <span class="demo-label" style="margin-top:0.5rem">最後にクリックされた項目: {{ lastClicked || '(none)' }}</span>
</div>

```vue
<DadsBreadcrumb
  :items="items"
  @click:item="(item, index, event) => console.log(index, item.title)"
/>
```

## aria-label のカスタマイズ

`ariaLabel` で `<nav>` 要素の `aria-label` を上書きする。デフォルトは `'パンくずリスト'`。

```vue
<DadsBreadcrumb :items="items" aria-label="Site navigation" />
```

## Props

| Prop        | 型                     | デフォルト         | 説明                                       |
| ----------- | ---------------------- | ------------------ | ------------------------------------------ |
| `items`     | `DadsBreadcrumbItem[]` | (必須)             | パンくずリスト項目。先頭から末尾の順で渡す |
| `separator` | `string`               | `'》'`             | 項目間の区切り文字                         |
| `ariaLabel` | `string`               | `'パンくずリスト'` | `<nav>` 要素の `aria-label`                |

### `DadsBreadcrumbItem`

| プロパティ | 型        | デフォルト | 説明                                        |
| ---------- | --------- | ---------- | ------------------------------------------- |
| `title`    | `string`  | (必須)     | 表示テキスト                                |
| `href`     | `string`  | -          | リンク先 URL。最後の項目では無視される      |
| `disabled` | `boolean` | `false`    | `true` の場合リンクにならず非活性表示にする |

## Events

| Event        | Payload                                                        | 説明                                                             |
| ------------ | -------------------------------------------------------------- | ---------------------------------------------------------------- |
| `click:item` | `(item: DadsBreadcrumbItem, index: number, event: MouseEvent)` | href 付きリンク項目クリック時に発火。disabled / 末尾項目は対象外 |

## アクセシビリティ

- ルート要素は `<nav>` で、デフォルトで `aria-label="パンくずリスト"` が付与される（`ariaLabel` で上書き可能）
- 末尾の項目（現在地）は常に `<span>` として描画され、`aria-current="page"` が付与される
- `disabled` 項目は `<span aria-disabled="true">` として描画され、クリックイベントを発火しない
- 区切り文字には `aria-hidden="true"` が付与され、スクリーンリーダーには読み上げられない
- リンクはキーボードフォーカス可能で、フォーカス時には共通のフォーカスリングが表示される
