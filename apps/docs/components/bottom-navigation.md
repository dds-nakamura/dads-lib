# BottomNavigation

モバイル向けに画面下部に固定表示するタブ型ナビゲーション。各項目はアイコン + ラベルで構成され、現在地を `aria-current="page"` で示す。

::: danger ⚠️ Deprecated — 公式 DADS で非推奨
このコンポーネントは公式 DADS において **非推奨 (Deprecated)** とされています。

- **画面下部の固定領域** はモバイルブラウザの UI（ホームバー、URL バー、IME など）と重なりやすく、ユーザーが意図せず別操作を引き起こすリスクがある
- **タブ型固定ナビゲーション** はアクセシビリティ要件（44px ターゲットサイズ、視認性、ズーム時のレイアウト崩れ）を安定して満たしにくい
- 公式の仕様詳細は更新が停止しており、今後の DADS バージョンで追加機能・改善は提供されない

**代替の検討先**:

- スマートフォン向けの主要ナビゲーション → `DadsHamburgerMenuButton` + `DadsMobileMenu` の組み合わせ
- 主要セクションへのジャンプ → `DadsHeaderContainer` の `utility` slot や `DadsGlobalMenu`
- 同階層ページ間の移動 → `DadsTab` (ページ上部に配置)

既存実装の互換性のため API は維持していますが、新規実装での採用は避けてください。やむを得ず使用する場合は、画面下部のセーフエリア (`env(safe-area-inset-bottom)`) の確保とタッチターゲットサイズ 44×44px 以上を厳守してください。
:::

## 基本

`items` にアイコン付きの項目定義を渡し、`v-model` で現在アクティブな項目の `id` を双方向バインドする。

> 表示は `position: fixed; bottom: 0;` のためビューポート最下部に重ねて描画される。以下のデモはカタログのレイアウト上、固定表示されることに注意。

<script setup>
import { ref } from 'vue'
import { DadsBottomNavigation } from '@dads/vue'

const items = [
  { id: 'home', label: 'ホーム', iconName: 'mdi-home' },
  { id: 'search', label: '検索', iconName: 'mdi-magnify' },
  { id: 'favorites', label: 'お気に入り', iconName: 'mdi-heart' },
  { id: 'profile', label: 'プロフィール', iconName: 'mdi-account' },
]
const active = ref('home')

const itemsWithDisabled = [
  { id: 'a', label: '利用可能', iconName: 'mdi-home' },
  { id: 'b', label: '無効', iconName: 'mdi-lock', disabled: true },
  { id: 'c', label: '利用可能', iconName: 'mdi-heart' },
]
const activeDisabled = ref('a')
</script>

<div class="demo">
  <p>現在の選択: <strong>{{ active }}</strong></p>
  <DadsBottomNavigation v-model="active" :items="items" />
</div>

```vue
<script setup>
import { ref } from 'vue'
import { DadsBottomNavigation } from '@dads/vue'

const items = [
  { id: 'home', label: 'ホーム', iconName: 'mdi-home' },
  { id: 'search', label: '検索', iconName: 'mdi-magnify' },
  { id: 'favorites', label: 'お気に入り', iconName: 'mdi-heart' },
  { id: 'profile', label: 'プロフィール', iconName: 'mdi-account' },
]
const active = ref('home')
</script>

<template>
  <DadsBottomNavigation v-model="active" :items="items" />
</template>
```

## 無効化

`items[].disabled` を `true` にすると、その項目はクリック不可となり `update:modelValue` も発火しない。

<div class="demo">
  <p>現在の選択: <strong>{{ activeDisabled }}</strong></p>
  <DadsBottomNavigation v-model="activeDisabled" :items="itemsWithDisabled" />
</div>

```vue
const items = [ { id: 'a', label: '利用可能', iconName: 'mdi-home' }, { id: 'b', label: '無効',
iconName: 'mdi-lock', disabled: true }, { id: 'c', label: '利用可能', iconName: 'mdi-heart' }, ]
```

## アイコン

各項目の `iconName` には [Material Design Icons](https://pictogrammers.com/library/mdi/) のクラス名 (`mdi-*`) を渡す。利用側で `@mdi/font` の CSS を読み込むことが前提（カタログ側では未ロードのためアイコンは表示されない）。

```vue
const items = [ { id: 'home', label: 'ホーム', iconName: 'mdi-home' }, { id: 'inbox', label:
'受信箱', iconName: 'mdi-inbox' }, { id: 'settings', label: '設定', iconName: 'mdi-cog' }, ]
```

## リンクとして

`items[].href` を渡すと、その項目は `<button>` の代わりに `<a>` 要素としてレンダリングされる。

```vue
const items = [ { id: 'home', label: 'ホーム', iconName: 'mdi-home', href: '/' }, { id: 'about',
label: '紹介', iconName: 'mdi-information', href: '/about' }, ]
```

## Props

| Prop         | 型                           | デフォルト               | 説明                                       |
| ------------ | ---------------------------- | ------------------------ | ------------------------------------------ |
| `modelValue` | `string`                     | -                        | 現在アクティブな項目の `id` (v-model 対象) |
| `items`      | `DadsBottomNavigationItem[]` | -                        | 項目定義の配列                             |
| `ariaLabel`  | `string`                     | `'ボトムナビゲーション'` | `<nav>` のアクセシブル名 (`aria-label`)    |

### `DadsBottomNavigationItem`

| プロパティ | 型        | 必須 | 説明                                          |
| ---------- | --------- | ---- | --------------------------------------------- |
| `id`       | `string`  | はい | v-model の値として使う一意な識別子            |
| `label`    | `string`  | はい | アイコン下に表示するラベル                    |
| `iconName` | `string`  | はい | MDI クラス名 (例: `'mdi-home'`)               |
| `href`     | `string`  | -    | 指定時は `<a>` でレンダリング                 |
| `disabled` | `boolean` | -    | `true` のときクリック不可・イベント発火を抑止 |

## Events

| Event               | Payload  | 説明                                          |
| ------------------- | -------- | --------------------------------------------- |
| `update:modelValue` | `string` | v-model 用。クリックされた項目の `id`         |
| `change`            | `string` | 選択が変化したとき発火。Payload は項目の `id` |

## アクセシビリティ

- ルートは `<nav>` 要素でレンダリングされ、`aria-label`（既定: `ボトムナビゲーション`）を持つ
- アクティブな項目には `aria-current="page"` が付与され、視覚的にも強調される
- 各項目はデフォルトで `<button type="button">`、`href` 指定時のみ `<a>` としてレンダリングされる
- `disabled` 状態は `<button>` ではネイティブ `disabled`、`<a>` では `aria-disabled="true"` + `tabindex="-1"` で操作不能化
- アイコン要素には `aria-hidden="true"` が付き、ラベルテキストがアクセシブル名を担う
- 強制カラーモード (Windows High Contrast) ではアクティブ項目に `outline` が追加される
