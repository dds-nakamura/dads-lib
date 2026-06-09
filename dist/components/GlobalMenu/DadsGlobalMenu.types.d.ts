/**
 * Type definitions for DadsGlobalMenu.
 *
 * グローバルメニューはサイト全体の最上位ナビゲーション。`<nav>` > `<ul>` >
 * `<li>` > `<a>` または `<button>` の DOM 構造で、項目内側 (item-inner) の
 * クラスに `aria-current` / `aria-expanded` 等の状態を直接付与する。
 *
 * Reference:
 *  - https://design.digital.go.jp/dads/components/global-menu/
 *  - design-system-example-components-html/src/components/global-menu/
 *
 * Wave 1 の `DadsMenuList` が drop-down / mega-menu 内の項目群を表現する
 * 一方、`DadsGlobalMenu` は最上位 (ヘッダ直下) の横並びリンク列を担う。
 */
export interface DadsGlobalMenuItem {
    /** 表示テキスト (必須)。 */
    label: string;
    /** href を指定すると `<a>` として描画。未指定 (または `children` あり) なら `<button>`。 */
    href?: string;
    /** 現在地ハイライト (`aria-current="page"` を付与)。 */
    active?: boolean;
    /** 操作不可化。リンクなら `aria-disabled="true"` + tabindex=-1、ボタンなら `disabled`。 */
    disabled?: boolean;
    /** 項目先頭に並べるアイコン (Material Symbols 名。例: `home`)。 */
    frontIcon?: string;
    /**
     * 子メニュー (ドロップダウン / メガメニュー)。存在する場合は `<button>` として
     * 描画し、`aria-haspopup="menu"` と `aria-expanded` を付与する。
     * 子メニューの開閉アニメーションは利用側の責務 (このコンポーネントは表示のみ)。
     */
    children?: DadsGlobalMenuItem[];
    /** 子メニューが展開中であることを示す (`aria-expanded="true"` を付与)。 */
    expanded?: boolean;
}
export interface DadsGlobalMenuProps {
    /** メニュー項目配列 (必須)。 */
    items: DadsGlobalMenuItem[];
    /** ルート `<nav>` 要素の `aria-label`。デフォルト `'グローバルメニュー'`。 */
    ariaLabel?: string;
}
export interface DadsGlobalMenuEmits {
    /**
     * 有効な項目 (リンク or ボタン) がクリックされた時に発火。
     * `disabled` 項目では発火しない。
     */
    (e: 'click:item', item: DadsGlobalMenuItem, event: MouseEvent): void;
}
//# sourceMappingURL=DadsGlobalMenu.types.d.ts.map