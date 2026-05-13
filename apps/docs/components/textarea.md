# Textarea

複数行のテキスト入力。ラベル / ヒント / エラー / 文字数カウンタ / 自動リサイズに対応する。

## 基本

<script setup>
import { ref } from 'vue'
import { DadsTextarea } from '@dads/vue'

const memo = ref('')
const memoCounter = ref('')
const memoAuto = ref('')
const memoError = ref('')
</script>

<div class="demo">
  <DadsTextarea
    v-model="memo"
    label="備考"
    placeholder="自由にご記入ください"
  />
</div>

```vue
<script setup>
import { ref } from 'vue'
import { DadsTextarea } from '@dads/vue'

const memo = ref('')
</script>

<template>
  <DadsTextarea v-model="memo" label="備考" placeholder="自由にご記入ください" />
</template>
```

## Size

3 サイズ (`sm` / `md` / `lg`)。デフォルトは `md`。Textarea には `xs` は提供しない。

<div class="demo">
  <DadsTextarea size="sm" label="SM" placeholder="size=sm" />
  <DadsTextarea size="md" label="MD" placeholder="size=md" />
  <DadsTextarea size="lg" label="LG" placeholder="size=lg" />
</div>

## Rows

`rows` で表示行数を指定する。デフォルトは `3`。

<div class="demo">
  <DadsTextarea label="5 行" :rows="5" placeholder="rows=5" />
</div>

## Resize

`resize` で手動リサイズの方向を制御する (`none` / `vertical` / `horizontal` / `both`)。デフォルトは `vertical`。

<div class="demo">
  <div class="demo-row">
    <DadsTextarea label="vertical (既定)" resize="vertical" placeholder="縦方向のみ" />
    <DadsTextarea label="none" resize="none" placeholder="リサイズ不可" />
    <DadsTextarea label="both" resize="both" placeholder="両方向" />
  </div>
</div>

## 自動リサイズ

`autoResize` を有効にすると、内容に合わせて `minRows` 〜 `maxRows` の範囲で高さが伸縮する。`resize` は自動的に `none` に固定される。

<div class="demo">
  <DadsTextarea
    v-model="memoAuto"
    label="自動リサイズ"
    placeholder="入力すると高さが伸びます (2〜6 行)"
    auto-resize
    :min-rows="2"
    :max-rows="6"
  />
</div>

## ヒントテキスト

`hint` でテキスト下部に補助情報を表示する。`aria-describedby` で textarea にリンクされる。

<div class="demo">
  <DadsTextarea label="お問い合わせ内容" hint="500 文字以内で具体的にご記入ください" />
</div>

## 文字数カウンタ

`counter` で上限文字数を表示。`maxlength` と組み合わせると入力自体を上限で止められる。コンポーネント側は上限制御を行わない。

<div class="demo">
  <DadsTextarea
    v-model="memoCounter"
    label="自己紹介"
    placeholder="200 文字まで"
    :counter="200"
    :maxlength="200"
  />
</div>

## 状態

`disabled` / `readonly` / `required` / `error` (または `errorMessage`) の各状態。

<div class="demo">
  <DadsTextarea label="Default" placeholder="通常状態" />
  <DadsTextarea label="必須" required placeholder="required=true" />
  <DadsTextarea label="Disabled" disabled model-value="操作できません" />
  <DadsTextarea label="Readonly" readonly model-value="読み取り専用" />
  <DadsTextarea
    v-model="memoError"
    label="Error"
    error-message="必須項目です。ご記入ください。"
    placeholder="エラー表示"
  />
</div>

## Props

| Prop           | 型                                               | デフォルト   | 説明                                                               |
| -------------- | ------------------------------------------------ | ------------ | ------------------------------------------------------------------ |
| `modelValue`   | `string`                                         | -            | `v-model` の値                                                     |
| `placeholder`  | `string`                                         | -            | プレースホルダ                                                     |
| `name`         | `string`                                         | -            | フォーム送信時のフィールド名                                       |
| `id`           | `string`                                         | 自動生成     | ネイティブ `id`。省略時は label `for` と aria 連携用 ID を自動生成 |
| `autocomplete` | `string`                                         | -            | ネイティブ `autocomplete` 属性                                     |
| `maxlength`    | `number`                                         | -            | 入力可能な最大文字数 (ブラウザ側で制御)                            |
| `rows`         | `number`                                         | `3`          | 表示行数 (`autoResize` 無効時)                                     |
| `size`         | `'lg' \| 'md' \| 'sm'`                           | `'md'`       | サイズ                                                             |
| `label`        | `string`                                         | -            | ラベルテキスト                                                     |
| `hint`         | `string`                                         | -            | 補助テキスト (エラー表示時は非表示)                                |
| `errorMessage` | `string`                                         | -            | エラーメッセージ。設定すると暗黙的にエラー表示状態になる           |
| `required`     | `boolean`                                        | `false`      | 必須マーク表示と `aria-required` を付与                            |
| `error`        | `boolean`                                        | `false`      | エラー視覚状態を強制 (メッセージ無しのケース用)                    |
| `disabled`     | `boolean`                                        | `false`      | 操作不可化                                                         |
| `readonly`     | `boolean`                                        | `false`      | 読み取り専用                                                       |
| `counter`      | `number`                                         | -            | 上限文字数の表示 (`current / counter`)。入力制限はかからない       |
| `resize`       | `'none' \| 'vertical' \| 'horizontal' \| 'both'` | `'vertical'` | CSS `resize`。`autoResize` 有効時は `'none'` に強制される          |
| `autoResize`   | `boolean`                                        | `false`      | 内容に応じて高さを伸縮 (`minRows`〜`maxRows`)                      |
| `minRows`      | `number`                                         | `2`          | `autoResize` 有効時の最小行数                                      |
| `maxRows`      | `number`                                         | -            | `autoResize` 有効時の最大行数。省略時は上限なし                    |

## Events

| Event               | Payload      | 説明                          |
| ------------------- | ------------ | ----------------------------- |
| `update:modelValue` | `string`     | 入力ごとに発火 (`v-model` 用) |
| `change`            | `Event`      | ネイティブ `change` イベント  |
| `focus`             | `FocusEvent` | フォーカス取得時              |
| `blur`              | `FocusEvent` | フォーカス喪失時              |

## アクセシビリティ

- `label` を渡すと `<label for>` が textarea に正しく紐づく。`id` を省略してもユニーク ID が自動生成される
- `hint` / `errorMessage` / `counter` は `aria-describedby` で textarea にリンクされ、スクリーンリーダーが文脈として読み上げる
- `required` 指定時は視覚的な「必須」マーカーと `aria-required="true"` の両方が付与される
- `errorMessage` 表示時は `role="alert"` でアナウンスされ、textarea には `aria-invalid="true"` が付く
- `disabled` / `readonly` はそれぞれネイティブ属性として付与され、キーボード操作も従来の挙動に従う
