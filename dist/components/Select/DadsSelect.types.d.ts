import type { DadsSize } from '../../types/common';
export type DadsSelectSize = Exclude<DadsSize, 'xs'>;
export type DadsSelectValue = string | number | boolean;
export interface DadsSelectItem {
    value: DadsSelectValue;
    title: string;
    disabled?: boolean;
    [key: string]: unknown;
}
export type DadsSelectModelValue = DadsSelectValue | DadsSelectValue[] | null | undefined;
export interface DadsSelectProps {
    modelValue?: DadsSelectModelValue;
    items?: DadsSelectItem[];
    /** Property name on each item used as its value. Default: `'value'`. */
    itemValue?: string;
    /** Property name on each item used as its display text. Default: `'title'`. */
    itemTitle?: string;
    multiple?: boolean;
    placeholder?: string;
    /** Native `id`. When omitted, an id is generated so the label `for` and
     *  ARIA references stay in sync across the trigger / listbox / footer. */
    id?: string;
    name?: string;
    size?: DadsSelectSize;
    label?: string;
    hint?: string;
    /** Error message rendered below the trigger. Setting this implicitly turns
     *  on the error visual state and links it via `aria-describedby`. Prefer
     *  this over `error` so screen reader users hear the reason. */
    errorMessage?: string;
    required?: boolean;
    /** Forces the error visual state when no message is available — for
     *  example, when the form-level error is shown elsewhere. */
    error?: boolean;
    disabled?: boolean;
    readonly?: boolean;
    /**
     * Material Design Icons class shown at the start of the trigger
     * (e.g. `'mdi-magnify'`). Optional decorative icon.
     */
    prefixIcon?: string;
    /**
     * Render the selected values as removable chips inside the trigger when
     * `multiple=true`. Defaults to `true`. Set `false` to fall back to the
     * comma-separated text label.
     */
    chips?: boolean;
    /**
     * Formatter for the aria-label on each chip's remove (×) button. Receives
     * the chip's display title. Default produces `` `${title} を削除` ``.
     * Override to localize the select.
     */
    formatRemoveAriaLabel?: (title: string) => string;
    /**
     * 「必須」バッジに表示するテキスト。i18n 用にプロップで上書き可能。
     * Default: `'必須'`.
     */
    requiredLabel?: string;
}
export interface DadsSelectEmits {
    (e: 'update:modelValue', value: DadsSelectModelValue): void;
    (e: 'change', value: DadsSelectModelValue): void;
    (e: 'focus', event: FocusEvent): void;
    (e: 'blur', event: FocusEvent): void;
    (e: 'open'): void;
    (e: 'close'): void;
}
//# sourceMappingURL=DadsSelect.types.d.ts.map