# Gap Report: `DadsChipTag`

> Issue #18 — DADS 公式とのビジュアル差異監査。1 コンポーネント 1 ファイル。

## メタ情報

| 項目 | 値 |
| ---- | ---- |
| Vue 実装 | `packages/vue/src/components/ChipTag/DadsChipTag.vue` / `DadsChipTag.types.ts` |
| 真実の源 (一次) | `md`（公式 MD は「チップタグのガイドラインは準備中です」。CSS/React の正準実装も未提供 = 検証可能な正準値が存在しない） |
| 参照パス | `dads-document-md/dads/components/chip-tag/index.md`（準備中）/ design-tokens `design-tokens/examples/tokens.css`（トークン名検証） |
| 総合判定 | ❌ 要修正 |
| 重大度 | high |
| 検出差異数 | 8 |

## 観点別チェック

| 観点 | 公式 (正準値) | `@dads/vue` 現状 | 判定 | 備考 / 修正方針 |
| ---- | ------------- | ----------------- | ---- | ---------------- |
| タイポグラフィ (font-family / size / weight / line-height) | 公式 MD は準備中で正準値なし。姉妹部品 chip-label の example では `font-family:var(--font-family-sans)` / `font-weight:normal(400)` / 16px 固定 / `line-height:1` / `letter-spacing:0.02em` | `font-family:var(--font-family-sans)` ✅ / `font-weight:500`（非トークン直値）/ `line-height:var(--line-height-150,1.5)` / size 別 lg16・md14・sm12px / letter-spacing 欠落 (`DadsChipTag.vue:131-133,146,152,158`) | ⚠️ | font-family はトークン参照で OK。chip-label の example を準用するなら weight=400・line-height=1・letter-spacing:0.02em。`--font-size-12` は不在（最小 14）。weight 500 は `--font-weight-*`(400/700) 非トークン値 |
| カラー (背景 / 文字 / ボーダー: トークン参照) | 正準値なし。design-tokens 実在トークンは `--color-primitive-*` / `--color-neutral-*` / `--color-key-*` のみ。**semantic 系 (`--color-brand-primary` 等) は design-tokens に不在** | semantic 5 種 (`primary/success/error/warning/secondary`) を `--color-brand-primary` / `--color-info-bg` / `--color-success(-bg)` / `--color-error(-bg)` / `--color-warning(-bg)` / `--color-brand-secondary` / `--color-bg-subtle` で塗り分け (`DadsChipTag.vue:102-123,229-251`) | ❌ | **参照トークン 9 種すべて design-tokens に不在 → 直値フォールバックも無いため未描画（`var(--color-brand-primary)` は fallback 無しで invalid に）**。`--color-primitive-*` 実在トークンへ全面置換が必要 |
| 角丸 (`--border-radius-*`) | 正準値なし。chip-label example は 8px 矩形。実在トークンは `--border-radius-4/6/8/12/16/24/32/full` | `border-radius:var(--border-radius-pill,999px)` ＝ピル形 (`DadsChipTag.vue:129`) | ❌ | **`--border-radius-pill` は実在しない**（正は `--border-radius-full` or `--border-radius-8`）。fallback 999px のみ効く。chip-tag は慣習的にピル形が一般的だが、トークン名は `--border-radius-full` へ修正必須 |
| スペーシング (padding / gap / margin: `--spacing-*`) | 正準値なし。**design-tokens に `--spacing-*` トークンは 1 件も存在しない** | gap `var(--spacing-4,.25rem)`; padding lg `0 var(--spacing-12,.75rem)` / md・sm `0 var(--spacing-8,.5rem)`; close `margin-left:var(--spacing-4)` 等 (`DadsChipTag.vue:128,145,151,157,185-186`) | ❌ | **`--spacing-4/8/12` すべて不在 → 直値フォールバックのみ動作**。design-tokens に spacing 軸が無いため、`--dimension-*` 等の実在スケールが無い以上は当面 px/rem 直値か、tailwind-plugin の spacing スケールに依存する設計判断が要る |
| エレベーション / 影 (`--elevation-*`) | 該当なし（chip は影なし） | 該当なし（root に影なし）。close ボタン hover/active は `rgba(0,0,0,0.08/0.12)` 背景のみ | ✅ | root の影は無く一致。ただし close ボタンの hover/active 背景が直書き rgba（下記参照） |
| ボーダー (太さ / 色 / 有無) | 正準値なし。chip-label example は 1px solid（style により色/透明） | `border:1px solid transparent` 基本、filled/outlined で `border-color:var(base)` (`DadsChipTag.vue:130,233,239`) | ⚠️ | 1px 構造は妥当。ただし border-color が不在トークン参照（カラー欄と同根） |
| 状態 (hover / focus-visible / active / current / disabled / expanded) | 正準値なし。clickable=button 化時は button の標準状態、focus は DADS 共通 focus-ring（黒 2px outline + 黄 4px shadow） | focus-ring は共有 mixin `dads-focus-ring`（`--color-neutral-black` + `--color-primitive-yellow-300` = 実在トークン）✅ / clickable hover・active は `background:var(base); color:var(--color-text-on-primary,#fff)` / disabled は opacity .5 + pointer-events none (`DadsChipTag.vue:177-178,193-205,209-221,242-252`) | ⚠️ | focus-ring は正準トークンで OK。hover/active の `--color-text-on-primary` は不在トークン（fallback #fff のみ）。close hover/active 背景 `rgba(0,0,0,.08/.12)` は直書き。current/expanded は該当なし（chip-tag に概念なし）と明記 |
| サイズバリアント (sm/md/lg 等) | 正準値なし（公式にサイズ軸の定義は未公開）。chip-label example はサイズ軸なし（単一） | sm/md/lg 3 段（min-height 24/28/32px、font 12/14/16px、padding 切替）(`DadsChipTag.vue:143-159`)、types で `Exclude<DadsSize,'xs'>` | ⚠️ | 公式にサイズ軸が無いため独自発明の可能性大。chip-label と同様に単一サイズが公式準拠なら `size` prop は仕様外。Figma 確認後に要判断（本環境に Figma PNG なし） |
| forced-colors / ハイコントラスト | 正準値なし。WAI-ARIA 一般則: 境界を system color で可視化 | `@media (forced-colors:active)` で root と close に `border:1px solid CanvasText` (`DadsChipTag.vue:256-262`) | ✅ | 方向性妥当。close ボタンも枠線付与で可視性確保 |
| 正準CSSの流用 vs 独自実装 (ドリフト温床) | 公式は chip-tag 専用 CSS/React 未提供。共有部品としては button 相当の挙動を内包 | root を `clickable` で `<span>`↔`<button>` 切替し、reset-button + focus-ring mixin を流用。color×appearance を SCSS `@each` で生成。close は独自 button (`DadsChipTag.vue:60-91,224-253`) | ⚠️ | 共有 mixin（reset-button/focus-ring）流用は良好。ただし色軸が semantic 5 種の独自設計で、公式が（chip-label 同様）primitive 色相を採るなら API ドリフト。正準実装が出るまで暫定だが、トークン名は実在系へ要修正 |

## 検出した差異 (修正対象)

1. **[high]** カラー: 参照する semantic トークン 9 種（`--color-brand-primary` / `--color-info-bg` / `--color-success` / `--color-success-bg` / `--color-error` / `--color-error-bg` / `--color-warning` / `--color-warning-bg` / `--color-brand-secondary` / `--color-bg-subtle`）が design-tokens に**全て不在**。fallback 値も無いため `var()` が invalid となり色が当たらない。実在の `--color-primitive-*` / `--color-key-*` へ置換。
   - 該当行: `DadsChipTag.vue:102-123`（color マップ定義）, `229-251`（生成ルール）
2. **[high]** 角丸トークン: `--border-radius-pill` は実在しない。正は `--border-radius-full`（ピル維持）または `--border-radius-8`。
   - 該当行: `DadsChipTag.vue:129`
3. **[high]** スペーシング: `--spacing-4/8/12` は design-tokens に 1 件も存在せず fallback のみ動作。実在スケール（無ければ直値の明示 or tailwind spacing）へ方針確定。
   - 該当行: `DadsChipTag.vue:128,145,151,157,185-186`
4. **[medium]** `--color-text-on-primary`（clickable hover/active の文字色）が不在トークン（fallback `#fff` のみ）。実在の `--color-neutral-white` へ。
   - 該当行: `DadsChipTag.vue:245,250`
5. **[medium]** close ボタン hover/active 背景が直書き `rgba(0,0,0,0.08)` / `rgba(0,0,0,0.12)`。`--color-neutral-opacity-gray-*` 実在トークンへ。
   - 該当行: `DadsChipTag.vue:194,198`
6. **[medium]** タイポ: `font-weight:500` は非トークン直値。`--font-size-12`（sm）は不在（最小 14）。letter-spacing 欠落。
   - 該当行: `DadsChipTag.vue:132,158`
7. **[low]** サイズ軸（sm/md/lg）が公式未定義の独自発明の可能性。Figma で確認し、単一サイズが公式なら `size` prop 撤廃を検討。
   - 該当行: `DadsChipTag.vue:143-159`, `DadsChipTag.types.ts:16,29`
8. **[low]** min-height（2rem/1.75rem/1.5rem）が直書き。spacing 軸確定後にトークン化。
   - 該当行: `DadsChipTag.vue:144,150,156`

## ハードコード / 誤トークンの洗い出し

- 誤トークン（design-tokens 不在 = fallback のみ / fallback 無しは未描画）:
  - `--border-radius-pill` (`:129`)：**`pill` は存在しない**（正 `--border-radius-full`）
  - `--color-brand-primary` (`:104`)、`--color-info-bg` (`:105`)、`--color-success`/`--color-success-bg` (`:108-109`)、`--color-error`/`--color-error-bg` (`:112-113`)、`--color-warning`/`--color-warning-bg` (`:116-117`)、`--color-brand-secondary` (`:120`)、`--color-bg-subtle` (`:121`)：全て不在
  - `--color-text-on-primary` (`:245,250`)：不在（正 `--color-neutral-white`）
  - `--spacing-4` (`:128,185,186`)、`--spacing-8` (`:151,157`)、`--spacing-12` (`:145`)：spacing 系 0 件
  - `--font-size-12,0.75rem` (`:158`)：**`--font-size-12` は不在**（最小 14）
- 直書き（var なし）:
  - `font-weight:500` (`:132`)、`min-height:2rem/1.75rem/1.5rem` (`:144,150,156`)、`border:1px solid transparent` (`:130`)、close `width/height:1.25em`・`font-size:1.1em`・`line-height:1` (`:166-167,183-184,189-190`)、close hover/active `rgba(0,0,0,.08/.12)` (`:194,198`)
- 正準トークンで OK な箇所（参考）: focus-ring の `--color-neutral-black` / `--color-primitive-yellow-300`（共有 mixin 経由、実在）

## 結論

- **修正要否: 要修正 (high)。** 公式 MD は「準備中」で chip-tag の正準値は未確定だが、**参照トークンの大半（semantic 色 9 種・`--border-radius-pill`・`--spacing-*`・`--font-size-12`・`--color-text-on-primary`）が design-tokens に実在せず、色は fallback 無しで未描画になる**点が確定的な不具合。実在トークン（`--color-primitive-*` / `--border-radius-full` / `--color-neutral-white` 等）への置換が最優先。
- **優先度: 高（描画不具合）。** 色が当たらない可能性が高く、視覚的に破綻し得る。
- **想定 changeset: minor（トークン置換のみ）／ major（公式準拠で color 軸を primitive 色相へ再設計し size 撤廃する場合）。** sibling の ChipLabel と同じ判断軸。
- **API/aria 不変: トークン置換のみなら保てる（patch〜minor）。** 公式準拠化（color 値集合の変更・size 撤廃）を選ぶ場合は props 破壊的変更が不可避。aria（clickable→button・close の aria-label・aria-disabled）の設計は妥当で維持可能。
