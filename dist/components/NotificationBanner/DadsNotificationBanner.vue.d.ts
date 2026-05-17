import type { DadsNotificationBannerColor, DadsNotificationBannerProps } from './DadsNotificationBanner.types';
declare var __VLS_7: {}, __VLS_9: {}, __VLS_11: {};
type __VLS_Slots = {} & {
    icon?: (props: typeof __VLS_7) => any;
} & {
    default?: (props: typeof __VLS_9) => any;
} & {
    action?: (props: typeof __VLS_11) => any;
};
declare const __VLS_base: import("vue").DefineComponent<DadsNotificationBannerProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    "update:modelValue": (value: boolean) => any;
    close: () => any;
}, string, import("vue").PublicProps, Readonly<DadsNotificationBannerProps> & Readonly<{
    "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
    onClose?: (() => any) | undefined;
}>, {
    color: DadsNotificationBannerColor;
    style: import("./DadsNotificationBanner.types").DadsNotificationBannerStyle;
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