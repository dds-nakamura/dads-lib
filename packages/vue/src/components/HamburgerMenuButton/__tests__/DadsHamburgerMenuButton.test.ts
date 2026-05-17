import { afterEach, describe, expect, it } from 'vitest'
import { enableAutoUnmount, mount } from '@vue/test-utils'
import { axe } from 'vitest-axe'
import DadsHamburgerMenuButton from '../DadsHamburgerMenuButton.vue'
import type { DadsHamburgerMenuButtonProps } from '../DadsHamburgerMenuButton.types'

enableAutoUnmount(afterEach)

const defaultProps = { ariaControls: 'dads-test-menu' }

const createWrapper = (props: Partial<DadsHamburgerMenuButtonProps> = {}) =>
  mount(DadsHamburgerMenuButton, {
    props: { ...defaultProps, ...props } as DadsHamburgerMenuButtonProps,
  })

const mountInBody = (props: Partial<DadsHamburgerMenuButtonProps> = {}) => {
  // axe-core が `aria-controls` の参照先 id を DOM に要求するため、
  // テスト用ターゲット要素を都度 body に挿入してからマウントする。
  const merged = { ...defaultProps, ...props } as DadsHamburgerMenuButtonProps
  const target = document.createElement('nav')
  target.id = merged.ariaControls
  document.body.appendChild(target)
  return mount(DadsHamburgerMenuButton, {
    props: merged,
    attachTo: document.body,
  })
}

describe('DadsHamburgerMenuButton', () => {
  // ----------------------------------------------------------------------
  // rendering
  // ----------------------------------------------------------------------
  describe('rendering', () => {
    it('renders a native <button type="button"> with the dads class', () => {
      const wrapper = createWrapper()
      expect(wrapper.element.tagName).toBe('BUTTON')
      expect(wrapper.attributes('type')).toBe('button')
      expect(wrapper.classes()).toContain('dads-hamburger-menu-button')
    })

    it('renders the hamburger icon (3 lines) when closed', () => {
      const wrapper = createWrapper({ modelValue: false })
      const icons = wrapper.findAll('svg.dads-hamburger-menu-button__icon')
      expect(icons).toHaveLength(1)
      // 3 lines icon uses 0 0 24 24 viewBox.
      expect(icons[0]!.attributes('viewBox')).toBe('0 0 24 24')
      expect(icons[0]!.attributes('aria-hidden')).toBe('true')
    })

    it('renders the close (×) icon when open', () => {
      const wrapper = createWrapper({ modelValue: true })
      const icons = wrapper.findAll('svg.dads-hamburger-menu-button__icon')
      expect(icons).toHaveLength(1)
      // × icon uses 0 0 120 120 viewBox in the official reference.
      expect(icons[0]!.attributes('viewBox')).toBe('0 0 120 120')
    })

    it('renders default openLabel ("メニュー") when closed', () => {
      const wrapper = createWrapper({ modelValue: false })
      const label = wrapper.find('.dads-hamburger-menu-button__label')
      expect(label.text()).toBe('メニュー')
    })

    it('renders default closeLabel ("閉じる") when open', () => {
      const wrapper = createWrapper({ modelValue: true })
      const label = wrapper.find('.dads-hamburger-menu-button__label')
      expect(label.text()).toBe('閉じる')
    })

    it('applies default md size modifier', () => {
      const wrapper = createWrapper()
      expect(wrapper.classes()).toContain('dads-hamburger-menu-button--md')
    })

    it('applies the open modifier class when modelValue is true', () => {
      const wrapper = createWrapper({ modelValue: true })
      expect(wrapper.classes()).toContain('dads-hamburger-menu-button--open')
    })

    it('omits the open modifier class when modelValue is false', () => {
      const wrapper = createWrapper({ modelValue: false })
      expect(wrapper.classes()).not.toContain('dads-hamburger-menu-button--open')
    })
  })

  // ----------------------------------------------------------------------
  // aria
  // ----------------------------------------------------------------------
  describe('aria attributes', () => {
    it('reflects aria-expanded=false when closed', () => {
      const wrapper = createWrapper({ modelValue: false })
      expect(wrapper.attributes('aria-expanded')).toBe('false')
    })

    it('reflects aria-expanded=true when open', () => {
      const wrapper = createWrapper({ modelValue: true })
      expect(wrapper.attributes('aria-expanded')).toBe('true')
    })

    it('reflects aria-controls from prop', () => {
      const wrapper = createWrapper({ ariaControls: 'my-drawer' })
      expect(wrapper.attributes('aria-controls')).toBe('my-drawer')
    })

    it('updates aria-expanded when modelValue changes', async () => {
      const wrapper = createWrapper({ modelValue: false })
      expect(wrapper.attributes('aria-expanded')).toBe('false')
      await wrapper.setProps({ modelValue: true })
      expect(wrapper.attributes('aria-expanded')).toBe('true')
      await wrapper.setProps({ modelValue: false })
      expect(wrapper.attributes('aria-expanded')).toBe('false')
    })
  })

  // ----------------------------------------------------------------------
  // size
  // ----------------------------------------------------------------------
  describe('size prop', () => {
    it.each(['lg', 'md', 'sm'] as const)('applies dads-hamburger-menu-button--%s class', (size) => {
      const wrapper = createWrapper({ size })
      expect(wrapper.classes()).toContain(`dads-hamburger-menu-button--${size}`)
    })
  })

  // ----------------------------------------------------------------------
  // custom labels
  // ----------------------------------------------------------------------
  describe('custom labels', () => {
    it('renders a custom openLabel when closed', () => {
      const wrapper = createWrapper({ modelValue: false, openLabel: 'MENU' })
      expect(wrapper.find('.dads-hamburger-menu-button__label').text()).toBe('MENU')
    })

    it('renders a custom closeLabel when open', () => {
      const wrapper = createWrapper({ modelValue: true, closeLabel: 'CLOSE' })
      expect(wrapper.find('.dads-hamburger-menu-button__label').text()).toBe('CLOSE')
    })

    it('switches between openLabel and closeLabel reactively', async () => {
      const wrapper = createWrapper({
        modelValue: false,
        openLabel: 'OPEN',
        closeLabel: 'SHUT',
      })
      expect(wrapper.find('.dads-hamburger-menu-button__label').text()).toBe('OPEN')
      await wrapper.setProps({ modelValue: true })
      expect(wrapper.find('.dads-hamburger-menu-button__label').text()).toBe('SHUT')
    })
  })

  // ----------------------------------------------------------------------
  // disabled
  // ----------------------------------------------------------------------
  describe('disabled state', () => {
    it('sets the disabled attribute', () => {
      const wrapper = createWrapper({ disabled: true })
      expect(wrapper.attributes('disabled')).toBeDefined()
    })

    it('suppresses update:modelValue when disabled', async () => {
      const wrapper = createWrapper({ disabled: true, modelValue: false })
      await wrapper.trigger('click')
      expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    })

    it('suppresses click event when disabled', async () => {
      const wrapper = createWrapper({ disabled: true })
      await wrapper.trigger('click')
      expect(wrapper.emitted('click')).toBeUndefined()
    })
  })

  // ----------------------------------------------------------------------
  // events / v-model
  // ----------------------------------------------------------------------
  describe('events', () => {
    it('emits update:modelValue=true when toggled from closed', async () => {
      const wrapper = createWrapper({ modelValue: false })
      await wrapper.trigger('click')
      const events = wrapper.emitted('update:modelValue')
      expect(events).toHaveLength(1)
      expect(events?.[0]?.[0]).toBe(true)
    })

    it('emits update:modelValue=false when toggled from open', async () => {
      const wrapper = createWrapper({ modelValue: true })
      await wrapper.trigger('click')
      const events = wrapper.emitted('update:modelValue')
      expect(events).toHaveLength(1)
      expect(events?.[0]?.[0]).toBe(false)
    })

    it('emits click with the original MouseEvent', async () => {
      const wrapper = createWrapper()
      await wrapper.trigger('click')
      const events = wrapper.emitted('click')
      expect(events).toHaveLength(1)
      expect(events?.[0]?.[0]).toBeInstanceOf(Event)
    })

    it('emits both update:modelValue and click on a single click', async () => {
      const wrapper = createWrapper({ modelValue: false })
      await wrapper.trigger('click')
      expect(wrapper.emitted('update:modelValue')).toHaveLength(1)
      expect(wrapper.emitted('click')).toHaveLength(1)
    })
  })

  // ----------------------------------------------------------------------
  // a11y — axe-core via vitest-axe.
  // ----------------------------------------------------------------------
  describe('a11y (vitest-axe)', () => {
    it('has no violations when closed', async () => {
      const wrapper = mountInBody({ modelValue: false })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations when open', async () => {
      const wrapper = mountInBody({ modelValue: true })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations when disabled', async () => {
      const wrapper = mountInBody({ disabled: true })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })
  })

  describe('variant', () => {
    it('applies the default variant modifier', () => {
      const wrapper = createWrapper()
      expect(wrapper.classes()).toContain('dads-hamburger-menu-button--variant-default')
    })

    it.each(['default', 'icon-only', 'mobile-conditional'] as const)(
      'applies the %s variant modifier',
      (variant) => {
        const wrapper = createWrapper({ variant })
        expect(wrapper.classes()).toContain(`dads-hamburger-menu-button--variant-${variant}`)
      },
    )

    it('renders the label by default', () => {
      const wrapper = createWrapper()
      expect(wrapper.find('.dads-hamburger-menu-button__label').exists()).toBe(true)
    })

    it('omits the visible label and exposes aria-label when variant="icon-only"', () => {
      const wrapper = createWrapper({ variant: 'icon-only' })
      expect(wrapper.find('.dads-hamburger-menu-button__label').exists()).toBe(false)
      expect(wrapper.attributes('aria-label')).toBe('メニュー')
    })

    it('aria-label tracks open/close state in icon-only mode', async () => {
      const wrapper = createWrapper({ variant: 'icon-only', modelValue: false })
      expect(wrapper.attributes('aria-label')).toBe('メニュー')
      await wrapper.setProps({ modelValue: true })
      expect(wrapper.attributes('aria-label')).toBe('閉じる')
    })

    it('does not set aria-label for non-icon-only variants (label is visible)', () => {
      const wrapper = createWrapper({ variant: 'default' })
      expect(wrapper.attributes('aria-label')).toBeUndefined()
    })
  })
})
