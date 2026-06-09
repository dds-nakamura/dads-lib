/**
 * Type definitions for DadsTable.
 *
 * DadsTable is a presentation-only wrapper that reproduces the official DADS
 * canonical table structure verbatim:
 *
 *   <div class="dads-table" [data-size] [data-row-stripe] …>
 *     <table class="dads-table__table" [data-cell-border] [data-border]>
 *       … consumer-authored thead / tbody …
 *     </table>
 *   </div>
 *
 * Header cells are authored by the consumer in the default slot using the
 * official classes `dads-table__col-header` (`<th scope="col">`) and
 * `dads-table__row-header` (`<th scope="row">`). The component ships the scoped
 * CSS for those classes so the symbolic black emphasis border under column
 * headers / at the right edge of row headers is rendered automatically.
 *
 * Sorting, pagination and row selection logic are intentionally left to
 * consumers — the component contributes structure, density, edge borders and
 * theming only.
 *
 * @see design-system-example-components-html/src/components/table/table.css
 */
/**
 * Edge-border specification, mirroring the official `data-cell-border` /
 * `data-border` string API.
 *
 * - `true` / `''` → all four edges (`1px solid` on every `td`/`th`).
 * - A space-separated subset of `'top' | 'right' | 'bottom' | 'left'` →
 *   only those edges (e.g. `'bottom'`, `'top bottom'`).
 * - `false` / `undefined` → no attribute emitted.
 *
 * For `border` (the outer table edge) the additional value `'hidden'` and the
 * `*-hidden` keywords are accepted to suppress specific outer edges.
 */
export type DadsTableBorder = boolean | string;
export interface DadsTableProps {
    /**
     * Optional caption text. When provided (or when the `caption` slot is used)
     * the root element becomes a `<figure>` and a `<figcaption>` is rendered
     * above the table, per the official `with-caption.html` example. The slot
     * takes precedence over this prop.
     */
    caption?: string;
    /**
     * Compact (dense) row density. Maps to the official `data-size="dense"`
     * container attribute (12px vertical padding + line-height 1.3). Defaults to
     * `false` (the comfortable 20px padding + line-height 1.7).
     */
    dense?: boolean;
    /**
     * Tints every even row with `--color-neutral-solid-gray-50`. Maps to the
     * official `data-row-stripe` container attribute. Defaults to `false`.
     */
    striped?: boolean;
    /**
     * Highlights the hovered row with `--color-primitive-blue-50` (guarded by
     * `@media (hover: hover)`). Maps to the official `data-row-hover-highlight`
     * container attribute. Defaults to `false`.
     */
    hoverable?: boolean;
    /**
     * Highlights rows that contain a checked checkbox/radio with
     * `--color-primitive-blue-100`. Maps to the official `data-selectable`
     * container attribute. Defaults to `false`.
     */
    selectable?: boolean;
    /**
     * Per-cell edge borders, applied to the `<table>` as the official
     * `data-cell-border` attribute. See {@link DadsTableBorder}.
     * The most common value is `'bottom'` (header underline + row separators).
     */
    cellBorder?: DadsTableBorder;
    /**
     * Outer table-edge border, applied to the `<table>` as the official
     * `data-border` attribute. See {@link DadsTableBorder}; also accepts
     * `'hidden'` / `'*-hidden'` to suppress edges.
     */
    border?: DadsTableBorder;
}
//# sourceMappingURL=DadsTable.types.d.ts.map