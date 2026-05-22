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
    label?: string;
    /** Secondary descriptive text rendered below the label. Distinct from `hint`
     *  (which sits under the whole control in the footer), `description` belongs
     *  to the option itself and is exposed via `aria-describedby` so screen
     *  readers announce it when the radio gains focus. Use for selection list
     *  items where each option carries its own explanatory paragraph (e.g. plan
     *  picker, settings list). */
    description?: string;
    hint?: string;
    errorMessage?: string;
    required?: boolean;
    /** Forces the error visual state when no message is available — for example,
     *  when the form-level error is shown elsewhere. Pair with an external label
     *  so screen readers still announce the failure. */
    error?: boolean;
    disabled?: boolean;
    /** Group identifier. Same `name` across radios makes the browser enforce
     *  single-selection. DadsRadioGroup (next task) will inject this. */
    name?: string;
    /** Native `id`. When omitted, an id is generated so the label `for` and
     *  ARIA `aria-describedby` references stay in sync. */
    id?: string;
    /**
     * 「必須」バッジに表示するテキスト。i18n 用にプロップで上書き可能。
     * Default: `'必須'`.
     */
    requiredLabel?: string;
}
export interface DadsRadioEmits {
    (e: 'update:modelValue', value: DadsRadioValue): void;
    (e: 'change', event: Event): void;
    (e: 'focus', event: FocusEvent): void;
    (e: 'blur', event: FocusEvent): void;
}
//# sourceMappingURL=DadsRadio.types.d.ts.map