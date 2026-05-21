import { afterEach, describe, expect, it } from 'vitest'
import { enableAutoUnmount, mount } from '@vue/test-utils'
import { axe } from 'vitest-axe'
import DadsDivider from '../DadsDivider.vue'
import type { DadsDividerProps } from '../DadsDivider.types'

enableAutoUnmount(afterEach)

const createWrapper = (props: Partial<DadsDividerProps> = {}, slots: Record<string, string> = {}) =>
  mount(DadsDivider, {
    props: props as DadsDividerProps,
    slots,
  })

describe('DadsDivider', () => {
  describe('rendering', () => {
    it('renders the root element with .dads-divider class', () => {
      const wrapper = createWrapper()
      expect(wrapper.classes()).toContain('dads-divider')
    })

    it('defaults to horizontal orientation', () => {
      const wrapper = createWrapper()
      expect(wrapper.classes()).toContain('dads-divider--horizontal')
    })

    it('applies the vertical modifier when orientation="vertical"', () => {
      const wrapper = createWrapper({ orientation: 'vertical' })
      expect(wrapper.classes()).toContain('dads-divider--vertical')
      expect(wrapper.classes()).not.toContain('dads-divider--horizontal')
    })

    it('renders a single line element when no label slot is provided', () => {
      const wrapper = createWrapper()
      const lines = wrapper.findAll('.dads-divider__line')
      expect(lines.length).toBe(1)
      expect(wrapper.find('.dads-divider__label').exists()).toBe(false)
    })

    it('renders two lines and a label when a default slot is supplied (horizontal)', () => {
      const wrapper = createWrapper({}, { default: 'OR' })
      const lines = wrapper.findAll('.dads-divider__line')
      expect(lines.length).toBe(2)
      const label = wrapper.find('.dads-divider__label')
      expect(label.exists()).toBe(true)
      expect(label.text()).toBe('OR')
    })

    it('ignores the default slot for vertical orientation (label only meaningful horizontally)', () => {
      const wrapper = createWrapper({ orientation: 'vertical' }, { default: 'should-be-ignored' })
      expect(wrapper.find('.dads-divider__label').exists()).toBe(false)
      expect(wrapper.findAll('.dads-divider__line').length).toBe(1)
      expect(wrapper.classes()).not.toContain('dads-divider--with-label')
    })

    it('adds the --with-label modifier when label is rendered', () => {
      const wrapper = createWrapper({}, { default: 'section' })
      expect(wrapper.classes()).toContain('dads-divider--with-label')
    })

    it('omits the --with-label modifier when no label slot is provided', () => {
      const wrapper = createWrapper()
      expect(wrapper.classes()).not.toContain('dads-divider--with-label')
    })
  })

  describe('color', () => {
    it('defaults to color="default"', () => {
      const wrapper = createWrapper()
      expect(wrapper.classes()).toContain('dads-divider--default')
    })

    it('applies the strong modifier when color="strong"', () => {
      const wrapper = createWrapper({ color: 'strong' })
      expect(wrapper.classes()).toContain('dads-divider--strong')
      expect(wrapper.classes()).not.toContain('dads-divider--default')
    })
  })

  describe('a11y', () => {
    it('sets role="separator" on the root element', () => {
      const wrapper = createWrapper()
      expect(wrapper.attributes('role')).toBe('separator')
    })

    it('forwards the orientation as aria-orientation (horizontal)', () => {
      const wrapper = createWrapper()
      expect(wrapper.attributes('aria-orientation')).toBe('horizontal')
    })

    it('forwards the orientation as aria-orientation (vertical)', () => {
      const wrapper = createWrapper({ orientation: 'vertical' })
      expect(wrapper.attributes('aria-orientation')).toBe('vertical')
    })

    it('emits aria-label when ariaLabel prop is supplied', () => {
      const wrapper = createWrapper({ ariaLabel: 'Section break' })
      expect(wrapper.attributes('aria-label')).toBe('Section break')
    })

    it('omits aria-label attribute when ariaLabel prop is not supplied', () => {
      const wrapper = createWrapper()
      expect(wrapper.attributes('aria-label')).toBeUndefined()
    })

    it('marks the line elements as aria-hidden', () => {
      const wrapper = createWrapper({}, { default: 'OR' })
      const lines = wrapper.findAll('.dads-divider__line')
      lines.forEach((line) => {
        expect(line.attributes('aria-hidden')).toBe('true')
      })
    })

    it('does not mark the label as aria-hidden so the text is announced', () => {
      const wrapper = createWrapper({}, { default: 'Section' })
      const label = wrapper.find('.dads-divider__label')
      expect(label.attributes('aria-hidden')).toBeUndefined()
    })
  })

  describe('slot content', () => {
    it('renders rich slot markup inside the label', () => {
      const wrapper = createWrapper({}, { default: '<strong class="bold-marker">A</strong>' })
      const label = wrapper.find('.dads-divider__label')
      expect(label.find('.bold-marker').exists()).toBe(true)
      expect(label.text()).toBe('A')
    })
  })

  describe('variant (full-width / inset)', () => {
    it('applies the full-width modifier by default', () => {
      const wrapper = createWrapper()
      expect(wrapper.classes()).toContain('dads-divider--full-width')
    })

    it('applies the inset modifier when variant="inset"', () => {
      const wrapper = createWrapper({ variant: 'inset' })
      expect(wrapper.classes()).toContain('dads-divider--inset')
      expect(wrapper.classes()).not.toContain('dads-divider--full-width')
    })
  })

  describe('thickness (1-4)', () => {
    it('applies thickness-1 by default', () => {
      const wrapper = createWrapper()
      expect(wrapper.classes()).toContain('dads-divider--thickness-1')
    })

    it.each([1, 2, 3, 4] as const)('applies thickness-%i modifier', (t) => {
      const wrapper = createWrapper({ thickness: t })
      expect(wrapper.classes()).toContain(`dads-divider--thickness-${t}`)
    })
  })

  describe('lineStyle (solid / dashed)', () => {
    it('applies style-solid by default', () => {
      const wrapper = createWrapper()
      expect(wrapper.classes()).toContain('dads-divider--style-solid')
    })

    it('applies style-dashed when lineStyle="dashed"', () => {
      const wrapper = createWrapper({ lineStyle: 'dashed' })
      expect(wrapper.classes()).toContain('dads-divider--style-dashed')
    })
  })

  describe('a11y (vitest-axe)', () => {
    const mountInBody = (
      props: Partial<DadsDividerProps> = {},
      slots: Record<string, string> = {},
    ) =>
      mount(DadsDivider, {
        props: props as DadsDividerProps,
        slots,
        attachTo: document.body,
      })

    it('has no violations in horizontal orientation (decorative)', async () => {
      const wrapper = mountInBody()
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations in vertical orientation', async () => {
      const wrapper = mountInBody({ orientation: 'vertical' })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations with a label slot', async () => {
      const wrapper = mountInBody({}, { default: 'OR' })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations with an explicit aria-label', async () => {
      const wrapper = mountInBody({ ariaLabel: 'セクション区切り' })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })
  })
})
