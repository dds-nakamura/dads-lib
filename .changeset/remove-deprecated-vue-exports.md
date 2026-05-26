---
'@dads/vue': major
---

Remove `@deprecated` aliases and DADS-deprecated components in preparation for the next major.

Closes #14.

### 削除した旧名エイリアス (rename shim, 2026-05-17 導入)

- `DadsTextField` / `DadsTextFieldProps` / `DadsTextFieldEmits` / `DadsTextFieldSize` / `DadsTextFieldType` / `DadsTextFieldInputmode` — 後継: `DadsInputText` 系 (公式 slug `input-text`)
- `DadsHeader` / `DadsHeaderProps` / `DadsHeaderEmits` — 後継: `DadsHeaderContainer` 系 (公式 slug `header-container`)
- `DadsModal` / `DadsModalProps` / `DadsModalEmits` / `DadsModalSize` — 後継: `DadsDialog` 系 (公式 slug `dialog`)

### 削除した DADS 非推奨コンポーネント

公式 DADS で「使うな」と明記されている、もしくは推奨されない実装パターンに分類されているコンポーネントを `@dads/vue` から除外:

- `DadsScrollTopButton` — 代替: `DadsTableOfContents` / `DadsPageNavigation` / skip links / `DadsHeaderContainer` の sticky モード
- `DadsBottomNavigation` — 代替: `DadsHamburgerMenuButton` + `DadsMobileMenu`、または `DadsHeaderContainer` / `DadsGlobalMenu` / `DadsTab`

### 削除したレガシー Chip

公式 DADS が `chip-label` / `chip-tag` を別 slug として定義しているため、兼用 `DadsChip` を削除し新 2 コンポーネントへの完全移行:

- `DadsChip` / `DadsChipProps` / `DadsChipEmits` / `DadsChipSize` — 後継: `DadsChipLabel` (read-only) / `DadsChipTag` (interactive)

### 内部影響

- `DadsCombobox` の multi-select chip は `DadsChip` → `DadsChipTag` に切替済 (利用 API に影響なし)

### マイグレーション

旧名 import は単純置換可能:

```ts
// before
import { DadsTextField, DadsHeader, DadsModal, DadsChip } from '@dads/vue'
// after
import { DadsInputText, DadsHeaderContainer, DadsDialog, DadsChipLabel, DadsChipTag } from '@dads/vue'
```

`DadsScrollTopButton` / `DadsBottomNavigation` は代替コンポーネントに移行する必要がある。詳細は `docs/quality/naming-and-gap.md` の代替パターンを参照。
