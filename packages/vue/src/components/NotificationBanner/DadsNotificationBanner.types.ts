/**
 * Type definitions for DadsNotificationBanner.
 *
 * The banner uses a richer color palette (`info` / `neutral`) than the shared
 * `DadsSemanticColor` primitive, so the color taxonomy is defined locally to
 * avoid leaking notification-only states (`info`, `neutral`) into the
 * Button / form-input semantic palette. Promoting these to the primitive type
 * is intentionally deferred to a follow-up PR once additional consumers
 * appear.
 */
export type DadsNotificationBannerColor = 'success' | 'error' | 'warning' | 'info' | 'neutral'

export interface DadsNotificationBannerProps {
  /** Visibility state. v-model target. Default `true`. */
  modelValue?: boolean
  /** Semantic color used for background / text / default icon. Default `'info'`. */
  color?: DadsNotificationBannerColor
  /** Bold title shown above the message body. Optional. */
  title?: string
  /** Body text. Slot `default` overrides this when present. */
  message?: string
  /** Whether to render the close button. Default `true`. */
  closable?: boolean
  /** aria-label for the close button. Default `"閉じる"`. */
  closeLabel?: string
}

export interface DadsNotificationBannerEmits {
  (e: 'update:modelValue', value: boolean): void
  (e: 'close'): void
}
