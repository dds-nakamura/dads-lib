/**
 * Type definitions for DadsList.
 *
 * DadsList is a presentation-only wrapper around the native `<ul>` element that
 * follows the DADS spec for 箇条書きリスト (bulleted list) and 項番タイプ
 * (numbered list). It exposes two modes:
 *
 * 1. `items` prop — declarative, accepts plain strings or nested
 *    `DadsListItem` objects so the entire tree can be authored as data.
 * 2. Default slot — for cases where the consumer needs to hand-author the
 *    `<li>` children (rich inline elements, links, custom markers, etc.).
 *
 * Note on numbered lists: the official DADS spec mandates `<ul>` for BOTH
 * variants and never uses `<ol>`, because browsers do not expose the `<ol>`
 * marker as copyable text content. For numbered lists the official HTML
 * reference therefore renders `<ul data-marker="number">` and writes the
 * number itself as plain text inside a leading `<span>` (e.g.
 * `<li><span>1. </span><span>label</span></li>`). DadsList mirrors that exact
 * structure when `type='ordered'`.
 */
/**
 * A single list item. When `children` is provided, the item renders a nested
 * `<ul>` inside its `<li>` per the DADS accessibility guideline that
 * sub-lists must be authored inside the parent `<li>` (not as a sibling).
 */
export interface DadsListItem {
    /** Visible text of the item. Rendered inside the parent `<li>`. */
    label: string;
    /**
     * Optional explicit marker text for numbered lists (`type='ordered'`).
     * Rendered verbatim inside a leading `<span>` so it is selectable/copyable
     * text — matching the official DADS pattern (e.g. `'(1) '`, `'a. '`).
     *
     * When omitted, a default `'<n>. '` marker is generated from the item's
     * position (offset by `start`). Ignored for `type='unordered'`.
     */
    marker?: string;
    /** Optional nested children. Each child can again be a string or a `DadsListItem`. */
    children?: (string | DadsListItem)[];
}
/**
 * List variant.
 * - `unordered`: bulleted list, renders `<ul>` with native list markers (default).
 * - `ordered`:   numbered list, renders `<ul data-marker="number">` with the
 *                number written as copyable text inside each `<li>`.
 *
 * Both variants render a native `<ul>` element; the official DADS spec never
 * uses `<ol>` (the marker would not be copyable text). The distinction is
 * carried by the `data-marker="number"` attribute.
 */
export type DadsListType = 'unordered' | 'ordered';
/**
 * Per-item vertical spacing (px). Mirrors the official DADS
 * `data-spacing="4|8|12"` scale. Defaults to `4`.
 */
export type DadsListSpacing = '4' | '8' | '12';
export interface DadsListProps {
    /**
     * Variant of the list. Maps to the DADS `data-marker` distinction
     * (default bullet vs `number`).
     *
     * @default 'unordered'
     */
    type?: DadsListType;
    /**
     * Items to render. Each entry can be:
     * - a plain string — renders a single `<li>` with that text;
     * - a `DadsListItem` — renders an `<li>` with the label, an optional `marker`
     *   (numbered lists), and an optional nested list built from its `children`.
     *
     * When omitted (or empty), the default slot is rendered verbatim so
     * consumers can author `<li>` markup themselves.
     */
    items?: (string | DadsListItem)[];
    /**
     * Starting number for auto-generated markers when `type='ordered'`.
     * The first item without an explicit `marker` is numbered `start`, the next
     * `start + 1`, and so on. Defaults to `1`. Ignored for `unordered` lists and
     * for items that supply their own `marker` text.
     *
     * Note: this no longer maps to the native `<ol start>` attribute (the
     * component renders `<ul>`, never `<ol>`); the number is emitted as copyable
     * text instead.
     */
    start?: number;
    /**
     * Per-item vertical spacing (px). One of `'4'` (default, dense), `'8'`,
     * `'12'`. Mirrors the official DADS `data-spacing` scale.
     */
    spacing?: DadsListSpacing;
    /**
     * Whether nested levels rotate through a marker sequence (disc → circle →
     * square per native browser default). Defaults to `true`. Set `false` to
     * suppress the cascade and keep a single marker style throughout.
     * Only affects `type='unordered'`.
     */
    nestingMarker?: boolean;
}
//# sourceMappingURL=DadsList.types.d.ts.map