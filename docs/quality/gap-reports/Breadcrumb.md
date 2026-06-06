# Gap Report: `DadsBreadcrumb`

> Issue #18 — DADS 公式とのビジュアル差異監査。1 コンポーネント 1 ファイル。

## メタ情報

| 項目 | 値 |
| ---- | ---- |
| Vue 実装 | `packages/vue/src/components/Breadcrumb/DadsBreadcrumb.vue` |
| 真実の源 (一次) | `example` |
| 参照パス | `design-system-example-components-html/src/components/breadcrumb/breadcrumb.css` / `plain.html` / `with-home-icon.html` |
| 総合判定 | ❌ 要修正 |
| 重大度 | medium |
| 検出差異数 | 9 |

## 観点別チェック

| 観点 | 公式 (正準値) | `@dads/vue` 現状 | 判定 | 備考 / 修正方針 |
| ---- | ------------- | ----------------- | ---- | ---------------- |
| タイポグラフィ (font-family / size / weight / line-height) | `font-family: var(--font-family-sans)`; `font-size: 16/16rem` (=1rem); `font-weight: normal`; `line-height: 1.7`; `letter-spacing: 0.02em` (`breadcrumb.css:5-9`) | `font-family: var(--font-family-sans, ...)`; `font-size: var(--font-size-14, 0.875rem)`; `line-height: var(--line-height-150, 1.5)`; current `font-weight: 500`; letter-spacing なし (`DadsBreadcrumb.vue:66-69,107`) | ❌ | font-size 公式 16px → 現状 14px、line-height 公式 1.7 → 1.5、current weight 公式 normal → 500、letter-spacing 0.02em 欠落 |
| カラー (背景 / 文字 / ボーダー: トークン参照) | base text `--color-neutral-solid-gray-800` (#333); link `--color-primitive-blue-1000` (#00118f); separator icon `--color-neutral-solid-gray-900` (#1a1a1a) (`breadcrumb.css:4,32,77`) | base text `--color-text-body, #333` (未定義); link `--color-brand-primary, #0017c1` (未定義+誤値); current `--color-text-body, #333`; separator `--color-neutral-solid-gray-500, #69707d` (フォールバック直値が token 値 #7f7f7f と不一致) (`DadsBreadcrumb.vue:69,90,106,117`) | ❌ | link トークンが design-tokens に無くフォールバック `#0017c1` 描画 (公式 blue-1000=#00118f と不一致)。separator は誤トークン+誤フォールバック |
| 角丸 (`--border-radius-*`) | focus-visible 時のみ `border-radius: 4/16rem` (`breadcrumb.css:53`) | link に常時 `border-radius: var(--border-radius-4, 0.25rem)` (`DadsBreadcrumb.vue:93`) | ⚠️ | 角丸値 4px は一致。公式は focus-visible 時のみ適用だが、リンクは通常 box 描画されないため実害は軽微 |
| スペーシング (padding / gap / margin: `--spacing-*`) | リスト `column-gap: 4/16rem`; separator は `::before/::after content:" "` + icon `margin: 0 1px` (`breadcrumb.css:3,65-73`) | list `gap: 0`; separator `margin: 0 var(--spacing-8, 0.5rem)` (=8px) (`DadsBreadcrumb.vue:78,116`) | ❌ | 公式 column-gap 4px に対し gap 0 + separator margin 8px。間隔が公式と異なる |
| エレベーション / 影 (`--elevation-*`) | 影なし | 影なし | ✅ | 該当なし |
| ボーダー (太さ / 色 / 有無) | 本体ボーダーなし。link は `text-decoration: underline` + `text-decoration-thickness: 1/16rem` (`breadcrumb.css:33-35`) | link `text-decoration: underline` + `text-underline-offset: 2px`、thickness 指定なし (`DadsBreadcrumb.vue:91-92`) | ⚠️ | 下線 thickness (公式 1px、hover 3px) が未実装。underline-offset 公式 3px → 現状 2px |
| 状態 (hover / focus-visible / active / current / disabled / expanded) | hover: link `--color-primitive-blue-900` + thickness `3/16rem` (`@media hover`); active: `--color-primitive-orange-800` + thickness `1/16rem`; focus-visible: 黒 4px outline+offset 2px+黄 box-shadow+角丸 4px; current: `aria-current="page"` の `<li>` (装飾なし) (`breadcrumb.css:38-56`) | hover: `--color-brand-primary-hover, #001a9c` (未定義トークン); active: `--color-brand-primary-active, #001480` (未定義); focus: 共有 mixin (黒 2px/offset 0/角丸無し/黄背景無し); current: `<span aria-current="page">` に `font-weight:500`; disabled: `--color-text-disabled` (公式に無い状態) (`DadsBreadcrumb.vue:95-112`) | ❌ | hover/active 色トークンが未定義 (公式は blue-900 / orange-800)。focus が公式 4px/offset 2px/角丸/黄背景と不一致。current に独自 weight。disabled は公式に無い |
| サイズバリアント (sm/md/lg 等) | なし | なし | ✅ | 該当なし |
| forced-colors / ハイコントラスト | 公式指定なし (currentcolor 依存) | `dads-forced-colors` で link=LinkText, current/separator=CanvasText (`DadsBreadcrumb.vue:122-134`) | ✅ | 公式より手厚いが妥当。維持可 |
| 正準CSSの流用 vs 独自実装 (ドリフト温床) | `<nav aria-labelledby> > visually-hidden label > <ol> > <li>` 各 li に SVG separator-icon (chevron) と SVG home-icon。最終 li は `aria-current="page"` のプレーンテキスト (`plain.html:15-54`, `with-home-icon.html:19-24`) | `<nav aria-label> > <ol> > <li>`、separator は `separator` prop の文字列 (既定 `》`) を `<span>` で表示、SVG chevron 不使用。home/link アイコンは slot 等での対応なし (`DadsBreadcrumb.vue:33-58`) | ❌ | 公式の SVG chevron separator を文字 `》` で代替し独自実装。home アイコンも非対応。visually-hidden ラベル方式 (aria-labelledby) でなく aria-label。ドリフト要因 |

## 検出した差異 (修正対象)

1. **[medium]** 正準CSS流用: 公式 SVG chevron separator-icon を文字 `》` (`separator` prop) で代替し、home-icon バリアントも非対応。
   - 該当行: `DadsBreadcrumb.vue:53-55`, `:9-12`
2. **[medium]** カラー(link): `--color-brand-primary, #0017c1` は未定義でフォールバック描画。公式 `--color-primitive-blue-1000` (#00118f)。hover/active も `--color-brand-primary-hover/-active` 未定義 → 公式 blue-900 / orange-800 へ。
   - 該当行: `DadsBreadcrumb.vue:90`, `:96`, `:101`
3. **[medium]** タイポ: font-size 公式 16px → 現状 14px、line-height 公式 1.7 → 1.5、letter-spacing 0.02em 欠落。
   - 該当行: `DadsBreadcrumb.vue:67-68`
4. **[medium]** 状態(focus): 公式 outline 4px/offset 2px/角丸 4px/黄背景 → 共有 mixin の 2px/offset 0/角丸無し/黄背景無し。
   - 該当行: `_focus-ring.scss:9-13`
5. **[low]** スペーシング: 公式 list `column-gap: 4px` → 現状 gap 0 + separator margin 8px で間隔過大。
   - 該当行: `DadsBreadcrumb.vue:78`, `:116`
6. **[low]** 下線: 公式 thickness 1px / hover 3px / underline-offset 3px → 現状 thickness 未指定 / offset 2px。
   - 該当行: `DadsBreadcrumb.vue:91-92`, `:97`
7. **[low]** separator 色: `--color-neutral-solid-gray-500, #69707d` (フォールバックが token 実値 #7f7f7f と不一致)。公式は `--color-neutral-solid-gray-900`。
   - 該当行: `DadsBreadcrumb.vue:117`
8. **[low]** current weight: 公式 normal → 現状 `font-weight: 500`。
   - 該当行: `DadsBreadcrumb.vue:107`
9. **[low]** disabled: 公式に存在しない disabled 状態を独自追加。
   - 該当行: `DadsBreadcrumb.vue:109-112`

## ハードコード / 誤トークンの洗い出し

- 誤フォールバック直値 (トークン未定義 → 実描画値): `--color-text-body, #333` (`:69`,`:106`)、`--color-brand-primary, #0017c1` (`:90`)、`--color-brand-primary-hover, #001a9c` (`:96`)、`--color-brand-primary-active, #001480` (`:101`)、`--color-text-disabled, #999` (`:110`)
- 誤フォールバック (トークン実在だがフォールバック値が token 実値と不一致): `--color-neutral-solid-gray-500, #69707d` (`:117`、実トークン値は #7f7f7f)
- マジックナンバー: `text-underline-offset: 2px` (`:92`、公式 3px)

## 結論

- 修正要否: **要修正 (medium)**。カラートークン未定義 (フォールバック直値描画) とタイポ (16px/1.7 → 14px/1.5)、focus-ring、SVG separator の文字代替が主因。
- 優先度: 中 (Accordion ほど構造破壊的ではないが、separator アイコン・色・タイポで視覚差が明確)。
- 想定 changeset レベル: **minor**。トークン/タイポ/状態のみなら patch〜minor。SVG chevron separator の導入や home-icon slot 追加を行うと `separator` prop の意味が変わり minor。
- API/aria 不変: 色・タイポ・focus 修正は不変で可。aria は `aria-label` → 公式の `aria-labelledby` + visually-hidden ラベルへ寄せる場合のみ DOM 変更が必要 (任意)。separator を SVG 化する場合は `separator` prop API に影響。

