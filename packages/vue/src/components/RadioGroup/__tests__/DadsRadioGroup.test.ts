import { afterEach, describe, expect, it } from 'vitest'
import { enableAutoUnmount, mount } from '@vue/test-utils'
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
      expect(wrapper.find('.dads-radio-group__required').exists()).toBe(true)
    })

    it('does not render required marker when required is false', () => {
      const wrapper = createWrapper({ legend: '質問' })
      expect(wrapper.find('.dads-radio-group__required').exists()).toBe(false)
    })
  })

  describe('disabled', () => {
    it('sets the disabled attribute on the fieldset', () => {
      const wrapper = createWrapper({ disabled: true })
      expect(wrapper.attributes('disabled')).toBeDefined()
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
    it('renders the error message with role="alert"', () => {
      const wrapper = createWrapper({ errorMessage: '必須項目です' })
      const error = wrapper.find('.dads-radio-group__error')
      expect(error.exists()).toBe(true)
      expect(error.text()).toBe('必須項目です')
      expect(error.attributes('role')).toBe('alert')
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

    it('hides the hint when an error message is shown', () => {
      const wrapper = createWrapper({
        hint: 'ヒント',
        errorMessage: 'エラー',
      })
      expect(wrapper.find('.dads-radio-group__hint').exists()).toBe(false)
      expect(wrapper.find('.dads-radio-group__error').exists()).toBe(true)
    })
  })

  describe('hint', () => {
    it('renders the hint when provided', () => {
      const wrapper = createWrapper({ hint: 'いずれか選んでください' })
      const hint = wrapper.find('.dads-radio-group__hint')
      expect(hint.exists()).toBe(true)
      expect(hint.text()).toBe('いずれか選んでください')
    })

    it('points aria-describedby at the hint id', () => {
      const wrapper = createWrapper({ hint: 'ヒント' })
      const hintId = wrapper.find('.dads-radio-group__hint').attributes('id')
      expect(wrapper.attributes('aria-describedby')).toBe(hintId)
    })

    it('points aria-describedby at the error id when in error state', () => {
      const wrapper = createWrapper({
        hint: 'ヒント',
        errorMessage: 'エラー',
      })
      const errorId = wrapper.find('.dads-radio-group__error').attributes('id')
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
      const hints = wrapper.findAll('.dads-radio__hint')
      expect(hints).toHaveLength(1)
      expect(hints[0].text()).toBe('A の説明')
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
