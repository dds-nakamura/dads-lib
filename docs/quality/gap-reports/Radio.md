# Gap Report: `DadsRadio`

> Issue #18 — DADS 公式とのビジュアル差異監査。1 コンポーネント 1 ファイル。

## メタ情報

| 項目 | 値 |
| ---- | ---- |
| Vue 実装 | `packages/vue/src/components/Radio/DadsRadio.vue` |
| 真実の源 (一次) | `example` |
| 参照パス | `design-system-example-components-html/src/components/radio/radio.css` / `all-radios.html` / `stacked.html` |
| 総合判定 | ❌ 要修正 |
| 重大度 | high |
| 検出差異数 | 12 |

## 観点別チェック

| 観点 | 公式 (正準値) | `@dads/vue` 現状 | 判定 | 備考 / 修正方針 |
| ---- | ------------- | ----------------- | ---- | ---------------- |
| タイポグラフィ (font-family / size / weight / line-height) | `font-family: var(--font-family-sans)`、ラベル `font-size: var(--_label-font-size)` (sm/md=16px, lg=17px)、`font-weight: normal`、`line-height: 1.3`、`letter-spacing: 0` (radio.css:152-160) | `font-family: var(--font-family-sans,…)` は一致するが、サイズが `--font-size-18/16/14`(lg/md/sm) で公式の 17/16/16 と不一致。`line-height: var(--line-height-150, 1.5)` で公式 1.3 と不一致 (DadsRadio.vue:124,221-229) | ❌ | ラベル `line-height` を 1.3 に、サイズを公式 (sm/md=16, lg=17) に合わせる |
| カラー (背景 / 文字 / ボーダー: トークン参照) | 背景 `--color-neutral-white`、ボーダー `--color-neutral-solid-gray-600`、accent `--color-primitive-blue-900`、hover accent `--color-primitive-blue-1100`、border-hover `--color-neutral-black`、ラベル文字 `--color-neutral-solid-gray-800` (radio.css:62-65,154) | `--color-bg-surface`/`--color-border-default`/`--color-primary`/`--color-text-primary`/`--color-text-secondary` 等を使用。**いずれも design-tokens に存在しないトークン名** で常にハードコード fallback (`#fff`/`rgba(0,0,0,.5)`/`#0017c1`/`#1a1a1a` 等) に落ちる (DadsRadio.vue:113,148-149,163,186,192,244) | ❌ | 全色を公式の `--color-primitive-*` / `--color-neutral-*` / `--color-semantic-error-1` に置換 |
| 角丸 (`--border-radius-*`) | ラジオ本体 `border-radius: 50%`/`51%` (円形)、required バッジは radio.css に存在せず (form-control-label 管轄) | indicator `border-radius: 50%` は一致。`__required` バッジに `--border-radius-4` を独自付与 (DadsRadio.vue:197) | ⚠️ | 円形は一致。required バッジ自体が公式 radio.css に無い独自実装 (下記参照) |
| スペーシング (padding / gap / margin: `--spacing-*`) | gap `var(--_gap)` (sm=4/md=8/lg=12px)、ラベルクリック領域 `padding-block: 8px`、`--_label-padding-top` (sm=1px/md=4px/lg=10px) (radio.css:8-11,13-41,153) | gap に `--spacing-8/--spacing-4` を使用するが **`--spacing-*` トークンは DADS に存在しない**ため常に fallback。サイズ別 gap (4/8/12) と label-padding-top を再現していない (DadsRadio.vue:111,122,176,182) | ❌ | gap をサイズ別 (4/8/12px) に。`--spacing-*` は実在しないため `calc(N/16*1rem)` か実在トークンへ。クリック領域の縦 padding 8px を追加 |
| エレベーション / 影 (`--elevation-*`) | 該当なし (radio に box-shadow なし。focus-ring の box-shadow のみ) | focus 時 box-shadow のみ | ✅ | 該当なし |
| ボーダー (太さ / 色 / 有無) | ボーダー幅 `--_radio-border-width` (sm/md=2px, lg=3px)、色 `--color-neutral-solid-gray-600`、checked 時 `--color-primitive-blue-900` (radio.css:18,28,38,75,91) | ボーダー固定 `2px`、色 `--color-border-default`(=fallback `rgba(0,0,0,.5)`)、checked `--color-primary` (DadsRadio.vue:149,234) | ❌ | lg のボーダー 3px を追加。色を公式トークンに。fallback `rgba(0,0,0,.5)` は公式 gray-600 と不一致 |
| 状態 (hover / focus-visible / active / current / disabled / expanded) | hover: `__radio:has(:hover)` 背景 `--color-neutral-solid-gray-420`、input hover ボーダー `--color-neutral-black`。focus: input 自身に `outline: 4px solid black; outline-offset: 2px; box-shadow: 0 0 0 2px yellow-300` (radio.css:53-59,78-82,84-98)。disabled: base `gray-50`/accent `gray-300`/border `gray-300` (radio.css:127-133) | hover は `__label:hover __indicator` のボーダーを `--color-text-primary` に変える独自挙動。focus は共有 `dads-focus-ring` (2px outline + 4px yellow shadow) を**非表示の input** に適用。disabled は `opacity: 0.5` の一律ディミングのみ (DadsRadio.vue:139,243-244,248-251) | ❌ | focus リングの値が公式と逆 (公式 4px outline/2px shadow、Vue 2px outline/4px shadow)。disabled は opacity でなく公式の gray-50/gray-300 トークン切替に。hover 背景リング (gray-420) が欠落 |
| サイズバリアント (sm/md/lg 等) | radio-size 24/32/44px、outer 20/26/36px、inner 10/12/16px、border 2/2/3px、label 16/16/17px (radio.css:13-41) | `--dads-radio-size` 16/20/24px (sm/md/lg)、inner は 50% 比率、border 固定 2px (DadsRadio.vue:133,219-230,237-239) | ❌ | 全サイズ寸法が公式と不一致。クリックターゲット用 outer wrapper (`__radio`) が存在しない |
| forced-colors / ハイコントラスト | input の CSS 変数を `Highlight`/`ButtonText`/`GrayText`(disabled) に切替 (radio.css:135-150) | `__indicator` を `CanvasText`/`Canvas` border + `CanvasText` 内丸に切替 (DadsRadio.vue:262-271) | ⚠️ | 方向性は妥当だが公式は `Highlight`/`ButtonText`/`GrayText` を使用。システムカラーの選択が公式と不一致 |
| 正準CSSの流用 vs 独自実装 (ドリフト温床) | 構造: `<label.dads-radio>` > `<span.dads-radio__radio>`(中央寄せ wrapper) > `<input.dads-radio__input appearance:none>`(**input 自身が可視コントロール**) + `<span.dads-radio__label>` (all-radios.html:17-22) | `<div.dads-radio>` > `<label>` > 透明 input(`opacity:0`) + 独自 `<span.dads-radio__indicator>`(疑似コントロール) + `__text`/`__title`/`__description`/`__footer`/`__required` (DadsRadio.vue:67-101) | ❌ | **全面的な独自再実装**。公式は input を `appearance:none` で直接スタイルするが Vue は input を隠して疑似要素を描画。`__indicator`/`__text`/`__required`/`__description`/`__hint`/`__error`/`__footer` はすべて公式 radio.css に存在しないクラス。最重要ドリフト |

## 検出した差異 (修正対象)

1. **[high]** 正準CSSの流用: 公式は input 自身を可視コントロール化、Vue は input 非表示+`__indicator` 疑似要素。クラス体系ごと別物。公式 `__radio`/`__input` 構造へ再構築。
   - 該当行: `DadsRadio.vue:81` (`__indicator`), `DadsRadio.vue:136` (`opacity: 0`)
2. **[high]** カラー: 全色が存在しないトークン (`--color-primary`/`--color-text-primary`/`--color-error`/`--color-bg-surface`/`--color-border-default`/`--color-text-secondary`/`--color-text-on-primary`) → 常に fallback 値。公式 `--color-primitive-blue-900`/`--color-neutral-*`/`--color-semantic-error-1` へ。
   - 該当行: `DadsRadio.vue:113,148-149,163,186,192,234,244,255,258`
3. **[high]** サイズ寸法: radio 24/32/44 (公式) vs 16/20/24 (Vue)、inner 10/12/16 vs 50% 比率、border 2/2/3 vs 固定 2。
   - 該当行: `DadsRadio.vue:219-230,237-239`
4. **[high]** focus リング値が公式と逆: 公式 `outline 4px / offset 2px / shadow 2px yellow-300`、Vue `outline 2px / shadow 4px yellow-300`。さらに非表示 input に適用するため見た目が崩れる。
   - 該当行: `DadsRadio.vue:139`, `_focus-ring.scss:10-12`
5. **[medium]** disabled: 公式は base=gray-50/accent=gray-300/border=gray-300 のトークン切替、Vue は `opacity: 0.5` の一律ディミング。
   - 該当行: `DadsRadio.vue:248-251`
6. **[medium]** hover: 公式は `__radio` wrapper に背景 `gray-420` リング + input border を black へ。Vue は border を `--color-text-primary` に変えるのみ。
   - 該当行: `DadsRadio.vue:243-245`
7. **[medium]** ラベル `line-height`: 公式 1.3、Vue `--line-height-150`(1.5)。
   - 該当行: `DadsRadio.vue:124`
8. **[low]** ラベルサイズ: lg は公式 17px、Vue は `--font-size-18`(18px)。
   - 該当行: `DadsRadio.vue:221`
9. **[low]** スペーシング: gap を `--spacing-8`(実在しない) 固定。公式はサイズ別 4/8/12px。
   - 該当行: `DadsRadio.vue:111,122,176,182`
10. **[medium]** クリックターゲット縦 padding: 公式は `.dads-radio:has(__label:not(:empty))` に `padding-block: 8px`。Vue に該当無し。
    - 該当行: 公式 `radio.css:8-11` に対応する実装が DadsRadio.vue に欠落
11. **[low]** forced-colors: 公式は `Highlight`/`ButtonText`/`GrayText`、Vue は `CanvasText`/`Canvas`。
    - 該当行: `DadsRadio.vue:262-271`
12. **[low]** `__required`/`__description`/`__hint`/`__error`/`__footer` は公式 radio.css に存在しない独自拡張 (公式は form-control-label が担当)。API としては有用だが公式ビジュアルと未照合。
    - 該当行: `DadsRadio.vue:185-216`

## ハードコード / 誤トークンの洗い出し

- 誤トークン (存在しないトークン名 → 常に fallback): `--color-text-primary`(L113,244), `--color-bg-surface`(L148), `--color-border-default`(L149), `--color-primary`(L163,234), `--color-text-secondary`(L186,210), `--color-error`(L192,213,255,258), `--color-text-on-primary`(L193), `--spacing-4`(L111,176), `--spacing-8`(L122,182,204), `--spacing-12`/`--spacing-16` (RadioGroup 経由) — DADS に `--color-primary` 系・`--spacing-*` 系は存在しない。
- 直書き値 (var() フォールバックではない素の直値): `padding: 2px 8px`(L196 required), `font-weight: 700`(L195), `line-height: 1.2`(L198), `border: 2px solid`(L149,264 — 幅が直値)、transition `0.15s`(L151-153,164-166)。
- 円比率の `width/height: 50%`(L237-238) は公式の固定 px (inner 10/12/16) と異なる近似。

## 結論

- **修正要否**: 要修正 (全面的)。公式 radio.css とは構造・クラス・寸法・色・状態すべてが乖離した独自実装で、参照しているトークン名の大半が存在せず fallback 直値で動作している。
- **優先度**: 高 (Radio は RadioGroup / ResourceList(with-control) の基盤部品でドリフトが波及)。
- **想定 changeset レベル**: minor（DOM 構造・クラス名が大きく変わり CSS 互換が崩れるが、Vue の props/emit API は維持可能なら patch ではなく minor が妥当。`__required`/`__description` 等の独自スロットを残すか公式準拠にするかで major 化の可能性あり）。
- **API/aria 不変**: props (`size`/`disabled`/`required`/`error`/`modelValue`/`value`/`name`) と emit は維持可能。`role`/`aria-describedby`/`aria-invalid`/`aria-required` も維持可能。内部クラス名 (`__indicator` 等) は非公開のため変更可。

## T4 解消

Issue #18 / T4 (案X フル) で公式正準構造へ全面リワークし、上記 12 件の差異をすべて解消した。**意図的な MAJOR 破壊的変更**。

- **正準構造へ刷新**: `<div>` + 隠し input(`opacity:0`) + 疑似 `__indicator` という独自実装を廃止し、公式 `radio.css` / `all-radios.html` 準拠の `<label.dads-radio[data-size]>` > `<span.dads-radio__radio>`(中央寄せ wrapper) > `<input.dads-radio__input>` + `<span.dads-radio__label>` に再構築。**可視コントロールは `appearance: none` を適用した input 自身**で、疑似要素は使わない。クラス名は公式と完全一致。
- **寸法/ボーダー/内丸の忠実化**: `data-size` ごとに公式値を再現 — クリック領域 24/32/44px、リング 20/26/36px、**内丸は固定 px 10/12/16 (旧 50% 比率を廃止)**、ボーダー 2/2/3px、gap 4/8/12px、label-padding-top 1/4/10px、label-font-size 16/16/17px、line-height 1.3。ラベルがある場合の `padding-block: calc(8/16*1rem)` クリックターゲットも追加。
- **カラーを正準トークンへ**: 存在しないトークン (`--color-primary` / `--color-text-primary` / `--color-bg-surface` / `--color-border-default` / `--spacing-*` 等) を全廃し、公式の `--color-primitive-blue-900/1100` / `--color-primitive-red-1000` / `--color-neutral-white/black/solid-gray-50/300/420/600/800` / `--color-semantic-error-1` / `--color-primitive-yellow-300` に置換 (comma fallback 付き)。
- **状態の忠実化**: focus は input 自身に `outline 4px / offset 2px / box-shadow 2px yellow-300` (公式値)。hover は `__radio` wrapper の背景リング (`gray-420`) + input border を black へ。checked / disabled / `aria-invalid` は公式同様 `--_accent-color` / `--_border-color` などの CSS 変数切替で表現 (disabled は `opacity` でなく gray-50/gray-300 トークン)。forced-colors は `Highlight` / `ButtonText` / `GrayText` にマッピング。
- **Vue 独自サブ要素を削除 → FCL へ委譲**: `__required` / `__description` / `__hint` / `__error` / `__footer` と対応プロップ (`required` / `requiredLabel` / `description` / `hint` / `errorMessage`) を撤廃。ラベル / 必須 / 補足 / エラー / 項目説明は公式同様 `DadsFormControlLabel` (= `DadsRadioGroup`) が担当する。`DadsRadio` に残すのは `modelValue` / `value` / `size` / `label` / `error` / `disabled` / `name` / `id` と、グループからの説明文配線用 `ariaDescribedby` のみ。
- **RadioGroup 追随**: 項目ごとの `item.hint` / `item.description` は `DadsRadioGroup` が `dads-form-control-label__support-text` 付き `<p>` として描画し、各 `DadsRadio` の `aria-describedby` に配線する形へ移行。既存テストの `dads-radio--{size}` / `dads-radio--error` アサーションは `data-size` 属性 / input の `aria-invalid` 検証へ更新。
- **検証**: `@dads/vue` typecheck / eslint (Radio + RadioGroup) クリーン、Radio + RadioGroup のユニットテスト 84 件グリーン (axe 含む)。
- **総合判定**: ❌ 要修正 → ✅ 解消 (公式正準構造に一致)。
