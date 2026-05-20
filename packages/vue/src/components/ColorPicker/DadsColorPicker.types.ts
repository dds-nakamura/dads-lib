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
  modelValue: string
  /** Optional swatches. Defaults to `DADS_DEFAULT_SWATCHES`. */
  swatches?: string[]
  /** Disable the picker. */
  disabled?: boolean
  /** Accessible label applied to the native color input. */
  label?: string
  /**
   * Fallback aria-label for the native color input when `label` is not
   * provided. Default: `'色を選択'`. Override to localize the picker.
   */
  defaultAriaLabel?: string
  /**
   * aria-label for the HEX text input. Default: `'HEXカラーコード'`.
   * Override to localize the picker.
   */
  hexInputAriaLabel?: string
  /**
   * Formatter that returns the aria-label for each swatch button. Receives
   * the swatch hex string (e.g. `'#FF5500'`). Default produces
   * `` `${swatch} を選択` ``. Override to localize the picker.
   */
  formatSwatchAriaLabel?: (swatch: string) => string
}

export interface DadsColorPickerEmits {
  (e: 'update:modelValue', value: string): void
}

/**
 * Default swatch palette. Mirrors the most common Vuetify
 * `<v-color-picker show-swatches>` colors so existing user expectations carry
 * over after the migration.
 */
export const DADS_DEFAULT_SWATCHES: readonly string[] = [
  '#000000',
  '#FFFFFF',
  '#F44336',
  '#FF9800',
  '#FFEB3B',
  '#4CAF50',
  '#00BCD4',
  '#2196F3',
  '#9C27B0',
  '#E91E63',
  '#795548',
  '#9E9E9E',
] as const
