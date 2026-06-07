# LanguageSelector

複数言語対応サイトで言語切り替え機能を提供する UI 要素。地球儀アイコン付きのオープナーボタンと、現在の言語にチェックマークが付くドロップダウンメニューを提供する。

DADS の規約に従い、オープナーのテキストは常に英語の `Language` を表示する。

## 基本

`v-model` で選択中の言語コード（例: `'ja'`）を双方向バインディングする。`options` には `value` / `label`（任意で `href`）を持つオブジェクト配列を渡す。

<script setup>
import { ref } from 'vue'
import { DadsLanguageSelector } from '@dads/vue'

const languages = [
  { value: 'ja', label: '日本語' },
  { value: 'en', label: 'English' },
  { value: 'zh-cn', label: '简体中文' },
  { value: 'ko', label: '한국어' },
  { value: 'es', label: 'Español' },
]

const selected = ref('ja')
const selectedSm = ref('en')
const selectedDisabled = ref('ja')
const selectedCustom = ref('vi')
</script>

<div class="demo">
  <DadsLanguageSelector v-model="selected" :options="languages" />
  <p>選択中: <code>{{ selected }}</code></p>
</div>

```vue
<script setup>
import { ref } from 'vue'
import { DadsLanguageSelector } from '@dads/vue'

const languages = [
  { value: 'ja', label: '日本語' },
  { value: 'en', label: 'English' },
  { value: 'zh-cn', label: '简体中文' },
  { value: 'ko', label: '한국어' },
  { value: 'es', label: 'Español' },
]
const selected = ref('ja')
</script>

<template>
  <DadsLanguageSelector v-model="selected" :options="languages" />
</template>
```

## Size

公式 `menu-list-box` オープナーに準拠した 2 サイズ (`sm` / `md`)。デフォルトは `sm`（公式 language-selector が採用するサイズ）。

<div class="demo">
  <div class="demo-row">
    <DadsLanguageSelector v-model="selectedSm" :options="languages" size="sm" />
    <DadsLanguageSelector v-model="selected" :options="languages" size="md" />
  </div>
</div>

```vue
<DadsLanguageSelector v-model="lang" :options="languages" size="md" />
```

## 無効化

`disabled` を指定するとオープナーが押せなくなり、メニューも開かない。

<div class="demo">
  <DadsLanguageSelector v-model="selectedDisabled" :options="languages" disabled />
</div>

## カスタムオプション

各オプションに `href` を指定すると、メニュー項目のアンカー (`<a>`) の `href` 属性として使われ、実際のページ遷移リンクになる。`value` は `lang` / `hreflang` 属性にも反映される。

<div class="demo">
  <DadsLanguageSelector
    v-model="selectedCustom"
    :options="[
      { value: 'ja', label: '日本語', href: '/ja/' },
      { value: 'en', label: 'English', href: '/en/' },
      { value: 'vi', label: 'Tiếng Việt', href: '/vi/' },
      { value: 'id', label: 'Bahasa Indonesia', href: '/id/' },
    ]"
  />
</div>

```vue
<DadsLanguageSelector
  v-model="lang"
  :options="[
    { value: 'ja', label: '日本語', href: '/ja/' },
    { value: 'en', label: 'English', href: '/en/' },
  ]"
  aria-label="Select language"
  opener-label="Language"
/>
```

## Props

| Prop          | 型                                              | デフォルト     | 説明                                                                      |
| ------------- | ----------------------------------------------- | -------------- | ------------------------------------------------------------------------- |
| `modelValue`  | `string`                                        | -              | 選択中の言語コード（`v-model`）                                           |
| `options`     | `DadsLanguageSelectorOption[]`                  | `[]`           | 選択可能な言語の配列。`value` / `label`（任意で `href`）                  |
| `size`        | `'sm' \| 'md'`                                  | `'sm'`         | オープナーのサイズ（公式 `menu-list-box` 準拠）                          |
| `disabled`    | `boolean`                                       | `false`        | 操作不可化（オープナー無効・メニュー開閉抑止）                            |
| `ariaLabel`   | `string`                                        | `'言語を選択'` | オープナーボタンのアクセシブル名                                          |
| `openerLabel` | `string`                                        | `'Language'`   | オープナーに表示するテキスト（DADS 規約では常に英語の `Language` を推奨） |

### DadsLanguageSelectorOption

| Key     | 型       | 必須 | 説明                                                              |
| ------- | -------- | ---- | ----------------------------------------------------------------- |
| `value` | `string` | ◯    | 言語コード。`lang` / `hreflang` 属性、`v-model` 値として使われる  |
| `label` | `string` | ◯    | メニューおよびオープナー（選択時）に表示するテキスト              |
| `href`  | `string` | -    | 言語ページの URL。指定するとアンカー (`<a>`) の `href` に使われる |

## Events

| Event               | Payload  | 説明                 |
| ------------------- | -------- | -------------------- |
| `update:modelValue` | `string` | `v-model` 用の値更新 |
| `change`            | `string` | 選択された言語コード |
| `open`              | -        | メニューが開いたとき |
| `close`             | -        | メニューが閉じたとき |

## アクセシビリティ

- オープナーは `aria-haspopup="menu"` + `aria-expanded` + `aria-controls` でメニューと関連付けられる
- メニューは `role="menu"`、各項目は `role="menuitem"`
- 現在選択中の項目には `aria-current="true"` が付与され、チェックマークアイコンが表示される
- 各メニュー項目は `lang` / `hreflang` 属性を持ち、スクリーンリーダーがその言語で読み上げる
- キーボード操作:
  - `Enter` / `Space`: メニュー開閉
  - `↓` / `↑`: 閉状態から開いて最初／最後の項目にフォーカス。開状態では項目間移動
  - `Home` / `End`: 最初／最後の項目にフォーカス
  - `Escape`: メニューを閉じてオープナーにフォーカス戻し
  - `Tab`: メニューを閉じてフォーカスを次へ
- メニュー外クリックでもメニューは閉じる
- DADS 規約に従い、オープナーのテキストは表示言語に関わらず常に英語の `Language` を表示し、メニュー内は各言語の表記（日本語、English、한국어 など）にする
