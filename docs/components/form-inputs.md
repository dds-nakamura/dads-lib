# フォーム入力コンポーネント仕様

`@dads/vue` におけるフォーム入力系コンポーネント (Form-Inputs カテゴリ) の永続仕様。本ドキュメントは DADS 公式仕様 (`dads-document-md/dads/components/<slug>/index.md`) を真実の源とし、`@dads/vue` パッケージで提供する Vue 3 コンポーネントの設計を定める。

## 対象コンポーネント

本カテゴリでは以下 5 コンポーネントを提供する。

| 実装名                 | 公式 slug           | 用途                     | HTML 実装例 |
| ---------------------- | ------------------- | ------------------------ | ----------- |
| `DadsDatePicker`       | `date-picker`       | 日付入力 (カレンダー UI) | あり        |
| `DadsSearchBox`        | `search-box`        | 検索入力                 | あり        |
| `DadsDisclosure`       | `disclosure`        | 開閉トグル (単体)        | あり        |
| `DadsDescriptionList`  | `description-list`  | 説明リスト (`<dl>`)      | なし        |
| `DadsLanguageSelector` | `language-selector` | 言語切替                 | あり        |

なお、Button / TextField / Checkbox / Radio / Select / Textarea / ComboBox / FileUpload については既存の 26 コンポーネント実装側で提供されており、本カテゴリの API 命名規則 (TextField / Accordion / Combobox 等) を踏襲する。

## 共通設計方針

### パッケージ構成

各コンポーネントは以下のファイル構成を持つ。

```
packages/vue/src/components/<Name>/
├── Dads<Name>.types.ts     props / events / slots / 関連型
├── Dads<Name>.vue          SFC (template + script setup + scoped SCSS)
├── index.ts                export { default as Dads<Name> } 等
└── __tests__/
    └── Dads<Name>.test.ts  vitest + @vue/test-utils
```

`packages/vue/src/index.ts` に各コンポーネントの `export *` を追記し、外部から `import { DadsXxx } from '@dads/vue'` で利用可能とする。

### v-model

- `modelValue` prop + `update:modelValue` emit で二方向バインディングを実現する。
- 値の型はコンポーネントの用途に応じて以下を採用する。
  - `DadsDatePicker`: `Date | string | null`
  - `DadsSearchBox`: `string`
  - `DadsDisclosure`: `boolean` (開閉状態)
  - `DadsLanguageSelector`: `string` (言語コード)
  - `DadsDescriptionList`: v-model 不要 (静的表示)

### Props / Emits の命名規則

- Props は **TypeScript interface** で定義し、JSDoc コメントを付与する (`Dads<Name>Props`)。
- Emits も `Dads<Name>Emits` interface で定義する。
- 既定値は `withDefaults(defineProps<...>(), { ... })` で指定する。
- 既存 26 コンポーネントと統一する prop 名:
  - `modelValue` / `disabled` / `readonly` / `required` / `error` / `hint` / `label` / `size`
- `size` を持つ場合は共有型 `DadsSize` (`'lg' | 'md' | 'sm'`、必要に応じ `'xs'`) のサブセットを採用する。

### バリデーション / エラー表示

- `error` prop (boolean または error message string) でエラー状態を制御する。
- `hint` prop で補助テキストを表示する。
- エラーメッセージ / ヒントは `aria-describedby` で input 要素に紐付ける。
- エラー時は input 要素に `aria-invalid="true"` を付与する。
- バリデーションロジック自体はコンポーネント外 (利用側) に委ね、表示状態のみを制御する。

### アクセシビリティ

- WCAG 2.1 AA 準拠。
- label / error / hint は `aria-describedby` でフォームコントロールに紐付ける。
- フォーカス管理: キーボード操作 (Tab / Enter / Space / Esc / 矢印キー) を公式仕様の挙動に合わせる。
- focus visible は共有 SCSS (`packages/vue/src/styles/_focus-ring.scss`) を `@use` して統一する。
- 各コンポーネントの `__tests__/` に `aria-*` / `role` 属性のテストを含める (最低 15 ケース)。
- `vitest-axe` による a11y 単独テストは別タスクで扱う。

### スタイル

- `<style lang="scss" scoped>` を使用。
- クラス名 root は `.dads-<slug>` (kebab-case)。
- 共有 base mixin: `@use '../../styles/base';`
- デザイントークンは `@dads/tokens` 経由の CSS 変数 (`var(--color-...)` / `var(--spacing-...)` / `var(--font-size-...)`) を必ず使用する。カラーコード・スペーシング値の直書きは禁止。

### DOM / class の準拠

- `design-system-example-components-html/src/components/<slug>/` が存在する場合、その DOM 構造・class 名・aria 属性を忠実に再現する。
- HTML サンプルが無い (`description-list`) 場合は、公式 MD の例示 HTML と標準的な `<dl>`/`<dt>`/`<dd>` 構造を採用する。

## コンポーネント別仕様

### DadsDatePicker

日付入力 + カレンダー UI を提供するコンポーネント。

#### Props

| Prop          | Type                       | Default | 説明                                       |
| ------------- | -------------------------- | ------- | ------------------------------------------ |
| `modelValue`  | `Date \| string \| null`   | `null`  | 選択中の日付 (v-model)                     |
| `label`       | `string`                   | -       | ラベル                                     |
| `hint`        | `string`                   | -       | 補助テキスト                               |
| `error`       | `string \| boolean`        | `false` | エラー状態 / メッセージ                    |
| `disabled`    | `boolean`                  | `false` | 無効化                                     |
| `readonly`    | `boolean`                  | `false` | 読み取り専用                               |
| `required`    | `boolean`                  | `false` | 必須                                       |
| `size`        | `'lg' \| 'md' \| 'sm'`     | `'md'`  | サイズ                                     |
| `min` / `max` | `Date \| string`           | -       | 選択可能範囲                               |
| `format`      | `string`                   | -       | 表示フォーマット (例: `YYYY/MM/DD`)        |

#### Emits

| Event                | Payload                  | 説明                |
| -------------------- | ------------------------ | ------------------- |
| `update:modelValue`  | `Date \| string \| null` | 値の更新            |
| `open` / `close`     | `void`                   | カレンダー開閉      |

#### 実装メモ

- 内部 Calendar 描画は HTML 実装例 (`design-system-example-components-html/src/components/calendar/`) を流用する。
- vitest のテストで時刻系を扱う場合は `vi.useFakeTimers()` で固定する。

### DadsSearchBox

検索入力 (input + 検索アイコンボタン)。

#### Props

| Prop          | Type                   | Default | 説明                          |
| ------------- | ---------------------- | ------- | ----------------------------- |
| `modelValue`  | `string`               | `''`    | 入力値 (v-model)              |
| `placeholder` | `string`               | -       | プレースホルダー              |
| `label`       | `string`               | -       | ラベル (visually-hidden 可)   |
| `disabled`    | `boolean`              | `false` | 無効化                        |
| `size`        | `'lg' \| 'md' \| 'sm'` | `'md'`  | サイズ                        |
| `clearable`   | `boolean`              | `false` | クリアボタン表示              |

#### Emits

| Event               | Payload  | 説明                       |
| ------------------- | -------- | -------------------------- |
| `update:modelValue` | `string` | 値の更新                   |
| `search`            | `string` | 検索実行 (Enter / クリック)|
| `clear`             | `void`   | クリアボタン押下           |

### DadsDisclosure

ボタン + 開閉パネル (Accordion の単体版)。

#### Props

| Prop         | Type                   | Default | 説明                            |
| ------------ | ---------------------- | ------- | ------------------------------- |
| `modelValue` | `boolean`              | `false` | 開閉状態 (v-model)              |
| `summary`    | `string`               | -       | トリガーボタンのテキスト        |
| `disabled`   | `boolean`              | `false` | 無効化                          |
| `size`       | `'lg' \| 'md' \| 'sm'` | `'md'`  | サイズ                          |

#### Slots

| Slot       | 説明                              |
| ---------- | --------------------------------- |
| `summary`  | トリガーボタンのカスタムコンテンツ|
| `default`  | 展開時に表示されるパネル本体      |

#### Emits

| Event                | Payload   | 説明        |
| -------------------- | --------- | ----------- |
| `update:modelValue`  | `boolean` | 開閉切替    |

#### 実装メモ

- `aria-expanded` / `aria-controls` を button に、`id` を panel に付与する。
- 公式 HTML 例にあるアニメーションを CSS transition で再現する。

### DadsDescriptionList

説明リスト (`<dl>` / `<dt>` / `<dd>` 構造)。

#### Props

| Prop          | Type                                          | Default        | 説明                          |
| ------------- | --------------------------------------------- | -------------- | ----------------------------- |
| `items`       | `Array<{ term: string; description: string }>` | `[]`           | 項目配列                      |
| `orientation` | `'horizontal' \| 'vertical'`                  | `'vertical'`   | 用語と説明の配置              |

#### Slots

| Slot                  | 説明                                |
| --------------------- | ----------------------------------- |
| `default`             | カスタム `<dt>`/`<dd>` を直接挿入   |
| `term` (scoped)       | 各項目の term 部分のカスタマイズ    |
| `description` (scoped)| 各項目の description 部分のカスタマイズ |

#### 実装メモ

- HTML 実装例が無いため、公式 MD の例示と標準的な `<dl>` 構造を採用する。
- v-model / emits は不要 (静的表示)。

### DadsLanguageSelector

言語切替 (select + globe icon)。

#### Props

| Prop          | Type                                       | Default | 説明                                |
| ------------- | ------------------------------------------ | ------- | ----------------------------------- |
| `modelValue`  | `string`                                   | -       | 選択中の言語コード (v-model)         |
| `options`     | `Array<{ value: string; label: string }>`  | `[]`    | 選択肢                              |
| `label`       | `string`                                   | -       | ラベル (visually-hidden 可)         |
| `disabled`    | `boolean`                                  | `false` | 無効化                              |
| `size`        | `'lg' \| 'md' \| 'sm'`                     | `'md'`  | サイズ                              |

#### Emits

| Event               | Payload  | 説明      |
| ------------------- | -------- | --------- |
| `update:modelValue` | `string` | 言語切替  |
| `change`            | `string` | 切替確定  |

#### 実装メモ

- globe icon は `@dads/vue` のアイコンセットまたは inline SVG。
- 公式 HTML 例の `aria-label` を保持する。

## 共有型・トークン

### 共有型 (`packages/vue/src/types/`)

- `DadsSize`: `'xs' | 'sm' | 'md' | 'lg'` (各コンポーネントが必要なサブセットを使用)
- `DadsSemanticColor`: セマンティックカラー (`primary` / `error` / `warning` / `success` 等)

### デザイントークン

- `@dads/tokens` 経由で全 CSS 変数を提供。
- `packages/tokens/src/` を参照。
- 直接の hex / px / rgba 値の使用は禁止。

## DADS 公式仕様との対応

| 実装名                 | 公式仕様パス                                                    |
| ---------------------- | --------------------------------------------------------------- |
| `DadsDatePicker`       | `dads-document-md/dads/components/date-picker/index.md`         |
| `DadsSearchBox`        | `dads-document-md/dads/components/search-box/index.md`          |
| `DadsDisclosure`       | `dads-document-md/dads/components/disclosure/index.md`          |
| `DadsDescriptionList`  | `dads-document-md/dads/components/description-list/index.md`    |
| `DadsLanguageSelector` | `dads-document-md/dads/components/language-selector/index.md`   |

各実装は公式 MD の **使用ガイドライン** をすべて満たし、`design-system-example-components-html/src/components/<slug>/` の DOM / class / aria 属性を保持する。公式仕様に無い prop の独自追加は禁止する。

## テスト方針

- vitest + `@vue/test-utils` + happy-dom (`packages/vue/test/setup.ts` で設定済)。
- 各コンポーネント 15 ケース以上、`describe` ブロックで以下を網羅する。
  - `render`: 基本レンダリング
  - `props`: 各 prop の効果
  - `events`: emit 検証
  - `keyboard`: キーボード操作 (該当時)
  - `a11y`: `aria-*` / `role` 属性
- vitest-axe は別タスクで扱う。

## ドキュメント

各コンポーネントには `apps/docs/components/<slug>.md` を作成し、`apps/docs/components/button.md` 同等の構成 (基本 / バリエーション / Props 表 / Events 表 / アクセシビリティ) を満たす。`apps/docs/.vitepress/config.ts` の Form sidebar に追加する。
