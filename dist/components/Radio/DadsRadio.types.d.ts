import type { DadsSize } from '../../types/common';
export type DadsRadioSize = Exclude<DadsSize, 'xs'>;
/** Value types accepted by `modelValue` / `value`. `null` is allowed for the
 *  initial unselected state of a group. */
export type DadsRadioValue = string | number | boolean;
export interface DadsRadioProps {
    modelValue?: DadsRadioValue | null;
    /** Required. Emitted as `update:modelValue` when this radio is selected. */
    value: DadsRadioValue;
    size?: DadsRadioSize;
    /** Visible label rendered next to the control (official `dads-radio__label`).
     *  Group-level label / required marker / support / error are owned by
     *  DadsFormControlLabel (via DadsRadioGroup), matching the official system. */
    label?: string;
    /** Forces the error visual state. Sets `aria-invalid="true"` on the input and
     *  switches the control to the error palette. Driven by DadsRadioGroup when the
     *  group is in error. Group-level error text is rendered by DadsFormControlLabel. */
    error?: boolean;
    disabled?: boolean;
    /** Group identifier. Same `name` across radios makes the browser enforce
     *  single-selection. DadsRadioGroup injects this. */
    name?: string;
    /** Native `id`. When omitted, an id is generated so the label association and
     *  any external `aria-*` references stay in sync. */
    id?: string;
    /** Space-separated ids forwarded to the input's `aria-describedby`. Used by
     *  DadsRadioGroup to point a per-item description / hint paragraph at this
     *  radio (the paragraph markup lives in the group, matching the official
     *  form-control-label delegation). */
    ariaDescribedby?: string;
}
export interface DadsRadioEmits {
    (e: 'update:modelValue', value: DadsRadioValue): void;
    (e: 'change', event: Event): void;
    (e: 'focus', event: FocusEvent): void;
    (e: 'blur', event: FocusEvent): void;
}
//# sourceMappingURL=DadsRadio.types.d.ts.map