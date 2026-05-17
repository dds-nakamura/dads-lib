/**
 * Type definitions for DadsCarousel.
 *
 * 公式 DADS の carousel は「複数のスライドを順番に見ることのできるコンポーネント」。
 * ImageSlider と異なり、各スライドの中身は呼び出し側がデフォルトスロット経由で
 * 任意のコンテンツとして提供する。
 *
 * 公式仕様 (準備中だが Figma で確認できる構造):
 *  - **type**: `key-visual` (打ち出し用、見出し+概要+CTA を中央配置) /
 *    `container` (コンテナ型、見出し必須、コンテンツを内包)
 *  - **mode**: `single` (1 枚ずつ表示) / `multi` (複数枚並列表示)
 *  - 公式は **自動再生機能を備えていない** と明言しているため、`autoPlay` を
 *    使うと dev mode で警告を出す。
 *
 * 参考: dads-document-md/dads/components/carousel/index.md
 */

/**
 * Carousel の用途タイプ。
 * - `key-visual`: 打ち出し型 (ランディングのキービジュアル領域)。スライド本体に
 *   見出し / 説明 / CTA を含む大きなコンポジションを想定。
 * - `container`: コンテナ型。`heading` を必須伴い、スライド群を内包する箱として
 *   描画される。
 */
export type DadsCarouselType = 'key-visual' | 'container'

/**
 * Carousel の表示モード。
 * - `single`: 一度に 1 枚のスライドだけを表示 (デフォルト、現行動作)
 * - `multi`: 複数スライドを横並びで表示 (旧仕様の image-slider 相当)
 *
 * Note: 本実装の `multi` モードは現状 `single` と同等のレイアウトで描画する
 * (modifier class のみ付与)。完全な複数スライド可視化は将来のリリースで対応。
 */
export type DadsCarouselMode = 'single' | 'multi'

/** 見出しレベル (container type で使用)。1..6 のいずれかの整数。 */
export type DadsCarouselHeadingLevel = 1 | 2 | 3 | 4 | 5 | 6

export interface DadsCarouselProps {
  /** 現在表示中のスライドインデックス。v-model 対象。 */
  modelValue?: number
  /** スライドの総数。デフォルトスロットがこの回数だけ呼び出される。 */
  itemCount: number
  /**
   * Carousel の用途タイプ (公式 DADS 定義)。
   * `container` 指定時は `heading` プロップが必須。
   */
  type?: DadsCarouselType
  /**
   * 表示モード。`single` (デフォルト) または `multi`。
   */
  mode?: DadsCarouselMode
  /**
   * Container type の見出しテキスト。`type='container'` で必須。
   */
  heading?: string
  /**
   * 見出しの HTML レベル (`h1`〜`h6`)。デフォルト `2`。
   */
  headingLevel?: DadsCarouselHeadingLevel
  /**
   * 「すべてのスライド」リンクのラベル。指定時のみリンクを描画。
   */
  showAllLabel?: string
  /**
   * 「すべてのスライド」リンクの href。指定時のみリンクを描画。
   */
  showAllHref?: string
  /**
   * **公式非推奨**: 自動再生を有効化する。
   * 公式 DADS は「自動再生機能を備えていない」と明言しているため、本プロップ
   * を使用すると dev mode で console.warn が表示される。アクセシビリティ上
   * 推奨されない (前方向重視オートスライドはモーション過敏症の問題)。
   */
  autoPlay?: boolean
  /** 自動再生の間隔 (ms)。`autoPlay=true` のときのみ使用。 */
  interval?: number
  /** ホバー中に自動再生を一時停止する。 */
  pauseOnHover?: boolean
  /** 左右の矢印ボタンを表示する。 */
  showArrows?: boolean
  /** インジケータ (ドット) を表示する。 */
  showIndicators?: boolean
  /** true のとき末尾の次で先頭へ、先頭の前で末尾へラップする。 */
  loop?: boolean
  /** カルーセル全体のアクセシブル名 (`aria-label`)。 */
  ariaLabel?: string
}

export interface DadsCarouselEmits {
  /** v-model 用。新しいインデックス。 */
  (e: 'update:modelValue', value: number): void
  /** スライド変更時に発火。 */
  (e: 'change', value: number): void
}

/** デフォルトスロットへ渡される slotProps。 */
export interface DadsCarouselSlotProps {
  /** 0 始まりのスライドインデックス。 */
  index: number
  /** そのスライドが現在表示中かどうか。 */
  isActive: boolean
}
