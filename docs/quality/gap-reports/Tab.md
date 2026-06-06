# Gap Report: `DadsTab`

> Issue #18 — DADS 公式とのビジュアル差異監査。1 コンポーネント 1 ファイル。

## メタ情報

| 項目 | 値 |
| ---- | ---- |
| Vue 実装 | `packages/vue/src/components/Tab/DadsTab.vue` |
| 真実の源 (一次) | `md` (公式ガイドライン「準備中」) + WAI-ARIA Authoring Practices (Tabs Pattern) |
| 参照パス | `dads-document-md/dads/components/tab/index.md` (＝「タブのガイドラインは準備中です」のみ) / Figma PNG は本環境に不在 |
| 総合判定 | ⚠️ 軽微差異 |
| 重大度 | medium |
| 検出差異数 | 5 |

公式 MD は「準備中」で**寸法・色の正準値が無い**。正準 example も無いため、視覚値の絶対正解は確定不能。本監査は (1) 参照トークンの実在性、(2) WAI-ARIA tabs パターン準拠の 2 点を主眼に評価する。色/寸法の「公式値」列は **design-tokens に実在するトークンの有無** を基準とした。

## 観点別チェック

| 観点 | 公式 (正準値) | `@dads/vue` 現状 | 判定 | 備考 / 修正方針 |
| ---- | ------------- | ----------------- | ---- | ---------------- |
| タイポグラフィ (font-family / size / weight / line-height) | 正準値は MD に無し。トークンは `--font-family-sans` / `--font-size-16` / `--line-height-150` が実在 | `font-family: var(--font-family-sans)`, `font-size: var(--font-size-16)`, `font-weight:500`(直値), `line-height: var(--line-height-150)` | ⚠️ | font-weight だけ生数値 500。トークン体系に weight トークンは無いため直値は許容範囲だが、公式タブの実 weight は未確認(Figma 不在のため断定不可) |
| カラー (背景 / 文字 / ボーダー: トークン参照) | 実在トークン: `--color-neutral-solid-gray-*` / `--color-primitive-blue-*`。アクティブ色の正準値は MD に無し | アクティブ `--color-brand-primary,#0017c1`、文字 `--color-text-primary/secondary`、hover `--color-bg-subtle`、border `--color-border-divider`、disabled `--color-text-disabled`。**これら 5 種すべて tokens.css に未定義**→直値描画 | ❌ | 参照トークンが全滅(フォールバック描画)。`--color-brand-primary`(#0017c1) は `--color-primitive-blue-*` 系の実在トークンへ、divider/subtle/text-* も実在 solid-gray 系へ要置換 |
| 角丸 (`--border-radius-*`) | 実在: `--border-radius-4`(0.25rem) | タブ上端 `--border-radius-4 --border-radius-4 0 0`(実在トークン使用) | ✅ | 実在トークン使用。値の妥当性は Figma 不在で未確認だが破綻なし |
| スペーシング (padding / gap / margin: `--spacing-*`) | **`--spacing-*` トークンは公式 design-tokens に存在しない**。タブ寸法の正準値も MD に無し | padding `0 var(--spacing-16)`, gap `var(--spacing-8)`, list gap `var(--spacing-4)`, panel `var(--spacing-16) 0`。min-height `2.75rem`(44px)直値 | ⚠️ | `--spacing-*` 不在のため全フォールバック直値描画。タッチターゲット 44px は WAI/アクセシビリティ的に妥当。値正解は Figma 不在で未確認 |
| エレベーション / 影 (`--elevation-*`) | タブに影なし(一般的) | 影なし | ✅ | 該当なし(一致見込み) |
| ボーダー (太さ / 色 / 有無) | 正準値 MD に無し | list 下端 `1px solid var(--color-border-divider)`、active インジケータ `::after` 2px。vertical は右 1px | ⚠️ | 構造は WAI 的に妥当。color トークンが未定義(上記カラー参照)。2px インジケータ太さは Figma 不在で未確認 |
| 状態 (hover / focus-visible / active / current / disabled / expanded) | WAI-ARIA tabs: 選択タブ `aria-selected="true"` + `tabindex=0`、非選択 `tabindex=-1`、矢印キーで roving。focus ring は DADS 共通(黒 outline + yellow) | hover(bg+文字色), active(brand 色 + ::after インジケータ), disabled(opacity .5 + not-allowed), focus は `@include dads-focus-ring`。`aria-selected`/roving tabindex/矢印キー(Home/End/方向)実装済み | ✅ | WAI-ARIA tabs パターン準拠が良好(roving tabindex・自動選択・Home/End)。focus ring も共有 mixin 経由で DADS 規格(黒2px+黄4px)。色トークン未定義のみが課題 |
| サイズバリアント (sm/md/lg 等) | MD にサイズ規定なし。公式タブは単一サイズが通例 | サイズ prop 無し。horizontal min-height 44px / vertical 40px の 2 値のみ | ✅ | サイズバリアント非提供は妥当(公式に規定無し)。orientation(水平/垂直)は Figma の Left/Right tabs 想定で合理的 |
| forced-colors / ハイコントラスト | system color 準拠が必要 | `@include dads-forced-colors` で list border→CanvasText、active::after→CanvasText | ✅ | 良好。CanvasText 利用で適切 |
| 正準CSSの流用 vs 独自実装 (ドリフト温床) | 公式 example が無いため流用元なし。WAI-ARIA tabs を独自実装するのが正当 | 完全独自実装(button[role=tab] + tabpanel)。共有 mixin(`dads-reset-button` `dads-focus-ring` `dads-forced-colors`)は流用 | ⚠️ | example 不在のため独自実装は不可避で許容。ただし**色トークンが独自命名(未定義)**な点はドリフト温床。公式実在トークンへ寄せれば将来の Figma 確定時に追従しやすい |

## 検出した差異 (修正対象)

1. **[high]** カラー(トークン): `--color-brand-primary` `--color-text-primary` `--color-text-secondary` `--color-bg-subtle` `--color-border-divider` `--color-text-disabled` はいずれも tokens.css 未定義 → 全フォールバック直値で描画。公式実在トークン(`--color-primitive-blue-*` / `--color-neutral-solid-gray-*`)へ置換。
   - 該当行: `DadsTab.vue:151`, `DadsTab.vue:164`, `DadsTab.vue:190`, `DadsTab.vue:210-211`, `DadsTab.vue:216,219`, `DadsTab.vue:226`
2. **[medium]** スペーシング: `--spacing-4/8/16` は公式 design-tokens に不在。常にフォールバック直値で描画。トークン整備か直値方針の明確化が必要。
   - 該当行: `DadsTab.vue:156,163,184,201-202,242-243,270`
3. **[low]** font-weight: アクティブ/通常タブの weight が生数値 `500`。weight トークン不在のため許容だが、公式実 weight は Figma 不在で未確認(リスクとして記録)。
   - 該当行: `DadsTab.vue:188`
4. **[low]** active インジケータ太さ `2px`・min-height `44px/40px` 等の実寸が直値かつ Figma 未確認。視覚正準との一致は未検証。
   - 該当行: `DadsTab.vue:185,204,235,244`
5. **[low]** disabled が `opacity:0.5` + `--color-text-disabled`(未定義) の二重表現。公式トークン確定後に opacity か color のどちらか一方へ整理推奨。
   - 該当行: `DadsTab.vue:226-229`

## ハードコード / 誤トークンの洗い出し

- `DadsTab.vue:152,211,216,219,277-291` `--color-brand-primary,#0017c1` / `--color-text-primary,#1a1a1a` — 誤トークン(未定義)。`--color-primitive-blue-*` / `--color-neutral-solid-gray-*` へ。
- `DadsTab.vue:164,171` `--color-border-divider,#d6d6d6` — 誤トークン。`--color-neutral-solid-gray-*` へ。
- `DadsTab.vue:190` `--color-text-secondary,#4d4d4d` / `:210` `--color-bg-subtle,#f0f0f0` — 誤トークン。
- `DadsTab.vue:226` `--color-text-disabled,#999` — 誤トークン。
- `DadsTab.vue:156,163,184,201,202,242,243,270,274` `--spacing-*` — 公式トークン不在(フォールバック直値描画)。
- `DadsTab.vue:188` `font-weight: 500` — 生数値(weight トークン不在のため許容)。
- `DadsTab.vue:185` `min-height: 2.75rem` / `:235` `2.5rem` / `:204` `height: 2px` / `:253-254` icon `1.25rem` — 直値寸法(トークン化対象だが spacing トークン不在)。
- 注: `--font-family-sans` / `--font-size-16` / `--line-height-150` / `--border-radius-4` / `--color-neutral-black`(focus-ring 内) / `--color-primitive-yellow-300`(focus-ring 内) は実在トークン(問題なし)。

## 結論

- **修正要否: 要対応(優先度 中)**。WAI-ARIA tabs パターン準拠・キーボード操作・forced-colors は良好で、aria/挙動面の品質は高い。一方で**色・スペーシングの参照トークンがほぼ全て未定義**(フォールバック直値描画)であり、トークン連動性が断たれている。
- 公式 example/Figma が本環境に無いため**視覚値の絶対正解は確定不能**。確実に直せるのは「未定義トークン→公式実在トークンへの置換」。寸法(44px / 2px インジケータ等)の正準一致は Figma 入手後に再監査が必要。
- 想定 changeset レベル: トークン置換のみなら **patch**(視覚は概ね不変・aria/API 不変)。spacing トークン体系を導入する場合は影響範囲に応じ **minor**。
- API/aria 不変: 置換のみなら props/emits/aria すべて不変で実施可能。
