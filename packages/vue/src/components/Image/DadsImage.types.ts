/**
 * Public Props / Emits types for DadsImage.
 *
 * DadsImage wraps a native `<img>` element with the DADS surface conventions:
 * mandatory `alt` text (empty string allowed for decorative images), native
 * lazy loading, an optional fallback URL swapped in on load failure, and an
 * optional `<figcaption>` when caption text is provided.
 */

/** `object-fit` strategy applied to the rendered image. */
export type DadsImageObjectFit = 'cover' | 'contain' | 'fill' | 'none'

/** Native `loading` attribute. */
export type DadsImageLoading = 'lazy' | 'eager'

export interface DadsImageProps {
  /** Image source URL. Required. */
  src: string
  /**
   * Accessible alternative text. Required.
   * Pass an empty string (`''`) for purely decorative images so assistive
   * technology skips them entirely.
   */
  alt: string
  /** Intrinsic width attribute (number is treated as CSS pixels). */
  width?: number | string
  /** Intrinsic height attribute (number is treated as CSS pixels). */
  height?: number | string
  /** Native lazy-loading attribute. Defaults to `'lazy'`. */
  loading?: DadsImageLoading
  /**
   * Fallback URL displayed when the primary image fails to load. The error
   * handler swaps `src` to this value, so it is also a valid initial value
   * for slow-loading images.
   */
  placeholder?: string
  /** CSS `object-fit` mode for the image. Defaults to `'cover'`. */
  objectFit?: DadsImageObjectFit
  /** Optional caption rendered as `<figcaption>` underneath the image. */
  caption?: string
}

export interface DadsImageEmits {
  /** Emitted when the underlying `<img>` reports a load failure. */
  (e: 'error', event: Event): void
  /** Emitted when the underlying `<img>` finishes loading successfully. */
  (e: 'load', event: Event): void
}
