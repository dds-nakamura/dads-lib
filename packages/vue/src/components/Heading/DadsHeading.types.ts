/**
 * Type definitions for DadsHeading.
 *
 * `as` controls the rendered HTML element (semantic outline) while `level`
 * controls the visual size. They can be combined freely so callers can keep a
 * correct document outline (e.g. an `<h1>`) while still rendering a smaller
 * visual style (e.g. h3 sizing) when section nesting requires it.
 */

export type DadsHeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

export type DadsHeadingLevel = 1 | 2 | 3 | 4 | 5 | 6

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
}
