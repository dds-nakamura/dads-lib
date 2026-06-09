/**
 * Public Props for DadsChipLabel.
 *
 * Renders a compact, read-only label used for status / category indicators.
 * Unlike {@link DadsChipTag}, this variant is non-interactive: no close
 * button and no clickable promotion. Use this for badges that simply
 * communicate state ("公開中" / "未読" / "重要") rather than affordances
 * users act on.
 *
 * 公式 slug は `chip-label`。色軸 (11 primitive 色相) と style 軸 (4 種) は
 * 公式 example (`design-system-example-components-html/.../chip-label.css`)
 * の `data-color` / `data-style` に厳密一致する。サイズ軸は公式に存在しない
 * ため撤廃済み (単一 min-height 32px)。
 */
/**
 * Official 11 primitive hues exposed via `data-color` in chip-label.css.
 * No `size` axis exists upstream, so it is intentionally absent.
 */
export type DadsChipLabelColor = 'gray' | 'blue' | 'light-blue' | 'cyan' | 'green' | 'lime' | 'yellow' | 'orange' | 'red' | 'magenta' | 'purple';
/**
 * Official visual treatment (`data-style`).
 * - `text` (default): no border / no fill, colored text only
 * - `outline`: colored 1px border + colored text, transparent fill
 * - `filled-outline`: colored 1px border + tinted fill + darker text
 * - `fill`: solid colored fill + white text
 */
export type DadsChipLabelAppearance = 'text' | 'outline' | 'filled-outline' | 'fill';
export interface DadsChipLabelProps {
    /** Primitive color hue. Default: `gray`. */
    color?: DadsChipLabelColor;
    /** Visual treatment. Default: `'text'`. */
    appearance?: DadsChipLabelAppearance;
}
//# sourceMappingURL=DadsChipLabel.types.d.ts.map