/**
 * Type definitions for DadsImageSlider.
 *
 * 公式 DADS の image-slider は Carousel の「コンテナタイプ - マルチ - 幅狭サイズ」
 * を再構成したコンポーネント。複数の画像を切り替えて閲覧できる。
 *
 * 参考: dads-document-md/dads/components/image-slider/index.md
 */
/** スライド 1 枚分の定義。 */
export interface DadsImageSliderSlide {
    /** 表示する画像の URL。 */
    src: string;
    /** スクリーンリーダ向け代替テキスト。必須。 */
    alt: string;
    /** スライド下部に表示する任意のキャプション。 */
    caption?: string;
}
export interface DadsImageSliderProps {
    /** 現在表示中のスライドインデックス。v-model 対象。 */
    modelValue?: number;
    /** スライドの配列。 */
    slides: DadsImageSliderSlide[];
    /** true のとき `interval` ms ごとに次のスライドへ自動遷移する。 */
    autoPlay?: boolean;
    /** 自動再生の間隔 (ms)。 */
    interval?: number;
    /** ホバー中に自動再生を一時停止する。 */
    pauseOnHover?: boolean;
    /** 左右の矢印ボタンを表示する。 */
    showArrows?: boolean;
    /** インジケータ (ドット) を表示する。 */
    showIndicators?: boolean;
    /** true のとき末尾の次で先頭へ、先頭の前で末尾へラップする。 */
    loop?: boolean;
    /** スライダ全体のアクセシブル名 (`aria-label`)。 */
    ariaLabel?: string;
    /**
     * セクション見出し。指定時はスライダ上部に `<h{headingLevel}>` で描画される。
     * 公式 DADS は image-slider が見出しを伴うことを想定している。
     */
    heading?: string;
    /** 見出しの HTML レベル (1-6)。デフォルト `2`。 */
    headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
    /** 「すべてのスライド」リンクのラベル (showAllHref とセットで指定)。 */
    showAllLabel?: string;
    /** 「すべてのスライド」リンクの href。 */
    showAllHref?: string;
    /**
     * 「前のスライド」ボタンの `aria-label`。デフォルトは `'前のスライド'`。
     * i18n 対応で英語等に差し替え可能。
     */
    prevSlideAriaLabel?: string;
    /**
     * 「次のスライド」ボタンの `aria-label`。デフォルトは `'次のスライド'`。
     * i18n 対応で英語等に差し替え可能。
     */
    nextSlideAriaLabel?: string;
    /**
     * インジケータ群 (tablist) の `aria-label`。デフォルトは `'スライド位置'`。
     * i18n 対応で英語等に差し替え可能。
     */
    slidePositionAriaLabel?: string;
    /**
     * 各インジケータの `aria-label` を生成するフォーマッタ。
     * デフォルトは `(i) => \`スライド ${i + 1}\``。i18n 対応で英語等に差し替え可能。
     * @param idx 0 始まりのスライドインデックス
     */
    formatSlideAriaLabel?: (idx: number) => string;
}
export interface DadsImageSliderEmits {
    /** v-model 用。新しいインデックス。 */
    (e: 'update:modelValue', value: number): void;
    /** スライド変更時に発火。 */
    (e: 'change', value: number): void;
}
//# sourceMappingURL=DadsImageSlider.types.d.ts.map