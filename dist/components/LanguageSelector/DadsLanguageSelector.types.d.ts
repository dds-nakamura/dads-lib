/**
 * Opener size. Matches the official `menu-list-box` opener `data-size` values.
 * - `sm` (default) — 36px min-height; the size used by the official
 *   language-selector example.
 * - `md` — 44px min-height.
 */
export type DadsLanguageSelectorSize = 'sm' | 'md';
export interface DadsLanguageSelectorOption {
    /** Language code, e.g. `'ja'`, `'en'`, `'zh-cn'`. Used as the bound value
     *  and as the `lang` / `hreflang` attribute on the menu item. */
    value: string;
    /** Display text shown in the menu and on the opener when selected. */
    label: string;
    /** Optional URL for the language page; rendered as `href` on the anchor. */
    href?: string;
}
export interface DadsLanguageSelectorProps {
    /** Currently selected language code. */
    modelValue?: string;
    /** Required list of selectable languages. */
    options: DadsLanguageSelectorOption[];
    /** Disables the opener and prevents the menu from opening. */
    disabled?: boolean;
    /** Opener size. Defaults to `'sm'` (matches the official example). */
    size?: DadsLanguageSelectorSize;
    /** Accessible label for the opener button. The opener visible text is
     *  intentionally always `"Language"` per DADS guidance, so this label
     *  carries the localized accessible name. Defaults to `'言語を選択'`. */
    ariaLabel?: string;
    /** Text on the opener button. DADS guidance says this is always English
     *  `"Language"`, so it is overridable but defaults to that. */
    openerLabel?: string;
}
export interface DadsLanguageSelectorEmits {
    (e: 'update:modelValue', value: string): void;
    (e: 'change', value: string): void;
    (e: 'open'): void;
    (e: 'close'): void;
}
//# sourceMappingURL=DadsLanguageSelector.types.d.ts.map