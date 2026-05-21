# SearchBox

検索クエリを入力して送信するための専用入力欄。検索アイコン付きの input と送信ボタンを 1 つのコントロールとして提供し、`v-model` でクエリ文字列を双方向バインドする。Enter キーまたはボタンクリックで `search` イベントを発火する。

## 基本

<script setup>
import { ref } from 'vue'
import { DadsSearchBox } from '@dads/vue'

const query = ref('')
const lastSearched = ref('')
const onSearch = (value) => {
  lastSearched.value = value
}

const querySm = ref('')
const queryLg = ref('')
const queryDisabled = ref('編集不可')
const queryReadonly = ref('読取専用クエリ')
const queryError = ref('a')
const queryHint = ref('')
const queryButtonLabel = ref('')
</script>

<div class="demo">
  <DadsSearchBox v-model="query" label="サイト内検索" placeholder="キーワードを入力" @search="onSearch" />
  <p class="demo-label" style="margin-top:0.5rem">最後に検索: <code>{{ lastSearched || '(まだ未送信)' }}</code></p>
</div>

```vue
<script setup>
import { ref } from 'vue'
import { DadsSearchBox } from '@dads/vue'

const query = ref('')
const onSearch = (value) => {
  console.log('search:', value)
}
</script>

<template>
  <DadsSearchBox
    v-model="query"
    label="サイト内検索"
    placeholder="キーワードを入力"
    @search="onSearch"
  />
</template>
```

## Size

3 サイズ (`lg` / `md` / `sm`)。デフォルトは `md`。`xs` は仕様外。

<div class="demo">
  <DadsSearchBox v-model="queryLg" size="lg" label="LG" placeholder="large" />
  <DadsSearchBox v-model="query" size="md" label="MD" placeholder="medium" />
  <DadsSearchBox v-model="querySm" size="sm" label="SM" placeholder="small" />
</div>

## Disabled

`disabled` を渡すと input と送信ボタンの両方が操作不可になる。

<div class="demo">
  <DadsSearchBox v-model="queryDisabled" label="無効化" disabled />
</div>

## Readonly

`readonly` は input のみ読み取り専用にする（破線ボーダー）。送信ボタンはクリック可能のまま。

<div class="demo">
  <DadsSearchBox v-model="queryReadonly" label="読取専用" readonly @search="onSearch" />
</div>

## エラー

`errorMessage` を渡すと、エラー視覚状態 + `role="alert"` のメッセージ + `aria-invalid="true"` がまとめて有効になる。

<div class="demo">
  <DadsSearchBox
    v-model="queryError"
    label="検索"
    error-message="2 文字以上で入力してください"
  />
</div>

## プレースホルダー / ヒント

`placeholder` で空欄時の表示、`hint` で input 下の補助テキストを設定する。`hint` は `aria-describedby` で input に紐付く。

<div class="demo">
  <DadsSearchBox
    v-model="queryHint"
    label="施設検索"
    placeholder="例: 子育て支援センター"
    hint="施設名・住所・郵便番号で検索できます"
  />
</div>

## ボタンラベルのカスタマイズ

`buttonLabel` で送信ボタンの文言を変更できる。ラベルを省略したヘッドレス用途では、この文字列が input の visually-hidden なアクセシブル名としても使われる。

<div class="demo">
  <DadsSearchBox v-model="queryButtonLabel" button-label="Search" placeholder="Search the site" />
</div>

## Props

| Prop            | 型                     | デフォルト | 説明                                                     |
| --------------- | ---------------------- | ---------- | -------------------------------------------------------- |
| `modelValue`    | `string`               | `''`       | `v-model` のクエリ文字列                                 |
| `placeholder`   | `string`               | -          | プレースホルダー                                         |
| `label`         | `string`               | -          | input 上に表示するラベル                                 |
| `hint`          | `string`               | -          | input 下に表示する補助テキスト                           |
| `errorMessage`  | `string`               | -          | エラーメッセージ。指定するとエラー視覚状態と aria が有効 |
| `required`      | `boolean`              | `false`    | 必須バッジを表示し `aria-required` を付与                |
| `disabled`      | `boolean`              | `false`    | 操作不可化 (input + 送信ボタン)                          |
| `readonly`      | `boolean`              | `false`    | input のみ読み取り専用 (破線ボーダー)                    |
| `error`         | `boolean`              | `false`    | メッセージ無しでエラー視覚状態を強制                     |
| `size`          | `'lg' \| 'md' \| 'sm'` | `'md'`     | サイズ                                                   |
| `name`          | `string`               | -          | フォーム送信用の `name` 属性                             |
| `id`            | `string`               | -          | input の `id`。未指定時は自動生成                        |
| `buttonLabel`   | `string`               | `'検索'`   | 送信ボタンの文言 (ラベル省略時はアクセシブル名にも流用)  |
| `requiredLabel` | `string`               | `'必須'`   | 「必須」バッジに表示するテキスト。i18n 用に上書き可能    |

## Events

| Event               | Payload      | 説明                                               |
| ------------------- | ------------ | -------------------------------------------------- |
| `update:modelValue` | `string`     | 入力値が変更されたとき（`v-model`）                |
| `search`            | `string`     | Enter キー または 送信ボタンクリックで送信したとき |
| `focus`             | `FocusEvent` | フォーカス時                                       |
| `blur`              | `FocusEvent` | フォーカスが外れたとき                             |

## アクセシビリティ

- `label` を渡すと `<label for>` と input の `id` が自動で結ばれる。`id` を省略しても一意な ID が生成される
- `label` を省略した場合は `dads-u-visually-hidden` クラスで隠された `buttonLabel` 文字列が入力欄のアクセシブル名になる（DADS HTML 版実装の `<span class="dads-u-visually-hidden">検索</span>` パターンを踏襲）
- `hint` / `errorMessage` は `aria-describedby` で input に紐付き、スクリーンリーダーが追加情報を読み上げる
- `errorMessage` 指定時は `aria-invalid="true"` と `role="alert"` が自動付与される
- 検索アイコンは装飾のため `aria-hidden="true"`。送信ボタンには可視テキスト (`検索`) があるため `aria-label` は不要
- IME 変換中の Enter キーは `search` を発火しない（`isComposing` を検査）
