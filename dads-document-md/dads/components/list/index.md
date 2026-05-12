# 箇条書きリスト | デジタル庁デザインシステムβ版

> **Source**: https://design.digital.go.jp/dads/components/list/
> **Scraped**: 2026-05-12
> **Description**: 箇条書きリストコンポーネントの概要・使い方・アクセシビリティガイドライン

## 基本情報

- **最終更新**: 2026年2月4日
- **バージョン**: v2.13.0

## 概要

箇条書きリストは、1つ以上の項目を列挙するときに使用します。本デザインシステムでは `<ul>` 要素のみを使用し、項番はセマンティックな `<ol>` 要素ではなくプレーンテキストとして扱います。

## ユースケース

### リストマークタイプ

順序を必要としない複数項目を列挙する場合に使用します。

### 項番タイプ

法令・利用規約・手順書など、項番それ自体が意味を持つ場合に使用します。項番はCSSカウンターではなくテキストコンテンツとして記述します。

### `<ol>` 要素を使用しない理由

> ブラウザは `<ol>` 要素の項番をコンテンツとして扱わないため、項番をテキストとしてコピーすることができません。

CSSカウンターによる採番も、項目の並べ替え時の安定性確保とコピー操作のために使用を避けます。

## 仕様

### リストマークタイプ（Bulleted List Type）

**構成要素（必須）:**

- リストマーク
- コンテンツ

**階層と表示:**

入れ子の深さに応じてインデントを設けます。入れ子の深さに応じて3種類のマーカーを使い分けます。

| レベル | インデント |
|--------|-----------|
| Level 1 | 0px |
| Level 2 | 16px / 24px / 32px |
| Level 3 | 48px / 56px |

### 項番タイプ（Numbered List Type）

**構成要素（必須）:**

- 項番
- コンテンツ

**階層と表示:**

インデントは 0 / 24 / 32 / 48 / 72px のインクリメントで調整。

マーカーはデフォルトでは全角2文字分の幅を持ちます。3桁以上になり得る場合は必要に応じて幅を広げてください。

**項番の記載形式:**

数字・丸囲み数字・ローマ数字・アルファベット・ひらがな・カタカナ、括弧や句読点スタイルなど多様な形式をサポートします。項番はハイパーリンクとして機能させることも可能です。

### リストアイテム間の間隔

3種類の行間から選択可能: 12px / 8px / 4px

## 実装

`<ul>` および `<li>` 要素を両方のリストタイプに使用します。

```html
<!-- リストマークタイプ -->
<ul>
  <li>親項目A</li>
  <li>親項目B
    <ul>
      <li>子項目X</li>
      <li>子項目Y</li>
    </ul>
  </li>
</ul>
```

```html
<!-- 項番タイプ（<ol>は使用しない） -->
<ul>
  <li>1. 最初の項目</li>
  <li>2. 次の項目</li>
</ul>
```

## アクセシビリティ

### 箇条書きをテキストで表現しない

以下のような表現は避け、リストコンポーネントを使用します：

- 中黒（・）をマーカーとして使用しない
- 数字をテキストと手動改行で並べない
- 空白文字でインデントしない

スクリーンリーダーはリスト要素に入る際に項目の総数を読み上げ、ナビゲーション機能によるリストへの直接ジャンプも可能になります。

### `<ol>` 要素は使わず `<ul>` 要素として実装する

`<ol>` 要素を使用した場合、ブラウザは `<ol>` 要素の項番をコンテンツとして扱わず、装飾として表現します。

問題点：

- 表示された番号はコピーできない
- 項目に一意かつ永続的な番号を付けられない
- ユーザースタイルシートで書式が上書き・非表示になる可能性がある
- 一部の採番形式は `list-style-type` で表現できない

**解決策:** `<ul>` 要素を使用し、`<li>` 要素内にテキストコンテンツとして項番を含める。CSSカウンターも同様の理由で使用しない。

### 適切な入れ子構造でマークアップする

**誤った構造:**

```html
<ul>
  <li>親項目A</li>
  <li>親項目B</li>
</ul>
<ul>
  <li>
    <ul>
      <li>子項目X</li>
      <li>子項目Y</li>
    </ul>
  </li>
</ul>
```

**正しい構造:**

```html
<ul>
  <li>親項目A</li>
  <li>親項目B
    <ul>
      <li>子項目X</li>
      <li>子項目Y</li>
    </ul>
  </li>
</ul>
```

適切な入れ子構造により、スクリーンリーダーが階層関係を正しく解釈できます。

## 各種リソース

| 種別 | リソース | 状態 |
|------|---------|------|
| デザイン | [Figmaデザインデータ（v2）](https://www.figma.com/community/file/1377880368787735577) | 提供中 |
| HTML版実装 | [ソースコード（GitHub）](https://github.com/digital-go-jp/design-system-example-components-html/tree/main/src/components/list) | 提供中 |
| HTML版実装 | [サンプル（Storybook）](https://design.digital.go.jp/dads/html/?path=/docs/components-箇条書きリスト--docs) | 提供中 |
| React版実装 | [ソースコード（GitHub）](https://github.com/digital-go-jp/design-system-example-components-react/tree/main/src/components/List) | 提供中 |
| React版実装 | [サンプル（Storybook）](https://design.digital.go.jp/dads/react/?path=/docs/component-dads-v2-list--docs) | 提供中 |

## 関連コンポーネント

- [リソースリスト](https://design.digital.go.jp/dads/components/resource-list/)
- [説明リスト](https://design.digital.go.jp/dads/components/description-list/)

## 関連ページ

- [箇条書きリスト: 使い方](https://design.digital.go.jp/dads/components/list/usage/)
- [箇条書きリスト: アクセシビリティ](https://design.digital.go.jp/dads/components/list/accessibility/)

---

## メタデータ

- **Original URL**: https://design.digital.go.jp/dads/components/list/
- **Version**: v2.13.0
- **Last Modified**: 2026年2月4日
- **Publisher**: デジタル庁 (Digital Agency, Government of Japan)
