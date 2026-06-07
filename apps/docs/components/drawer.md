# Drawer

ネイティブ `<dialog>` + `showModal()` + `::backdrop` で実装したモーダルなサイドパネル。トリガーから `v-model` で開閉する。本体 (body) はデフォルトスロットに自由配置する。Esc・フォーカストラップ・背景の inert 化はブラウザのネイティブ `<dialog>` に委ねる。`placement` プロップで **左 (デフォルト) / 右** を切り替えできる。

## 基本

<script setup>
import { ref } from 'vue'
import { DadsButton, DadsDrawer, DadsMenuList } from '@dads/vue'

const basicOpen = ref(false)
const titledOpen = ref(false)
const rightOpen = ref(false)

const navItems = [
  { label: 'ホーム', href: '/', frontIcon: 'home' },
  { label: 'タスク', href: '/tasks', frontIcon: 'check_circle' },
  { label: '設定', href: '/settings', frontIcon: 'settings' },
]
</script>

<div class="demo">
  <DadsButton @click="basicOpen = true">メニューを開く</DadsButton>
  <DadsDrawer v-model="basicOpen">
    <DadsMenuList :items="navItems" type="box" />
  </DadsDrawer>
</div>

```vue
<script setup>
import { ref } from 'vue'
import { DadsButton, DadsDrawer, DadsMenuList } from '@dads/vue'

const open = ref(false)
const navItems = [
  { label: 'ホーム', href: '/', frontIcon: 'home' },
  { label: 'タスク', href: '/tasks', frontIcon: 'check_circle' },
  { label: '設定', href: '/settings', frontIcon: 'settings' },
]
</script>

<template>
  <DadsButton @click="open = true">メニューを開く</DadsButton>
  <DadsDrawer v-model="open">
    <DadsMenuList :items="navItems" type="box" />
  </DadsDrawer>
</template>
```

本体はスロットなので任意のコンテンツを配置できる。ナビゲーションには `DadsMenuList` の組み合わせが扱いやすい。

## 右配置 (placement)

公式 example CSS は **左寄せ / 右寄せ** の 2 配置を定義する。`placement` プロップで切替可能 (デフォルト `'left'`)。

<div class="demo">
  <DadsButton @click="rightOpen = true">右側から開く</DadsButton>
  <DadsDrawer v-model="rightOpen" placement="right" title="設定パネル">
    <DadsMenuList :items="navItems" type="box" />
  </DadsDrawer>
</div>

```vue
<DadsDrawer v-model="open" placement="right" title="設定">
  <DadsMenuList :items="items" type="box" />
</DadsDrawer>
```

## アクセシブル名 (title)

`title` は視覚的に隠した `<h2>` として描画され、`aria-labelledby` 経由でダイアログのアクセシブル名になる (デフォルト `'メニュー'`)。i18n 用に上書きできる。

<div class="demo">
  <DadsButton @click="titledOpen = true">タイトル付きで開く</DadsButton>
  <DadsDrawer v-model="titledOpen" title="メインメニュー">
    <DadsMenuList :items="navItems" type="box" />
  </DadsDrawer>
</div>

## Props

| Prop         | 型                   | デフォルト  | 説明                                                                        |
| ------------ | -------------------- | ----------- | --------------------------------------------------------------------------- |
| `modelValue` | `boolean`            | `false`     | 開閉状態 (`v-model` 対応)                                                    |
| `title`      | `string`             | `'メニュー'` | 視覚的に隠した見出し。`aria-labelledby` 経由でアクセシブル名になる。i18n 可 |
| `placement`  | `'left' \| 'right'`  | `'left'`    | Drawer 配置パターン                                                          |
| `closeLabel` | `string`             | `'閉じる'`   | 閉じるボタンのラベル / `aria`                                                |

## Slots

| Slot      | 説明                                       |
| --------- | ------------------------------------------ |
| `default` | Drawer の本体 (`.dads-drawer__body`) の中身 |

## Events

| Event               | Payload          | 説明                                                                |
| ------------------- | ---------------- | ------------------------------------------------------------------- |
| `update:modelValue` | `value: boolean` | 閉じるボタン / backdrop クリック / Esc (ネイティブ close) で発火する |

## アクセシビリティ

- ネイティブ `<dialog>` を `showModal()` で開くため、モーダル化・フォーカストラップ・背景の inert 化・Esc-to-close・閉じた後のフォーカス復帰はすべてブラウザが提供する
- `title` を視覚的に隠した `<h2>` として描画し、`aria-labelledby` でダイアログのアクセシブル名に紐付ける
- 閉じるボタンは共有部品 `DadsHamburgerMenuButton` (× アイコン + 「閉じる」) を使用し、`aria-controls` がダイアログ id を指す
- backdrop クリックでも閉じる (ネイティブ `<dialog>` は backdrop クリックで自動的に閉じないため軽量ハンドラを追加)
