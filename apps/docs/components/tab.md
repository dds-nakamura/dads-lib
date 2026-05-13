# Tab

複数のコンテンツを同一領域で切り替えるためのナビゲーション。`role="tablist"` / `role="tab"` / `role="tabpanel"` を備え、矢印キーでフォーカス移動できる。

## 基本

`items` にタブ定義を渡し、`v-model` で現在選択されているタブの `value` を双方向バインドする。各タブの本文は名前付きスロット `panel-<value>` に記述する。

<script setup>
import { ref } from 'vue'
import { DadsTab } from '@dads/vue'

const items = [
  { value: 'overview', label: '概要' },
  { value: 'details', label: '詳細' },
  { value: 'settings', label: '設定' },
]
const active = ref('overview')

const itemsWithDisabled = [
  { value: 'a', label: '有効' },
  { value: 'b', label: '無効', disabled: true },
  { value: 'c', label: '有効' },
]
const activeDisabled = ref('a')

const keepAliveItems = [
  { value: 'first', label: 'フォーム入力' },
  { value: 'second', label: 'プレビュー' },
]
const keepAliveActive = ref('first')
const draft = ref('')
</script>

<div class="demo">
  <DadsTab v-model="active" :items="items">
    <template #panel-overview>
      <p>サービスの概要を表示します。現在の選択: <strong>{{ active }}</strong></p>
    </template>
    <template #panel-details>
      <p>詳細な情報を表示します。仕様や設定の根拠などをここに記述します。</p>
    </template>
    <template #panel-settings>
      <p>各種設定項目を表示します。通知・アクセシビリティなどを切り替えます。</p>
    </template>
  </DadsTab>
</div>

```vue
<script setup>
import { ref } from 'vue'
import { DadsTab } from '@dads/vue'

const items = [
  { value: 'overview', label: '概要' },
  { value: 'details', label: '詳細' },
  { value: 'settings', label: '設定' },
]
const active = ref('overview')
</script>

<template>
  <DadsTab v-model="active" :items="items">
    <template #panel-overview>概要のコンテンツ</template>
    <template #panel-details>詳細のコンテンツ</template>
    <template #panel-settings>設定のコンテンツ</template>
  </DadsTab>
</template>
```

## 状態

`items[].disabled` を `true` にすると、そのタブはクリックできず、矢印キーの移動でもスキップされる。

<div class="demo">
  <DadsTab v-model="activeDisabled" :items="itemsWithDisabled">
    <template #panel-a>
      <p>1 つ目の有効なタブのコンテンツ。</p>
    </template>
    <template #panel-b>
      <p>このパネルは表示されません（タブが無効化されているため）。</p>
    </template>
    <template #panel-c>
      <p>2 つ目の有効なタブのコンテンツ。</p>
    </template>
  </DadsTab>
</div>

## keepAlive

`keepAlive` を有効にすると、すべてのパネルが DOM にマウントされたまま `display` で切り替わる。フォーム入力中のステートを保持したい場合に有用。

<div class="demo">
  <DadsTab v-model="keepAliveActive" :items="keepAliveItems" keep-alive>
    <template #panel-first>
      <label class="demo-label" for="draft-input">下書き</label>
      <input id="draft-input" v-model="draft" type="text" placeholder="ここに入力" />
    </template>
    <template #panel-second>
      <p>プレビュー: <strong>{{ draft || '(未入力)' }}</strong></p>
      <p>タブを切り替えても入力内容は保持されます。</p>
    </template>
  </DadsTab>
</div>

```vue
<DadsTab v-model="active" :items="items" keep-alive>
  <template #panel-first>...</template>
  <template #panel-second>...</template>
</DadsTab>
```

## Slot

各タブのコンテンツは、`value` に対応する名前付きスロットに記述する。

| Slot 名         | 説明                                              |
| --------------- | ------------------------------------------------- |
| `panel-<value>` | `items[].value` ごとに 1 つずつ用意するパネル本文 |

例: `items` に `{ value: 'overview', ... }` があれば、対応するスロット名は `panel-overview`。

## Props

| Prop         | 型                 | デフォルト | 説明                                                                             |
| ------------ | ------------------ | ---------- | -------------------------------------------------------------------------------- |
| `modelValue` | `string \| number` | -          | 現在選択中のタブの `value` (v-model 対象、必須)                                  |
| `items`      | `DadsTabItem[]`    | -          | タブ定義の配列 (`value` / `label` / `disabled?`)                                 |
| `keepAlive`  | `boolean`          | `false`    | `true` のとき全パネルを常時マウントし `display` で切替。`false` のときは差し替え |
| `ariaLabel`  | `string`           | `'タブ'`   | タブリスト全体のアクセシブル名 (`aria-label`)                                    |

### `DadsTabItem`

| プロパティ | 型                 | 必須 | 説明                                                |
| ---------- | ------------------ | ---- | --------------------------------------------------- |
| `value`    | `string \| number` | はい | v-model 値・スロット名 (`panel-<value>`) のキー     |
| `label`    | `string`           | はい | タブボタンに表示されるラベル                        |
| `disabled` | `boolean`          | -    | `true` のときクリック不可・キーボード移動からも除外 |

## Events

| Event               | Payload            | 説明                                                   |
| ------------------- | ------------------ | ------------------------------------------------------ |
| `update:modelValue` | `string \| number` | v-model 用。新しく選択されたタブの `value`             |
| `change`            | `string \| number` | 選択が変化したとき発火。Payload は新しいタブの `value` |

## アクセシビリティ

- タブリスト全体に `role="tablist"` と `aria-label`（既定: `タブ`）を付与
- 各タブボタンは `role="tab"` / `aria-selected` / `aria-controls` を備え、対応するパネルは `role="tabpanel"` / `aria-labelledby` で関連付け
- ロービングタブインデックス: アクティブなタブのみ `tabindex="0"`、他は `tabindex="-1"`
- 左右矢印キーで前後タブへ移動、`Home` / `End` で先頭・末尾のタブへジャンプ（無効化されたタブはスキップ）
- 矢印キー移動と同時に選択も切り替わり、`update:modelValue` / `change` が発火する
