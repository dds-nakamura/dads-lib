/**
 * Type definitions for DadsBottomNavigation.
 *
 * Note: The DADS spec marks bottom-navigation as a deprecated component
 * (アクセシビリティ・ユーザビリティ観点で非推奨)。Provided here for parity
 * with the official component catalog. Use with care.
 */

export interface DadsBottomNavigationItem {
  /** Unique identifier used for v-model binding. */
  id: string
  /** Visible label rendered under the icon. */
  label: string
  /**
   * MDI icon class name (e.g. `'mdi-home'`). Consistent with DadsButton's
   * `prependIcon` convention — the full class becomes `mdi mdi-home`.
   */
  iconName: string
  /**
   * Optional anchor target. When provided the item renders as `<a>` and
   * navigates on activation; otherwise the item renders as a `<button>`.
   */
  href?: string
  /** Disable interaction; the item is non-focusable and emits no events. */
  disabled?: boolean
}

export interface DadsBottomNavigationProps {
  /** Currently active item id (v-model target). */
  modelValue?: string
  /** Bottom navigation item definitions. */
  items: DadsBottomNavigationItem[]
  /** Accessible name for the nav landmark. Default: 'ボトムナビゲーション'. */
  ariaLabel?: string
}

export interface DadsBottomNavigationEmits {
  (e: 'update:modelValue', value: string): void
  (e: 'change', value: string): void
}
