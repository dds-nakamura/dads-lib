# 表示系・その他コンポーネント仕様

`@dads/vue` における Display 系および「その他」カテゴリの 8 コンポーネントについて、Props / Slots / Emits 設計、DADS 公式仕様との対応、アクセシビリティ要件、レイアウト・トークン参照方針を整理する。本仕様の完了によって、`@dads/vue` は DADS 公式 44 件 + 独自拡張 5 件 = **計 49 コンポーネント** を提供する状態に到達する (公式 46 中 ScrollTopButton / BottomNavigation は DADS 非推奨指定のため未収録)。

---

## 対象コンポーネント

| #   | 実装名                | 公式 slug          | 用途                                 | HTML 実装例 |
| --- | --------------------- | ------------------ | ------------------------------------ | ----------- |
| 1   | `DadsImage`           | `image`            | 画像 (lazy / fallback / alt 必須)    | なし        |
| 2   | `DadsImageSlider`     | `image-slider`     | 画像スライダー (自動再生付き)        | なし        |
| 3   | `DadsCarousel`        | `carousel`         | 汎用カルーセル (default slot 連結)   | あり        |
| 4   | `DadsList`            | `list`             | `<ul>` / `<ol>` ラッパ               | あり        |
| 5   | `DadsBlockquote`      | `blockquote`       | 引用 + 引用元                        | あり        |
| 6   | `DadsResourceList`    | `resource-list`    | リソースカード集合                   | あり        |
| 7   | `DadsEmergencyBanner` | `emergency-banner` | 緊急バナー (`position: fixed; top`)  | あり        |
| 8   | `DadsTableControl`    | `table-control`    | テーブル制御 (検索 / ソート / ページャ) | なし        |

カテゴリ振り分け（`apps/docs/.vitepress/config.ts` sidebar）:

- **Display** カテゴリ: Image, ImageSlider, Carousel, List, Blockquote, ResourceList, TableControl
- **Feedback** カテゴリ: EmergencyBanner

---

## 共通設計方針

### 真実の源

- **仕様**: `dads-document-md/dads/components/<slug>/index.md`
- **HTML サンプル**: `design-system-example-components-html/src/components/<slug>/`（存在する場合）
- **デザイントークン**: `design-tokens/` (色・スペーシング・タイポグラフィ・エレベーション)

カラーコード / スペーシング値の直接記述は禁止。すべて `tokens.css` の CSS 変数を経由する。

### 実装規約

- 既存 `@dads/vue` コンポーネントの API 命名規則を踏襲（`size`, `variant`, `disabled` 等）
- スタイルは `<style scoped lang="scss">`、`body` 等への global rule は禁止
- 各コンポーネントセットは `Component.vue` + `index.ts` + `Component.spec.ts` + `Component.stories.md`（demo MD）を基本構成とする
- 公開エントリは `packages/vue/src/index.ts` に集約

### 自動再生系（Carousel / ImageSlider）

- `setInterval` は `onMounted` で起動し、`onBeforeUnmount` で `clearInterval` する
- `autoPlay`（boolean, default true）、`interval`（ms, sensible default）、`pauseOnHover`（boolean）を提供
- テスト時の flaky 回避: `vi.useFakeTimers()` + `vi.advanceTimersByTime` を使用

### z-index 衝突回避

- 既存 Modal: 1000、Drawer: 1100 を確認済み
- `DadsEmergencyBanner` は 9999 を採用し、最前面表示を保証

---

## コンポーネント別仕様

### DadsImage

`<img>` のラッパ。lazy loading と必須 alt を強制する。

#### Props

| Prop          | 型       | 必須 | 既定値 | 説明                                         |
| ------------- | -------- | ---- | ------ | -------------------------------------------- |
| `src`         | `string` | ✅   | —      | 画像 URL                                     |
| `alt`         | `string` | ✅   | —      | 代替テキスト（必須）                         |
| `width`       | `number \| string` | — | — | 表示幅                                       |
| `height`      | `number \| string` | — | — | 表示高                                       |
| `placeholder` | `string` | —    | —      | 読み込み失敗時 / ロード前の代替画像 URL      |

#### 実装方針

- `loading="lazy"` 属性のみで遅延読み込みを行い、`IntersectionObserver` は使用しない（SSR 警告回避）
- `onerror` で `placeholder` に切り替え

#### アクセシビリティ

- `alt` を必須プロパティとし、装飾用途では呼び出し側で空文字 `""` を明示する

---

### DadsImageSlider

画像専用スライダー。自動再生 + 矢印ナビ + indicators。

#### Props

| Prop           | 型                                          | 既定値    | 説明                       |
| -------------- | ------------------------------------------- | --------- | -------------------------- |
| `images`       | `Array<{ src: string; alt: string }>`       | `[]`      | 画像配列                   |
| `autoPlay`     | `boolean`                                   | `true`    | 自動再生                   |
| `interval`     | `number`                                    | `5000`    | 切替間隔 (ms)              |
| `pauseOnHover` | `boolean`                                   | `true`    | ホバーで一時停止           |
| `showArrows`   | `boolean`                                   | `true`    | 左右矢印を表示             |
| `showIndicators` | `boolean`                                 | `true`    | 下部 indicator を表示      |

#### Emits

- `change(index: number)` — 表示画像が切り替わったとき

#### アクセシビリティ

- 矢印 / indicator は `<button>` で実装、`aria-label` を必ず設定
- ライブリージョン（`aria-live="polite"`）で現在画像を通知

---

### DadsCarousel

汎用カルーセル。default slot に任意のコンテンツを連結する。内部実装は ImageSlider と類似のため、共通 Composable `useSlider()` を抽出可能（任意）。

#### Props

ImageSlider と同等（`autoPlay`, `interval`, `pauseOnHover`, `showArrows`, `showIndicators`）。

#### Slots

| Slot      | 説明                                          |
| --------- | --------------------------------------------- |
| `default` | 各スライドのコンテンツ（複数要素を連結）      |

#### Emits

- `change(index: number)`

#### アクセシビリティ

- スライド領域に `role="region"` と `aria-roledescription="carousel"`
- 各スライドに `aria-roledescription="slide"` と現在位置 `aria-label="N of M"`

---

### DadsList

`<ul>` / `<ol>` のラッパ。`type` prop で切替。

#### Props

| Prop      | 型                              | 既定値        | 説明                       |
| --------- | ------------------------------- | ------------- | -------------------------- |
| `type`    | `'ordered' \| 'unordered'`      | `'unordered'` | リスト種別                 |
| `items`   | `Array<string \| VNode>`        | `[]`          | アイテム配列（slot 代替）  |

`type` の TypeScript narrowing は union を `as const` で固定する。

#### Slots

| Slot      | 説明                          |
| --------- | ----------------------------- |
| `default` | `<li>` を直接記述する場合の slot |

#### アクセシビリティ

- セマンティックな `<ul>` / `<ol>` を使用し、スクリーンリーダにリスト構造を伝える

---

### DadsBlockquote

`<blockquote>` 要素 + 引用元表示。

#### Props

| Prop       | 型       | 既定値 | 説明                                     |
| ---------- | -------- | ------ | ---------------------------------------- |
| `cite`     | `string` | —      | 引用元 URL（`<blockquote cite>` に反映） |
| `citation` | `string` | —      | 引用元のテキスト表示                     |

#### Slots

| Slot       | 説明                       |
| ---------- | -------------------------- |
| `default`  | 引用本文                   |
| `citation` | 引用元の任意 HTML（優先）  |

#### アクセシビリティ

- `<blockquote>` + `<cite>` のセマンティックマークアップを使用

---

### DadsResourceList

リソースカードの集合。各リソースは title / description / link / icon 等を持つ。

#### Props

| Prop        | 型                     | 既定値    | 説明                          |
| ----------- | ---------------------- | --------- | ----------------------------- |
| `resources` | `Array<DadsResource>`  | `[]`      | リソース配列                  |
| `columns`   | `1 \| 2 \| 3`          | `1`       | グリッド列数                  |

`DadsResource` 型:

```ts
interface DadsResource {
  title: string
  description?: string
  href: string
  icon?: string
  meta?: string
}
```

#### Slots

| Slot      | 説明                                       |
| --------- | ------------------------------------------ |
| `item`    | リソース単位のカスタムレンダリング         |

#### アクセシビリティ

- 各 item は `<a>` または `<article>` でラップし、フォーカス可能にする

---

### DadsEmergencyBanner

緊急時バナー。ページ最上段に固定表示する。

#### Props

| Prop       | 型                                | 既定値        | 説明                                |
| ---------- | --------------------------------- | ------------- | ----------------------------------- |
| `message`  | `string`                          | —             | 表示テキスト                        |
| `severity` | `'critical' \| 'warning' \| 'info'` | `'critical'` | 重要度（色・アイコン切替）          |
| `closable` | `boolean`                         | `false`       | 閉じるボタンを表示                  |

#### Emits

- `close()` — 閉じるボタン押下

#### スタイル

```scss
position: fixed;
top: 0;
left: 0;
right: 0;
z-index: 9999;
```

teleport は不要（ページ最上段にレンダ）。`scoped` SCSS のみで実装し、`body` 等の global rule は禁止。

#### アクセシビリティ

- `role="alert"` または `role="status"`（severity に応じて）
- 閉じるボタンに `aria-label="緊急バナーを閉じる"`

---

### DadsTableControl

`DadsTable` の上に被せて使う検索 / ソート / ページャの組み合わせ。`DadsTable` 本体には手を加えない兄弟コンポーネント。

#### Props

| Prop          | 型                                  | 既定値 | 説明                       |
| ------------- | ----------------------------------- | ------ | -------------------------- |
| `pageSize`    | `number`                            | `10`   | 1 ページあたりの件数       |
| `currentPage` | `number`                            | `1`    | 現在のページ番号           |
| `totalItems`  | `number`                            | `0`    | 総件数                     |
| `search`      | `string`                            | `''`   | 検索文字列                 |
| `sort`        | `{ key: string; order: 'asc' \| 'desc' } \| null` | `null` | 現在のソート状態 |

#### Emits

- `update:currentPage(page: number)`
- `update:search(query: string)`
- `update:sort(sort: { key: string; order: 'asc' \| 'desc' })`

#### 実装方針

- 親コンポーネントが events を受けて `DadsTable` にデータを供給する形を想定
- demo MD では `DadsTable` との組合せ例を必ず掲載
- 核 API は `pageSize / currentPage / search / sort` の 4 つに限定し、テスト 15 件規模を目安にラフ実装

#### アクセシビリティ

- 検索 input に `<label>` / `aria-label`
- ページャは `<nav aria-label="pagination">` でラップ
- ソートボタンに `aria-sort="ascending" | "descending" | "none"`

---

## アクセシビリティ

全コンポーネントに共通する要件:

- `dads-document-md/dads/webaccessibility/index.md` の要件を満たす
- セマンティック HTML（`<ul>` / `<ol>` / `<blockquote>` / `<img>` / `<nav>` 等）を優先
- インタラクティブ要素はすべてキーボード操作可能（Tab / Enter / Space / 矢印キー）
- フォーカスリングは `packages/vue/src/styles/_focus-ring.scss` の共通スタイルを使用
- 動的コンテンツ（Carousel / ImageSlider / EmergencyBanner）は `aria-live` / `role="alert"` 等で支援技術へ通知

---

## レイアウト・タイポグラフィ・トークン参照方針

- すべての色・余白・タイポグラフィは `@dads/tokens`（`design-tokens/` の薄ラッパ）を経由
- Tailwind 利用時は `@dads/tailwind-plugin`（内部で design-tokens 参照）
- 直接のカラーコード / px 値の埋め込みは禁止
- フォーカスリング / ボーダー半径 / エレベーションも公式トークンを使用

---

## DADS 公式仕様との対応

| 実装名                | 公式 slug          | 仕様 MD                                                       |
| --------------------- | ------------------ | ------------------------------------------------------------- |
| `DadsImage`           | `image`            | `dads-document-md/dads/components/image/index.md`             |
| `DadsImageSlider`     | `image-slider`     | `dads-document-md/dads/components/image-slider/index.md`      |
| `DadsCarousel`        | `carousel`         | `dads-document-md/dads/components/carousel/index.md`          |
| `DadsList`            | `list`             | `dads-document-md/dads/components/list/index.md`              |
| `DadsBlockquote`      | `blockquote`       | `dads-document-md/dads/components/blockquote/index.md`        |
| `DadsResourceList`    | `resource-list`    | `dads-document-md/dads/components/resource-list/index.md`     |
| `DadsEmergencyBanner` | `emergency-banner` | `dads-document-md/dads/components/emergency-banner/index.md`  |
| `DadsTableControl`    | `table-control`    | `dads-document-md/dads/components/table-control/index.md`     |

ビジュアル仕様で不足がある場合は `dads-document-figma/<ページ名>/<ページ名>.png` を補完情報として参照する（環境に存在する場合）。
