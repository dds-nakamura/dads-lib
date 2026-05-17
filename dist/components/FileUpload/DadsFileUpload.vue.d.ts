import type { DadsFileUploadProps } from './DadsFileUpload.types';
declare const __VLS_export: import("vue").DefineComponent<DadsFileUploadProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    "update:modelValue": (value: File | File[] | null) => any;
    change: (files: File[]) => any;
    focus: (event: FocusEvent) => any;
    blur: (event: FocusEvent) => any;
    remove: (file: File) => any;
}, string, import("vue").PublicProps, Readonly<DadsFileUploadProps> & Readonly<{
    "onUpdate:modelValue"?: ((value: File | File[] | null) => any) | undefined;
    onChange?: ((files: File[]) => any) | undefined;
    onFocus?: ((event: FocusEvent) => any) | undefined;
    onBlur?: ((event: FocusEvent) => any) | undefined;
    onRemove?: ((file: File) => any) | undefined;
}>, {
    error: boolean;
    size: import("./DadsFileUpload.types").DadsFileUploadSize;
    disabled: boolean;
    required: boolean;
    readonly: boolean;
    multiple: boolean;
    buttonText: string;
    dropzoneText: string;
    expandDropArea: boolean;
    showFileSize: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
//# sourceMappingURL=DadsFileUpload.vue.d.ts.map