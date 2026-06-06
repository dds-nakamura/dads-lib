# Gap Report: `DadsInputText`

> Issue #18 — DADS 公式とのビジュアル差異監査。1 コンポーネント 1 ファイル。

## メタ情報

| 項目 | 値 |
| ---- | ---- |
| Vue 実装 | `packages/vue/src/components/InputText/DadsInputText.vue` |
| 真実の源 (一次) | `example` |
| 参照パス | `design-system-example-components-html/src/components/input-text/input-text.css` / `.mdx` / `form-control-label/form-control-label.css` |
| 総合判定 | ❌ 要修正 |
| 重大度 | high |
| 検出差異数 | 9 |

## 観点別チェック

| 観点 | 公式 (正準値) | `@dads/vue` 現状 | 判定 | 備考 / 修正方針 |
| ---- | ------------- | ----------------- | ---- | ---------------- |
| タイポグラフィ (font-family / size / weight / line-height) | コンテナ: `font-size: 16/16rem`, `line-height: 1.7`, `letter-spacing: 0.02em`, `font-family: var(--font-family-sans)`。input は `font: inherit` + `line-height:1`。ラベル font-weight: bold (form-control-label) | `font-family: var(--font-family-sans, …)`、ラベル `font-weight: 500`、footer/hint `font-size: var(--font-size-14)`、`line-height: var(--line-height-150,1.5)`。`letter-spacing` 未指定 | ⚠️ | `letter-spacing: 0.02em` と `line-height: 1.7` が欠落。ラベルは公式 bold(700) に対し 500。公式 `--font-family-sans` のトークン名は一致 |
| カラー (背景 / 文字 / ボーダー: トークン参照) | 文字 `--color-neutral-solid-gray-900`(入力値) / `-800`(コンテナ)、ボーダー `--color-neutral-solid-gray-600`、背景 `--color-neutral-white`、エラー `--color-semantic-error-1`、disabled `--color-neutral-solid-gray-300/50/420` | 文字 `--color-text-primary`、ボーダー `--color-border-default`、背景 `--color-bg-surface`、エラー `--color-error`、disabled は `opacity:0.5` | ❌ | トークン名前空間が公式と完全に別物。`--color-text-primary` / `--color-border-default` / `--color-bg-surface` / `--color-error` は DADS 公式トークンに存在しない独自命名。公式 `--color-neutral-*` / `--color-semantic-error-1` 系へ置換が必要 |
| 角丸 (`--border-radius-*`) | `border-radius: calc(8/16*1rem)` = **8px** (input-text.css:17) | `border-radius: var(--border-radius-4, 0.25rem)` = **4px** (DadsInputText.vue:225) | ❌ | 公式 8px に対し現状 4px。`--border-radius-8`(0.5rem) へ修正必須 |
| スペーシング (padding / gap / margin: `--spacing-*`) | input padding `calc(12/16rem) calc(16/16rem)` = 12px/16px (全サイズ共通)。エラーテキスト `margin: 8/16rem 0 0 0` | sm/md は padding `0 var(--spacing-12)`、lg は `0 var(--spacing-16)`。縦 padding は min-height で代替。gap `--spacing-4` | ⚠️ | 公式は左右 padding 16px 固定だが現状はサイズ別 (12/12/16px)。md(48px) で公式 16px に対し 12px とずれる |
| エレベーション / 影 (`--elevation-*`) | 影なし (focus 時のみ box-shadow=yellow ring) | 影なし | ✅ | 該当なし (input にエレベーション無し) |
| ボーダー (太さ / 色 / 有無) | `1px solid --color-neutral-solid-gray-600`。readonly は `border-style: dashed`(色は維持)。error は `--color-semantic-error-1` | `1px solid --color-border-default`。readonly `dashed` + `--color-bg-subtle` 背景追加。error `--color-error` | ⚠️ | 太さ 1px は一致。色トークンが独自。readonly に公式に無い背景色を追加している (公式は border-style 変更のみ) |
| 状態 (hover / focus-visible / active / current / disabled / expanded) | hover: `:not(:read-only)` で border `--color-neutral-black`。focus-visible: `outline 4px black + offset 2px + box-shadow 2px yellow-300`。invalid hover: border `--color-primitive-red-1000`。disabled: border/bg/text を gray-300/50/420 | hover: border `--color-text-primary`。focus: 共有 `dads-focus-ring-within` = outline 2px black + box-shadow 4px yellow-300。disabled: `opacity:0.5` + `pointer-events:none` | ❌ | (1) focus outline 公式 **4px** に対し現状 **2px**、offset 公式 2px に対し 0。(2) disabled を opacity で表現 (公式は専用カラートークン)。これはアンチパターン (コントラスト劣化)。(3) invalid hover の濃色化が無い |
| サイズバリアント (sm/md/lg 等) | 高さ固定 `height`: sm=2.5rem(36px※MDは36), md=3rem(48px), lg=3.5rem(56px)。**font-size はサイズ非依存で 16px** (`font:inherit`) | min-height: sm `calc(2.5rem-2px)`, md `calc(3rem-2px)`, lg `calc(3.5rem-2px)`。font-size をサイズ別に変える (sm14/md16/lg18) | ⚠️ | 高さは一致 (border 分減算は妥当)。ただし公式は **全サイズ font 16px 固定**。現状は sm=14/lg=18 に変えており公式とタイポが異なる。※MD仕様の Small=36px=2.25rem だが example は 2.5rem。example 優先で 2.5rem は許容 |
| forced-colors / ハイコントラスト | disabled 時 `border-color: GrayText; color: GrayText` (input-text.css:68-74) | `&__control { border: 1px solid CanvasText }` のみ | ⚠️ | disabled の GrayText 対応が無い。公式は disabled に特化した forced-colors ルールを持つ |
| 正準CSSの流用 vs 独自実装 (ドリフト温床) | 公式は `dads-input-text` (input 単体) + 別部品 `dads-form-control-label` (label/requirement/support/error) の **2 部品合成**。input 自身がボーダー/角丸/focus を持つ | label・requirement・hint・error・counter・icon を **すべて自前 1 ファイルに再実装**。ボーダー/focus を input ではなく wrapper `__control` に移設 | ❌ | 公式の「input と form-control-label を分離」構造を無視し独自合成。focus ring を wrapper の `:focus-within` に移したため公式の input 単体 focus と挙動・スタイルが乖離。counter / prepend/append icon は公式 input-text に存在しない独自拡張 |

## 検出した差異 (修正対象)

1. **[high]** 角丸: 公式 `8px` (`calc(8/16*1rem)`) → 現状 `4px` (`var(--border-radius-4, 0.25rem)`)。`--border-radius-8` (0.5rem) へ修正。
   - 該当行: `DadsInputText.vue:225`
2. **[high]** focus-visible: 公式 `outline: 4px solid black; outline-offset: 2px; box-shadow: 0 0 0 2px yellow-300` → 現状 共有 mixin `outline: 2px black; offset 0; box-shadow 4px yellow-300`。outline 太さ/offset と box-shadow 幅が逆転。
   - 該当行: `DadsInputText.vue:230` (`@include ring.dads-focus-ring-within`) / `src/styles/_focus-ring.scss`
3. **[high]** カラートークン名前空間: 公式 `--color-neutral-solid-gray-*` / `--color-semantic-error-1` → 現状 `--color-text-primary` / `--color-border-default` / `--color-bg-surface` / `--color-error` (DADS 公式に存在しない独自命名)。
   - 該当行: `DadsInputText.vue:159,207,223,224,253,267,271,321,327,336`
4. **[high]** disabled 表現: 公式は専用カラートークン (border gray-300 / bg gray-50 / text gray-420) → 現状 `opacity: 0.5`。opacity はテキストコントラストを劣化させるアンチパターン。
   - 該当行: `DadsInputText.vue:331-338`
5. **[medium]** 構造ドリフト: 公式は `dads-input-text`(input単体) と `dads-form-control-label`(別部品) の合成。現状は label/required/hint/error を 1 ファイルに自前再実装し、focus ring を input ではなく `__control` wrapper に移設。
   - 該当行: `DadsInputText.vue:102-147,219-231`
6. **[medium]** サイズ別 font-size: 公式は全サイズ 16px 固定 (`font: inherit`) → 現状 sm=14 / md=16 / lg=18 と可変。
   - 該当行: `DadsInputText.vue:284,293,302`
7. **[medium]** invalid hover 濃色化欠落: 公式 invalid:hover で border `--color-primitive-red-1000` → 現状 error 時 hover ルール無し (hover は error を除外)。
   - 該当行: `DadsInputText.vue:319-322`
8. **[low]** readonly: 公式は `border-style: dashed` のみ → 現状 dashed + `--color-bg-subtle` 背景を追加 (公式に無い)。
   - 該当行: `DadsInputText.vue:325-328`
9. **[low]** タイポ: 公式 `letter-spacing: 0.02em` / `line-height: 1.7` (コンテナ)、ラベル font-weight bold(700) → 現状 letter-spacing 未指定、ラベル 500。
   - 該当行: `DadsInputText.vue:154-159,197-204`

## ハードコード / 誤トークンの洗い出し

- `DadsInputText.vue:211` `padding: 2px 8px` — 必須バッジの直書き px。`--spacing-*` トークン化を検討 (var フォールバックではなく素の直値)。
- `DadsInputText.vue:214` `line-height: 1.2` — 直値 (バッジ)。
- `DadsInputText.vue:254` `font-size: 1.25em` — アイコンの相対直値 (許容範囲だがトークン外)。
- `DadsInputText.vue:283,292,301` `min-height: calc(3.5rem - 2px)` 等 — rem 直書き。公式は `height` トークン化されていないため許容だが、`--size-*` があれば置換候補。
- 上記カラー var() 群 (`--color-text-primary` 等) はフォールバック直値 (`#1a1a1a` 等) を持つが、**変数名自体が DADS 公式に無い独自命名**であり「誤トークン」に該当 (差異 #3)。

## 結論

- **修正要 / 優先度 high**。example が存在する唯一の対象であり、公式正準値との乖離 (角丸 4px↔8px、focus ring 太さ逆転、独自カラー名前空間、opacity disabled) が明確。
- 想定 changeset レベル: **minor**。CSS の見た目変更が広範 (角丸・focus・色・disabled) で視覚回帰が発生するため patch 扱いは不適切。
- API / aria 不変は保てる: props (`size`/`error`/`readonly`/`disabled`/`align` 等) と aria 属性 (`aria-invalid`/`aria-required`/`aria-describedby`/`role="alert"`) は維持したまま CSS トークン・focus mixin の差し替えで対応可能。ただし `role="alert"` は公式 a11y ガイドライン (input-text/index.md「aria-live および alert ロールの禁止」) に反するため別途 **要再検討** (footer error の `role="alert"` を撤去すべき)。
</content>
</invoke>
