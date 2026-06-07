# CarouselSingle

公式 DADS の静止画カルーセル単体バリアント (`dads-carousel-single`) の忠実な移植。スライド機構・コントロールを持たず、単一の静止画像のみを表示する。キービジュアルのように 1 枚絵を見せたい場面で使う。複数枚を切り替えたい場合は [Carousel](./carousel) を、横スクロールで並べたい場合は [ImageSlider](./image-slider) を選ぶ。

::: tip ✅ 公式仕様充足
公式 `key-visual-single.html` / `carousel-single.css` を 1:1 で移植。`src` / `alt` / `srcset` / `width` / `height` の画像属性に加え、`href` を渡すとラッパが `<a>` に切り替わり、公式 CSS の `:any-link` による hover / focus 演出が有効になる。
:::

## 基本（リンクなし）

`href` を指定しない場合、ラッパは `<span class="...__link">` として描画される。画像のみを表示する静的なキービジュアル。

<script setup>
import { DadsCarouselSingle } from '@dads/vue'
</script>

<div class="demo">
  <DadsCarouselSingle
    src="/carousel/image-9.webp"
    alt="写真：デジタル公園の大木 - 太い幹があり、そこから伸びる多数の枝が絡み合うように広がっている。枝の間からは青空と緑の葉が見える。"
    :width="1024"
    :height="392"
  />
</div>

```vue
<script setup>
import { DadsCarouselSingle } from '@dads/vue'
</script>

<template>
  <DadsCarouselSingle
    src="/carousel/image-9.webp"
    alt="写真：デジタル公園の大木"
    :width="1024"
    :height="392"
  />
</template>
```

## リンクあり

`href` を渡すとラッパが `<a class="...__link" href>` になり、ホバー（青枠）・フォーカス（黒枠＋黄ハイライト）の演出が有効になる。`target` / `rel` もそのまま透過される。

<div class="demo">
  <DadsCarouselSingle
    src="/carousel/image-9.webp"
    alt="写真：デジタル公園の大木（詳細ページへのリンク）"
    href="https://design.digital.go.jp/dads/"
    target="_blank"
    rel="noopener noreferrer"
    :width="1024"
    :height="392"
  />
</div>

```vue
<DadsCarouselSingle
  src="/carousel/image-9.webp"
  alt="写真：デジタル公園の大木（詳細ページへのリンク）"
  href="https://design.digital.go.jp/dads/"
  target="_blank"
  rel="noopener noreferrer"
  :width="1024"
  :height="392"
/>
```

## srcset（高解像度対応）

`srcset` を渡すと高 DPI ディスプレイ向けに別画像を指定できる。

```vue
<DadsCarouselSingle
  src="/carousel/image-9.webp"
  srcset="/carousel/image-9@2x.webp 2x"
  alt="写真：デジタル公園の大木"
  :width="1024"
  :height="392"
/>
```

## Props

| Prop      | 型       | デフォルト  | 説明                                                                       |
| --------- | -------- | ----------- | -------------------------------------------------------------------------- |
| `src`     | `string` | -（必須）   | 画像の `src`。                                                              |
| `alt`     | `string` | -（必須）   | 画像の代替テキスト。                                                        |
| `srcset`  | `string` | `undefined` | 画像の `srcset`（例: `"image@2x.webp 2x"`）。                               |
| `href`    | `string` | `undefined` | 指定するとラッパが `<a href>` になる。未指定なら `<span>`。                 |
| `target`  | `string` | `undefined` | リンク時の `target`。`href` 指定時のみ意味を持つ。                         |
| `rel`     | `string` | `undefined` | リンク時の `rel`。`href` 指定時のみ意味を持つ。                            |
| `width`   | `number` | `undefined` | 画像の固有幅（px）。CLS 抑止のため指定推奨。                               |
| `height`  | `number` | `undefined` | 画像の固有高さ（px）。CLS 抑止のため指定推奨。                             |

## アクセシビリティ

- `alt` は必須。画像の内容を簡潔に説明する。装飾画像であっても本コンポーネントは内容のある画像を想定しているため、適切な代替テキストを記述する。
- リンク時はネイティブ `<a>` を使うため、キーボードフォーカス・Enter での遷移など標準のリンクセマンティクスを継承する。
- `width` / `height` を指定すると読み込み時のレイアウトシフト（CLS）を抑止できる。
- 公式 CSS は `:any-link` を使うため、hover / focus 演出は `<a>` のときのみ適用され、`<span>`（リンクなし）では発火しない。
