# List

1 つ以上の項目を列挙するための箇条書きリスト。`DadsList` はネイティブ `<ul>` / `<ol>` の薄いラッパで、`items` プロップから自動生成するモードと、デフォルトスロットで `<li>` を手書きするモードの 2 通りを提供する。

DADS 公式仕様では「番号付きリストも `<ul>` で実装し、項番をテキストとして書く」ことが推奨される（ブラウザは `<ol>` の項番をコピー可能テキストとして扱わないため）。`DadsList` は使いやすさのため `type='ordered'` で `<ol>` を出力するが、項番をコピー可能にしたい場合はスロットモードで `<span>1. </span>` のように手書きで番号を入れるパターン（HTML 公式リファレンスと同じ）も推奨される。

## 基本

`items` に文字列の配列を渡すだけで、`<li>` が生成される。

<script setup>
import { DadsList } from '@dads/vue'

const fruits = ['りんご', 'みかん', 'ぶどう']

const procedure = [
  '申請書を記入する',
  '本人確認書類を添付する',
  '窓口へ提出する',
]

const nested = [
  '行政手続き',
  {
    label: '電子申請',
    children: [
      'マイナポータルから手続きを選択',
      {
        label: '本人確認',
        children: ['マイナンバーカード読み取り', '署名用電子証明書のパスワード入力'],
      },
      '申請内容の確認・送信',
    ],
  },
  '紙申請',
]
</script>

<div class="demo">
  <DadsList :items="fruits" />
</div>

```vue
<script setup>
import { DadsList } from '@dads/vue'

const fruits = ['りんご', 'みかん', 'ぶどう']
</script>

<template>
  <DadsList :items="fruits" />
</template>
```

## Ordered（項番タイプ）

`type='ordered'` で `<ol>` を出力する。手順書・利用規約・法令引用など、項番自体が意味を持つときに使う。

<div class="demo">
  <DadsList type="ordered" :items="procedure" />
</div>

```vue
<DadsList type="ordered" :items="procedure" />
```

## Nested（入れ子）

`items` の要素を `{ label, children }` 形式にすると、`<li>` 内に入れ子の `<ul>` / `<ol>` を生成する。DADS の a11y ガイドラインに従い、サブリストは親 `<li>` の **内側** にネストされる（兄弟ではない）。

<div class="demo">
  <DadsList :items="nested" />
</div>

```vue
<script setup>
const nested = [
  '行政手続き',
  {
    label: '電子申請',
    children: [
      'マイナポータルから手続きを選択',
      {
        label: '本人確認',
        children: ['マイナンバーカード読み取り', '署名用電子証明書のパスワード入力'],
      },
      '申請内容の確認・送信',
    ],
  },
  '紙申請',
]
</script>

<template>
  <DadsList :items="nested" />
</template>
```

## スロット利用例

`items` を省略した場合、デフォルトスロットに任意の `<li>` を書ける。リンク・強調・カスタムマーカーなど、`items` の `string` では表現しきれないリッチなマークアップに利用する。

公式 DADS の番号付きリスト（`<ul data-marker="number">`）と同じ「項番をテキストとしてコピー可能にする」パターンも、スロットモードで再現できる。

<div class="demo">
  <DadsList>
    <li>
      <a class="dads-link" href="https://design.digital.go.jp/dads/">DADS 公式サイト</a>
    </li>
    <li>
      <strong>重要</strong>: ネスト構造はサブリストを親 <code>&lt;li&gt;</code> の中に置く
    </li>
    <li>長い説明文でもレイアウトが崩れないよう <code>overflow-wrap</code> が効いている</li>
  </DadsList>
</div>

```vue
<DadsList>
  <li><a href="...">リンク付き項目</a></li>
  <li><strong>重要</strong>: 強調付き項目</li>
</DadsList>
```

## start（番号の開始位置）

`type='ordered'` のとき、`start` プロップで番号の開始位置を指定できる。ネイティブ `<ol start="...">` 属性に転送される。

<div class="demo">
  <span class="demo-label">start=1（デフォルト）</span>
  <DadsList type="ordered" :items="procedure" />
  <span class="demo-label" style="margin-top:1rem">start=5</span>
  <DadsList type="ordered" :items="procedure" :start="5" />
</div>

```vue
<DadsList type="ordered" :items="procedure" :start="5" />
```

## Props

| Prop    | 型                           | デフォルト    | 説明                                                                                                             |
| ------- | ---------------------------- | ------------- | ---------------------------------------------------------------------------------------------------------------- |
| `type`  | `'unordered' \| 'ordered'`   | `'unordered'` | リスト種別。`unordered` は `<ul>`、`ordered` は `<ol>` を出力する                                                |
| `items` | `(string \| DadsListItem)[]` | -             | 表示する項目。文字列のままでも、`{ label, children }` の入れ子オブジェクトでも可。指定時はスロットより優先される |
| `start` | `number`                     | -             | `type='ordered'` のときの開始番号。`<ol start="...">` に転送される                                               |

`DadsListItem` の型は `{ label: string; children?: (string \| DadsListItem)[] }`。`children` は再帰的に同じ構造を取れる。

## アクセシビリティ

- ネイティブ `<ul>` / `<ol>` を出力するため、スクリーンリーダーがリスト要素として正しくアナウンスし、項目数も読み上げる
- 入れ子の `<ul>` / `<ol>` は親 `<li>` の **内側** に配置される。DADS のアクセシビリティガイドラインで「サブリストを親項目の兄弟として書いてはいけない」とされている誤った構造を回避する
- DADS 公式は項番付きリストも `<ul>` で実装し、項番を `<span>1. </span>` のようにテキストとして書くことを推奨している（ブラウザが `<ol>` の項番をコピー可能テキストとして公開しないため）。コピー可能性が重要な場面ではスロットモードで手書き番号パターンを使うこと
- 強制カラーモード（Windows ハイコントラスト等）では、リスト本文の色が `CanvasText` に切り替わり可読性が確保される
- マーカーをテキスト（中黒・数字＋手動改行・空白インデント）で代替してはいけない。スクリーンリーダーがリスト構造を認識できなくなる
