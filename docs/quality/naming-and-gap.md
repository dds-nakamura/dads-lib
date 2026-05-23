# 命名規約と DADS 公式仕様との Gap 分析

`@dads/vue` の命名規約、および DADS 公式仕様 (47 種類のコンポーネント) との Gap 分析結果を集約した永続参照ドキュメント。

## 命名規約

`@dads/vue` のコンポーネント・型・API は公式 slug (`dads-document-md/dads/components/<slug>/index.md`) との一致を最優先する。命名揺れ解消にあたっては Option B (旧名を `@deprecated` alias として併存) を採用し、private package ながら暫定的に互換維持する。

### コンポーネント名

- すべてのコンポーネントは `Dads` プレフィックス + PascalCase の公式 slug を用いる
  例: `dads-document-md/dads/components/input-text/` → `DadsInputText`
- 旧名は `@deprecated` JSDoc 付きで `packages/vue/src/index.ts` から re-export する (次の major で削除予定)
- ディレクトリ rename は `git mv` で履歴を保持する

公式 slug と一致させた最終命名:

| 公式 slug          | 新名 (公式準拠)                | 旧名 (deprecated alias)       |
| ------------------ | ------------------------------ | ----------------------------- |
| `dialog`           | `DadsDialog`                   | `DadsModal`                   |
| `header-container` | `DadsHeaderContainer`          | `DadsHeader`                  |
| `input-text`       | `DadsInputText`                | `DadsTextField`               |
| `chip-label`       | `DadsChipLabel`                | `DadsChip` (兼用)             |
| `chip-tag`         | `DadsChipTag`                  | `DadsChip` (兼用)             |

### Props

- すべて camelCase
- 公式 MD の構成要素 (パーツ / バリアント / ステート) と一対一で対応する prop 名を採用
- boolean prop はデフォルト `false`、肯定形で命名 (例: `closable`, `clickable`, `required`, `disabled`)
- バリアント軸の prop は公式 MD の語彙をそのまま使う (例: `variant: 'modal' | 'non-modal'`, `placement: 'left' | 'right' | 'full'`)
- サイズ系は `DadsSize` 共通型 (`'l' | 'm' | 's' | 'xs'`) を共有
- セマンティックカラーは `DadsSemanticColor` 共通型 (success / warning / error / info / neutral など)

### イベント / Emits

- すべて kebab-case
- `update:modelValue` は Vue 標準どおり
- ユーザー操作起点: 動詞のみ (`click`, `change`, `focus`, `blur`, `submit`)
- 開閉系: `open` / `close` のペア
- アイテム単位の操作: `<verb>:item` 形式 (例: `click:item`, `select:item`)
- ペイロードは `(payload, event?)` 順を基本とし、index は必要なときのみ含める

### スロット

- すべて kebab-case
- デフォルトスロットは無名 (`<slot />`)
- 命名付きスロットは公式 MD の構成要素名に揃える
  - 例: `#image` / `#sub` (Card), `#utility` (HeaderContainer), `#suggestions` (SearchBox), `#separator` (Breadcrumb), `#header-sort` (Table)
- アイコン挿入用は `#icon` / `#prefix-icon` / `#suffix-icon` で統一

### 型・定数

- 型名: `Dads<PascalName>Props` / `Dads<PascalName>Emits` / `Dads<PascalName>Slots`
- 公開する補助型は `Dads<PascalName>Item` 等、コンポーネント名プレフィックスを付ける
- 共有型は `packages/vue/src/types/` に集約 (`DadsSize`, `DadsSemanticColor` など)
- 文字列リテラルユニオンを優先し、enum は避ける
- CSS class は BEM 形式 `.dads-<kebab-name>__<element>--<modifier>`、旧名 class は alias として残す

## DADS 公式仕様との Gap (集約結果)

集計対象: 公式準備中 8 + 仕様あり 30 + chip-tag (分割対象) = 39 件
判定基準: **High** = a11y 違反 / 主要ユースケース不可 / 公式必須要素欠落、**Medium** = 利便性向上 / オプショナル variant、**Low** = 補助的 prop / docs 追加

### サマリ

| 重要度 | 件数 | 内訳 |
| ------ | ---- | ---- |
| High   | 9    | carousel, dialog, drawer, header-container, heading, menu-list-box, mobile-menu, notification-banner, breadcrumb (条件付) |
| Medium | 17   | accordion, card, chip-label, chip-tag, date-picker, divider, emergency-banner, file-upload, hamburger-menu-button, image-slider, input-text (a11y warn), list, menu-list, progress-indicator, resource-list, search-box, select, table |
| Low    | 13   | blockquote, bottom-navigation (deprecated), button (xs 確認), checkbox, description-list, disclosure, language-selector, radio, scroll-top-button (deprecated), textarea, utility-link, mega-menu (仕様乏), heading (略) |

### 未実装コンポーネント

公式仕様には存在するが `@dads/vue` に対応する Vue コンポーネントが無い、または「半実装」状態のもの:

- **menu-list-box**: 公式定義は「オープナーにより開閉し、ボックス内にメニューリストを内包する dropdown」。現実装は「常時表示の box」で開閉トリガを呼び出し側に委譲しており、半実装。`DadsDropdownMenu` 相当への拡張が必要

未実装の独立コンポーネントは現時点で存在しない (主要 47 種類はカバー済み)。

### 仕様乖離 (High 9 件: 主要バリアント / a11y 欠落)

#### 1. carousel (DadsCarousel)

- `type` (`'key-visual' | 'container'`) / `mode` (`'single' | 'multi'`) 不足
- ネクストエリア (次スライドプレビュー) / すべてのスライドボタンのトグル不足
- `headingLevel?: 1-6` 不足 (コンテナタイプは `<hn>` 見出し必須)
- `autoPlay` は公式が「自動再生機能を備えていない」と明言 → 削除または docs で警告
- `aria-live` リージョン / `tablist`+`tab` ロール実装確認必要

#### 2. dialog (DadsDialog, 旧 DadsModal)

- `variant?: 'modal' | 'non-modal'` 不足 (WAI-ARIA Dialog Pattern は 2 種)
- `returnFocusTo?: HTMLElement | string` 不足 (閉じた後に focus を戻す要素指定、a11y 必須)
- `initialFocus?: string | HTMLElement` 不足 (Dialog 内の初期 focus 先、APG 推奨)
- focus trap / `aria-labelledby` / `aria-modal="true"` / Esc 閉じ実装確認必要

#### 3. drawer (DadsDrawer)

- `placement` (`'left' | 'right' | 'full'`) 不足 (公式 MD で 3 パターン明記)
- 現実装は片側固定で他展開パターンを選択不能
- `<dialog>` ベースで focus trap / inert backdrop 実装確認必要

#### 4. header-container (DadsHeaderContainer, 旧 DadsHeader)

- `variant` (`'wide-full' | 'wide-slim' | 'medium' | 'compact'`) 4 種不足
- `logoHref` / `logoLabel` / `#logo` slot 不足
- `#utility` slot 不足 (utility-link / language-selector / search-box / login-button を入れる主役エリア)
- `<header role="banner">` 出力確認必要、構造的に再設計レベル

#### 5. heading (DadsHeading)

- `shoulder` (string) 不足 (公式必須補助要素「ショルダー」、`<hgroup>` 内に `<p>` で配置)
- `subtitle` (string) 不足 (同じく必須補助要素)
- `icon` (string) 不足 (リードアイコン)
- `chip` / `chipLabel` (string) 不足 (公式要素「チップ」)
- `size` 不足 (`data-size="36" | "32" | "28" | ...` で見出しレベルと独立)
- `<hgroup>` ラッパー不足 → shoulder/subtitle が SR でグループ化されない (a11y)

#### 6. menu-list-box (DadsMenuListBox)

- オープナー関連 (`label`, `icon`, `triggerSize`) + 内部開閉 state 不足
- `placement` (`'start' | 'end'`) 不足 (公式「表示位置」節)
- `open` / `close` event 不足
- `aria-expanded` / `aria-controls` 連携が現実装に無い

#### 7. mobile-menu (DadsMobileMenu)

- `type` (`'slide' | 'accordion'`) 不足 (公式の主要バリアント軸: スタンダード=スライド型 / アコーディオン型)
- 階層スライド遷移なし
- `sectionIcon` / divider セクション分割サポート不足

#### 8. notification-banner (DadsNotificationBanner)

- `style` (`'standard' | 'color-chip'`) 不足 (スタンダード vs カラーチップスタイル)
- `timestamp` (string | Date) 不足 (公式「日時テキスト」任意要素)
- `actions` (Action[]) または `#actions` slot 不足
- `persistKey` (string) 不足 (閉じた状態を localStorage 等に保存するヘルパ)
- `role="status"` (success/info) vs `role="alert"` (error/warning) 出し分け要確認

#### 9. breadcrumb (DadsBreadcrumb) — 条件付

- 末尾項目への `aria-current="page"` 付与確認必要 (無い場合は High)
- モバイル時の `mobileBehavior?: 'wrap' | 'scroll'` 不足
- `#separator` slot 不足 (SVG / アイコンを差し込めるように)

### 仕様乖離 (Medium 17 件: 利便性 / オプショナル)

- **accordion**: `size` (L/M/S/XS) / `returnLink` / native `<details>` 実装オプション
- **card**: `#image` / `#sub` slot 強化、clickable 制約の docs 明記
- **chip-label / chip-tag**: 分離後の `appearance: 'filled' | 'outlined'`、icon prop
- **date-picker**: `variant: 'consolidated' | 'separated'` / `locale` (和暦表示)
- **divider**: `variant: 'full-width' | 'inset'` / `thickness` (1〜4px) / `lineStyle: 'solid' | 'dashed'`
- **emergency-banner**: `timestamp` / `linkExternal` (target=_blank + 新規タブアイコン)
- **file-upload**: `expandDropArea` (ビューポート全体をドロップ対象) / `fileMeta` `formatBytes` (メタ情報整形)
- **hamburger-menu-button**: `variant: 'default' | 'icon-only' | 'mobile-conditional'`
- **image-slider**: `heading` / `showAllLabel` `showAllHref`
- **input-text (旧 TextField)**: `placeholder` / `maxlength` の dev mode console.warn (公式は禁止) / `align: 'vertical' | 'horizontal-left' | 'horizontal-right' | 'fixed-label'`
- **list**: `spacing: '12' | '8' | '4'` / `nestingMarker: boolean | 'auto'` / `ordered` (= `<ol>` 公式禁止) の deprecate
- **menu-list**: `divider` / section 表現 / `itemKind: 'link' | 'accordion'`
- **progress-indicator**: indeterminate linear バリアント / `color` (semantic)
- **resource-list**: Information / Form Type バリアント / `selected` `disabled` 状態 / `click:item` event / `action` (右端ボタン)
- **search-box**: `suggestions` / `clearable` / `withCategory` `categorySelect` / `role="search"`
- **select**: `prefixIcon` `suffixIcon` / `chips` (multiple 選択時) / `useNative: boolean` (native フォールバック)
- **table**: `loading` (skeleton/spinner) / sort/selection helper slot (`#header-sort` 等) / DadsTableControl との combo パターン

### 命名揺れ

公式 slug と実装名の不一致 (Option B で deprecated alias 併存):

| 公式 slug          | 旧名 (deprecated)              | 新名 (公式準拠)             |
| ------------------ | ------------------------------ | --------------------------- |
| `dialog`           | `DadsModal` / `DadsModalProps` | `DadsDialog` / `DadsDialogProps` |
| `header-container` | `DadsHeader`                   | `DadsHeaderContainer`       |
| `input-text`       | `DadsTextField`                | `DadsInputText`             |
| `chip-label`       | `DadsChip` (兼用)              | `DadsChipLabel` (分離)      |
| `chip-tag`         | `DadsChip` (兼用)              | `DadsChipTag` (分離)        |

CSS class も同様: `.dads-modal__*` → `.dads-dialog__*` 等。旧 class は alias として残す。

### 該当なし (Low / 公式仕様充足)

以下は公式仕様を充足しており追加対応不要:

- blockquote / checkbox / description-list / disclosure / textarea / utility-link
- button (xs サイズ含有確認のみ)
- radio (`description` / `legendVisuallyHidden` を追加すれば完了レベル)
- language-selector (`colorScheme` / `cornerShape` を追加すれば完了レベル)

公式が非推奨扱いのため拡張せず docs に warning を強調:

- bottom-navigation (代替: HamburgerMenuButton + MobileMenu / HeaderContainer + GlobalMenu / Tab)
- scroll-top-button (代替: TableOfContents / PageNavigation / skip-link / Header sticky)

公式仕様準備中で再評価待ち:

- mega-menu (公式 MD「準備中」、Figma N/A → 仕様確定後に再評価)
- heading の細部 (中核は High で対応済み)

## 残課題 / 修正対象

すべての Phase 1〜5 が完了済み (2026-05-17 時点)。累計成果:

- **テスト**: 1585 → 1881 (+296)
- **コミット**: 31 + Low 段
- **検証**: 全工程グリーン

完了済みカテゴリ:

| カテゴリ              | 対象数 | 状態 |
| --------------------- | ------ | ---- |
| 命名整合              | 4 件   | Done (DadsDialog / DadsHeaderContainer / DadsInputText / DadsChipLabel + DadsChipTag) |
| High 重要度実装       | 9 件   | Done (Phase 3) |
| Medium 重要度実装     | 17 件  | Done (Phase 4) |
| Low 重要度評価        | 13 件  | Done (Phase 5) |

将来の major リリース時の対応事項:

- 旧名 deprecated alias の削除 (`DadsModal` / `DadsHeader` / `DadsTextField` / `DadsChip`)
- 旧 CSS class alias (`.dads-modal__*` 等) の削除
- mega-menu の公式仕様確定後の再評価
- carousel の `autoPlay` 削除検討 (公式非推奨)

## 命名チェックリスト

新規コンポーネント追加 / 既存 API 変更時のチェックリスト:

### コンポーネント名

- [ ] `Dads` プレフィックス + 公式 slug を PascalCase 化した名前か
- [ ] 公式 slug (`dads-document-md/dads/components/<slug>/`) を確認したか
- [ ] 旧名がある場合、`@deprecated` JSDoc 付きで `packages/vue/src/index.ts` に re-export しているか
- [ ] ディレクトリ rename は `git mv` で履歴保持したか

### Props

- [ ] camelCase で命名されているか
- [ ] 公式 MD の構成要素名と一致しているか (`variant`, `placement`, `size` など)
- [ ] boolean prop は肯定形 + デフォルト `false` か
- [ ] 公式が禁止する API (`<input maxlength>`, `placeholder`, `<ol>`) には dev mode console.warn を出しているか
- [ ] サイズは `DadsSize`、セマンティックカラーは `DadsSemanticColor` を再利用しているか

### イベント / Emits

- [ ] kebab-case か
- [ ] `update:modelValue` は Vue 標準どおり実装されているか
- [ ] 開閉系は `open` / `close` ペアになっているか
- [ ] アイテム単位は `<verb>:item` 形式か
- [ ] ペイロード順は `(payload, event?)` か

### スロット

- [ ] kebab-case か
- [ ] 公式 MD の構成要素名と一致しているか
- [ ] 共通スロット名 (`#icon`, `#prefix-icon`, `#suffix-icon`) の規約に従っているか

### 型・定数

- [ ] `Dads<PascalName>Props` 命名規約に従っているか
- [ ] 共有型 (`DadsSize`, `DadsSemanticColor`) を再利用しているか
- [ ] 文字列リテラルユニオンを使い enum は避けているか
- [ ] CSS class は `.dads-<kebab-name>__<element>--<modifier>` 形式か
- [ ] 旧名 class の alias は残しているか (rename 時)

### a11y

- [ ] WAI-ARIA Authoring Practices に準拠しているか
- [ ] focus trap / `aria-modal` / `aria-labelledby` / Esc 閉じ (Dialog 系)
- [ ] `aria-current="page"` (Breadcrumb / ナビゲーション末尾)
- [ ] `role="status"` vs `role="alert"` 出し分け (Notification / Emergency)
- [ ] `<hgroup>` ラッパー (Heading + shoulder/subtitle)
- [ ] `role="search"` (SearchBox)
- [ ] `role="progressbar"` + `aria-valuenow/min/max` + indeterminate 時の `aria-valuetext`
- [ ] vitest-axe による自動テストを追加したか

### Docs

- [ ] `apps/docs/components/<slug>.md` を作成 / 更新したか
- [ ] sidebar (`apps/docs/.vitepress/config.ts`) を更新したか
- [ ] 非推奨コンポーネントは `danger` バナー + 代替案を docs に記載したか
- [ ] 公式仕様準備中の場合は「🚧 公式仕様準備中」バナーを記載したか
- [ ] 公式仕様充足の場合は「✅ 公式仕様充足」バナーを記載したか
