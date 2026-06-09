import type { DadsFormControlLabelProps } from './DadsFormControlLabel.types';
declare var __VLS_14: {}, __VLS_16: {}, __VLS_18: {}, __VLS_20: {}, __VLS_22: {};
type __VLS_Slots = {} & {
    label?: (props: typeof __VLS_14) => any;
} & {
    status?: (props: typeof __VLS_16) => any;
} & {
    'support-text'?: (props: typeof __VLS_18) => any;
} & {
    default?: (props: typeof __VLS_20) => any;
} & {
    error?: (props: typeof __VLS_22) => any;
};
declare const __VLS_base: import("vue").DefineComponent<DadsFormControlLabelProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<DadsFormControlLabelProps> & Readonly<{}>, {
    size: import("./DadsFormControlLabel.types").DadsFormControlLabelSize;
    required: boolean;
    disabled: boolean;
    as: import("./DadsFormControlLabel.types").DadsFormControlLabelTag;
    requiredLabel: string;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
//# sourceMappingURL=DadsFormControlLabel.vue.d.ts.map