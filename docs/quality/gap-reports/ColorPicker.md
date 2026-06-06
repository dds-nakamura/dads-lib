# Gap Report: `DadsColorPicker`

> Issue #18 — DADS 公式とのビジュアル差異監査。1 コンポーネント 1 ファイル。

## メタ情報

| 項目 | 値 |
| ---- | ---- |
| Vue 実装 | `packages/vue/src/components/ColorPicker/DadsColorPicker.vue` / `DadsColorPicker.types.ts` |
| 真実の源 (一次) | `wai-aria`（DADS 公式にカラーピッカーの MD/example/Figma いずれも存在しない。Vuetify `<v-color-picker>` の置換として独自実装された非公式部品） |
| 参照パス | WAI-ARIA Authoring Practices（grouped buttons / toggle button パターン）/ design-tokens `design-tokens/examples/tokens.css`（トークン名検証） |
| 総合判定 | ❌ 要修正 |
| 重大度 | medium |
| 検出差異数 | 6 |

## 観点別チェック

| 観点 | 公式 (正準値) | `@dads/vue` 現状 | 判定 | 備考 / 修正方針 |
| ---- | ------------- | ----------------- | ---- | ---------------- |
| タイポグラフィ (font-family / size / weight / line-height) | DADS にカラーピッカー定義なし。フォームファミリ準拠なら `--font-family-sans` / hex 入力は等幅 | root `font-family:var(--font-family-sans)` ✅ / hex 入力 `font-family:var(--font-family-mono)` ✅ / `font-size:var(--font-size-16,1rem)` ✅ / line-height 指定なし (`DadsColorPicker.vue:115,175-177`) | ✅ | font-family / mono / font-size はすべて**実在トークン**を参照。良好。line-height は input なので問題なし |
| カラー (背景 / 文字 / ボーダー: トークン参照) | DADS 定義なし。実在トークンは `--color-primitive-*` / `--color-neutral-*` のみ。semantic 系は不在 | `color:var(--color-text-primary,#1a1a1a)` / border `var(--color-border-default,rgba(0,0,0,.2))` / hex bg `var(--color-bg-surface,#fff)` / aria-pressed リング `var(--color-bg-surface)` + `var(--color-text-primary)` (`DadsColorPicker.vue:116,134,172-174,197,208-209`) | ❌ | **`--color-text-primary` / `--color-border-default` / `--color-bg-surface` はいずれも design-tokens に不在 → 直値フォールバックのみ動作**。実在の `--color-neutral-solid-gray-*` / `--color-neutral-white` 系へ置換 |
| 角丸 (`--border-radius-*`) | DADS 定義なし。フォーム部品は `--border-radius-8`（input 系）が一般的 | swatch-label / hex-input / swatch すべて `var(--border-radius-4,0.25rem)` (`DadsColorPicker.vue:133,177,196`) | ⚠️ | `--border-radius-4` は**実在トークン**で OK。ただし DADS の input 系は概ね 8px（`--border-radius-8`）。フォーム部品と統一するなら 8px が望ましい（TextField 等と要整合） |
| スペーシング (padding / gap / margin: `--spacing-*`) | DADS 定義なし。**design-tokens に `--spacing-*` は 1 件も存在しない** | root gap `var(--spacing-12,.75rem)` / main gap `var(--spacing-12)` / hex padding `0 var(--spacing-12)` / swatches gap `var(--spacing-8,.5rem)` (`DadsColorPicker.vue:114,122,171,184`) | ❌ | **`--spacing-8/12` は不在 → fallback のみ**。実在スケール or 直値明示へ方針確定（リポジトリ横断課題） |
| エレベーション / 影 (`--elevation-*`) | DADS 定義なし。実在は `--elevation-1`〜`8` | aria-pressed 選択時に `box-shadow: inset 0 0 0 2px var(--color-bg-surface), inset 0 0 0 4px var(--color-text-primary)`（インナーリング、影目的ではない）(`DadsColorPicker.vue:207-210`) | ⚠️ | box-shadow は選択強調のインナーリングで elevation とは別用途。ただし参照トークン 2 種が不在（カラー欄と同根） |
| ボーダー (太さ / 色 / 有無) | DADS 定義なし。input 系は 1px solid + フォーカス時強調 | swatch-label / hex-input / swatch すべて `1px solid var(--color-border-default,rgba(0,0,0,.2))` (`DadsColorPicker.vue:134,172,197`) | ⚠️ | 1px 構造は妥当。color が不在トークン（`--color-border-default`）。実在 border 系トークンへ |
| 状態 (hover / focus-visible / active / current / disabled / expanded) | WAI-ARIA: toggle button は `aria-pressed`、focus は可視化必須 | focus は共有 mixin（label は `dads-focus-ring-within`、hex/swatch は `dads-focus-ring` = `--color-neutral-black`+`--color-primitive-yellow-300` 実在）✅ / swatch hover `transform:scale(1.05)` / 選択は `aria-pressed='true'` + インナーリング / disabled は opacity .5 + pointer-events none (`DadsColorPicker.vue:137,155-157,167,192,200-210,214-217`) | ✅ | focus-ring は正準トークン。`aria-pressed` で選択状態を正しく表現（WAI-ARIA 準拠）。native color input の二重 focus 抑制も適切。current=aria-pressed で代替、expanded は該当なし |
| サイズバリアント (sm/md/lg 等) | DADS 定義なし | サイズ軸なし（swatch-label/hex 固定 2.5rem、swatch grid 6 列固定） (`DadsColorPicker.vue:130-131,183`) | ⚠️ | 該当なし（size prop 未提供）。固定 2.5rem(40px) は DADS フォーム md 相当で妥当。直値だが許容 |
| forced-colors / ハイコントラスト | WAI-ARIA: 境界を system color で可視化 | `@media (forced-colors:active)` で swatch / swatch-label / hex-input に `border:1px solid CanvasText` (`DadsColorPicker.vue:220-225`) | ⚠️ | 境界の可視化は良好。ただし **swatch の `background-color`（色見本）は forced-colors で system color に潰れるため、選択中の色や各 swatch の色が判別不能になる**。色見本のラベル/パターン補助が望ましい |
| 正準CSSの流用 vs 独自実装 (ドリフト温床) | DADS にカラーピッカー部品が無く、共有部品も無い | 完全独自実装。native `<input type=color>` を opacity:0 で隠し preview tile で focus を持つ／swatch grid を独自構築。reset-input/reset-button + focus-ring mixin は流用 (`DadsColorPicker.vue:140-211`) | ✅ | **公式に対応部品が無い**ため独自実装は不可避でドリフト元の概念がそもそも無い。共有 mixin の流用は適切。native input 活用で OS ピッカーを得る設計判断も妥当 |

## 検出した差異 (修正対象)

1. **[medium]** カラー: `--color-text-primary` / `--color-border-default` / `--color-bg-surface` の 3 種が design-tokens に不在。fallback で見た目は出るが正準トークン参照になっていない。`--color-neutral-solid-gray-*` / `--color-neutral-white` 等 実在トークンへ置換。
   - 該当行: `DadsColorPicker.vue:116,134,172,174,197,208-209`
2. **[medium]** スペーシング: `--spacing-8/12` が不在（fallback のみ）。実在スケールへ方針確定。
   - 該当行: `DadsColorPicker.vue:114,122,171,184`
3. **[low]** 角丸: `--border-radius-4`（実在）だが、DADS フォーム入力部品は通常 `--border-radius-8`。TextField 等と整合させるなら 8px へ。
   - 該当行: `DadsColorPicker.vue:133,177,196`
4. **[low]** forced-colors で swatch の `background-color`（色見本）が system color に潰れ判別不能。色名ラベルやパターンの補助を検討。
   - 該当行: `DadsColorPicker.vue:96-99,220-225`
5. **[low]** swatch-label / hex-input の固定寸法 `2.5rem` が直書き。フォーム md トークン（高さ）と整合するトークン化を検討。
   - 該当行: `DadsColorPicker.vue:130-131,170`
6. **[low]** swatch grid が 6 列固定（`repeat(6,1fr)`）。swatch 数が 6 の倍数でない場合の最終行が崩れる。`auto-fill`/`minmax` 検討（視覚仕様の範囲）。
   - 該当行: `DadsColorPicker.vue:183`

## ハードコード / 誤トークンの洗い出し

- 誤トークン（design-tokens 不在 = fallback のみ動作）:
  - `--color-text-primary,#1a1a1a` (`:116,209`)、`--color-border-default,rgba(0,0,0,.2)` (`:134,172,197`)、`--color-bg-surface,#fff` (`:174,208`)：全て不在（正は `--color-neutral-*` 系）
  - `--spacing-12,.75rem` (`:114,122,171`)、`--spacing-8,.5rem` (`:184`)：spacing 系 0 件
- 正準トークンで OK な箇所（参考・置換不要）:
  - `--font-family-sans` (`:115`)、`--font-family-mono` (`:175`)、`--font-size-16` (`:176`)、`--border-radius-4` (`:133,177,196`)、focus-ring の `--color-neutral-black`/`--color-primitive-yellow-300`（mixin 経由）：すべて**実在**
- 直書き（var なし）:
  - `width/height:2.5rem`・`min-height:2.5rem` (`:130-131,170`)、`grid-template-columns:repeat(6,1fr)` (`:183`)、`aspect-ratio:1/1` (`:195`)、`transform:scale(1.05)` (`:201`)、`opacity:0.5` (`:215`)、インナーリング `0 0 0 2px/4px`（リング太さ、許容）(`:208-209`)

## 結論

- **修正要否: 要修正 (medium)。** DADS 公式にカラーピッカー部品が存在しないため**ビジュアル正準値との突合は不可**で、独自実装自体は妥当。確定的な指摘は**不在トークン（semantic 色 3 種・`--spacing-*`）の参照**で、これは fallback により描画は成立するが正準トークン規約から外れている。
- **優先度: 中。** 描画は fallback で成立しており破綻はしないが、トークン規約違反としてリポジトリ横断の semantic/spacing トークン課題に含めて是正すべき。
- **想定 changeset: patch（トークン名の実在系への置換のみ、見た目ほぼ不変）。** 角丸 8px 化・grid 改善も patch〜minor。
- **API/aria 不変: 保てる（patch）。** `aria-pressed` ベースの選択表現・native input 活用・focus-ring・disabled 設計はいずれも妥当で API/aria の変更不要。トークン名置換に閉じる。
