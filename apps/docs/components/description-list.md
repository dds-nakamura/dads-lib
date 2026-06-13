# DescriptionList

用語とその説明を対にして表示するための説明リスト。`DadsDescriptionList` はネイティブ `<dl>` / `<dt>` / `<dd>` の薄いラッパで、`items` プロップから自動生成するモードと、スロットでマークアップを直接書くモードの 2 通りを提供する。

::: tip ✅ 公式仕様充足
公式 DADS のガイドラインは「準備中」ですが、本コンポーネントは公式 HTML リファレンス (`design-system-example-components-html`) と整合した単一レイアウト（縦積み: `<dd>` を 32px インデント）と `marker` (none/bullet/custom) / `bordered` のバリエーションを提供しており、現状で公式仕様を満たしています。
:::

## 基本

`items` に `{ term, description }` の配列を渡すだけで、用語と説明のペアが描画される。

<script setup>
import { DadsDescriptionList } from '@dads/vue'

const profile = [
  { term: '氏名', description: '山田 太郎' },
  { term: '住所', description: '東京都千代田区永田町1-7-1' },
  { term: '連絡先', description: 'taro.yamada@example.go.jp' },
]
</script>

<div class="demo">
  <DadsDescriptionList :items="profile" />
</div>

```vue
<script setup>
import { DadsDescriptionList } from '@dads/vue'

const profile = [
  { term: '氏名', description: '山田 太郎' },
  { term: '住所', description: '東京都千代田区永田町1-7-1' },
  { term: '連絡先', description: 'taro.yamada@example.go.jp' },
]
</script>

<template>
  <DadsDescriptionList :items="profile" />
</template>
```

## Layout

公式 DADS の唯一のレイアウトは縦積み（`vertical`）。`<dd>` が `<dt>` の下に重なり、説明は 32px インデントされる。`layout` プロップは `'vertical'` のみを受け付け、デフォルトも `'vertical'`。

> 旧 `'horizontal'`（2 カラム）バリアントは公式リファレンスに存在しないため撤廃された。

<div class="demo">
  <DadsDescriptionList :items="profile" />
</div>

## Marker

`marker` で `<dt>` に付与するマーカーを変更できる。DADS の公式 HTML 実装の `data-marker` 属性に対応する。

- `none` — マーカーなし（デフォルト）。
- `bullet` — 各 `<dt>` の前に丸点マーカーを表示する。
- `custom` — 連番やアイコンなど独自マーカーを使う。`<dt>` の最初の子要素として `<span>` を置くと、その分のスペースが確保される（スロット利用必須）。

<div class="demo">
  <span class="demo-label">marker="none"（デフォルト）</span>
  <DadsDescriptionList :items="profile" layout="vertical" />
  <span class="demo-label" style="margin-top:1rem">marker="bullet"</span>
  <DadsDescriptionList :items="profile" layout="vertical" marker="bullet" />
  <span class="demo-label" style="margin-top:1rem">marker="custom"（スロット利用）</span>
  <DadsDescriptionList layout="vertical" marker="custom">
    <div class="dads-description-list__item">
      <dt><span>1.</span>氏名</dt>
      <dd>山田 太郎</dd>
    </div>
    <div class="dads-description-list__item">
      <dt><span>2.</span>住所</dt>
      <dd>東京都千代田区永田町1-7-1</dd>
    </div>
    <div class="dads-description-list__item">
      <dt><span>3.</span>連絡先</dt>
      <dd>taro.yamada@example.go.jp</dd>
    </div>
  </DadsDescriptionList>
</div>

## Bordered

`bordered` を有効にすると、項目間に 1px の区切り線が表示される。長い詳細リストで視線移動を補助する。

<div class="demo">
  <DadsDescriptionList :items="profile" bordered />
</div>

## スロット利用例

`items` を省略した場合、デフォルトスロットに任意の `<dt>` / `<dd>` を書ける。リンク・強調・複数行など、`items` の `string` では表現しきれないリッチなマークアップに利用する。

<div class="demo">
  <DadsDescriptionList layout="vertical" bordered>
    <div class="dads-description-list__item">
      <dt>申請ステータス</dt>
      <dd><strong>受理済み</strong>（受付番号: APP-0001）</dd>
    </div>
    <div class="dads-description-list__item">
      <dt>担当窓口</dt>
      <dd>
        <a href="https://design.digital.go.jp/dads/">デジタル庁デザイン窓口</a>
      </dd>
    </div>
    <div class="dads-description-list__item">
      <dt>備考</dt>
      <dd>
        書類に不備があった場合、<br />
        担当者よりご連絡を差し上げます。
      </dd>
    </div>
  </DadsDescriptionList>
</div>

```vue
<DadsDescriptionList layout="vertical" bordered>
  <div class="dads-description-list__item">
    <dt>申請ステータス</dt>
    <dd><strong>受理済み</strong>（受付番号: APP-0001）</dd>
  </div>
  <div class="dads-description-list__item">
    <dt>担当窓口</dt>
    <dd><a href="...">デジタル庁デザイン窓口</a></dd>
  </div>
</DadsDescriptionList>
```

## Props

| Prop       | 型                               | デフォルト   | 説明                                                                        |
| ---------- | -------------------------------- | ------------ | --------------------------------------------------------------------------- |
| `items`    | `DadsDescriptionListItem[]`      | -            | `{ term, description }` の配列。指定時は内部で `<dt>`/`<dd>` を自動生成する |
| `layout`   | `'vertical'`                     | `'vertical'` | 用語と説明の並び方。公式の唯一のレイアウト（`<dd>` を 32px インデント）     |
| `marker`   | `'none' \| 'bullet' \| 'custom'` | `'none'`     | `<dt>` の先頭に付くマーカー。DADS 公式の `data-marker` と対応               |
| `bordered` | `boolean`                        | `false`      | 項目間に 1px の区切り線を入れる                                             |

## アクセシビリティ

- ネイティブ `<dl>` / `<dt>` / `<dd>` を出力するため、スクリーンリーダーが「用語と定義のリスト」として正しくアナウンスする
- 各ペアは `<div class="dads-description-list__item">` で囲まれる（HTML5 仕様で許容）。`<dt>` / `<dd>` のセマンティクスはそのまま保たれる
- `marker="custom"` を使う場合、装飾アイコンには `alt=""` または `aria-hidden="true"` を付けて支援技術へのノイズを避ける
- 強制カラーモード（Windows ハイコントラスト等）では、`bordered` の区切り線色が `CanvasText` に切り替わり視認性が確保される
