/**
 * Public Props / Emits / column types for DadsMegaMenu.
 *
 * メガメニューは、ヘッダ等のトップレベルナビゲーションから展開される
 * 大型ドロップダウンパネルで、複数の「列 (column)」にまとめたメニュー項目
 * 群を提示する。各列は任意の見出しと `DadsMenuList` で描画される項目配列
 * を持つ。
 *
 * Reference:
 *  - https://design.digital.go.jp/dads/components/mega-menu/  (ガイドライン準備中)
 *  - design-system-example-components-html/src/components/global-menu/
 *    (アーキテクチャ参考: トリガーボタン + 展開パネル)
 */
import type { DadsMenuListItem } from '../MenuList/DadsMenuList.types';
/** メガメニューの 1 列を表す。`heading` は省略可能で、その列の上に見出しが付与される。 */
export interface DadsMegaMenuColumn {
    /** 列ヘッダ (省略時は見出し行を描画しない)。 */
    heading?: string;
    /** 列内に並ぶ項目群。`DadsMenuList` の `items` にそのまま渡される。 */
    items: DadsMenuListItem[];
}
export interface DadsMegaMenuProps {
    /** 展開状態 (v-model)。デフォルト `false`。 */
    modelValue?: boolean;
    /** トリガーボタンに表示するテキスト (必須)。 */
    triggerLabel: string;
    /** 列定義の配列。1〜N 列まで対応 (必須)。 */
    columns: DadsMegaMenuColumn[];
    /** パネルの `aria-label` (省略時は `triggerLabel` を使用)。 */
    ariaLabel?: string;
}
export interface DadsMegaMenuEmits {
    /** v-model 同期。 */
    (e: 'update:modelValue', value: boolean): void;
    /** パネル内のメニュー項目クリック時に発火。クリック後はパネルが自動で閉じる。 */
    (e: 'click:item', item: DadsMenuListItem, event: MouseEvent): void;
}
//# sourceMappingURL=DadsMegaMenu.types.d.ts.map