---
'@dads/vue': major
---

**柱A-3 / T1: 公式 `form-control-label` 構造への移行（破壊的変更）** — Issue #18

公式 DADS の共有部品 `dads-form-control-label`（ラベル / ※必須 / サポートテキスト / エラーテキスト / ステータスピル）を `DadsFormControlLabel` として新設し、フォーム部品のフィールドラベル層を公式構造へ統一した。

### 追加
- **`DadsFormControlLabel`**: `as`(`div`|`fieldset`) / `size`(sm/md/lg) / `label` / `labelFor` / `required` / `requiredLabel`(既定 `※必須`) / `optionalLabel` / `supportText(Id)` / `errorText(Id)` / `status` / `disabled`。スロット: default(コントロール) / label / support-text / error / status。

### 破壊的変更
- **必須マーカーが「塗りつぶしバッジ」→ 公式「※必須」表現**（`dads-form-control-label__requirement`）に変わる。
- **公開クラス名の変更**: 各コンポーネントの独自 `__legend` / `__required` / `__hint` / `__error` / `__footer` を撤廃し、公式 `dads-form-control-label__label` / `__requirement` / `__support-text` / `__error-text` に統一（InputText / Textarea / CheckboxGroup / RadioGroup）。単体 Checkbox / Radio は `__hint` を `__support-text` に改名し ※必須 表現へ。
- **`role="alert"` を撤去**（公式 a11y ガイドラインに従い error テキストに aria-live/alert を使わない）。
- これらのクラス名・必須表現に CSS / テストで依存している場合は要修正。

### 維持
- 公開 props（label/required/requiredLabel/hint/error/errorMessage/size/disabled、InputText の `align`・counter・prepend/append icon、Textarea の counter）は名称・意味を維持。
- InputText の公式 `align`（vertical / horizontal-left / horizontal-right / fixed-label）レイアウトを新構造（grid）で再実装し維持。

### 対象外（後続テーマ）
- input/checkbox/radio コントロール自身の正準構造作り直し（appearance:none・寸法 24/32/44 等）は **T4**、アイコンの inline SVG 化は **T5/柱B**。
