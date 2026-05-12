import { afterEach, describe, expect, it } from 'vitest'
import { enableAutoUnmount, mount } from '@vue/test-utils'
import DadsRadio from '../DadsRadio.vue'
import type { DadsRadioProps } from '../DadsRadio.types'

enableAutoUnmount(afterEach)

const createWrapper = (props: Partial<DadsRadioProps> = {}) =>
  mount(DadsRadio, {
    props: { value: 'a', ...props } as DadsRadioProps,
    attachTo: document.body,
  })

describe('DadsRadio', () => {
  describe('rendering', () => {
    it('renders an input[type=radio] and an indicator', () => {
      const wrapper = createWrapper()
      expect(wrapper.find('input[type="radio"]').exists()).toBe(true)
      expect(wrapper.find('.dads-radio__indicator').exists()).toBe(true)
    })

    it('renders the label text when provided', () => {
      const wrapper = createWrapper({ label: 'はい' })
      expect(wrapper.find('.dads-radio__text').text()).toBe('はい')
    })

    it('does not render the footer when there is no hint or error', () => {
      const wrapper = createWrapper()
      expect(wrapper.find('.dads-radio__footer').exists()).toBe(false)
    })
  })

  describe('size', () => {
    it.each(['lg', 'md', 'sm'] as const)('applies dads-radio--%s class', (size) => {
      const wrapper = createWrapper({ size })
      expect(wrapper.classes()).toContain(`dads-radio--${size}`)
    })
  })

  describe('v-model', () => {
    it('emits update:modelValue with `value` on change', async () => {
      const wrapper = createWrapper({ value: 'apple', modelValue: null })
      await wrapper.find('input').trigger('change')
      const events = wrapper.emitted('update:modelValue')
      expect(events).toHaveLength(1)
      expect(events?.[0]?.[0]).toBe('apple')
    })

    it('reflects checked when modelValue === value', () => {
      const wrapper = createWrapper({ value: 'a', modelValue: 'a' })
      expect((wrapper.find('input').element as HTMLInputElement).checked).toBe(true)
      expect(wrapper.classes()).toContain('dads-radio--checked')
    })

    it('does not mark as checked when modelValue !== value', () => {
      const wrapper = createWrapper({ value: 'a', modelValue: 'b' })
      expect((wrapper.find('input').element as HTMLInputElement).checked).toBe(false)
      expect(wrapper.classes()).not.toContain('dads-radio--checked')
    })
  })

  describe('name attribute', () => {
    it('forwards the name prop to the input', () => {
      const wrapper = createWrapper({ name: 'fruit' })
      expect(wrapper.find('input').attributes('name')).toBe('fruit')
    })
  })

  describe('label and id wiring', () => {
    it('uses the explicit id when provided', () => {
      const wrapper = createWrapper({ label: 'A', id: 'my-radio' })
      expect(wrapper.find('input').attributes('id')).toBe('my-radio')
      expect(wrapper.find('label').attributes('for')).toBe('my-radio')
    })

    it('auto-generates a unique id and links the label', () => {
      const wrapper = mount({
        components: { DadsRadio },
        template: `
          <div>
            <DadsRadio value="a" label="A" />
            <DadsRadio value="b" label="B" />
          </div>
        `,
      })
      const inputs = wrapper.findAll('input')
      const labels = wrapper.findAll('label')
      const idA = inputs[0].attributes('id')
      const idB = inputs[1].attributes('id')
      expect(idA).toBeTruthy()
      expect(idB).toBeTruthy()
      expect(idA).not.toBe(idB)
      expect(labels[0].attributes('for')).toBe(idA)
      expect(labels[1].attributes('for')).toBe(idB)
    })
  })

  describe('required', () => {
    it('renders a required marker when required and label are set', () => {
      const wrapper = createWrapper({ label: 'A', required: true })
      expect(wrapper.find('.dads-radio__required').exists()).toBe(true)
    })

    it('sets aria-required on the input', () => {
      const wrapper = createWrapper({ required: true })
      expect(wrapper.find('input').attributes('aria-required')).toBe('true')
    })
  })

  describe('disabled', () => {
    it('sets the disabled attribute on the input', () => {
      const wrapper = createWrapper({ disabled: true })
      expect(wrapper.find('input').attributes('disabled')).toBeDefined()
    })

    it('applies the disabled modifier class', () => {
      const wrapper = createWrapper({ disabled: true })
      expect(wrapper.classes()).toContain('dads-radio--disabled')
    })
  })

  describe('error / errorMessage', () => {
    it('renders the error message with role="alert"', () => {
      const wrapper = createWrapper({ errorMessage: '必須項目です' })
      const error = wrapper.find('.dads-radio__error')
      expect(error.exists()).toBe(true)
      expect(error.text()).toBe('必須項目です')
      expect(error.attributes('role')).toBe('alert')
    })

    it('sets aria-invalid when errorMessage is present', () => {
      const wrapper = createWrapper({ errorMessage: 'bad' })
      expect(wrapper.find('input').attributes('aria-invalid')).toBe('true')
    })

    it('honors the explicit error prop', () => {
      const wrapper = createWrapper({ error: true })
      expect(wrapper.classes()).toContain('dads-radio--error')
      expect(wrapper.find('input').attributes('aria-invalid')).toBe('true')
    })

    it('hides the hint when an error message is shown', () => {
      const wrapper = createWrapper({ hint: 'ヒント', errorMessage: 'エラー' })
      expect(wrapper.find('.dads-radio__hint').exists()).toBe(false)
      expect(wrapper.find('.dads-radio__error').exists()).toBe(true)
    })
  })

  describe('hint', () => {
    it('renders the hint when provided', () => {
      const wrapper = createWrapper({ hint: 'いずれか選んでください' })
      const hint = wrapper.find('.dads-radio__hint')
      expect(hint.exists()).toBe(true)
      expect(hint.text()).toBe('いずれか選んでください')
    })

    it('points aria-describedby at the hint id', () => {
      const wrapper = createWrapper({ hint: 'ヒント' })
      const hintId = wrapper.find('.dads-radio__hint').attributes('id')
      expect(wrapper.find('input').attributes('aria-describedby')).toBe(hintId)
    })
  })

  describe('group behavior', () => {
    it('checks only the radio whose value matches modelValue across the same name', () => {
      const wrapper = mount({
        components: { DadsRadio },
        data() {
          return { selected: 'b' }
        },
        template: `
          <div>
            <DadsRadio v-model="selected" value="a" name="fruit" />
            <DadsRadio v-model="selected" value="b" name="fruit" />
            <DadsRadio v-model="selected" value="c" name="fruit" />
          </div>
        `,
      })
      const inputs = wrapper.findAll('input')
      expect((inputs[0].element as HTMLInputElement).checked).toBe(false)
      expect((inputs[1].element as HTMLInputElement).checked).toBe(true)
      expect((inputs[2].element as HTMLInputElement).checked).toBe(false)
    })
  })

  describe('events', () => {
    it('emits change with the original event', async () => {
      const wrapper = createWrapper()
      await wrapper.find('input').trigger('change')
      expect(wrapper.emitted('change')).toHaveLength(1)
    })

    it('emits focus', async () => {
      const wrapper = createWrapper()
      await wrapper.find('input').trigger('focus')
      expect(wrapper.emitted('focus')).toHaveLength(1)
    })

    it('emits blur', async () => {
      const wrapper = createWrapper()
      await wrapper.find('input').trigger('blur')
      expect(wrapper.emitted('blur')).toHaveLength(1)
    })
  })

  describe('value types', () => {
    it('emits the original number value when selected', async () => {
      const wrapper = createWrapper({ value: 42, modelValue: null })
      await wrapper.find('input').trigger('change')
      expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toBe(42)
    })

    it('emits the original boolean value when selected', async () => {
      const wrapper = createWrapper({ value: true, modelValue: null })
      await wrapper.find('input').trigger('change')
      expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toBe(true)
    })

    it('matches checked state by strict equality (number vs string)', () => {
      const wrapper = createWrapper({ value: 1, modelValue: '1' })
      expect((wrapper.find('input').element as HTMLInputElement).checked).toBe(false)
    })
  })
})
