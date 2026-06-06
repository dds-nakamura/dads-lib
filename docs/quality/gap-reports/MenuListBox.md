# Gap Report: `DadsMenuListBox`

> Issue #18 — DADS 公式とのビジュアル差異監査。1 コンポーネント 1 ファイル。

## メタ情報

| 項目 | 値 |
| ---- | ---- |
| Vue 実装 | `packages/vue/src/components/MenuListBox/DadsMenuListBox.vue` |
| 真実の源 (一次) | `example` |
| 参照パス | `design-system-example-components-html/src/components/menu-list-box/menu-list-box.css` (+ 依存 `menu-list/menu-list.css`) / `menu-list-box.mdx` |
| 総合判定 | ❌ 要修正 |
| 重大度 | high |
| 検出差異数 | 8 |

## 観点別チェック

> 最重要: 公式 menu-list-box は **popup 内の項目に `dads-menu-list` / `dads-menu-list__item`（共有部品）をそのまま流用** する (mdx:26-50, 依存ファイル menu-list.css)。Vue は項目を独自クラス `dads-menu-list-box__item` で全面再実装しており、LanguageSelector と同型のドリフトが発生している。

| 観点 | 公式 (正準値) | `@dads/vue` 現状 | 判定 | 備考 / 修正方針 |
| ---- | ------------- | ----------------- | ---- | ---------------- |
| タイポグラフィ (font-family / size / weight / line-height) | root `font-family:var(--font-family-sans)` `font-size:calc(16/16*1rem)` `line-height:1.2` `letter-spacing:0.02em` (menu-list-box.css:5-10)。項目は menu-list 由来 `line-height:1.3` | root `font-family:var(--font-family-sans,…)` `font-size:var(--font-size-16,1rem)` `line-height:1.3` (DadsMenuListBox.vue:168-171)。**`letter-spacing:0.02em` 欠落 / line-height 1.2 vs 1.3 不一致** | ⚠️ | root line-height と letter-spacing が非一致。`letter-spacing:0.02em` `line-height:1.2` へ |
| カラー (背景 / 文字 / ボーダー: トークン参照) | root 文字 `var(--color-neutral-solid-gray-900)` (:5)。popup 背景 `var(--color-neutral-white)` border `var(--color-neutral-solid-gray-420)` (:107-108)。項目色は menu-list 由来 (current=blue-100/1000) | root 文字 `var(--color-text-primary, var(--color-neutral-solid-gray-800,…))` (:169) — **公式は gray-900、現状 gray-800**。surface 背景 white / border gray-420 一致 (:240-241)。active=blue-100/1000 一致 (:311-312) | ⚠️ | root 文字色トークン違い (gray-900→gray-800)。`var(--color-neutral-solid-gray-900)` へ |
| 角丸 (`--border-radius-*`) | opener `calc(8/16*1rem)`=0.5rem (:17)。**popup `calc(8/16*1rem) 0 0 calc(8/16*1rem)` = 左側のみ 8px 丸 / 右 0**(:106) | trigger `var(--border-radius-4,0.25rem)` (:183) — **公式 opener は 8px だが現状 4px**。surface `var(--border-radius-8,0.5rem)` 全角丸 (:239) — **公式は左のみ 8px** | ❌ | (1) opener 角丸 8px→現状 4px 取り違え。(2) popup は左側だけ丸める設計 (右辺を画面端に寄せる前提) が現状は全周 8px。公式値へ |
| スペーシング (padding / gap / margin: `--spacing-*`) | opener sm `min-h 36/16` pad-x `4/16` gap `4/16`、md `min-h 44/16` pad-x `16/16` gap `8/16`、pad-y `4/16` 共通 (:26-38)。popup `padding:calc(16/16*1rem) 0` (:109)。項目 (menu-list 由来) min-h 44 pad `10/16 16/16` | trigger md min-h `2.5rem`(=40px≠44px) pad `var(--spacing-8) var(--spacing-12)` (:181,206)、sm min-h `2rem`(=32px≠36px) pad `4 8` (:200-202)、**lg を独自追加** min-h `3rem` (:210-214)。surface `padding:var(--spacing-16,1rem) 0` 一致 (:242)。item min-h 44 pad `var(--spacing-12) var(--spacing-16)`=`12px/16px` ≠ menu-list の `10px` (:283-284) | ❌ | opener サイズが公式 (sm 36/md 44) と不一致 (32/40)。pad-x も sm 4px→8px, md 16px→12px。項目 pad-y も 12px vs 公式 10px |
| エレベーション / 影 (`--elevation-*`) | popup `box-shadow:var(--elevation-1)` (:110) | surface `box-shadow:var(--elevation-1, 0 1px 2px rgba(0,0,0,0.08))` (:243) | ✅ | トークン名一致 (フォールバック直値のみ) |
| ボーダー (太さ / 色 / 有無) | opener は `data-style` で可変: text=border なし、outlined=`1px solid gray-420`、filled=背景のみ (:13-47)。popup `1px solid gray-420` (:107) | trigger は **常に `1px solid gray-420`** で固定 (:182) — **公式の text/outlined/filled 切替が無い**。surface `1px solid gray-420` 一致 (:240) | ❌ | opener の `data-style` バリアント (text/outlined/filled) 未実装。常時 outlined 相当に固定されている |
| 状態 (hover / focus-visible / active / current / disabled / expanded) | opener focus-visible `outline:4px solid black; outline-offset:2px; background:yellow-300; box-shadow:0 0 0 2px yellow-300` (:69-73)。hover gray-50+underline (:54-57)。項目 focus/hover/current は menu-list の box variant (focus=inset 6px yellow, current=blue-100) を流用。expanded で arrow 回転 (:93-95) | trigger focus は **共有 `dads-focus-ring`** (outline 2px / shadow 4px yellow / 背景塗りなし) (:175) — **公式 opener (4px+yellow 背景) と非一致**。trigger hover gray-50 のみ (underline 無し) (:190-191)。item focus-visible は box 相当 inset 6px yellow を独自記述で再現 (:293-300) — 値は一致。caret 回転一致 (:195-197) | ⚠️ | opener focus-visible が公式 (4px+yellow 背景) と非一致。trigger hover に underline 欠落。項目側は menu-list box 流用に置換すべき |
| サイズバリアント (sm/md/lg 等) | opener `data-size` は **sm / md の 2 段階のみ** (mdx:78, css:26-38) | `triggerSize: 'sm' | 'md' | 'lg'` の **3 段階 (lg は公式に存在しない独自値)** (:27, :199-214) | ❌ | 公式に無い `lg` を追加し、sm/md の実寸も公式と不一致 |
| forced-colors / ハイコントラスト | menu-list-box.css に forced-colors 定義なし | `@include dads-forced-colors` で surface/trigger/item の border・focus・active・disabled を補強 (:359-384) | ✅ | 公式に無い独自強化。後退ではない |
| 正準CSSの流用 vs 独自実装 (ドリフト温床) | **popup 項目は共有 `dads-menu-list` / `dads-menu-list__item[data-type="box"]` を流用** (mdx:37-48, 依存 menu-list.css)。`<dads-menu-list-box>` カスタム要素 + `__opener` `__popup` の 3 クラス構成 | 項目を **独自クラス `dads-menu-list-box__item` 系で全面再実装** (DadsMenuListBox.vue:275-356)。クラス名・構造とも公式の `__opener` / `__popup` / `dads-menu-list` 流用と不一致 (`__trigger` `__surface` `__list` `__item`) | ❌ | **最重要ドリフト**。公式は menu-list を内包する設計だが Vue は独自再実装。menu-list トークン更新が menu-list-box に伝播しない構造的負債 |

## 検出した差異 (修正対象)

1. **[high]** 構造ドリフト: 公式は popup 内に共有 `dads-menu-list`(`data-type="box"`) を流用するが、Vue は `dads-menu-list-box__item` を独自再実装。`DadsMenuList` を内部利用するか、menu-list の box variant スタイルを共有 SCSS から取り込む形へ再設計。
   - 該当行: `DadsMenuListBox.vue:275-356` (独自 item 実装), `DadsMenuListBox.vue:94-156` (独自 list マークアップ)
2. **[high]** 角丸取り違え: opener 公式 8px → 現状 `var(--border-radius-4)` 4px。
   - 該当行: `DadsMenuListBox.vue:183`
3. **[medium]** popup 角丸: 公式は左側のみ 8px (`8px 0 0 8px`) だが現状は全周 `var(--border-radius-8)`。公式値へ。
   - 該当行: `DadsMenuListBox.vue:239`
4. **[high]** opener バリアント欠落: 公式 `data-style` text/outlined/filled が無く、常時 1px border 固定。
   - 該当行: `DadsMenuListBox.vue:182`
5. **[high]** サイズバリアント不整合: 公式 sm/md のみ。現状は `lg` を独自追加し sm(32px)/md(40px) も公式 (36/44px) と非一致。
   - 該当行: `DadsMenuListBox.vue:199-214`, `DadsMenuListBox.types.ts:27`
6. **[medium]** opener focus-visible: 公式 `outline:4px black; offset:2px; background:yellow-300; shadow:0 0 0 2px yellow-300`。現状は共有 2px リングで非一致。
   - 該当行: `DadsMenuListBox.vue:175`
7. **[low]** root タイポ: 公式 `line-height:1.2` `letter-spacing:0.02em` `color:gray-900`。現状 `line-height:1.3` letter-spacing 無 `color:gray-800`。
   - 該当行: `DadsMenuListBox.vue:169-171`
8. **[low]** trigger hover に `text-decoration:underline` + `text-underline-offset` 欠落 (公式 :55-56)。
   - 該当行: `DadsMenuListBox.vue:190-191`

## ハードコード / 誤トークンの洗い出し

- `min-height: 2rem; / 2.5rem; / 3rem;` (`DadsMenuListBox.vue:200,206,213`) — opener 高さ直値。公式は `calc(36/16*1rem)` / `calc(44/16*1rem)`。実寸も誤り (32/40/独自48)。
- `border-radius: var(--border-radius-4, 0.25rem)` (`:183`) — トークン参照だが **誤トークン** (公式 opener は 8px)。`--border-radius-8` へ。
- `min-height: calc(44 / 16 * 1rem)` (`:283`) item — 値は OK だが独自実装由来 (本来 menu-list 流用)。
- `letter-spacing` 未設定 (root) — 公式 `0.02em` を追加。
- 色はすべて `var(--color-*)` 参照。直書きカラーは無し (フォールバック直値のみ、許容)。ただし `--color-text-primary` のフォールバックを gray-800 にしている点が公式 gray-900 と相違。

## 結論

- **修正要否: 要 (high)**。構造ドリフト + 角丸/サイズ/バリアントの複数差異。優先度 **high**。
- 想定 changeset レベル: **minor〜major**。
  - 構造を menu-list 流用へ寄せ、`triggerSize` から `lg` を削除し公式 `data-style` を導入すると **API 破壊 (props 変更)** が生じるため **major** 相当になり得る。
  - 視覚値 (角丸・focus・サイズ実寸・hover underline) のみの修正に留めるなら **patch/minor**。
- API・aria 不変: **完全には保てない**。`lg` 削除・`data-style` 追加は `DadsMenuListBoxProps` / `DadsMenuListBoxTriggerSize` の変更を伴う。aria (role=menu / menuitem / aria-expanded / aria-controls) は維持可能。段階導入推奨 (まず視覚値を patch、構造/API は別 minor/major)。
