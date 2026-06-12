# Table

行と列で構造化されたデータを一覧表示するためのテーブル。`DadsTable` は DADS 公式の正準構造（`.dads-table` コンテナ + `.dads-table__table`）をそのまま再現するプレゼンテーション層で、密度・縞模様・行 hover / 選択ハイライト・辺別ボーダーといった見た目だけを担当する。並び替え・ページネーション・行選択ロジックは呼び出し側で実装する。

ヘッダセルは **呼び出し側がデフォルトスロット内** で公式クラスを付けて記述する:

- 列ヘッダ: `<th class="dads-table__col-header" scope="col">`
- 行ヘッダ: `<th class="dads-table__row-header" scope="row">`

これにより、列ヘッダ最下段の下端 / 行ヘッダ右端の **1px solid 黒** 強調ボーダー（公式の象徴的特徴）が自動で描画される。

## 基本

`<thead>` / `<tbody>` をそのままデフォルトスロットに渡す。`cell-border="bottom"` でヘッダ下線と行区切り線を引くのが最も一般的な構成。

<script setup>
import { DadsTable } from '@dads/vue'

const rows = [
  { id: 'APP-0001', name: '山田 太郎', submittedAt: '2026-05-10' },
  { id: 'APP-0002', name: '佐藤 花子', submittedAt: '2026-05-11' },
  { id: 'APP-0003', name: '鈴木 一郎', submittedAt: '2026-05-12' },
]
</script>

<div class="demo">
  <DadsTable cell-border="bottom">
    <thead>
      <tr>
        <th class="dads-table__col-header" scope="col">申請ID</th>
        <th class="dads-table__col-header" scope="col">氏名</th>
        <th class="dads-table__col-header" scope="col">提出日</th>
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
  <DadsTable cell-border="bottom">
    <thead>
      <tr>
        <th class="dads-table__col-header" scope="col">申請ID</th>
        <th class="dads-table__col-header" scope="col">氏名</th>
        <th class="dads-table__col-header" scope="col">提出日</th>
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

## 行ヘッダ（第 1 列を見出しに）

第 1 列を `dads-table__row-header` にすると、各行の右端に黒い強調ボーダーが付く。`cell-border="right"` を併用するのが公式の構成。

<div class="demo">
  <DadsTable cell-border="right">
    <tbody>
      <tr v-for="row in rows" :key="row.id">
        <th class="dads-table__row-header" scope="row">{{ row.name }}</th>
        <td>{{ row.id }}</td>
        <td>{{ row.submittedAt }}</td>
      </tr>
    </tbody>
  </DadsTable>
</div>

```vue
<DadsTable cell-border="right">
  <tbody>
    <tr v-for="row in rows" :key="row.id">
      <th class="dads-table__row-header" scope="row">{{ row.name }}</th>
      <td>{{ row.id }}</td>
      <td>{{ row.submittedAt }}</td>
    </tr>
  </tbody>
</DadsTable>
```

## Dense（高密度）

`dense` を有効にすると公式の `data-size="dense"`（縦 padding 12px・行高 1.3）になる。デフォルトは comfortable（縦 padding 20px・行高 1.7）。

<div class="demo">
  <DadsTable dense cell-border="bottom">
    <thead>
      <tr>
        <th class="dads-table__col-header" scope="col">申請ID</th>
        <th class="dads-table__col-header" scope="col">氏名</th>
        <th class="dads-table__col-header" scope="col">提出日</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in rows" :key="row.id">
        <td>{{ row.id }}</td><td>{{ row.name }}</td><td>{{ row.submittedAt }}</td>
      </tr>
    </tbody>
  </DadsTable>
</div>

```vue
<DadsTable dense cell-border="bottom"> … </DadsTable>
```

## Striped（縞模様）

`striped` を有効にすると偶数行に淡い背景色（`--color-neutral-solid-gray-50`）が付く。

<div class="demo">
  <DadsTable striped cell-border="bottom">
    <thead>
      <tr>
        <th class="dads-table__col-header" scope="col">申請ID</th>
        <th class="dads-table__col-header" scope="col">氏名</th>
        <th class="dads-table__col-header" scope="col">提出日</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in rows" :key="row.id">
        <td>{{ row.id }}</td><td>{{ row.name }}</td><td>{{ row.submittedAt }}</td>
      </tr>
    </tbody>
  </DadsTable>
</div>

```vue
<DadsTable striped cell-border="bottom"> … </DadsTable>
```

## Hover ハイライト

`hoverable` を有効にすると、`@media (hover: hover)` 環境でホバー中の行が `--color-primitive-blue-50` でハイライトされる。

<div class="demo">
  <DadsTable hoverable cell-border="bottom">
    <thead>
      <tr>
        <th class="dads-table__col-header" scope="col">申請ID</th>
        <th class="dads-table__col-header" scope="col">氏名</th>
        <th class="dads-table__col-header" scope="col">提出日</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in rows" :key="row.id">
        <td>{{ row.id }}</td><td>{{ row.name }}</td><td>{{ row.submittedAt }}</td>
      </tr>
    </tbody>
  </DadsTable>
</div>

```vue
<DadsTable hoverable cell-border="bottom"> … </DadsTable>
```

## Selectable（選択行ハイライト）

`selectable` を有効にすると、チェック済みのチェックボックス／ラジオを含む行が `--color-primitive-blue-100` でハイライトされる（公式 `tr:has(:checked)`）。チェックボックス自体は呼び出し側で `<td>` 内に配置する。

```vue
<DadsTable selectable cell-border="bottom">
  <thead>
    <tr>
      <th class="dads-table__col-header" scope="col">
        <!-- 全選択チェックボックス -->
      </th>
      <th class="dads-table__col-header" scope="col">タイトル</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="item in items" :key="item.id">
      <td><input type="checkbox" v-model="item.selected" /></td>
      <td>{{ item.title }}</td>
    </tr>
  </tbody>
</DadsTable>
```

## ボーダー API（`cellBorder` / `border`）

公式の `data-cell-border` / `data-border` 文字列 API をそのまま prop で受け取る。

- `cellBorder` … 各セルの辺。`true`（全辺）/ `'bottom'` / `'top bottom'` / `'right'` など空白区切りの辺キーワード。
- `border` … テーブル外周の辺。`true`（全辺）/ `'hidden'`（外枠を隠す）/ `'bottom-hidden'` など。

行・列の両方に罫線を引く公式構成（`border-on-row-and-column`）は次のとおり:

```vue
<DadsTable border="hidden" cell-border>
  <thead> … </thead>
  <tbody> … </tbody>
</DadsTable>
```

## Caption

`caption` プロップ（または `caption` スロット）を指定すると、ルート要素が `<figure>` になり上部に `<figcaption>` が描画される（公式 `with-caption.html` 構造）。スロットはプロップより優先され、リッチなマークアップを含められる。

<div class="demo">
  <DadsTable caption="表1: 申請一覧" cell-border="bottom">
    <thead>
      <tr>
        <th class="dads-table__col-header" scope="col">申請ID</th>
        <th class="dads-table__col-header" scope="col">氏名</th>
        <th class="dads-table__col-header" scope="col">提出日</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in rows" :key="row.id">
        <td>{{ row.id }}</td><td>{{ row.name }}</td><td>{{ row.submittedAt }}</td>
      </tr>
    </tbody>
  </DadsTable>
</div>

```vue
<DadsTable caption="表1: 申請一覧" cell-border="bottom"> … </DadsTable>
```

## Props

| Prop         | 型                  | デフォルト | 説明                                                                       |
| ------------ | ------------------- | ---------- | -------------------------------------------------------------------------- |
| `caption`    | `string`            | -          | キャプションテキスト。指定時はルートが `<figure>` になる（スロットが優先） |
| `dense`      | `boolean`           | `false`    | 公式 `data-size="dense"`（padding 12px・行高 1.3）                         |
| `striped`    | `boolean`           | `false`    | 公式 `data-row-stripe`。偶数行に `--color-neutral-solid-gray-50`           |
| `hoverable`  | `boolean`           | `false`    | 公式 `data-row-hover-highlight`。hover 行を `--color-primitive-blue-50`    |
| `selectable` | `boolean`           | `false`    | 公式 `data-selectable`。チェック済み行を `--color-primitive-blue-100`      |
| `cellBorder` | `boolean \| string` | `false`    | 公式 `data-cell-border`。セルの辺別ボーダー（`true` / `'bottom'` 等）      |
| `border`     | `boolean \| string` | `false`    | 公式 `data-border`。外周ボーダー（`true` / `'hidden'` / `'*-hidden'` 等）  |

## Slot

| Slot      | 用途                                                                            |
| --------- | ------------------------------------------------------------------------------- |
| `default` | `<thead>` / `<tbody>` 等のテーブル本体。ヘッダセルに公式クラス + `scope` を付与 |
| `caption` | `<figcaption>` の中身（指定時は `caption` プロップより優先される）              |

## Events

`DadsTable` 自身は `emit` を定義していない。並び替え・選択・クリック等のイベント処理は、スロット内の `<thead>` / `<tbody>` に直接バインドする。

## アクセシビリティ

- ヘッダセルには **必ず** `scope="col"`（行ヘッダは `scope="row"`）を付け、スクリーンリーダーがヘッダ／データの関連付けを行えるようにする
- 列ヘッダには `dads-table__col-header`、行ヘッダには `dads-table__row-header` を付与すると、公式の黒強調ボーダーが正しく描画される
- `caption` を指定するとルートが `<figure>` + `<figcaption>` になり、テーブル全体の目的を視覚・支援技術の双方に提示できる
- 並び替えを実装する際は、現在ソート中の列の `<th>` に `aria-sort="ascending" | "descending" | "none"` を付与する
- 行 hover ハイライト（`hoverable`）は `@media (hover: hover)` でガードされ、タッチデバイスでは発火しない
- 強制カラーモード（Windows ハイコントラスト等）では枠線色が `CanvasText`、ヘッダ背景が `Canvas` に切り替わり、視認性が確保される
