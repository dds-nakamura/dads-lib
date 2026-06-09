/**
 * Public Props for DadsCarouselSingle.
 *
 * 公式 DADS の静止画カルーセル単体バリアント (`dads-carousel-single`) の忠実な移植。
 * 単一の静止画像を表示し、`href` が指定された場合はリンク化する（コントロールなし）。
 *
 * 参照: `design-system-example-components-html/src/components/carousel/`
 *   - `key-visual-single.html`（マークアップ）
 *   - `carousel-single.css`（スタイル）
 *
 * ラッパ要素は公式どおり `href` 無しのとき `<span class="...__link">`、
 * `href` 有りのとき `<a class="...__link" href>` として描画する。
 * 公式 CSS が `:any-link` セレクタを使うため、リンク時のみ hover/focus 演出が効く。
 */
export interface DadsCarouselSingleProps {
    /** 画像の `src`。 */
    src: string;
    /** 画像の代替テキスト（必須）。 */
    alt: string;
    /** 画像の `srcset`（任意。例: `"image@2x.webp 2x"`）。 */
    srcset?: string;
    /** 指定するとラッパが `<a href>` になる。未指定なら `<span>`。 */
    href?: string;
    /** リンク時の `target`（例: `"_blank"`）。`href` 指定時のみ意味を持つ。 */
    target?: string;
    /** リンク時の `rel`（例: `"noopener noreferrer"`）。`href` 指定時のみ意味を持つ。 */
    rel?: string;
    /** 画像の固有幅（px）。CLS 抑止のため指定推奨。 */
    width?: number;
    /** 画像の固有高さ（px）。CLS 抑止のため指定推奨。 */
    height?: number;
}
//# sourceMappingURL=DadsCarouselSingle.types.d.ts.map