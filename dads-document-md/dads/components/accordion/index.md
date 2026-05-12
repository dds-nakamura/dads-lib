# アコーディオン | デジタル庁デザインシステムβ版

> **Source**: https://design.digital.go.jp/dads/components/accordion/
> **Scraped**: 2026-05-12
> **Description**: アコーディオンコンポーネントの概要・使い方・仕様・アクセシビリティガイドライン

## 基本情報

- **最終更新**: 2026年2月4日
- **バージョン**: v2.13.0

## 概要

アコーディオンは、同種のセクションが連続するとき、それらを折りたたんで一覧性を向上する目的で使用します。

## ユースケース

アコーディオンが活用される主な場面：

- よくある質問ページで、質問文を一覧表示し、回答を折りたたみ形式で提示
- 更新履歴の日付・概要を一覧化し、詳細内容を折りたたみで表示
- 属性別異なる入力内容の申請手続きで、個別説明を折りたたみ表示

## 注意が必要なケース

**使用を避けるべき場面：**

1. 表示領域コンパクト化のみが目的の場合
2. 折りたたまれた内容に重要情報が含まれる場合
3. 単一セクションのみの場合
4. セクション内の一部のみを折りたたみたい場合（→ディスクロージャーを使用）

## 仕様

### コンポーネント要素

アコーディオンは4つのパーツで構成されます：

1. **開閉アイコン（必須）** — ヘッダーの左側に配置
2. **ヘッダー（必須）** — クリック可能なメインエリア
3. **ボディ（必須）** — ヘッダー下部のコンテンツコンテナ
4. **リターンリンク** — 省略可能な戻りリンク

### サイズバリエーション

開閉アイコンのサイズはL・M・S・XSの4サイズがあります。画面サイズや、コンテンツの性質およびボリュームに応じて選択します。

### 配置ルール

**適切な配置（OK）:**
- アコーディオンのボディ内にディスクロージャーコンポーネントを配置することが可能

**不適切な配置（NG）:**
- リスト内にアコーディオンを配置することはできない
- テーブル内にアコーディオンを配置することはできない
- アコーディオン同士を入れ子にすることはできない
- ディスクロージャーコンポーネント内にアコーディオンを配置することはできない

> アコーディオンは、それ自身がメイン情報であり、見出し・段落・リスト・テーブルなどのコンテンツと同レベルのセクションとして扱うコンポーネントです。

## コンテンツガイドライン

### ヘッダー

ヘッダーはコンテンツを要約した文言にします。

- よくある質問の場合: 「会員登録の手順は？」
- 更新履歴の場合: 「2025年11月5日 軽微な問題を修正しました」

### ボディコンテンツ

アコーディオンのボディには、見出し・段落・リスト・テーブルなど各種コンポーネントを配置できます。

### リターンリンクラベル

リターンリンクのラベルは、たとえば「会員登録の手順は？」の場合「の先頭に戻る」を加えるような形で、ヘッダーテキストと対応させます。

## 動作

### 初期状態

ページ読み込み時にアコーディオンを開いた状態または閉じた状態のどちらで表示するかを決定します。

### リターンリンク動作

リターンリンクのリンク先はヘッダーへのページ内リンクとします。この挙動により、ボディを閉じるための補助として機能します。

## アクセシビリティ

### details要素による実装（推奨）

```html
<details>
  <summary>ヘッダー</summary>
  <div>ボディ</div>
</details>
```

HTML `<details>` 要素を使用することで、追加のキーボード実装やARIAの実装なしにアクセシブルなアコーディオンを実現できます。

### カスタムコンポーネントによる実装

`<details>` 要素をシステム上の制約から使用できない場合：

- キーボードのみでの開閉操作を有効にする
- WAI-ARIAのステートとプロパティを実装する
- W3CのARIA Authoring Practices Guide (APG) Accordion Patternを参照する

## 各種リソース

| 種別 | リソース | 状態 |
|------|---------|------|
| デザイン | [Figmaデザインデータ（v2）](https://www.figma.com/community/file/1377880368787735577) | 提供中 |
| HTML実装 | [ソースコード（GitHub）](https://github.com/digital-go-jp/design-system-example-components-html/tree/main/src/components/accordion) | 提供中 |
| HTML実装 | [サンプル（Storybook）](https://design.digital.go.jp/dads/html/?path=/docs/components-アコーディオン--docs) | 提供中 |
| React実装 | [ソースコード（GitHub）](https://github.com/digital-go-jp/design-system-example-components-react/tree/main/src/components/Accordion) | 提供中 |
| React実装 | [サンプル（Storybook）](https://design.digital.go.jp/dads/react/?path=/docs/component-dads-v2-accordion--docs) | 提供中 |

## 関連コンポーネント

- [ディスクロージャー](https://design.digital.go.jp/dads/components/disclosure/)

## 関連ページ

- [アコーディオン: 使い方](https://design.digital.go.jp/dads/components/accordion/usage/)
- [アコーディオン: アクセシビリティ](https://design.digital.go.jp/dads/components/accordion/accessibility/)
- [アコーディオン: Changelog](https://design.digital.go.jp/dads/components/accordion/changelog/)

---

## メタデータ

- **Original URL**: https://design.digital.go.jp/dads/components/accordion/
- **Version**: v2.13.0
- **Last Modified**: 2026年2月4日
- **Publisher**: デジタル庁 (Digital Agency, Government of Japan)
