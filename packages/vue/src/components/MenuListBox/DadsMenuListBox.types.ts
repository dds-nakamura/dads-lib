/**
 * Public Props / Emits / item types for DadsMenuListBox.
 *
 * The menu list box renders a boxed, card-like popup that wraps a vertical
 * list of menu items. The popup markup follows the official DADS structure:
 * `ul.dads-menu-list[role="menu"] > li[role="presentation"] >
 * a|button.dads-menu-list__item[data-type="box"][role="menuitem"]`. Each item
 * is rendered as a `<button>` by default, or as an `<a href>` when `href` is
 * provided. Items may optionally display a leading icon (Material Symbols icon
 * name) via `dads-menu-list__front-icon`.
 *
 * Reference: https://design.digital.go.jp/dads/components/menu-list-box/
 * HTML source: design-system-example-components-html/src/components/menu-list-box/
 * (+ shared menu-list/menu-list.css for the popup item styles)
 *
 * Two modes:
 *
 * 1. **Opener mode** (when `triggerLabel` is provided): renders a trigger
 *    `<button class="dads-menu-list-box__opener">` with `aria-haspopup="menu"`,
 *    `aria-expanded` + `aria-controls`, and reveals the boxed popup on toggle.
 *    State is bound via `modelValue` (v-model). Matches the official DADS
 *    dropdown semantics.
 *
 * 2. **Standalone mode** (when no `triggerLabel`): renders the popup always
 *    visible, with no opener. Backward-compatible with pre-2026-05 usage.
 */

/** Popup alignment relative to the opener (only relevant in Opener mode). */
export type DadsMenuListBoxPlacement = 'start' | 'end'

/**
 * Size token for the opener button (only relevant in Opener mode).
 * Mirrors the official `data-size` values — `sm` (36px) and `md` (44px) only.
 */
export type DadsMenuListBoxTriggerSize = 'sm' | 'md'

/**
 * Visual style for the opener button (only relevant in Opener mode).
 * Mirrors the official `data-style` values.
 * - `text` (default): no border, transparent background.
 * - `outlined`: 1px gray-420 border.
 * - `filled`: gray-50 background.
 */
export type DadsMenuListBoxTriggerStyle = 'text' | 'outlined' | 'filled'

/** Shape of a single entry in the menu. */
export interface DadsMenuListBoxItem {
  /** Visible label. Required because every item is announced to screen readers. */
  label: string
  /** When set, the item renders as `<a href>` so it follows native link semantics. */
  href?: string
  /** Material Symbols icon name (e.g. `"home"`) shown as the leading front-icon. */
  iconName?: string
  /** Mark the item as the currently active entry. Adds `aria-current="page"` + `data-current`. */
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
   * When `triggerLabel` is omitted, the popup is always visible regardless of
   * this value (standalone mode).
   */
  modelValue?: boolean
  /**
   * When provided, the component enters **Opener mode**: a trigger `<button>`
   * is rendered before the popup and toggles its visibility.
   */
  triggerLabel?: string
  /** Material Symbols icon name for the opener button (e.g. `"menu"`). */
  triggerIcon?: string
  /** Size of the opener button. Defaults to `'md'`. */
  triggerSize?: DadsMenuListBoxTriggerSize
  /** Visual style of the opener button (`data-style`). Defaults to `'text'`. */
  triggerStyle?: DadsMenuListBoxTriggerStyle
  /**
   * Popup alignment relative to the opener. `'start'` (default) aligns the
   * popup's leading edge to the opener; `'end'` aligns the trailing edge so the
   * popup opens leftward in LTR contexts.
   */
  placement?: DadsMenuListBoxPlacement
}

export interface DadsMenuListBoxEmits {
  /** Emitted when an enabled item is activated by mouse or keyboard. */
  (e: 'click:item', item: DadsMenuListBoxItem, index: number, event: MouseEvent): void
  /** Open state v-model (Opener mode). */
  (e: 'update:modelValue', value: boolean): void
  /** Popup has just opened (Opener mode). */
  (e: 'open'): void
  /** Popup has just closed (Opener mode). */
  (e: 'close'): void
}
