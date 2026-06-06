# Gap Report: `DadsBlockquote`

> Issue #18 — DADS 公式とのビジュアル差異監査。1 コンポーネント 1 ファイル。

## メタ情報

| 項目 | 値 |
| ---- | ---- |
| Vue 実装 | `packages/vue/src/components/Blockquote/DadsBlockquote.vue` |
| 真実の源 (一次) | `example` |
| 参照パス | `design-system-example-components-html/src/components/blockquote/blockquote.css` / `playground.html` |
| 総合判定 | ⚠️ 軽微差異 |
| 重大度 | low |
| 検出差異数 | 4 |

## 観点別チェック

| 観点 | 公式 (正準値) | `@dads/vue` 現状 | 判定 | 備考 / 修正方針 |
| ---- | ------------- | ----------------- | ---- | ---------------- |
| タイポグラフィ (font-family / size / weight / line-height) | 公式 `blockquote.css` はタイポ未指定 (global.css / 親継承)。playground は単純な `<p>` (`blockquote.css:1-16`) | wrapper `font-family: var(--font-family-sans, ...)`; `> p` `font-size: var(--font-size-16,1rem)`/`line-height: var(--line-height-170,1.7)`; cite `font-size: var(--font-size-14)`/`font-style: italic` (`DadsBlockquote.vue:73,88-89,98-99`) | ⚠️ | 公式は明示指定なし。Vue 側の補完値 (16px/1.7) は DADS body 規約に整合し妥当。cite の italic は公式に無い独自要素なので許容範囲 |
| カラー (背景 / 文字 / ボーダー: トークン参照) | border-left `--color-neutral-solid-gray-536` (#767676); 文字色は global 継承 (`blockquote.css:3`) | border-left `--color-neutral-solid-gray-536, #767676` (✅正); text `--color-text-primary, #1a1a1a` (存在しない); cite `--color-text-secondary, #595959` (存在しない); link `--color-link-default, #0017c1` (存在しない・誤値) (`DadsBlockquote.vue:68,74,101,105`) | ⚠️ | border-left トークンは正準一致。ただし text/cite/link で design-tokens に無いトークンを使用しフォールバック直値で描画。cite/link は公式に無い追加要素 |
| 角丸 (`--border-radius-*`) | 角丸なし | 角丸なし | ✅ | 該当なし |
| スペーシング (padding / gap / margin: `--spacing-*`) | `margin: 0 calc(40/16*1rem)`; `padding: 8px 16px 8px 24px` (`blockquote.css:1-7`) | `margin: 0 calc(40/16*1rem)`; padding `8/16/8/24px` を calc で再現; first/last child margin collapse (`DadsBlockquote.vue:67-84`) | ✅ | 公式値を calc で忠実に再現。一致 |
| エレベーション / 影 (`--elevation-*`) | 影なし | 影なし | ✅ | 該当なし |
| ボーダー (太さ / 色 / 有無) | `border-left: 8px solid --color-neutral-solid-gray-536` (`blockquote.css:3`) | `border-left: calc(8/16*1rem) solid --color-neutral-solid-gray-536, #767676` (`DadsBlockquote.vue:68`) | ✅ | 太さ 8px (=0.5rem)・色トークン一致。8px→0.5rem 換算は妥当 |
| 状態 (hover / focus-visible / active / current / disabled / expanded) | 公式 blockquote に状態なし | cite-link に hover `--color-link-hover, #002dc1` (存在しないトークン) (`DadsBlockquote.vue:108-110`) | ⚠️ | 公式 blockquote 本体に状態は無い。cite-link hover は独自追加でトークンも未定義 |
| サイズバリアント (sm/md/lg 等) | なし | なし | ✅ | 該当なし |
| forced-colors / ハイコントラスト | 公式指定なし | `dads-forced-colors` で border/text を CanvasText、link を LinkText に (`DadsBlockquote.vue:46-58`) | ✅ | 公式より手厚いが妥当。維持可 |
| 正準CSSの流用 vs 独自実装 (ドリフト温床) | `<blockquote class="dads-blockquote">` 単体。cite 要素なし (`playground.html:15-17`) | `<div class="dads-blockquote-wrapper"> > <blockquote> + <cite>` のラッパ構造。`cite`/`citeUrl` prop で帰属表示を追加 (`DadsBlockquote.vue:22-31`) | ⚠️ | 公式に無い wrapper + cite 構造を追加。blockquote 本体の CSS は公式値に忠実なので低リスクだが、cite 部分は完全独自 |

## 検出した差異 (修正対象)

1. **[low]** カラー(text): `--color-text-primary` は design-tokens 未定義でフォールバック `#1a1a1a` 描画。公式相当は `--color-neutral-solid-gray-900` (#1a1a1a)。正トークンへ置換。
   - 該当行: `DadsBlockquote.vue:74`
2. **[low]** カラー(cite): `--color-text-secondary, #595959` は未定義トークン。最寄りは `--color-neutral-solid-gray-600` 等。design-tokens に存在するトークンへ。
   - 該当行: `DadsBlockquote.vue:101`
3. **[low]** カラー(link): `--color-link-default, #0017c1` / `--color-link-hover, #002dc1` は未定義。公式リンクは `--color-primitive-blue-1000` (#00118f) / hover `--color-primitive-blue-900` (#0017c1)。フォールバック直値が公式 hex と不一致。
   - 該当行: `DadsBlockquote.vue:105`, `:109`
4. **[low]** 構造: 公式に無い `<cite>` / wrapper を追加 (機能拡張)。公式 blockquote 単体描画と差異。
   - 該当行: `DadsBlockquote.vue:22-31`

## ハードコード / 誤トークンの洗い出し

- 誤フォールバック直値 (トークン未定義 → 実描画値): `--color-text-primary, #1a1a1a` (`:74`)、`--color-text-secondary, #595959` (`:101`)、`--color-link-default, #0017c1` (`:105`)、`--color-link-hover, #002dc1` (`:109`)
- 許容 (var() フォールバックとして正準値を併記): `--color-neutral-solid-gray-536, #767676` (`:68`、トークン実在・border-left は公式一致)
- マジックナンバー: `calc(40/16*1rem)` `calc(8..24/16*1rem)` は公式 `blockquote.css` 値の忠実な再現のため許容

## 結論

- 修正要否: **軽微修正 (low)**。コア (border-left 8px / margin / padding) は公式 `blockquote.css` を calc で忠実に再現しており一致。差異は cite/link/text の未定義トークン使用 (フォールバック直値描画) に限定。
- 優先度: 低。3 コンポーネント中最も健全。
- 想定 changeset レベル: **patch**。未定義トークンを design-tokens 実在トークンへ置換するのみで、API/aria・DOM 構造は不変。
- API/aria 不変: 保てる。`cite`/`citeUrl` prop と DOM は維持したままトークン参照のみ修正可能。

