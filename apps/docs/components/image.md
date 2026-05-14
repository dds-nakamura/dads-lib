# Image

画像表示用のコンポーネント。ネイティブ `<img loading="lazy">` をラップし、エラー時のフォールバック画像、`<figcaption>` 付き表示、`object-fit` の切替を提供する。

## 基本

`src` と `alt` は必須。装飾目的の画像では `alt=""` を渡してスクリーンリーダーに無視させる。

<script setup>
import { DadsImage } from '@dads/vue'
</script>

<div class="demo">
  <DadsImage
    src="https://placehold.co/600x400"
    alt="サンプル画像 600x400"
    width="600"
    height="400"
  />
</div>

```vue
<script setup>
import { DadsImage } from '@dads/vue'
</script>

<template>
  <DadsImage
    src="https://placehold.co/600x400"
    alt="サンプル画像 600x400"
    width="600"
    height="400"
  />
</template>
```

## キャプション付き (figure)

`caption` を渡すと `<figure>` + `<figcaption>` 構造でレンダリングされる。

<div class="demo">
  <DadsImage
    src="https://placehold.co/480x320"
    alt="東京の街並みの写真"
    width="480"
    height="320"
    caption="図1: 東京の街並み (出典: placeholder)"
  />
</div>

```vue
<DadsImage
  src="https://placehold.co/480x320"
  alt="東京の街並みの写真"
  width="480"
  height="320"
  caption="図1: 東京の街並み (出典: placeholder)"
/>
```

## プレースホルダ (エラー時フォールバック)

`placeholder` に画像URLを渡すと、メインの `src` がロード失敗したときに自動でその URL に差し替わる。

<div class="demo">
  <DadsImage
    src="https://example.invalid/missing.jpg"
    alt="読み込み失敗時の例"
    width="320"
    height="240"
    placeholder="https://placehold.co/320x240?text=Fallback"
  />
</div>

```vue
<DadsImage
  src="https://example.invalid/missing.jpg"
  alt="読み込み失敗時の例"
  width="320"
  height="240"
  placeholder="https://placehold.co/320x240?text=Fallback"
/>
```

## objectFit

`objectFit` を切り替えて画像のフィット方法を制御する。デフォルトは `cover`。

<div class="demo">
  <div class="demo-row" style="align-items: flex-start; gap: 1rem;">
    <div>
      <p style="margin: 0 0 0.25rem"><code>cover</code></p>
      <DadsImage
        src="https://placehold.co/400x200"
        alt=""
        width="200"
        height="200"
        object-fit="cover"
      />
    </div>
    <div>
      <p style="margin: 0 0 0.25rem"><code>contain</code></p>
      <DadsImage
        src="https://placehold.co/400x200"
        alt=""
        width="200"
        height="200"
        object-fit="contain"
      />
    </div>
    <div>
      <p style="margin: 0 0 0.25rem"><code>fill</code></p>
      <DadsImage
        src="https://placehold.co/400x200"
        alt=""
        width="200"
        height="200"
        object-fit="fill"
      />
    </div>
    <div>
      <p style="margin: 0 0 0.25rem"><code>none</code></p>
      <DadsImage
        src="https://placehold.co/400x200"
        alt=""
        width="200"
        height="200"
        object-fit="none"
      />
    </div>
  </div>
</div>

## width / height

`width` と `height` は数値（CSS px として扱われる）または任意の文字列 (例: `'50%'`, `'auto'`) を受け付ける。**ブラウザの CLS (Cumulative Layout Shift) を抑えるため、可能な限り両方とも明示する** こと。

<div class="demo">
  <DadsImage
    src="https://placehold.co/800x300"
    alt="幅・高さ指定の例"
    width="400"
    height="150"
  />
</div>

```vue
<DadsImage src="https://placehold.co/800x300" alt="幅・高さ指定の例" width="400" height="150" />
```

## Props

| Prop          | 型                                         | デフォルト | 説明                                          |
| ------------- | ------------------------------------------ | ---------- | --------------------------------------------- |
| `src`         | `string`                                   | -          | 画像 URL (必須)                               |
| `alt`         | `string`                                   | -          | 代替テキスト (必須・装飾なら `''`)            |
| `width`       | `number \| string`                         | -          | 幅 (数値は px 扱い)                           |
| `height`      | `number \| string`                         | -          | 高さ (数値は px 扱い)                         |
| `loading`     | `'lazy' \| 'eager'`                        | `'lazy'`   | ネイティブ lazy-loading                       |
| `placeholder` | `string`                                   | -          | エラー時に差し替えるフォールバック URL        |
| `objectFit`   | `'cover' \| 'contain' \| 'fill' \| 'none'` | `'cover'`  | `object-fit` モード                           |
| `caption`     | `string`                                   | -          | 指定時は `<figure>` + `<figcaption>` でラップ |

## Events

| Event   | Payload | 説明                                                          |
| ------- | ------- | ------------------------------------------------------------- |
| `load`  | `Event` | `<img>` のロードが成功したとき                                |
| `error` | `Event` | `<img>` のロードが失敗したとき (フォールバック適用前にも発火) |

## アクセシビリティ

- **`alt` は必ず渡す**: コンテンツとしての意味があるなら 1〜2 文で内容を表す説明、純粋な装飾なら `alt=""` を渡す。`alt=""` のときスクリーンリーダーは画像を読み飛ばす。
- 画像内のテキストは可能な限り本文に書き出すこと (機械翻訳・拡大・スクリーンリーダー対応のため)。
- `width` / `height` を明示することでブラウザは事前にレイアウト領域を確保でき、CLS (Cumulative Layout Shift) を回避できる。
- `loading="lazy"` を活用してスクロール圏外画像の取得を遅延させ、初回表示パフォーマンスを向上させる。ヒーロー領域など即座に必要な画像のみ `eager` に切り替える。
- 強制色モード (Windows ハイコントラスト等) では画像枠が `CanvasText` 色で描画されるよう調整されている。
