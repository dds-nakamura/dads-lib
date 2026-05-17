# Radio

排他的に 1 つだけ選択できるラジオボタン。同じ `name` を共有する複数の `DadsRadio` を `v-model` でひとつの値にバインドして利用する。

## 基本

同じ `name` を共有する複数のラジオを同じ `v-model` にバインドする。

<script setup>
import { ref } from 'vue'
import { DadsRadio } from '@dads/vue'

const fruit = ref('apple')
const plan = ref(null)
const sizeDemo = ref('md')
const errorDemo = ref(null)
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

3 サイズ (`lg` / `md` / `sm`)。デフォルトは `md`。Button と異なり `xs` は持たない。

<div class="demo">
  <div class="demo-row">
    <DadsRadio v-model="sizeDemo" value="lg" name="size-demo" size="lg" label="LG" />
    <DadsRadio v-model="sizeDemo" value="md" name="size-demo" size="md" label="MD" />
    <DadsRadio v-model="sizeDemo" value="sm" name="size-demo" size="sm" label="SM" />
  </div>
</div>

## ヒント

`hint` を指定すると補足テキストを表示し、`aria-describedby` で input と紐付ける。

<div class="demo">
  <DadsRadio
    v-model="plan"
    value="free"
    name="plan-hint"
    label="無料プラン"
    hint="月間 1,000 リクエストまで利用できます"
  />
</div>

## 説明 (description)

`description` はオプションごとの説明文をラベル直下に表示する。`hint` がコントロール全体に対する補足であるのに対し、`description` は **そのラジオ項目固有** の説明で、フォーカス時にスクリーンリーダーが `aria-describedby` 経由で読み上げる。プラン選択リストなど、各項目に詳細説明が必要な場面で使う。

<div class="demo">
  <DadsRadio
    v-model="plan"
    value="free"
    name="plan-desc"
    label="無料プラン"
    description="月額 ¥0 / 月間 1,000 リクエストまで"
  />
  <DadsRadio
    v-model="plan"
    value="pro"
    name="plan-desc"
    label="Pro プラン"
    description="月額 ¥980 / 月間 50,000 リクエストまで"
  />
</div>

## 必須

`required` を指定するとラベル右に「必須」マーカーを表示し、`aria-required="true"` を付与する。

<div class="demo">
  <DadsRadio value="agree" name="agree-required" label="利用規約に同意する" required />
</div>

## 状態

`disabled` / `error` / `errorMessage` を組み合わせて状態を表現する。`errorMessage` を指定すると `role="alert"` 付きで読み上げられる。

<div class="demo">
  <span class="demo-label">Disabled</span>
  <div class="demo-row">
    <DadsRadio value="a" name="state-disabled" label="選択不可" disabled />
    <DadsRadio value="b" name="state-disabled-checked" label="選択不可 (選択済み)" disabled :model-value="'b'" />
  </div>
  <span class="demo-label" style="margin-top:1rem">Error</span>
  <div class="demo-row">
    <DadsRadio
      v-model="errorDemo"
      value="yes"
      name="state-error"
      label="同意する"
      error-message="いずれかを選択してください"
    />
  </div>
  <span class="demo-label" style="margin-top:1rem">Error (フラグのみ)</span>
  <div class="demo-row">
    <DadsRadio value="x" name="state-error-flag" label="エラー視覚状態のみ" error />
  </div>
</div>

## Props

| Prop           | 型                                    | デフォルト | 説明                                                         |
| -------------- | ------------------------------------- | ---------- | ------------------------------------------------------------ |
| `modelValue`   | `string \| number \| boolean \| null` | -          | 現在選択中の値。`value` と一致すると checked になる          |
| `value`        | `string \| number \| boolean`         | -          | このラジオを表す値 (必須)。選択時に emit される              |
| `size`         | `'lg' \| 'md' \| 'sm'`                | `'md'`     | サイズ                                                       |
| `label`        | `string`                              | -          | ラベルテキスト                                               |
| `description`  | `string`                              | -          | ラベル直下の説明文 (`aria-describedby` で紐付け)             |
| `hint`         | `string`                              | -          | 補足テキスト (`aria-describedby` で紐付け)                   |
| `errorMessage` | `string`                              | -          | エラーメッセージ。指定時は `role="alert"` で読み上げ         |
| `required`     | `boolean`                             | `false`    | 必須マーカーを表示し `aria-required` を付与                  |
| `error`        | `boolean`                             | `false`    | エラー視覚状態を強制 (メッセージなしで枠だけ赤くしたい場合)  |
| `disabled`     | `boolean`                             | `false`    | 操作不可化                                                   |
| `name`         | `string`                              | -          | グループ識別子。同じ `name` で単一選択がブラウザに強制される |
| `id`           | `string`                              | -          | input の `id`。省略時は自動生成され label/aria と同期する    |

## Events

| Event               | Payload                       | 説明                                              |
| ------------------- | ----------------------------- | ------------------------------------------------- |
| `update:modelValue` | `string \| number \| boolean` | このラジオが選択されたとき、自身の `value` を発火 |
| `change`            | `Event`                       | ネイティブ `change` イベント                      |
| `focus`             | `FocusEvent`                  | フォーカス取得時                                  |
| `blur`              | `FocusEvent`                  | フォーカス喪失時                                  |

## アクセシビリティ

- 同じ `name` を共有することでブラウザ標準の単一選択 / 矢印キーによるグループ内移動が有効になる
- `errorMessage` 指定時は `aria-invalid="true"` と `aria-describedby` がエラー要素を指し、`role="alert"` で読み上げられる
- `hint` がある場合は `aria-describedby` がヒント要素を指す (`errorMessage` が優先)
- `required` 指定で `aria-required="true"` が付与され、視覚的な「必須」マーカーは `aria-hidden` で重複読み上げを避ける
- `label` を省略する場合は外側に別途ラベルを置き、`aria-labelledby` 等で関連付けること
