import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { axe } from 'vitest-axe'
import DadsSearchBox from '../DadsSearchBox.vue'
import type { DadsSearchBoxProps } from '../DadsSearchBox.types'

const createWrapper = (props: DadsSearchBoxProps = {}) => mount(DadsSearchBox, { props })

const mountInBody = (props: DadsSearchBoxProps = {}) =>
  mount(DadsSearchBox, { props, attachTo: document.body })

describe('DadsSearchBox', () => {
  describe('rendering', () => {
    it('renders a search input element by default', () => {
      const wrapper = createWrapper()
      const input = wrapper.find('input')
      expect(input.exists()).toBe(true)
      expect(input.attributes('type')).toBe('search')
    })

    it('renders a submit button with the default label', () => {
      const wrapper = createWrapper()
      const button = wrapper.find('button.dads-button')
      expect(button.exists()).toBe(true)
      expect(button.text()).toContain('検索')
      expect(button.attributes('type')).toBe('submit')
    })

    it('renders the visible label when provided', () => {
      const wrapper = createWrapper({ label: 'サイト内検索' })
      const label = wrapper.find('label.dads-search-box__label')
      expect(label.exists()).toBe(true)
      expect(label.text()).toContain('サイト内検索')
    })

    it('renders a visually-hidden accessible name when no label is set', () => {
      const wrapper = createWrapper()
      const sr = wrapper.find('.dads-u-visually-hidden')
      expect(sr.exists()).toBe(true)
      expect(sr.text()).toBe('検索')
    })

    it('does not render the footer when no hint or error is provided', () => {
      const wrapper = createWrapper()
      expect(wrapper.find('.dads-search-box__footer').exists()).toBe(false)
    })

    it('renders the magnifier svg icon', () => {
      const wrapper = createWrapper()
      const svg = wrapper.find('svg.dads-search-box__icon')
      expect(svg.exists()).toBe(true)
      expect(svg.attributes('aria-hidden')).toBe('true')
    })
  })

  describe('size', () => {
    it.each(['lg', 'md', 'sm'] as const)('applies dads-search-box--%s class', (size) => {
      const wrapper = createWrapper({ size })
      expect(wrapper.classes()).toContain(`dads-search-box--${size}`)
    })

    it('forwards the size token to the submit button', () => {
      const wrapper = createWrapper({ size: 'lg' })
      expect(wrapper.find('button.dads-button').classes()).toContain('dads-button--lg')
    })
  })

  describe('v-model', () => {
    it('emits update:modelValue with the typed string', async () => {
      const wrapper = createWrapper({ modelValue: '' })
      await wrapper.find('input').setValue('hello')
      const events = wrapper.emitted('update:modelValue')
      expect(events).toHaveLength(1)
      expect(events?.[0]?.[0]).toBe('hello')
    })

    it('reflects the bound value in the input', async () => {
      const wrapper = createWrapper({ modelValue: 'initial' })
      expect((wrapper.find('input').element as HTMLInputElement).value).toBe('initial')
      await wrapper.setProps({ modelValue: 'updated' })
      expect((wrapper.find('input').element as HTMLInputElement).value).toBe('updated')
    })
  })

  describe('label and id wiring', () => {
    it('uses the explicit id when provided', () => {
      const wrapper = createWrapper({ label: '検索', id: 'site-search' })
      expect(wrapper.find('input').attributes('id')).toBe('site-search')
      expect(wrapper.find('label.dads-search-box__label').attributes('for')).toBe('site-search')
    })

    it('auto-generates a unique id and links the label', () => {
      const wrapper = mount({
        components: { DadsSearchBox },
        template: `
          <div>
            <DadsSearchBox label="A" />
            <DadsSearchBox label="B" />
          </div>
        `,
      })
      const inputs = wrapper.findAll('input')
      const labels = wrapper.findAll('label.dads-search-box__label')
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
    it('renders a required marker when required is true', () => {
      const wrapper = createWrapper({ label: '検索', required: true })
      expect(wrapper.find('.dads-search-box__required').exists()).toBe(true)
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
      expect(wrapper.classes()).toContain('dads-search-box--disabled')
    })

    it('disables the submit button', () => {
      const wrapper = createWrapper({ disabled: true })
      expect(wrapper.find('button.dads-button').attributes('disabled')).toBeDefined()
    })
  })

  describe('readonly', () => {
    it('sets the readonly attribute on the input', () => {
      const wrapper = createWrapper({ readonly: true })
      expect(wrapper.find('input').attributes('readonly')).toBeDefined()
    })

    it('applies the readonly modifier class', () => {
      const wrapper = createWrapper({ readonly: true })
      expect(wrapper.classes()).toContain('dads-search-box--readonly')
    })
  })

  describe('error / errorMessage', () => {
    it('renders the error message with role="alert"', () => {
      const wrapper = createWrapper({ errorMessage: '検索ワードを入力してください' })
      const error = wrapper.find('.dads-search-box__error')
      expect(error.exists()).toBe(true)
      expect(error.text()).toBe('検索ワードを入力してください')
      expect(error.attributes('role')).toBe('alert')
    })

    it('sets aria-invalid when errorMessage is present', () => {
      const wrapper = createWrapper({ errorMessage: 'bad' })
      expect(wrapper.find('input').attributes('aria-invalid')).toBe('true')
    })

    it('honors the explicit error prop', () => {
      const wrapper = createWrapper({ error: true })
      expect(wrapper.classes()).toContain('dads-search-box--error')
      expect(wrapper.find('input').attributes('aria-invalid')).toBe('true')
    })

    it('points aria-describedby at the error id', () => {
      const wrapper = createWrapper({ errorMessage: 'エラー' })
      const errorId = wrapper.find('.dads-search-box__error').attributes('id')
      expect(wrapper.find('input').attributes('aria-describedby')).toBe(errorId)
    })

    it('prefers the error message over the hint in aria-describedby', () => {
      const wrapper = createWrapper({ hint: 'ヒント', errorMessage: 'エラー' })
      expect(wrapper.find('.dads-search-box__hint').exists()).toBe(false)
      const errorId = wrapper.find('.dads-search-box__error').attributes('id')
      expect(wrapper.find('input').attributes('aria-describedby')).toBe(errorId)
    })
  })

  describe('hint', () => {
    it('renders the hint when provided', () => {
      const wrapper = createWrapper({ hint: 'キーワードを入力' })
      const hint = wrapper.find('.dads-search-box__hint')
      expect(hint.exists()).toBe(true)
      expect(hint.text()).toBe('キーワードを入力')
    })

    it('points aria-describedby at the hint id', () => {
      const wrapper = createWrapper({ hint: 'メモ' })
      const hintId = wrapper.find('.dads-search-box__hint').attributes('id')
      expect(wrapper.find('input').attributes('aria-describedby')).toBe(hintId)
    })
  })

  describe('placeholder', () => {
    it('forwards the placeholder attribute to the input', () => {
      const wrapper = createWrapper({ placeholder: 'キーワードを入力' })
      expect(wrapper.find('input').attributes('placeholder')).toBe('キーワードを入力')
    })
  })

  describe('buttonLabel', () => {
    it('uses the custom button label', () => {
      const wrapper = createWrapper({ buttonLabel: 'Search' })
      expect(wrapper.find('button.dads-button').text()).toContain('Search')
    })

    it('uses buttonLabel as the visually-hidden input label fallback', () => {
      const wrapper = createWrapper({ buttonLabel: 'サイト内検索' })
      expect(wrapper.find('.dads-u-visually-hidden').text()).toBe('サイト内検索')
    })
  })

  describe('events', () => {
    it('emits search on Enter key press', async () => {
      const wrapper = createWrapper({ modelValue: 'query' })
      await wrapper.find('input').trigger('keydown', { key: 'Enter' })
      const events = wrapper.emitted('search')
      expect(events).toHaveLength(1)
      expect(events?.[0]?.[0]).toBe('query')
    })

    it('emits search when the submit button is clicked', async () => {
      const wrapper = createWrapper({ modelValue: 'query' })
      await wrapper.find('button.dads-button').trigger('click')
      const events = wrapper.emitted('search')
      expect(events).toHaveLength(1)
      expect(events?.[0]?.[0]).toBe('query')
    })

    it('does not emit search on Enter when disabled', async () => {
      const wrapper = createWrapper({ modelValue: 'x', disabled: true })
      await wrapper.find('input').trigger('keydown', { key: 'Enter' })
      expect(wrapper.emitted('search')).toBeUndefined()
    })

    it('does not emit search on Enter during IME composition', async () => {
      const wrapper = createWrapper({ modelValue: 'あ' })
      await wrapper.find('input').trigger('keydown', { key: 'Enter', isComposing: true })
      expect(wrapper.emitted('search')).toBeUndefined()
    })

    it('does not emit search on non-Enter keys', async () => {
      const wrapper = createWrapper({ modelValue: 'x' })
      await wrapper.find('input').trigger('keydown', { key: 'a' })
      await wrapper.find('input').trigger('keydown', { key: 'Escape' })
      expect(wrapper.emitted('search')).toBeUndefined()
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
    it('forwards name and placeholder', () => {
      const wrapper = createWrapper({ name: 'q', placeholder: 'Search' })
      const input = wrapper.find('input')
      expect(input.attributes('name')).toBe('q')
      expect(input.attributes('placeholder')).toBe('Search')
    })
  })

  // ----------------------------------------------------------------------
  // a11y — axe-core via vitest-axe. The search input always needs an
  // accessible name (either a visible label or a visually-hidden span), and
  // the error / hint must be linked via aria-describedby.
  // ----------------------------------------------------------------------
  describe('a11y (vitest-axe)', () => {
    it('has no violations with a visible label', async () => {
      const wrapper = mountInBody({ label: 'サイト内検索', modelValue: '' })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations with a visually-hidden label fallback', async () => {
      // No `label` prop — the component renders a `dads-u-visually-hidden`
      // span using the buttonLabel so the input still has an accessible name.
      const wrapper = mountInBody({ modelValue: '' })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations with a hint message', async () => {
      const wrapper = mountInBody({
        label: 'サイト内検索',
        hint: 'キーワードを入力してください',
        modelValue: '',
      })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations in error state with a message', async () => {
      const wrapper = mountInBody({
        label: '検索',
        errorMessage: 'キーワードを入力してください',
        modelValue: '',
      })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations in disabled state', async () => {
      const wrapper = mountInBody({ label: '検索', disabled: true, modelValue: '' })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })
  })

  describe('clearable', () => {
    it('does not render clear button by default', () => {
      const wrapper = createWrapper({ modelValue: 'foo' })
      expect(wrapper.find('.dads-search-box__clear').exists()).toBe(false)
    })

    it('renders clear button when clearable=true and value is non-empty', () => {
      const wrapper = createWrapper({ clearable: true, modelValue: 'foo' })
      expect(wrapper.find('.dads-search-box__clear').exists()).toBe(true)
    })

    it('does not render clear button when value is empty', () => {
      const wrapper = createWrapper({ clearable: true, modelValue: '' })
      expect(wrapper.find('.dads-search-box__clear').exists()).toBe(false)
    })

    it('emits update:modelValue="" when clear button is clicked', async () => {
      const wrapper = createWrapper({ clearable: true, modelValue: 'foo' })
      await wrapper.find('.dads-search-box__clear').trigger('click')
      expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toBe('')
    })
  })

  describe('suggestions', () => {
    it('does not render the suggestion list by default', () => {
      const wrapper = createWrapper()
      expect(wrapper.find('.dads-search-box__suggestions').exists()).toBe(false)
    })

    it('renders one option per suggestion when provided', () => {
      const wrapper = createWrapper({ suggestions: ['apple', 'banana', 'cherry'] })
      const items = wrapper.findAll('.dads-search-box__suggestion')
      expect(items).toHaveLength(3)
      expect(items[1].text()).toBe('banana')
    })

    it('emits update:modelValue + search + select:suggestion on mousedown', async () => {
      const wrapper = createWrapper({ suggestions: ['x', 'y'] })
      await wrapper.find('.dads-search-box__suggestion').trigger('mousedown')
      expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toBe('x')
      expect(wrapper.emitted('select:suggestion')?.[0]?.[0]).toBe('x')
      expect(wrapper.emitted('search')?.[0]?.[0]).toBe('x')
    })
  })

  describe('categories', () => {
    it('does not render the category select by default', () => {
      const wrapper = createWrapper()
      expect(wrapper.find('.dads-search-box__category').exists()).toBe(false)
    })

    it('renders the category select with one option per category', () => {
      const wrapper = createWrapper({ categories: ['全文', 'タイトル'] })
      const select = wrapper.find('select.dads-search-box__category')
      expect(select.exists()).toBe(true)
      expect(select.findAll('option')).toHaveLength(3) // placeholder + 2
    })

    it('emits update:category when the select changes', async () => {
      const wrapper = createWrapper({ categories: ['全文', 'タイトル'] })
      const select = wrapper.find('select.dads-search-box__category')
      await select.setValue('タイトル')
      expect(wrapper.emitted('update:category')?.[0]?.[0]).toBe('タイトル')
    })
  })
})
