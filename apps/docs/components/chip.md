# Chip

タグ・フィルター・選択サマリーを表すコンパクトな表示要素。デフォルトは `<span>` でラベル用途、`clickable` で `<button>` に昇格し、`closable` で削除ボタンを追加する。

## 基本

<script setup>
import { ref } from 'vue'
import { DadsChip } from '@dads/vue'

const clickCount = ref(0)
const onChipClick = () => { clickCount.value++ }

const tags = ref(['東京都', '神奈川県', '千葉県', '埼玉県'])
const onClose = (tag) => {
  tags.value = tags.value.filter((t) => t !== tag)
}
</script>

<div class="demo">
  <DadsChip>タグ</DadsChip>
</div>

```vue
<script setup>
import { DadsChip } from '@dads/vue'
</script>

<template>
  <DadsChip>タグ</DadsChip>
</template>
```

## Size

3 サイズ (`sm` / `md` / `lg`)。デフォルトは `md`。フォームラベルとの視覚的調和のため、Button にある `xs` は意図的に除外されている。

<div class="demo">
  <div class="demo-row">
    <DadsChip size="sm">SM</DadsChip>
    <DadsChip size="md">MD</DadsChip>
    <DadsChip size="lg">LG</DadsChip>
  </div>
</div>

## Color

5 つの semantic color (`primary` / `success` / `error` / `warning` / `secondary`)。デフォルトは `primary`。

<div class="demo">
  <div class="demo-row">
    <DadsChip color="primary">Primary</DadsChip>
    <DadsChip color="success">Success</DadsChip>
    <DadsChip color="error">Error</DadsChip>
    <DadsChip color="warning">Warning</DadsChip>
    <DadsChip color="secondary">Secondary</DadsChip>
  </div>
</div>

## クリック可能

`clickable` を指定するとルート要素が `<button>` になり、キーボード（Enter / Space）でも `click` イベントが発火する。

<div class="demo">
  <div class="demo-row">
    <DadsChip clickable @click="onChipClick">カテゴリ ({{ clickCount }})</DadsChip>
    <DadsChip clickable color="success">フィルター: 公開</DadsChip>
    <DadsChip clickable color="secondary">並び替え</DadsChip>
  </div>
</div>

## 削除可能

`closable` を指定すると末尾に `×` ボタンが表示され、`close` イベントが発火する。チップ自身の `click` とは独立して動作するため、クリック可能なチップと組み合わせても両方のイベントが衝突しない。

<div class="demo">
  <span class="demo-label">タグの削除（クリックで削除）</span>
  <div class="demo-row">
    <DadsChip
      v-for="tag in tags"
      :key="tag"
      closable
      color="secondary"
      @close="onClose(tag)"
    >
      {{ tag }}
    </DadsChip>
    <span v-if="tags.length === 0">（すべて削除されました）</span>
  </div>
</div>

```vue
<DadsChip closable @close="onClose">東京都</DadsChip>
```

`closeLabel` で削除ボタンのアクセシブル名をカスタマイズできる（デフォルト `'削除'`）。

```vue
<DadsChip closable close-label="このタグを外す">東京都</DadsChip>
```

## 状態

`disabled` はクリック可能・削除可能の両方の操作を抑止する。`clickable` 時はネイティブの `disabled` 属性、それ以外は `aria-disabled="true"` で表現される。

<div class="demo">
  <div class="demo-row">
    <DadsChip>Default</DadsChip>
    <DadsChip disabled>Disabled (span)</DadsChip>
    <DadsChip clickable disabled>Disabled (button)</DadsChip>
    <DadsChip closable disabled>Disabled (closable)</DadsChip>
  </div>
</div>

## アイコン

`prepend` / `append` スロットでアイコン等を差し込める。`closable` を指定した場合は `append` スロットの表示が抑止される（× ボタンとフォーカス・タップ領域が競合しないようにするため）。

利用側で `@mdi/font` の CSS を読み込むことが前提（カタログ側では未ロードのためここでは表示されない）。

```vue
<DadsChip>
  <template #prepend>
    <i class="mdi mdi-tag" />
  </template>
  タグ
</DadsChip>

<DadsChip clickable>
  ステータス
  <template #append>
    <i class="mdi mdi-chevron-down" />
  </template>
</DadsChip>
```

## アバター付きチップ (宛先 / CC 等の人物選択 UI)

`prepend` スロットに `<img>` を差し込むことで、メーラの「宛先 / CC」入力欄に並ぶような **アバター + 名前 + × 削除** のチップを表現できる。DADS 公式 Figma `Chip Tag` の Examples セクションに掲載されている人物選択パターンと整合する用法。

```vue
<DadsChip closable color="secondary" @close="removeRecipient(user)">
  <template #prepend>
    <img :src="user.avatarUrl" alt="" class="recipient-avatar" />
  </template>
  {{ user.name }}
</DadsChip>

<style>
.recipient-avatar {
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 50%;
  object-fit: cover;
}
</style>
```

- `prepend` スロットには **`aria-hidden="true"`** が自動付与されるため、アバター画像の `alt=""` (decorative) で正しく扱える
- 名前テキストはデフォルトスロット (label) に置く → スクリーンリーダーは「田中太郎、削除」のように読み上げる
- `color="secondary"` がメーラ系 UI で最も馴染む配色 (落ち着いたグレー)

## Props

| Prop         | 型                                                              | デフォルト  | 説明                                               |
| ------------ | --------------------------------------------------------------- | ----------- | -------------------------------------------------- |
| `size`       | `'lg' \| 'md' \| 'sm'`                                          | `'md'`      | サイズ (`xs` は意図的に除外)                       |
| `color`      | `'primary' \| 'success' \| 'error' \| 'warning' \| 'secondary'` | `'primary'` | セマンティックカラー                               |
| `closable`   | `boolean`                                                       | `false`     | `×` ボタンを表示し `close` を発火                  |
| `clickable`  | `boolean`                                                       | `false`     | ルートを `<button>` に昇格しキーボード操作を可能に |
| `disabled`   | `boolean`                                                       | `false`     | 操作不可化（clickable / closable 両方に適用）      |
| `closeLabel` | `string`                                                        | `'削除'`    | 削除ボタンのアクセシブル名                         |
| `ariaLabel`  | `string`                                                        | -           | チップ自体のアクセシブル名（clickable 時に推奨）   |

## Events

| Event   | Payload                       | 説明                                            |
| ------- | ----------------------------- | ----------------------------------------------- |
| `click` | `MouseEvent \| KeyboardEvent` | `clickable` 時のクリック / Enter / Space で発火 |
| `close` | `MouseEvent`                  | `closable` 時に `×` ボタンクリックで発火        |

## アクセシビリティ

- `clickable` 時はルート要素が真の `<button>` になり、ネイティブのフォーカス・キーボード操作（Enter / Space）が利用できる
- 非 `clickable` の `disabled` 状態は `aria-disabled="true"` で表現され、視覚的にも操作的にも無効化される
- `×` ボタンには `closeLabel`（デフォルト `'削除'`）でアクセシブル名が必ず付与される
- `prepend` / `append` スロットは装飾用途のため `aria-hidden="true"` が自動付与される。意味のあるテキストはデフォルトスロットに置く
- 削除ボタンのクリックはチップ本体に伝播しないため、`clickable` + `closable` を同時指定しても両イベントが同一ジェスチャーで発火することはない
