# Heading

ページや section の見出しを表すコンポーネント。`as` で HTML 要素 (h1〜h6) によるセマンティック構造、`level` で視覚サイズ、`size` で px 単位のフォントサイズを 3 軸で独立制御できる。さらに **shoulder / subtitle** を組み合わせると自動的に `<hgroup>` でラップされ、SR が見出しと補助テキストを 1 単位として扱える。

## 基本

<script setup>
import { DadsHeading, DadsChipLabel } from '@dads/vue'
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

デフォルトは `as="h2"`、視覚サイズも `level-2`。shoulder / subtitle が無いときは root が `<div>` になる。

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

## level — 視覚サイズ (6 段階)

`level` を指定すると `as` と独立して 6 段階の見た目サイズだけを変更できる。

<div class="demo">
  <span class="demo-label">level=1 (32px)</span>
  <DadsHeading :level="1">レベル 1</DadsHeading>
  <span class="demo-label" style="margin-top:1rem">level=2 (28px)</span>
  <DadsHeading :level="2">レベル 2</DadsHeading>
  <span class="demo-label" style="margin-top:1rem">level=3 (24px)</span>
  <DadsHeading :level="3">レベル 3</DadsHeading>
</div>

## size — px トークン (10 段階) [NEW]

DADS 公式 `data-size` スケール (64 / 57 / 45 / 36 / 32 / 28 / 24 / 20 / 18 / 16 px) に直接対応する `size` プロップ。各段階は公式の `line-height`・`letter-spacing` を併せ持つ。`level` のような 6 段階より細かく、また `as` ・ `level` の組み合わせを超えて任意の px サイズを指定できる。

<div class="demo">
  <DadsHeading as="h1" size="20">h1 のまま 20px (サイドバー見出し用途)</DadsHeading>
  <DadsHeading as="h3" size="36">h3 のまま 36px (ランディング向け強調)</DadsHeading>
</div>

```vue
<DadsHeading as="h1" size="20">サイドバー見出し</DadsHeading>
<DadsHeading as="h3" size="36">ランディング強調</DadsHeading>
```

`size` が指定された場合、`level` よりも優先される (CSS 上で specificity が同じため後勝ち / 明示優先)。

## shoulder — 見出し上の補助ラベル [NEW]

`shoulder` プロップ (または `#shoulder` スロット) で見出しの上に小さなラベルを表示できる。shoulder または subtitle がある場合、root は自動で `<hgroup>` になる (WHATWG HTML 仕様準拠)。

<div class="demo">
  <DadsHeading as="h1" shoulder="お知らせ">2026 年 5 月の更新情報</DadsHeading>
</div>

```vue
<DadsHeading as="h1" shoulder="お知らせ">2026 年 5 月の更新情報</DadsHeading>
```

スロットで複雑な内容を入れる例:

```vue
<DadsHeading as="h2">
  ステータス確認
  <template #shoulder>
    <strong>マイページ</strong> &raquo; 申請一覧
  </template>
</DadsHeading>
```

## subtitle — 見出し下の補足

`subtitle` プロップ (または `#subtitle` スロット) で見出しの下に補助テキストを表示。

<div class="demo">
  <DadsHeading as="h2" subtitle="この機能は 2026 年 6 月にリリース予定です">
    新機能のご案内
  </DadsHeading>
</div>

```vue
<DadsHeading as="h2" subtitle="2026 年 6 月にリリース予定">新機能のご案内</DadsHeading>
```

## icon — 見出し前のアイコン

`icon` プロップで Material Symbols 名を指定するか、`#prepend-icon` スロットで任意の SVG / DOM を埋め込める。アイコンには `aria-hidden="true"` が自動付与される。

```vue
<DadsHeading icon="info">注意事項</DadsHeading>

<!-- カスタム SVG はスロットで -->
<DadsHeading>
  ダウンロード
  <template #prepend-icon>
    <svg><!-- ... --></svg>
  </template>
</DadsHeading>
```

## chip — 見出し内のバッジ [NEW]

`#chip` スロットに `DadsChipLabel` 等を入れると見出しテキストの隣にインラインで表示される。状態表示 (NEW / β / 改定) に有用。

<div class="demo">
  <DadsHeading as="h2">
    新機能のご案内
    <template #chip>
      <DadsChipLabel color="green" appearance="filled-outline">NEW</DadsChipLabel>
    </template>
  </DadsHeading>
</div>

```vue
<DadsHeading as="h2">
  新機能のご案内
  <template #chip>
    <DadsChipLabel color="green" appearance="filled-outline">NEW</DadsChipLabel>
  </template>
</DadsHeading>
```

## 全部入り (shoulder + icon + chip + subtitle)

<div class="demo">
  <DadsHeading
    as="h1"
    size="32"
    shoulder="マイページ"
    subtitle="2026 年度の申請状況を確認できます"
  >
    申請履歴
    <template #chip>
      <DadsChipLabel color="blue" appearance="filled-outline">2026</DadsChipLabel>
    </template>
  </DadsHeading>
</div>

```vue
<DadsHeading as="h1" size="32" shoulder="マイページ" subtitle="2026 年度の申請状況を確認できます">
  申請履歴
  <template #chip>
    <DadsChipLabel color="blue" appearance="filled-outline">2026</DadsChipLabel>
  </template>
</DadsHeading>
```

このとき、root は `<hgroup>` でレンダリングされる:

```html
<hgroup class="dads-heading dads-heading--level-1 dads-heading--size-32">
  <p class="dads-heading__shoulder">マイページ</p>
  <h1 class="dads-heading__title">
    <span class="dads-heading__icon" aria-hidden="true"></span>
    <span class="dads-heading__text">申請履歴</span>
    <span class="dads-heading__chip">...</span>
  </h1>
  <p class="dads-heading__subtitle">2026 年度の申請状況を確認できます</p>
</hgroup>
```

## Slot

| Slot           | 用途                                                                    |
| -------------- | ----------------------------------------------------------------------- |
| `default`      | 見出しテキスト                                                          |
| `shoulder`     | 見出し上のラベル (`<p>` でレンダリング)。`shoulder` プロップを上書き    |
| `subtitle`     | 見出し下のサブタイトル (`<p>`)。`subtitle` プロップを上書き             |
| `prepend-icon` | 見出しテキスト前のアイコン。`icon` プロップを上書き、`aria-hidden` 自動 |
| `chip`         | 見出し横のインラインバッジ                                              |

## Props

| Prop       | 型                                                             | デフォルト              | 説明                                                                       |
| ---------- | -------------------------------------------------------------- | ----------------------- | -------------------------------------------------------------------------- |
| `as`       | `'h1' \| 'h2' \| 'h3' \| 'h4' \| 'h5' \| 'h6'`                 | `'h2'`                  | レンダリングする HTML 要素。セマンティックアウトラインを制御する           |
| `level`    | `1 \| 2 \| 3 \| 4 \| 5 \| 6`                                   | `as` の数値部分と同じ値 | 視覚的なサイズレベル (6 段階)。未指定なら `as` に追随する                  |
| `size`     | `'64' \| '57' \| '45' \| '36' \| '32' \| '28' \| '24' \| '20' \| '18' \| '16'` | -                       | px 単位の明示フォントサイズ (公式 data-size 10 段階)。指定すると `level` を上書きする               |
| `shoulder` | `string`                                                       | -                       | 見出しの上に表示する小さなラベル (`<p>`)。`#shoulder` スロットで上書き可能 |
| `subtitle` | `string`                                                       | -                       | 見出しの下に表示する補助テキスト (`<p>`)。`#subtitle` スロットで上書き可能 |
| `icon`     | `string`                                                       | -                       | Material Symbols 名 (`'info'` 等)。`#prepend-icon` スロットで上書き可能    |

## Events

このコンポーネントはイベントを emit しない。

## アクセシビリティ

- ページのアウトラインを正しく保つため、`as` は **意味上の階層** に合わせて選ぶ (`h1` はページに 1 つだけ、`h2` 以下は順序を飛ばさない)。
- 視覚デザイン上サイズを変えたいだけのケースでは、`as` を維持して `level` または `size` のみ調整することでセマンティクスを壊さずに見た目を整えられる。
- shoulder または subtitle が指定されると root が **`<hgroup>`** になり、見出しと補助テキストが SR にとって 1 つのグループとして扱われる (WHATWG HTML 仕様)。
- `icon` / `prepend-icon` スロットの内容は装飾扱いとなり `aria-hidden="true"` が自動付与される。アイコンに意味がある場合は見出しテキスト本体で内容を表現すること。
- `chip` は装飾的バッジ用途。SR が見出しを読み上げる際にバッジテキストも続けて読まれるため、簡潔なテキスト (NEW / β / 改定) が望ましい。
- `h1`〜`h6` のネイティブタグを使うため、支援技術の「見出しジャンプ」ナビゲーションがそのまま機能する。
