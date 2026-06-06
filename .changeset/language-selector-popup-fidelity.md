---
'@dads/vue': patch
---

`DadsLanguageSelector` のポップアップ見た目を公式 DADS (menu-list-box / menu-list) に合わせて修正。

- ポップアップの角丸を 4px → 8px に変更（公式 `menu-list-box` の `border-radius: 8px` に準拠）
- 選択中項目 (`__item--current`) に薄いアクセント背景を追加。light-blue は公式既定の `blue-100` 背景 + `blue-1000` 文字に合わせ、light-green / light-gray も各アクセントの薄背景を付与（従来は文字色のみで背景なしだった）

挙動・API・アクセシビリティ属性に変更はなく、見た目のみの調整。
