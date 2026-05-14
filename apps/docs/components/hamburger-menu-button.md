# HamburgerMenuButton

画面スペース資源に制限のある主にモバイルデバイスで、メニュー（ドロワー / モバイルメニュー）を表示するためのトリガーとなるボタン。3 本線のハンバーガーアイコンとテキストラベル「メニュー」を組み合わせ、メニュー開時にはアイコンが × に、テキストが「閉じる」に切り替わる。

## 基本

`v-model` で開閉状態 (`boolean`) を双方向バインドし、`ariaControls` に制御対象メニュー要素の `id` を渡す。

<script setup>
import { ref } from 'vue'
import { DadsHamburgerMenuButton } from '@dads/vue'

const open = ref(false)
const openControls = ref(false)
const disabledOpen = ref(false)
const sizeLg = ref(false)
const sizeMd = ref(false)
const sizeSm = ref(false)
const customLabel = ref(false)
</script>

<div class="demo">
  <DadsHamburgerMenuButton v-model="open" aria-controls="dads-demo-menu-basic" />
  <span class="demo-label" style="margin-top:0.5rem">現在の状態: {{ open ? '開' : '閉' }}</span>
  <nav id="dads-demo-menu-basic" v-show="open" style="margin-top:0.5rem;padding:0.5rem 1rem;border:1px solid #d6d6d6;border-radius:0.25rem">
    <ul style="margin:0;padding-left:1.25rem">
      <li>ホーム</li>
      <li>サービス</li>
      <li>お問い合わせ</li>
    </ul>
  </nav>
</div>

```vue
<script setup>
import { ref } from 'vue'
import { DadsHamburgerMenuButton } from '@dads/vue'

const open = ref(false)
</script>

<template>
  <DadsHamburgerMenuButton v-model="open" aria-controls="main-menu" />
  <nav id="main-menu" v-show="open">
    <!-- メニュー項目 -->
  </nav>
</template>
```

## ariaControls

`ariaControls` には、このボタンが開閉対象とするメニュー要素の `id` を必ず指定する。`aria-controls` 属性として出力され、支援技術（スクリーンリーダー等）が「このボタンがどの要素を操作するか」を把握できるようになる。

<div class="demo">
  <DadsHamburgerMenuButton v-model="openControls" aria-controls="dads-demo-menu-controls" />
  <span class="demo-label" style="margin-top:0.5rem">aria-controls="dads-demo-menu-controls"</span>
</div>

```vue
<DadsHamburgerMenuButton v-model="open" aria-controls="primary-drawer" />
<aside id="primary-drawer" v-show="open">…</aside>
```

## disabled

操作を一時的に無効化したいときは `disabled` を指定する。クリックを受け付けず、`update:modelValue` も発火しない。

<div class="demo">
  <DadsHamburgerMenuButton v-model="disabledOpen" disabled aria-controls="dads-demo-menu-disabled" />
</div>

## size

`lg` / `md` / `sm` の 3 サイズに対応する。デフォルトは `md`。ヘッダー領域のサイズに応じて調整する。

<div class="demo">
  <div class="demo-row" style="align-items:center">
    <DadsHamburgerMenuButton v-model="sizeLg" size="lg" aria-controls="dads-demo-menu-lg" />
    <DadsHamburgerMenuButton v-model="sizeMd" size="md" aria-controls="dads-demo-menu-md" />
    <DadsHamburgerMenuButton v-model="sizeSm" size="sm" aria-controls="dads-demo-menu-sm" />
  </div>
</div>

```vue
<DadsHamburgerMenuButton v-model="open" size="lg" aria-controls="menu" />
<DadsHamburgerMenuButton v-model="open" size="md" aria-controls="menu" />
<DadsHamburgerMenuButton v-model="open" size="sm" aria-controls="menu" />
```

## カスタムラベル

`openLabel` / `closeLabel` で表示テキストを差し替えられる。英語 UI 向けの `MENU` / `CLOSE` などに対応するためのオプション。

<div class="demo">
  <DadsHamburgerMenuButton
    v-model="customLabel"
    open-label="MENU"
    close-label="CLOSE"
    aria-controls="dads-demo-menu-custom"
  />
</div>

```vue
<DadsHamburgerMenuButton
  v-model="open"
  open-label="MENU"
  close-label="CLOSE"
  aria-controls="menu"
/>
```

## Props

| Prop           | 型                     | デフォルト   | 説明                                                                |
| -------------- | ---------------------- | ------------ | ------------------------------------------------------------------- |
| `modelValue`   | `boolean`              | `false`      | メニューの開閉状態。`v-model` で双方向バインドする。                |
| `ariaControls` | `string`               | -（必須）    | 制御対象メニュー要素の `id`。`aria-controls` 属性として出力される。 |
| `disabled`     | `boolean`              | `false`      | 操作不可化。クリックを受け付けず `update:modelValue` も発火しない。 |
| `openLabel`    | `string`               | `'メニュー'` | メニュー閉状態（通常時）に表示するテキスト。                        |
| `closeLabel`   | `string`               | `'閉じる'`   | メニュー開状態に表示するテキスト。                                  |
| `size`         | `'lg' \| 'md' \| 'sm'` | `'md'`       | サイズ。                                                            |

## Events

| Event               | Payload      | 説明                                                               |
| ------------------- | ------------ | ------------------------------------------------------------------ |
| `update:modelValue` | `boolean`    | クリックでトグルされた新しい開閉値。`v-model` の対として発火する。 |
| `click`             | `MouseEvent` | ボタンがクリックされた際に元の MouseEvent を伝搬する。             |

## アクセシビリティ

- `aria-expanded` で現在の開閉状態を支援技術に伝える（`modelValue` と連動）。
- `aria-controls` には対象メニュー要素の `id` を必ず指定し、ボタンと操作対象の関係を機械可読にする。
- アイコン SVG は `aria-hidden="true"` で隠し、テキストラベル（「メニュー」/「閉じる」）でアクセシブル名を担保する — アイコンのみのバリアントではなく、ラベル付きで明示する公式仕様に従う。
- フォーカスリングは黒 2px + 黄色 4px の DADS 共通スタイルで、キーボード操作時のみ表示する。
- 強制カラーモード（High Contrast / forced-colors）では `CanvasText` / `currentcolor` を用い、不透明度や独自カラーに依存せず可視性を確保する。
- ヘッダーエリアの左端または右端に配置することが推奨される。

## 関連

- 公式仕様: [ハンバーガーメニューボタン](https://design.digital.go.jp/dads/components/hamburger-menu-button/)
- 同種の開閉トリガー: [Disclosure](./disclosure) / [Accordion](./accordion)
- 連携先メニュー: [Drawer](./drawer)
