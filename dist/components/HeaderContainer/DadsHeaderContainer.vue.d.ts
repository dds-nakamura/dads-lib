import type { DadsHeaderContainerProps } from './DadsHeaderContainer.types';
declare var __VLS_6: {}, __VLS_14: {}, __VLS_16: {}, __VLS_18: {};
type __VLS_Slots = {} & {
    logo?: (props: typeof __VLS_6) => any;
} & {
    nav?: (props: typeof __VLS_14) => any;
} & {
    utility?: (props: typeof __VLS_16) => any;
} & {
    actions?: (props: typeof __VLS_18) => any;
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
    menuExpanded: boolean;
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