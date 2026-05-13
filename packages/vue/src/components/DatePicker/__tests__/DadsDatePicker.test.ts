import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { enableAutoUnmount, mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { axe } from 'vitest-axe'
import DadsDatePicker from '../DadsDatePicker.vue'
import type { DadsDatePickerProps } from '../DadsDatePicker.types'

enableAutoUnmount(afterEach)

const createWrapper = (props: Partial<DadsDatePickerProps> = {}) =>
  mount(DadsDatePicker, { props, attachTo: document.body })

describe('DadsDatePicker', () => {
  // Pin "today" so the calendar grid is deterministic across runs. 2026-05-14
  // is a Thursday — useful for verifying weekday alignment in the table.
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-05-14T00:00:00'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  // ----------------------------------------------------------------------
  // render
  // ----------------------------------------------------------------------
  describe('render', () => {
    it('renders three numeric inputs (year / month / day)', () => {
      const wrapper = createWrapper()
      expect(wrapper.find('input[data-js-year-input]').exists()).toBe(true)
      expect(wrapper.find('input[data-js-month-input]').exists()).toBe(true)
      expect(wrapper.find('input[data-js-day-input]').exists()).toBe(true)
    })

    it('renders a calendar trigger button', () => {
      const wrapper = createWrapper()
      const btn = wrapper.find('button[data-js-calendar-button]')
      expect(btn.exists()).toBe(true)
      expect(btn.attributes('aria-expanded')).toBe('false')
      expect(btn.attributes('aria-haspopup')).toBe('dialog')
    })

    it('renders the label and links its `for` to the year input', () => {
      const wrapper = createWrapper({ label: '生年月日' })
      const label = wrapper.find('label.dads-date-picker__label-text')
      expect(label.exists()).toBe(true)
      expect(label.text()).toContain('生年月日')
      const yearId = wrapper.find('input[data-js-year-input]').attributes('id')
      expect(label.attributes('for')).toBe(yearId)
    })

    it('hides the calendar popover initially', () => {
      const wrapper = createWrapper()
      const popover = wrapper.find('.dads-date-picker__calendar-popover')
      expect(popover.exists()).toBe(true)
      expect(popover.attributes('style')).toContain('display: none')
    })

    it('does not render the footer without hint or error', () => {
      const wrapper = createWrapper()
      expect(wrapper.find('.dads-date-picker__footer').exists()).toBe(false)
    })
  })

  // ----------------------------------------------------------------------
  // props
  // ----------------------------------------------------------------------
  describe('props', () => {
    it.each(['lg', 'md', 'sm'] as const)('applies dads-date-picker--%s class', (size) => {
      const wrapper = createWrapper({ size })
      expect(wrapper.classes()).toContain(`dads-date-picker--${size}`)
      expect(wrapper.find('.dads-date-picker__controls').attributes('data-size')).toBe(size)
    })

    it('defaults to md size', () => {
      const wrapper = createWrapper()
      expect(wrapper.classes()).toContain('dads-date-picker--md')
    })

    it('splits the bound ISO value into year / month / day inputs', () => {
      const wrapper = createWrapper({ modelValue: '2025-09-01' })
      expect((wrapper.find('input[data-js-year-input]').element as HTMLInputElement).value).toBe(
        '2025',
      )
      expect((wrapper.find('input[data-js-month-input]').element as HTMLInputElement).value).toBe(
        '09',
      )
      expect((wrapper.find('input[data-js-day-input]').element as HTMLInputElement).value).toBe(
        '01',
      )
    })

    it('renders the hint and links aria-describedby', () => {
      const wrapper = createWrapper({ hint: '西暦で入力' })
      const hint = wrapper.find('.dads-date-picker__hint')
      expect(hint.exists()).toBe(true)
      expect(hint.text()).toBe('西暦で入力')
      const hintId = hint.attributes('id')
      expect(wrapper.find('input[data-js-year-input]').attributes('aria-describedby')).toBe(hintId)
    })

    it('renders the error message with role="alert" and aria-invalid', () => {
      const wrapper = createWrapper({ errorMessage: '日付を入力してください' })
      const err = wrapper.find('.dads-date-picker__error-text')
      expect(err.exists()).toBe(true)
      expect(err.text()).toBe('日付を入力してください')
      expect(err.attributes('role')).toBe('alert')
      expect(wrapper.find('input[data-js-year-input]').attributes('aria-invalid')).toBe('true')
    })

    it('hides the hint when an error message is shown', () => {
      const wrapper = createWrapper({ hint: 'ヒント', errorMessage: 'エラー' })
      expect(wrapper.find('.dads-date-picker__hint').exists()).toBe(false)
      expect(wrapper.find('.dads-date-picker__error-text').exists()).toBe(true)
    })

    it('renders the required marker and sets aria-required', () => {
      const wrapper = createWrapper({ label: '生年月日', required: true })
      expect(wrapper.find('.dads-date-picker__required').exists()).toBe(true)
      expect(wrapper.find('input[data-js-year-input]').attributes('aria-required')).toBe('true')
    })

    it('applies the disabled state to inputs and button', () => {
      const wrapper = createWrapper({ disabled: true })
      expect(wrapper.classes()).toContain('dads-date-picker--disabled')
      expect(wrapper.find('input[data-js-year-input]').attributes('disabled')).toBeDefined()
      expect(wrapper.find('button[data-js-calendar-button]').attributes('disabled')).toBeDefined()
      expect(wrapper.find('.dads-date-picker__inputs').attributes('data-disabled')).toBe('true')
    })

    it('applies the readonly state to inputs and the wrapper', () => {
      const wrapper = createWrapper({ readonly: true })
      expect(wrapper.classes()).toContain('dads-date-picker--readonly')
      expect(wrapper.find('input[data-js-year-input]').attributes('readonly')).toBeDefined()
      expect(wrapper.find('.dads-date-picker__inputs').attributes('data-readonly')).toBe('true')
    })

    it('honors the explicit `error` prop without a message', () => {
      const wrapper = createWrapper({ error: true })
      expect(wrapper.classes()).toContain('dads-date-picker--error')
      expect(wrapper.find('input[data-js-year-input]').attributes('aria-invalid')).toBe('true')
      expect(wrapper.find('.dads-date-picker__inputs').attributes('data-error')).toBe('true')
    })

    it('uses an explicit id when provided', () => {
      const wrapper = createWrapper({ id: 'my-dob', label: 'DOB' })
      expect(wrapper.find('input[data-js-year-input]').attributes('id')).toBe('my-dob-year')
      expect(wrapper.find('label.dads-date-picker__label-text').attributes('for')).toBe(
        'my-dob-year',
      )
    })

    it('forwards the placeholder to the year input', () => {
      const wrapper = createWrapper({ placeholder: 'YYYY' })
      expect(wrapper.find('input[data-js-year-input]').attributes('placeholder')).toBe('YYYY')
    })
  })

  // ----------------------------------------------------------------------
  // events / v-model
  // ----------------------------------------------------------------------
  describe('events', () => {
    it('emits update:modelValue when all three fields form a valid date', async () => {
      const wrapper = createWrapper({ modelValue: '' })
      await wrapper.find('input[data-js-year-input]').setValue('2026')
      await wrapper.find('input[data-js-month-input]').setValue('05')
      await wrapper.find('input[data-js-day-input]').setValue('14')
      const events = wrapper.emitted('update:modelValue')
      // The last emission represents the fully-formed date.
      expect(events?.[events.length - 1]?.[0]).toBe('2026-05-14')
    })

    it('emits an empty string when one field is cleared', async () => {
      const wrapper = createWrapper({ modelValue: '2026-05-14' })
      await wrapper.find('input[data-js-month-input]').setValue('')
      const events = wrapper.emitted('update:modelValue')
      expect(events?.[events.length - 1]?.[0]).toBe('')
    })

    it('rejects impossible dates (e.g. Feb 30) — never emits the bogus date', async () => {
      const wrapper = createWrapper({ modelValue: '' })
      await wrapper.find('input[data-js-year-input]').setValue('2025')
      await wrapper.find('input[data-js-month-input]').setValue('02')
      await wrapper.find('input[data-js-day-input]').setValue('30')
      const events = wrapper.emitted('update:modelValue') ?? []
      // We must never have emitted "2025-02-30" — composeIso round-trips
      // through Date() and rejects impossible calendar combinations.
      for (const e of events) {
        expect(e[0]).not.toBe('2025-02-30')
      }
    })

    it('emits change in parallel with update:modelValue', async () => {
      const wrapper = createWrapper({ modelValue: '' })
      await wrapper.find('input[data-js-year-input]').setValue('2026')
      await wrapper.find('input[data-js-month-input]').setValue('05')
      await wrapper.find('input[data-js-day-input]').setValue('14')
      expect(wrapper.emitted('change')?.[wrapper.emitted('change')!.length - 1]?.[0]).toBe(
        '2026-05-14',
      )
    })

    it('emits focus and blur on year input', async () => {
      const wrapper = createWrapper()
      await wrapper.find('input[data-js-year-input]').trigger('focus')
      await wrapper.find('input[data-js-year-input]').trigger('blur')
      expect(wrapper.emitted('focus')).toHaveLength(1)
      expect(wrapper.emitted('blur')).toHaveLength(1)
    })
  })

  // ----------------------------------------------------------------------
  // calendar popover
  // ----------------------------------------------------------------------
  describe('calendar popover', () => {
    it('opens when the calendar button is clicked', async () => {
      const wrapper = createWrapper()
      await wrapper.find('button[data-js-calendar-button]').trigger('click')
      expect(wrapper.find('button[data-js-calendar-button]').attributes('aria-expanded')).toBe(
        'true',
      )
      const popover = wrapper.find('.dads-date-picker__calendar-popover')
      // attachTo body means style display has been cleared (visible).
      expect(popover.attributes('style') ?? '').not.toContain('display: none')
    })

    it('toggles closed on a second click', async () => {
      const wrapper = createWrapper()
      const btn = wrapper.find('button[data-js-calendar-button]')
      await btn.trigger('click')
      await btn.trigger('click')
      expect(btn.attributes('aria-expanded')).toBe('false')
    })

    it('closes on Escape from inside the popover', async () => {
      const wrapper = createWrapper()
      await wrapper.find('button[data-js-calendar-button]').trigger('click')
      await wrapper
        .find('.dads-date-picker__calendar-popover')
        .trigger('keydown', { key: 'Escape' })
      expect(wrapper.find('button[data-js-calendar-button]').attributes('aria-expanded')).toBe(
        'false',
      )
    })

    it('closes on outside pointerdown', async () => {
      const wrapper = createWrapper()
      await wrapper.find('button[data-js-calendar-button]').trigger('click')
      const outside = document.createElement('div')
      document.body.appendChild(outside)
      outside.dispatchEvent(new MouseEvent('pointerdown', { bubbles: true }))
      await nextTick()
      expect(wrapper.find('button[data-js-calendar-button]').attributes('aria-expanded')).toBe(
        'false',
      )
      outside.remove()
    })

    it('does not open when disabled', async () => {
      const wrapper = createWrapper({ disabled: true })
      await wrapper.find('button[data-js-calendar-button]').trigger('click')
      expect(wrapper.find('button[data-js-calendar-button]').attributes('aria-expanded')).toBe(
        'false',
      )
    })

    it('emits update:modelValue with the selected ISO date', async () => {
      const wrapper = createWrapper({ modelValue: '' })
      await wrapper.find('button[data-js-calendar-button]').trigger('click')
      // The grid is built around 2026-05 (today). Pick the first enabled day —
      // which is May 1 — to confirm we map cell -> ISO correctly.
      const buttons = wrapper
        .findAll('button.dads-date-picker__date')
        .filter((b) => !b.attributes('disabled'))
      // Click "1" (May 1, 2026).
      const dayOne = buttons.find((b) => b.text() === '1')
      await dayOne!.trigger('click')
      expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toBe('2026-05-01')
    })

    it('closes the popover after selecting a date', async () => {
      const wrapper = createWrapper({ modelValue: '' })
      await wrapper.find('button[data-js-calendar-button]').trigger('click')
      const dayOne = wrapper.findAll('button.dads-date-picker__date').find((b) => b.text() === '1')
      await dayOne!.trigger('click')
      expect(wrapper.find('button[data-js-calendar-button]').attributes('aria-expanded')).toBe(
        'false',
      )
    })

    it('highlights today in the calendar grid', async () => {
      const wrapper = createWrapper()
      await wrapper.find('button[data-js-calendar-button]').trigger('click')
      const todayBtn = wrapper
        .findAll('button.dads-date-picker__date')
        .find((b) => b.attributes('data-today') === 'true')
      expect(todayBtn).toBeDefined()
      expect(todayBtn!.text()).toBe('14')
    })

    it('marks the bound date with data-selected', async () => {
      const wrapper = createWrapper({ modelValue: '2026-05-20' })
      await wrapper.find('button[data-js-calendar-button]').trigger('click')
      const selected = wrapper
        .findAll('button.dads-date-picker__date')
        .find((b) => b.attributes('data-selected') === 'true')
      expect(selected).toBeDefined()
      expect(selected!.text()).toBe('20')
    })
  })

  // ----------------------------------------------------------------------
  // min / max
  // ----------------------------------------------------------------------
  describe('min / max', () => {
    it('disables dates before `min`', async () => {
      const wrapper = createWrapper({ min: '2026-05-10' })
      await wrapper.find('button[data-js-calendar-button]').trigger('click')
      const five = wrapper.findAll('button.dads-date-picker__date').find((b) => b.text() === '5')
      // May 5 is before May 10 — must be disabled.
      expect(five?.attributes('disabled')).toBeDefined()
    })

    it('disables dates after `max`', async () => {
      const wrapper = createWrapper({ max: '2026-05-20' })
      await wrapper.find('button[data-js-calendar-button]').trigger('click')
      const twentyFive = wrapper
        .findAll('button.dads-date-picker__date')
        .find((b) => b.text() === '25')
      expect(twentyFive?.attributes('disabled')).toBeDefined()
    })

    it('does not emit when a disabled date is clicked', async () => {
      const wrapper = createWrapper({ modelValue: '', min: '2026-05-10' })
      await wrapper.find('button[data-js-calendar-button]').trigger('click')
      const five = wrapper.findAll('button.dads-date-picker__date').find((b) => b.text() === '5')
      await five!.trigger('click')
      expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    })
  })

  // ----------------------------------------------------------------------
  // keyboard
  // ----------------------------------------------------------------------
  describe('keyboard', () => {
    it('Escape from the popover restores focus to the calendar button', async () => {
      const wrapper = createWrapper()
      const btn = wrapper.find('button[data-js-calendar-button]')
      await btn.trigger('click')
      await wrapper
        .find('.dads-date-picker__calendar-popover')
        .trigger('keydown', { key: 'Escape' })
      expect(document.activeElement).toBe(btn.element)
    })

    it('strips non-digit characters from numeric inputs', async () => {
      const wrapper = createWrapper()
      const year = wrapper.find('input[data-js-year-input]')
      await year.setValue('20ab26')
      // Only digits remain; "2026" survives because we slice to 4 chars.
      expect((year.element as HTMLInputElement).value).toBe('2026')
    })

    it('navigates to the previous month when ◀ is clicked', async () => {
      const wrapper = createWrapper()
      await wrapper.find('button[data-js-calendar-button]').trigger('click')
      // Month label before navigation = May.
      const before = wrapper.find('.dads-date-picker__current-month').text()
      const prev = wrapper.findAll('.dads-date-picker__nav-button')[0]
      await prev.trigger('click')
      const after = wrapper.find('.dads-date-picker__current-month').text()
      expect(after).not.toBe(before)
    })
  })

  // ----------------------------------------------------------------------
  // a11y — axe-core via vitest-axe. axe schedules its work via setTimeout,
  // so we restore real timers here (the suite-level `useFakeTimers` would
  // otherwise stall axe forever).
  // ----------------------------------------------------------------------
  describe('a11y (vitest-axe)', () => {
    beforeEach(() => {
      vi.useRealTimers()
    })

    it('has no violations with a visible label', async () => {
      const wrapper = createWrapper({ label: '生年月日' })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations with hint + required', async () => {
      const wrapper = createWrapper({
        label: '受付日',
        hint: '西暦で入力',
        required: true,
      })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations in error state', async () => {
      const wrapper = createWrapper({
        label: '生年月日',
        errorMessage: '日付を入力してください',
      })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations when disabled', async () => {
      const wrapper = createWrapper({ label: '生年月日', disabled: true })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })
  })
})
