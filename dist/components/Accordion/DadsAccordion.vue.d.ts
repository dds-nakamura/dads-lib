import type { DadsAccordionProps } from './DadsAccordion.types';
declare var __VLS_7: {};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_7) => any;
};
declare const __VLS_base: import("vue").DefineComponent<DadsAccordionProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    "update:modelValue": (value: boolean) => any;
    toggle: (value: boolean) => any;
}, string, import("vue").PublicProps, Readonly<DadsAccordionProps> & Readonly<{
    "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
    onToggle?: ((value: boolean) => any) | undefined;
}>, {
    disabled: boolean;
    modelValue: boolean;
    defaultOpen: boolean;
    headingLevel: import("./DadsAccordion.types").DadsAccordionHeadingLevel;
    backLink: boolean;
    backLinkLabel: string;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
//# sourceMappingURL=DadsAccordion.vue.d.ts.map