# HeaderContainer

アプリケーション上部に配置するヘッダーレイアウト。ロゴ・ナビゲーション・アクションの 3 スロットと、モバイル用ハンバーガーボタンを提供する。公式 slug は `header-container`。旧名 `DadsHeader` は deprecated として併存する。

## 基本

最小構成では `logo` スロットだけで動作する。デフォルトで sticky 表示とハンバーガーボタンが有効。

<script setup>
import { ref } from 'vue'
import { DadsHeaderContainer, DadsButton } from '@dads/vue'

const lastMenuClickAt = ref('-')
const onMenuClick = () => {
  lastMenuClickAt.value = new Date().toLocaleTimeString()
}
</script>

<div class="demo">
  <DadsHeaderContainer :sticky="false" @click:menu="onMenuClick">
    <template #logo>
      <strong>dads-lib</strong>
    </template>
  </DadsHeaderContainer>
</div>

```vue
<script setup>
import { DadsHeaderContainer } from '@dads/vue'
</script>

<template>
  <DadsHeaderContainer @click:menu="onMenuClick">
    <template #logo>
      <strong>dads-lib</strong>
    </template>
  </DadsHeaderContainer>
</template>
```

## ロゴ + ナビゲーション + アクション

3 つのスロットを全て埋めた典型的なヘッダー構成。`nav` は内部で `<nav aria-label="メインナビゲーション">` としてレンダリングされる。

<div class="demo">
  <DadsHeaderContainer :sticky="false" @click:menu="onMenuClick">
    <template #logo>
      <strong>dads-lib</strong>
    </template>
    <template #nav>
      <a href="#home" style="margin-right:1rem">ホーム</a>
      <a href="#docs" style="margin-right:1rem">ドキュメント</a>
      <a href="#about">概要</a>
    </template>
    <template #actions>
      <DadsButton variant="outline" size="sm">ログイン</DadsButton>
      <DadsButton size="sm">登録</DadsButton>
    </template>
  </DadsHeaderContainer>
</div>

```vue
<DadsHeaderContainer>
  <template #logo><strong>dads-lib</strong></template>
  <template #nav>
    <a href="#home">ホーム</a>
    <a href="#docs">ドキュメント</a>
  </template>
  <template #actions>
    <DadsButton variant="outline" size="sm">ログイン</DadsButton>
    <DadsButton size="sm">登録</DadsButton>
  </template>
</DadsHeaderContainer>
```

## sticky の無効化

`sticky` を `false` にすると、スクロール時に追従しない通常の position 配置となる。デフォルトは `true`。

<div class="demo">
  <span class="demo-label">sticky=false（このカタログ内の他例も非 sticky で表示）</span>
  <DadsHeaderContainer :sticky="false">
    <template #logo><strong>非 sticky なヘッダー</strong></template>
  </DadsHeaderContainer>
</div>

## ハンバーガーボタンの抑止

`showMenuToggle="false"` にするとモバイルでもハンバーガーボタンを描画しない。サイドメニューを持たないシンプルなアプリで利用する。

<div class="demo">
  <DadsHeaderContainer :sticky="false" :show-menu-toggle="false">
    <template #logo><strong>メニューボタン無し</strong></template>
    <template #actions>
      <DadsButton variant="text" size="sm">ヘルプ</DadsButton>
    </template>
  </DadsHeaderContainer>
</div>

## ハンバーガー aria-label のカスタマイズ

`menuToggleLabel` でハンバーガーボタンの `aria-label` を上書きできる。多言語対応や、より具体的なラベルを与えたい場合に利用する。

<div class="demo">
  <DadsHeaderContainer :sticky="false" menu-toggle-label="Open navigation drawer">
    <template #logo><strong>カスタム aria-label</strong></template>
  </DadsHeaderContainer>
</div>

```vue
<DadsHeaderContainer menu-toggle-label="Open navigation drawer">
  <template #logo><strong>App</strong></template>
</DadsHeaderContainer>
```

## イベントハンドリング

ハンバーガーボタン押下時に `click:menu` が発火する。Drawer の開閉は親コンポーネント側の責務。

<div class="demo">
  <DadsHeaderContainer :sticky="false" @click:menu="onMenuClick">
    <template #logo><strong>クリックでイベント発火</strong></template>
  </DadsHeaderContainer>
  <span class="demo-label" style="margin-top:0.5rem">最後にメニューが押された時刻: {{ lastMenuClickAt }}</span>
</div>

## Slot

| Slot      | 説明                                                                   |
| --------- | ---------------------------------------------------------------------- |
| `logo`    | ロゴ・サービス名表示領域。空のとき wrapper 自体が描画されない          |
| `nav`     | メインナビゲーション。`<nav aria-label="メインナビゲーション">` で囲む |
| `actions` | 右寄せの操作領域（ログイン・通知・アバター等）                         |

## Props

| Prop              | 型        | デフォルト         | 説明                                       |
| ----------------- | --------- | ------------------ | ------------------------------------------ |
| `sticky`          | `boolean` | `true`             | スクロール時にビューポート上端へ吸着させる |
| `showMenuToggle`  | `boolean` | `true`             | モバイル用ハンバーガーボタンを描画する     |
| `menuToggleLabel` | `string`  | `'メニューを開く'` | ハンバーガーボタンの `aria-label`          |

## Events

| Event        | Payload      | 説明                                                       |
| ------------ | ------------ | ---------------------------------------------------------- |
| `click:menu` | `MouseEvent` | ハンバーガーボタン押下時（クリック / Enter / Space）に発火 |

## アクセシビリティ

- ルート要素は `<header>` ランドマークとしてレンダリングされる
- `nav` スロットを使うと内部で `<nav aria-label="メインナビゲーション">` が付与される
- ハンバーガーは実体が `<button type="button">` のためキーボード操作（Enter / Space）が自動で効く
- ハンバーガー内のアイコンは `aria-hidden="true"` で、ボタン自身は `aria-label` でアクセシブル名を保持する
- Drawer 開閉などの状態管理は親側の責務 — `aria-expanded` を付与する場合は親でラップして設定する

## マイグレーション (DadsHeader → DadsHeaderContainer)

旧名 `DadsHeader` は引き続き re-export されているが、`@deprecated` 警告が出る。次のメジャーバージョンで削除予定。CSS クラスも `dads-header*` から `dads-header-container*` に変更されている。

```ts
// 旧 (deprecated)
import { DadsHeader } from '@dads/vue'
// 新
import { DadsHeaderContainer } from '@dads/vue'
```
