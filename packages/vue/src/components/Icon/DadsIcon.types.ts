/**
 * Inline-SVG icon rendered from the bundled Material Symbols registry
 * (outlined / weight 400). Replaces the former MDI webfont (`@mdi/font`).
 *
 * Only icons present in `icon-registry.ts` are available; regenerate the
 * registry (scripts/generate-icon-registry.mjs) to add more.
 */
export interface DadsIconProps {
  /**
   * Material Symbols name, e.g. `search` / `keyboard_arrow_down` / `close`.
   * Must exist in the bundled registry (see docs/quality/icon-mapping.md).
   */
  name: string
  /** Edge length. `number` → px, `string` → used as-is. Default: `24`. */
  size?: number | string
  /**
   * Accessible label. When provided the icon is exposed as `role="img"` with
   * `aria-label`; otherwise it is decorative (`aria-hidden="true"`).
   */
  label?: string
}
