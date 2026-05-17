import type { DadsSelectItem, DadsSelectModelValue, DadsSelectProps } from './DadsSelect.types';
declare const __VLS_export: import("vue").DefineComponent<DadsSelectProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    "update:modelValue": (value: DadsSelectModelValue) => any;
    change: (value: DadsSelectModelValue) => any;
    focus: (event: FocusEvent) => any;
    blur: (event: FocusEvent) => any;
    open: () => any;
    close: () => any;
}, string, import("vue").PublicProps, Readonly<DadsSelectProps> & Readonly<{
    "onUpdate:modelValue"?: ((value: DadsSelectModelValue) => any) | undefined;
    onChange?: ((value: DadsSelectModelValue) => any) | undefined;
    onFocus?: ((event: FocusEvent) => any) | undefined;
    onBlur?: ((event: FocusEvent) => any) | undefined;
    onOpen?: (() => any) | undefined;
    onClose?: (() => any) | undefined;
}>, {
    error: boolean;
    size: import("./DadsSelect.types").DadsSelectSize;
    disabled: boolean;
    required: boolean;
    readonly: boolean;
    items: DadsSelectItem[];
    itemValue: string;
    itemTitle: string;
    multiple: boolean;
    chips: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
//# sourceMappingURL=DadsSelect.vue.d.ts.map