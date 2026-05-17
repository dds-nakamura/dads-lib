import type { DadsSize } from '../../types/common'

/**
 * Public types for DadsDatePicker.
 *
 * A consolidated-style date picker following the DADS spec: three numeric
 * fields (年/月/日) inside a single bordered control, plus a calendar
 * button that toggles a popover with a month grid. The bound value is a
 * canonical ISO date string in `YYYY-MM-DD` format (or `''` when empty)
 * so the API stays framework- and timezone-agnostic.
 */

// `xs` is intentionally excluded — the date picker visual weight should match
// the rest of the form input family (TextField / Select / Combobox).
export type DadsDatePickerSize = Exclude<DadsSize, 'xs'>

/**
 * Visual variant per official DADS.
 * - `consolidated` (default): three fields in a single bordered control
 * - `separated`: three independent borderless field groups (年 / 月 / 日)
 *   with the calendar button standing alone — denser horizontal layout
 *   that suits printed-form-style UIs.
 */
export type DadsDatePickerVariant = 'consolidated' | 'separated'

/**
 * Calendar locale display.
 * - `gregorian` (default): year shown as e.g. `2026`
 * - `japanese`: year hint shows the matching Japanese era (e.g. `2026 (令和8年)`)
 *   alongside the gregorian year. The bound value stays ISO `YYYY-MM-DD`.
 */
export type DadsDatePickerLocale = 'gregorian' | 'japanese'

export interface DadsDatePickerProps {
  /** Bound value (v-model). ISO `YYYY-MM-DD` string, or `''` when empty. */
  modelValue?: string
  /** Visible label rendered above the control. */
  label?: string
  /** Helper text displayed below the control when there is no error. */
  hint?: string
  /** Error message rendered below the control. Setting this implicitly turns
   *  on the error visual state and links it via `aria-describedby`. */
  errorMessage?: string
  /** Marks the field as required (renders the badge and sets aria-required). */
  required?: boolean
  /** Disable interaction. */
  disabled?: boolean
  /** Render as read-only (dashed border). */
  readonly?: boolean
  /** Forces the error visual state when no message is available. */
  error?: boolean
  /** Size token. Default: `md`. */
  size?: DadsDatePickerSize
  /** Earliest selectable date (ISO `YYYY-MM-DD`). */
  min?: string
  /** Latest selectable date (ISO `YYYY-MM-DD`). */
  max?: string
  /** Placeholder hint shown on each empty numeric field (e.g. `'2024'`). */
  placeholder?: string
  /** Native `name` used by form submission (applied to the hidden value). */
  name?: string
  /** Native `id`. When omitted, an id is generated so the label `for` and
   *  ARIA `aria-describedby` references stay in sync. */
  id?: string
  /** Visual variant. Default `'consolidated'`. */
  variant?: DadsDatePickerVariant
  /** Calendar locale display. Default `'gregorian'`. */
  locale?: DadsDatePickerLocale
}

export interface DadsDatePickerEmits {
  (e: 'update:modelValue', value: string): void
  (e: 'change', value: string): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
}
