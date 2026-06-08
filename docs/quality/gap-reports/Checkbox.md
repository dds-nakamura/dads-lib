# Gap Report: `DadsCheckbox`

> Issue #18 — DADS 公式とのビジュアル差異監査。1 コンポーネント 1 ファイル。

## メタ情報

| 項目 | 値 |
| ---- | ---- |
| Vue 実装 | `packages/vue/src/components/Checkbox/DadsCheckbox.vue` |
| 真実の源 (一次) | `example` |
| 参照パス | `design-system-example-components-html/src/components/checkbox/checkbox.css` / `checkbox.mdx` / `standalone.html` |
| 総合判定 | ❌ 要修正 |
| 重大度 | high |
| 検出差異数 | 11 |

## 観点別チェック

| 観点 | 公式 (正準値) | `@dads/vue` 現状 | 判定 | 備考 / 修正方針 |
| ---- | ------------- | ----------------- | ---- | ---------------- |
| タイポグラフィ (font-family / size / weight / line-height) | `font-family: var(--font-family-sans)`; ラベル `font-weight: normal`; `line-height: 1.3`; サイズ別 `--_label-font-size` = sm 16px / md 16px / lg 17px (`checkbox.css:159-167`,`13-38`) | `font-family: var(--font-family-sans)`; `line-height: var(--line-height-150,1.5)`; ラベル太字指定なし(継承); サイズ別 sm 14px / md 16px / lg 18px (`DadsCheckbox.vue:160,168,277-299`) | ⚠️ | font-family は一致。line-height 1.5≠1.3、フォントサイズの段階が公式 (16/16/17) と乖離 (14/16/18)。公式値へ修正 |
| カラー (背景 / 文字 / ボーダー: トークン参照) | base `--color-neutral-white`; accent `--color-primitive-blue-900`; accent-hover `--color-primitive-blue-1100`; border `--color-neutral-solid-gray-600`; border-hover `--color-neutral-black`; check `--color-neutral-white`; ラベル文字 `--color-neutral-solid-gray-800` (`checkbox.css:59-64,159-161`) | 背景 `--color-bg-surface,#fff`; checked背景 `--color-brand-primary,#0017c1`; border `--color-border-default,rgba(0,0,0,.42)`; check `--color-text-on-primary,#fff`; 文字 `--color-text-primary,#1a1a1a` (`DadsCheckbox.vue:161,201-202,215,232-233`) | ❌ | **公式トークンと全く別系統。`--color-brand-primary`/`--color-bg-surface`/`--color-border-default`/`--color-text-on-primary`/`--color-text-primary` は design-tokens に存在せず、常にフォールバック直値でレンダリング。** `#0017c1` は `--color-primitive-blue-900` 系の近似だが accent-hover(blue-1100) 段階が欠落。公式 primitive/semantic トークンへ全面置換 |
| 角丸 (`--border-radius-*`) | indicator `border-radius: 12.5%` (`checkbox.__checkbox`), input `border-radius: calc(2/18*100%)` ≒11% (`checkbox.css:47,70`) | `border-radius: var(--border-radius-4, 0.25rem)` = 4px 固定 (`DadsCheckbox.vue:203`) | ❌ | 公式は箱サイズ比 (12.5%/相対) で角丸。Vue は 4px 絶対値。相対角丸に修正 |
| スペーシング (padding / gap / margin: `--spacing-*`) | ルート `gap: var(--_gap)` (sm 4px/md 8px/lg 8px); ラベル付き時 `padding-block: 8px`; ラベル `padding-top: var(--_label-padding-top)` (sm 1px/md 4px/lg 10px) (`checkbox.css:4,8-11,160`) | ルート `gap: var(--spacing-4,0.25rem)`; label `gap: var(--spacing-8,0.5rem)`; ラベルの padding-top 概念なし (`DadsCheckbox.vue:159,166`) | ❌ | **`--spacing-*` トークンは design-tokens に 0 件 = 全て直値フォールバック。** さらに公式の `--_label-padding-top` による上揃え調整が未実装。公式の calc ベース or 実在トークンへ |
| エレベーション / 影 (`--elevation-*`) | 影なし (focus の box-shadow のみ) | 影なし (focus の box-shadow のみ) | ✅ | 該当の常設影なし。一致 |
| ボーダー (太さ / 色 / 有無) | `--_checkbox-border-width`: sm 2px / md 2px / lg 3px (`checkbox.css:16,24,33,73`) | `border: 1px solid` 固定 (`DadsCheckbox.vue:202`) | ❌ | 公式はサイズ別 2/2/3px、Vue は全サイズ 1px。サイズ別ボーダー幅を導入 |
| 状態 (hover / focus-visible / active / current / disabled / expanded) | focus: `outline: 4px solid black; outline-offset: 2px; box-shadow: 0 0 0 2px yellow-300` (input自身) (`checkbox.css:76-80`); hover: border→black, checked時 accent-hover (`checkbox.css:82-101`); disabled: gray-50/gray-300 系 (`checkbox.css:132-138`); error: `aria-invalid` 起点で semantic-error-1 (`checkbox.css:125-130`) | focus: `outline:2px solid black; box-shadow:0 0 0 4px yellow-300` を **indicator** に (`DadsCheckbox.vue:188-192`); hover: border→text-primary (`:302-306`); disabled: `opacity:.5` (`:318-321`); error: border→`--color-error` (`:324-326`); readonly 独自実装 (`:308-315`) | ❌ | focus の outline 太さ(2px≠4px)/offset(0≠2px)/box-shadow(4px≠2px) が公式と逆転。disabled は公式の専用グレートークンでなく opacity。error の hover 段階欠落。**readonly は公式に存在しない独自状態** |
| サイズバリアント (sm/md/lg 等) | チェックボックス箱: sm 24px / md 32px / lg 44px (`checkbox.css:15,23,32`) | indicator: sm 16px / md 20px / lg 24px (`DadsCheckbox.vue:277-296`) | ❌ | 公式 (24/32/44) に対し Vue (16/20/24) は全段階で過小。公式サイズへ修正 |
| forced-colors / ハイコントラスト | input に `Highlight`/`ButtonText`/`HighlightText`/`GrayText`/`Canvas` を網羅 (`checkbox.css:140-157`) | indicator に `CanvasText`/`Highlight` のみ (`DadsCheckbox.vue:329-338`) | ⚠️ | 方向性は一致だが disabled時 `GrayText`、チェック `HighlightText` の網羅度が低い |
| 正準CSSの流用 vs 独自実装 (ドリフト温床) | 構造: `.dads-checkbox > .dads-checkbox__checkbox > input.dads-checkbox__input` + `.dads-checkbox__label`。チェックは `input::before` の `clip-path: path(...)` で SVG パス描画。グループは別部品 `form-control-label` (`checkbox.css:40-123`,`mdx:128-151`) | 構造: `label.dads-checkbox > input(visually-hidden) + span.dads-checkbox__indicator` + `__text`。input を sr-only 化し **疑似要素 border で √マーク自作**。required バッジ独自 (`DadsCheckbox.vue:117-150,210-228`) | ❌ | **公式の正準構造・クラス名 (`__checkbox`/`__input`) を捨て、input 隠蔽+indicator 自作という全面独自実装。clip-path SVG チェック→border 回転√、`form-control-label` 連携も無視。最大のドリフト温床** |

## 検出した差異 (修正対象)

1. **[high]** 正準CSS流用: 公式は `input.dads-checkbox__input` を appearance:none で見せ `::before` の clip-path でチェック描画。Vue は input を sr-only 化し `__indicator` 疑似要素で自作。構造・クラス名・チェック描画すべて独自。
   - 該当行: `DadsCheckbox.vue:117-150`, `173-242`
2. **[high]** カラー: `--color-brand-primary` / `--color-bg-surface` / `--color-border-default` / `--color-text-on-primary` / `--color-text-primary` は design-tokens に**実在しない**（常時フォールバック直値）。公式は `--color-primitive-blue-900/1100` `--color-neutral-solid-gray-600/800` `--color-neutral-white/black` `--color-semantic-error-1`。
   - 該当行: `DadsCheckbox.vue:161,201-202,215,232-233`
3. **[high]** サイズ: 箱サイズ 公式 24/32/44px → 現状 16/20/24px。
   - 該当行: `DadsCheckbox.vue:277-296`
4. **[high]** ボーダー幅: 公式サイズ別 2/2/3px → 現状 1px 固定。
   - 該当行: `DadsCheckbox.vue:202`
5. **[medium]** 角丸: 公式 相対 (12.5% / calc(2/18*100%)) → 現状 `--border-radius-4` (4px 固定)。
   - 該当行: `DadsCheckbox.vue:203`
6. **[medium]** focus リング: outline 太さ/offset/box-shadow が公式 (4px/2px/2px) と逆 (2px/0/4px)、適用先も input でなく indicator。
   - 該当行: `DadsCheckbox.vue:188-192`
7. **[medium]** スペーシング: `--spacing-4/8/12/16` は design-tokens に **0 件**。常時直値。公式は `--_gap`/`--_label-padding-top` 由来。
   - 該当行: `DadsCheckbox.vue:159,166,248`
8. **[medium]** disabled: 公式は専用グレートークン (gray-50/gray-300) → 現状 `opacity: 0.5`。
   - 該当行: `DadsCheckbox.vue:318-321`
9. **[low]** タイポ: line-height 1.5≠公式 1.3。フォントサイズ sm 14px≠公式 16px、lg 18px≠公式 17px。
   - 該当行: `DadsCheckbox.vue:168,277-299`
10. **[low]** ラベル上揃え: 公式 `--_label-padding-top` (1/4/10px) が未実装で大サイズ時にベースライン崩れ。
   - 該当行: `DadsCheckbox.vue:163-169`
11. **[low]** readonly: 公式に存在しない独自状態 (破線ボーダー)。API として残すなら仕様外である旨を明記。
   - 該当行: `DadsCheckbox.vue:308-315`, `DadsCheckbox.types.ts:21`

## ハードコード / 誤トークンの洗い出し

- 誤トークン（design-tokens 不在 = 直値フォールバックで描画）:
  - `--color-text-primary,#1a1a1a` (`:161,305`)、`--color-bg-surface,#fff` (`:201`)、`--color-border-default,rgba(0,0,0,.42)` (`:202`)、`--color-text-on-primary,#fff` (`:215,216,226,253`)、`--color-brand-primary,#0017c1` (`:232-233`)、`--color-error,#ec0000` (`:252,272,325`)、`--color-text-secondary,#4d4d4d` (`:268`)、`--color-bg-subtle,rgba(0,0,0,.05)` (`:314`)、`--color-neutral-black,#000` (`:189`)
  - `--spacing-4` (`:159`)、`--spacing-8` (`:166,248`)：design-tokens に spacing 系 0 件
  - `--border-radius-4` (`:203,257`)：実在するが角丸は相対指定が正
- 直書き（var なし）:
  - `outline: 2px solid` / `box-shadow: 0 0 0 4px` (`:189,191`) — 公式値 4px/2px と不一致
  - `font-weight: 700` (`:256`)、`font-weight: 500` (`:273`) — `--font-weight-*` トークン(400/700)未使用、500 は非トークン値
  - `padding: 2px 8px` (`:255`)、`border-right/bottom: 2px solid` (`:215-216`)、`width:1.5rem/1.25rem/1rem` (`:278-295`)、`opacity:0.5` (`:320`)

## 結論

- **修正要否: 要修正 (high)。** 公式の正準構造・クラス名・トークンを採用せず全面独自実装になっており、色・サイズ・ボーダー・チェック描画・focus すべてがドリフト。LanguageSelector と同型のドリフト事例。
- **優先度: 最高。** 入力系の中核部品で CheckboxGroup の依存元。
- **想定 changeset: minor**（CSS 全面差し替え + 公式サイズ採用で見た目が変わるため。`readonly` を非対応に変える場合は major 検討）。
- **API/aria 不変: 概ね可能。** props/emits/`aria-checked=mixed`・`aria-describedby` 連携は維持しつつ CSS とマークアップ構造（input 表示化 + clip-path チェック）を公式準拠へ置換できる。`readonly` の扱いのみ要判断。

## T4 解消 (Issue #18 / 案X フル — MAJOR)

正準構造への全面刷新を実施。本ギャップレポートで指摘した 11 件の差異をすべて解消した。

- **正準構造採用 (差異 #1 解消):** 隠し input + `__indicator` 疑似要素の自作実装を撤廃し、公式の `.dads-checkbox > .dads-checkbox__checkbox > input.dads-checkbox__input` (+ `.dads-checkbox__label`) を `checkbox.css` から verbatim 移植。ネイティブ `<input>` を `appearance:none` で**そのまま可視コントロール化**。
- **clip-path チェック描画 (差異 #1):** チェックマークは `input::before` の `clip-path: path("M5.6,11.2...")`（公式 SVG パス）、indeterminate は `path("M2,6h10v2H2Z")` を描画。border 回転√の自作は廃止。
- **色トークン正準化 (差異 #2 解消):** design-tokens に実在しない `--color-brand-primary` 等の誤トークンを撤去し、公式 `--color-primitive-blue-900/1100` `--color-neutral-solid-gray-50/300/420/600/800` `--color-neutral-white/black` `--color-semantic-error-1` `--color-primitive-red-1000` `--color-primitive-yellow-300` へ全面置換（comma フォールバック付き）。
- **サイズ / ボーダー忠実化 (差異 #3,#4,#7,#9,#10 解消):** `data-size` 駆動で箱 24/32/44px・ボーダー 2/2/3px・ラベル font-size 16/16/17px・`--_label-padding-top` 1/4/10px による上揃え調整を公式どおり実装。`--spacing-*` 誤トークンは `calc(N/16*1rem)` に置換。
- **角丸 (差異 #5 解消):** `__checkbox` は `border-radius:12.5%`、input は `calc(2/18*100%)` の相対指定へ。
- **focus リング (差異 #6 解消):** input 自身に `outline:4px / offset:2px / box-shadow:2px yellow-300`（公式値）を適用。
- **disabled (差異 #8 解消):** `opacity:.5` を撤廃し公式の専用グレートークン (base gray-50 / accent・border gray-300) へ。
- **forced-colors 網羅向上 (差異 #11 周辺):** 無効時 `GrayText`、チェック `HighlightText`、disabled チェック塗り `Canvas`、border `ButtonText`、accent `Highlight` を網羅。
- **readonly 削除 (差異 #11 解消 / MAJOR):** 公式に存在しない非公式 `readonly` prop / 状態 / 専用テストを削除。読み取り専用相当は `disabled` で代替。

→ **総合判定: ✅ 解消。** `DadsCheckboxGroup` への影響なし（per-item の props/emits/`<input>` を維持しているためグループ側の変更不要、Checkbox+Group の単体テスト 84 件 green）。
