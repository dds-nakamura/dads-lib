/**
 * Public Props / Emits / item types for DadsDrawer.
 *
 * The drawer renders a modal navigation panel — toggled by `modelValue` —
 * with optional one-level-deep accordion children. The shape mirrors the
 * DADS HTML reference, with disabled / icon support layered on top.
 *
 * 公式 DADS は左寄せ / 右寄せ / フルオーバーレイの 3 配置を提供する。
 * 本コンポーネントの `placement` プロップで切替可能。
 */
/**
 * Drawer の配置パターン。
 * - `left`: 左端から slide-in (デフォルト、最も一般的なモバイルメニュー用途)
 * - `right`: 右端から slide-in (設定パネル・フィルタ・通知パネル等)
 * - `full`: ビューポート全体を panel で覆う (フルスクリーンメニュー用途)
 */
export type DadsDrawerPlacement = 'left' | 'right' | 'full';
export interface DadsDrawerItem {
    /** Visible text. Required because every item is announced to screen readers. */
    label: string;
    /** When set, the item renders as `<a href>` so it follows native link semantics. */
    href?: string;
    /** Optional click handler. Receives the original MouseEvent. */
    onClick?: (event: MouseEvent) => void;
    /** Visually dim and skip emit / navigation. */
    disabled?: boolean;
    /** Nested items render as a `<details>` accordion under the parent. */
    children?: DadsDrawerItem[];
    /** mdi-* class name (e.g. "mdi-home"). */
    icon?: string;
}
export interface DadsDrawerProps {
    /** Open state. Acts as v-model. */
    modelValue?: boolean;
    items: DadsDrawerItem[];
    /** Drawer header title. Used as fallback aria-label when present. */
    title?: string;
    /** aria-label for the close button. Defaults to "閉じる". */
    closeLabel?: string;
    /**
     * `title` 未指定時のフォールバック `aria-label`。デフォルト `'ナビゲーション'`。
     * i18n を行いたい場合に上書きする。
     */
    defaultAriaLabel?: string;
    /**
     * ドロワー内 `<nav>` の `aria-label`。デフォルト `'ドロワーナビゲーション'`。
     * i18n を行いたい場合に上書きする。
     */
    navAriaLabel?: string;
    /**
     * Drawer 配置パターン。`left` (デフォルト) / `right` / `full`。
     * `full` はパネルがビューポート全体を覆い、overlay は背景色のみ担う。
     */
    placement?: DadsDrawerPlacement;
}
export interface DadsDrawerEmits {
    (e: 'update:modelValue', value: boolean): void;
    (e: 'click:item', item: DadsDrawerItem, event: MouseEvent): void;
}
//# sourceMappingURL=DadsDrawer.types.d.ts.map