# RadioGroup

複数の選択肢から **1 つだけ** を選ばせるラジオボタンのグループ。`<fieldset>` + `<legend>` をベースに、向き・サイズ・必須・エラー・ヒントを一括で制御する。

## 基本

`items` に `{ value, label }` の配列を渡し、`v-model` で選択値を双方向バインドする。

<script setup>
import { ref } from 'vue'
import { DadsRadioGroup } from '@dads/vue'

const fruit = ref('')
const fruitItems = [
  { value: 'apple', label: 'りんご' },
  { value: 'orange', label: 'みかん' },
  { value: 'grape', label: 'ぶどう' },
]

const direction = ref('banana')
const directionItems = [
  { value: 'apple', label: 'りんご' },
  { value: 'banana', label: 'バナナ' },
  { value: 'cherry', label: 'さくらんぼ' },
]

const sizeValue = ref('md')
const sizeItems = [
  { value: 'lg', label: 'LG' },
  { value: 'md', label: 'MD' },
  { value: 'sm', label: 'SM' },
]

const hintValue = ref('')
const hintItems = [
  { value: 'a', label: 'プラン A', hint: '個人向け' },
  { value: 'b', label: 'プラン B', hint: '法人向け' },
]

const descValue = ref('')
const descItems = [
  { value: 'free', label: '無料プラン', description: '月額 ¥0 / 月間 1,000 リクエストまで' },
  { value: 'pro', label: 'Pro プラン', description: '月額 ¥980 / 月間 50,000 リクエストまで' },
  { value: 'biz', label: 'Business プラン', description: '月額 ¥4,800 / 月間 500,000 リクエストまで' },
]

const hiddenLegendValue = ref('')

const disabledValue = ref('orange')

const errorValue = ref('')

const requiredValue = ref('')
</script>

<div class="demo">
  <DadsRadioGroup
    v-model="fruit"
    legend="好きな果物を選んでください"
    :items="fruitItems"
  />
  <p style="margin-top:0.75rem">選択値: <code>{{ fruit || '(未選択)' }}</code></p>
</div>

```vue
<script setup>
import { ref } from 'vue'
import { DadsRadioGroup } from '@dads/vue'

const fruit = ref('')
const items = [
  { value: 'apple', label: 'りんご' },
  { value: 'orange', label: 'みかん' },
  { value: 'grape', label: 'ぶどう' },
]
</script>

<template>
  <DadsRadioGroup v-model="fruit" legend="好きな果物を選んでください" :items="items" />
</template>
```

## 方向

`direction` で並びを切り替える (`vertical` / `horizontal`)。デフォルトは `vertical`。

<div class="demo">
  <span class="demo-label">vertical (default)</span>
  <DadsRadioGroup
    v-model="direction"
    direction="vertical"
    :items="directionItems"
  />
  <span class="demo-label" style="margin-top:1rem">horizontal</span>
  <DadsRadioGroup
    v-model="direction"
    direction="horizontal"
    :items="directionItems"
  />
</div>

## Size

3 サイズ (`lg` / `md` / `sm`)。デフォルトは `md`。

<div class="demo">
  <span class="demo-label">lg</span>
  <DadsRadioGroup v-model="sizeValue" size="lg" :items="sizeItems" direction="horizontal" />
  <span class="demo-label" style="margin-top:1rem">md</span>
  <DadsRadioGroup v-model="sizeValue" size="md" :items="sizeItems" direction="horizontal" />
  <span class="demo-label" style="margin-top:1rem">sm</span>
  <DadsRadioGroup v-model="sizeValue" size="sm" :items="sizeItems" direction="horizontal" />
</div>

## ヒント

`hint` でグループ全体のヒントを、`items[i].hint` で各選択肢のヒントを表示できる。

<div class="demo">
  <DadsRadioGroup
    v-model="hintValue"
    legend="プランを選択"
    hint="あとから変更できます"
    :items="hintItems"
  />
</div>

## 説明 (description)

`items[i].description` で各選択肢の説明文をラベル直下に表示できる。プラン選択リストなど、各項目に詳細説明が必要な場面で使う。`aria-describedby` 経由でスクリーンリーダーにも読み上げられる。

<div class="demo">
  <DadsRadioGroup
    v-model="descValue"
    legend="プランを選択"
    :items="descItems"
  />
</div>

## Legend を視覚的に隠す

`legendVisuallyHidden` を `true` にすると、`<legend>` を DOM に残したまま視覚的に非表示にする。隣接する UI で視覚的にラベル付けされているが、a11y 上はグループ名が必要な場合に使う。

<div class="demo">
  <DadsRadioGroup
    v-model="hiddenLegendValue"
    legend="好きな果物を選んでください"
    legend-visually-hidden
    :items="fruitItems"
    direction="horizontal"
  />
</div>

```vue
<DadsRadioGroup
  v-model="value"
  legend="好きな果物を選んでください"
  legend-visually-hidden
  :items="items"
/>
```

## 状態

`required` / `disabled` / `error` + `errorMessage` の組み合わせで状態を表現する。

<div class="demo">
  <span class="demo-label">required (legend に必須バッジ)</span>
  <DadsRadioGroup
    v-model="requiredValue"
    legend="同意しますか"
    required
    :items="[{ value: 'yes', label: 'はい' }, { value: 'no', label: 'いいえ' }]"
    direction="horizontal"
  />
  <span class="demo-label" style="margin-top:1rem">disabled (グループ全体)</span>
  <DadsRadioGroup
    v-model="disabledValue"
    legend="好きな果物"
    disabled
    :items="fruitItems"
    direction="horizontal"
  />
  <span class="demo-label" style="margin-top:1rem">error + errorMessage</span>
  <DadsRadioGroup
    v-model="errorValue"
    legend="必須項目"
    required
    error-message="いずれかを選択してください"
    :items="fruitItems"
    direction="horizontal"
  />
</div>

## Props

| Prop                   | 型                                    | デフォルト   | 説明                                                              |
| ---------------------- | ------------------------------------- | ------------ | ----------------------------------------------------------------- |
| `modelValue`           | `string \| number \| boolean \| null` | -            | 選択中の値 (`v-model` 対応)                                       |
| `items`                | `DadsRadioGroupItem[]`                | -            | 必須。各要素は `{ value, label, disabled?, hint?, description? }` |
| `legend`               | `string`                              | -            | `<legend>` テキスト。グループのアクセシブル名                     |
| `legendVisuallyHidden` | `boolean`                             | `false`      | `<legend>` を DOM に残したまま視覚的に隠す                        |
| `direction`            | `'vertical' \| 'horizontal'`          | `'vertical'` | 並びの方向                                                        |
| `size`                 | `'lg' \| 'md' \| 'sm'`                | `'md'`       | サイズ (全 radio に伝播)                                          |
| `hint`                 | `string`                              | -            | グループ直下のヒント。エラー表示時は隠れる                        |
| `errorMessage`         | `string`                              | -            | エラーメッセージ。指定時は自動的にエラー状態になる                |
| `required`             | `boolean`                             | `false`      | `<legend>` 内に必須バッジを表示                                   |
| `error`                | `boolean`                             | `false`      | エラー視覚状態を強制 (各 radio にも伝播)                          |
| `disabled`             | `boolean`                             | `false`      | グループ全体を無効化 (`<fieldset disabled>` 経由)                 |
| `name`                 | `string`                              | -            | 全 radio に共有する `name`。省略時はユニーク値が自動生成          |
| `id`                   | `string`                              | -            | `<fieldset>` の `id`。省略時は自動生成                            |
| `requiredLabel`        | `string`                              | `'必須'`     | 「必須」バッジに表示するテキスト。i18n 用に上書き可能             |

## Events

| Event               | Payload                       | 説明                                |
| ------------------- | ----------------------------- | ----------------------------------- |
| `update:modelValue` | `string \| number \| boolean` | 選択値が変わったとき (`v-model` 用) |
| `change`            | `string \| number \| boolean` | 選択値が変わったとき (副次イベント) |

## アクセシビリティ

- ルートが `<fieldset>` + `<legend>` 構造なので、グループ名はスクリーンリーダーで自動的に読み上げられる
- `errorMessage` または `error` 指定時に `<fieldset>` へ `aria-invalid="true"` が付与される
- `hint` / `errorMessage` の `id` が `<fieldset>` の `aria-describedby` に紐付けられ、エラー時は error 側が優先される
- エラーメッセージは `role="alert"` でアナウンスされ、視覚的にも `--color-error` でハイライトされる
- `disabled` 指定時はネイティブ `<fieldset disabled>` の挙動により Tab フォーカスから外れる。矢印キーでの選択遷移はブラウザ標準のラジオグループ挙動に従う
