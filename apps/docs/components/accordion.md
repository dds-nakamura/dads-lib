# Accordion

ヘッダー（サマリ）をクリックして開閉できる折りたたみコンテナ。FAQ や設定セクションなど、情報を段階的に開示したい場面で利用する。ネイティブ `<details>` / `<summary>` をベースにした単一の開閉セクションで、複数項目をまとめたいときは `<DadsAccordion>` を縦に並べる。

::: tip ✅ 公式仕様準拠
公式 DADS の `<details>` / `<summary>` ベースのアコーディオン（円形ボーダー内の chevron アイコン + 見出しラップのサマリ + 任意の「先頭に戻る」リンク）を、クラス名・DOM 構造・インライン SVG・レスポンシブ挙動まで 1:1 で再現しています。
:::

## 基本

`title` を渡し、本文はデフォルトスロットに記述する。`v-model` で開閉状態 (`boolean`) を双方向バインドできる。

<script setup>
import { ref } from 'vue'
import { DadsAccordion } from '@dads/vue'

const open = ref(false)
const controlled = ref(true)
</script>

<div class="demo">
  <DadsAccordion v-model="open" title="ダミーテキストとは何ですか？">
    <p>これはダミーテキストです。</p>
    <p>ダミーテキストは、デザインやレイアウトの作成時に使用される仮の文章です。デザインの全体像を評価したり、テキストの配置や長さを確認したりすることができます。</p>
  </DadsAccordion>
</div>

```vue
<script setup>
import { ref } from 'vue'
import { DadsAccordion } from '@dads/vue'

const open = ref(false)
</script>

<template>
  <DadsAccordion v-model="open" title="ダミーテキストとは何ですか？">
    <p>これはダミーテキストです。</p>
  </DadsAccordion>
</template>
```

## defaultOpen（非制御）

`v-model` を使わず初期状態だけ指定したいときは `defaultOpen` を渡す。以降の開閉は内部状態で管理される。

<div class="demo">
  <DadsAccordion :default-open="true" title="利用料金はかかりますか">
    <p>本サービスの基本機能は無料でご利用いただけます。一部の高度な機能については、別途有償プランをご用意しています。</p>
  </DadsAccordion>
</div>

```vue
<DadsAccordion :default-open="true" title="利用料金はかかりますか">
  <!-- 本文 -->
</DadsAccordion>
```

## 制御モード（v-model）

外部のボタンから `v-model` を書き換えれば、コンポーネント外部から開閉できる。

<div class="demo">
  <span class="demo-label">v-model: {{ controlled }}</span>
  <div class="demo-row">
    <button type="button" @click="controlled = !controlled">外部から開閉</button>
  </div>
  <DadsAccordion v-model="controlled" title="ログイン方法を教えてください">
    <p>登録済みのメールアドレスとパスワードでログインしてください。パスワードを忘れた場合は「パスワード再設定」リンクから手続きできます。</p>
  </DadsAccordion>
</div>

## disabled

操作を一時的に無効化したいときは `disabled` を指定する。クリック・キーボード操作いずれでも開閉できない（薄く表示される）。

<div class="demo">
  <DadsAccordion disabled title="この項目は現在準備中です">
    <p>準備が整い次第、こちらに本文が表示されます。</p>
  </DadsAccordion>
</div>

## 「先頭に戻る」リンク

`back-link` を指定すると、本文末尾に公式の「先頭に戻る」リンク（サマリへのアンカー）を表示する。長い本文の末尾から見出しへ戻る導線として使う。ラベルは既定で `「{title}」の先頭に戻る`、`back-link-label` で上書きできる。

<div class="demo">
  <DadsAccordion :default-open="true" back-link title="ダミーテキストはどのような場合に使用されますか？">
    <p>これはダミーテキストです。ダミーテキストは、デザインやレイアウトの作成時に使用される仮の文章です。ダミーテキストを使用すると、デザインの全体像を評価したり、テキストの配置や長さを確認したりすることができます。ダミーテキストは実際の文章ではないので、内容には意味がありません。</p>
  </DadsAccordion>
</div>

```vue
<DadsAccordion back-link title="ダミーテキストはどのような場合に使用されますか？">
  <!-- 本文 -->
</DadsAccordion>
```

## 複数項目（スタック）

複数の Q&A を束ねるときは `<DadsAccordion>` を縦に並べる。各セクションは独立して開閉する。

<div class="demo">
  <DadsAccordion title="利用料金はかかりますか">
    <p>本サービスの基本機能は無料でご利用いただけます。</p>
  </DadsAccordion>
  <DadsAccordion :default-open="true" title="ログイン方法を教えてください">
    <p>登録済みのメールアドレスとパスワードでログインしてください。</p>
  </DadsAccordion>
  <DadsAccordion title="お問い合わせ窓口はどこですか">
    <p>平日 9 時から 17 時まで、専用フォームにてお問い合わせを受け付けています。</p>
  </DadsAccordion>
</div>

```vue
<template>
  <DadsAccordion title="利用料金はかかりますか">
    <p>本サービスの基本機能は無料でご利用いただけます。</p>
  </DadsAccordion>
  <DadsAccordion :default-open="true" title="ログイン方法を教えてください">
    <p>登録済みのメールアドレスとパスワードでログインしてください。</p>
  </DadsAccordion>
  <DadsAccordion title="お問い合わせ窓口はどこですか">
    <p>平日 9 時から 17 時まで、専用フォームで受け付けています。</p>
  </DadsAccordion>
</template>
```

## Props

| Prop            | 型                           | デフォルト  | 説明                                                                                            |
| --------------- | ---------------------------- | ----------- | ----------------------------------------------------------------------------------------------- |
| `modelValue`    | `boolean`                    | `undefined` | 制御モードの開閉状態。`undefined` のとき非制御モードとなり `defaultOpen` で初期状態を決定する。 |
| `defaultOpen`   | `boolean`                    | `false`     | 非制御モード時の初期開閉状態。`modelValue` が指定されている場合は無視される。                   |
| `title`         | `string`                     | -（必須）   | サマリ見出しに表示するラベル。                                                                  |
| `headingLevel`  | `1 \| 2 \| 3 \| 4 \| 5 \| 6` | `3`         | サマリ内のタイトルを包む見出しレベル。公式は `<h3>`。                                           |
| `disabled`      | `boolean`                    | `false`     | 操作を無効化する。クリック・キーボードいずれでも開閉できない。                                  |
| `backLink`      | `boolean`                    | `false`     | `true` で本文末尾に「先頭に戻る」リンク（サマリへのアンカー）を表示する。                       |
| `backLinkLabel` | `string`                     | `undefined` | 「先頭に戻る」リンクのラベルを上書き。既定は `「{title}」の先頭に戻る`。                        |

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
- サマリのタイトルは見出し（既定 `<h3>`）でラップされ、スクリーンリーダーの見出しナビゲーションでも辿れる。
- `Enter` / `Space` キーで開閉できる（標準のキーボード操作）。
- `disabled` 時は `aria-disabled="true"` を設定し、`tabindex="-1"` でフォーカスから外す。
- 開閉アイコン（chevron）は `aria-hidden="true"` で支援技術から隠し、状態は `aria-expanded` のみで伝達する。
- `back-link` のアイコンも `aria-hidden="true"`。リンク先は当該サマリの `id`。

## 使い分けの目安

- **複数の Q&A / 設定セクション群** → Accordion（縦に並べる）
- **単一の補足情報 / グラフの基礎データ** → [Disclosure](./disclosure)
- **モーダルでのフォーカストラップが必要な重要情報** → [Dialog](./dialog)
