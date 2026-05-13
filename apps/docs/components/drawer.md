# Drawer

モーダルな左サイドナビゲーション。トリガーから `v-model` で開閉し、`items` 配列で項目を宣言する。`children` を持つ項目は 1 段ネストのアコーディオンとして展開される。

## 基本

<script setup>
import { ref } from 'vue'
import { DadsButton, DadsDrawer } from '@dads/vue'

const basicOpen = ref(false)
const basicItems = [
  { label: 'ホーム', href: '/', icon: 'mdi-home' },
  { label: 'タスク', href: '/tasks', icon: 'mdi-checkbox-marked-outline' },
  { label: '設定', icon: 'mdi-cog' },
]

const titledOpen = ref(false)

const nestedOpen = ref(false)
const nestedItems = [
  { label: 'ホーム', href: '/', icon: 'mdi-home' },
  {
    label: 'プロジェクト',
    icon: 'mdi-folder-outline',
    children: [
      { label: '一覧', href: '/projects' },
      { label: '新規作成', href: '/projects/new' },
    ],
  },
  {
    label: 'レポート',
    icon: 'mdi-chart-bar',
    children: [
      { label: '月次', href: '/reports/monthly' },
      { label: '年次', href: '/reports/annual' },
    ],
  },
]

const disabledOpen = ref(false)
const disabledItems = [
  { label: '利用可能', href: '/ok' },
  { label: '準備中', href: '/wip', disabled: true },
  { label: '無効ボタン', disabled: true },
]

const callbackOpen = ref(false)
const lastClicked = ref('')
const callbackItems = [
  { label: 'A を選ぶ', onClick: () => { lastClicked.value = 'A' } },
  { label: 'B を選ぶ', onClick: () => { lastClicked.value = 'B' } },
  { label: 'C を選ぶ', onClick: () => { lastClicked.value = 'C' } },
]

const customCloseOpen = ref(false)
</script>

<div class="demo">
  <DadsButton @click="basicOpen = true">メニューを開く</DadsButton>
  <DadsDrawer v-model="basicOpen" :items="basicItems" />
</div>

```vue
<script setup>
import { ref } from 'vue'
import { DadsButton, DadsDrawer } from '@dads/vue'

const open = ref(false)
const items = [
  { label: 'ホーム', href: '/', icon: 'mdi-home' },
  { label: 'タスク', href: '/tasks' },
  { label: '設定', icon: 'mdi-cog' },
]
</script>

<template>
  <DadsButton @click="open = true">メニューを開く</DadsButton>
  <DadsDrawer v-model="open" :items="items" />
</template>
```

## タイトル付き

`title` を渡すとヘッダに見出しが入り、ダイアログの `aria-label` にも転用される。

<div class="demo">
  <DadsButton @click="titledOpen = true">タイトル付きで開く</DadsButton>
  <DadsDrawer v-model="titledOpen" :items="basicItems" title="メインメニュー" />
</div>

## ネスト項目 (アコーディオン)

項目に `children` を渡すと `<details>` ベースのアコーディオンになる。親項目クリックではドロワーは閉じず、葉項目クリック時のみ自動で閉じる。

<div class="demo">
  <DadsButton @click="nestedOpen = true">ネストメニューを開く</DadsButton>
  <DadsDrawer v-model="nestedOpen" :items="nestedItems" title="サイトメニュー" />
</div>

## 無効化された項目

`disabled: true` の項目はクリック・ナビゲーションが無効化され、`click:item` も発火しない。

<div class="demo">
  <DadsButton @click="disabledOpen = true">無効項目を含むメニューを開く</DadsButton>
  <DadsDrawer v-model="disabledOpen" :items="disabledItems" title="状態の例" />
</div>

## クリックコールバック

`href` の無い項目には `onClick` を渡して任意の処理を行える。葉項目なのでクリック後はドロワーが自動で閉じる。

<div class="demo">
  <DadsButton @click="callbackOpen = true">コールバックメニューを開く</DadsButton>
  <span class="demo-label">最後に選択: {{ lastClicked || '(なし)' }}</span>
  <DadsDrawer v-model="callbackOpen" :items="callbackItems" title="選択肢" />
</div>

## 閉じるボタンのラベル

`closeLabel` で閉じるボタンの `aria-label` を上書きできる (デフォルト: `閉じる`)。

<div class="demo">
  <DadsButton @click="customCloseOpen = true">カスタムラベルで開く</DadsButton>
  <DadsDrawer
    v-model="customCloseOpen"
    :items="basicItems"
    title="メニュー"
    close-label="Close menu"
  />
</div>

## Props

| Prop         | 型                 | デフォルト | 説明                                                           |
| ------------ | ------------------ | ---------- | -------------------------------------------------------------- |
| `modelValue` | `boolean`          | `false`    | 開閉状態 (`v-model` 対応)                                      |
| `items`      | `DadsDrawerItem[]` | -          | 表示する項目配列 (必須)                                        |
| `title`      | `string`           | -          | ヘッダの見出し。未指定時の `aria-label` フォールバックにもなる |
| `closeLabel` | `string`           | `'閉じる'` | 閉じるボタンの `aria-label`                                    |

### `DadsDrawerItem`

| Key        | 型                            | 説明                                                               |
| ---------- | ----------------------------- | ------------------------------------------------------------------ |
| `label`    | `string`                      | 表示テキスト (必須・スクリーンリーダーに読み上げられる)            |
| `href`     | `string`                      | 指定時は `<a href>` でレンダリング                                 |
| `onClick`  | `(event: MouseEvent) => void` | 任意のクリックハンドラ                                             |
| `disabled` | `boolean`                     | 視覚的に dim 化し、ナビゲーション・イベントを抑止                  |
| `children` | `DadsDrawerItem[]`            | 子項目。指定時は `<details>` アコーディオンとして展開 (1 段ネスト) |
| `icon`     | `string`                      | Material Design Icons のクラス名 (例: `'mdi-home'`)                |

## Events

| Event               | Payload                                   | 説明                                                               |
| ------------------- | ----------------------------------------- | ------------------------------------------------------------------ |
| `update:modelValue` | `value: boolean`                          | 閉じるボタン / オーバーレイクリック / Esc / 葉項目クリック時に発火 |
| `click:item`        | `item: DadsDrawerItem, event: MouseEvent` | 有効な項目がクリックされたとき発火 (disabled 項目では発火しない)   |

## アクセシビリティ

- ルート要素に `role="dialog"` と `aria-modal="true"` を付与し、ダイアログとして公開する
- `aria-label` は `title` を優先し、未指定時は `'ナビゲーション'` をフォールバックとして使用する
- 開いた直後はパネル要素にフォーカスが移り、Tab / Shift+Tab はドロワー内でフォーカストラップされる
- Esc キーまたはオーバーレイクリックで閉じることができる
- 閉じたあとは、開いた時点でフォーカスを持っていた要素 (トリガーボタン等) に自動で戻る
