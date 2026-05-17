import { afterEach, describe, expect, it } from 'vitest'
import { enableAutoUnmount, mount } from '@vue/test-utils'
import { axe } from 'vitest-axe'
import DadsProgressIndicator from '../DadsProgressIndicator.vue'
import type { DadsProgressIndicatorProps } from '../DadsProgressIndicator.types'

enableAutoUnmount(afterEach)

const createWrapper = (props: DadsProgressIndicatorProps = {}) =>
  mount(DadsProgressIndicator, { props, attachTo: document.body })

// SVG geometry constants must stay in sync with DadsProgressIndicator.vue.
const CIRCUMFERENCE = 2 * Math.PI * 16

describe('DadsProgressIndicator', () => {
  describe('rendering', () => {
    it('renders a root element with the dads-progress-indicator class', () => {
      const wrapper = createWrapper({ value: 50 })
      expect(wrapper.classes()).toContain('dads-progress-indicator')
    })

    it('defaults to the linear variant when none is provided', () => {
      const wrapper = createWrapper({ value: 50 })
      expect(wrapper.classes()).toContain('dads-progress-indicator--linear')
      expect(wrapper.find('.dads-progress-indicator__bar').exists()).toBe(true)
      expect(wrapper.find('.dads-progress-indicator__circle-svg').exists()).toBe(false)
    })

    it('renders the linear DOM (bar + bar-fill) when variant=linear', () => {
      const wrapper = createWrapper({ variant: 'linear', value: 50 })
      expect(wrapper.find('.dads-progress-indicator__bar').exists()).toBe(true)
      expect(wrapper.find('.dads-progress-indicator__bar-fill').exists()).toBe(true)
    })

    it('renders the circular DOM (svg + track + fill) when variant=circular', () => {
      const wrapper = createWrapper({ variant: 'circular', value: 50 })
      expect(wrapper.find('.dads-progress-indicator__circle-svg').exists()).toBe(true)
      expect(wrapper.find('.dads-progress-indicator__circle-track').exists()).toBe(true)
      expect(wrapper.find('.dads-progress-indicator__circle-fill').exists()).toBe(true)
      expect(wrapper.find('.dads-progress-indicator__bar').exists()).toBe(false)
    })

    it('applies the --linear class for the linear variant', () => {
      const wrapper = createWrapper({ variant: 'linear', value: 50 })
      expect(wrapper.classes()).toContain('dads-progress-indicator--linear')
      expect(wrapper.classes()).not.toContain('dads-progress-indicator--circular')
    })

    it('applies the --circular class for the circular variant', () => {
      const wrapper = createWrapper({ variant: 'circular', value: 50 })
      expect(wrapper.classes()).toContain('dads-progress-indicator--circular')
      expect(wrapper.classes()).not.toContain('dads-progress-indicator--linear')
    })
  })

  describe('determinate value mapping', () => {
    it('maps value=0 to 0% width on the linear fill', () => {
      const wrapper = createWrapper({ variant: 'linear', value: 0 })
      const fill = wrapper.find('.dads-progress-indicator__bar-fill')
      expect((fill.element as HTMLElement).style.width).toBe('0%')
    })

    it('maps value=50 to 50% width on the linear fill', () => {
      const wrapper = createWrapper({ variant: 'linear', value: 50 })
      const fill = wrapper.find('.dads-progress-indicator__bar-fill')
      expect((fill.element as HTMLElement).style.width).toBe('50%')
    })

    it('maps value=100 to 100% width on the linear fill', () => {
      const wrapper = createWrapper({ variant: 'linear', value: 100 })
      const fill = wrapper.find('.dads-progress-indicator__bar-fill')
      expect((fill.element as HTMLElement).style.width).toBe('100%')
    })

    it('sets stroke-dasharray to the circle circumference on circular variant', () => {
      const wrapper = createWrapper({ variant: 'circular', value: 50 })
      const fillCircle = wrapper.find('.dads-progress-indicator__circle-fill')
      expect(fillCircle.attributes('stroke-dasharray')).toBe(String(CIRCUMFERENCE))
    })

    it('maps value=0 to a full-circumference dashoffset (empty ring)', () => {
      const wrapper = createWrapper({ variant: 'circular', value: 0 })
      const fillCircle = wrapper.find('.dads-progress-indicator__circle-fill')
      expect(fillCircle.attributes('stroke-dashoffset')).toBe(String(CIRCUMFERENCE))
    })

    it('maps value=50 to half-circumference dashoffset', () => {
      const wrapper = createWrapper({ variant: 'circular', value: 50 })
      const fillCircle = wrapper.find('.dads-progress-indicator__circle-fill')
      const expected = CIRCUMFERENCE * (1 - 50 / 100)
      expect(fillCircle.attributes('stroke-dashoffset')).toBe(String(expected))
    })

    it('maps value=100 to dashoffset 0 (full ring)', () => {
      const wrapper = createWrapper({ variant: 'circular', value: 100 })
      const fillCircle = wrapper.find('.dads-progress-indicator__circle-fill')
      expect(fillCircle.attributes('stroke-dashoffset')).toBe('0')
    })
  })

  describe('value clamping', () => {
    it('clamps negative values to 0 on the linear variant', () => {
      const wrapper = createWrapper({ variant: 'linear', value: -25 })
      const fill = wrapper.find('.dads-progress-indicator__bar-fill')
      expect((fill.element as HTMLElement).style.width).toBe('0%')
    })

    it('clamps values above 100 to 100 on the linear variant', () => {
      const wrapper = createWrapper({ variant: 'linear', value: 250 })
      const fill = wrapper.find('.dads-progress-indicator__bar-fill')
      expect((fill.element as HTMLElement).style.width).toBe('100%')
    })

    it('clamps values for aria-valuenow as well', () => {
      const wrapper = createWrapper({ value: 250 })
      expect(wrapper.attributes('aria-valuenow')).toBe('100')
    })
  })

  describe('indeterminate mode', () => {
    it('applies the --indeterminate class when value is omitted', () => {
      const wrapper = createWrapper()
      expect(wrapper.classes()).toContain('dads-progress-indicator--indeterminate')
    })

    it('omits style width on linear bar-fill in indeterminate mode', () => {
      const wrapper = createWrapper({ variant: 'linear' })
      const fill = wrapper.find('.dads-progress-indicator__bar-fill')
      // No inline width set — the keyframe animation sweeps a CSS-controlled fill.
      expect((fill.element as HTMLElement).style.width).toBe('')
    })

    it('omits stroke-dashoffset on circular fill in indeterminate mode', () => {
      const wrapper = createWrapper({ variant: 'circular' })
      const fillCircle = wrapper.find('.dads-progress-indicator__circle-fill')
      expect(fillCircle.attributes('stroke-dashoffset')).toBeUndefined()
    })

    it('does not set --indeterminate when value is 0 (still determinate)', () => {
      const wrapper = createWrapper({ value: 0 })
      expect(wrapper.classes()).not.toContain('dads-progress-indicator--indeterminate')
    })
  })

  describe('size variants', () => {
    it('defaults to size=md when not specified', () => {
      const wrapper = createWrapper({ value: 50 })
      expect(wrapper.classes()).toContain('dads-progress-indicator--md')
    })

    it('applies --lg modifier', () => {
      const wrapper = createWrapper({ size: 'lg', value: 50 })
      expect(wrapper.classes()).toContain('dads-progress-indicator--lg')
    })

    it('applies --md modifier', () => {
      const wrapper = createWrapper({ size: 'md', value: 50 })
      expect(wrapper.classes()).toContain('dads-progress-indicator--md')
    })

    it('applies --sm modifier', () => {
      const wrapper = createWrapper({ size: 'sm', value: 50 })
      expect(wrapper.classes()).toContain('dads-progress-indicator--sm')
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

    it('omits aria-valuenow / valuemin / valuemax when indeterminate', () => {
      const wrapper = createWrapper()
      expect(wrapper.attributes('aria-valuenow')).toBeUndefined()
      expect(wrapper.attributes('aria-valuemin')).toBeUndefined()
      expect(wrapper.attributes('aria-valuemax')).toBeUndefined()
    })

    it('passes aria-label through when provided', () => {
      const wrapper = createWrapper({ value: 50, ariaLabel: 'アップロード進捗' })
      expect(wrapper.attributes('aria-label')).toBe('アップロード進捗')
    })

    it('omits aria-label when not provided', () => {
      const wrapper = createWrapper({ value: 50 })
      expect(wrapper.attributes('aria-label')).toBeUndefined()
    })

    it('marks the circular svg as aria-hidden so screen readers ignore the geometry', () => {
      const wrapper = createWrapper({ variant: 'circular', value: 50 })
      expect(wrapper.find('.dads-progress-indicator__circle-svg').attributes('aria-hidden')).toBe(
        'true',
      )
    })
  })

  describe('label rendering', () => {
    it('does not render the label by default', () => {
      const wrapper = createWrapper({ value: 50 })
      expect(wrapper.find('.dads-progress-indicator__label').exists()).toBe(false)
    })

    it('renders the default percentage label when showLabel=true', () => {
      const wrapper = createWrapper({ value: 75, showLabel: true })
      const label = wrapper.find('.dads-progress-indicator__label')
      expect(label.exists()).toBe(true)
      expect(label.text()).toBe('75%')
    })

    it('renders a custom label when provided', () => {
      const wrapper = createWrapper({ value: 50, showLabel: true, label: 'アップロード中…' })
      const label = wrapper.find('.dads-progress-indicator__label')
      expect(label.text()).toBe('アップロード中…')
    })

    it('uses the clamped value when computing the default label', () => {
      const wrapper = createWrapper({ value: 250, showLabel: true })
      expect(wrapper.find('.dads-progress-indicator__label').text()).toBe('100%')
    })

    it('does not render a label in indeterminate mode without an explicit label', () => {
      const wrapper = createWrapper({ showLabel: true })
      expect(wrapper.find('.dads-progress-indicator__label').exists()).toBe(false)
    })

    it('renders the explicit label even in indeterminate mode', () => {
      const wrapper = createWrapper({ showLabel: true, label: '読み込み中' })
      expect(wrapper.find('.dads-progress-indicator__label').text()).toBe('読み込み中')
    })
  })

  describe('reactivity', () => {
    it('updates the linear fill width when value changes', async () => {
      const wrapper = createWrapper({ variant: 'linear', value: 25 })
      const fill = wrapper.find('.dads-progress-indicator__bar-fill')
      expect((fill.element as HTMLElement).style.width).toBe('25%')
      await wrapper.setProps({ value: 80 })
      expect((fill.element as HTMLElement).style.width).toBe('80%')
    })

    it('switches between determinate and indeterminate when value is unset', async () => {
      const wrapper = createWrapper({ value: 50 })
      expect(wrapper.classes()).not.toContain('dads-progress-indicator--indeterminate')
      await wrapper.setProps({ value: undefined })
      expect(wrapper.classes()).toContain('dads-progress-indicator--indeterminate')
    })

    it('switches DOM shape when variant changes', async () => {
      const wrapper = createWrapper({ variant: 'linear', value: 50 })
      expect(wrapper.find('.dads-progress-indicator__bar').exists()).toBe(true)
      await wrapper.setProps({ variant: 'circular' })
      expect(wrapper.find('.dads-progress-indicator__bar').exists()).toBe(false)
      expect(wrapper.find('.dads-progress-indicator__circle-svg').exists()).toBe(true)
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
      const fills = wrapper.findAll('.dads-progress-indicator__bar-fill')
      expect((fills[0].element as HTMLElement).style.width).toBe('20%')
      expect((fills[1].element as HTMLElement).style.width).toBe('80%')
    })
  })

  describe('color variant', () => {
    it('applies the primary color modifier by default', () => {
      const wrapper = createWrapper({ value: 50 })
      expect(wrapper.classes()).toContain('dads-progress-indicator--color-primary')
    })

    it.each(['primary', 'secondary', 'success', 'error', 'warning'] as const)(
      'applies dads-progress-indicator--color-%s',
      (c) => {
        const wrapper = createWrapper({ value: 50, color: c })
        expect(wrapper.classes()).toContain(`dads-progress-indicator--color-${c}`)
      },
    )
  })

  describe('a11y (vitest-axe)', () => {
    it('has no violations for determinate linear progress', async () => {
      const wrapper = createWrapper({ value: 42, ariaLabel: '読み込み進捗' })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations for indeterminate linear progress', async () => {
      const wrapper = createWrapper({ ariaLabel: '処理中' })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations for determinate circular progress with label', async () => {
      const wrapper = createWrapper({
        variant: 'circular',
        value: 75,
        showLabel: true,
        ariaLabel: 'アップロード進捗',
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
