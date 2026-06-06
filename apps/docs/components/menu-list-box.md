# MenuListBox

ボックス状の枠でメニュー項目を内包するコンポーネント。各項目は `<button>` または `href` 指定時は `<a>` としてレンダリングされ、説明文 (description) やアイコン、選択中 (active) / 操作不可 (disabled) の状態をサポートする。

> 参考: [DADS メニューリストボックス仕様](https://design.digital.go.jp/dads/components/menu-list-box/)

## 基本

`items` 配列に `label` を必須として渡すだけで、ボックス状のメニューリストが表示される。

<script setup>
import { ref } from 'vue'
import { DadsMenuListBox } from '@dads/vue'

const lastClicked = ref('')
const basicItems = [
  { label: 'メニュー項目1' },
  { label: 'メニュー項目2' },
  { label: 'メニュー項目3' },
]

const navItems = [
  { label: 'ホーム', href: '/' },
  { label: 'お知らせ', href: '/news' },
  { label: 'サポート', href: '/support' },
]

const describedItems = [
  { label: 'プロフィール', description: 'アカウント情報の編集' },
  { label: 'セキュリティ', description: 'パスワードと2要素認証' },
  { label: '通知設定', description: 'メール・プッシュ通知の管理' },
]

const iconItems = [
  { label: 'ダッシュボード', iconName: 'dashboard' },
  { label: '受信トレイ', iconName: 'notifications' },
  { label: '設定', iconName: 'settings' },
]

const stateItems = [
  { label: '概要' },
  { label: '詳細', active: true },
  { label: '操作不可', disabled: true },
]

const dropdownOpen = ref(false)
const dropdownOpenEnd = ref(false)

const onItemClick = (item) => {
  lastClicked.value = item.label
}
</script>

<div class="demo">
  <DadsMenuListBox :items="basicItems" aria-label="基本メニュー" @click:item="onItemClick" />
  <p v-if="lastClicked" class="demo-label">最後にクリックされた項目: {{ lastClicked }}</p>
</div>

```vue
<script setup>
import { DadsMenuListBox } from '@dads/vue'

const items = [{ label: 'メニュー項目1' }, { label: 'メニュー項目2' }, { label: 'メニュー項目3' }]
</script>

<template>
  <DadsMenuListBox :items="items" aria-label="基本メニュー" />
</template>
```

## 説明付き (description)

各項目に `description` を設定すると、ラベルの下に補足説明を表示する。

<div class="demo">
  <DadsMenuListBox :items="describedItems" aria-label="アカウント設定" />
</div>

```vue
<DadsMenuListBox
  :items="[
    { label: 'プロフィール', description: 'アカウント情報の編集' },
    { label: 'セキュリティ', description: 'パスワードと2要素認証' },
    { label: '通知設定', description: 'メール・プッシュ通知の管理' },
  ]"
  aria-label="アカウント設定"
/>
```

## アイコン付き (icon)

`iconName` に Material Symbols 名（例: `home`）を渡すと、ラベルの前にアイコンが表示される。アイコンは inline SVG (`DadsIcon`) で描画されるためフォント読込は不要。

<div class="demo">
  <DadsMenuListBox :items="iconItems" aria-label="メインナビゲーション" />
</div>

```vue
<DadsMenuListBox
  :items="[
    { label: 'ダッシュボード', iconName: 'dashboard' },
    { label: '受信トレイ', iconName: 'notifications' },
    { label: '設定', iconName: 'settings' },
  ]"
  aria-label="メインナビゲーション"
/>
```

## 選択中 (active)

`active: true` を指定すると、現在地として強調表示され、`aria-current="page"` が自動付与される。

<div class="demo">
  <DadsMenuListBox :items="stateItems" aria-label="ページ内ナビゲーション" />
</div>

```vue
<DadsMenuListBox
  :items="[
    { label: '概要' },
    { label: '詳細', active: true },
    { label: '操作不可', disabled: true },
  ]"
  aria-label="ページ内ナビゲーション"
/>
```

## 操作不可 (disabled)

`disabled: true` を指定すると視覚的に薄く表示され、クリックや遷移が抑止される。`href` 指定時でも `<button disabled>` としてレンダリングされ、リンクとして辿れない。

```vue
<DadsMenuListBox
  :items="[{ label: '利用可能' }, { label: '保守中', disabled: true }]"
  aria-label="サブメニュー"
/>
```

## リンクとして

各項目に `href` を渡すと `<a>` 要素としてレンダリングされる。

<div class="demo">
  <DadsMenuListBox :items="navItems" aria-label="サイトナビゲーション" />
</div>

```vue
<DadsMenuListBox
  :items="[
    { label: 'ホーム', href: '/' },
    { label: 'お知らせ', href: '/news' },
    { label: 'サポート', href: '/support' },
  ]"
  aria-label="サイトナビゲーション"
/>
```

## オープナー付き (ドロップダウン) [NEW]

`triggerLabel` を指定すると、ボックス上部にオープナーボタンが追加され、クリックで開閉する **ドロップダウン式メニュー** になる。`v-model` で開閉状態を制御。

<div class="demo">
  <span class="demo-label">placement="start" (デフォルト)</span>
  <DadsMenuListBox
    v-model="dropdownOpen"
    :items="iconItems"
    aria-label="ドロップダウン"
    trigger-label="メニュー"
    trigger-icon="menu"
  />
  <span class="demo-label" style="margin-top:2rem">placement="end" (右端揃え)</span>
  <DadsMenuListBox
    v-model="dropdownOpenEnd"
    :items="iconItems"
    aria-label="ドロップダウン (右端)"
    trigger-label="設定"
    placement="end"
  />
</div>

```vue
<script setup>
import { ref } from 'vue'
const open = ref(false)
</script>

<template>
  <DadsMenuListBox
    v-model="open"
    :items="items"
    trigger-label="メニュー"
    trigger-icon="menu"
    aria-label="メニュー一覧"
  />
</template>
```

オープナー有り (Opener mode) では以下が自動で適用される:

- トリガー `<button>` に `aria-expanded` / `aria-controls` を付与
- 開いている間のみ surface を表示 (`v-show` ベース)
- 開閉時に `open` / `close` イベント発火
- `placement='end'` で右端揃え (デフォルト `'start'` は左端揃え)
- トリガー右端のシェブロンが開閉状態に応じて回転

`triggerLabel` を渡さない場合は従来通り **常時表示の Standalone mode** で動作する (後方互換)。

## Props

| Prop           | 型                      | デフォルト | 説明                                                          |
| -------------- | ----------------------- | ---------- | ------------------------------------------------------------- |
| `items`        | `DadsMenuListBoxItem[]` | -          | 必須。メニュー項目の配列                                      |
| `ariaLabel`    | `string`                | -          | `<ul role="menu">` に適用されるアクセシブルラベル             |
| `modelValue`   | `boolean`               | `false`    | 開閉状態 (Opener mode のみ。v-model)。standalone では常時表示 |
| `triggerLabel` | `string`                | -          | 指定時、トリガーボタンが描画され Opener mode になる           |
| `triggerIcon`  | `string`                | -          | トリガーボタンの Material Symbols 名 (`'menu'` 等)            |
| `triggerSize`  | `'sm' \| 'md' \| 'lg'`  | `'md'`     | トリガーボタンのサイズ                                        |
| `placement`    | `'start' \| 'end'`      | `'start'`  | Surface の整列位置 (Opener mode のみ有効)                     |

### `DadsMenuListBoxItem` の型

| キー          | 型        | 説明                                                                     |
| ------------- | --------- | ------------------------------------------------------------------------ |
| `label`       | `string`  | 必須。表示テキスト                                                       |
| `href`        | `string`  | 指定時は `<a>` としてレンダリング。`disabled` 時は無視され `<button>` 化 |
| `description` | `string`  | ラベル下に表示される補足説明                                             |
| `iconName`    | `string`  | Material Symbols 名 (例: `"home"`)                                       |
| `active`      | `boolean` | 現在地として強調表示し `aria-current="page"` を付与                      |
| `disabled`    | `boolean` | 操作不可化（クリックと遷移を抑止し `aria-disabled="true"` を付与）       |

## Events

| Event               | Payload                                                         | 説明                                                          |
| ------------------- | --------------------------------------------------------------- | ------------------------------------------------------------- |
| `click:item`        | `(item: DadsMenuListBoxItem, index: number, event: MouseEvent)` | 有効な項目がクリックされたとき発火（disabled 時は発火しない） |
| `update:modelValue` | `(value: boolean)`                                              | トリガークリックで開閉状態が変化したとき (Opener mode)        |
| `open`              | -                                                               | Surface が開いたとき (Opener mode)                            |
| `close`             | -                                                               | Surface が閉じたとき (Opener mode)                            |

## アクセシビリティ

- ルートのリストには `role="menu"` を、各項目には `role="menuitem"` を設定し、WAI-ARIA Authoring Practices の Menu パターンに準拠する
- `<ul role="menu">` には `ariaLabel` でアクセシブルな名前を与えることを推奨
- `active` 状態の項目には `aria-current="page"` が自動付与される
- `disabled` 状態は aria 層 (`aria-disabled="true"`) と DOM (`disabled` 属性) の両方で操作を抑止する
- アイコン要素は `aria-hidden="true"` のため、スクリーンリーダーはラベルテキスト（と description）のみを読み上げる
- フォーカス時は DADS 標準の黒 + 黄色のフォーカスリングが表示される
- Windows ハイコントラスト（forced-colors）モードでは `CanvasText` 色で境界線が確実に描画される
