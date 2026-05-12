/**
 * Public Props for DadsTooltip.
 *
 * Wraps a focusable trigger and renders a tooltip into `document.body` via
 * `<Teleport>`. Visible on `hover` AND `focus` so keyboard users get parity
 * with mouse users (DADS accessibility requirement). The tooltip is associated
 * with the trigger via `aria-describedby` while open.
 */

export type DadsTooltipPosition =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'right'

export interface DadsTooltipProps {
  /** Tooltip text. The default slot wins over this prop when provided. */
  text?: string
  /** Where the tooltip sits relative to the trigger. Defaults to `'top'`. */
  position?: DadsTooltipPosition
  /** Delay before opening (ms). Defaults to `0`. */
  openDelay?: number
  /** Delay before closing (ms). Defaults to `0`. */
  closeDelay?: number
  /** When `true`, the tooltip never opens regardless of trigger interactions. */
  disabled?: boolean
  /**
   * Explicit DOM id for the tooltip element. Auto-generated via `useId()`
   * when not provided so multiple tooltips on a page get distinct ids.
   */
  id?: string
}
