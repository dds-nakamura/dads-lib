# Gap Report: `DadsLanguageSelector`

> Issue #18 — DADS 公式とのビジュアル差異監査。1 コンポーネント 1 ファイル。

## メタ情報

| 項目 | 値 |
| ---- | ---- |
| Vue 実装 | `packages/vue/src/components/LanguageSelector/DadsLanguageSelector.vue` |
| 真実の源 (一次) | `example` |
| 参照パス | `design-system-example-components-html/src/components/language-selector/{playground.html,language-selector.css}` + 合成元 `menu-list-box/menu-list-box.css` / `menu-list/menu-list.css` |
| 総合判定 | ❌ 要修正 |
| 重大度 | high |
| 検出差異数 | 11 |

## 観点別チェック

| 観点 | 公式 (正準値) | `@dads/vue` 現状 | 判定 | 備考 / 修正方針 |
| ---- | ------------- | ----------------- | ---- | ---------------- |
| タイポグラフィ (font-family / size / weight / line-height) | `font-family: var(--font-family-sans)`; opener `font-size: 16/16rem`, `line-height: 1.2`, `letter-spacing: 0.02em`; menu `font-size: 16/16rem`, `line-height: 1.3`, `letter-spacing: 0`; current item `font-weight: bold` | `font-family-sans` 可。opener `line-height: var(--line-height-150,1.5)` (公式 1.2)、`letter-spacing` 指定なし。current 項目に `font-weight: bold` なし | ❌ | line-height を opener 1.2 / menu 1.3 に、letter-spacing 0.02em を opener に付与。current 項目を bold 化 |
| カラー (背景 / 文字 / ボーダー: トークン参照) | text `--color-neutral-solid-gray-900` (opener) / `-800` (menu); hover `--color-neutral-solid-gray-50`; popup bg `--color-neutral-white`; border `--color-neutral-solid-gray-420`; current `bg --color-primitive-blue-100` + `color --color-primitive-blue-1000` | 存在しない独自トークン多数: `--color-text-primary` `--color-bg-hover` `--color-bg-surface` `--color-border-default` `--color-bg-subtle` `--color-brand-primary` `--color-info-bg` `--color-success(-bg)` — すべて design-tokens に未定義でフォールバック直値に落ちる。current は light-blue で blue-100/1000 を使うが色スキーム自体が非公式 | ❌ | 全色を実在トークン (gray-900/800/50/420, white, blue-100/1000) に置換。非公式色スキーム (light-green/light-gray) は撤去 |
| 角丸 (`--border-radius-*`) | opener `8/16rem` (=`--border-radius-8`); popup `8 0 0 8 /16rem` (左側のみ角丸); menu item box型 `border-radius: 0` | opener `var(--border-radius-4,0.25rem)` (公式 8px)。popup `--border-radius-8` 全周 (公式は左側のみ)。corner-pill/square は非公式 | ❌ | opener を border-radius-8 に。popup を `8px 0 0 8px` に。非公式 cornerShape バリアントを撤去 |
| スペーシング (padding / gap / margin: `--spacing-*`) | opener[sm] `min-height 36/16rem`, `pad 4/16rem`, `gap 4/16rem`; popup `padding 16/16rem 0`; menu item[regular] `min-height 44/16rem`, `pad-y 10/16rem`, `pad-x 16/16rem`, `gap 8/16rem` | `--spacing-*` トークンは **design-tokens に存在しない** (常にフォールバック直値)。opener pad `4/8px` (公式 sm 4px 対称)、min-height 未指定、menu item pad `8px 12px` (公式 10px 16px)、menu padding `4px 0` (公式 16px 0) | ❌ | min-height (opener 36px/menu item 44px) を付与。menu padding を 16px 0、item を 10px/16px に。`--spacing-*` 参照は実在トークンか `calc(N/16*1rem)` に置換 |
| エレベーション / 影 (`--elevation-*`) | popup `box-shadow: var(--elevation-1)` (= `0 2px 8px 1px rgba(0,0,0,.1), 0 1px 5px 0 rgba(0,0,0,.3)`) | `box-shadow: 0 4px 12px rgba(0,0,0,0.12)` 直書き (単層) | ❌ | `var(--elevation-1)` に置換 |
| ボーダー (太さ / 色 / 有無) | popup `1px solid --color-neutral-solid-gray-420` | popup `1px solid var(--color-border-default, rgba(0,0,0,0.1))` (トークン不在) | ❌ | `--color-neutral-solid-gray-420` に置換 |
| 状態 (hover / focus-visible / active / current / disabled / expanded) | hover `bg gray-50 + underline + offset 3px`; focus-visible opener `outline 4px black, offset 2px, bg yellow-300, box-shadow 0 0 0 2px yellow-300`; menu item box型 focus `outline 4px black, offset -4px, inset box-shadow 6px yellow-300`; current `[data-current]` bg blue-100/color blue-1000/bold; expanded arrow `rotate(180deg)` | hover に underline なし。focus は共有 `dads-focus-ring` (`outline 2px black, offset 0, box-shadow 4px yellow-300`) で公式 4px/offset と不一致。menu item の inset 黄リングを再現せず。current は light-blue のみ blue 系、他スキームは非公式色。arrow rotate は実装あり ✅ | ❌ | hover underline+offset 追加。focus-visible を公式値 (opener 4px/offset2、item box型 inset) に。current を `[aria-current]` ベースで bold+blue 統一 |
| サイズバリアント (sm/md/lg 等) | 公式 opener は `data-size="sm"` (36px) / `data-size="md"` (44px) の 2 段階。language-selector は sm 固定使用 | Vue は sm/md/lg の 3 段階を独自定義。lg は非公式。md/sm の min-height も非公式値 | ⚠️ | lg を撤去し sm/md の 2 段階に。各 min-height/padding を公式 data-size 値に合わせる |
| forced-colors / ハイコントラスト | 公式 CSS に明示の forced-colors ブロックは無し (システム既定に委譲) | `dads-forced-colors` で opener/popup に `1px solid CanvasText`、item hover/focus を Highlight/HighlightText 化 | ✅ | 公式超過の追加対応。害は無く維持可 |
| 正準CSSの流用 vs 独自実装 (ドリフト温床) | 公式は **共有部品を合成**: `dads-menu-list-box` (opener+popup) + `dads-menu-list` (items, `data-current`/`data-type="box"`/`data-size="regular"`)。language-selector.css は check 表示制御の 13 行のみ | 全構造を独自クラス `dads-language-selector__*` で再実装。menu-list-box/menu-list を一切流用せず → ドリフトの根源 | ❌ | **最重要**: 内部を `DadsMenuListBox` + `DadsMenuList` 合成に作り替える。独自 CSS を撤去し正準クラス/属性を再現 |

## 検出した差異 (修正対象)

1. **[high]** 正準CSSの流用: 公式は menu-list-box + menu-list を合成するが独自再実装。ドリフトの温床。修正方針: `DadsMenuListBox`/`DadsMenuList` 合成へ。
   - 該当行: `DadsLanguageSelector.vue:196-282` (template 全体), `:288-480` (style 全体)
2. **[high]** 不在トークン参照: `--color-text-primary` 等が design-tokens に存在せず常にフォールバック直値。修正方針: 実在トークンへ。
   - 該当行: `DadsLanguageSelector.vue:293`,`312`,`345`,`346`,`371`,`409`,`412`,`423`,`426`,`430`,`431`,`435`,`438`
3. **[high]** エレベーション: `0 4px 12px rgba(0,0,0,0.12)` 直書き → `var(--elevation-1)`。
   - 該当行: `DadsLanguageSelector.vue:349`
4. **[medium]** 角丸 opener: `--border-radius-4` (0.25rem) → 公式 `--border-radius-8` (0.5rem)。
   - 該当行: `DadsLanguageSelector.vue:307`,`448`
5. **[medium]** popup 角丸: 全周 8px → 公式は左側のみ `8px 0 0 8px`。
   - 該当行: `DadsLanguageSelector.vue:348`
6. **[medium]** menu item padding: `8px 12px` → 公式 `10px 16px`、menu padding `4px 0` → `16px 0`、min-height 44px 欠落。
   - 該当行: `DadsLanguageSelector.vue:354`,`363`
7. **[medium]** focus-visible: 共有 `dads-focus-ring` (2px/offset0) が公式 menu-list-box の `4px/offset2` と不一致。box型 item の inset 黄リング未再現。
   - 該当行: `DadsLanguageSelector.vue:301`,`368` (`@include ring.dads-focus-ring`)
8. **[medium]** hover: underline + `text-underline-offset 3px` 欠落 (opener/item 両方)。
   - 該当行: `DadsLanguageSelector.vue:311`,`370`
9. **[medium]** 非公式 colorScheme (light-green / light-gray) と cornerShape (pill/square) を独自追加。
   - 該当行: `DadsLanguageSelector.vue:422-444`,`451-457`
10. **[low]** current 項目に `font-weight: bold` 欠落 (公式 menu-list `[data-current]`)。
    - 該当行: `DadsLanguageSelector.vue:417-420`
11. **[low]** opener line-height `1.5` (公式 1.2)、letter-spacing 0.02em 欠落。
    - 該当行: `DadsLanguageSelector.vue:308`

## ハードコード / 誤トークンの洗い出し

- `color: var(--color-text-primary, #1a1a1a)` — トークン不在、`L293`,`L435`,`L443`
- `var(--color-bg-hover, rgba(0,0,0,0.05))` — トークン不在、`L312`
- `var(--color-bg-surface, #fff)` — トークン不在、`L345`
- `var(--color-border-default, rgba(0,0,0,0.1))` — トークン不在、`L346`
- `var(--color-bg-subtle, rgba(0,0,0,0.05))` — トークン不在、`L371`,`L438`
- `var(--color-brand-primary, #1a73e8)` — トークン不在 (非公式ブランド色)、`L409`
- `var(--color-info-bg, rgba(26,115,232,0.08))` — トークン不在、`L412`
- `var(--color-success, #1f8a3a)` / `var(--color-success-bg, ...)` — トークン不在、`L423`,`L426`,`L430`,`L431`
- `box-shadow: 0 4px 12px rgba(0,0,0,0.12)` — 完全直書き、`L349`
- `top: calc(100% + 4px)` — 4px 直書き、`L341`
- `border-radius: 9999px` (pill) — 公式は `--border-radius-full`、`L452`
- `padding: 2px var(--spacing-8,...)` — sm の 2px 直書き、`L402`
- `--spacing-*` 系すべて: design-tokens に該当トークンが存在しないため常にフォールバック直値で描画 (`L305`,`306`,`354`,`362`,`363`,`393` ほか)

## 結論

- **修正要 / 優先度 high**。LanguageSelector は LanguageSelector ドリフト事例そのもので、公式の共有部品合成 (menu-list-box + menu-list) を独自 CSS で全面再実装している。
- 想定 changeset レベル: **minor**。内部実装の作り替えと非公式バリアント (lg / light-green / light-gray / pill / square) の撤去は API 変更を伴う可能性が高い (size の lg 削除, colorScheme/cornerShape prop の整理)。スタイルのみの是正に留めれば patch だが、不在トークンと構造ドリフトの根治には公開 API の見直しが必要。
- aria 不変は概ね維持可能 (role=menu/menuitem, aria-expanded, aria-current は公式踏襲)。ただし焦点リング・current 表現を `[aria-current]`/`[data-current]` 基準へ寄せる際にセレクタ整理が要る。
