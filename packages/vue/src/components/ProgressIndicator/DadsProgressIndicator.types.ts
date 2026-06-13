/**
 * Type definitions for DadsProgressIndicator.
 *
 * Reworked to the official DADS canonical structure (SVG-based). The public
 * API now mirrors the official `<dads-progress-indicator>` web component:
 * a `type` layout taxonomy (`stacked` / `inlined` / `stacked-underlay`), an
 * `indicator` form (`linear` SVG line / `spinner` SVG ring), value-driven
 * determinate vs. indeterminate display, and an `active` display-control flag.
 *
 * The previous `variant` (`linear` / `circular`), `size` (`sm`/`md`/`lg`) and
 * `color` axes were intentionally removed — the official component is a single
 * blue-1200 accent with no size or color variants. This is a MAJOR breaking
 * change.
 */

/**
 * Layout taxonomy. Matches the official `data-type` attribute.
 *
 * - `stacked` — indicator above the label (column layout).
 * - `inlined` — indicator beside the label (row layout), compact dimensions.
 * - `stacked-underlay` — `stacked` inside a bordered, rounded white container.
 */
export type DadsProgressIndicatorType = 'stacked' | 'inlined' | 'stacked-underlay'

/**
 * Indicator form rendered inside the component.
 *
 * - `linear` — a horizontal SVG `<line>` bar with a 1px underline accent.
 * - `spinner` — a circular SVG `<circle>` ring (the official spinner form).
 */
export type DadsProgressIndicatorIndicator = 'linear' | 'spinner'

export interface DadsProgressIndicatorProps {
  /** Layout taxonomy. Defaults to `'stacked'`. */
  type?: DadsProgressIndicatorType
  /**
   * Indicator form. `'linear'` renders the SVG line bar, `'spinner'` renders
   * the SVG ring. Defaults to `'linear'`.
   */
  indicator?: DadsProgressIndicatorIndicator
  /**
   * Progress value in the inclusive 0–100 range (determinate).
   * Omit (or pass `undefined`) to render the indeterminate loop animation.
   * Out-of-range values are clamped before being rendered.
   */
  value?: number
  /**
   * Display control. When `false`, the component is hidden and all animations
   * are stopped (mirrors the official `:not([active])` behaviour). Defaults to
   * `true`.
   */
  active?: boolean
  /**
   * Visible label text rendered next to / below the indicator. Also used as the
   * accessible name via `aria-labelledby` when present.
   */
  label?: string
  /**
   * Render the determinate percentage (e.g. `(70%)`) after the label.
   * Ignored in indeterminate mode. Defaults to `false`.
   */
  showPercentage?: boolean
  /**
   * Accessible name forwarded to the root element's `aria-label`. Use when no
   * visible `label` is provided (otherwise `label` supplies the name).
   */
  ariaLabel?: string
}
