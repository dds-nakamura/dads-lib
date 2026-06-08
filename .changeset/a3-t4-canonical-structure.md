---
'@dads/vue': major
---

T4 正準構造作り直し (Issue #18, 案X フル) — Checkbox / Radio / Table / StepNavigation / ProgressIndicator を公式 example の正準 DOM/クラス/CSS へ作り直す **破壊的変更 (major)**。非公式拡張は削除。

### DadsCheckbox

- input sr-only + `__indicator` 疑似要素 → `input.dads-checkbox__input` を `appearance:none`、チェックを `::before` clip-path(SVG) で描画。サイズ 24/32/44・border 2/2/3px。
- 非公式 `readonly` 削除。forced-colors 網羅度向上 (disabled→GrayText / check→HighlightText)。
- ラベル/必須/サポートは form-control-label / ※必須 連携。CheckboxGroup は無影響。

### DadsRadio

- 同様に `input` 自身を `appearance:none` 可視コントロール + `__radio` センタリングへ。外 20/26/36・内 dot 固定 px 10/12/16・border 2/2/3px・hover ring。
- Vue 独自 `__required` / `__description` / `__hint` / `__error` / `__footer` を削除し RadioGroup(form-control-label) へ委譲。新規 `ariaDescribedby` で per-item 説明を input に wiring。

### DadsTable

- 独自 BEM → `.dads-table`(コンテナ)>`.dads-table__table` + `.dads-table__col-header`(`<th scope=col>`)/`.dads-table__row-header`(`<th scope=row>`)。列ヘッダ直下/行ヘッダ右端の象徴的 1px black 強調ボーダー。
- 辺別ボーダー API を `data-cell-border` / `data-border`(`cellBorder`/`border` prop) へ。行 hover(blue-50)/選択(blue-100) を `hoverable`/`selectable` で追加。`caption`/`dense`/`striped` 対応。
- 非公式 `stickyHeader` / `loading`(skeleton) 系 / `density`/`bordered` を削除。ヘッダセルは slot 内で公式クラスを付与。

### DadsStepNavigation

- `__item/__button/__indicator/__connector(<span>)` → 公式 `__step/__header/__number/__description` + `::before/::after` connector。`data-size`(normal/small) 追加。
- status enum を `pending/current/done/error` → **`reached/completed/error/skipped/editing`** + `aria-current`(`current` prop) へ。state-icon/state-label/description 実装。

### DadsProgressIndicator

- div-fill + `<circle>` → 公式 SVG `<line>` linear + spinner(`<g>` nesting) へ全面再実装。
- `variant`(linear/circular) + `size`(sm/md/lg) を廃し **`type`(stacked/inlined/stacked-underlay)** + `indicator`(linear/spinner) へ。非公式 circular/size を削除。
- `active` 表示制御、blue-1200 underline accent、stacked-underlay コンテナ、cubic-bezier spinner、`role=progressbar`/aria-valuenow。

### マイグレーション要点

- Checkbox: `readonly` 廃止。Radio: `required`/`description`/`hint`/`errorMessage` は RadioGroup 側へ移動。
- StepNavigation status: `done`→`completed` / `pending`→省略 / `current` は `current` prop。
- ProgressIndicator: `variant`/`size`/`circular` 廃止 → `type`/`indicator`/`value`/`active`。
- Table: `bordered`→`border`/`cellBorder`、`density`→`dense`、`stickyHeader`/`loading` 系廃止。ヘッダセルは `dads-table__col-header`/`__row-header` を付与。
