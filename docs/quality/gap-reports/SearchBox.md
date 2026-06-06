# Gap Report: `DadsSearchBox`

> Issue #18 — DADS 公式とのビジュアル差異監査。1 コンポーネント 1 ファイル。

## メタ情報

| 項目 | 値 |
| ---- | ---- |
| Vue 実装 | `packages/vue/src/components/SearchBox/DadsSearchBox.vue` |
| 真実の源 (一次) | `example` (`design-system-example-components-html/src/components/search-box/`) |
| 参照パス | `design-system-example-components-html/src/components/search-box/{search-box.css,playground.html}` / `dads-document-md/dads/components/search-box/index.md` (ガイドライン準備中) |
| 総合判定 | ❌ 要修正 |
| 重大度 | high |
| 検出差異数 | 11 |

## 観点別チェック

| 観点 | 公式 (正準値) | `@dads/vue` 現状 | 判定 | 備考 / 修正方針 |
| ---- | ------------- | ----------------- | ---- | ---------------- |
| タイポグラフィ (font-family / size / weight / line-height) | `font-family: var(--font-family-sans)`, `font-size: 1rem`, `font-weight: normal`, `line-height: 1`, `letter-spacing: 0.02em` (css:1-10) | `--font-family-sans` フォールバック付き, `--font-size-16`, `line-height` 不在(input は font:inherit), `letter-spacing` 未設定 | ⚠️ | `letter-spacing: 0.02em` 欠落。公式 line-height:1 / 行高指定なし |
| カラー (背景 / 文字 / ボーダー: トークン参照) | 文字 `--color-neutral-solid-gray-900`, 入力枠 `--color-neutral-solid-gray-600`, 背景 `--color-neutral-white`, アイコン `--color-neutral-solid-gray-600`, placeholder `--color-neutral-solid-gray-600` (css:6,168,182,184,210) | 文字 `--color-text-primary`, 枠 `--color-border-default`, 背景 `--color-bg-surface`, アイコン `--color-text-secondary` — **公式に存在しないセマンティックトークン** (vue:226,272,290,271) | ❌ | 公式は primitive/neutral トークンを直接参照。`--color-border-default`/`--color-bg-surface`/`--color-text-*` は DADS 未定義。全て `--color-neutral-*` に置換 |
| 角丸 (`--border-radius-*`) | `calc(8/16*1rem)` = **8px** (css:183) | `--border-radius-4` = **4px** (vue:273,401,412) | ❌ | 公式は 8px。4px/8px 取り違え。`--border-radius-8` 相当へ修正 |
| スペーシング (padding / gap / margin: `--spacing-*`) | input padding `12px 16px 12px 48px` (css:185-188), row gap `1rem`(css:3), icon left `16px`(css:163) | input padding `calc(spacing-16 + 2rem)` 左 / 上下は min-height 依存, gap `--spacing-16` | ⚠️ | 公式は明示的 padding 12px(縦)。Vue は min-height + flex で代替し縦 padding 未指定。左 padding 48px ≈ 一致 |
| エレベーション / 影 (`--elevation-*`) | search-box 本体には影なし。select picker は `--elevation-1` (css:69) | suggestions に影なし / 本体影なし | ✅ | 該当部分一致（カスタム suggestions は公式に無い機能） |
| ボーダー (太さ / 色 / 有無) | `1px solid var(--color-neutral-solid-gray-600)` (css:182) | `1px solid var(--color-border-default, rgba(0,0,0,0.1))` (vue:272) | ❌ | 色トークン誤り。太さ 1px は一致。`--color-neutral-solid-gray-600` へ |
| 状態 (hover / focus-visible / active / current / disabled / expanded) | hover: `border-color: var(--color-neutral-black)` (css:200-203); focus-visible: **`outline: 4px solid black; outline-offset: 2px; box-shadow: 0 0 0 2px yellow-300`** (css:213-218) | hover: `border-color: --color-text-primary` (vue:351); focus: ラッパに `:focus-within` で **2px black outline + 4px yellow shadow** (focus-ring mixin) | ❌ | (1) focus ring の outline/shadow 幅が公式と逆 (公式=4px outline+2px shadow / Vue=2px+4px)。(2) hover 色がセマンティック誤トークン。(3) 公式は input 自身に focus、Vue はラッパ :focus-within |
| サイズバリアント (sm/md/lg 等) | 公式 search-box にサイズ variant **なし**。playground は button data-size="lg" のみ | sm/md/lg の min-height を独自定義 (vue:333-346) | ⚠️ | 公式 search-box にサイズ概念なし。独自拡張。drift とまでは言えないが公式準拠でない |
| forced-colors / ハイコントラスト | `.dads-search-box__input > svg { color: CanvasText }` のみ (css:172-176) | input に `border: 1px solid CanvasText`, icon `CanvasText` (vue:431-439) | ⚠️ | 公式は svg のみ CanvasText 指定。Vue は border も追加（過剰だが害なし） |
| 正準CSSの流用 vs 独自実装 (ドリフト温床) | 構造: `__fields > __select(label+native select+svg) + __input(label+svg+input)` + `.dads-button[data-size]`。category は **native select** で input と連結（左角丸のみ、border 連結） | category を独自 `__category` select で実装、構造クラス名も `__row`/`__fields`/`__input` と一部一致するが connected-select の `border-radius: 8px 0 0 8px` / `margin-left:-1px` 連結を再現せず。clear ボタン・suggestions listbox は**公式に存在しない独自機能** | ❌ | category select の連結ビジュアル（左のみ角丸・ボーダー重ね）が未再現。clear/suggestions は公式仕様外の独自追加でドリフト温床 |

## 検出した差異 (修正対象)

1. **[high]** 角丸: 公式 8px → 現状 4px。`--border-radius-4` を 8px 相当へ。
   - 該当行: `DadsSearchBox.vue:273`, `:401`, `:412`
2. **[high]** カラートークン誤り: 公式 `--color-neutral-solid-gray-600/900` / `--color-neutral-white` → 現状 `--color-border-default` / `--color-text-primary` / `--color-bg-surface`（DADS 未定義セマンティック）。
   - 該当行: `DadsSearchBox.vue:226,271,272,290,324`
3. **[high]** focus-visible リング: 公式 `outline:4px black; outline-offset:2px; box-shadow:0 0 0 2px yellow-300` → 現状 `outline:2px black; box-shadow:0 0 0 4px yellow-300`（幅が逆 / offset 0）。
   - 該当行: `_focus-ring.scss:9-13` 経由 `DadsSearchBox.vue:278`
4. **[medium]** hover ボーダー色: 公式 `--color-neutral-black` → 現状 `--color-text-primary`。
   - 該当行: `DadsSearchBox.vue:351`
5. **[medium]** category select の連結ビジュアル未再現: 公式は select に `border-radius:8px 0 0 8px` + input 側 `margin-left:-1px; 左角丸0`。Vue は独立 select で連結なし。
   - 該当行: `DadsSearchBox.vue:395-404`
6. **[medium]** 独自機能の追加 (clear ボタン / suggestions listbox): 公式 search-box に存在しない。仕様外でドリフト温床。
   - 該当行: `DadsSearchBox.vue:154-175,376-428`
7. **[low]** `letter-spacing: 0.02em` 欠落（公式 css:9）。
   - 該当行: `DadsSearchBox.vue:221-226`
8. **[low]** placeholder 色トークン未指定（公式 `--color-neutral-solid-gray-600`）。
   - 該当行: `DadsSearchBox.vue` placeholder 規則なし
9. **[low]** input 縦 padding 未指定（公式 `padding-top/bottom: 12px`）、min-height で代替。
   - 該当行: `DadsSearchBox.vue:294-300`
10. **[low]** サイズ variant は公式 search-box に無い独自拡張。
    - 該当行: `DadsSearchBox.vue:333-346`
11. **[low]** required バッジ `--color-error` は DADS 未定義（公式は `--color-semantic-error-1` 系）。
    - 該当行: `DadsSearchBox.vue:239`

## ハードコード / 誤トークンの洗い出し

- `padding: 2px 8px`（required バッジ, 直値）— `DadsSearchBox.vue:243`
- `font-weight: 500` / `700`（直値, トークン化されていない）— `:235,240,329`
- `line-height: 1.2`（直値）— `:246`
- `background-color: rgba(0, 0, 0, 0.06)`（clear hover, var() フォールバックでなく直値）— `:391`
- 誤/未定義トークン（DADS 非公式セマンティック）: `--color-text-primary`, `--color-text-secondary`, `--color-text-on-primary`, `--color-bg-surface`, `--color-bg-subtle`, `--color-border-default`, `--color-error` — `:226,239,240,271,272,290,324,327,357,366`
- `--border-radius-4`（公式は 8px）— `:273,401,412`

## 結論

- **修正要 / 優先度 high**。角丸 4px↔8px、未定義セマンティックトークン全面置換、focus ring の幅逆転は視覚的に明確な差異。
- 想定 changeset レベル: **minor**（CSS の見た目が大きく変わるため。clear/suggestions/category 独自機能を温存するならテンプレ/props は不変で API は patch 相当に留められるが、ビジュアル変化が大きいので minor 推奨）。
- API / aria 不変は保てる: 変更は scoped CSS のトークン値・focus ring 幅が中心。clear/suggestions は公式仕様外のため削除する場合は props 変更 = minor 以上になる。
