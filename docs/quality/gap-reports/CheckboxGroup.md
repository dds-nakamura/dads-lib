# Gap Report: `DadsCheckboxGroup`

> Issue #18 — DADS 公式とのビジュアル差異監査。1 コンポーネント 1 ファイル。

## メタ情報

| 項目 | 値 |
| ---- | ---- |
| Vue 実装 | `packages/vue/src/components/CheckboxGroup/DadsCheckboxGroup.vue` |
| 真実の源 (一次) | `example` (checkbox の `form-control-label` 連携 / `checkbox.mdx` グループ化セクション) |
| 参照パス | `design-system-example-components-html/src/components/checkbox/checkbox.mdx`（`fieldset.dads-form-control-label` 構造）+ `checkbox.css` |
| 総合判定 | ❌ 要修正 |
| 重大度 | medium |
| 検出差異数 | 7 |

## 観点別チェック

| 観点 | 公式 (正準値) | `@dads/vue` 現状 | 判定 | 備考 / 修正方針 |
| ---- | ------------- | ----------------- | ---- | ---------------- |
| タイポグラフィ (font-family / size / weight / line-height) | グループラベルは `form-control-label` 部品の `legend.dads-form-control-label__label` が担当 (`checkbox.mdx:128-134`)。子チェックボックスは `--font-family-sans`, `line-height:1.3` (`checkbox.css:159-167`) | legend: `font-size:var(--font-size-16,1rem)`, `font-weight:500`, `line-height:var(--line-height-150,1.5)`, `font-family:var(--font-family-sans)` (`DadsCheckboxGroup.vue:122,127-135`) | ⚠️ | font-family 一致。`font-weight:500` は非トークン値、line-height 1.5≠子 1.3。公式 form-control-label のタイポへ寄せる |
| カラー (背景 / 文字 / ボーダー: トークン参照) | 文字色は form-control-label / 子の `--color-neutral-solid-gray-800`。エラーは support-text / `aria-describedby` 経由 (`checkbox.css:161`, `mdx:129-134`) | `color:var(--color-text-primary,#1a1a1a)`; error `var(--color-error,#ec0000)`; hint `var(--color-text-secondary,#4d4d4d)`; required バッジ `var(--color-error,#ec0000)`/`var(--color-text-on-primary,#fff)` (`DadsCheckboxGroup.vue:123,138-139,170,174`) | ❌ | `--color-text-primary`/`--color-error`/`--color-text-secondary`/`--color-text-on-primary` は design-tokens に**不在**（直値フォールバック）。公式 `--color-neutral-solid-gray-800` / `--color-semantic-error-1` 系へ |
| 角丸 (`--border-radius-*`) | グループ自体は角丸なし。required バッジは form-control-label 仕様 (`mdx:131`) | required バッジ `border-radius:var(--border-radius-4,0.25rem)` (`DadsCheckboxGroup.vue:143`) | ⚠️ | fieldset 本体は角丸なし=一致。required の独自バッジは下記「正準流用」参照 |
| スペーシング (padding / gap / margin: `--spacing-*`) | fieldset リセット + form-control-label の support-text 余白。子は縦並びを単純配置 (`mdx:128-150`) | fieldset `gap:var(--spacing-8,.5rem)`; legend `gap:var(--spacing-8)`; items vertical `gap:var(--spacing-12,.75rem)` / horizontal `gap:var(--spacing-16,1rem)` (`DadsCheckboxGroup.vue:118,130,154,160`) | ❌ | **`--spacing-*` は design-tokens に 0 件 = 全て直値**。公式 form-control-label の余白段階へ要置換 |
| エレベーション / 影 (`--elevation-*`) | 該当なし（影なし） | 該当なし（影なし） | ✅ | 一致 |
| ボーダー (太さ / 色 / 有無) | fieldset の UA ボーダーをリセット（枠なし） (`mdx` の `dads-form-control-label` は枠なし) | `border:0` でリセット (`DadsCheckboxGroup.vue:121`) | ✅ | fieldset 枠リセットは一致 |
| 状態 (hover / focus-visible / active / current / disabled / expanded) | disabled は `<fieldset disabled>` で子を一括無効化（公式は子 input のグレートークン適用） (`checkbox.css:132-138`) | `<fieldset :disabled>` + legend を `opacity:.5` (`DadsCheckboxGroup.vue:73,181-183`) | ⚠️ | fieldset disabled 伝播は正しい。ただし子の disabled 見た目は DadsCheckbox 側の opacity 実装に依存（Checkbox 側課題を継承） |
| サイズバリアント (sm/md/lg 等) | サイズは子チェックボックスの `data-size` に集約。グループ自体のサイズ差分 CSS なし (`checkbox.css:13-38`) | `size` prop を子 DadsCheckbox に転送のみ。グループ CSS にサイズ差分なし (`DadsCheckboxGroup.vue:91`) | ✅ | 設計方針は公式同様（子へ委譲）。一致 |
| forced-colors / ハイコントラスト | 子 input 側で網羅 (`checkbox.css:140-157`) | legend を `CanvasText` (`DadsCheckboxGroup.vue:186-190`) | ✅ | legend のみだが妥当。子は Checkbox 側に依存 |
| 正準CSSの流用 vs 独自実装 (ドリフト温床) | グループは公式の **`fieldset.dads-form-control-label` + `legend.dads-form-control-label__label` + `__requirement` + `__support-text`** という独立部品で構成 (`checkbox.mdx:128-150`) | `fieldset.dads-checkbox-group` + `legend.dads-checkbox-group__legend` + `__required` を**独自クラスで再実装**。`dads-form-control-label` 部品を一切使わず (`DadsCheckboxGroup.vue:70-108`) | ❌ | **公式が共有部品 form-control-label に切り出している legend/required/support-text を独自 CSS で再実装。LanguageSelector と同型のドリフト温床。** 加えて required を `※必須` でなく独自バッジ表現 |

## 検出した差異 (修正対象)

1. **[medium]** 正準流用: 公式はグループラベルを共有部品 `dads-form-control-label`（`__label`/`__requirement`/`__support-text`）で構成。Vue は `dads-checkbox-group__legend`/`__required`/`__hint` を独自再実装。共有部品へ寄せるか、最低限クラス命名・構造を公式準拠に。
   - 該当行: `DadsCheckboxGroup.vue:70-108`, `127-145`
2. **[medium]** カラー誤トークン: `--color-text-primary` `--color-error` `--color-text-secondary` `--color-text-on-primary` は design-tokens 不在。公式 `--color-neutral-solid-gray-800` / `--color-semantic-error-1` へ。
   - 該当行: `DadsCheckboxGroup.vue:123,138-139,170,174`
3. **[medium]** スペーシング誤トークン: `--spacing-8/12/16` は design-tokens に 0 件（全直値）。公式の余白段階へ。
   - 該当行: `DadsCheckboxGroup.vue:118,130,154,160`
4. **[low]** required 表現: 公式は `※必須`（`__requirement`、`data-required`）。Vue は塗りつぶしバッジ（`padding:2px 8px` + 角丸 + 反転色）。公式表現に統一。
   - 該当行: `DadsCheckboxGroup.vue:78-81,137-145`
5. **[low]** タイポ: legend `font-weight:500`（非トークン）/ `line-height:1.5`。公式 form-control-label のタイポ・`--font-weight-*`(400/700) へ。
   - 該当行: `DadsCheckboxGroup.vue:132-133`
6. **[low]** disabled 見た目: legend `opacity:.5`。公式は子 input のグレートークン依存。子側修正と整合させる。
   - 該当行: `DadsCheckboxGroup.vue:181-183`
7. **[low]** 角丸誤適用: required バッジの `--border-radius-4`。公式の `※必須` 表現へ移行すれば不要。
   - 該当行: `DadsCheckboxGroup.vue:143`

## ハードコード / 誤トークンの洗い出し

- 誤トークン（design-tokens 不在 = 直値フォールバック描画）:
  - `--color-text-primary,#1a1a1a` (`:123`)、`--color-error,#ec0000` (`:138,173`)、`--color-text-on-primary,#fff` (`:139`)、`--color-text-secondary,#4d4d4d` (`:170`)
  - `--spacing-8` (`:118,130`)、`--spacing-12` (`:154`)、`--spacing-16` (`:160`)：spacing 系 0 件
- 直書き（var なし）:
  - `font-weight:500` (`:132`)、`font-weight:700` (`:142`)、`font-weight:500` (`:175`) — `--font-weight-*`(400/700) 未使用、500 は非トークン
  - `padding:2px 8px` (`:142`)、`line-height:1.2` (`:144`)、`opacity:.5` (`:182`)

## 結論

- **修正要否: 要修正 (medium)。** fieldset リセット・disabled 伝播・サイズ委譲は妥当だが、グループラベル部分が公式共有部品 `form-control-label` を無視した独自再実装で、色・余白トークンも実在しないものを参照。
- **優先度: 中。** 子の DadsCheckbox 修正（high）と同一フェーズで実施すべき。
- **想定 changeset: patch〜minor**（required 表現を `※必須` に変えると見た目変更で minor、トークン置換のみなら patch）。
- **API/aria 不変: 可能。** props/emits/`fieldset disabled`/`aria-describedby`/`legend` を維持しつつ CSS とラベル構造を公式準拠へ置換できる。
