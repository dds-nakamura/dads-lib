/**
 * Type definitions for DadsTab.
 */

export type DadsTabValue = string | number

export interface DadsTabItem {
  /** Unique identifier used for v-model and slot names. */
  value: DadsTabValue
  /** Visible label rendered inside the tab button. */
  label: string
  /** Disable interaction; the tab is skipped by keyboard navigation. */
  disabled?: boolean
}

export interface DadsTabProps {
  /** Currently active tab's value (v-model target). */
  modelValue: DadsTabValue
  /** Tab definitions. */
  items: DadsTabItem[]
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
