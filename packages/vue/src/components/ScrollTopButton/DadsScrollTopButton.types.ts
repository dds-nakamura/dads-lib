/**
 * Public Props / Emits for DadsScrollTopButton.
 *
 * Renders a fixed-position icon button that smoothly scrolls the window back
 * to the top. Hidden until the user has scrolled past `showOffset` pixels so
 * it does not clutter the initial viewport. The default `aria-label` is
 * Japanese to match DADS conventions; override via `ariaLabel` for i18n.
 *
 * ⚠️ Deprecated by the official DADS spec. New screens should prefer
 * DadsTableOfContents / DadsPageNavigation, skip links, or DadsHeaderContainer
 * `sticky` mode instead. Shipped for parity / existing implementations only.
 *
 * @deprecated Per official DADS guidance.
 */

export type DadsScrollTopButtonPosition = 'bottom-right' | 'bottom-left'

/** @deprecated Per official DADS guidance. See file-level comment. */
export interface DadsScrollTopButtonProps {
  /**
   * Number of pixels the window must be scrolled down before the button
   * becomes visible. Default: `200`.
   */
  showOffset?: number
  /**
   * Accessible name announced by assistive tech. Default: `'ページの先頭へ戻る'`.
   */
  ariaLabel?: string
  /**
   * Which corner of the viewport the button sits in. Default: `'bottom-right'`.
   */
  position?: DadsScrollTopButtonPosition
  /**
   * Disable interaction. When true, clicks are suppressed and the button is
   * marked `disabled` for assistive tech. Default: `false`.
   */
  disabled?: boolean
  /**
   * Slot fallback text displayed in `<slot>` when no default slot is
   * provided. Default: `'トップへ'`. Override to localize the button label.
   */
  defaultLabel?: string
}

export interface DadsScrollTopButtonEmits {
  (e: 'click', event: MouseEvent): void
}
