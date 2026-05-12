import { afterEach, describe, expect, it } from 'vitest'
import { enableAutoUnmount, mount } from '@vue/test-utils'
import DadsStepNavigation from '../DadsStepNavigation.vue'
import type { DadsStepNavigationProps, DadsStepNavigationStep } from '../DadsStepNavigation.types'

enableAutoUnmount(afterEach)

const defaultSteps: DadsStepNavigationStep[] = [
  { title: '入力', status: 'done' },
  { title: '確認', status: 'current' },
  { title: '完了', status: 'pending' },
]

const createWrapper = (props: Partial<DadsStepNavigationProps> = {}) =>
  mount(DadsStepNavigation, {
    props: { steps: defaultSteps, ...props } as DadsStepNavigationProps,
  })

describe('DadsStepNavigation', () => {
  describe('rendering', () => {
    it('renders a <nav> root with the dads-step-navigation class', () => {
      const wrapper = createWrapper()
      expect(wrapper.element.tagName).toBe('NAV')
      expect(wrapper.classes()).toContain('dads-step-navigation')
    })

    it('renders an <ol> list inside the nav', () => {
      const wrapper = createWrapper()
      const list = wrapper.find('.dads-step-navigation__list')
      expect(list.exists()).toBe(true)
      expect(list.element.tagName).toBe('OL')
    })

    it('renders one <li> per step', () => {
      const wrapper = createWrapper()
      const items = wrapper.findAll('.dads-step-navigation__item')
      expect(items).toHaveLength(defaultSteps.length)
    })

    it('renders the title of each step', () => {
      const wrapper = createWrapper()
      const titles = wrapper.findAll('.dads-step-navigation__title')
      expect(titles.map((t) => t.text())).toEqual(['入力', '確認', '完了'])
    })

    it('renders no items when steps is empty', () => {
      const wrapper = createWrapper({ steps: [] })
      expect(wrapper.findAll('.dads-step-navigation__item')).toHaveLength(0)
      expect(wrapper.findAll('.dads-step-navigation__connector')).toHaveLength(0)
    })
  })

  describe('orientation prop', () => {
    it('applies horizontal class by default', () => {
      const wrapper = createWrapper()
      expect(wrapper.classes()).toContain('dads-step-navigation--horizontal')
      expect(wrapper.classes()).not.toContain('dads-step-navigation--vertical')
    })

    it('applies vertical class when orientation="vertical"', () => {
      const wrapper = createWrapper({ orientation: 'vertical' })
      expect(wrapper.classes()).toContain('dads-step-navigation--vertical')
      expect(wrapper.classes()).not.toContain('dads-step-navigation--horizontal')
    })

    it('applies horizontal class when orientation="horizontal" is explicit', () => {
      const wrapper = createWrapper({ orientation: 'horizontal' })
      expect(wrapper.classes()).toContain('dads-step-navigation--horizontal')
    })
  })

  describe('status indicator', () => {
    it('shows the step number for pending status', () => {
      const wrapper = createWrapper({
        steps: [{ title: 'A', status: 'pending' }],
      })
      const indicator = wrapper.find('.dads-step-navigation__indicator')
      expect(indicator.text()).toBe('1')
      expect(indicator.find('.mdi-check').exists()).toBe(false)
      expect(indicator.find('.mdi-close').exists()).toBe(false)
    })

    it('shows the step number for current status', () => {
      const wrapper = createWrapper({
        steps: [{ title: 'A', status: 'current' }],
      })
      const indicator = wrapper.find('.dads-step-navigation__indicator')
      expect(indicator.text()).toBe('1')
      expect(indicator.find('.mdi-check').exists()).toBe(false)
    })

    it('shows the check icon for done status', () => {
      const wrapper = createWrapper({
        steps: [{ title: 'A', status: 'done' }],
      })
      const indicator = wrapper.find('.dads-step-navigation__indicator')
      expect(indicator.find('.mdi-check').exists()).toBe(true)
      expect(indicator.text()).toBe('')
    })

    it('shows the close icon for error status', () => {
      const wrapper = createWrapper({
        steps: [{ title: 'A', status: 'error' }],
      })
      const indicator = wrapper.find('.dads-step-navigation__indicator')
      expect(indicator.find('.mdi-close').exists()).toBe(true)
      expect(indicator.text()).toBe('')
    })

    it('treats omitted status as pending and shows the step number', () => {
      const wrapper = createWrapper({ steps: [{ title: '無指定' }] })
      const indicator = wrapper.find('.dads-step-navigation__indicator')
      expect(indicator.text()).toBe('1')
    })

    it('shows correct step numbers for multiple pending steps', () => {
      const wrapper = createWrapper({
        steps: [
          { title: 'A', status: 'pending' },
          { title: 'B', status: 'pending' },
          { title: 'C', status: 'pending' },
        ],
      })
      const indicators = wrapper.findAll('.dads-step-navigation__indicator')
      expect(indicators.map((i) => i.text())).toEqual(['1', '2', '3'])
    })

    it('marks indicators as decorative for assistive tech', () => {
      const wrapper = createWrapper()
      const indicators = wrapper.findAll('.dads-step-navigation__indicator')
      indicators.forEach((indicator) => {
        expect(indicator.attributes('aria-hidden')).toBe('true')
      })
    })
  })

  describe('item status class', () => {
    it.each([
      ['pending', 'dads-step-navigation__item--pending'],
      ['current', 'dads-step-navigation__item--current'],
      ['done', 'dads-step-navigation__item--done'],
      ['error', 'dads-step-navigation__item--error'],
    ] as const)('applies %s status class', (status, className) => {
      const wrapper = createWrapper({ steps: [{ title: 'A', status }] })
      const item = wrapper.find('.dads-step-navigation__item')
      expect(item.classes()).toContain(className)
    })

    it('defaults the status class to pending when omitted', () => {
      const wrapper = createWrapper({ steps: [{ title: 'A' }] })
      const item = wrapper.find('.dads-step-navigation__item')
      expect(item.classes()).toContain('dads-step-navigation__item--pending')
    })
  })

  describe('aria-current', () => {
    it('sets aria-current="step" only on the current step', () => {
      const wrapper = createWrapper()
      const items = wrapper.findAll('.dads-step-navigation__item')
      expect(items[0]?.attributes('aria-current')).toBeUndefined()
      expect(items[1]?.attributes('aria-current')).toBe('step')
      expect(items[2]?.attributes('aria-current')).toBeUndefined()
    })

    it('omits aria-current entirely when no step is current', () => {
      const wrapper = createWrapper({
        steps: [
          { title: 'A', status: 'done' },
          { title: 'B', status: 'pending' },
        ],
      })
      const items = wrapper.findAll('.dads-step-navigation__item')
      items.forEach((item) => {
        expect(item.attributes('aria-current')).toBeUndefined()
      })
    })
  })

  describe('clickable prop', () => {
    it('renders <button> elements by default', () => {
      const wrapper = createWrapper()
      const buttons = wrapper.findAll('.dads-step-navigation__button')
      expect(buttons).toHaveLength(defaultSteps.length)
      buttons.forEach((b) => {
        expect(b.element.tagName).toBe('BUTTON')
        expect(b.attributes('type')).toBe('button')
      })
      expect(wrapper.find('.dads-step-navigation__static').exists()).toBe(false)
    })

    it('renders <div> static wrappers when clickable=false', () => {
      const wrapper = createWrapper({ clickable: false })
      const statics = wrapper.findAll('.dads-step-navigation__static')
      expect(statics).toHaveLength(defaultSteps.length)
      statics.forEach((d) => {
        expect(d.element.tagName).toBe('DIV')
      })
      expect(wrapper.find('.dads-step-navigation__button').exists()).toBe(false)
    })
  })

  describe('click:step event', () => {
    it('emits click:step when a button is clicked', async () => {
      const wrapper = createWrapper()
      const buttons = wrapper.findAll('.dads-step-navigation__button')
      await buttons[1]?.trigger('click')
      const events = wrapper.emitted('click:step')
      expect(events).toHaveLength(1)
      expect(events?.[0]?.[0]).toEqual(defaultSteps[1])
      expect(events?.[0]?.[1]).toBe(1)
      expect(events?.[0]?.[2]).toBeInstanceOf(Event)
    })

    it('emits click:step for each step independently', async () => {
      const wrapper = createWrapper()
      const buttons = wrapper.findAll('.dads-step-navigation__button')
      await buttons[0]?.trigger('click')
      await buttons[2]?.trigger('click')
      const events = wrapper.emitted('click:step')
      expect(events).toHaveLength(2)
      expect(events?.[0]?.[1]).toBe(0)
      expect(events?.[1]?.[1]).toBe(2)
    })

    it('does not emit click:step when clickable=false', async () => {
      const wrapper = createWrapper({ clickable: false })
      const statics = wrapper.findAll('.dads-step-navigation__static')
      await statics[0]?.trigger('click')
      expect(wrapper.emitted('click:step')).toBeUndefined()
    })
  })

  describe('connector', () => {
    it('renders n-1 connectors for n steps', () => {
      const wrapper = createWrapper()
      const connectors = wrapper.findAll('.dads-step-navigation__connector')
      expect(connectors).toHaveLength(defaultSteps.length - 1)
    })

    it('renders zero connectors for a single step', () => {
      const wrapper = createWrapper({ steps: [{ title: 'A' }] })
      expect(wrapper.findAll('.dads-step-navigation__connector')).toHaveLength(0)
    })

    it('renders one connector for two steps', () => {
      const wrapper = createWrapper({
        steps: [{ title: 'A' }, { title: 'B' }],
      })
      expect(wrapper.findAll('.dads-step-navigation__connector')).toHaveLength(1)
    })

    it('marks connectors as decorative for assistive tech', () => {
      const wrapper = createWrapper()
      const connectors = wrapper.findAll('.dads-step-navigation__connector')
      connectors.forEach((connector) => {
        expect(connector.attributes('aria-hidden')).toBe('true')
      })
    })
  })

  describe('ariaLabel prop', () => {
    it('uses default aria-label "ステップ"', () => {
      const wrapper = createWrapper()
      expect(wrapper.attributes('aria-label')).toBe('ステップ')
    })

    it('reflects a custom ariaLabel', () => {
      const wrapper = createWrapper({ ariaLabel: '申込みステップ' })
      expect(wrapper.attributes('aria-label')).toBe('申込みステップ')
    })
  })

  describe('reactivity', () => {
    it('updates rendered title when steps prop changes', async () => {
      const wrapper = createWrapper()
      await wrapper.setProps({
        steps: [{ title: 'X' }, { title: 'Y' }],
      })
      const titles = wrapper.findAll('.dads-step-navigation__title')
      expect(titles.map((t) => t.text())).toEqual(['X', 'Y'])
    })

    it('updates aria-current when status of a step changes', async () => {
      const wrapper = createWrapper({
        steps: [
          { title: 'A', status: 'current' },
          { title: 'B', status: 'pending' },
        ],
      })
      await wrapper.setProps({
        steps: [
          { title: 'A', status: 'done' },
          { title: 'B', status: 'current' },
        ],
      })
      const items = wrapper.findAll('.dads-step-navigation__item')
      expect(items[0]?.attributes('aria-current')).toBeUndefined()
      expect(items[1]?.attributes('aria-current')).toBe('step')
    })
  })
})
