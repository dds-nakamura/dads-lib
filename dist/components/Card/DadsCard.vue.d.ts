import type { DadsCardProps } from './DadsCard.types';
declare var __VLS_11: {}, __VLS_13: {}, __VLS_15: {}, __VLS_17: {}, __VLS_19: {};
type __VLS_Slots = {} & {
    image?: (props: typeof __VLS_11) => any;
} & {
    header?: (props: typeof __VLS_13) => any;
} & {
    default?: (props: typeof __VLS_15) => any;
} & {
    sub?: (props: typeof __VLS_17) => any;
} & {
    footer?: (props: typeof __VLS_19) => any;
};
declare const __VLS_base: import("vue").DefineComponent<DadsCardProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    click: (event: MouseEvent | KeyboardEvent) => any;
}, string, import("vue").PublicProps, Readonly<DadsCardProps> & Readonly<{
    onClick?: ((event: MouseEvent | KeyboardEvent) => any) | undefined;
}>, {
    variant: import("./DadsCard.types").DadsCardVariant;
    clickable: boolean;
    elevation: import("./DadsCard.types").DadsCardElevation;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
//# sourceMappingURL=DadsCard.vue.d.ts.map