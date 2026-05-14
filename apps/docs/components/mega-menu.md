# MegaMenu

ヘッダ等のトップレベルナビゲーションから展開される大型ドロップダウンパネル。複数の **列 (columns)** に分けてメニュー項目を提示し、各列は任意の見出しと `DadsMenuList` で描画されるリンクリストを持つ。

- トリガーボタンをクリックでパネルが開閉する
- Escape キー / 領域外クリックでパネルが閉じる
- 項目クリック時は `click:item` を emit し、自動的にパネルが閉じる

## 基本

`triggerLabel` と `columns` を渡すだけで動作する。v-model でパネルの開閉状態を双方向バインドできる。

<script setup>
import { ref } from 'vue'
import { DadsMegaMenu } from '@dads/vue'

const open = ref(false)
const basicColumns = [
  {
    heading: 'プロダクト',
    items: [
      { label: '概要', href: '/products' },
      { label: '機能一覧', href: '/products/features' },
      { label: '価格', href: '/products/pricing' },
    ],
  },
  {
    heading: 'リソース',
    items: [
      { label: 'ドキュメント', href: '/docs' },
      { label: 'ブログ', href: '/blog' },
      { label: 'ヘルプ', href: '/help' },
    ],
  },
]

const threeColumns = [
  {
    heading: 'プロダクト',
    items: [
      { label: '概要', href: '/products' },
      { label: '機能一覧', href: '/products/features' },
    ],
  },
  {
    heading: 'ソリューション',
    items: [
      { label: '中央省庁', href: '/solutions/national' },
      { label: '地方自治体', href: '/solutions/local' },
      { label: '公共団体', href: '/solutions/public' },
    ],
  },
  {
    heading: 'リソース',
    items: [
      { label: 'ドキュメント', href: '/docs' },
      { label: '事例集', href: '/cases' },
    ],
  },
]

const headlessColumns = [
  {
    items: [
      { label: 'ホーム', href: '/' },
      { label: 'お知らせ', href: '/news' },
    ],
  },
  {
    items: [
      { label: 'お問い合わせ', href: '/contact' },
      { label: 'よくある質問', href: '/faq' },
    ],
  },
]

const controlled = ref(false)

const lastClicked = ref('')
const onClickItem = (item) => {
  lastClicked.value = item.label
}
</script>

<div class="demo">
  <DadsMegaMenu v-model="open" trigger-label="メニュー" :columns="basicColumns" />
</div>

```vue
<script setup>
import { ref } from 'vue'
import { DadsMegaMenu } from '@dads/vue'

const open = ref(false)
const columns = [
  {
    heading: 'プロダクト',
    items: [
      { label: '概要', href: '/products' },
      { label: '機能一覧', href: '/products/features' },
      { label: '価格', href: '/products/pricing' },
    ],
  },
  {
    heading: 'リソース',
    items: [
      { label: 'ドキュメント', href: '/docs' },
      { label: 'ブログ', href: '/blog' },
      { label: 'ヘルプ', href: '/help' },
    ],
  },
]
</script>

<template>
  <DadsMegaMenu v-model="open" trigger-label="メニュー" :columns="columns" />
</template>
```

## 列 (columns)

`columns` 配列の各要素は `{ heading?: string; items: DadsMenuListItem[] }` を満たす。列の数に応じてグリッドが自動で展開される (`auto-fit` で `minmax(12rem, 1fr)`)。

### 3 列

<div class="demo">
  <DadsMegaMenu trigger-label="サービス" :columns="threeColumns" />
</div>

### 見出しなし

`heading` を省略すると列ヘッダ行が描画されず、リストだけが並ぶ。

<div class="demo">
  <DadsMegaMenu trigger-label="クイックリンク" :columns="headlessColumns" />
</div>

## 制御

`v-model` でパネルの開閉状態を制御できる。外部から開閉トリガーを差し込みたい場合は `modelValue` を直接書き換えればよい。

<div class="demo">
  <div class="demo-row">
    <button class="demo-button" @click="controlled = !controlled">
      外部から {{ controlled ? '閉じる' : '開く' }}
    </button>
    <DadsMegaMenu v-model="controlled" trigger-label="メニュー (制御)" :columns="basicColumns" />
  </div>
  <span class="demo-label" style="margin-top:0.5rem">現在の状態: {{ controlled ? 'open' : 'closed' }}</span>
</div>

```vue
<script setup>
import { ref } from 'vue'

const open = ref(false)
</script>

<template>
  <button @click="open = !open">外部トリガー</button>
  <DadsMegaMenu v-model="open" trigger-label="メニュー" :columns="columns" />
</template>
```

## クリックイベント

`click:item` でメニュー項目クリックを検知できる。`disabled` の項目では発火しない。クリック後はパネルが自動で閉じる。

<div class="demo">
  <DadsMegaMenu trigger-label="メニュー" :columns="basicColumns" @click:item="onClickItem" />
  <span class="demo-label" style="margin-top:0.5rem">最後にクリックされた項目: {{ lastClicked || '(none)' }}</span>
</div>

```vue
<DadsMegaMenu
  trigger-label="メニュー"
  :columns="columns"
  @click:item="(item, event) => console.log(item.label)"
/>
```

## Props

| Prop           | 型                     | デフォルト | 説明                                                                         |
| -------------- | ---------------------- | ---------- | ---------------------------------------------------------------------------- |
| `modelValue`   | `boolean`              | `false`    | パネルの開閉状態 (v-model)                                                   |
| `triggerLabel` | `string`               | (必須)     | トリガーボタンに表示するテキスト                                             |
| `columns`      | `DadsMegaMenuColumn[]` | (必須)     | 列定義。`{ heading?: string; items: DadsMenuListItem[] }` の配列             |
| `ariaLabel`    | `string`               | -          | パネルの `aria-label`。未指定時は `triggerLabel` を `aria-labelledby` で参照 |

### `DadsMegaMenuColumn`

| Key       | 型                   | 説明                                           |
| --------- | -------------------- | ---------------------------------------------- |
| `heading` | `string`             | 列の見出し。省略時は見出し行を描画しない       |
| `items`   | `DadsMenuListItem[]` | 列内に並ぶメニュー項目 (`DadsMenuList` に委譲) |

## Events

| Event               | Payload                                       | 説明                                                              |
| ------------------- | --------------------------------------------- | ----------------------------------------------------------------- |
| `update:modelValue` | `(value: boolean)`                            | パネルの開閉が変化したときに発火 (v-model 同期)                   |
| `click:item`        | `(item: DadsMenuListItem, event: MouseEvent)` | パネル内の項目がクリックされたときに発火。`disabled` 項目は対象外 |

## アクセシビリティ

- トリガーボタンに `aria-expanded` / `aria-controls` / `aria-haspopup="dialog"` が付与される
- パネルは `role="dialog"` でラベル付けされ、`ariaLabel` 未指定時はトリガーラベルが `aria-labelledby` 経由で読み上げられる
- Escape キー押下でパネルが閉じ、フォーカスは元のトリガーボタンに戻る
- 領域外クリック (`pointerdown` 監視) でもパネルが閉じる
- パネル内の各列は `DadsMenuList` を内包するため、メニューリストのキーボード操作・`aria-current` 等のアクセシビリティ要件をそのまま継承する
- フォーカスリングは共通スタイル (黒アウトライン + 黄色 outer ring) でキーボード操作時のみ表示
