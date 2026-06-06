# Gap Report: `DadsTable`

> Issue #18 — DADS 公式とのビジュアル差異監査。1 コンポーネント 1 ファイル。

## メタ情報

| 項目 | 値 |
| ---- | ---- |
| Vue 実装 | `packages/vue/src/components/Table/DadsTable.vue` |
| 真実の源 (一次) | `example` |
| 参照パス | `design-system-example-components-html/src/components/table/table.css` + `table.css` 内 `plain.html` / `stripe-table.html` / `highlight-hovered-row.html` / `condensed-table.html` / `selectable-table.html` / `sortable-header.html` |
| 総合判定 | ❌ 要修正 |
| 重大度 | high |
| 検出差異数 | 11 |

公式トークンは `design-tokens/examples/tokens.css` で実在を確認済み。Vue が参照する `--color-text-primary` / `--color-bg-subtle` / `--color-border-default` 等は **tokens.css に 1 件も定義が無く**、すべて var() のフォールバック直値で描画される（= トークン非連動）。

## 観点別チェック

| 観点 | 公式 (正準値) | `@dads/vue` 現状 | 判定 | 備考 / 修正方針 |
| ---- | ------------- | ----------------- | ---- | ---------------- |
| タイポグラフィ (font-family / size / weight / line-height) | `font-family: var(--font-family-sans)`, `font-size: 1rem` (16/16), `line-height: 1.7` (`--line-height-170`), `font-weight: normal`, `letter-spacing: 0.02em`。caption は `font-weight: bold` + `font-size: calc(17/16*1rem)` (`--font-size-17`)。dense 時 `line-height: 1.3`(`--line-height-130`) | `font-family: var(--font-family-sans,…)`, `font-size: var(--font-size-16)`, `line-height: var(--line-height-150,1.5)`, th `font-weight:700` td 既定。caption `font-size: var(--font-size-14,0.875rem)` + secondary 色。`letter-spacing` 指定なし | ❌ | line-height 1.5→**1.7** (`--line-height-170`)、letter-spacing 0.02em 欠落、caption は 17px/bold が正。compact の line-height 1.3 化も欠落 |
| カラー (背景 / 文字 / ボーダー: トークン参照) | 本文 `--color-neutral-solid-gray-800` (#333)、列/行ヘッダ文字 `--color-neutral-solid-gray-900`、ヘッダ背景 `--color-neutral-solid-gray-100` (#e6e6e6)、セルボーダー `--_border-color` 既定 `--color-neutral-solid-gray-420`、ヘッダ有り時 `-500`、stripe even `--color-neutral-solid-gray-50` | 本文 `--color-text-primary,#1a1a1a`(=900 相当)、thead 背景 `--color-bg-subtle, rgba(0,0,0,0.05)`、ボーダー `--color-border-default, rgba(0,0,0,0.12)`、stripe even `--color-bg-hover, rgba(0,0,0,0.04)`。**いずれのトークンも tokens.css に未定義** | ❌ | 全色を公式実在トークンへ置換。ヘッダ背景は #e6e6e6 (gray-100)、現状 5% 黒は薄すぎ。ボーダーは solid-gray-420/500 系のソリッド色、現状は半透明黒で別物 |
| 角丸 (`--border-radius-*`) | テーブル本体・セルに角丸なし。skeleton 該当なし | 本体角丸なし ✅。skeleton bar に `--border-radius-4` 使用 (公式に skeleton 概念は無いので独自) | ⚠️ | テーブル自体は一致。skeleton は公式非存在の独自機能 |
| スペーシング (padding / gap / margin: `--spacing-*`) | セル padding `calc(20/16*1rem) calc(16/16*1rem)` = **20px 縦 / 16px 横**。dense `12px/16px`。コンテナ `row-gap: 16px`。caption 別 padding なし。**公式 design-tokens に `--spacing-*` は存在しない**ため calc 直書きが正準 | セル padding `var(--spacing-12,0.75rem)` = **12px 全方向**。compact `--spacing-8,0.5rem` = 8px。caption padding `--spacing-8 0` | ❌ | comfortable は 20px/16px が正、現状 12px は別物。compact は 12px/16px が正、現状 8px は別物。`--spacing-*` トークンは存在しないので公式同様 calc 値を直書きすべき |
| エレベーション / 影 (`--elevation-*`) | テーブルに影なし | 影なし ✅ (skeleton の pulse は opacity アニメのみ) | ✅ | 該当なし(一致) |
| ボーダー (太さ / 色 / 有無) | `data-cell-border` 属性で辺ごとに `1px solid var(--_border-color)`。**最下段の列ヘッダ下端 / 最終行ヘッダ右端は `1px solid var(--color-neutral-black)`** で強調。`data-border` で外枠制御 | th/td 一律 `border-bottom: 1px solid var(--color-border-default,…)`。`--bordered` で外枠。ヘッダ下端の黒強調**なし**。辺別制御 API なし | ❌ | ヘッダ直下の黒 1px ボーダー(公式の特徴)が欠落。ボーダー色が半透明黒→solid-gray 系へ要置換。辺別 `data-cell-border` 相当の表現力が無い(API 設計差) |
| 状態 (hover / focus-visible / active / current / disabled / expanded) | 行 hover(opt-in `data-row-hover-highlight`)= `--color-primitive-blue-50` (#e8f1fe)。選択行 `tr:has(:checked)` = `--color-primitive-blue-100` (#d9e6ff)。sort-button focus-visible = `outline 4px black + offset 2px + radius 4px + bg yellow-300 + shadow 2px yellow-300`。`@media (hover:hover)` ガード有り | 行 hover スタイル無し(テーブル本体に hover 機能を提供していない)。選択行スタイル無し。focus 関連は wrapper に無し | ❌ | 行 hover ハイライトは公式の主要バリアント。提供する場合は `--color-primitive-blue-50`。選択行は `--color-primitive-blue-100`。focus ring も公式は 4px outline + yellow bg、共有 mixin は 2px outline + 4px shadow で**別物**(下記 sort 機能を持つ場合) |
| サイズバリアント (sm/md/lg 等) | 2 段階: 既定(20px padding,lh1.7) と `data-size="dense"` (12px padding,lh1.3) | 2 段階: `comfortable`(12px) と `compact`(8px) | ❌ | 段数は一致するが padding/lh の実値が両段ともズレ。`data-size="dense"` 命名 vs `--compact` クラス命名の差(API)。dense の line-height 1.3 化が欠落 |
| forced-colors / ハイコントラスト | 公式 table.css に forced-colors 専用指定なし(system color 依存は global 側) | `@include dads-forced-colors` で th/td border→CanvasText、thead 背景→Canvas、bordered→CanvasText 等を明示 | ✅ | Vue 側が追加対応しており害なし(むしろ堅牢)。整合性問題なし |
| 正準CSSの流用 vs 独自実装 (ドリフト温床) | クラス: ルート `.dads-table`(flex column コンテナ) + 子 `<table class="dads-table__table">` + `.dads-table__col-header` / `.dads-table__row-header` / `.dads-table__sort-header` / `.dads-table__caption`。状態は **`data-*` 属性** (`data-row-stripe` `data-size` `data-cell-border` `data-bg` …) | ルートが `<table class="dads-table">` 直接(コンテナ div は wrapper のみ)。状態は **BEM modifier クラス** (`--striped` `--compact` `--bordered` `--sticky-header`)。`__col-header` 等の公式クラス**不使用**。独自 token 体系で全面再実装 | ❌ | **構造ドリフトが重大**。公式の DOM 構造(`.dads-table` ラッパ + `.dads-table__table` + `__col-header`)と data 属性 API を全く再現しておらず、公式 CSS を一切流用していない。LanguageSelector と同型のドリフト |

## 検出した差異 (修正対象)

1. **[high]** 構造/クラス: 公式は `.dads-table`(コンテナ)>`.dads-table__table` + `.dads-table__col-header`/`__row-header` + `data-*` 属性駆動。Vue は `<table class="dads-table">` 直 + BEM modifier の独自再実装。公式 CSS 非流用のドリフト。
   - 該当行: `DadsTable.vue:39`, `DadsTable.vue:87` (`thead th` 直書き), `DadsTable.vue:26-34`
2. **[high]** カラー(トークン): `--color-text-primary` `--color-bg-subtle` `--color-border-default` `--color-bg-hover` は tokens.css に未定義 → 全フォールバック直値で描画。公式実在トークン `--color-neutral-solid-gray-{800,100,420,500,50}` 等へ置換。
   - 該当行: `DadsTable.vue:75`, `DadsTable.vue:83`, `DadsTable.vue:88`, `DadsTable.vue:122`, `DadsTable.vue:129`
3. **[high]** スペーシング: セル padding 公式 `20px/16px`(comfortable) `12px/16px`(dense) → 現状 `12px`(均一) / `8px`。`--spacing-*` トークンは公式に存在しないため calc 直値で合わせる。
   - 該当行: `DadsTable.vue:81`, `DadsTable.vue:107`
4. **[high]** ボーダー: 列ヘッダ直下/行ヘッダ右端の `1px solid var(--color-neutral-black)` 黒強調(公式の象徴的特徴)が欠落。
   - 該当行: `DadsTable.vue:79-85` (th/td 一律 bottom border のみ)
5. **[medium]** ボーダー色: 半透明黒 `rgba(0,0,0,0.12)` → 公式ソリッド `--color-neutral-solid-gray-420`(#949494, ヘッダ無し) / `-500`(#7f7f7f, ヘッダ有り)。
   - 該当行: `DadsTable.vue:83`, `DadsTable.vue:122`
6. **[medium]** line-height: 公式 `1.7`(`--line-height-170`)/dense `1.3`(`--line-height-130`) → 現状一律 `1.5`(`--line-height-150`)。
   - 該当行: `DadsTable.vue:77`, `DadsTable.vue:104-110` (compact に lh 指定無し)
7. **[medium]** stripe 背景色: 公式 even 行 `--color-neutral-solid-gray-50`(#f2f2f2 相当) → 現状 `--color-bg-hover`(未定義→rgba(0,0,0,0.04))。hover と同色を使い回す設計自体が公式と不一致。
   - 該当行: `DadsTable.vue:129`
8. **[medium]** 行 hover ハイライト未提供: 公式は `data-row-hover-highlight` で `--color-primitive-blue-50`(#e8f1fe) + `@media(hover:hover)` ガード。Vue は機能自体が無い。
   - 該当行: (DadsTable.vue 全体に hover 行スタイルなし)
9. **[medium]** caption: 公式 `font-weight:bold` + `--font-size-17`(1.0625rem) + 本文色 → 現状 `--font-size-14` + secondary 色 + bold なし。caption-side は公式に明示なし(Vue は top)。
   - 該当行: `DadsTable.vue:94-100`
10. **[low]** letter-spacing `0.02em`(公式テーブル既定)欠落。
    - 該当行: `DadsTable.vue:71-78`
11. **[low]** thead 背景: 公式 `--color-neutral-solid-gray-100`(#e6e6e6) → 現状 `rgba(0,0,0,0.05)`(薄すぎ)。
    - 該当行: `DadsTable.vue:88`

## ハードコード / 誤トークンの洗い出し

- `DadsTable.vue:75` `color: var(--color-text-primary, #1a1a1a)` — 誤トークン(未定義)。`--color-neutral-solid-gray-800` 等へ。
- `DadsTable.vue:83` `border-bottom: 1px solid var(--color-border-default, rgba(0, 0, 0, 0.12))` — 誤トークン + 半透明黒。`--color-neutral-solid-gray-420/500`。
- `DadsTable.vue:88` `background-color: var(--color-bg-subtle, rgba(0, 0, 0, 0.05))` — 誤トークン。`--color-neutral-solid-gray-100`。
- `DadsTable.vue:81` / `:107` `var(--spacing-12,…)` / `var(--spacing-8,…)` — `--spacing-*` は公式 tokens.css に**存在しない**。常にフォールバック直値で描画。公式同様の calc 直値か、別途トークン定義が必要。
- `DadsTable.vue:96` `var(--spacing-8, 0.5rem)` — 同上(spacing トークン不在)。
- `DadsTable.vue:98` `color: var(--color-text-secondary, #4d4d4d)` — 誤トークン。
- `DadsTable.vue:122` `var(--color-border-default, rgba(0,0,0,0.12))` — 誤トークン + 半透明。
- `DadsTable.vue:129` `var(--color-bg-hover, rgba(0,0,0,0.04))` — 誤トークン(stripe に hover 色流用)。
- `DadsTable.vue:141-142` skeleton: `--border-radius-4`(実在 ✅) + `--color-bg-subtle`(未定義)。
- 注: `--font-family-sans` / `--font-size-16` / `--font-size-14` / `--line-height-150` / `--border-radius-4` は実在トークン(問題なし)。

## 結論

- **修正要否: 要修正(優先度 高)**。色・スペーシング・line-height・ヘッダ黒ボーダー・行 hover/選択ハイライトが公式と広範に乖離し、参照トークンの多くが未定義で「フォールバック直値レンダリング」状態。視覚一致度は低い。
- 最重要は **(a) 未定義トークン群の公式実在トークンへの一括置換**、**(b) 公式の `data-*` 属性 + `.dads-table__table`/`__col-header` 構造への寄せ(構造ドリフト解消)**、**(c) padding 20/16・line-height 1.7・ヘッダ直下黒ボーダー**。
- 想定 changeset レベル: 構造クラス/`data-*` API を公式準拠に作り替えると **major**(現行 BEM modifier prop/slot 契約が変わる)。API を据え置き CSS 値とトークンのみ是正に留めるなら **minor〜patch**。視覚正準一致を優先するなら major 相当の作り替えを推奨。
- API/aria 不変: 値置換のみなら aria 不変で可。ただし `data-cell-border` 等の辺別ボーダー・行 hover/選択ハイライトは現行 API に無いため、完全一致には prop/属性追加(=非破壊の minor 追加で吸収可)が必要。
