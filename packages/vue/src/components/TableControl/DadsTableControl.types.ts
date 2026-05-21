/**
 * Type definitions for DadsTableControl.
 *
 * DadsTableControl is a sibling/companion to DadsTable. It provides the search
 * box, page-size selector and pagination controls that surround a data table.
 * The component does NOT own the data — it emits update events and lets the
 * parent wire those events to its own data source and DadsTable rendering.
 *
 * 公式仕様: https://design.digital.go.jp/dads/components/table-control/
 * (ガイドラインは公式側で準備中。本実装はテーブル／データテーブル仕様と整合する
 *  形で検索・ページサイズ・ページ送りの最小 API を提供する。)
 */

/**
 * Saved search preset (検索プリセット).
 *
 * Rendered as a row of chip-style buttons below the search input. Clicking a
 * preset replaces `searchQuery` with `query` and emits both `update:search`
 * (so v-model:search updates) and `click:preset` (for analytics / side
 * effects). Matches the DADS Figma `Table Control` "検索プリセットを表示"
 * example.
 */
export interface DadsTableControlPreset {
  label: string
  query: string
}

export interface DadsTableControlProps {
  /** Bound search query (v-model:search). */
  searchQuery?: string
  /** Current 1-indexed page number (v-model:page). Default: `1`. */
  currentPage?: number
  /** Items per page (v-model:pageSize). Default: `10`. */
  pageSize?: number
  /** Total number of rows in the (filtered) data source. Required. */
  totalItems: number
  /** Page-size choices shown in the selector. Default: `[10, 25, 50, 100]`. */
  pageSizeOptions?: number[]
  /** Placeholder text for the search input. Default: `'検索'`. */
  searchPlaceholder?: string
  /**
   * Saved search presets. When provided, they render as a row of small
   * buttons below the search input. Click → sets `searchQuery` to the
   * preset's `query` value.
   */
  presets?: DadsTableControlPreset[]
  /**
   * Show the reset (✕) button inside the search input. Default `true`.
   * The button is hidden automatically when `searchQuery` is empty.
   */
  showReset?: boolean
  /** Accessible label for the reset button. Default `'検索条件をリセット'`. */
  resetLabel?: string
  /** Show the search box. Default: `true`. */
  showSearch?: boolean
  /** Show the page-size selector. Default: `true`. */
  showPageSize?: boolean
  /** Show the pagination (prev / page indicator / next). Default: `true`. */
  showPagination?: boolean
  /** ARIA label for the root group. Default `'テーブルコントロール'`. */
  ariaLabel?: string
  /** Visible label for the search input. Default `'検索'`. */
  searchLabel?: string
  /** Visible label for the page-size selector. Default `'表示件数'`. */
  pageSizeLabel?: string
  /** ARIA label for the pagination navigation. Default `'ページ送り'`. */
  paginationAriaLabel?: string
  /** ARIA label for the previous-page button. Default `'前のページ'`. */
  prevPageAriaLabel?: string
  /** ARIA label for the current-page indicator. Default `'現在のページ'`. */
  currentPageAriaLabel?: string
  /** ARIA label for the next-page button. Default `'次のページ'`. */
  nextPageAriaLabel?: string
  /** Visible label for the previous-page button. Default `'前へ'`. */
  prevPageLabel?: string
  /** Visible label for the next-page button. Default `'次へ'`. */
  nextPageLabel?: string
  /**
   * Formatter for each page-size `<option>` label. Default `` (n) => `${n} 件` ``.
   * Override to i18n: e.g. `` (n) => `${n} items` ``.
   */
  formatPageSizeOption?: (n: number) => string
  /**
   * Formatter for the range status text (visible above pagination).
   * Default produces `'0 件'` when totalItems is 0, or
   * `` `${start}-${end} / ${total} 件` `` otherwise.
   */
  formatRangeLabel?: (start: number, end: number, total: number) => string
}

export interface DadsTableControlEmits {
  /** Search query changed. */
  (e: 'update:search', value: string): void
  /** Current page changed (1-indexed). */
  (e: 'update:page', value: number): void
  /** Page size changed. */
  (e: 'update:pageSize', value: number): void
  /** Emitted when a preset chip is clicked (search is also updated). */
  (e: 'click:preset', preset: DadsTableControlPreset): void
  /** Emitted when the reset button is pressed. */
  (e: 'reset'): void
}
