# Modal

オーバーレイ上に表示されるダイアログ。フォーカストラップと ESC キーでの閉じる動作を提供し、`v-model` で開閉を制御する。

## 基本

最小構成。トリガーとなるボタンと `v-model` で接続する `ref` を組み合わせて開閉する。

<script setup>
import { ref } from 'vue'
import { DadsButton, DadsModal } from '@dads/vue'

const basicOpen = ref(false)
const smOpen = ref(false)
const mdOpen = ref(false)
const lgOpen = ref(false)
const fsOpen = ref(false)
const persistentOpen = ref(false)
const noCloseOpen = ref(false)
const slotOpen = ref(false)
</script>

<div class="demo">
  <DadsButton @click="basicOpen = true">モーダルを開く</DadsButton>
  <DadsModal v-model="basicOpen" title="確認">
    本当に保存しますか？
  </DadsModal>
</div>

```vue
<script setup>
import { ref } from 'vue'
import { DadsButton, DadsModal } from '@dads/vue'

const open = ref(false)
</script>

<template>
  <DadsButton @click="open = true">モーダルを開く</DadsButton>
  <DadsModal v-model="open" title="確認"> 本当に保存しますか？ </DadsModal>
</template>
```

## Size

4 つの幅プリセット (`sm` / `md` / `lg` / `fullscreen`)。デフォルトは `md`。

<div class="demo">
  <div class="demo-row">
    <DadsButton @click="smOpen = true">SM</DadsButton>
    <DadsButton @click="mdOpen = true">MD</DadsButton>
    <DadsButton @click="lgOpen = true">LG</DadsButton>
    <DadsButton @click="fsOpen = true">Fullscreen</DadsButton>
  </div>
  <DadsModal v-model="smOpen" size="sm" title="SM サイズ">
    最大幅 400px の小さなダイアログ。
  </DadsModal>
  <DadsModal v-model="mdOpen" size="md" title="MD サイズ">
    最大幅 600px の標準サイズ。
  </DadsModal>
  <DadsModal v-model="lgOpen" size="lg" title="LG サイズ">
    最大幅 800px の大きめサイズ。
  </DadsModal>
  <DadsModal v-model="fsOpen" size="fullscreen" title="Fullscreen">
    ビューポート全体を覆うサイズ。
  </DadsModal>
</div>

## 状態

### Persistent

`persistent` を有効にすると、ESC キーやオーバーレイクリックでは閉じない。閉じるボタンは依然として機能する。取り消し不可能な処理の確認などに利用する。

<div class="demo">
  <DadsButton @click="persistentOpen = true">Persistent モーダル</DadsButton>
  <DadsModal v-model="persistentOpen" persistent title="削除の確認">
    この操作は取り消せません。閉じるには右上の × ボタンを押してください。
  </DadsModal>
</div>

### Closable = false

`closable` を `false` にすると閉じるボタンが消える。ユーザの選択を必須にしたいフロー用。

<div class="demo">
  <DadsButton @click="noCloseOpen = true">閉じるボタンなし</DadsButton>
  <DadsModal v-model="noCloseOpen" :closable="false" title="選択してください">
    <p>続行するか中断するかを選んでください。</p>
    <template #footer>
      <DadsButton variant="outline" @click="noCloseOpen = false">中断</DadsButton>
      <DadsButton @click="noCloseOpen = false">続行</DadsButton>
    </template>
  </DadsModal>
</div>

## Slot

`default` / `header` / `footer` の 3 スロットを提供する。`header` を上書きすると `title` プロップで生成される見出しを差し替えられる。

<div class="demo">
  <DadsButton @click="slotOpen = true">フッター付きを開く</DadsButton>
  <DadsModal v-model="slotOpen" title="保存の確認">
    変更内容を保存します。よろしいですか？
    <template #footer>
      <DadsButton variant="outline" @click="slotOpen = false">キャンセル</DadsButton>
      <DadsButton @click="slotOpen = false">保存</DadsButton>
    </template>
  </DadsModal>
</div>

```vue
<DadsModal v-model="open" title="保存の確認">
  変更内容を保存します。よろしいですか？
  <template #footer>
    <DadsButton variant="outline" @click="open = false">キャンセル</DadsButton>
    <DadsButton @click="open = false">保存</DadsButton>
  </template>
</DadsModal>
```

| Slot      | 説明                                                                       |
| --------- | -------------------------------------------------------------------------- |
| `default` | モーダル本文                                                               |
| `header`  | ヘッダ領域。指定すると `title` プロップによる見出しを差し替える            |
| `footer`  | フッタ領域。指定された場合のみレンダリングされる（アクションボタン配置用） |

## Props

| Prop         | 型                                     | デフォルト | 説明                                                         |
| ------------ | -------------------------------------- | ---------- | ------------------------------------------------------------ |
| `modelValue` | `boolean`                              | `false`    | 開閉状態。`v-model` で双方向バインド                         |
| `size`       | `'sm' \| 'md' \| 'lg' \| 'fullscreen'` | `'md'`     | 幅プリセット                                                 |
| `title`      | `string`                               | -          | ヘッダ見出し。`aria-labelledby` のターゲットにも使用         |
| `persistent` | `boolean`                              | `false`    | `true` で ESC キー・オーバーレイクリックでの閉じる操作を抑止 |
| `closable`   | `boolean`                              | `true`     | ヘッダの閉じるボタンを表示するか                             |
| `closeLabel` | `string`                               | `'閉じる'` | 閉じるボタンの `aria-label`                                  |

## Events

| Event               | Payload   | 説明                                              |
| ------------------- | --------- | ------------------------------------------------- |
| `update:modelValue` | `boolean` | 開閉状態が変わったときに発火（`v-model` 用）      |
| `open`              | -         | モーダルが開いた直後に発火                        |
| `close`             | -         | 閉じる操作（ボタン / ESC / オーバーレイ）の発火時 |

## アクセシビリティ

- ルート要素に `role="dialog"` と `aria-modal="true"` を付与し、`title` を渡した場合は `aria-labelledby` で見出しと関連付ける。
- 開いた瞬間にパネルへフォーカスを移動し、`Tab` / `Shift+Tab` でフォーカスをモーダル内にトラップする。
- 閉じた際は、開く直前にフォーカスを持っていた要素へ自動で戻す。
- ESC キーで閉じる（`persistent` 指定時を除く）。オーバーレイクリックでも同様に閉じる。
- 閉じるボタンには既定で `aria-label="閉じる"` が設定される。多言語対応時は `closeLabel` を指定する。
