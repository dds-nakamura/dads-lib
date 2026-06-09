import type { DadsRadioSize } from '../Radio/DadsRadio.types';
export type DadsRadioGroupDirection = 'vertical' | 'horizontal';
/** Value types accepted by `modelValue` and each item's `value`. */
export type DadsRadioGroupValue = string | number | boolean;
export interface DadsRadioGroupItem {
    value: DadsRadioGroupValue;
    label: string;
    /** Disable this item only. The group's `disabled` prop overrides this when true. */
    disabled?: boolean;
    hint?: string;
    /** Secondary descriptive text rendered under the item label and exposed via
     *  `aria-describedby`. Forwarded to the child DadsRadio's `description`. */
    description?: string;
}
export interface DadsRadioGroupProps {
    modelValue?: DadsRadioGroupValue | null;
    items: DadsRadioGroupItem[];
    legend?: string;
    /** Visually hide the legend (it stays in the DOM and remains the accessible
     *  group name for screen readers). Use when the group is labeled visually
     *  by adjacent UI but a legend is still needed for a11y. */
    legendVisuallyHidden?: boolean;
    /** Layout direction of the radios. Defaults to 'vertical'. */
    direction?: DadsRadioGroupDirection;
    size?: DadsRadioSize;
    hint?: string;
    errorMessage?: string;
    required?: boolean;
    /** Forces the error visual state and propagates it to every child radio.
     *  Pair with errorMessage to render the form-control-label error text. */
    error?: boolean;
    /** Disables every child radio via the native fieldset behavior. */
    disabled?: boolean;
    /** Group name shared by every child radio. When omitted, a unique name is
     *  generated so multiple groups on the same page do not interfere. */
    name?: string;
    id?: string;
    /**
     * 必須マーカー (`※必須`) に表示するテキスト。i18n 用にプロップで上書き可能。
     * 公式 `dads-form-control-label` の `__requirement` として描画される。
     * Default: `'※必須'`.
     */
    requiredLabel?: string;
}
export interface DadsRadioGroupEmits {
    (e: 'update:modelValue', value: DadsRadioGroupValue): void;
    (e: 'change', value: DadsRadioGroupValue): void;
}
//# sourceMappingURL=DadsRadioGroup.types.d.ts.map