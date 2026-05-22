/**
 * Public Props / Emits for DadsMobileMenu.
 *
 * モバイルメニューは、ハンバーガーメニューボタン (Header 内) と組み合わせて使う
 * 折りたたみメニューコンポーネント。Drawer (横スライド) と異なり、Header 下に
 * スライドダウンする全幅オーバーレイとして配置される。
 *
 * Reference:
 *  - https://design.digital.go.jp/dads/components/mobile-menu/
 *  - 公式は「**2 つの主要タイプ**」(`accordion` / `slide`) を定義しており、
 *    本コンポーネントの `type` プロップで切替可能。
 *
 * 階層:
 *  - 主ナビゲーション: `items` (再利用: `DadsMenuListItem`)
 *  - 補助リンク: `utilityItems` (再利用: `DadsUtilityLinkItem`)
 */
import type { DadsMenuListItem } from '../MenuList/DadsMenuList.types';
import type { DadsUtilityLinkItem } from '../UtilityLink/DadsUtilityLink.types';
/** メイン項目は DadsMenuList の項目形と共有する。 */
export type DadsMobileMenuItem = DadsMenuListItem;
/**
 * モバイルメニューの主要タイプ (公式 DADS 定義)。
 * - `accordion`: 親項目は展開され、子項目がインデントされたサブリストとして
 *   インラインに展開される (デフォルト、後方互換)。
 * - `slide`: 親項目クリックで子項目だけを表示する新パネルにスライド遷移し、
 *   戻るボタンで前パネルに戻る。階層が深いメニューに向く。
 */
export type DadsMobileMenuType = 'accordion' | 'slide';
export interface DadsMobileMenuProps {
    /** 開閉状態。`true` で開く。v-model 対応。 */
    modelValue?: boolean;
    /** メイン項目 (必須)。`type='accordion'` で DadsMenuList、`'slide'` で独自描画される。 */
    items: DadsMobileMenuItem[];
    /**
     * 主要タイプ。デフォルト `'accordion'` (後方互換)。
     */
    type?: DadsMobileMenuType;
    /**
     * 補助項目 (任意)。ログイン / お問い合わせ / プライバシーポリシーなどの
     * セカンダリリンク。指定時はメニュー下部に DadsUtilityLink (list mode) で描画。
     */
    utilityItems?: DadsUtilityLinkItem[];
    /** `aria-label`。デフォルト `'モバイルメニュー'`。 */
    ariaLabel?: string;
    /**
     * メインメニュー `<nav>` の `aria-label`。デフォルト `'メインナビゲーション'`。
     * i18n を行いたい場合に上書きする。
     */
    navAriaLabel?: string;
    /**
     * 補助リンク領域 (`DadsUtilityLink`) に渡す `aria-label`。
     * デフォルト `'補助リンク'`。i18n を行いたい場合に上書きする。
     */
    subLinksAriaLabel?: string;
    /** クローズボタンの `aria-label`。デフォルト `'閉じる'`。 */
    closeLabel?: string;
    /** 戻るボタンの aria-label / 表示テキスト。デフォルト `'戻る'`。`type='slide'` のみ使用。 */
    backLabel?: string;
    /**
     * クローズボタンの表示。デフォルト `true`。
     * `false` の場合、コンポーネント内にはクローズボタンを描画しない
     * (Header 側の DadsHamburgerMenuButton で開閉する想定)。
     */
    showCloseButton?: boolean;
}
export interface DadsMobileMenuEmits {
    /** v-model 用。新しい開閉状態を伝搬する。 */
    (e: 'update:modelValue', value: boolean): void;
    /** メイン項目クリック時。`DadsMenuList` からバブリングして伝搬される。 */
    (e: 'click:item', item: DadsMobileMenuItem, event: MouseEvent): void;
    /** 補助項目クリック時。`DadsUtilityLink` からバブリングして伝搬される。 */
    (e: 'click:utility', item: DadsUtilityLinkItem, index: number, event: MouseEvent): void;
}
//# sourceMappingURL=DadsMobileMenu.types.d.ts.map