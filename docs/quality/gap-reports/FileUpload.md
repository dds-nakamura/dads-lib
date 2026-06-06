# Gap Report: `DadsFileUpload`

> Issue #18 — DADS 公式とのビジュアル差異監査。1 コンポーネント 1 ファイル。

## メタ情報

| 項目 | 値 |
| ---- | ---- |
| Vue 実装 | `packages/vue/src/components/FileUpload/DadsFileUpload.vue` |
| 真実の源 (一次) | `example` |
| 参照パス | `design-system-example-components-html/src/components/file-upload/file-upload.css` + `playground.html` / `dads-document-md/dads/components/file-upload/index.md` |
| 総合判定 | ❌ 要修正 |
| 重大度 | high |
| 検出差異数 | 11 |

## 観点別チェック

| 観点 | 公式 (正準値) | `@dads/vue` 現状 | 判定 | 備考 / 修正方針 |
| ---- | ------------- | ----------------- | ---- | ---------------- |
| タイポグラフィ (font-family / size / weight / line-height) | root `font-family:var(--font-family-sans)` / `font-size:16/16rem` / `font-weight:normal` / `line-height:1.7` / `letter-spacing:.02em` / `overflow-wrap:anywhere`。file-name `font-weight:bold` | root `font-family:var(--font-family-sans,...)` / `color:var(--color-text-primary,#1a1a1a)` (誤トークン)。label `font-weight:500`、required `700`、button `font-weight:500`。`line-height` は `var(--line-height-150)` (誤トークン名でなく存在するが公式 root は 1.7)。`letter-spacing`/`overflow-wrap` 指定なし | ❌ | 公式 root の `font-size:16px`/`line-height:1.7`/`letter-spacing:.02em`/`overflow-wrap:anywhere` を全て欠如。font-weight も独自 (500/700)。公式は file-name のみ bold |
| カラー (背景 / 文字 / ボーダー: トークン参照) | drop-area border `var(--color-neutral-solid-gray-536)` / bg `var(--color-neutral-solid-gray-50)`。error `var(--color-semantic-error-1)`/`-2`。dragover outline `var(--color-semantic-success-1)` + bg `var(--color-primitive-green-50)`。file-meta `var(--color-neutral-solid-gray-600)` | **存在しないトークンを全面使用**: `--color-text-primary`/`--color-brand-primary`/`--color-error`/`--color-bg-subtle`/`--color-bg-surface`/`--color-border-default`/`--color-info-bg`/`--color-text-secondary`/`--color-text-on-primary`。全て上流 tokens.css に未定義 → フォールバック直値 (`#0017c1`/`#ec0000`/`rgba(0,0,0,.1)` 等) で描画 | ❌ | **最重大**。公式トークン体系を一切参照していない。`#0017c1`(brand) や `#ec0000`(error) は公式 `semantic-error-1` 等とも別物。全面トークン張替えが必要 |
| 角丸 (`--border-radius-*`) | drop-area `8/16rem`(=0.5rem)。公式に `--border-radius-*` トークン名は不使用 (calc 直値) | drop-area/button/file-item/progress 全て `var(--border-radius-4, 0.25rem)` = **0.25rem**。`--border-radius-4` は上流に存在するが値は 4px | ❌ | 公式 drop-area は **8px (0.5rem)**、Vue は **4px**。角丸取り違え。さらに公式の drop-area には Vue 相当の file-item/progress 角丸概念がそもそも無い (構造別物) |
| スペーシング (padding / gap / margin: `--spacing-*`) | drop-area padding `32/16rem`(=2rem)。button-area gap `8/16rem 16/16rem`。file-list margin `16/16rem 0 0`。file-item間 `4/16rem`。ボタン-チェックボックス間 最低 56px (MD 仕様) | `var(--spacing-8/12/16/24/32/4)` を多用するが **これら spacing トークンは上流に全て未定義** → フォールバック直値で描画。drop-area padding はサイズ別 (`md: 1rem 1.5rem`) で公式の `2rem` 一律と不一致 | ❌ | spacing トークン全滅 (`--spacing-*` は tokens.css に存在しない)。公式の drop-area padding `2rem` 一律に対し Vue は size variant で `0.75〜1.5rem`。MD の「56px 最低間隔」要件も未実装 |
| エレベーション / 影 (`--elevation-*`) | なし (focus shadow のみ) | progress/dropzone に box-shadow transition あるが elevation トークン不使用。影は focus-ring のみ | ✅ | 該当なし (両者とも elevation 影なし) |
| ボーダー (太さ / 色 / 有無) | drop-area `1px solid solid-gray-536` (**実線**)。error 時 border-color `semantic-error-1`。dragover は `outline:4px solid success-1; outline-offset:-4px` | dropzone `1px dashed var(--color-border-default, rgba(0,0,0,.1))` (**破線 + 誤トークン**)。error `var(--color-error,#ec0000)`。dragover は border-color 変更 (`brand-primary`) で outline 方式でない | ❌ | 公式は **実線 1px solid**、Vue は **dashed**。dragover も公式 outline 方式 vs Vue border-color 方式で差異。色も誤トークン |
| 状態 (hover / focus-visible / active / current / disabled / expanded) | input focus-visible `outline:4px black; offset:2px; border-radius:4px; box-shadow:2px yellow-300`。dragover `[data-dragover]` で outline 緑 + bg green-50。error `[data-has-error]`。disabled は dads-button 側 | dropzone に `focus-within` mixin (`outline:2px; shadow:4px` — 公式と逆)。dragover bg `info-bg`/border `brand-primary` (緑でなく青)。disabled `opacity:.5; pointer-events:none`。readonly 独自 | ❌ | dragover の配色が公式緑系→Vue 青系で別物。focus も共有 mixin で公式と outline/shadow 逆。disabled の opacity 方式も公式 example と異なる |
| サイズバリアント (sm/md/lg 等) | 公式 file-upload に **size variant なし** (drop-area padding は 32px 一律)。dads-button 側に `data-size` (md/xs) はあるが file-upload 本体に sm/md/lg なし | `--sm`/`--md`/`--lg` の 3 variant を独自実装 (dropzone padding / button min-height / font-size を変える) | ❌ | **公式に存在しない size variant を独自追加**。公式は drop-area 一律 32px。API の `size` prop 自体が公式非準拠 |
| forced-colors / ハイコントラスト | `@media (forced-colors:active)` で single-file marker `::before` を `CanvasText` 化 | `dads-forced-colors` mixin で dropzone/button/file-item border を `CanvasText` 化 | ⚠️ | 両者とも forced-colors 対応ありだが対象要素が構造差異により別物 (Vue 側は file-marker 概念が無い)。最低限の対応はある |
| 正準CSSの流用 vs 独自実装 (ドリフト温床) | **公式は共有 `dads-button` 部品を流用** (`<button class="dads-button" data-type="outline" data-size="md">`)。解除ボタンも `dads-button data-type="text" data-size="xs"`。チェックボックスは `dads-checkbox`。番号付きファイル一覧は `counter()` で実装。viewport-overlay は緑枠 | **共有部品を一切使わず完全独自再実装**。`__button`/`__remove` を独自 CSS で自前スタイル。`dads-button`/`dads-checkbox` 不使用。「ドロップ範囲拡大チェックボックス」未実装。番号付き counter なし。file-item レイアウト・解除ボタン位置 (`order:-1`) も別構造 | ❌ | **最重大ドリフト**。LanguageSelector と同型の「共有部品を独自CSSで再実装」アンチパターン。公式の `dads-button` outline/text バリアントを使わず、結果としてボタン配色・サイズ・状態が全てドリフト |

## 検出した差異 (修正対象)

1. **[high]** 共有部品の独自再実装: 公式は選択ボタンに `dads-button data-type="outline"`、解除ボタンに `dads-button data-type="text" data-size="xs"` を流用。Vue は `__button`/`__remove` を完全独自 CSS で実装。ドリフトの根本原因。修正方針: `DadsButton` コンポーネントを内部利用する構造に作り替える。
   - 該当行: `DadsFileUpload.vue:201-208` (button) / `:232-240` (remove) / CSS `:329-357`, `:399-417`
2. **[high]** 存在しないトークンの全面使用: `--color-text-primary` / `--color-brand-primary` / `--color-error` / `--color-bg-subtle` / `--color-bg-surface` / `--color-border-default` / `--color-info-bg` / `--color-text-secondary` / `--color-text-on-primary` は全て上流 tokens.css に未定義 → フォールバック直値描画。公式トークン (`--color-neutral-solid-gray-536/50/600`, `--color-semantic-error-1/2`, `--color-semantic-success-1`, `--color-primitive-green-50`) へ全張替え。
   - 該当行: `DadsFileUpload.vue:277`, `290-291`, `308-310`, `319-320`, `336-338`, `348`, `381-382`, `395`, `409`, `414-415`, `423`, `430`, `448`, `497`, `513`
3. **[high]** `--spacing-*` トークンが上流非存在: `--spacing-4/8/12/16/24/32` は tokens.css に未定義。全て直値フォールバックで描画。公式 example の calc 直値 (`32/16rem` 等) または存在する間隔値へ統一。
   - 該当行: `DadsFileUpload.vue:275`, `283`, `307`, `373`, `379-380`, `438`, `454`, `459`, `464`, `469`, `474`, `479`
4. **[high]** 角丸取り違え: 公式 drop-area `8px`(0.5rem) → Vue `var(--border-radius-4)` = `4px`。`--border-radius-8` に修正。
   - 該当行: `DadsFileUpload.vue:309`
5. **[high]** ボーダー種別: 公式 drop-area `1px solid` → Vue `1px dashed`。実線へ。
   - 該当行: `DadsFileUpload.vue:308`
6. **[high]** dragover 配色: 公式は `outline:4px solid success-1(緑); bg primitive-green-50`。Vue は `border-color: brand-primary(青); bg info-bg`。緑系 + outline 方式へ。
   - 該当行: `DadsFileUpload.vue:318-321`, `505-517` (expand-drop overlay も公式は緑枠 `viewport-overlay`)
7. **[high]** 公式非存在の size variant: `--sm/--md/--lg` は公式に無い (drop-area 一律 32px)。`size` prop ごと削除 or 公式構造へ。
   - 該当行: `DadsFileUpload.vue:53` (rootClasses) / CSS `:453-481` / types の `size`
8. **[medium]** MD 仕様「ドロップ範囲拡大チェックボックス」未実装。公式は `dads-checkbox` でユーザーが範囲拡大を選択 (`expandDropArea` prop は固定 boolean で UI チェックボックスなし)。
   - 該当行: `DadsFileUpload.vue:13` (expandDropArea prop) — UI 要素欠如
9. **[medium]** 複数選択時の番号付きファイル一覧 (公式 `counter(file-item)`) と single-file marker `::before` ドット が未実装。Vue は flat な `__file-name`/`__file-size` のみ。
   - 該当行: `DadsFileUpload.vue:222-242`
10. **[medium]** root タイポ欠如: 公式 root の `font-size:16px` / `line-height:1.7` / `letter-spacing:.02em` / `overflow-wrap:anywhere` が無い。
    - 該当行: `DadsFileUpload.vue:272-278`
11. **[low]** focus は共有 mixin (`outline:2px+shadow:4px`) で公式 (`outline:4px+shadow:2px`) と逆。横断課題。
    - 該当行: `DadsFileUpload.vue:316` (`dads-focus-ring-within`) / `_focus-ring.scss`

## ハードコード / 誤トークンの洗い出し

誤トークン (上流 tokens.css に **定義が存在しない** var 名 — フォールバック直値で描画されている):

- `var(--color-text-primary, #1a1a1a)` — `:277`, `:415`
- `var(--color-text-secondary, #4d4d4d)` — `:326`, `:395`, `:409`, `:444`
- `var(--color-text-on-primary, #fff)` — `:291`
- `var(--color-brand-primary, #0017c1)` — `:319`, `:336`, `:338`, `:430`, `:513`
- `var(--color-error, #ec0000)` — `:290`, `:448`, `:497`
- `var(--color-border-default, rgba(0,0,0,.1))` — `:308`, `:382`
- `var(--color-bg-subtle, rgba(0,0,0,.05))` — `:310`, `:414`, `:423`
- `var(--color-bg-surface, #fff)` — `:381`
- `var(--color-info-bg, #e8eaf6)` — `:320`, `:348`
- `var(--spacing-4/8/12/16/24/32, ...)` — 全箇所 (上流非存在、要 calc 直値 or 別トークン)

純粋な直書き (フォールバックですらない):

- `DadsFileUpload.vue:294` required ラベル `padding: 2px 8px` — 直値
- `DadsFileUpload.vue:510` `background-color: rgba(0, 23, 193, 0.06)` — brand 色の直書き alpha
- `DadsFileUpload.vue:512` `border-width: 4px` — 直値 (許容範囲だが公式は緑枠 4px)

## 結論

- **修正要否: 必須 (high)**。FileUpload は 3 件中もっとも深刻。(1) 共有 `dads-button`/`dads-checkbox` を独自CSSで再実装、(2) 上流に存在しない独自トークン体系を全面使用 (`--color-brand-primary`/`--spacing-*` 等)、(3) 角丸 4px/8px 取り違え・破線/実線違い・dragover 配色 (青 vs 緑) など、ほぼ全観点で公式とドリフト。LanguageSelector で起きた「共有部品の独自再実装」アンチパターンの再現。
- **優先度: 最高**。本 Issue #18 で最優先に着手すべきコンポーネント。
- **想定 changeset レベル: minor〜major**。トークン全張替え + `DadsButton` 内部利用化 + size variant 削除 + ドロップ拡大チェックボックス追加は構造変更を伴う。`size` prop / `expandDropArea` prop の意味変更は **API 破壊の可能性**。最小でも minor、size prop 廃止まで踏み込むなら major。
- **API / aria 不変: 部分的に困難**。CSS トークン張替え・角丸・配色は API 不変で可。ただし「公式非存在の size variant 削除」「expandDropArea をチェックボックス UI 化」「番号付きファイル一覧」は props/DOM 構造変更を伴い API・aria に影響しうる。段階適用 (まず patch でトークン/角丸/配色を公式化 → 次に minor/major で構造) を推奨。
