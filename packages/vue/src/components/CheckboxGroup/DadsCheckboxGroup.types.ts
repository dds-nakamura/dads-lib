import type { DadsCheckboxSize } from '../Checkbox/DadsCheckbox.types'

export type DadsCheckboxGroupDirection = 'vertical' | 'horizontal'

/** Discrete value identifying a checkbox option. Mirrors `DadsCheckbox.value`
 *  so the group's modelValue array stays type-compatible with each child. */
export type DadsCheckboxGroupValue = string | number | boolean

export interface DadsCheckboxGroupItem {
  value: DadsCheckboxGroupValue
  label: string
  disabled?: boolean
  hint?: string
}

export interface DadsCheckboxGroupProps {
  /** Selected values. Acts as v-model. */
  modelValue?: DadsCheckboxGroupValue[]
  items: DadsCheckboxGroupItem[]
  /** Visible group label rendered inside `<legend>`. Omitted when empty so
   *  callers can mount the group inside an externally labelled context. */
  legend?: string
  direction?: DadsCheckboxGroupDirection
  /** Forwarded to each child DadsCheckbox so the entire group shares one size. */
  size?: DadsCheckboxSize
  hint?: string
  errorMessage?: string
  required?: boolean
  /** Forces the error visual state when no message is available. */
  error?: boolean
  /** Disables the entire fieldset; child `item.disabled` is also honoured. */
  disabled?: boolean
  /** Native `name` shared by every child input — useful for non-AJAX form posts. */
  name?: string
  /** Native `id` of the fieldset. When omitted, an id is generated so the
   *  hint / error references stay in sync. */
  id?: string
}

export interface DadsCheckboxGroupEmits {
  (e: 'update:modelValue', value: DadsCheckboxGroupValue[]): void
  (e: 'change', value: DadsCheckboxGroupValue[]): void
}
