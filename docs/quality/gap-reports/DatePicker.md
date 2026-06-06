# Gap Report: `DadsDatePicker`

> Issue #18 — DADS 公式とのビジュアル差異監査。1 コンポーネント 1 ファイル。

## メタ情報

| 項目 | 値 |
| ---- | ---- |
| Vue 実装 | `packages/vue/src/components/DatePicker/DadsDatePicker.vue` |
| 真実の源 (一次) | `example` |
| 参照パス | `design-system-example-components-html/src/components/date-picker/date-picker.css` / `date-picker.js` |
| 総合判定 | ❌ 要修正 |
| 重大度 | high |
| 検出差異数 | 12 |

## 観点別チェック

| 観点 | 公式 (正準値) | `@dads/vue` 現状 | 判定 | 備考 / 修正方針 |
| ---- | ------------- | ----------------- | ---- | ---------------- |
| タイポグラフィ (font-family / size / weight / line-height) | `font-family: var(--font-family-sans)`, `font-size: calc(16/16*1rem)`, `font-weight: normal`, `line-height: 1.7`, `letter-spacing: 0.02em` (date-picker.css:1-10) | `font-family: var(--font-family-sans, ...)`, ルートに `font-size`/`line-height`/`letter-spacing` 指定なし (DadsDatePicker.vue:611) | ⚠️ | 公式は `line-height: 1.7` と `letter-spacing: 0.02em` をルートに設定。Vue 版は未設定。`__input { font: inherit }` 配下に伝播しないため数字の行間/字間が公式とズレる。ルートに追加すべき。 |
| カラー (背景 / 文字 / ボーダー: トークン参照) | 文字 `var(--color-neutral-solid-gray-800)`、枠 `var(--color-neutral-solid-gray-600)`、error `var(--color-semantic-error-1)`、error focus `var(--color-primitive-red-1000)` (css:3,25,53,57) | 文字 `var(--color-text-primary, #1a1a1a)`、枠 `var(--color-neutral-solid-gray-600, #595959)`、error `var(--color-error, #ec0000)` (vue:612,649,703) | ❌ | (1) 文字色トークンが公式 `--color-neutral-solid-gray-800` でなく `--color-text-primary`。(2) error が `--color-error` で公式 `--color-semantic-error-1` と不一致。(3) error 時の `:focus-within` で枠を `--color-primitive-red-1000` に濃くする規則が欠落。 |
| 角丸 (`--border-radius-*`) | inputs/input/popover `calc(8/16*1rem)`=8px、calendar-button `calc(6/16*1rem)`=6px、focus 時 button `calc(4/16*1rem)`=4px (css:24,123,255,286,330) | inputs `border-radius: 0.5rem` 直書き (vue:648)、input `0.5rem` (vue:746)、button `6px` 直書き (vue:773)、popover `8px` 直書き (vue:820)、separated `0.25rem` 直書き (vue:670) | ❌ | 公式は全て `calc(N/16*1rem)`。Vue は `var(--border-radius-8)` トークンを使わず `0.5rem`/`6px`/`8px`/`0.25rem` を直書き。トークン参照に置換すべき。 |
| スペーシング (padding / gap / margin: `--spacing-*`) | controls `column-gap: calc(16/16*1rem)`、inputs padding `2px ... 2px`、input `padding-right: calc(12/16*1rem)`、day `padding-right: 16px` (css:16,27,126,107) | controls `column-gap: var(--spacing-16, 1rem)`、inputs `padding: 2px 0 2px 2px` 直書き、input `padding-right: 0.75rem` 直書き、day `padding-right: 1rem` 直書き (vue:639,651,749,728) | ⚠️ | gap はトークン化済みだが padding 群が直書き。公式値とは一致するが `--spacing-*` 参照に揃えるのが望ましい。 |
| エレベーション / 影 (`--elevation-*`) | popover `box-shadow: var(--elevation-1)` (css:333) | popover `box-shadow: 0 4px 12px rgba(0,0,0,0.12)` 直書き (vue:823) | ❌ | 公式は `--elevation-1` トークン。Vue は独自の影値を直書き。`var(--elevation-1)` に置換すべき。 |
| ボーダー (太さ / 色 / 有無) | inputs `1px solid gray-600`、button `1px solid`(currentColor)、hover 時 button `border-width: calc(3/16*1rem)` + padding 補正、popover `1px solid gray-420` (css:25,256,277-280,331) | inputs `1px solid gray-600`、button `1px solid currentColor`、popover `1px solid gray-420`。ただし button hover 時の `border-width: 3px` + padding 縮小が欠落 (vue:649,774,821) | ❌ | calendar-button の hover で公式は枠を 3px に太らせ padding を 10px に詰める。Vue にはこの hover 演出が無い。 |
| 状態 (hover / focus-visible / active / current / disabled / expanded) | input focus: `outline: 4px solid black; outline-offset: 2px; box-shadow: 0 0 0 2px yellow-300` (css:133-138)。button focus 同様 4px outline + 2px shadow (css:283-288)。disabled `color: gray-300` (css:293) | input focus-visible: `outline: 2px solid black !important; box-shadow: 0 0 0 4px yellow-300` (vue:754-758) — outline 2px / shadow 4px が**公式と逆**。`!important` 付き。expanded chevron rotate は一致 | ❌ | フォーカスリングの太さが公式(outline 4px / shadow 2px)と逆転(outline 2px / shadow 4px)。`!important` も公式に無い。共有 focus-ring mixin に寄せて公式値に合わせるべき。 |
| サイズバリアント (sm/md/lg 等) | inputs/button 高さ sm 40px / md 48px / lg 56px (css:30-40,263-273) | sm 2.5rem / md 3rem / lg 3.5rem (vue:681-689,792-800) — 40/48/56px と一致 | ✅ | 高さは公式と一致。 |
| forced-colors / ハイコントラスト | inputs focus-within `Highlight`、hover `Highlight`、disabled `ButtonFace`/`GrayText`、readonly `currentcolor`、button disabled `GrayText` (css:71-91,297-302) | forced-colors: inputs border `CanvasText`、focus-within `Highlight`、disabled `ButtonFace`/`GrayText`、readonly `currentcolor`、popover/date 対応あり (vue:959-981) | ⚠️ | 概ね対応。公式は hover も `Highlight` 化、calendar-button disabled の `GrayText` 化を持つが Vue に該当規則なし。軽微。 |
| 正準CSSの流用 vs 独自実装 (ドリフト温床) | consolidated/separated 2 variant。separated は専用クラス `__separated-inputs`/`__separated-input`(幅72px/56px,中央寄せ,絶対配置ラベル) を持つ独立構造 (css:144-248)。カレンダーは別 web-component `dads-calendar` (js:106,224) | Vue は separated を `--variant-separated` 修飾で既存 `__inputs` を組み替え(border 解除+各 field に border)。`__separated-input` 構造を再現せず独自実装。カレンダーグリッドも Vue 内で自前実装 | ❌ | **最重要ドリフト**: 公式の separated variant は別 DOM 構造(中央寄せ72px入力 + 絶対配置ラベル)。Vue は consolidated を流用した独自の見た目で公式と乖離。separated は公式 `__separated-*` 構造の再現が必要。 |

## 検出した差異 (修正対象)

1. **[high]** カラー: error トークン誤り。公式 `var(--color-semantic-error-1)` → 現状 `var(--color-error, #ec0000)`。`--color-semantic-error-1` に置換。
   - 該当行: `DadsDatePicker.vue:703`, `:947`, `:625`(required 背景も同様)
2. **[high]** 状態: input フォーカスリングの outline/shadow 太さが公式と逆転。公式 `outline:4px / shadow:2px` → 現状 `outline:2px !important / shadow:4px`。
   - 該当行: `DadsDatePicker.vue:754-758`
3. **[high]** 正準CSS流用: separated variant が公式 `__separated-input`(72px中央寄せ+絶対配置ラベル) 構造を再現せず独自実装。
   - 該当行: `DadsDatePicker.vue:658-671`
4. **[medium]** エレベーション: popover 影が直書き。公式 `var(--elevation-1)` → 現状 `0 4px 12px rgba(0,0,0,0.12)`。
   - 該当行: `DadsDatePicker.vue:823`
5. **[medium]** 角丸: 直書き値多数。公式 `calc(8/16*1rem)`/`calc(6/16*1rem)` → 現状 `0.5rem`/`6px`/`8px`/`0.25rem`。`var(--border-radius-*)` に置換。
   - 該当行: `DadsDatePicker.vue:648`, `:746`, `:759`, `:773`, `:820`, `:670`
6. **[medium]** ボーダー: calendar-button hover の `border-width:3px` + padding 詰め演出が欠落。
   - 該当行: `DadsDatePicker.vue:767-790` (hover ブロック不在)
7. **[medium]** カラー: error 時 `:focus-within` で枠を `--color-primitive-red-1000` に濃くする規則が欠落。
   - 該当行: `DadsDatePicker.vue:701-703` (focus-within 分岐なし)
8. **[low]** タイポグラフィ: ルートの `line-height: 1.7` / `letter-spacing: 0.02em` 欠落。
   - 該当行: `DadsDatePicker.vue:607-613`
9. **[low]** カラー: 文字色トークンが公式 `--color-neutral-solid-gray-800` でなく `--color-text-primary`。
   - 該当行: `DadsDatePicker.vue:612`
10. **[low]** スペーシング: input padding 群が直書き(`0.75rem`/`1rem`)。`--spacing-*` 参照へ。
    - 該当行: `DadsDatePicker.vue:651`, `:749`, `:728`
11. **[low]** forced-colors: hover の `Highlight` 化 / calendar-button disabled の `GrayText` 化が欠落。
    - 該当行: `DadsDatePicker.vue:959-981`
12. **[low]** カラー: separated の field border が `--color-neutral-solid-gray-600` 直値フォールバック `#595959` — 公式は readonly/disabled で border 色を変える挙動あり(再現不足)。
    - 該当行: `DadsDatePicker.vue:668`

## ハードコード / 誤トークンの洗い出し

- `border-radius: 0.5rem`（直書き / トークン外）— `DadsDatePicker.vue:648`, `:746`, `:759`
- `border-radius: 6px`（直書き）— `DadsDatePicker.vue:773`
- `border-radius: 8px`（直書き）— `DadsDatePicker.vue:820`
- `border-radius: 0.25rem`（separated, 直書き）— `DadsDatePicker.vue:670`
- `box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12)`（直書き / `--elevation-1` 未使用）— `DadsDatePicker.vue:823`
- `padding: 2px 0 2px 2px`（直書き）— `DadsDatePicker.vue:651`
- `padding-right: 0.75rem`（直書き）— `DadsDatePicker.vue:749`
- `padding-right: 1rem`（直書き）— `DadsDatePicker.vue:728`
- `padding: 2px 8px`（required マーカー, 直書き）— `DadsDatePicker.vue:629`
- 誤トークン `var(--color-error)`（公式は `--color-semantic-error-1`）— `DadsDatePicker.vue:625`, `:703`, `:947`
- 誤トークン `var(--color-text-primary)`（公式は `--color-neutral-solid-gray-800`）— `DadsDatePicker.vue:612`
- 注: `var(--border-radius-4, 0.25rem)` 形式(vue:630)はフォールバック直値なので許容。

## 結論

- **修正要**: 優先度 **高**。トークン誤り(error 色)・フォーカスリング逆転・separated variant の構造ドリフトが視覚的に明確な差異を生む。
- 想定 changeset レベル: **minor**（CSS の見た目が複数箇所で変わる。特に separated variant の再構築はビジュアル変化が大きい）。
- API / aria: props・emits・aria 属性に変更不要なため **API/aria 不変を保てる**（CSS とクラス構造の修正に限定可能。ただし separated を公式 `__separated-*` 構造へ寄せる場合はテンプレート DOM の追加が伴う）。
