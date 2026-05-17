import type { DadsAccordionProps } from './DadsAccordion.types';
declare var __VLS_2: `panel-${string}`, __VLS_3: {};
type __VLS_Slots = {} & {
    [K in NonNullable<typeof __VLS_2>]?: (props: typeof __VLS_3) => any;
};
declare const __VLS_base: import("vue").DefineComponent<DadsAccordionProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    "update:modelValue": (value: string | string[]) => any;
}, string, import("vue").PublicProps, Readonly<DadsAccordionProps> & Readonly<{
    "onUpdate:modelValue"?: ((value: string | string[]) => any) | undefined;
}>, {
    type: import("./DadsAccordion.types").DadsAccordionType;
    size: import("./DadsAccordion.types").DadsAccordionSize;
    modelValue: string | string[];
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