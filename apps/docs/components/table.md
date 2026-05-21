# Table

行と列で構造化されたデータを一覧表示するためのテーブル。`DadsTable` はネイティブ `<table>` の薄いラッパとして振る舞い、密度・縞模様・外枠・スティッキーヘッダといった見た目だけを担当する。並び替えやページネーション、行選択は呼び出し側で実装する。

## 基本

`<thead>` と `<tbody>` をそのままデフォルトスロットに渡す。`DadsTable` は外枠の `<div>` と `<table>` を組み立てるだけで、内部のセルマークアップにはまったく介入しない。

<script setup>
import { DadsTable } from '@dads/vue'

const rows = [
  { id: 'APP-0001', name: '山田 太郎', submittedAt: '2026-05-10' },
  { id: 'APP-0002', name: '佐藤 花子', submittedAt: '2026-05-11' },
  { id: 'APP-0003', name: '鈴木 一郎', submittedAt: '2026-05-12' },
]
</script>

<div class="demo">
  <DadsTable caption="申請一覧">
    <thead>
      <tr>
        <th scope="col">申請ID</th>
        <th scope="col">氏名</th>
        <th scope="col">提出日</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in rows" :key="row.id">
        <td>{{ row.id }}</td>
        <td>{{ row.name }}</td>
        <td>{{ row.submittedAt }}</td>
      </tr>
    </tbody>
  </DadsTable>
</div>

```vue
<script setup>
import { DadsTable } from '@dads/vue'

const rows = [
  { id: 'APP-0001', name: '山田 太郎', submittedAt: '2026-05-10' },
  { id: 'APP-0002', name: '佐藤 花子', submittedAt: '2026-05-11' },
  { id: 'APP-0003', name: '鈴木 一郎', submittedAt: '2026-05-12' },
]
</script>

<template>
  <DadsTable caption="申請一覧">
    <thead>
      <tr>
        <th scope="col">申請ID</th>
        <th scope="col">氏名</th>
        <th scope="col">提出日</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in rows" :key="row.id">
        <td>{{ row.id }}</td>
        <td>{{ row.name }}</td>
        <td>{{ row.submittedAt }}</td>
      </tr>
    </tbody>
  </DadsTable>
</template>
```

## Density

2 つの密度 (`comfortable` / `compact`)。デフォルトは `comfortable`（12px パディング）。`compact` はパディング 8px・フォント 14px で、行数が多いデータテーブル向け。

<div class="demo">
  <span class="demo-label">comfortable（デフォルト）</span>
  <DadsTable density="comfortable">
    <thead>
      <tr><th scope="col">申請ID</th><th scope="col">氏名</th><th scope="col">提出日</th></tr>
    </thead>
    <tbody>
      <tr v-for="row in rows" :key="row.id">
        <td>{{ row.id }}</td><td>{{ row.name }}</td><td>{{ row.submittedAt }}</td>
      </tr>
    </tbody>
  </DadsTable>
  <span class="demo-label" style="margin-top:1rem">compact</span>
  <DadsTable density="compact">
    <thead>
      <tr><th scope="col">申請ID</th><th scope="col">氏名</th><th scope="col">提出日</th></tr>
    </thead>
    <tbody>
      <tr v-for="row in rows" :key="row.id">
        <td>{{ row.id }}</td><td>{{ row.name }}</td><td>{{ row.submittedAt }}</td>
      </tr>
    </tbody>
  </DadsTable>
</div>

## Striped

`striped` を有効にすると偶数行に淡い背景色が付き、視線移動が容易になる。

<div class="demo">
  <DadsTable striped>
    <thead>
      <tr><th scope="col">申請ID</th><th scope="col">氏名</th><th scope="col">提出日</th></tr>
    </thead>
    <tbody>
      <tr v-for="row in rows" :key="row.id">
        <td>{{ row.id }}</td><td>{{ row.name }}</td><td>{{ row.submittedAt }}</td>
      </tr>
    </tbody>
  </DadsTable>
</div>

## Bordered

`bordered` を有効にするとテーブル外周に 1px の枠線が付く。セル間の罫線は常に表示される。

<div class="demo">
  <DadsTable bordered>
    <thead>
      <tr><th scope="col">申請ID</th><th scope="col">氏名</th><th scope="col">提出日</th></tr>
    </thead>
    <tbody>
      <tr v-for="row in rows" :key="row.id">
        <td>{{ row.id }}</td><td>{{ row.name }}</td><td>{{ row.submittedAt }}</td>
      </tr>
    </tbody>
  </DadsTable>
</div>

## Sticky Header

`stickyHeader` を有効にすると、ラッパが `overflow-y: auto` になり、`<thead>` のセルがスクロール中もページ上端に固定される。スクロールさせるためには高さ制約のある親要素に置く必要がある。

```vue
<div style="max-height: 240px">
  <DadsTable sticky-header>
    <thead>
      <tr><th scope="col">申請ID</th><th scope="col">氏名</th><th scope="col">提出日</th></tr>
    </thead>
    <tbody>
      <!-- 多数の行 -->
    </tbody>
  </DadsTable>
</div>
```

## Slot

| Slot      | 用途                                                            |
| --------- | --------------------------------------------------------------- |
| `default` | `<thead>` / `<tbody>` 等のテーブル本体マークアップ              |
| `caption` | `<caption>` の中身（指定時は `caption` プロップより優先される） |

`caption` スロットを使うと、リッチなマークアップ（強調、リンク等）をキャプションに含められる。

<div class="demo">
  <DadsTable>
    <template #caption>
      <strong>2026 年 5 月</strong> の申請一覧
    </template>
    <thead>
      <tr><th scope="col">申請ID</th><th scope="col">氏名</th><th scope="col">提出日</th></tr>
    </thead>
    <tbody>
      <tr v-for="row in rows" :key="row.id">
        <td>{{ row.id }}</td><td>{{ row.name }}</td><td>{{ row.submittedAt }}</td>
      </tr>
    </tbody>
  </DadsTable>
</div>

## Props

| Prop           | 型                           | デフォルト      | 説明                                                                              |
| -------------- | ---------------------------- | --------------- | --------------------------------------------------------------------------------- |
| `stickyHeader` | `boolean`                    | `false`         | `thead th` を `position: sticky` で上端に固定する                                 |
| `density`      | `'comfortable' \| 'compact'` | `'comfortable'` | セルの縦方向密度                                                                  |
| `bordered`     | `boolean`                    | `false`         | テーブル外周に 1px の枠線を追加（セル罫線は常時表示）                             |
| `striped`      | `boolean`                    | `false`         | 偶数行に淡い背景色を付与                                                          |
| `caption`      | `string`                     | -               | `<caption>` のテキスト（`caption` スロット指定時は無視される）                    |
| `loadingLabel` | `string`                     | `'読み込み中'`  | スケルトン表示中にスクリーンリーダーへ読み上げる隠しテキスト。i18n 用に上書き可能 |

## Events

`DadsTable` 自身は `emit` を定義していない。並び替え・選択・クリック等のイベント処理は、スロット内の `<thead>` / `<tbody>` に直接バインドする。

## アクセシビリティ

- 各ヘッダセルには **必ず** `scope="col"`（行ヘッダの場合は `scope="row"`）を付け、スクリーンリーダーがヘッダ／データの関連付けを行えるようにする
- `caption` を指定するとテーブル冒頭に `<caption>` が描画され、テーブル全体の目的を視覚・支援技術の双方に提示できる
- 並び替えを実装する際は、現在ソート中の列の `<th>` に `aria-sort="ascending" | "descending" | "none"` を付与し、ソート状態を支援技術に伝える
- `stickyHeader` 利用時もネイティブ `<table>` 構造を保つため、テーブルセマンティクスは損なわれない
- 強制カラーモード（Windows ハイコントラスト等）では枠線色が `CanvasText` に切り替わり、視認性が確保される
