import { afterEach, describe, expect, it } from 'vitest'
import { enableAutoUnmount, mount } from '@vue/test-utils'
import DadsHeaderContainer from '../DadsHeaderContainer.vue'
import type { DadsHeaderContainerProps } from '../DadsHeaderContainer.types'

enableAutoUnmount(afterEach)

const createWrapper = (props: DadsHeaderContainerProps = {}, slots: Record<string, string> = {}) =>
  mount(DadsHeaderContainer, {
    props,
    slots,
    attachTo: document.body,
  })

describe('DadsHeaderContainer', () => {
  describe('rendering', () => {
    it('renders a <header> element as the root', () => {
      const wrapper = createWrapper()
      expect(wrapper.element.tagName).toBe('HEADER')
      expect(wrapper.classes()).toContain('dads-header-container')
    })

    it('renders the inner layout wrapper', () => {
      const wrapper = createWrapper()
      expect(wrapper.find('.dads-header-container__inner').exists()).toBe(true)
    })
  })

  describe('sticky prop', () => {
    it('applies the sticky modifier class by default', () => {
      const wrapper = createWrapper()
      expect(wrapper.classes()).toContain('dads-header-container--sticky')
    })

    it('omits the sticky modifier class when sticky=false', () => {
      const wrapper = createWrapper({ sticky: false })
      expect(wrapper.classes()).not.toContain('dads-header-container--sticky')
    })
  })

  describe('showMenuToggle prop', () => {
    it('renders the hamburger button by default', () => {
      const wrapper = createWrapper()
      expect(wrapper.find('.dads-header-container__menu-toggle').exists()).toBe(true)
    })

    it('hides the hamburger button when showMenuToggle=false', () => {
      const wrapper = createWrapper({ showMenuToggle: false })
      expect(wrapper.find('.dads-header-container__menu-toggle').exists()).toBe(false)
    })
  })

  describe('menuToggleLabel prop', () => {
    it('uses the default Japanese aria-label', () => {
      const wrapper = createWrapper()
      const button = wrapper.find('.dads-header-container__menu-toggle')
      expect(button.attributes('aria-label')).toBe('メニューを開く')
    })

    it('uses a custom aria-label when provided', () => {
      const wrapper = createWrapper({ menuToggleLabel: 'Open menu' })
      const button = wrapper.find('.dads-header-container__menu-toggle')
      expect(button.attributes('aria-label')).toBe('Open menu')
    })
  })

  describe('click:menu emit', () => {
    it('emits click:menu when the hamburger is clicked', async () => {
      const wrapper = createWrapper()
      await wrapper.find('.dads-header-container__menu-toggle').trigger('click')
      expect(wrapper.emitted('click:menu')).toHaveLength(1)
    })

    it('forwards the original MouseEvent on click:menu', async () => {
      const wrapper = createWrapper()
      await wrapper.find('.dads-header-container__menu-toggle').trigger('click')
      const events = wrapper.emitted('click:menu')
      expect(events?.[0]?.[0]).toBeInstanceOf(MouseEvent)
    })

    it('does not emit click:menu when the button is not rendered', () => {
      const wrapper = createWrapper({ showMenuToggle: false })
      expect(wrapper.find('.dads-header-container__menu-toggle').exists()).toBe(false)
      expect(wrapper.emitted('click:menu')).toBeUndefined()
    })
  })

  describe('keyboard activation', () => {
    // The hamburger is a real <button type="button">, so the browser handles
    // Enter / Space activation natively (firing a click event). We assert the
    // structural contract here rather than re-test the browser's behaviour.
    it('renders the hamburger as a real <button type="button">', () => {
      const wrapper = createWrapper()
      const button = wrapper.find('.dads-header-container__menu-toggle')
      expect(button.element.tagName).toBe('BUTTON')
      expect(button.attributes('type')).toBe('button')
    })

    it('is reachable via keyboard (no negative tabindex)', () => {
      const wrapper = createWrapper()
      const button = wrapper.find('.dads-header-container__menu-toggle')
      // Default tabindex on a button is 0; only an explicit -1 would remove
      // it from the tab order.
      expect(button.attributes('tabindex')).not.toBe('-1')
    })
  })

  describe('hamburger icon accessibility', () => {
    it('marks the visual icon as aria-hidden', () => {
      const wrapper = createWrapper()
      const icon = wrapper.find('.dads-header-container__menu-toggle .mdi-menu')
      expect(icon.exists()).toBe(true)
      expect(icon.attributes('aria-hidden')).toBe('true')
    })
  })

  describe('logo slot', () => {
    it('does not render the logo wrapper when slot is empty', () => {
      const wrapper = createWrapper()
      expect(wrapper.find('.dads-header-container__logo').exists()).toBe(false)
    })

    it('renders the logo wrapper and content when slot is provided', () => {
      const wrapper = createWrapper({}, { logo: '<span class="brand">App</span>' })
      const logo = wrapper.find('.dads-header-container__logo')
      expect(logo.exists()).toBe(true)
      expect(logo.find('.brand').text()).toBe('App')
    })
  })

  describe('nav slot', () => {
    it('does not render the nav wrapper when slot is empty', () => {
      const wrapper = createWrapper()
      expect(wrapper.find('.dads-header-container__nav').exists()).toBe(false)
    })

    it('renders the nav wrapper as a <nav> element with aria-label and slot content', () => {
      const wrapper = createWrapper({}, { nav: '<a class="link" href="/">Home</a>' })
      const nav = wrapper.find('.dads-header-container__nav')
      expect(nav.exists()).toBe(true)
      expect(nav.element.tagName).toBe('NAV')
      expect(nav.attributes('aria-label')).toBe('メインナビゲーション')
      expect(nav.find('.link').text()).toBe('Home')
    })
  })

  describe('actions slot', () => {
    it('does not render the actions wrapper when slot is empty', () => {
      const wrapper = createWrapper()
      expect(wrapper.find('.dads-header-container__actions').exists()).toBe(false)
    })

    it('renders the actions wrapper and content when slot is provided', () => {
      const wrapper = createWrapper({}, { actions: '<button class="cta">Sign in</button>' })
      const actions = wrapper.find('.dads-header-container__actions')
      expect(actions.exists()).toBe(true)
      expect(actions.find('.cta').text()).toBe('Sign in')
    })
  })

  describe('all slots together', () => {
    it('renders logo, nav, and actions wrappers when all slots are populated', () => {
      const wrapper = createWrapper(
        {},
        {
          logo: '<span>Brand</span>',
          nav: '<a href="/">Home</a>',
          actions: '<button>Sign in</button>',
        },
      )
      expect(wrapper.find('.dads-header-container__logo').exists()).toBe(true)
      expect(wrapper.find('.dads-header-container__nav').exists()).toBe(true)
      expect(wrapper.find('.dads-header-container__actions').exists()).toBe(true)
    })
  })
})
