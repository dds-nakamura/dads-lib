import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { enableAutoUnmount, mount } from '@vue/test-utils'
import { axe } from 'vitest-axe'
import { nextTick } from 'vue'
import DadsTextarea from '../DadsTextarea.vue'
import type { DadsTextareaProps } from '../DadsTextarea.types'

enableAutoUnmount(afterEach)

const createWrapper = (props: DadsTextareaProps = {}) =>
  mount(DadsTextarea, { props, attachTo: document.body })

// jsdom returns 0 for scrollHeight, so we mock it per-test for auto-resize
// scenarios. We also stub requestAnimationFrame so the height adjustment runs
// synchronously inside the test.
const stubRaf = () => {
  const spy = vi
    .spyOn(window, 'requestAnimationFrame')
    .mockImplementation((cb: FrameRequestCallback) => {
      cb(0)
      return 0
    })
  return spy
}

describe('DadsTextarea', () => {
  describe('rendering', () => {
    it('renders a single textarea element by default', () => {
      const wrapper = createWrapper()
      expect(wrapper.find('textarea').exists()).toBe(true)
    })

    it('renders the label when provided', () => {
      const wrapper = createWrapper({ label: '備考' })
      const label = wrapper.find('label.dads-textarea__label')
      expect(label.exists()).toBe(true)
      expect(label.text()).toContain('備考')
    })

    it('does not render the footer when there is no hint, error or counter', () => {
      const wrapper = createWrapper()
      expect(wrapper.find('.dads-textarea__footer').exists()).toBe(false)
    })
  })

  describe('size', () => {
    it.each(['lg', 'md', 'sm'] as const)('applies dads-textarea--%s class', (size) => {
      const wrapper = createWrapper({ size })
      expect(wrapper.classes()).toContain(`dads-textarea--${size}`)
    })
  })

  describe('v-model', () => {
    it('emits update:modelValue with the string value on input', async () => {
      const wrapper = createWrapper({ modelValue: '' })
      await wrapper.find('textarea').setValue('hello')
      const events = wrapper.emitted('update:modelValue')
      expect(events).toHaveLength(1)
      expect(events?.[0]?.[0]).toBe('hello')
    })
  })

  describe('label and id wiring', () => {
    it('uses the explicit id when provided', () => {
      const wrapper = createWrapper({ label: 'Note', id: 'my-textarea' })
      expect(wrapper.find('textarea').attributes('id')).toBe('my-textarea')
      expect(wrapper.find('label').attributes('for')).toBe('my-textarea')
    })

    it('auto-generates a unique id and links the label', () => {
      const wrapper = mount({
        components: { DadsTextarea },
        template: `
          <div>
            <DadsTextarea label="A" />
            <DadsTextarea label="B" />
          </div>
        `,
      })
      const textareas = wrapper.findAll('textarea')
      const labels = wrapper.findAll('label')
      const idA = textareas[0].attributes('id')
      const idB = textareas[1].attributes('id')
      expect(idA).toBeTruthy()
      expect(idB).toBeTruthy()
      expect(idA).not.toBe(idB)
      expect(labels[0].attributes('for')).toBe(idA)
      expect(labels[1].attributes('for')).toBe(idB)
    })
  })

  describe('required', () => {
    it('renders a required marker', () => {
      const wrapper = createWrapper({ label: 'Note', required: true })
      expect(wrapper.find('.dads-textarea__required').exists()).toBe(true)
    })

    it('sets aria-required on the textarea', () => {
      const wrapper = createWrapper({ required: true })
      expect(wrapper.find('textarea').attributes('aria-required')).toBe('true')
    })
  })

  describe('disabled', () => {
    it('sets the disabled attribute on the textarea', () => {
      const wrapper = createWrapper({ disabled: true })
      expect(wrapper.find('textarea').attributes('disabled')).toBeDefined()
    })

    it('applies the disabled modifier class', () => {
      const wrapper = createWrapper({ disabled: true })
      expect(wrapper.classes()).toContain('dads-textarea--disabled')
    })
  })

  describe('readonly', () => {
    it('sets the readonly attribute on the textarea', () => {
      const wrapper = createWrapper({ readonly: true })
      expect(wrapper.find('textarea').attributes('readonly')).toBeDefined()
    })

    it('applies the readonly modifier class', () => {
      const wrapper = createWrapper({ readonly: true })
      expect(wrapper.classes()).toContain('dads-textarea--readonly')
    })
  })

  describe('error / errorMessage', () => {
    it('renders the error message with role="alert"', () => {
      const wrapper = createWrapper({ errorMessage: '必須項目です' })
      const error = wrapper.find('.dads-textarea__error')
      expect(error.exists()).toBe(true)
      expect(error.text()).toBe('必須項目です')
      expect(error.attributes('role')).toBe('alert')
    })

    it('sets aria-invalid when errorMessage is present', () => {
      const wrapper = createWrapper({ errorMessage: 'bad' })
      expect(wrapper.find('textarea').attributes('aria-invalid')).toBe('true')
    })

    it('honors the explicit error prop', () => {
      const wrapper = createWrapper({ error: true })
      expect(wrapper.classes()).toContain('dads-textarea--error')
      expect(wrapper.find('textarea').attributes('aria-invalid')).toBe('true')
    })

    it('hides the hint when an error message is shown', () => {
      const wrapper = createWrapper({ hint: 'ヒント', errorMessage: 'エラー' })
      expect(wrapper.find('.dads-textarea__hint').exists()).toBe(false)
      expect(wrapper.find('.dads-textarea__error').exists()).toBe(true)
    })
  })

  describe('hint', () => {
    it('renders the hint when provided', () => {
      const wrapper = createWrapper({ hint: 'メモ' })
      const hint = wrapper.find('.dads-textarea__hint')
      expect(hint.exists()).toBe(true)
      expect(hint.text()).toBe('メモ')
    })

    it('points aria-describedby at the hint id', () => {
      const wrapper = createWrapper({ hint: 'メモ' })
      const hintId = wrapper.find('.dads-textarea__hint').attributes('id')
      expect(wrapper.find('textarea').attributes('aria-describedby')).toBe(hintId)
    })
  })

  describe('counter', () => {
    it('renders the current length / max counter', () => {
      const wrapper = createWrapper({ counter: 50, modelValue: 'abc' })
      const counter = wrapper.find('.dads-textarea__counter')
      expect(counter.exists()).toBe(true)
      expect(counter.text().replace(/\s+/g, '')).toBe('3/50')
    })

    it('updates as modelValue changes', async () => {
      const wrapper = createWrapper({ counter: 10, modelValue: '' })
      await wrapper.setProps({ modelValue: 'hello' })
      expect(wrapper.find('.dads-textarea__counter').text().replace(/\s+/g, '')).toBe('5/10')
    })

    it('includes the counter id in aria-describedby', () => {
      const wrapper = createWrapper({ counter: 10 })
      const counterId = wrapper.find('.dads-textarea__counter').attributes('id')
      expect(wrapper.find('textarea').attributes('aria-describedby')).toContain(counterId)
    })
  })

  describe('rows', () => {
    it('uses the rows prop in fixed mode', () => {
      const wrapper = createWrapper({ rows: 5 })
      expect(wrapper.find('textarea').attributes('rows')).toBe('5')
    })

    it('falls back to 3 rows by default', () => {
      const wrapper = createWrapper()
      expect(wrapper.find('textarea').attributes('rows')).toBe('3')
    })
  })

  describe('resize', () => {
    it('applies the resize value via inline style', () => {
      const wrapper = createWrapper({ resize: 'both' })
      expect(wrapper.find('textarea').attributes('style')).toContain('resize: both')
    })

    it('defaults to vertical resize', () => {
      const wrapper = createWrapper()
      expect(wrapper.find('textarea').attributes('style')).toContain('resize: vertical')
    })
  })

  describe('auto-resize', () => {
    let raf: ReturnType<typeof stubRaf>

    beforeEach(() => {
      raf = stubRaf()
    })

    afterEach(() => {
      raf.mockRestore()
    })

    it('forces resize="none" when autoResize is enabled', () => {
      const wrapper = createWrapper({ autoResize: true, resize: 'both' })
      expect(wrapper.find('textarea').attributes('style')).toContain('resize: none')
    })

    it('uses minRows for the rendered rows attribute when autoResize is enabled', () => {
      const wrapper = createWrapper({ autoResize: true, minRows: 4 })
      expect(wrapper.find('textarea').attributes('rows')).toBe('4')
    })

    it('clamps the height between minRows and maxRows when modelValue grows', async () => {
      const wrapper = createWrapper({
        autoResize: true,
        minRows: 2,
        maxRows: 4,
        modelValue: '',
      })
      const textareaEl = wrapper.find('textarea').element as HTMLTextAreaElement

      // jsdom returns empty strings, so 20px line-height fallback applies. With
      // minRows=2 the floor is 40px and with maxRows=4 the ceiling is 80px.
      Object.defineProperty(textareaEl, 'scrollHeight', {
        value: 200,
        configurable: true,
      })
      await wrapper.setProps({ modelValue: 'a\nb\nc\nd\ne\nf' })
      await nextTick()

      expect(textareaEl.style.height).toBe('80px')

      Object.defineProperty(textareaEl, 'scrollHeight', {
        value: 10,
        configurable: true,
      })
      await wrapper.setProps({ modelValue: '' })
      await nextTick()

      expect(textareaEl.style.height).toBe('40px')
    })
  })

  describe('events', () => {
    it('emits change with the original event', async () => {
      const wrapper = createWrapper()
      await wrapper.find('textarea').trigger('change')
      expect(wrapper.emitted('change')).toHaveLength(1)
    })

    it('emits focus', async () => {
      const wrapper = createWrapper()
      await wrapper.find('textarea').trigger('focus')
      expect(wrapper.emitted('focus')).toHaveLength(1)
    })

    it('emits blur', async () => {
      const wrapper = createWrapper()
      await wrapper.find('textarea').trigger('blur')
      expect(wrapper.emitted('blur')).toHaveLength(1)
    })
  })

  describe('forwarded attributes', () => {
    it('forwards placeholder, name, autocomplete, maxlength', () => {
      const wrapper = createWrapper({
        placeholder: 'ph',
        name: 'memo',
        autocomplete: 'off',
        maxlength: 200,
      })
      const textarea = wrapper.find('textarea')
      expect(textarea.attributes('placeholder')).toBe('ph')
      expect(textarea.attributes('name')).toBe('memo')
      expect(textarea.attributes('autocomplete')).toBe('off')
      expect(textarea.attributes('maxlength')).toBe('200')
    })
  })

  describe('a11y (vitest-axe)', () => {
    it('has no violations with a visible label', async () => {
      const wrapper = createWrapper({ label: '備考', modelValue: '' })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations with a hint message', async () => {
      const wrapper = createWrapper({
        label: '備考',
        hint: '200 文字以内で入力してください',
        modelValue: '',
      })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations when required', async () => {
      const wrapper = createWrapper({ label: '備考', required: true, modelValue: '' })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations in error state with a message', async () => {
      const wrapper = createWrapper({
        label: '備考',
        errorMessage: '必須項目です',
        modelValue: '',
      })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations in disabled state', async () => {
      const wrapper = createWrapper({ label: '備考', disabled: true, modelValue: '' })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations with a counter', async () => {
      const wrapper = createWrapper({
        label: '備考',
        counter: 200,
        maxlength: 200,
        modelValue: 'こんにちは',
      })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })
  })
})
