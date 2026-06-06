---
'@dads/vue': major
---

**柱B: アイコンを MDI webfont から DadsIcon (inline SVG / Material Symbols) へ移行（破壊的変更）** — Issue #18

`@dads/vue` のアイコン描画を `@mdi/font`（webfont, `mdi-*` クラス）から、inline SVG の **`DadsIcon`**（Google Material Symbols, outlined / weight 400）に統一。webfont 読込ゼロ・**使用アイコンのみ同梱**（tree-shaking）。

### 追加
- **`DadsIcon`**: `name`(必須・Material Symbols 名) / `size`(既定 24, number→px / string) / `label`(指定時 `role="img"`+`aria-label`、未指定時 `aria-hidden`)。`<svg fill="currentColor">` を描画し色は `currentColor` 継承。
- アイコンレジストリ `icon-registry.ts`（`@material-symbols/svg-400` から生成、`scripts/generate-icon-registry.mjs`）。`@material-symbols/svg-400` は **devDependency**（実行時依存なし）。

### 破壊的変更
- icon 系 props（`prependIcon` / `appendIcon` / `iconName` / `triggerIcon` / `frontIcon` / `tailIcon` / `endIcon` / `icon` 等）が受け取る値が **`mdi-*` クラス文字列 → Material Symbols 名**に変わる（案X・後方互換シムなし）。移行表: [`docs/quality/icon-mapping.md`](../docs/quality/icon-mapping.md)（例: `mdi-home`→`home`, `mdi-chevron-down`→`keyboard_arrow_down`, `mdi-magnify`→`search`, `mdi-cog`→`settings`, `mdi-open-in-new`→`open_in_new`）。
- 利用側の `@mdi/font` 読み込み前提を撤廃（README 設計判断 R-2 改訂）。フォント読込は不要。

### 移行
- `@dads/vue` の mdi 使用 23 コンポーネント（ハードコード＋prop 経由）を `DadsIcon` に置換。
- 既存テストを inline SVG（`svg.dads-icon` / `DadsIcon` name）ベースへ更新。

### 注記
- `expand_more` / `expand_less` は当バージョンの `@material-symbols/svg-400` に同梱されないため、同形の `keyboard_arrow_down` / `keyboard_arrow_up` を採用。
- レジストリに無い Material Symbols 名を渡した場合は描画されず（dev 警告）。アイコン追加は生成スクリプトで再生成する。
