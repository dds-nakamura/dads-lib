import type { DadsHeaderContainerProps } from './DadsHeaderContainer.types';
declare var __VLS_1: {}, __VLS_9: {}, __VLS_11: {}, __VLS_13: {};
type __VLS_Slots = {} & {
    logo?: (props: typeof __VLS_1) => any;
} & {
    nav?: (props: typeof __VLS_9) => any;
} & {
    utility?: (props: typeof __VLS_11) => any;
} & {
    actions?: (props: typeof __VLS_13) => any;
};
declare const __VLS_base: import("vue").DefineComponent<DadsHeaderContainerProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    "click:menu": (event: MouseEvent) => any;
}, string, import("vue").PublicProps, Readonly<DadsHeaderContainerProps> & Readonly<{
    "onClick:menu"?: ((event: MouseEvent) => any) | undefined;
}>, {
    variant: import("./DadsHeaderContainer.types").DadsHeaderContainerVariant;
    sticky: boolean;
    showMenuToggle: boolean;
    menuToggleLabel: string;
    navAriaLabel: string;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
//# sourceMappingURL=DadsHeaderContainer.vue.d.ts.map