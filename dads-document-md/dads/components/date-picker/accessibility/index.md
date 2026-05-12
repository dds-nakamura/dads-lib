# 日付ピッカー／カレンダー（アクセシビリティ）｜デジタル庁デザインシステムβ版

> **Source**: https://design.digital.go.jp/dads/components/date-picker/accessibility/
> **Scraped**: 2026-05-12
> **Description**: デジタル庁デザインシステムβ版の日付ピッカー／カレンダーコンポーネントのアクセシビリティページ。

[2025年10月29日更新](https://design.digital.go.jp/dads/components/date-picker/changelog/)

## タブ

- [概要](https://design.digital.go.jp/dads/components/date-picker/)
- [使い方](https://design.digital.go.jp/dads/components/date-picker/usage/)
- アクセシビリティ（現在のページ）

## Table of Contents

- [`<select>`要素および`<input type="date">`要素の使用を避ける](#select要素およびinput-typedate要素の使用を避ける)
- [文脈に応じて`autocomplete`を使用する](#文脈に応じてautocompleteを使用する)

---

## `<select>`要素および`<input type="date">`要素の使用を避ける

デジタル庁デザインシステムでは、日付ピッカーの入力フィールドを3つのテキスト入力フィールド（`<input type="text">`）で構成しています。`<select>`要素を使うと選択操作のみで入力が可能になりますが、その適用範囲は限られます。文脈によって必要となる日付の値は異なり、たとえば生年月日を入力する場面では50年以上前にさかのぼって操作する必要があり、他者の生年月日入力においては100年以上さかのぼるケースもあります。このような大量のスクロール操作は、マウスユーザー・キーボードユーザー・スクリーンリーダーユーザーいずれにとっても、アクセシビリティ上の負担となります。`<input type="date">`のカレンダー入力においても同様の問題があります。

年は最大4桁、月と日は最大2桁という限られた文字数・文字種であるため、直接入力であっても負担なく誤りなく入力できます。

デジタル庁デザインシステムの日付ピッカーは、直接入力とあわせてカレンダー入力も備えています。日付を選ぶ際に前後移動や曜日の確認が必要な場面では、このカレンダー入力が役立ちます。

文脈や必要な値に応じて、直接入力のみ、または直接入力とカレンダー入力の組み合わせを選択してください。

---

## 文脈に応じて`autocomplete`を使用する

フォームへの入力はユーザーにとって、操作面でも内容面でも負担となります。ブラウザのオートフィル機能はこの負担を軽減できるため、対応する`autocomplete`属性を使用してください。日付ピッカーに関連する`autocomplete`の属性値は以下の通りです。

| 属性値 | 目的 |
|--------|------|
| `bday-year` | 生年月日（年） |
| `bday-month` | 生年月日（月） |
| `bday-day` | 生年月日（日） |
| `cc-exp-month` | クレジットカード有効期限（月） |
| `cc-exp-year` | クレジットカード有効期限（年） |

### 参考情報

- [HTML 属性: autocomplete - HTML: ハイパーテキストマークアップ言語 | MDN](https://developer.mozilla.org/ja/docs/Web/HTML/Reference/Attributes/autocomplete)

---

## 関連ページ

- [日付ピッカー／カレンダー: 概要](https://design.digital.go.jp/dads/components/date-picker/)
- [日付ピッカー／カレンダー: 使い方](https://design.digital.go.jp/dads/components/date-picker/usage/)

---

## Metadata

- **Original URL**: https://design.digital.go.jp/dads/components/date-picker/accessibility/
- **Scraped**: 2026-05-12
