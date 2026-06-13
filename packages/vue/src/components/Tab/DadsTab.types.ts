/**
 * Type definitions for DadsTab.
 */

export type DadsTabValue = string | number

/**
 * Tablist layout direction.
 *
 * - `horizontal` (default): tabs flow left-to-right, indicator is a 2px underline,
 *   ArrowLeft/ArrowRight cycle focus.
 * - `vertical`: tabs stack top-to-bottom, indicator is a 2px left border,
 *   ArrowUp/ArrowDown cycle focus. Renders DADS Figma の Left/Right tabs UI.
 */
export type DadsTabOrientation = 'horizontal' | 'vertical'

export interface DadsTabItem {
  /** Unique identifier used for v-model and slot names. */
  value: DadsTabValue
  /** Visible label rendered inside the tab button. */
  label: string
  /**
   * Optional Material Symbols icon name shown before the label
   * (e.g. `'home'`). Rendered via DadsIcon as an inline SVG.
   */
  icon?: string
  /** Disable interaction; the tab is skipped by keyboard navigation. */
  disabled?: boolean
}

export interface DadsTabProps {
  /** Currently active tab's value (v-model target). */
  modelValue: DadsTabValue
  /** Tab definitions. */
  items: DadsTabItem[]
  /**
   * Tablist layout direction. Default `'horizontal'`.
   * Vertical orientation matches DADS Figma の Left/Right tabs サンプル.
   */
  orientation?: DadsTabOrientation
  /**
   * When true, all panels are mounted and toggled with `display`.
   * When false (default), only the active panel renders its slot content.
   */
  keepAlive?: boolean
  /** Accessible name for the tablist. Default: 'タブ'. */
  ariaLabel?: string
}

export interface DadsTabEmits {
  (e: 'update:modelValue', value: DadsTabValue): void
  (e: 'change', value: DadsTabValue): void
}
