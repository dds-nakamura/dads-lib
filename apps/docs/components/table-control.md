# TableControl

`DadsTable` と組み合わせて使う、検索 / 表示件数 / ページ送りを提供するコントロール部品。
`DadsTableControl` 自身はデータを保持せず、`update:search` / `update:page` / `update:pageSize` の 3 つの更新イベントを発火するだけのプレゼンテーション層として振る舞う。
親コンポーネントがイベントを受け取り、ローカルなデータソースをフィルタ・スライスして `DadsTable` に渡す前提。

> **公式仕様**: <https://design.digital.go.jp/dads/components/table-control/>
> 公式ガイドラインは現在準備中。本実装は `DadsTable` 仕様と整合する形で最小の API（検索・ページサイズ・ページ送り）を提供する。

## 基本

`DadsTableControl` + `DadsTable` を組み合わせ、`v-model:search` / `v-model:page` / `v-model:pageSize` で親側の状態と同期する。

<script setup>
import { computed, ref } from 'vue'
import { DadsTable, DadsTableControl } from '@dads/vue'

const ALL_ROWS = Array.from({ length: 42 }, (_, i) => ({
  id: `APP-${String(i + 1).padStart(4, '0')}`,
  name: ['山田 太郎', '佐藤 花子', '鈴木 一郎', '高橋 美咲', '田中 健太'][i % 5],
  submittedAt: `2026-05-${String((i % 28) + 1).padStart(2, '0')}`,
}))

const searchQuery = ref('')
const currentPage = ref(1)
const pageSize = ref(10)

const filtered = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return ALL_ROWS
  return ALL_ROWS.filter(
    (r) =>
      r.id.toLowerCase().includes(q) ||
      r.name.toLowerCase().includes(q) ||
      r.submittedAt.includes(q),
  )
})

const paged = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  return filtered.value.slice(start, start + pageSize.value)
})

// 検索条件が変わったらページを 1 に戻す（親側のロジック）。
const onSearchUpdate = (v) => {
  searchQuery.value = v
  currentPage.value = 1
}

const i18nPageSize = (n) => `${n} items`
const i18nRange = (start, end, total) =>
  total === 0 ? 'No items' : `${start}-${end} of ${total} items`
</script>

<div class="demo">
  <DadsTableControl
    :search-query="searchQuery"
    :current-page="currentPage"
    :page-size="pageSize"
    :total-items="filtered.length"
    @update:search="onSearchUpdate"
    @update:page="currentPage = $event"
    @update:pageSize="pageSize = $event"
  />
  <DadsTable bordered>
    <thead>
      <tr>
        <th scope="col">申請ID</th>
        <th scope="col">氏名</th>
        <th scope="col">提出日</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in paged" :key="row.id">
        <td>{{ row.id }}</td>
        <td>{{ row.name }}</td>
        <td>{{ row.submittedAt }}</td>
      </tr>
    </tbody>
  </DadsTable>
</div>

```vue
<script setup>
import { computed, ref } from 'vue'
import { DadsTable, DadsTableControl } from '@dads/vue'

const ALL_ROWS = /* ... 全行データ ... */ []

const searchQuery = ref('')
const currentPage = ref(1)
const pageSize = ref(10)

const filtered = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return ALL_ROWS
  return ALL_ROWS.filter((r) => r.id.toLowerCase().includes(q) || r.name.toLowerCase().includes(q))
})

const paged = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  return filtered.value.slice(start, start + pageSize.value)
})

const onSearchUpdate = (v) => {
  searchQuery.value = v
  currentPage.value = 1 // 検索条件変更時は 1 ページ目に戻す
}
</script>

<template>
  <DadsTableControl
    :search-query="searchQuery"
    :current-page="currentPage"
    :page-size="pageSize"
    :total-items="filtered.length"
    @update:search="onSearchUpdate"
    @update:page="currentPage = $event"
    @update:pageSize="pageSize = $event"
  />
  <DadsTable bordered>
    <thead>
      <tr>
        <th scope="col">申請ID</th>
        <th scope="col">氏名</th>
        <th scope="col">提出日</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in paged" :key="row.id">
        <td>{{ row.id }}</td>
        <td>{{ row.name }}</td>
        <td>{{ row.submittedAt }}</td>
      </tr>
    </tbody>
  </DadsTable>
</template>
```

## showSearch

検索ボックスが不要な場合は `showSearch` を `false` にする。

<div class="demo">
  <DadsTableControl
    :show-search="false"
    :current-page="1"
    :page-size="10"
    :total-items="42"
    @update:page="() => {}"
    @update:pageSize="() => {}"
  />
</div>

```vue
<DadsTableControl :show-search="false" :total-items="42" />
```

## showPagination

ページ送り UI が不要なときは `showPagination` を `false` にする。検索／表示件数だけのコントロール行になる。

<div class="demo">
  <DadsTableControl
    :show-pagination="false"
    :total-items="42"
    @update:search="() => {}"
    @update:pageSize="() => {}"
  />
</div>

```vue
<DadsTableControl :show-pagination="false" :total-items="42" />
```

## showPageSize

表示件数セレクタを隠す場合は `showPageSize` を `false` にする。

<div class="demo">
  <DadsTableControl
    :show-page-size="false"
    :total-items="42"
    @update:search="() => {}"
    @update:page="() => {}"
  />
</div>

```vue
<DadsTableControl :show-page-size="false" :total-items="42" />
```

## Table との組合せ

`DadsTableControl` は **データを所有しない**。親側で以下のロジックを書く想定:

1. ローカル state（`searchQuery` / `currentPage` / `pageSize`）を `ref` で保持
2. `filtered = ALL_ROWS.filter(...)` で検索を反映
3. `totalItems = filtered.length` を `DadsTableControl` に渡す
4. `paged = filtered.slice(start, start + pageSize)` を `DadsTable` の `<tbody>` で `v-for`
5. 検索クエリが変わったら `currentPage = 1` にリセット（上記 `onSearchUpdate` 参照）

並び替えは `DadsTable` 側の `<th>` に独自ハンドラを付けて親 state を変更すれば良い。`DadsTableControl` は並び替えに関与しない。

## i18n / 国際化対応

「前へ」「次へ」ボタンラベル、表示件数 `<option>` ラベル、範囲ステータス文言をすべてプロップ / フォーマッタで上書きできる。動的補間部分は関数プロップとして渡すことで、複数形・順序付け・桁区切りの違いに対応できる。

<div class="demo">
  <DadsTableControl
    :total-items="42"
    search-placeholder="Search"
    search-label="Search"
    page-size-label="Items per page"
    prev-page-label="Prev"
    next-page-label="Next"
    :format-page-size-option="i18nPageSize"
    :format-range-label="i18nRange"
  />
</div>

```vue
<script setup>
const i18nPageSize = (n) => `${n} items`
const i18nRange = (start, end, total) =>
  total === 0 ? 'No items' : `${start}-${end} of ${total} items`
</script>

<template>
  <DadsTableControl
    :total-items="42"
    search-placeholder="Search"
    page-size-label="Items per page"
    prev-page-label="Prev"
    next-page-label="Next"
    :format-page-size-option="i18nPageSize"
    :format-range-label="i18nRange"
  />
</template>
```

## Props

| Prop                   | 型                                                      | デフォルト                                              | 説明                                                                    |
| ---------------------- | ------------------------------------------------------- | ------------------------------------------------------- | ----------------------------------------------------------------------- |
| `searchQuery`          | `string`                                                | `''`                                                    | 検索文字列（`v-model:search`）                                          |
| `currentPage`          | `number`                                                | `1`                                                     | 1 始まりの現在ページ番号（`v-model:page`）                              |
| `pageSize`             | `number`                                                | `10`                                                    | 1 ページあたりの件数（`v-model:pageSize`）                              |
| `totalItems`           | `number`                                                | -（必須）                                               | 全行数（フィルタ後）。`totalPages` 算出に使用                           |
| `pageSizeOptions`      | `number[]`                                              | `[10, 25, 50, 100]`                                     | 表示件数セレクタの候補                                                  |
| `searchPlaceholder`    | `string`                                                | `'検索'`                                                | 検索入力の placeholder                                                  |
| `showSearch`           | `boolean`                                               | `true`                                                  | 検索ボックスを表示するか                                                |
| `showPageSize`         | `boolean`                                               | `true`                                                  | 表示件数セレクタを表示するか                                            |
| `showPagination`       | `boolean`                                               | `true`                                                  | ページ送り（前へ / ページ番号 / 次へ）を表示するか                      |
| `prevPageLabel`        | `string`                                                | `'前へ'`                                                | 「前へ」ボタンの可視ラベル。i18n 用に上書き可能                         |
| `nextPageLabel`        | `string`                                                | `'次へ'`                                                | 「次へ」ボタンの可視ラベル。i18n 用に上書き可能                         |
| `formatPageSizeOption` | `(n: number) => string`                                 | `` (n) => `${n} 件` ``                                  | 表示件数 `<option>` ラベルのフォーマッタ。i18n 用に上書き可能           |
| `formatRangeLabel`     | `(start: number, end: number, total: number) => string` | `` (s,e,t) => t===0 ? '0 件' : `${s}-${e} / ${t} 件` `` | ページネーション上部の範囲ステータスのフォーマッタ。i18n 用に上書き可能 |

## Events

| Event             | Payload  | 説明                                                                  |
| ----------------- | -------- | --------------------------------------------------------------------- |
| `update:search`   | `string` | 検索入力時                                                            |
| `update:page`     | `number` | 前へ／次へボタン押下時、または `pageSize` 変更で 1 ページ目に戻すとき |
| `update:pageSize` | `number` | 表示件数セレクタの選択変更時                                          |

## アクセシビリティ

- 全体は `role="group"` + `aria-label="テーブルコントロール"` で囲み、関連する操作群を 1 つのまとまりとして支援技術に伝える
- 検索入力には可視ラベル「検索」を `<label for>` で関連付け、入力欄は `type="search"`
- 表示件数セレクタにも可視ラベル「表示件数」を `<label for>` で関連付け
- ページ送りは `role="navigation"` + `aria-label="ページ送り"` でランドマーク化
- 「前へ」「次へ」ボタンはそれぞれ `aria-label` を持ち、無効状態では `disabled` 属性で操作不可化
- 現在の表示範囲 (`11-20 / 95 件` など) は `aria-live="polite"` のステータステキストとして発話され、ページ変更を支援技術に通知する
- 強制カラーモード（Windows ハイコントラスト等）では入力欄／セレクタ／ボタンの境界が `CanvasText` に切り替わる
