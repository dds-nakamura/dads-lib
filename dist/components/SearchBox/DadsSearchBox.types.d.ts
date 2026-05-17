import type { DadsSize } from '../../types/common';
/**
 * SearchBox does not ship an `xs` size in DADS — only `lg` / `md` / `sm`.
 * The HTML reference defaults the search submit button to `lg`, but the size
 * token here governs the entire control (input + button) so consumers can
 * pick a compact variant when needed.
 */
export type DadsSearchBoxSize = Exclude<DadsSize, 'xs'>;
export interface DadsSearchBoxProps {
    /** Bound search query (v-model). */
    modelValue?: string;
    /** Placeholder text shown when the input is empty. */
    placeholder?: string;
    /** Visible label rendered above the input. When omitted, a
     *  visually-hidden label (`buttonLabel` semantics) is used so the input
     *  still has an accessible name. */
    label?: string;
    /** Helper text displayed below the input when there is no error. */
    hint?: string;
    /** Error message rendered below the input. Setting this implicitly turns
     *  on the error visual state and links it via `aria-describedby`. */
    errorMessage?: string;
    /** Marks the field as required (renders the badge and sets aria-required). */
    required?: boolean;
    /** Disable interaction (input + submit button). */
    disabled?: boolean;
    /** Render the input as read-only (dashed border, submit still clickable
     *  unless `disabled` is also set). */
    readonly?: boolean;
    /** Forces the error visual state when no message is available — for
     *  example, when the form-level error is shown elsewhere. */
    error?: boolean;
    /** Size token. Default: `md`. */
    size?: DadsSearchBoxSize;
    /** Native `name` attribute on the input, used by form submission. */
    name?: string;
    /** Native `id`. When omitted, an id is generated so the label `for` and
     *  ARIA `aria-describedby` references stay in sync. */
    id?: string;
    /** Submit button label. Default: `検索`. Also used as the input's
     *  accessible name when `label` is not provided (mirrors the HTML reference
     *  which renders a `dads-u-visually-hidden` span next to the icon). */
    buttonLabel?: string;
    /**
     * Render a × clear button at the trailing edge of the input when the
     * value is non-empty. Default `false`. The button emits
     * `update:modelValue=""` and re-focuses the input.
     */
    clearable?: boolean;
    /** aria-label for the clear button. Default: `クリア`. */
    clearLabel?: string;
    /**
     * Optional autocomplete suggestion list shown below the input. The
     * caller filters / fetches the list reactively; the component renders
     * each entry as a clickable item that, when selected, emits
     * `update:modelValue` + `search` + `select:suggestion`.
     */
    suggestions?: string[];
    /**
     * Optional category dropdown rendered before the input
     * (`<select>` of strings). When provided, the selected category
     * is exposed via `update:category` + emitted on `search`.
     */
    categories?: string[];
    /** Currently selected category (v-model:category). */
    category?: string;
    /** Placeholder for the category select. Default: `カテゴリ`. */
    categoryPlaceholder?: string;
}
export interface DadsSearchBoxEmits {
    (e: 'update:modelValue', value: string): void;
    /** Fired when the user submits the search — either by pressing Enter
     *  inside the input or by clicking the submit button. The payload is the
     *  current query string. */
    (e: 'search', value: string): void;
    (e: 'focus', event: FocusEvent): void;
    (e: 'blur', event: FocusEvent): void;
    /** v-model:category — fires when the category select changes. */
    (e: 'update:category', value: string): void;
    /** Fires when the user picks an item from the suggestion list. */
    (e: 'select:suggestion', value: string): void;
}
//# sourceMappingURL=DadsSearchBox.types.d.ts.map