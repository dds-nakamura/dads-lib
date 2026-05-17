# Design: 命名整合 & ギャップ分析

## 1. 命名整合 (Option B: deprecated alias 併存)

### 1.1 ディレクトリ rename

`git mv` で履歴保持しつつ移動:

- `packages/vue/src/components/Modal/` → `packages/vue/src/components/Dialog/`
- `packages/vue/src/components/Header/` → `packages/vue/src/components/HeaderContainer/`
- `packages/vue/src/components/TextField/` → `packages/vue/src/components/InputText/`

### 1.2 ファイル内容の rename

各ディレクトリ内で:

- `DadsModal.vue` → `DadsDialog.vue` (component name, CSS class `.dads-modal__*` → `.dads-dialog__*`)
- `DadsModal.types.ts` → `DadsDialog.types.ts` (型名 `DadsModalProps` → `DadsDialogProps` 等)
- `__tests__/DadsModal.test.ts` → `__tests__/DadsDialog.test.ts`
- `index.ts` も export 名更新

同様に Header / TextField も。

### 1.3 旧名 deprecated alias の追加

`packages/vue/src/index.ts` で:

```ts
// 新名 (公式 slug と一致)
export { default as DadsDialog } from './components/Dialog/DadsDialog.vue'
export * from './components/Dialog/DadsDialog.types'

// 旧名 (deprecated alias、将来の major で削除)
/** @deprecated Use DadsDialog instead. Will be removed in next major. */
export { default as DadsModal } from './components/Dialog/DadsDialog.vue'
/** @deprecated Use DadsDialogProps instead. */
export type { DadsDialogProps as DadsModalProps } from './components/Dialog/DadsDialog.types'
```

同様に DadsHeader / DadsTextField。

### 1.4 Chip 分割の方針

現在の `DadsChip` は単一ファイルで label と tag を兼用。分割方針:

- 新規 `DadsChipLabel.vue` (semantic label 用、非対話)
- 新規 `DadsChipTag.vue` (削除可能 tag 用、closable)
- 既存 `DadsChip.vue` は内部で props ベースに振り分けつつ `@deprecated`

CSS class はそれぞれ `.dads-chip-label__*` / `.dads-chip-tag__*` に分離 (旧 `.dads-chip__*` は両方に alias)。

### 1.5 docs sidebar / ページ更新

- `apps/docs/.vitepress/config.ts`: sidebar 項目を新名に更新
- `apps/docs/components/modal.md` → `dialog.md` (`git mv`)
- `apps/docs/components/header.md` → `header-container.md`
- `apps/docs/components/text-field.md` → `input-text.md`
- `apps/docs/components/chip.md` を分割: `chip-label.md` + `chip-tag.md`

## 2. ギャップ分析 (3 並列 sub-agent)

### 2.1 サブエージェント分担 (各 13 件)

**Group A**: accordion, blockquote, bottom-navigation, breadcrumb, button, card, carousel, checkbox, chip-label, chip-tag, date-picker, description-list, dialog

**Group B**: disclosure, divider, drawer, emergency-banner, file-upload, hamburger-menu-button, header-container, heading, image-slider, input-text, language-selector, list, mega-menu

**Group C**: menu-list, menu-list-box, mobile-menu, notification-banner, progress-indicator, radio, resource-list, scroll-top-button, search-box, select, table, textarea, utility-link

### 2.2 各エージェントの実行手順

各 slug について:

1. `dads-document-md/dads/components/<slug>/index.md` を Read
2. `packages/vue/src/components/<PascalName>/Dads<PascalName>.types.ts` を Read
3. (任意) `dads-document-figma/<日本語名>/<日本語名>.png` があれば Read で視覚仕様も確認
4. 以下を比較:
   - Missing props (公式仕様にあるが実装にない)
   - Missing events (同上)
   - Missing variants (color/size/state 等)
   - a11y issues (ARIA 属性欠落)
5. 重要度を High/Medium/Low で判定:
   - **High**: アクセシビリティ違反 / 主要ユースケースが実装できない / 公式必須 prop の欠落
   - **Medium**: 利便性向上 prop / オプショナル variant
   - **Low**: 補助的 prop / ドキュメントの追加程度

### 2.3 出力フォーマット (各エージェント)

```markdown
## <slug> (Dads<PascalName>)

- **Missing props**: <name> (<type>) — <reason>
- **Missing events**: <name> — <reason>
- **Missing variants**: <name> — <reason>
- **a11y**: <issue>
- **重要度**: High / Medium / Low
- **推定工数**: ~30 min / 1h / 2h+
- **備考**: ...
```

該当なしの場合は `- 該当なし` と書く。

## 3. High 実装フェーズ

ギャップ分析集約後:

1. High 項目を一覧化し、ユーザー承認を得る
2. 各 High に対し test 先行 (RED) → 実装 (GREEN) で対応
3. コミット粒度: 1 コンポーネント 1 コミット (rename を除く)
