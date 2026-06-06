# Gap Report: `DadsCombobox`

> Issue #18 — DADS 公式とのビジュアル差異監査。1 コンポーネント 1 ファイル。

## メタ情報

| 項目 | 値 |
| ---- | ---- |
| Vue 実装 | `packages/vue/src/components/Combobox/DadsCombobox.vue` / `DadsCombobox.types.ts` |
| 真実の源 (一次) | `md`（公式 MD は v2.13.0 で「コンボボックスのガイドラインは準備中です」。HTML/React 実装は「提供予定」で未提供 = ビジュアル正準値は未確定。挙動は WAI-ARIA combobox パターンで補完） |
| 参照パス | `dads-document-md/dads/components/combobox/index.md`（準備中）/ WAI-ARIA Authoring Practices (combobox, listbox) / design-tokens `design-tokens/examples/tokens.css` |
| 総合判定 | ❌ 要修正 |
| 重大度 | high |
| 検出差異数 | 8 |

## 観点別チェック

| 観点 | 公式 (正準値) | `@dads/vue` 現状 | 判定 | 備考 / 修正方針 |
| ---- | ------------- | ----------------- | ---- | ---------------- |
| タイポグラフィ (font-family / size / weight / line-height) | 公式 MD 準備中。フォームファミリ（TextField/Select）準拠が前提 | root `font-family:var(--font-family-sans)` ✅ / label `font-size:var(--font-size-16)` weight 500 / size 別 lg18・md16・sm14 (`--font-size-*` 実在) / line-height `var(--line-height-150)` 実在 (`DadsCombobox.vue:422,431-433,548,553,559,514`) | ⚠️ | font-size/line-height/font-family は**実在トークン**で良好。label `font-weight:500` は非トークン直値（DADS form label は通常 700 or トークン化）。required バッジ weight 700 |
| カラー (背景 / 文字 / ボーダー: トークン参照) | 公式 MD 準備中。実在トークンは `--color-primitive-*`/`--color-neutral-*` のみ。semantic 系不在 | text `var(--color-text-primary,#1a1a1a)` / control bg `var(--color-bg-surface,#fff)` / border `var(--color-border-default,rgba(0,0,0,.1))` / required bg `var(--color-error,#ec0000)` 文字 `var(--color-text-on-primary,#fff)` / hint `var(--color-text-secondary,#4d4d4d)` / error `var(--color-error)` / 候補 active `var(--color-bg-subtle,rgba(0,0,0,.05))` (`DadsCombobox.vue:423,437-438,455-456,503-504,517,535,539,565,571,581,587`) | ❌ | **`--color-text-primary` / `--color-bg-surface` / `--color-border-default` / `--color-error` / `--color-text-on-primary` / `--color-text-secondary` / `--color-bg-subtle` の 7 種すべて design-tokens に不在 → fallback のみ動作**。実在 `--color-primitive-*` / `--color-neutral-*` 系へ全面置換 |
| 角丸 (`--border-radius-*`) | 公式 MD 準備中。DADS input 系は通常 8px | control / suggestions / required すべて `var(--border-radius-4,0.25rem)` (`DadsCombobox.vue:442,457,505`) | ⚠️ | `--border-radius-4` は**実在**で OK だが、DADS フォーム入力部品は概ね `--border-radius-8`。TextField/Select と整合させるなら 8px が望ましい |
| スペーシング (padding / gap / margin: `--spacing-*`) | 公式 MD 準備中。**design-tokens に `--spacing-*` は 1 件も存在しない** | root gap `var(--spacing-4)` / label gap `var(--spacing-8)` / control gap `var(--spacing-4)` / size 別 padding `var(--spacing-4) var(--spacing-16/12)` / suggestion padding `var(--spacing-8) var(--spacing-12)` / footer gap `var(--spacing-8)` 等 多数 (`DadsCombobox.vue:421,430,454,546,552,558,501,512,529`) | ❌ | **`--spacing-4/8/12/16` すべて不在 → fallback のみ**。実在スケール or 直値明示へ方針確定（リポジトリ横断課題） |
| エレベーション / 影 (`--elevation-*`) | WAI-ARIA: ポップアップ listbox は浮遊感を出すのが一般的。実在は `--elevation-1`〜`8` | suggestions に `box-shadow: 0 4px 12px rgba(0,0,0,0.12)` 直書き (`DadsCombobox.vue:506`) | ❌ | **影が完全に直書き rgba**。ドロップダウン listbox には `--elevation-*`（実在トークン）を使うべき。`--elevation-2`/`3` 相当へ置換 |
| ボーダー (太さ / 色 / 有無) | 公式 MD 準備中。input 系は 1px solid + 状態で色変化 | control / suggestions `1px solid var(--color-border-default)`; readonly は `dashed`; error は `border-color:var(--color-error)`; hover は `border-color:var(--color-text-primary)` (`DadsCombobox.vue:456,504,570,587,565`) | ⚠️ | 1px 構造・状態別ボーダーは妥当。ただし color が不在トークン（カラー欄と同根）。readonly の `dashed` 表現は DADS 標準か要確認（TextField の readonly 表現と整合させる） |
| 状態 (hover / focus-visible / active / current / disabled / expanded) | WAI-ARIA combobox: `aria-expanded` / `aria-activedescendant` / `aria-controls` / option の `aria-selected` 必須。focus は DADS 共通 ring | control は `dads-focus-ring-within`（実在トークン）✅ / hover で border 強調 / disabled opacity .5+pointer-events none / readonly dashed+subtle bg / error border 赤 / `aria-expanded`・`aria-activedescendant`・`aria-controls`・`aria-autocomplete=list` 完備 (`DadsCombobox.vue:362-365,463,563-566,569-573,576-588`) | ✅ | **WAI-ARIA combobox 準拠が良好**（expanded/activedescendant/controls/role=combobox/listbox/option/aria-selected）。focus-ring は正準トークン。状態網羅も十分。current は該当なし（選択は input 値/chip で表現） |
| サイズバリアント (sm/md/lg 等) | 公式 MD 準備中。TextField/Select と同じ 3 段が前提 | sm/md/lg 3 段（min-height calc(2.5/3/3.5rem - 2px)、font 14/16/18px、padding 切替） (`DadsCombobox.vue:544-560`)、types `Exclude<DadsSize,'xs'>` | ✅ | フォームファミリ（TextField/Select）と同じ 3 サイズ軸。妥当。min-height の calc(... - 2px) はボーダー込み高さ調整で適切 |
| forced-colors / ハイコントラスト | WAI-ARIA: 境界・選択を system color で | `@media (forced-colors:active)` で control/suggestions に `border:1px solid CanvasText`、active 候補に `Highlight`/`HighlightText` (`DadsCombobox.vue:591-604`) | ✅ | 境界の枠線付与＋active 候補の Highlight/HighlightText は適切。ハイコントラストで選択候補が判別可能 |
| 正準CSSの流用 vs 独自実装 (ドリフト温床) | 公式 combobox/HTML 未提供。共有部品として chip (multiple 時) を使う構造が自然 | multiple 時は **`DadsChipTag` を流用**（`size=sm`、closable）✅ / input は reset-input + focus-ring-within mixin 流用 / listbox/option は独自構築 (`DadsCombobox.vue:3,337-345,463,467`) | ⚠️ | **chip に `DadsChipTag` を流用している点は良好**（共有部品の再利用＝ドリフト抑制）。ただし `DadsChipTag` 自体が不在トークン参照（ChipTag.md 参照）のため、間接的に色不整合を継承。listbox/option は独自だが公式 menu-list-box 系の共有部品は未整備のため現状妥当 |

## 検出した差異 (修正対象)

1. **[high]** カラー: semantic トークン 7 種（`--color-text-primary` / `--color-bg-surface` / `--color-border-default` / `--color-error` / `--color-text-on-primary` / `--color-text-secondary` / `--color-bg-subtle`）が design-tokens に**全て不在**。fallback で描画は出るが正準トークン規約違反。実在 `--color-primitive-*` / `--color-neutral-*` 系へ置換。
   - 該当行: `DadsCombobox.vue:423,437-438,455-456,503-504,517,535,539,565,571,581,587`
2. **[high]** エレベーション: suggestions の影が直書き `0 4px 12px rgba(0,0,0,0.12)`。実在の `--elevation-2`/`--elevation-3` へ置換。
   - 該当行: `DadsCombobox.vue:506`
3. **[high]** スペーシング: `--spacing-4/8/12/16` が design-tokens に 1 件も存在せず fallback のみ動作。実在スケール or 直値明示へ方針確定。
   - 該当行: `DadsCombobox.vue:421,430,454,501,512,529,546,552,558`
4. **[medium]** 角丸: `--border-radius-4`（実在）だが DADS フォーム入力は通常 8px。TextField/Select と整合させ `--border-radius-8` へ。
   - 該当行: `DadsCombobox.vue:442,457,505`
5. **[medium]** `DadsChipTag` 経由で chip の色が不在トークンに依存（間接ドリフト）。ChipTag 側のトークン是正で連動解消。
   - 該当行: `DadsCombobox.vue:337-345`（依存）/ ChipTag.md 参照
6. **[low]** label/error/hint の `font-weight:500` が非トークン直値。DADS form label の weight 規約（400/700）へ整合。
   - 該当行: `DadsCombobox.vue:432,442,541`
7. **[low]** required バッジ padding `2px 8px` が直書き。spacing 軸確定後にトークン化。
   - 該当行: `DadsCombobox.vue:441`
8. **[low]** suggestions の `top:calc(100% + 4px)` / `max-height:16rem` / `z-index:10` が直書き。spacing/dimension トークン化を検討。
   - 該当行: `DadsCombobox.vue:496,507,499`

## ハードコード / 誤トークンの洗い出し

- 誤トークン（design-tokens 不在 = fallback のみ動作）:
  - `--color-text-primary,#1a1a1a` (`:423,517,565`)、`--color-bg-surface,#fff` (`:455,503`)、`--color-border-default,rgba(0,0,0,.1)` (`:456,504`)、`--color-error,#ec0000` (`:437,539,587`)、`--color-text-on-primary,#fff` (`:438`)、`--color-text-secondary,#4d4d4d` (`:535`)、`--color-bg-subtle,rgba(0,0,0,.05)` (`:517,571,581`)：全て不在
  - `--spacing-4` (`:421,454,501,546,552,558`)、`--spacing-8` (`:430,512,529`)、`--spacing-12` (`:512,552,558`)、`--spacing-16` (`:546`)：spacing 系 0 件
- 正準トークンで OK な箇所（参考・置換不要）:
  - `--font-family-sans` (`:422`)、`--font-size-14/16/18` (`:431,548,553,559`)、`--line-height-150` (`:433,514,531`)、`--border-radius-4` (`:442,457,505`)、focus-ring の `--color-neutral-black`/`--color-primitive-yellow-300`（mixin 経由）：すべて**実在**
- 直書き（var なし）:
  - suggestions `box-shadow:0 4px 12px rgba(0,0,0,0.12)` (`:506`)、`font-weight:500/700` (`:432,442,541`)、required `padding:2px 8px`・`line-height:1.2` (`:441,443`)、`min-width:6rem` (`:469`)、`top:calc(100% + 4px)`・`max-height:16rem`・`z-index:10` (`:496,507,499`)、size の `min-height:calc(3.5rem - 2px)` 等（border 調整、許容）(`:545,551,557`)

## 結論

- **修正要否: 要修正 (high)。** 公式 MD は「準備中」でビジュアル正準値は未確定だが、**(1) semantic 色 7 種が design-tokens 不在で fallback 頼み、(2) ドロップダウンの影が `--elevation-*` を使わず直書き rgba、(3) `--spacing-*` 全滅**という確定的なトークン規約違反がある。挙動・ARIA は WAI-ARIA combobox に良く準拠しており構造面は良好。
- **優先度: 高（トークン規約）／中（見た目は fallback で成立）。** 描画破綻はしないが、影の直書きと色トークン不在は是正必須。
- **想定 changeset: minor（トークン名の実在系への置換 ＋ 影の `--elevation-*` 化 ＋ 角丸 8px 化）。** 見た目はほぼ不変〜微変で API 非破壊。
- **API/aria 不変: 保てる（minor）。** props（multiple/size/filter/error 等）と ARIA（role=combobox/listbox/option、aria-expanded/activedescendant/controls）はいずれも妥当で変更不要。トークン置換・elevation 化に閉じる。`DadsChipTag` 流用の構造も維持（ChipTag 側トークン是正で連動改善）。
