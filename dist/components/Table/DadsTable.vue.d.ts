import type { DadsTableBorder, DadsTableProps } from './DadsTable.types';
declare var __VLS_8: {}, __VLS_10: {};
type __VLS_Slots = {} & {
    caption?: (props: typeof __VLS_8) => any;
} & {
    default?: (props: typeof __VLS_10) => any;
};
declare const __VLS_base: import("vue").DefineComponent<DadsTableProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<DadsTableProps> & Readonly<{}>, {
    dense: boolean;
    striped: boolean;
    hoverable: boolean;
    selectable: boolean;
    cellBorder: DadsTableBorder;
    border: DadsTableBorder;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
//# sourceMappingURL=DadsTable.vue.d.ts.map