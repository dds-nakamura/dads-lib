/**
 * Type definitions for DadsPageNavigation (pagination / ページ送り).
 *
 * DadsPageNavigation is a pagination control: prev / page-number / next
 * buttons used to navigate between pages of a paginated list (search results,
 * tables, archives, etc.). It is **NOT** a Table of Contents — for in-page
 * section navigation, use `DadsTableOfContents`.
 *
 * 公式仕様: https://design.digital.go.jp/dads/components/page-navigation/
 *   (ガイドラインは公式側で準備中。Figma `Page Navigation` フレームと整合する
 *    pagination API として実装。)
 */
export interface DadsPageNavigationProps {
    /** 1-indexed current page number. v-model target. */
    modelValue: number;
    /** Total number of pages. Must be >= 1. */
    totalPages: number;
    /**
     * Maximum number of page-number buttons displayed at once. Default `7`.
     * Set to `0` to hide the page-number list (only prev/next remain).
     * When `totalPages > maxPageButtons`, `…` ellipses are inserted to keep
     * the first / last / current pages always visible.
     */
    maxPageButtons?: number;
    /** Show the `< 前のページ` / `次のページ >` buttons. Default `true`. */
    showPrevNext?: boolean;
    /** Show the `<<` / `>>` first/last jump buttons. Default `false`. */
    showFirstLast?: boolean;
    /** Custom label for the previous button. Default `'前のページ'`. */
    prevLabel?: string;
    /** Custom label for the next button. Default `'次のページ'`. */
    nextLabel?: string;
    /** Custom label for the first button. Default `'最初のページ'`. */
    firstLabel?: string;
    /** Custom label for the last button. Default `'最後のページ'`. */
    lastLabel?: string;
    /** Accessible label for the wrapping `<nav>`. Default `'ページ送り'`. */
    ariaLabel?: string;
    /** Disable the entire pagination control. */
    disabled?: boolean;
}
export interface DadsPageNavigationEmits {
    /** Emitted when the active page changes. v-model target. */
    (e: 'update:modelValue', value: number): void;
    /** Emitted alongside `update:modelValue` for non v-model consumers. */
    (e: 'change', value: number): void;
}
/**
 * Internal page-list item type used by the template. Exported for testing.
 * `'ellipsis'` represents a `…` placeholder between page-number buttons.
 */
export type DadsPageNavigationPageEntry = number | 'ellipsis';
//# sourceMappingURL=DadsPageNavigation.types.d.ts.map