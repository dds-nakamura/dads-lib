import { defineConfig } from 'vitepress'

// DADS 公式コンポーネントを 4 カテゴリにグルーピング。
// 公式分類 (入力 / ナビゲーション / 表示 / フィードバック) に沿って配置。
// TableOfContents は Navigation 内、TableControl は Display 内。
const components = {
  Form: [
    { text: 'Button', link: '/components/button' },
    { text: 'InputText', link: '/components/input-text' },
    { text: 'Textarea', link: '/components/textarea' },
    { text: 'Select', link: '/components/select' },
    { text: 'Checkbox', link: '/components/checkbox' },
    { text: 'CheckboxGroup', link: '/components/checkbox-group' },
    { text: 'Radio', link: '/components/radio' },
    { text: 'RadioGroup', link: '/components/radio-group' },
    { text: 'FileUpload', link: '/components/file-upload' },
    { text: 'Combobox', link: '/components/combobox' },
    { text: 'ColorPicker', link: '/components/color-picker' },
    { text: 'DatePicker', link: '/components/date-picker' },
    { text: 'SearchBox', link: '/components/search-box' },
  ],
  Navigation: [
    { text: 'HeaderContainer', link: '/components/header-container' },
    { text: 'Drawer', link: '/components/drawer' },
    { text: 'Breadcrumb', link: '/components/breadcrumb' },
    { text: 'StepNavigation', link: '/components/step-navigation' },
    { text: 'Tab', link: '/components/tab' },
    { text: 'LanguageSelector', link: '/components/language-selector' },
    { text: 'MenuList', link: '/components/menu-list' },
    { text: 'MenuListBox', link: '/components/menu-list-box' },
    { text: 'HamburgerMenuButton', link: '/components/hamburger-menu-button' },
    { text: 'UtilityLink', link: '/components/utility-link' },
    { text: 'GlobalMenu', link: '/components/global-menu' },
    { text: 'MegaMenu', link: '/components/mega-menu' },
    { text: 'PageNavigation', link: '/components/page-navigation' },
    { text: 'TableOfContents', link: '/components/table-of-contents' },
    { text: 'MobileMenu', link: '/components/mobile-menu' },
  ],
  Feedback: [
    { text: 'NotificationBanner', link: '/components/notification-banner' },
    { text: 'Dialog', link: '/components/dialog' },
    { text: 'Tooltip', link: '/components/tooltip' },
    { text: 'ProgressIndicator', link: '/components/progress-indicator' },
    { text: 'EmergencyBanner', link: '/components/emergency-banner' },
  ],
  Display: [
    { text: 'Card', link: '/components/card' },
    { text: 'Heading', link: '/components/heading' },
    { text: 'Divider', link: '/components/divider' },
    { text: 'Table', link: '/components/table' },
    { text: 'Accordion', link: '/components/accordion' },
    { text: 'ChipLabel', link: '/components/chip-label' },
    { text: 'ChipTag', link: '/components/chip-tag' },
    { text: 'Disclosure', link: '/components/disclosure' },
    { text: 'DescriptionList', link: '/components/description-list' },
    { text: 'Image', link: '/components/image' },
    { text: 'ImageSlider', link: '/components/image-slider' },
    { text: 'Carousel', link: '/components/carousel' },
    { text: 'List', link: '/components/list' },
    { text: 'Blockquote', link: '/components/blockquote' },
    { text: 'ResourceList', link: '/components/resource-list' },
    { text: 'TableControl', link: '/components/table-control' },
  ],
}

export default defineConfig({
  title: 'DADS Vue Components',
  description: 'デジタル庁デザインシステム (DADS) Vue 3 実装',
  lang: 'ja',
  cleanUrls: true,
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Components', link: '/components/button' },
    ],
    sidebar: {
      '/components/': [
        { text: 'Form', collapsed: false, items: components.Form },
        { text: 'Navigation', collapsed: false, items: components.Navigation },
        { text: 'Feedback', collapsed: false, items: components.Feedback },
        { text: 'Display', collapsed: false, items: components.Display },
      ],
    },
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/digital-go-jp/design-system-example-components-html',
      },
    ],
    outline: { label: '目次', level: [2, 3] },
    docFooter: { prev: '前へ', next: '次へ' },
  },
})
