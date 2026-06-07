import { afterEach, describe, expect, it } from 'vitest'
import { enableAutoUnmount, mount } from '@vue/test-utils'
import { axe } from 'vitest-axe'
import DadsChipLabel from '../DadsChipLabel.vue'
import type { DadsChipLabelColor, DadsChipLabelProps } from '../DadsChipLabel.types'

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

const ALL_COLORS: readonly DadsChipLabelColor[] = [
  'gray',
  'blue',
  'light-blue',
  'cyan',
  'green',
  'lime',
  'yellow',
  'orange',
  'red',
  'magenta',
  'purple',
]

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

  describe('color axis (official 11 primitive hues via data-color)', () => {
    it('applies data-color=gray by default', () => {
      const wrapper = createWrapper()
      expect(wrapper.attributes('data-color')).toBe('gray')
    })

    it.each(ALL_COLORS)('applies data-color=%s when color=%s', (color) => {
      const wrapper = createWrapper({ color })
      expect(wrapper.attributes('data-color')).toBe(color)
    })
  })

  describe('style axis (official 4 styles via data-style)', () => {
    it('applies data-style=text by default', () => {
      const wrapper = createWrapper()
      expect(wrapper.attributes('data-style')).toBe('text')
    })

    it.each(['text', 'outline', 'filled-outline', 'fill'] as const)(
      'applies data-style=%s when appearance=%s',
      (appearance) => {
        const wrapper = createWrapper({ appearance })
        expect(wrapper.attributes('data-style')).toBe(appearance)
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
        { color: 'green' },
        { default: '公開中', prepend: '<span class="icon">✓</span>' },
      )
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })
  })
})
