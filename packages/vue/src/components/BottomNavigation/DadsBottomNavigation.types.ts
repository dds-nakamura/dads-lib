/**
 * Type definitions for DadsBottomNavigation.
 *
 * ⚠️ Deprecated by the official DADS spec for accessibility/usability
 * reasons. Prefer DadsHamburgerMenuButton + DadsMobileMenu for mobile
 * navigation, or DadsHeaderContainer / DadsGlobalMenu / DadsTab depending
 * on the use case. Kept here for parity with the official component
 * catalog and existing implementations only.
 *
 * @deprecated Per official DADS guidance.
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

/** @deprecated Per official DADS guidance. See file-level comment. */
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
