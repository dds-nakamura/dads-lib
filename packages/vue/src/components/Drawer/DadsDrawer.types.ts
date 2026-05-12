/**
 * Public Props / Emits / item types for DadsDrawer.
 *
 * The drawer renders a modal navigation panel — toggled by `modelValue` —
 * with optional one-level-deep accordion children. The shape mirrors the
 * DADS HTML reference, with disabled / icon support layered on top.
 */

export interface DadsDrawerItem {
  /** Visible text. Required because every item is announced to screen readers. */
  label: string
  /** When set, the item renders as `<a href>` so it follows native link semantics. */
  href?: string
  /** Optional click handler. Receives the original MouseEvent. */
  onClick?: (event: MouseEvent) => void
  /** Visually dim and skip emit / navigation. */
  disabled?: boolean
  /** Nested items render as a `<details>` accordion under the parent. */
  children?: DadsDrawerItem[]
  /** mdi-* class name (e.g. "mdi-home"). */
  icon?: string
}

export interface DadsDrawerProps {
  /** Open state. Acts as v-model. */
  modelValue?: boolean
  items: DadsDrawerItem[]
  /** Drawer header title. Used as fallback aria-label when present. */
  title?: string
  /** aria-label for the close button. Defaults to "閉じる". */
  closeLabel?: string
}

export interface DadsDrawerEmits {
  (e: 'update:modelValue', value: boolean): void
  (e: 'click:item', item: DadsDrawerItem, event: MouseEvent): void
}
