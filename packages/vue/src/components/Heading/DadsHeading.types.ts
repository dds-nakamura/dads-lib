/**
 * Type definitions for DadsHeading.
 *
 * Three independent axes:
 *
 * - `as`: HTML element rendered (controls the semantic outline)
 * - `level`: visual size class 1..6 (defaults to the numeric part of `as`)
 * - `size`: explicit font-size token (overrides `level` when set)
 *
 * Plus accessory parts from the official DADS Figma:
 *
 * - `shoulder`: small label rendered above the heading inside `<hgroup>`
 * - `subtitle`: descriptive line rendered below the heading inside `<hgroup>`
 * - `icon`: leading icon (string class name for `<i class>` glyph fonts)
 * - `chip`: inline chip badge — `#chip` slot for full DadsChipLabel control
 */

export type DadsHeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

export type DadsHeadingLevel = 1 | 2 | 3 | 4 | 5 | 6

/**
 * Font-size token matching the DADS Figma `data-size` scale (`14` ... `36`
 * px). Independent from `level` and `as` so callers can produce e.g. an
 * `<h1>` with size `'20'` for a narrow sidebar heading.
 */
export type DadsHeadingSize = '14' | '16' | '18' | '20' | '24' | '28' | '32' | '36'

export interface DadsHeadingProps {
  /**
   * HTML element to render — controls the semantic outline. Defaults to 'h2'.
   */
  as?: DadsHeadingTag
  /**
   * Visual size level (1–6). Defaults to the numeric part of `as`, so the
   * visual style follows the semantic level unless explicitly overridden.
   */
  level?: DadsHeadingLevel
  /**
   * Explicit font-size token in px. Overrides `level` when set. Use this to
   * decouple the visual heading size from both the HTML tag and the level
   * scale (e.g. an `<h1>` sized at 20px for a sidebar).
   */
  size?: DadsHeadingSize
  /**
   * Optional "shoulder" label rendered above the heading inside an
   * `<hgroup>` wrapper. Use for category badges that should be associated
   * with the heading by assistive technology.
   */
  shoulder?: string
  /**
   * Optional subtitle rendered below the heading inside an `<hgroup>`
   * wrapper. The `#subtitle` slot takes precedence when provided.
   */
  subtitle?: string
  /**
   * Material Design Icon class name rendered before the heading text.
   * The `#prepend-icon` slot takes precedence when provided (use the slot
   * for custom SVG, the prop for MDI classes).
   */
  icon?: string
}
