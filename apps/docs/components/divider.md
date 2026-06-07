# Divider

コンテンツブロック間を区切る細い罫線。水平 / 垂直の 2 方向と、水平方向のみラベル付きセパレータ（例: "OR"）に対応する。

## 基本

最小構成は props なし。デフォルトで `horizontal` / `color="gray-420"` のラインを 1 本描画する。

<script setup>
import { DadsDivider } from '@dads/vue'
</script>

<div class="demo">
  <div style="max-width: 360px">
    <p style="margin: 0 0 0.5rem">上のコンテンツ</p>
    <DadsDivider />
    <p style="margin: 0.5rem 0 0">下のコンテンツ</p>
  </div>
</div>

```vue
<script setup>
import { DadsDivider } from '@dads/vue'
</script>

<template>
  <DadsDivider />
</template>
```

## Orientation

2 つの方向 (`horizontal` / `vertical`)。デフォルトは `horizontal`。
垂直方向はコンテナに高さがある場合のみ可視となる。

<div class="demo">
  <span class="demo-label">horizontal</span>
  <div style="max-width: 360px">
    <DadsDivider orientation="horizontal" />
  </div>
  <span class="demo-label" style="margin-top:1rem">vertical</span>
  <div class="demo-row" style="height: 48px; align-items: stretch">
    <span>左</span>
    <DadsDivider orientation="vertical" />
    <span>中</span>
    <DadsDivider orientation="vertical" />
    <span>右</span>
  </div>
</div>

## Color

公式 `data-color` に対応する 3 段階 (`gray-420` / `gray-536` / `black`)。デフォルトは `gray-420`。
区切りを強調したいほど濃い色を使う。

<div class="demo">
  <span class="demo-label">gray-420 (default)</span>
  <div style="max-width: 360px">
    <DadsDivider color="gray-420" />
  </div>
  <span class="demo-label" style="margin-top:1rem">gray-536</span>
  <div style="max-width: 360px">
    <DadsDivider color="gray-536" />
  </div>
  <span class="demo-label" style="margin-top:1rem">black</span>
  <div style="max-width: 360px">
    <DadsDivider color="black" />
  </div>
</div>

## Slot

デフォルトスロットを指定すると、水平方向のみライン中央にラベルを差し込む（左右にライン、中央にテキスト）。
垂直方向ではスロット内容は無視される（仕様）。

<div class="demo">
  <span class="demo-label">ラベル付き (horizontal)</span>
  <div style="max-width: 360px">
    <DadsDivider>OR</DadsDivider>
  </div>
  <span class="demo-label" style="margin-top:1rem">日本語ラベル</span>
  <div style="max-width: 360px">
    <DadsDivider>または</DadsDivider>
  </div>
  <span class="demo-label" style="margin-top:1rem">black + ラベル</span>
  <div style="max-width: 360px">
    <DadsDivider color="black">セクション区切り</DadsDivider>
  </div>
</div>

```vue
<template>
  <DadsDivider>OR</DadsDivider>
</template>
```

## アクセシブルラベル

意味のある区切りには `aria-label` で説明を添える。装飾用途の場合は省略する。

<div class="demo">
  <div style="max-width: 360px">
    <DadsDivider aria-label="プロフィール情報の終わり" />
  </div>
</div>

```vue
<template>
  <DadsDivider aria-label="プロフィール情報の終わり" />
</template>
```

## Props

| Prop          | 型                           | デフォルト     | 説明                                                     |
| ------------- | ---------------------------- | -------------- | -------------------------------------------------------- |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | レイアウト方向                                           |
| `color`       | `'gray-420' \| 'gray-536' \| 'black'` | `'gray-420'` | 線の色（公式 `data-color` 3 段階）            |
| `ariaLabel`   | `string`                     | -              | スクリーンリーダーが読み上げるラベル。装飾用途では省略可 |

## Slots

| Slot      | 説明                                                                         |
| --------- | ---------------------------------------------------------------------------- |
| `default` | 水平方向のみライン中央に表示されるラベルコンテンツ（垂直方向では無視される） |

## Events

このコンポーネントはイベントを発行しない。

## アクセシビリティ

- ルート要素に `role="separator"` を付与し、支援技術にセパレータであることを伝える
- `aria-orientation` には `orientation` の値（`horizontal` / `vertical`）がそのまま反映される
- ライン要素には `aria-hidden="true"` を付与し、装飾要素として読み上げを抑止する
- ラベル（スロット）は `aria-hidden` を付けないため、テキストはそのまま読み上げられる
- 意味のある区切り（例: セクション境界）には `aria-label` を渡して目的を明示する
- 強制カラーモード（High Contrast）では `CanvasText` を使い、不透明度に依存せず可視性を確保
