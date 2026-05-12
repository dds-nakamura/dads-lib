/**
 * Public Props for DadsDivider.
 *
 * Renders a thin separator between content blocks. Supports horizontal and
 * vertical orientations and an optional label slot that, when used in the
 * horizontal orientation, splits the line in two with a centered text caption
 * (e.g. "OR" between alternative actions).
 */

export type DadsDividerOrientation = 'horizontal' | 'vertical'

export type DadsDividerColor = 'default' | 'strong'

export interface DadsDividerProps {
  /** Layout direction. Defaults to `'horizontal'`. */
  orientation?: DadsDividerOrientation
  /** Visual emphasis of the line. Defaults to `'default'`. */
  color?: DadsDividerColor
  /**
   * Accessible label announced by screen readers. Most dividers are purely
   * decorative and can omit this; supply it when the separator carries
   * semantic meaning (e.g. "Section break").
   */
  ariaLabel?: string
}
