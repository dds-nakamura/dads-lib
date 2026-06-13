import { afterEach, describe, expect, it } from 'vitest'
import { enableAutoUnmount, mount } from '@vue/test-utils'
import { axe } from 'vitest-axe'
import DadsCheckbox from '../DadsCheckbox.vue'
import type { DadsCheckboxProps } from '../DadsCheckbox.types'

enableAutoUnmount(afterEach)

const createWrapper = (props: DadsCheckboxProps = {}) =>
  mount(DadsCheckbox, { props, attachTo: document.body })

describe('DadsCheckbox', () => {
  describe('rendering', () => {
    it('renders the canonical control: visible input inside __checkbox', () => {
      const wrapper = createWrapper()
      const control = wrapper.find('.dads-checkbox__checkbox')
      expect(control.exists()).toBe(true)
      const input = control.find('input.dads-checkbox__input')
      expect(input.exists()).toBe(true)
      expect(input.attributes('type')).toBe('checkbox')
    })

    it('does not render the legacy indicator pseudo-control', () => {
      const wrapper = createWrapper()
      expect(wrapper.find('.dads-checkbox__indicator').exists()).toBe(false)
    })

    it('renders the label text when provided', () => {
      const wrapper = createWrapper({ label: '同意する' })
      const text = wrapper.find('.dads-checkbox__label')
      expect(text.exists()).toBe(true)
      expect(text.text()).toContain('同意する')
    })

    it('omits the label span when no label is provided (standalone)', () => {
      const wrapper = createWrapper()
      expect(wrapper.find('.dads-checkbox__label').exists()).toBe(false)
    })

    it('does not render footer without hint or error', () => {
      const wrapper = createWrapper()
      expect(wrapper.find('.dads-checkbox-field__footer').exists()).toBe(false)
    })
  })

  describe('size', () => {
    it.each(['lg', 'md', 'sm'] as const)('applies data-size="%s" on the checkbox', (size) => {
      const wrapper = createWrapper({ size })
      expect(wrapper.find('.dads-checkbox').attributes('data-size')).toBe(size)
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

    it('reflects unchecked modelValue on the input', () => {
      const wrapper = createWrapper({ modelValue: false })
      const input = wrapper.find('input').element as HTMLInputElement
      expect(input.checked).toBe(false)
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

    it('updates the DOM indeterminate property when prop changes', async () => {
      const wrapper = createWrapper({ indeterminate: false })
      const input = wrapper.find('input').element as HTMLInputElement
      expect(input.indeterminate).toBe(false)
      await wrapper.setProps({ indeterminate: true })
      expect(input.indeterminate).toBe(true)
      await wrapper.setProps({ indeterminate: false })
      expect(input.indeterminate).toBe(false)
    })

    it('keeps the DOM indeterminate property even when modelValue is also true', () => {
      const wrapper = createWrapper({ modelValue: true, indeterminate: true })
      const input = wrapper.find('input').element as HTMLInputElement
      expect(input.indeterminate).toBe(true)
      expect(wrapper.find('input').attributes('aria-checked')).toBe('mixed')
    })
  })

  describe('label and id wiring', () => {
    it('uses the explicit id on the input when provided', () => {
      const wrapper = createWrapper({ label: 'Agree', id: 'my-cb' })
      expect(wrapper.find('input').attributes('id')).toBe('my-cb')
    })

    it('auto-generates a unique id per instance', () => {
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
      const idA = inputs[0].attributes('id')
      const idB = inputs[1].attributes('id')
      expect(idA).toBeTruthy()
      expect(idB).toBeTruthy()
      expect(idA).not.toBe(idB)
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

    it('applies the disabled modifier class on the field wrapper', () => {
      const wrapper = createWrapper({ disabled: true })
      expect(wrapper.classes()).toContain('dads-checkbox-field--disabled')
    })
  })

  describe('error / errorMessage', () => {
    it('renders the error message without role="alert" (official a11y guidance)', () => {
      const wrapper = createWrapper({ errorMessage: '必須項目です' })
      const error = wrapper.find('.dads-checkbox-field__error-text')
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
      expect(wrapper.classes()).toContain('dads-checkbox-field--error')
      expect(wrapper.find('input').attributes('aria-invalid')).toBe('true')
    })

    it('hides the hint when an error message is shown', () => {
      const wrapper = createWrapper({ hint: 'ヒント', errorMessage: 'エラー' })
      expect(wrapper.find('.dads-checkbox-field__support-text').exists()).toBe(false)
      expect(wrapper.find('.dads-checkbox-field__error-text').exists()).toBe(true)
    })
  })

  describe('hint', () => {
    it('renders the hint when provided', () => {
      const wrapper = createWrapper({ hint: 'メモ' })
      const hint = wrapper.find('.dads-checkbox-field__support-text')
      expect(hint.exists()).toBe(true)
      expect(hint.text()).toBe('メモ')
    })

    it('points aria-describedby at the hint id', () => {
      const wrapper = createWrapper({ hint: 'メモ' })
      const hintId = wrapper.find('.dads-checkbox-field__support-text').attributes('id')
      expect(wrapper.find('input').attributes('aria-describedby')).toBe(hintId)
    })

    it('points aria-describedby at the error id when error is present', () => {
      const wrapper = createWrapper({ hint: 'メモ', errorMessage: 'エラー' })
      const errorId = wrapper.find('.dads-checkbox-field__error-text').attributes('id')
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
    it('wraps the input in the label so clicking the label toggles it', () => {
      const wrapper = createWrapper({ label: 'Click me' })
      // The canonical structure wraps the <input> inside <label class="dads-checkbox">
      // (no `for` needed). Native <label> click forwards to the contained input.
      const label = wrapper.find('label.dads-checkbox')
      const input = wrapper.find('input')
      expect(label.exists()).toBe(true)
      expect(label.element.contains(input.element)).toBe(true)
      expect(label.attributes('for')).toBeUndefined()
    })
  })
})
