/**
 * Type definitions for DadsCarousel.
 *
 * 公式 DADS の carousel は「複数のスライドを順番に見ることのできるコンポーネント」。
 * ImageSlider と異なり、各スライドの中身は呼び出し側がデフォルトスロット経由で
 * 任意のコンテンツとして提供する。
 *
 * 参考: dads-document-md/dads/components/carousel/index.md
 */

export interface DadsCarouselProps {
  /** 現在表示中のスライドインデックス。v-model 対象。 */
  modelValue?: number
  /** スライドの総数。デフォルトスロットがこの回数だけ呼び出される。 */
  itemCount: number
  /** true のとき `interval` ms ごとに次のスライドへ自動遷移する。 */
  autoPlay?: boolean
  /** 自動再生の間隔 (ms)。 */
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
