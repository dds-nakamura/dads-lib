# Gap Report: `DadsCarouselSingle`

> Issue #18 — DADS 公式とのビジュアル差異監査。1 コンポーネント 1 ファイル。
> 本コンポーネントは Issue #18 / T7 で **新規追加** した、公式 `dads-carousel-single`（静止画カルーセル単体バリアント）の 1:1 移植。

## メタ情報

| 項目 | 値 |
| ---- | ---- |
| Vue 実装 | `packages/vue/src/components/CarouselSingle/DadsCarouselSingle.vue` |
| 真実の源 (一次) | `example` |
| 参照パス | `design-system-example-components-html/src/components/carousel/key-visual-single.html` / `carousel-single.css` |
| 総合判定 | ✅ 一致 |
| 重大度 | none |
| 検出差異数 | 0 |

## 観点別チェック

| 観点 | 公式 (正準値) | `@dads/vue` 現状 | 判定 | 備考 / 修正方針 |
| ---- | ------------- | ----------------- | ---- | ---------------- |
| タイポグラフィ (font-family / size / weight / line-height) | `font-family: var(--font-family-sans)`; `font-size: calc(16/16*1rem)`; `font-weight: normal`; `line-height: 1.7`; `letter-spacing: 0.02em` (`carousel-single.css:1-7`) | 同一値を verbatim 移植 (`DadsCarouselSingle.vue` `<style>`) | ✅ | 完全一致 |
| カラー (背景 / 文字 / ボーダー: トークン参照) | hover outline `--color-primitive-blue-900`; hover/focus 内枠 `--color-neutral-white` / `--color-primitive-yellow-300`; focus outline / image outline `--color-neutral-black` | 同一トークンを使用（design-tokens に全て存在） | ✅ | フォールバック直値なし。全て公式トークン |
| 角丸 (`--border-radius-*`) | focus-visible 時のみ `border-radius: calc(8/16*1rem)`（内枠 6/16rem） | 同一 | ✅ | 完全一致 |
| スペーシング (padding / gap / margin: `--spacing-*`) | outline-offset `calc(-2/16*1rem)`; `inset: 2px` | 同一 | ✅ | 公式どおり（`calc(N/16*1rem)` 表記を保持） |
| エレベーション / 影 (`--elevation-*`) | 影なし（hover/focus の `box-shadow` 内枠演出のみ） | 同一 | ✅ | 該当なし |
| ボーダー (太さ / 色 / 有無) | image `outline: 2px solid var(--color-neutral-black)` / `outline-offset: -2px`; hover/focus outline `4/16rem` | 同一 | ✅ | 完全一致 |
| 状態 (hover / focus-visible / active / current / disabled / expanded) | `:any-link:hover`（青 outline + 白内枠）/ `:any-link:focus-visible`（黒 outline + 黄内枠）。`@media (hover: hover)` でホバー限定 | 同一セレクタ・同一値で移植 | ✅ | `:any-link` によりリンク時のみ発火する挙動も保持 |
| サイズバリアント (sm/md/lg 等) | バリアントなし（静止画 1 枚） | なし | ✅ | 該当なし |
| forced-colors / ハイコントラスト | 公式 CSS に専用指定なし | 追加せず公式どおり | ✅ | 過剰実装を避けた |
| 正準CSSの流用 vs 独自実装 (ドリフト温床) | `dads-carousel-single` / `__link` / `__image` の 3 クラス構成。ラッパは `<span class="...__link">`（リンク時 `<a>`） | クラス名・構造を保持。`href` 有無で `<a>` / `<span>` を `<component :is>` で切替 | ✅ | 独自スタイル・独自クラスの追加なし |

## 検出した差異 (修正対象)

なし。公式 `carousel-single.css` を scoped `<style>` へ verbatim 移植し、マークアップも公式 `key-visual-single.html` に一致。

## ハードコード / 誤トークンの洗い出し

- 直書きカラー / spacing / radius は **なし**。色は全て公式トークン（`--color-primitive-blue-900` / `--color-neutral-white` / `--color-neutral-black` / `--color-primitive-yellow-300`）を参照。
- `inset: 2px` / `outline: 2px` / `outline-offset: -2px` は公式 CSS と同一の直値（公式が px 直書きしている箇所をそのまま踏襲）。

## 結論

- 修正要否: **不要（✅ 一致）**。新規追加コンポーネントとして公式 `dads-carousel-single` を 1:1 移植。
- 想定 changeset レベル: **minor**（新規コンポーネント追加）。
- API/aria 不変: 新規のため該当なし。Public API は `src` / `alt`（必須）/ `srcset` / `href` / `target` / `rel` / `width` / `height`。`href` 有無でラッパを `<a>` / `<span>` に切り替える点が唯一のロジック。
