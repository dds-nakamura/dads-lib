import type { DadsTableControlPreset, DadsTableControlProps } from './DadsTableControl.types';
declare const __VLS_export: import("vue").DefineComponent<DadsTableControlProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    reset: () => any;
    "update:search": (value: string) => any;
    "update:page": (value: number) => any;
    "update:pageSize": (value: number) => any;
    "click:preset": (preset: DadsTableControlPreset) => any;
}, string, import("vue").PublicProps, Readonly<DadsTableControlProps> & Readonly<{
    onReset?: (() => any) | undefined;
    "onUpdate:search"?: ((value: string) => any) | undefined;
    "onUpdate:page"?: ((value: number) => any) | undefined;
    "onUpdate:pageSize"?: ((value: number) => any) | undefined;
    "onClick:preset"?: ((preset: DadsTableControlPreset) => any) | undefined;
}>, {
    ariaLabel: string;
    searchQuery: string;
    currentPage: number;
    pageSize: number;
    pageSizeOptions: number[];
    searchPlaceholder: string;
    presets: DadsTableControlPreset[];
    showReset: boolean;
    resetLabel: string;
    showSearch: boolean;
    showPageSize: boolean;
    showPagination: boolean;
    searchLabel: string;
    pageSizeLabel: string;
    paginationAriaLabel: string;
    prevPageAriaLabel: string;
    currentPageAriaLabel: string;
    nextPageAriaLabel: string;
    prevPageLabel: string;
    nextPageLabel: string;
    formatPageSizeOption: (n: number) => string;
    formatRangeLabel: (start: number, end: number, total: number) => string;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
//# sourceMappingURL=DadsTableControl.vue.d.ts.map