/**
 * Type definitions for DadsEmergencyBanner.
 *
 * The emergency banner is intentionally minimal: a single high-priority
 * announcement pinned to the top of the viewport for life/property critical
 * situations. The DADS spec recommends NOT allowing dismissal, so `closable`
 * defaults to `false`. Consumers can opt in to a close button when their
 * editorial flow demands it (e.g. drill / preview mode).
 */
export interface DadsEmergencyBannerProps {
  /** Visibility state. v-model target. Default `true`. */
  modelValue?: boolean
  /** Short headline displayed above the message (e.g. `緊急情報`). Optional. */
  title?: string
  /** Body text describing the emergency. Required by the DADS spec. */
  message: string
  /** Label for the optional CTA link/button. Pairs with `linkHref`. */
  linkLabel?: string
  /** Destination of the optional CTA link. Pairs with `linkLabel`. */
  linkHref?: string
  /**
   * Whether to render a close button. Default `false` — the DADS spec says
   * emergency banners SHOULD NOT be user-dismissable. Provided as an escape
   * hatch for preview / editorial UIs only.
   */
  closable?: boolean
  /** aria-label for the close button. Default `'閉じる'`. */
  closeLabel?: string
  /** MDI icon class (e.g. `mdi-alert`). Default `'mdi-alert'`. */
  iconName?: string
  /** aria-label for the banner root. Default `'緊急情報'`. */
  ariaLabel?: string
}

export interface DadsEmergencyBannerEmits {
  (e: 'update:modelValue', value: boolean): void
  (e: 'close'): void
}
