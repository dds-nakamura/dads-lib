# Gap Report: `DadsSelect`

> Issue #18 — DADS 公式とのビジュアル差異監査。1 コンポーネント 1 ファイル。

## メタ情報

| 項目 | 値 |
| ---- | ---- |
| Vue 実装 | `packages/vue/src/components/Select/DadsSelect.vue` |
| 真実の源 (一次) | `example` (`design-system-example-components-html/src/components/select/`) |
| 参照パス | `design-system-example-components-html/src/components/select/{select.css,playground.html}` / `dads-document-md/dads/components/select/index.md` |
| 総合判定 | ❌ 要修正 |
| 重大度 | high |
| 検出差異数 | 12 |

## 観点別チェック

| 観点 | 公式 (正準値) | `@dads/vue` 現状 | 判定 | 備考 / 修正方針 |
| ---- | ------------- | ----------------- | ---- | ---------------- |
| タイポグラフィ (font-family / size / weight / line-height) | `font-family: var(--font-family-sans)`, `font-size:1rem`, `font-weight:normal`, `line-height:1.7`(本体)/`1`(select), `letter-spacing:0.02em` (css:1-9,27) | `--font-family-sans`(fb), `--font-size-16`, `line-height` 一部 1.5, `letter-spacing` 未設定 | ⚠️ | `letter-spacing:0.02em` 欠落。公式 line-height 値も不一致 |
| カラー (背景 / 文字 / ボーダー: トークン参照) | 文字 `--color-neutral-solid-gray-800`, 枠 `--color-neutral-solid-gray-600`, 背景 `--color-neutral-white`, error `--color-semantic-error-1`, disabled 枠 `--color-neutral-solid-gray-300`/背景 `gray-50`/文字 `gray-420` (css:3,21,22,68-70) | 文字 `--color-text-primary`, 枠 `--color-border-default`, 背景 `--color-bg-surface`, error `--color-error`, placeholder `--color-text-disabled` — **全て DADS 未定義セマンティック** (vue:421,451,450,435,495) | ❌ | 公式 neutral/semantic トークンに全面置換。`--color-text-*`/`--color-bg-*`/`--color-border-default`/`--color-error` は非公式 |
| 角丸 (`--border-radius-*`) | `calc(8/16*1rem)` = **8px** (css:20) | `--border-radius-4` = **4px** (vue:452,440,522,558) | ❌ | 公式 8px。4px 取り違え |
| スペーシング (padding / gap / margin: `--spacing-*`) | select `padding-right:40px; padding-left:16px` (css:23-24), error-text `margin:8px 0 0` (css:113), chevron `right:16px` (css:90) | trigger padding md `0 12px`/lg `0 16px`/sm `0 12px` (vue:615-627) | ⚠️ | 公式は左右非対称 (左16/右40)。Vue は左右同値 + サイズ別で異なる |
| エレベーション / 影 (`--elevation-*`) | 公式 select に dropdown 影なし（native `<select>` のため OS 任せ） | listbox に `box-shadow: 0 4px 12px rgba(0,0,0,0.12)` (vue:559) — **直値ハードコード, --elevation 未使用** | ❌ | カスタム listbox の影が直値。公式は native select のため該当影なし。`--elevation-*` 参照すべき(独自 listbox 自体が drift) |
| ボーダー (太さ / 色 / 有無) | `1px solid var(--color-neutral-solid-gray-600)`, disabled `gray-300` (css:21,68) | `1px solid var(--color-border-default, rgba(0,0,0,0.1))` (vue:451) | ❌ | 色トークン誤り。太さ一致 |
| 状態 (hover / focus-visible / active / current / disabled / expanded) | hover `border-color:--color-neutral-black` (css:51); focus-visible `outline:4px black; offset:2px; box-shadow:0 0 0 2px yellow-300` (css:45-47); invalid `--color-semantic-error-1` / hover `--color-primitive-red-1000` (css:56-63); disabled 枠`gray-300`/bg`gray-50`/text`gray-420` (css:66-71) | hover `--color-text-primary` (vue:633); focus `:focus-within` 2px black + 4px yellow (mixin); disabled `opacity:0.5` 一律; option active/selected に独自 bg | ❌ | (1) focus ring 幅が公式と逆。(2) disabled は公式の専用トークン(gray-300/50/420)でなく opacity:0.5。(3) invalid hover の red-1000 未実装。(4) expanded(open) 概念は公式 native select に無い独自 |
| サイズバリアント (sm/md/lg 等) | `[data-size]`: sm `40px` / md `48px` / lg `56px` 高さ (css:32-42) | sm `min-height:calc(2.5rem-2px)`=38.5px / md `3rem-2px`=46px / lg `3.5rem-2px`=54px (vue:612-628) | ❌ | 各サイズで -2px ずれ（border 分を内側補正した結果、公式の外形 40/48/56px より 2px 小さい） |
| forced-colors / ハイコントラスト | select `color/border:ButtonText`, disabled `GrayText`, chevron `ButtonText`/disabled `GrayText` (css:73-110) | control `border:1px CanvasText`, listbox `border:CanvasText`, option--selected `Highlight/HighlightText` (vue:662-675) | ⚠️ | 公式は ButtonText/GrayText 系。Vue は CanvasText/Highlight 系。意味的に近いが公式準拠でない |
| 正準CSSの流用 vs 独自実装 (ドリフト温床) | **公式は native `<select>` 1 要素** (`.dads-select__select` + `.dads-select__chevron` SVG + `appearance:none`)。`@supports(appearance:base-select)` で将来の customizable select に段階対応。multiple/chips/listbox は**公式に無い** | **完全独自の ARIA combobox 再実装** (`role=combobox` + 独自 `<ul role=listbox>` + 独自キーボード処理 + chips + multiple + type-ahead)。native `<select>` を全く使わない | ❌ | **最重要ドリフト**。公式 native select 構造を破棄し独自 listbox を実装。SearchBox の `__select`(native) とも非整合。挙動・見た目・a11y すべてが公式と乖離 |

## 検出した差異 (修正対象)

1. **[high]** 構造ドリフト: 公式は native `<select>`(`.dads-select__select`+chevron) → 現状は独自 `role=combobox`+`<ul role=listbox>` の完全再実装。公式 CSS クラス(`__select`/`__chevron`/`__error-text`)を一切使わず独自クラス体系。
   - 該当行: `DadsSelect.vue:298-401`
2. **[high]** 角丸: 公式 8px → 現状 4px。
   - 該当行: `DadsSelect.vue:452,440,522,558`
3. **[high]** カラートークン誤り: `--color-neutral-solid-gray-800/600`/`--color-neutral-white`/`--color-semantic-error-1` → `--color-text-primary`/`--color-border-default`/`--color-bg-surface`/`--color-error`（DADS 未定義）。
   - 該当行: `DadsSelect.vue:421,450,451,435,495`
4. **[high]** focus ring 幅逆転: 公式 `outline:4px+offset2px+shadow2px` → 現状 `outline:2px+shadow4px`。
   - 該当行: `_focus-ring.scss:9-13` 経由 `DadsSelect.vue:457`
5. **[medium]** disabled スタイル: 公式 専用トークン(枠gray-300/bg gray-50/文字gray-420) → 現状 `opacity:0.5` 一律。
   - 該当行: `DadsSelect.vue:647-654`
6. **[medium]** サイズ高さ -2px ずれ: 公式 sm40/md48/lg56px → 現状 38.5/46/54px。
   - 該当行: `DadsSelect.vue:613,619,625`
7. **[medium]** listbox 影が直値 `0 4px 12px rgba(0,0,0,0.12)`（`--elevation-*` 未使用、公式 native select には該当なし）。
   - 該当行: `DadsSelect.vue:559`
8. **[medium]** invalid hover 色 `--color-primitive-red-1000` 未実装（公式 css:60-63）。
   - 該当行: `DadsSelect.vue:657-659`
9. **[medium]** hover ボーダー色: 公式 `--color-neutral-black` → 現状 `--color-text-primary`。
   - 該当行: `DadsSelect.vue:633`
10. **[low]** `letter-spacing: 0.02em` 欠落。
    - 該当行: `DadsSelect.vue:416-421`
11. **[low]** forced-colors: 公式 ButtonText/GrayText → 現状 CanvasText/Highlight。
    - 該当行: `DadsSelect.vue:662-675`
12. **[low]** padding 左右非対称(公式 左16/右40)を踏襲せず左右同値。
    - 該当行: `DadsSelect.vue:615,621,627`

## ハードコード / 誤トークンの洗い出し

- `box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12)`（listbox 影, 直値）— `DadsSelect.vue:559`
- `top: calc(100% + 4px)`（直値 4px, spacing トークン化されていない）— `:549`
- `padding: 2px 8px`（required バッジ）— `:439`
- `font-weight: 500/600/700`（直値）— `:431,439,574,609`
- `line-height: 1.2/1.6`（直値）— `:442,525`
- セマンティック bg 直値 var フォールバック: `--color-bg-selected, rgba(0,102,204,0.08)`, `--color-bg-selected-hover, rgba(0,102,204,0.16)`, `--color-bg-hover, rgba(0,0,0,0.08)` — `:575,579,542`（トークン自体が DADS 未定義）
- 誤/未定義トークン: `--color-text-primary/secondary/disabled/on-primary`, `--color-bg-surface/subtle/selected/selected-hover/hover`, `--color-border-default`, `--color-error` — `:421,435,450,451,484,495,500,520,521,537,556,557,575,588,603,606`
- `--border-radius-4`（公式 8px）— `:440,452,522,558`

## 結論

- **修正要 / 優先度 high**。本コンポーネントは構造そのものが公式(native `<select>`)と乖離した独自 combobox 再実装で、最重要ドリフト事例。トークン誤り・角丸・focus ring も全観点で不一致。
- 想定 changeset レベル: **major**。native select 構造に寄せ直す場合は DOM 構造・role・emit が変わり破壊的。トークン/角丸/focus のみの修正に留めても見た目変化が大きく最低でも minor。
- API / aria 不変は**保てない**: 公式準拠（native select 化）は `role=combobox`→native select、multiple/chips 機能の扱い等で API 破壊が不可避。CSS のみの是正(トークン/角丸/focus)なら API 不変だが構造ドリフトは残存。
