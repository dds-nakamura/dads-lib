# ChipTag

**対話可能** なタグ要素。フィルタ・選択サマリ・宛先 / CC・適用済み条件など、ユーザがクリックしたり削除したりするチップに使う。公式 slug は `chip-tag`。

読み取り専用のステータスバッジには [ChipLabel](./chip-label) を使う。

## 基本

<script setup>
import { ref } from 'vue'
import { DadsChipTag } from '@dads/vue'

const clickCount = ref(0)
const onChipClick = () => { clickCount.value++ }

const tags = ref(['東京都', '神奈川県', '千葉県', '埼玉県'])
const onClose = (tag) => {
  tags.value = tags.value.filter((t) => t !== tag)
}
</script>

<div class="demo">
  <DadsChipTag>タグ</DadsChipTag>
</div>

```vue
<script setup>
import { DadsChipTag } from '@dads/vue'
</script>

<template>
  <DadsChipTag>タグ</DadsChipTag>
</template>
```

## Size / Color

ChipLabel と同じ 3 サイズ × 5 色を提供する。

<div class="demo">
  <div class="demo-row">
    <DadsChipTag size="sm" color="primary">SM</DadsChipTag>
    <DadsChipTag size="md" color="success">MD</DadsChipTag>
    <DadsChipTag size="lg" color="warning">LG</DadsChipTag>
  </div>
</div>

## クリック可能

`clickable` を指定するとルート要素が `<button>` になり、キーボード (Enter / Space) でも `click` イベントが発火する。

<div class="demo">
  <div class="demo-row">
    <DadsChipTag clickable @click="onChipClick">カテゴリ ({{ clickCount }})</DadsChipTag>
    <DadsChipTag clickable color="success">フィルター: 公開</DadsChipTag>
    <DadsChipTag clickable color="secondary">並び替え</DadsChipTag>
  </div>
</div>

## 削除可能

`closable` を指定すると末尾に `×` ボタンが表示され、`close` イベントが発火する。チップ自身の `click` とは独立して動作する。

<div class="demo">
  <span class="demo-label">タグの削除 (× クリックで削除)</span>
  <div class="demo-row">
    <DadsChipTag
      v-for="tag in tags"
      :key="tag"
      closable
      color="secondary"
      @close="onClose(tag)"
    >
      {{ tag }}
    </DadsChipTag>
    <span v-if="tags.length === 0">（すべて削除されました）</span>
  </div>
</div>

```vue
<DadsChipTag closable @close="onClose">東京都</DadsChipTag>
```

`closeLabel` で削除ボタンのアクセシブル名をカスタマイズできる (デフォルト `'削除'`)。

```vue
<DadsChipTag closable close-label="このタグを外す">東京都</DadsChipTag>
```

## 状態

`disabled` はクリック可能・削除可能の両方の操作を抑止する。

<div class="demo">
  <div class="demo-row">
    <DadsChipTag>Default</DadsChipTag>
    <DadsChipTag disabled>Disabled (span)</DadsChipTag>
    <DadsChipTag clickable disabled>Disabled (button)</DadsChipTag>
    <DadsChipTag closable disabled>Disabled (closable)</DadsChipTag>
  </div>
</div>

## アバター付きチップ (宛先 / CC 等の人物選択 UI)

`prepend` スロットに `<img>` を差し込むことで、メーラの「宛先 / CC」入力欄に並ぶような **アバター + 名前 + × 削除** のチップを表現できる。

```vue
<DadsChipTag closable color="secondary" @close="removeRecipient(user)">
  <template #prepend>
    <img :src="user.avatarUrl" alt="" class="recipient-avatar" />
  </template>
  {{ user.name }}
</DadsChipTag>

<style>
.recipient-avatar {
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 50%;
  object-fit: cover;
}
</style>
```

- `prepend` スロットには `aria-hidden="true"` が自動付与されるため、アバター画像の `alt=""` (decorative) で正しく扱える
- 名前テキストはデフォルトスロット (label) に置く → スクリーンリーダーは「田中太郎、削除」のように読み上げる
- `color="secondary"` がメーラ系 UI で最も馴染む配色 (落ち着いたグレー)

## Props

| Prop         | 型                                                              | デフォルト  | 説明                                               |
| ------------ | --------------------------------------------------------------- | ----------- | -------------------------------------------------- |
| `size`       | `'lg' \| 'md' \| 'sm'`                                          | `'md'`      | サイズ                                             |
| `color`      | `'primary' \| 'success' \| 'error' \| 'warning' \| 'secondary'` | `'primary'` | セマンティックカラー                               |
| `closable`   | `boolean`                                                       | `false`     | `×` ボタンを表示し `close` を発火                  |
| `clickable`  | `boolean`                                                       | `false`     | ルートを `<button>` に昇格しキーボード操作を可能に |
| `disabled`   | `boolean`                                                       | `false`     | 操作不可化 (clickable / closable 両方に適用)       |
| `closeLabel` | `string`                                                        | `'削除'`    | 削除ボタンのアクセシブル名                         |
| `ariaLabel`  | `string`                                                        | -           | チップ自体のアクセシブル名 (clickable 時に推奨)    |

## Events

| Event   | Payload                       | 説明                                            |
| ------- | ----------------------------- | ----------------------------------------------- |
| `click` | `MouseEvent \| KeyboardEvent` | `clickable` 時のクリック / Enter / Space で発火 |
| `close` | `MouseEvent`                  | `closable` 時に `×` ボタンクリックで発火        |

## アクセシビリティ

- `clickable` 時はルート要素が真の `<button>` になり、ネイティブのフォーカス・キーボード操作 (Enter / Space) が利用できる
- 非 `clickable` の `disabled` 状態は `aria-disabled="true"` で表現される
- `×` ボタンには `closeLabel` (デフォルト `'削除'`) でアクセシブル名が必ず付与される
- `prepend` / `append` スロットは装飾用途のため `aria-hidden="true"` が自動付与される
- 削除ボタンのクリックはチップ本体に伝播しないため、`clickable` + `closable` を同時指定しても両イベントが同一ジェスチャーで発火しない
