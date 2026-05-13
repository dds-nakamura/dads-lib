import { afterEach, describe, expect, it } from 'vitest'
import { enableAutoUnmount, mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import DadsLanguageSelector from '../DadsLanguageSelector.vue'
import type {
  DadsLanguageSelectorOption,
  DadsLanguageSelectorProps,
} from '../DadsLanguageSelector.types'

enableAutoUnmount(afterEach)

const defaultOptions: DadsLanguageSelectorOption[] = [
  { value: 'ja', label: '日本語' },
  { value: 'en', label: 'English' },
  { value: 'zh-cn', label: '简体中文' },
  { value: 'ko', label: '한국어' },
]

const createWrapper = (props: Partial<DadsLanguageSelectorProps> = {}) =>
  mount(DadsLanguageSelector, {
    props: { options: defaultOptions, ...props },
    attachTo: document.body,
  })

describe('DadsLanguageSelector', () => {
  describe('rendering', () => {
    it('renders an opener button with the globe icon', () => {
      const wrapper = createWrapper()
      const button = wrapper.find('button.dads-language-selector__opener')
      expect(button.exists()).toBe(true)
      expect(button.find('svg.dads-language-selector__opener-icon').exists()).toBe(true)
    })

    it('renders the openerLabel (default "Language") on the button', () => {
      const wrapper = createWrapper()
      expect(wrapper.find('.dads-language-selector__opener-text').text()).toBe('Language')
    })

    it('honors a custom openerLabel', () => {
      const wrapper = createWrapper({ openerLabel: '言語' })
      expect(wrapper.find('.dads-language-selector__opener-text').text()).toBe('言語')
    })

    it('renders one menu item per option', async () => {
      const wrapper = createWrapper()
      await wrapper.find('button').trigger('click')
      const items = wrapper.findAll('a.dads-language-selector__item')
      expect(items).toHaveLength(defaultOptions.length)
      expect(items[0].text()).toContain('日本語')
      expect(items[1].text()).toContain('English')
    })

    it('hides the popup initially', () => {
      const wrapper = createWrapper()
      const popup = wrapper.find('.dads-language-selector__popup')
      expect(popup.exists()).toBe(true)
      expect(popup.attributes('style')).toContain('display: none')
    })
  })

  describe('size', () => {
    it.each(['lg', 'md', 'sm'] as const)('applies dads-language-selector--%s class', (size) => {
      const wrapper = createWrapper({ size })
      expect(wrapper.classes()).toContain(`dads-language-selector--${size}`)
    })

    it('defaults to md', () => {
      const wrapper = createWrapper()
      expect(wrapper.classes()).toContain('dads-language-selector--md')
    })
  })

  describe('open / close', () => {
    it('opens on opener click', async () => {
      const wrapper = createWrapper()
      await wrapper.find('button').trigger('click')
      expect(wrapper.find('button').attributes('aria-expanded')).toBe('true')
      const popupStyle = wrapper.find('.dads-language-selector__popup').attributes('style') ?? ''
      expect(popupStyle).not.toContain('display: none')
    })

    it('toggles closed on a second click', async () => {
      const wrapper = createWrapper()
      await wrapper.find('button').trigger('click')
      await wrapper.find('button').trigger('click')
      expect(wrapper.find('button').attributes('aria-expanded')).toBe('false')
    })

    it('closes on Escape and returns focus to the opener', async () => {
      const wrapper = createWrapper()
      const button = wrapper.find('button').element as HTMLButtonElement
      button.focus()
      await wrapper.find('button').trigger('click')
      // Escape fires on the menu (where focus is moved). Trigger on the menu list.
      await wrapper.find('ul.dads-language-selector__menu').trigger('keydown', { key: 'Escape' })
      expect(wrapper.find('button').attributes('aria-expanded')).toBe('false')
      expect(document.activeElement).toBe(button)
    })

    it('closes on outside pointerdown', async () => {
      const wrapper = createWrapper()
      await wrapper.find('button').trigger('click')
      expect(wrapper.find('button').attributes('aria-expanded')).toBe('true')

      const outside = document.createElement('div')
      document.body.appendChild(outside)
      outside.dispatchEvent(new MouseEvent('pointerdown', { bubbles: true }))
      await nextTick()

      expect(wrapper.find('button').attributes('aria-expanded')).toBe('false')
      outside.remove()
    })

    it('closes on Tab keydown from the menu', async () => {
      const wrapper = createWrapper()
      await wrapper.find('button').trigger('click')
      await wrapper.find('ul.dads-language-selector__menu').trigger('keydown', { key: 'Tab' })
      expect(wrapper.find('button').attributes('aria-expanded')).toBe('false')
    })

    it('emits open and close events', async () => {
      const wrapper = createWrapper()
      await wrapper.find('button').trigger('click')
      await wrapper.find('ul.dads-language-selector__menu').trigger('keydown', { key: 'Escape' })
      expect(wrapper.emitted('open')).toHaveLength(1)
      expect(wrapper.emitted('close')).toHaveLength(1)
    })
  })

  describe('v-model', () => {
    it('emits update:modelValue with the selected language code on click', async () => {
      const wrapper = createWrapper({ modelValue: 'ja' })
      await wrapper.find('button').trigger('click')
      const items = wrapper.findAll('a.dads-language-selector__item')
      await items[1].trigger('click')
      expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toBe('en')
      expect(wrapper.emitted('change')?.[0]?.[0]).toBe('en')
    })

    it('marks the current option with aria-current="true"', async () => {
      const wrapper = createWrapper({ modelValue: 'en' })
      await wrapper.find('button').trigger('click')
      const items = wrapper.findAll('a.dads-language-selector__item')
      expect(items[0].attributes('aria-current')).toBeUndefined()
      expect(items[1].attributes('aria-current')).toBe('true')
    })

    it('closes the menu after selection', async () => {
      const wrapper = createWrapper({ modelValue: 'ja' })
      await wrapper.find('button').trigger('click')
      await wrapper.findAll('a.dads-language-selector__item')[2].trigger('click')
      expect(wrapper.find('button').attributes('aria-expanded')).toBe('false')
    })
  })

  describe('keyboard navigation', () => {
    it('opens on ArrowDown from the opener', async () => {
      const wrapper = createWrapper()
      await wrapper.find('button').trigger('keydown', { key: 'ArrowDown' })
      expect(wrapper.find('button').attributes('aria-expanded')).toBe('true')
    })

    it('opens on ArrowUp from the opener', async () => {
      const wrapper = createWrapper()
      await wrapper.find('button').trigger('keydown', { key: 'ArrowUp' })
      expect(wrapper.find('button').attributes('aria-expanded')).toBe('true')
    })

    it('opens on Enter from the opener', async () => {
      const wrapper = createWrapper()
      await wrapper.find('button').trigger('keydown', { key: 'Enter' })
      expect(wrapper.find('button').attributes('aria-expanded')).toBe('true')
    })

    it('opens on Space from the opener', async () => {
      const wrapper = createWrapper()
      await wrapper.find('button').trigger('keydown', { key: ' ' })
      expect(wrapper.find('button').attributes('aria-expanded')).toBe('true')
    })

    it('moves focus to the first item on ArrowDown when menu opens', async () => {
      const wrapper = createWrapper()
      await wrapper.find('button').trigger('keydown', { key: 'ArrowDown' })
      await nextTick()
      await nextTick()
      const items = wrapper.findAll('a.dads-language-selector__item')
      expect(document.activeElement).toBe(items[0].element)
    })

    it('moves focus to the last item on ArrowUp when menu opens', async () => {
      const wrapper = createWrapper()
      await wrapper.find('button').trigger('keydown', { key: 'ArrowUp' })
      await nextTick()
      await nextTick()
      const items = wrapper.findAll('a.dads-language-selector__item')
      expect(document.activeElement).toBe(items[items.length - 1].element)
    })
  })

  describe('disabled', () => {
    it('sets the native disabled attribute on the opener', () => {
      const wrapper = createWrapper({ disabled: true })
      expect(wrapper.find('button').attributes('disabled')).toBeDefined()
    })

    it('applies the disabled modifier class', () => {
      const wrapper = createWrapper({ disabled: true })
      expect(wrapper.classes()).toContain('dads-language-selector--disabled')
    })

    it('does not open the menu on click when disabled', async () => {
      const wrapper = createWrapper({ disabled: true })
      await wrapper.find('button').trigger('click')
      expect(wrapper.find('button').attributes('aria-expanded')).toBe('false')
    })
  })

  describe('accessibility', () => {
    it('sets aria-haspopup="menu" on the opener', () => {
      const wrapper = createWrapper()
      expect(wrapper.find('button').attributes('aria-haspopup')).toBe('menu')
    })

    it('uses the default ariaLabel "言語を選択"', () => {
      const wrapper = createWrapper()
      expect(wrapper.find('button').attributes('aria-label')).toBe('言語を選択')
    })

    it('honors a custom ariaLabel', () => {
      const wrapper = createWrapper({ ariaLabel: 'Select language' })
      expect(wrapper.find('button').attributes('aria-label')).toBe('Select language')
    })

    it('wires aria-controls on the opener to the popup id', () => {
      const wrapper = createWrapper()
      const button = wrapper.find('button')
      const popup = wrapper.find('.dads-language-selector__popup')
      expect(button.attributes('aria-controls')).toBe(popup.attributes('id'))
    })

    it('exposes the menu list with role="menu"', async () => {
      const wrapper = createWrapper()
      await wrapper.find('button').trigger('click')
      const menu = wrapper.find('ul.dads-language-selector__menu')
      expect(menu.attributes('role')).toBe('menu')
    })

    it('marks each item with role="menuitem"', async () => {
      const wrapper = createWrapper()
      await wrapper.find('button').trigger('click')
      const items = wrapper.findAll('a.dads-language-selector__item')
      items.forEach((item) => {
        expect(item.attributes('role')).toBe('menuitem')
      })
    })

    it('sets lang and hreflang on each item from the option value', async () => {
      const wrapper = createWrapper()
      await wrapper.find('button').trigger('click')
      const items = wrapper.findAll('a.dads-language-selector__item')
      expect(items[0].attributes('lang')).toBe('ja')
      expect(items[0].attributes('hreflang')).toBe('ja')
      expect(items[2].attributes('lang')).toBe('zh-cn')
    })

    it('uses option.href on the anchor when provided, otherwise "#"', async () => {
      const wrapper = createWrapper({
        options: [
          { value: 'ja', label: '日本語', href: '/ja/' },
          { value: 'en', label: 'English' },
        ],
      })
      await wrapper.find('button').trigger('click')
      const items = wrapper.findAll('a.dads-language-selector__item')
      expect(items[0].attributes('href')).toBe('/ja/')
      expect(items[1].attributes('href')).toBe('#')
    })
  })

  describe('options prop', () => {
    it('renders a single option correctly', async () => {
      const wrapper = createWrapper({ options: [{ value: 'ja', label: '日本語' }] })
      await wrapper.find('button').trigger('click')
      const items = wrapper.findAll('a.dads-language-selector__item')
      expect(items).toHaveLength(1)
      expect(items[0].text()).toContain('日本語')
    })

    it('renders no items when options is empty', async () => {
      const wrapper = createWrapper({ options: [] })
      await wrapper.find('button').trigger('click')
      expect(wrapper.findAll('a.dads-language-selector__item')).toHaveLength(0)
    })
  })
})
