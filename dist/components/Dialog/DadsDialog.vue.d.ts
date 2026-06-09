import type { DadsDialogProps } from './DadsDialog.types';
declare var __VLS_13: {}, __VLS_20: {}, __VLS_22: {};
type __VLS_Slots = {} & {
    header?: (props: typeof __VLS_13) => any;
} & {
    default?: (props: typeof __VLS_20) => any;
} & {
    footer?: (props: typeof __VLS_22) => any;
};
declare const __VLS_base: import("vue").DefineComponent<DadsDialogProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    close: () => any;
    "update:modelValue": (value: boolean) => any;
    open: () => any;
}, string, import("vue").PublicProps, Readonly<DadsDialogProps> & Readonly<{
    onClose?: (() => any) | undefined;
    "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
    onOpen?: (() => any) | undefined;
}>, {
    size: import("./DadsDialog.types").DadsDialogSize;
    variant: import("./DadsDialog.types").DadsDialogVariant;
    modelValue: boolean;
    closable: boolean;
    closeLabel: string;
    persistent: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
//# sourceMappingURL=DadsDialog.vue.d.ts.map