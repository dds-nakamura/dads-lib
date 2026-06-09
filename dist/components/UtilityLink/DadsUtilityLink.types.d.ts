/**
 * Single utility link descriptor used both as the standalone props shape
 * (single-link mode) and as the per-item shape of {@link DadsUtilityLinkProps.items}
 * (list mode).
 *
 * 配置は DADS 仕様どおりデスクトップのヘッダー / フッターエリアを想定し、
 * 「お問合わせ」「よくあるご質問」「プライバシーポリシー」などの頻出リンクや
 * 法的に必要なリンクに使う。
 */
export interface DadsUtilityLinkItem {
    /** リンクテキスト (必須)。 */
    label: string;
    /** リンク先 URL (必須)。 */
    href: string;
    /**
     * Material Symbols アイコン名 (例: `'help'`)。
     * 指定された場合、ラベルの前にリードアイコンとして描画される。
     */
    iconName?: string;
    /**
     * 外部リンクとして扱う。
     * - `target="_blank"` + `rel="noopener noreferrer"` が付与される
     * - ラベル後に「新規タブで開きます」を意味するテイルアイコン (SVG) が描画される
     */
    external?: boolean;
}
/**
 * DadsUtilityLink のプロパティ。
 *
 * 2 つの使い方をサポートする:
 * - 単一リンク: `href` + `label` を直接渡す (オプションで `iconName` / `external`)
 * - リスト: `items` 配列を渡す。ヘッダー / フッターの横並びリンク群を 1 コンポーネントで描画
 *
 * 両方を同時に指定した場合は `items` が優先される。
 */
export interface DadsUtilityLinkProps {
    /** 単一リンクモードの URL。 */
    href?: string;
    /** 単一リンクモードの表示テキスト。 */
    label?: string;
    /** 単一リンクモード: リードアイコン (Material Symbols アイコン名)。 */
    iconName?: string;
    /** 単一リンクモード: 外部リンクなら `true`。 */
    external?: boolean;
    /**
     * リストモード。指定すると `<ul>` の中に各項目を `<li><a class="dads-utility-link">…</a></li>`
     * として描画する。`items` が非 `undefined` のとき単一リンクモードの props は無視される。
     */
    items?: DadsUtilityLinkItem[];
    /**
     * リストモード時の `<ul>` の `aria-label`。
     * 例: `'ユーティリティリンク'` / `'フッターリンク'`。
     */
    ariaLabel?: string;
    /**
     * 外部リンクのテイルアイコン (新規タブで開く SVG) に付与する `aria-label`。
     * デフォルト: `'新規タブで開きます'`。i18n 対応のため上書き可能。
     */
    newTabAriaLabel?: string;
}
export interface DadsUtilityLinkEmits {
    /**
     * リンクがクリックされた時に発火。
     * - 単一リンクモードでは `index` は常に `0`
     * - リストモードでは押下された項目のインデックス
     */
    (e: 'click:item', item: DadsUtilityLinkItem, index: number, event: MouseEvent): void;
}
//# sourceMappingURL=DadsUtilityLink.types.d.ts.map