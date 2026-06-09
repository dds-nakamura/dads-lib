# @dads/vue

## 1.0.0

### Major Changes

- 06eb5d9: **柱A-3 / T1: 公式 `form-control-label` 構造への移行（破壊的変更）** — Issue #18

  公式 DADS の共有部品 `dads-form-control-label`（ラベル / ※必須 / サポートテキスト / エラーテキスト / ステータスピル）を `DadsFormControlLabel` として新設し、フォーム部品のフィールドラベル層を公式構造へ統一した。

  ### 追加
  - **`DadsFormControlLabel`**: `as`(`div`|`fieldset`) / `size`(sm/md/lg) / `label` / `labelFor` / `required` / `requiredLabel`(既定 `※必須`) / `optionalLabel` / `supportText(Id)` / `errorText(Id)` / `status` / `disabled`。スロット: default(コントロール) / label / support-text / error / status。

  ### 破壊的変更
  - **必須マーカーが「塗りつぶしバッジ」→ 公式「※必須」表現**（`dads-form-control-label__requirement`）に変わる。
  - **公開クラス名の変更**: 各コンポーネントの独自 `__legend` / `__required` / `__hint` / `__error` / `__footer` を撤廃し、公式 `dads-form-control-label__label` / `__requirement` / `__support-text` / `__error-text` に統一（InputText / Textarea / CheckboxGroup / RadioGroup）。単体 Checkbox / Radio は `__hint` を `__support-text` に改名し ※必須 表現へ。
  - **`role="alert"` を撤去**（公式 a11y ガイドラインに従い error テキストに aria-live/alert を使わない）。
  - これらのクラス名・必須表現に CSS / テストで依存している場合は要修正。

  ### 維持
  - 公開 props（label/required/requiredLabel/hint/error/errorMessage/size/disabled、InputText の `align`・counter・prepend/append icon、Textarea の counter）は名称・意味を維持。
  - InputText の公式 `align`（vertical / horizontal-left / horizontal-right / fixed-label）レイアウトを新構造（grid）で再実装し維持。

  ### 対象外（後続テーマ）
  - input/checkbox/radio コントロール自身の正準構造作り直し（appearance:none・寸法 24/32/44 等）は **T4**、アイコンの inline SVG 化は **T5/柱B**。

- e882a13: **柱A-3 / T2: MenuListBox / LanguageSelector を公式 menu-list-box 構造へ整合（破壊的変更）** — Issue #18

  公式 `menu-list-box` / `menu-list` の markup・クラス名・トークンに準拠させ、独自再実装ドリフトを解消（軽量版: 共有 `DadsMenuList` component は import せず、公式 CSS を各コンポーネントの scoped style に移植）。ARIA の menu 意味論（`role=menu`/`menuitem`/`presentation`）は維持。

  ### MenuListBox
  - opener を公式 `dads-menu-list-box__opener`（`data-size` sm/md・`data-style` text/outlined/filled・opener-icon/opener-arrow）へ。**`triggerStyle` prop 追加**（text/outlined/filled、既定 text）。**`triggerSize` の `lg` を削除**（sm/md のみ）。
  - popup を公式 `dads-menu-list-box__popup` + `ul.dads-menu-list[role=menu] > li[role=presentation] > .dads-menu-list__item[data-type=box][role=menuitem]` へ。クラス名を公式へ改名（`__trigger`→`__opener`、`__surface`→`__popup`、`__item`→`dads-menu-list__item` 等）。
  - **非公式 `description`（item サブテキスト）を撤廃**（型 `DadsMenuListBoxItem` から削除）。

  ### LanguageSelector
  - 内部 popup/opener を公式 menu-list-box markup・クラスへ整合（独自 `dads-language-selector__*` の popup を公式 `dads-menu-list(-box)` クラスへ）。opener の "Language" 文言は DADS 仕様で維持。current 項目を `data-current` + `aria-current` 基準＋公式 check アイコンに。
  - **非公式バリアントを撤廃**: `colorScheme`（light-blue/green/gray）、`cornerShape`（rounded/pill/square）、`size` の `lg`（sm/md のみ、既定 md→sm）。

  利用側は削除した props（MenuListBox: `item.description` / `triggerSize="lg"`、LanguageSelector: `colorScheme` / `cornerShape` / `size="lg"`）と公開クラス名の変更に追随が必要。挙動・ARIA は維持。共有部品 `DadsMenuList` への component 合成は a3-deferred に残置（将来）。

- bac7eaa: T3 ネイティブ要素化 (Issue #18, 案X フル) — Accordion / Drawer を公式準拠のネイティブ HTML 要素へ作り直し。両者とも DOM 構造・ARIA・公開 API が変わる **破壊的変更**。

  ### DadsAccordion — 単一 native `<details>/<summary>` へ

  `<button aria-expanded>` ベースの管理型 multi-item を廃し、DadsDisclosure と同型の単一 disclosure に統一（公式 accordion は単一 `<details>`、スタックは並置）。
  - **新 API**: `title`(必須) / `modelValue`(v-model boolean) / `defaultOpen` / `headingLevel`(1–6, 既定 3) / `disabled` / `backLink` / `backLinkLabel`。default slot = 本文。emits `update:modelValue` / `toggle`。
  - **削除**: `items[]` / `type`(single|multiple) / `size`(l|m|s|xs) / 独自矢印キーナビ / `returnLink` / `panel-{id}` slot、型 `DadsAccordionItem` / `DadsAccordionType` / `DadsAccordionSize` / `DadsAccordionReturnLink`。
  - アイコンは公式 inline SVG chevron（円形ボーダー内、`[open]` で 180° 回転）。`@media(min-width:48rem)` でアイコン 20→32px の公式レスポンシブ挙動。

  ### DadsDrawer — native `<dialog>` + `showModal()` + `::backdrop` へ

  Teleport + `<div role=dialog>` + 手書き overlay/focus-trap を廃し、ネイティブ `<dialog>` のモーダル（focus-trap / Esc / inert 背景）を採用。本文はフリーフォーム default slot に統一。
  - **新 API**: `modelValue`(v-model) / `title`(visually-hidden 名・`aria-labelledby`) / `placement`(`left`|`right`) / `closeLabel`。default slot = 本文。emits `update:modelValue`。
  - **削除**: `items` / `DadsDrawerItem`（再帰 item ナビ）/ `click:item` emit / `placement="full"` / `defaultAriaLabel` / `navAriaLabel`、コンポーネント `DadsDrawerItem`。
  - 閉じるボタンは公式共有部品 `DadsHamburgerMenuButton`（X アイコン + 「閉じる」）。背景は native `::backdrop`（`opacity-gray-100` / forced-colors で `#000b`）。

  ### マイグレーション

  ```vue
  <!-- before -->
  <DadsAccordion v-model="openId" :items="items" type="multiple" />
  <!-- after: 1 項目 = 1 コンポーネント。スタックは並べる -->
  <DadsAccordion v-model="open" title="見出し">本文</DadsAccordion>
  ```

  ```vue
  <!-- before -->
  <DadsDrawer v-model="open" :items="items" placement="full" />
  <!-- after: 本文は slot。ナビは DadsMenuList 等を流し込む -->
  <DadsDrawer v-model="open" title="メニュー" placement="left">
    <DadsMenuList :items="items" type="box" />
  </DadsDrawer>
  ```

  `full` placement は廃止（`left` / `right` のみ）。Drawer の item ナビが必要な場合は slot 内に `DadsMenuList` を構成する。

- c3cf474: T4 正準構造作り直し (Issue #18, 案X フル) — Checkbox / Radio / Table / StepNavigation / ProgressIndicator を公式 example の正準 DOM/クラス/CSS へ作り直す **破壊的変更 (major)**。非公式拡張は削除。

  ### DadsCheckbox
  - input sr-only + `__indicator` 疑似要素 → `input.dads-checkbox__input` を `appearance:none`、チェックを `::before` clip-path(SVG) で描画。サイズ 24/32/44・border 2/2/3px。
  - 非公式 `readonly` 削除。forced-colors 網羅度向上 (disabled→GrayText / check→HighlightText)。
  - ラベル/必須/サポートは form-control-label / ※必須 連携。CheckboxGroup は無影響。

  ### DadsRadio
  - 同様に `input` 自身を `appearance:none` 可視コントロール + `__radio` センタリングへ。外 20/26/36・内 dot 固定 px 10/12/16・border 2/2/3px・hover ring。
  - Vue 独自 `__required` / `__description` / `__hint` / `__error` / `__footer` を削除し RadioGroup(form-control-label) へ委譲。新規 `ariaDescribedby` で per-item 説明を input に wiring。

  ### DadsTable
  - 独自 BEM → `.dads-table`(コンテナ)>`.dads-table__table` + `.dads-table__col-header`(`<th scope=col>`)/`.dads-table__row-header`(`<th scope=row>`)。列ヘッダ直下/行ヘッダ右端の象徴的 1px black 強調ボーダー。
  - 辺別ボーダー API を `data-cell-border` / `data-border`(`cellBorder`/`border` prop) へ。行 hover(blue-50)/選択(blue-100) を `hoverable`/`selectable` で追加。`caption`/`dense`/`striped` 対応。
  - 非公式 `stickyHeader` / `loading`(skeleton) 系 / `density`/`bordered` を削除。ヘッダセルは slot 内で公式クラスを付与。

  ### DadsStepNavigation
  - `__item/__button/__indicator/__connector(<span>)` → 公式 `__step/__header/__number/__description` + `::before/::after` connector。`data-size`(normal/small) 追加。
  - status enum を `pending/current/done/error` → **`reached/completed/error/skipped/editing`** + `aria-current`(`current` prop) へ。state-icon/state-label/description 実装。

  ### DadsProgressIndicator
  - div-fill + `<circle>` → 公式 SVG `<line>` linear + spinner(`<g>` nesting) へ全面再実装。
  - `variant`(linear/circular) + `size`(sm/md/lg) を廃し **`type`(stacked/inlined/stacked-underlay)** + `indicator`(linear/spinner) へ。非公式 circular/size を削除。
  - `active` 表示制御、blue-1200 underline accent、stacked-underlay コンテナ、cubic-bezier spinner、`role=progressbar`/aria-valuenow。

  ### マイグレーション要点
  - Checkbox: `readonly` 廃止。Radio: `required`/`description`/`hint`/`errorMessage` は RadioGroup 側へ移動。
  - StepNavigation status: `done`→`completed` / `pending`→省略 / `current` は `current` prop。
  - ProgressIndicator: `variant`/`size`/`circular` 廃止 → `type`/`indicator`/`value`/`active`。
  - Table: `bordered`→`border`/`cellBorder`、`density`→`dense`、`stickyHeader`/`loading` 系廃止。ヘッダセルは `dads-table__col-header`/`__row-header` を付与。

- 19c81bf: **柱A-3 / T6: 非公式バリアントを公式準拠に整理（破壊的変更）** — Issue #18

  公式に無い prop 値/バリアントを撤廃し、公式の軸へ統一した（案X）。8コンポーネント対象。構造寄りの大きな項目は `docs/quality/a3-deferred.md` に残置（後続テーマ）。
  - **ChipLabel**: `color` を 5 semantic（primary/success/error/warning/secondary）→ **公式 11 primitive 色相**（gray/blue/light-blue/cyan/green/lime/yellow/orange/red/magenta/purple）に再設計。`appearance` を 2（filled/outlined）→ **公式 4 種**（text/outline/filled-outline/fill）に。**`size` 軸を撤廃**（型 `DadsChipLabelSize` 削除）。既定 `color=gray` / `appearance=text`。
  - **Heading**: `size` を旧 8 段階 → **公式 10 段階**（64/57/45/36/32/28/24/20/18/16）に。`'14'` を削除。per-size の line-height / letter-spacing を公式値で付与。
  - **Divider**: `color` を 2 段階（default/strong）→ **公式 3 段階**（`gray-420`/`gray-536`/`black`）に。CSS modifier クラス名も改名。既定 `gray-420`。
  - **Button**: `color` の **success/error/warning/secondary を撤廃**（公式の blue 単色 = `primary` のみ）。**`loading`/spinner は存続**。
  - **FileUpload**: **`size` 軸を撤廃**（型 `DadsFileUploadSize` 削除）。disabled を要素別の公式トークン配色へ。
  - **List**: `type='ordered'` を `<ol>` → **`<ul>` + コピー可能なテキスト採番**（公式 a11y）に。
  - **NotificationBanner**: 見出しを `<p>` → **`<h2>`**。`color` の `info/neutral` を **`info-1`/`info-2`** にリネーム。
  - **DescriptionList**: 既定 layout を**縦積み**へ、非公式 `horizontal` を撤廃。**`bordered` は存続**。

  利用側は各 prop の値集合・既定の変更に追随が必要（詳細は各コンポーネントの型・docs カタログ参照）。挙動/aria は原則維持。

- 04015e8: T7 carousel 系移植 (Issue #18, 案X フル) — Carousel / ImageSlider を公式 `dads-carousel` 構造へ忠実移植し、静的単一バリアント `DadsCarouselSingle` を追加。両既存コンポーネントとも公開 API が変わる **破壊的変更**。

  ### DadsCarousel — 公式 `dads-carousel` を忠実移植

  汎用 translateX スライダー (slot + `itemCount` + 自動再生 + 丸ドット) を廃し、公式構造へ全面書き換え。
  - **新 API**: `slides: DadsCarouselSlide[]`(画像+任意リンク) / `modelValue`(v-model) / `heading`+`headingLevel`(コンテナ型) / `ariaLabel`(キービジュアル型) / `breakpointRem`(既定64) / `unit` / `showAllLabel` / 各 i18n aria ラベル。emits `update:modelValue` / `change`
  - **削除**: `itemCount` + デフォルトスロット(`DadsCarouselSlotProps`) / `type` / `mode` / `visibleCount` / `autoPlay` / `interval` / `pauseOnHover` / `showArrows` / `showIndicators` / `loop` / ドット indicator 系
  - 数値ステップナビ(`role=tablist`・ロービングタブインデックス・Arrow キー・`aria-selected`) / next blur プレビュー / 「すべてのスライド」`<details>` 展開 / 幅狭 page-nav / blur 背景 / `@container(breakpointRem)` レスポンシブ(+ ResizeObserver でワイド時 `role=tabpanel` 同期)。現在番号に `aria-current="true"`、外周角丸撤去、見出し 20→24→32px

  ### DadsImageSlider — DadsCarousel の薄ラッパ化

  公式 MD「image-slider = カルーセルのコンテナ型・マルチ・幅狭サイズ」に従い、独自フェード式を全廃して **DadsCarousel へ委譲**(見出し必須プリセット)。
  - **新 API**: `slides`(=`DadsCarouselSlide`) / `heading`(必須) / `modelValue` / `headingLevel` / `breakpointRem` / `unit` / `showAllLabel` / 各 aria ラベル。emits `update:modelValue` / `change`
  - **削除**: `autoPlay` / `interval` / `pauseOnHover` / `showArrows` / `showIndicators` / `loop` / `caption`(非公式)

  ### DadsCarouselSingle (新規)

  公式 `dads-carousel-single`(静的 1 枚絵・任意リンク)を新規追加。`href` 指定で `<a>`、未指定で `<span>` ラップ。Props: `src`/`alt`(必須) + `srcset`/`href`/`target`/`rel`/`width`/`height`。

  ### マイグレーション

  ```vue
  <!-- before: 汎用スロット + 自動再生 -->
  <DadsCarousel
    :item-count="3"
    auto-play
    v-model="i"
  ><template #default="{ index }">…</template></DadsCarousel>
  <!-- after: slides データ駆動 -->
  <DadsCarousel v-model="i" :slides="[{ src, alt, href }]" heading="開催中のイベント" />
  ```

  自動再生は公式 MD が禁止のため全廃 (`autoPlay`/`interval`/`pauseOnHover` 削除)。スライド内容は任意要素ではなく画像 (`slides[].src`) ベースに変更。

- 224cb1d: **柱B: アイコンを MDI webfont から DadsIcon (inline SVG / Material Symbols) へ移行（破壊的変更）** — Issue #18

  `@dads/vue` のアイコン描画を `@mdi/font`（webfont, `mdi-*` クラス）から、inline SVG の **`DadsIcon`**（Google Material Symbols, outlined / weight 400）に統一。webfont 読込ゼロ・**使用アイコンのみ同梱**（tree-shaking）。

  ### 追加
  - **`DadsIcon`**: `name`(必須・Material Symbols 名) / `size`(既定 24, number→px / string) / `label`(指定時 `role="img"`+`aria-label`、未指定時 `aria-hidden`)。`<svg fill="currentColor">` を描画し色は `currentColor` 継承。
  - アイコンレジストリ `icon-registry.ts`（`@material-symbols/svg-400` から生成、`scripts/generate-icon-registry.mjs`）。`@material-symbols/svg-400` は **devDependency**（実行時依存なし）。

  ### 破壊的変更
  - icon 系 props（`prependIcon` / `appendIcon` / `iconName` / `triggerIcon` / `frontIcon` / `tailIcon` / `endIcon` / `icon` 等）が受け取る値が **`mdi-*` クラス文字列 → Material Symbols 名**に変わる（案X・後方互換シムなし）。移行表: [`docs/quality/icon-mapping.md`](../docs/quality/icon-mapping.md)（例: `mdi-home`→`home`, `mdi-chevron-down`→`keyboard_arrow_down`, `mdi-magnify`→`search`, `mdi-cog`→`settings`, `mdi-open-in-new`→`open_in_new`）。
  - 利用側の `@mdi/font` 読み込み前提を撤廃（README 設計判断 R-2 改訂）。フォント読込は不要。

  ### 移行
  - `@dads/vue` の mdi 使用 23 コンポーネント（ハードコード＋prop 経由）を `DadsIcon` に置換。
  - 既存テストを inline SVG（`svg.dads-icon` / `DadsIcon` name）ベースへ更新。

  ### 注記
  - `expand_more` / `expand_less` は当バージョンの `@material-symbols/svg-400` に同梱されないため、同形の `keyboard_arrow_down` / `keyboard_arrow_up` を採用。
  - レジストリに無い Material Symbols 名を渡した場合は描画されず（dev 警告）。アイコン追加は生成スクリプトで再生成する。

- 7201112: Remove `@deprecated` aliases and DADS-deprecated components in preparation for the next major.

  Closes #14.

  ### 削除した旧名エイリアス (rename shim, 2026-05-17 導入)
  - `DadsTextField` / `DadsTextFieldProps` / `DadsTextFieldEmits` / `DadsTextFieldSize` / `DadsTextFieldType` / `DadsTextFieldInputmode` — 後継: `DadsInputText` 系 (公式 slug `input-text`)
  - `DadsHeader` / `DadsHeaderProps` / `DadsHeaderEmits` — 後継: `DadsHeaderContainer` 系 (公式 slug `header-container`)
  - `DadsModal` / `DadsModalProps` / `DadsModalEmits` / `DadsModalSize` — 後継: `DadsDialog` 系 (公式 slug `dialog`)

  ### 削除した DADS 非推奨コンポーネント

  公式 DADS で「使うな」と明記されている、もしくは推奨されない実装パターンに分類されているコンポーネントを `@dads/vue` から除外:
  - `DadsScrollTopButton` — 代替: `DadsTableOfContents` / `DadsPageNavigation` / skip links / `DadsHeaderContainer` の sticky モード
  - `DadsBottomNavigation` — 代替: `DadsHamburgerMenuButton` + `DadsMobileMenu`、または `DadsHeaderContainer` / `DadsGlobalMenu` / `DadsTab`

  ### 削除したレガシー Chip

  公式 DADS が `chip-label` / `chip-tag` を別 slug として定義しているため、兼用 `DadsChip` を削除し新 2 コンポーネントへの完全移行:
  - `DadsChip` / `DadsChipProps` / `DadsChipEmits` / `DadsChipSize` — 後継: `DadsChipLabel` (read-only) / `DadsChipTag` (interactive)

  ### 内部影響
  - `DadsCombobox` の multi-select chip は `DadsChip` → `DadsChipTag` に切替済 (利用 API に影響なし)

  ### マイグレーション

  旧名 import は単純置換可能:

  ```ts
  // before
  import { DadsTextField, DadsHeader, DadsModal, DadsChip } from '@dads/vue'
  // after
  import {
    DadsInputText,
    DadsHeaderContainer,
    DadsDialog,
    DadsChipLabel,
    DadsChipTag,
  } from '@dads/vue'
  ```

  `DadsScrollTopButton` / `DadsBottomNavigation` は代替コンポーネントに移行する必要がある。詳細は `docs/quality/naming-and-gap.md` の代替パターンを参照。

### Minor Changes

- 24fcbe2: **柱A-3 / T8: 小さなアクセシビリティ是正** — Issue #18

  公式準拠の a11y 改善（DOM 構造の大きな変更なし）。
  - **Tooltip**: WAI-ARIA Tooltip の要件に従い **Esc キーで閉じる**挙動を追加（フォーカスはトリガーに保持）。
  - **HeaderContainer**: メニュートグルに **`aria-expanded` / `aria-controls`** を追加。開閉状態は親が所有するため、新規 props **`menuExpanded`（既定 false）** と **`menuControls`**（制御対象 id）で受け取る（additive・非破壊）。
  - **Breadcrumb**: nav の命名を `aria-label` から **公式の `aria-labelledby` + visually-hidden ラベル**方式へ変更（既定ラベル文言を公式の「現在位置」に）。`ariaLabel` prop はラベル文言の上書きとして維持。

  > InputText の `role="alert"` 撤去は T1（form-control-label 移行）で対応済みのため本 T8 では対象外。

### Patch Changes

- 7b16797: **柱A-3 / T5: アイコン依存の残差を公式準拠化** — Issue #18

  柱B（DadsIcon 化）で大半は対応済み。本 T5 では公式が専用のアイコン表現を使う2箇所を公式準拠にした（DOM/aria 構造は不変）。
  - **Breadcrumb**: 区切りを文字 `》` から **公式の inline SVG chevron**（`__separator-icon`, 12×12）に変更。`separator` prop は **任意のテキスト上書き**として維持し、未指定時は公式 SVG を描画。
  - **Accordion**: 開閉アイコンを **公式の円形ボーダーアイコン**（`__icon` を `border-radius:50%` + 1px ボーダー + 白背景）にし、単一の chevron を **開いている時に CSS で 180° 回転**させる方式へ（従来は up/down のアイコン出し分け）。

  挙動・public props・aria は不変（Breadcrumb は既定の区切り見た目が変わる）。`<details>` 構造化や size API 等は後続テーマ（T3/T4/T6）。

- 1ed3681: DADS 公式とのビジュアル差異監査 (Issue #18) 柱A-2: 全 49 コンポーネントに API/aria 不変のビジュアル是正を適用 (計 242 件)。
  - **S-1b 文脈依存トークン**: `--color-border-default` / `--color-border-strong` / `--color-info-bg` / `--color-success-bg` / `--color-bg-selected-hover` / `--color-brand-secondary` / `--font-size-12` を用途に応じた実在公式トークンへ置換。これにより `@dads/vue` 内の「design-tokens に存在しないトークン参照」は内部 custom property を除き解消。
  - **focus-ring**: focus-visible を独自に直書きしていたコンポーネント (Checkbox / DatePicker 等) を共有 mixin (`dads-focus-ring` / `dads-focus-ring-fill`) へ統一。テキストボタン・リンク・メニュー項目は公式どおり黄背景塗りに。
  - **角丸**: フォーム部品 (InputText / Select / SearchBox / Textarea / MenuListBox opener 等) の `--border-radius-4` を公式 8px (`--border-radius-8`) へ是正。Card は 16px へ。
  - **タイポグラフィ**: line-height (1.5→1.7) / letter-spacing (0.02em 追加) / font-weight を公式 example 値へ。
  - **disabled 配色**: `opacity: 0.5` 一律ディミングを公式の専用トークン配色 (gray-300 / gray-50 / gray-420 等) へ。
  - **影**: 直書き box-shadow を `--elevation-*` トークンへ。
  - **誤フォールバック値**: `var(--token, #wrong)` の誤った fallback 直値を正値へ是正。

  props・aria・role・DOM 構造・公開クラス名は不変。構造リファクタや公開 API/バリアントに関わる差異 (165 件) は柱A-3 として別途対応。

- 3f1df17: DADS 公式とのビジュアル差異監査 (Issue #18) の横断課題 (基盤) を修正。
  - **S-2 focus-ring**: 共有 `_focus-ring.scss` の値を公式準拠に修正（`outline: 4px / outline-offset: 2px / box-shadow: 2px yellow-300`）。従来は逆値（2px / 0 / 4px）で全コンポーネントにドリフトが伝播していた。黄背景塗りの opt-in バリアント `dads-focus-ring-fill` も追加（公式のテキストボタン/リンク/メニュー項目の focus 表現用）。
  - **S-1a トークン置換**: design-tokens に存在しないセマンティック風トークン（`--color-text-primary` / `--color-bg-surface` / `--color-error` / `--spacing-*` 等）を、実在する公式トークン（`--color-neutral-solid-gray-*` / `--color-primitive-*` / `--color-semantic-*` / `calc(N/16*1rem)`）へ一括置換（48 ファイル・689 箇所）。従来は常にフォールバック直値で描画され、design-tokens の更新が反映されない実質ハードコード状態だった。

  挙動・API・アクセシビリティ属性に変更はなく、トークン解決とフォーカスリングの見た目を公式へ是正する調整。文脈依存トークン (S-1b) と各コンポーネント固有のビジュアル是正は後続で対応。

- 6196859: `DadsLanguageSelector` のポップアップ見た目を公式 DADS (menu-list-box / menu-list) に合わせて修正。
  - ポップアップの角丸を 4px → 8px に変更（公式 `menu-list-box` の `border-radius: 8px` に準拠）
  - 選択中項目 (`__item--current`) に薄いアクセント背景を追加。light-blue は公式既定の `blue-100` 背景 + `blue-1000` 文字に合わせ、light-green / light-gray も各アクセントの薄背景を付与（従来は文字色のみで背景なしだった）

  挙動・API・アクセシビリティ属性に変更はなく、見た目のみの調整。

## 0.2.1

### Patch Changes

- b5ef4cc: build: Vite 7 → Vite 8 (Rolldown) へ移行

  `@dads/vue` のビルド基盤を Vite 7.3.3 → Vite 8.0.14 にアップグレード。Vite 8 は Rollup + esbuild の二重バンドラを Rust 製の **Rolldown** に統一しており、当ライブラリでは以下の改善が確認できた:
  - **ビルド時間**: 7.59s → 3.34s (約 2.27× 高速)
  - **`dist/index.js`**: 214.94 kB → 185.59 kB (-13.7%, gzip 42.98 → 40.18 kB)
  - **`dist/index.css`**: 209.58 kB → 206.14 kB (-1.6%, Lightning CSS による minify)

  公開 API の変更なし、後方互換 100%。`dist/index.js` / `dist/index.css` / `dist/index.d.ts` のファイル構成は従来通り。

  合わせて `vitest`: ^3.2.4 → ^4.0.0、`@vitest/coverage-v8`: ^3.2.4 → ^4.0.0 にも追従。`vite.config.ts` の `rollupOptions` を `rolldownOptions` にリネーム（Vite 8 の compat layer により両表記とも受理されるが、可読性のため）。`apps/docs` (VitePress 1.6.4) は VitePress 2.0 stable 待ちのため、Vite 7 のまま据え置き — pnpm の per-workspace 解決で Vite 7 / 8 が共存する構成。

## 0.2.0

### Minor Changes

- ceda43c: i18n 対応: テンプレート直書きの日本語を全て optional プロップ化（後方互換 100%）

  22 コンポーネントに対し、ハードコードされていた日本語のラベル・ARIA テキスト・補間文字列を上書き可能な optional プロップとして外出ししました。既存デフォルトは全て現状の日本語のままなので、利用側の挙動には変化ありません。

  新規プロップの内訳:
  - **フォーム系 11 コンポーネント**（InputText / Textarea / Select / Combobox / Checkbox / CheckboxGroup / Radio / RadioGroup / SearchBox / FileUpload / DatePicker）に `requiredLabel?: string` を追加（既定値 `'必須'`）
  - **DatePicker**: `yearLabel` / `monthLabel` / `dayLabel` / `openCalendarAriaLabel` / `prevMonthAriaLabel` / `nextMonthAriaLabel` を追加
  - **TableControl**: `prevPageLabel` / `nextPageLabel` / `formatPageSizeOption(n)` / `formatRangeLabel(start, end, total)` を追加
  - **Table**: `loadingLabel` を追加
  - **Drawer**: `defaultAriaLabel` / `navAriaLabel` を追加
  - **HeaderContainer**: `navAriaLabel` を追加
  - **MobileMenu**: `navAriaLabel` / `subLinksAriaLabel` を追加
  - **Carousel / ImageSlider**: `prevSlideAriaLabel` / `nextSlideAriaLabel` / `slidePositionAriaLabel` / `formatSlideAriaLabel(current, total)` を追加
  - **ColorPicker**: `defaultAriaLabel` / `hexInputAriaLabel` / `formatSwatchAriaLabel(color)` を追加
  - **Select**: `formatRemoveAriaLabel(label)` を追加（複数選択時のチップ削除ボタン）
  - **UtilityLink**: `newTabAriaLabel` を追加
  - **EmergencyBanner**: `newTabHintText` を追加
  - **ScrollTopButton**: `defaultLabel` を追加

  スコープ外（次回以降）:
  - `withDefaults` 内の文字列デフォルト（カテゴリB）の prop 化
  - console.warn メッセージ / DatePicker の和暦変換 / FileUpload のエラー文言
