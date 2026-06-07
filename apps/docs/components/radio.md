# Radio

排他的に 1 つだけ選択できるラジオボタン。同じ `name` を共有する複数の `DadsRadio` を `v-model` でひとつの値にバインドして利用する。

公式 DADS の正準構造に準拠する。可視コントロールは `appearance: none` を適用した `<input type="radio">` そのものであり、隠し input + 疑似要素という構成ではない。ラベル / 必須マーカー / 補足テキスト / エラーテキストといったフォーム共通レイヤーは公式同様 `DadsFormControlLabel`（`DadsRadioGroup` が内部で利用）に委譲する。単体の `DadsRadio` は「コントロール + 任意のラベル」のみを描画する。

## 基本

同じ `name` を共有する複数のラジオを同じ `v-model` にバインドする。

<script setup>
import { ref } from 'vue'
import { DadsRadio } from '@dads/vue'

const fruit = ref('apple')
const sizeDemo = ref('md')
</script>

<div class="demo">
  <DadsRadio v-model="fruit" value="apple" name="fruit-basic" label="りんご" />
  <DadsRadio v-model="fruit" value="orange" name="fruit-basic" label="みかん" />
  <DadsRadio v-model="fruit" value="grape" name="fruit-basic" label="ぶどう" />
  <span class="demo-label" style="margin-top:0.5rem">選択中: {{ fruit }}</span>
</div>

```vue
<script setup>
import { ref } from 'vue'
import { DadsRadio } from '@dads/vue'

const fruit = ref('apple')
</script>

<template>
  <DadsRadio v-model="fruit" value="apple" name="fruit" label="りんご" />
  <DadsRadio v-model="fruit" value="orange" name="fruit" label="みかん" />
  <DadsRadio v-model="fruit" value="grape" name="fruit" label="ぶどう" />
</template>
```

## Size

3 サイズ (`lg` / `md` / `sm`)。デフォルトは `md`。Button と異なり `xs` は持たない。コントロール寸法は公式準拠 (sm/md/lg = クリック領域 24/32/44px・リング 20/26/36px・内丸 10/12/16px・ボーダー 2/2/3px)。

<div class="demo">
  <div class="demo-row">
    <DadsRadio v-model="sizeDemo" value="lg" name="size-demo" size="lg" label="LG" />
    <DadsRadio v-model="sizeDemo" value="md" name="size-demo" size="md" label="MD" />
    <DadsRadio v-model="sizeDemo" value="sm" name="size-demo" size="sm" label="SM" />
  </div>
</div>

## 状態 (disabled / error)

`disabled` は操作不可状態、`error` はエラー視覚状態 (`aria-invalid="true"` 付与 + コントロールを赤系パレットに切替) を表す。`error` は視覚フラグのみで、エラーメッセージ自体は `DadsRadioGroup` 経由で `DadsFormControlLabel` が描画する。

<div class="demo">
  <span class="demo-label">Disabled</span>
  <div class="demo-row">
    <DadsRadio value="a" name="state-disabled" label="選択不可" disabled />
    <DadsRadio value="b" name="state-disabled-checked" label="選択不可 (選択済み)" disabled :model-value="'b'" />
  </div>
  <span class="demo-label" style="margin-top:1rem">Error</span>
  <div class="demo-row">
    <DadsRadio value="x" name="state-error" label="エラー視覚状態" error />
  </div>
</div>

## グループとして使う

ラベル (legend) / 必須マーカー / 補足テキスト / エラーテキスト / 項目ごとの説明文を伴う実運用では、単体の `DadsRadio` を並べるのではなく [`DadsRadioGroup`](./radio-group) を使う。`DadsRadioGroup` は内部で `DadsFormControlLabel` (公式 `dads-form-control-label`) にこれらを委譲し、各 `DadsRadio` には `name` / `size` / `error` / `aria-describedby` を配線する。

## Props

| Prop              | 型                                    | デフォルト | 説明                                                                            |
| ----------------- | ------------------------------------- | ---------- | ------------------------------------------------------------------------------- |
| `modelValue`      | `string \| number \| boolean \| null` | -          | 現在選択中の値。`value` と一致すると checked になる (`v-model`)                  |
| `value`           | `string \| number \| boolean`         | -          | このラジオを表す値 (必須)。選択時に emit される                                 |
| `size`            | `'lg' \| 'md' \| 'sm'`                | `'md'`     | サイズ。`data-size` 属性として出力される                                        |
| `label`           | `string`                              | -          | ラベルテキスト (`dads-radio__label`)。省略時はコントロールのみ                  |
| `error`           | `boolean`                             | `false`    | エラー視覚状態を強制し、input に `aria-invalid="true"` を付与                    |
| `disabled`        | `boolean`                             | `false`    | 操作不可化                                                                      |
| `name`            | `string`                              | -          | グループ識別子。同じ `name` で単一選択がブラウザに強制される                    |
| `id`              | `string`                              | -          | input の `id`。省略時は自動生成される                                           |
| `ariaDescribedby` | `string`                              | -          | input の `aria-describedby` に配線する id 群。`DadsRadioGroup` が説明文と紐付ける |

::: tip 旧 API からの移行 (破壊的変更)
T4 で公式正準構造へ刷新した際、Vue 独自拡張だった `required` / `requiredLabel` / `description` / `hint` / `errorMessage` プロップと、対応する `dads-radio__indicator` / `dads-radio__text` / `dads-radio__requirement` / `dads-radio__description` / `dads-radio__footer` などの内部要素を **削除** した。これらの責務 (ラベル / 必須 / 補足 / エラー / 項目説明) は公式同様 `DadsFormControlLabel` (= `DadsRadioGroup`) に委譲する。単体でこれらの表示が必要な場合は `DadsRadioGroup` を利用すること。
:::

## Events

| Event               | Payload                       | 説明                                              |
| ------------------- | ----------------------------- | ------------------------------------------------- |
| `update:modelValue` | `string \| number \| boolean` | このラジオが選択されたとき、自身の `value` を発火 |
| `change`            | `Event`                       | ネイティブ `change` イベント                      |
| `focus`             | `FocusEvent`                  | フォーカス取得時                                  |
| `blur`              | `FocusEvent`                  | フォーカス喪失時                                  |

## アクセシビリティ

- 同じ `name` を共有することでブラウザ標準の単一選択 / 矢印キーによるグループ内移動が有効になる
- 可視コントロールは input 自身 (`appearance: none`) なので、ネイティブのフォーカスリング・キーボード操作・スクリーンリーダー対応がそのまま機能する
- `error` 指定で input に `aria-invalid="true"` が付与される。エラーメッセージや必須マーカーは `DadsRadioGroup` (`DadsFormControlLabel`) が描画・配線する
- `label` を省略する場合は外側に別途ラベルを置き、`aria-labelledby` 等で関連付けること
