/**
 * Type definitions for DadsNotificationBanner.
 *
 * The color taxonomy mirrors the official DADS notification-banner `data-type`
 * axis exactly: `success` / `error` / `warning` / `info-1` / `info-2`.
 * - `info-1`: primary blue accent (neutral informational notice)
 * - `info-2`: neutral gray accent (general informational notice)
 *
 * It is defined locally rather than reusing the shared `DadsSemanticColor`
 * primitive because the banner's `info-1` / `info-2` values are specific to
 * this component and must not leak into the Button / form-input palette.
 */
export type DadsNotificationBannerColor = 'success' | 'error' | 'warning' | 'info-1' | 'info-2'

/**
 * 公式 DADS が定義する 2 つのデザインスタイル。
 * - `standard`: 角丸ボーダー + 塗りつぶし背景 (現状の既存スタイル、デフォルト)
 * - `color-chip`: 左側にカラーアクセント (色チップ) + 白背景。
 *   静的な情報パネル・お知らせカード用途で、より控えめな視覚インパクト。
 */
export type DadsNotificationBannerStyle = 'standard' | 'color-chip'

export interface DadsNotificationBannerProps {
  /** Visibility state. v-model target. Default `true`. */
  modelValue?: boolean
  /** Semantic color used for accent / default icon. Default `'info-1'`. */
  color?: DadsNotificationBannerColor
  /**
   * Visual style. `standard` (default) uses tinted background + border;
   * `color-chip` puts a colored bar on the left edge with a white background.
   */
  style?: DadsNotificationBannerStyle
  /** Bold title shown above the message body. Optional. */
  title?: string
  /** Body text. Slot `default` overrides this when present. */
  message?: string
  /** Whether to render the close button. Default `true`. */
  closable?: boolean
  /** aria-label for the close button. Default `"閉じる"`. */
  closeLabel?: string
  /**
   * Timestamp string or Date displayed inside a `<time datetime>` element.
   * When a Date is passed, the visible text is the locale-formatted date and
   * the `datetime` attribute is the ISO string. When a string is passed it is
   * used verbatim for both visible text and `datetime` (caller's responsibility
   * to pass a valid datetime string).
   */
  timestamp?: string | Date
  /**
   * When set, the closed state is persisted under this key in `localStorage`.
   * On subsequent mounts the banner will not re-open until the key is cleared
   * (e.g. via `localStorage.removeItem(persistKey)`).
   *
   * This is intentionally opt-in: the default behaviour remains in-memory so
   * SSR-rendered pages stay stable.
   */
  persistKey?: string
}

export interface DadsNotificationBannerEmits {
  (e: 'update:modelValue', value: boolean): void
  (e: 'close'): void
}
