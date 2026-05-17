import type { DadsSemanticColor, DadsSize } from '../../types/common'

/**
 * Public Props for DadsChipTag.
 *
 * Renders an interactive tag used for filters, selection summaries, and
 * removable items (email recipients, applied filters, etc). Unlike
 * {@link DadsChipLabel}, this variant supports `closable` (× button) and
 * `clickable` (promotes the root to `<button>`).
 *
 * 公式 slug は `chip-tag`。
 */

// DADS specifies three sizes for chip; `xs` is intentionally excluded so the
// visual weight aligns with form labels.
export type DadsChipTagSize = Exclude<DadsSize, 'xs'>

export type DadsChipTagColor = DadsSemanticColor

export interface DadsChipTagProps {
  /** Size token. Default: `md`. */
  size?: DadsChipTagSize
  /** Semantic color. Default: `primary`. */
  color?: DadsChipTagColor
  /** Show an `×` button that emits `close`. Default: `false`. */
  closable?: boolean
  /**
   * Promote the root element from `<span>` to `<button>` so the tag itself is
   * keyboard-activatable and emits `click`. Default: `false`.
   */
  clickable?: boolean
  /** Disable interaction (applies to both clickable and closable affordances). */
  disabled?: boolean
  /** Accessible name for the close button. Default: `'削除'`. */
  closeLabel?: string
  /** Accessible name for the tag itself (clickable variants). */
  ariaLabel?: string
}

export interface DadsChipTagEmits {
  (e: 'click', event: MouseEvent | KeyboardEvent): void
  (e: 'close', event: MouseEvent): void
}
