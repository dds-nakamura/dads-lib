/**
 * Public Props / Emits / item types for DadsMenuList.
 *
 * メニューリストはコンテンツエリアのローカルメニュー、もしくはドロップダウン /
 * メガメニュー内に配置するメニュー項目のコレクション。DADS HTML 実装に倣い、
 * `<ul>` / `<li>` / `<a>` または `<button>` の DOM 構造で、`data-type` /
 * `data-size` / `data-current` / `data-expanded` を属性として持たせる。
 *
 * Reference:
 *  - https://design.digital.go.jp/dads/components/menu-list/
 *  - design-system-example-components-html/src/components/menu-list/
 */

/** メニュー項目スタイル。`standard` は角丸 / `box` は矩形。 */
export type DadsMenuListType = 'standard' | 'box'

/** メニュー項目サイズ。 */
export type DadsMenuListSize = 'regular' | 'small'

/**
 * セクション区切り。`true` で divider のみ、オブジェクトでカテゴリータイトル
 * を伴うセクション見出しとして描画する。
 */
export type DadsMenuListSectionConfig = true | { title: string }

/**
 * 項目の意味的な種別 (公式 DADS の「アイコン仕様は挙動別に一貫性を保つ必要」
 * への配慮)。
 * - `link`: ナビゲーション (デフォルト)。`href` の有無で <a>/<button> を選択。
 * - `accordion`: 開閉トリガー。`endIcon` がシェブロン系であることが期待される。
 */
export type DadsMenuListItemKind = 'link' | 'accordion'

export interface DadsMenuListItem {
  /** 表示テキスト (必須)。 */
  label: string
  /**
   * セクション区切りとして描画する。`true` で divider のみ、
   * `{ title }` でカテゴリータイトル付きセクションヘッダになる。
   * セクションアイテムは `label` を SR の見出しテキストとして使う。
   */
  divider?: DadsMenuListSectionConfig
  /** 項目の意味的種別。デフォルト `'link'`。 */
  itemKind?: DadsMenuListItemKind
  /** href を指定すると `<a>` として描画、未指定時は `<button>` として描画。 */
  href?: string
  /** 現在地ハイライト (`data-current` + `aria-current="page"`)。 */
  active?: boolean
  /** 操作不可化。リンクの場合は `aria-disabled="true"`、ボタンの場合は `disabled` 属性。 */
  disabled?: boolean
  /** 項目先頭に並べるアイコン (Material Symbols 名。例: `home`)。 */
  frontIcon?: string
  /** ラベル末尾の補助アイコン (Material Symbols 名。例: `open_in_new`)。 */
  tailIcon?: string
  /** ラベル末尾アイコンのアクセシブル名 (`role="img"` 付きで読み上げ対象)。 */
  tailIconLabel?: string
  /** 項目末尾アイコン (Material Symbols 名。`expanded` 中は 180 度回転する)。 */
  endIcon?: string
  /** 子メニューが展開中であることを示す (`data-expanded` を付与)。 */
  expanded?: boolean
  /** 子メニュー。指定時はネストしたサブリストとして描画される。 */
  children?: DadsMenuListItem[]
}

export interface DadsMenuListProps {
  /** メニュー項目配列 (必須)。 */
  items: DadsMenuListItem[]
  /** 項目スタイル。デフォルト `'standard'`。 */
  type?: DadsMenuListType
  /** 項目サイズ。デフォルト `'regular'`。 */
  size?: DadsMenuListSize
  /** 子メニュー描画時に適用されるインデントレベル (`--menu-list-indentation`)。デフォルト `0`。 */
  indentation?: number
  /** ルート `<nav>` 要素として描画し、`aria-label` を付与する。未指定時は `<ul>` ルート。 */
  ariaLabel?: string
}

export interface DadsMenuListEmits {
  /**
   * 有効な項目 (リンク or ボタン) がクリックされた時に発火。
   * `disabled` 項目では発火しない。
   */
  (e: 'click:item', item: DadsMenuListItem, event: MouseEvent): void
}
