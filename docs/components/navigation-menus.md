# ナビゲーション / メニュー系コンポーネント仕様

`@dads/vue` のナビゲーション / メニュー系コンポーネント 8 件の永続参照ドキュメント。DADS 公式仕様 (`dads-document-md/dads/components/<slug>/index.md`) を真実の源とし、HTML 実装サンプル (`design-system-example-components-html/src/components/<slug>/`) を実装参考としている。

なお公式 DADS で非推奨指定されている `scroll-top-button` / `bottom-navigation` は `@dads/vue` から除外済 (Issue #14, major リリース)。代替パターンは [naming-and-gap.md](../quality/naming-and-gap.md) を参照。

## 対象コンポーネント

本ドキュメントが扱う 8 件のコンポーネントは、依存関係に基づき以下 2 グループに分類される。

### 基礎部品（Nav-Base）

他のナビゲーション部品の中で再利用される最小単位の部品。

| 公式 slug               | 実装名                    | 用途                     | HTML 実装例 |
| ----------------------- | ------------------------- | ------------------------ | ----------- |
| `menu-list`             | `DadsMenuList`            | メニューリスト           | あり        |
| `menu-list-box`         | `DadsMenuListBox`         | リストボックス型メニュー | あり        |
| `hamburger-menu-button` | `DadsHamburgerMenuButton` | ハンバーガー開閉ボタン   | あり        |
| `utility-link`          | `DadsUtilityLink`         | ユーティリティリンク     | あり        |

### 合成部品（Nav-Composite）

基礎部品を内部で組み合わせて構成する、画面レベルのナビゲーション。

| 公式 slug         | 実装名               | 用途                       | 依存（基礎部品）            | HTML 実装例 |
| ----------------- | -------------------- | -------------------------- | --------------------------- | ----------- |
| `global-menu`     | `DadsGlobalMenu`     | グローバルナビ             | MenuList（任意）            | あり        |
| `mega-menu`       | `DadsMegaMenu`       | メガメニュー（グローバル） | MenuList                    | なし        |
| `page-navigation` | `DadsPageNavigation` | ページ内ナビ（TOC）        | -                           | なし        |
| `mobile-menu`     | `DadsMobileMenu`     | モバイル用メニュー         | HamburgerMenuButton（任意） | なし        |

### スコープ外

- `header-container` / `drawer` — 既存 `DadsHeaderContainer` / `DadsDrawer` に統合済
- `breadcrumb` / `tab` / `step-navigation` — 別フェーズで実装済

---

## 共通設計方針

### ルーティング統合

すべてのナビゲーション系コンポーネントは、フレームワーク非依存な `<a href>` を既定とし、SPA ルーティング統合のために以下のパターンを提供する。

- **既定**: 各項目は `href` プロパティを受け取り、`<a>` 要素としてレンダリング。
- **SPA 統合**: `as` prop で `<router-link>` / `<NuxtLink>` 等のコンポーネントを差し替え可能にする、もしくは `#item` slot 経由でユーザーが任意のリンク要素を差し込めるようにする。
- **active 判定**: 親アプリ側がルーティングライブラリで判定し、`current` / `active` プロパティで明示的に渡す方針（DADS 内部でルートを観測しない）。
- 内部リンクは相対パス、外部リンクは `target="_blank"` + `rel="noopener noreferrer"` を `external` prop で自動付与可能とする。

### アクセシビリティ

- **landmark role**: グローバル系（`DadsGlobalMenu`, `DadsMegaMenu`, `DadsMobileMenu`）は `<nav>` 要素 + `aria-label` でランドマーク化。`DadsPageNavigation` も同様（`aria-label="目次"` 等）。
- **menu/menuitem role**: メニュー機能を提供する `DadsMenuList` / `DadsMenuListBox` は `role="menu"` / `role="menuitem"`（もしくはリスト的用途では `<ul>` + `<li>` + `<a>`）の WAI-ARIA パターンに準拠。
- **キーボード操作**:
  - メニュー内移動: `ArrowUp` / `ArrowDown` で項目間フォーカス移動
  - メガメニュー / モバイルメニュー開閉: `Escape` でクローズ + 開閉ボタンへフォーカス復帰
  - ハンバーガーボタン: `aria-expanded` / `aria-controls` を必須属性とし、`Space` / `Enter` で toggle
- **focus management**: 開閉系（`DadsMegaMenu`, `DadsMobileMenu`）は open 時に内部の最初の focusable に focus を移し、close 時にトリガー要素へ復帰。
- **focus-ring**: 全コンポーネントで共有 SCSS `packages/vue/src/styles/_focus-ring.scss` のミックスインを利用し、トークン由来の visible focus indicator を保証。
- **aria-current**: 現在ページに対応する項目に `aria-current="page"` を付与（active 状態と連動）。
- **WAI-ARIA Authoring Practices** の Disclosure / Menu / Menubar パターンを参考に、公式仕様にない挙動を補完する。

### レスポンシブ

- **breakpoint**: DADS Foundations の `--dads-breakpoint-md`（タブレット境界）と `--dads-breakpoint-lg`（PC 境界）に従う。値は `@dads/tokens` 経由で参照、ハードコードしない。
- **モバイル切替**:
  - `DadsGlobalMenu` / `DadsMegaMenu` は PC 表示。モバイル幅では非表示 + `DadsMobileMenu` + `DadsHamburgerMenuButton` で代替。
  - 切り替えは CSS `@media` クエリで行い、JS による DOM 削除はしない（SSR / hydration 安定のため）。

### Props / Slots / Emits の共通命名

- **items 系**: 配列を受け取る場合は `items` プロパティに統一。要素型は `{ label, href, current?, external?, children? }` を基本形とする。
- **disabled / current**: 真偽値プロパティとして個別項目に持たせる。
- **emits**: 状態変更系は `update:modelValue` / `update:open` の v-model 互換イベントを優先。クリック系は `select` / `navigate` を使い分け。
- **slots**: アイコン挿入用に `#icon`、項目差し替え用に `#item="{ item, index }"` を提供。

---

## コンポーネント別仕様

### DadsMenuList

メニュー項目を縦に並べる基礎リスト。`DadsGlobalMenu` / `DadsMegaMenu` 等の内部部品としても利用される。

- **Props**:
  - `items: MenuItem[]` — `{ label: string; href?: string; current?: boolean; disabled?: boolean; icon?: string }`
  - `ariaLabel?: string` — `<ul>` / `<nav>` に付与する説明
  - `variant?: 'default' | 'compact'` — DADS 公式バリアント
- **Slots**:
  - `#item="{ item, index }"` — 項目テンプレート差し替え
  - `#icon="{ item }"` — アイコン領域
- **Emits**:
  - `select(item, index)` — 項目クリック時
- **a11y**: `<ul role="menu">` + `<li role="menuitem">`。`current` 項目に `aria-current="page"`。

### DadsMenuListBox

罫線で囲まれたボックス型のメニューリスト。設定画面のサイドナビ等で使用。

- **Props**:
  - `items: MenuItem[]`
  - `title?: string` — ボックス見出し
  - `ariaLabel?: string`
- **Slots**:
  - `#title` — 見出しカスタマイズ
  - `#item="{ item, index }"`
- **Emits**:
  - `select(item, index)`
- **a11y**: ボックス自体は `<section aria-labelledby="...">`、内部は `DadsMenuList` 準拠。

### DadsHamburgerMenuButton

モバイル時のメニュー開閉ボタン。`DadsHeaderContainer` の `#showMenuToggle` slot で利用される pattern と互換。

- **Props**:
  - `modelValue: boolean` — 開閉状態（v-model 対応）
  - `ariaLabel?: string` — 既定値「メニューを開く / 閉じる」
  - `ariaControls?: string` — 制御対象の menu の id
- **Emits**:
  - `update:modelValue(value: boolean)`
- **a11y**: `<button type="button">` + `aria-expanded` + `aria-controls`。アイコンは open/close の 2 状態。`Space` / `Enter` で toggle。
- **既存 HeaderContainer との互換**: `DadsHeaderContainer` の `showMenuToggle` slot 内で動作することを必須要件とする（依存破壊しない）。

### DadsUtilityLink

ヘッダー上部などに置く小さなテキストリンク群（ログイン / ヘルプ / 言語切替リンク等）。

- **Props**:
  - `items: UtilityLinkItem[]` — `{ label, href, external?, icon? }`
  - `ariaLabel?: string`
- **Slots**:
  - `#item="{ item }"`
- **a11y**: `<nav aria-label="ユーティリティリンク">` + 横並び `<ul>`。`external` の場合 `<a target="_blank" rel="noopener noreferrer">` + 視覚的にアイコン付与。

### DadsGlobalMenu

PC 表示のグローバルナビゲーション。ヘッダー直下に配置され、サイト主要セクションへの導線を提供。

- **Props**:
  - `items: GlobalMenuItem[]` — `{ label, href, current?, children?: MenuItem[] }`
  - `ariaLabel?: string` — 既定値「グローバルナビゲーション」
- **Slots**:
  - `#item="{ item }"` — 各項目のリンク要素を SPA リンクで差し替え可能
- **Emits**:
  - `select(item)`
- **構成**: 内部で `DadsMenuList` を任意で利用可能（サブメニュー表現時）。
- **a11y**: `<nav aria-label="...">` + `<ul role="menubar">`。`children` 持ち項目は `aria-haspopup="true"` + hover/focus でサブメニュー展開。
- **レスポンシブ**: モバイル幅では非表示（CSS `display: none`）し、`DadsMobileMenu` で代替。

### DadsMegaMenu

複数列のサブメニューを持つ大規模グローバルメニュー。

- **Props**:
  - `items: MegaMenuItem[]` — `{ label, href?, columns?: MegaMenuColumn[] }`、`columns` は `{ heading, items: MenuItem[] }` の配列
  - `ariaLabel?: string`
- **Slots**:
  - `#item="{ item }"`
  - `#panel="{ item }"` — 開いた状態のパネル全体を差し替え
- **Emits**:
  - `open(item)` / `close(item)`
- **構成**: パネル内部で `DadsMenuList` を利用してカテゴリ別リストを構成。
- **a11y**: トップレベルは `role="menubar"`、パネルは `role="menu"` + `aria-labelledby`。`Escape` でパネル close + トリガーへ focus 復帰。
- **DOM 構造**: 公式 MD で曖昧な箇所は既存 `DadsGlobalMenu` の HTML 実装サンプルを container として踏襲。

### DadsPageNavigation

ページ内見出しへの目次型ナビゲーション。記事ページのサイドバー TOC として使用。

- **Props**:
  - `items: PageNavItem[]` — `{ label, anchor: string, level?: 1|2|3, current?: boolean }`
  - `ariaLabel?: string` — 既定値「目次」
  - `sticky?: boolean` — スクロール追従
- **Emits**:
  - `select(item)` — アンカー遷移時
- **a11y**: `<nav aria-label="目次">` + `<ol>`。`current` 項目に `aria-current="location"`。`IntersectionObserver` でアクティブ見出しを自動判定する場合は親アプリ側で実装し、`current` プロパティ経由で渡す。

### DadsMobileMenu

モバイル用の折り畳みメニュー。`DadsHamburgerMenuButton` から開閉される。

- **Props**:
  - `modelValue: boolean` — 開閉状態（v-model 対応）
  - `items: MenuItem[]`
  - `ariaLabel?: string`
- **Slots**:
  - `#default` — メニュー本体を完全カスタマイズ
  - `#item="{ item }"`
- **Emits**:
  - `update:modelValue(value: boolean)`
  - `close()`
- **a11y**: `<nav aria-label="..." id="...">` を `DadsHamburgerMenuButton` の `aria-controls` から参照可能にする。open 時に focus trap、`Escape` で close + トリガーへ復帰。
- **`DadsDrawer` との差別化**: `DadsDrawer` は汎用 side panel、`DadsMobileMenu` はヘッダー内に統合された折り畳みメニューという役割分担（DOM 構造・aria 属性が異なるため独立コンポーネントとして OK）。

---

## DADS 公式仕様との対応

- 各コンポーネントは `dads-document-md/dads/components/<slug>/index.md` の仕様（使用ガイドライン、バリアント、アクセシビリティ要件）に準拠する。
- 公式 MD で示されていない DOM 構造・ARIA 属性の細部は、以下の優先順位で補完する:
  1. `design-system-example-components-html/src/components/<slug>/` の HTML 実装サンプル
  2. 同カテゴリの既存コンポーネント（特に `DadsGlobalMenu` の HTML 構造）
  3. WAI-ARIA Authoring Practices（Disclosure / Menu / Menubar パターン）
  4. `dads-document-figma/<slug>/<slug>.png` のビジュアルスナップショット（環境に存在する場合）
- カラー・スペーシング・タイポグラフィの値は `@dads/tokens` 経由でのみ参照し、コンポーネント内で生の値（hex / px）をハードコードしない。
- コンポーネント側で観測する props（`current`, `disabled` 等）の意味論は公式 MD と一致させる。
