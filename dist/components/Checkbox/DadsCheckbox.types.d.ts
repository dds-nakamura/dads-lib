import type { DadsSize } from '../../types/common';
export type DadsCheckboxSize = Exclude<DadsSize, 'xs'>;
export interface DadsCheckboxProps {
    modelValue?: boolean;
    /** Render the third "mixed" state. The DOM `indeterminate` property is
     *  applied imperatively because Vue template binding only updates HTML
     *  attributes, not properties. */
    indeterminate?: boolean;
    size?: DadsCheckboxSize;
    label?: string;
    hint?: string;
    errorMessage?: string;
    required?: boolean;
    /** Forces the error visual state when no message is available. */
    error?: boolean;
    disabled?: boolean;
    /** Native checkboxes do not support readonly. The component blocks
     *  modelValue updates while keeping the input focusable. */
    readonly?: boolean;
    name?: string;
    /** Native `id`. When omitted, an id is generated so the label `for` and
     *  ARIA `aria-describedby` references stay in sync. */
    id?: string;
    /** Native `value` attribute, used when the checkbox participates in a
     *  group (e.g. DadsCheckboxGroup) to identify the selected option. */
    value?: string | number | boolean;
    /**
     * 「必須」バッジに表示するテキスト。i18n 用にプロップで上書き可能。
     * Default: `'必須'`.
     */
    requiredLabel?: string;
}
export interface DadsCheckboxEmits {
    (e: 'update:modelValue', value: boolean): void;
    (e: 'change', event: Event): void;
    (e: 'focus', event: FocusEvent): void;
    (e: 'blur', event: FocusEvent): void;
}
//# sourceMappingURL=DadsCheckbox.types.d.ts.map