import type { DadsSize } from '../../types/common';
export type DadsTextareaSize = Exclude<DadsSize, 'xs'>;
export type DadsTextareaResize = 'none' | 'vertical' | 'horizontal' | 'both';
export interface DadsTextareaProps {
    modelValue?: string;
    placeholder?: string;
    name?: string;
    /** Native `id`. When omitted, an id is generated so the label `for` and
     *  ARIA `aria-describedby` references stay in sync. */
    id?: string;
    autocomplete?: string;
    maxlength?: number;
    /** Visible row count when `autoResize` is off. Default: 3. */
    rows?: number;
    size?: DadsTextareaSize;
    label?: string;
    hint?: string;
    /** Error message rendered below the textarea. Setting this implicitly turns
     *  on the error visual state and links it via `aria-describedby`. Prefer
     *  this over `error` so screen reader users hear the reason. */
    errorMessage?: string;
    required?: boolean;
    /** Forces the error visual state when no message is available — for
     *  example, when the form-level error is shown elsewhere. Pair with an
     *  external label so screen readers still announce the failure. */
    error?: boolean;
    disabled?: boolean;
    readonly?: boolean;
    /** Show a counter `current / counter` below the textarea. The component does
     *  not enforce the limit; pair with `maxlength` to do so. */
    counter?: number;
    /** CSS `resize` value. Default: `'vertical'`. Forced to `'none'` when
     *  `autoResize` is true so the auto-grown height is not fought by manual
     *  resizing. */
    resize?: DadsTextareaResize;
    /** When true, the textarea height grows with its content between
     *  `minRows` and `maxRows`, and the `resize` style is forced to `'none'`. */
    autoResize?: boolean;
    /** Minimum row count when `autoResize` is on. Default: 2. */
    minRows?: number;
    /** Maximum row count when `autoResize` is on. When omitted, the height
     *  grows without an upper bound. */
    maxRows?: number;
    /**
     * 「必須」バッジに表示するテキスト。i18n 用にプロップで上書き可能。
     * Default: `'必須'`.
     */
    requiredLabel?: string;
}
export interface DadsTextareaEmits {
    (e: 'update:modelValue', value: string): void;
    (e: 'change', event: Event): void;
    (e: 'focus', event: FocusEvent): void;
    (e: 'blur', event: FocusEvent): void;
}
//# sourceMappingURL=DadsTextarea.types.d.ts.map