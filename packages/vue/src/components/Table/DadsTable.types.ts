/**
 * Type definitions for DadsTable.
 *
 * DadsTable is a presentation-only wrapper around the native `<table>` element.
 * Sorting, pagination, and row selection are intentionally left to consumers —
 * the component contributes layout, density, sticky-header, and theming only.
 */

/**
 * Vertical density of the table cells.
 * - `comfortable`: 12px padding (default reading density)
 * - `compact`:     8px padding + 14px font (denser data tables)
 */
export type DadsTableDensity = 'comfortable' | 'compact'

export interface DadsTableProps {
  /**
   * When true, `thead th` is pinned via `position: sticky` and the wrapper
   * gains `overflow-y: auto` so the header stays visible while the body
   * scrolls. Defaults to `false`.
   */
  stickyHeader?: boolean
  /** Cell density. Defaults to `'comfortable'`. */
  density?: DadsTableDensity
  /**
   * Adds a 1px outer border around the table. Cell separators are always
   * shown regardless of this flag. Defaults to `false`.
   */
  bordered?: boolean
  /**
   * Tints every other body row with the subtle hover background for easier
   * visual row tracking. Defaults to `false`.
   */
  striped?: boolean
  /**
   * Optional `<caption>` text. Ignored when the `caption` slot is used —
   * the slot takes precedence so callers can compose richer markup.
   */
  caption?: string
}
