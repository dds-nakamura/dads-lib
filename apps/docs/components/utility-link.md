# UtilityLink

ユーティリティリンク (Utility Link) は、ふつうの横並びリンクリストよりもコンパクトに作られたリンクコンポーネント。デスクトップビューでヘッダーエリアやフッターエリアに配置し、「お問合わせ」「よくあるご質問」「プライバシーポリシー」など頻繁にアクセスされる、または法的に必要なリンクへのショートカットとして利用する。

::: tip ✅ 公式仕様充足
公式 DADS のユースケース (お問合わせ / よくあるご質問 / プライバシーポリシー等の頻出・法的リンク) を、単一/リスト両モード + `iconName` + `external` + `click` イベントでカバーしています。Figma 確認でも追加バリアント仕様はなく、現状で公式仕様を満たしています。
:::

## 基本

### 単一リンク

`href` と `label` を直接渡すと、1 件の `<a class="dads-utility-link">` として描画される。

<script setup>
import { ref } from 'vue'
import { DadsUtilityLink } from '@dads/vue'

const footerItems = [
  { label: 'プライバシーポリシー', href: '/privacy' },
  { label: 'リンク・著作権について', href: '/copyright' },
  { label: '免責事項', href: '/disclaimer' },
  { label: 'アクセス', href: '/access' },
  { label: 'アクセシビリティへの対応について', href: '/accessibility' },
]

const headerItems = [
  { label: 'お問合わせ', href: '/contact' },
  { label: 'よくあるご質問', href: '/faq' },
  { label: '公式X（Twitter）', href: 'https://twitter.com/', external: true },
  { label: 'アクセス', href: '/access' },
]

const iconItems = [
  { label: 'ヘルプ', href: '/help', iconName: 'mdi-help-circle-outline' },
  { label: 'お問合わせ', href: '/contact', iconName: 'mdi-email-outline' },
  { label: 'GitHub', href: 'https://github.com/', iconName: 'mdi-github', external: true },
]

const lastClicked = ref('')
const onItemClick = (item, index) => {
  lastClicked.value = `${index}: ${item.label}`
}
</script>

<div class="demo">
  <DadsUtilityLink href="/contact" label="お問合わせ" />
</div>

```vue
<script setup>
import { DadsUtilityLink } from '@dads/vue'
</script>

<template>
  <DadsUtilityLink href="/contact" label="お問合わせ" />
</template>
```

### items 配列（リスト）

`items` プロパティに配列を渡すと、各項目を `<li><a class="dads-utility-link">…</a></li>` として `<ul>` の中に描画する。ヘッダーやフッターのユーティリティリンク群を 1 コンポーネントで宣言できる。

<div class="demo">
  <span class="demo-label">フッター例</span>
  <DadsUtilityLink :items="footerItems" aria-label="フッターリンク" />
</div>

```vue
<script setup>
import { DadsUtilityLink } from '@dads/vue'

const footerItems = [
  { label: 'プライバシーポリシー', href: '/privacy' },
  { label: 'リンク・著作権について', href: '/copyright' },
  { label: '免責事項', href: '/disclaimer' },
  { label: 'アクセス', href: '/access' },
  { label: 'アクセシビリティへの対応について', href: '/accessibility' },
]
</script>

<template>
  <DadsUtilityLink :items="footerItems" aria-label="フッターリンク" />
</template>
```

## 外部リンク

`external: true` を指定すると、`target="_blank"` と `rel="noopener noreferrer"` が付与され、ラベル後ろに「新規タブで開きます」を意味するテイルアイコン (SVG) が描画される。

<div class="demo">
  <span class="demo-label">単一</span>
  <DadsUtilityLink
    href="https://design.digital.go.jp/dads/"
    label="DADS 公式サイト"
    external
  />
  <span class="demo-label" style="margin-top:1rem">ヘッダー例（外部リンク混在）</span>
  <DadsUtilityLink :items="headerItems" aria-label="ヘッダーリンク" />
</div>

```vue
<DadsUtilityLink href="https://design.digital.go.jp/dads/" label="DADS 公式サイト" external />
```

## icon

`iconName` プロパティで Material Design Icon のクラス名（`mdi-*`）を渡すと、ラベルの前にリードアイコンが描画される。

<div class="demo">
  <span class="demo-label">単一</span>
  <DadsUtilityLink
    href="/help"
    label="ヘルプ"
    iconName="mdi-help-circle-outline"
  />
  <span class="demo-label" style="margin-top:1rem">リスト（項目ごとにアイコン指定可）</span>
  <DadsUtilityLink :items="iconItems" aria-label="サポートリンク" />
</div>

```vue
<DadsUtilityLink href="/help" label="ヘルプ" iconName="mdi-help-circle-outline" />
```

## クリックイベント

`click:item` イベントでクリックを検知できる。`(item, index, event)` の 3 引数を受け取り、単一リンクモードでは `index` は常に `0`、リストモードでは押下された項目のインデックスが渡される。

<div class="demo">
  <DadsUtilityLink :items="headerItems" aria-label="ヘッダーリンク" @click:item="onItemClick" />
  <span class="demo-label" style="margin-top:0.5rem">最後にクリックされた項目: {{ lastClicked || '(none)' }}</span>
</div>

```vue
<DadsUtilityLink
  :items="headerItems"
  @click:item="(item, index, event) => console.log(index, item.label)"
/>
```

## カスタマイズ

リストモードでは `<ul>` の `aria-label` を `ariaLabel` プロパティで上書きできる（デフォルト: `'ユーティリティリンク'`）。

```vue
<DadsUtilityLink :items="footerItems" aria-label="フッターリンク" />
```

## Props

| Prop              | 型                      | デフォルト               | 説明                                                                               |
| ----------------- | ----------------------- | ------------------------ | ---------------------------------------------------------------------------------- |
| `href`            | `string`                | -                        | 単一リンクモード: リンク先 URL                                                     |
| `label`           | `string`                | -                        | 単一リンクモード: 表示テキスト                                                     |
| `iconName`        | `string`                | -                        | 単一リンクモード: リードアイコンの MDI クラス名（例: `mdi-help`）                  |
| `external`        | `boolean`               | `false`                  | 単一リンクモード: 外部リンクなら `true`                                            |
| `items`           | `DadsUtilityLinkItem[]` | -                        | リストモード: 複数リンクを `<ul>` 内に並べる                                       |
| `ariaLabel`       | `string`                | `'ユーティリティリンク'` | リストモード時の `<ul>` の `aria-label`                                            |
| `newTabAriaLabel` | `string`                | `'新規タブで開きます'`   | 外部リンクのテイルアイコン (新規タブ) に付与する `aria-label`。i18n 用に上書き可能 |

`items` と単一リンクモードの props を両方指定した場合は `items` が優先される。

### `DadsUtilityLinkItem`

| プロパティ | 型        | デフォルト | 説明                                                   |
| ---------- | --------- | ---------- | ------------------------------------------------------ |
| `label`    | `string`  | (必須)     | リンクテキスト                                         |
| `href`     | `string`  | (必須)     | リンク先 URL                                           |
| `iconName` | `string`  | -          | リードアイコンの MDI クラス名                          |
| `external` | `boolean` | `false`    | 外部リンクなら `true` (`target=_blank` + 安全な `rel`) |

## Events

| Event        | Payload                                                         | 説明                                                                    |
| ------------ | --------------------------------------------------------------- | ----------------------------------------------------------------------- |
| `click:item` | `(item: DadsUtilityLinkItem, index: number, event: MouseEvent)` | リンクがクリックされた時に発火。単一リンクモードでは `index` は常に `0` |

## アクセシビリティ

- リスト描画時はルートが `<ul>` で、デフォルトで `aria-label="ユーティリティリンク"` が付与される（`ariaLabel` で上書き可能）
- 外部リンクには `target="_blank"` に加えて `rel="noopener noreferrer"` が自動付与され、Reverse Tabnabbing 等を防ぐ
- 外部リンクのテイルアイコンには `role="img"` と `aria-label="新規タブで開きます"` が設定され、スクリーンリーダーで新規タブを開くことが通知される
- リードアイコン (`iconName`) は装飾用途として `aria-hidden="true"` が付与される
- リンクはキーボードフォーカス可能で、フォーカス時には共通のフォーカスリング（黒 2px outline + 黄色 4px shadow）が表示される
- Forced Colors モードでは `LinkText` 等のシステムカラーにフォールバックする
