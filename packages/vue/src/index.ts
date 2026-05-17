/**
 * @dads/vue — DADS (デジタル庁デザインシステム) Vue 3 コンポーネントライブラリ。
 *
 * 公開エントリ。各コンポーネントの import パスは内部相対のままで、利用側は
 * このバレル経由でアクセスする:
 *
 *   import { DadsButton, DadsTextField } from '@dads/vue'
 */

export * from './components/Button'
export * from './components/InputText'
// Deprecated alias: DadsTextField は公式 slug が `input-text` のため
// DadsInputText にリネームされた (2026-05-17)。次のメジャーで削除予定。
/** @deprecated Use {@link DadsInputText} instead. Will be removed in a future major. */
export { default as DadsTextField } from './components/InputText/DadsInputText.vue'
export type {
  /** @deprecated Use {@link DadsInputTextProps} instead. */
  DadsInputTextProps as DadsTextFieldProps,
  /** @deprecated Use {@link DadsInputTextEmits} instead. */
  DadsInputTextEmits as DadsTextFieldEmits,
  /** @deprecated Use {@link DadsInputTextSize} instead. */
  DadsInputTextSize as DadsTextFieldSize,
  /** @deprecated Use {@link DadsInputTextType} instead. */
  DadsInputTextType as DadsTextFieldType,
  /** @deprecated Use {@link DadsInputTextInputmode} instead. */
  DadsInputTextInputmode as DadsTextFieldInputmode,
} from './components/InputText/DadsInputText.types'
export * from './components/Textarea'
export * from './components/Select'
export * from './components/Checkbox'
export * from './components/CheckboxGroup'
export * from './components/Radio'
export * from './components/RadioGroup'
export * from './components/FileUpload'
export * from './components/Combobox'
export * from './components/HeaderContainer'
// Deprecated alias: DadsHeader は公式 slug が `header-container` のため
// DadsHeaderContainer にリネームされた (2026-05-17)。次のメジャーで削除予定。
/** @deprecated Use {@link DadsHeaderContainer} instead. Will be removed in a future major. */
export { default as DadsHeader } from './components/HeaderContainer/DadsHeaderContainer.vue'
export type {
  /** @deprecated Use {@link DadsHeaderContainerProps} instead. */
  DadsHeaderContainerProps as DadsHeaderProps,
  /** @deprecated Use {@link DadsHeaderContainerEmits} instead. */
  DadsHeaderContainerEmits as DadsHeaderEmits,
} from './components/HeaderContainer/DadsHeaderContainer.types'
export * from './components/Drawer'
export * from './components/Breadcrumb'
export * from './components/StepNavigation'
export * from './components/Tab'
export * from './components/NotificationBanner'
export * from './components/Dialog'
// Deprecated alias: DadsModal は公式 slug が `dialog` のため DadsDialog にリネーム
// された (2026-05-17)。次のメジャーで削除予定。
/** @deprecated Use {@link DadsDialog} instead. Will be removed in a future major. */
export { default as DadsModal } from './components/Dialog/DadsDialog.vue'
export type {
  /** @deprecated Use {@link DadsDialogProps} instead. */
  DadsDialogProps as DadsModalProps,
  /** @deprecated Use {@link DadsDialogEmits} instead. */
  DadsDialogEmits as DadsModalEmits,
  /** @deprecated Use {@link DadsDialogSize} instead. */
  DadsDialogSize as DadsModalSize,
} from './components/Dialog/DadsDialog.types'
export * from './components/Tooltip'
export * from './components/ProgressIndicator'
export * from './components/Card'
export * from './components/Heading'
export * from './components/Divider'
export * from './components/Table'
export * from './components/Accordion'
export * from './components/Chip'
export * from './components/ColorPicker'
export * from './components/DatePicker'
export * from './components/SearchBox'
export * from './components/Disclosure'
export * from './components/DescriptionList'
export * from './components/LanguageSelector'
export * from './components/MenuList'
export * from './components/MenuListBox'
export * from './components/HamburgerMenuButton'
export * from './components/UtilityLink'
export * from './components/ScrollTopButton'
export * from './components/GlobalMenu'
export * from './components/MegaMenu'
export * from './components/PageNavigation'
export * from './components/TableOfContents'
export * from './components/BottomNavigation'
export * from './components/MobileMenu'
export * from './components/Image'
export * from './components/ImageSlider'
export * from './components/Carousel'
export * from './components/List'
export * from './components/Blockquote'
export * from './components/ResourceList'
export * from './components/EmergencyBanner'
export * from './components/TableControl'
export type { DadsSize, DadsSemanticColor } from './types/common'
