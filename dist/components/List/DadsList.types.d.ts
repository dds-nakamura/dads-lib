/**
 * Type definitions for DadsList.
 *
 * DadsList is a presentation-only wrapper around the native `<ul>` / `<ol>`
 * elements that follows the DADS spec for 箇条書きリスト (bulleted list) and
 * 項番タイプ (numbered list). It exposes two modes:
 *
 * 1. `items` prop — declarative, accepts plain strings or nested
 *    `DadsListItem` objects so the entire tree can be authored as data.
 * 2. Default slot — for cases where the consumer needs to hand-author the
 *    `<li>` children (rich inline elements, links, custom markers, etc.).
 *
 * Note on `<ol>` usage: the official DADS spec recommends `<ul>` for both
 * variants because browsers do not expose the `<ol>` marker as text content.
 * This component still surfaces `type='ordered'` (rendering an `<ol>`) for
 * teams that want the platform-default semantics and the native `start`
 * attribute. Teams that need copy-able numbering should stick to
 * `type='unordered'` and supply pre-rendered numbers inside `items` /
 * default slot, matching the HTML reference (`data-marker="number"`).
 */
/**
 * A single list item. When `children` is provided, the item renders a nested
 * `<ul>` / `<ol>` inside its `<li>` per the DADS accessibility guideline that
 * sub-lists must be authored inside the parent `<li>` (not as a sibling).
 */
export interface DadsListItem {
    /** Visible text of the item. Rendered inside the parent `<li>`. */
    label: string;
    /** Optional nested children. Each child can again be a string or a `DadsListItem`. */
    children?: (string | DadsListItem)[];
}
/**
 * List variant.
 * - `unordered`: bulleted list, renders `<ul>` (default).
 * - `ordered`:   numbered list, renders `<ol>` and supports the native `start`
 *                attribute.
 */
export type DadsListType = 'unordered' | 'ordered';
/**
 * Per-item vertical spacing (px). Mirrors the official DADS
 * `data-spacing="4|8|12"` scale. Defaults to `4`.
 */
export type DadsListSpacing = '4' | '8' | '12';
export interface DadsListProps {
    /**
     * Variant of the list. Mirrors the DADS `data-marker` distinction
     * (default vs `number`).
     *
     * @default 'unordered'
     */
    type?: DadsListType;
    /**
     * Items to render. Each entry can be:
     * - a plain string — renders a single `<li>` with that text;
     * - a `DadsListItem` — renders an `<li>` with the label and an optional
     *   nested list built from its `children`.
     *
     * When omitted (or empty), the default slot is rendered verbatim so
     * consumers can author `<li>` markup themselves.
     */
    items?: (string | DadsListItem)[];
    /**
     * Starting number for `type='ordered'`. Forwarded to the `start` attribute
     * of the underlying `<ol>` element. Ignored for `unordered` lists.
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