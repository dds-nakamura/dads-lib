/**
 * Public Props / Emits types for DadsCard.
 *
 * The card renders a flexible content surface with three visual variants
 * (outlined / filled / elevated) and three slots (header, default, footer).
 * When `clickable` is true the entire card becomes an interactive surface —
 * the root element switches to a `<button>` so Enter / Space activation and
 * focus management come "for free" from the platform.
 */

/** Visual treatment of the card surface. */
export type DadsCardVariant = 'outlined' | 'filled' | 'elevated'

/**
 * Elevation level for `variant="elevated"`. Maps to the `--elevation-{1-8}`
 * design tokens; ignored for other variants.
 */
export type DadsCardElevation = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

export interface DadsCardProps {
  /** Visual treatment. Defaults to `'outlined'`. */
  variant?: DadsCardVariant
  /** Elevation level (1–8). Only applied when `variant="elevated"`. Defaults to 1. */
  elevation?: DadsCardElevation
  /** When true, the entire card behaves as a button (Enter/Space activation). */
  clickable?: boolean
  /** Accessible label for the clickable card. Recommended when `clickable` is true. */
  ariaLabel?: string
}

export interface DadsCardEmits {
  /** Emitted when a clickable card is activated by mouse or keyboard. */
  (e: 'click', event: MouseEvent | KeyboardEvent): void
}
