/**
 * Type definitions for DadsAccordion.
 */

/** Accordion behavior. `single` keeps at most one panel open at a time. */
export type DadsAccordionType = 'single' | 'multiple'

/**
 * Accordion size token (icon + padding). Mirrors the DADS 4-step scale.
 */
export type DadsAccordionSize = 'l' | 'm' | 's' | 'xs'

/**
 * Optional "return link" rendered at the bottom of an open panel — a
 * back-to-top affordance for long accordion content per the DADS spec.
 */
export interface DadsAccordionReturnLink {
  label: string
  href: string
}

export interface DadsAccordionItem {
  /** Unique identifier used for v-model and slot names (`panel-{id}`). */
  id: string
  /** Visible label rendered inside the header button. */
  title: string
  /** Disable interaction; the header is skipped by keyboard navigation. */
  disabled?: boolean
}

export interface DadsAccordionProps {
  /**
   * Currently open panel id(s).
   * - `type='single'`: a single id, or `''` when nothing is open.
   * - `type='multiple'`: an array of ids.
   */
  modelValue?: string | string[]
  /** Accordion item definitions. */
  items: DadsAccordionItem[]
  /** Open behavior. Defaults to `'single'`. */
  type?: DadsAccordionType
  /** Size token. Defaults to `'m'`. Drives header icon size + vertical padding. */
  size?: DadsAccordionSize
  /**
   * When provided, renders a "return link" at the bottom of every open panel
   * (e.g. "ページのトップへ戻る"). Pass as a `{ label, href }` object.
   */
  returnLink?: DadsAccordionReturnLink
}

export interface DadsAccordionEmits {
  (e: 'update:modelValue', value: string | string[]): void
}
