import type { DadsSize } from '../../types/common';
export type DadsFileUploadSize = Exclude<DadsSize, 'xs'>;
export interface DadsFileUploadProps {
    /** v-model. multiple=false → File | null, multiple=true → File[]. */
    modelValue?: File | File[] | null;
    /** Native input `accept` (e.g. ".csv,text/csv,image/*"). Used both as the
     *  underlying attribute and for component-level validation so dropped files
     *  are checked too. */
    accept?: string;
    multiple?: boolean;
    /** Max bytes per file. Files exceeding this size are rejected and surface
     *  the rejection through the internal error message. */
    maxSize?: number;
    size?: DadsFileUploadSize;
    label?: string;
    hint?: string;
    /** Caller-provided error message. The component-internal validation message
     *  (accept / maxSize) takes precedence so users see the actionable reason
     *  for the rejection first. */
    errorMessage?: string;
    required?: boolean;
    /** Forces the error visual state when no message is available. */
    error?: boolean;
    disabled?: boolean;
    readonly?: boolean;
    /** Upload progress 0–100. Caller-driven; the component does not run uploads. */
    progress?: number;
    name?: string;
    /** Native `id`. When omitted, an id is generated so the label `for` and
     *  ARIA `aria-describedby` references stay in sync. */
    id?: string;
    /** Trigger button label. */
    buttonText?: string;
    /** Helper text rendered next to the trigger inside the drop zone. */
    dropzoneText?: string;
    /**
     * Expand the dropzone to cover the entire viewport during drag-over
     * so users can drop a file anywhere on the page. Defaults to `false`.
     */
    expandDropArea?: boolean;
    /**
     * Show the formatted file size (e.g. `"12.3 KB"`) next to each selected
     * file in the preview list. Defaults to `true`.
     */
    showFileSize?: boolean;
}
export interface DadsFileUploadEmits {
    (e: 'update:modelValue', value: File | File[] | null): void;
    /** Fires after validation succeeds with the accepted files. */
    (e: 'change', files: File[]): void;
    /** Fires when a single file is removed via its × button. */
    (e: 'remove', file: File): void;
    (e: 'focus', event: FocusEvent): void;
    (e: 'blur', event: FocusEvent): void;
}
//# sourceMappingURL=DadsFileUpload.types.d.ts.map