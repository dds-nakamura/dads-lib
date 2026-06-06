# Gap Report: `DadsDialog`

> Issue #18 — DADS 公式とのビジュアル差異監査。1 コンポーネント 1 ファイル。

## メタ情報

| 項目 | 値 |
| ---- | ---- |
| Vue 実装 | `packages/vue/src/components/Dialog/DadsDialog.vue` |
| 真実の源 (一次) | `md` (公式 example 無し / MD は「ガイドライン準備中」) + `wai-aria` |
| 参照パス | `dads-document-md/dads/components/dialog/index.md` + WAI-ARIA APG Dialog (Modal) |
| 総合判定 | ⚠️ 軽微差異 |
| 重大度 | low |
| 検出差異数 | 5 |

## 観点別チェック

> 注: 公式 MD は「モーダルダイアログのガイドラインは準備中です」(dialog/index.md:17) で、HTML 版 example も存在しない。トークン値の正準比較は不能のため、(a) WAI-ARIA APG の挙動要件、(b) リポジトリ内の他コンポーネントで確立済みの DADS トークン使用慣習、を基準に評価する。

| 観点 | 公式 (正準値) | `@dads/vue` 現状 | 判定 | 備考 / 修正方針 |
| ---- | ------------- | ----------------- | ---- | ---------------- |
| タイポグラフィ (font-family / size / weight / line-height) | 公式値なし(MD 準備中)。慣習: `--font-family-sans`, タイトルは `--font-size-18` 相当 + 太字 | ルート `font-family: var(--font-family-sans, ...)`、title `font-size: var(--font-size-18, 1.125rem); font-weight: 700; line-height: var(--line-height-150, 1.5)` (vue:180,257-259) | ✅ | トークン参照済み。慣習と整合。問題なし。 |
| カラー (背景 / 文字 / ボーダー: トークン参照) | 公式値なし。慣習: 背景 `--color-neutral-white` 系、文字 `--color-text-*`、区切り gray 系トークン | panel `background: var(--color-bg-primary, #fff)`、header/footer 区切り `var(--color-border-divider, #e5e5e5)`、close hover `var(--color-bg-subtle, #f5f5f5)` (vue:197,252,277,294) | ⚠️ | `--color-bg-primary` / `--color-border-divider` / `--color-bg-subtle` は DADS 正準トークン名でない(独自命名)。他コンポーネントの慣習(`--color-neutral-white`, `--color-neutral-solid-gray-*`)に揃えるべき。 |
| 角丸 (`--border-radius-*`) | 公式値なし。慣習: 8px パネル = `--border-radius-8` | panel `border-radius: var(--border-radius-8, 0.5rem)`、close `var(--border-radius-4, 0.25rem)` (vue:198,271) | ✅ | トークン参照済み。フォールバック直値も許容範囲。問題なし。 |
| スペーシング (padding / gap / margin: `--spacing-*`) | 公式値なし。慣習: `--spacing-*` 段階 | padding `var(--spacing-16, 1rem)`、gap `var(--spacing-8, 0.5rem)` (vue:179,250-251,290-292) | ✅ | `--spacing-*` 参照済み。問題なし。 |
| エレベーション / 影 (`--elevation-*`) | 公式値なし。慣習: DatePicker popover は `var(--elevation-1)` を使用 | panel `box-shadow: 0 4px 24px rgba(0,0,0,0.2)` 直書き (vue:199) | ❌ | DADS は elevation トークンを持つ(`--elevation-1` 等)。Vue は影を直書き。最上位レイヤのダイアログ向け elevation トークンに置換すべき。 |
| ボーダー (太さ / 色 / 有無) | 公式値なし。慣習: 区切り 1px gray トークン | header `border-bottom: 1px solid var(--color-border-divider, #e5e5e5)`、footer `border-top` 同様 (vue:252,294) | ⚠️ | 太さ 1px は妥当だが色トークン `--color-border-divider` が非正準(カラー欄と同根)。 |
| 状態 (hover / focus-visible / active / current / disabled / expanded) | WAI-ARIA: close ボタンにフォーカスリング必須、ESC で閉じる、フォーカストラップ | close は `@include ring.dads-focus-ring`(共有 mixin) + hover 背景。ESC/フォーカストラップ/初期フォーカス/復帰実装あり (vue:35,65-90,92-117,264,276-278) | ✅ | フォーカスリングは共有 mixin 流用で良好。WAI-ARIA の modal 挙動(trap/ESC/focus 復帰/`aria-modal`)を満たす。 |
| サイズバリアント (sm/md/lg 等) | 公式値なし。慣習: max-width で段階 | sm 400px / md 600px / lg 800px + fullscreen (vue:221-243) | ⚠️ | px 直書きの max-width。公式値が無いため厳密比較不能だが、`--size-*`/`--breakpoint-*` トークンがあれば寄せるのが望ましい。現状は許容(慣習的な妥当値)。 |
| forced-colors / ハイコントラスト | WAI-ARIA: 境界の可視性確保 | panel `border: 1px solid CanvasText`、close `border: 1px solid transparent` (vue:298-306) | ✅ | forced-colors 対応あり。良好。 |
| 正準CSSの流用 vs 独自実装 (ドリフト温床) | 公式 HTML/CSS が存在しないため流用元なし。`dads-reset-button` / `dads-focus-ring` / `dads-forced-colors` の共有 mixin を活用しているか | close ボタンで `base.dads-reset-button` + `ring.dads-focus-ring`、`base.dads-forced-colors` を使用 (vue:263-264,298) | ✅ | リポジトリ共有 mixin を適切に流用。独自再実装による温床は限定的。 |

## 検出した差異 (修正対象)

1. **[medium]** エレベーション: panel の影が直書き。慣習(DatePicker は `var(--elevation-1)`)に反する。公式 elevation トークン(最上位向け)に置換。
   - 該当行: `DadsDialog.vue:199`
2. **[medium]** カラー: `--color-bg-primary` が非正準トークン名。慣習の `--color-neutral-white` 等へ。
   - 該当行: `DadsDialog.vue:197`
3. **[medium]** カラー / ボーダー: `--color-border-divider` が非正準トークン名。`--color-neutral-solid-gray-*` 系へ。
   - 該当行: `DadsDialog.vue:252`, `:294`
4. **[low]** カラー: close hover の `--color-bg-subtle` が非正準トークン名。gray-50 系へ。
   - 該当行: `DadsDialog.vue:277`
5. **[low]** 影/オーバーレイ: overlay `rgba(0,0,0,0.5)` 直書き。公式 scrim トークンがあれば置換(無ければ許容)。
   - 該当行: `DadsDialog.vue:187`

## ハードコード / 誤トークンの洗い出し

- `box-shadow: 0 4px 24px rgba(0, 0, 0, 0.2)`（直書き / elevation トークン未使用）— `DadsDialog.vue:199`
- `background-color: rgba(0, 0, 0, 0.5)`（overlay scrim, 直書き）— `DadsDialog.vue:187`
- 非正準トークン `var(--color-bg-primary, #fff)` — `DadsDialog.vue:197`
- 非正準トークン `var(--color-border-divider, #e5e5e5)` — `DadsDialog.vue:252`, `:294`
- 非正準トークン `var(--color-bg-subtle, #f5f5f5)` — `DadsDialog.vue:277`
- max-width `400px`/`600px`/`800px`（直書き / 公式値なしのため参考）— `DadsDialog.vue:222,226,230`
- 注: `var(--border-radius-8, 0.5rem)` / `var(--spacing-16, 1rem)` などフォールバック直値は許容。`--color-text-primary`(vue:181,272) は他コンポーネントでも使用される共通トークンで許容範囲。

## 結論

- **修正要否**: 任意(優先度 **低**)。公式 example/MD が無いため厳密な fidelity 違反は判定不能。挙動(WAI-ARIA modal 要件)は満たしており、構造的な大きなドリフトは無い。
- 主な改善点は **非正準トークン名の正準化**(`--color-bg-primary`→`--color-neutral-white`, `--color-border-divider`→gray 系)と **影の elevation トークン化**。いずれも見た目はフォールバック値でほぼ変わらず、トークン体系の一貫性向上が目的。
- 想定 changeset レベル: **patch**（トークン参照名の置換が主で視覚差は軽微。elevation トークン化で影が微変する程度）。
- API / aria: props・emits・aria(`role="dialog"`, `aria-modal`, `aria-labelledby`)は不変。**API/aria 不変を保てる**。
