# ScrollTopButton

ページを下までスクロールしたユーザーが、画面右下（または左下）のボタン 1 クリックで先頭まで戻れるようにする固定配置ボタン。

::: warning DADS 公式での扱い
このコンポーネントは DADS 公式仕様において **非推奨 (deprecated)** とマークされています。新規画面ではブラウザ標準のスクロール操作やセクション内ナビゲーションを優先し、やむを得ず採用する場合は影響を受けるユーザー（モーション過敏・スクリーンリーダー利用者など）を慎重に検討してください。
:::

## 基本

`window.scrollY` が `showOffset` (デフォルト 200px) を超えると表示され、クリックすると `window.scrollTo({ top: 0, behavior: 'smooth' })` でページ先頭までスムーススクロールする。

<script setup>
import { DadsScrollTopButton } from '@dads/vue'
</script>

<div class="demo">
  <div style="height: 600px; padding: 1rem; border: 1px dashed var(--vp-c-divider); border-radius: 4px;">
    <p>スクロール用のダミーコンテンツ。ページを 200px 以上スクロールするとボタンが表示されます。</p>
  </div>
  <DadsScrollTopButton />
</div>

```vue
<script setup>
import { DadsScrollTopButton } from '@dads/vue'
</script>

<template>
  <DadsScrollTopButton />
</template>
```

## showOffset

ボタンが表示されるまでの最小スクロール量を指定する (単位: px)。デフォルトは `200`。

```vue
<DadsScrollTopButton :show-offset="500" />
```

`showOffset` を小さくするとページ上部でもすぐにボタンが現れ、大きくするとユーザーが十分に下までスクロールしたタイミングでのみ提示される。

## position

ボタンの配置位置 (`bottom-right` / `bottom-left`)。デフォルトは `bottom-right`。

```vue
<DadsScrollTopButton position="bottom-left" />
```

左下に配置するときは、画面下部に固定する他の要素 (ヘルプチャットや通知トースト) との重なりに注意する。

## ariaLabel

ボタンの読み上げラベル。デフォルトは `'ページの先頭へ戻る'`。多言語化する場合や、より具体的な説明を与えたい場合に上書きする。

```vue
<DadsScrollTopButton aria-label="Back to top of page" />
```

## disabled

`disabled` を `true` にすると操作不能となり、クリックしてもスクロールせず `click` イベントも発行しない。一時的にナビゲーションを抑止したい場合に使う。

```vue
<DadsScrollTopButton disabled />
```

## Props

| Prop         | 型                                | デフォルト             | 説明                                      |
| ------------ | --------------------------------- | ---------------------- | ----------------------------------------- |
| `showOffset` | `number`                          | `200`                  | ボタン表示のしきい値 (px)                 |
| `ariaLabel`  | `string`                          | `'ページの先頭へ戻る'` | アクセシブル名                            |
| `position`   | `'bottom-right' \| 'bottom-left'` | `'bottom-right'`       | 画面上の配置                              |
| `disabled`   | `boolean`                         | `false`                | 操作不可化 (クリック時のスクロールを抑止) |

## Events

| Event   | Payload      | 説明                                          |
| ------- | ------------ | --------------------------------------------- |
| `click` | `MouseEvent` | クリック発火時。`disabled` の場合は発火しない |

## アクセシビリティ

- アイコンのみで表示されるため `aria-label` を **必ず** 持つ（デフォルト値も提供）。
- 内部の SVG アイコンには `aria-hidden="true"` を付与し、読み上げノイズを避ける。
- `disabled` 時はネイティブの `disabled` 属性で操作を抑止する。
- フォーカス時は DADS 標準のフォーカスリング（黒 2px + 黄シャドウ）を表示する。
- スムーススクロールは `behavior: 'smooth'` を用いるため、OS の「視差効果を減らす」設定 (`prefers-reduced-motion`) を有効にしているユーザーにはブラウザが自動的に瞬時スクロールへ降格する。
- `forced-colors: active` 環境では OS のシステムカラーを優先する CSS が当たり、コントラストを維持する。
