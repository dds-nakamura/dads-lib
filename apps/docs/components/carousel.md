# Carousel

複数のスライドを順番に閲覧できるカルーセル。スライドの中身は呼び出し側がデフォルトスロットで自由に組み立てる (画像・カード・任意の HTML)。

> DADS 公式仕様では「自動再生は推奨されない」とされている。`autoPlay` プロパティは Web アクセシビリティ要件 (WCAG 2.2.2) を理解した上で限定的に使用すること。

## 基本

`itemCount` でスライド総数を指定。デフォルトスロットは `index` と `isActive` を受け取り、`index` ベースで内容を出し分ける。

<script setup>
import { ref } from 'vue'
import { DadsCarousel } from '@dads/vue'

const idx1 = ref(0)
const idx2 = ref(0)
const idx3 = ref(0)
const idx4 = ref(0)
const idx5 = ref(0)
const idx6 = ref(0)

const palette = ['#0017c1', '#0064d2', '#1a9af2', '#3aaee0', '#7dd3fc']
</script>

<div class="demo">
  <DadsCarousel v-model="idx1" :item-count="3">
    <template #default="{ index }">
      <div :style="{
        background: palette[index],
        color: '#fff',
        padding: '4rem 1rem',
        textAlign: 'center',
        fontSize: '1.5rem',
        fontWeight: 'bold'
      }">
        スライド {{ index + 1 }} / 3
      </div>
    </template>
  </DadsCarousel>
  <p class="demo-label">現在のインデックス: {{ idx1 }}</p>
</div>

```vue
<script setup>
import { ref } from 'vue'
import { DadsCarousel } from '@dads/vue'

const current = ref(0)
</script>

<template>
  <DadsCarousel v-model="current" :item-count="3">
    <template #default="{ index, isActive }">
      <div :class="['slide', { active: isActive }]">スライド {{ index + 1 }}</div>
    </template>
  </DadsCarousel>
</template>
```

## autoPlay

`autoPlay` を `true` にすると `interval` ms ごとに自動遷移する。デフォルトは 5000ms。

<div class="demo">
  <DadsCarousel v-model="idx2" :item-count="3" auto-play :interval="2000">
    <template #default="{ index }">
      <div :style="{
        background: palette[index + 1],
        color: '#fff',
        padding: '3rem 1rem',
        textAlign: 'center',
        fontWeight: 'bold'
      }">
        Auto Play スライド {{ index + 1 }}
      </div>
    </template>
  </DadsCarousel>
  <p class="demo-label">2 秒ごとに切り替わる (ホバー中は停止)</p>
</div>

```vue
<DadsCarousel :item-count="3" auto-play :interval="2000" />
```

## showArrows

`showArrows` を `false` にすると左右の矢印ボタンが非表示になる。

<div class="demo">
  <DadsCarousel v-model="idx3" :item-count="3" :show-arrows="false">
    <template #default="{ index }">
      <div :style="{
        background: palette[index],
        color: '#fff',
        padding: '3rem 1rem',
        textAlign: 'center'
      }">
        矢印なし {{ index + 1 }}
      </div>
    </template>
  </DadsCarousel>
</div>

```vue
<DadsCarousel :item-count="3" :show-arrows="false" />
```

## showIndicators

`showIndicators` を `false` にするとドットインジケータが非表示になる。

<div class="demo">
  <DadsCarousel v-model="idx4" :item-count="3" :show-indicators="false">
    <template #default="{ index }">
      <div :style="{
        background: palette[index + 1],
        color: '#fff',
        padding: '3rem 1rem',
        textAlign: 'center'
      }">
        インジケータなし {{ index + 1 }}
      </div>
    </template>
  </DadsCarousel>
</div>

```vue
<DadsCarousel :item-count="3" :show-indicators="false" />
```

## loop

`loop` を `false` にすると末尾でラップせず、矢印が無効化される。

<div class="demo">
  <DadsCarousel v-model="idx5" :item-count="3" :loop="false">
    <template #default="{ index }">
      <div :style="{
        background: palette[index],
        color: '#fff',
        padding: '3rem 1rem',
        textAlign: 'center'
      }">
        Loop OFF {{ index + 1 }}
      </div>
    </template>
  </DadsCarousel>
  <p class="demo-label">現在: {{ idx5 + 1 }} / 3</p>
</div>

```vue
<DadsCarousel :item-count="3" :loop="false" />
```

## 任意コンテンツ

スロットで `isActive` を受け取れるので、アクティブなスライドだけ装飾を変えるなど自由に組み立てられる。

<div class="demo">
  <DadsCarousel v-model="idx6" :item-count="3">
    <template #default="{ index, isActive }">
      <div :style="{
        padding: '2rem',
        background: isActive ? '#0017c1' : '#e6ecff',
        color: isActive ? '#fff' : '#1a1a1a',
        textAlign: 'center'
      }">
        <h3 style="margin: 0 0 0.5rem">記事タイトル {{ index + 1 }}</h3>
        <p style="margin: 0">
          ここにカード・画像・任意の Vue コンポーネントを配置できます。
          現在 {{ isActive ? 'アクティブ' : '非アクティブ' }}。
        </p>
      </div>
    </template>
  </DadsCarousel>
</div>

```vue
<DadsCarousel :item-count="3">
  <template #default="{ index, isActive }">
    <article :class="['card', { active: isActive }]">
      <h3>記事タイトル {{ index + 1 }}</h3>
      <p>任意の Vue コンポーネントを配置できる</p>
    </article>
  </template>
</DadsCarousel>
```

## type / mode (公式仕様準拠) [NEW]

公式 DADS は 2 軸の組み合わせを定義する。

- **type**: `'key-visual'` (デフォルト、フラッグシップ用) / `'container'` (見出し付きパネル)
- **mode**: `'single'` (デフォルト、1 枚ずつ) / `'multi'` (複数並列、本実装は将来拡張)

```vue
<DadsCarousel
  type="container"
  heading="お知らせ"
  :heading-level="2"
  show-all-label="一覧へ"
  show-all-href="/news"
  :item-count="3"
>
  <template #default="{ index }">...</template>
</DadsCarousel>
```

`type="container"` は **`heading` 必須** (dev mode で console.warn)。
ヘッダ右側に `showAllLabel` + `showAllHref` 両方指定でリンクを表示。

## 自動再生について (公式非推奨)

`autoPlay` プロップは互換性のため残っているが、**公式 DADS では自動再生機能を備えていないと明言** されているため、使用すると dev mode で console.warn が出力される。アクセシビリティ上、モーション過敏症ユーザーへの配慮として手動操作を基本とすることを強く推奨する。

## Props

| Prop             | 型                            | デフォルト     | 説明                                               |
| ---------------- | ----------------------------- | -------------- | -------------------------------------------------- |
| `modelValue`     | `number`                      | `0`            | 現在表示中のスライドインデックス (v-model 対象)    |
| `itemCount`      | `number`                      | (必須)         | スライド総数。スロットがこの回数だけ呼び出される   |
| `type`           | `'key-visual' \| 'container'` | `'key-visual'` | 用途タイプ。container は heading 必須              |
| `mode`           | `'single' \| 'multi'`         | `'single'`     | 表示モード (multi は将来拡張)                      |
| `heading`        | `string`                      | -              | container type の見出し                            |
| `headingLevel`   | `1 \| 2 \| 3 \| 4 \| 5 \| 6`  | `2`            | 見出しの HTML レベル                               |
| `showAllLabel`   | `string`                      | -              | 「すべて見る」リンクのラベル (href とセットで指定) |
| `showAllHref`    | `string`                      | -              | 「すべて見る」リンクの href                        |
| `autoPlay`       | `boolean`                     | `false`        | **公式非推奨**: `interval` ms ごとに自動遷移       |
| `interval`       | `number`                      | `5000`         | 自動再生の間隔 (ms)                                |
| `pauseOnHover`   | `boolean`                     | `true`         | ホバー中に自動再生を一時停止                       |
| `showArrows`     | `boolean`                     | `true`         | 左右の矢印ボタンを表示                             |
| `showIndicators` | `boolean`                     | `true`         | ドットインジケータを表示                           |
| `loop`           | `boolean`                     | `true`         | 末尾の次で先頭にラップする                         |
| `ariaLabel`      | `string`                      | `'カルーセル'` | アクセシブル名 (`aria-label`)                      |

## Events

| Event               | Payload  | 説明                          |
| ------------------- | -------- | ----------------------------- |
| `update:modelValue` | `number` | v-model 更新 (新インデックス) |
| `change`            | `number` | スライド変更時に発火          |

## Slots

| Slot      | slotProps                              | 説明                                        |
| --------- | -------------------------------------- | ------------------------------------------- |
| `default` | `{ index: number, isActive: boolean }` | 各スライドの内容を `index` ベースで描画する |

## アクセシビリティ

- ルートに `role` 相当として `aria-roledescription="carousel"` を付与
- 各スライドは `role="group"` / `aria-roledescription="slide"` / `aria-label="N / total"` を持つ
- ビューポートは `aria-live="polite"` でスクリーンリーダにスライド遷移を通知
- インジケータは `role="tablist"` / `role="tab"` / `aria-selected` で位置を提示
- 矢印ボタンには `aria-label="前のスライド" / "次のスライド"` を付与
- カルーセル全体にフォーカスを当てると `ArrowLeft` / `ArrowRight` でキーボード操作可能
- WCAG 2.2.2 (一時停止・停止・非表示) — `autoPlay` 使用時は `pauseOnHover` (デフォルト on) を有効に保ち、ユーザーが停止できるようにすること
- 公式 DADS 仕様では自動再生機能を推奨していない。重要なコンテンツは静的レイアウトの利用を検討すること
