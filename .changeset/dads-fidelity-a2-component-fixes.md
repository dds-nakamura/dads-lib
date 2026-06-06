---
'@dads/vue': patch
---

DADS 公式とのビジュアル差異監査 (Issue #18) 柱A-2: 全 49 コンポーネントに API/aria 不変のビジュアル是正を適用 (計 242 件)。

- **S-1b 文脈依存トークン**: `--color-border-default` / `--color-border-strong` / `--color-info-bg` / `--color-success-bg` / `--color-bg-selected-hover` / `--color-brand-secondary` / `--font-size-12` を用途に応じた実在公式トークンへ置換。これにより `@dads/vue` 内の「design-tokens に存在しないトークン参照」は内部 custom property を除き解消。
- **focus-ring**: focus-visible を独自に直書きしていたコンポーネント (Checkbox / DatePicker 等) を共有 mixin (`dads-focus-ring` / `dads-focus-ring-fill`) へ統一。テキストボタン・リンク・メニュー項目は公式どおり黄背景塗りに。
- **角丸**: フォーム部品 (InputText / Select / SearchBox / Textarea / MenuListBox opener 等) の `--border-radius-4` を公式 8px (`--border-radius-8`) へ是正。Card は 16px へ。
- **タイポグラフィ**: line-height (1.5→1.7) / letter-spacing (0.02em 追加) / font-weight を公式 example 値へ。
- **disabled 配色**: `opacity: 0.5` 一律ディミングを公式の専用トークン配色 (gray-300 / gray-50 / gray-420 等) へ。
- **影**: 直書き box-shadow を `--elevation-*` トークンへ。
- **誤フォールバック値**: `var(--token, #wrong)` の誤った fallback 直値を正値へ是正。

props・aria・role・DOM 構造・公開クラス名は不変。構造リファクタや公開 API/バリアントに関わる差異 (165 件) は柱A-3 として別途対応。
