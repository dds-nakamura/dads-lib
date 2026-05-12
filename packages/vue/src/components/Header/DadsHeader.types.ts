/**
 * Props / Emits for the DadsHeader layout component.
 *
 * Layout components do not take a `size` prop — sizing is determined by the
 * inner content and the surrounding application chrome.
 */
export interface DadsHeaderProps {
  /** Stick to the top of the viewport on scroll. Defaults to true. */
  sticky?: boolean
  /**
   * Render the mobile hamburger menu button. The button is only visible on
   * narrow viewports via CSS; the prop also lets callers suppress it
   * entirely. Defaults to true.
   */
  showMenuToggle?: boolean
  /** aria-label for the hamburger button. Defaults to 'メニューを開く'. */
  menuToggleLabel?: string
}

export interface DadsHeaderEmits {
  /**
   * Fired when the hamburger button is activated (click / Enter / Space).
   * Drawer open/close is the parent's responsibility.
   */
  (e: 'click:menu', event: MouseEvent): void
}
