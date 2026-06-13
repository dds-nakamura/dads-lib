/**
 * Breadcrumb item descriptor.
 *
 * - `href` を指定するとリンクとして描画されるが、最後の項目（現在地）は
 *   常に `<span>` として描画される（DADS / WAI-ARIA 仕様）。
 * - `disabled` が true の項目はリンクにならず、`<span>` として描画される。
 */
export interface DadsBreadcrumbItem {
  /** 表示テキスト。 */
  title: string
  /** リンク先 URL。最後の項目では無視される。 */
  href?: string
  /** true の場合リンクにならず非活性表示にする。 */
  disabled?: boolean
}

export interface DadsBreadcrumbProps {
  /** パンくずリスト項目。先頭から末尾の順で渡す。 */
  items: DadsBreadcrumbItem[]
  /**
   * 項目間の区切り。**未指定時は公式の inline SVG chevron** を描画する。
   * 文字列を渡した場合のみ、その文字で上書きする（テキスト区切りのエスケープハッチ）。
   */
  separator?: string
  /** nav 要素の `aria-label`。デフォルト `'パンくずリスト'`。 */
  ariaLabel?: string
}

export interface DadsBreadcrumbEmits {
  /** href 付き項目（リンク）がクリックされた時に発火。disabled / 末尾項目は対象外。 */
  (e: 'click:item', item: DadsBreadcrumbItem, index: number, event: MouseEvent): void
}
