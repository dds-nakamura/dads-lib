# Disclosure

メイン情報に対する追加情報を折りたたんで提示する単一の開閉セクション。注釈・補足説明・基礎データなど、初期表示で隠しておきたい非必須情報の提示に使う。複数項目を束ねたいときは [Accordion](./accordion) を選ぶ。

::: tip ✅ 公式仕様充足
公式 DADS のガイドラインは概要・原則のみで詳細仕様は提供されていません。本コンポーネントは `modelValue` / `title` / `disabled` / `defaultOpen` および `toggle` イベントで主要ユースケースを満たし、ネイティブ `<details>` / `<summary>` を使うことで a11y も担保されています。
:::

## 基本

`title` を渡し、本文はデフォルトスロットに記述する。`v-model` で開閉状態 (`boolean`) を双方向バインドできる。

<script setup>
import { ref } from 'vue'
import { DadsDisclosure } from '@dads/vue'

const open = ref(false)
const opened = ref(true)
const programmatic = ref(false)
</script>

<div class="demo">
  <DadsDisclosure v-model="open" title="ダミーテキストとは何ですか？">
    <p>これはダミーテキストです。</p>
    <p>ダミーテキストは、デザインやレイアウトの作成時に使用される仮の文章です。デザインの全体像を評価したり、テキストの配置や長さを確認したりすることができます。</p>
  </DadsDisclosure>
</div>

```vue
<script setup>
import { ref } from 'vue'
import { DadsDisclosure } from '@dads/vue'

const open = ref(false)
</script>

<template>
  <DadsDisclosure v-model="open" title="ダミーテキストとは何ですか？">
    <p>これはダミーテキストです。</p>
  </DadsDisclosure>
</template>
```

## title

`title` がサマリ（折りたたみヘッダ）に表示されるラベル。質問文や項目名を簡潔に記述する。

<div class="demo">
  <DadsDisclosure title="申し込みフォームの例外説明">
    <p>原則として日本国内に在住の方が対象です。海外在住の方は別途お問い合わせください。</p>
  </DadsDisclosure>
</div>

## defaultOpen（非制御）

`v-model` を使わず初期状態だけ指定したいときは `defaultOpen` を渡す。以降の開閉は内部状態で管理される。

<div class="demo">
  <DadsDisclosure :default-open="true" title="グラフの基礎データを表示">
    <p>このグラフは 2025 年度の四半期別申請件数を示しています。第 1 四半期: 1,234 件、第 2 四半期: 1,567 件、第 3 四半期: 1,890 件、第 4 四半期: 2,145 件。</p>
  </DadsDisclosure>
</div>

```vue
<DadsDisclosure :default-open="true" title="グラフの基礎データを表示">
  <!-- 本文 -->
</DadsDisclosure>
```

## disabled

操作を一時的に無効化したいときは `disabled` を指定する。クリック・キーボード操作いずれでも開閉できない。

<div class="demo">
  <DadsDisclosure disabled title="この補足は現在準備中です">
    <p>準備が整い次第、こちらに本文が表示されます。</p>
  </DadsDisclosure>
</div>

## プログラマブル制御

外部のボタンから `v-model` を書き換えれば、コンポーネント外部から開閉できる。

<div class="demo">
  <span class="demo-label">v-model: {{ programmatic }}</span>
  <div class="demo-row">
    <button type="button" @click="programmatic = !programmatic">外部から開閉</button>
    <button type="button" @click="programmatic = true">開く</button>
    <button type="button" @click="programmatic = false">閉じる</button>
  </div>
  <DadsDisclosure v-model="programmatic" title="動画の文字起こしテキスト">
    <p>こんにちは、本日はデジタル庁デザインシステムの紹介動画にご視聴いただきありがとうございます。本動画では、Disclosure コンポーネントの使い方を解説します。</p>
  </DadsDisclosure>
</div>

```vue
<script setup>
import { ref } from 'vue'
const open = ref(false)
</script>

<template>
  <button @click="open = !open">toggle</button>
  <DadsDisclosure v-model="open" title="動画の文字起こしテキスト">
    <!-- 本文 -->
  </DadsDisclosure>
</template>
```

## Props

| Prop          | 型        | デフォルト  | 説明                                                                                            |
| ------------- | --------- | ----------- | ----------------------------------------------------------------------------------------------- |
| `modelValue`  | `boolean` | `undefined` | 制御モードの開閉状態。`undefined` のとき非制御モードとなり `defaultOpen` で初期状態を決定する。 |
| `title`       | `string`  | -（必須）   | サマリに表示するラベル。                                                                        |
| `defaultOpen` | `boolean` | `false`     | 非制御モード時の初期開閉状態。`modelValue` が指定されている場合は無視される。                   |
| `disabled`    | `boolean` | `false`     | 操作を無効化する。クリック・キーボードいずれでも開閉できない。                                  |

## Events

| Event               | Payload   | 説明                                                               |
| ------------------- | --------- | ------------------------------------------------------------------ |
| `update:modelValue` | `boolean` | 開閉状態が変わったとき発火（`v-model` の対）。新しい開閉値を渡す。 |
| `toggle`            | `boolean` | 開閉状態が変わったとき発火。新しい開閉値を渡す。                   |

## Slots

| Slot      | 説明                                                                |
| --------- | ------------------------------------------------------------------- |
| `default` | パネル本文。任意の Vue ノードを差し込める（段落・リスト・表など）。 |

## アクセシビリティ

- ネイティブ `<details>` / `<summary>` をベースにしているため、ブラウザ標準の開閉セマンティクスをそのまま継承する。
- `<summary>` には `aria-expanded` を付与し、現在の開閉状態が支援技術に伝わる。
- `aria-controls` / `aria-labelledby` でサマリと本文 `role="region"` を双方向に関連付けている。
- `Enter` / `Space` キーで開閉できる（標準のキーボード操作）。
- `disabled` 時は `aria-disabled="true"` を設定し、`tabindex="-1"` でフォーカスから外す。
- アイコン（▼）は `aria-hidden="true"` で支援技術から隠し、状態は `aria-expanded` のみで伝達する。
- 強制カラーモード（High Contrast）では `CanvasText` を使い、不透明度に依存せず可視性を確保する。

## 使い分けの目安

- **単一の補足情報 / FAQ 1 問 / グラフの基礎データ** → Disclosure
- **複数の Q&A / 設定セクション群** → [Accordion](./accordion)
- **モーダルでのフォーカストラップが必要な重要情報** → [Dialog](./dialog)

> 表示領域をコンパクトにするためだけに Disclosure を使ってはいけません。内容が多くのユーザにとって重要な場合は折りたたまずに表示してください。
