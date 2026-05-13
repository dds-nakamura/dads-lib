# ProgressIndicator

処理の進行状況を視覚的に伝えるインジケータ。確定値 (determinate) と不定 (indeterminate) の両モードをサポートし、`linear` / `circular` の 2 バリアントを提供する。

## 基本

`value` (0–100) を渡すと determinate モードで動作する。`value` を省略すると indeterminate モード (ループアニメーション) になる。

<script setup>
import { ref } from 'vue'
import { DadsProgressIndicator } from '@dads/vue'

const value = ref(50)
const increase = () => { value.value = Math.min(100, value.value + 10) }
const decrease = () => { value.value = Math.max(0, value.value - 10) }
</script>

<div class="demo">
  <DadsProgressIndicator :value="value" show-label />
  <div class="demo-row" style="margin-top:1rem">
    <button type="button" @click="decrease">-10</button>
    <button type="button" @click="increase">+10</button>
  </div>
</div>

```vue
<script setup>
import { ref } from 'vue'
import { DadsProgressIndicator } from '@dads/vue'

const value = ref(50)
</script>

<template>
  <DadsProgressIndicator :value="value" show-label />
</template>
```

## Variant

2 つのバリアント (`linear` / `circular`)。デフォルトは `linear`。

<div class="demo">
  <span class="demo-label">Linear</span>
  <DadsProgressIndicator variant="linear" :value="60" />
  <span class="demo-label" style="margin-top:1rem">Circular</span>
  <div class="demo-row">
    <DadsProgressIndicator variant="circular" :value="60" />
  </div>
</div>

## Indeterminate

`value` を省略するか `undefined` を渡すと、進捗が確定していないことを示すループアニメーションになる。

<div class="demo">
  <span class="demo-label">Linear (indeterminate)</span>
  <DadsProgressIndicator variant="linear" />
  <span class="demo-label" style="margin-top:1rem">Circular (indeterminate)</span>
  <div class="demo-row">
    <DadsProgressIndicator variant="circular" />
  </div>
</div>

```vue
<DadsProgressIndicator variant="linear" />
<DadsProgressIndicator variant="circular" />
```

## Size

3 サイズ (`sm` / `md` / `lg`)。デフォルトは `md`。`xs` はサポートしない。

<div class="demo">
  <span class="demo-label">Linear</span>
  <DadsProgressIndicator size="sm" :value="40" />
  <DadsProgressIndicator size="md" :value="40" style="margin-top:0.5rem" />
  <DadsProgressIndicator size="lg" :value="40" style="margin-top:0.5rem" />
  <span class="demo-label" style="margin-top:1rem">Circular</span>
  <div class="demo-row">
    <DadsProgressIndicator variant="circular" size="sm" :value="40" />
    <DadsProgressIndicator variant="circular" size="md" :value="40" />
    <DadsProgressIndicator variant="circular" size="lg" :value="40" />
  </div>
</div>

## 状態

`showLabel` を有効にするとパーセンテージラベルが表示される。`label` で任意の文字列にも差し替え可能。

<div class="demo">
  <span class="demo-label">デフォルトラベル (showLabel)</span>
  <DadsProgressIndicator :value="75" show-label />
  <span class="demo-label" style="margin-top:1rem">カスタムラベル</span>
  <DadsProgressIndicator :value="75" show-label label="アップロード中…" />
  <span class="demo-label" style="margin-top:1rem">Circular + ラベル</span>
  <div class="demo-row">
    <DadsProgressIndicator variant="circular" :value="75" show-label />
  </div>
</div>

```vue
<DadsProgressIndicator :value="75" show-label />
<DadsProgressIndicator :value="75" show-label label="アップロード中…" />
```

範囲外の値 (負数 / 100 超え) は自動で `[0, 100]` にクランプされる。`aria-valuenow` とラベル表示の両方に反映される。

<div class="demo">
  <span class="demo-label">value=-25 → 0 にクランプ</span>
  <DadsProgressIndicator :value="-25" show-label />
  <span class="demo-label" style="margin-top:1rem">value=250 → 100 にクランプ</span>
  <DadsProgressIndicator :value="250" show-label />
</div>

## Props

| Prop        | 型                       | デフォルト | 説明                                                          |
| ----------- | ------------------------ | ---------- | ------------------------------------------------------------- |
| `variant`   | `'linear' \| 'circular'` | `'linear'` | 視覚バリアント                                                |
| `value`     | `number`                 | -          | 進捗値 (0–100)。省略時は indeterminate モード。範囲外は clamp |
| `size`      | `'lg' \| 'md' \| 'sm'`   | `'md'`     | サイズ (`xs` は非対応)                                        |
| `label`     | `string`                 | -          | ラベル文字列。省略時は `${value}%`                            |
| `showLabel` | `boolean`                | `false`    | ラベルを描画するかどうか                                      |
| `ariaLabel` | `string`                 | -          | ルート要素の `aria-label`                                     |

## Events

このコンポーネントは独自のイベントを emit しない。

## アクセシビリティ

- ルート要素には常に `role="progressbar"` が付与される
- determinate モードでは `aria-valuemin="0"` / `aria-valuemax="100"` / `aria-valuenow` を自動設定 (clamp 済みの値)
- indeterminate モードでは `aria-valuenow` などを意図的に省略し、スクリーンリーダーに「進捗値不明」として伝える
- 周囲に説明テキストがない場合は `ariaLabel` で必ずアクセシブル名を提供する
- `circular` バリアントの SVG 装飾は `aria-hidden="true"` でスクリーンリーダーから除外される
