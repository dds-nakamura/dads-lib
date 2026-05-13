# DatePicker

年・月・日の 3 つの数値入力欄とカレンダーポップオーバーを組み合わせた日付選択コンポーネント。`v-model` には ISO 形式 (`YYYY-MM-DD`) の文字列をバインドする。

## 基本

`v-model` でバインドした文字列は `YYYY-MM-DD` 形式。空文字は未入力を表す。

<script setup>
import { ref } from 'vue'
import { DadsDatePicker } from '@dads/vue'

const date = ref('')
const dob = ref('')
const today = ref('2026-05-14')
const ranged = ref('')
const errored = ref('')
const disabledDate = ref('2024-04-01')
const readonlyDate = ref('2024-04-01')
</script>

<div class="demo">
  <DadsDatePicker v-model="date" label="日付" />
  <p class="demo-label" style="margin-top:1rem">選択値: {{ date || '(未選択)' }}</p>
</div>

```vue
<script setup>
import { ref } from 'vue'
import { DadsDatePicker } from '@dads/vue'

const date = ref('')
</script>

<template>
  <DadsDatePicker v-model="date" label="日付" />
</template>
```

## ラベル付き / Hint

`label` でラベル、`hint` で補助テキストを表示する。`hint` は `aria-describedby` で先頭の入力に紐付く。

<div class="demo">
  <DadsDatePicker
    v-model="dob"
    label="生年月日"
    hint="西暦で入力してください（例: 1990-01-01）"
  />
</div>

## Required

`required` で必須バッジを表示し、`aria-required="true"` を付与する。

<div class="demo">
  <DadsDatePicker label="申請日" required />
</div>

## ErrorMessage

`errorMessage` を渡すと、エラー視覚状態 + `role="alert"` のメッセージ + `aria-invalid="true"` がまとめて有効になる。

<div class="demo">
  <DadsDatePicker
    v-model="errored"
    label="郵送希望日"
    error-message="日付を入力してください"
  />
</div>

## Size

3 サイズ (`lg` / `md` / `sm`)。デフォルトは `md`。`xs` は仕様外。

<div class="demo">
  <div class="demo-row" style="flex-direction:column;align-items:flex-start;gap:1rem">
    <DadsDatePicker size="lg" label="LG" />
    <DadsDatePicker size="md" label="MD" />
    <DadsDatePicker size="sm" label="SM" />
  </div>
</div>

## Disabled / Readonly

<div class="demo">
  <div class="demo-row" style="flex-direction:column;align-items:flex-start;gap:1rem">
    <DadsDatePicker v-model="disabledDate" label="Disabled" disabled />
    <DadsDatePicker v-model="readonlyDate" label="Readonly" readonly />
  </div>
</div>

## Min / Max

`min` / `max` に ISO 文字列を渡すと、カレンダー上の範囲外の日付がグレーアウトしてクリックできなくなる。

<div class="demo">
  <DadsDatePicker
    v-model="ranged"
    label="申請可能日"
    min="2026-05-10"
    max="2026-05-25"
    hint="2026-05-10 〜 2026-05-25 の範囲のみ選択できます"
  />
</div>

## Props

| Prop           | 型                     | デフォルト | 説明                                                     |
| -------------- | ---------------------- | ---------- | -------------------------------------------------------- |
| `modelValue`   | `string`               | `''`       | `v-model` の値 (`YYYY-MM-DD`)                            |
| `label`        | `string`               | -          | コントロール上に表示するラベル                           |
| `hint`         | `string`               | -          | コントロール下に表示する補助テキスト                     |
| `errorMessage` | `string`               | -          | エラーメッセージ。指定するとエラー視覚状態と aria が有効 |
| `required`     | `boolean`              | `false`    | 必須バッジを表示し `aria-required` を付与                |
| `disabled`     | `boolean`              | `false`    | 操作不可化                                               |
| `readonly`     | `boolean`              | `false`    | 読み取り専用（破線ボーダー）                             |
| `error`        | `boolean`              | `false`    | メッセージ無しでエラー視覚状態を強制                     |
| `size`         | `'lg' \| 'md' \| 'sm'` | `'md'`     | サイズ                                                   |
| `min`          | `string`               | -          | 選択可能な最早日 (`YYYY-MM-DD`)                          |
| `max`          | `string`               | -          | 選択可能な最遅日 (`YYYY-MM-DD`)                          |
| `placeholder`  | `string`               | -          | 各入力欄のプレースホルダー                               |
| `name`         | `string`               | -          | フォーム送信用の `name` 属性                             |
| `id`           | `string`               | -          | コントロールのベース `id`。未指定時は自動生成            |

## Events

| Event               | Payload      | 説明                                                  |
| ------------------- | ------------ | ----------------------------------------------------- |
| `update:modelValue` | `string`     | 値が変更されたとき（`v-model`）。空文字は未入力を表す |
| `change`            | `string`     | `update:modelValue` と同時発火                        |
| `focus`             | `FocusEvent` | いずれかの入力欄がフォーカスを受けたとき              |
| `blur`              | `FocusEvent` | いずれかの入力欄からフォーカスが外れたとき            |

## アクセシビリティ

- 年/月/日の 3 入力は `<label>` でラップし、ラベルテキスト「年」「月」「日」を視覚的に保持。`label` を渡すと先頭（年）入力の `id` と `<label for>` が自動で結ばれる
- カレンダーボタンには `aria-haspopup="dialog"` と `aria-expanded` を付与。開閉状態を支援技術へ通知する
- `Escape` キーでポップオーバーを閉じ、フォーカスをカレンダーボタンへ戻す
- `errorMessage` 指定時は `aria-invalid="true"` と `role="alert"` が各入力欄に自動で付与される
- `hint` / `errorMessage` は `aria-describedby` で入力欄に紐付き、スクリーンリーダーが追加情報を読み上げる
