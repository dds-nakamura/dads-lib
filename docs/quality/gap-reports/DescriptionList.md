# Gap Report: `DadsDescriptionList`

> Issue #18 — DADS 公式とのビジュアル差異監査。1 コンポーネント 1 ファイル。

## メタ情報

| 項目 | 値 |
| ---- | ---- |
| Vue 実装 | `packages/vue/src/components/DescriptionList/DadsDescriptionList.vue` |
| 真実の源 (一次) | `example` |
| 参照パス | `design-system-example-components-html/src/components/description-list/description-list.css` / `playground.html` |
| 総合判定 | ❌ 要修正 |
| 重大度 | high |
| 検出差異数 | 6 |

## 観点別チェック

| 観点 | 公式 (正準値) | `@dads/vue` 現状 | 判定 | 備考 / 修正方針 |
| ---- | ------------- | ----------------- | ---- | ---------------- |
| タイポグラフィ (font-family / size / weight / line-height) | dt `font-weight: bold`。ルートに font-family/size/line-height 指定なし(global.css 継承) (description-list.css:9-11) | `font-family: var(--font-family-sans, ...)`, `font-size: var(--font-size-16, 1rem)`, `line-height: var(--line-height-150, 1.5)`, dt `font-weight: 700` (vue:43-46,52) | ⚠️ | dt の weight は `700`≒`bold` で実質一致。ただし公式 CSS はルートに font-family/size/line-height を**持たない**(global 継承)。Vue は独自にルートへ追加しており、コンポーネント単体で挙動が変わる(過剰指定)。`line-height: 1.5` も公式の global 値(1.7想定)とズレる懸念。 |
| カラー (背景 / 文字 / ボーダー: トークン参照) | 公式 CSS に color 指定なし(継承)。bordered/区切り線の定義も**公式 CSS に存在しない** | ルート `color: var(--color-text-primary, #1a1a1a)`、bordered `border-bottom: 1px solid var(--color-border-default, rgba(0,0,0,0.12))` (vue:44,130) | ❌ | 公式は color 未指定。`--color-border-default` は DADS 正準トークン名でない(独自)。bordered 機能自体が公式に無い独自拡張。 |
| 角丸 (`--border-radius-*`) | 公式・Vue ともに角丸なし | なし | ✅ | 該当なし(両者とも角丸を使わない)。 |
| スペーシング (padding / gap / margin: `--spacing-*`) | ルート `margin: 16px 0`、`gap: calc(8/16*1rem) 0`(=8px)、dd `margin-left: calc(32/16*1rem)`(=32px)、bullet dt `margin-left: 32px`、custom span `min-width: 32px` (css:1-26) | ルート `margin: var(--spacing-16,1rem) 0`、vertical `gap: var(--spacing-8,.5rem)`、vertical dd `margin-left: var(--spacing-32,2rem)`、horizontal `gap: var(--spacing-12,.75rem)` + 2 列 grid (vue:42,82,89,99,103) | ❌ | 公式は**単一の縦積み grid(gap 8px, dd を 32px インデント)**のみ。Vue は `horizontal`(2列 grid, gap 12px) と `vertical` の 2 レイアウトに分岐し、horizontal が**デフォルト**。公式の唯一のレイアウトは Vue の `vertical` に近いが gap が 8px vs Vue の 8px(vertical)で一致する一方、デフォルトが別物。 |
| エレベーション / 影 (`--elevation-*`) | なし | なし | ✅ | 該当なし。 |
| ボーダー (太さ / 色 / 有無) | 公式 CSS にボーダー定義なし | `--bordered` で `border-bottom: 1px solid` を各 item に付与 (vue:127-137) | ❌ | bordered は公式に存在しない独自機能。トークン `--color-border-default` も非正準。 |
| 状態 (hover / focus-visible / active / current / disabled / expanded) | 公式・Vue ともに状態スタイルなし(静的な説明リスト) | なし | ✅ | 該当なし(インタラクティブ要素を持たないコンポーネント)。 |
| サイズバリアント (sm/md/lg 等) | 公式にサイズ variant なし | なし(layout/marker/bordered のみ) | ✅ | 該当なし。 |
| forced-colors / ハイコントラスト | 公式 CSS に forced-colors 定義なし | `--bordered` の border-bottom-color を `CanvasText` 化 (vue:140-144) | ✅ | Vue 側が独自 bordered 用に追加。公式に該当規則は無いが害なし。 |
| 正準CSSの流用 vs 独自実装 (ドリフト温床) | 公式は **dt/dd を直接スタイル**(`__item` ラッパへの CSS 無し)。`data-marker="bullet"/"custom"` のみ DOM フック。単一 grid (css 全 26 行) | Vue は `__item` ラッパに display 制御、`--horizontal`/`--vertical`/`--bordered` 修飾、horizontal デフォルトの 2 列 grid を**独自に増築**。`data-marker` は踏襲 (vue:17-23,80-137) | ❌ | **最重要ドリフト**: 公式は 26 行の最小 CSS(単一縦積み)。Vue は horizontal 2 列レイアウト/bordered/vertical という公式に無い構造を主機能として実装。デフォルト見た目(horizontal 2列)が公式(縦積み + dd 32px インデント)と完全に別物。 |

## 検出した差異 (修正対象)

1. **[high]** 正準CSS流用 / レイアウト: デフォルト `horizontal`(2列 grid) が公式の単一縦積み(dt → dd を 32px インデント)と別物。公式は `display: grid; gap: 8px 0; dd{margin-left:32px}` のみ。
   - 該当行: `DadsDescriptionList.vue:97-122`（horizontal が公式に存在しない構造）, デフォルト `layout: 'horizontal'`
2. **[high]** 独自機能: `bordered` variant は公式 CSS に存在しない。区切り線 `border-bottom` を独自追加。
   - 該当行: `DadsDescriptionList.vue:124-137`
3. **[medium]** カラー: `--color-border-default` は DADS 正準トークン名でない(独自命名)。公式トークン体系に存在しない。
   - 該当行: `DadsDescriptionList.vue:130`
4. **[medium]** タイポグラフィ: ルートに font-family/font-size/line-height を独自付与。公式 CSS は global 継承で未指定。`line-height: 1.5` は公式 global の 1.7 とズレる可能性。
   - 該当行: `DadsDescriptionList.vue:43-46`
5. **[low]** カラー: ルート `color: var(--color-text-primary, #1a1a1a)` を独自付与。公式 CSS は color 未指定(継承)。
   - 該当行: `DadsDescriptionList.vue:44`
6. **[low]** スペーシング: 公式の唯一のレイアウト(縦積み)は `gap: 8px / dd margin-left: 32px`。Vue の `vertical` は一致するが、これがデフォルトでないため公式の標準形が選ばれない。
   - 該当行: `DadsDescriptionList.vue:80-91` (vertical=公式相当だが非デフォルト)

## ハードコード / 誤トークンの洗い出し

- 誤トークン `var(--color-border-default, rgba(0, 0, 0, 0.12))`（DADS 正準名でない / フォールバックも `rgba` 直値）— `DadsDescriptionList.vue:130`
- フォールバック直値 `#1a1a1a`（`var(--color-text-primary, #1a1a1a)` のフォールバック → 許容範囲だが、そもそも公式は color 未指定）— `DadsDescriptionList.vue:44`
- 注: `--spacing-*` / `--font-size-*` / `--line-height-*` 系はトークン参照 + 数値フォールバックで許容。

## 結論

- **修正要**: 優先度 **中〜高**。公式は極めて単純な縦積みリストだが、Vue 版はデフォルトを独自の 2 列 horizontal にしており、公式の標準見た目を再現していない。
- 想定 changeset レベル: **minor**（デフォルト layout を公式相当(縦積み)へ寄せる、または公式に無い horizontal/bordered の扱いを整理すると見た目とデフォルト挙動が変わる。`--color-border-default` の正準トークン置換も含む）。
- API / aria: bordered/horizontal を維持したまま CSS を公式に寄せるなら API 不変。デフォルト layout を変更する場合は **破壊的変更**になりうるため、移行時は要注意(その場合 major 検討)。aria(`<dl>/<dt>/<dd>` セマンティクス)は不変。
