import { afterEach, describe, expect, it } from 'vitest'
import { enableAutoUnmount, mount } from '@vue/test-utils'
import { axe } from 'vitest-axe'
import { nextTick } from 'vue'
import DadsCheckbox from '../DadsCheckbox.vue'
import type { DadsCheckboxProps } from '../DadsCheckbox.types'

enableAutoUnmount(afterEach)

const createWrapper = (props: DadsCheckboxProps = {}) =>
  mount(DadsCheckbox, { props, attachTo: document.body })

describe('DadsCheckbox', () => {
  describe('rendering', () => {
    it('renders a checkbox input', () => {
      const wrapper = createWrapper()
      const input = wrapper.find('input')
      expect(input.exists()).toBe(true)
      expect(input.attributes('type')).toBe('checkbox')
    })

    it('renders the indicator span', () => {
      const wrapper = createWrapper()
      expect(wrapper.find('.dads-checkbox__indicator').exists()).toBe(true)
    })

    it('renders the label text when provided', () => {
      const wrapper = createWrapper({ label: '同意する' })
      const text = wrapper.find('.dads-checkbox__text')
      expect(text.exists()).toBe(true)
      expect(text.text()).toContain('同意する')
    })

    it('does not render footer without hint or error', () => {
      const wrapper = createWrapper()
      expect(wrapper.find('.dads-checkbox__footer').exists()).toBe(false)
    })
  })

  describe('size', () => {
    it.each(['lg', 'md', 'sm'] as const)('applies dads-checkbox--%s class', (size) => {
      const wrapper = createWrapper({ size })
      expect(wrapper.classes()).toContain(`dads-checkbox--${size}`)
    })
  })

  describe('v-model', () => {
    it('emits update:modelValue=true when toggled on', async () => {
      const wrapper = createWrapper({ modelValue: false })
      const input = wrapper.find('input')
      ;(input.element as HTMLInputElement).checked = true
      await input.trigger('change')
      const events = wrapper.emitted('update:modelValue')
      expect(events).toHaveLength(1)
      expect(events?.[0]?.[0]).toBe(true)
    })

    it('emits update:modelValue=false when toggled off', async () => {
      const wrapper = createWrapper({ modelValue: true })
      const input = wrapper.find('input')
      ;(input.element as HTMLInputElement).checked = false
      await input.trigger('change')
      const events = wrapper.emitted('update:modelValue')
      expect(events?.[0]?.[0]).toBe(false)
    })

    it('reflects modelValue on the input checked state', () => {
      const wrapper = createWrapper({ modelValue: true })
      const input = wrapper.find('input').element as HTMLInputElement
      expect(input.checked).toBe(true)
    })

    it('applies the checked modifier class when modelValue is true', () => {
      const wrapper = createWrapper({ modelValue: true })
      expect(wrapper.classes()).toContain('dads-checkbox--checked')
    })
  })

  describe('indeterminate', () => {
    it('sets the DOM indeterminate property when prop is true', () => {
      const wrapper = createWrapper({ indeterminate: true })
      const input = wrapper.find('input').element as HTMLInputElement
      expect(input.indeterminate).toBe(true)
    })

    it('renders aria-checked="mixed" when indeterminate', () => {
      const wrapper = createWrapper({ indeterminate: true })
      expect(wrapper.find('input').attributes('aria-checked')).toBe('mixed')
    })

    it('applies the indeterminate modifier class', () => {
      const wrapper = createWrapper({ indeterminate: true })
      expect(wrapper.classes()).toContain('dads-checkbox--indeterminate')
    })

    it('updates the DOM indeterminate property when prop changes', async () => {
      const wrapper = createWrapper({ indeterminate: false })
      const input = wrapper.find('input').element as HTMLInputElement
      expect(input.indeterminate).toBe(false)
      await wrapper.setProps({ indeterminate: true })
      expect(input.indeterminate).toBe(true)
      await wrapper.setProps({ indeterminate: false })
      expect(input.indeterminate).toBe(false)
    })

    it('does not apply the checked class when both modelValue and indeterminate are true', () => {
      const wrapper = createWrapper({ modelValue: true, indeterminate: true })
      expect(wrapper.classes()).toContain('dads-checkbox--indeterminate')
      expect(wrapper.classes()).not.toContain('dads-checkbox--checked')
    })
  })

  describe('label and id wiring', () => {
    it('uses the explicit id when provided', () => {
      const wrapper = createWrapper({ label: 'Agree', id: 'my-cb' })
      expect(wrapper.find('input').attributes('id')).toBe('my-cb')
      expect(wrapper.find('label').attributes('for')).toBe('my-cb')
    })

    it('auto-generates a unique id and links the label', () => {
      const wrapper = mount({
        components: { DadsCheckbox },
        template: `
          <div>
            <DadsCheckbox label="A" />
            <DadsCheckbox label="B" />
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
      const wrapper = createWrapper({ label: 'Agree', required: true })
      expect(wrapper.find('.dads-checkbox__requirement').exists()).toBe(true)
    })

    it('sets aria-required on the input', () => {
      const wrapper = createWrapper({ required: true })
      expect(wrapper.find('input').attributes('aria-required')).toBe('true')
    })

    it('renders the default ※必須 label when required is true', () => {
      const wrapper = createWrapper({ label: 'Agree', required: true })
      expect(wrapper.find('.dads-checkbox__requirement').text()).toBe('※必須')
    })

    it('renders a custom requiredLabel when provided (i18n override)', () => {
      const wrapper = createWrapper({
        label: 'Agree',
        required: true,
        requiredLabel: 'Required',
      })
      expect(wrapper.find('.dads-checkbox__requirement').text()).toBe('Required')
    })
  })

  describe('disabled', () => {
    it('sets the disabled attribute on the input', () => {
      const wrapper = createWrapper({ disabled: true })
      expect(wrapper.find('input').attributes('disabled')).toBeDefined()
    })

    it('applies the disabled modifier class', () => {
      const wrapper = createWrapper({ disabled: true })
      expect(wrapper.classes()).toContain('dads-checkbox--disabled')
    })
  })

  describe('readonly', () => {
    it('applies the readonly modifier class', () => {
      const wrapper = createWrapper({ readonly: true })
      expect(wrapper.classes()).toContain('dads-checkbox--readonly')
    })

    it('does not emit update:modelValue when readonly', async () => {
      const wrapper = createWrapper({ readonly: true, modelValue: false })
      const input = wrapper.find('input')
      ;(input.element as HTMLInputElement).checked = true
      await input.trigger('change')
      expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    })

    it('restores the DOM checked state to modelValue when readonly toggled', async () => {
      const wrapper = createWrapper({ readonly: true, modelValue: false })
      const input = wrapper.find('input')
      const inputEl = input.element as HTMLInputElement
      inputEl.checked = true
      await input.trigger('change')
      await nextTick()
      expect(inputEl.checked).toBe(false)
    })
  })

  describe('error / errorMessage', () => {
    it('renders the error message without role="alert" (official a11y guidance)', () => {
      const wrapper = createWrapper({ errorMessage: '必須項目です' })
      const error = wrapper.find('.dads-checkbox__error-text')
      expect(error.exists()).toBe(true)
      expect(error.text()).toBe('必須項目です')
      expect(error.attributes('role')).toBeUndefined()
    })

    it('sets aria-invalid when errorMessage is present', () => {
      const wrapper = createWrapper({ errorMessage: 'bad' })
      expect(wrapper.find('input').attributes('aria-invalid')).toBe('true')
    })

    it('honors the explicit error prop', () => {
      const wrapper = createWrapper({ error: true })
      expect(wrapper.classes()).toContain('dads-checkbox--error')
      expect(wrapper.find('input').attributes('aria-invalid')).toBe('true')
    })

    it('hides the hint when an error message is shown', () => {
      const wrapper = createWrapper({ hint: 'ヒント', errorMessage: 'エラー' })
      expect(wrapper.find('.dads-checkbox__support-text').exists()).toBe(false)
      expect(wrapper.find('.dads-checkbox__error-text').exists()).toBe(true)
    })
  })

  describe('hint', () => {
    it('renders the hint when provided', () => {
      const wrapper = createWrapper({ hint: 'メモ' })
      const hint = wrapper.find('.dads-checkbox__support-text')
      expect(hint.exists()).toBe(true)
      expect(hint.text()).toBe('メモ')
    })

    it('points aria-describedby at the hint id', () => {
      const wrapper = createWrapper({ hint: 'メモ' })
      const hintId = wrapper.find('.dads-checkbox__support-text').attributes('id')
      expect(wrapper.find('input').attributes('aria-describedby')).toBe(hintId)
    })

    it('points aria-describedby at the error id when error is present', () => {
      const wrapper = createWrapper({ hint: 'メモ', errorMessage: 'エラー' })
      const errorId = wrapper.find('.dads-checkbox__error-text').attributes('id')
      expect(wrapper.find('input').attributes('aria-describedby')).toBe(errorId)
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

    it('does not emit change when readonly', async () => {
      const wrapper = createWrapper({ readonly: true })
      await wrapper.find('input').trigger('change')
      expect(wrapper.emitted('change')).toBeUndefined()
    })
  })

  describe('forwarded attributes', () => {
    it('forwards name and value', () => {
      const wrapper = createWrapper({ name: 'agree', value: 'yes' })
      const input = wrapper.find('input')
      expect(input.attributes('name')).toBe('agree')
      expect(input.attributes('value')).toBe('yes')
    })
  })

  describe('a11y (vitest-axe)', () => {
    it('has no violations with a visible label', async () => {
      const wrapper = createWrapper({ label: '同意する' })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations with a hint', async () => {
      const wrapper = createWrapper({ label: '同意する', hint: '後から変更できます' })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations when required', async () => {
      const wrapper = createWrapper({ label: '同意する', required: true })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations in error state with a message', async () => {
      const wrapper = createWrapper({ label: '同意する', errorMessage: '必須項目です' })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations in disabled state', async () => {
      const wrapper = createWrapper({ label: '同意する', disabled: true })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations in checked state', async () => {
      const wrapper = createWrapper({ label: '同意する', modelValue: true })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations in indeterminate state', async () => {
      const wrapper = createWrapper({ label: '同意する', indeterminate: true })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })
  })

  describe('label clickability', () => {
    it('focuses the input when the label is clicked (label wraps input)', () => {
      const wrapper = createWrapper({ label: 'Click me' })
      // Native <label> click forwards focus to the contained <input>; verify
      // structurally so the test is not coupled to jsdom focus behaviour.
      const label = wrapper.find('label')
      const input = wrapper.find('input')
      expect(label.element.contains(input.element)).toBe(true)
      expect(label.attributes('for')).toBe(input.attributes('id'))
    })
  })
})
