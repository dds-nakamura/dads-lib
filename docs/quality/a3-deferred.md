# 柱A-3 申し送り — 構造リファクタ / 公開API・aria 変更が必要な差異 (Issue #18)

柱A-2 (API/aria 不変の見た目是正) では適用できなかった差異の一覧。各項目は **公開 props/バリアントの変更・DOM 構造やネイティブ要素の置換・ARIA/role・キーボード挙動・公式共有部品への作り直し** のいずれかを伴うため、破壊的変更 (major) または挙動変更 (minor) を判断のうえ別途対応する。

- 一次資料: 各 [`gap-reports/<Component>.md`](./gap-reports/) と `design-system-example-components-html`。
- A-2 で適用済みの内容は [`gap-reports/README.md`](./gap-reports/README.md) および changeset 参照。

合計 165 項目 / 45 コンポーネント。

---

## Accordion

> **T3 解消済み (PR: issue-18-a3-t3, 案X フル)** — 単一 native `<details>/<summary>` へ作り直し。DadsDisclosure と同型の API (`title`/`modelValue`/`defaultOpen`/`headingLevel`/`backLink`) に統一し、`items[]`/`type`(single/multiple)/`size`/独自矢印キーナビ/`panel-{id}` slot を全廃。

- [x] <div>+<h3>+<button aria-expanded> 構造 → 公式 <details>/<summary> ネイティブ disclosure への作り直し (DOM/aria 変更)
- [x] chevron web-font アイコン → 公式の円形 border アイコン+SVG chevron 回転への置換 (公式 inline SVG `M3.3 7.3L12 16L20.7 7.3` を採用、`[open]` で 180° 回転)
- [x] 公式に無い size=l/m/s/xs 公開 API の廃止と @media(min-width:48rem) レスポンシブ挙動の実装 (`--_icon-size` 20→32px)
- [x] 公式に無い disabled 状態の扱い (opacity 0.6 ディミングは維持。DadsDisclosure と同じ click/keydown インターセプト方式)

## Blockquote

- [ ] 公式に無い wrapper(<div>)+<cite> 構造および cite/citeUrl prop による帰属表示 (機能拡張・public API/DOM。border-left 8px/margin/padding のコア部は公式 blockquote.css と一致のため本体は健全、構造除去は見送り)

## Breadcrumb

- [ ] 公式 SVG chevron separator-icon の導入 (現状は separator prop の文字 》。SVG 化は separator prop の意味変更=public API)
- [ ] 公式 home-icon バリアント対応 (slot/prop 追加が必要=public API)
- [ ] aria-label → 公式の aria-labelledby + visually-hidden ラベル方式への変更 (aria/DOM 変更)
- [ ] 公式に無い disabled 状態の独自追加 (public 挙動の除去は見送り)

## Button

- [ ] color バリアント success/error/warning/secondary の整理: 公式 button は blue 単色で semantic color 軸を持たない。これらは公開 color prop に紐づくため削除は API 変更 → A3。今回は inert な誤トークン(--color-success-bg 等)もそのまま据置
- [ ] data-type/data-size 属性セレクタ方式への変更(現状 BEM クラス): クラス名変更はテスト前提に影響するため見送り
- [ ] spinner/loading は公式に無い独自機能。API 削除は破壊的変更のため据置

## Card

- [ ] 公式 6 作例(全体 <a> リンク/grid/subgrid/checkbox label/__main の image overlap)への構造刷新: 現状の汎用 5 スロット BEM 構造を作例別コンポーネント化するのは DOM/設計思想の変更 → A3
- [ ] リンクカードのタイトル下線 1px→3px 太化 hover: スロット内の任意要素を CSS で確実にターゲットできず、構造前提を要するため見送り(汎用 bg hover を維持)
- [ ] elevation fallback の推定影値(0 1px 2px rgba 等): トークン名は正で実在し fallback は inert。実害小のため据置

## Carousel

> **T7 解消済み (PR: issue-18-a3-t7, 案X フル)** — 公式 `dads-carousel`(container.html/carousel.css/carousel.js) を忠実移植。`slides[]` データ駆動へ全面書き換え。新規に静的単一バリアント `DadsCarouselSingle` も追加。

- [x] 公式 UI 構造への刷新: 数値ステップナビ(aria-current 番号反転)/next blur プレビュー/「すべて表示」disclosure 展開/幅狭 page-nav を移植
- [x] autoPlay/interval/pauseOnHover の削除: MD が禁止する自動再生機能を API ごと削除
- [x] レスポンシブ思想: `@container (min-width: {breakpointRem}rem)` で std⇔幅狭を自動切替。ResizeObserver はワイド時 `role=tabpanel` 同期のみ
- [x] ナビ role=tablist/tab → 数値ステップナビ + aria-current へ変更
- [x] next エリア blur プレビューの実装

## Checkbox

> **T4 解消済み (PR: issue-18-a3-t4, 案X フル)** — 公式 checkbox.css の正準構造へ作り直し。

- [x] 正準構造への作り直し: `input.dads-checkbox__input` を `appearance:none`、チェックを `::before` clip-path(SVG path) で描画
- [x] readonly 状態 (公式に無い独自状態) を削除
- [x] __required バッジ → form-control-label / ※必須 連携へ
- [x] footer __error / __required の font-weight 整理
- [x] forced-colors の網羅度向上 (disabled時 GrayText / check HighlightText 等)

## CheckboxGroup

- [ ] 共有部品 form-control-label への移行: 公式は legend/required/support-text を fieldset.dads-form-control-label + legend.dads-form-control-label__label + __requirement + __support-text で構成。現状は独自クラス (__legend/__required/__hint) で再実装。DOM/クラス名変更を伴うため A3。
- [ ] required 表現: 公式 ※必須 (__requirement, data-required) へ。現状は塗りつぶしバッジ (padding:2px 8px + 角丸 + 反転色)。DOM/表現変更のため A3。
- [ ] __required バッジの --border-radius-4 是正は ※必須 表現移行で不要化するため A3 に同梱。
- [ ] legend のサイズ別 font-size (sm/md/lg=16/17/18px) は form-control-label の data-size 構造前提のため A3。

## ChipLabel

- [ ] 色軸の再設計: 公式は data-color 12 primitive 色相 (gray/blue/light-blue/cyan/green/lime/yellow/orange/red/magenta/purple) × data-style 4 種。現状は 5 semantic (primary/success/error/warning/secondary)。公開 props (color 値集合) の破壊的変更のため A3。
- [ ] size 軸撤廃: 公式はサイズ軸なし (単一 min-height 32px)。現状は sm/md/lg を独自発明。size prop 削除は破壊的変更のため A3 (今回は誤トークンのみ是正し prop は温存)。
- [ ] style 軸: 公式 4 種 (text/outline/filled-outline/fill) → 現状 2 種 (filled/outlined)。appearance prop の意味変更/拡張のため A3。
- [ ] アイコン整列の正準化: 公式 .dads-chip-label__icon の 1cap 基準光学整列 + fill:currentcolor。現状は prepend/append slot を 1.1em 配置。DOM/クラス変更のため A3。
- [ ] forced-colors: 公式アイコン fill:CanvasText に対し現状は枠線 CanvasText。アイコン構造側 (A3) と合わせて対応。

## ChipTag

- [ ] font-weight:500 direct value (no canonical --font-weight token for chip-tag; changing weight visibly alters rendering without a confirmed canonical source — gap-report item #6 partial)
- [ ] size axis sm/md/lg possibly an unofficial invention (gap-report #7) — prop/API change, out of A-2 scope
- [ ] min-height direct rem values (gap-report #8) — DADS has no spacing/dimension scale to tokenize against; deferred to repo-wide spacing decision
- [ ] Whether color axis (5 semantic colors) should be re-designed to primitive hues per official chip-label — would be a breaking props/API change

## ColorPicker

- [ ] border-radius 4→8 (gap-report #3, low): repo sibling form parts InputText/Select both use --border-radius-4; changing only ColorPicker would create inconsistency. This is a repo-wide form-radius decision (InputText/Select/Combobox/ColorPicker together), not a per-component A-2 fix
- [ ] forced-colors swatch background-color collapse / color-swatch label affordance (gap-report #4) — needs DOM/markup additions, out of A-2 scope
- [ ] Fixed 2.5rem swatch/hex dimensions (gap-report #5) — no DADS dimension token to map to
- [ ] 6-column fixed grid → auto-fill/minmax (gap-report #6) — layout behavior change, deferred

## Combobox

- [ ] border-radius 4→8 on control/suggestions/required (gap-report #4, medium): deferred to the same repo-wide form-radius decision as ColorPicker — sibling InputText/Select are at --border-radius-4, so changing only Combobox would diverge
- [ ] label/error font-weight:500 and required-badge font-weight:700 direct values (gap-report #6) — no confirmed canonical --font-weight token; weight change visibly alters rendering
- [ ] required badge padding:2px 8px direct value (gap-report #7) — no DADS spacing token to map to
- [ ] suggestions top:calc(100%+4px) / max-height:16rem / z-index:10 direct values (gap-report #8) — no dimension token scale
- [ ] ChipTag indirect color dependency (gap-report #5) resolves automatically via the ChipTag token fixes above; nothing to change in Combobox
- [ ] readonly dashed border representation vs DADS standard (gap-report border note) — needs canonical confirmation, not a token swap

## DatePicker

- [ ] separated variant structural rebuild: example uses a distinct DOM (__separated-inputs/__separated-input, 72px centered fields, absolutely-positioned labels). Vue reuses consolidated __inputs and only re-styles via modifier. Reproducing the official structure requires template/DOM additions → out of A-2 scope (only token hygiene applied to existing separated rules).

## DescriptionList

- [ ] Default layout is 'horizontal' (2-column grid) which the official example does not have — the only official layout is a single vertical stack (gap 8px, dd margin-left 32px) ≈ Vue's 'vertical'. Changing the default layout prop value is a public-API/behavior change → A3.
- [ ] 'bordered' and 'horizontal' are public props with no counterpart in the official 26-line CSS. Removing or redefining them is an API change → A3.
- [ ] Root over-specification of font-family/font-size (example omits them, relying on global inheritance) left intact to avoid altering rendered defaults beyond the line-height correction.

## Disclosure

- [ ] 公式 playground にある __back-link (先頭に戻るリンク + アイコン) の構造追加 — DOM/slot 構成の追加なので A-2 対象外。現状 content slot で吸収可能だが正準構造の補完は別途
- [ ] disabled 状態 (opacity .6 / cursor not-allowed / text-disabled) は公式 example に定義が無い Vue 独自拡張。配色是正する公式の専用トークンが gap-report に無いため見送り

## Divider

- [ ] color バリアントを公式 3 段階 (gray-420 / gray-536 / black) に揃える件: 現状 public prop が DadsDividerColor = 'default' | 'strong' の 2 段階。3 段階化は破壊的 API 変更のため見送り (既存 2 値を実在トークンへマップするに留めた)
- [ ] 描画手法/DOM の <hr> + border-top ベースへの寄せ (現状 <div role=separator> + 子 <span> background-color)。構造刷新かつ forced-colors 対応の前提も変わるため A-2 対象外
- [ ] label / vertical / inset の Vue 独自拡張 (公式 divider に存在しない機能) の整理

## Drawer

> **T3 解消済み (PR: issue-18-a3-t3, 案X フル)** — native `<dialog>` + `showModal()` + `::backdrop` へ構造刷新。本文は default slot（フリーフォーム）に統一し、非公式の item ナビ (`items[]`/`DadsDrawerItem` 再帰) と `full` placement を全廃。閉じるは `DadsHamburgerMenuButton`(X)。`sample-app/SideMenu.vue` は slot + `DadsMenuList` へ追従。

- [x] ネイティブ <dialog> + showModal() + ::backdrop への構造刷新 (Teleport/Transition/手書き overlay/focus-trap/Tab ハンドラを全廃。native dialog が focus-trap/Esc/inert を肩代わり)
- [x] 公式 drawer に存在しない item ナビ機能 (DadsDrawerItem 再帰) と関連 props/slot/状態スタイルの整理 → 全廃し default slot へ
- [x] 閉じるボタンを公式共有部品 hamburger-menu-button (SVG) に寄せる件 → `DadsHamburgerMenuButton` を close 状態で採用
- [x] __item-button の disabled (opacity:.5) → item ナビ廃止により消滅 (slot 側の責務)
- [x] forced-colors で公式は ::backdrop を #000b に強調 → native `::backdrop` + `@media (forced-colors: active)` で実装
- [x] __title の独自 18px/700 と __close の 4px 角丸 → 公式に無い装飾を撤去 (visually-hidden `<h2>` + aria-labelledby に置換)
- [x] 公式 header 下線は本来存在しない (Vue 独自) → 撤去

## EmergencyBanner

- [ ] Removing the independent position: fixed; top/left/right:0; z-index:9999 viewport-pinning (official example is static / placement-agnostic) — this is a layout/behavioral change consumers rely on, not a low-risk token swap

## FileUpload

- [ ] Restructure the trigger button and remove button to use the shared DadsButton component (data-type=outline / data-type=text data-size=xs) — DOM/structure change
- [ ] Removing the public size variant (sm/md/lg) — DadsFileUpload.test.ts asserts dads-file-upload--md/sm/lg classes and types expose size, so removal is an API break
- [ ] Add the official dads-checkbox drop-area-expand UI control (expandDropArea is currently a fixed boolean prop, official is a user-toggled checkbox) — DOM/API change
- [ ] Numbered counter() file list + single-file marker ::before dot, and remove-button order:-1 layout — DOM restructure
- [ ] Replace the root-wrapper --disabled opacity:0.5 flat dim with per-element disabled tokens — needs a per-element disabled design for label/dropzone-text, not a single token swap

## HamburgerMenuButton

- [ ] icon-only バリアントを公式 `hamburger-menu-icon-button` (border-radius 4px / 44px タップ領域) に寄せる是正は、独自 variant の構造/サイズ再設計を伴うため見送り (gap-report 差異①)。
- [ ] sm/lg サイズバリアントは公式テキスト版に存在しない独自拡張。削除は API (size 軸) 変更となるため対象外。md が公式相当で fidelity は確保済み (gap-report 差異④)。

## HeaderContainer

- [ ] menu-toggle を生 `<button>` + `<i class="mdi mdi-menu">` で独自実装している点を既存 `DadsHamburgerMenuButton` 部品の内包に置き換える是正 (gap-report 差異③/最重要ドリフト)。slot/props API 変更を伴うため対象外。
- [ ] menu-toggle への `aria-expanded` / `aria-controls` 追加 (gap-report 差異②)。aria/状態管理 API 変更のため対象外。
- [ ] mdi フォント依存を DADS の inline SVG アイコンに置換 (gap-report 差異④)。DOM 構造変更のため対象外。
- [ ] sticky 時の `--elevation-*` 影追加 (gap-report 差異⑤)。公式正準値が存在せず推測実装になるため見送り。

## Heading

- [ ] サイズ段階を公式 data-size 10 段階 (64/57/45/36/32/28/24/20/18/16) に合わせる是正 (gap-report 差異①)。`DadsHeadingSize` 型変更を伴い size 軸 API が変わるため対象外。
- [ ] line-height をサイズ毎の公式値 (36→1.4, 32/28/24/20→1.5, 18→1.6, 16→1.7) へ再マッピング (gap-report 差異②)。現状は level ベースで割当てられており、size ベースモデルへの構造転換 (data-size) が前提となるため見送り。
- [ ] letter-spacing のサイズ毎付与 (36→0.01em, 24/20/18/16→0.02em) (gap-report 差異③)。同上 size ベースモデル前提のため見送り。
- [ ] 飾り罫 (data-rule) / chip 縦線 (data-chip ::before) / shoulder サイズ連動 (--_shoulder-size) の未実装機能追加 (gap-report 差異⑥)。新規 prop/属性追加 = API 変更のため対象外。
- [ ] 公式 data-* 属性 + `__heading` クラスモデルへの構造的書き換え (gap-report 差異⑦/独自 BEM `__title`/`__text` ドリフト)。公開クラス名・DOM 変更のため対象外。

## Image

- [ ] 画像本体の border-radius (--border-radius-4 / 4px) は公式 image 仕様が「準備中」で正準値が存在せず、Figma PNG も当環境に無いため変更せず据え置き (gap-report の『要 Figma 確認』に従う)
- [ ] skeleton/shimmer の独自拡張 (rgba 直書きグラデーション) は公式仕様外だが a11y 上無害な独自演出のため A-2 のトークン是正対象外として温存

## ImageSlider

> **T7 解消済み (PR: issue-18-a3-t7, 案X フル)** — 公式 MD どおり **DadsCarousel の薄ラッパ**(見出し必須のコンテナ型プリセット)へ再実装。独自フェード式スライダーを全廃し、構造・挙動・a11y は DadsCarousel に委譲。

- [x] 差異#1 構造の全面ドリフト → DadsCarousel(公式 dads-carousel 構造) へ委譲し独自フェード式を全廃
- [x] 差異#4 選択状態 UI の乖離 → 公式の番号バッジ tablist へ (Carousel 由来)
- [x] 差異#6 aria-current 不使用 → 現在番号バッジに aria-current=true (Carousel 由来)
- [x] 差異#8 arrow ヒットターゲット → 公式 page-nav (24px + 疑似要素 44px) へ (Carousel 由来)
- [x] 差異#5 コンテナ外枠 border-radius-8 → 撤去 (Carousel 由来)
- [x] 矢印グリフ ‹/› → 公式 SVG path へ (Carousel 由来)
- [x] heading のレスポンシブ拡大 20→24→32px → 実装 (Carousel 由来)

## InputText

- [ ] 差異#5 構造ドリフト: 公式は dads-input-text(input単体, input 自身が border/角丸/focus を持つ) と dads-form-control-label(別部品) の 2 部品合成。現状は label/required/hint/error/counter/icon を 1 ファイルに自前合成し focus ring を __control wrapper の :focus-within に移設。DOM/クラス構造の作り直しを伴うため A-3
- [ ] footer error の role="alert" 撤去: 公式 a11y ガイドライン (aria-live/alert ロール禁止) に反するが aria 挙動変更のため A-3
- [ ] counter / prepend・append icon は公式 input-text に無い独自拡張。削除は API(props) 変更のため A-3 (温存)
- [ ] sm/lg/md の高さ可変バリアント自体 (size prop) は維持。公式は font 16px 固定だが高さ段階は許容範囲として温存

## LanguageSelector

- [ ] Rebuild internals as DadsMenuListBox + DadsMenuList composition (gap #1, structural rewrite of DOM/classes)
- [ ] Remove non-official colorScheme variants light-green/light-gray (prop value removal = API change)
- [ ] Remove non-official cornerShape variants pill/square (prop value removal = API change)
- [ ] Remove non-official size 'lg' to match official sm/md only (prop value/default removal = API change)
- [ ] Switch current-item styling fully to [aria-current] selector basis (selector restructuring touching markup conventions)

## List

- [ ] Drop <ol> root for type='ordered' and switch to <ul data-marker='number'> + grid/subgrid text numbering (gap #1/#2): changes render behavior and is asserted by existing tests (renders <ol>, forwards start, nested <ol>) → DOM/behavior change
- [ ] Remove independently-fixed font-family/font-size/line-height to defer to inheritance (gap #5): debatable — current values equal browser/global defaults so kept to avoid unintended visual change in differing parent contexts

## MegaMenu

- [ ] Rework trigger toward shared DadsMenuListBox opener structure (gap #note: structural, no example exists — left as independent CSS)

## MenuListBox

- [ ] 構造ドリフトの解消 (popup 項目を独自 dads-menu-list-box__item から共有 DadsMenuList(type=box) 流用へ再設計): DOM/クラス名変更を伴うため A3
- [ ] opener の data-style バリアント (text/outlined/filled) 導入: props 追加が必要で API 変更
- [ ] triggerSize から公式に無い lg を削除: DadsMenuListBoxProps/型 (DadsMenuListBoxTriggerSize) の破壊的変更

## MobileMenu

- [ ] slide-item の独自寸法 (min-height 48px / padding 12px・16px) を menu-list 項目寸法 (44px/10px) へ寄せる一貫性是正: 公式 CSS 不在で必須ではなく、slide モードは独自 DOM のため A3 で再検討
- [ ] close ボタンの 40px タッチターゲットを 44px 慣例へ揃える検討: 公式 CSS 不在のため A3
- [ ] slide モードの独自フラットリスト実装を共有部品へ寄せる構造是正 (DOM 変更を伴うため A3)

## NotificationBanner

- [ ] Heading element: <p class=__title> -> <h2 class=__heading> (DOM/structure + a11y heading level change)
- [ ] Type prop rename info/neutral -> official info-1/info-2 (public API value change)
- [ ] Shared .dads-button action coloring via --button-* CSS vars per type (requires action slot/structure rework)
- [ ] mdi icon font -> official inline SVG (currentcolor) icon set
- [ ] 48rem responsive layout (grid-template-columns 24->36px, asymmetric padding 8/24 -> 24/32, column-gap 16->24, icon 28->44px) — needs grid restructure not safe as pure token swap
- [ ] forced-colors: official only sets icon currentcolor; Vue adds a border — left as-is (low risk, structural policy diff)
- [ ] Title accent coloring vs official gray-900 heading-text color (left existing behavior)

## PageNavigation

- [ ] Border radius (--border-radius-4) confirmation: no example dir and no Figma PNG in this env, canonical value unconfirmed — left at 4px pending HTML/Figma source
- [ ] ellipsis color tuning vs disabled gray-420 (needs Figma to confirm)

## ProgressIndicator

> **T4 解消済み (PR: issue-18-a3-t4, 案X フル)** — 公式 progress-indicator.css の SVG 構造へ全面再実装。circular/size 軸を削除。

- [x] Architecture: 公式 SVG `<line>` linear + spinner(`<g>` nesting) へ全面再実装
- [x] type taxonomy stacked/inlined/stacked-underlay (旧 variant/size を置換)
- [x] 非公式 circular ring + size 軸を削除 (public API removal)
- [x] active 表示制御モデル + `:not([active])` アニメ停止
- [x] 1px --color-primitive-blue-1200 underline accent on linear bar
- [x] stacked-underlay container (1px gray-500 border + 16px radius + padding + min-size)
- [x] Bar shape: 公式 rectangular SVG line (no rounded caps) へ
- [x] indeterminate animation: 公式 cubic-bezier g-double-rotation を移植

## Radio

> **T4 解消済み (PR: issue-18-a3-t4, 案X フル)** — 公式 radio.css の正準構造へ作り直し。Vue 独自サブ要素は form-control-label / RadioGroup へ委譲。

- [x] 正準構造へ: `<input>` 自身を `appearance:none` の可視コントロール + `__radio` センタリング。サイズ 24/32/44・外 20/26/36・border 2/2/3px・hover ring・click-target を実装
- [x] inner-dot を固定 px (10/12/16) へ (50% 比率を廃止)
- [x] Vue 独自 __required / __description / __hint / __error / __footer を削除し form-control-label / RadioGroup へ委譲 (`ariaDescribedby` で wiring)

## RadioGroup

- [ ] Adopt the official dads-form-control-label shared component (legend=__label, required=__requirement[data-required], support=__support-text) instead of the bespoke dads-radio-group__legend/__required/__hint/__error — structural/class-name change (gap-report item #1).
- [ ] Required marker: official renders a plain ※必須 text via __requirement[data-required]; Vue renders a filled error-color badge. Changing the default representation alters DOM/visuals beyond pure CSS (gap-report item #5).
- [ ] legend font-weight 500 / line-height 1.5 are unverified against form-control-label; reconciling requires form-control-label.css confirmation (gap-report item #6).
- [ ] items vertical/horizontal fixed gaps (12/16px) vs official stacked layout that relies on each Radio's vertical padding — tied to the Radio structural rework.

## ResourceList

- [ ] Title heading level: official <h2>, Vue hardcodes <h3>; changing requires a headingLevel/as prop (DOM/API change, gap-report item #5).
- [ ] Action structure: official __action > __action-button (44px wide, height:100%, align-self:stretch, border-radius:inherit) vs Vue's single __action element (min 2.75rem, border-radius-4) — class hierarchy + dimensions differ (gap-report item #7).
- [ ] Unimplemented official features: __label (order:-1 badge), [data-interaction="whole"] full-row label::before overlay, and in-row radio/checkbox integration (with-control / multiple-items) — all need DOM additions (gap-report item #8).
- [ ] Vue-only extensions not in official CSS: __thumbnail / __icon (mdi) / __tags / __tag / --kind-* — API-bearing, kept as-is.
- [ ] Disabled title/support color override: official forces title color via [data-interaction="whole"]:has(:disabled) structural selector; Vue's --disabled color only cascades to inherited text. Full parity needs the whole-interaction structure.

## SearchBox

- [ ] Connected category-select visual (official: select border-radius 8px 0 0 8px + input margin-left:-1px with left corners squared) — requires restructuring the __category/__input connection (structural, gap-report diff #5)
- [ ] Clear button and suggestions listbox are features not present in the official search-box (gap-report diff #6) — removing them would change props/DOM/aria, out of A-2 scope
- [ ] Independent size variant (sm/md/lg) is a non-official extension (gap-report diff #10) — touching it changes the public size axis

## Select

- [ ] Core structural drift: component is a custom role=combobox + <ul role=listbox> reimplementation; official is a native <select> + chevron with --color-neutral-solid-gray-800 text. Converting to native select changes role/DOM/emit (multiple/chips/type-ahead) — breaking, out of A-2 (gap-report diff #1)
- [ ] Padding asymmetry (official left16/right40 around an absolutely-positioned chevron) not adopted: Vue lays out the chevron as a flex child via space-between, so symmetric padding is correct for that layout; aligning requires switching to absolute chevron = structural (gap-report diff #12)
- [ ] Size -2px concern (gap-report diff #6): left unchanged. The trigger min-height is content height inside a border-box control; outer = min-height + 2px border = 40/48/56px, which already matches official outer dimensions, so no change needed
- [ ] forced-colors mapping CanvasText/Highlight vs official ButtonText/GrayText (gap-report diff #11): left as-is since it is tied to the custom listbox structure rather than a native select

## StepNavigation

> **T4 解消済み (PR: issue-18-a3-t4, 案X フル)** — 公式 step-navigation.css の正準構造へ作り直し。

- [x] クラス/構造を公式 __step/__header/__number/__description + `::before/::after` connector + data-state/data-size へ
- [x] data-size normal/small (number 44/32px, title 18/16px) を追加
- [x] status enum を reached/completed/error/skipped/editing + aria-current へ
- [x] state-icon / state-label / description サブ要素を実装
- [x] connector を `<span>` から `::before/::after` 疑似要素へ

## Tab

- [ ] disabled の opacity:0.5 + color の二重表現の整理 (gap-report fix-5 low): 公式 example/Figma 不在で disabled 専用配色トークンが確定できず、opacity を外すと視覚が変わるため見送り
- [ ] font-weight 500 直値・min-height 44/40px・2px インジケータ等の実寸の正準一致確認 (Figma 不在のため検証不能)

## Table

> **T4 解消済み (PR: issue-18-a3-t4, 案X フル)** — 公式 table.css の正準構造へ作り直し。`table-control.md` の利用箇所も追従。

- [x] 列ヘッダ直下/行ヘッダ右端の 1px solid black 強調ボーダー を `.dads-table__col-header/__row-header` + `:last-of-type` で実装
- [x] data-cell-border / data-border 辺別ボーダー API を実装
- [x] 行 hover (blue-50) / 選択行 (blue-100) ハイライトを prop/属性で追加
- [x] 公式 `.dads-table`(コンテナ)>`.dads-table__table`+`__col-header` 構造へ寄せ

## TableControl

- [ ] search/select/button/preset を公式正準部品 (search-box / select / button / chip) で構成する作り替え (fix-2 構造ドリフト): DOM/クラス/内包コンポーネント変更を伴う
- [ ] search-input の outline:none !important + wrapper focus-within 委譲の特殊構造の是正 (fix-6 low): forced-colors 時の input 単体フォーカス可視性は構造変更を要するため見送り
- [ ] 固定サイズ段 (input/select 40px・button 32px・preset 28px) の正準寸法一致 (Figma/example 不在で検証不能)

## Textarea

- [ ] form-control-label 共有部品への構造寄せ (label/required を独自内蔵 → 公式 `.dads-form-control-label` 再利用)。公開クラス名 `__input`/`__error`/`__control` 変更を伴い破壊的
- [ ] focus を wrapper の `:focus-within` から textarea 要素自身へ移す構造変更 (公式は textarea 自身が focus 保持)。現状は wrapper に dads-focus-ring-within を適用 (mixin 化済みで A-2 範囲では値整合済み)。DOM/focus 担当要素の変更は A-3
- [ ] 公式に無い sm/md/lg サイズバリアント軸の削除 (API 互換のため軸自体は維持。md 既定値のみ公式単一サイズへ是正済み)

## Tooltip

- [ ] Esc キーで閉じる挙動の追加 (WAI-ARIA Tooltip 必須要件だが gap-report 通りキーボード挙動の変更は A-3 スコープ)。`@keydown.esc` ハンドラ追加が必要

## UtilityLink

- [ ] 差異 #2 (low): lead-icon が公式の inline SVG ではなく `<i class="mdi {iconName}">` アイコンフォント実装 (Vue:56-60,87-91)。MDI 依存・DOM/タグ・props(iconName) に関わる変更のため A-2 対象外。是正には公式同等の inline SVG デフォルト提供 (DOM 構造変更) か README での依存明示が必要。
- [ ] 差異 #3 (low): 公式 single の `display:block` + SVG `vertical-align:-0.15em` を、Vue は `inline-flex; align-items:baseline; gap:4px` + アイコン `transform:translateY(0.15em)` で再構成。視覚結果はほぼ同等だがレイアウト方式が独自。厳密一致のための block/vertical-align 化は構造変更を伴うため A3 に回送 (現状で視覚は許容範囲)。
- [ ] 差異 #5 (info): 公式に無い forced-colors (`LinkText`) 対応を Vue が独自追加 (Vue:198-207)。アクセシビリティ向上方向のため維持。focus-visible 側の forced-colors (Highlight 等) 拡張は別途検討事項として A3 に記録。

