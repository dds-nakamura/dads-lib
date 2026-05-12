import { afterEach, describe, expect, it } from 'vitest'
import { enableAutoUnmount, mount } from '@vue/test-utils'
import DadsChip from '../DadsChip.vue'
import type { DadsChipProps } from '../DadsChip.types'

enableAutoUnmount(afterEach)

const createWrapper = (
  props: DadsChipProps = {},
  slots: Record<string, string> = { default: 'タグ' },
) => mount(DadsChip, { props, slots, attachTo: document.body })

describe('DadsChip', () => {
  describe('rendering', () => {
    it('renders a span by default', () => {
      const wrapper = createWrapper()
      expect(wrapper.element.tagName).toBe('SPAN')
      expect(wrapper.classes()).toContain('dads-chip')
    })

    it('promotes the root to a button when clickable', () => {
      const wrapper = createWrapper({ clickable: true })
      expect(wrapper.element.tagName).toBe('BUTTON')
      expect(wrapper.attributes('type')).toBe('button')
      expect(wrapper.attributes('role')).toBe('button')
    })

    it('renders the default slot inside the label element', () => {
      const wrapper = createWrapper({}, { default: '東京都' })
      const label = wrapper.find('.dads-chip__label')
      expect(label.exists()).toBe(true)
      expect(label.text()).toBe('東京都')
    })

    it('reflects the ariaLabel prop', () => {
      const wrapper = createWrapper({ ariaLabel: 'タグ: 東京' })
      expect(wrapper.attributes('aria-label')).toBe('タグ: 東京')
    })

    it('applies default size and color classes', () => {
      const wrapper = createWrapper()
      expect(wrapper.classes()).toContain('dads-chip--md')
      expect(wrapper.classes()).toContain('dads-chip--primary')
    })
  })

  describe('size prop', () => {
    it.each(['lg', 'md', 'sm'] as const)('applies dads-chip--%s class', (size) => {
      const wrapper = createWrapper({ size })
      expect(wrapper.classes()).toContain(`dads-chip--${size}`)
    })
  })

  describe('color prop', () => {
    it.each(['primary', 'success', 'error', 'warning', 'secondary'] as const)(
      'applies dads-chip--%s class',
      (color) => {
        const wrapper = createWrapper({ color })
        expect(wrapper.classes()).toContain(`dads-chip--${color}`)
      },
    )
  })

  describe('closable', () => {
    it('renders the close button when closable=true', () => {
      const wrapper = createWrapper({ closable: true })
      const close = wrapper.find('.dads-chip__close')
      expect(close.exists()).toBe(true)
      expect(close.element.tagName).toBe('BUTTON')
    })

    it('uses the default closeLabel "削除"', () => {
      const wrapper = createWrapper({ closable: true })
      expect(wrapper.find('.dads-chip__close').attributes('aria-label')).toBe('削除')
    })

    it('honors a custom closeLabel', () => {
      const wrapper = createWrapper({ closable: true, closeLabel: 'remove tag' })
      expect(wrapper.find('.dads-chip__close').attributes('aria-label')).toBe('remove tag')
    })

    it('emits close when the × button is clicked', async () => {
      const wrapper = createWrapper({ closable: true })
      await wrapper.find('.dads-chip__close').trigger('click')
      expect(wrapper.emitted('close')).toHaveLength(1)
      expect(wrapper.emitted('close')?.[0]?.[0]).toBeInstanceOf(Event)
    })

    it('does not propagate close clicks to a clickable parent chip', async () => {
      const wrapper = createWrapper({ clickable: true, closable: true })
      await wrapper.find('.dads-chip__close').trigger('click')
      expect(wrapper.emitted('close')).toHaveLength(1)
      // The chip itself must not see the click — that would cause both
      // close + click to fire on the same user gesture.
      expect(wrapper.emitted('click')).toBeUndefined()
    })
  })

  describe('clickable', () => {
    it('exposes tabindex=0 by default when clickable', () => {
      const wrapper = createWrapper({ clickable: true })
      expect(wrapper.attributes('tabindex')).toBe('0')
    })

    it('emits click on mouse click when clickable', async () => {
      const wrapper = createWrapper({ clickable: true })
      await wrapper.trigger('click')
      expect(wrapper.emitted('click')).toHaveLength(1)
    })

    it('does not emit click when not clickable', async () => {
      const wrapper = createWrapper()
      await wrapper.trigger('click')
      expect(wrapper.emitted('click')).toBeUndefined()
    })

    it('emits click on Enter key', async () => {
      const wrapper = createWrapper({ clickable: true })
      await wrapper.trigger('keydown', { key: 'Enter' })
      const events = wrapper.emitted('click')
      expect(events).toHaveLength(1)
      expect(events?.[0]?.[0]).toBeInstanceOf(KeyboardEvent)
    })

    it('emits click on Space key', async () => {
      const wrapper = createWrapper({ clickable: true })
      await wrapper.trigger('keydown', { key: ' ' })
      expect(wrapper.emitted('click')).toHaveLength(1)
    })

    it('ignores other keys', async () => {
      const wrapper = createWrapper({ clickable: true })
      await wrapper.trigger('keydown', { key: 'Escape' })
      await wrapper.trigger('keydown', { key: 'a' })
      expect(wrapper.emitted('click')).toBeUndefined()
    })
  })

  describe('disabled', () => {
    it('forwards native disabled when clickable + disabled', () => {
      const wrapper = createWrapper({ clickable: true, disabled: true })
      expect(wrapper.attributes('disabled')).toBeDefined()
      expect(wrapper.attributes('tabindex')).toBeUndefined()
    })

    it('uses aria-disabled when non-clickable + disabled', () => {
      const wrapper = createWrapper({ disabled: true })
      expect(wrapper.attributes('aria-disabled')).toBe('true')
    })

    it('suppresses click while disabled', async () => {
      const wrapper = createWrapper({ clickable: true, disabled: true })
      await wrapper.trigger('click')
      await wrapper.trigger('keydown', { key: 'Enter' })
      expect(wrapper.emitted('click')).toBeUndefined()
    })

    it('disables the close button when closable + disabled', () => {
      const wrapper = createWrapper({ closable: true, disabled: true })
      const close = wrapper.find('.dads-chip__close')
      expect(close.attributes('disabled')).toBeDefined()
    })

    it('does not emit close while disabled even if click is dispatched', async () => {
      const wrapper = createWrapper({ closable: true, disabled: true })
      // Native <button disabled> would skip click handlers, but we exercise the
      // guard explicitly to lock in behavior even if a future refactor drops
      // the disabled attribute.
      const close = wrapper.find('.dads-chip__close')
      await close.element.dispatchEvent(new MouseEvent('click', { bubbles: true }))
      expect(wrapper.emitted('close')).toBeUndefined()
    })
  })

  describe('slots', () => {
    it('renders the prepend slot', () => {
      const wrapper = createWrapper({}, { default: 'タグ', prepend: '<i class="mdi mdi-tag" />' })
      const prepend = wrapper.find('.dads-chip__prepend')
      expect(prepend.exists()).toBe(true)
      expect(prepend.attributes('aria-hidden')).toBe('true')
      expect(prepend.find('.mdi-tag').exists()).toBe(true)
    })

    it('renders the append slot when not closable', () => {
      const wrapper = createWrapper(
        {},
        { default: 'タグ', append: '<i class="mdi mdi-chevron-down" />' },
      )
      const append = wrapper.find('.dads-chip__append')
      expect(append.exists()).toBe(true)
      expect(append.attributes('aria-hidden')).toBe('true')
    })

    it('hides the append slot when closable=true', () => {
      const wrapper = createWrapper(
        { closable: true },
        { default: 'タグ', append: '<i class="mdi mdi-chevron-down" />' },
      )
      // The close button replaces the append affordance to avoid two trailing
      // icons competing for focus / pointer.
      expect(wrapper.find('.dads-chip__append').exists()).toBe(false)
      expect(wrapper.find('.dads-chip__close').exists()).toBe(true)
    })
  })
})
