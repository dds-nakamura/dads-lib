import type { DadsSize } from '../../types/common'

/**
 * Public types for DadsCombobox.
 *
 * A free-input combobox: the user can pick from a filtered list **or** confirm
 * an arbitrary string with `Enter`. Multi-select renders selected values as
 * `DadsChip` tags with individual remove buttons. The default filter is a
 * case-insensitive substring match against `item.title`; pass a custom
 * `filter` prop to override.
 */

// `xs` is intentionally excluded — the combobox visual weight should match
// the rest of the form input family (TextField / Select / Textarea).
export type DadsComboboxSize = Exclude<DadsSize, 'xs'>

export type DadsComboboxValue = string | number

// Items mirror DadsSelectItem: rendered through `item-value` / `item-title`
// prop lookups so callers can reuse their existing dropdown shapes.
export interface DadsComboboxItem {
  value: DadsComboboxValue
  title: string
  disabled?: boolean
  [key: string]: unknown
}

export type DadsComboboxModelValue = DadsComboboxValue | DadsComboboxValue[] | null | undefined

/**
 * Filter signature. Returns `true` when `item` should remain in the
 * suggestion list for the current `query`. Receives the raw user input;
 * defaults to a case-insensitive substring match against `item.title`.
 */
export type DadsComboboxFilter = (item: DadsComboboxItem, query: string) => boolean

export interface DadsComboboxProps {
  modelValue?: DadsComboboxModelValue
  items?: DadsComboboxItem[]
  /** Property name on each item used as its value. Default: `'value'`. */
  itemValue?: string
  /** Property name on each item used as its display text. Default: `'title'`. */
  itemTitle?: string
  multiple?: boolean
  /** Replace the default substring filter. */
  filter?: DadsComboboxFilter
  placeholder?: string
  /** Native `id`. When omitted, an id is generated so the label `for` and
   *  ARIA references stay in sync across the input / listbox / footer. */
  id?: string
  name?: string
  size?: DadsComboboxSize
  label?: string
  hint?: string
  /** Error message rendered below the control. Setting this implicitly turns
   *  on the error visual state and links it via `aria-describedby`. */
  errorMessage?: string
  required?: boolean
  /** Forces the error visual state when no message is available. */
  error?: boolean
  disabled?: boolean
  readonly?: boolean
}

export interface DadsComboboxEmits {
  (e: 'update:modelValue', value: DadsComboboxModelValue): void
  (e: 'change', value: DadsComboboxModelValue): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
}
