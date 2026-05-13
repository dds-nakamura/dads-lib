# Accordion

ヘッダーをクリックして開閉できる折りたたみコンテナ。FAQ や設定セクションなど、情報を段階的に開示したい場面で利用する。

## 基本

`items` プロパティで項目を定義し、各項目本文は `panel-{id}` という名前付きスロットで差し込む。デフォルトは `single` モード（同時に開けるのは 1 件まで、再クリックで閉じる）。

<script setup>
import { ref } from 'vue'
import { DadsAccordion } from '@dads/vue'

const faqItems = [
  { id: 'fee', title: '利用料金はかかりますか' },
  { id: 'login', title: 'ログイン方法を教えてください' },
  { id: 'contact', title: 'お問い合わせ窓口はどこですか' },
]

const singleValue = ref('fee')
const multipleValue = ref(['fee'])
const defaultClosed = ref('')
const presetOpen = ref('login')
const multiPreset = ref(['fee', 'contact'])

const disabledItems = [
  { id: 'a', title: '通常項目 A' },
  { id: 'b', title: '無効化された項目 B', disabled: true },
  { id: 'c', title: '通常項目 C' },
]
const disabledValue = ref('a')
</script>

<div class="demo">
  <DadsAccordion v-model="singleValue" :items="faqItems">
    <template #panel-fee>
      <p>本サービスの基本機能は無料でご利用いただけます。一部の高度な機能については、別途有償プランをご用意しています。</p>
    </template>
    <template #panel-login>
      <p>登録済みのメールアドレスとパスワードでログインしてください。パスワードを忘れた場合は「パスワード再設定」リンクから手続きできます。</p>
    </template>
    <template #panel-contact>
      <p>平日 9 時から 17 時まで、専用フォームにてお問い合わせを受け付けています。回答までに 2 営業日ほどお時間をいただく場合があります。</p>
    </template>
  </DadsAccordion>
</div>

```vue
<script setup>
import { ref } from 'vue'
import { DadsAccordion } from '@dads/vue'

const items = [
  { id: 'fee', title: '利用料金はかかりますか' },
  { id: 'login', title: 'ログイン方法を教えてください' },
  { id: 'contact', title: 'お問い合わせ窓口はどこですか' },
]
const open = ref('fee')
</script>

<template>
  <DadsAccordion v-model="open" :items="items">
    <template #panel-fee>
      <p>本サービスの基本機能は無料でご利用いただけます。</p>
    </template>
    <template #panel-login>
      <p>登録済みのメールアドレスとパスワードでログインしてください。</p>
    </template>
    <template #panel-contact>
      <p>平日 9 時から 17 時まで、専用フォームで受け付けています。</p>
    </template>
  </DadsAccordion>
</template>
```

## Single モード

`type="single"`（デフォルト）では、開けるパネルは常に最大 1 件。`v-model` は `string`（空文字列のとき全閉）。開いているパネルを再クリックすると閉じる。

<div class="demo">
  <span class="demo-label">v-model: "{{ presetOpen || '(closed)' }}"</span>
  <DadsAccordion v-model="presetOpen" :items="faqItems">
    <template #panel-fee><p>料金は無料です。</p></template>
    <template #panel-login><p>メールとパスワードでログインします。</p></template>
    <template #panel-contact><p>専用フォームから受け付けています。</p></template>
  </DadsAccordion>
</div>

## Multiple モード

`type="multiple"` を渡すと、複数パネルを同時に開ける。`v-model` は `string[]`。

<div class="demo">
  <span class="demo-label">v-model: {{ JSON.stringify(multiPreset) }}</span>
  <DadsAccordion v-model="multiPreset" :items="faqItems" type="multiple">
    <template #panel-fee><p>料金は無料です。</p></template>
    <template #panel-login><p>メールとパスワードでログインします。</p></template>
    <template #panel-contact><p>専用フォームから受け付けています。</p></template>
  </DadsAccordion>
</div>

```vue
<DadsAccordion v-model="openIds" :items="items" type="multiple" />
```

## 状態

### 初期全閉

`single` モードでは `v-model` に空文字列 `''` を渡すと、初期状態でどのパネルも開かない。

<div class="demo">
  <DadsAccordion v-model="defaultClosed" :items="faqItems">
    <template #panel-fee><p>料金は無料です。</p></template>
    <template #panel-login><p>メールとパスワードでログインします。</p></template>
    <template #panel-contact><p>専用フォームから受け付けています。</p></template>
  </DadsAccordion>
</div>

### 個別項目の無効化

`items` の各エントリに `disabled: true` を指定すると、その項目はクリック・キーボード操作とも無効化され、矢印キーのフォーカス移動でもスキップされる。

<div class="demo">
  <DadsAccordion v-model="disabledValue" :items="disabledItems">
    <template #panel-a><p>通常項目 A の本文です。</p></template>
    <template #panel-b><p>このパネルには到達できません。</p></template>
    <template #panel-c><p>通常項目 C の本文です。</p></template>
  </DadsAccordion>
</div>

## Slot

各項目の本文は **`panel-{id}` という名前付きスロット** で差し込む。`items` で指定した `id` がそのままスロット名のサフィックスになる。

```vue
<DadsAccordion :items="[{ id: 'foo', title: 'Foo' }]">
  <template #panel-foo>
    <p>Foo の本文をここに書く。任意の Vue ノードを置ける。</p>
  </template>
</DadsAccordion>
```

## Props

| Prop         | 型                       | デフォルト | 説明                                                                                |
| ------------ | ------------------------ | ---------- | ----------------------------------------------------------------------------------- |
| `modelValue` | `string \| string[]`     | `''`       | 開いているパネルの id。`single` では文字列（空文字列で全閉）、`multiple` では配列。 |
| `items`      | `DadsAccordionItem[]`    | -（必須）  | 項目定義。各要素は `{ id, title, disabled? }`。                                     |
| `type`       | `'single' \| 'multiple'` | `'single'` | 開閉の振る舞い。`single` は最大 1 件、`multiple` は複数同時可。                     |

`DadsAccordionItem`:

| Field      | 型        | デフォルト | 説明                                                             |
| ---------- | --------- | ---------- | ---------------------------------------------------------------- |
| `id`       | `string`  | -（必須）  | 一意識別子。`v-model` の値・スロット名 `panel-{id}` の基となる。 |
| `title`    | `string`  | -（必須）  | ヘッダーボタンに表示するラベル。                                 |
| `disabled` | `boolean` | `false`    | 項目を無効化（クリック不可・矢印キーでもスキップ）。             |

## Events

| Event               | Payload              | 説明                                                                    |
| ------------------- | -------------------- | ----------------------------------------------------------------------- |
| `update:modelValue` | `string \| string[]` | 開閉状態が変わったとき発火。`single` は次に開く id、`multiple` は配列。 |

## アクセシビリティ

- ヘッダーは `<button type="button">` でレンダリングされ、`aria-expanded` が現在の開閉状態を反映する。
- 各ヘッダーには一意な id が付与され、対応するパネル `role="region"` を `aria-controls` / `aria-labelledby` で双方向に関連付けている。
- 開閉アイコン (chevron) は `aria-hidden="true"` で支援技術から隠し、状態は `aria-expanded` のみで伝達する。
- `ArrowDown` / `ArrowUp` / `Home` / `End` でヘッダー間をフォーカス移動できる（端で循環、`disabled` 項目はスキップ）。
- 見出しは `<h3>` でラップされているため、スクリーンリーダーの見出しナビゲーションでも辿れる。
