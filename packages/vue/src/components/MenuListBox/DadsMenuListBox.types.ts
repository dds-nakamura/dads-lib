/**
 * Public Props / Emits / item types for DadsMenuListBox.
 *
 * The menu list box renders a boxed, card-like container that wraps a vertical
 * list of menu items. Each item is rendered as a `<button>` by default, or as
 * an `<a href>` when `href` is provided. Items may optionally display an icon
 * (Material Symbols icon name) and a secondary description line.
 *
 * Reference: https://design.digital.go.jp/dads/components/menu-list-box/
 * HTML source: design-system-example-components-html/src/components/menu-list-box/
 *
 * Two modes:
 *
 * 1. **Opener mode** (when `triggerLabel` is provided): renders a trigger
 *    `<button>` with `aria-expanded` + `aria-controls`, and reveals the boxed
 *    menu surface on toggle. State is bound via `modelValue` (v-model).
 *    Matches the official DADS dropdown semantics.
 *
 * 2. **Standalone mode** (when no `triggerLabel`): renders the box always
 *    visible, with no opener. Backward-compatible with pre-2026-05 usage.
 */

/** Surface alignment relative to the opener (only relevant in Opener mode). */
export type DadsMenuListBoxPlacement = 'start' | 'end'

/** Size token for the opener button (only relevant in Opener mode). */
export type DadsMenuListBoxTriggerSize = 'sm' | 'md' | 'lg'

/** Shape of a single entry in the menu. */
export interface DadsMenuListBoxItem {
  /** Visible label. Required because every item is announced to screen readers. */
  label: string
  /** When set, the item renders as `<a href>` so it follows native link semantics. */
  href?: string
  /** Optional secondary description line shown below the label. */
  description?: string
  /** Material Symbols icon name (e.g. `"home"`). */
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
  /**
   * Open state (Opener mode only). Acts as v-model.
   * When `triggerLabel` is omitted, the box is always visible regardless of
   * this value (standalone mode).
   */
  modelValue?: boolean
  /**
   * When provided, the component enters **Opener mode**: a trigger `<button>`
   * is rendered before the box surface and toggles its visibility.
   */
  triggerLabel?: string
  /** Material Symbols icon name for the trigger button (e.g. `"menu"`). */
  triggerIcon?: string
  /** Size of the trigger button. Defaults to `'md'`. */
  triggerSize?: DadsMenuListBoxTriggerSize
  /**
   * Surface alignment relative to the opener. `'start'` (default) aligns the
   * box's leading edge to the opener; `'end'` aligns the trailing edge so the
   * box opens leftward in LTR contexts.
   */
  placement?: DadsMenuListBoxPlacement
}

export interface DadsMenuListBoxEmits {
  /** Emitted when an enabled item is activated by mouse or keyboard. */
  (e: 'click:item', item: DadsMenuListBoxItem, index: number, event: MouseEvent): void
  /** Open state v-model (Opener mode). */
  (e: 'update:modelValue', value: boolean): void
  /** Box has just opened (Opener mode). */
  (e: 'open'): void
  /** Box has just closed (Opener mode). */
  (e: 'close'): void
}
