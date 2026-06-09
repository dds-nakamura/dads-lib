/**
 * Type definitions for DadsImageSlider.
 *
 * 公式 DADS の image-slider は **カルーセルの「コンテナ型・マルチ・幅狭サイズ」**
 * をそのまま使うコンポーネント (公式 MD 明記)。本実装でも DadsImageSlider は
 * DadsCarousel の薄いラッパとし、見出し必須のコンテナ型プリセットとして提供する。
 *
 * 参考: dads-document-md/dads/components/image-slider/index.md
 *  > このコンポーネントはカルーセルコンポーネントの
 *  > 「コンテナタイプ - マルチ - 幅狭サイズ」を使用することで実装できます。
 */
import type { DadsCarouselSlide, DadsCarouselHeadingLevel } from '../Carousel/DadsCarousel.types';
/**
 * 1 スライド分のデータ。DadsCarousel のスライド型をそのまま再利用する
 * (画像 1 枚 + 任意のリンク)。公式 image-slider はギャラリー用途のため
 * 画像ベースで、独自キャプション等の非公式拡張は持たない。
 */
export type DadsImageSliderSlide = DadsCarouselSlide;
export interface DadsImageSliderProps {
    /** 表示するスライド配列。必須。 */
    slides: DadsImageSliderSlide[];
    /** 現在表示中のスライドインデックス (0 始まり)。v-model 対象。デフォルト `0`。 */
    modelValue?: number;
    /**
     * セクション見出し。image-slider はコンテナ型 (見出しあり) のため **必須**。
     * `<h{headingLevel}>` として描画され、`role="region"` に紐付く。
     */
    heading: string;
    /** 見出しの HTML レベル (`h1`〜`h6`)。デフォルト `2`。 */
    headingLevel?: DadsCarouselHeadingLevel;
    /**
     * ワイド / ナローを切り替えるブレークポイント (rem)。デフォルト `64`。
     * image-slider は通常ナロー幅で使うが、レイアウトはコンテナ幅で自動切替される。
     */
    breakpointRem?: number;
    /** スクリーンリーダ向けラベルで使うスライドの単位語。デフォルト `'スライド'`。 */
    unit?: string;
    /** 「すべてのスライド」disclosure の summary ラベル。デフォルト `'すべてのスライド'`。 */
    showAllLabel?: string;
    /** ナロー時 page-nav「前のスライド」ボタンの `aria-label`。デフォルト `'前のスライド'`。 */
    prevSlideAriaLabel?: string;
    /** ナロー時 page-nav「次のスライド」ボタンの `aria-label`。デフォルト `'次のスライド'`。 */
    nextSlideAriaLabel?: string;
    /** ネクストプレビューボタンの可視ラベル。デフォルト `'次のスライド'`。 */
    nextPreviewLabel?: string;
    /** ステップナビ (tablist) の `aria-label`。デフォルト `'スライド選択'`。 */
    stepNavAriaLabel?: string;
}
export interface DadsImageSliderEmits {
    /** v-model 用。新しいインデックス。 */
    (e: 'update:modelValue', value: number): void;
    /** スライド変更時に発火。 */
    (e: 'change', value: number): void;
}
//# sourceMappingURL=DadsImageSlider.types.d.ts.map