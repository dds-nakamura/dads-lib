# Checkbox

オン / オフの 2 状態に加え、第三の `indeterminate` (混在) 状態にも対応するチェックボックス。公式 DADS の正準構造に準拠し、**ネイティブ `<input type="checkbox">` 自身を `appearance:none` で見せる**実装（チェックマークは `::before` の `clip-path` で公式 SVG パスを描画）。ラベル・ヒント・エラーメッセージを内包し、ARIA 属性を付与する。

::: tip ✅ 公式仕様充足
公式 DADS の正準マークアップ (`.dads-checkbox` > `.dads-checkbox__checkbox` > `input.dads-checkbox__input` + `.dads-checkbox__label`)・3 サイズ (L/M/S: 箱 44/32/24px・ボーダー 3/2/2px)・ラベル・ヒント・エラーメッセージ・必須・無効・indeterminate・focus リング・forced-colors を満たしています。`DadsCheckboxGroup` も legend/direction/size の統一を含む公式準拠です。
:::

::: warning ⚠️ 破壊的変更 (T4 / Issue #18)
正準構造への刷新に伴い、**非公式の `readonly` prop を削除**しました（公式 DADS に readonly 状態は存在しません）。読み取り専用相当が必要な場合は `disabled` を利用してください。また内部 DOM 構造が変わったため、`.dads-checkbox__indicator` / `.dads-checkbox--checked` 等の旧クラスに依存したスタイルは動作しません。
:::

## 基本

`v-model` でブール値を双方向バインドする。

<script setup>
import { ref } from 'vue'
import { DadsCheckbox } from '@dads/vue'

const agreed = ref(false)
const subscribe = ref(true)
const mixed = ref(false)
</script>

<div class="demo">
  <DadsCheckbox v-model="agreed" label="利用規約に同意する" />
  <div class="demo-label" style="margin-top:0.5rem">checked: {{ agreed }}</div>
</div>

```vue
<script setup>
import { ref } from 'vue'
import { DadsCheckbox } from '@dads/vue'

const agreed = ref(false)
</script>

<template>
  <DadsCheckbox v-model="agreed" label="利用規約に同意する" />
</template>
```

## Size

3 サイズ (`sm` / `md` / `lg`)。デフォルトは `md`。

<div class="demo">
  <div class="demo-row">
    <DadsCheckbox size="sm" label="SM サイズ" />
    <DadsCheckbox size="md" label="MD サイズ" />
    <DadsCheckbox size="lg" label="LG サイズ" />
  </div>
</div>

## ラベル / ヒント

`hint` を渡すと補助テキストが表示され、`aria-describedby` で読み上げ対象となる。

<div class="demo">
  <DadsCheckbox
    v-model="subscribe"
    label="お知らせを受け取る"
    hint="新機能や更新情報をメールでお送りします"
  />
</div>

## 状態

`disabled` / `error` / `required` / `indeterminate` の組み合わせ。

<div class="demo">
  <span class="demo-label">Default / Checked / Disabled / Disabled+Checked</span>
  <div class="demo-row">
    <DadsCheckbox label="未選択" />
    <DadsCheckbox label="選択済み" :model-value="true" />
    <DadsCheckbox label="操作不可" disabled />
    <DadsCheckbox label="操作不可（選択済み）" :model-value="true" disabled />
  </div>
  <span class="demo-label" style="margin-top:1rem">Required</span>
  <div class="demo-row">
    <DadsCheckbox label="個人情報の取扱いに同意" required />
  </div>
  <span class="demo-label" style="margin-top:1rem">Error</span>
  <div class="demo-row">
    <DadsCheckbox
      label="利用規約に同意する"
      required
      error-message="同意が必要です"
    />
  </div>
  <span class="demo-label" style="margin-top:1rem">Indeterminate (混在)</span>
  <div class="demo-row">
    <DadsCheckbox label="全選択" :indeterminate="true" v-model="mixed" />
  </div>
</div>

## Indeterminate (混在状態)

ツリー構造や「すべて選択」のような UI で、子要素の一部のみ選択されている状態を表す。
`indeterminate` プロパティを渡すと DOM の `indeterminate` プロパティが立ち、
`aria-checked="mixed"` がスクリーンリーダーに伝わる。

```vue
<script setup>
import { computed, ref } from 'vue'
import { DadsCheckbox } from '@dads/vue'

const children = ref([true, false, true])
const allChecked = computed(() => children.value.every((v) => v))
const someChecked = computed(() => children.value.some((v) => v) && !allChecked.value)

const toggleAll = (v) => {
  children.value = children.value.map(() => v)
}
</script>

<template>
  <DadsCheckbox
    label="全選択"
    :model-value="allChecked"
    :indeterminate="someChecked"
    @update:model-value="toggleAll"
  />
</template>
```

## Props

| Prop            | 型                            | デフォルト | 説明                                                  |
| --------------- | ----------------------------- | ---------- | ----------------------------------------------------- |
| `modelValue`    | `boolean`                     | `false`    | 選択状態 (`v-model` バインド対象)                     |
| `indeterminate` | `boolean`                     | `false`    | 第三の混在状態 (DOM `indeterminate` を立てる)         |
| `size`          | `'lg' \| 'md' \| 'sm'`        | `'md'`     | サイズ (`xs` は非対応)                                |
| `label`         | `string`                      | -          | チェックボックスのラベルテキスト                      |
| `hint`          | `string`                      | -          | 補助テキスト (`aria-describedby` で参照)              |
| `errorMessage`  | `string`                      | -          | エラーメッセージ (`aria-describedby` で参照)          |
| `required`      | `boolean`                     | `false`    | 必須マーカー表示 + `aria-required`                    |
| `error`         | `boolean`                     | `false`    | メッセージなしでもエラー視覚状態を強制                |
| `disabled`      | `boolean`                     | `false`    | 操作不可化                                            |
| `name`          | `string`                      | -          | ネイティブ `name` 属性                                |
| `id`            | `string`                      | -          | ネイティブ `id` (未指定なら自動生成)                  |
| `value`         | `string \| number \| boolean` | -          | ネイティブ `value` 属性 (グループ利用時の識別子)      |
| `requiredLabel` | `string`                      | `'※必須'`  | 必須マーカーに表示するテキスト。i18n 用に上書き可能   |

## Events

| Event               | Payload      | 説明                                  |
| ------------------- | ------------ | ------------------------------------- |
| `update:modelValue` | `boolean`    | 選択状態が変化したとき (`v-model` 用) |
| `change`            | `Event`      | ネイティブ `change` イベント発火時    |
| `focus`             | `FocusEvent` | フォーカスを得たとき                  |
| `blur`              | `FocusEvent` | フォーカスを失ったとき                |

## アクセシビリティ

- ラベルはネイティブ `<input>` を `<label class="dads-checkbox">` で内包しており、ラベルクリックでも切替できる（公式の正準構造）
- `indeterminate` 時は `aria-checked="mixed"` が付与され、スクリーンリーダーが混在状態を読み上げる
- `errorMessage` 指定時は `aria-invalid="true"` + `aria-describedby` でエラー文を読み上げ対象にする
- キーボード操作はネイティブ通り: <kbd>Tab</kbd> でフォーカス、<kbd>Space</kbd> で切替
- フォーカスリングはネイティブ `<input>` 自身に `:focus` で適用される（`outline` 4px + `box-shadow` 2px の公式仕様）
- `forced-colors` (ハイコントラスト) では `Highlight` / `HighlightText` / `GrayText` / `Canvas` を用いてチェック・無効状態を可視化する
