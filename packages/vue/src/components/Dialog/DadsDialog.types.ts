/**
 * Public Props / Emits types for DadsDialog.
 *
 * The dialog renders a centered panel over an overlay — toggled by
 * `modelValue` — with three slots (default body, header, footer) and four
 * size presets. The shape mirrors the DADS HTML reference, with a
 * `persistent` escape hatch so callers can opt out of dismissal on Esc /
 * overlay-click for irreversible flows.
 *
 * 公式 slug は `dialog`。旧名 `DadsModal` は deprecated alias として併存する。
 */

/** Width preset. `fullscreen` covers the viewport. */
export type DadsDialogSize = 'sm' | 'md' | 'lg' | 'fullscreen'

export interface DadsDialogProps {
  /** Open state. Acts as v-model. */
  modelValue?: boolean
  /** Width preset. Defaults to 'md'. */
  size?: DadsDialogSize
  /** Header title. Used both as the visible heading and as aria-labelledby target. */
  title?: string
  /** When true, disables Esc / overlay-click dismissal. The close button still works. */
  persistent?: boolean
  /** Render the close button in the header. Defaults to true. */
  closable?: boolean
  /** aria-label for the close button. Defaults to '閉じる'. */
  closeLabel?: string
}

export interface DadsDialogEmits {
  (e: 'update:modelValue', value: boolean): void
  (e: 'close'): void
  (e: 'open'): void
}
