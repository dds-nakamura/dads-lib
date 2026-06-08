import { afterEach, describe, expect, it } from 'vitest'
import { enableAutoUnmount, mount } from '@vue/test-utils'
import { axe } from 'vitest-axe'
import DadsProgressIndicator from '../DadsProgressIndicator.vue'
import type { DadsProgressIndicatorProps } from '../DadsProgressIndicator.types'

enableAutoUnmount(afterEach)

const createWrapper = (props: DadsProgressIndicatorProps = {}) =>
  mount(DadsProgressIndicator, { props, attachTo: document.body })

describe('DadsProgressIndicator', () => {
  describe('rendering', () => {
    it('renders a root element with the dads-progress-indicator class', () => {
      const wrapper = createWrapper({ value: 50 })
      expect(wrapper.classes()).toContain('dads-progress-indicator')
    })

    it('defaults to the linear indicator (SVG line) when none is provided', () => {
      const wrapper = createWrapper({ value: 50 })
      expect(wrapper.find('svg.dads-progress-indicator__linear').exists()).toBe(true)
      expect(wrapper.find('svg.dads-progress-indicator__spinner').exists()).toBe(false)
    })

    it('renders the linear SVG with track / bar / border lines', () => {
      const wrapper = createWrapper({ indicator: 'linear', value: 50 })
      const svg = wrapper.find('svg.dads-progress-indicator__linear')
      expect(svg.exists()).toBe(true)
      expect(svg.findAll('line.dads-progress-indicator__track')).toHaveLength(1)
      expect(svg.findAll('line.dads-progress-indicator__bar')).toHaveLength(1)
      expect(svg.findAll('line.dads-progress-indicator__border')).toHaveLength(1)
    })

    it('renders the linear bar as a rectangular <line> (no rounded caps, no radius)', () => {
      const wrapper = createWrapper({ indicator: 'linear', value: 50 })
      const bar = wrapper.find('line.dads-progress-indicator__bar')
      expect(bar.element.tagName.toLowerCase()).toBe('line')
      // No SVG markup should declare round line caps.
      expect(wrapper.html()).not.toContain('stroke-linecap')
    })

    it('renders the spinner SVG with nested <g><g> ring structure', () => {
      const wrapper = createWrapper({ indicator: 'spinner', value: 50 })
      const svg = wrapper.find('svg.dads-progress-indicator__spinner')
      expect(svg.exists()).toBe(true)
      expect(svg.find('g > g > circle.dads-progress-indicator__bar').exists()).toBe(true)
      expect(svg.find('circle.dads-progress-indicator__track').exists()).toBe(true)
      expect(svg.find('circle.dads-progress-indicator__border').exists()).toBe(true)
      expect(wrapper.find('svg.dads-progress-indicator__linear').exists()).toBe(false)
    })

    it('marks the indicator SVG as aria-hidden', () => {
      const linear = createWrapper({ value: 50 })
      expect(
        linear.find('svg.dads-progress-indicator__linear').attributes('aria-hidden'),
      ).toBe('true')
      const spinner = createWrapper({ indicator: 'spinner', value: 50 })
      expect(
        spinner.find('svg.dads-progress-indicator__spinner').attributes('aria-hidden'),
      ).toBe('true')
    })
  })

  describe('type taxonomy', () => {
    it('defaults to data-type="stacked"', () => {
      const wrapper = createWrapper({ value: 50 })
      expect(wrapper.attributes('data-type')).toBe('stacked')
    })

    it.each(['stacked', 'inlined', 'stacked-underlay'] as const)(
      'applies data-type="%s"',
      (type) => {
        const wrapper = createWrapper({ type, value: 50 })
        expect(wrapper.attributes('data-type')).toBe(type)
      },
    )

    it('uses the compact linear width (80) for the inlined type', () => {
      const wrapper = createWrapper({ type: 'inlined', value: 50 })
      const svg = wrapper.find('svg.dads-progress-indicator__linear')
      expect(svg.attributes('width')).toBe('80')
      expect(svg.attributes('viewBox')).toBe('0 0 80 4')
    })

    it('uses the large linear width (240) for stacked / stacked-underlay', () => {
      for (const type of ['stacked', 'stacked-underlay'] as const) {
        const wrapper = createWrapper({ type, value: 50 })
        expect(wrapper.find('svg.dads-progress-indicator__linear').attributes('width')).toBe(
          '240',
        )
      }
    })

    it('uses the compact spinner size (24) for the inlined type', () => {
      const wrapper = createWrapper({ type: 'inlined', indicator: 'spinner', value: 50 })
      const svg = wrapper.find('svg.dads-progress-indicator__spinner')
      expect(svg.attributes('width')).toBe('24')
      expect(svg.attributes('height')).toBe('24')
    })

    it('uses the large spinner size (48) for stacked', () => {
      const wrapper = createWrapper({ type: 'stacked', indicator: 'spinner', value: 50 })
      expect(wrapper.find('svg.dads-progress-indicator__spinner').attributes('width')).toBe('48')
    })
  })

  describe('determinate vs. indeterminate', () => {
    it('sets the --value custom property from the value (determinate)', () => {
      const wrapper = createWrapper({ value: 70 })
      expect((wrapper.element as HTMLElement).style.getPropertyValue('--value')).toBe('70')
    })

    it('clamps the --value property into [0, 100]', () => {
      const high = createWrapper({ value: 250 })
      expect((high.element as HTMLElement).style.getPropertyValue('--value')).toBe('100')
      const low = createWrapper({ value: -25 })
      expect((low.element as HTMLElement).style.getPropertyValue('--value')).toBe('0')
    })

    it('does not set data-indeterminate when a value is supplied', () => {
      const wrapper = createWrapper({ value: 50 })
      expect(wrapper.find('svg.dads-progress-indicator__linear').attributes('data-indeterminate')).toBe(
        undefined,
      )
    })

    it('sets data-indeterminate on the indicator when value is omitted', () => {
      const wrapper = createWrapper()
      expect(
        wrapper.find('svg.dads-progress-indicator__linear').attributes('data-indeterminate'),
      ).toBe('')
    })

    it('omits the --value property in indeterminate mode', () => {
      const wrapper = createWrapper()
      expect((wrapper.element as HTMLElement).style.getPropertyValue('--value')).toBe('')
    })

    it('treats value=0 as determinate (not indeterminate)', () => {
      const wrapper = createWrapper({ value: 0 })
      expect(
        wrapper.find('svg.dads-progress-indicator__linear').attributes('data-indeterminate'),
      ).toBe(undefined)
      expect(wrapper.attributes('aria-valuenow')).toBe('0')
    })
  })

  describe('active display control', () => {
    it('is active (no --inactive modifier) by default', () => {
      const wrapper = createWrapper({ value: 50 })
      expect(wrapper.classes()).not.toContain('dads-progress-indicator--inactive')
    })

    it('applies the --inactive modifier when active=false', () => {
      const wrapper = createWrapper({ value: 50, active: false })
      expect(wrapper.classes()).toContain('dads-progress-indicator--inactive')
    })

    it('toggles the --inactive modifier reactively', async () => {
      const wrapper = createWrapper({ value: 50, active: true })
      expect(wrapper.classes()).not.toContain('dads-progress-indicator--inactive')
      await wrapper.setProps({ active: false })
      expect(wrapper.classes()).toContain('dads-progress-indicator--inactive')
    })
  })

  describe('ARIA attributes', () => {
    it('always sets role="progressbar" on the root', () => {
      const wrapper = createWrapper({ value: 50 })
      expect(wrapper.attributes('role')).toBe('progressbar')
    })

    it('sets aria-valuemin / valuemax / valuenow on determinate progress', () => {
      const wrapper = createWrapper({ value: 42 })
      expect(wrapper.attributes('aria-valuemin')).toBe('0')
      expect(wrapper.attributes('aria-valuemax')).toBe('100')
      expect(wrapper.attributes('aria-valuenow')).toBe('42')
    })

    it('rounds aria-valuenow to an integer', () => {
      const wrapper = createWrapper({ value: 42.7 })
      expect(wrapper.attributes('aria-valuenow')).toBe('43')
    })

    it('clamps aria-valuenow into [0, 100]', () => {
      expect(createWrapper({ value: 250 }).attributes('aria-valuenow')).toBe('100')
      expect(createWrapper({ value: -25 }).attributes('aria-valuenow')).toBe('0')
    })

    it('omits aria-valuenow when indeterminate (keeps min/max)', () => {
      const wrapper = createWrapper()
      expect(wrapper.attributes('aria-valuenow')).toBeUndefined()
      expect(wrapper.attributes('aria-valuemin')).toBe('0')
      expect(wrapper.attributes('aria-valuemax')).toBe('100')
    })

    it('uses aria-labelledby pointing at the visible label when label is set', () => {
      const wrapper = createWrapper({ value: 50, label: '読み込み中' })
      const labelledBy = wrapper.attributes('aria-labelledby')
      expect(labelledBy).toBeTruthy()
      expect(wrapper.find('.dads-progress-indicator__label').attributes('id')).toBe(labelledBy)
      expect(wrapper.attributes('aria-label')).toBeUndefined()
    })

    it('falls back to aria-label when no visible label is provided', () => {
      const wrapper = createWrapper({ value: 50, ariaLabel: 'アップロード進捗' })
      expect(wrapper.attributes('aria-label')).toBe('アップロード進捗')
      expect(wrapper.attributes('aria-labelledby')).toBeUndefined()
    })
  })

  describe('label & percentage', () => {
    it('does not render a label when none is provided', () => {
      const wrapper = createWrapper({ value: 50 })
      expect(wrapper.find('.dads-progress-indicator__label').exists()).toBe(false)
    })

    it('renders the visible label text', () => {
      const wrapper = createWrapper({ value: 50, label: 'ラベル' })
      expect(wrapper.find('.dads-progress-indicator__label').text()).toContain('ラベル')
    })

    it('renders the percentage readout when showPercentage=true (determinate)', () => {
      const wrapper = createWrapper({ value: 70, label: 'ラベル', showPercentage: true })
      const pct = wrapper.find('.dads-progress-indicator__percentage')
      expect(pct.exists()).toBe(true)
      expect(pct.text().replace(/\s/g, '')).toBe('(70%)')
    })

    it('rounds the percentage readout', () => {
      const wrapper = createWrapper({ value: 69.6, label: 'ラベル', showPercentage: true })
      expect(wrapper.find('.dads-progress-indicator__percentage').text().replace(/\s/g, '')).toBe(
        '(70%)',
      )
    })

    it('omits the percentage readout in indeterminate mode', () => {
      const wrapper = createWrapper({ label: 'ラベル', showPercentage: true })
      expect(wrapper.find('.dads-progress-indicator__percentage').exists()).toBe(false)
    })

    it('omits the percentage readout when showPercentage is false', () => {
      const wrapper = createWrapper({ value: 70, label: 'ラベル' })
      expect(wrapper.find('.dads-progress-indicator__percentage').exists()).toBe(false)
    })
  })

  describe('reactivity', () => {
    it('updates the --value property when value changes', async () => {
      const wrapper = createWrapper({ value: 25 })
      expect((wrapper.element as HTMLElement).style.getPropertyValue('--value')).toBe('25')
      await wrapper.setProps({ value: 80 })
      expect((wrapper.element as HTMLElement).style.getPropertyValue('--value')).toBe('80')
    })

    it('switches between determinate and indeterminate when value is unset', async () => {
      const wrapper = createWrapper({ value: 50 })
      expect(
        wrapper.find('svg.dads-progress-indicator__linear').attributes('data-indeterminate'),
      ).toBe(undefined)
      await wrapper.setProps({ value: undefined })
      expect(
        wrapper.find('svg.dads-progress-indicator__linear').attributes('data-indeterminate'),
      ).toBe('')
    })

    it('switches indicator form when the indicator prop changes', async () => {
      const wrapper = createWrapper({ indicator: 'linear', value: 50 })
      expect(wrapper.find('svg.dads-progress-indicator__linear').exists()).toBe(true)
      await wrapper.setProps({ indicator: 'spinner' })
      expect(wrapper.find('svg.dads-progress-indicator__linear').exists()).toBe(false)
      expect(wrapper.find('svg.dads-progress-indicator__spinner').exists()).toBe(true)
    })
  })

  describe('multiple instances', () => {
    it('renders independently when used twice', () => {
      const wrapper = mount(
        {
          components: { DadsProgressIndicator },
          template: `
            <div>
              <DadsProgressIndicator :value="20" />
              <DadsProgressIndicator :value="80" />
            </div>
          `,
        },
        { attachTo: document.body },
      )
      const roots = wrapper.findAll('.dads-progress-indicator')
      expect((roots[0].element as HTMLElement).style.getPropertyValue('--value')).toBe('20')
      expect((roots[1].element as HTMLElement).style.getPropertyValue('--value')).toBe('80')
    })
  })

  describe('a11y (vitest-axe)', () => {
    it('has no violations for determinate linear progress (aria-label)', async () => {
      const wrapper = createWrapper({ value: 42, ariaLabel: '読み込み進捗' })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations for indeterminate linear progress (aria-label)', async () => {
      const wrapper = createWrapper({ ariaLabel: '処理中' })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations for determinate spinner with visible label', async () => {
      const wrapper = createWrapper({
        indicator: 'spinner',
        value: 75,
        label: 'アップロード進捗',
        showPercentage: true,
      })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations at value 0 and 100 boundaries', async () => {
      const min = createWrapper({ value: 0, ariaLabel: '0%' })
      expect(await axe(min.element)).toHaveNoViolations()
      const max = createWrapper({ value: 100, ariaLabel: '100%' })
      expect(await axe(max.element)).toHaveNoViolations()
    })
  })
})
