# ImageSlider

複数のイメージを切り替えて閲覧できる、ギャラリー用途のスライダー。

公式 DADS では image-slider は **カルーセルの「コンテナ型・マルチ・幅狭サイズ」** と定義されているため、本コンポーネントは [`DadsCarousel`](./carousel) の薄いラッパとして実装されており、**見出し (`heading`) を必須にしたコンテナ型プリセット** です。構造・挙動・アクセシビリティはすべて Carousel に準拠します。

> 公式 DADS は **自動再生機能を備えていません**。本コンポーネントにも自動再生 API はありません。

## 基本

`heading` は必須です (image-slider はコンテナ型のため)。各スライドは 1 枚の画像 (任意でリンク付き) を `slides[]` で渡します。

<script setup>
import { ref } from 'vue'
import { DadsImageSlider } from '@dads/vue'

const gallerySlides = [
  { src: '/carousel/image-1.webp', alt: '写真1: SDGsワークショップの様子', width: 696, height: 392 },
  { src: '/carousel/image-2.webp', alt: '写真2: 地産地消キャンペーン', width: 696, height: 392 },
  { src: '/carousel/image-3.webp', alt: '写真3: スタンプラリー', width: 696, height: 392 },
]

const linkedSlides = [
  { src: '/carousel/image-1.webp', alt: '記事1のサムネイル', href: '#article1', width: 696, height: 392 },
  { src: '/carousel/image-2.webp', alt: '記事2のサムネイル', href: '#article2', width: 696, height: 392 },
]

const idxA = ref(0)
const idxB = ref(0)
</script>

<div class="demo">
  <DadsImageSlider v-model="idxA" :slides="gallerySlides" heading="フォトギャラリー" />
  <p class="demo-label">現在のインデックス: {{ idxA }}</p>
</div>

```vue
<script setup>
import { ref } from 'vue'
import { DadsImageSlider } from '@dads/vue'

const current = ref(0)
const slides = [
  { src: '/img/1.webp', alt: '写真1', width: 696, height: 392 },
  { src: '/img/2.webp', alt: '写真2', width: 696, height: 392 },
  { src: '/img/3.webp', alt: '写真3', width: 696, height: 392 },
]
</script>

<template>
  <DadsImageSlider v-model="current" :slides="slides" heading="フォトギャラリー" />
</template>
```

## リンク付きスライド

各スライドに `href` を指定すると、画像が `<a href>` でラップされます。

<div class="demo">
  <DadsImageSlider v-model="idxB" :slides="linkedSlides" heading="特集記事" :heading-level="3" />
</div>

```vue
<DadsImageSlider
  v-model="current"
  :slides="[
    { src: '/img/1.webp', alt: '記事1', href: '/articles/1' },
    { src: '/img/2.webp', alt: '記事2', href: '/articles/2' },
  ]"
  heading="特集記事"
  :heading-level="3"
/>
```

## Props

| Prop                 | 型                           | デフォルト           | 説明                                                            |
| -------------------- | ---------------------------- | -------------------- | --------------------------------------------------------------- |
| `slides`             | `DadsImageSliderSlide[]`     | (必須)               | 表示するスライド配列                                            |
| `heading`            | `string`                     | (必須)               | セクション見出し。`role="region"` に `aria-labelledby` で紐付け |
| `modelValue`         | `number`                     | `0`                  | 現在表示中のスライドインデックス (v-model 対象)                 |
| `headingLevel`       | `1 \| 2 \| 3 \| 4 \| 5 \| 6` | `2`                  | 見出しの HTML レベル                                            |
| `breakpointRem`      | `number`                     | `64`                 | ワイド / ナローを切り替えるブレークポイント (rem)              |
| `unit`               | `string`                     | `'スライド'`         | SR ラベルで使うスライドの単位語                                |
| `showAllLabel`       | `string`                     | `'すべてのスライド'` | 「すべてのスライド」disclosure の summary ラベル               |
| `prevSlideAriaLabel` | `string`                     | `'前のスライド'`     | ナロー page-nav「前へ」ボタンの aria-label                     |
| `nextSlideAriaLabel` | `string`                     | `'次のスライド'`     | ナロー page-nav「次へ」ボタンの aria-label                     |
| `nextPreviewLabel`   | `string`                     | `'次のスライド'`     | ネクストプレビューボタンの可視ラベル                          |
| `stepNavAriaLabel`   | `string`                     | `'スライド選択'`     | ステップナビ (tablist) の aria-label                           |

`DadsImageSliderSlide` は [`DadsCarouselSlide`](./carousel#dadscarouselslide) と同一です (`src` / `alt` 必須、`srcset` / `href` / `target` / `rel` / `width` / `height` 任意)。

## Events

| Event               | Payload  | 説明                          |
| ------------------- | -------- | ----------------------------- |
| `update:modelValue` | `number` | v-model 更新 (新インデックス) |
| `change`            | `number` | スライド変更時に発火          |

## アクセシビリティ

[`DadsCarousel` のアクセシビリティ](./carousel#アクセシビリティ) に準拠します (region / `aria-live` メイン / ワイド時 tabpanel / tablist ステップナビ / ナロー page-nav / 自動再生なし)。image-slider は見出し必須のため、常に `aria-labelledby` で名前付けされます。
