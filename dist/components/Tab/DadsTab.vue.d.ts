import type { DadsTabProps, DadsTabValue } from './DadsTab.types';
declare var __VLS_2: `panel-${string}` | `panel-${number}`, __VLS_3: {};
type __VLS_Slots = {} & {
    [K in NonNullable<typeof __VLS_2>]?: (props: typeof __VLS_3) => any;
};
declare const __VLS_base: import("vue").DefineComponent<DadsTabProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    "update:modelValue": (value: DadsTabValue) => any;
    change: (value: DadsTabValue) => any;
}, string, import("vue").PublicProps, Readonly<DadsTabProps> & Readonly<{
    "onUpdate:modelValue"?: ((value: DadsTabValue) => any) | undefined;
    onChange?: ((value: DadsTabValue) => any) | undefined;
}>, {
    ariaLabel: string;
    orientation: import("./DadsTab.types").DadsTabOrientation;
    keepAlive: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
//# sourceMappingURL=DadsTab.vue.d.ts.map