# ProgressIndicator

処理の進行状況を視覚的に伝えるインジケータ。DADS 公式の正準構造 (SVG ベース) に準拠する。`indicator` で **linear** (直線バー) / **spinner** (回転リング) を切り替え、`type` で **stacked** / **inlined** / **stacked-underlay** のレイアウトを選ぶ。`value` を渡すと確定 (determinate)、省略すると不定 (indeterminate ループ) になる。

> **破壊的変更 (MAJOR)**: 旧 API の `variant` (`linear` / `circular`)・`size` (`sm`/`md`/`lg`)・`color`・`showLabel` は廃止された。公式は単色 (blue-1200)・サイズ軸なしのため、これらの軸は存在しない。

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
  <DadsProgressIndicator :value="value" label="読み込み中" show-percentage />
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
  <DadsProgressIndicator :value="value" label="読み込み中" show-percentage />
</template>
```

## Indicator (linear / spinner)

`indicator` で表示形態を切り替える。デフォルトは `linear` (矩形の SVG ライン + 1px の下線アクセント)。`spinner` はネストした `<g>` による回転リング。

<div class="demo">
  <span class="demo-label">Linear</span>
  <DadsProgressIndicator indicator="linear" :value="60" />
  <span class="demo-label" style="margin-top:1rem">Spinner</span>
  <div class="demo-row">
    <DadsProgressIndicator indicator="spinner" :value="60" />
  </div>
</div>

```vue
<DadsProgressIndicator indicator="linear" :value="60" />
<DadsProgressIndicator indicator="spinner" :value="60" />
```

## Type (レイアウト)

`type` でラベルとインジケータの配置を制御する。デフォルトは `stacked`。

- `stacked` — インジケータの下にラベル (縦並び)
- `inlined` — インジケータの横にラベル (横並び・コンパクト)
- `stacked-underlay` — `stacked` を 1px ボーダー + 16px 角丸 + 白背景のコンテナで囲む

<div class="demo">
  <span class="demo-label">stacked</span>
  <DadsProgressIndicator type="stacked" :value="60" label="ラベル" />
  <span class="demo-label" style="margin-top:1rem">inlined</span>
  <DadsProgressIndicator type="inlined" :value="60" label="ラベル" />
  <span class="demo-label" style="margin-top:1rem">stacked-underlay</span>
  <div class="demo-row">
    <DadsProgressIndicator type="stacked-underlay" indicator="spinner" :value="60" label="ラベル" />
  </div>
</div>

```vue
<DadsProgressIndicator type="stacked" :value="60" label="ラベル" />
<DadsProgressIndicator type="inlined" :value="60" label="ラベル" />
<DadsProgressIndicator type="stacked-underlay" indicator="spinner" :value="60" label="ラベル" />
```

## Indeterminate

`value` を省略するか `undefined` を渡すと、進捗が確定していないことを示すループアニメーションになる。linear は dash の流れるアニメ、spinner は cubic-bezier の二重回転アニメになる。

<div class="demo">
  <span class="demo-label">Linear (indeterminate)</span>
  <DadsProgressIndicator indicator="linear" label="読み込み中" />
  <span class="demo-label" style="margin-top:1rem">Spinner (indeterminate)</span>
  <div class="demo-row">
    <DadsProgressIndicator indicator="spinner" label="読み込み中" />
  </div>
</div>

```vue
<DadsProgressIndicator indicator="linear" label="読み込み中" />
<DadsProgressIndicator indicator="spinner" label="読み込み中" />
```

## ラベルとパーセンテージ

`label` を渡すと可視ラベルが表示され、同時にアクセシブル名 (`aria-labelledby`) として使われる。`show-percentage` を有効にすると determinate 時に `(NN%)` が末尾に表示される (indeterminate では非表示)。

<div class="demo">
  <span class="demo-label">ラベルのみ</span>
  <DadsProgressIndicator :value="75" label="アップロード中" />
  <span class="demo-label" style="margin-top:1rem">ラベル + パーセンテージ</span>
  <DadsProgressIndicator :value="75" label="アップロード中" show-percentage />
</div>

```vue
<DadsProgressIndicator :value="75" label="アップロード中" />
<DadsProgressIndicator :value="75" label="アップロード中" show-percentage />
```

範囲外の値 (負数 / 100 超え) は自動で `[0, 100]` にクランプされ、`aria-valuenow` とパーセンテージ表示の両方に反映される (整数に丸められる)。

## 表示制御 (active)

`active` (デフォルト `true`) を `false` にするとコンポーネントは非表示になり、すべてのアニメーションが停止する。公式の `:not([active])` 制御に対応する。

<div class="demo">
  <span class="demo-label">active=true (表示)</span>
  <DadsProgressIndicator :value="60" label="処理中" :active="true" />
  <span class="demo-label" style="margin-top:1rem">active=false (非表示・上の領域は空)</span>
  <DadsProgressIndicator :value="60" label="処理中" :active="false" />
</div>

```vue
<DadsProgressIndicator :value="60" label="処理中" :active="isLoading" />
```

## Props

| Prop             | 型                                              | デフォルト   | 説明                                                              |
| ---------------- | ----------------------------------------------- | ------------ | --------------------------------------------------------------- |
| `type`           | `'stacked' \| 'inlined' \| 'stacked-underlay'`  | `'stacked'`  | レイアウト (公式 `data-type`)                                    |
| `indicator`      | `'linear' \| 'spinner'`                         | `'linear'`   | 表示形態 (SVG ライン / 回転リング)                              |
| `value`          | `number`                                        | -            | 進捗値 (0–100)。省略時は indeterminate モード。範囲外は clamp    |
| `active`         | `boolean`                                       | `true`       | 表示制御。`false` で非表示 + アニメ停止                          |
| `label`          | `string`                                        | -            | 可視ラベル。指定時は `aria-labelledby` のアクセシブル名にもなる |
| `showPercentage` | `boolean`                                       | `false`      | determinate 時に `(NN%)` を表示                                  |
| `ariaLabel`      | `string`                                        | -            | `label` がない場合のアクセシブル名 (`aria-label`)              |

## Events

このコンポーネントは独自のイベントを emit しない。

## アクセシビリティ

- ルート要素には常に `role="progressbar"` と `aria-valuemin="0"` / `aria-valuemax="100"` が付与される
- determinate モードでは `aria-valuenow` を自動設定 (clamp + 整数丸め済み)
- indeterminate モードでは `aria-valuenow` を意図的に省略し、スクリーンリーダーに「進捗値不明」として伝える
- `label` を渡すと `aria-labelledby` で可視ラベルと関連付けられる。可視ラベルがない場合は `ariaLabel` でアクセシブル名を提供する
- インジケータの SVG は装飾なので `aria-hidden="true"` でスクリーンリーダーから除外される
- `prefers-reduced-motion: reduce` 環境ではアニメーションが停止する
