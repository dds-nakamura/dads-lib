import type { DadsEmergencyBannerProps } from './DadsEmergencyBanner.types';
declare var __VLS_7: {}, __VLS_9: {};
type __VLS_Slots = {} & {
    title?: (props: typeof __VLS_7) => any;
} & {
    default?: (props: typeof __VLS_9) => any;
};
declare const __VLS_base: import("vue").DefineComponent<DadsEmergencyBannerProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    "update:modelValue": (value: boolean) => any;
    close: () => any;
}, string, import("vue").PublicProps, Readonly<DadsEmergencyBannerProps> & Readonly<{
    "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
    onClose?: (() => any) | undefined;
}>, {
    ariaLabel: string;
    modelValue: boolean;
    closable: boolean;
    closeLabel: string;
    iconName: string;
    linkExternal: boolean;
    newTabHintText: string;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
//# sourceMappingURL=DadsEmergencyBanner.vue.d.ts.map