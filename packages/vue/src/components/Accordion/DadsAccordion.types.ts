/**
 * Type definitions for DadsAccordion.
 *
 * A single collapsible region rendered as a native `<details>` / `<summary>`
 * pair, 1:1 faithful to the official DADS accordion (bordered-circle chevron
 * icon + heading-wrapped summary title + optional back-link). Mirrors the
 * sibling DadsDisclosure API: stack multiple `<DadsAccordion>` elements in
 * sequence to build a multi-item accordion.
 */

/** Heading level used to wrap the summary title (official uses `<h3>`). */
export type DadsAccordionHeadingLevel = 1 | 2 | 3 | 4 | 5 | 6

export interface DadsAccordionProps {
  /**
   * Controlled open state. When provided, the component is controlled — the
   * consumer is expected to react to `update:modelValue` and pass the new
   * value back via `v-model`.
   */
  modelValue?: boolean
  /**
   * Initial open state for uncontrolled usage (when `modelValue` is not
   * provided). Defaults to `false`.
   */
  defaultOpen?: boolean
  /** Visible label rendered inside the `<summary>` heading. */
  title: string
  /**
   * Heading level for the title inside `<summary>`. Defaults to `3`, matching
   * the official `<h3>`.
   */
  headingLevel?: DadsAccordionHeadingLevel
  /** Disable interaction; click and keyboard activation are ignored. */
  disabled?: boolean
  /**
   * When `true`, renders the official back-link anchor at the end of the
   * content, pointing to the summary id. Defaults to `false`.
   */
  backLink?: boolean
  /**
   * Override the back-link label text. Defaults to `「${title}」の先頭に戻る`.
   */
  backLinkLabel?: string
}

export interface DadsAccordionEmits {
  (e: 'update:modelValue', value: boolean): void
  /** Fired whenever the open state changes (controlled or uncontrolled). */
  (e: 'toggle', value: boolean): void
}
