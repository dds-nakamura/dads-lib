# Tooltip

トリガー要素にホバーまたはフォーカスしたときに、補足説明を吹き出しで表示するコンポーネント。`role="tooltip"` と `aria-describedby` を自動付与し、キーボード操作でも同等に表示される。

## 基本

`trigger` スロットにトリガー要素を、デフォルトスロット（または `text` プロップ）に本文を渡す。本文は `<Teleport>` で `document.body` に描画される。

<script setup>
import { DadsTooltip, DadsButton } from '@dads/vue'
</script>

<div class="demo">
  <DadsTooltip text="保存して画面を閉じます">
    <template #trigger>
      <DadsButton variant="outline">ホバーしてください</DadsButton>
    </template>
  </DadsTooltip>
</div>

```vue
<script setup>
import { DadsTooltip, DadsButton } from '@dads/vue'
</script>

<template>
  <DadsTooltip text="保存して画面を閉じます">
    <template #trigger>
      <DadsButton variant="outline">ホバーしてください</DadsButton>
    </template>
  </DadsTooltip>
</template>
```

## デフォルトスロットによる本文指定

`text` プロップの代わりに、デフォルトスロットでリッチな内容を渡せる（スロットが優先される）。

<div class="demo">
  <DadsTooltip>
    <template #trigger>
      <DadsButton variant="outline">スロット本文</DadsButton>
    </template>
    複数行にまたがる<br />ツールチップ本文
  </DadsTooltip>
</div>

```vue
<DadsTooltip>
  <template #trigger>
    <DadsButton variant="outline">スロット本文</DadsButton>
  </template>
  複数行にまたがる<br />ツールチップ本文
</DadsTooltip>
```

## Position

`position` で 8 方向に配置できる (`top` / `top-start` / `top-end` / `bottom` / `bottom-start` / `bottom-end` / `left` / `right`)。デフォルトは `top`。

<div class="demo">
  <span class="demo-label">top 系</span>
  <div class="demo-row">
    <DadsTooltip text="top" position="top">
      <template #trigger><DadsButton variant="outline" size="sm">top</DadsButton></template>
    </DadsTooltip>
    <DadsTooltip text="top-start" position="top-start">
      <template #trigger><DadsButton variant="outline" size="sm">top-start</DadsButton></template>
    </DadsTooltip>
    <DadsTooltip text="top-end" position="top-end">
      <template #trigger><DadsButton variant="outline" size="sm">top-end</DadsButton></template>
    </DadsTooltip>
  </div>
  <span class="demo-label" style="margin-top:1rem">bottom 系</span>
  <div class="demo-row">
    <DadsTooltip text="bottom" position="bottom">
      <template #trigger><DadsButton variant="outline" size="sm">bottom</DadsButton></template>
    </DadsTooltip>
    <DadsTooltip text="bottom-start" position="bottom-start">
      <template #trigger><DadsButton variant="outline" size="sm">bottom-start</DadsButton></template>
    </DadsTooltip>
    <DadsTooltip text="bottom-end" position="bottom-end">
      <template #trigger><DadsButton variant="outline" size="sm">bottom-end</DadsButton></template>
    </DadsTooltip>
  </div>
  <span class="demo-label" style="margin-top:1rem">left / right</span>
  <div class="demo-row">
    <DadsTooltip text="left" position="left">
      <template #trigger><DadsButton variant="outline" size="sm">left</DadsButton></template>
    </DadsTooltip>
    <DadsTooltip text="right" position="right">
      <template #trigger><DadsButton variant="outline" size="sm">right</DadsButton></template>
    </DadsTooltip>
  </div>
</div>

## ディレイ

`openDelay` / `closeDelay` をミリ秒で指定する。途中で離脱・再侵入した場合は保留中のタイマーが自動的にキャンセルされる。

<div class="demo">
  <div class="demo-row">
    <DadsTooltip text="500ms 待ってから表示" :open-delay="500">
      <template #trigger><DadsButton variant="outline">openDelay 500ms</DadsButton></template>
    </DadsTooltip>
    <DadsTooltip text="500ms 経ってから消える" :close-delay="500">
      <template #trigger><DadsButton variant="outline">closeDelay 500ms</DadsButton></template>
    </DadsTooltip>
  </div>
</div>

```vue
<DadsTooltip text="..." :open-delay="500" :close-delay="200">
  <template #trigger>
    <DadsButton>...</DadsButton>
  </template>
</DadsTooltip>
```

## 状態

`disabled` を `true` にすると、ホバー・フォーカスのいずれでもツールチップは開かず、`aria-describedby` も付与されない。

<div class="demo">
  <div class="demo-row">
    <DadsTooltip text="通常状態">
      <template #trigger><DadsButton variant="outline">Default</DadsButton></template>
    </DadsTooltip>
    <DadsTooltip text="表示されません" disabled>
      <template #trigger><DadsButton variant="outline" disabled>Disabled tooltip</DadsButton></template>
    </DadsTooltip>
  </div>
</div>

## Slot

| Slot      | 説明                                                                          |
| --------- | ----------------------------------------------------------------------------- |
| `trigger` | ツールチップの起点となる要素 (button / link / icon など focusable 要素を推奨) |
| default   | ツールチップ本文。指定時は `text` プロップより優先される                      |

## Props

| Prop         | 型                    | デフォルト | 説明                                                                                                                 |
| ------------ | --------------------- | ---------- | -------------------------------------------------------------------------------------------------------------------- |
| `text`       | `string`              | -          | ツールチップ本文。デフォルトスロットが指定された場合はそちらが優先される                                             |
| `position`   | `DadsTooltipPosition` | `'top'`    | トリガーに対する配置 (`top` / `top-start` / `top-end` / `bottom` / `bottom-start` / `bottom-end` / `left` / `right`) |
| `openDelay`  | `number`              | `0`        | 表示までの遅延 (ms)                                                                                                  |
| `closeDelay` | `number`              | `0`        | 非表示までの遅延 (ms)                                                                                                |
| `disabled`   | `boolean`             | `false`    | `true` の場合、トリガー操作に関わらず開かない                                                                        |
| `id`         | `string`              | 自動生成   | ツールチップ要素の DOM `id`。未指定時は `useId()` で一意な値を生成                                                   |

## Events

このコンポーネントは emit を持たない（開閉はトリガー操作で完結し、外部からの制御も不要なため）。

## アクセシビリティ

- ツールチップ要素には自動で `role="tooltip"` が付与される
- 表示中はトリガーラップ要素に `aria-describedby` が付与され、スクリーンリーダーがトリガーと本文を関連付ける
- `disabled` のときは `aria-describedby` を付けないため、補助技術にも非表示として一貫した状態を提供する
- ホバー (`mouseenter` / `mouseleave`) と同等にフォーカス (`focusin` / `focusout`) でも開閉するため、キーボード利用者にもパリティがある
- 装飾用の矢印には `aria-hidden="true"` を付与し、読み上げノイズを避ける
