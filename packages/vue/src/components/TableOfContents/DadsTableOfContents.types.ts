/**
 * Page navigation (in-page Table of Contents) item descriptor.
 *
 * - `id` はページ内アンカーの fragment 識別子。`href` が省略された場合は
 *   `#${id}` が自動で使用される。
 * - `children` を持つ項目はネスト構造として描画される (UL が入れ子になる)。
 */
export interface DadsPageNavigationItem {
  /** ページ内 fragment id (必須)。`href` 省略時は `#${id}` が href になる。 */
  id: string
  /** 表示テキスト。 */
  label: string
  /**
   * リンク先 URL。省略時は `#${id}` が使用される。
   * 別ページや絶対 URL を指す場合に明示する。
   */
  href?: string
  /** ネストした子項目。 */
  children?: DadsPageNavigationItem[]
}

export interface DadsPageNavigationProps {
  /** 目次項目。フラットまたはネスト構造のいずれにも対応する。 */
  items: DadsPageNavigationItem[]
  /**
   * 現在アクティブなセクションの `id`。一致する項目に
   * `aria-current="location"` と active クラスが付与される。
   * scroll-spy などの実装は呼び出し側で行う想定。
   */
  activeId?: string
  /** `<nav>` 要素の `aria-label`。デフォルト `'このページの目次'`。 */
  ariaLabel?: string
}

export interface DadsPageNavigationEmits {
  /** 目次内のリンクがクリックされたときに発火。 */
  (e: 'click:item', item: DadsPageNavigationItem, event: MouseEvent): void
}
