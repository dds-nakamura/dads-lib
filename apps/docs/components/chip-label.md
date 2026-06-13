# ChipLabel

ステータス・カテゴリ・属性を示す **読み取り専用** のラベル要素。クリックや削除のアフォーダンスを持たないため、ユーザが操作するものではなく単に状態を伝えるバッジ用途に使う (「公開中」「未読」「重要」など)。公式 slug は `chip-label`。

対話的にしたい場合 (フィルタや宛先削除など) は [ChipTag](./chip-tag) を使う。

## 基本

<script setup>
import { DadsChipLabel } from '@dads/vue'
</script>

<div class="demo">
  <DadsChipLabel>公開中</DadsChipLabel>
</div>

```vue
<script setup>
import { DadsChipLabel } from '@dads/vue'
</script>

<template>
  <DadsChipLabel>公開中</DadsChipLabel>
</template>
```

> サイズ軸は公式に存在しないため撤廃された。チップラベルは単一サイズ (min-height 32px / font-size 16px) で固定される。

## Color

公式の 11 primitive 色相 (`gray` / `blue` / `light-blue` / `cyan` / `green` / `lime` / `yellow` / `orange` / `red` / `magenta` / `purple`)。デフォルトは `gray`。

<div class="demo">
  <div class="demo-row">
    <DadsChipLabel color="gray">gray</DadsChipLabel>
    <DadsChipLabel color="blue">blue</DadsChipLabel>
    <DadsChipLabel color="light-blue">light-blue</DadsChipLabel>
    <DadsChipLabel color="cyan">cyan</DadsChipLabel>
    <DadsChipLabel color="green">green</DadsChipLabel>
    <DadsChipLabel color="lime">lime</DadsChipLabel>
    <DadsChipLabel color="yellow">yellow</DadsChipLabel>
    <DadsChipLabel color="orange">orange</DadsChipLabel>
    <DadsChipLabel color="red">red</DadsChipLabel>
    <DadsChipLabel color="magenta">magenta</DadsChipLabel>
    <DadsChipLabel color="purple">purple</DadsChipLabel>
  </div>
</div>

## Appearance (style)

公式の 4 種 (`text` / `outline` / `filled-outline` / `fill`)。デフォルトは `text`。

<div class="demo">
  <div class="demo-row">
    <DadsChipLabel color="blue" appearance="text">text</DadsChipLabel>
    <DadsChipLabel color="blue" appearance="outline">outline</DadsChipLabel>
    <DadsChipLabel color="blue" appearance="filled-outline">filled-outline</DadsChipLabel>
    <DadsChipLabel color="blue" appearance="fill">fill</DadsChipLabel>
  </div>
</div>

## アイコン

`prepend` / `append` スロットでアイコンを差し込める。

```vue
<DadsChipLabel color="success">
  <template #prepend>
    <DadsIcon name="check_circle" />
  </template>
  公開中
</DadsChipLabel>
```

## Props

| Prop         | 型                                                                                                                          | デフォルト | 説明                        |
| ------------ | --------------------------------------------------------------------------------------------------------------------------- | ---------- | --------------------------- |
| `color`      | `'gray' \| 'blue' \| 'light-blue' \| 'cyan' \| 'green' \| 'lime' \| 'yellow' \| 'orange' \| 'red' \| 'magenta' \| 'purple'` | `'gray'`   | 公式 primitive 色相 (11 種) |
| `appearance` | `'text' \| 'outline' \| 'filled-outline' \| 'fill'`                                                                         | `'text'`   | 公式 style 軸 (4 種)        |

## Slot

| Slot      | 説明                                                |
| --------- | --------------------------------------------------- |
| `default` | ラベル本文 (テキスト)                               |
| `prepend` | 先頭アイコン。`aria-hidden="true"` が自動付与される |
| `append`  | 末尾アイコン。`aria-hidden="true"` が自動付与される |

## アクセシビリティ

- ルート要素は `<span>` で、対話可能要素にはならない (`tabindex` も付かない)
- `prepend` / `append` スロットは装飾用途のため `aria-hidden="true"` が自動付与される
- ステータスの動的更新を SR に伝える場合は、外側に `aria-live` 領域を別途用意すること (このコンポーネント自体は live region を持たない)
