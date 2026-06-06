# Gap Report: `DadsCard`

> Issue #18 — DADS 公式とのビジュアル差異監査。1 コンポーネント 1 ファイル。

## メタ情報

| 項目 | 値 |
| ---- | ---- |
| Vue 実装 | `packages/vue/src/components/Card/DadsCard.vue` |
| 真実の源 (一次) | `example` |
| 参照パス | `design-system-example-components-html/src/components/card/card-example-1..6.css` / `example-1.html` / `card.mdx` |
| 総合判定 | ❌ 要修正 |
| 重大度 | high |
| 検出差異数 | 11 |

## 観点別チェック

| 観点 | 公式 (正準値) | `@dads/vue` 現状 | 判定 | 備考 / 修正方針 |
| ---- | ------------- | ----------------- | ---- | ---------------- |
| タイポグラフィ (font-family / size / weight / line-height) | `font-family: var(--font-family-sans)`; タイトル h2 `font-size: 20/16rem`・`font-weight: bold`・`line-height: 1.5`・`letter-spacing: 0.02em`・`text-decoration: underline`; 本文 p `16px`・`normal`・`line-height: 1.7` (`card-example-1.css:24,78-105`) | `font-family: var(--font-family-sans, ...)`; header `font-weight: 700` のみ。本文/タイトルの font-size・line-height・letter-spacing・タイトル下線 いずれも未指定(継承) (`DadsCard.vue:75,174`) | ❌ | タイトル(20px/bold/下線)・本文(16px/1.7)の type 指定が欠落。letter-spacing 0.02em も無し。公式値を適用 |
| カラー (背景 / 文字 / ボーダー: トークン参照) | bg `--color-neutral-white`; border `--color-neutral-solid-gray-420`(#949494); タイトル文字 `--color-neutral-solid-gray-900`; 本文文字 `--color-neutral-solid-gray-800`; focus 黄 `--color-primitive-yellow-300`・黒 `--color-neutral-black` (`card-example-1.css:30,40,72,81,100,33`) | bg `--color-bg-surface, #fff`; 文字 `--color-text-primary, #1a1a1a`; outlined border `--color-border-strong, rgba(0,0,0,0.24)`; filled bg `--color-bg-subtle`; divider `--color-border-divider, #e5e5e5`; clickable hover border `--color-brand-primary, #1976d2` (`DadsCard.vue:73-92,151,173`) | ❌ | **使用セマンティックトークンが design-tokens に全く存在せず** 全てフォールバック直値で描画。公式の `--color-neutral-*` / `--color-primitive-*` へ全面置換。特に `#1976d2`(Material 由来) は公式 blue と無関係 |
| 角丸 (`--border-radius-*`) | メインエリア `16/16rem`(16px); イメージエリア上 2 角 `16px 16px 0 0`; focus-visible 時 `16px` (`card-example-1.css:32,41,73`) | `border-radius: var(--border-radius-8, 0.5rem)`(8px); image 上 2 角も 8px (`DadsCard.vue:74,161-162`) | ❌ | 公式 16px (`--border-radius-16`) に対し現状 8px。4px/8px 取り違え系の段違い。`--border-radius-16` へ |
| スペーシング (padding / gap / margin: `--spacing-*`) | メインエリア padding `16px 24px`; 内部 row-gap `16/16rem`; リスト gap `24/16rem`; main が image に `-24/16rem` margin-top で重なる (`card-example-1.css:5,68-75`) | header/body/footer padding `var(--spacing-16, 1rem)`(=16px 全方向); sub `0 16px 12px`; footer gap `var(--spacing-8)`(8px) (`DadsCard.vue:172,180-196`) | ⚠️ | 縦16/横24px の非対称 padding が一律16pxに。内部 row-gap 16px・image との -24px 重ね(公式の作例1特徴)が未実装。ただし汎用スロット設計のため許容余地あり |
| エレベーション / 影 (`--elevation-*`) | 作例1(outlined link card)は影なし。MD「コンテナはエレベーションを持つことができる」(任意) (`card.md:62-64`) | `elevated` variant + `elevation 1-8` で `--elevation-{n}` を box-shadow に適用。各段に直値フォールバック (`DadsCard.vue:98-121`) | ⚠️ | `--elevation-1..8` トークン自体は design-tokens に存在(EXISTS)。ただし各フォールバック直値 `0 1px 2px rgba(0,0,0,0.08)` 等は公式値と無関係の推定値。トークンが効けば実害小 |
| ボーダー (太さ / 色 / 有無) | `1px solid --color-neutral-solid-gray-420`(コンテナ・メインエリア両方)。MD「コンテナに必ず視認できるボーダー」「3:1 以上コントラスト」 (`card-example-1.css:40,72`; `card.md:50-53`) | outlined: `1px solid --color-border-strong`(存在せず rgba(0,0,0,0.24) で描画); filled/elevated: `1px solid transparent`(枠なし) (`DadsCard.vue:79,83) | ❌ | filled/elevated でコンテナ枠が透明 → MD「必ず視認できるボーダー」違反。色トークンも誤り(gray-420 が正)。透明枠の上に variant 別に色付与する設計に |
| 状態 (hover / focus-visible / active / current / disabled / expanded) | リンクカード: focus-visible `outline 4px 黒 + offset 2px + border-radius 16px + box-shadow 0 0 0 2px yellow-300`; hover でタイトル下線太化 `1px→3px` (`card-example-1.css:29-34,91-95`) | clickable: 共有 mixin (黒 2px outline + offset 0 + 黄 4px box-shadow、角丸無し); hover `bg --color-bg-hover`; active `translateY(1px)`; outlined hover `border blue + inset box-shadow 2px` (`DadsCard.vue:124-153`, `_focus-ring.scss:9-13`) | ❌ | (1) focus outline 公式 4px vs 2px、offset 公式 2px vs 0、角丸 16px 欠落、box-shadow 公式 2px vs 4px (2) 公式の hover はタイトル下線太化(背景変化でない) (3) `translateY`・inset 青枠は公式に無い独自演出 |
| サイズバリアント (sm/md/lg 等) | 公式カードにサイズ prop は無い。固定 `width: 352px; max-width: 100%`(作例1) (`card-example-1.css:22-23`) | サイズ prop 無し(variant: outlined/filled/elevated, elevation 1-8 のみ) (`DadsCard.types.ts:20-29`) | ✅ | サイズ API 無しは公式と整合。variant 体系は @dads/vue 独自抽象だが妥当 |
| forced-colors / ハイコントラスト | 公式 CSS に forced-colors 専用指定なし | `dads-forced-colors` で border / header / footer を CanvasText 化 (`DadsCard.vue:215-222`) | ⚠️ | 公式より手厚いが害なし。維持可 |
| 正準CSSの流用 vs 独自実装 (ドリフト温床) | 作例1: `<a>` 全体リンク + `__image`(グラデ背景+SVG) + `__main`(image に重なるカード本体)。作例 2-6 は grid/order/subgrid/checkbox label など作例毎に構造が異なる。Button/checkbox/link を依存部品として import (`card.mdx:10-12,75-85`) | 汎用 `<div>/<button>` + image/header/body/sub/footer の 5 スロット BEM 構造。公式作例のいずれの DOM 構造とも一致しない独自抽象。Button 等の共有部品 import 無し (`DadsCard.vue:39-64`) | ❌ | 公式は「6 作例の具体パターン」、@dads/vue は「汎用スロット 1 種」。設計思想の差。`__main` が image に重なる作例1の視覚特徴・grid/subgrid 等は再現不可。最重要ドリフト |

## 検出した差異 (修正対象)

1. **[high]** カラー: bg/文字/border 全色が design-tokens 未定義の `--color-bg-surface` / `--color-text-primary` / `--color-border-strong` / `--color-bg-subtle` / `--color-border-divider` / `--color-brand-primary` を参照。公式 `--color-neutral-white` / `-solid-gray-900` / `-800` / `-420` へ置換。`#1976d2` は公式 blue と無関係。
   - 該当行: `DadsCard.vue:73,75,83,90,151,173,181,191`
2. **[high]** 角丸: 公式 16px(`--border-radius-16`) → 現状 8px(`--border-radius-8`)。
   - 該当行: `DadsCard.vue:74,161-162`
3. **[high]** ボーダー: filled/elevated で `1px solid transparent`(枠透明)。MD「コンテナに必ず視認できるボーダー」要件違反。
   - 該当行: `DadsCard.vue:79,83,89`
4. **[high]** 正準CSS流用: 公式 6 作例(全体 `<a>`/grid/subgrid/checkbox label)を汎用 5 スロット BEM で独自抽象化。作例1の `__main` overlap 等の視覚特徴を再現できず。
   - 該当行: `DadsCard.vue:39-64`
5. **[medium]** 状態(focus): 公式 outline 4px/offset 2px/角丸 16px/box-shadow 2px → 現状 2px/0/角丸無し/4px。
   - 該当行: `_focus-ring.scss:9-13`
6. **[medium]** hover: 公式はタイトル下線 1px→3px 太化。現状は背景色変化 + translateY + inset 青枠(公式に無い)。
   - 該当行: `DadsCard.vue:136-153`
7. **[medium]** タイポ: タイトル(20px/bold/下線/0.02em)・本文(16px/line-height 1.7) の type 指定欠落。
   - 該当行: `DadsCard.vue:75,174`
8. **[low]** スペーシング: 公式メインエリア `16px 24px`(縦横非対称) → 現状一律 16px。内部 row-gap 16px 欠落。
   - 該当行: `DadsCard.vue:172,185`
9. **[low]** エレベーション フォールバック値: `0 1px 2px rgba(0,0,0,0.08)` 等は公式と無関係の推定値。トークン名は正(存在する)。
   - 該当行: `DadsCard.vue:99-120`
10. **[low]** clickable active `translateY(1px)`: 公式カードに沈み込み演出は無い。
   - 該当行: `DadsCard.vue:141`
11. **[low]** clickable outlined hover の inset 青枠: 公式に無い独自演出。
   - 該当行: `DadsCard.vue:150-153`

## ハードコード / 誤トークンの洗い出し

- **誤トークン (design-tokens に存在しない → フォールバック直値で描画)**: `--color-bg-surface, #fff` (`:73`)、`--color-text-primary, #1a1a1a` (`:75`)、`--color-border-strong, rgba(0,0,0,0.24)` (`:83`)、`--color-bg-subtle, rgba(0,0,0,0.05)` (`:90`)、`--color-bg-hover, rgba(0,0,0,0.04)` (`:137`)、`--color-brand-primary, #1976d2` (`:151,152`)、`--color-border-divider, #e5e5e5` (`:173,181,191`)
- **エレベーション直値フォールバック (公式と無関係の推定値)**: `0 1px 2px rgba(0,0,0,0.08)` 〜 `0 12px 24px rgba(0,0,0,0.24)` (`:99-120`)
- **マジックナンバー**: `transform: translateY(1px)` (`:141`)、`box-shadow: inset 0 0 0 2px` (`:152`)、`transition 0.15s` (`:84,130-134`)、`@media (max-width: 599px)` (`:204`、トークン外ブレークポイント)
- **font-weight 直値** `700` (`:174`)

## 結論

- 修正要否: **要修正 (high)**。色トークンが design-tokens に存在せず公式 `--color-neutral-*` 体系から乖離、角丸が 16px→8px と段違い、filled/elevated でコンテナ枠が透明になり MD のボーダー必須要件に違反。
- 優先度: 高。ただし「公式 6 作例 vs 汎用スロット」という設計思想の差があり、完全一致には作例別コンポーネント化の検討が必要。まずは色/角丸/ボーダー/focus の数値ドリフトを是正。
- 想定 changeset レベル: **patch〜minor**。色/角丸/focus のトークン置換のみなら patch。filled/elevated の枠必須化(視覚変化)やタイトル下線追加は minor。作例別構造への刷新を行う場合のみ major。
- API/aria 不変: トークン置換と CSS 数値修正のみなら props(`variant`/`elevation`/`clickable`/`ariaLabel`)/aria は維持可。
