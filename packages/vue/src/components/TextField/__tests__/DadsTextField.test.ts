import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import DadsTextField from '../DadsTextField.vue'
import type { DadsTextFieldProps } from '../DadsTextField.types'

const createWrapper = (props: DadsTextFieldProps = {}) => mount(DadsTextField, { props })

describe('DadsTextField', () => {
  describe('rendering', () => {
    it('renders a single input element by default', () => {
      const wrapper = createWrapper()
      expect(wrapper.find('input').exists()).toBe(true)
    })

    it('renders the label when provided', () => {
      const wrapper = createWrapper({ label: '名前' })
      const label = wrapper.find('label.dads-text-field__label')
      expect(label.exists()).toBe(true)
      expect(label.text()).toContain('名前')
    })

    it('does not render the footer when there is no hint, error or counter', () => {
      const wrapper = createWrapper()
      expect(wrapper.find('.dads-text-field__footer').exists()).toBe(false)
    })
  })

  describe('size', () => {
    it.each(['lg', 'md', 'sm'] as const)('applies dads-text-field--%s class', (size) => {
      const wrapper = createWrapper({ size })
      expect(wrapper.classes()).toContain(`dads-text-field--${size}`)
    })
  })

  describe('type', () => {
    it.each(['text', 'email', 'password', 'tel', 'url', 'number', 'search'] as const)(
      'sets the native type attribute to %s',
      (type) => {
        const wrapper = createWrapper({ type })
        expect(wrapper.find('input').attributes('type')).toBe(type)
      },
    )
  })

  describe('v-model', () => {
    it('emits update:modelValue with the string value on input', async () => {
      const wrapper = createWrapper({ modelValue: '' })
      await wrapper.find('input').setValue('hello')
      const events = wrapper.emitted('update:modelValue')
      expect(events).toHaveLength(1)
      expect(events?.[0]?.[0]).toBe('hello')
    })

    it('emits a number when type=number', async () => {
      const wrapper = createWrapper({ modelValue: 0, type: 'number' })
      await wrapper.find('input').setValue('42')
      const events = wrapper.emitted('update:modelValue')
      expect(events?.[0]?.[0]).toBe(42)
    })

    it('falls back to an empty string when type=number receives NaN', async () => {
      const wrapper = createWrapper({ modelValue: 0, type: 'number' })
      // valueAsNumber returns NaN when the input string can't be parsed.
      const input = wrapper.find('input').element as HTMLInputElement
      Object.defineProperty(input, 'valueAsNumber', { value: NaN, configurable: true })
      await wrapper.find('input').trigger('input')
      const events = wrapper.emitted('update:modelValue')
      expect(events?.[0]?.[0]).toBe('')
    })
  })

  describe('label and id wiring', () => {
    it('uses the explicit id when provided', () => {
      const wrapper = createWrapper({ label: 'Name', id: 'my-field' })
      expect(wrapper.find('input').attributes('id')).toBe('my-field')
      expect(wrapper.find('label').attributes('for')).toBe('my-field')
    })

    it('auto-generates a unique id and links the label', () => {
      // Mount two instances inside the same app so the shared useId() counter
      // increments — separate mount() calls create separate apps and reset the
      // counter, which is unrealistic for production usage.
      const wrapper = mount({
        components: { DadsTextField },
        template: `
          <div>
            <DadsTextField label="A" />
            <DadsTextField label="B" />
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
    it('renders a required marker', () => {
      const wrapper = createWrapper({ label: 'Name', required: true })
      expect(wrapper.find('.dads-text-field__required').exists()).toBe(true)
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
      expect(wrapper.classes()).toContain('dads-text-field--disabled')
    })
  })

  describe('readonly', () => {
    it('sets the readonly attribute on the input', () => {
      const wrapper = createWrapper({ readonly: true })
      expect(wrapper.find('input').attributes('readonly')).toBeDefined()
    })

    it('applies the readonly modifier class', () => {
      const wrapper = createWrapper({ readonly: true })
      expect(wrapper.classes()).toContain('dads-text-field--readonly')
    })
  })

  describe('error / errorMessage', () => {
    it('renders the error message with role="alert"', () => {
      const wrapper = createWrapper({ errorMessage: '必須項目です' })
      const error = wrapper.find('.dads-text-field__error')
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
      expect(wrapper.classes()).toContain('dads-text-field--error')
      expect(wrapper.find('input').attributes('aria-invalid')).toBe('true')
    })

    it('hides the hint when an error message is shown', () => {
      const wrapper = createWrapper({ hint: 'ヒント', errorMessage: 'エラー' })
      expect(wrapper.find('.dads-text-field__hint').exists()).toBe(false)
      expect(wrapper.find('.dads-text-field__error').exists()).toBe(true)
    })
  })

  describe('hint', () => {
    it('renders the hint when provided', () => {
      const wrapper = createWrapper({ hint: 'メモ' })
      const hint = wrapper.find('.dads-text-field__hint')
      expect(hint.exists()).toBe(true)
      expect(hint.text()).toBe('メモ')
    })

    it('points aria-describedby at the hint id', () => {
      const wrapper = createWrapper({ hint: 'メモ' })
      const hintId = wrapper.find('.dads-text-field__hint').attributes('id')
      expect(wrapper.find('input').attributes('aria-describedby')).toBe(hintId)
    })
  })

  describe('icons', () => {
    it('renders the prepend icon', () => {
      const wrapper = createWrapper({ prependIcon: 'mdi-tag' })
      const icon = wrapper.find('.dads-text-field__icon--prepend')
      expect(icon.exists()).toBe(true)
      expect(icon.classes()).toContain('mdi-tag')
    })

    it('renders the append icon', () => {
      const wrapper = createWrapper({ appendIcon: 'mdi-magnify' })
      const icon = wrapper.find('.dads-text-field__icon--append')
      expect(icon.exists()).toBe(true)
      expect(icon.classes()).toContain('mdi-magnify')
    })

    it('marks decorative icons as aria-hidden', () => {
      const wrapper = createWrapper({ prependIcon: 'mdi-tag' })
      expect(wrapper.find('.dads-text-field__icon--prepend').attributes('aria-hidden')).toBe('true')
    })
  })

  describe('counter', () => {
    it('renders the current length / max counter', () => {
      const wrapper = createWrapper({ counter: 50, modelValue: 'abc' })
      const counter = wrapper.find('.dads-text-field__counter')
      expect(counter.exists()).toBe(true)
      expect(counter.text().replace(/\s+/g, '')).toBe('3/50')
    })

    it('updates as modelValue changes', async () => {
      const wrapper = createWrapper({ counter: 10, modelValue: '' })
      await wrapper.setProps({ modelValue: 'hello' })
      expect(wrapper.find('.dads-text-field__counter').text().replace(/\s+/g, '')).toBe('5/10')
    })

    it('includes the counter id in aria-describedby', () => {
      const wrapper = createWrapper({ counter: 10 })
      const counterId = wrapper.find('.dads-text-field__counter').attributes('id')
      expect(wrapper.find('input').attributes('aria-describedby')).toContain(counterId)
    })
  })

  describe('events', () => {
    it('emits change with the original event', async () => {
      const wrapper = createWrapper()
      await wrapper.find('input').trigger('change')
      expect(wrapper.emitted('change')).toHaveLength(1)
    })

    it('emits focus and blur', async () => {
      const wrapper = createWrapper()
      await wrapper.find('input').trigger('focus')
      await wrapper.find('input').trigger('blur')
      expect(wrapper.emitted('focus')).toHaveLength(1)
      expect(wrapper.emitted('blur')).toHaveLength(1)
    })
  })

  describe('forwarded attributes', () => {
    it('forwards placeholder, name, autocomplete, maxlength, inputmode', () => {
      const wrapper = createWrapper({
        placeholder: 'ph',
        name: 'fname',
        autocomplete: 'off',
        maxlength: 20,
        inputmode: 'numeric',
      })
      const input = wrapper.find('input')
      expect(input.attributes('placeholder')).toBe('ph')
      expect(input.attributes('name')).toBe('fname')
      expect(input.attributes('autocomplete')).toBe('off')
      expect(input.attributes('maxlength')).toBe('20')
      expect(input.attributes('inputmode')).toBe('numeric')
    })
  })
})
