# Select

選択肢の中から 1 つまたは複数の値を選ぶための combobox。`role="listbox"` を内包し、キーボード操作・型先頭一致 (type-ahead)・aria-activedescendant に対応する。

## 基本

`v-model` で選択値を双方向バインディングする。`items` には `value` / `title` を持つオブジェクト配列を渡す。

<script setup>
import { ref } from 'vue'
import { DadsSelect } from '@dads/vue'

const prefectures = [
  { value: 'tokyo', title: '東京都' },
  { value: 'osaka', title: '大阪府' },
  { value: 'kyoto', title: '京都府' },
  { value: 'hokkaido', title: '北海道' },
  { value: 'okinawa', title: '沖縄県' },
]

const selectedPrefecture = ref(null)
const selectedSize = ref(null)
const selectedRole = ref(null)
const selectedPlaceholder = ref(null)
const selectedHint = ref(null)
const selectedError = ref(null)
const selectedRequired = ref(null)
const selectedDisabled = ref('tokyo')
const selectedReadonly = ref('osaka')
const selectedMultiple = ref([])

const sizes = [
  { value: 'lg', title: 'Large' },
  { value: 'md', title: 'Medium' },
  { value: 'sm', title: 'Small' },
]

const roles = [
  { value: 'admin', title: '管理者' },
  { value: 'editor', title: '編集者' },
  { value: 'viewer', title: '閲覧者', disabled: true },
]
</script>

<div class="demo">
  <DadsSelect
    v-model="selectedPrefecture"
    :items="prefectures"
    label="都道府県"
    placeholder="選択してください"
  />
</div>

```vue
<script setup>
import { ref } from 'vue'
import { DadsSelect } from '@dads/vue'

const prefectures = [
  { value: 'tokyo', title: '東京都' },
  { value: 'osaka', title: '大阪府' },
  { value: 'kyoto', title: '京都府' },
]
const selected = ref(null)
</script>

<template>
  <DadsSelect
    v-model="selected"
    :items="prefectures"
    label="都道府県"
    placeholder="選択してください"
  />
</template>
```

## Size

3 サイズ (`lg` / `md` / `sm`)。デフォルトは `md`。

<div class="demo">
  <div class="demo-row">
    <DadsSelect v-model="selectedSize" :items="sizes" size="lg" placeholder="Large" />
    <DadsSelect v-model="selectedSize" :items="sizes" size="md" placeholder="Medium" />
    <DadsSelect v-model="selectedSize" :items="sizes" size="sm" placeholder="Small" />
  </div>
</div>

## 複数選択

`multiple` を指定すると配列で複数の値を保持できる。選択値はチップとして表示され、`×` で個別に解除できる。

<div class="demo">
  <DadsSelect
    v-model="selectedMultiple"
    :items="prefectures"
    multiple
    label="勤務地（複数可）"
    placeholder="選択してください"
  />
</div>

## Placeholder / Hint

`placeholder` は未選択時の表示、`hint` はフィールド下部の補助テキスト。

<div class="demo">
  <DadsSelect
    v-model="selectedPlaceholder"
    :items="prefectures"
    label="本籍地"
    placeholder="都道府県を選択"
  />
  <DadsSelect
    v-model="selectedHint"
    :items="prefectures"
    label="居住地"
    placeholder="選択してください"
    hint="現在お住まいの都道府県を選んでください"
  />
</div>

## 無効化オプション

`items[].disabled` を `true` にすると、その選択肢のみ無効化できる。

<div class="demo">
  <DadsSelect
    v-model="selectedRole"
    :items="roles"
    label="権限"
    placeholder="役割を選択"
  />
</div>

## 状態

`required` / `disabled` / `readonly` / `error` (または `errorMessage`) を組み合わせて利用する。

<div class="demo">
  <DadsSelect
    v-model="selectedRequired"
    :items="prefectures"
    label="所属都道府県"
    placeholder="選択してください"
    required
  />
  <DadsSelect
    v-model="selectedError"
    :items="prefectures"
    label="勤務地"
    placeholder="選択してください"
    error-message="勤務地を選択してください"
  />
  <DadsSelect
    v-model="selectedDisabled"
    :items="prefectures"
    label="無効化"
    disabled
  />
  <DadsSelect
    v-model="selectedReadonly"
    :items="prefectures"
    label="読み取り専用"
    readonly
  />
</div>

## カスタムキー

`itemValue` / `itemTitle` で `value` / `title` 以外のプロパティを参照できる。

```vue
<DadsSelect
  v-model="selected"
  :items="[
    { code: 'JP', label: '日本' },
    { code: 'US', label: 'アメリカ' },
  ]"
  item-value="code"
  item-title="label"
/>
```

## Props

| Prop                    | 型                                             | デフォルト                 | 説明                                                               |
| ----------------------- | ---------------------------------------------- | -------------------------- | ------------------------------------------------------------------ |
| `modelValue`            | `string \| number \| boolean \| Array \| null` | -                          | `v-model` の値。`multiple` の場合は配列                            |
| `items`                 | `DadsSelectItem[]`                             | `[]`                       | 選択肢の配列                                                       |
| `itemValue`             | `string`                                       | `'value'`                  | 各 item の値として参照するキー名                                   |
| `itemTitle`             | `string`                                       | `'title'`                  | 各 item の表示テキストとして参照するキー名                         |
| `multiple`              | `boolean`                                      | `false`                    | 複数選択モード                                                     |
| `placeholder`           | `string`                                       | -                          | 未選択時の表示                                                     |
| `id`                    | `string`                                       | -                          | trigger の id (省略時は自動生成し label `for` / aria 参照を同期)   |
| `name`                  | `string`                                       | -                          | フォーム送信時の name                                              |
| `size`                  | `'lg' \| 'md' \| 'sm'`                         | `'md'`                     | サイズ                                                             |
| `label`                 | `string`                                       | -                          | 上部に表示するラベル                                               |
| `hint`                  | `string`                                       | -                          | 下部に表示する補助テキスト                                         |
| `errorMessage`          | `string`                                       | -                          | エラーメッセージ。設定するとエラー表示状態になり aria で関連付ける |
| `required`              | `boolean`                                      | `false`                    | 必須マーク表示と `aria-required="true"`                            |
| `error`                 | `boolean`                                      | `false`                    | エラー視覚状態を強制する (メッセージなしで赤枠だけにしたいとき)    |
| `disabled`              | `boolean`                                      | `false`                    | 操作不可化                                                         |
| `readonly`              | `boolean`                                      | `false`                    | 読み取り専用 (開閉・選択を抑止)                                    |
| `formatRemoveAriaLabel` | `(title: string) => string`                    | `` (t) => `${t} を削除` `` | `multiple` のチップ × ボタン aria-label のフォーマッタ             |
| `requiredLabel`         | `string`                                       | `'必須'`                   | 「必須」バッジに表示するテキスト。i18n 用に上書き可能              |

## Events

| Event               | Payload                | 説明                               |
| ------------------- | ---------------------- | ---------------------------------- |
| `update:modelValue` | `DadsSelectModelValue` | `v-model` 用の値更新               |
| `change`            | `DadsSelectModelValue` | 選択値が変更されたとき             |
| `focus`             | `FocusEvent`           | trigger がフォーカスを得たとき     |
| `blur`              | `FocusEvent`           | trigger からフォーカスが外れたとき |
| `open`              | -                      | listbox が開いたとき               |
| `close`             | -                      | listbox が閉じたとき               |

## アクセシビリティ

- trigger は `role="combobox"` + `aria-haspopup="listbox"` + `aria-expanded` を持ち、`aria-activedescendant` でキーボードカーソル位置を伝える
- キーボード操作: `ArrowDown` / `ArrowUp` で項目移動、`Home` / `End` で先頭・末尾、`Enter` / `Space` で確定、`Escape` で閉じる
- 印字可能キーで先頭一致検索 (type-ahead)。500ms 静止で検索バッファをリセット
- `errorMessage` 設定時は `aria-invalid="true"` と `aria-describedby` でエラーを読み上げに紐付ける
- `required` 時は `aria-required="true"` を付与し、視覚的にも「必須」バッジを表示
