# Gap Report: `DadsMenuList`

> Issue #18 — DADS 公式とのビジュアル差異監査。1 コンポーネント 1 ファイル。

## メタ情報

| 項目 | 値 |
| ---- | ---- |
| Vue 実装 | `packages/vue/src/components/MenuList/DadsMenuList.vue` |
| 真実の源 (一次) | `example` |
| 参照パス | `design-system-example-components-html/src/components/menu-list/menu-list.css` |
| 総合判定 | ⚠️ 軽微差異 |
| 重大度 | medium |
| 検出差異数 | 4 |

## 観点別チェック

| 観点 | 公式 (正準値) | `@dads/vue` 現状 | 判定 | 備考 / 修正方針 |
| ---- | ------------- | ----------------- | ---- | ---------------- |
| タイポグラフィ (font-family / size / weight / line-height) | `font-family: var(--font-family-sans)` / `font-size: calc(16/16*1rem)`=1rem / `font-weight: normal` / `line-height: 1.3`。section-title はテンプレに無い | 同値: `font-family: var(--font-family-sans,…)` `font-size:1rem` `font-weight:normal` `line-height:1.3` (DadsMenuList.vue:239,237,236,238)。section-title は独自追加 (`font-size:var(--font-size-12)` `700` `1.4` `0.04em` :258-263) | ✅ | 本体タイポは一致。section-title は公式 example に無い拡張だが MD「カテゴリータイトル（太字）」に合致し許容 |
| カラー (背景 / 文字 / ボーダー: トークン参照) | 文字 `var(--color-neutral-solid-gray-800)`、current 背景 `var(--color-primitive-blue-100)` 文字 `var(--color-primitive-blue-1000)`、hover 背景 `var(--color-neutral-solid-gray-50)`、divider `var(--color-border-divider)` は example に無く Vue 独自 | 同トークン名で一致 (DadsMenuList.vue:235,318-319,325,247)。divider に `--color-border-divider` を独自採用 (:247,253) | ✅ | 主要トークン名は一致。値はすべて var() 参照でハードコードなし (フォールバック直値のみ) |
| 角丸 (`--border-radius-*`) | standard+regular `calc(8/16*1rem)`=0.5rem、standard+small `calc(4/16*1rem)`=0.25rem、box `0` (menu-list.css:55,59,63) | regular `0.5rem`、small `0.25rem`、box `0` (DadsMenuList.vue:304,308,313)。ただし **`--border-radius-8/4` トークンを使わず直値 `0.5rem`/`0.25rem`** | ⚠️ | 視覚値は一致するが公式同様トークン化されておらず直書き。`var(--border-radius-8, .5rem)` / `var(--border-radius-4,.25rem)` へ |
| スペーシング (padding / gap / margin: `--spacing-*`) | item padding-x `calc(16/16*1rem)`=1rem、column-gap `calc(8/16*1rem)`=.5rem、regular pad-y `10/16`、small pad-y `6/16`、min-height regular `44/16` small `36/16` (menu-list.css:19,26-27,38-39,46-47) | padding-x `1rem` gap `.5rem` (:275,270)、regular pad-y `.625rem`(=10px) min-h `2.75rem`(=44px) (:288-290)、small pad-y `.375rem`(=6px) min-h `2.25rem`(=36px) (:295-297) | ✅ | 数値は完全一致。`--spacing-*` トークン未使用は example も同じなので許容範囲 |
| エレベーション / 影 (`--elevation-*`) | menu-list 単体に box-shadow なし | なし | ✅ | 該当なし |
| ボーダー (太さ / 色 / 有無) | item `border:0`。divider/section は example に無い | item `border:0` (:273)。divider `1px solid var(--color-border-divider)`、section `border-top:1px` 独自 (:247,253) | ✅ | item ボーダー一致。divider は MD 仕様準拠の拡張 |
| 状態 (hover / focus-visible / active / current / disabled / expanded) | **focus-visible が独自設計**: 共通 `background:var(--color-primitive-yellow-300)` + standard は `outline:4px solid black; outline-offset:2px; box-shadow:0 0 0 2px yellow-300`、box は `outline:4px black; outline-offset:-4px; box-shadow:inset 0 0 0 6px yellow-300`、current 時は背景を blue-100/blue-50 に戻す (menu-list.css:95-119)。current `[data-current]` blue-100/1000 bold。**親要素 `:has(+ * [data-current])` を blue-50 でハイライト** (:76-79,88-92)。hover gray-50+underline。expanded で end-icon 回転 | focus-visible は **共有 `dads-focus-ring` mixin** = `outline:2px solid black; outline-offset:0; box-shadow:0 0 0 4px yellow-300`、**yellow 背景塗りなし / box variant の inset 表現なし / current 時の背景維持なし** (DadsMenuList.vue:337 → _focus-ring.scss:9-13)。current=blue-100/1000 bold 一致 (:317-321)。**`:has(+ * [data-current])` 親ハイライト未実装**。hover gray-50+underline 一致 (:324-327)。expanded 回転一致 (:370-372) | ❌ | (1) focus-visible のビジュアルが公式と非一致 (outline 太さ 2px vs 4px、offset、yellow 背景塗りの有無、box variant の inset)。(2) 親項目 `:has(+ * [data-current])` の blue-50 ハイライト欠落。公式 CSS のセレクタを移植すべき |
| サイズバリアント (sm/md/lg 等) | `data-size="regular"` / `"small"` の 2 段階 | `size: 'regular' | 'small'` を `data-size` に反映 (:27)。2 段階一致 | ✅ | 一致 |
| forced-colors / ハイコントラスト | menu-list.css に forced-colors 定義なし | `@include dads-forced-colors` で item border + current=Highlight/HighlightText を追加 (:375-384) | ✅ | 公式に無い独自強化。後退ではなく改善 |
| 正準CSSの流用 vs 独自実装 (ドリフト温床) | 単体 CSS。`data-type` standard/box + `data-size` の属性セレクタ設計 | 属性セレクタ設計 (`data-type` `data-size` `data-current` `data-expanded`) を忠実に再現 (:286-372)。クラス名 `dads-menu-list__*` も一致 | ✅ | 構造・クラス名・属性設計とも公式を忠実移植。focus-visible だけが共有 mixin に置換され差異の温床 |

## 検出した差異 (修正対象)

1. **[medium]** 状態(focus-visible): 公式は `outline:4px solid black` + `outline-offset:2px(standard)/-4px(box)` + yellow-300 背景塗り + box variant は `box-shadow:inset 0 0 0 6px yellow-300`。現状は共有 `dads-focus-ring` (outline 2px / offset 0 / yellow 4px shadow / 背景塗りなし)。公式 CSS の `[data-type="standard"]:focus-visible` / `[data-type="box"]:focus-visible` を移植して置換。
   - 該当行: `DadsMenuList.vue:336-338` (mixin 適用箇所)
2. **[low]** 状態(current の親ハイライト): 公式 `:has(+ * [data-current])` で親項目を `blue-50` にハイライトするが未実装。再帰構造で対応する場合はセレクタ移植 or 親フラグ付与。
   - 該当行: `DadsMenuList.vue:317-321` 付近 (current ルールに親ハイライトが無い)
3. **[low]** 角丸トークン化: `0.5rem`/`0.25rem` 直書きを `var(--border-radius-8,…)` / `var(--border-radius-4,…)` へ。
   - 該当行: `DadsMenuList.vue:304`, `DadsMenuList.vue:308`
4. **[low]** current hover の文字色: 公式は `blue-900`、現状も `blue-900` で一致 (差異なし、確認のみ)。section-title の `letter-spacing:0.04em` は公式 example 非定義の独自値。
   - 該当行: `DadsMenuList.vue:263`

## ハードコード / 誤トークンの洗い出し

- `border-radius: 0.5rem;` (`DadsMenuList.vue:304`) — var() フォールバックでなく直値。`var(--border-radius-8, 0.5rem)` へ。
- `border-radius: 0.25rem;` (`DadsMenuList.vue:308`) — 同上。`var(--border-radius-4, 0.25rem)` へ。
- `column-gap: 0.5rem;` (`DadsMenuList.vue:270`) — 直値。`var(--spacing-8, 0.5rem)` 推奨 (example も直値計算なので許容)。
- `padding-right/left: 1rem;` (`DadsMenuList.vue:275-276`) — 直値。`var(--spacing-16, 1rem)` 推奨 (許容)。
- min-height / padding-y の `2.75rem` `0.625rem` `2.25rem` `0.375rem` (`:288-297`) — 数値は公式一致だが spacing トークン非経由 (example も計算式直書きのため許容)。
- 色はすべて `var(--color-*)` 参照でハードコード無し (フォールバック直値 `#1a1a1c` 等のみ、許容)。

## 結論

- **修正要否: 要 (focus-visible の視覚差が主)**。優先度 **medium**。
- 想定 changeset レベル: **patch** (内部スタイルのみ、props/aria 不変)。
- API・aria 不変: 保てる。focus リング移植と親ハイライト追加は CSS のみで完結し、`DadsMenuListProps` / emit / aria 属性に変更不要。
