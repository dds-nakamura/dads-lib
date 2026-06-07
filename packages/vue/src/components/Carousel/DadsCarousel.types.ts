/**
 * Type definitions for DadsCarousel.
 *
 * 公式 DADS の carousel を忠実に移植した「複数スライドを順番に閲覧する」コンポーネント。
 * `design-system-example-components-html/src/components/carousel/` の container.html /
 * key-visual-multi.html / carousel.css / carousel.js を一次参照とする。
 *
 * 公式仕様の要点:
 *  - スライドは `slides[]` 配列で渡す (各スライドは画像 1 枚 + 任意のリンク)。
 *  - 見出しありの「コンテナ型」(`heading`) と、見出しなしの「キービジュアル型」
 *    (`ariaLabel`) の 2 形態を `role="region"` で表現する。
 *  - **公式は自動再生機能を備えていない** ため、auto-play 系 API は一切提供しない。
 *  - `@container (min-width: {breakpointRem}rem)` でワイド (ステップナビ + ネクスト
 *    プレビュー) / ナロー (page-nav) のレイアウトを自動切替する。
 *
 * 参考: dads-document-md/dads/components/carousel/index.md
 */

/** 見出しレベル (コンテナ型で使用)。1..6 のいずれかの整数。 */
export type DadsCarouselHeadingLevel = 1 | 2 | 3 | 4 | 5 | 6

/**
 * 1 スライド分のデータ。スライド本体は 1 枚の画像で構成され、
 * `href` を指定するとその画像がリンク (`<a>`) でラップされる。
 *
 * この型は DadsImageSlider (薄いラッパ) からも再利用される想定のため、
 * 余計な状態を持たせずプレーンなデータ構造に保つ。
 */
export interface DadsCarouselSlide {
  /** 画像 URL (`<img src>`)。必須。 */
  src: string
  /** レスポンシブ画像の `srcset` (任意)。 */
  srcset?: string
  /** メイン画像のスクリーンリーダ向け代替テキスト。必須。装飾用途でも空文字を明示する。 */
  alt: string
  /** 指定するとスライド画像が `<a href>` でラップされる。 */
  href?: string
  /** リンクの `target` (`href` 指定時のみ有効)。 */
  target?: string
  /** リンクの `rel` (`href` 指定時のみ有効)。 */
  rel?: string
  /** 画像の固有幅 (CLS 回避用に推奨)。 */
  width?: number
  /** 画像の固有高さ (CLS 回避用に推奨)。 */
  height?: number
}

export interface DadsCarouselProps {
  /** 表示するスライド配列。必須。 */
  slides: DadsCarouselSlide[]
  /** 現在表示中のスライドインデックス (0 始まり)。v-model 対象。デフォルト `0`。 */
  modelValue?: number
  /**
   * コンテナ型の見出しテキスト。指定すると `<h{headingLevel}>` を描画し、
   * `role="region"` を `aria-labelledby` でその見出しに紐付ける。
   */
  heading?: string
  /** 見出しの HTML レベル (`h1`〜`h6`)。デフォルト `2`。 */
  headingLevel?: DadsCarouselHeadingLevel
  /**
   * キービジュアル型 (`heading` 未指定時) の `role="region"` のアクセシブル名。
   * デフォルト `'スライドショー'`。
   */
  ariaLabel?: string
  /**
   * ワイド / ナローを切り替えるブレークポイント (rem)。デフォルト `64`。
   * `@container` クエリと ResizeObserver の両方でこの値を使用する。
   */
  breakpointRem?: number
  /** スクリーンリーダ向けラベルで使うスライドの単位語。デフォルト `'スライド'`。 */
  unit?: string
  /** 「すべてのスライド」disclosure の summary ラベル。デフォルト `'すべてのスライド'`。 */
  showAllLabel?: string
  /** ナロー時 page-nav「前のスライド」ボタンの `aria-label`。デフォルト `'前のスライド'`。 */
  prevSlideAriaLabel?: string
  /** ナロー時 page-nav「次のスライド」ボタンの `aria-label`。デフォルト `'次のスライド'`。 */
  nextSlideAriaLabel?: string
  /** ネクストプレビューボタンの可視ラベル。デフォルト `'次のスライド'`。 */
  nextPreviewLabel?: string
  /** ステップナビ (tablist) の `aria-label`。デフォルト `'スライド選択'`。 */
  stepNavAriaLabel?: string
}

export interface DadsCarouselEmits {
  /** v-model 用。新しいインデックス。 */
  (e: 'update:modelValue', value: number): void
  /** スライド変更時に発火。 */
  (e: 'change', value: number): void
}
