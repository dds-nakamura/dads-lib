# InputText

1 行のテキスト入力欄。ラベル・ヒント・エラー・カウンター・前後アイコンを内蔵し、`v-model` で文字列または数値を双方向バインドする。公式 slug は `input-text`。

## 基本

<script setup>
import { ref } from 'vue'
import { DadsInputText } from '@dads/vue'

const name = ref('')
const email = ref('')
const age = ref(0)
const search = ref('')
const memo = ref('')
const zip = ref('123')
</script>

<div class="demo">
  <DadsInputText v-model="name" label="氏名" placeholder="山田 太郎" />
</div>

```vue
<script setup>
import { ref } from 'vue'
import { DadsInputText } from '@dads/vue'

const name = ref('')
</script>

<template>
  <DadsInputText v-model="name" label="氏名" placeholder="山田 太郎" />
</template>
```

## Size

3 サイズ (`lg` / `md` / `sm`)。デフォルトは `md`。`xs` は仕様外。

<div class="demo">
  <div class="demo-row">
    <DadsInputText size="lg" label="LG" placeholder="large" />
    <DadsInputText size="md" label="MD" placeholder="medium" />
    <DadsInputText size="sm" label="SM" placeholder="small" />
  </div>
</div>

## Type

ネイティブの `type` 属性を切り替える。`number` の場合 `v-model` は数値として更新される。

<div class="demo">
  <div class="demo-row">
    <DadsInputText v-model="email" type="email" label="メールアドレス" placeholder="user@example.com" />
    <DadsInputText type="password" label="パスワード" placeholder="••••••••" />
    <DadsInputText v-model="age" type="number" label="年齢" />
    <DadsInputText v-model="search" type="search" label="検索" placeholder="キーワード" />
  </div>
</div>

## ラベルとヒント

`label` でラベル、`hint` で補助テキストを表示する。`hint` は `aria-describedby` で input に紐付く。

<div class="demo">
  <DadsInputText
    label="メールアドレス"
    hint="例: user@example.com の形式で入力してください"
    type="email"
  />
</div>

## 必須

`required` で必須バッジを表示し、`aria-required="true"` を付与する。

<div class="demo">
  <DadsInputText label="電話番号" required placeholder="090-0000-0000" />
</div>

## エラー

`errorMessage` を渡すと、エラー視覚状態 + `role="alert"` のメッセージ + `aria-invalid="true"` がまとめて有効になる。
メッセージを別所に表示している場合は `error` だけを使う。

<div class="demo">
  <DadsInputText
    v-model="zip"
    label="郵便番号"
    error-message="7 桁の数字で入力してください"
  />
  <DadsInputText label="メッセージ別表示" error placeholder="error 視覚状態のみ" />
</div>

## 状態

<div class="demo">
  <div class="demo-row">
    <DadsInputText label="Default" placeholder="default" />
    <DadsInputText label="Disabled" disabled model-value="編集不可" />
    <DadsInputText label="Readonly" readonly model-value="読取専用" />
  </div>
</div>

## アイコン

`prependIcon` / `appendIcon` に Material Design Icons のクラス名を渡す。
利用側で `@mdi/font` の CSS を読み込むことが前提（カタログ側では未ロードのためここでは表示されない）。

```vue
<DadsInputText prepend-icon="mdi-magnify" label="検索" placeholder="キーワード" />
<DadsInputText append-icon="mdi-email" label="メール" type="email" />
```

## カウンター

`counter` で最大文字数の目安を表示する。コンポーネント自体は制限を行わないので、`maxlength` と併用する。

<div class="demo">
  <DadsInputText
    v-model="memo"
    label="自己紹介"
    placeholder="200 文字以内で入力"
    :counter="200"
    :maxlength="200"
  />
</div>

## i18n / 国際化対応

「必須」バッジのテキストは `requiredLabel` プロップで上書きできる。多言語サイトでロケールに応じて切り替えるユースケースを想定している。`required` を併せて指定したときのみバッジが表示される。

<div class="demo">
  <DadsInputText label="Phone number" required required-label="Required" placeholder="090-0000-0000" />
</div>

```vue
<DadsInputText
  label="Phone number"
  required
  required-label="Required"
  placeholder="090-0000-0000"
/>
```

## Props

| Prop            | 型                                                                          | デフォルト | 説明                                                     |
| --------------- | --------------------------------------------------------------------------- | ---------- | -------------------------------------------------------- |
| `modelValue`    | `string \| number`                                                          | -          | `v-model` の値                                           |
| `type`          | `'text' \| 'email' \| 'password' \| 'tel' \| 'url' \| 'number' \| 'search'` | `'text'`   | ネイティブ input type                                    |
| `placeholder`   | `string`                                                                    | -          | プレースホルダー                                         |
| `name`          | `string`                                                                    | -          | フォーム送信用の `name` 属性                             |
| `id`            | `string`                                                                    | -          | input の `id`。未指定時は自動生成                        |
| `autocomplete`  | `string`                                                                    | -          | ネイティブ `autocomplete` 属性                           |
| `maxlength`     | `number`                                                                    | -          | 入力可能な最大文字数                                     |
| `inputmode`     | `'text' \| 'numeric' \| 'decimal' \| 'tel' \| 'search' \| 'email' \| 'url'` | -          | モバイル向けキーボードヒント                             |
| `size`          | `'lg' \| 'md' \| 'sm'`                                                      | `'md'`     | サイズ                                                   |
| `label`         | `string`                                                                    | -          | input 上に表示するラベル                                 |
| `hint`          | `string`                                                                    | -          | input 下に表示する補助テキスト                           |
| `errorMessage`  | `string`                                                                    | -          | エラーメッセージ。指定するとエラー視覚状態と aria が有効 |
| `required`      | `boolean`                                                                   | `false`    | 必須バッジを表示し `aria-required` を付与                |
| `error`         | `boolean`                                                                   | `false`    | メッセージ無しでエラー視覚状態を強制                     |
| `disabled`      | `boolean`                                                                   | `false`    | 操作不可化                                               |
| `readonly`      | `boolean`                                                                   | `false`    | 読み取り専用（破線ボーダー）                             |
| `prependIcon`   | `string`                                                                    | -          | 前置アイコンの MDI クラス名                              |
| `appendIcon`    | `string`                                                                    | -          | 後置アイコンの MDI クラス名                              |
| `counter`       | `number`                                                                    | -          | `現在文字数 / counter` を表示（制限はしない）            |
| `requiredLabel` | `string`                                                                    | `'必須'`   | 「必須」バッジに表示するテキスト。i18n 用に上書き可能    |

## Events

| Event               | Payload            | 説明                            |
| ------------------- | ------------------ | ------------------------------- |
| `update:modelValue` | `string \| number` | 値が変更されたとき（`v-model`） |
| `change`            | `Event`            | ネイティブ `change` の発火時    |
| `focus`             | `FocusEvent`       | フォーカス時                    |
| `blur`              | `FocusEvent`       | フォーカスが外れたとき          |

## アクセシビリティ

- `label` を渡すと `<label for>` と input の `id` が自動で結ばれる。`id` を省略しても一意な ID が生成される
- `hint` / `errorMessage` / `counter` は `aria-describedby` で input に紐付き、スクリーンリーダーが追加情報を読み上げる
- `errorMessage` 指定時は `aria-invalid="true"` と `role="alert"` が自動付与される。`error` プロップ単体でも `aria-invalid` は立つ
- `required` 指定時は視覚バッジと `aria-required="true"` の両方を提供し、補助技術にも必須を伝える
- ラベルを外部に置く headless 用途では、利用側で `aria-label` を付与してアクセシブル名を必ず確保する

## マイグレーション (DadsTextField → DadsInputText)

旧名 `DadsTextField` は major リリース (Issue #14) で削除済み。新規コード・既存コードともに `DadsInputText` を使用すること。CSS クラスも `dads-text-field*` から `dads-input-text*` に変更されている。

```ts
// 旧 (削除済み)
// import { DadsTextField } from '@dads/vue'
// 新
import { DadsInputText } from '@dads/vue'
```
