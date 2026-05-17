/**
 * Public Props types for DadsBlockquote.
 *
 * The blockquote renders an inline reference to a quoted passage. It mirrors
 * the HTML reference (`<blockquote class="dads-blockquote">`) and optionally
 * appends a `<cite>` element for source attribution. When `citeUrl` is given,
 * the citation is wrapped in an `<a>` so users can navigate to the source.
 *
 * The default slot wins over the `quote` prop — slot content allows callers to
 * embed multiple paragraphs, lists, or other rich markup inside the quote, as
 * shown in the reference `multiple-paragraphs.html` and `with-list.html`.
 */
export interface DadsBlockquoteProps {
    /**
     * Quote text. Rendered inside a single `<p>` when no default slot is
     * provided. Ignored if the default slot is used.
     */
    quote?: string;
    /**
     * Source attribution rendered in a trailing `<cite>` element. When omitted,
     * the `<cite>` element is not rendered at all.
     */
    cite?: string;
    /**
     * Optional URL for the source. When supplied alongside `cite`, the citation
     * label is wrapped in an `<a href="…">` so users can navigate to the
     * original material.
     */
    citeUrl?: string;
}
//# sourceMappingURL=DadsBlockquote.types.d.ts.map