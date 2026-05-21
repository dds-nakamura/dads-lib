# ColorPicker

色を選択するためのカラーピッカー。ブラウザネイティブの `<input type="color">` と HEX 入力、スウォッチグリッドを組み合わせて提供する。

## 基本

`v-model` で `#RRGGBB` 形式の文字列を双方向バインドする。スウォッチをクリックするか、プレビュータイルからネイティブカラーピッカーを開くか、HEX を直接入力できる。

<script setup>
import { ref } from 'vue'
import { DadsColorPicker } from '@dads/vue'

const basicColor = ref('#0017c1')
const labeledColor = ref('#0017c1')
const customSwatchColor = ref('#0017c1')
const disabledColor = ref('#0017c1')
const formColor = ref('#0017c1')

const customSwatches = [
  '#0017c1',
  '#1a73e8',
  '#34a853',
  '#fbbc05',
  '#ea4335',
  '#9e9e9e',
]

const i18nSwatchLabel = (s) => `Select ${s}`
</script>

<div class="demo">
  <DadsColorPicker v-model="basicColor" />
  <span class="demo-label" style="margin-top:1rem">現在の値: <code>{{ basicColor }}</code></span>
</div>

```vue
<script setup>
import { ref } from 'vue'
import { DadsColorPicker } from '@dads/vue'

const color = ref('#0017c1')
</script>

<template>
  <DadsColorPicker v-model="color" />
</template>
```

## ラベル

`label` でネイティブカラー入力の `aria-label` を上書きできる。スクリーンリーダー利用者には、用途を伝わるラベルを推奨する。

<div class="demo">
  <DadsColorPicker v-model="labeledColor" label="テキスト色" />
</div>

```vue
<DadsColorPicker v-model="color" label="テキスト色" />
```

## スウォッチのカスタマイズ

`swatches` に `#RRGGBB` 配列を渡すと、既定パレット (`DADS_DEFAULT_SWATCHES`) を差し替えられる。配列順にグリッド表示される。

<div class="demo">
  <DadsColorPicker v-model="customSwatchColor" :swatches="customSwatches" />
  <span class="demo-label" style="margin-top:1rem">現在の値: <code>{{ customSwatchColor }}</code></span>
</div>

```vue
<script setup>
import { ref } from 'vue'
import { DadsColorPicker } from '@dads/vue'

const color = ref('#0017c1')
const swatches = ['#0017c1', '#1a73e8', '#34a853', '#fbbc05', '#ea4335', '#9e9e9e']
</script>

<template>
  <DadsColorPicker v-model="color" :swatches="swatches" />
</template>
```

## デフォルトのスウォッチ

`swatches` を省略すると `DADS_DEFAULT_SWATCHES` (12 色) が適用される。Vuetify の `<v-color-picker show-swatches>` 互換の代表色。

```ts
import { DADS_DEFAULT_SWATCHES } from '@dads/vue'

// [
//   '#000000', '#FFFFFF', '#F44336', '#FF9800',
//   '#FFEB3B', '#4CAF50', '#00BCD4', '#2196F3',
//   '#9C27B0', '#E91E63', '#795548', '#9E9E9E',
// ]
```

## 状態

`disabled` を渡すと、ネイティブ入力・HEX 入力・全スウォッチが操作不能になり、視覚的にも淡色化される。

<div class="demo">
  <DadsColorPicker v-model="disabledColor" disabled />
</div>

```vue
<DadsColorPicker v-model="color" disabled />
```

## フォーム連携

`update:modelValue` は `#rrggbb` 形式の小文字に正規化されて emit される。HEX 入力は完全な `#RRGGBB` をタイプし切るまで emit されない（途中入力で親の状態を壊さないため）。

<div class="demo">
  <DadsColorPicker v-model="formColor" label="背景色" />
  <span class="demo-label" style="margin-top:1rem">
    プレビュー:
    <span :style="{ display:'inline-block', width:'1.2em', height:'1.2em', verticalAlign:'middle', backgroundColor: formColor, border: '1px solid rgba(0,0,0,0.2)' }"></span>
    <code>{{ formColor }}</code>
  </span>
</div>

```vue
<script setup>
import { ref, watch } from 'vue'
import { DadsColorPicker } from '@dads/vue'

const color = ref('#0017c1')
watch(color, (next) => {
  // 必ず "#rrggbb" (小文字) で届く
  console.log(next)
})
</script>

<template>
  <DadsColorPicker v-model="color" label="背景色" />
</template>
```

## i18n / 国際化対応

ネイティブカラー入力 / HEX 入力 / 各スウォッチの aria-label をすべてプロップ / フォーマッタで上書きできる。`formatSwatchAriaLabel` は HEX 文字列を受け取り、ロケールに合わせた発話文字列を返す。

<div class="demo">
  <DadsColorPicker
    v-model="basicColor"
    label="Background color"
    default-aria-label="Pick a color"
    hex-input-aria-label="HEX color code"
    :format-swatch-aria-label="i18nSwatchLabel"
  />
</div>

```vue
<script setup>
const i18nSwatchLabel = (s) => `Select ${s}`
</script>

<template>
  <DadsColorPicker
    v-model="color"
    label="Background color"
    default-aria-label="Pick a color"
    hex-input-aria-label="HEX color code"
    :format-swatch-aria-label="i18nSwatchLabel"
  />
</template>
```

## Props

| Prop                    | 型                           | デフォルト                 | 説明                                                                                              |
| ----------------------- | ---------------------------- | -------------------------- | ------------------------------------------------------------------------------------------------- |
| `modelValue`            | `string`                     | -                          | 現在の色 (`#RRGGBB` 形式)。`v-model` で双方向バインドする                                         |
| `swatches`              | `string[]`                   | `DADS_DEFAULT_SWATCHES`    | スウォッチグリッドに並べる色の配列                                                                |
| `disabled`              | `boolean`                    | `false`                    | 操作不可化                                                                                        |
| `label`                 | `string`                     | `'色を選択'`               | ネイティブカラー入力に適用するアクセシブル名                                                      |
| `defaultAriaLabel`      | `string`                     | `'色を選択'`               | `label` 未指定時にネイティブカラー入力へ付与する aria-label のフォールバック。i18n 用に上書き可能 |
| `hexInputAriaLabel`     | `string`                     | `'HEXカラーコード'`        | HEX 入力欄の aria-label。i18n 用に上書き可能                                                      |
| `formatSwatchAriaLabel` | `(swatch: string) => string` | `` (s) => `${s} を選択` `` | 各スウォッチボタンの aria-label フォーマッタ。i18n 用に上書き可能                                 |

## Events

| Event               | Payload         | 説明                                                                 |
| ------------------- | --------------- | -------------------------------------------------------------------- |
| `update:modelValue` | `value: string` | 色が確定したとき。常に `#rrggbb` (小文字) に正規化された値が発火する |

## アクセシビリティ

- ネイティブカラー入力には `label` prop の値 (未指定時は `色を選択`) が `aria-label` として設定される。アイコンだけで意味が伝わらない場面では必ず用途に応じたラベルを渡す。
- HEX 入力には `aria-label="HEXカラーコード"` が固定で付与され、スクリーンリーダーで読み上げ可能。
- 各スウォッチボタンは `aria-label="<color> を選択"` と `aria-pressed` を持ち、現在選択中のスウォッチが支援技術にも識別される。プレビュータイル側はネイティブ入力の `:focus-within` でフォーカスリングを表示する。
- キーボード操作: `Tab` でプレビュー → HEX 入力 → 各スウォッチへ巡回でき、`Enter` / `Space` で発火する。`disabled` 時はすべての要素がフォーカス不可になる。
- 強制ハイコントラスト (forced-colors) モードでは枠線に `CanvasText` を用いて、背景色と独立した境界を保証する。色だけで選択状態を表現しないため、選択スウォッチには二重リング (`aria-pressed`) も併用している。
