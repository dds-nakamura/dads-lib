# FileUpload

ファイル選択ダイアログとドラッグ＆ドロップに対応したファイルアップロード入力。`accept` / `maxSize` を指定するとコンポーネント内で検証し、拒否理由をエラーメッセージとして表示する。

## 基本

`v-model` で選択中のファイルを双方向バインドする。`multiple` の有無で `File | null` / `File[]` のいずれかになる。

<script setup>
import { ref } from 'vue'
import { DadsFileUpload } from '@dads/vue'

const single = ref(null)
const multiple = ref([])
const accepted = ref(null)
const sized = ref(null)
const disabled = ref(null)
const errored = ref(null)
const required = ref(null)
const progressing = ref(null)
</script>

<div class="demo">
  <DadsFileUpload v-model="single" label="ファイル" />
  <span class="demo-label">選択中: {{ single ? single.name : '(未選択)' }}</span>
</div>

```vue
<script setup>
import { ref } from 'vue'
import { DadsFileUpload } from '@dads/vue'

const file = (ref < File) | (null > null)
</script>

<template>
  <DadsFileUpload v-model="file" label="ファイル" />
</template>
```

## Multiple

`multiple` を `true` にすると複数選択可能になり、`v-model` は `File[]` を扱う。

<div class="demo">
  <DadsFileUpload v-model="multiple" multiple label="ファイル（複数選択可）" />
  <span class="demo-label">選択数: {{ multiple.length }}</span>
</div>

```vue
<DadsFileUpload v-model="files" multiple label="ファイル（複数選択可）" />
```

## accept

`accept` に MIME タイプや拡張子（カンマ区切り）を指定すると、ネイティブのダイアログだけでなくドロップされたファイルもコンポーネント内で検証される。

<div class="demo">
  <DadsFileUpload
    v-model="accepted"
    accept=".csv,text/csv,image/*"
    label="CSV または画像"
    hint=".csv / image/* のみ許可"
  />
</div>

```vue
<DadsFileUpload v-model="file" accept=".csv,text/csv,image/*" label="CSV または画像" />
```

## maxSize

`maxSize` で 1 ファイルあたりの最大バイト数を指定する。超過したファイルは拒否され、内部のエラーメッセージに反映される。

<div class="demo">
  <DadsFileUpload
    v-model="sized"
    :max-size="1024 * 100"
    label="100 KB まで"
    hint="サイズ上限を超えるファイルは拒否されます"
  />
</div>

```vue
<DadsFileUpload v-model="file" :max-size="1024 * 100" label="100 KB まで" />
```

## サイズ

公式 DADS の file-upload は単一サイズで、サイズバリアントは持たない。ドロップエリアは一律のパディング (16px / 24px) で描画される。

## 状態

`disabled` / `readonly` で操作を抑止、`required` で必須マーク、`error` または `errorMessage` でエラー状態を表示する。

<div class="demo">
  <DadsFileUpload v-model="disabled" label="無効化" disabled />
  <DadsFileUpload label="読み取り専用" readonly />
  <DadsFileUpload v-model="required" label="必須項目" required />
  <DadsFileUpload v-model="errored" label="エラー" error-message="アップロードに失敗しました" />
</div>

```vue
<DadsFileUpload label="無効化" disabled />
<DadsFileUpload label="読み取り専用" readonly />
<DadsFileUpload label="必須項目" required />
<DadsFileUpload label="エラー" error-message="アップロードに失敗しました" />
```

## Progress

`progress` (0–100) を渡すとプログレスバーを表示する。アップロードの実行は呼び出し側が制御する。

<div class="demo">
  <DadsFileUpload v-model="progressing" label="アップロード中" :progress="60" />
</div>

```vue
<DadsFileUpload v-model="file" label="アップロード中" :progress="60" />
```

## Props

| Prop                | 型                         | デフォルト                         | 説明                                                                 |
| ------------------- | -------------------------- | ---------------------------------- | -------------------------------------------------------------------- |
| `modelValue`        | `File \| File[] \| null`   | -                                  | v-model 値。`multiple=true` のとき `File[]`、それ以外は `File`       |
| `accept`            | `string`                   | -                                  | 受け入れる拡張子 / MIME (例: `.csv,image/*`)。ドロップ時も検証       |
| `multiple`          | `boolean`                  | `false`                            | 複数選択を許可                                                       |
| `maxSize`           | `number`                   | -                                  | 1 ファイルあたりの最大バイト数。超過時は拒否                         |
| `label`             | `string`                   | -                                  | ラベルテキスト                                                       |
| `hint`              | `string`                   | -                                  | 補助テキスト                                                         |
| `errorMessage`      | `string`                   | -                                  | 呼び出し側のエラー文言（内部検証メッセージが優先）                   |
| `required`          | `boolean`                  | `false`                            | 必須マークと `aria-required` を付与                                  |
| `error`             | `boolean`                  | `false`                            | メッセージなしでエラー表示を強制                                     |
| `disabled`          | `boolean`                  | `false`                            | 操作不可化                                                           |
| `readonly`          | `boolean`                  | `false`                            | 読み取り専用                                                         |
| `progress`          | `number`                   | -                                  | アップロード進捗 0–100。指定するとプログレスバー表示                 |
| `name`              | `string`                   | -                                  | ネイティブ `name` 属性                                               |
| `id`                | `string`                   | 自動生成                           | ネイティブ `id`。省略時は label `for` と aria 参照のため自動生成     |
| `buttonText`        | `string`                   | `'ファイルを選択'`                 | トリガーボタンのラベル                                               |
| `dropzoneText`      | `string`                   | `'またはここにファイルをドロップ'` | ドロップ領域の補助テキスト                                           |
| `formatRemoveLabel` | `(name: string) => string` | `` (n) => `${n} を削除` ``         | 各ファイルの × ボタン aria-label のフォーマッタ。i18n 用に上書き可能 |
| `requiredLabel`     | `string`                   | `'必須'`                           | 「必須」バッジに表示するテキスト。i18n 用に上書き可能                |

## Events

| Event               | Payload                  | 説明                                      |
| ------------------- | ------------------------ | ----------------------------------------- |
| `update:modelValue` | `File \| File[] \| null` | v-model 更新時                            |
| `change`            | `File[]`                 | 検証通過後、受理されたファイル群で発火    |
| `remove`            | `File`                   | × ボタンで個別ファイルが削除されたとき    |
| `focus`             | `FocusEvent`             | ネイティブ input がフォーカスを得たとき   |
| `blur`              | `FocusEvent`             | ネイティブ input がフォーカスを失ったとき |

## アクセシビリティ

- `label` を渡すと `<label for>` 経由でネイティブ input と関連付けられ、`id` 未指定でも自動生成 ID により参照が一貫する
- エラー時は `aria-invalid="true"` と `role="alert"` のエラーメッセージが `aria-describedby` で関連付けられる
- `required` 時は `aria-required="true"` を自動付与、視覚的な「必須」バッジは `aria-hidden` でスクリーンリーダーには重複読み上げされない
- `progress` を指定したバーは `role="progressbar"` と `aria-valuenow / valuemin / valuemax` を持つ
- 個別ファイル削除ボタンには `${ファイル名} を削除` という `aria-label` が付き、キーボードのみでも除去操作が可能
