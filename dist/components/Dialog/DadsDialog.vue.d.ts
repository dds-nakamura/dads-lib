import type { DadsDialogProps } from './DadsDialog.types';
declare var __VLS_13: {}, __VLS_15: {}, __VLS_17: {};
type __VLS_Slots = {} & {
    header?: (props: typeof __VLS_13) => any;
} & {
    default?: (props: typeof __VLS_15) => any;
} & {
    footer?: (props: typeof __VLS_17) => any;
};
declare const __VLS_base: import("vue").DefineComponent<DadsDialogProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    "update:modelValue": (value: boolean) => any;
    open: () => any;
    close: () => any;
}, string, import("vue").PublicProps, Readonly<DadsDialogProps> & Readonly<{
    "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
    onOpen?: (() => any) | undefined;
    onClose?: (() => any) | undefined;
}>, {
    variant: import("./DadsDialog.types").DadsDialogVariant;
    size: import("./DadsDialog.types").DadsDialogSize;
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