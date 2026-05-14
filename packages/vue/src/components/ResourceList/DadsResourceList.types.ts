/**
 * Public Props / item types for DadsResourceList.
 *
 * The resource list renders a card-like vertical list of resource entries
 * (documents, downloads, search-result style records). Each entry is laid out
 * with an optional thumbnail / icon, a title (clickable when `href` is set),
 * an optional description, an optional date, and an optional list of tags.
 *
 * Reference: https://design.digital.go.jp/dads/components/resource-list/
 * HTML source: design-system-example-components-html/src/components/resource-list/
 *
 * The HTML reference exposes two visual styles via `data-style`:
 *   - `frame` (default): every item is wrapped in a rounded border
 *   - `list`:            items share a divider-only bottom border
 *
 * Each `<li>` wraps a `.dads-resource-list` block whose internal layout follows
 * the reference: `__body > __contents (title + support) + __sub`. When a
 * thumbnail or icon is provided, it is rendered as the first child of `__body`
 * so it sits to the left of the contents column.
 */

/** Visual treatment of each row. Mirrors the HTML reference `data-style`. */
export type DadsResourceListStyle = 'frame' | 'list'

/** Shape of a single entry in the resource list. */
export interface DadsResourceListItem {
  /** Visible title. Required because every item must be identifiable. */
  title: string
  /** Optional secondary description / supporting text shown below the title. */
  description?: string
  /** When set, the title renders as an `<a href>` so it follows link semantics. */
  href?: string
  /** Optional thumbnail image URL. Rendered as `<img>` to the left of the title. */
  thumbnail?: string
  /** Optional date string. Rendered in the trailing `__sub` slot. */
  date?: string
  /** Optional list of tag labels rendered as small chips below the title. */
  tags?: string[]
  /** Material Design Icons class name (e.g. `"mdi-file-document"`). Used when `thumbnail` is absent. */
  iconName?: string
}

export interface DadsResourceListProps {
  /** List of resource entries to render. */
  items: DadsResourceListItem[]
  /** Visual treatment for every row. Defaults to `'frame'`. */
  variant?: DadsResourceListStyle
  /** Accessible label for the root `<ul>`. Recommended for screen readers. */
  ariaLabel?: string
}
