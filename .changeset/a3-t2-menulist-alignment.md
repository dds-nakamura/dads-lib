---
'@dads/vue': major
---

**柱A-3 / T2: MenuListBox / LanguageSelector を公式 menu-list-box 構造へ整合（破壊的変更）** — Issue #18

公式 `menu-list-box` / `menu-list` の markup・クラス名・トークンに準拠させ、独自再実装ドリフトを解消（軽量版: 共有 `DadsMenuList` component は import せず、公式 CSS を各コンポーネントの scoped style に移植）。ARIA の menu 意味論（`role=menu`/`menuitem`/`presentation`）は維持。

### MenuListBox
- opener を公式 `dads-menu-list-box__opener`（`data-size` sm/md・`data-style` text/outlined/filled・opener-icon/opener-arrow）へ。**`triggerStyle` prop 追加**（text/outlined/filled、既定 text）。**`triggerSize` の `lg` を削除**（sm/md のみ）。
- popup を公式 `dads-menu-list-box__popup` + `ul.dads-menu-list[role=menu] > li[role=presentation] > .dads-menu-list__item[data-type=box][role=menuitem]` へ。クラス名を公式へ改名（`__trigger`→`__opener`、`__surface`→`__popup`、`__item`→`dads-menu-list__item` 等）。
- **非公式 `description`（item サブテキスト）を撤廃**（型 `DadsMenuListBoxItem` から削除）。

### LanguageSelector
- 内部 popup/opener を公式 menu-list-box markup・クラスへ整合（独自 `dads-language-selector__*` の popup を公式 `dads-menu-list(-box)` クラスへ）。opener の "Language" 文言は DADS 仕様で維持。current 項目を `data-current` + `aria-current` 基準＋公式 check アイコンに。
- **非公式バリアントを撤廃**: `colorScheme`（light-blue/green/gray）、`cornerShape`（rounded/pill/square）、`size` の `lg`（sm/md のみ、既定 md→sm）。

利用側は削除した props（MenuListBox: `item.description` / `triggerSize="lg"`、LanguageSelector: `colorScheme` / `cornerShape` / `size="lg"`）と公開クラス名の変更に追随が必要。挙動・ARIA は維持。共有部品 `DadsMenuList` への component 合成は a3-deferred に残置（将来）。
