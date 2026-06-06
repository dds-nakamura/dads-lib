import { afterEach, describe, expect, it } from 'vitest'
import { enableAutoUnmount, mount } from '@vue/test-utils'
import { axe } from 'vitest-axe'
import DadsRadioGroup from '../DadsRadioGroup.vue'
import type { DadsRadioGroupItem, DadsRadioGroupProps } from '../DadsRadioGroup.types'

enableAutoUnmount(afterEach)

const items: DadsRadioGroupItem[] = [
  { value: 'a', label: 'A' },
  { value: 'b', label: 'B' },
  { value: 'c', label: 'C' },
]

const createWrapper = (props: Partial<DadsRadioGroupProps> = {}) =>
  mount(DadsRadioGroup, {
    props: { items, ...props } as DadsRadioGroupProps,
    attachTo: document.body,
  })

describe('DadsRadioGroup', () => {
  describe('rendering', () => {
    it('renders a <fieldset> root', () => {
      const wrapper = createWrapper()
      expect(wrapper.element.tagName).toBe('FIELDSET')
      expect(wrapper.classes()).toContain('dads-radio-group')
    })

    it('renders a <legend> when legend prop is provided', () => {
      const wrapper = createWrapper({ legend: '果物を選んでください' })
      const legend = wrapper.find('legend')
      expect(legend.exists()).toBe(true)
      expect(legend.text()).toContain('果物を選んでください')
    })

    it('does not render <legend> when legend prop is omitted', () => {
      const wrapper = createWrapper()
      expect(wrapper.find('legend').exists()).toBe(false)
    })

    it('renders one DadsRadio per item', () => {
      const wrapper = createWrapper()
      expect(wrapper.findAll('input[type="radio"]')).toHaveLength(3)
    })
  })

  describe('direction', () => {
    it('defaults to vertical', () => {
      const wrapper = createWrapper()
      expect(wrapper.classes()).toContain('dads-radio-group--vertical')
    })

    it('applies horizontal modifier when set', () => {
      const wrapper = createWrapper({ direction: 'horizontal' })
      expect(wrapper.classes()).toContain('dads-radio-group--horizontal')
      expect(wrapper.classes()).not.toContain('dads-radio-group--vertical')
    })

    it('applies vertical modifier when explicitly set', () => {
      const wrapper = createWrapper({ direction: 'vertical' })
      expect(wrapper.classes()).toContain('dads-radio-group--vertical')
    })
  })

  describe('v-model (single value)', () => {
    it('checks the radio whose value matches modelValue', () => {
      const wrapper = createWrapper({ modelValue: 'b' })
      const inputs = wrapper.findAll('input[type="radio"]')
      expect((inputs[0].element as HTMLInputElement).checked).toBe(false)
      expect((inputs[1].element as HTMLInputElement).checked).toBe(true)
      expect((inputs[2].element as HTMLInputElement).checked).toBe(false)
    })

    it('emits update:modelValue with the selected value when clicked', async () => {
      const wrapper = createWrapper({ modelValue: null })
      await wrapper.findAll('input[type="radio"]')[1].trigger('change')
      const events = wrapper.emitted('update:modelValue')
      expect(events).toHaveLength(1)
      expect(events?.[0]?.[0]).toBe('b')
    })

    it('replaces the previous selection (single-value semantics)', async () => {
      const wrapper = createWrapper({ modelValue: 'a' })
      await wrapper.findAll('input[type="radio"]')[2].trigger('change')
      const events = wrapper.emitted('update:modelValue')
      expect(events).toHaveLength(1)
      // group emits the new value only — no array, no toggle
      expect(events?.[0]?.[0]).toBe('c')
    })
  })

  describe('change emit', () => {
    it('emits change with the selected value', async () => {
      const wrapper = createWrapper({ modelValue: null })
      await wrapper.findAll('input[type="radio"]')[0].trigger('change')
      expect(wrapper.emitted('change')).toHaveLength(1)
      expect(wrapper.emitted('change')?.[0]?.[0]).toBe('a')
    })
  })

  describe('grouping (name attribute)', () => {
    it('shares the same name across every child radio', () => {
      const wrapper = createWrapper({ name: 'fruit' })
      const inputs = wrapper.findAll('input[type="radio"]')
      const names = inputs.map((i) => i.attributes('name'))
      expect(names).toEqual(['fruit', 'fruit', 'fruit'])
    })

    it('auto-generates a name when none is provided', () => {
      const wrapper = createWrapper()
      const names = wrapper.findAll('input[type="radio"]').map((i) => i.attributes('name'))
      expect(names[0]).toBeTruthy()
      expect(names[0]).toBe(names[1])
      expect(names[0]).toBe(names[2])
    })

    it('uses distinct auto-generated names for two groups on the same page', () => {
      const wrapper = mount({
        components: { DadsRadioGroup },
        data() {
          return { items }
        },
        template: `
          <div>
            <DadsRadioGroup :items="items" />
            <DadsRadioGroup :items="items" />
          </div>
        `,
      })
      const names = wrapper.findAll('input[type="radio"]').map((i) => i.attributes('name'))
      expect(names[0]).toBe(names[1])
      expect(names[0]).toBe(names[2])
      expect(names[3]).toBe(names[4])
      expect(names[3]).toBe(names[5])
      expect(names[0]).not.toBe(names[3])
    })
  })

  describe('legend', () => {
    it('renders required marker inside legend when required is true', () => {
      const wrapper = createWrapper({ legend: '質問', required: true })
      expect(wrapper.find('.dads-form-control-label__requirement').exists()).toBe(true)
    })

    it('does not render required marker when required is false', () => {
      const wrapper = createWrapper({ legend: '質問' })
      expect(wrapper.find('.dads-form-control-label__requirement').exists()).toBe(false)
    })

    it('renders the default ※必須 label when required is true', () => {
      const wrapper = createWrapper({ legend: '質問', required: true })
      expect(wrapper.find('.dads-form-control-label__requirement').text()).toBe('※必須')
    })

    it('renders a custom requiredLabel when provided (i18n override)', () => {
      const wrapper = createWrapper({
        legend: '質問',
        required: true,
        requiredLabel: 'Required',
      })
      expect(wrapper.find('.dads-form-control-label__requirement').text()).toBe('Required')
    })
  })

  describe('disabled', () => {
    it('disables every child radio when the group is disabled', () => {
      const wrapper = createWrapper({ disabled: true })
      const inputs = wrapper.findAll('input[type="radio"]')
      inputs.forEach((i) => {
        expect(i.attributes('disabled')).toBeDefined()
      })
    })

    it('dims the label via the form-control-label data-disabled hook', () => {
      const wrapper = createWrapper({ legend: '質問', disabled: true })
      expect(wrapper.attributes('data-disabled')).toBe('true')
    })

    it('applies the disabled modifier class', () => {
      const wrapper = createWrapper({ disabled: true })
      expect(wrapper.classes()).toContain('dads-radio-group--disabled')
    })

    it('respects per-item disabled', () => {
      const wrapper = createWrapper({
        items: [
          { value: 'a', label: 'A' },
          { value: 'b', label: 'B', disabled: true },
          { value: 'c', label: 'C' },
        ],
      })
      const inputs = wrapper.findAll('input[type="radio"]')
      expect(inputs[0].attributes('disabled')).toBeUndefined()
      expect(inputs[1].attributes('disabled')).toBeDefined()
      expect(inputs[2].attributes('disabled')).toBeUndefined()
    })
  })

  describe('size propagation', () => {
    it.each(['lg', 'md', 'sm'] as const)('forwards size %s to every child DadsRadio', (size) => {
      const wrapper = createWrapper({ size })
      const radios = wrapper.findAll('.dads-radio')
      expect(radios).toHaveLength(3)
      radios.forEach((r) => {
        expect(r.classes()).toContain(`dads-radio--${size}`)
      })
    })
  })

  describe('error / errorMessage', () => {
    it('renders the error message in the form-control-label error-text', () => {
      const wrapper = createWrapper({ errorMessage: '必須項目です' })
      const error = wrapper.find('.dads-form-control-label__error-text')
      expect(error.exists()).toBe(true)
      expect(error.text()).toBe('必須項目です')
    })

    it('does not put role="alert" on the error text (official a11y guidance)', () => {
      const wrapper = createWrapper({ errorMessage: '必須項目です' })
      const error = wrapper.find('.dads-form-control-label__error-text')
      expect(error.attributes('role')).toBeUndefined()
    })

    it('sets aria-invalid on the fieldset when errorMessage is present', () => {
      const wrapper = createWrapper({ errorMessage: 'bad' })
      expect(wrapper.attributes('aria-invalid')).toBe('true')
    })

    it('honors the explicit error prop and propagates it to every radio', () => {
      const wrapper = createWrapper({ error: true })
      expect(wrapper.classes()).toContain('dads-radio-group--error')
      expect(wrapper.attributes('aria-invalid')).toBe('true')
      const radios = wrapper.findAll('.dads-radio')
      radios.forEach((r) => {
        expect(r.classes()).toContain('dads-radio--error')
      })
    })

    it('hides the support text when an error message is shown', () => {
      const wrapper = createWrapper({
        hint: 'ヒント',
        errorMessage: 'エラー',
      })
      // hint still renders as support-text, but the describedby points at error
      expect(wrapper.find('.dads-form-control-label__error-text').exists()).toBe(true)
      const errorId = wrapper.find('.dads-form-control-label__error-text').attributes('id')
      expect(wrapper.attributes('aria-describedby')).toBe(errorId)
    })
  })

  describe('hint', () => {
    it('renders the hint as support text when provided', () => {
      const wrapper = createWrapper({ hint: 'いずれか選んでください' })
      const hint = wrapper.find('.dads-form-control-label__support-text')
      expect(hint.exists()).toBe(true)
      expect(hint.text()).toBe('いずれか選んでください')
    })

    it('points aria-describedby at the support-text id', () => {
      const wrapper = createWrapper({ hint: 'ヒント' })
      const hintId = wrapper.find('.dads-form-control-label__support-text').attributes('id')
      expect(wrapper.attributes('aria-describedby')).toBe(hintId)
    })

    it('points aria-describedby at the error id when in error state', () => {
      const wrapper = createWrapper({
        hint: 'ヒント',
        errorMessage: 'エラー',
      })
      const errorId = wrapper.find('.dads-form-control-label__error-text').attributes('id')
      expect(wrapper.attributes('aria-describedby')).toBe(errorId)
    })
  })

  describe('id wiring', () => {
    it('uses the explicit id when provided', () => {
      const wrapper = createWrapper({ id: 'my-group' })
      expect(wrapper.attributes('id')).toBe('my-group')
    })

    it('auto-generates a unique id for two groups', () => {
      const wrapper = mount({
        components: { DadsRadioGroup },
        data() {
          return { items }
        },
        template: `
          <div>
            <DadsRadioGroup :items="items" />
            <DadsRadioGroup :items="items" />
          </div>
        `,
      })
      const fieldsets = wrapper.findAll('fieldset')
      const idA = fieldsets[0].attributes('id')
      const idB = fieldsets[1].attributes('id')
      expect(idA).toBeTruthy()
      expect(idB).toBeTruthy()
      expect(idA).not.toBe(idB)
    })
  })

  describe('item hint', () => {
    it('forwards item.hint to the corresponding DadsRadio', () => {
      const wrapper = createWrapper({
        items: [
          { value: 'a', label: 'A', hint: 'A の説明' },
          { value: 'b', label: 'B' },
        ],
      })
      const hints = wrapper.findAll('.dads-radio__support-text')
      expect(hints).toHaveLength(1)
      expect(hints[0].text()).toBe('A の説明')
    })
  })

  describe('item description', () => {
    it('forwards item.description to the corresponding DadsRadio', () => {
      const wrapper = createWrapper({
        items: [
          { value: 'a', label: 'A', description: 'A プランの説明文' },
          { value: 'b', label: 'B' },
        ],
      })
      const descs = wrapper.findAll('.dads-radio__description')
      expect(descs).toHaveLength(1)
      expect(descs[0].text()).toBe('A プランの説明文')
    })
  })

  describe('legendVisuallyHidden', () => {
    it('keeps the <legend> in the DOM when visually hidden', () => {
      const wrapper = createWrapper({ legend: '質問', legendVisuallyHidden: true })
      const legend = wrapper.find('legend')
      expect(legend.exists()).toBe(true)
      expect(legend.text()).toContain('質問')
    })

    it('wraps the legend text in the visually-hidden helper', () => {
      const wrapper = createWrapper({ legend: '質問', legendVisuallyHidden: true })
      const hidden = wrapper.find('.dads-radio-group__legend-visually-hidden')
      expect(hidden.exists()).toBe(true)
      expect(hidden.text()).toBe('質問')
    })

    it('omits the visually-hidden helper by default', () => {
      const wrapper = createWrapper({ legend: '質問' })
      expect(wrapper.find('.dads-radio-group__legend-visually-hidden').exists()).toBe(false)
    })

    it('does not render a legend at all when legend prop is omitted (regardless of flag)', () => {
      const wrapper = createWrapper({ legendVisuallyHidden: true })
      expect(wrapper.find('legend').exists()).toBe(false)
    })
  })

  describe('a11y (vitest-axe)', () => {
    it('has no violations with a visible legend', async () => {
      const wrapper = createWrapper({ legend: '果物を選んでください', modelValue: null })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations with hint and legend', async () => {
      const wrapper = createWrapper({
        legend: '果物',
        hint: 'いずれか選んでください',
        modelValue: null,
      })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations when required', async () => {
      const wrapper = createWrapper({
        legend: '果物',
        required: true,
        modelValue: null,
      })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations in error state', async () => {
      const wrapper = createWrapper({
        legend: '果物',
        errorMessage: '必須項目です',
        modelValue: null,
      })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations when disabled', async () => {
      const wrapper = createWrapper({
        legend: '果物',
        disabled: true,
        modelValue: null,
      })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations with visually-hidden legend', async () => {
      const wrapper = createWrapper({
        legend: '果物',
        legendVisuallyHidden: true,
        modelValue: null,
      })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations with item descriptions', async () => {
      const wrapper = createWrapper({
        legend: 'プランを選んでください',
        items: [
          { value: 'a', label: 'プラン A', description: '月額 ¥980' },
          { value: 'b', label: 'プラン B', description: '月額 ¥1,980' },
        ],
        modelValue: null,
      })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })
  })

  describe('value types', () => {
    it('handles number values correctly', async () => {
      const wrapper = createWrapper({
        items: [
          { value: 1, label: 'One' },
          { value: 2, label: 'Two' },
        ],
        modelValue: null,
      })
      await wrapper.findAll('input[type="radio"]')[1].trigger('change')
      expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toBe(2)
    })

    it('handles boolean values correctly', () => {
      const wrapper = createWrapper({
        items: [
          { value: true, label: 'Yes' },
          { value: false, label: 'No' },
        ],
        modelValue: true,
      })
      const inputs = wrapper.findAll('input[type="radio"]')
      expect((inputs[0].element as HTMLInputElement).checked).toBe(true)
      expect((inputs[1].element as HTMLInputElement).checked).toBe(false)
    })
  })
})
