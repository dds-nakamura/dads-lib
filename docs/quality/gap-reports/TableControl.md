# Gap Report: `DadsTableControl`

> Issue #18 — DADS 公式とのビジュアル差異監査。1 コンポーネント 1 ファイル。

## メタ情報

| 項目 | 値 |
| ---- | ---- |
| Vue 実装 | `packages/vue/src/components/TableControl/DadsTableControl.vue` |
| 真実の源 (一次) | `md` (公式ガイドライン「準備中」) + WAI-ARIA (search / navigation / select) |
| 参照パス | `dads-document-md/dads/components/table-control/index.md` (＝「テーブルコントロールのガイドラインは準備中です」のみ) / 正準 example 無し / Figma PNG 本環境不在 |
| 総合判定 | ⚠️ 軽微差異 |
| 重大度 | medium |
| 検出差異数 | 6 |

公式 MD は「準備中」で正準寸法・色が無い。正準 example も無く Figma PNG も本環境に不在のため、視覚値の絶対正解は確定不能。本監査は (1) 参照トークン実在性、(2) 関連コンポーネント(Table / search-box / select / button)の正準トークン体系との整合、(3) aria 構造を主眼に評価する。

## 観点別チェック

| 観点 | 公式 (正準値) | `@dads/vue` 現状 | 判定 | 備考 / 修正方針 |
| ---- | ------------- | ----------------- | ---- | ---------------- |
| タイポグラフィ (font-family / size / weight / line-height) | 正準値 MD に無し。実在トークン `--font-family-sans` / `--font-size-14` / `--line-height-150` | `font-family: var(--font-family-sans)`, `font-size: var(--font-size-14)`, `line-height: var(--line-height-150)`, label `font-weight:500`(直値), preset `--font-size-12` | ✅ | 実在トークン使用。weight 直値のみ留意(weight トークン不在で許容) |
| カラー (背景 / 文字 / ボーダー: トークン参照) | 実在: `--color-neutral-solid-gray-*` / `--color-primitive-blue-*` / `--color-neutral-white` | text `--color-text-primary/secondary/disabled`, surface `--color-bg-surface`, border `--color-border-default`, hover `--color-bg-hover`, preset active `--color-info-bg`/`--color-brand-primary`。**いずれも tokens.css 未定義**→直値描画 | ❌ | 参照トークンが全滅。`--color-bg-surface`→`--color-neutral-white`、border→`--color-neutral-solid-gray-*`、active→`--color-primitive-blue-*` 等の実在トークンへ要置換 |
| 角丸 (`--border-radius-*`) | 実在: `--border-radius-4`、`--border-radius-full` | search/select/button `--border-radius-4`(実在 ✅)。preset chip `--border-radius-pill,999px`(**`--border-radius-pill` は未定義**、実在は `--border-radius-full`)。reset `border-radius:50%`(直値) | ⚠️ | `--border-radius-pill` は誤トークン → `--border-radius-full` へ。50% 直値は円形ボタンで許容 |
| スペーシング (padding / gap / margin: `--spacing-*`) | **`--spacing-*` トークンは公式に存在しない** | gap/padding 全面 `var(--spacing-4/8/12/16/24)`。input min-height `calc(2.5rem - 2px)`、button `2rem`、reset/preset `1.75rem` 直値 | ⚠️ | `--spacing-*` 全フォールバック直値描画。寸法の正準一致は Figma 不在で未確認。値破綻は無し |
| エレベーション / 影 (`--elevation-*`) | コントロール群に影なし(通例) | 影なし(focus-ring の box-shadow のみ) | ✅ | 該当なし(一致見込み) |
| ボーダー (太さ / 色 / 有無) | 正準値 MD に無し。実在ボーダー色 `--color-neutral-solid-gray-*` | search/select/button/preset 一律 `1px solid var(--color-border-default,…)`(未定義トークン)。preset active 時 brand 色ボーダー | ⚠️ | 太さ 1px は妥当。color トークンが未定義(置換要)。preset active のボーダー色 `--color-brand-primary` も未定義 |
| 状態 (hover / focus-visible / active / current / disabled / expanded) | WAI: 各 button/input/select に DADS 共通 focus ring(黒 outline + yellow)、disabled、preset は `aria-pressed`、pagination は `disabled` | search-control `focus-within` ring、button/preset/reset/select `dads-focus-ring`、button disabled(opacity.5+not-allowed)、preset `aria-pressed='true'` で active 配色、prev/next 端で disabled | ✅ | 状態網羅は良好。focus は共有 mixin(黒2px+黄4px shadow)で DADS 規格。aria-pressed/disabled 適切。active 配色のトークンのみ未定義 |
| サイズバリアント (sm/md/lg 等) | MD に規定なし。単一サイズが通例 | サイズ prop 無し(input/select 40px、button 32px、preset 28px の固定段) | ✅ | バリアント非提供は妥当 |
| forced-colors / ハイコントラスト | system color 準拠が必要 | `@include dads-forced-colors` で search-control/select/button border→CanvasText | ⚠️ | 主要枠は対応。ただし preset chip / reset / status は forced-colors 指定が無く、ハイコントラスト時に境界が消える可能性 |
| 正準CSSの流用 vs 独自実装 (ドリフト温床) | 公式 example 無し。本来は search-box / select / button / pagination の**正準部品を組み合わせる**のが理想 | すべて独自 CSS で再実装。共有 mixin(reset-button/reset-input/focus-ring/forced-colors)は流用するが、search-box・select・button・chip の**公式正準スタイルは流用していない** | ❌ | **ドリフト温床**。検索ボックスは `search-box`、セレクトは `select`、ボタンは `button`、preset は `chip` 系の正準実装を内包/再現すべきところを独自実装。トークンも独自命名で、正準部品から乖離(LanguageSelector と同型のリスク) |

## 検出した差異 (修正対象)

1. **[high]** カラー(トークン): `--color-text-primary/secondary/disabled` `--color-bg-surface` `--color-border-default` `--color-bg-hover` `--color-info-bg` `--color-brand-primary` がすべて tokens.css 未定義 → 全フォールバック直値描画。公式実在トークン(`--color-neutral-white` / `--color-neutral-solid-gray-*` / `--color-primitive-blue-*`)へ置換。
   - 該当行: `DadsTableControl.vue:205`, `:227`, `:233-234`, `:272,278`, `:298,301`, `:314-316`, `:329`, `:371-372`, `:379`, `:392`
2. **[high]** 構造/流用: search/select/button/preset を公式正準部品(search-box / select / button / chip)で構成せず全面独自 CSS。正準スタイルとのドリフト温床。
   - 該当行: `DadsTableControl.vue:230-318` (独自 search-control), `:326-338` (独自 select), `:360-387` (独自 button)
3. **[medium]** 角丸: `--border-radius-pill`(未定義) を preset chip に使用。実在する `--border-radius-full` へ置換。
   - 該当行: `DadsTableControl.vue:299`
4. **[medium]** スペーシング: `--spacing-4/8/12/16/24` は公式 design-tokens に不在 → 全フォールバック直値描画。トークン整備か直値方針明確化が必要。
   - 該当行: `DadsTableControl.vue:203,214,221,241,251,269,287,297,335,346,357,366,368`
5. **[medium]** forced-colors 不足: preset chip / reset ボタン / status / page-indicator が forced-colors 未対応。ハイコントラスト時に境界・状態が判別不能になり得る。
   - 該当行: `DadsTableControl.vue:397-403` (対象が search-control/select/button のみ)
6. **[low]** search-input の `outline: none !important`(focus-visible)で input 単体のフォーカス輪郭を消し、wrapper の `focus-within` ring に委譲。意図的だが forced-colors 時に input のフォーカス可視性が低下する懸念。
   - 該当行: `DadsTableControl.vue:254-256`

## ハードコード / 誤トークンの洗い出し

- `DadsTableControl.vue:205,272,277,301,316,372,392` `--color-text-primary,#1a1a1a` / `--color-brand-primary,#0017c1` — 誤トークン(未定義)。実在トークンへ。
- `DadsTableControl.vue:227,242,272,350` `--color-text-secondary,#4d4d4d` — 誤トークン。
- `DadsTableControl.vue:233,301,328,371` `--color-bg-surface,#fff` — 誤トークン。`--color-neutral-white` へ。
- `DadsTableControl.vue:234,298,329,370` `--color-border-default, rgba(0,0,0,0.1〜0.12)` — 誤トークン + 半透明黒。`--color-neutral-solid-gray-*` へ。
- `DadsTableControl.vue:278,310,379` `--color-bg-hover, rgba(0,0,0,0.04)` — 誤トークン。
- `DadsTableControl.vue:314` `--color-info-bg, rgba(0,23,193,0.08)` — 誤トークン(直値も独自)。`--color-primitive-blue-50/100` へ。
- `DadsTableControl.vue:299` `--border-radius-pill, 999px` — 誤トークン。実在は `--border-radius-full`。
- `DadsTableControl.vue:203,214,221,241,251,269,287,297,335,346,357,366,368` `--spacing-*` — 公式トークン不在(フォールバック直値描画)。
- `DadsTableControl.vue:226` `font-weight: 500` — 生数値(weight トークン不在で許容)。
- `DadsTableControl.vue:243,273` `font-size: 1.25em` / `1.1rem`、`:267-268,296,334,350,367` `width/height/min-height` 直値 — 寸法直書き(spacing トークン不在)。
- `DadsTableControl.vue:270` `border-radius: 50%` — 円形 reset ボタンで許容。
- 注: `--font-family-sans` / `--font-size-12/14` / `--line-height-150` / `--border-radius-4` / `--color-neutral-black`(focus-ring) / `--color-primitive-yellow-300`(focus-ring) は実在トークン(問題なし)。

## 結論

- **修正要否: 要対応(優先度 中)**。aria 構造(role=group / search / navigation / aria-pressed / aria-live)・状態網羅・focus ring は良好。一方で**色の参照トークンがほぼ全て未定義**(フォールバック直値描画)で、`--border-radius-pill` は誤トークン、preset の active 配色も独自直値。
- 公式 MD「準備中」+ example/Figma 不在のため**視覚値の絶対正解は確定不能**。確実に直せるのは「未定義/誤トークン→公式実在トークンへの置換」と forced-colors 補完。寸法の正準一致は Figma 入手後の再監査が必要。
- 想定 changeset レベル: トークン置換 + `--border-radius-pill`→`--border-radius-full` + forced-colors 補完なら **patch**(視覚ほぼ不変・aria/API 不変)。正準部品(search-box/select/button/chip)への作り替えを行うなら **minor〜major**。
- API/aria 不変: 置換・forced-colors 補完のみなら props/emits/aria すべて不変で実施可能。
