import { afterEach, describe, expect, it } from 'vitest'
import { enableAutoUnmount, mount } from '@vue/test-utils'
import { axe } from 'vitest-axe'
import DadsStepNavigation from '../DadsStepNavigation.vue'
import type { DadsStepNavigationProps, DadsStepNavigationStep } from '../DadsStepNavigation.types'

enableAutoUnmount(afterEach)

const defaultSteps: DadsStepNavigationStep[] = [
  { title: '入力', status: 'completed' },
  { title: '確認' },
  { title: '完了' },
]

const createWrapper = (props: Partial<DadsStepNavigationProps> = {}) =>
  mount(DadsStepNavigation, {
    props: { steps: defaultSteps, current: 1, ...props } as DadsStepNavigationProps,
  })

describe('DadsStepNavigation', () => {
  describe('rendering', () => {
    it('renders a <nav> root with the dads-step-navigation class', () => {
      const wrapper = createWrapper()
      expect(wrapper.element.tagName).toBe('NAV')
      expect(wrapper.classes()).toContain('dads-step-navigation')
    })

    it('renders a <ul> list inside the nav', () => {
      const wrapper = createWrapper()
      const list = wrapper.find('ul')
      expect(list.exists()).toBe(true)
    })

    it('renders one __step <li> per step', () => {
      const wrapper = createWrapper()
      const steps = wrapper.findAll('.dads-step-navigation__step')
      expect(steps).toHaveLength(defaultSteps.length)
      steps.forEach((s) => expect(s.element.tagName).toBe('LI'))
    })

    it('renders the title of each step in __title', () => {
      const wrapper = createWrapper()
      const titles = wrapper.findAll('.dads-step-navigation__title')
      expect(titles.map((t) => t.text())).toEqual(['入力', '確認', '完了'])
    })

    it('renders the step number in __number', () => {
      const wrapper = createWrapper()
      const numbers = wrapper.findAll('.dads-step-navigation__number')
      expect(numbers.map((n) => n.text().trim().charAt(0))).toEqual(['1', '2', '3'])
    })

    it('renders the visually-hidden progress summary', () => {
      const wrapper = createWrapper()
      const summary = wrapper.find('.dads-step-navigation > .dads-u-visually-hidden')
      expect(summary.exists()).toBe(true)
      // 1 step (completed) is reached.
      expect(summary.text()).toBe('全3ステップ中、1ステップ目まで到達済み')
    })

    it('honours an explicit reached prop in the summary', () => {
      const wrapper = createWrapper({ reached: 2 })
      const summary = wrapper.find('.dads-step-navigation > .dads-u-visually-hidden')
      expect(summary.text()).toBe('全3ステップ中、2ステップ目まで到達済み')
    })

    it('renders no steps when steps is empty', () => {
      const wrapper = createWrapper({ steps: [], current: undefined })
      expect(wrapper.findAll('.dads-step-navigation__step')).toHaveLength(0)
    })
  })

  describe('data-first / data-last', () => {
    it('marks first and last steps for connector suppression', () => {
      const wrapper = createWrapper()
      const steps = wrapper.findAll('.dads-step-navigation__step')
      expect(steps[0]?.attributes('data-first')).toBe('')
      expect(steps[0]?.attributes('data-last')).toBeUndefined()
      expect(steps[2]?.attributes('data-first')).toBeUndefined()
      expect(steps[2]?.attributes('data-last')).toBe('')
      expect(steps[1]?.attributes('data-first')).toBeUndefined()
      expect(steps[1]?.attributes('data-last')).toBeUndefined()
    })
  })

  describe('size prop (data-size)', () => {
    it('applies data-size="normal" by default', () => {
      const wrapper = createWrapper()
      expect(wrapper.attributes('data-size')).toBe('normal')
    })

    it('applies data-size="small" when size="small"', () => {
      const wrapper = createWrapper({ size: 'small' })
      expect(wrapper.attributes('data-size')).toBe('small')
    })
  })

  describe('orientation prop (data-orientation)', () => {
    it('applies data-orientation="horizontal" by default', () => {
      const wrapper = createWrapper()
      expect(wrapper.attributes('data-orientation')).toBe('horizontal')
    })

    it('applies data-orientation="vertical" when orientation="vertical"', () => {
      const wrapper = createWrapper({ orientation: 'vertical' })
      expect(wrapper.attributes('data-orientation')).toBe('vertical')
    })
  })

  describe('status (data-state)', () => {
    it.each([['reached'], ['completed'], ['error'], ['skipped'], ['editing']] as const)(
      'sets data-state="%s" on the step',
      (status) => {
        const wrapper = createWrapper({ steps: [{ title: 'A', status }], current: undefined })
        const step = wrapper.find('.dads-step-navigation__step')
        expect(step.attributes('data-state')).toBe(status)
      },
    )

    it('omits data-state for an upcoming step (no status)', () => {
      const wrapper = createWrapper({ steps: [{ title: 'A' }], current: undefined })
      const step = wrapper.find('.dads-step-navigation__step')
      expect(step.attributes('data-state')).toBeUndefined()
    })

    it('renders the completed check state-icon', () => {
      const wrapper = createWrapper({
        steps: [{ title: 'A', status: 'completed' }],
        current: undefined,
      })
      const icon = wrapper.find('.dads-step-navigation__state-icon')
      expect(icon.exists()).toBe(true)
      expect(icon.find('svg circle').exists()).toBe(true)
    })

    it('renders a visually-hidden "完了" label for completed', () => {
      const wrapper = createWrapper({
        steps: [{ title: 'A', status: 'completed' }],
        current: undefined,
      })
      const number = wrapper.find('.dads-step-navigation__number')
      expect(number.find('.dads-u-visually-hidden').text()).toBe('完了')
      expect(number.find('.dads-step-navigation__state-label').exists()).toBe(false)
    })

    it('renders a visible state-label "編集中" for editing', () => {
      const wrapper = createWrapper({
        steps: [{ title: 'A', status: 'editing' }],
        current: undefined,
      })
      const label = wrapper.find('.dads-step-navigation__state-label')
      expect(label.exists()).toBe(true)
      expect(label.text()).toBe('編集中')
      expect(wrapper.find('.dads-step-navigation__state-icon').exists()).toBe(true)
    })

    it('renders a visible state-label "エラー" for error', () => {
      const wrapper = createWrapper({
        steps: [{ title: 'A', status: 'error' }],
        current: undefined,
      })
      const label = wrapper.find('.dads-step-navigation__state-label')
      expect(label.exists()).toBe(true)
      expect(label.text()).toBe('エラー')
      expect(wrapper.find('.dads-step-navigation__state-icon').exists()).toBe(true)
    })

    it('renders a visually-hidden "スキップされました" label for skipped without a state-icon', () => {
      const wrapper = createWrapper({
        steps: [{ title: 'A', status: 'skipped' }],
        current: undefined,
      })
      const number = wrapper.find('.dads-step-navigation__number')
      expect(number.find('.dads-u-visually-hidden').text()).toBe('スキップされました')
      expect(number.find('.dads-step-navigation__state-icon').exists()).toBe(false)
      expect(number.find('.dads-step-navigation__state-label').exists()).toBe(false)
    })

    it('renders no state-icon/label for a plain reached step', () => {
      const wrapper = createWrapper({
        steps: [{ title: 'A', status: 'reached' }],
        current: undefined,
      })
      const number = wrapper.find('.dads-step-navigation__number')
      expect(number.find('.dads-step-navigation__state-icon').exists()).toBe(false)
      expect(number.find('.dads-step-navigation__state-label').exists()).toBe(false)
    })
  })

  describe('description sub-element', () => {
    it('renders __description when description is provided', () => {
      const wrapper = createWrapper({
        steps: [{ title: 'A', description: '説明文' }],
        current: undefined,
      })
      const desc = wrapper.find('.dads-step-navigation__description')
      expect(desc.exists()).toBe(true)
      expect(desc.text()).toBe('説明文')
      expect(desc.element.tagName).toBe('P')
    })

    it('omits __description when description is absent', () => {
      const wrapper = createWrapper({ steps: [{ title: 'A' }], current: undefined })
      expect(wrapper.find('.dads-step-navigation__description').exists()).toBe(false)
    })
  })

  describe('aria-current', () => {
    it('sets aria-current="step" only on the current step', () => {
      const wrapper = createWrapper({ current: 1 })
      const steps = wrapper.findAll('.dads-step-navigation__step')
      expect(steps[0]?.attributes('aria-current')).toBeUndefined()
      expect(steps[1]?.attributes('aria-current')).toBe('step')
      expect(steps[2]?.attributes('aria-current')).toBeUndefined()
    })

    it('omits aria-current when current is not set', () => {
      const wrapper = createWrapper({ current: undefined })
      wrapper.findAll('.dads-step-navigation__step').forEach((step) => {
        expect(step.attributes('aria-current')).toBeUndefined()
      })
    })
  })

  describe('header element', () => {
    it('renders interactive steps as <button type="button"> when clickable', () => {
      const wrapper = createWrapper({ current: undefined })
      const headers = wrapper.findAll('.dads-step-navigation__header')
      headers.forEach((h) => {
        expect(h.element.tagName).toBe('BUTTON')
        expect(h.attributes('type')).toBe('button')
      })
    })

    it('renders the current step header as an inert <span>', () => {
      const wrapper = createWrapper({ current: 1 })
      const headers = wrapper.findAll('.dads-step-navigation__header')
      expect(headers[1]?.element.tagName).toBe('SPAN')
      expect(headers[0]?.element.tagName).toBe('BUTTON')
    })

    it('renders <span> headers for every step when clickable=false', () => {
      const wrapper = createWrapper({ clickable: false, current: undefined })
      wrapper.findAll('.dads-step-navigation__header').forEach((h) => {
        expect(h.element.tagName).toBe('SPAN')
      })
      expect(wrapper.find('button.dads-step-navigation__header').exists()).toBe(false)
    })

    it('renders an <a href> header when href is provided', () => {
      const wrapper = createWrapper({
        steps: [{ title: 'A', href: '/step-a' }],
        current: undefined,
      })
      const header = wrapper.find('.dads-step-navigation__header')
      expect(header.element.tagName).toBe('A')
      expect(header.attributes('href')).toBe('/step-a')
    })

    it('renders a disabled <button> when step.disabled is set', () => {
      const wrapper = createWrapper({
        steps: [{ title: 'A', disabled: true }],
        current: undefined,
      })
      const header = wrapper.find('.dads-step-navigation__header')
      expect(header.element.tagName).toBe('BUTTON')
      expect(header.attributes('disabled')).toBeDefined()
    })
  })

  describe('click:step event', () => {
    it('emits click:step when an interactive button is clicked', async () => {
      const wrapper = createWrapper({ current: undefined })
      const headers = wrapper.findAll('button.dads-step-navigation__header')
      await headers[1]?.trigger('click')
      const events = wrapper.emitted('click:step')
      expect(events).toHaveLength(1)
      expect(events?.[0]?.[0]).toEqual(defaultSteps[1])
      expect(events?.[0]?.[1]).toBe(1)
      expect(events?.[0]?.[2]).toBeInstanceOf(Event)
    })

    it('emits click:step for each interactive step independently', async () => {
      const wrapper = createWrapper({ current: undefined })
      const headers = wrapper.findAll('button.dads-step-navigation__header')
      await headers[0]?.trigger('click')
      await headers[2]?.trigger('click')
      const events = wrapper.emitted('click:step')
      expect(events).toHaveLength(2)
      expect(events?.[0]?.[1]).toBe(0)
      expect(events?.[1]?.[1]).toBe(2)
    })

    it('does not emit click:step when clickable=false', async () => {
      const wrapper = createWrapper({ clickable: false, current: undefined })
      await wrapper.find('.dads-step-navigation__header').trigger('click')
      expect(wrapper.emitted('click:step')).toBeUndefined()
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
      await wrapper.setProps({ steps: [{ title: 'X' }, { title: 'Y' }], current: undefined })
      const titles = wrapper.findAll('.dads-step-navigation__title')
      expect(titles.map((t) => t.text())).toEqual(['X', 'Y'])
    })

    it('updates aria-current when current changes', async () => {
      const wrapper = createWrapper({ current: 0 })
      await wrapper.setProps({ current: 1 })
      const steps = wrapper.findAll('.dads-step-navigation__step')
      expect(steps[0]?.attributes('aria-current')).toBeUndefined()
      expect(steps[1]?.attributes('aria-current')).toBe('step')
    })
  })

  describe('a11y (vitest-axe)', () => {
    const mountInBody = (props: Partial<DadsStepNavigationProps> = {}) =>
      mount(DadsStepNavigation, {
        props: { steps: defaultSteps, current: 1, ...props } as DadsStepNavigationProps,
        attachTo: document.body,
      })

    it('has no violations in horizontal orientation', async () => {
      const wrapper = mountInBody()
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations in vertical orientation', async () => {
      const wrapper = mountInBody({ orientation: 'vertical' })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations when clickable=false', async () => {
      const wrapper = mountInBody({ clickable: false })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations with all states present', async () => {
      const wrapper = mountInBody({
        current: 2,
        steps: [
          { title: 'A', status: 'completed' },
          { title: 'B', status: 'skipped' },
          { title: 'C', status: 'editing' },
          { title: 'D', status: 'error' },
          { title: 'E' },
        ],
      })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })
  })
})
