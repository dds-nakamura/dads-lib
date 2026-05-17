import type { DadsCarouselProps } from './DadsCarousel.types';
type __VLS_Slots = {
    default(props: {
        index: number;
        isActive: boolean;
    }): unknown;
};
declare const __VLS_base: import("vue").DefineComponent<DadsCarouselProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    "update:modelValue": (value: number) => any;
    change: (value: number) => any;
}, string, import("vue").PublicProps, Readonly<DadsCarouselProps> & Readonly<{
    "onUpdate:modelValue"?: ((value: number) => any) | undefined;
    onChange?: ((value: number) => any) | undefined;
}>, {
    type: import("./DadsCarousel.types").DadsCarouselType;
    ariaLabel: string;
    modelValue: number;
    mode: import("./DadsCarousel.types").DadsCarouselMode;
    autoPlay: boolean;
    interval: number;
    pauseOnHover: boolean;
    showArrows: boolean;
    showIndicators: boolean;
    loop: boolean;
    headingLevel: import("./DadsCarousel.types").DadsCarouselHeadingLevel;
    visibleCount: number;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
//# sourceMappingURL=DadsCarousel.vue.d.ts.map