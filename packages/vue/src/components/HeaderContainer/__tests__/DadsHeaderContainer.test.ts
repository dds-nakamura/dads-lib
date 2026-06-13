import { afterEach, describe, expect, it } from 'vitest'
import { enableAutoUnmount, mount } from '@vue/test-utils'
import { axe } from 'vitest-axe'
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

  describe('menu toggle aria state', () => {
    it('sets aria-expanded="false" by default', () => {
      const button = createWrapper().find('.dads-header-container__menu-toggle')
      expect(button.attributes('aria-expanded')).toBe('false')
    })

    it('reflects menuExpanded via aria-expanded', () => {
      const button = createWrapper({ menuExpanded: true }).find(
        '.dads-header-container__menu-toggle',
      )
      expect(button.attributes('aria-expanded')).toBe('true')
    })

    it('sets aria-controls when menuControls is provided', () => {
      const button = createWrapper({ menuControls: 'mobile-drawer' }).find(
        '.dads-header-container__menu-toggle',
      )
      expect(button.attributes('aria-controls')).toBe('mobile-drawer')
    })

    it('omits aria-controls by default', () => {
      const button = createWrapper().find('.dads-header-container__menu-toggle')
      expect(button.attributes('aria-controls')).toBeUndefined()
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
      const icon = wrapper.find('.dads-header-container__menu-toggle svg.dads-icon')
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

    it('overrides the nav aria-label via navAriaLabel prop (i18n)', () => {
      const wrapper = createWrapper(
        { navAriaLabel: 'Main navigation' },
        { nav: '<a class="link" href="/">Home</a>' },
      )
      const nav = wrapper.find('.dads-header-container__nav')
      expect(nav.attributes('aria-label')).toBe('Main navigation')
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

  // ----------------------------------------------------------------------
  // variant — 4 public variants per official DADS spec. The modifier class
  // drives layout (max-width, min-height) in SCSS.
  // ----------------------------------------------------------------------
  describe('variant', () => {
    it('applies the wide-full modifier by default', () => {
      const wrapper = createWrapper()
      expect(wrapper.classes()).toContain('dads-header-container--wide-full')
    })

    it.each(['wide-full', 'wide-slim', 'medium', 'compact'] as const)(
      'applies the %s modifier when variant=%s',
      (variant) => {
        const wrapper = createWrapper({ variant })
        expect(wrapper.classes()).toContain(`dads-header-container--${variant}`)
      },
    )

    it('only applies one variant modifier at a time', () => {
      const wrapper = createWrapper({ variant: 'medium' })
      const variantClasses = wrapper
        .classes()
        .filter((c) => /^dads-header-container--(wide-full|wide-slim|medium|compact)$/.test(c))
      expect(variantClasses).toEqual(['dads-header-container--medium'])
    })
  })

  // ----------------------------------------------------------------------
  // logo — convenience props (logoLabel / logoHref) layered on top of the
  // existing #logo slot. Slot wins when both are supplied.
  // ----------------------------------------------------------------------
  describe('logo convenience props', () => {
    it('does not render the logo wrapper when neither prop nor slot is set', () => {
      const wrapper = createWrapper()
      expect(wrapper.find('.dads-header-container__logo').exists()).toBe(false)
    })

    it('renders logoLabel as <strong> when no href is provided', () => {
      const wrapper = createWrapper({ logoLabel: 'dads-lib' })
      const logo = wrapper.find('.dads-header-container__logo')
      expect(logo.exists()).toBe(true)
      const text = logo.find('.dads-header-container__logo-text')
      expect(text.element.tagName).toBe('STRONG')
      expect(text.text()).toBe('dads-lib')
    })

    it('renders logoLabel as <a href> when logoHref is provided', () => {
      const wrapper = createWrapper({ logoLabel: 'dads-lib', logoHref: '/' })
      const text = wrapper.find('.dads-header-container__logo-text')
      expect(text.element.tagName).toBe('A')
      expect(text.attributes('href')).toBe('/')
      expect(text.text()).toBe('dads-lib')
    })

    it('lets the #logo slot override the prop-based logo content', () => {
      const wrapper = createWrapper(
        { logoLabel: 'プロップ値' },
        { logo: '<img class="brand-svg" alt="" />' },
      )
      const logo = wrapper.find('.dads-header-container__logo')
      expect(logo.find('img.brand-svg').exists()).toBe(true)
      expect(logo.find('.dads-header-container__logo-text').exists()).toBe(false)
    })
  })

  // ----------------------------------------------------------------------
  // utility — new slot dedicated to utility-link / language-selector /
  // search-box / login-button content. Distinct from `actions`.
  // ----------------------------------------------------------------------
  describe('utility slot', () => {
    it('does not render the utility wrapper when the slot is empty', () => {
      const wrapper = createWrapper()
      expect(wrapper.find('.dads-header-container__utility').exists()).toBe(false)
    })

    it('renders the utility slot when provided', () => {
      const wrapper = createWrapper({}, { utility: '<a class="util" href="/lang">日本語</a>' })
      const util = wrapper.find('.dads-header-container__utility')
      expect(util.exists()).toBe(true)
      expect(util.find('a.util').text()).toBe('日本語')
    })

    it('renders utility and actions independently when both are provided', () => {
      const wrapper = createWrapper(
        {},
        {
          utility: '<a class="util" href="/login">ログイン</a>',
          actions: '<button class="cta">登録</button>',
        },
      )
      expect(wrapper.find('.dads-header-container__utility .util').exists()).toBe(true)
      expect(wrapper.find('.dads-header-container__actions .cta').exists()).toBe(true)
    })
  })

  describe('a11y (vitest-axe)', () => {
    it('has no violations with a default logo label', async () => {
      const wrapper = createWrapper({ logoLabel: 'デジタル庁' })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations with logoLabel + logoHref (anchor)', async () => {
      const wrapper = createWrapper({ logoLabel: 'デジタル庁', logoHref: '/' })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations with menu toggle hidden', async () => {
      const wrapper = createWrapper({ logoLabel: 'デジタル庁', showMenuToggle: false })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it.each(['wide-full', 'wide-slim', 'medium', 'compact'] as const)(
      'has no violations with variant=%s',
      async (variant) => {
        const wrapper = createWrapper({ logoLabel: 'デジタル庁', variant })
        expect(await axe(wrapper.element)).toHaveNoViolations()
      },
    )
  })
})
