import { afterEach, describe, expect, it } from 'vitest'
import { enableAutoUnmount, mount } from '@vue/test-utils'
import { axe } from 'vitest-axe'
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
    it('renders an opener button with the globe icon (official menu-list-box markup)', () => {
      const wrapper = createWrapper()
      const button = wrapper.find('button.dads-menu-list-box__opener')
      expect(button.exists()).toBe(true)
      expect(button.find('svg.dads-menu-list-box__opener-icon').exists()).toBe(true)
      expect(button.find('svg.dads-menu-list-box__opener-arrow').exists()).toBe(true)
    })

    it('renders the openerLabel (default "Language") on the button', () => {
      const wrapper = createWrapper()
      expect(wrapper.find('button.dads-menu-list-box__opener').text()).toContain('Language')
    })

    it('honors a custom openerLabel', () => {
      const wrapper = createWrapper({ openerLabel: '言語' })
      expect(wrapper.find('button.dads-menu-list-box__opener').text()).toContain('言語')
    })

    it('renders the popup with the official menu-list-box / menu-list classes', () => {
      const wrapper = createWrapper()
      expect(wrapper.find('div.dads-menu-list-box__popup').exists()).toBe(true)
      expect(wrapper.find('ul.dads-menu-list').exists()).toBe(true)
    })

    it('renders one menu item per option using the official menu-list item markup', async () => {
      const wrapper = createWrapper()
      await wrapper.find('button').trigger('click')
      const items = wrapper.findAll('a.dads-menu-list__item')
      expect(items).toHaveLength(defaultOptions.length)
      expect(items[0].attributes('data-type')).toBe('box')
      expect(items[0].attributes('data-size')).toBe('regular')
      expect(items[0].find('svg.dads-menu-list__front-icon.dads-language-selector__check').exists()).toBe(
        true,
      )
      expect(items[0].find('span.dads-menu-list__label').text()).toContain('日本語')
      expect(items[1].text()).toContain('English')
    })

    it('hides the popup initially', () => {
      const wrapper = createWrapper()
      const popup = wrapper.find('.dads-menu-list-box__popup')
      expect(popup.exists()).toBe(true)
      expect(popup.attributes('style')).toContain('display: none')
    })
  })

  describe('size', () => {
    it.each(['sm', 'md'] as const)('applies data-size="%s" on the opener', (size) => {
      const wrapper = createWrapper({ size })
      expect(wrapper.find('button.dads-menu-list-box__opener').attributes('data-size')).toBe(size)
    })

    it('defaults to sm', () => {
      const wrapper = createWrapper()
      expect(wrapper.find('button.dads-menu-list-box__opener').attributes('data-size')).toBe('sm')
    })
  })

  describe('open / close', () => {
    it('opens on opener click', async () => {
      const wrapper = createWrapper()
      await wrapper.find('button').trigger('click')
      expect(wrapper.find('button').attributes('aria-expanded')).toBe('true')
      const popupStyle = wrapper.find('.dads-menu-list-box__popup').attributes('style') ?? ''
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
      await wrapper.find('ul.dads-menu-list').trigger('keydown', { key: 'Escape' })
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
      await wrapper.find('ul.dads-menu-list').trigger('keydown', { key: 'Tab' })
      expect(wrapper.find('button').attributes('aria-expanded')).toBe('false')
    })

    it('emits open and close events', async () => {
      const wrapper = createWrapper()
      await wrapper.find('button').trigger('click')
      await wrapper.find('ul.dads-menu-list').trigger('keydown', { key: 'Escape' })
      expect(wrapper.emitted('open')).toHaveLength(1)
      expect(wrapper.emitted('close')).toHaveLength(1)
    })
  })

  describe('v-model', () => {
    it('emits update:modelValue with the selected language code on click', async () => {
      const wrapper = createWrapper({ modelValue: 'ja' })
      await wrapper.find('button').trigger('click')
      const items = wrapper.findAll('a.dads-menu-list__item')
      await items[1].trigger('click')
      expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toBe('en')
      expect(wrapper.emitted('change')?.[0]?.[0]).toBe('en')
    })

    it('marks the current option with aria-current="true" and data-current', async () => {
      const wrapper = createWrapper({ modelValue: 'en' })
      await wrapper.find('button').trigger('click')
      const items = wrapper.findAll('a.dads-menu-list__item')
      expect(items[0].attributes('aria-current')).toBeUndefined()
      expect(items[0].attributes('data-current')).toBeUndefined()
      expect(items[1].attributes('aria-current')).toBe('true')
      expect(items[1].attributes('data-current')).toBe('')
    })

    it('closes the menu after selection', async () => {
      const wrapper = createWrapper({ modelValue: 'ja' })
      await wrapper.find('button').trigger('click')
      await wrapper.findAll('a.dads-menu-list__item')[2].trigger('click')
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
      const items = wrapper.findAll('a.dads-menu-list__item')
      expect(document.activeElement).toBe(items[0].element)
    })

    it('moves focus to the last item on ArrowUp when menu opens', async () => {
      const wrapper = createWrapper()
      await wrapper.find('button').trigger('keydown', { key: 'ArrowUp' })
      await nextTick()
      await nextTick()
      const items = wrapper.findAll('a.dads-menu-list__item')
      expect(document.activeElement).toBe(items[items.length - 1].element)
    })
  })

  describe('disabled', () => {
    it('sets the native disabled attribute on the opener', () => {
      const wrapper = createWrapper({ disabled: true })
      expect(wrapper.find('button').attributes('disabled')).toBeDefined()
    })

    it('applies the disabled modifier class on the menu-list-box', () => {
      const wrapper = createWrapper({ disabled: true })
      expect(wrapper.find('.dads-menu-list-box').classes()).toContain('dads-menu-list-box--disabled')
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
      const popup = wrapper.find('.dads-menu-list-box__popup')
      expect(button.attributes('aria-controls')).toBe(popup.attributes('id'))
    })

    it('exposes the menu list with role="menu"', async () => {
      const wrapper = createWrapper()
      await wrapper.find('button').trigger('click')
      const menu = wrapper.find('ul.dads-menu-list')
      expect(menu.attributes('role')).toBe('menu')
    })

    it('marks each list wrapper with role="presentation"', async () => {
      const wrapper = createWrapper()
      await wrapper.find('button').trigger('click')
      const wrappers = wrapper.findAll('li')
      wrappers.forEach((li) => {
        expect(li.attributes('role')).toBe('presentation')
      })
    })

    it('marks each item with role="menuitem"', async () => {
      const wrapper = createWrapper()
      await wrapper.find('button').trigger('click')
      const items = wrapper.findAll('a.dads-menu-list__item')
      items.forEach((item) => {
        expect(item.attributes('role')).toBe('menuitem')
      })
    })

    it('sets lang and hreflang on each item from the option value', async () => {
      const wrapper = createWrapper()
      await wrapper.find('button').trigger('click')
      const items = wrapper.findAll('a.dads-menu-list__item')
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
      const items = wrapper.findAll('a.dads-menu-list__item')
      expect(items[0].attributes('href')).toBe('/ja/')
      expect(items[1].attributes('href')).toBe('#')
    })
  })

  describe('options prop', () => {
    it('renders a single option correctly', async () => {
      const wrapper = createWrapper({ options: [{ value: 'ja', label: '日本語' }] })
      await wrapper.find('button').trigger('click')
      const items = wrapper.findAll('a.dads-menu-list__item')
      expect(items).toHaveLength(1)
      expect(items[0].text()).toContain('日本語')
    })

    it('renders no items when options is empty', async () => {
      const wrapper = createWrapper({ options: [] })
      await wrapper.find('button').trigger('click')
      expect(wrapper.findAll('a.dads-menu-list__item')).toHaveLength(0)
    })
  })

  describe('a11y (vitest-axe)', () => {
    const mountInBody = (props: Partial<DadsLanguageSelectorProps> = {}) =>
      mount(DadsLanguageSelector, {
        props: { options: defaultOptions, ...props } as DadsLanguageSelectorProps,
        attachTo: document.body,
      })

    it('has no violations when closed', async () => {
      const wrapper = mountInBody({ modelValue: 'ja' })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations when open', async () => {
      const wrapper = mountInBody({ modelValue: 'ja' })
      await wrapper.find('button').trigger('click')
      await nextTick()
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations in md size', async () => {
      const wrapper = mountInBody({ modelValue: 'ja', size: 'md' })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations when disabled', async () => {
      const wrapper = mountInBody({ modelValue: 'ja', disabled: true })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })
  })
})
