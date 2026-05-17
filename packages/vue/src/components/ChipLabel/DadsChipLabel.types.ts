import type { DadsSemanticColor, DadsSize } from '../../types/common'

/**
 * Public Props for DadsChipLabel.
 *
 * Renders a compact, read-only label used for status / category indicators.
 * Unlike {@link DadsChipTag}, this variant is non-interactive: no close
 * button and no clickable promotion. Use this for badges that simply
 * communicate state ("公開中" / "未読" / "重要") rather than affordances
 * users act on.
 *
 * 公式 slug は `chip-label`。
 */

// DADS specifies three sizes for chip; `xs` is intentionally excluded so the
// visual weight aligns with form labels.
export type DadsChipLabelSize = Exclude<DadsSize, 'xs'>

export type DadsChipLabelColor = DadsSemanticColor

/**
 * Visual treatment.
 * - `filled` (default): tinted background + text in the semantic color
 * - `outlined`: transparent background + colored border + colored text
 */
export type DadsChipLabelAppearance = 'filled' | 'outlined'

export interface DadsChipLabelProps {
  /** Size token. Default: `md`. */
  size?: DadsChipLabelSize
  /** Semantic color. Default: `primary`. */
  color?: DadsChipLabelColor
  /** Visual treatment. Default: `'filled'`. */
  appearance?: DadsChipLabelAppearance
}
