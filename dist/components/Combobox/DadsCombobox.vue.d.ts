import type { DadsComboboxItem, DadsComboboxModelValue, DadsComboboxProps } from './DadsCombobox.types';
declare const __VLS_export: import("vue").DefineComponent<DadsComboboxProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    "update:modelValue": (value: DadsComboboxModelValue) => any;
    change: (value: DadsComboboxModelValue) => any;
    focus: (event: FocusEvent) => any;
    blur: (event: FocusEvent) => any;
}, string, import("vue").PublicProps, Readonly<DadsComboboxProps> & Readonly<{
    "onUpdate:modelValue"?: ((value: DadsComboboxModelValue) => any) | undefined;
    onChange?: ((value: DadsComboboxModelValue) => any) | undefined;
    onFocus?: ((event: FocusEvent) => any) | undefined;
    onBlur?: ((event: FocusEvent) => any) | undefined;
}>, {
    error: boolean;
    size: import("./DadsCombobox.types").DadsComboboxSize;
    disabled: boolean;
    required: boolean;
    readonly: boolean;
    requiredLabel: string;
    items: DadsComboboxItem[];
    itemValue: string;
    itemTitle: string;
    multiple: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
//# sourceMappingURL=DadsCombobox.vue.d.ts.map