---
'@dads/vue': major
---

T7 carousel 系移植 (Issue #18, 案X フル) — Carousel / ImageSlider を公式 `dads-carousel` 構造へ忠実移植し、静的単一バリアント `DadsCarouselSingle` を追加。両既存コンポーネントとも公開 API が変わる **破壊的変更**。

### DadsCarousel — 公式 `dads-carousel` を忠実移植

汎用 translateX スライダー (slot + `itemCount` + 自動再生 + 丸ドット) を廃し、公式構造へ全面書き換え。

- **新 API**: `slides: DadsCarouselSlide[]`(画像+任意リンク) / `modelValue`(v-model) / `heading`+`headingLevel`(コンテナ型) / `ariaLabel`(キービジュアル型) / `breakpointRem`(既定64) / `unit` / `showAllLabel` / 各 i18n aria ラベル。emits `update:modelValue` / `change`
- **削除**: `itemCount` + デフォルトスロット(`DadsCarouselSlotProps`) / `type` / `mode` / `visibleCount` / `autoPlay` / `interval` / `pauseOnHover` / `showArrows` / `showIndicators` / `loop` / ドット indicator 系
- 数値ステップナビ(`role=tablist`・ロービングタブインデックス・Arrow キー・`aria-selected`) / next blur プレビュー / 「すべてのスライド」`<details>` 展開 / 幅狭 page-nav / blur 背景 / `@container(breakpointRem)` レスポンシブ(+ ResizeObserver でワイド時 `role=tabpanel` 同期)。現在番号に `aria-current="true"`、外周角丸撤去、見出し 20→24→32px

### DadsImageSlider — DadsCarousel の薄ラッパ化

公式 MD「image-slider = カルーセルのコンテナ型・マルチ・幅狭サイズ」に従い、独自フェード式を全廃して **DadsCarousel へ委譲**(見出し必須プリセット)。

- **新 API**: `slides`(=`DadsCarouselSlide`) / `heading`(必須) / `modelValue` / `headingLevel` / `breakpointRem` / `unit` / `showAllLabel` / 各 aria ラベル。emits `update:modelValue` / `change`
- **削除**: `autoPlay` / `interval` / `pauseOnHover` / `showArrows` / `showIndicators` / `loop` / `caption`(非公式)

### DadsCarouselSingle (新規)

公式 `dads-carousel-single`(静的 1 枚絵・任意リンク)を新規追加。`href` 指定で `<a>`、未指定で `<span>` ラップ。Props: `src`/`alt`(必須) + `srcset`/`href`/`target`/`rel`/`width`/`height`。

### マイグレーション

```vue
<!-- before: 汎用スロット + 自動再生 -->
<DadsCarousel :item-count="3" auto-play v-model="i"><template #default="{ index }">…</template></DadsCarousel>
<!-- after: slides データ駆動 -->
<DadsCarousel v-model="i" :slides="[{ src, alt, href }]" heading="開催中のイベント" />
```

自動再生は公式 MD が禁止のため全廃 (`autoPlay`/`interval`/`pauseOnHover` 削除)。スライド内容は任意要素ではなく画像 (`slides[].src`) ベースに変更。
