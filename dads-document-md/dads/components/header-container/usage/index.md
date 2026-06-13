# ヘッダーコンテナ（概要・使い方）｜デジタル庁デザインシステムβ版

> **Source**: https://design.digital.go.jp/dads/components/header-container/
> **Scraped**: 2026-06-13
> **Note**: ヘッダーコンテナコンポーネントは「使い方」タブが存在せず、概要ページに使い方の内容が含まれています。/usage/ URLは403のため、概要ページから取得。

[2025年1月9日更新](https://design.digital.go.jp/dads/components/header-container/changelog/)

## タブ

- 概要（現在のページ）

## Table of Contents

- [仕様](#仕様)
  - [ワイド](#ワイド)
  - [ミディアム](#ミディアム)
  - [コンパクト](#コンパクト)
- [各種リソース](#各種リソース)

---

ヘッダーコンテナは、ヘッダーに含まれるアイテムとして使う、さまざまなコンポーネントが内包されます。多くのコンポーネントを格納可能であるため、エリアで区切って示しています。

![スクリーンショット：ヘッダーコンテナの3つのパターン。](https://design.digital.go.jp/dads/images/components/header-container/header_container_overview.png)

---

## 仕様

### ワイド

#### フル

![スクリーンショット：フル幅のヘッダーコンテナの例。①ロゴが左上部にある。②ヘッダーコンテナアイテムがロゴの右側を右端まで埋めている。③水平メニューがその下部にあり、ロゴとヘッダーコンテナアイテムを跨ぐように配置されている。](https://design.digital.go.jp/dads/images/components/header-container/header_container_wide_full.png)

#### スリム

![スクリーンショット：フル幅のヘッダーコンテナの例。①ロゴが左部にある。②ヘッダーコンテナアイテムが右部にある。③水平メニューがロゴのヘッダーコンテナアイテムの間を埋めるように配置されている。](https://design.digital.go.jp/dads/images/components/header-container/header_container_wide_slim.png)

### ミディアム

![スクリーンショット：ミディアム幅のヘッダーコンテナの例。①ロゴが左部にある。②ヘッダーコンテナアイテムがロゴの右側にあり、右端の④ハンバーガーメニューボタンまでの間を埋めるように配置されている。](https://design.digital.go.jp/dads/images/components/header-container/header_container_medium_1.png)

![スクリーンショット：ミディアム幅のヘッダーコンテナの例。①ロゴが左部にある。④ハンバーガーメニューボタンが右端に配置されている。](https://design.digital.go.jp/dads/images/components/header-container/header_container_medium_2.png)

### コンパクト

![スクリーンショット：スリム幅のヘッダーコンテナの例。①ロゴが左部にある。④ハンバーガーメニューボタンが右端にある。②ヘッダーコンテナアイテムがハンバーガーメニューボタンの左部に配置されている。](https://design.digital.go.jp/dads/images/components/header-container/header_container_compact_1.png)

![スクリーンショット：スリム幅のヘッダーコンテナの例。①ロゴが左部にある。④ハンバーガーメニューボタンが右端に配置されている。](https://design.digital.go.jp/dads/images/components/header-container/header_container_compact_2.png)

### 構成要素

- **①ロゴ**
- **②ヘッダーコンテナアイテム**  
  ヘッダーコンテナアイテムのエリアには、ヘッダーコンテナ内のあらゆる汎用的なコンポーネントが内包されます。たとえば、以下のようなコンポーネントです。
  - ユーティリティリンク
  - ランゲージセレクター
  - 検索ボックス
  - 新規登録/ログイン/ログアウトボタン【今後、提供予定】
- **③水平メニュー**
- **④ハンバーガーメニューボタン**  
  画面幅の狭いデバイスでヘッダーコンテナアイテムや水平メニューを内包するための、メニューパネル開閉ボタンです。

---

## 各種リソース

| 種別 | リソース | 状態 |
|------|----------|------|
| デザイン | [Figmaデザインデータ（v2）](https://www.figma.com/community/file/1377880368787735577) | 提供中 |
| HTML版実装 | ソースコード（GitHub） | 提供予定 |
| HTML版実装 | サンプル（Storybook） | 提供予定 |
| React版実装 | ソースコード（GitHub） | 提供予定 |
| React版実装 | サンプル（Storybook） | 提供予定 |

---

## Metadata

- **Original URL**: https://design.digital.go.jp/dads/components/header-container/
- **Note**: /usage/ URL returned 403; content scraped from main overview page via Playwright
- **Scraped**: 2026-06-13
