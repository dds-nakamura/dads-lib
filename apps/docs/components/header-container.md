# HeaderContainer

アプリケーション上部に配置するヘッダーレイアウト。ロゴ・ナビゲーション・アクションの 3 スロットと、モバイル用ハンバーガーボタンを提供する。公式 slug は `header-container`。

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

## 幅・密度バリアント (variant) [NEW]

公式 DADS は 4 つのバリアントを定義する (`variant` プロップ、デフォルト `'wide-full'`)。

| variant     | 用途                                                               | 最大幅 | 最小高さ |
| ----------- | ------------------------------------------------------------------ | ------ | -------- |
| `wide-full` | 全幅・通常高さ。ポータルトップやランディング                       | -      | 64px     |
| `wide-slim` | 全幅・コンパクト高さ。サブページや高情報密度アプリ                 | -      | 48px     |
| `medium`    | 中央寄せ (max-width: 1280px)。一般的なコンテンツページ             | 1280px | 56px     |
| `compact`   | 最小ヘッダ・モバイル相当の高さ。`utility` スロットは自動で非表示化 | -      | 40px     |

<div class="demo">
  <span class="demo-label">variant="wide-slim"</span>
  <DadsHeaderContainer :sticky="false" variant="wide-slim">
    <template #logo><strong>wide-slim 例</strong></template>
  </DadsHeaderContainer>
  <span class="demo-label" style="margin-top:1rem">variant="medium" (中央寄せ)</span>
  <DadsHeaderContainer :sticky="false" variant="medium">
    <template #logo><strong>medium 例</strong></template>
  </DadsHeaderContainer>
  <span class="demo-label" style="margin-top:1rem">variant="compact"</span>
  <DadsHeaderContainer :sticky="false" variant="compact">
    <template #logo><strong>compact 例</strong></template>
  </DadsHeaderContainer>
</div>

```vue
<DadsHeaderContainer variant="medium">
  <template #logo><strong>App</strong></template>
</DadsHeaderContainer>
```

## ロゴ便利プロップ (logoLabel / logoHref) [NEW]

シンプルなテキストロゴ + リンクのみを置く場合、`#logo` スロットの代わりに `logoLabel` / `logoHref` プロップで宣言できる。両方指定時は `<a href>` でラップされたテキストロゴが描画される。

<div class="demo">
  <DadsHeaderContainer :sticky="false" logo-label="dads-lib" logo-href="/" />
</div>

```vue
<!-- テキスト + リンク (props だけで完結) -->
<DadsHeaderContainer logo-label="dads-lib" logo-href="/" />

<!-- 画像 + テキスト等の複雑なロゴはスロット -->
<DadsHeaderContainer>
  <template #logo>
    <img src="/logo.svg" alt="" />
    <span>サービス名</span>
  </template>
</DadsHeaderContainer>
```

`#logo` スロットが指定されている場合は props を上書きする。

## utility スロット [NEW]

utility-link / language-selector / search-box / login-button 等のセカンダリ要素を `actions` から分離して配置できる。compact バリアントでは自動的に非表示になる。

<div class="demo">
  <DadsHeaderContainer :sticky="false" logo-label="dads-lib" logo-href="/">
    <template #utility>
      <a href="#login" style="margin-right:1rem">ログイン</a>
      <a href="#lang">English</a>
    </template>
    <template #actions>
      <DadsButton size="sm">登録</DadsButton>
    </template>
  </DadsHeaderContainer>
</div>

```vue
<DadsHeaderContainer logo-label="App" logo-href="/">
  <template #utility>
    <a href="/login">ログイン</a>
    <a href="/lang">English</a>
  </template>
  <template #actions>
    <DadsButton>登録</DadsButton>
  </template>
</DadsHeaderContainer>
```

## Slot

| Slot      | 説明                                                                                                   |
| --------- | ------------------------------------------------------------------------------------------------------ |
| `logo`    | ロゴ・サービス名表示領域。空のとき wrapper 自体が描画されない。`logoLabel`/`logoHref` プロップを上書き |
| `nav`     | メインナビゲーション。`<nav aria-label="メインナビゲーション">` で囲む                                 |
| `utility` | 補助領域 (utility-link / 言語切替 / 検索 / ログインボタン等)。compact 時は非表示                       |
| `actions` | 右寄せの操作領域 (CTA ボタン・アバター等)                                                              |

## Props

| Prop              | 型                                                    | デフォルト               | 説明                                                              |
| ----------------- | ----------------------------------------------------- | ------------------------ | ----------------------------------------------------------------- |
| `sticky`          | `boolean`                                             | `true`                   | スクロール時にビューポート上端へ吸着させる                        |
| `showMenuToggle`  | `boolean`                                             | `true`                   | モバイル用ハンバーガーボタンを描画する                            |
| `menuToggleLabel` | `string`                                              | `'メニューを開く'`       | ハンバーガーボタンの `aria-label`                                 |
| `variant`         | `'wide-full' \| 'wide-slim' \| 'medium' \| 'compact'` | `'wide-full'`            | Header の幅・高さ・密度バリアント (公式 4 パターン)               |
| `logoLabel`       | `string`                                              | -                        | テキストロゴ。`#logo` スロットがある場合は無視される              |
| `logoHref`        | `string`                                              | -                        | `logoLabel` を `<a href>` でラップ                                |
| `navAriaLabel`    | `string`                                              | `'メインナビゲーション'` | `nav` スロットを囲む `<nav>` の `aria-label`。i18n 用に上書き可能 |

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

旧名 `DadsHeader` は major リリース (Issue #14) で削除済み。新規コード・既存コードともに `DadsHeaderContainer` を使用すること。CSS クラスも `dads-header*` から `dads-header-container*` に変更されている。

```ts
// 旧 (削除済み)
// import { DadsHeader } from '@dads/vue'
// 新
import { DadsHeaderContainer } from '@dads/vue'
```
