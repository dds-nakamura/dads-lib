# Gap Report: `DadsChipLabel`

> Issue #18 — DADS 公式とのビジュアル差異監査。1 コンポーネント 1 ファイル。

## メタ情報

| 項目 | 値 |
| ---- | ---- |
| Vue 実装 | `packages/vue/src/components/ChipLabel/DadsChipLabel.vue` |
| 真実の源 (一次) | `example`（MD は「ガイドライン準備中」のため CSS が正準） |
| 参照パス | `design-system-example-components-html/src/components/chip-label/chip-label.css` / `playground.html` |
| 総合判定 | ❌ 要修正 |
| 重大度 | high |
| 検出差異数 | 9 |

## 観点別チェック

| 観点 | 公式 (正準値) | `@dads/vue` 現状 | 判定 | 備考 / 修正方針 |
| ---- | ------------- | ----------------- | ---- | ---------------- |
| タイポグラフィ (font-family / size / weight / line-height) | `font-family:var(--font-family-sans)`; `font-weight:normal`; `font-size:calc(16/16*1rem)`=16px 固定; `line-height:1`; `letter-spacing:0.02em` (`chip-label.css:11-15`) | `font-family:var(--font-family-sans)`; `font-weight:500`; `line-height:var(--line-height-150,1.5)`; サイズ別 lg16/md14/sm12px; letter-spacing 指定なし (`DadsChipLabel.vue:68-91`) | ❌ | 公式は単一 16px・normal・line-height:1・letter-spacing:0.02em。Vue は太字 500・1.5・サイズ別フォント・letter-spacing 欠落。全項目要修正 |
| カラー (背景 / 文字 / ボーダー: トークン参照) | `data-color` × `data-style` で `--color-primitive-{hue}-{50/700/800/900/1000/1100}` を 12 色相 (`gray/blue/light-blue/cyan/green/lime/yellow/orange/red/magenta/purple`) 定義 (`chip-label.css:40-115`) | `color` prop = semantic 5 種 (`primary/success/error/warning/secondary`) に `--color-brand-primary`/`--color-info-bg`/`--color-success(-bg)`/`--color-error(-bg)`/`--color-warning(-bg)`/`--color-brand-secondary`/`--color-bg-subtle` (`DadsChipLabel.vue:39-60,108-125`) | ❌ | **色軸が完全に別物。公式は 12 primitive 色相、Vue は 5 semantic。参照トークンは design-tokens に不在（直値フォールバック）。公式 primitive 色相セットへ全面置換** |
| 角丸 (`--border-radius-*`) | `border-radius:calc(8/16*1rem)`=8px (`chip-label.css:8`) | `border-radius:var(--border-radius-pill,999px)`=ピル形 (`DadsChipLabel.vue:66`) | ❌ | **公式は 8px 角丸の矩形。Vue はピル形（999px）。さらに `--border-radius-pill` は不在（正は `--border-radius-8` または `--border-radius-full`）。8px 矩形へ修正** |
| スペーシング (padding / gap / margin: `--spacing-*`) | base `padding:calc(3/16*1rem) calc(7/16*1rem)`=3px 7px; `data-style=text` は 4px 8px; アイコン余白 `margin-right:calc(4/16*1rem)` (`chip-label.css:9,19,123`) | サイズ別 padding `0 var(--spacing-12/8/8)`; gap `var(--spacing-4,.25rem)` (`DadsChipLabel.vue:65,77,84,89`) | ❌ | 公式は縦横 padding (3/7px) で `min-height` 32px に内寄せ。Vue は縦 padding 0 + `min-height`。`--spacing-*` も不在。公式 padding 値へ |
| エレベーション / 影 (`--elevation-*`) | 該当なし（影なし） | 該当なし（影なし） | ✅ | 一致 |
| ボーダー (太さ / 色 / 有無) | style 別: text=枠なし / outline=`1px solid --_non-text` / filled-outline=`1px solid --_non-text` / fill=`1px solid transparent` (`chip-label.css:18-38`) | `border:1px solid transparent` 基本、filled/outlined で `border-color:var(base)` (`DadsChipLabel.vue:67,116,123`) | ⚠️ | 1px は一致。ただし公式 4 スタイル (text/outline/filled-outline/fill) に対し Vue 2 スタイル (filled/outlined)。スタイル軸が縮退 |
| 状態 (hover / focus-visible / active / current / disabled / expanded) | 非インタラクティブ表示専用。状態スタイルなし (`chip-label.css` 全体) | 非インタラクティブ。状態スタイルなし (`DadsChipLabel.vue` 全体) | ✅ | 該当なし（公式・Vue とも状態なし）。一致 |
| サイズバリアント (sm/md/lg 等) | **サイズバリアントなし**。`min-height:32px` 単一 (`chip-label.css:7`) | sm/md/lg 3 段（min-height 24/28/32px、font 12/14/16px） (`DadsChipLabel.vue:75-91`) | ❌ | **公式にサイズ軸は存在しない。Vue が独自に 3 サイズを発明。** 公式準拠なら単一サイズ。`size` prop は仕様外 |
| forced-colors / ハイコントラスト | アイコンを `fill:CanvasText` (`chip-label.css:128-132`) | `border:1px solid CanvasText` (`DadsChipLabel.vue:128-130`) | ⚠️ | 方向性可。公式はアイコン fill 中心、Vue は枠線。要整合 |
| 正準CSSの流用 vs 独自実装 (ドリフト温床) | `data-style`(4)×`data-color`(12) のマトリクスを CSS 変数 (`--_non-text/--_bg/--_text/--_text-dark`) で構築。アイコンは `.dads-chip-label__icon` + 1cap 基準の光学整列 (`chip-label.css:1-137`) | `color`(5 semantic)×`appearance`(2) を SCSS `@each` で生成。アイコンは `prepend`/`append` slot を `font-size:1.1em` で配置 (`DadsChipLabel.vue:38-125`) | ❌ | **公式の data 属性 API・色相セット・style セット・アイコン整列をすべて独自設計に置換。クラス命名 `dads-chip-label` は共通だが内部 API は別物。ドリフト温床** |

## 検出した差異 (修正対象)

1. **[high]** 角丸: 公式 8px 矩形 → 現状ピル形 (`--border-radius-pill,999px`)。`--border-radius-pill` は design-tokens 不在（正 `--border-radius-8`）。8px へ修正。
   - 該当行: `DadsChipLabel.vue:66`
2. **[high]** カラー軸: 公式 12 primitive 色相 (`--color-primitive-*`) → 現状 5 semantic（`--color-brand-primary` 等、いずれも不在トークン）。色相セットを公式準拠へ。
   - 該当行: `DadsChipLabel.vue:39-60,108-125`
3. **[high]** サイズ: 公式はサイズ軸なし（単一 32px）→ 現状 sm/md/lg を独自発明。`size` prop は仕様外。
   - 該当行: `DadsChipLabel.vue:75-91`, `DadsChipLabel.types.ts:17,30`
4. **[high]** style 軸: 公式 4 種 (text/outline/filled-outline/fill) → 現状 2 種 (filled/outlined)。`fill`(塗りつぶし+白文字)・`filled-outline` が欠落。
   - 該当行: `DadsChipLabel.vue:113-124`, `DadsChipLabel.types.ts:26`
5. **[medium]** タイポ: 公式 16px/normal/line-height:1/letter-spacing:0.02em → 現状 太字 500・1.5・サイズ別・letter-spacing 欠落。
   - 該当行: `DadsChipLabel.vue:69-70,78,85,90`
6. **[medium]** スペーシング: 公式 padding 3px 7px（text は 4px 8px）→ 現状 縦 0 + min-height、`--spacing-*` 不在。
   - 該当行: `DadsChipLabel.vue:65,77,84,89`
7. **[medium]** アイコン整列: 公式は `.dads-chip-label__icon` を 1cap 基準で光学整列＋`fill:currentcolor` → 現状 `prepend`/`append` slot を `1.1em` 配置。公式アイコン仕様へ。
   - 該当行: `DadsChipLabel.vue:21-29,94-100`
8. **[low]** forced-colors: 公式アイコン `fill:CanvasText` → 現状 枠線 `CanvasText`。整合。
   - 該当行: `DadsChipLabel.vue:128-130`
9. **[low]** font-weight: `500` は `--font-weight-*`(400/700) 非トークン値。公式 normal(400)。
   - 該当行: `DadsChipLabel.vue:69`

## ハードコード / 誤トークンの洗い出し

- 誤トークン（design-tokens 不在 = 直値フォールバック / 該当なしで未描画）:
  - `--border-radius-pill,999px` (`:66`)：**`pill` トークンは存在しない**（正 `--border-radius-8`）
  - `--color-brand-primary` (`:41`)、`--color-info-bg` (`:42`)、`--color-success`/`--color-success-bg` (`:45-46`)、`--color-error`/`--color-error-bg` (`:49-50`)、`--color-warning`/`--color-warning-bg` (`:53-54`)、`--color-brand-secondary` (`:57`)、`--color-bg-subtle` (`:58`)：全て design-tokens 不在
  - `--spacing-4` (`:65`)、`--spacing-8` (`:84,89`)、`--spacing-12` (`:77`)：spacing 系 0 件
  - `--font-size-12,0.75rem` (`:90`)：**`--font-size-12` は不在**（最小 14）
- 直書き（var なし）:
  - `font-weight:500` (`:69`)、`min-height:2rem/1.75rem/1.5rem` (`:76,82,88`)、`font-size:1.1em`/`line-height:1` (`:98-99`)、`border:1px solid transparent` (`:67`)

## 結論

- **修正要否: 要修正 (high)。** 角丸（ピル→8px 矩形）・色軸（5 semantic→12 primitive）・サイズ軸（独自発明→撤廃）・style 軸（2→4）すべてが公式と乖離。`--border-radius-pill`・`--font-size-12`・各 semantic 色・`--spacing-*` は実在しないトークン参照。
- **優先度: 高。** 表示専用部品だが API（color/size/appearance）が公式と根本的に異なり、利用側コードへ波及。
- **想定 changeset: major**（公式準拠化で props を `color`(12 色相)/`style`(4 種) へ再設計、`size` 撤廃が必要となり破壊的変更）。トークン置換のみの暫定対応なら minor。
- **API/aria 不変: 不可（公式準拠を選ぶ場合）。** 非インタラクティブ・`aria-hidden` アイコンの方針は維持できるが、props 体系（color 値集合・size 廃止・appearance→style）の破壊的変更が避けられない。
