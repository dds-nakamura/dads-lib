/**
 * Type definitions for DadsDescriptionList.
 *
 * DadsDescriptionList is a presentation-only wrapper around the native
 * `<dl>` / `<dt>` / `<dd>` elements. It renders pairs of terms and their
 * descriptions and exposes the DADS marker variants (`none` / `bullet` /
 * `custom`) and a Vue-layer `layout` (`horizontal` / `vertical`) so the
 * component can be reused in both inline forms and stacked detail views.
 */
/**
 * A single term / description pair rendered inside the description list.
 *
 * Both fields are plain strings. When richer HTML is required (icons,
 * links, line breaks) consumers should bypass `items` and supply their
 * own `<dt>` / `<dd>` markup via the default slot instead.
 */
export interface DadsDescriptionListItem {
    /** Term — rendered inside `<dt>`. */
    term: string;
    /** Description — rendered inside `<dd>`. */
    description: string;
}
/**
 * Layout of each term / description pair.
 * - `horizontal`: `<dt>` and `<dd>` sit on the same row (default).
 * - `vertical`:   `<dd>` stacks below its `<dt>` (mobile-friendly).
 */
export type DadsDescriptionListLayout = 'horizontal' | 'vertical';
/**
 * Marker variant on the `<dt>` element. Mirrors the official HTML example's
 * `data-marker` attribute.
 * - `none`:   plain bold term (default).
 * - `bullet`: disc bullet rendered in front of every term.
 * - `custom`: consumer supplies an inline `<span>` (number, icon, …) as
 *             the first child of each `<dt>` and the component reserves
 *             space for it.
 */
export type DadsDescriptionListMarker = 'none' | 'bullet' | 'custom';
export interface DadsDescriptionListProps {
    /**
     * Optional array of term / description pairs. When provided, the component
     * renders the `<dl>` body itself. When omitted, the default slot is used
     * verbatim so consumers can hand-author `<dt>` / `<dd>` markup.
     */
    items?: DadsDescriptionListItem[];
    /** Layout of each pair. Defaults to `'horizontal'`. */
    layout?: DadsDescriptionListLayout;
    /** Marker variant on every `<dt>`. Defaults to `'none'`. */
    marker?: DadsDescriptionListMarker;
    /**
     * Draws a 1px divider between every term / description pair.
     * Useful for long lists that need clear visual separation.
     * Defaults to `false`.
     */
    bordered?: boolean;
}
//# sourceMappingURL=DadsDescriptionList.types.d.ts.map