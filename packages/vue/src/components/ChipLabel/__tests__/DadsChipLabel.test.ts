import { afterEach, describe, expect, it } from 'vitest'
import { enableAutoUnmount, mount } from '@vue/test-utils'
import { axe } from 'vitest-axe'
import DadsChipLabel from '../DadsChipLabel.vue'
import type { DadsChipLabelProps } from '../DadsChipLabel.types'

enableAutoUnmount(afterEach)

const createWrapper = (
  props: DadsChipLabelProps = {},
  slots: Record<string, string> = { default: '公開中' },
) =>
  mount(DadsChipLabel, {
    props,
    slots,
    attachTo: document.body,
  })

describe('DadsChipLabel', () => {
  describe('rendering', () => {
    it('renders a <span> as the root', () => {
      const wrapper = createWrapper()
      expect(wrapper.element.tagName).toBe('SPAN')
      expect(wrapper.classes()).toContain('dads-chip-label')
    })

    it('renders the default slot text', () => {
      const wrapper = createWrapper({}, { default: '重要' })
      expect(wrapper.text()).toBe('重要')
    })

    it('renders prepend slot when provided', () => {
      const wrapper = createWrapper({}, { default: 'x', prepend: '<i class="icon" />' })
      expect(wrapper.find('.dads-chip-label__prepend .icon').exists()).toBe(true)
    })

    it('renders append slot when provided', () => {
      const wrapper = createWrapper({}, { default: 'x', append: '<i class="icon" />' })
      expect(wrapper.find('.dads-chip-label__append .icon').exists()).toBe(true)
    })

    it('omits prepend wrapper when slot is empty', () => {
      const wrapper = createWrapper()
      expect(wrapper.find('.dads-chip-label__prepend').exists()).toBe(false)
    })

    it('omits append wrapper when slot is empty', () => {
      const wrapper = createWrapper()
      expect(wrapper.find('.dads-chip-label__append').exists()).toBe(false)
    })
  })

  describe('non-interactive contract', () => {
    it('does not render a button (label is read-only)', () => {
      const wrapper = createWrapper()
      expect(wrapper.element.tagName).not.toBe('BUTTON')
      expect(wrapper.find('button').exists()).toBe(false)
    })

    it('does not set role=button', () => {
      const wrapper = createWrapper()
      expect(wrapper.attributes('role')).toBeUndefined()
    })

    it('does not set tabindex (not focusable)', () => {
      const wrapper = createWrapper()
      expect(wrapper.attributes('tabindex')).toBeUndefined()
    })
  })

  describe('size variants', () => {
    it('applies the md modifier by default', () => {
      const wrapper = createWrapper()
      expect(wrapper.classes()).toContain('dads-chip-label--md')
    })

    it.each(['sm', 'md', 'lg'] as const)('applies the %s modifier when size=%s', (size) => {
      const wrapper = createWrapper({ size })
      expect(wrapper.classes()).toContain(`dads-chip-label--${size}`)
    })
  })

  describe('color variants', () => {
    it('applies the primary modifier by default', () => {
      const wrapper = createWrapper()
      expect(wrapper.classes()).toContain('dads-chip-label--primary')
    })

    it.each(['primary', 'success', 'error', 'warning', 'secondary'] as const)(
      'applies the %s modifier when color=%s',
      (color) => {
        const wrapper = createWrapper({ color })
        expect(wrapper.classes()).toContain(`dads-chip-label--${color}`)
      },
    )
  })

  describe('a11y (vitest-axe)', () => {
    it('has no violations on a plain label', async () => {
      const wrapper = createWrapper()
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations with a prepend icon', async () => {
      const wrapper = createWrapper(
        { color: 'success' },
        { default: '公開中', prepend: '<span class="icon">✓</span>' },
      )
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })
  })
})
