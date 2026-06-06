# Gap Report: `DadsResourceList`

> Issue #18 — DADS 公式とのビジュアル差異監査。1 コンポーネント 1 ファイル。

## メタ情報

| 項目 | 値 |
| ---- | ---- |
| Vue 実装 | `packages/vue/src/components/ResourceList/DadsResourceList.vue` |
| 真実の源 (一次) | `example` |
| 参照パス | `design-system-example-components-html/src/components/resource-list/resource-list.css` / `multiple-items.html` / `with-control.html` |
| 総合判定 | ❌ 要修正 |
| 重大度 | medium |
| 検出差異数 | 9 |

## 観点別チェック

| 観点 | 公式 (正準値) | `@dads/vue` 現状 | 判定 | 備考 / 修正方針 |
| ---- | ------------- | ----------------- | ---- | ---------------- |
| タイポグラフィ (font-family / size / weight / line-height) | `font-family: var(--font-family-sans)`、title `font-size: calc(20/16*1rem)`/`bold`/`line-height: 1.5`/`letter-spacing: 0.02em`、contents `16px`/`normal`/`1.3`/`letter-spacing: 0`、sub `16px`/`normal`/`1.3`、support は `__support` に明示無し (resource-list.css:1-7,90-101,115-122,186-192) | title `--font-size-20`/`bold`/`1.5`/`0.02em` (一致)、contents `--font-size-16`/`normal`/`1.3`/`0` (一致)、sub `--font-size-16`/`1.3` (一致)、support `--font-size-14`/`1.4` (公式は support font-size 未指定) (DadsResourceList.vue:222-224,231-237,256-261,288-292) | ⚠️ | タイポはほぼ一致。`__support` の font-size:14/line-height:1.4 は公式に無い独自値だが軽微 |
| カラー (背景 / 文字 / ボーダー: トークン参照) | bg `--color-neutral-white`、文字 `--color-neutral-solid-gray-800`、title `--color-neutral-solid-gray-900`、support なし、border `--color-neutral-solid-gray-420`、リンク title `--color-primitive-blue-1000`、hover `--color-primitive-blue-900`、active `--color-primitive-orange-800` (resource-list.css:1-9,116-117,128-134,164-168) | bg `--color-neutral-white`(一致)、文字 `--color-text-primary`(**存在しないトークン** fallback)、title 同上、support/icon/sub `--color-text-secondary`(**存在しない**)、border `--color-neutral-solid-gray-420`(一致)、リンク title `--color-primitive-blue-1000`(一致)、hover `--color-primitive-blue-900`(一致) (DadsResourceList.vue:146,210,233,258,280,292) | ❌ | border / リンク色は正準トークン。ただし `--color-text-primary`/`--color-text-secondary` が存在せず fallback。`--color-neutral-solid-gray-800/700` を直接使うべき |
| 角丸 (`--border-radius-*`) | frame `border-radius: calc(16/16*1rem)`、サムネイル等は公式 CSS に無し (resource-list.css:20) | frame `--border-radius-16`(一致)、サムネイル `--border-radius-4`、action `--border-radius-4`、tag `999px`(pill) (DadsResourceList.vue:160,197,278,325) | ⚠️ | frame の 16 は一致。サムネイル/action/tag の角丸は公式 CSS に無い独自値 (公式は thumbnail/icon/tag/action 自体が無い) |
| スペーシング (padding / gap / margin: `--spacing-*`) | `--_padding-block/inline: calc(16/16*1rem)`、body gap `calc(16/16*1rem)`、contents gap `calc(4/16*1rem)`、group row-gap `calc(16/16*1rem)` (resource-list.css:10-11,48,96; multiple-items.html:16) | `--_padding-block/inline: --spacing-16`(**存在しないトークン** fallback 1rem)、body gap `--spacing-16`、contents gap `--spacing-4`、group row-gap `--spacing-16` (DadsResourceList.vue:129,151-152,171,220) | ❌ | 値 (16/4px) は一致するが `--spacing-*` トークンが存在せず fallback 依存。`calc(N/16*1rem)` か実在スケールへ |
| エレベーション / 影 (`--elevation-*`) | 該当なし (box-shadow は focus-ring のみ) | focus 時 box-shadow のみ | ✅ | 該当なし |
| ボーダー (太さ / 色 / 有無) | list: `1px solid transparent` + `border-bottom-color: gray-420`。frame: `1px solid gray-420`。選択時 `--_border-color: gray-500`。disabled `gray-300` (resource-list.css:14-40) | list: `1px solid transparent`+`border-bottom: gray-420`(一致)。frame: `1px solid gray-420`(一致)。selected は `--color-brand-primary`(**存在しないトークン**)。disabled の border 変化なし (DadsResourceList.vue:155-162,306-307) | ⚠️ | 通常状態は一致。選択時のボーダーは公式 `gray-500`、Vue は存在しない `--color-brand-primary`。disabled 時の border (gray-300) 切替が欠落 |
| 状態 (hover / focus-visible / active / current / disabled / expanded) | hover: `:any-link:hover` → `outline: 2px black` + `bg gray-50`。focus-visible: `outline 4px black / offset 2px / box-shadow 2px yellow-300`。active: title `--color-primitive-orange-800`。selected: `:has(:checked:enabled)` → bg `blue-50`+border `gray-500`。disabled: `:has(:disabled)` → bg `gray-50`/文字 `gray-420`/border `gray-300` (resource-list.css:24-40,61-74,123-126,164-168) | hover: `a.__body:hover` → `outline 2px black`+`bg gray-50`(一致)。focus: 共有 `dads-focus-ring`(2px outline+4px yellow shadow — **公式は 4px outline+2px shadow**)。active 状態の title 色変化なし。selected: `--color-info-bg`(存在しない)+`--color-brand-primary`(存在しない)。disabled: `opacity:0.6` 一律 (DadsResourceList.vue:180-189,304-312) | ❌ | focus リング値が公式と逆。active title 色 (orange-800) 欠落。selected/disabled が存在しないトークン・opacity ディミングで公式の bg/border トークン切替を再現せず |
| サイズバリアント (sm/md/lg 等) | 公式に明示サイズバリアント無し (data-style=`frame`/`list` のみ) | `variant: 'frame'\|'list'` の 2 種のみ。サイズ prop なし | ✅ | 公式同様サイズバリアント無し。frame/list は一致 |
| forced-colors / ハイコントラスト | 公式 resource-list.css に forced-colors ルールなし (子部品依存) | `border-color: CanvasText`、list の border-bottom、tag border、`a.__body:focus-visible` を CanvasText に (DadsResourceList.vue:341-356) | ⚠️ | 公式に無い独自 forced-colors 対応。害は無いが公式未定義領域の独自拡張 |
| 正準CSSの流用 vs 独自実装 (ドリフト温床) | 構造: 外側 `<ul>` は inline-style、各行 `<div.dads-resource-list[data-style]>` > `<div.dads-resource-list__body>` > `__contents`(title=`<h2>`/`__support`/`__label`) + `__sub` + `__action`>`__action-button`(SVG)。フォーム連携は `__body` 内に `dads-radio`/`dads-checkbox` を流用、whole 化は `[data-interaction="whole"]` + `__title label::before` の擬似要素オーバーレイ (multiple-items.html / with-control.html) | 外側 `<ul.dads-resource-list-group[data-style]>`、各行 `<div.dads-resource-list>` > body は `<a>`/`<div>` 動的、`__contents`(title=`<h3>`/`__support`/`__tags`) + `__sub` + `__action`。`__thumbnail`/`__icon`(mdi)/`__tags`/`__tag`/`--kind-*`/`--selected` は公式 CSS に無い独自追加。`__label`(order:-1) / `data-interaction="whole"` / `__action-button` / checkbox·radio 連携は未実装 (DadsResourceList.vue:54-116,192-211,264-283,300-307) | ❌ | title が `<h3>` (公式 `<h2>`)。`__thumbnail`/`__icon`/`__tags`/`--kind`/`--selected` は独自拡張。逆に公式の `__label`(バッジ)・`[data-interaction="whole"]` の擬似要素オーバーレイ・`__action-button` のクラス名・radio/checkbox 連携は未実装。action 要素もクラス名が `__action`(公式は内側 `__action-button`) で構造ズレ |

## 検出した差異 (修正対象)

1. **[high]** カラー: 存在しないトークン `--color-text-primary`(L146,233 fallback で title は gray-900 になるが意味が不正確)、`--color-text-secondary`(L210,258,280,292)、`--color-info-bg`(L305,336)、`--color-brand-primary`(L306,326)。公式 `--color-neutral-solid-gray-800/700/900`/`--color-primitive-blue-50`/`--color-neutral-solid-gray-500` へ。
   - 該当行: `DadsResourceList.vue:146,210,258,280,292,305-306,326,336`
2. **[high]** focus リング値が公式と逆: 公式 `outline 4px black / offset 2px / shadow 2px yellow-300`、Vue 共有 `dads-focus-ring`(2px outline + 4px yellow shadow)。
   - 該当行: `DadsResourceList.vue:181`, `_focus-ring.scss:10-12`
3. **[medium]** selected/disabled 状態: 公式は `:has(:checked:enabled)`→bg `blue-50`+border `gray-500`、`:has(:disabled)`→bg `gray-50`/文字 `gray-420`/border `gray-300`。Vue は `--selected` クラス+存在しないトークン、disabled は `opacity:0.6` 一律。
   - 該当行: `DadsResourceList.vue:304-312`
4. **[medium]** active 状態: 公式はリンク title を `--color-primitive-orange-800` + 下線太さ変化。Vue に `:active` ルール欠落。
   - 該当行: 公式 `resource-list.css:164-168` に対応する実装が DadsResourceList.vue に欠落
5. **[medium]** title 見出しレベル: 公式 `<h2>`、Vue `<h3>` 固定 (`as` 等で可変にすべき)。
   - 該当行: `DadsResourceList.vue:78`
6. **[medium]** スペーシング: `--spacing-16`/`--spacing-4` (存在しない) を使用。値は合うが `calc(N/16*1rem)` か実在スケールへ。
   - 該当行: `DadsResourceList.vue:129,151-152,171,220,266,270,323-324`
7. **[low]** action 構造: 公式は `__action > __action-button(width:44px, height:100%, align-self:stretch)`。Vue は単一 `__action`(min 2.75rem 角丸 4px) でクラス階層・寸法が公式とズレ。
   - 該当行: `DadsResourceList.vue:96-112,314-338`
8. **[low]** 公式機能の未実装: `__label`(order:-1 のバッジ)、`[data-interaction="whole"]` の `__title label::before` 全面クリックオーバーレイ、radio/checkbox 行内連携 (with-control / multiple-items 第4ブロック)。
   - 該当行: 公式 `resource-list.css:80-88,107-113,146-154` に対応する実装が DadsResourceList.vue に欠落
9. **[low]** 独自拡張 (公式 CSS 非存在): `__thumbnail`/`__icon`(mdi 依存)/`__tags`/`__tag`/`--kind-*`。API としては有用だが公式ビジュアルと未照合。
   - 該当行: `DadsResourceList.vue:192-211,264-283,300-301`

## ハードコード / 誤トークンの洗い出し

- 誤トークン (存在しない): `--color-text-primary`(L146,233), `--color-text-secondary`(L210,258,280,292), `--color-info-bg`(L305,336), `--color-brand-primary`(L306,326), `--spacing-16`(L129,151-152,171,220,323), `--spacing-4`(L220,266,270), `--spacing-12`(L323), `--spacing-8`(L277,324)。
- 直書き値: thumbnail `width/height: calc(64/16*1rem)`(L194-195 — 公式に thumbnail 定義無し), icon `calc(40/16*1rem)`/`calc(32/16*1rem)`(L203-205), tag `border-radius: calc(999/16*1rem)`(L278)/`border: 1px solid var(...)`(L277), action `min-width/height: 2.75rem`/`font-size: 1.25rem`(L321-322,329), `box-shadow: 0 0 0 …`(focus-ring 経由), forced-colors `outline: 2px solid CanvasText`(L353-354)。
- fallback の直値自体は許容 (`var(--token, #fff)` 形式) だが、上流トークンが存在しないため事実上ハードコード運用になっている点が問題。

## 結論

- **修正要否**: 要修正。frame/list の枠・角丸・title タイポ・hover は概ね公式準拠だが、(1) 存在しないトークン依存、(2) focus リング値が公式と逆、(3) selected/disabled/active の状態スタイルが公式の `:has()` トークン切替を再現していない、(4) title が `<h2>`→`<h3>`、(5) 公式の `__action-button`/`[data-interaction="whole"]`/radio·checkbox 連携の未実装、が主な乖離。
- **優先度**: 中 (frame/list の基本見た目は成立しているが、状態系とトークンの是正が必要)。
- **想定 changeset レベル**: minor（トークン置換・focus 値修正・状態スタイル追加は内部 CSS 変更。title レベル可変化や `__action-button` 構造化は DOM/props に影響しうるため patch ではなく minor が妥当）。
- **API/aria 不変**: `items`/`variant`/`ariaLabel`/`click:item`/`click:action` の props・emit は維持可能。`aria-current`/`aria-disabled`/`aria-label` も維持可能。title レベル変更は `as`/`headingLevel` prop 追加で後方互換に。
