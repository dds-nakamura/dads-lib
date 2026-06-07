import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { axe } from 'vitest-axe'
import DadsButton from '../DadsButton.vue'
import DadsIcon from '../../Icon/DadsIcon.vue'
import type { DadsButtonProps } from '../DadsButton.types'

const createWrapper = (props: DadsButtonProps = {}, slots = { default: 'クリック' }) =>
  mount(DadsButton, { props, slots })

const mountInBody = (props: DadsButtonProps = {}, slots = { default: 'クリック' }) =>
  mount(DadsButton, { props, slots, attachTo: document.body })

describe('DadsButton', () => {
  describe('rendering', () => {
    it('renders the default slot inside a button element', () => {
      const wrapper = createWrapper()
      expect(wrapper.element.tagName).toBe('BUTTON')
      expect(wrapper.text()).toContain('クリック')
    })

    it('applies default variant / size / color classes', () => {
      const wrapper = createWrapper()
      const root = wrapper.find('.dads-button')
      expect(root.classes()).toContain('dads-button--solid-fill')
      expect(root.classes()).toContain('dads-button--md')
      expect(root.classes()).toContain('dads-button--primary')
    })

    it('renders an anchor when href is provided', () => {
      const wrapper = createWrapper({ href: 'https://example.com' })
      expect(wrapper.element.tagName).toBe('A')
      expect(wrapper.attributes('href')).toBe('https://example.com')
      expect(wrapper.attributes('role')).toBe('button')
    })
  })

  describe('variant prop', () => {
    it.each(['solid-fill', 'outline', 'text'] as const)(
      'applies dads-button--%s class',
      (variant) => {
        const wrapper = createWrapper({ variant })
        expect(wrapper.classes()).toContain(`dads-button--${variant}`)
      },
    )
  })

  describe('size prop', () => {
    it.each(['lg', 'md', 'sm', 'xs'] as const)('applies dads-button--%s class', (size) => {
      const wrapper = createWrapper({ size })
      expect(wrapper.classes()).toContain(`dads-button--${size}`)
    })
  })

  describe('color prop', () => {
    // Official DADS button is single-color (blue / primary). The non-official
    // success / error / warning / secondary values were removed (Issue #18 T6).
    it('applies the dads-button--primary class', () => {
      const wrapper = createWrapper({ color: 'primary' })
      expect(wrapper.classes()).toContain('dads-button--primary')
    })
  })

  describe('disabled state', () => {
    it('sets the disabled attribute', () => {
      const wrapper = createWrapper({ disabled: true })
      expect(wrapper.attributes('disabled')).toBeDefined()
    })

    it('suppresses click events', async () => {
      const wrapper = createWrapper({ disabled: true })
      await wrapper.trigger('click')
      expect(wrapper.emitted('click')).toBeUndefined()
    })

    it('on anchor uses aria-disabled and tabindex=-1', () => {
      const wrapper = createWrapper({ href: 'https://example.com', disabled: true })
      expect(wrapper.attributes('aria-disabled')).toBe('true')
      expect(wrapper.attributes('tabindex')).toBe('-1')
      // href should be absent so navigation does not occur.
      expect(wrapper.attributes('href')).toBeUndefined()
    })
  })

  describe('loading state', () => {
    it('renders the spinner element', () => {
      const wrapper = createWrapper({ loading: true })
      expect(wrapper.find('.dads-button__spinner').exists()).toBe(true)
    })

    it('sets aria-busy', () => {
      const wrapper = createWrapper({ loading: true })
      expect(wrapper.attributes('aria-busy')).toBe('true')
    })

    it('suppresses click events while loading', async () => {
      const wrapper = createWrapper({ loading: true })
      await wrapper.trigger('click')
      expect(wrapper.emitted('click')).toBeUndefined()
    })

    it('hides the prepend icon while loading', () => {
      const wrapper = createWrapper({ loading: true, prependIcon: 'download' })
      expect(wrapper.find('.dads-button__icon--prepend').exists()).toBe(false)
    })
  })

  describe('icons', () => {
    it('renders the prepend icon as a DadsIcon svg', () => {
      const wrapper = createWrapper({ prependIcon: 'download' })
      const icon = wrapper.find('.dads-button__icon--prepend')
      expect(icon.exists()).toBe(true)
      expect(icon.element.tagName.toLowerCase()).toBe('svg')
      expect(icon.classes()).toContain('dads-icon')
      const iconComp = wrapper
        .findAllComponents(DadsIcon)
        .find((c) => c.props('name') === 'download')
      expect(iconComp).toBeTruthy()
    })

    it('renders the append icon as a DadsIcon svg', () => {
      const wrapper = createWrapper({ appendIcon: 'arrow_forward' })
      const icon = wrapper.find('.dads-button__icon--append')
      expect(icon.exists()).toBe(true)
      expect(icon.element.tagName.toLowerCase()).toBe('svg')
      const iconComp = wrapper
        .findAllComponents(DadsIcon)
        .find((c) => c.props('name') === 'arrow_forward')
      expect(iconComp).toBeTruthy()
    })

    it('marks icons as decorative for assistive tech', () => {
      const wrapper = createWrapper({ prependIcon: 'download' })
      const icon = wrapper.find('.dads-button__icon--prepend')
      expect(icon.attributes('aria-hidden')).toBe('true')
    })
  })

  describe('block prop', () => {
    it('applies dads-button--block class', () => {
      const wrapper = createWrapper({ block: true })
      expect(wrapper.classes()).toContain('dads-button--block')
    })
  })

  describe('type prop', () => {
    it('passes through native button type', () => {
      const wrapper = createWrapper({ type: 'submit' })
      expect(wrapper.attributes('type')).toBe('submit')
    })

    it('does not set type attribute on anchor', () => {
      const wrapper = createWrapper({ href: 'https://example.com', type: 'submit' })
      expect(wrapper.attributes('type')).toBeUndefined()
    })
  })

  describe('events', () => {
    it('emits click with the original MouseEvent', async () => {
      const wrapper = createWrapper()
      await wrapper.trigger('click')
      const events = wrapper.emitted('click')
      expect(events).toHaveLength(1)
      expect(events?.[0]?.[0]).toBeInstanceOf(Event)
    })
  })

  describe('aria-label', () => {
    it('reflects the ariaLabel prop', () => {
      const wrapper = createWrapper({ ariaLabel: '保存する' })
      expect(wrapper.attributes('aria-label')).toBe('保存する')
    })
  })

  describe('preventDefault on inactive anchor click', () => {
    // For native <button disabled>, the browser skips the click handler entirely,
    // so preventDefault is irrelevant. The anchor variant relies on our handler
    // calling preventDefault to block navigation.
    it('calls preventDefault when an anchor is disabled', () => {
      const wrapper = createWrapper({ href: 'https://example.com', disabled: true })
      const event = new MouseEvent('click', { bubbles: true, cancelable: true })
      const preventDefault = vi.spyOn(event, 'preventDefault')
      wrapper.element.dispatchEvent(event)
      expect(preventDefault).toHaveBeenCalled()
      expect(wrapper.emitted('click')).toBeUndefined()
    })

    it('calls preventDefault when an anchor is loading', () => {
      const wrapper = createWrapper({ href: 'https://example.com', loading: true })
      const event = new MouseEvent('click', { bubbles: true, cancelable: true })
      const preventDefault = vi.spyOn(event, 'preventDefault')
      wrapper.element.dispatchEvent(event)
      expect(preventDefault).toHaveBeenCalled()
    })
  })

  // ----------------------------------------------------------------------
  // a11y — axe-core via vitest-axe. The component should pass automated
  // WCAG 2.1 AA checks under representative prop combinations. Test scope:
  //   - default (text-labelled button)
  //   - icon-only variant requires aria-label (we verify both label sources)
  //   - disabled / loading states must remain announceable
  //   - anchor variant (role="button") must keep an accessible name
  //
  // attachTo: document.body は axe が要求する DOM ツリー接続のため必須。
  // ----------------------------------------------------------------------
  describe('a11y (vitest-axe)', () => {
    it('has no violations with a text label', async () => {
      const wrapper = mountInBody({}, { default: '保存' })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations when icon-only with aria-label', async () => {
      const wrapper = mountInBody(
        { ariaLabel: '保存', prependIcon: 'save' },
        { default: '' },
      )
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations in disabled state', async () => {
      const wrapper = mountInBody({ disabled: true }, { default: '送信' })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations in loading state', async () => {
      const wrapper = mountInBody({ loading: true }, { default: '読み込み中' })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations when rendered as an anchor', async () => {
      const wrapper = mountInBody(
        { href: 'https://example.com', variant: 'outline' },
        { default: 'リンク' },
      )
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })
  })
})
