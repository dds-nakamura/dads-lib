# Gap Report: `DadsButton`

> Issue #18 — DADS 公式とのビジュアル差異監査。1 コンポーネント 1 ファイル。

## メタ情報

| 項目 | 値 |
| ---- | ---- |
| Vue 実装 | `packages/vue/src/components/Button/DadsButton.vue` |
| 真実の源 (一次) | `example` |
| 参照パス | `design-system-example-components-html/src/components/button/button.css` / `button.mdx` |
| 総合判定 | ❌ 要修正 |
| 重大度 | high |
| 検出差異数 | 12 |

## 観点別チェック

| 観点 | 公式 (正準値) | `@dads/vue` 現状 | 判定 | 備考 / 修正方針 |
| ---- | ------------- | ----------------- | ---- | ---------------- |
| タイポグラフィ (font-family / size / weight / line-height) | `font-family: var(--font-family-sans)`; `font-weight: bold`; `line-height: 1`; `letter-spacing: 0.02em`; `text-underline-offset: 3/16rem`; size 別 font-size lg/md=16px・sm=継承16px・xs=14px (`button.css:14-20,187`) | `font-family: var(--font-family-sans, ...)`; `font-weight: 500`; `line-height: var(--line-height-150, 1.5)`; letter-spacing なし; font-size lg=18px・md=16px・sm=14px・xs=14px (`DadsButton.vue:130-132,141-163`) | ❌ | weight 公式 bold(700) vs 現状 500; line-height 公式 1 vs 1.5; letter-spacing 0.02em 欠落; lg/sm の font-size が公式(lg=16,sm=16)と不一致 |
| カラー (背景 / 文字 / ボーダー: トークン参照) | solid base `--color-primitive-blue-900`、hover `-blue-1000`、active `-blue-1200`; 文字 `--color-neutral-white`; outline hover bg `-blue-200`、active bg `-blue-300`; text hover bg `-blue-50`、active bg `-blue-100`; disabled `--color-neutral-solid-gray-300` / 文字 `-gray-50` (`button.css:2-6,28-141`) | solid base `--color-brand-primary`、hover `--color-brand-primary-hover`、active `--color-brand-primary-active`; 文字 `--color-text-on-primary, #fff`; outline/text hover bg `--color-info-bg`/`--color-bg-subtle` (`DadsButton.vue:88-119,201-251`) | ❌ | **使用セマンティックトークンが design-tokens に全く存在せず** 全てフォールバック直値 or 無効値で描画。公式の `--color-primitive-blue-*` / `--color-neutral-*` へ全面置換 |
| 角丸 (`--border-radius-*`) | サイズ別: lg/md `8/16rem`(8px)、sm `6/16rem`(6px)、xs `4/16rem`(4px) (`button.css:154,161,169,185`) | 全サイズ共通 `border-radius: var(--border-radius-4, 0.25rem)` (4px) (`DadsButton.vue:129`) | ❌ | 公式はサイズ依存(8/6/4px)。現状は一律 4px。`--border-radius-8`/`-6`/`-4` をサイズ別に適用 |
| スペーシング (padding / gap / margin: `--spacing-*`) | gap `4/16rem`(column-gap 4px); padding lg `12px 16px`・md `8px 16px`・sm `2px 12px`・xs `2px 8px`; min-width lg=136/md=96/sm=80/xs=72px (`button.css:10,155,162,170,186`) | gap `var(--spacing-8, 0.5rem)`(8px); padding lg `0 24px`・md `0 16px`・sm `0 12px`・xs `0 8px`; min-width 指定なし(min-height で代替) (`DadsButton.vue:128,143-162`) | ❌ | gap 公式 4px vs 8px; 縦 padding 公式あり(12/8/2px) vs 0; min-width 未実装; lg 横 padding 公式 16px vs 24px |
| エレベーション / 影 (`--elevation-*`) | 影なし (focus-visible の yellow box-shadow を除く) | 影なし | ✅ | 該当なし (ボタンは影を持たないのが正) |
| ボーダー (太さ / 色 / 有無) | solid: `4px double transparent`(focus 演出用); outline: `1px solid currentcolor`; text: `border 0` (`button.css:29,69,111`) | solid/text: ボーダー無し; outline: `1px solid var(#{$base})` (`DadsButton.vue:223`) | ⚠️ | solid の `4px double transparent` (レイアウト確保) が欠落。outline 色は currentcolor が望ましい |
| 状態 (hover / focus-visible / active / current / disabled / expanded) | focus-visible: `outline 4px solid --color-neutral-black` + `offset 2px` + `box-shadow 0 0 0 2px --color-primitive-yellow-300`; hover で下線(solid/outline)・text は下線太化; disabled solid `bg gray-300/文字 gray-50`、outline `白bg/文字 gray-300`、text `透明/文字 gray-300`; cursor `default` (`button.css:24,47-58,89-100,130-149`) | focus: 共有 mixin (黒 **2px** outline + offset **0** + 黄 **4px** box-shadow); hover で背景色変化のみ(下線無し、text のみ下線); disabled `opacity: 0.5` + `cursor: not-allowed` で一律処理 (`DadsButton.vue:122,193-198,211-250`, `_focus-ring.scss:9-13`) | ❌ | (1) focus outline 公式 4px vs 2px、offset 公式 2px vs 0、box-shadow 公式 2px vs 4px (2) hover の下線演出欠落 (3) disabled を opacity 0.5 で代替、公式の専用配色(gray-300/50)と不一致 (4) cursor 公式 default vs not-allowed |
| サイズバリアント (sm/md/lg 等) | lg/md/sm/xs の 4 段。min-width/min-height/border-radius/padding/font-size を個別定義。sm/xs は `::after` 擬似要素で 44px タップ領域を確保 (`button.css:151-196`) | lg/md/sm/xs の 4 段。min-height/padding/font-size のみ。`min-width` 無し、44px タップ確保の `::after` 無し (`DadsButton.vue:141-163`) | ❌ | 段数は一致するが min-width 欠落、sm/xs の 44px タップ領域確保(`::after`)未実装(MD アクセシビリティ要件)。寸法値も複数不一致 |
| forced-colors / ハイコントラスト | solid/outline/text の disabled 時に `border-color/color: GrayText` (`button.css:60-66,102-108,144-149`) | `dads-forced-colors` で `border: 1px solid CanvasText` (`DadsButton.vue:254-256`) | ⚠️ | 公式は disabled 時の GrayText 化。現状は全状態 1px CanvasText 枠。disabled の GrayText 指定を追加すべき |
| 正準CSSの流用 vs 独自実装 (ドリフト温床) | `data-type` / `data-size` 属性セレクタで variant/size を分岐。CSS 変数 `--button-color` 等でカラーを集約 (`button.css:1-6,28,151`) | `.dads-button--{variant}` / `--{size}` の BEM クラス + Sass `@each` でカラー生成。`data-*` でなくクラス命名。spinner/loading は独自追加 (`DadsButton.vue:22-31,201`) | ⚠️ | クラス命名規約は許容範囲だが、カラートークン参照が公式と完全乖離。spinner/loading は公式に無い独自機能(害は小) |

## 検出した差異 (修正対象)

1. **[high]** カラー: solid/outline/text の base・hover・active 全色が design-tokens に存在しない `--color-brand-primary*` / `--color-info-bg` / `--color-text-on-primary` / `--color-bg-subtle` を参照。公式 `--color-primitive-blue-900/1000/1200/200/300/50/100` + `--color-neutral-white` へ置換。
   - 該当行: `DadsButton.vue:89-118`, `:209`, `:221`, `:248`
2. **[high]** 角丸: 全サイズ一律 4px。公式はサイズ別 lg/md=8px・sm=6px・xs=4px。
   - 該当行: `DadsButton.vue:129`（共通指定を撤廃しサイズ別に移す）
3. **[high]** disabled 配色: 公式は solid=gray-300/文字 gray-50、outline=白/gray-300、text=透明/gray-300。現状は opacity 0.5 で一律。
   - 該当行: `DadsButton.vue:193-198`
4. **[high]** 状態(focus): 公式 outline 4px / offset 2px / box-shadow 2px → 現状 outline 2px / offset 0 / box-shadow 4px。
   - 該当行: `_focus-ring.scss:9-13`
5. **[medium]** スペーシング: gap 公式 4px → 現状 8px; 縦 padding 公式 12/8/2px → 現状 0; lg 横 padding 公式 16px → 現状 24px; min-width(136/96/80/72px) 欠落。
   - 該当行: `DadsButton.vue:128,143-162`
6. **[medium]** サイズ別タップ領域: sm/xs の `::after` 44px タップ領域確保が未実装(MD「44 CSS px 以上」要件)。
   - 該当行: `DadsButton.vue:153-163`
7. **[medium]** タイポ: font-weight 公式 bold(700) → 現状 500; line-height 公式 1 → 1.5; letter-spacing 0.02em 欠落; lg font-size 公式 16px → 18px、sm 公式 16px → 14px。
   - 該当行: `DadsButton.vue:130-132,144,156`
8. **[medium]** hover 演出: 公式は solid/outline で `text-decoration: underline`、text で下線太化。現状は背景色変化のみ。
   - 該当行: `DadsButton.vue:211-245`
9. **[low]** solid のボーダー: 公式 `4px double transparent`(レイアウト確保) が欠落。
   - 該当行: `DadsButton.vue:207-218`
10. **[low]** cursor: 公式 disabled `default` → 現状 `not-allowed`。
   - 該当行: `DadsButton.vue:195`
11. **[low]** forced-colors: 公式は disabled 時のみ GrayText。現状は全状態 CanvasText 1px 枠。
   - 該当行: `DadsButton.vue:254-256`
12. **[low]** カラー `success/error/warning/secondary`: 公式 button には semantic color バリアントが存在しない(blue 単色)。`--color-success`/`--color-error`/`--color-warning` 等も design-tokens 未定義。公式に無い独自 API。
   - 該当行: `DadsButton.vue:95-118`

## ハードコード / 誤トークンの洗い出し

- **誤トークン (design-tokens に存在しない → フォールバック直値で描画)**: `--color-brand-primary` / `-hover` / `-active` (`:90-92`)、`--color-info-bg` (`:93`)、`--color-success`/`--color-semantic-success-2`/`--color-success-bg` (`:96-99`)、`--color-error`/`--color-semantic-error-2`/`--color-error-bg` (`:102-105`)、`--color-warning`/`--color-semantic-warning-orange-2`/`--color-warning-bg` (`:108-111`)、`--color-brand-secondary`/`--color-bg-subtle` (`:114,118`)、`--color-text-on-primary, #fff` (`:209`)
- **font-weight 直値** `500` (`:131`、公式は bold)
- **マジックナンバー**: `min-height: 3.5rem/2.5rem/2rem/1.75rem` (`:142,148,154,160`、トークン外の独自値)、`transition 0.15s` (`:135-138`)、spinner `border: 2px solid` (`:179`)
- 許容: `var(--spacing-8, 0.5rem)` 等のフォールバック直値は規約上 OK だが、上記の存在しないトークンは「フォールバックでしか描画されない」ため実質ハードコードと同義

## 結論

- 修正要否: **要修正 (high)**。カラートークンが design-tokens に一切存在せず、公式の `--color-primitive-blue-*` 体系から完全に乖離。角丸のサイズ依存・disabled 配色・focus ring 寸法・44px タップ領域も不一致。
- 優先度: 高。Button は他コンポーネント(Card 等)の依存部品でもあり、ドリフトの波及が大きい。
- 想定 changeset レベル: **minor**。カラー/角丸/状態/スペーシングの内部 CSS 修正が主で公開 props は維持できるが、`success/error/warning/secondary` color API は公式に無いため deprecate するなら API 変更で minor〜major。
- API/aria 不変: 内部 CSS とトークン置換のみなら props/aria 維持可。`color` バリアントの整理を行う場合のみ公開 API に影響。
