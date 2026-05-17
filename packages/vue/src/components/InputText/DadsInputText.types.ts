import type { DadsSize } from '../../types/common'

/**
 * 公式 slug は `input-text`。旧名 `DadsTextField` は deprecated alias と
 * して併存する。
 */
export type DadsInputTextSize = Exclude<DadsSize, 'xs'>

export type DadsInputTextType = 'text' | 'email' | 'password' | 'tel' | 'url' | 'number' | 'search'

export type DadsInputTextInputmode =
  | 'text'
  | 'numeric'
  | 'decimal'
  | 'tel'
  | 'search'
  | 'email'
  | 'url'

export interface DadsInputTextProps {
  /** Bound value (v-model). */
  modelValue?: string | number
  /** Native input type. Default: `text`. */
  type?: DadsInputTextType
  /** Placeholder text shown when the input is empty. */
  placeholder?: string
  /** Native `name` attribute, used by form submission. */
  name?: string
  /** Native `id`. When omitted, an id is generated so the label `for` and
   *  ARIA `aria-describedby` references stay in sync. */
  id?: string
  /** Native `autocomplete` attribute. */
  autocomplete?: string
  /** Hard limit on the number of characters the user can type. */
  maxlength?: number
  /** Hint to mobile browsers about which on-screen keyboard to use. */
  inputmode?: DadsInputTextInputmode
  /** Size token. Default: `md`. */
  size?: DadsInputTextSize
  /** Visible label rendered above the input. */
  label?: string
  /** Helper text displayed below the input when there is no error. */
  hint?: string
  /** Error message rendered below the input. Setting this implicitly turns
   *  on the error visual state and links it via `aria-describedby`. Prefer
   *  this over `error` so screen reader users hear the reason. */
  errorMessage?: string
  /** Marks the field as required (renders the badge and sets aria-required). */
  required?: boolean
  /** Forces the error visual state when no message is available — for
   *  example, when the form-level error is shown elsewhere. Pair with an
   *  external label so screen readers still announce the failure. */
  error?: boolean
  /** Disable interaction. */
  disabled?: boolean
  /** Render as read-only (dashed border). */
  readonly?: boolean
  /** Material Design Icon class name shown before the input. e.g. `mdi-tag`. */
  prependIcon?: string
  /** Material Design Icon class name shown after the input. e.g. `mdi-magnify`. */
  appendIcon?: string
  /** Show a counter `current / counter` below the input. The component does
   *  not enforce the limit; pair with `maxlength` to do so. */
  counter?: number
}

export interface DadsInputTextEmits {
  (e: 'update:modelValue', value: string | number): void
  (e: 'change', event: Event): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
}
