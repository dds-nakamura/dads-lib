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

/**
 * 公式 DADS の幅バリアント。
 * - `full-width`: 親要素全幅に伸びる (デフォルト)
 * - `inset`: 左右に余白を持つ短い divider (リスト項目間の区切り等)
 */
export type DadsDividerVariant = 'full-width' | 'inset'

/** 線の太さ (px)。公式 HTML リファレンスの data-width="1..4" に対応。 */
export type DadsDividerThickness = 1 | 2 | 3 | 4

/** 線のスタイル。 */
export type DadsDividerStyle = 'solid' | 'dashed'

export interface DadsDividerProps {
  /** Layout direction. Defaults to `'horizontal'`. */
  orientation?: DadsDividerOrientation
  /** Visual emphasis of the line. Defaults to `'default'`. */
  color?: DadsDividerColor
  /** 幅バリアント。`'inset'` は左右に余白を付けた短い線。 */
  variant?: DadsDividerVariant
  /** 線の太さ (1-4px)。デフォルト `1`。 */
  thickness?: DadsDividerThickness
  /** 線のスタイル。デフォルト `'solid'`。 */
  lineStyle?: DadsDividerStyle
  /**
   * Accessible label announced by screen readers. Most dividers are purely
   * decorative and can omit this; supply it when the separator carries
   * semantic meaning (e.g. "Section break").
   */
  ariaLabel?: string
}
