import type { DadsChipTagProps } from './DadsChipTag.types';
declare var __VLS_11: {}, __VLS_13: {}, __VLS_15: {};
type __VLS_Slots = {} & {
    prepend?: (props: typeof __VLS_11) => any;
} & {
    default?: (props: typeof __VLS_13) => any;
} & {
    append?: (props: typeof __VLS_15) => any;
};
declare const __VLS_base: import("vue").DefineComponent<DadsChipTagProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    click: (event: MouseEvent | KeyboardEvent) => any;
    close: (event: MouseEvent) => any;
}, string, import("vue").PublicProps, Readonly<DadsChipTagProps> & Readonly<{
    onClick?: ((event: MouseEvent | KeyboardEvent) => any) | undefined;
    onClose?: ((event: MouseEvent) => any) | undefined;
}>, {
    size: import("./DadsChipTag.types").DadsChipTagSize;
    color: import("./DadsChipTag.types").DadsChipTagColor;
    disabled: boolean;
    closable: boolean;
    clickable: boolean;
    closeLabel: string;
    appearance: import("./DadsChipTag.types").DadsChipTagAppearance;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
//# sourceMappingURL=DadsChipTag.vue.d.ts.map