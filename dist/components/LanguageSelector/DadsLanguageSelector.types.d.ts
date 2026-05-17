import type { DadsSize } from '../../types/common';
export type DadsLanguageSelectorSize = Exclude<DadsSize, 'xs'>;
/**
 * Opener / popup color variations defined in the official DADS spec.
 * - `light-blue` (default) — brand-blue accent.
 * - `light-green` — secondary brand-green accent (used on sites that adopt
 *   green as the primary identity color).
 * - `light-gray` — neutral / chrome variant for dark headers.
 */
export type DadsLanguageSelectorColorScheme = 'light-blue' | 'light-green' | 'light-gray';
/**
 * Opener corner shape. The DADS guideline mentions adjusting the opener corner
 * to match surrounding chrome.
 * - `rounded` (default) — uses the standard 4px border radius.
 * - `pill` — fully rounded opener; useful inside chip-style header chrome.
 * - `square` — squared corners; useful when the opener sits in a hard-edged
 *   header bar.
 */
export type DadsLanguageSelectorCornerShape = 'rounded' | 'pill' | 'square';
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
    /** Opener size. Defaults to `'md'`. */
    size?: DadsLanguageSelectorSize;
    /** Color accent of the opener / popup. Defaults to `'light-blue'`. */
    colorScheme?: DadsLanguageSelectorColorScheme;
    /** Opener corner shape. Defaults to `'rounded'`. */
    cornerShape?: DadsLanguageSelectorCornerShape;
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