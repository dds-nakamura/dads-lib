# CheckboxGroup

複数のチェックボックスを `<fieldset>` でまとめ、共通の凡例 (`legend`) / ヒント / エラー / 必須表示を共有するグループコンポーネント。`v-model` は選択された値の配列を扱う。

## 基本

`items` に選択肢を渡し、選択値の配列を `v-model` でバインドする。

<script setup>
import { ref } from 'vue'
import { DadsCheckboxGroup } from '@dads/vue'

const interests = ref([])
const categoryItems = [
  { value: 'tech', label: 'テクノロジー' },
  { value: 'design', label: 'デザイン' },
  { value: 'business', label: 'ビジネス' },
]

const horizontal = ref([])
const sizeS = ref(['a'])
const sizeM = ref(['a'])
const sizeL = ref(['a'])
const itemSize = [
  { value: 'a', label: '選択肢A' },
  { value: 'b', label: '選択肢B' },
]

const withHint = ref([])
const withError = ref([])
const withRequired = ref([])
const disabledAll = ref(['design'])
const partial = ref([])
const partialItems = [
  { value: 'tech', label: 'テクノロジー' },
  { value: 'design', label: 'デザイン', disabled: true },
  { value: 'business', label: 'ビジネス' },
]

const withItemHint = ref([])
const itemHintItems = [
  { value: 'mail', label: 'メール通知', hint: '重要な更新をメールで受け取る' },
  { value: 'push', label: 'プッシュ通知', hint: 'モバイル端末に通知する' },
]
</script>

<div class="demo">
  <DadsCheckboxGroup
    v-model="interests"
    legend="興味のあるカテゴリ"
    :items="categoryItems"
  />
  <span class="demo-label" style="margin-top:1rem">選択中: {{ interests.join(', ') || '(なし)' }}</span>
</div>

```vue
<script setup>
import { ref } from 'vue'
import { DadsCheckboxGroup } from '@dads/vue'

const interests = ref([])
const items = [
  { value: 'tech', label: 'テクノロジー' },
  { value: 'design', label: 'デザイン' },
  { value: 'business', label: 'ビジネス' },
]
</script>

<template>
  <DadsCheckboxGroup v-model="interests" legend="興味のあるカテゴリ" :items="items" />
</template>
```

## 方向

`direction` は `vertical`（既定）/ `horizontal` の 2 種類。横並び時は折り返しに対応する。

<div class="demo">
  <span class="demo-label">vertical（既定）</span>
  <DadsCheckboxGroup
    v-model="interests"
    legend="縦並び"
    :items="categoryItems"
  />
  <span class="demo-label" style="margin-top:1rem">horizontal</span>
  <DadsCheckboxGroup
    v-model="horizontal"
    legend="横並び"
    direction="horizontal"
    :items="categoryItems"
  />
</div>

## Size

子チェックボックスへ伝搬する 3 サイズ（`sm` / `md` / `lg`）。デフォルトは `md`。

<div class="demo">
  <span class="demo-label">sm</span>
  <DadsCheckboxGroup v-model="sizeS" size="sm" direction="horizontal" :items="itemSize" />
  <span class="demo-label" style="margin-top:1rem">md（既定）</span>
  <DadsCheckboxGroup v-model="sizeM" size="md" direction="horizontal" :items="itemSize" />
  <span class="demo-label" style="margin-top:1rem">lg</span>
  <DadsCheckboxGroup v-model="sizeL" size="lg" direction="horizontal" :items="itemSize" />
</div>

## ヒントと項目別ヒント

グループ全体の `hint`、および `items[].hint` で個別のヒントを設定できる。

<div class="demo">
  <DadsCheckboxGroup
    v-model="withHint"
    legend="通知設定"
    hint="複数選択できます。あとから変更できます。"
    :items="itemHintItems"
  />
  <span class="demo-label" style="margin-top:1rem">項目別ヒント</span>
  <DadsCheckboxGroup
    v-model="withItemHint"
    legend="受信したい通知"
    :items="itemHintItems"
  />
</div>

## 状態

`required` は凡例横に「必須」バッジを表示、`errorMessage` を渡すとフッターにエラーを表示する。`error` は単独でエラー視覚を強制する。`disabled` は `<fieldset disabled>` として全項目を無効化、`items[].disabled` で個別に無効化もできる。

<div class="demo">
  <span class="demo-label">required</span>
  <DadsCheckboxGroup
    v-model="withRequired"
    legend="同意事項"
    required
    :items="[{ value: 'tos', label: '利用規約に同意する' }]"
  />
  <span class="demo-label" style="margin-top:1rem">error message</span>
  <DadsCheckboxGroup
    v-model="withError"
    legend="興味のあるカテゴリ"
    error-message="少なくとも 1 つ選択してください"
    :items="categoryItems"
  />
  <span class="demo-label" style="margin-top:1rem">disabled（全体）</span>
  <DadsCheckboxGroup
    v-model="disabledAll"
    legend="設定（変更不可）"
    disabled
    :items="categoryItems"
  />
  <span class="demo-label" style="margin-top:1rem">item disabled（個別）</span>
  <DadsCheckboxGroup
    v-model="partial"
    legend="興味のあるカテゴリ"
    :items="partialItems"
  />
</div>

## Props

| Prop           | 型                                | デフォルト   | 説明                                                            |
| -------------- | --------------------------------- | ------------ | --------------------------------------------------------------- |
| `modelValue`   | `(string \| number \| boolean)[]` | -            | 選択中の値の配列。`v-model` として双方向バインドする            |
| `items`        | `DadsCheckboxGroupItem[]`         | -（必須）    | 選択肢の配列。`{ value, label, disabled?, hint? }`              |
| `legend`       | `string`                          | -            | `<legend>` に表示するグループラベル                             |
| `direction`    | `'vertical' \| 'horizontal'`      | `'vertical'` | レイアウト方向                                                  |
| `size`         | `'sm' \| 'md' \| 'lg'`            | `'md'`       | 各チェックボックスのサイズ                                      |
| `hint`         | `string`                          | -            | フッターに表示する補助テキスト                                  |
| `errorMessage` | `string`                          | -            | エラーメッセージ。指定するとエラー視覚を有効化                  |
| `required`     | `boolean`                         | `false`      | 凡例横に「必須」バッジを表示                                    |
| `error`        | `boolean`                         | `false`      | エラー視覚を強制（メッセージなしでも適用）                      |
| `disabled`     | `boolean`                         | `false`      | `<fieldset>` 全体を無効化（`items[].disabled` も併用可能）      |
| `name`         | `string`                          | -            | 各 input の `name` 属性。非 AJAX のフォーム送信用               |
| `id`           | `string`                          | -            | `<fieldset>` の id。未指定時は自動採番（hint/error 参照に使用） |

## Events

| Event               | Payload                           | 説明                                         |
| ------------------- | --------------------------------- | -------------------------------------------- |
| `update:modelValue` | `(string \| number \| boolean)[]` | 選択値が変化したとき発火（`v-model` で利用） |
| `change`            | `(string \| number \| boolean)[]` | 同上。明示的に変化を購読したい場合に使用     |

## アクセシビリティ

- ルート要素は `<fieldset>` + `<legend>`。スクリーンリーダーがグループ単位で読み上げる
- `errorMessage` 指定時は `<fieldset>` に `aria-invalid="true"` と `aria-describedby` を自動付与し、`role="alert"` で即座に通知する
- `hint` 指定時は `aria-describedby` でヒント要素を関連付ける
- `required` バッジは視覚専用 (`aria-hidden`)。フォーム送信時の必須制約は呼び出し側でバリデーションを行うこと
- キーボード操作は各チェックボックスにフォーカス可能、`Space` で選択切替。`<fieldset disabled>` は全子要素のフォーカスを抑止する
