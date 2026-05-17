# Gap Report Group B

> 比較対象: `dads-document-md/` の公式仕様 + `design-system-example-components-html/` の正準実装 + (任意) `dads-document-figma/<日本語名>/` のビジュアル仕様。
> Vue 実装の types は `packages/vue/src/components/<PascalName>/Dads<PascalName>.types.ts` を参照。

## disclosure (DadsDisclosure)

- 該当なし
- **重要度**: Low
- **備考**: 公式 MD は概要・原則のみ。`modelValue` / `title` / `disabled` / `defaultOpen` および `toggle` イベントで主要ユースケースを満たす。`<details>/<summary>` を使うため a11y は実装で吸収される想定。

## divider (DadsDivider)

- **Missing props**: `variant` ('full-width' | 'inset') — 公式 MD でバリアントが定義されている (フルワイド / インセット) が実装は `orientation` + `color` のみで区別不可。
- **Missing variants**: thickness (1〜4px) / style ('solid' | 'dashed') — HTML リファレンス `divider/all-dividers.html` で `data-width="1..4"` `data-style="solid|dashed"` が定義されている。
- **a11y**: `<hr>` のはずだが orientation='vertical' のとき role 切替が必要 (現状未確認)。
- **重要度**: Medium
- **推定工数**: 1h
- **備考**: vertical のとき `aria-orientation` を出力するか、CSS で `inset` バリアント (左右マージン) を切り替えるだけで対応可能。

## drawer (DadsDrawer)

- **Missing props**: `placement` ('left' | 'right' | 'full') — 公式 MD で「フルオーバーレイ / 右側 / 左側」3 パターン明記。HTML リファレンスも `data-placement="right"` を使用しており、現実装は片側固定で他展開パターンを選択できない。
- **a11y**: `<dialog>` を使う前提だが、focus trap / inert backdrop 周りはレンダラ側で実装されている必要がある (型定義からは判別不能)。
- **重要度**: High
- **推定工数**: 2h+
- **備考**: モバイルメニュー以外 (例: 右側設定パネル) で必須。

## emergency-banner (DadsEmergencyBanner)

- **Missing props**:
  - `timestamp` (string | Date) — 公式 MD の構成要素 ② 「年月日など」、HTML 参照でも `<time datetime>` で出力される。現状未対応。
  - `linkExternal` (boolean) — HTML 参照では `target="_blank"` + 新規タブアイコン。現実装は外部リンク表現がない。
- **Missing variants**: なし (semantic color は error 固定で OK)。
- **a11y**: 「【緊急】」プレフィクスや `role="alert"` の付与方針が型定義からは見えない (実装で吸収されている前提)。`closable: false` のデフォルトは公式準拠で良い。
- **重要度**: Medium
- **推定工数**: 1h
- **備考**: title が「全角30文字以内 / モバイル2行以内」、description が「100文字程度以内」のバリデーション/警告は将来検討。

## file-upload (DadsFileUpload)

- **Missing props**:
  - `expandDropArea` (boolean) — 公式 MD の「ドロップエリア拡大チェックボックス」。ビューポート全体をドロップ対象にする機能。現状なし。
  - `fileMeta` / `formatBytes` — 選択ファイル一覧の「メタ情報」表示用 (公式要素)。実装ではファイル名のみ表示と思われる。
- **a11y**: ドラッグ依存禁止 (WCAG 2.5.7) は `buttonText` で担保されている。`aria-describedby` 連携も実装済。
- **重要度**: Medium
- **推定工数**: 2h+
- **備考**: メタ情報整形 (サイズ / 種別) は React 参考実装にあるので移植容易。

## hamburger-menu-button (DadsHamburgerMenuButton)

- **Missing variants**: `variant` ('default' | 'icon-only' | 'mobile-conditional') — 公式 MD で「デスクトップ・モバイル共通」と「モバイル条件付き (正方形・下部テキスト)」が明示。HTML には `dads-hamburger-menu-icon-button` (アイコンのみ正方形) もある。
- **a11y**: `ariaControls` 必須・テキスト切替 (`メニュー`/`閉じる`) は実装済。
- **重要度**: Medium
- **推定工数**: 1h
- **備考**: 既存 size でなく variant で形状を切替するのが公式に近い。

## header-container (DadsHeader)

- **Missing props**:
  - `variant` ('wide-full' | 'wide-slim' | 'medium' | 'compact') — 公式 MD で 4 パターン明記。現状 `sticky` / `showMenuToggle` のみで構造区別なし。
  - `logoHref` / `logoLabel` / `logo` slot — 公式仕様の「ロゴ」要素が API として無い。
- **Missing slots**: `utility` (utility-link / language-selector / search-box / login-button を入れるエリア) — 公式の HeaderContainer の主役要素。
- **a11y**: `<header role="banner">` 出力かどうか型からは判別不能。
- **重要度**: High
- **推定工数**: 2h+
- **備考**: 名前を `DadsHeaderContainer` にリネームし、構造を上記 4 variant + slot ベースに再設計する必要あり (タスクリスト既定どおり)。

## heading (DadsHeading)

- **Missing props**:
  - `shoulder` (string) — 公式の必須補助要素「ショルダー」。`<p>` を `<hgroup>` 内に置く規約。
  - `subtitle` (string) — 同じく「サブタイトル」。
  - `icon` (string) — リードアイコン (`<svg>` を `dads-heading__icon` 内に置く)。
  - `chip` / `chipLabel` (string) — 公式要素「チップ」(`data-chip` 属性が HTML 参照に存在)。
  - `size` (string) — `data-size="36" | "32" | "28" | ...` のように文字サイズが見出しレベルと独立 (公式仕様「見出しレベルとフォントサイズは別々に定義」)。現実装の `level` だけでは表現不能。
- **a11y**: `<h1>-<h6>` を `as` で選べる点は良いが、`<hgroup>` ラッパーが無いので shoulder/subtitle と SR でグループ化されない。
- **重要度**: High
- **推定工数**: 2h+
- **備考**: 公式の中核仕様 (hgroup + shoulder + subtitle + icon + chip + decorative rule) を一通り実装する必要あり。

## image-slider (DadsImageSlider)

- **Missing props**:
  - `heading` (string) — 公式 MD の主構成要素「見出し」。
  - `showAllLabel` / `showAllHref` — 「すべてのスライド」ボタン。
- **Missing variants**: 公式は「Carousel の container-multi-narrow」を再利用する設計。現実装は独立コンポーネントだが pagination 形式 (前/次 + スライド位置表示) を強制するか不明確。
- **a11y**: `aria-label` のみ。スライド変更時の `aria-live` 領域記述 (任意) があるかは型から不明。
- **重要度**: Medium
- **推定工数**: 1h
- **備考**: Carousel への内部委譲構造に揃えるかは別議論。最低限 `heading` と showAll を公式構成に合わせる。

## input-text (DadsTextField)

- **a11y**: `maxlength` prop が公開されているが、公式アクセシビリティでは禁止 (`maxlength` 属性の禁止)。`hint` / バックエンド検証で代替する旨を deprecate 警告するべき。
- **a11y**: `errorMessage` が `aria-live` を使っていないか要確認 (公式は `aria-live` / `alert` 禁止)。
- **a11y**: `placeholder` prop が公開されているが、公式は「プレースホルダーテキスト使用禁止」。`hint` への置換を docs / warn で誘導すべき。
- **Missing props**: `align` ('vertical' | 'horizontal-left' | 'horizontal-right' | 'fixed-label') — 公式「整列パターン」3+ 種類。
- **重要度**: Medium
- **推定工数**: 1h (a11y 警告のみなら 30 min)
- **備考**: `placeholder` / `maxlength` は **削除すべきでないが** dev mode で console.warn を出すなどの注意喚起が望ましい。

## language-selector (DadsLanguageSelector)

- **Missing variants**: `colorScheme` ('light-blue' | 'light-green' | 'light-gray') — 公式 MD でカラーバリエーション 3 種類示唆。現実装は単色。
- **Missing props**: `cornerShape` (任意) — 角の形状を調整する旨が公式に記載。
- **a11y**: `lang` / `hreflang` を menu item に付与する設計はオプション型に既出。OK。`openerLabel` を常に英語 "Language" としているのも準拠。
- **重要度**: Low
- **推定工数**: 30 min
- **備考**: カラーバリエーションは色トークン差し替えで実現可能。

## list (DadsList)

- **Missing props**:
  - `spacing` ('12' | '8' | '4') — 公式 MD の「リストアイテム間の間隔」3 種類、HTML 参照でも `data-spacing="4"` 等。
  - `nestingMarker` (boolean | 'auto') — 公式「入れ子の深さに応じて 3 種類のマーカーを使い分け」。実装が自動的にレベル別マーカーを出力しているかは型から判別不能。
- **a11y**: `type='ordered'` を提供しているが、公式は「`<ol>` 使用禁止」。`<ul>` + テキスト番号を推奨。`ordered` を deprecate ないし docs で警告すべき。
- **重要度**: Medium
- **推定工数**: 1h
- **備考**: `spacing` だけでも追加すれば公式構成に近づく。

## mega-menu (DadsMegaMenu)

- **Missing props**: 公式 MD は「ガイドラインは準備中です」、Figma スナップショットも N/A。
- **a11y**: `aria-label` のみ。展開時のキーボード ESC / フォーカストラップ等の言及が無い (実装側で吸収されている前提)。
- **重要度**: Low
- **推定工数**: -
- **備考**: 公式仕様が乏しく差分判定不能。現実装の `triggerLabel` + `columns` + `click:item` で WAI-ARIA Authoring Practices の「Disclosure (Show/Hide)」相当として最低限機能する。仕様確定後に再評価。
