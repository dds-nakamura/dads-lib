# Card

コンテンツをひとまとまりの面として表示するカード。`outlined` / `filled` / `elevated` の 3 バリアントと `header` / default / `footer` の 3 スロットを備える。

## 基本

<script setup>
import { ref } from 'vue'
import { DadsCard, DadsButton } from '@dads/vue'

const clickCount = ref(0)
const onCardClick = () => { clickCount.value++ }
</script>

<div class="demo">
  <DadsCard>
    本文のコンテンツがここに入ります。
  </DadsCard>
</div>

```vue
<script setup>
import { DadsCard } from '@dads/vue'
</script>

<template>
  <DadsCard>本文のコンテンツがここに入ります。</DadsCard>
</template>
```

## Variant

3 つのバリアント (`outlined` / `filled` / `elevated`)。デフォルトは `outlined`。

<div class="demo">
  <div class="demo-row">
    <DadsCard variant="outlined">Outlined</DadsCard>
    <DadsCard variant="filled">Filled</DadsCard>
    <DadsCard variant="elevated">Elevated</DadsCard>
  </div>
</div>

## Elevation

`variant="elevated"` のときのみ有効な、影の段階 (`1` 〜 `8`)。デフォルトは `1`。`outlined` / `filled` では無視される。

<div class="demo">
  <div class="demo-row">
    <DadsCard variant="elevated" :elevation="1">Elevation 1</DadsCard>
    <DadsCard variant="elevated" :elevation="2">Elevation 2</DadsCard>
    <DadsCard variant="elevated" :elevation="4">Elevation 4</DadsCard>
    <DadsCard variant="elevated" :elevation="6">Elevation 6</DadsCard>
    <DadsCard variant="elevated" :elevation="8">Elevation 8</DadsCard>
  </div>
</div>

## Slot

`header` / default / `footer` の 3 スロットを提供する。`header` と `footer` は内容を渡したときのみレンダリングされる。

<div class="demo">
  <DadsCard>
    <template #header>
      <span>カードのタイトル</span>
    </template>

    本文に説明テキストを配置できます。複数行のコンテンツやリストなど、任意のマークアップが入ります。

    <template #footer>
      <DadsButton variant="text">キャンセル</DadsButton>
      <DadsButton>OK</DadsButton>
    </template>

  </DadsCard>
</div>

```vue
<DadsCard>
  <template #header>カードのタイトル</template>

  本文に説明テキストを配置できます。

  <template #footer>
    <DadsButton variant="text">キャンセル</DadsButton>
    <DadsButton>OK</DadsButton>
  </template>
</DadsCard>
```

## クリック可能

`clickable` を渡すと、カード全体が `<button>` としてレンダリングされ、マウスクリックと Enter / Space キーで `click` イベントを発火する。

<div class="demo">
  <DadsCard clickable aria-label="詳細を見る" @click="onCardClick">
    <template #header>
      <span>クリック可能なカード</span>
    </template>
    クリックまたは Enter / Space で活性化します。（クリック回数: {{ clickCount }}）
  </DadsCard>
</div>

```vue
<DadsCard clickable aria-label="詳細を見る" @click="onCardClick">
  <template #header>クリック可能なカード</template>
  クリックまたは Enter / Space で活性化します。
</DadsCard>
```

## 状態

`clickable` でない通常のカードは静的な表示面として機能する。`clickable` の場合はネイティブ `<button>` の挙動に従い、フォーカスリングが自動付与される。

<div class="demo">
  <span class="demo-label">通常</span>
  <div class="demo-row">
    <DadsCard>
      <template #header>静的カード</template>
      コンテンツ表示のみ
    </DadsCard>
  </div>
  <span class="demo-label" style="margin-top:1rem">クリック可能</span>
  <div class="demo-row">
    <DadsCard clickable aria-label="クリック可能カード">
      <template #header>クリック可能カード</template>
      フォーカス・キーボード操作に対応
    </DadsCard>
  </div>
</div>

## Props

| Prop        | 型                                     | デフォルト   | 説明                                                         |
| ----------- | -------------------------------------- | ------------ | ------------------------------------------------------------ |
| `variant`   | `'outlined' \| 'filled' \| 'elevated'` | `'outlined'` | 視覚バリアント                                               |
| `elevation` | `1 \| 2 \| 3 \| 4 \| 5 \| 6 \| 7 \| 8` | `1`          | 影の段階（`variant="elevated"` のときのみ適用）              |
| `clickable` | `boolean`                              | `false`      | カード全体を `<button>` にして Enter / Space 活性化を有効化  |
| `ariaLabel` | `string`                               | -            | クリック可能なカードのアクセシブル名（`clickable` 時に推奨） |

## Events

| Event   | Payload                       | 説明                                                          |
| ------- | ----------------------------- | ------------------------------------------------------------- |
| `click` | `MouseEvent \| KeyboardEvent` | `clickable` のときにマウスクリックまたは Enter / Space で発火 |

## アクセシビリティ

- `clickable` を有効にするとルート要素がネイティブ `<button>` になり、フォーカス管理とキーボード活性化が自動で行われる
- クリック可能なカードには **必ず** `aria-label` でアクセシブル名を与える（カード内容だけでは目的が伝わらないため）
- Enter / Space キーの押下時はデフォルト挙動を抑止し、`click` イベントとして集約される
- `clickable` でない通常のカードは `<div>` としてレンダリングされ、フォーカスを受け取らない
- Windows ハイコントラスト（forced-colors）モードでは `CanvasText` 色で境界線が確実に描画される
