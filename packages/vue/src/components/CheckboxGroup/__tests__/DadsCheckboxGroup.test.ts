import { afterEach, describe, expect, it } from 'vitest'
import { enableAutoUnmount, mount } from '@vue/test-utils'
import DadsCheckboxGroup from '../DadsCheckboxGroup.vue'
import DadsCheckbox from '../../Checkbox/DadsCheckbox.vue'
import type { DadsCheckboxGroupItem, DadsCheckboxGroupProps } from '../DadsCheckboxGroup.types'

enableAutoUnmount(afterEach)

const defaultItems: DadsCheckboxGroupItem[] = [
  { value: 'apple', label: 'りんご' },
  { value: 'orange', label: 'オレンジ' },
  { value: 'banana', label: 'バナナ' },
]

const createWrapper = (props: Partial<DadsCheckboxGroupProps> = {}) =>
  mount(DadsCheckboxGroup, {
    props: {
      items: defaultItems,
      ...props,
    } as DadsCheckboxGroupProps,
    attachTo: document.body,
  })

describe('DadsCheckboxGroup', () => {
  describe('rendering', () => {
    it('renders a <fieldset> root element', () => {
      const wrapper = createWrapper()
      expect(wrapper.element.tagName).toBe('FIELDSET')
      expect(wrapper.classes()).toContain('dads-checkbox-group')
    })

    it('renders one DadsCheckbox per item', () => {
      const wrapper = createWrapper()
      expect(wrapper.findAllComponents(DadsCheckbox)).toHaveLength(3)
    })

    it('renders the items wrapper', () => {
      const wrapper = createWrapper()
      expect(wrapper.find('.dads-checkbox-group__items').exists()).toBe(true)
    })

    it('does not render footer without hint or error', () => {
      const wrapper = createWrapper()
      expect(wrapper.find('.dads-checkbox-group__footer').exists()).toBe(false)
    })
  })

  describe('legend', () => {
    it('renders the legend when provided', () => {
      const wrapper = createWrapper({ legend: '好きな果物' })
      const legend = wrapper.find('legend')
      expect(legend.exists()).toBe(true)
      expect(legend.text()).toContain('好きな果物')
    })

    it('does not render <legend> when prop is omitted', () => {
      const wrapper = createWrapper()
      expect(wrapper.find('legend').exists()).toBe(false)
    })
  })

  describe('direction', () => {
    it('applies vertical class by default', () => {
      const wrapper = createWrapper()
      expect(wrapper.classes()).toContain('dads-checkbox-group--vertical')
    })

    it('applies horizontal class when direction="horizontal"', () => {
      const wrapper = createWrapper({ direction: 'horizontal' })
      expect(wrapper.classes()).toContain('dads-checkbox-group--horizontal')
      expect(wrapper.classes()).not.toContain('dads-checkbox-group--vertical')
    })
  })

  describe('v-model', () => {
    it('marks checkboxes whose value is in modelValue as checked', () => {
      const wrapper = createWrapper({ modelValue: ['apple', 'banana'] })
      const checkboxes = wrapper.findAllComponents(DadsCheckbox)
      expect(checkboxes[0].props('modelValue')).toBe(true)
      expect(checkboxes[1].props('modelValue')).toBe(false)
      expect(checkboxes[2].props('modelValue')).toBe(true)
    })

    it('emits update:modelValue with value added when a checkbox is toggled on', async () => {
      const wrapper = createWrapper({ modelValue: ['apple'] })
      const input = wrapper.findAllComponents(DadsCheckbox)[1].find('input')
      ;(input.element as HTMLInputElement).checked = true
      await input.trigger('change')
      const events = wrapper.emitted('update:modelValue')
      expect(events).toHaveLength(1)
      expect(events?.[0]?.[0]).toEqual(['apple', 'orange'])
    })

    it('emits update:modelValue with value removed when toggled off', async () => {
      const wrapper = createWrapper({ modelValue: ['apple', 'orange'] })
      const input = wrapper.findAllComponents(DadsCheckbox)[0].find('input')
      ;(input.element as HTMLInputElement).checked = false
      await input.trigger('change')
      const events = wrapper.emitted('update:modelValue')
      expect(events?.[0]?.[0]).toEqual(['orange'])
    })

    it('treats undefined modelValue as empty array', async () => {
      const wrapper = createWrapper()
      const input = wrapper.findAllComponents(DadsCheckbox)[0].find('input')
      ;(input.element as HTMLInputElement).checked = true
      await input.trigger('change')
      const events = wrapper.emitted('update:modelValue')
      expect(events?.[0]?.[0]).toEqual(['apple'])
    })
  })

  describe('duplicate prevention', () => {
    it('does not add a value that is already in modelValue', async () => {
      const wrapper = createWrapper({ modelValue: ['apple'] })
      // Simulate a redundant "checked" event on an already checked item.
      const checkbox = wrapper.findAllComponents(DadsCheckbox)[0]
      checkbox.vm.$emit('update:modelValue', true)
      const events = wrapper.emitted('update:modelValue')
      expect(events?.[0]?.[0]).toEqual(['apple'])
    })
  })

  describe('required', () => {
    it('renders the required marker inside the legend', () => {
      const wrapper = createWrapper({ legend: '果物', required: true })
      expect(wrapper.find('.dads-checkbox-group__required').exists()).toBe(true)
    })

    it('does not render the required marker when required is false', () => {
      const wrapper = createWrapper({ legend: '果物', required: false })
      expect(wrapper.find('.dads-checkbox-group__required').exists()).toBe(false)
    })
  })

  describe('disabled', () => {
    it('sets the disabled attribute on the fieldset', () => {
      const wrapper = createWrapper({ disabled: true })
      expect(wrapper.attributes('disabled')).toBeDefined()
    })

    it('forwards disabled to every child checkbox', () => {
      const wrapper = createWrapper({ disabled: true })
      for (const cb of wrapper.findAllComponents(DadsCheckbox)) {
        expect(cb.props('disabled')).toBe(true)
      }
    })

    it('honors per-item disabled even when group is enabled', () => {
      const items: DadsCheckboxGroupItem[] = [
        { value: 'a', label: 'A', disabled: true },
        { value: 'b', label: 'B' },
      ]
      const wrapper = createWrapper({ items })
      const checkboxes = wrapper.findAllComponents(DadsCheckbox)
      expect(checkboxes[0].props('disabled')).toBe(true)
      expect(checkboxes[1].props('disabled')).toBe(false)
    })
  })

  describe('size propagation', () => {
    it.each(['lg', 'md', 'sm'] as const)('forwards size="%s" to every child checkbox', (size) => {
      const wrapper = createWrapper({ size })
      for (const cb of wrapper.findAllComponents(DadsCheckbox)) {
        expect(cb.props('size')).toBe(size)
      }
    })
  })

  describe('error / errorMessage', () => {
    it('renders the error message with role="alert"', () => {
      const wrapper = createWrapper({ errorMessage: '少なくとも 1 つ選択してください' })
      const error = wrapper.find('.dads-checkbox-group__error')
      expect(error.exists()).toBe(true)
      expect(error.text()).toBe('少なくとも 1 つ選択してください')
      expect(error.attributes('role')).toBe('alert')
    })

    it('sets aria-invalid on the fieldset when errorMessage is present', () => {
      const wrapper = createWrapper({ errorMessage: 'bad' })
      expect(wrapper.attributes('aria-invalid')).toBe('true')
    })

    it('honors the explicit error prop without a message', () => {
      const wrapper = createWrapper({ error: true })
      expect(wrapper.classes()).toContain('dads-checkbox-group--error')
      expect(wrapper.attributes('aria-invalid')).toBe('true')
    })

    it('propagates error state to every child checkbox', () => {
      const wrapper = createWrapper({ errorMessage: 'bad' })
      for (const cb of wrapper.findAllComponents(DadsCheckbox)) {
        expect(cb.props('error')).toBe(true)
      }
    })

    it('hides the hint when an error message is shown', () => {
      const wrapper = createWrapper({ hint: 'ヒント', errorMessage: 'エラー' })
      expect(wrapper.find('.dads-checkbox-group__hint').exists()).toBe(false)
      expect(wrapper.find('.dads-checkbox-group__error').exists()).toBe(true)
    })
  })

  describe('hint', () => {
    it('renders the hint when provided', () => {
      const wrapper = createWrapper({ hint: '複数選択可' })
      const hint = wrapper.find('.dads-checkbox-group__hint')
      expect(hint.exists()).toBe(true)
      expect(hint.text()).toBe('複数選択可')
    })

    it('points aria-describedby at the hint id', () => {
      const wrapper = createWrapper({ hint: '複数選択可' })
      const hintId = wrapper.find('.dads-checkbox-group__hint').attributes('id')
      expect(wrapper.attributes('aria-describedby')).toBe(hintId)
    })
  })

  describe('id wiring', () => {
    it('uses the explicit id when provided', () => {
      const wrapper = createWrapper({ id: 'my-group' })
      expect(wrapper.attributes('id')).toBe('my-group')
    })

    it('auto-generates a unique id per instance', () => {
      const wrapper = mount({
        components: { DadsCheckboxGroup },
        template: `
          <div>
            <DadsCheckboxGroup :items="items" />
            <DadsCheckboxGroup :items="items" />
          </div>
        `,
        data: () => ({ items: defaultItems }),
      })
      const fieldsets = wrapper.findAll('fieldset')
      const idA = fieldsets[0].attributes('id')
      const idB = fieldsets[1].attributes('id')
      expect(idA).toBeTruthy()
      expect(idB).toBeTruthy()
      expect(idA).not.toBe(idB)
    })
  })

  describe('change emit', () => {
    it('emits change alongside update:modelValue', async () => {
      const wrapper = createWrapper({ modelValue: [] })
      const input = wrapper.findAllComponents(DadsCheckbox)[0].find('input')
      ;(input.element as HTMLInputElement).checked = true
      await input.trigger('change')
      const change = wrapper.emitted('change')
      expect(change).toHaveLength(1)
      expect(change?.[0]?.[0]).toEqual(['apple'])
    })
  })

  describe('forwarded attributes', () => {
    it('forwards the shared name to every child input', () => {
      const wrapper = createWrapper({ name: 'fruits' })
      for (const cb of wrapper.findAllComponents(DadsCheckbox)) {
        expect(cb.props('name')).toBe('fruits')
      }
    })
  })

  describe('item hint', () => {
    it('passes per-item hint down to the matching child checkbox', () => {
      const items: DadsCheckboxGroupItem[] = [
        { value: 'a', label: 'A', hint: 'A の説明' },
        { value: 'b', label: 'B' },
      ]
      const wrapper = createWrapper({ items })
      const checkboxes = wrapper.findAllComponents(DadsCheckbox)
      expect(checkboxes[0].props('hint')).toBe('A の説明')
      expect(checkboxes[1].props('hint')).toBeUndefined()
    })
  })
})
