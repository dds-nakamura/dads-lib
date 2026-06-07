/**
 * Public Props for DadsDivider.
 *
 * Renders a thin separator between content blocks. Supports horizontal and
 * vertical orientations and an optional label slot that, when used in the
 * horizontal orientation, splits the line in two with a centered text caption
 * (e.g. "OR" between alternative actions).
 */

export type DadsDividerOrientation = 'horizontal' | 'vertical'

/**
 * 線の色。公式 DADS example の `data-color` に対応する 3 段階。
 * - `gray-420`: `--color-neutral-solid-gray-420` (#949494) — 標準・既定
 * - `gray-536`: `--color-neutral-solid-gray-536` (#767676) — やや強い
 * - `black`: `--color-neutral-black` — 最も強い
 */
export type DadsDividerColor = 'gray-420' | 'gray-536' | 'black'

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
  /** 線の色。公式 example の `data-color` 3 段階。デフォルト `'gray-420'`。 */
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
