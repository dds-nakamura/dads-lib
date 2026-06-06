# Gap Report: `DadsImageSlider`

> Issue #18 — DADS 公式とのビジュアル差異監査。1 コンポーネント 1 ファイル。

## メタ情報

| 項目 | 値 |
| ---- | ---- |
| Vue 実装 | `packages/vue/src/components/ImageSlider/DadsImageSlider.vue` |
| 真実の源 (一次) | `md` (+ 派生元 `carousel` example を参照根拠とする) |
| 参照パス | `dads-document-md/dads/components/image-slider/index.md` / `design-system-example-components-html/src/components/carousel/carousel.css` + `carousel/container.html` |
| 総合判定 | ❌ 要修正 |
| 重大度 | high |
| 検出差異数 | 8 |

## 観点別チェック

> 公式 MD は「**カルーセルの『コンテナタイプ - マルチ - 幅狭サイズ』を使用して実装**」と明記 (image-slider/index.md:18)。よって正準実装は `carousel` example であり、本コンポーネントは carousel example をフレームワーク移植すべき対象。現状の Vue 実装は carousel の構造・CSS を一切流用せず、独自のフェード式スライダーを新規実装している。

| 観点 | 公式 (正準値 = carousel example) | `@dads/vue` 現状 | 判定 | 備考 / 修正方針 |
| ---- | ------------- | ----------------- | ---- | ---------------- |
| タイポグラフィ (font-family / size / weight / line-height) | inner: `font-size 16/16rem`, `line-height 1.7`, `letter-spacing 0.02em`, `--font-family-sans`。heading: `font-size 20→24→32rem` (レスポンシブ), `font-weight bold`, `letter-spacing 0.02em` | heading `font-size: var(--font-size-20, 1.25rem)`, `font-weight: 700`, `line-height: var(--line-height-130,1.3)`。caption `font-size: var(--font-size-14)` | ⚠️ | heading 基準 20px/bold は一致。ただし公式のレスポンシブ拡大 (24/32px) と `letter-spacing 0.02em` が欠落 |
| カラー (背景 / 文字 / ボーダー: トークン参照) | `--color-neutral-solid-gray-800/420`, `--color-neutral-white`, `--color-neutral-black`, `--color-primitive-blue-900/1000`, `--color-primitive-yellow-300` | `--color-bg-surface`, `--color-text-primary`, `--color-border-divider`, `--color-brand-primary`, `--color-text-secondary`, `--color-border-strong` (いずれも DADS 公式に無い独自命名) | ❌ | カラートークン名前空間が公式と完全に別物。特にリンク/アクティブ色 `--color-brand-primary` は公式 `--color-primitive-blue-1000` 等に存在しない独自命名 |
| 角丸 (`--border-radius-*`) | carousel: focus 時 `8px`(main-link) / `4px`(next button)。コンテナ自体に角丸なし | コンテナ `border-radius: var(--border-radius-8, 0.5rem)`, arrow/indicator `50%` | ⚠️ | 公式 carousel はスライダー外枠に角丸を付けない。現状は外枠 8px を独自付与。arrow の円形 50% は公式 page-nav button (円形) と方向性一致 |
| スペーシング (padding / gap / margin: `--spacing-*`) | controls `padding: 12/16rem 0`, column-gap 20→32rem。heading `margin-bottom 16/16rem`。inner padding 48rem(lg) | header `padding: var(--spacing-12) var(--spacing-16)`, gap `--spacing-8`。caption padding `--spacing-8 --spacing-16`。indicators gap `--spacing-8` | ⚠️ | spacing 段階トークン (`--spacing-8/12/16`) 自体は妥当だが、公式 carousel のレイアウト寸法 (controls 12/0, gap 20/32) と一致しない (構造が別物のため直接比較不可) |
| エレベーション / 影 (`--elevation-*`) | carousel に box-shadow エレベーション無し (focus ring の box-shadow のみ) | エレベーション無し | ✅ | 該当なし |
| ボーダー (太さ / 色 / 有無) | next/number `1px solid --color-neutral-solid-gray-420`, page-nav button `1px solid --color-primitive-blue-1000` | header `border-bottom 1px --color-border-divider`, arrow `1px --color-border-divider` | ⚠️ | 太さ 1px は一致。色トークンが独自命名。公式は青系ボーダー(page-nav)を使うが現状は divider gray |
| 状態 (hover / focus-visible / active / current / disabled / expanded) | step `[aria-selected="true"]` で番号反転 (bg gray-800/white文字+box-shadow+outline)。focus-visible: `outline 4px black + offset 2px + box-shadow 2px yellow-300`。hover: 下線太さ変化/outline blue-900。number `[aria-current="true"]` | indicator `--active` で dot 色変更 (`--color-brand-primary`)。focus: 共有 `dads-focus-ring` (outline 2px + box-shadow 4px)。arrow disabled `opacity:0.4`。`aria-current` 不使用 | ❌ | (1) focus outline 公式 **4px/offset2** に対し現状 **2px/offset0**、box-shadow 幅逆転。(2) 公式の選択状態は番号バッジ反転 (tab=`role=tab aria-selected`) なのに現状は丸ドット式で公式ビジュアルと別物。(3) `aria-current` 不使用 |
| サイズバリアント (sm/md/lg 等) | image-slider は carousel の「幅狭サイズ」固定。サイズ prop 無し | サイズ prop 無し (slides/autoPlay 等のみ) | ✅ | 該当なし (サイズバリアント概念なし) |
| forced-colors / ハイコントラスト | carousel.css に明示的 forced-colors 無し (system 既定に委ねる)。global focus は forced-colors 内で `!important` outline 維持 | `@include base.dads-forced-colors` で arrow/dot を CanvasText/Highlight 化 | ✅ | 現状の方が手厚い。問題なし |
| 正準CSSの流用 vs 独自実装 (ドリフト温床) | **公式は carousel example (`dads-carousel__*` クラス + `carousel.js` web component) を流用して実装する明示指示。** main-link / next-button / step-nav(tablist) / page-nav / others(disclosure) の構造を持つ | carousel を一切流用せず、`dads-image-slider__*` で独自にフェード式スライダーを新規実装。arrow(‹›)+dot indicator は carousel に存在しない独自 UI | ❌ | **最重要ドリフト**。MD が「carousel コンテナタイプ-マルチ-幅狭で実装」と指定しているのに carousel の構造・CSS・JS を完全に無視。公式 carousel のビジュアル (番号バッジ tablist / next-slide プレビュー / すべてのスライド disclosure / blur 背景) が一切再現されていない |

## 検出した差異 (修正対象)

1. **[high]** 構造の全面ドリフト: 公式は carousel example (`dads-carousel`) を流用して image-slider を実装する指示 (image-slider/index.md:18) だが、現状は carousel を流用せず独自フェード式スライダーを新規実装。公式の番号バッジ tablist・next プレビュー・すべてのスライド disclosure・blur 背景がいずれも欠落。
   - 該当行: `DadsImageSlider.vue:152-228` (template 全体) / 参照: `carousel/carousel.css`, `carousel/container.html`
2. **[high]** focus-visible: 公式 carousel `outline: 4px black; offset 2px; box-shadow 2px yellow-300` → 現状 共有 mixin `outline 2px; offset 0; box-shadow 4px`。outline 太さ/offset と box-shadow 幅が逆転。
   - 該当行: `DadsImageSlider.vue:235,310,357` (`@include ring.dads-focus-ring`) / `src/styles/_focus-ring.scss`
3. **[high]** カラートークン名前空間: `--color-bg-surface` / `--color-text-primary` / `--color-border-divider` / `--color-brand-primary` / `--color-text-secondary` / `--color-border-strong` は DADS 公式に存在しない独自命名。公式 `--color-neutral-*` / `--color-primitive-blue-*` 系へ。
   - 該当行: `DadsImageSlider.vue:240,243,244,253,264,303,304,322,323,324,329,372,377`
4. **[medium]** 選択状態 UI の乖離: 公式は番号バッジ反転 (`role="tab" aria-selected` の `dads-carousel__number`) → 現状は丸ドット (`__indicator-dot`)。ビジュアルが公式と別物。
   - 該当行: `DadsImageSlider.vue:213-225,355-378`
5. **[medium]** コンテナ外枠角丸: 公式 carousel はスライダー外枠に角丸なし → 現状 `border-radius: var(--border-radius-8)` を独自付与。
   - 該当行: `DadsImageSlider.vue:241`
6. **[medium]** `aria-current` 不使用: 公式 carousel は現在スライドに `aria-current="true"` (number) を使用 → 現状未使用。
   - 該当行: `DadsImageSlider.vue:171-183`
7. **[low]** heading レスポンシブ欠落: 公式 heading は 20→24(30rem)→32(64rem) と拡大 + `letter-spacing 0.02em` → 現状 固定 20px、letter-spacing 無し。
   - 該当行: `DadsImageSlider.vue:256-261`
8. **[low]** arrow ヒットターゲット 44px は WAI-ARIA 的に妥当だが公式 carousel page-nav button は 24px+疑似要素 44px。寸法の出し方が公式と異なる。
   - 該当行: `DadsImageSlider.vue:315-316`

## ハードコード / 誤トークンの洗い出し

- `DadsImageSlider.vue:266` `text-underline-offset: 2px` — 直値 (公式は `3/16rem`)。
- `DadsImageSlider.vue:315-316` `width/height: 2.75rem` — arrow の rem 直書き。
- `DadsImageSlider.vue:326,373` `transition: …0.15s ease` — 直値 duration (許容範囲)。
- `DadsImageSlider.vue:359-360` `width/height: 1.25rem` (indicator)、`:369-370` `0.5rem` (dot) — rem 直書き (独自 UI のため公式対応値なし)。
- `DadsImageSlider.vue:194,204` 矢印グリフ `‹` / `›` を文字で直書き — 公式 carousel は SVG path。文字グリフはフォント依存で表示揺れの温床。
- カラー var() 群 (`--color-brand-primary` 等) はフォールバック直値を持つが、変数名が DADS 公式に無い独自命名 (差異 #3)。

## 結論

- **修正要 / 優先度 high**。最大の問題は「公式が carousel example を流用せよと明示しているのに、それを無視して独自スライダーを新規実装した構造ドリフト」(差異 #1)。LanguageSelector で起きた「共有部品を独自再実装してドリフト」事例と同型。
- ビジュアル (番号 tablist / next プレビュー / すべてのスライド disclosure / blur 背景) が公式 carousel と根本的に異なるため、CSS パッチでは解消できず **carousel example の構造移植 (再設計)** が必要。
- 想定 changeset レベル: **major** (構造移植は template/props/slot 形状の変更を伴い、現行 `slides`/`autoPlay`/`showArrows`/`showIndicators` 等の API が破壊的に変わる可能性が高い)。最低でも minor だが API 互換維持は困難。
- API / aria 不変は **保てない見込み**: 公式 carousel 構造へ寄せると、独自の `showArrows`/`showIndicators`/`autoPlay`/`pauseOnHover` 系 props や dot indicator の aria (`role=tab` on dot) が公式 (`dads-carousel__step` tablist / page-nav) と整合せず再設計が要る。段階移行を計画すべき。
</content>
