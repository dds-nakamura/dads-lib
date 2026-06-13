# ResourceList

ドキュメント・ダウンロード・検索結果のような **リソースエントリの一覧** を、カード状の行で縦に並べるコンポーネント。各行はタイトル・説明・日付・タグ・サムネイル / アイコンを表示し、`href` を指定すると行全体がリンクになる。

> 参考: [DADS リソースリスト仕様](https://design.digital.go.jp/dads/components/resource-list/)

## 基本

`items` 配列に `title` を必須として渡すだけで、枠付き (frame) のリソースリストが表示される。

<script setup>
import { DadsResourceList } from '@dads/vue'

const basicItems = [
  { title: '健康診断', description: '2025年度', date: '受診日：2025/04/30' },
  { title: '健康診断', description: '2024年度', date: '受診日：2024/11/24' },
  { title: '健康診断', description: '2023年度', date: '受診日：2023/10/13' },
]

const thumbnailItems = [
  {
    title: '令和7年度 デジタル庁年次報告書',
    description: 'PDF / 4.2MB',
    thumbnail: 'https://placehold.jp/64x64.png',
    date: '2025/04/01',
  },
  {
    title: '行政手続オンライン化ガイドライン',
    description: 'PDF / 2.1MB',
    thumbnail: 'https://placehold.jp/64x64.png',
    date: '2025/03/14',
  },
]

const taggedItems = [
  {
    title: 'マイナンバーカード申請手続き',
    description: '初回申請者向けの完全ガイド',
    tags: ['新着', '重要', '手続き'],
  },
  {
    title: '住民票の写し交付申請',
    description: 'コンビニ交付対応',
    tags: ['電子証明', '24時間対応'],
  },
]

const dateItems = [
  { title: '給与明細', description: '2025年10月分', date: '支給日：2025/11/14' },
  { title: '給与明細', description: '2025年9月分', date: '支給日：2025/10/15' },
  { title: '給与明細', description: '2025年8月分', date: '支給日：2025/9/15' },
]

const iconItems = [
  { title: '請求書ダウンロード', description: 'PDF 形式', iconName: 'description' },
  { title: 'CSV エクスポート', description: 'CSV 形式', iconName: 'description' },
  { title: '画像アーカイブ', description: 'ZIP 形式', iconName: 'download' },
]

const linkItems = [
  { title: 'DADS 公式サイト', description: 'デジタル庁デザインシステム', href: 'https://design.digital.go.jp/dads/' },
  { title: 'コンポーネント仕様', description: '47 種類の UI コンポーネント', href: 'https://design.digital.go.jp/dads/components/' },
]
</script>

<div class="demo">
  <DadsResourceList :items="basicItems" aria-label="健康診断履歴" />
</div>

```vue
<script setup>
import { DadsResourceList } from '@dads/vue'

const items = [
  { title: '健康診断', description: '2025年度', date: '受診日：2025/04/30' },
  { title: '健康診断', description: '2024年度', date: '受診日：2024/11/24' },
  { title: '健康診断', description: '2023年度', date: '受診日：2023/10/13' },
]
</script>

<template>
  <DadsResourceList :items="items" aria-label="健康診断履歴" />
</template>
```

## サムネイル付き (thumbnail)

各項目に `thumbnail` を渡すと、タイトルの左側に画像が表示される。装飾画像扱い (`alt=""`) なので、画像の内容はタイトル / 説明で必ず伝わるようにする。

<div class="demo">
  <DadsResourceList :items="thumbnailItems" aria-label="資料一覧" />
</div>

```vue
<DadsResourceList
  :items="[
    {
      title: '令和7年度 デジタル庁年次報告書',
      description: 'PDF / 4.2MB',
      thumbnail: '/assets/report-2025.png',
      date: '2025/04/01',
    },
  ]"
  aria-label="資料一覧"
/>
```

## タグ付き (tags)

`tags` に文字列配列を渡すと、説明行の下にタグチップが横並びで描画される。

<div class="demo">
  <DadsResourceList :items="taggedItems" aria-label="手続き一覧" />
</div>

```vue
<DadsResourceList
  :items="[
    {
      title: 'マイナンバーカード申請手続き',
      description: '初回申請者向けの完全ガイド',
      tags: ['新着', '重要', '手続き'],
    },
  ]"
  aria-label="手続き一覧"
/>
```

## 日付付き (date)

`date` を指定するとカード右端の `__sub` スロットに表示される。HTML リファレンスに準拠した支給日 / 受診日のような短い文字列を想定する。

<div class="demo">
  <DadsResourceList :items="dateItems" aria-label="給与明細" />
</div>

```vue
<DadsResourceList
  :items="[
    { title: '給与明細', description: '2025年10月分', date: '支給日：2025/11/14' },
    { title: '給与明細', description: '2025年9月分', date: '支給日：2025/10/15' },
  ]"
  aria-label="給与明細"
/>
```

## アイコン付き (iconName)

`iconName` に Material Symbols 名（例: `description`）を渡すと、サムネイル代わりにアイコンが表示される。`thumbnail` と同時指定された場合は **`thumbnail` が優先** される。アイコンは inline SVG (`DadsIcon`) で描画されるためフォント読込は不要。

<div class="demo">
  <DadsResourceList :items="iconItems" aria-label="ダウンロード一覧" />
</div>

```vue
<DadsResourceList
  :items="[
    { title: '請求書ダウンロード', description: 'PDF 形式', iconName: 'description' },
    { title: 'CSV エクスポート', description: 'CSV 形式', iconName: 'description' },
  ]"
  aria-label="ダウンロード一覧"
/>
```

## リンクとして (href)

`href` を渡すと、行全体 (`__body`) が `<a>` 要素になり、行全体がリンクとして機能する。フォーカス時は DADS 標準の黒 + 黄色のフォーカスリングが表示される。

<div class="demo">
  <DadsResourceList :items="linkItems" aria-label="外部リンク一覧" />
</div>

```vue
<DadsResourceList
  :items="[
    {
      title: 'DADS 公式サイト',
      description: 'デジタル庁デザインシステム',
      href: 'https://design.digital.go.jp/dads/',
    },
  ]"
  aria-label="外部リンク一覧"
/>
```

## バリアント (variant)

`variant` で `frame` (枠付き、デフォルト) / `list` (区切り線のみ) を切り替えられる。

<div class="demo">
  <span class="demo-label">frame (default)</span>
  <DadsResourceList :items="basicItems.slice(0, 2)" aria-label="frame 例" />
  <span class="demo-label" style="margin-top:1rem">list</span>
  <DadsResourceList variant="list" :items="basicItems.slice(0, 2)" aria-label="list 例" />
</div>

## Props

| Prop        | 型                       | デフォルト | 説明                                         |
| ----------- | ------------------------ | ---------- | -------------------------------------------- |
| `items`     | `DadsResourceListItem[]` | -          | 必須。リソース項目の配列                     |
| `variant`   | `'frame' \| 'list'`      | `'frame'`  | 各行のビジュアル (枠付き / 区切り線のみ)     |
| `ariaLabel` | `string`                 | -          | ルート `<ul>` に適用されるアクセシブルラベル |

### `DadsResourceListItem` の型

| キー          | 型         | 説明                                                    |
| ------------- | ---------- | ------------------------------------------------------- |
| `title`       | `string`   | 必須。表示タイトル（`<h3>` で描画）                     |
| `description` | `string`   | タイトル下の補足説明                                    |
| `href`        | `string`   | 指定時は行全体を `<a>` 化（行全体がリンクになる）       |
| `thumbnail`   | `string`   | サムネイル画像 URL（装飾画像扱いで `alt=""`）           |
| `date`        | `string`   | 行右端 (`__sub`) に表示する日付文字列                   |
| `tags`        | `string[]` | 説明行の下に表示するタグチップ                          |
| `iconName`    | `string`   | Material Symbols 名。`thumbnail` 未指定時のみ描画される |

## アクセシビリティ

- ルート `<ul>` には `ariaLabel` でアクセシブルな名前を与えることを推奨
- 各タイトルは `<h3>` 要素として描画されるため、ページ内の見出し階層を意識して使用する（前段が `<h2>` の節になっている場合に自然）
- `thumbnail` は装飾画像として `alt=""` でレンダリングされる。画像の内容は **必ず** タイトル / 説明テキストで伝えること
- `iconName` は `aria-hidden="true"` のため、スクリーンリーダーはタイトル・説明・タグ・日付のみを読み上げる
- `href` 指定時は行全体が `<a>` となり、キーボードフォーカスで DADS 標準の黒 + 黄色のフォーカスリングが表示される
- Windows ハイコントラスト（forced-colors）モードでは `CanvasText` 色で境界線とタグが確実に描画される
