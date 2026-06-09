/**
 * Public Props / Emits for DadsDrawer.
 *
 * 公式 DADS Drawer を 1:1 で再現したネイティブ `<dialog>` ベースのモーダル
 * パネル。`showModal()` によるモーダル表示・`::backdrop` による背景減光・
 * Esc / inert / フォーカストラップはすべてブラウザのネイティブ `<dialog>` に
 * 委ねる。本体 (body) はデフォルトスロットに自由配置する。
 *
 * Reference:
 *  - design-system-example-components-html/src/components/drawer/playground.html
 *  - design-system-example-components-html/src/components/drawer/drawer.css
 */
/**
 * Drawer の配置パターン。公式 example CSS が定義する 2 種。
 * - `left`: 左端に固定 (デフォルト)。最も一般的なモバイルメニュー用途。
 * - `right`: 右端に固定。設定パネル・フィルタ・通知パネル等。
 */
export type DadsDrawerPlacement = 'left' | 'right';
export interface DadsDrawerProps {
    /** 開閉状態。`true` = 開いている。v-model 経由で双方向バインドする。 */
    modelValue?: boolean;
    /**
     * 視覚的に隠した上で `aria-labelledby` 経由でダイアログに付与する
     * アクセシブル名 (`<h2 class="…visually-hidden">` として描画)。
     * デフォルト `'メニュー'`。i18n を行いたい場合に上書きする。
     */
    title?: string;
    /** Drawer 配置パターン。`left` (デフォルト) / `right`。 */
    placement?: DadsDrawerPlacement;
    /** 閉じるボタンのラベル / `aria`。デフォルト `'閉じる'`。 */
    closeLabel?: string;
}
export interface DadsDrawerEmits {
    /** v-model 用。開閉状態が変化したときに発火する。 */
    (e: 'update:modelValue', value: boolean): void;
}
//# sourceMappingURL=DadsDrawer.types.d.ts.map