---
'@dads/vue': patch
---

**柱A-3 / T5: アイコン依存の残差を公式準拠化** — Issue #18

柱B（DadsIcon 化）で大半は対応済み。本 T5 では公式が専用のアイコン表現を使う2箇所を公式準拠にした（DOM/aria 構造は不変）。

- **Breadcrumb**: 区切りを文字 `》` から **公式の inline SVG chevron**（`__separator-icon`, 12×12）に変更。`separator` prop は **任意のテキスト上書き**として維持し、未指定時は公式 SVG を描画。
- **Accordion**: 開閉アイコンを **公式の円形ボーダーアイコン**（`__icon` を `border-radius:50%` + 1px ボーダー + 白背景）にし、単一の chevron を **開いている時に CSS で 180° 回転**させる方式へ（従来は up/down のアイコン出し分け）。

挙動・public props・aria は不変（Breadcrumb は既定の区切り見た目が変わる）。`<details>` 構造化や size API 等は後続テーマ（T3/T4/T6）。
