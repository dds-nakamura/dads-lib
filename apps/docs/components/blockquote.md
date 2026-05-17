# Blockquote

引用文を示すための引用ブロック。左罫線とインデントによって本文と区別し、必要に応じて `<cite>` で出典を併記する。デジタル庁デザインシステムの `dads-blockquote` 実装に準拠している。

::: tip ✅ 公式仕様充足
公式 DADS のガイドラインは「準備中」で Figma 仕様も提供されていません。本コンポーネントは公式 HTML リファレンス (`design-system-example-components-html`) と等価な `quote` / `cite` / `citeUrl` API を提供しており、現状で公式仕様を満たしています。
:::

## 基本

最小構成は `quote` プロパティのみ。テキストは内部の `<p>` に描画される。

<script setup>
import { DadsBlockquote } from '@dads/vue'
</script>

<div class="demo">
  <DadsBlockquote quote="これは引用文の例です。デジタル庁デザインシステムでは、アクセシビリティファーストの原則に基づいて、すべてのユーザーが利用しやすいサービスの提供を目指しています。" />
</div>

```vue
<script setup>
import { DadsBlockquote } from '@dads/vue'
</script>

<template>
  <DadsBlockquote quote="これは引用文の例です。" />
</template>
```

## 出典付き (cite)

`cite` プロパティを渡すと、引用ブロックの直後に `<cite>` 要素で出典が描画される。

<div class="demo">
  <DadsBlockquote
    quote="アクセシビリティファーストの原則に基づいて、すべてのユーザーが利用しやすいサービスの提供を目指しています。"
    cite="デジタル庁デザインシステム"
  />
</div>

```vue
<template>
  <DadsBlockquote
    quote="アクセシビリティファーストの原則に基づいて、…"
    cite="デジタル庁デザインシステム"
  />
</template>
```

## 出典リンク (citeUrl)

`citeUrl` を併せて渡すと、出典ラベルが `<a>` でラップされ、原典ページへ遷移できるようになる。同じ URL は `<blockquote>` ネイティブの `cite` 属性にも反映され、機械的な参照も可能になる。

<div class="demo">
  <DadsBlockquote
    quote="行政のサービスをすべての人に届ける、それがデジタル庁の使命です。"
    cite="デジタル庁公式サイト"
    cite-url="https://design.digital.go.jp/dads/"
  />
</div>

```vue
<template>
  <DadsBlockquote
    quote="行政のサービスをすべての人に届ける、…"
    cite="デジタル庁公式サイト"
    cite-url="https://design.digital.go.jp/dads/"
  />
</template>
```

## slot 利用例

デフォルトスロットに任意の HTML を差し込めば、複数段落やリスト等の構造を引用ブロック内に配置できる。スロットを使うと `quote` プロパティは無視される。

### 複数段落

<div class="demo">
  <DadsBlockquote cite="複数段落の例">
    <p>これは引用文の例です。デジタル庁デザインシステムでは、アクセシビリティファーストの原則に基づいて、すべてのユーザーが利用しやすいサービスの提供を目指しています。</p>
    <p>これは複数の段落を含めている例です。</p>
    <p>最初と最後の段落のマージンは自動的に調整されます。</p>
  </DadsBlockquote>
</div>

```vue
<template>
  <DadsBlockquote cite="複数段落の例">
    <p>これは引用文の例です。…</p>
    <p>これは複数の段落を含めている例です。</p>
    <p>最初と最後の段落のマージンは自動的に調整されます。</p>
  </DadsBlockquote>
</template>
```

### リストを含む引用

<div class="demo">
  <DadsBlockquote>
    <p>デジタル庁デザインシステムは、以下の理念を追求して作成されています。</p>
    <ul>
      <li>アクセシビリティファースト</li>
      <li>行政機関にとって高い汎用性と利便性</li>
      <li>継続的かつ持続可能な改善活動および研究と実践</li>
    </ul>
    <p>これにより、デジタル化の恩恵をすべての人に届けられる日本のデジタル化社会の構築に寄与します。</p>
  </DadsBlockquote>
</div>

```vue
<template>
  <DadsBlockquote>
    <p>デジタル庁デザインシステムは、以下の理念を追求して作成されています。</p>
    <ul>
      <li>アクセシビリティファースト</li>
      <li>行政機関にとって高い汎用性と利便性</li>
      <li>継続的かつ持続可能な改善活動および研究と実践</li>
    </ul>
    <p>これにより、…</p>
  </DadsBlockquote>
</template>
```

## Props

| Prop      | 型       | デフォルト | 説明                                                                                                                       |
| --------- | -------- | ---------- | -------------------------------------------------------------------------------------------------------------------------- |
| `quote`   | `string` | -          | 引用テキスト。デフォルトスロットを渡したときは無視される                                                                   |
| `cite`    | `string` | -          | 出典ラベル。指定すると引用ブロックの後に `<cite>` 要素が描画される                                                         |
| `citeUrl` | `string` | -          | 出典 URL。`cite` と併用すると `<cite>` 内のラベルが `<a>` でラップされ、同じ URL は `<blockquote cite="…">` にも反映される |

## Slots

| Slot      | 説明                                                                           |
| --------- | ------------------------------------------------------------------------------ |
| `default` | 引用ブロック内に任意のマークアップを差し込む。`quote` プロパティより優先される |

## Events

このコンポーネントはイベントを発行しない。

## アクセシビリティ

- 引用部分はネイティブ `<blockquote>` 要素で描画し、支援技術に「引用である」ことが正しく伝わる
- `citeUrl` を渡した場合は `<blockquote>` の `cite` 属性にも同じ URL がセットされ、機械可読な出典参照となる
- 出典は `<cite>` 要素で構造化され、リンクの場合は `<a>` を内包する（`<a>` 内に `<cite>` を入れ子にしない、HTML 仕様準拠の入れ子構造）
- スクリーンリーダーが本文と引用を混同しないように、引用ブロックの周囲には十分な余白が確保されている（左罫線 + 左右の padding）
- Windows ハイコントラスト（forced-colors）モードでは左罫線の色が `CanvasText` にフォールバックし、不透明度に依存せず可視性を維持する
- カラーコントラストは DADS の `--color-text-primary` / `--color-text-secondary` トークンに依存し、最低 4.5:1 の比率が確保される
