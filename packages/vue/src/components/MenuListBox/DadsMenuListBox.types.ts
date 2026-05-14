/**
 * Public Props / Emits / item types for DadsMenuListBox.
 *
 * The menu list box renders a boxed, card-like container that wraps a vertical
 * list of menu items. Each item is rendered as a `<button>` by default, or as
 * an `<a href>` when `href` is provided. Items may optionally display an icon
 * (Material Design Icons class name) and a secondary description line.
 *
 * Reference: https://design.digital.go.jp/dads/components/menu-list-box/
 * HTML source: design-system-example-components-html/src/components/menu-list-box/
 *
 * Note: This Vue implementation focuses on the boxed menu list surface itself —
 * the toggling opener button is treated as a separate concern of the consumer.
 * The component renders the popup-style box as a standalone, always-visible
 * navigation surface (the same DOM the HTML reference unhides on open).
 */

/** Shape of a single entry in the menu. */
export interface DadsMenuListBoxItem {
  /** Visible label. Required because every item is announced to screen readers. */
  label: string
  /** When set, the item renders as `<a href>` so it follows native link semantics. */
  href?: string
  /** Optional secondary description line shown below the label. */
  description?: string
  /** Material Design Icons class name (e.g. `"mdi-home"`). */
  iconName?: string
  /** Mark the item as the currently active entry. Adds `aria-current="page"`. */
  active?: boolean
  /** Visually dim, skip emit / navigation, and apply `aria-disabled`. */
  disabled?: boolean
}

export interface DadsMenuListBoxProps {
  /** List of menu entries. */
  items: DadsMenuListBoxItem[]
  /** Accessible label for the `<ul role="menu">`. Recommended for screen readers. */
  ariaLabel?: string
}

export interface DadsMenuListBoxEmits {
  /** Emitted when an enabled item is activated by mouse or keyboard. */
  (e: 'click:item', item: DadsMenuListBoxItem, index: number, event: MouseEvent): void
}
