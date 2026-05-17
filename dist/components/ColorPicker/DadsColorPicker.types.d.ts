/**
 * DadsColorPicker — public API.
 *
 * Replaces the legacy Vuetify `<v-color-picker>` used by HomeView. The
 * implementation intentionally relies on the browser-native `<input
 * type="color">` for the main palette so we get the OS color picker for free,
 * paired with a swatch grid for the most common colors.
 */
export interface DadsColorPickerProps {
    /** Current color in `#RRGGBB` form. */
    modelValue: string;
    /** Optional swatches. Defaults to `DADS_DEFAULT_SWATCHES`. */
    swatches?: string[];
    /** Disable the picker. */
    disabled?: boolean;
    /** Accessible label applied to the native color input. */
    label?: string;
}
export interface DadsColorPickerEmits {
    (e: 'update:modelValue', value: string): void;
}
/**
 * Default swatch palette. Mirrors the most common Vuetify
 * `<v-color-picker show-swatches>` colors so existing user expectations carry
 * over after the migration.
 */
export declare const DADS_DEFAULT_SWATCHES: readonly string[];
//# sourceMappingURL=DadsColorPicker.types.d.ts.map