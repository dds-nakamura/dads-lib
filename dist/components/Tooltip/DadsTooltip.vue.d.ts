import type { DadsTooltipProps } from './DadsTooltip.types';
declare var __VLS_1: {}, __VLS_15: {};
type __VLS_Slots = {} & {
    trigger?: (props: typeof __VLS_1) => any;
} & {
    default?: (props: typeof __VLS_15) => any;
};
declare const __VLS_base: import("vue").DefineComponent<DadsTooltipProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<DadsTooltipProps> & Readonly<{}>, {
    disabled: boolean;
    position: import("./DadsTooltip.types").DadsTooltipPosition;
    openDelay: number;
    closeDelay: number;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
//# sourceMappingURL=DadsTooltip.vue.d.ts.map