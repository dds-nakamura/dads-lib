# Gap Report: `DadsRadioGroup`

> Issue #18 — DADS 公式とのビジュアル差異監査。1 コンポーネント 1 ファイル。

## メタ情報

| 項目 | 値 |
| ---- | ---- |
| Vue 実装 | `packages/vue/src/components/RadioGroup/DadsRadioGroup.vue` |
| 真実の源 (一次) | `example` (radio.css + form-control-label) |
| 参照パス | `design-system-example-components-html/src/components/radio/stacked.html` / `radio.css` / (補助) `components/form-control-label/` |
| 総合判定 | ❌ 要修正 |
| 重大度 | medium |
| 検出差異数 | 8 |

## 観点別チェック

| 観点 | 公式 (正準値) | `@dads/vue` 現状 | 判定 | 備考 / 修正方針 |
| ---- | ------------- | ----------------- | ---- | ---------------- |
| タイポグラフィ (font-family / size / weight / line-height) | グループは公式専用 CSS を持たず `fieldset.dads-form-control-label` を流用。legend (`__label`) は form-control-label.css 管轄、support-text も同様 (stacked.html:16-21) | `__legend` を独自定義: `font-size: var(--font-size-16)`、`font-weight: 500`、`line-height: var(--line-height-150,1.5)` (DadsRadioGroup.vue:127-129) | ⚠️ | 公式 radio には RadioGroup 用 CSS が無く form-control-label を使う構造。Vue は独自 legend を発明。form-control-label の値と未照合 |
| カラー (背景 / 文字 / ボーダー: トークン参照) | form-control-label 管轄 (要 form-control-label.css 照合)。エラー文字色は `--color-semantic-error-1` 系 | `--color-text-primary`/`--color-error`/`--color-text-secondary`/`--color-text-on-primary` を使用。**いずれも存在しないトークン名**で fallback 直値 (`#1a1a1a`/`#ec0000`/`#4d4d4d`/`#fff`) (DadsRadioGroup.vue:119,148-149,182,187,192) | ❌ | 全色を `--color-neutral-*` / `--color-semantic-error-1` に置換 |
| 角丸 (`--border-radius-*`) | 該当なし (グループ枠に角丸なし) | required バッジに `--border-radius-4` (DadsRadioGroup.vue:153) | ⚠️ | required バッジ自体が公式 radio/form-control-label の `data-required="true"` バッジと別実装 (公式は `※必須` テキスト、stacked.html:19) |
| スペーシング (padding / gap / margin: `--spacing-*`) | items 間隔は HTML 構造依存 (stacked では単純積み)。Radio 側の `padding-block: 8px` でクリック領域確保 | `gap: --spacing-8`、items `gap: --spacing-12`(vertical)/`--spacing-16`(horizontal)。**`--spacing-*` は DADS に存在しない**ため常に fallback (DadsRadioGroup.vue:117,160,170) | ❌ | `--spacing-*` は実在しない。`calc(N/16*1rem)` か実在スケールへ。vertical の項目間隔は公式の Radio 縦 padding に依存させるのが正準 |
| エレベーション / 影 (`--elevation-*`) | 該当なし | なし | ✅ | 該当なし |
| ボーダー (太さ / 色 / 有無) | 通常時 fieldset に枠なし。forced-colors 時のみ | `border: 0` (reset)、forced-colors 時 `1px solid CanvasText` (DadsRadioGroup.vue:111,204) | ✅ | 概ね妥当 |
| 状態 (hover / focus-visible / active / current / disabled / expanded) | disabled は `fieldset[disabled]` で子コントロールを無効化 (各 Radio が gray-50/gray-300 表示)。error は子 Radio の `aria-invalid` 経由 | `--disabled` で `opacity: 0.5` の一律ディミング、`--error __legend` を `--color-error` に。子へ `:error` を伝播 (DadsRadioGroup.vue:191-200) | ⚠️ | disabled の opacity ディミングは公式と不一致 (公式は各 Radio がトークン切替)。legend エラー色化は form-control-label の挙動と要照合 |
| サイズバリアント (sm/md/lg 等) | Radio 側の `data-size` で制御 | `size` prop を子 Radio に伝播するのみ (DadsRadioGroup.vue:86) | ✅ | 伝播のみ。Radio 側修正に追従 |
| forced-colors / ハイコントラスト | 公式に RadioGroup 専用ルールなし (子 Radio 側で対応) | fieldset に `1px solid CanvasText` + padding を独自付与 (DadsRadioGroup.vue:203-206) | ⚠️ | 公式に無い独自枠線。子 Radio 側で対応するのが正準 |
| 正準CSSの流用 vs 独自実装 (ドリフト温床) | 公式構造: `<fieldset.dads-form-control-label>` > `<legend.dads-form-control-label__label>`(+`__requirement`) > `<p.__support-text>` > `<div>`(Radio 群)。**専用の共有コンポーネント form-control-label を流用** (stacked.html:16-48) | `<fieldset.dads-radio-group>` 完全独自。legend/required/hint/error をすべて自前クラスで再実装 (DadsRadioGroup.vue:57-102,121-188) | ❌ | **form-control-label 共有部品の未流用**。公式は radio/checkbox/textarea 等で共通の form-control-label を使うが Vue は radio-group 専用 CSS を発明。LanguageSelector と同型のドリフト |

## 検出した差異 (修正対象)

1. **[high]** 正準CSSの流用: 公式は `dads-form-control-label` 共有部品 (legend=`__label`, 必須=`__requirement[data-required]`, 補足=`__support-text`) を流用。Vue は `dads-radio-group__legend`/`__required`/`__hint`/`__error` を独自実装。form-control-label 準拠へ寄せるべき。
   - 該当行: `DadsRadioGroup.vue:64-101,122-188`
2. **[high]** カラー: 存在しないトークン (`--color-text-primary`/`--color-error`/`--color-text-secondary`/`--color-text-on-primary`) → fallback 直値。公式 `--color-neutral-*`/`--color-semantic-error-1` へ。
   - 該当行: `DadsRadioGroup.vue:119,148-149,182,187,192`
3. **[medium]** スペーシング: `--spacing-8/12/16` (実在しない) を使用。公式に spacing トークンは無く `calc(N/16*1rem)` か実在スケールへ。
   - 該当行: `DadsRadioGroup.vue:117,160,170`
4. **[medium]** disabled: 公式は `fieldset[disabled]` で各 Radio をトークン切替表示。Vue は `opacity: 0.5` 一律ディミング。
   - 該当行: `DadsRadioGroup.vue:198-200`
5. **[medium]** 必須マーカー: 公式は `<span __requirement data-required="true">※必須</span>` テキストバッジ。Vue は `--color-error` 背景の塗りバッジ (`requiredLabel='必須'` default)。表現が公式と不一致。
   - 該当行: `DadsRadioGroup.vue:70-72,147-155`
6. **[low]** legend `font-weight`: Vue 500 / `line-height` 1.5。form-control-label の値と要照合 (未確認)。
   - 該当行: `DadsRadioGroup.vue:128-129`
7. **[low]** forced-colors: 公式に無い fieldset 枠線 (`1px solid CanvasText`) を独自付与。
   - 該当行: `DadsRadioGroup.vue:203-206`
8. **[low]** items の direction gap (vertical 12px / horizontal 16px) は公式 stacked の積み構造 (Radio の縦 padding 依存) と異なる固定 gap。
   - 該当行: `DadsRadioGroup.vue:160,163-171`

## ハードコード / 誤トークンの洗い出し

- 誤トークン (存在しない): `--color-text-primary`(L119), `--color-error`(L148,187,192), `--color-text-on-primary`(L149), `--color-text-secondary`(L182), `--spacing-8`(L117,125), `--spacing-12`(L160), `--spacing-16`(L170)。
- 直書き値: `padding: 2px 8px`(L152 required), `font-weight: 700`(L150), `line-height: 1.2`(L154), visually-hidden の `width/height: 1px; margin: -1px; clip: rect(0 0 0 0)`(L135-143 — 標準 sr-only パターンで許容範囲), forced-colors `1px solid CanvasText`(L204)。

## 結論

- **修正要否**: 要修正。最大の問題は公式 `form-control-label` 共有部品を流用せず RadioGroup 専用 CSS を発明している点 (ドリフト温床)。色トークンも全滅で fallback 動作。
- **優先度**: 中 (Radio 本体の修正が前提。Radio 修正後に form-control-label 流用へ寄せるのが筋)。
- **想定 changeset レベル**: minor（legend/required の DOM 構造が form-control-label 準拠に変わると CSS/スロット互換が変化。props API (`legend`/`required`/`error`/`hint`/`direction`/`size`/`items`) は維持可能）。
- **API/aria 不変**: `fieldset`/`legend` 構造・`aria-invalid`/`aria-describedby`・`role="alert"` エラーは維持可能。`requiredLabel` のデフォルト表現を公式 `※必須` に寄せると軽微な見た目変更あり。
