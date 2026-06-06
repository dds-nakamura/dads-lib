# Gap Report: `DadsDivider`

> Issue #18 — DADS 公式とのビジュアル差異監査。1 コンポーネント 1 ファイル。

## メタ情報

| 項目 | 値 |
| ---- | ---- |
| Vue 実装 | `packages/vue/src/components/Divider/DadsDivider.vue` |
| 真実の源 (一次) | `example` |
| 参照パス | `design-system-example-components-html/src/components/divider/divider.css` / `all-dividers.html` |
| 総合判定 | ❌ 要修正 |
| 重大度 | high |
| 検出差異数 | 7 |

## 観点別チェック

| 観点 | 公式 (正準値) | `@dads/vue` 現状 | 判定 | 備考 / 修正方針 |
| ---- | ------------- | ----------------- | ---- | ---------------- |
| タイポグラフィ (font-family / size / weight / line-height) | 該当なし — 公式 divider は `<hr>` のみでラベル/テキストを持たない | `__label` に `font-family: var(--font-family-sans …)`, `font-size: var(--font-size-14, .875rem)`, `line-height: var(--line-height-150,1.5)`, `color: var(--color-text-secondary,#555)` | ⚠️ | 公式にラベル機能は存在しない → Vue 独自拡張。トークン参照のうち `--color-text-secondary` は非実在トークン |
| カラー (背景 / 文字 / ボーダー: トークン参照) | `border-top-color` を 3 段階で指定: `--color-neutral-solid-gray-420` (#949494) / `--color-neutral-solid-gray-536` (#767676) / `--color-neutral-black`。いずれも実在トークン | line は `background-color: var(--color-border-default, rgba(0,0,0,0.1))` (default) / `var(--color-border-strong, rgba(0,0,0,0.3))` (strong) | ❌ | **公式の色トークンと完全不一致**。公式は solid-gray-420/536/black の 3 段階。Vue は `--color-border-default`/`--color-border-strong` という**非実在トークン**を使い、フォールバックの `rgba(0,0,0,0.1)`/`(0.3)` (opacity 表現) に落ちる。公式は不透明な solid-gray を使う設計。色味も段階数も違う |
| 角丸 (`--border-radius-*`) | 該当なし | 該当なし | ✅ | divider に角丸なし |
| スペーシング (padding / gap / margin: `--spacing-*`) | `.dads-divider { margin: 0 }`。マージン要件は利用側責務 (リスト=8px / セクション=16px、MD 記載) | `gap: var(--spacing-8,0.5rem)` (label 用)、inset `padding-inline: var(--spacing-16,1rem)` | ⚠️ | 公式 hr 自体は margin:0。Vue の gap/inset は独自レイアウト。`--spacing-*` は非実在トークン |
| エレベーション / 影 (`--elevation-*`) | 該当なし | 該当なし | ✅ | 該当なし |
| ボーダー (太さ / 色 / 有無) | `border: 0; border-top: 1px solid` をベースに `data-width=1..4` → `border-top-width: 1/2/3/4px`、`data-style=solid/dashed` → `border-top-style`。**線の実体は border-top** | line を `<span>` 要素として描画し `height: 1px..4px` の `background-color` で solid を表現、dashed のみ `border-top` に切替 | ❌ | 公式は一貫して `border-top` で線を描く。Vue は solid を span+background-color、dashed を border で描く二重実装。太さ段階 (1-4px) の値自体は一致するが描画手法と DOM が公式と乖離。`<hr>` ではなく `<div role=separator>` + 子 span という別構造 |
| 状態 (hover / focus-visible / active / current / disabled / expanded) | 該当なし — divider は非インタラクティブ | 該当なし | ✅ | 一致 (状態なし) |
| サイズバリアント (sm/md/lg 等) | width: 1/2/3/4px (`data-width`)。色: gray-420/gray-536/black (`data-color`)。style: solid/dashed | thickness 1-4 ✅ (値一致)。color: default/strong の **2 段階のみ** ❌。style solid/dashed ✅ | ❌ | thickness と style は網羅。**color が公式 3 段階 (gray-420/gray-536/black) に対し Vue は 2 段階 (default/strong)** で段階数・トークンとも不一致。orientation(vertical)/inset/label は公式に無い Vue 独自拡張 |
| forced-colors / ハイコントラスト | 公式 divider.css に forced-colors 指定なし (border は OS が描画) | `dads-forced-colors { __line{ background-color: CanvasText } __label{ color: CanvasText } }` | ⚠️ | Vue は background-color で線を描くため forced-colors で消える問題を CanvasText で補填。公式は border-top なので元々 OS 描画され補填不要。Vue 独自実装に起因する追加対応 |
| 正準CSSの流用 vs 独自実装 (ドリフト温床) | `<hr class="dads-divider" data-color data-style data-width>` の単一要素 + data 属性駆動 | `<div role="separator">` + 子 `<span class="__line">`、BEM modifier クラス駆動。**完全独自再実装** | ❌ | **最重要**: 公式は `<hr>` + `data-*` 属性、Vue は `<div>`+span の BEM 構造で**全面再実装**。クラス名 (`dads-divider__line` 等) も公式に存在しない。色トークンも独自。典型的なドリフト温床 |

## 検出した差異 (修正対象)

1. **[high]** カラートークン: 公式 `--color-neutral-solid-gray-420` / `--color-neutral-solid-gray-536` / `--color-neutral-black` (不透明 3 段階) → 現状 `--color-border-default` / `--color-border-strong` (非実在トークン、フォールバック `rgba(0,0,0,0.1)`/`(0.3)` の半透明 2 段階)。色味・段階数・透明度すべて不一致。公式 3 トークンに合わせるべき。
   - 該当行: `DadsDivider.vue:101`, `DadsDivider.vue:105`, `DadsDivider.vue:148`, `DadsDivider.vue:153`, `DadsDivider.vue:158`, `DadsDivider.vue:162`
2. **[high]** サイズバリアント(color): 公式は 3 段階 (gray-420/gray-536/black)、Vue は 2 段階 (default/strong)。バリアント体系を公式に合わせる必要あり (props 設計に影響)。
   - 該当行: `DadsDivider.types.ts:12` (`DadsDividerColor = 'default' | 'strong'`)
3. **[medium]** 描画手法/DOM: 公式は `<hr>` + `border-top`。Vue は `<div role=separator>` + 子 `<span>` で solid を background-color 描画。構造が乖離し forced-colors の追加補填も必要に。`<hr>` ベースへの寄せを検討。
   - 該当行: `DadsDivider.vue:34-49`, `DadsDivider.vue:100-106`
4. **[low]** 誤トークン: `--color-border-default` / `--color-border-strong` / `--color-text-secondary` / `--spacing-8` / `--spacing-16` はいずれも公式 design-tokens に存在しない。
   - 該当行: `DadsDivider.vue:58`, `DadsDivider.vue:72`, `DadsDivider.vue:101`, `DadsDivider.vue:105`, `DadsDivider.vue:110`
5. **[low]** 直書き太さ: `height: 1px` 等は公式の 1-4px と値一致だが px 直書き (公式も px なので許容範囲だが、ベース `__line { height:1px }` と thickness modifier が二重定義)。
   - 該当行: `DadsDivider.vue:83`, `DadsDivider.vue:114-137`
6. **[low]** ラベル機能: 公式 divider にラベル (中央テキスト) 機能は存在しない → Vue 独自拡張。仕様外であることを明記すべき。
   - 該当行: `DadsDivider.vue:41-45`
7. **[low]** vertical / inset: 公式の inset は MD 記載のバリアント (関連セクション内) だが example CSS には無い。vertical も公式 example に無い独自拡張。
   - 該当行: `DadsDivider.vue:86-94`, `DadsDivider.vue:109-111`

## ハードコード / 誤トークンの洗い出し

- `DadsDivider.vue:101` — `var(--color-border-default, rgba(0, 0, 0, 0.1))` (非実在トークン + 半透明直書き。公式は solid-gray-420 #949494)
- `DadsDivider.vue:105` — `var(--color-border-strong, rgba(0, 0, 0, 0.3))` (非実在トークン。公式は solid-gray-536 #767676 / black)
- `DadsDivider.vue:148`,`:153`,`:158`,`:162` — dashed 用に同じ非実在 border-color トークンを再使用
- `DadsDivider.vue:72` — `var(--color-text-secondary, #555)` (非実在トークン)
- `DadsDivider.vue:58`,`:110` — `var(--spacing-8 …)` / inset `var(--spacing-16 …)` (非実在トークン)
- `DadsDivider.vue:83-137` — `height/width: 1px..4px` の px 直書き (公式 data-width と同値だが直書き)
- 注: `var(--font-family-sans …)`・`var(--font-size-14 …)`・`var(--line-height-150 …)` は実在トークンで許容

## 結論

- 修正要否: **要修正 (優先度高)**。公式が `<hr>` + `data-*` + solid-gray 3 段階で定義しているのに対し、Vue は `<div>`+span の BEM 構造・半透明 2 段階という**全面独自再実装**でドリフトが最も大きいコンポーネント。
- 優先度: high。特にカラートークン (solid-gray-420/536/black への是正) と color バリアント段階数。
- 想定 changeset レベル: **minor〜major**。color バリアントを公式 3 段階に揃えると props 値 (`'default'|'strong'` → 3 段階) が変わり破壊的になりうる。DOM を `<hr>` ベースへ寄せる場合も major 級。色トークン置換のみなら patch だがそれだけでは公式準拠に届かない。
- API/aria 不変: **保てない可能性が高い**。color バリアント体系の見直しは public props の破壊的変更を伴う。aria (`role=separator` / `aria-orientation`) は維持可能。
