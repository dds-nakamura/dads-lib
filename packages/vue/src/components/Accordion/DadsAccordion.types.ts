/**
 * Type definitions for DadsAccordion.
 */

/** Accordion behavior. `single` keeps at most one panel open at a time. */
export type DadsAccordionType = 'single' | 'multiple'

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
}

export interface DadsAccordionEmits {
  (e: 'update:modelValue', value: string | string[]): void
}
