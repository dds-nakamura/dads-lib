# アコーディオン（アクセシビリティ）｜デジタル庁デザインシステムβ版

> **Source**: https://design.digital.go.jp/dads/components/accordion/accessibility/
> **Scraped**: 2026-05-12
> **Note**: このURLは403 Access Deniedを返しました。アコーディオンコンポーネントには「アクセシビリティ」タブが存在せず、/accessibility/ サブページは提供されていません。アクセシビリティに関する実装情報は「使い方」ページに含まれています。

## アコーディオンにおけるアクセシビリティ実装

アクセシビリティに関する情報は、[アコーディオン（使い方）](https://design.digital.go.jp/dads/components/accordion/usage/)ページの「実装」セクションを参照してください。

### 主要なアクセシビリティ要件（使い方ページより）

#### `<details>`要素を使って実装する

アコーディオンを実装する際は、`<details>`要素を使用します。HTMLの`<details>`要素を使うと、アクセシブルなアコーディオンを容易に実現できます。`<details>`要素を使う場合、後述のキーボード操作とWAI-ARIAの実装は不要になります。

```html
<details>
  <summary>ヘッダー</summary>
  <div>ボディ</div>
</details>
```

#### カスタムコンポーネントとして実装する場合

既存システムの制約等の理由でやむを得ず`<details>`要素を使用せずカスタムコンポーネントとして実装する場合は、キーボードだけを使ってアコーディオンを開閉操作できるようにしてください。また、WAI-ARIAのステートおよびプロパティを適切に付与し、支援技術からもUIの状態にアクセスできるようにしてください。

アコーディオンコンポーネントに求められるキーボード操作要件、WAI-ARIAステートおよびプロパティについては、ARIA Authoring Practices Guide（APG）を参照してください。

#### 参考情報

- [Accordion Pattern (Sections With Show/Hide Functionality) | APG | WAI | W3C](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/)

---

## 関連ページ

- [アコーディオン: 概要](https://design.digital.go.jp/dads/components/accordion/)
- [アコーディオン: 使い方](https://design.digital.go.jp/dads/components/accordion/usage/)

---

## Metadata

- **Original URL**: https://design.digital.go.jp/dads/components/accordion/accessibility/
- **Status**: 403 Access Denied — page does not exist; content derived from usage page
- **Scraped**: 2026-05-12
