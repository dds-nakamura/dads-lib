# Gap Report: `DadsProgressIndicator`

> Issue #18 — DADS 公式とのビジュアル差異監査。1 コンポーネント 1 ファイル。

## メタ情報

| 項目 | 値 |
| ---- | ---- |
| Vue 実装 | `packages/vue/src/components/ProgressIndicator/DadsProgressIndicator.vue` |
| 真実の源 (一次) | `example` |
| 参照パス | `design-system-example-components-html/src/components/progress-indicator/` (`progress-indicator.css`, `linear-fill.html`, `spinner-fill.html`, `progress-indicator.js`) |
| 総合判定 | ❌ 要修正 |
| 重大度 | high |
| 検出差異数 | 11 |

## 観点別チェック

| 観点 | 公式 (正準値) | `@dads/vue` 現状 | 判定 | 備考 / 修正方針 |
| ---- | ------------- | ----------------- | ---- | ---------------- |
| タイポグラフィ (font-family / size / weight / line-height) | `font-size: 1rem` / `line-height: 1.7` / `letter-spacing: 0.02em` / `font-family: var(--font-family-sans)` / `font-weight: normal`。percentage は `tabular-nums` + `min-width:2ch` + `text-align:right` (css:6-11,183-189) | label `font-size: var(--font-size-14,0.875rem)` / `line-height: var(--line-height-150,1.5)` / `tabular-nums` のみ。letter-spacing なし、min-width/right align なし (.vue:147-152) | ❌ | label は 0.875rem→1rem、line-height 1.5→1.7、letter-spacing 0.02em 欠落。percentage の 2ch/right-align 欠落 |
| カラー (背景 / 文字 / ボーダー: トークン参照) | track: `--color-primitive-blue-100`。bar(fill): `--color-primitive-blue-1200`。border(下線): `--color-primitive-blue-1200`。static: `--color-primitive-blue-1200`。文字: `--color-neutral-solid-gray-900` (css:52-64,159-161) | fill/stroke に `--color-brand-primary` / `--color-brand-secondary` / `--color-success` / `--color-error` / `--color-warning`(すべて公式非定義)。track に `--color-bg-subtle` (.vue:116,123,137,209-238) | ❌ | 公式は単色 `--color-primitive-blue-*` 系のみ(色バリアント無し)。`--color-brand-*` 等は DADS 非定義トークン。全面置換必要 |
| 角丸 (`--border-radius-*`) | stacked-underlay コンテナ `border-radius: 16/16rem`(=1rem)。バー本体は SVG line のため角丸概念なし(stroke-linecap も無し) (css:32) | bar/bar-fill に `var(--border-radius-4, 0.25rem)`、stroke-linecap: round (.vue:117,142) | ❌ | 公式バーは矩形 SVG line(角丸/丸キャップ無し)。Vue は div 角丸 + 丸キャップで形状が別物。underlay コンテナの 16px 角丸は未実装 |
| スペーシング (padding / gap / margin: `--spacing-*`) | gap `16/16rem 8/16rem`(行/列)。stacked-underlay padding spinner/static=`16`, linear=`24`、min 128px (css:3,42-50) | gap `var(--spacing-8, 0.5rem)` のみ。underlay/padding 概念なし (.vue:106) | ❌ | gap 値・underlay padding ともに不一致 |
| エレベーション / 影 (`--elevation-*`) | 影の使用なし | 影の使用なし | ✅ | 該当なし(両者影なし) |
| ボーダー (太さ / 色 / 有無) | linear: SVG に track(stroke-width 4) + bar(stroke-width 4) + border 下線(stroke-width 1, blue-1200)。stacked-underlay: `1px solid --color-neutral-solid-gray-500` (css:18-21,33) | linear は div 重ね(border 無し)。bar 高さ 8px。下線(border line)概念なし。underlay border 無し (.vue:111-126) | ❌ | 公式の 1px 下線アクセント(border line)が完全欠落。underlay の囲みボーダーも無し |
| 状態 (hover / focus-visible / active / current / disabled / expanded) | インタラクティブ状態なし。`intent` 属性(active/passive)で active 時のみ表示、`:not([active])` で非表示 + アニメ停止 (css:14-20) | progressbar 表示のみ。active/intent 概念なし | ⚠️ | progressbar に hover 等が無い点は妥当。ただし公式の active/intent 表示制御モデルが未実装(致命ではない) |
| サイズバリアント (sm/md/lg 等) | サイズ prop 無し。type=stacked/inlined/stacked-underlay でレイアウト差。linear 幅は SVG width(240/80)で制御 | sm/md/lg を独自定義(linear 高さ 4/8/12px、circular 24/40/56px) (.vue:165-187) | ❌ | 公式に sm/md/lg は存在しない。公式の type(stacked/inlined/stacked-underlay)が未実装で、代わりに非公式 size 軸を発明 |
| forced-colors / ハイコントラスト | track `color: Canvas`、bar/border/static `color: CanvasText` (css:191-204) | bar Canvas+border CanvasText、track GrayText、circle 群も対応 (.vue:241-258) | ⚠️ | 方向性は近いが、公式 track=Canvas に対し Vue track=GrayText。circular は公式に存在しないため余剰 |
| 正準CSSの流用 vs 独自実装 (ドリフト温床) | `<dads-progress-indicator>` Web Component + 内部 `<svg class="__linear">` に `<line __track/__bar/__border>`。spinner は `<svg __spinner>` + `<g>` ネスト + JS(`progress-indicator.js`)で value→stroke-dashoffset 制御。type: stacked/inlined/stacked-underlay | 完全独自: linear=div/div-fill、circular=`<circle>` リング(viewBox 36×36, r=16)。`variant: linear/circular`、`color`、`size` という独自 API。indeterminate を独自 keyframes で実装 (.vue:54-98,264-297) | ❌ | **最重要ドリフト**: 公式の SVG line ベース linear と spinner(g ネスト+JS)構造を一切再現せず、別アーキテクチャで再実装。circular リングは公式に存在しない形態。type 体系(stacked/inlined/underlay)が丸ごと欠落 |

## 検出した差異 (修正対象)

1. **[high]** アーキテクチャ: 公式は SVG `<line>`(linear) / `<g>`ネスト+JS(spinner)。Vue は div-fill(linear) + `<circle>`リング(circular) で完全別実装。
   - 該当行: `DadsProgressIndicator.vue:63-92`
2. **[high]** カラー: 公式 `--color-primitive-blue-100/1200` 単色系。Vue は非定義 `--color-brand-primary`/`--color-success`/`--color-error`/`--color-warning`/`--color-secondary` を使用。
   - 該当行: `DadsProgressIndicator.vue:116`, `:123`, `:137`, `:209-238`
3. **[high]** バリアント体系: 公式 type=stacked/inlined/stacked-underlay。Vue は variant=linear/circular + size=sm/md/lg(非公式)。
   - 該当行: `DadsProgressIndicator.vue:35-43`, `:165-187`
4. **[high]** circular 形態: 公式の linear は SVG line(直線バー)。Vue の `circular` リング(`<circle>`)は公式に存在しない形態。
   - 該当行: `DadsProgressIndicator.vue:71-92`
5. **[medium]** ボーダー下線: 公式 linear の 1px `--color-primitive-blue-1200` 下線アクセントが欠落。
   - 該当行: `DadsProgressIndicator.vue:111-126`(該当要素なし)
6. **[medium]** stacked-underlay: 公式の囲み(border `--color-neutral-solid-gray-500` + radius 16px + 白背景 + padding/min-size)が未実装。
   - 該当行: `DadsProgressIndicator.vue`(該当要素なし)
7. **[medium]** 形状: 公式バーは矩形(丸キャップ無し)。Vue は radius 4px + stroke-linecap:round で形状が異なる。
   - 該当行: `DadsProgressIndicator.vue:117`, `:142`
8. **[medium]** タイポ: label 0.875rem→1rem、line-height 1.5→1.7、letter-spacing 0.02em 欠落、percentage の min-width:2ch/right-align 欠落。
   - 該当行: `DadsProgressIndicator.vue:147-152`
9. **[low]** indeterminate アニメ: 公式は spinner の g 二重回転 + dash アニメ(cubic-bezier)。Vue は独自 translateX/dash で見た目が異なる。
   - 該当行: `DadsProgressIndicator.vue:264-297`
10. **[low]** active/intent モデル: 公式の `intent`/`active` 表示制御 + `:not([active])` アニメ停止が未実装。
    - 該当行: `DadsProgressIndicator.vue`(該当なし)
11. **[low]** forced-colors: track が公式 Canvas に対し Vue GrayText。circular 用ルールは公式に対応形態が無く余剰。
    - 該当行: `DadsProgressIndicator.vue:249`

## ハードコード / 誤トークンの洗い出し

- `:108` `--color-text-primary, #1a1a1a` — 公式非定義トークン(文字色は `--color-neutral-solid-gray-900` が正)
- `:116`,`:137` `--color-bg-subtle, rgba(0,0,0,0.05)` — 公式非定義 + 直書き rgba フォールバック(track は `--color-primitive-blue-100` が正)
- `:123`,`:141`,`:210`,`:213` `--color-brand-primary, #0017c1` — 公式非定義トークン
- `:217`,`:219` `--color-brand-secondary, #595959` — 公式非定義トークン
- `:222`,`:225` `--color-success, #00876f` / `:228-231` `--color-error, #ec0000` / `:234-237` `--color-warning, #c47600` — いずれも公式非定義トークン + 直書き hex フォールバック
- `:150` `--color-text-secondary, #4d4d4d` — 公式非定義トークン

## 結論

- **修正要否**: 要修正(全面再実装相当)。NotificationBanner と並んで Issue #18 で最も乖離が大きい。公式の SVG line / spinner(JS)アーキテクチャと type 体系を採用し直す必要がある。
- **優先度**: high
- **想定 changeset レベル**: **major**(`variant`/`size`/`color` prop を公式 `type`(stacked/inlined/stacked-underlay)+ `intent` 体系へ作り替えると public API が破壊的に変わるため)。
- **API/aria 不変を保てるか**: 困難。`role="progressbar"` + aria-valuemin/max/now は維持できるが、prop 体系(variant/size/color → type/intent)と DOM(div → SVG line)は大幅変更が必要。後方互換が要件なら旧 prop の deprecation 期間を設ける。

## T4 解消

Issue #18 / T4 (案X フル) で公式正準構造へ全面再実装し、上記 11 件の差異を解消した(MAJOR 破壊的変更)。

- **アーキテクチャ (#1, #4)**: linear を矩形 SVG `<line>`(track/bar/border の 3 本)に置換。spinner を `<g><g><circle></g></g>` ネスト + cubic-bezier 二重回転アニメに置換。非公式の `<circle>` リング(circular)は撤廃。
- **カラー (#2)**: 公式 `--color-primitive-blue-100`(track)/`--color-primitive-blue-1200`(bar・下線)単色系に統一。非定義トークン(`--color-brand-*`/`--color-success`/`--color-error`/`--color-warning`/`--color-secondary`/`--color-bg-subtle`/`--color-text-*`)を全廃。
- **バリアント体系 (#3)**: `type: stacked / inlined / stacked-underlay`(公式 `data-type`)を採用。非公式の `variant`(linear/circular)・`size`(sm/md/lg)public API を削除。`indicator: linear / spinner` で表示形態を選択。
- **下線アクセント (#5)**: linear に 1px `--color-primitive-blue-1200` の下線(`__border` line, y=3.5)を追加。
- **stacked-underlay コンテナ (#6)**: 1px `--color-neutral-solid-gray-500` ボーダー + 16px 角丸 + 白背景 + padding(linear=24 / spinner=16)+ min 128px を `:has()` で実装。
- **形状 (#7)**: 矩形 SVG line(`stroke-linecap:round` / radius-4 なし)。
- **タイポ (#8)**: root を `font-size:1rem` / `line-height:1.7` / `letter-spacing:0.02em` に。percentage span を `min-width:2ch` + `text-align:right` + `tabular-nums` に。
- **indeterminate アニメ (#9)**: 公式 keyframes(`dads-spinner-rotate`/`-group-rotate`/`-bar-rotate`/`-bar-dash` の cubic-bezier、`dads-linear-rotate`)を verbatim 移植。
- **active/intent モデル (#10)**: `active` prop(デフォルト true)+ `--inactive` 修飾クラスで `display:none` + `animation:none` を再現(公式 `:not([active])` 相当)。
- **forced-colors (#11)**: track=Canvas / bar・border=CanvasText に修正。circular 用ルールは撤廃。
- **値制御**: `--value` CSS 変数 + `stroke-dashoffset: calc(100 - clamp(...))` で公式と同じ value 駆動に。`aria-valuenow` は clamp + 整数丸め。可視 `label` 時は `aria-labelledby`、無いときは `ariaLabel`。

> 注: 公式 JS(`progress-indicator.js`)の live-region によるスクリーンリーダー読み上げ(announce/intent/long)は、Vue ラッパでは宣言的 prop に馴染まないため本 T4 では非対応(`active`/value/aria は対応)。必要なら別途 `intent` + visually-hidden status region の追加で拡張可能。`static`(休憩アイコン)フォームも今回の `indicator` 軸には含めていない(linear/spinner のみ)。
