# メニューリスト（概要・使い方）｜デジタル庁デザインシステムβ版

> **Source**: https://design.digital.go.jp/dads/components/menu-list/
> **Scraped**: 2026-05-12
> **Note**: メニューリストコンポーネントは「使い方」タブが存在せず、概要ページに使い方の内容が含まれています。/usage/ URLは403のため、概要ページから取得。

[2025年1月9日更新](https://design.digital.go.jp/dads/components/menu-list/changelog/)

## タブ

- 概要（現在のページ）

## Table of Contents

- [使い方](#使い方)
  - [リンクの強調](#リンクの強調)
  - [CTA（Call-to-action）の挙動表示を明確に](#ctacall-to-actionの挙動表示を明確に)
  - [セクションの明確化](#セクションの明確化)
- [各種リソース](#各種リソース)

---

メニューアイテムを束ねたコンポーネントです。ローカルメニューとしてコンテンツエリアに配置したり、ドロップダウンやメガメニューの中などに内包したりして使用します。

![スクリーンショット：メニューリストの3つのパターン。](https://design.digital.go.jp/dads/images/components/menu-list/menu_list_overview.png)

---

## 使い方

### リンクの強調

![スクリーンショット：エンドアイコンの有無の異なる2つのメニューリストが左右に並んでいる。右のメニューリストの各項目には、右向きのシェブロン（矢印の先端部分のような形状）がエンドアイコンとして配置されている。](https://design.digital.go.jp/dads/images/components/menu-list/menu_list_end_icon.png)

- 通常メニュー内のアイテムはそのほとんどがリンクやインタラクションのためのアイテムになりますが、リンクを強調し、視覚的に明確にしたい場合はエンドアイコンを使用します。
- 通常のリンクを強調して示すエンドアイコンと、機能的に異なった第二階層リンク（スライド型）やアコーディオンを示すアイコンと混在させることは、視覚的、体験的に複雑さや認知負荷を与えるため、できる限り使用しないでください。

### CTA（Call‐to‐action）の挙動表示を明確に

- メニュー内のリンク（ページ遷移）とアコーディオン（サブメニューの開閉）など、ユーザーに異なった挙動を想定させる場合は、その表示を明確に違うものにする必要があります。
- エンドアイコンをともなう強調リンクとサブメニューを開閉するアコーディオンをやむを得ず混在させる場合は、両者を明確に異なったアイコンを使用することが求められます。
- ただし、サイト内でのアイコンの仕様は挙動別に一貫性を保ってください。

#### 良い例

![スクリーンショット：エンドアイコンの付いたメニューリストの例。リンクを示唆するために右向きシェブロンの付いた項目と、サブメニューの開閉を示すプラス／マイナスの付いた項目が混在している。](https://design.digital.go.jp/dads/images/components/menu-list/menu_list_good_example.png)

リンクとアコーディオンという異なった機能を、明確に異なるアイコンで示しているため、挙動が違うことを想定できる。

#### 悪い例

![スクリーンショット：エンドアイコンの付いたメニューリストの例。リンクを示唆するために右向きのシェブロン、サブメニューの開閉を示すために上下を向いたシェブロンが使われている。](https://design.digital.go.jp/dads/images/components/menu-list/menu_list_bad_example.png)

リンクとアコーディオンという異なった機能を、シェブロン（矢印アイコン）の向きの違いで表現しているため、ふたつの機能の混在を一目で把握するには認知負荷が高い。

### セクションの明確化

セクションをより明確にしたい場合は以下のUIを利用します。

- **ディバイダー**
  - ディバイダーを使用してセクションを大きく分割することが可能です。
  - 特にコンテンツ内容や機能の性質が大きく異なったセクションを分割する場合に適しています。

#### スタンダードなカテゴリータイトル

![スクリーンショット：2つのセクションからなるメニューリストの例。各セクションはセクション名が太字で表現され、通常の項目と判別できるようになっている。セクション間にはホワイトスペースが設けられ、セクションのまとまりが認知できるようになっている。](https://design.digital.go.jp/dads/images/components/menu-list/menu_list_section_standard.png)

#### ディバイダーを追加

![スクリーンショット：2つのセクションからなるメニューリストの例。各セクションはセクション名が太字で表現され、通常の項目と判別できるようになっている。セクション間にはディバイダーが配置され、セクションの区切りが明確になっている。](https://design.digital.go.jp/dads/images/components/menu-list/menu_list_section_divider.png)

---

## 各種リソース

| 種別 | リソース | 状態 |
|------|----------|------|
| デザイン | [Figmaデザインデータ（v2）](https://www.figma.com/community/file/1377880368787735577) | 提供中 |
| HTML版実装 | [ソースコード（GitHub）](https://github.com/digital-go-jp/design-system-example-components-html/tree/main/src/components/menu-list) | 提供中 |
| HTML版実装 | [サンプル（Storybook）](https://design.digital.go.jp/dads/html/?path=/docs/components-メニューリスト--docs) | 提供中 |
| React版実装 | ソースコード（GitHub） | 提供予定 |
| React版実装 | サンプル（Storybook） | 提供予定 |

---

## Metadata

- **Original URL**: https://design.digital.go.jp/dads/components/menu-list/
- **Note**: /usage/ URL returned 403; content scraped from main overview page via Playwright
- **Scraped**: 2026-05-12
