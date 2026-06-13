# Carousel

複数のスライド画像を順番に閲覧できる、DADS 公式構造を忠実に移植したカルーセル。各スライドは 1 枚の画像 (任意でリンク付き) で構成し、`slides[]` 配列で渡す。

- ワイド (コンテナ幅 `breakpointRem` 以上): 数値ステップナビ + ネクストプレビュー + 「すべてのスライド」展開
- ナロー (コンテナ幅 `breakpointRem` 未満): 前後矢印 + 「現在 / 総数」表示 (page-nav)
- レイアウトは `@container` クエリで自動切替し、`role="tabpanel"` の付与のみ ResizeObserver で同期する

> 公式 DADS は **自動再生機能を備えていません** (モーション過敏症ユーザーへの配慮 / WCAG 2.2.2)。本コンポーネントにも自動再生 API はありません。

## コンテナ型 (見出しあり)

`heading` を渡すと `<h{headingLevel}>` を描画し、`role="region"` を `aria-labelledby` で見出しに紐付ける。

<script setup>
import { ref } from 'vue'
import { DadsCarousel } from '@dads/vue'

const eventSlides = [
  { src: '/carousel/image-1.webp', alt: '学ぼうSDGs 環境保全ワークショップ開催', href: '#link1', width: 696, height: 392 },
  { src: '/carousel/image-2.webp', alt: '地産地消キャンペーン 名産品や体験イベントを楽しもう', href: '#link2', width: 696, height: 392 },
  { src: '/carousel/image-3.webp', alt: '国立公園・歴史名所スタンプラリー 全国開催', href: '#link3', width: 696, height: 392 },
  { src: '/carousel/image-4.webp', alt: '合同健康診断のお知らせ 6月1日より受付開始', href: '#link4', width: 696, height: 392 },
]

const noLinkSlides = [
  { src: '/carousel/image-1.webp', alt: 'スライド1: SDGsワークショップ', width: 696, height: 392 },
  { src: '/carousel/image-2.webp', alt: 'スライド2: 地産地消キャンペーン', width: 696, height: 392 },
  { src: '/carousel/image-3.webp', alt: 'スライド3: スタンプラリー', width: 696, height: 392 },
]

const idxA = ref(0)
const idxB = ref(0)
const idxC = ref(0)
</script>

<div class="demo">
  <DadsCarousel v-model="idxA" :slides="eventSlides" heading="開催中のイベント" />
  <p class="demo-label">現在のインデックス: {{ idxA }} (幅を 64rem 以上に広げるとステップナビ表示)</p>
</div>

```vue
<script setup>
import { ref } from 'vue'
import { DadsCarousel } from '@dads/vue'

const current = ref(0)
const slides = [
  { src: '/carousel/image-1.webp', alt: '学ぼうSDGs', href: '#link1', width: 696, height: 392 },
  {
    src: '/carousel/image-2.webp',
    alt: '地産地消キャンペーン',
    href: '#link2',
    width: 696,
    height: 392,
  },
  { src: '/carousel/image-3.webp', alt: 'スタンプラリー', href: '#link3', width: 696, height: 392 },
  { src: '/carousel/image-4.webp', alt: '合同健康診断', href: '#link4', width: 696, height: 392 },
]
</script>

<template>
  <DadsCarousel v-model="current" :slides="slides" heading="開催中のイベント" />
</template>
```

## キービジュアル型 (見出しなし)

`heading` を省略すると `role="region"` のアクセシブル名は `ariaLabel` (デフォルト `'スライドショー'`) になる。

<div class="demo">
  <DadsCarousel v-model="idxB" :slides="eventSlides" aria-label="スライドショー" />
</div>

```vue
<DadsCarousel v-model="current" :slides="slides" aria-label="スライドショー" />
```

## リンクなしスライド

`href` を省略したスライドは `<a>` ではなく `<div>` でラップされ、画像表示のみになる。

<div class="demo">
  <DadsCarousel v-model="idxC" :slides="noLinkSlides" heading="お知らせ" :heading-level="3" />
</div>

```vue
<script setup>
const slides = [
  { src: '/carousel/image-1.webp', alt: 'スライド1', width: 696, height: 392 },
  { src: '/carousel/image-2.webp', alt: 'スライド2', width: 696, height: 392 },
  { src: '/carousel/image-3.webp', alt: 'スライド3', width: 696, height: 392 },
]
</script>

<template>
  <DadsCarousel :slides="slides" heading="お知らせ" :heading-level="3" />
</template>
```

## レスポンシブの仕組み

`breakpointRem` (デフォルト `64`) を境に、CSS `@container` クエリでワイド / ナローのレイアウトを自動切替する。JavaScript は ResizeObserver でコンテナ幅を計測し、ワイド時のみメインパネルへ `role="tabpanel"` と `aria-label` を付与する (スクリーンリーダ向けのタブパネル文脈の同期)。

```vue
<!-- 例: 48rem を境に切り替える -->
<DadsCarousel :slides="slides" :breakpoint-rem="48" heading="特集" />
```

## i18n / ラベルの上書き

スクリーンリーダ向けの各種ラベルはすべて prop で上書きできる。

```vue
<DadsCarousel
  :slides="slides"
  aria-label="Slideshow"
  unit="Slide "
  show-all-label="All slides"
  prev-slide-aria-label="Previous slide"
  next-slide-aria-label="Next slide"
  next-preview-label="Next slide"
  step-nav-aria-label="Select slide"
/>
```

## Props

| Prop                 | 型                           | デフォルト           | 説明                                                                     |
| -------------------- | ---------------------------- | -------------------- | ------------------------------------------------------------------------ |
| `slides`             | `DadsCarouselSlide[]`        | (必須)               | 表示するスライド配列                                                     |
| `modelValue`         | `number`                     | `0`                  | 現在表示中のスライドインデックス (v-model 対象)                          |
| `heading`            | `string`                     | -                    | コンテナ型の見出し。指定時 `role="region"` を `aria-labelledby` で紐付け |
| `headingLevel`       | `1 \| 2 \| 3 \| 4 \| 5 \| 6` | `2`                  | 見出しの HTML レベル                                                     |
| `ariaLabel`          | `string`                     | `'スライドショー'`   | 見出し未指定時の `role="region"` のアクセシブル名                        |
| `breakpointRem`      | `number`                     | `64`                 | ワイド / ナローを切り替えるブレークポイント (rem)                        |
| `unit`               | `string`                     | `'スライド'`         | SR ラベルで使うスライドの単位語                                          |
| `showAllLabel`       | `string`                     | `'すべてのスライド'` | 「すべてのスライド」disclosure の summary ラベル                         |
| `prevSlideAriaLabel` | `string`                     | `'前のスライド'`     | ナロー page-nav「前へ」ボタンの aria-label                               |
| `nextSlideAriaLabel` | `string`                     | `'次のスライド'`     | ナロー page-nav「次へ」ボタンの aria-label                               |
| `nextPreviewLabel`   | `string`                     | `'次のスライド'`     | ネクストプレビューボタンの可視ラベル                                     |
| `stepNavAriaLabel`   | `string`                     | `'スライド選択'`     | ステップナビ (tablist) の aria-label                                     |

### `DadsCarouselSlide`

| フィールド | 型       | 必須 | 説明                                            |
| ---------- | -------- | ---- | ----------------------------------------------- |
| `src`      | `string` | ✓    | 画像 URL                                        |
| `alt`      | `string` | ✓    | メイン画像の代替テキスト (装飾なら空文字を明示) |
| `srcset`   | `string` | -    | レスポンシブ画像の `srcset`                     |
| `href`     | `string` | -    | 指定すると画像が `<a href>` でラップされる      |
| `target`   | `string` | -    | リンクの `target` (`href` 指定時のみ)           |
| `rel`      | `string` | -    | リンクの `rel` (`href` 指定時のみ)              |
| `width`    | `number` | -    | 画像の固有幅 (CLS 回避用に推奨)                 |
| `height`   | `number` | -    | 画像の固有高さ (CLS 回避用に推奨)               |

## Events

| Event               | Payload  | 説明                          |
| ------------------- | -------- | ----------------------------- |
| `update:modelValue` | `number` | v-model 更新 (新インデックス) |
| `change`            | `number` | スライド変更時に発火          |

## アクセシビリティ

- ルートは `role="region"` (`heading` 時は `aria-labelledby`、それ以外は `aria-label`)
- メイン領域は `aria-live="polite"` / `aria-atomic="true"` でスライド遷移を通知
- ワイド時のみメインパネルに `role="tabpanel"` + `aria-label` を付与
- ステップナビは `role="tablist"` / `role="tab"` / `aria-selected` + ロービングタブインデックス。`ArrowLeft/Right/Up/Down` で選択移動
- 数値バッジは現在スライドで反転 (`aria-current="true"`)
- ナロー時は page-nav (前後矢印 + 「現在 / 総数」)
- 「すべてのスライド」展開 (`<details>`) で現在以外のスライドを一覧 (現在の次→末尾→先頭の順)
- **自動再生は実装しない** (公式仕様 / WCAG 2.2.2)
