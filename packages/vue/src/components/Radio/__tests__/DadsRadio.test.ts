import { afterEach, describe, expect, it } from 'vitest'
import { enableAutoUnmount, mount } from '@vue/test-utils'
import { axe } from 'vitest-axe'
import DadsRadio from '../DadsRadio.vue'
import type { DadsRadioProps } from '../DadsRadio.types'

enableAutoUnmount(afterEach)

const createWrapper = (props: Partial<DadsRadioProps> = {}) =>
  mount(DadsRadio, {
    props: { value: 'a', ...props } as DadsRadioProps,
    attachTo: document.body,
  })

describe('DadsRadio', () => {
  describe('canonical structure', () => {
    it('renders <label.dads-radio> as the root', () => {
      const wrapper = createWrapper()
      expect(wrapper.element.tagName).toBe('LABEL')
      expect(wrapper.classes()).toContain('dads-radio')
    })

    it('renders the input inside a __radio centering wrapper', () => {
      const wrapper = createWrapper()
      const radioWrapper = wrapper.find('.dads-radio__radio')
      expect(radioWrapper.exists()).toBe(true)
      expect(radioWrapper.find('input.dads-radio__input[type="radio"]').exists()).toBe(true)
    })

    it('uses the canonical input class and NOT the legacy pseudo indicator', () => {
      const wrapper = createWrapper()
      expect(wrapper.find('input.dads-radio__input').exists()).toBe(true)
      expect(wrapper.find('.dads-radio__indicator').exists()).toBe(false)
    })

    it('renders the label text in __label when provided', () => {
      const wrapper = createWrapper({ label: 'はい' })
      expect(wrapper.find('.dads-radio__label').text()).toBe('はい')
    })

    it('does not render __label when no label is provided', () => {
      const wrapper = createWrapper()
      expect(wrapper.find('.dads-radio__label').exists()).toBe(false)
    })
  })

  describe('size', () => {
    it.each(['lg', 'md', 'sm'] as const)('applies data-size="%s"', (size) => {
      const wrapper = createWrapper({ size })
      expect(wrapper.attributes('data-size')).toBe(size)
    })

    it('defaults to md', () => {
      const wrapper = createWrapper()
      expect(wrapper.attributes('data-size')).toBe('md')
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
    })

    it('does not mark as checked when modelValue !== value', () => {
      const wrapper = createWrapper({ value: 'a', modelValue: 'b' })
      expect((wrapper.find('input').element as HTMLInputElement).checked).toBe(false)
    })
  })

  describe('name attribute', () => {
    it('forwards the name prop to the input', () => {
      const wrapper = createWrapper({ name: 'fruit' })
      expect(wrapper.find('input').attributes('name')).toBe('fruit')
    })
  })

  describe('id wiring', () => {
    it('uses the explicit id when provided', () => {
      const wrapper = createWrapper({ label: 'A', id: 'my-radio' })
      expect(wrapper.find('input').attributes('id')).toBe('my-radio')
    })

    it('auto-generates a unique id per instance', () => {
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
      const idA = inputs[0].attributes('id')
      const idB = inputs[1].attributes('id')
      expect(idA).toBeTruthy()
      expect(idB).toBeTruthy()
      expect(idA).not.toBe(idB)
    })
  })

  describe('disabled', () => {
    it('sets the disabled attribute on the input', () => {
      const wrapper = createWrapper({ disabled: true })
      expect(wrapper.find('input').attributes('disabled')).toBeDefined()
    })

    it('is not disabled by default', () => {
      const wrapper = createWrapper()
      expect(wrapper.find('input').attributes('disabled')).toBeUndefined()
    })
  })

  describe('error', () => {
    it('sets aria-invalid on the input when error is true', () => {
      const wrapper = createWrapper({ error: true })
      expect(wrapper.find('input').attributes('aria-invalid')).toBe('true')
    })

    it('omits aria-invalid by default', () => {
      const wrapper = createWrapper()
      expect(wrapper.find('input').attributes('aria-invalid')).toBeUndefined()
    })
  })

  describe('aria-describedby passthrough', () => {
    it('forwards ariaDescribedby to the input (used by DadsRadioGroup)', () => {
      const wrapper = createWrapper({ ariaDescribedby: 'desc-1 hint-1' })
      expect(wrapper.find('input').attributes('aria-describedby')).toBe('desc-1 hint-1')
    })

    it('omits aria-describedby when not provided', () => {
      const wrapper = createWrapper()
      expect(wrapper.find('input').attributes('aria-describedby')).toBeUndefined()
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

  describe('a11y (vitest-axe)', () => {
    it('has no violations with a visible label', async () => {
      const wrapper = createWrapper({ label: 'はい', value: 'yes', modelValue: null })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations in error state', async () => {
      const wrapper = createWrapper({
        label: 'はい',
        error: true,
        value: 'yes',
        modelValue: null,
      })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations in disabled state', async () => {
      const wrapper = createWrapper({
        label: 'はい',
        disabled: true,
        value: 'yes',
        modelValue: null,
      })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations when checked', async () => {
      const wrapper = createWrapper({
        label: 'はい',
        value: 'yes',
        modelValue: 'yes',
      })
      expect(await axe(wrapper.element)).toHaveNoViolations()
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
