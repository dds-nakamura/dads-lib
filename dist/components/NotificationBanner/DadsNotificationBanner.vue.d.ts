import type { DadsNotificationBannerColor, DadsNotificationBannerProps } from './DadsNotificationBanner.types';
declare var __VLS_7: {}, __VLS_14: {}, __VLS_16: {};
type __VLS_Slots = {} & {
    icon?: (props: typeof __VLS_7) => any;
} & {
    default?: (props: typeof __VLS_14) => any;
} & {
    action?: (props: typeof __VLS_16) => any;
};
declare const __VLS_base: import("vue").DefineComponent<DadsNotificationBannerProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    close: () => any;
    "update:modelValue": (value: boolean) => any;
}, string, import("vue").PublicProps, Readonly<DadsNotificationBannerProps> & Readonly<{
    onClose?: (() => any) | undefined;
    "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
}>, {
    style: import("./DadsNotificationBanner.types").DadsNotificationBannerStyle;
    color: DadsNotificationBannerColor;
    modelValue: boolean;
    closable: boolean;
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
//# sourceMappingURL=DadsNotificationBanner.vue.d.ts.map