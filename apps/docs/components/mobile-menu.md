# MobileMenu

タッチスクリーンでのタップ操作を考慮したモバイル向けメニュー。Header のハンバーガーメニューボタンと組み合わせて使い、Header 下に全幅オーバーレイとしてスライドダウン表示する。Drawer (横スライド) とは別役割。

## 基本

`modelValue` (v-model) で開閉を制御。`items` には DadsMenuList と同じ形の項目を渡す。

<script setup>
import { ref } from 'vue'
import { DadsMobileMenu, DadsButton } from '@dads/vue'

const open = ref(false)
const items = [
  { label: 'ホーム', href: '/' },
  { label: 'サービス', href: '/services' },
  { label: 'お知らせ', href: '/news' },
  { label: 'よくあるご質問', href: '/faq' },
]

const utilityItems = [
  { label: 'ログイン', href: '/login', iconName: 'mdi-login' },
  { label: 'お問い合わせ', href: '/contact', iconName: 'mdi-email-outline' },
]

const open2 = ref(false)
const open3 = ref(false)
const open4 = ref(false)
const lastClick = ref('')
const onClickItem = (item) => { lastClick.value = item.label }

const nestedItems = [
  { label: 'ホーム', href: '/' },
  {
    label: 'サービス',
    children: [
      { label: 'サービス一覧', href: '/services' },
      { label: '料金プラン', href: '/services/pricing' },
      { label: '事例紹介', href: '/services/cases' },
    ],
  },
  {
    label: 'サポート',
    children: [
      { label: 'よくあるご質問', href: '/faq' },
      { label: 'お問い合わせ', href: '/contact' },
    ],
  },
  { label: 'お知らせ', href: '/news' },
]
</script>

<div class="demo">
  <DadsButton @click="open = true">メニューを開く</DadsButton>
  <DadsMobileMenu v-model="open" :items="items" />
</div>

```vue
<script setup>
import { ref } from 'vue'
import { DadsMobileMenu } from '@dads/vue'

const open = ref(false)
const items = [
  { label: 'ホーム', href: '/' },
  { label: 'サービス', href: '/services' },
  { label: 'お知らせ', href: '/news' },
]
</script>

<template>
  <button @click="open = true">メニューを開く</button>
  <DadsMobileMenu v-model="open" :items="items" />
</template>
```

## utilityItems

`utilityItems` には DadsUtilityLink と同じ形の補助リンク (ログイン / お問い合わせ等) を渡せる。メニュー下部にディバイダー付きで表示される。

<div class="demo">
  <DadsButton @click="open2 = true">補助リンク付きで開く</DadsButton>
  <DadsMobileMenu v-model="open2" :items="items" :utility-items="utilityItems" />
</div>

```vue
<DadsMobileMenu
  v-model="open"
  :items="items"
  :utility-items="[
    { label: 'ログイン', href: '/login' },
    { label: 'お問い合わせ', href: '/contact' },
  ]"
/>
```

## 制御

`click:item` / `click:utility` を購読することで、項目選択時の振る舞いをカスタマイズできる。
リーフ項目 (children を持たない項目) のクリック後はメニューが自動でクローズされる。

<div class="demo">
  <DadsButton @click="open3 = true">制御デモを開く</DadsButton>
  <div style="margin-top: 0.5rem; font-size: 0.875rem; color: var(--color-neutral-solid-gray-700, #555)">
    last click: {{ lastClick || '(none)' }}
  </div>
  <DadsMobileMenu v-model="open3" :items="items" @click:item="onClickItem" />
</div>

```vue
<DadsMobileMenu v-model="open" :items="items" @click:item="onClickItem" />
```

## メニュー種別 (type) [NEW]

公式 DADS は 2 つの主要タイプを定義する (`type` プロップ、デフォルト `'accordion'`)。

- **`accordion`** (デフォルト): 親項目を展開すると子項目がインデントされた **インライン アコーディオン** として表示される。階層が浅いメニューに適している。
- **`slide`**: 親項目をクリックすると **子項目だけを表示する新パネル** にスライド遷移し、戻るボタンで前パネルに戻る。3 階層以上の深いメニューや、各階層で大量の項目を扱う場合に適している。

<div class="demo">
  <DadsButton @click="open4 = true">スライド型メニューを開く</DadsButton>
  <DadsMobileMenu v-model="open4" :items="nestedItems" type="slide" />
</div>

```vue
<DadsMobileMenu v-model="open" :items="nestedItems" type="slide" />
```

slide モード:

- 親項目右端にシェブロン (▶) を表示
- パネル切替時、ヘッダに `<h2>` で親項目ラベルを表示
- ヘッダ左に「戻る」ボタンを表示 (`backLabel` でラベルカスタマイズ可能、デフォルト `'戻る'`)
- 閉じて再度開くとパネルスタックが root にリセットされる
- 親項目クリックでは `click:item` イベントは発火せず、子パネルに遷移するのみ
- リーフ項目クリックでは `click:item` 発火 + メニュークローズ (accordion と同じ)

## Props

| Prop              | 型                       | デフォルト           | 説明                                                                 |
| ----------------- | ------------------------ | -------------------- | -------------------------------------------------------------------- |
| `modelValue`      | `boolean`                | `false`              | 開閉状態 (v-model)                                                   |
| `items`           | `DadsMobileMenuItem[]`   | -                    | 主ナビゲーション項目 (`DadsMenuListItem` と同形・必須)               |
| `type`            | `'accordion' \| 'slide'` | `'accordion'`        | メニュー種別 (公式 DADS の 2 主要タイプ)                             |
| `utilityItems`    | `DadsUtilityLinkItem[]`  | -                    | 補助リンク (ログイン / お問い合わせ等)。指定時のみメニュー下部に描画 |
| `ariaLabel`       | `string`                 | `'モバイルメニュー'` | ルート要素の `aria-label`                                            |
| `closeLabel`      | `string`                 | `'閉じる'`           | クローズボタンの `aria-label`                                        |
| `backLabel`       | `string`                 | `'戻る'`             | 戻るボタンの `aria-label` / 表示テキスト (`type='slide'` のみ使用)   |
| `showCloseButton` | `boolean`                | `true`               | クローズボタンの表示。`false` 時は Header 側で開閉制御する想定       |

## Events

| Event               | Payload                                                         | 説明                                   |
| ------------------- | --------------------------------------------------------------- | -------------------------------------- |
| `update:modelValue` | `boolean`                                                       | v-model 用。開閉状態が変化したとき発火 |
| `click:item`        | `(item: DadsMobileMenuItem, event: MouseEvent)`                 | メイン項目クリック時                   |
| `click:utility`     | `(item: DadsUtilityLinkItem, index: number, event: MouseEvent)` | 補助リンククリック時                   |

## アクセシビリティ

- ルートに `role="dialog"` + `aria-modal="true"` を付与し、モーダル相当として扱う
- Escape キー押下で閉じる (`update:modelValue=false` 発火)
- 開いた時点で内部のパネルにフォーカスを移し、`Tab` / `Shift+Tab` でメニュー外にフォーカスが抜けないようトラップする
- 閉じた時、メニューを開いたトリガー要素にフォーカスを戻す
- メイン項目は `DadsMenuList`、補助リンクは `DadsUtilityLink` を内部で利用し、それぞれのアクセシビリティ仕様 (`aria-current` / `target="_blank"` のとき `rel="noopener noreferrer"` 等) を継承する
- リーフ項目クリック時は自動でクローズし、ページ遷移後にメニューが残らないようにする
