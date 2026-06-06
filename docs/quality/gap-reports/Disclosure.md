# Gap Report: `DadsDisclosure`

> Issue #18 — DADS 公式とのビジュアル差異監査。1 コンポーネント 1 ファイル。

## メタ情報

| 項目 | 値 |
| ---- | ---- |
| Vue 実装 | `packages/vue/src/components/Disclosure/DadsDisclosure.vue` |
| 真実の源 (一次) | `example` |
| 参照パス | `design-system-example-components-html/src/components/disclosure/disclosure.css` / `playground.html` |
| 総合判定 | ⚠️ 軽微差異 |
| 重大度 | medium |
| 検出差異数 | 6 |

## 観点別チェック

| 観点 | 公式 (正準値) | `@dads/vue` 現状 | 判定 | 備考 / 修正方針 |
| ---- | ------------- | ----------------- | ---- | ---------------- |
| タイポグラフィ (font-family / size / weight / line-height) | summary/title はフォント指定なし (global.css 継承)。content もフォント指定なし。`font-size`/`line-height` は明示なしで継承 | `font-family: var(--font-family-sans, …)`、`__title` `font-size: var(--font-size-16,1rem)` `line-height: var(--line-height-150,1.5)`、`__content` 同上 | ⚠️ | 公式は明示トークンを置かず継承。Vue は明示的にトークンを当てているが値は妥当 (font-size-16=1rem, line-height-150=1.5 は実在トークン)。実害は小。`--font-family-sans` は実在トークンで妥当 |
| カラー (背景 / 文字 / ボーダー: トークン参照) | アイコン `color: var(--color-primitive-blue-1000)` (実在)。本文/見出しに色指定なし (継承) | アイコン `var(--color-primitive-blue-1000, #0017c1)` ✅。本文/ルートに `color: var(--color-text-primary, #1a1a1a)` | ❌ | `--color-text-primary` は**公式 design-tokens に存在しない**トークン → 常にフォールバック `#1a1a1a` に落ちる (公式の本文色は `--color-neutral-solid-gray-800` = #1a1a1c 系)。`--color-primitive-blue-1000` フォールバック `#0017c1` も公式値 (#0017C1) と一致 ✅ |
| 角丸 (`--border-radius-*`) | summary の focus-visible に `border-radius: calc(4/16*1rem)` (=4px) | focus-ring mixin 内 (`_dads-focus-ring-style`) は outline+box-shadow のみで border-radius を付与していない | ⚠️ | 公式 focus は黄色背景+黒 outline+4px 角丸。Vue は共有 mixin で角丸を当てていない → 後述「状態」参照 |
| スペーシング (padding / gap / margin: `--spacing-*`) | summary `gap: calc(8/16*1rem)` (=8px)、content `padding-left: calc(32/16*1rem)` (=32px) `margin: calc(16/16*1rem) 0` (=16px) | summary `gap: var(--spacing-8,0.5rem)`、content `padding-left: 2rem` (直書き!)、`margin: var(--spacing-16,1rem) 0` | ❌ | 値 (8px/32px/16px) は公式と一致するが `--spacing-8`/`--spacing-16` は**公式 design-tokens に存在しない**トークン (spacing は CSS 変数化されていない) → 常にフォールバック。さらに `padding-left: 2rem` は完全直書き。本来は数値直書き (公式同様) か Tailwind 経由が正。誤トークン参照は実害無いが規約違反 |
| エレベーション / 影 (`--elevation-*`) | 該当なし (disclosure に影なし) | 影なし | ✅ | 該当なし |
| ボーダー (太さ / 色 / 有無) | ボーダーなし | ボーダーなし | ✅ | 一致 |
| 状態 (hover / focus-visible / active / current / disabled / expanded) | hover: `text-decoration: underline; text-underline-offset: calc(3/16*1rem)`。focus-visible: `outline: 4px solid var(--color-neutral-black); outline-offset: 2px; border-radius: 4px; background-color: var(--color-primitive-yellow-300); box-shadow: 0 0 0 2px var(--color-primitive-yellow-300)`。expanded(open): icon `rotate:180deg`。hover時 icon-circle `fill:Canvas` / triangle `fill:currentcolor`。disabled 状態の定義なし | hover: underline + offset 0.1875rem ✅。focus: 共有 `dads-focus-ring` = `outline:2px solid …black; box-shadow:0 0 0 4px …yellow-300`。expanded: icon `rotate(180deg)` ✅ + `transition: rotate .15s`。hover icon-circle/triangle ✅。disabled: 独自 (opacity .6, cursor not-allowed, color text-disabled) | ❌ | **focus-visible が公式と不一致**: 公式は outline 4px + offset 2px + 角丸4px + 黄背景 + 2px shadow。Vue 共有 mixin は outline 2px + offset 0 + 角丸なし + 4px shadow。太さ/offset/角丸/背景塗りが全て異なる。disclosure は example が独自 focus CSS を持つのに Vue は汎用 mixin で代用しドリフト |
| サイズバリアント (sm/md/lg 等) | 該当なし | 該当なし | ✅ | 該当なし |
| forced-colors / ハイコントラスト | `@media (forced-colors: active){ .dads-disclosure__icon{ color: inherit } }` | `dads-forced-colors { .dads-disclosure__icon{ color: CanvasText } }` | ⚠️ | 公式は `color: inherit`、Vue は `CanvasText`。挙動はほぼ同等だが正準値は `inherit`。軽微 |
| 正準CSSの流用 vs 独自実装 (ドリフト温床) | summary/icon/content/back-link を 1 枚の disclosure.css で定義。focus も専用記述 | back-link を**未実装** (公式 playground は「先頭に戻る」リンク `__back-link` を持つ)。focus を共有 mixin で代替 | ⚠️ | 公式の `__back-link` (戻るリンク + アイコン) が Vue に存在しない。focus を独自 mixin に流したことが focus 差異の温床 |

## 検出した差異 (修正対象)

1. **[medium]** 状態(focus-visible): 公式 `outline:4px solid black / offset:2px / border-radius:4px / background:yellow-300 / box-shadow:0 0 0 2px yellow-300` → 現状 共有 mixin `outline:2px / offset:0 / 角丸なし / box-shadow:0 0 0 4px yellow-300 / 背景なし`。disclosure 専用の focus スタイル (黄背景+4px outline+角丸) を再現すべき。
   - 該当行: `DadsDisclosure.vue:145` (`@include ring.dads-focus-ring`)
2. **[medium]** カラー(本文): 公式は本文に色指定なし or `--color-neutral-solid-gray-800` → 現状 `var(--color-text-primary, #1a1a1a)` という**非実在トークン**。`--color-neutral-solid-gray-800` 参照に置換。
   - 該当行: `DadsDisclosure.vue:124`, `DadsDisclosure.vue:191`
3. **[low]** スペーシング(直書き): content の `padding-left: 2rem` は完全直書き。公式は 32px (=2rem)。値は一致するがハードコード。
   - 該当行: `DadsDisclosure.vue:187`
4. **[low]** 誤トークン: `var(--spacing-8 …)` / `var(--spacing-16 …)` は公式 design-tokens に存在しない (spacing は CSS 変数化されていない)。常にフォールバックに落ちる。
   - 該当行: `DadsDisclosure.vue:131`, `DadsDisclosure.vue:188`
5. **[low]** forced-colors: 公式 `color: inherit` → 現状 `CanvasText`。
   - 該当行: `DadsDisclosure.vue:217`
6. **[low]** 構造欠落: 公式 playground にある `__back-link` (先頭に戻るリンク) が未実装。slot で代替可能だが正準構造の差。
   - 該当行: `DadsDisclosure.vue:107-114` (content slot のみ)

## ハードコード / 誤トークンの洗い出し

- `DadsDisclosure.vue:187` — `padding-left: 2rem;` (直書き。公式 32px)
- `DadsDisclosure.vue:124` / `:191` — `var(--color-text-primary, #1a1a1a)` (非実在トークン + 直書きフォールバック。公式色は #1a1a1c 系 = solid-gray-800)
- `DadsDisclosure.vue:131` / `:188` — `var(--spacing-8 …)` / `var(--spacing-16 …)` (非実在トークン)
- `DadsDisclosure.vue:196` / `:210` — `var(--color-text-disabled, #999)` (非実在トークン。disabled は公式 example に定義が無く Vue 独自拡張)
- 注: `var(--color-primitive-blue-1000, #0017c1)`・`var(--color-primitive-yellow-300, …)`・`var(--font-family-sans …)`・`var(--font-size-16 …)`・`var(--line-height-150 …)` は**実在トークン**でフォールバックも妥当 → 許容

## 結論

- 修正要否: **要修正**。focus-visible が公式の専用スタイル (黄背景・4px outline・角丸4px) と乖離しており、視覚・アクセシビリティ両面で目立つ差異。
- 優先度: medium (focus 差異が最優先)。誤トークン/直書きは実害小だが規約上是正対象。
- 想定 changeset レベル: **patch** (CSS のみ。focus スタイル修正・トークン置換・直書き解消。DOM 構造と props/aria は不変)。
- API/aria 不変: 保てる。`__back-link` 追加は slot で吸収可能なため public API 変更不要。
