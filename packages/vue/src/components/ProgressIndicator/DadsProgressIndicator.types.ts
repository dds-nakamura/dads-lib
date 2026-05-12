/**
 * Type definitions for DadsProgressIndicator.
 */
import type { DadsSize } from '../../types/common'

export type DadsProgressIndicatorVariant = 'linear' | 'circular'

/**
 * Progress indicator does not support the `xs` size — even at the smallest
 * end (`sm`) the bar / ring stays large enough to remain perceivable.
 */
export type DadsProgressIndicatorSize = Exclude<DadsSize, 'xs'>

export interface DadsProgressIndicatorProps {
  /** Visual style. Defaults to 'linear'. */
  variant?: DadsProgressIndicatorVariant
  /**
   * Progress value in the inclusive 0–100 range.
   * Omit (or pass `undefined`) to render an indeterminate loop animation.
   * Out-of-range values are clamped before being rendered.
   */
  value?: number
  /** Component size. Defaults to 'md'. */
  size?: DadsProgressIndicatorSize
  /**
   * Custom text rendered next to the indicator when `showLabel` is true.
   * When omitted, the component falls back to `${value}%` for determinate
   * progress; nothing is shown for indeterminate progress.
   */
  label?: string
  /** Render the textual label next to the indicator. Defaults to false. */
  showLabel?: boolean
  /**
   * Accessible name forwarded to the root element's `aria-label`. Helpful
   * when the indicator is not adjacent to descriptive text.
   */
  ariaLabel?: string
}
