# Gap Report: `DadsMegaMenu`

> Issue #18 — DADS 公式とのビジュアル差異監査。1 コンポーネント 1 ファイル。

## メタ情報

| 項目 | 値 |
| ---- | ---- |
| Vue 実装 | `packages/vue/src/components/MegaMenu/DadsMegaMenu.vue` |
| 真実の源 (一次) | `md` (公式 example なし。MD は「ガイドラインは準備中」、関連: heading / menu-list) + WAI-ARIA |
| 参照パス | `dads-document-md/dads/components/mega-menu/index.md` + 内部合成 `MenuList/DadsMenuList.vue` |
| 総合判定 | ⚠️ 軽微差異 (トークン整合 high の局所) |
| 重大度 | medium |
| 検出差異数 | 6 |

## 観点別チェック

> 公式 example が存在しないため、トークン値の正否は design-tokens を、構造/挙動は MD (関連コンポーネント menu-list を流用) と WAI-ARIA Disclosure/Dialog パターンを基準に判定する。

| 観点 | 公式 (正準値) | `@dads/vue` 現状 | 判定 | 備考 / 修正方針 |
| ---- | ------------- | ----------------- | ---- | ---------------- |
| タイポグラフィ (font-family / size / weight / line-height) | example なし。MD は menu-list を関連部品に指定 (menu-list: `--font-family-sans`, `font-size 16/16rem`, `line-height 1.3`) | trigger `font-family-sans`, `font-size 16`, `line-height 1.5`, `font-weight 700`; heading `font-size 14`, `font-weight 700` | ⚠️ | trigger line-height 1.5 は menu-list 系 1.2〜1.3 とズレ。weight 700 / heading 等は妥当な範囲 |
| カラー (背景 / 文字 / ボーダー: トークン参照) | design-tokens 実値: gray-900 `#1a1a1a`, gray-50 `#f2f2f2`, gray-700 `#4d4d4d`, white `#ffffff` | trigger color `var(--color-neutral-solid-gray-900, #1a1a1c)` ← **フォールバック値が誤り** (正 `#1a1a1a`); hover `gray-50, #f3f4f5` ← 誤 (正 `#f2f2f2`); heading `gray-700, #41464d` ← 誤 (正 `#4d4d4d`); panel bg `--color-bg-surface,#fff` / border `--color-border-default` ← **トークン不在** | ❌ | フォールバック直値を正しい token 実値に修正。`--color-bg-surface`/`--color-border-default` を実在トークン (white / gray-420) へ |
| 角丸 (`--border-radius-*`) | menu-list-box 系の慣例: opener 8px / popup 8px | trigger `--border-radius-4` (0.25rem); panel `--border-radius-8` (0.5rem) | ⚠️ | trigger を menu-list-box の慣例に合わせるなら 8px。panel 8px は妥当 |
| スペーシング (padding / gap / margin: `--spacing-*`) | `--spacing-*` トークンは design-tokens に **不在** | trigger `min-height 2.75rem` 直書き, pad `--spacing-8/16`; panel pad `--spacing-16`; columns gap `--spacing-24`; heading pad-x `--spacing-16` — 全 `--spacing-*` がフォールバック直値 | ⚠️ | `--spacing-*` は無効トークン。`calc(N/16*1rem)` か実在 dimension トークンへ。min-height 2.75rem は直書き |
| エレベーション / 影 (`--elevation-*`) | `--elevation-1` = `0 2px 8px 1px rgba(0,0,0,.1), 0 1px 5px 0 rgba(0,0,0,.3)` | panel `box-shadow: 0 4px 24px rgba(0,0,0,0.12)` 直書き (単層) | ❌ | `var(--elevation-1)` (または -2) に置換 |
| ボーダー (太さ / 色 / 有無) | panel 慣例 `1px solid gray-420` | `1px solid var(--color-border-default, rgba(0,0,0,0.1))` (トークン不在) | ❌ | `--color-neutral-solid-gray-420` に置換 |
| 状態 (hover / focus-visible / active / current / disabled / expanded) | WAI-ARIA: trigger `aria-expanded` 連動、Esc 閉、外側クリック閉。hover は menu-list 慣例 (gray-50 + underline) | trigger hover `gray-50` (underline 無し); focus は共有 `dads-focus-ring` (2px/offset0); expanded で arrow rotate ✅; Esc/外側クリック/disabled item で閉じる ✅ | ⚠️ | hover underline+offset 欠落。focus-ring が公式 menu-list-box (4px/offset2) と不一致 |
| サイズバリアント (sm/md/lg 等) | MD にサイズ規定なし | サイズバリアントなし (trigger 固定) | ✅ | 該当なし (MD 未規定) |
| forced-colors / ハイコントラスト | MD 規定なし | `dads-forced-colors` で trigger/panel に `1px solid CanvasText` | ✅ | 妥当な追加対応 |
| 正準CSSの流用 vs 独自実装 (ドリフト温床) | 公式 example 不在。MD 関連部品は menu-list (列内項目に流用すべき) | 列内項目は `DadsMenuList` を合成 ✅ (流用できている)。trigger/panel/columns は独自 CSS だが公式 example 不在のため再実装は不可避 | ⚠️ | menu-list 流用は良。trigger は将来 menu-list-box へ寄せる余地あり。panel/columns は独自やむなし |

## 検出した差異 (修正対象)

1. **[high]** カラー誤フォールバック: `--color-neutral-solid-gray-900` のフォールバックが `#1a1a1c` (正 `#1a1a1a`)。token 未注入環境で誤色描画。
   - 該当行: `DadsMegaMenu.vue:163`
2. **[medium]** カラー誤フォールバック: hover `gray-50` フォールバック `#f3f4f5` (正 `#f2f2f2`)、heading `gray-700` フォールバック `#41464d` (正 `#4d4d4d`)。
   - 該当行: `DadsMegaMenu.vue:182`,`230`
3. **[high]** エレベーション: `0 4px 24px rgba(0,0,0,0.12)` 直書き → `var(--elevation-1)`。
   - 該当行: `DadsMegaMenu.vue:209`
4. **[medium]** 不在トークン: panel bg `--color-bg-surface`、border `--color-border-default` が design-tokens に存在せずフォールバック直値。
   - 該当行: `DadsMegaMenu.vue:206`,`207`
5. **[low]** focus-visible が共有 `dads-focus-ring` (2px/offset0) で menu-list-box 慣例 (4px/offset2) と不一致。hover に underline+offset 欠落。
   - 該当行: `DadsMegaMenu.vue:167` (`@include ring.dads-focus-ring`), `:181-183`
6. **[low]** `--spacing-*` 系・`min-height: 2.75rem` 直書き (`--spacing-*` はトークン不在)。
   - 該当行: `DadsMegaMenu.vue:173`,`174`,`210`,`217`,`223`,`229`

## ハードコード / 誤トークンの洗い出し

- `color: var(--color-neutral-solid-gray-900, #1a1a1c)` — フォールバック誤値 (正 `#1a1a1a`)、`L163`
- `background-color: var(--color-neutral-solid-gray-50, #f3f4f5)` — フォールバック誤値 (正 `#f2f2f2`)、`L182`
- `color: var(--color-neutral-solid-gray-700, #41464d)` — フォールバック誤値 (正 `#4d4d4d`)、`L230`
- `background-color: var(--color-bg-surface, #fff)` — トークン不在、`L206`
- `border: 1px solid var(--color-border-default, rgba(0,0,0,0.1))` — トークン不在、`L207`
- `box-shadow: 0 4px 24px rgba(0,0,0,0.12)` — 完全直書き、`L209`
- `min-height: 2.75rem` — 直書き、`L173`
- `top: calc(100% + 0.25rem)` — 直書き、`L201`
- `--spacing-4/8/16/24` 系 — design-tokens に不在のため常にフォールバック直値、`L172`,`173`,`174`,`210`,`217`,`223`,`229`

## 結論

- **修正要 / 優先度 medium**。公式 example が無く構造の再実装は許容範囲だが、(a) gray-900/50/700 のフォールバック直値が token 実値と食い違う、(b) elevation を単層直書き、(c) 不在トークン参照、の 3 点はトークン正本との整合性として明確な是正対象。
- 想定 changeset レベル: **patch**。いずれも CSS 値 (フォールバック/トークン名/box-shadow) の差し替えで API・aria に影響なし。focus-ring の 4px 化のみ視覚インパクトがあるが prop/markup 不変で実現可。
- aria 不変: `role="dialog"` + `aria-haspopup="dialog"` + `aria-expanded` + Esc/外側クリック閉鎖は WAI-ARIA 準拠で維持。列内項目の `DadsMenuList` 合成も維持。
