import type { DadsSearchBoxProps } from './DadsSearchBox.types';
declare const __VLS_export: import("vue").DefineComponent<DadsSearchBoxProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    search: (value: string) => any;
    "update:modelValue": (value: string) => any;
    focus: (event: FocusEvent) => any;
    blur: (event: FocusEvent) => any;
    "update:category": (value: string) => any;
    "select:suggestion": (value: string) => any;
}, string, import("vue").PublicProps, Readonly<DadsSearchBoxProps> & Readonly<{
    onSearch?: ((value: string) => any) | undefined;
    "onUpdate:modelValue"?: ((value: string) => any) | undefined;
    onFocus?: ((event: FocusEvent) => any) | undefined;
    onBlur?: ((event: FocusEvent) => any) | undefined;
    "onUpdate:category"?: ((value: string) => any) | undefined;
    "onSelect:suggestion"?: ((value: string) => any) | undefined;
}>, {
    error: boolean;
    size: import("./DadsSearchBox.types").DadsSearchBoxSize;
    disabled: boolean;
    modelValue: string;
    required: boolean;
    readonly: boolean;
    buttonLabel: string;
    clearable: boolean;
    clearLabel: string;
    category: string;
    categoryPlaceholder: string;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
//# sourceMappingURL=DadsSearchBox.vue.d.ts.map