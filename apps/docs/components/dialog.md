# Dialog

オーバーレイ上に表示されるダイアログ。フォーカストラップと ESC キーでの閉じる動作を提供し、`v-model` で開閉を制御する。公式 slug は `dialog`。旧名 `DadsModal` は deprecated として併存する。

## 基本

最小構成。トリガーとなるボタンと `v-model` で接続する `ref` を組み合わせて開閉する。

<script setup>
import { ref } from 'vue'
import { DadsButton, DadsDialog } from '@dads/vue'

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
  <DadsButton @click="basicOpen = true">ダイアログを開く</DadsButton>
  <DadsDialog v-model="basicOpen" title="確認">
    本当に保存しますか？
  </DadsDialog>
</div>

```vue
<script setup>
import { ref } from 'vue'
import { DadsButton, DadsDialog } from '@dads/vue'

const open = ref(false)
</script>

<template>
  <DadsButton @click="open = true">ダイアログを開く</DadsButton>
  <DadsDialog v-model="open" title="確認"> 本当に保存しますか？ </DadsDialog>
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
  <DadsDialog v-model="smOpen" size="sm" title="SM サイズ">
    最大幅 400px の小さなダイアログ。
  </DadsDialog>
  <DadsDialog v-model="mdOpen" size="md" title="MD サイズ">
    最大幅 600px の標準サイズ。
  </DadsDialog>
  <DadsDialog v-model="lgOpen" size="lg" title="LG サイズ">
    最大幅 800px の大きめサイズ。
  </DadsDialog>
  <DadsDialog v-model="fsOpen" size="fullscreen" title="Fullscreen">
    ビューポート全体を覆うサイズ。
  </DadsDialog>
</div>

## 状態

### Persistent

`persistent` を有効にすると、ESC キーやオーバーレイクリックでは閉じない。閉じるボタンは依然として機能する。取り消し不可能な処理の確認などに利用する。

<div class="demo">
  <DadsButton @click="persistentOpen = true">Persistent ダイアログ</DadsButton>
  <DadsDialog v-model="persistentOpen" persistent title="削除の確認">
    この操作は取り消せません。閉じるには右上の × ボタンを押してください。
  </DadsDialog>
</div>

### Closable = false

`closable` を `false` にすると閉じるボタンが消える。ユーザの選択を必須にしたいフロー用。

<div class="demo">
  <DadsButton @click="noCloseOpen = true">閉じるボタンなし</DadsButton>
  <DadsDialog v-model="noCloseOpen" :closable="false" title="選択してください">
    <p>続行するか中断するかを選んでください。</p>
    <template #footer>
      <DadsButton variant="outline" @click="noCloseOpen = false">中断</DadsButton>
      <DadsButton @click="noCloseOpen = false">続行</DadsButton>
    </template>
  </DadsDialog>
</div>

## Slot

`default` / `header` / `footer` の 3 スロットを提供する。`header` を上書きすると `title` プロップで生成される見出しを差し替えられる。

<div class="demo">
  <DadsButton @click="slotOpen = true">フッター付きを開く</DadsButton>
  <DadsDialog v-model="slotOpen" title="保存の確認">
    変更内容を保存します。よろしいですか？
    <template #footer>
      <DadsButton variant="outline" @click="slotOpen = false">キャンセル</DadsButton>
      <DadsButton @click="slotOpen = false">保存</DadsButton>
    </template>
  </DadsDialog>
</div>

```vue
<DadsDialog v-model="open" title="保存の確認">
  変更内容を保存します。よろしいですか？
  <template #footer>
    <DadsButton variant="outline" @click="open = false">キャンセル</DadsButton>
    <DadsButton @click="open = false">保存</DadsButton>
  </template>
</DadsDialog>
```

| Slot      | 説明                                                                       |
| --------- | -------------------------------------------------------------------------- |
| `default` | ダイアログ本文                                                             |
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
| `open`              | -         | ダイアログが開いた直後に発火                      |
| `close`             | -         | 閉じる操作（ボタン / ESC / オーバーレイ）の発火時 |

## アクセシビリティ

- ルート要素に `role="dialog"` と `aria-modal="true"` を付与し、`title` を渡した場合は `aria-labelledby` で見出しと関連付ける。
- 開いた瞬間にパネルへフォーカスを移動し、`Tab` / `Shift+Tab` でフォーカスをダイアログ内にトラップする。
- 閉じた際は、開く直前にフォーカスを持っていた要素へ自動で戻す。
- ESC キーで閉じる（`persistent` 指定時を除く）。オーバーレイクリックでも同様に閉じる。
- 閉じるボタンには既定で `aria-label="閉じる"` が設定される。多言語対応時は `closeLabel` を指定する。

## マイグレーション (DadsModal → DadsDialog)

旧名 `DadsModal` は引き続き re-export されているが、`@deprecated` 警告が出る。次のメジャーバージョンで削除予定。新規コードは `DadsDialog` を使用すること。

```ts
// 旧 (deprecated)
import { DadsModal } from '@dads/vue'
// 新
import { DadsDialog } from '@dads/vue'
```
