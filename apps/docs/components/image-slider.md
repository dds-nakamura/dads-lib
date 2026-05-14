# ImageSlider

イメージスライダー (Image Slider) は、複数のイメージを切り替えて閲覧できるコンポーネント。ギャラリーやヒーローエリアでの実装に活用される。DADS 公式仕様では Carousel コンポーネントの「コンテナタイプ - マルチ - 幅狭サイズ」を再構成したもの。

参考: <https://design.digital.go.jp/dads/components/image-slider/>

## 基本

`slides` に表示するスライドの配列、`v-model` に現在のインデックスを渡す。左右の矢印・ドットインジケータ・キーボード矢印キー (←/→) で操作できる。

<script setup>
import { ref } from 'vue'
import { DadsImageSlider } from '@dads/vue'

const slides = [
  { src: 'https://placehold.co/600x400/0017c1/ffffff?text=Slide+1', alt: 'スライド 1', caption: '最初のスライド' },
  { src: 'https://placehold.co/600x400/00bcd4/ffffff?text=Slide+2', alt: 'スライド 2', caption: '2 枚目のスライド' },
  { src: 'https://placehold.co/600x400/4caf50/ffffff?text=Slide+3', alt: 'スライド 3', caption: '3 枚目のスライド' },
]
const idx = ref(0)

const idxAuto = ref(0)
const idxNoArrows = ref(0)
const idxNoIndicators = ref(0)
const idxNoLoop = ref(0)
const idxInterval = ref(0)
</script>

<div class="demo">
  <DadsImageSlider v-model="idx" :slides="slides" />
  <p class="demo-label">現在のインデックス: <strong>{{ idx }}</strong></p>
</div>

```vue
<script setup>
import { ref } from 'vue'
import { DadsImageSlider } from '@dads/vue'

const slides = [
  {
    src: 'https://placehold.co/600x400?text=Slide+1',
    alt: 'スライド 1',
    caption: '最初のスライド',
  },
  {
    src: 'https://placehold.co/600x400?text=Slide+2',
    alt: 'スライド 2',
    caption: '2 枚目のスライド',
  },
  { src: 'https://placehold.co/600x400?text=Slide+3', alt: 'スライド 3' },
]
const idx = ref(0)
</script>

<template>
  <DadsImageSlider v-model="idx" :slides="slides" />
</template>
```

## autoPlay

`auto-play` を有効にすると `interval` (ms) 毎に自動で次のスライドへ遷移する。デフォルトでホバー中は一時停止する (`pause-on-hover`)。

<div class="demo">
  <DadsImageSlider v-model="idxAuto" :slides="slides" auto-play :interval="3000" />
  <p class="demo-label">マウスを乗せると一時停止します</p>
</div>

```vue
<DadsImageSlider v-model="idx" :slides="slides" auto-play :interval="3000" />
```

## showArrows

`show-arrows="false"` で左右矢印ボタンを非表示にできる。

<div class="demo">
  <DadsImageSlider v-model="idxNoArrows" :slides="slides" :show-arrows="false" />
</div>

```vue
<DadsImageSlider v-model="idx" :slides="slides" :show-arrows="false" />
```

## showIndicators

`show-indicators="false"` でドットインジケータを非表示にできる。

<div class="demo">
  <DadsImageSlider v-model="idxNoIndicators" :slides="slides" :show-indicators="false" />
</div>

```vue
<DadsImageSlider v-model="idx" :slides="slides" :show-indicators="false" />
```

## loop

`loop="false"` のとき、最後のスライドで次へ、最初のスライドで前へ進むことはできない。境界に達した矢印ボタンは disabled になる。

<div class="demo">
  <DadsImageSlider v-model="idxNoLoop" :slides="slides" :loop="false" />
</div>

```vue
<DadsImageSlider v-model="idx" :slides="slides" :loop="false" />
```

## interval

`interval` (ms) で自動再生の切替速度を指定する。デフォルトは `5000`。

<div class="demo">
  <DadsImageSlider v-model="idxInterval" :slides="slides" auto-play :interval="1500" />
</div>

```vue
<DadsImageSlider v-model="idx" :slides="slides" auto-play :interval="1500" />
```

## Props

| Prop             | 型                       | デフォルト             | 説明                                             |
| ---------------- | ------------------------ | ---------------------- | ------------------------------------------------ |
| `modelValue`     | `number`                 | `0`                    | 現在表示中のスライドインデックス (v-model 対象)  |
| `slides`         | `DadsImageSliderSlide[]` | -                      | 表示するスライド配列 (必須)                      |
| `autoPlay`       | `boolean`                | `false`                | `true` のとき自動再生                            |
| `interval`       | `number`                 | `5000`                 | 自動再生の間隔 (ms)                              |
| `pauseOnHover`   | `boolean`                | `true`                 | ホバー時に自動再生を一時停止                     |
| `showArrows`     | `boolean`                | `true`                 | 前へ/次への矢印ボタンを表示                      |
| `showIndicators` | `boolean`                | `true`                 | スライド位置を示すドットインジケータを表示       |
| `loop`           | `boolean`                | `true`                 | 末尾から先頭へ (および先頭から末尾へ) ラップする |
| `ariaLabel`      | `string`                 | `'イメージスライダー'` | スライダ全体のアクセシブル名 (`aria-label`)      |

### `DadsImageSliderSlide`

| プロパティ | 型       | 必須 | 説明                                       |
| ---------- | -------- | ---- | ------------------------------------------ |
| `src`      | `string` | はい | 表示する画像の URL                         |
| `alt`      | `string` | はい | スクリーンリーダ向けの代替テキスト         |
| `caption`  | `string` | -    | 任意のキャプション。指定時は画像下部に表示 |

## Events

| Event               | Payload  | 説明                                   |
| ------------------- | -------- | -------------------------------------- |
| `update:modelValue` | `number` | v-model 用。新しいスライドインデックス |
| `change`            | `number` | スライドが切り替わったとき発火         |

## アクセシビリティ

- ルート要素に `aria-roledescription="carousel"` と `aria-label`（既定: `イメージスライダー`）を付与
- 各スライドは `role="group"` / `aria-roledescription="slide"` を持ち、非アクティブなスライドには `aria-hidden="true"` が付与される
- ビューポートは `aria-live="polite"` で変更がスクリーンリーダに通知される
- 矢印ボタンには `前のスライド` / `次のスライド` の `aria-label` を付与
- インジケータは `role="tablist"` + `role="tab"` で構成し、アクティブな項目に `aria-selected="true"` を設定
- ルートにフォーカスが当たっている状態で、左右矢印キー (`ArrowLeft` / `ArrowRight`) で前後のスライドへ移動できる
- `auto-play` 利用時は `pause-on-hover` を有効にしておくこと（読み上げ中の意図しない切替を防ぐ）
