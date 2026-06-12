# Button

クリック・送信・ナビゲーションを表すボタン。DADS の `solid-fill` / `outline` / `text` の 3 バリアントを提供する。

## 基本

<script setup>
import { ref } from 'vue'
import { DadsButton } from '@dads/vue'

const clickCount = ref(0)
const onClick = () => { clickCount.value++ }
</script>

<div class="demo">
  <DadsButton @click="onClick">Click me ({{ clickCount }})</DadsButton>
</div>

```vue
<script setup>
import { DadsButton } from '@dads/vue'
</script>

<template>
  <DadsButton @click="onClick">Click me</DadsButton>
</template>
```

## Variant

3 つのバリアント (`solid-fill` / `outline` / `text`)。デフォルトは `solid-fill`。

<div class="demo">
  <div class="demo-row">
    <DadsButton variant="solid-fill">Solid Fill</DadsButton>
    <DadsButton variant="outline">Outline</DadsButton>
    <DadsButton variant="text">Text</DadsButton>
  </div>
</div>

## Size

4 サイズ (`xs` / `sm` / `md` / `lg`)。デフォルトは `md`。

<div class="demo">
  <div class="demo-row">
    <DadsButton size="xs">XS</DadsButton>
    <DadsButton size="sm">SM</DadsButton>
    <DadsButton size="md">MD</DadsButton>
    <DadsButton size="lg">LG</DadsButton>
  </div>
</div>

## Color

公式 DADS のボタンは blue 単色です。`color` は `primary` のみで、デフォルトも `primary`。
（旧 `success` / `error` / `warning` / `secondary` は公式に対応が無いため Issue #18 で撤廃しました。）

<div class="demo">
  <span class="demo-label">Solid fill / Outline / Text</span>
  <div class="demo-row">
    <DadsButton color="primary">Solid fill</DadsButton>
    <DadsButton variant="outline" color="primary">Outline</DadsButton>
    <DadsButton variant="text" color="primary">Text</DadsButton>
  </div>
</div>

## States

<div class="demo">
  <div class="demo-row">
    <DadsButton>Default</DadsButton>
    <DadsButton disabled>Disabled</DadsButton>
    <DadsButton loading>Loading</DadsButton>
  </div>
</div>

## Block

`block` を指定するとコンテナ幅にストレッチする。

<div class="demo">
  <DadsButton block>Block button</DadsButton>
</div>

## アイコン付き

`prependIcon` / `appendIcon` に Material Symbols 名を渡す。
アイコンは inline SVG (`DadsIcon`) で描画されるためフォント読込は不要。

```vue
<DadsButton prepend-icon="download">Download</DadsButton>
<DadsButton append-icon="arrow_forward">Next</DadsButton>
```

## リンクとして

`href` を渡すと `<a>` 要素としてレンダリングする。

<div class="demo">
  <DadsButton href="https://design.digital.go.jp/dads/" variant="outline">
    DADS 公式サイトへ
  </DadsButton>
</div>

## Props

| Prop          | 型                                    | デフォルト     | 説明                                          |
| ------------- | ------------------------------------- | -------------- | --------------------------------------------- |
| `variant`     | `'solid-fill' \| 'outline' \| 'text'` | `'solid-fill'` | 視覚バリアント                                |
| `size`        | `'lg' \| 'md' \| 'sm' \| 'xs'`        | `'md'`         | サイズ                                        |
| `color`       | `'primary'`                           | `'primary'`    | カラー軸（公式は blue 単色）                  |
| `disabled`    | `boolean`                             | `false`        | 操作不可化                                    |
| `loading`     | `boolean`                             | `false`        | ロード中（スピナー表示、クリック抑止）        |
| `prependIcon` | `string`                              | -              | 前置アイコンの Material Symbols 名            |
| `appendIcon`  | `string`                              | -              | 後置アイコンの Material Symbols 名            |
| `block`       | `boolean`                             | `false`        | コンテナ幅にストレッチ                        |
| `type`        | `'button' \| 'submit' \| 'reset'`     | `'button'`     | ネイティブ button type (`href` 指定時は無視)  |
| `href`        | `string`                              | -              | 指定時は `<a>` でレンダリング                 |
| `ariaLabel`   | `string`                              | -              | アクセシブル名 (アイコンのみのボタンでは必須) |

## Events

| Event   | Payload      | 説明           |
| ------- | ------------ | -------------- |
| `click` | `MouseEvent` | クリック発火時 |

## アクセシビリティ

- アイコンのみのボタンには **必ず** `aria-label` を渡す
- `loading` 中は `aria-busy="true"` が自動付与される
- `disabled` 状態のクリックは aria 層と DOM の両方で抑止
