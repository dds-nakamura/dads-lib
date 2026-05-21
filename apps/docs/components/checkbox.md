# Checkbox

オン / オフの 2 状態に加え、第三の `indeterminate` (混在) 状態にも対応するチェックボックス。ラベル・ヒント・エラーメッセージを内包し、ネイティブ `<input type="checkbox">` をベースに ARIA 属性を付与する。

::: tip ✅ 公式仕様充足
公式 DADS のパーツ (L/M/S の 3 サイズ・ラベル・ヒント・エラーメッセージ・必須・無効・読み取り専用・indeterminate) およびイベント (change/focus/blur) を完全に満たしています。`DadsCheckboxGroup` も legend/direction/size の統一を含む公式準拠です。
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

`disabled` / `readonly` / `error` / `required` / `indeterminate` の組み合わせ。

<div class="demo">
  <span class="demo-label">Default / Checked / Disabled / Readonly</span>
  <div class="demo-row">
    <DadsCheckbox label="未選択" />
    <DadsCheckbox label="選択済み" :model-value="true" />
    <DadsCheckbox label="操作不可" disabled />
    <DadsCheckbox label="読み取り専用" :model-value="true" readonly />
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
| `errorMessage`  | `string`                      | -          | エラーメッセージ (`role="alert"` で通知)              |
| `required`      | `boolean`                     | `false`    | 必須マーカー表示 + `aria-required`                    |
| `error`         | `boolean`                     | `false`    | メッセージなしでもエラー視覚状態を強制                |
| `disabled`      | `boolean`                     | `false`    | 操作不可化                                            |
| `readonly`      | `boolean`                     | `false`    | 読み取り専用 (フォーカスは可、値の変更は抑止)         |
| `name`          | `string`                      | -          | ネイティブ `name` 属性                                |
| `id`            | `string`                      | -          | ネイティブ `id` (未指定なら自動生成)                  |
| `value`         | `string \| number \| boolean` | -          | ネイティブ `value` 属性 (グループ利用時の識別子)      |
| `requiredLabel` | `string`                      | `'必須'`   | 「必須」バッジに表示するテキスト。i18n 用に上書き可能 |

## Events

| Event               | Payload      | 説明                                  |
| ------------------- | ------------ | ------------------------------------- |
| `update:modelValue` | `boolean`    | 選択状態が変化したとき (`v-model` 用) |
| `change`            | `Event`      | ネイティブ `change` イベント発火時    |
| `focus`             | `FocusEvent` | フォーカスを得たとき                  |
| `blur`              | `FocusEvent` | フォーカスを失ったとき                |

## アクセシビリティ

- ラベルは `<label for>` でネイティブ `<input>` と関連付けられ、ラベルクリックでも切替できる
- `indeterminate` 時は `aria-checked="mixed"` が付与され、スクリーンリーダーが混在状態を読み上げる
- `errorMessage` 指定時は `aria-invalid="true"` + `aria-describedby` でエラー文を読み上げ対象にする
- キーボード操作はネイティブ通り: <kbd>Tab</kbd> でフォーカス、<kbd>Space</kbd> で切替
- フォーカスインジケータは視覚的に隠したネイティブ input のフォーカスを `:focus-visible` で外側の indicator に投影する
