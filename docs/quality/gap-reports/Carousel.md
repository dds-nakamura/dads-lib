# Gap Report: `DadsCarousel`

> Issue #18 — DADS 公式とのビジュアル差異監査。1 コンポーネント 1 ファイル。

## メタ情報

| 項目 | 値 |
| ---- | ---- |
| Vue 実装 | `packages/vue/src/components/Carousel/DadsCarousel.vue` |
| 真実の源 (一次) | `example` |
| 参照パス | `design-system-example-components-html/src/components/carousel/carousel.css` / `carousel-single.css` / `key-visual-multi.html` / `carousel.mdx` |
| 総合判定 | ❌ 要修正 |
| 重大度 | high |
| 検出差異数 | 12 |

## 観点別チェック

| 観点 | 公式 (正準値) | `@dads/vue` 現状 | 判定 | 備考 / 修正方針 |
| ---- | ------------- | ----------------- | ---- | ---------------- |
| タイポグラフィ (font-family / size / weight / line-height) | `font-family: var(--font-family-sans)`; 見出し `font-size: 20px`(30rem境界→24px、64rem→32px)・`font-weight: bold`・`line-height: 1.5`・`letter-spacing: 0.02em`; 本文 `16px/1.7` (`carousel.css:11-46`) | `font-family: var(--font-family-sans, ...)`; heading `font-size: var(--font-size-20, 1.25rem)`(=20px)・`font-weight: 700`・`line-height: var(--line-height-130, 1.3)` (`DadsCarousel.vue:296,325-329`) | ⚠️ | 基準 20px は一致だが line-height 公式 1.5 vs 1.3、letter-spacing 0.02em 欠落、レスポンシブ(24px/32px)昇格が未実装 |
| カラー (背景 / 文字 / ボーダー: トークン参照) | 本文 `--color-neutral-solid-gray-800`; ステップ番号 border/文字 `--color-neutral-solid-gray-800`・選択時 bg `-gray-800`/文字 `--color-neutral-white`; page-nav `--color-primitive-blue-1000`; next border `--color-neutral-solid-gray-420`; focus 黄 `--color-primitive-yellow-300`/黒 `--color-neutral-black` (`carousel.css:12,56-75,237,428-432`) | bg `--color-bg-surface, #fff`; 文字 `--color-text-primary, #1a1a1a`; border `--color-border-divider, #d6d6d6`; show-all/indicator-active `--color-brand-primary, #0017c1`; indicator-dot `--color-border-strong, rgba(0,0,0,0.24)`; arrow hover `--color-bg-hover` (`DadsCarousel.vue:293-297,304,315,332,400,448,453`) | ❌ | **使用セマンティックトークンが design-tokens に全く存在せず** 全てフォールバック直値で描画。公式の `--color-neutral-*` / `--color-primitive-*` へ全面置換 |
| 角丸 (`--border-radius-*`) | コンテナ角丸なし; main-link focus `8/16rem`; image-container `inherit`; next-button focus `4/16rem`; others summary `8/16rem` (`carousel.css:166,281,322`) | コンテナ `border-radius: var(--border-radius-8, 0.5rem)`(8px); arrow/indicator `50%`(円形) (`DadsCarousel.vue:294,401,440,447`) | ⚠️ | 公式コンテナに角丸は無い(各内部要素 focus 時のみ)。現状はコンテナ全体に 8px。構造が違うため直接比較困難 |
| スペーシング (padding / gap / margin: `--spacing-*`) | controls column-gap `20px`(64rem→32px); step-nav gap `16px`; next padding `24px`; next-label padding `16px`; page-nav gap `12px`; 左右マージン各 48px(MD) (`carousel.css:239,295,307,313,358,411`) | header padding `var(--spacing-16)`(16px); arrow `left/right: var(--spacing-8)`(8px); indicators gap/padding `var(--spacing-8)`(8px) (`DadsCarousel.vue:314,415,419,427-428`) | ❌ | 公式のレイアウト寸法(48px マージン、20/32px controls gap、next 24px 等)と全く異なる。そもそも UI 構造が別物 |
| エレベーション / 影 (`--elevation-*`) | コンテナ影なし。focus-visible の box-shadow と main-bg の blur(25px) ぼかし演出のみ (`carousel.css:120,156`) | コンテナ影なし。arrow に影なし | ✅ | 該当なし(影は持たないのが正)。ただし公式の「ネクストエリア blur ぼかしプレビュー」自体が未実装 |
| ボーダー (太さ / 色 / 有無) | step 番号 `1px solid --color-neutral-solid-gray-800`(円形); next `1px solid --color-neutral-solid-gray-420`(左 border 0); page-nav button `1px solid --color-primitive-blue-1000`; image-container `outline 2px solid 黒/offset -2px` (`carousel.css:56,237,183,428`) | container type `1px solid --color-border-divider`; header border-bottom `1px solid --color-border-divider`; arrow `1px solid --color-border-divider`+`50%` (`DadsCarousel.vue:304,315,400-401`) | ❌ | 公式の step 番号円・next パネル枠・image outline 2px 等が全て独自の arrow/indicator/header 枠に置換。色トークンも誤り |
| 状態 (hover / focus-visible / active / current / disabled / expanded) | focus-visible: `outline 4px 黒 + offset 2px + box-shadow 0 0 0 2px yellow-300`(各内部要素); step `[aria-selected="true"]` で下線除去; step 番号 `[aria-current="true"]/[aria-selected="true"]` で反転(bg-gray-800/白文字/box-shadow/outline); hover で下線太化・outline 演出; `:has([open])` で展開レイアウト切替 (`carousel.css:68-75,162-176,278-283,378-402,462-498`) | arrow `:hover` bg 変化・`:disabled` opacity 0.4; indicator `role=tab`+`aria-selected` でドット色 blue 化; focus: 共有 mixin(黒 2px/offset 0/黄 4px) (`DadsCarousel.vue:404-411,452-454`, `_focus-ring.scss:9-13`) | ❌ | (1) focus outline 公式 4px/offset 2px/box-shadow 2px → 現状 2px/0/4px (2) 公式の `aria-current` ステップ番号反転、`:has([open])` 展開、main-link hover outline 等が未実装 (3) indicator dot は公式の「数値ステップナビ/page-nav」と全く別 UI |
| サイズバリアント (sm/md/lg 等) | サイズ prop は無い。`@container`/`@media` で「スタンダード(64rem〜)」⇔「幅狭(〜64rem)」を自動切替。スタンダードは next エリア+step-nav、幅狭は page-nav(前後矢印+現在/合計) (`carousel.css:19,82,226,310,345,415,462`) | `mode: single/multi` + `visibleCount` prop で段組数を制御。`type: key-visual/container`。コンテナクエリによるレイアウト自動切替は無し (`DadsCarousel.vue:166-183`) | ❌ | 公式は「コンテナ幅で std/narrow を自動切替」、@dads/vue は「visibleCount で段組数を手動指定」。レスポンシブ思想が根本的に異なる |
| forced-colors / ハイコントラスト | 公式 CSS に forced-colors 専用指定なし | `dads-forced-colors` で arrow/indicator-dot を CanvasText/Canvas/Highlight 化 (`DadsCarousel.vue:457-470`) | ⚠️ | 公式より手厚いが、対象 UI(arrow/dot)自体が公式に無いため意味が薄い |
| 正準CSSの流用 vs 独自実装 (ドリフト温床) | スタンダード: 見出し+メイン+ネクスト(blur プレビュー)+ネクストボタン+「すべてのスライド」展開(disclosure)+ステップナビ(数値). 幅狭: page-nav(前後矢印+現在/合計). grid `number/main/next` レイアウト. `<dads-carousel-step-nav>` カスタム要素. disclosure 部品を流用 (`carousel.css:77-99,320,341`; `key-visual-multi.html`) | `<section aria-roledescription="carousel">` + viewport/track(translateX) + 左右円形 arrow + 円形ドット indicator(`role=tablist/tab`). 公式に無い汎用「translate スライダー」を独自実装。autoPlay/pauseOnHover/loop 等 公式が明確に否定する機能を実装 (`DadsCarousel.vue:204-280`) | ❌ | **公式 UI(数値ステップナビ/next blur プレビュー/「すべて表示」展開/page-nav)を一切再現せず、汎用 translate カルーセル+ドット indicator+矢印に全面置換。** さらに MD が明確に禁止する自動再生(autoPlay)を実装。最重要・最大のドリフト |

## 検出した差異 (修正対象)

1. **[high]** 正準CSS流用: 公式の「数値ステップナビ / ネクスト blur プレビュー / 『すべてのスライド』disclosure 展開 / 幅狭時 page-nav」を一切再現せず、汎用 translateX スライダー + 円形ドット indicator + 左右矢印で全面独自実装。
   - 該当行: `DadsCarousel.vue:222-279`, `:344-454`
2. **[high]** カラー: bg/文字/border/アクセント全色が design-tokens 未定義の `--color-bg-surface` / `--color-text-primary` / `--color-border-divider` / `--color-brand-primary` / `--color-border-strong` / `--color-bg-hover` を参照。公式 `--color-neutral-*` / `--color-primitive-blue-*` へ置換。
   - 該当行: `DadsCarousel.vue:293,296,304,315,332,400,448,453`
3. **[high]** 自動再生: MD「本デザインシステムは自動再生機能を備えていません」「2.2.2 自動再生機能を実装しない」に反し `autoPlay`/`interval`/`pauseOnHover` を実装(dev 警告は出すが機能は残置)。
   - 該当行: `DadsCarousel.vue:87-121`, types `autoPlay`/`interval`/`pauseOnHover`
4. **[high]** サイズ/レスポンシブ: 公式は `@container` で std(64rem〜)⇔ 幅狭を自動切替し UI 構成が変化。現状は `visibleCount` 手動指定でコンテナクエリ非対応。
   - 該当行: `DadsCarousel.vue:166-183,371-381`
5. **[high]** ナビ UI: 公式は数値ステップナビ(`aria-current` で番号反転)+幅狭 page-nav(現在/合計表示)。現状は円形ドット tablist。公式と別物。
   - 該当行: `DadsCarousel.vue:260-279`
6. **[medium]** 状態(focus): 公式 outline 4px/offset 2px/box-shadow 2px → 現状 2px/0/4px。
   - 該当行: `_focus-ring.scss:9-13`
7. **[medium]** ネクストエリア blur プレビュー欠落: 公式の「次スライドぼかしプレビュー」(main-bg/next-bg の blur 25px)が未実装。
   - 該当行: 該当 CSS なし(機能丸ごと欠落)
8. **[medium]** タイポ: heading line-height 公式 1.5 → 現状 1.3、letter-spacing 0.02em 欠落、レスポンシブ昇格(24/32px) 未実装。
   - 該当行: `DadsCarousel.vue:327-328`
9. **[low]** show-all リンク色: 公式 next 等は `--color-primitive-blue-1000`。現状 `--color-brand-primary, #0017c1`(存在しないトークン)。
   - 該当行: `DadsCarousel.vue:332`
10. **[low]** 角丸: 公式コンテナに角丸無し(内部 focus 時のみ)。現状はコンテナ 8px。
   - 該当行: `DadsCarousel.vue:294`
11. **[low]** arrow disabled: `opacity: 0.4` で代替。公式は loop 前提で arrow disabled の概念が薄い。
   - 該当行: `DadsCarousel.vue:408-411`
12. **[low]** indicator dot サイズ `0.5rem`・arrow `2.75rem`: トークン外マジックナンバー。
   - 該当行: `DadsCarousel.vue:391-392,445-447`

## ハードコード / 誤トークンの洗い出し

- **誤トークン (design-tokens に存在しない → フォールバック直値で描画)**: `--color-bg-surface, #fff` / `rgba(255,255,255,0.85)` (`:293,399`)、`--color-text-primary, #1a1a1a` (`:296,398`)、`--color-border-divider, #d6d6d6` (`:304,315,400`)、`--color-brand-primary, #0017c1` (`:332,453`)、`--color-border-strong, rgba(0,0,0,0.24)` (`:448`)、`--color-bg-hover, rgba(0,0,0,0.04)` (`:405`)
- **マジックナンバー (トークン外直値)**: arrow `width/height: 2.75rem` (`:391-392`)、indicator `1.25rem` (`:435-436`)、dot `0.5rem` (`:445-446`)、`opacity: 0.4` (`:410`)、`transition 0.15s/0.25s` (`:373,402,449`)、`text-underline-offset: 2px` (`:334`)
- **font-weight 直値** `700` (`:326`)

## 結論

- 修正要否: **要修正 (high)**。3 コンポーネント中、構造ドリフトが最も深刻。公式の数値ステップナビ / next blur プレビュー / 「すべて表示」展開 / 幅狭 page-nav という固有 UI を一切再現せず、汎用 translate スライダーで置換。加えて MD が明確に禁止する自動再生を実装している。
- 優先度: 高(構造観点では最優先)。色トークン置換だけでは不足で、UI 構造そのものの再設計が必要。
- 想定 changeset レベル: **major**。公式 UI への構造刷新は公開 props(`mode`/`visibleCount`/`autoPlay`/`interval`/`pauseOnHover`/`showArrows`/`showIndicators` 等)の大幅変更を伴う。最低でも autoPlay 系の削除は破壊的変更。色/focus のみの是正に留めるなら一時的に minor だが、本質的な準拠には major。
- API/aria 不変: 不変を保てない。公式準拠には DOM 構造・aria(`role=tablist/tab` → 数値ステップナビ + `aria-current`)・props の刷新が必要。
