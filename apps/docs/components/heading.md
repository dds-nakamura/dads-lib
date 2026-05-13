# Heading

ページや section の見出しを表すコンポーネント。`as` で HTML 要素 (h1〜h6) によるセマンティック構造を、`level` で視覚的なサイズを独立して制御できる。

## 基本

<script setup>
import { DadsHeading } from '@dads/vue'
</script>

<div class="demo">
  <DadsHeading>セクション見出し</DadsHeading>
</div>

```vue
<script setup>
import { DadsHeading } from '@dads/vue'
</script>

<template>
  <DadsHeading>セクション見出し</DadsHeading>
</template>
```

デフォルトは `as="h2"`、視覚サイズも `level-2`。

## as — セマンティック要素

`as` で h1〜h6 のいずれかの HTML 要素を選択する。指定しない場合は `level` も連動して同じ番号になる。

<div class="demo">
  <DadsHeading as="h1">h1 見出し</DadsHeading>
  <DadsHeading as="h2">h2 見出し</DadsHeading>
  <DadsHeading as="h3">h3 見出し</DadsHeading>
  <DadsHeading as="h4">h4 見出し</DadsHeading>
  <DadsHeading as="h5">h5 見出し</DadsHeading>
  <DadsHeading as="h6">h6 見出し</DadsHeading>
</div>

```vue
<DadsHeading as="h1">h1 見出し</DadsHeading>
<DadsHeading as="h2">h2 見出し</DadsHeading>
<DadsHeading as="h3">h3 見出し</DadsHeading>
```

## level — 視覚サイズ

`level` を指定すると `as` と独立して見た目のサイズだけを変更できる。
section の入れ子で意味的には `<h3>` だが視覚的には大きく表示したい、といった場合に有用。

<div class="demo">
  <span class="demo-label">level=1 (32px)</span>
  <DadsHeading :level="1">レベル 1</DadsHeading>
  <span class="demo-label" style="margin-top:1rem">level=2 (28px)</span>
  <DadsHeading :level="2">レベル 2</DadsHeading>
  <span class="demo-label" style="margin-top:1rem">level=3 (24px)</span>
  <DadsHeading :level="3">レベル 3</DadsHeading>
  <span class="demo-label" style="margin-top:1rem">level=4 (20px)</span>
  <DadsHeading :level="4">レベル 4</DadsHeading>
  <span class="demo-label" style="margin-top:1rem">level=5 (18px)</span>
  <DadsHeading :level="5">レベル 5</DadsHeading>
  <span class="demo-label" style="margin-top:1rem">level=6 (16px)</span>
  <DadsHeading :level="6">レベル 6</DadsHeading>
</div>

## as と level の独立指定

セマンティック (`as`) と視覚 (`level`) を別々に指定する例。
ドキュメントアウトラインを正しく保ちつつ、デザイン上のサイズだけ調整できる。

<div class="demo">
  <span class="demo-label">as=h1 / level=3 (h1 だが小さく表示)</span>
  <DadsHeading as="h1" :level="3">小さく見える h1</DadsHeading>
  <span class="demo-label" style="margin-top:1rem">as=h6 / level=1 (h6 だが大きく表示)</span>
  <DadsHeading as="h6" :level="1">大きく見える h6</DadsHeading>
</div>

```vue
<DadsHeading as="h1" :level="3">小さく見える h1</DadsHeading>
<DadsHeading as="h6" :level="1">大きく見える h6</DadsHeading>
```

## Slot

| Slot           | 用途                                                      |
| -------------- | --------------------------------------------------------- |
| `default`      | 見出しテキスト                                            |
| `subtitle`     | 見出し下に表示するサブタイトル（`<p>` でレンダリング）    |
| `prepend-icon` | 見出しテキスト前のアイコン（`aria-hidden="true"` が自動） |

### subtitle スロット

<div class="demo">
  <DadsHeading as="h2">
    お知らせ
    <template #subtitle>2026 年 5 月の更新情報をまとめました</template>
  </DadsHeading>
</div>

```vue
<DadsHeading as="h2">
  お知らせ
  <template #subtitle>2026 年 5 月の更新情報をまとめました</template>
</DadsHeading>
```

### prepend-icon スロット

利用側で `@mdi/font` の CSS を読み込むことが前提（カタログ側では未ロードのためアイコンは表示されない）。

```vue
<DadsHeading as="h2">
  ダウンロード
  <template #prepend-icon>
    <i class="mdi mdi-download" />
  </template>
</DadsHeading>
```

## Props

| Prop    | 型                                             | デフォルト              | 説明                                                             |
| ------- | ---------------------------------------------- | ----------------------- | ---------------------------------------------------------------- |
| `as`    | `'h1' \| 'h2' \| 'h3' \| 'h4' \| 'h5' \| 'h6'` | `'h2'`                  | レンダリングする HTML 要素。セマンティックアウトラインを制御する |
| `level` | `1 \| 2 \| 3 \| 4 \| 5 \| 6`                   | `as` の数値部分と同じ値 | 視覚的なサイズレベル。未指定なら `as` に追随する                 |

## Events

このコンポーネントはイベントを emit しない。

## アクセシビリティ

- ページのアウトラインを正しく保つため、`as` は **意味上の階層** に合わせて選ぶ (`h1` はページに 1 つだけ、`h2` 以下は順序を飛ばさない)。
- 視覚デザイン上サイズを変えたいだけのケースでは、`as` を維持して `level` のみ調整することでセマンティクスを壊さずに見た目を整えられる。
- `prepend-icon` スロットの内容は装飾扱いとなり、`aria-hidden="true"` が自動的に付与される。アイコンに意味がある場合は見出しテキスト本体で内容を表現すること。
- `subtitle` は `<p>` 要素としてレンダリングされ、見出しの一部にはならない。スクリーンリーダーは見出しと別の段落として読み上げる。
- `h1`〜`h6` のネイティブタグを使うため、支援技術の「見出しジャンプ」ナビゲーションがそのまま機能する。
