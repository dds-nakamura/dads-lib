# Gap Report: `<DadsComponent>`

> Issue #18 — DADS 公式とのビジュアル差異監査。1 コンポーネント 1 ファイル。
> このテンプレートをコピーして `<Component>.md` を作成する。

## メタ情報

| 項目 | 値 |
| ---- | ---- |
| Vue 実装 | `packages/vue/src/components/<Dir>/<Dads*.vue>` |
| 真実の源 (一次) | `example` / `figma` / `md` / `wai-aria` |
| 参照パス | `design-system-example-components-html/src/components/<name>/` など |
| 総合判定 | ✅ 一致 / ⚠️ 軽微差異 / ❌ 要修正 |
| 重大度 | none / low / medium / high |
| 検出差異数 | n |

## 観点別チェック

| 観点 | 公式 (正準値) | `@dads/vue` 現状 | 判定 | 備考 / 修正方針 |
| ---- | ------------- | ----------------- | ---- | ---------------- |
| タイポグラフィ (font-family / size / weight / line-height) | | | | |
| カラー (背景 / 文字 / ボーダー: トークン参照) | | | | |
| 角丸 (`--border-radius-*`) | | | | |
| スペーシング (padding / gap / margin: `--spacing-*`) | | | | |
| エレベーション / 影 (`--elevation-*`) | | | | |
| ボーダー (太さ / 色 / 有無) | | | | |
| 状態 (hover / focus-visible / active / current / disabled / expanded) | | | | |
| サイズバリアント (sm/md/lg 等) | | | | |
| forced-colors / ハイコントラスト | | | | |
| 正準CSSの流用 vs 独自実装 (ドリフト温床) | | | | |

## 検出した差異 (修正対象)

1. **[重大度]** 観点: 概要。公式値 → 現状値。修正方針（トークン / セレクタ）。
   - 該当行: `<Dads*.vue>:LNN`

## ハードコード / 誤トークンの洗い出し

- 直書きカラー / spacing / radius があれば列挙（`design-tokens` 参照に置換すべき箇所）

## 結論

- 修正要否、優先度、想定 changeset レベル (patch / minor / major)、API・aria 不変を保てるか
