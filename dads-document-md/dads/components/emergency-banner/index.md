# 緊急時バナー | デジタル庁デザインシステムβ版

> **Source**: https://design.digital.go.jp/dads/components/emergency-banner/
> **Scraped**: 2026-05-12
> **Description**: 緊急時バナーコンポーネントの概要・仕様・使い方ガイドライン

## 基本情報

- **最終更新**: 2025年1月21日
- **バージョン**: v2.13.0

## 概要

緊急時バナーは、当該ウェブサイトの通常の通信機能を中断し、ファーストビューを占有して注意喚起を行うコンポーネントです。ユーザーの生命や財産に影響を与える緊急事態のみに限定して使用する設計です。

> 緊急時バナーは、当該ウェブサイトで本来成すべきコミュニケーションを中断してでもファーストビューを占有します。

長期掲載が必要な場合はノティフィケーションバナーを使用してください。

## 仕様

### デザイン要素

- **セマンティックカラー**: エラー (Error) を使用
- **非表示機能**: ユーザーによる非表示は不可
- **スタイル特性**: サイト/サービスのトーン&マナーと異なる違和感のあるスタイルを採用

### 構成要素

| # | 名称 | 説明 |
|---|------|------|
| ① | バナータイトル（必須） | 「【緊急】」で始まり、全角30文字以内。モバイルで2行以内 |
| ② | 年月日など | 掲載日、更新日時等の情報 |
| ③ | バナーデスクリプション（必須） | 全角100文字程度以内。SNS全文配信を想定 |
| ④ | アクションボタン（リンク時必須） | 最小幅50%、モバイルで100% |

### クリッカブルエリア

アクションボタン部分のみがクリッカブルエリアです。リンク先は1つまで。

## 使い方

### 配置

ファーストビューですべてのユーザーに素早く認知できるようにページ上部へ配置します。

- ヘッダーより上部も可
- 他の通知コンテンツより上に配置
- 十分なスペース確保で重要性を明確化
- 複数設置は緊急事態のみ

### タイトル作成のポイント

**良い例:** 「○○地区に避難準備情報が発令されました」

一目で警告内容が把握可能なタイトルにします。

**悪い例:** 「緊急のお知らせ」

具体性がなく、コンポーネント自体が既に緊急性を示しているため不適切です。

### バナーデスクリプション作成のポイント

**適切:** 概ね100文字以内で簡潔明瞭に構成します。

> フラットな文字ベースで詳細情報を的確に伝達することは困難です。

詳細は専用ページへリンクします。

**不適切:** 300文字超の長文、緊急性の低い情報（営業時間など）

### 掲載期間

> アラートによる疲弊（アラート疲れ）が発生して注意喚起の効果が薄れたり無視されるおそれがあります。

長期掲示は避け、終了時は速やかに削除します。

## 各種リソース

| 種別 | リソース | 状態 |
|------|---------|------|
| デザイン | [Figmaデザインデータ（v2）](https://www.figma.com/community/file/1377880368787735577) | 提供中 |
| HTML版実装 | [ソースコード（GitHub）](https://github.com/digital-go-jp/design-system-example-components-html/tree/main/src/components/emergency-banner) | 提供中 |
| HTML版実装 | [サンプル（Storybook）](https://design.digital.go.jp/dads/html/?path=/docs/components-緊急時バナー--docs) | 提供中 |
| React版実装 | [ソースコード（GitHub）](https://github.com/digital-go-jp/design-system-example-components-react/tree/main/src/components/EmergencyBanner) | 提供中 |
| React版実装 | [サンプル（Storybook）](https://design.digital.go.jp/dads/react/?path=/docs/component-dads-v2-emergencybanner--docs) | 提供中 |

## 関連コンポーネント

- [カルーセル](https://design.digital.go.jp/dads/components/carousel/)
- [水平メニュー](https://design.digital.go.jp/dads/components/horizontal-menu/)
- [ノティフィケーションバナー](https://design.digital.go.jp/dads/components/notification-banner/)

---

## メタデータ

- **Original URL**: https://design.digital.go.jp/dads/components/emergency-banner/
- **Version**: v2.13.0
- **Last Modified**: 2025年1月21日
- **Publisher**: デジタル庁 (Digital Agency, Government of Japan)
