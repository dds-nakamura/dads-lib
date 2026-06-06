# Gap Report: `DadsImage`

> Issue #18 — DADS 公式とのビジュアル差異監査。1 コンポーネント 1 ファイル。

## メタ情報

| 項目 | 値 |
| ---- | ---- |
| Vue 実装 | `packages/vue/src/components/Image/DadsImage.vue` |
| 真実の源 (一次) | `md` |
| 参照パス | `dads-document-md/dads/components/image/index.md` (内容は「画像のガイドラインは準備中です」のみ) / WAI-ARIA (img) |
| 総合判定 | ⚠️ 軽微差異 |
| 重大度 | low |
| 検出差異数 | 4 |

## 観点別チェック

> 公式 MD は「ガイドラインは準備中です」のみで、example も Figma PNG もこの環境に無い。よって正準値が存在しない観点は WAI-ARIA と DADS トークン命名規約 (他コンポーネント example の `--color-neutral-*` 系) を基準に評価する。

| 観点 | 公式 (正準値) | `@dads/vue` 現状 | 判定 | 備考 / 修正方針 |
| ---- | ------------- | ----------------- | ---- | ---------------- |
| タイポグラフィ (font-family / size / weight / line-height) | 公式 caption 仕様なし。他 example 準拠なら `--font-family-sans` / `font-size 16/16rem` / `line-height 1.7` / `letter-spacing 0.02em` | caption `font-size: var(--font-size-14, 0.875rem)`, `line-height: 1.5`, `font-family: var(--font-family-sans)` | ⚠️ | 公式に caption 規定が無いため厳密判定不可。他 example の `line-height: 1.7` / `letter-spacing` とは不一致だが許容範囲 |
| カラー (背景 / 文字 / ボーダー: トークン参照) | 公式トークン: `--color-neutral-solid-gray-*` / `--color-neutral-white` | `--color-text-primary`, `--color-text-secondary`, `--color-bg-subtle` (いずれも DADS 公式に無い独自命名) | ⚠️ | InputText と同じ独自カラー名前空間問題。ただし画像本体は基本トークン非依存なので影響は caption/skeleton 背景のみ |
| 角丸 (`--border-radius-*`) | 公式規定なし (準備中) | `border-radius: var(--border-radius-4, 0.25rem)` = 4px (img) | ⚠️ | 公式値不明。画像角丸は DADS で明示されておらず、独自判断。`carousel` example の画像コンテナは角丸を `inherit` で受けるのみで固定値なし。要 Figma 確認 (環境に PNG 無し) |
| スペーシング (padding / gap / margin: `--spacing-*`) | 公式規定なし | caption `margin-top: var(--spacing-8, 0.5rem)` | ✅ | `--spacing-8` は DADS spacing 段階に存在し妥当 |
| エレベーション / 影 (`--elevation-*`) | 公式規定なし | 影なし | ✅ | 該当なし |
| ボーダー (太さ / 色 / 有無) | 公式規定なし (通常画像にボーダー無し) | 通常時ボーダー無し。forced-colors のみ `1px solid CanvasText` | ✅ | 妥当。forced-colors で輪郭を出すのは適切 |
| 状態 (hover / focus-visible / active / current / disabled / expanded) | 画像は非インタラクティブ → 状態なし | skeleton(loading) / loaded の opacity 遷移のみ。hover/focus 無し | ✅ | 画像単体に操作状態は不要。skeleton は公式に無い独自拡張だが a11y 上問題なし |
| サイズバリアント (sm/md/lg 等) | 公式規定なし | objectFit (cover/contain/fill/none) バリアント | ✅ | サイズ段階ではなく object-fit。公式に縛りが無いため許容 |
| forced-colors / ハイコントラスト | WAI-ARIA: 画像は CanvasText で輪郭可視化が望ましい | `@include base.dads-forced-colors { &__img { border: 1px solid CanvasText } }` | ✅ | 適切に対応済み |
| 正準CSSの流用 vs 独自実装 (ドリフト温床) | 公式に image 専用 example 無し。`carousel` の `__image-container` が近い (画像は `display:block; max-width:100%; height:auto`) | `figure`/`figcaption` ベースの独自実装。`display:block; max-width:100%; height:auto` は carousel と一致 | ✅ | 公式 image 部品が存在しないため独自実装はやむを得ない。基本の画像レイアウト (max-width/height auto) は carousel example と整合 |

## 検出した差異 (修正対象)

1. **[low]** カラートークン名前空間: `--color-text-primary` / `--color-text-secondary` / `--color-bg-subtle` は DADS 公式トークンに存在しない独自命名 (他 example は `--color-neutral-solid-gray-*`)。
   - 該当行: `DadsImage.vue:88,96,106,132`
2. **[low]** 角丸の根拠不明: `--border-radius-4` (4px) を画像に適用しているが公式に画像角丸の規定が無い。Figma 確認が望ましい (この環境に PNG 無し)。
   - 該当行: `DadsImage.vue:95`
3. **[low]** skeleton/shimmer は公式に無い独自拡張。a11y 上は無害だが DADS 公式仕様外。
   - 該当行: `DadsImage.vue:104-116,179-186`
4. **[low]** caption タイポが他 example の `line-height: 1.7` / `letter-spacing: 0.02em` と不一致 (公式 image 規定が無いため軽微)。
   - 該当行: `DadsImage.vue:129-134`

## ハードコード / 誤トークンの洗い出し

- `DadsImage.vue:97` `transition: opacity 0.2s ease` — 直値の duration (トークン外、許容範囲)。
- `DadsImage.vue:109-112` `rgba(0,0,0,0) / rgba(0,0,0,0.06)` — skeleton グラデーションの直書き rgba。公式トークン外の独自演出。
- `DadsImage.vue:134` `line-height: 1.5` — 直値 (caption)。
- `DadsImage.vue:88,96,106,132` — var フォールバック直値 (`#1a1a1a` 等) を持つが変数名 (`--color-text-primary` 等) が DADS 公式に無い独自命名 (差異 #1)。

## 結論

- **修正不要寄り / 優先度 low**。公式 MD が「準備中」で正準値が存在せず、画像本体のレイアウト (max-width:100%; height:auto) は carousel example と整合している。
- 唯一の継続課題は **カラートークン名前空間の統一** (差異 #1) で、これは全コンポーネント横断のトークン移行課題の一部として扱うのが妥当。
- 想定 changeset レベル: **patch** (トークン名変更のみ、視覚差はフォールバック値で吸収)。
- API / aria 不変: props (`src`/`alt`/`objectFit`/`caption`/`placeholder`/`showSkeleton`) と img/figure 構造は維持可能。
</content>
