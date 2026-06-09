import type { DadsSelectItem, DadsSelectModelValue, DadsSelectProps } from './DadsSelect.types';
declare const __VLS_export: import("vue").DefineComponent<DadsSelectProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    close: () => any;
    "update:modelValue": (value: DadsSelectModelValue) => any;
    change: (value: DadsSelectModelValue) => any;
    focus: (event: FocusEvent) => any;
    blur: (event: FocusEvent) => any;
    open: () => any;
}, string, import("vue").PublicProps, Readonly<DadsSelectProps> & Readonly<{
    onClose?: (() => any) | undefined;
    "onUpdate:modelValue"?: ((value: DadsSelectModelValue) => any) | undefined;
    onChange?: ((value: DadsSelectModelValue) => any) | undefined;
    onFocus?: ((event: FocusEvent) => any) | undefined;
    onBlur?: ((event: FocusEvent) => any) | undefined;
    onOpen?: (() => any) | undefined;
}>, {
    error: boolean;
    size: import("./DadsSelect.types").DadsSelectSize;
    required: boolean;
    disabled: boolean;
    requiredLabel: string;
    readonly: boolean;
    items: DadsSelectItem[];
    itemValue: string;
    itemTitle: string;
    multiple: boolean;
    chips: boolean;
    formatRemoveAriaLabel: (title: string) => string;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
//# sourceMappingURL=DadsSelect.vue.d.ts.map