# アコーディオン（使い方）｜デジタル庁デザインシステムβ版

> **Source**: https://design.digital.go.jp/dads/components/accordion/usage/
> **Scraped**: 2026-05-12
> **Description**: デジタル庁デザインシステムβ版のアコーディオンコンポーネントの使い方ページ。

[2026年2月4日更新](https://design.digital.go.jp/dads/components/accordion/changelog/)

## タブ

- [概要](https://design.digital.go.jp/dads/components/accordion/)
- 使い方（現在のページ）

## Table of Contents

- [コンポーネント要素](#コンポーネント要素)
  - [サイズバリエーション](#サイズバリエーション)
  - [リターンリンクの使い方](#リターンリンクの使い方)
- [配置](#配置)
- [コンテンツ](#コンテンツ)
  - [ヘッダーは概要文にする](#ヘッダーは概要文にする)
  - [ボディ内にはさまざまなコンポーネントを配置できる](#ボディ内にはさまざまなコンポーネントを配置できる)
  - [リターンリンクのラベルはヘッダーと揃える](#リターンリンクのラベルはヘッダーと揃える)
- [ふるまい](#ふるまい)
  - [ページ読み込み時に開いておくか閉じておくかを設定する](#ページ読み込み時に開いておくか閉じておくかを設定する)
  - [リターンリンクはヘッダーへのページ内リンクとする](#リターンリンクはヘッダーへのページ内リンクとする)
- [実装](#実装)
  - [details要素を使って実装する](#details要素を使って実装する)
  - [カスタムコンポーネントとして実装する場合](#カスタムコンポーネントとして実装する場合)

---

## コンポーネント要素

![スクリーンショット：アコーディオンを構成する各パーツに、それぞれ①②③④の番号を割り付けている。①は開閉アイコン。ヘッダーの左に配置。②はヘッダー。③はボディ。ヘッダーの下に配置。④はリターンリンク。](https://design.digital.go.jp/dads/images/components/accordion/usage/accordion_anatomy.png)

- ① 開閉アイコン（必須）
- ② ヘッダー（必須）
- ③ ボディ（必須）
- ④ リターンリンク

### サイズバリエーション

![スクリーンショット：開閉アイコンのサイズパターン。L・M・S・XSの4サイズ。](https://design.digital.go.jp/dads/images/components/accordion/usage/accordion_size.png)

開閉アイコンのサイズはL・M・S・XSの4サイズがあります。画面サイズや、コンテンツの性質およびボリュームに基づいて使い分けてください。

### リターンリンクの使い方

ヘッダーに戻って閉じる操作を必要とするときは、リターンリンクを使用できます。

---

## 配置

### 良い例

![OK例:アコーディオン内ディスクロージャー](https://design.digital.go.jp/dads/images/components/accordion/usage/accordion_ok_disclosure.png)

アコーディオン内にディスクロージャーを配置できます。

アコーディオンとディスクロージャーの組み合わせを行う際は、上記の例に則って使用してください。

### 悪い例

![NG例:リスト内アコーディオン](https://design.digital.go.jp/dads/images/components/accordion/usage/accordion_ng_list.png)

リスト内にアコーディオンを配置することはできません。

![NG例:テーブル内アコーディオン](https://design.digital.go.jp/dads/images/components/accordion/usage/accordion_ng_table.png)

テーブル内にアコーディオンを配置することはできません。

![NG例:アコーディオン内アコーディオン](https://design.digital.go.jp/dads/images/components/accordion/usage/accordion_ng_accordion.png)

アコーディオン内にアコーディオンを配置することはできません。

![NG例:ディスクロージャー内アコーディオン](https://design.digital.go.jp/dads/images/components/accordion/usage/accordion_ng_disclosure.png)

ディスクロージャー内にアコーディオンを配置することはできません。

アコーディオンは、それ自身がメイン情報であり、見出し・段落・リスト・テーブルなどのコンテンツと同レベルのセクションとして扱うコンポーネントです。そのため、上記のNG例にあたるような配置はできません。

---

## コンテンツ

### ヘッダーは概要文にする

よくある質問であれば「会員登録の手順は？」、更新履歴であれば「2025年11月5日 軽微な問題を修正しました」など、コンテンツを要約した概要文を記載します。

### ボディ内にはさまざまなコンポーネントを配置できる

![OK例:アコーディオン内ボディに見出し・段落・リスト・テーブルなどのコンテンツを配置した例](https://design.digital.go.jp/dads/images/components/accordion/usage/accordion_ok_body.png)

アコーディオンのボディには、情報を構成するために必要な様々なコンポーネントを配置することができます。

### リターンリンクのラベルはヘッダーと揃える

リターンリンクのラベルは、たとえば「『会員登録の手順は？』の先頭に戻る」のような、ヘッダーに「の先頭に戻る」を加えるような形とし、ヘッダーと揃えてください。

---

## ふるまい

### ページ読み込み時に開いておくか閉じておくかを設定する

ページが読み込まれた際に、アコーディオンを開いた状態で表示するか、閉じた状態で表示するかを定めます。

例えば、先頭のアコーディオンコンポーネントを開いて表示しておくと、後続も同じように情報が折りたたまれていることを示唆できます。

### リターンリンクはヘッダーへのページ内リンクとする

リターンリンクのリンク先はヘッダーへのページ内リンクとします。この挙動により、ボディを閉じるための補助として機能するようになります。

---

## 実装

### `<details>`要素を使って実装する

アコーディオンを実装する際は、`<details>`要素を使用します。HTMLの`<details>`要素を使うと、アクセシブルなアコーディオンを容易に実現できます。`<details>`要素を使う場合、後述のキーボード操作とWAI-ARIAの実装は不要になります。

```html
<details>
  <summary>ヘッダー</summary>
  <div>ボディ</div>
</details>
```

### カスタムコンポーネントとして実装する場合

既存システムの制約等の理由でやむを得ず`<details>`要素を使用せずカスタムコンポーネントとして実装する場合は、キーボードだけを使ってアコーディオンを開閉操作できるようにしてください。また、WAI-ARIAのステートおよびプロパティを適切に付与し、支援技術からもUIの状態にアクセスできるようにしてください。

アコーディオンコンポーネントに求められるキーボード操作要件、WAI-ARIAステートおよびプロパティについては、ARIA Authoring Practices Guide（APG）を参照してください。

#### 参考情報

- [Accordion Pattern (Sections With Show/Hide Functionality) | APG | WAI | W3C](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/)

---

## 関連ページ

- [アコーディオン: 概要](https://design.digital.go.jp/dads/components/accordion/)

---

## Metadata

- **Original URL**: https://design.digital.go.jp/dads/components/accordion/usage/
- **Scraped**: 2026-05-12
