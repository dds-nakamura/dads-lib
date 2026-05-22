import type { DadsTableProps } from './DadsTable.types';
declare var __VLS_1: {}, __VLS_3: {};
type __VLS_Slots = {} & {
    caption?: (props: typeof __VLS_1) => any;
} & {
    default?: (props: typeof __VLS_3) => any;
};
declare const __VLS_base: import("vue").DefineComponent<DadsTableProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<DadsTableProps> & Readonly<{}>, {
    loading: boolean;
    stickyHeader: boolean;
    density: import("./DadsTable.types").DadsTableDensity;
    bordered: boolean;
    striped: boolean;
    skeletonRowCount: number;
    skeletonColumnCount: number;
    loadingLabel: string;
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