# Combobox

候補リストからの選択と任意文字列の自由入力を併用できるコンボボックス。`multiple` で複数選択時はチップとして表示する。

## 基本

`items` に候補を渡し、`v-model` で選択値をバインドする。リストにない文字列を `Enter` で確定するとそのまま値として採用される。

<script setup>
import { ref } from 'vue'
import { DadsCombobox } from '@dads/vue'

const prefectures = [
  { value: 'hokkaido', title: '北海道' },
  { value: 'aomori', title: '青森県' },
  { value: 'iwate', title: '岩手県' },
  { value: 'miyagi', title: '宮城県' },
  { value: 'akita', title: '秋田県' },
  { value: 'yamagata', title: '山形県' },
  { value: 'fukushima', title: '福島県' },
  { value: 'tokyo', title: '東京都' },
  { value: 'kanagawa', title: '神奈川県' },
  { value: 'osaka', title: '大阪府' },
  { value: 'kyoto', title: '京都府' },
  { value: 'fukuoka', title: '福岡県' },
  { value: 'okinawa', title: '沖縄県' },
]

const positions = [
  { value: 'staff', title: '担当' },
  { value: 'lead', title: 'リーダー' },
  { value: 'manager', title: 'マネージャー' },
  { value: 'director', title: '部長' },
  { value: 'executive', title: '役員' },
]

const single = ref(null)
const multi = ref([])
const sizeLg = ref(null)
const sizeMd = ref(null)
const sizeSm = ref(null)
const disabledValue = ref('tokyo')
const readonlyValue = ref('osaka')
const errorValue = ref(null)
const requiredValue = ref(null)
</script>

<div class="demo">
  <DadsCombobox
    v-model="single"
    label="都道府県"
    placeholder="都道府県を選択または入力"
    :items="prefectures"
  />
  <p class="demo-label" style="margin-top:1rem">選択値: {{ single ?? '(未選択)' }}</p>
</div>

```vue
<script setup>
import { ref } from 'vue'
import { DadsCombobox } from '@dads/vue'

const prefectures = [
  { value: 'tokyo', title: '東京都' },
  { value: 'osaka', title: '大阪府' },
  { value: 'kyoto', title: '京都府' },
]
const selected = ref(null)
</script>

<template>
  <DadsCombobox
    v-model="selected"
    label="都道府県"
    placeholder="都道府県を選択または入力"
    :items="prefectures"
  />
</template>
```

## 複数選択

`multiple` を有効にすると、選択値は配列となり、確定した値はチップとして表示される。チップ右側の閉じるボタンで削除可能。空欄状態で `Backspace` を押すと末尾のチップが削除される。

<div class="demo">
  <DadsCombobox
    v-model="multi"
    multiple
    label="役職（複数選択可）"
    placeholder="役職を入力または選択"
    :items="positions"
  />
  <p class="demo-label" style="margin-top:1rem">選択値: {{ multi.length ? multi.join(', ') : '(未選択)' }}</p>
</div>

## Size

3 サイズ (`lg` / `md` / `sm`)。デフォルトは `md`。`xs` は提供しない（TextField / Select と視覚的にそろえるため）。

<div class="demo">
  <span class="demo-label">lg</span>
  <DadsCombobox v-model="sizeLg" size="lg" :items="prefectures" placeholder="lg サイズ" />
  <span class="demo-label" style="margin-top:1rem">md (default)</span>
  <DadsCombobox v-model="sizeMd" size="md" :items="prefectures" placeholder="md サイズ" />
  <span class="demo-label" style="margin-top:1rem">sm</span>
  <DadsCombobox v-model="sizeSm" size="sm" :items="prefectures" placeholder="sm サイズ" />
</div>

## カスタムフィルター

既定では `title` への大文字小文字を区別しない部分一致でフィルタするが、`filter` に独自関数を渡すと差し替えられる。

```vue
<DadsCombobox
  v-model="selected"
  :items="prefectures"
  :filter="(item, query) => item.title.startsWith(query)"
/>
```

## ヒント文言

`hint` で補助テキストを表示する。

<div class="demo">
  <DadsCombobox
    label="勤務地"
    placeholder="都道府県を選択または入力"
    hint="リストにない地域名も自由入力できます"
    :items="prefectures"
  />
</div>

## 状態

### Required

`required` で必須マーク（「必須」バッジ）をラベル横に表示する。

<div class="demo">
  <DadsCombobox
    v-model="requiredValue"
    required
    label="所属（必須）"
    placeholder="所属を選択または入力"
    :items="positions"
  />
</div>

### Error

`errorMessage` を渡すとエラー表示が有効になり、文言がフッターに表示される。`error` のみ指定すると視覚状態だけ切り替えられる。

<div class="demo">
  <DadsCombobox
    v-model="errorValue"
    label="勤務地"
    placeholder="都道府県を選択または入力"
    error-message="勤務地は必ず入力してください"
    :items="prefectures"
  />
</div>

### Disabled / Readonly

`disabled` は完全に操作不可、`readonly` は値を保持したまま編集を抑止する。

<div class="demo">
  <DadsCombobox v-model="disabledValue" disabled label="無効" :items="prefectures" />
  <div style="height:1rem" />
  <DadsCombobox v-model="readonlyValue" readonly label="読み取り専用" :items="prefectures" />
</div>

## Props

| Prop           | 型                                               | デフォルト | 説明                                             |
| -------------- | ------------------------------------------------ | ---------- | ------------------------------------------------ |
| `modelValue`   | `string \| number \| (string\|number)[] \| null` | -          | 選択値。`multiple` 時は配列                      |
| `items`        | `DadsComboboxItem[]`                             | `[]`       | 候補一覧                                         |
| `itemValue`    | `string`                                         | `'value'`  | 値として参照する項目のプロパティ名               |
| `itemTitle`    | `string`                                         | `'title'`  | 表示テキストとして参照する項目のプロパティ名     |
| `multiple`     | `boolean`                                        | `false`    | 複数選択モード（チップ表示）                     |
| `filter`       | `(item, query) => boolean`                       | 部分一致   | 既定の絞り込みロジックを差し替える               |
| `placeholder`  | `string`                                         | -          | 入力欄のプレースホルダー                         |
| `id`           | `string`                                         | 自動生成   | 入力要素の `id`（ラベルや ARIA 参照に同期）      |
| `name`         | `string`                                         | -          | フォーム送信時の `name`                          |
| `size`         | `'lg' \| 'md' \| 'sm'`                           | `'md'`     | サイズ                                           |
| `label`        | `string`                                         | -          | 上部ラベル                                       |
| `hint`         | `string`                                         | -          | 補助テキスト（フッター）                         |
| `errorMessage` | `string`                                         | -          | エラーメッセージ（指定でエラー視覚状態が有効化） |
| `required`     | `boolean`                                        | `false`    | 必須マークを表示・`aria-required` を付与         |
| `error`        | `boolean`                                        | `false`    | メッセージなしでエラー視覚状態のみ強制           |
| `disabled`     | `boolean`                                        | `false`    | 操作不可化                                       |
| `readonly`     | `boolean`                                        | `false`    | 読み取り専用                                     |

## Events

| Event               | Payload                                          | 説明                               |
| ------------------- | ------------------------------------------------ | ---------------------------------- |
| `update:modelValue` | `string \| number \| (string\|number)[] \| null` | `v-model` 同期用                   |
| `change`            | `string \| number \| (string\|number)[] \| null` | 値が確定したとき                   |
| `focus`             | `FocusEvent`                                     | 入力欄がフォーカスを受け取ったとき |
| `blur`              | `FocusEvent`                                     | 入力欄がフォーカスを失ったとき     |

## アクセシビリティ

- 入力要素に `role="combobox"` と `aria-autocomplete="list"` を付与し、`aria-controls` で候補リスト (`role="listbox"`) と結び付ける
- 候補リストの開閉状態は `aria-expanded` に反映し、アクティブな候補は `aria-activedescendant` で示す
- キーボード操作: `ArrowDown` / `ArrowUp` で候補移動、`Enter` で確定（リストにない文字列もそのまま確定）、`Escape` で閉じる、`Tab` でフォーカス移動と同時に閉じる
- `multiple` 時は空欄での `Backspace` で末尾のチップを削除でき、各チップの閉じるボタンにもキーボードからアクセスできる
- `errorMessage` / `hint` は `aria-describedby` で入力欄に紐づき、`required` 指定時は `aria-required="true"` が自動付与される
