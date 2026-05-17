import type { DadsChipProps } from './DadsChip.types';
declare var __VLS_11: {}, __VLS_13: {}, __VLS_15: {};
type __VLS_Slots = {} & {
    prepend?: (props: typeof __VLS_11) => any;
} & {
    default?: (props: typeof __VLS_13) => any;
} & {
    append?: (props: typeof __VLS_15) => any;
};
declare const __VLS_base: import("vue").DefineComponent<DadsChipProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    click: (event: MouseEvent | KeyboardEvent) => any;
    close: (event: MouseEvent) => any;
}, string, import("vue").PublicProps, Readonly<DadsChipProps> & Readonly<{
    onClick?: ((event: MouseEvent | KeyboardEvent) => any) | undefined;
    onClose?: ((event: MouseEvent) => any) | undefined;
}>, {
    size: import("./DadsChip.types").DadsChipSize;
    color: import("./DadsChip.types").DadsChipColor;
    disabled: boolean;
    closable: boolean;
    clickable: boolean;
    closeLabel: string;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
//# sourceMappingURL=DadsChip.vue.d.ts.map