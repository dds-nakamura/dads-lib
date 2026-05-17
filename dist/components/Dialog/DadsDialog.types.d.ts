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
export type DadsDialogSize = 'sm' | 'md' | 'lg' | 'fullscreen';
/**
 * WAI-ARIA Dialog Pattern variant.
 * - `modal`: blocks interaction with the rest of the page, traps focus,
 *   sets `aria-modal="true"`.
 * - `non-modal`: lets users interact with the underlying page; no focus
 *   trap, no `aria-modal` attribute. Often used for inspectors or pickers
 *   that should remain visible while the user keeps working elsewhere.
 */
export type DadsDialogVariant = 'modal' | 'non-modal';
/**
 * Selector or element used by `returnFocusTo` / `initialFocus`. The component
 * resolves a `string` as a `querySelector` call against `document` at the
 * moment focus is requested.
 */
export type DadsDialogFocusTarget = HTMLElement | string;
export interface DadsDialogProps {
    /** Open state. Acts as v-model. */
    modelValue?: boolean;
    /** Width preset. Defaults to 'md'. */
    size?: DadsDialogSize;
    /**
     * WAI-ARIA dialog variant. `modal` (default) traps focus and announces
     * `aria-modal="true"`; `non-modal` releases focus and omits the attribute.
     */
    variant?: DadsDialogVariant;
    /** Header title. Used both as the visible heading and as aria-labelledby target. */
    title?: string;
    /** When true, disables Esc / overlay-click dismissal. The close button still works. */
    persistent?: boolean;
    /** Render the close button in the header. Defaults to true. */
    closable?: boolean;
    /** aria-label for the close button. Defaults to '閉じる'. */
    closeLabel?: string;
    /**
     * Element (or selector) that should receive focus when the dialog opens.
     * When omitted, the panel itself receives focus so screen-reader users
     * land inside the dialog before tabbing further.
     */
    initialFocus?: DadsDialogFocusTarget;
    /**
     * Element (or selector) that should receive focus when the dialog closes.
     * Overrides the default behaviour of restoring focus to whichever element
     * was active when the dialog opened. Use this when the trigger has been
     * unmounted between open and close.
     */
    returnFocusTo?: DadsDialogFocusTarget;
}
export interface DadsDialogEmits {
    (e: 'update:modelValue', value: boolean): void;
    (e: 'close'): void;
    (e: 'open'): void;
}
//# sourceMappingURL=DadsDialog.types.d.ts.map