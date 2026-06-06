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

## Size

3 サイズ (`sm` / `md` / `lg`)。デフォルトは `md`。

<div class="demo">
  <div class="demo-row">
    <DadsChipLabel size="sm">SM</DadsChipLabel>
    <DadsChipLabel size="md">MD</DadsChipLabel>
    <DadsChipLabel size="lg">LG</DadsChipLabel>
  </div>
</div>

## Color

5 つの semantic color (`primary` / `success` / `error` / `warning` / `secondary`)。デフォルトは `primary`。

<div class="demo">
  <div class="demo-row">
    <DadsChipLabel color="primary">Primary</DadsChipLabel>
    <DadsChipLabel color="success">Success</DadsChipLabel>
    <DadsChipLabel color="error">Error</DadsChipLabel>
    <DadsChipLabel color="warning">Warning</DadsChipLabel>
    <DadsChipLabel color="secondary">Secondary</DadsChipLabel>
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

| Prop    | 型                                                              | デフォルト  | 説明                 |
| ------- | --------------------------------------------------------------- | ----------- | -------------------- |
| `size`  | `'lg' \| 'md' \| 'sm'`                                          | `'md'`      | サイズ               |
| `color` | `'primary' \| 'success' \| 'error' \| 'warning' \| 'secondary'` | `'primary'` | セマンティックカラー |

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
