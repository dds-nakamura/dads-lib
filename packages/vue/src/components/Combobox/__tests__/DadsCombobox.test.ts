import { afterEach, describe, expect, it } from 'vitest'
import { enableAutoUnmount, mount } from '@vue/test-utils'
import { axe } from 'vitest-axe'
import { nextTick } from 'vue'
import DadsCombobox from '../DadsCombobox.vue'
import type { DadsComboboxItem, DadsComboboxProps } from '../DadsCombobox.types'

enableAutoUnmount(afterEach)

const defaultItems: DadsComboboxItem[] = [
  { value: 'a', title: 'Apple' },
  { value: 'b', title: 'Banana' },
  { value: 'c', title: 'Cherry' },
]

const itemsWithDisabled: DadsComboboxItem[] = [
  { value: 'a', title: 'Apple' },
  { value: 'b', title: 'Banana', disabled: true },
  { value: 'c', title: 'Cherry' },
]

const createWrapper = (props: Partial<DadsComboboxProps> = {}) =>
  mount(DadsCombobox, {
    props: { items: defaultItems, ...props },
    attachTo: document.body,
  })

describe('DadsCombobox', () => {
  describe('rendering', () => {
    it('renders an input with role="combobox"', () => {
      const wrapper = createWrapper()
      const input = wrapper.find('input.dads-combobox__input')
      expect(input.exists()).toBe(true)
      expect(input.attributes('role')).toBe('combobox')
      expect(input.attributes('aria-autocomplete')).toBe('list')
    })

    it('hides the suggestions listbox initially', () => {
      const wrapper = createWrapper()
      const listbox = wrapper.find('ul.dads-combobox__suggestions')
      expect(listbox.exists()).toBe(true)
      expect(listbox.attributes('style')).toContain('display: none')
    })

    it('renders the label and links it via for/id', () => {
      const wrapper = createWrapper({ label: '果物' })
      const label = wrapper.find('label.dads-combobox__label')
      expect(label.exists()).toBe(true)
      expect(label.text()).toContain('果物')
      const inputId = wrapper.find('input').attributes('id')
      expect(label.attributes('for')).toBe(inputId)
    })

    it('does not render the footer without hint or error', () => {
      const wrapper = createWrapper()
      expect(wrapper.find('.dads-combobox__footer').exists()).toBe(false)
    })
  })

  describe('size', () => {
    it.each(['lg', 'md', 'sm'] as const)('applies dads-combobox--%s class', (size) => {
      const wrapper = createWrapper({ size })
      expect(wrapper.classes()).toContain(`dads-combobox--${size}`)
    })

    it('defaults to md size', () => {
      const wrapper = createWrapper()
      expect(wrapper.classes()).toContain('dads-combobox--md')
    })
  })

  describe('open / close', () => {
    it('opens the listbox when the input is focused', async () => {
      const wrapper = createWrapper()
      await wrapper.find('input').trigger('focus')
      expect(wrapper.find('input').attributes('aria-expanded')).toBe('true')
    })

    it('closes on Escape', async () => {
      const wrapper = createWrapper()
      await wrapper.find('input').trigger('focus')
      await wrapper.find('input').trigger('keydown', { key: 'Escape' })
      expect(wrapper.find('input').attributes('aria-expanded')).toBe('false')
    })

    it('closes on Tab keydown', async () => {
      const wrapper = createWrapper()
      await wrapper.find('input').trigger('focus')
      await wrapper.find('input').trigger('keydown', { key: 'Tab' })
      expect(wrapper.find('input').attributes('aria-expanded')).toBe('false')
    })

    it('closes on outside pointerdown', async () => {
      const wrapper = createWrapper()
      await wrapper.find('input').trigger('focus')
      expect(wrapper.find('input').attributes('aria-expanded')).toBe('true')

      const outside = document.createElement('div')
      document.body.appendChild(outside)
      outside.dispatchEvent(new MouseEvent('pointerdown', { bubbles: true }))
      await nextTick()

      expect(wrapper.find('input').attributes('aria-expanded')).toBe('false')
      outside.remove()
    })
  })

  describe('v-model (single)', () => {
    it('emits update:modelValue with the chosen value', async () => {
      const wrapper = createWrapper({ modelValue: '' })
      await wrapper.find('input').trigger('focus')
      const options = wrapper.findAll('li.dads-combobox__suggestion')
      await options[1].trigger('mousedown')
      expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toBe('b')
      expect(wrapper.emitted('change')?.[0]?.[0]).toBe('b')
    })

    it('renders the matched title for the bound value', () => {
      const wrapper = createWrapper({ modelValue: 'c' })
      expect((wrapper.find('input').element as HTMLInputElement).value).toBe('Cherry')
    })

    it('closes the listbox after selection in single mode', async () => {
      const wrapper = createWrapper({ modelValue: '' })
      await wrapper.find('input').trigger('focus')
      await wrapper.findAll('li.dads-combobox__suggestion')[0].trigger('mousedown')
      expect(wrapper.find('input').attributes('aria-expanded')).toBe('false')
    })

    it('renders a free-input string as input value when not in items', () => {
      const wrapper = createWrapper({ modelValue: 'Durian' })
      expect((wrapper.find('input').element as HTMLInputElement).value).toBe('Durian')
    })
  })

  describe('free input (single)', () => {
    it('commits the raw input string on Enter when not in items', async () => {
      const wrapper = createWrapper({ modelValue: '' })
      const input = wrapper.find('input')
      await input.trigger('focus')
      await input.setValue('Mango')
      // After typing, no item matches "Mango". Enter should commit raw text.
      await input.trigger('keydown', { key: 'Enter' })
      expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toBe('Mango')
    })

    it('commits the matched item value when Enter and the active option exists', async () => {
      const wrapper = createWrapper({ modelValue: '' })
      const input = wrapper.find('input')
      await input.trigger('focus')
      await input.setValue('App')
      await input.trigger('keydown', { key: 'Enter' })
      expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toBe('a')
    })

    it('does not emit on Enter when input is empty and no active', async () => {
      const wrapper = createWrapper({ modelValue: '' })
      const input = wrapper.find('input')
      await input.trigger('focus')
      // Move outside any active candidate by closing then reopening with empty
      await input.trigger('keydown', { key: 'Escape' })
      // Now active is -1 and inputValue is empty
      await input.trigger('keydown', { key: 'Enter' })
      expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    })
  })

  describe('default filter (substring, case-insensitive)', () => {
    it('filters by substring matching item title', async () => {
      const wrapper = createWrapper()
      const input = wrapper.find('input')
      await input.trigger('focus')
      await input.setValue('an')
      const options = wrapper.findAll('li.dads-combobox__suggestion')
      // 'Banana' contains 'an'; Apple/Cherry do not.
      expect(options).toHaveLength(1)
      expect(options[0].text()).toBe('Banana')
    })

    it('matches case-insensitively', async () => {
      const wrapper = createWrapper()
      const input = wrapper.find('input')
      await input.trigger('focus')
      await input.setValue('CHE')
      const options = wrapper.findAll('li.dads-combobox__suggestion')
      expect(options).toHaveLength(1)
      expect(options[0].text()).toBe('Cherry')
    })

    it('shows all items when query is empty', async () => {
      const wrapper = createWrapper()
      await wrapper.find('input').trigger('focus')
      const options = wrapper.findAll('li.dads-combobox__suggestion')
      expect(options).toHaveLength(3)
    })
  })

  describe('custom filter prop', () => {
    it('uses the supplied filter function instead of default', async () => {
      const filter = (item: DadsComboboxItem, query: string) =>
        // exact-match-only filter (overrides default substring)
        item.title.toLowerCase() === query.toLowerCase()
      const wrapper = createWrapper({ filter })
      const input = wrapper.find('input')
      await input.trigger('focus')
      await input.setValue('apple')
      const options = wrapper.findAll('li.dads-combobox__suggestion')
      expect(options).toHaveLength(1)
      expect(options[0].text()).toBe('Apple')
    })

    it('passes the raw query unmodified to the filter', async () => {
      let receivedQuery = ''
      const filter = (_item: DadsComboboxItem, query: string) => {
        receivedQuery = query
        return true
      }
      const wrapper = createWrapper({ filter })
      const input = wrapper.find('input')
      await input.trigger('focus')
      await input.setValue('AbC')
      expect(receivedQuery).toBe('AbC')
    })
  })

  describe('multiple mode', () => {
    it('renders DadsChipTag for each selected value', () => {
      const wrapper = createWrapper({
        multiple: true,
        modelValue: ['a', 'c'],
      })
      const chips = wrapper.findAll('.dads-chip-tag')
      expect(chips).toHaveLength(2)
      expect(chips[0].text()).toContain('Apple')
      expect(chips[1].text()).toContain('Cherry')
    })

    it('appends a value on Enter', async () => {
      const wrapper = createWrapper({ multiple: true, modelValue: ['a'] })
      const input = wrapper.find('input')
      await input.trigger('focus')
      await input.setValue('Banana')
      await input.trigger('keydown', { key: 'Enter' })
      expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toEqual(['a', 'b'])
    })

    it('appends a free-input string on Enter when not in items', async () => {
      const wrapper = createWrapper({ multiple: true, modelValue: [] })
      const input = wrapper.find('input')
      await input.trigger('focus')
      await input.setValue('Custom')
      await input.trigger('keydown', { key: 'Enter' })
      expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toEqual(['Custom'])
    })

    it('clears the input after committing in multiple mode', async () => {
      const wrapper = createWrapper({ multiple: true, modelValue: [] })
      const input = wrapper.find('input')
      await input.trigger('focus')
      await input.setValue('Apple')
      await input.trigger('keydown', { key: 'Enter' })
      await nextTick()
      expect((input.element as HTMLInputElement).value).toBe('')
    })

    it('does not duplicate already-selected values', async () => {
      const wrapper = createWrapper({ multiple: true, modelValue: ['a'] })
      const input = wrapper.find('input')
      await input.trigger('focus')
      await input.setValue('Apple')
      await input.trigger('keydown', { key: 'Enter' })
      // No emit because 'a' is already in the list.
      expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    })

    it('removes a chip when its × button is clicked', async () => {
      const wrapper = createWrapper({
        multiple: true,
        modelValue: ['a', 'b'],
      })
      const close = wrapper.find('.dads-chip-tag__close')
      await close.trigger('click')
      expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toEqual(['b'])
    })

    it('pops the last chip on Backspace when input is empty', async () => {
      const wrapper = createWrapper({
        multiple: true,
        modelValue: ['a', 'b', 'c'],
      })
      const input = wrapper.find('input')
      await input.trigger('focus')
      await input.trigger('keydown', { key: 'Backspace' })
      expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toEqual(['a', 'b'])
    })

    it('does not pop a chip on Backspace if the input has text', async () => {
      const wrapper = createWrapper({
        multiple: true,
        modelValue: ['a'],
      })
      const input = wrapper.find('input')
      await input.trigger('focus')
      await input.setValue('typing')
      await input.trigger('keydown', { key: 'Backspace' })
      expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    })

    it('keeps the listbox open after committing in multiple mode', async () => {
      const wrapper = createWrapper({ multiple: true, modelValue: [] })
      const input = wrapper.find('input')
      await input.trigger('focus')
      await input.setValue('Apple')
      await input.trigger('keydown', { key: 'Enter' })
      expect(input.attributes('aria-expanded')).toBe('true')
    })
  })

  describe('keyboard navigation', () => {
    it('moves the cursor on ArrowDown', async () => {
      const wrapper = createWrapper()
      const input = wrapper.find('input')
      await input.trigger('focus')
      await input.trigger('keydown', { key: 'ArrowDown' })
      const options = wrapper.findAll('li.dads-combobox__suggestion')
      expect(options[1].classes()).toContain('dads-combobox__suggestion--active')
    })

    it('moves the cursor on ArrowUp wrapping around', async () => {
      const wrapper = createWrapper()
      const input = wrapper.find('input')
      await input.trigger('focus')
      // Initial active index is 0; ArrowUp wraps to last (index 2).
      await input.trigger('keydown', { key: 'ArrowUp' })
      const options = wrapper.findAll('li.dads-combobox__suggestion')
      expect(options[2].classes()).toContain('dads-combobox__suggestion--active')
    })

    it('skips disabled items on ArrowDown', async () => {
      const wrapper = createWrapper({ items: itemsWithDisabled })
      const input = wrapper.find('input')
      await input.trigger('focus')
      await input.trigger('keydown', { key: 'ArrowDown' })
      const options = wrapper.findAll('li.dads-combobox__suggestion')
      // Initial 0 (Apple) -> ArrowDown skips disabled Banana -> Cherry (2)
      expect(options[2].classes()).toContain('dads-combobox__suggestion--active')
    })

    it('opens on ArrowDown when closed', async () => {
      const wrapper = createWrapper()
      // Trigger keydown without focus; component should open.
      const input = wrapper.find('input')
      await input.trigger('keydown', { key: 'ArrowDown' })
      expect(input.attributes('aria-expanded')).toBe('true')
    })
  })

  describe('aria attributes', () => {
    it('points aria-controls at the listbox id', () => {
      const wrapper = createWrapper()
      const input = wrapper.find('input')
      const listbox = wrapper.find('ul.dads-combobox__suggestions')
      expect(input.attributes('aria-controls')).toBe(listbox.attributes('id'))
    })

    it('reflects aria-activedescendant when an option is active', async () => {
      const wrapper = createWrapper()
      const input = wrapper.find('input')
      await input.trigger('focus')
      await input.trigger('keydown', { key: 'ArrowDown' })
      const options = wrapper.findAll('li.dads-combobox__suggestion')
      expect(input.attributes('aria-activedescendant')).toBe(options[1].attributes('id'))
    })

    it('marks the active option with aria-selected="true"', async () => {
      const wrapper = createWrapper()
      const input = wrapper.find('input')
      await input.trigger('focus')
      const options = wrapper.findAll('li.dads-combobox__suggestion')
      expect(options[0].attributes('aria-selected')).toBe('true')
      expect(options[1].attributes('aria-selected')).toBe('false')
    })

    it('renders aria-disabled on disabled options', async () => {
      const wrapper = createWrapper({ items: itemsWithDisabled })
      await wrapper.find('input').trigger('focus')
      const options = wrapper.findAll('li.dads-combobox__suggestion')
      expect(options[1].attributes('aria-disabled')).toBe('true')
    })

    it('uses the explicit id when provided and links the label', () => {
      const wrapper = createWrapper({ label: 'X', id: 'my-combo' })
      expect(wrapper.find('input').attributes('id')).toBe('my-combo')
      expect(wrapper.find('label').attributes('for')).toBe('my-combo')
    })

    it('auto-generates unique ids', () => {
      const wrapper = mount({
        components: { DadsCombobox },
        template: `<div>
          <DadsCombobox label="A" />
          <DadsCombobox label="B" />
        </div>`,
      })
      const inputs = wrapper.findAll('input')
      expect(inputs[0].attributes('id')).toBeTruthy()
      expect(inputs[1].attributes('id')).toBeTruthy()
      expect(inputs[0].attributes('id')).not.toBe(inputs[1].attributes('id'))
    })

    it('sets aria-multiselectable on the listbox in multiple mode', async () => {
      const wrapper = createWrapper({ multiple: true })
      await wrapper.find('input').trigger('focus')
      expect(wrapper.find('ul.dads-combobox__suggestions').attributes('aria-multiselectable')).toBe(
        'true',
      )
    })
  })

  describe('item-value / item-title', () => {
    it('reads value and title from custom keys', () => {
      const items = [
        { id: 1, label: 'One' },
        { id: 2, label: 'Two' },
      ] as unknown as DadsComboboxItem[]
      const wrapper = mount(DadsCombobox, {
        props: {
          items,
          itemValue: 'id',
          itemTitle: 'label',
          modelValue: 2,
        },
      })
      expect((wrapper.find('input').element as HTMLInputElement).value).toBe('Two')
    })

    it('emits the value pulled from the custom value key', async () => {
      const items = [{ id: 99, label: 'Foo' }] as unknown as DadsComboboxItem[]
      const wrapper = mount(DadsCombobox, {
        props: { items, itemValue: 'id', itemTitle: 'label', modelValue: '' },
        attachTo: document.body,
      })
      await wrapper.find('input').trigger('focus')
      await wrapper.find('li.dads-combobox__suggestion').trigger('mousedown')
      expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toBe(99)
    })
  })

  describe('disabled item', () => {
    it('does not select on mousedown', async () => {
      const wrapper = createWrapper({
        items: itemsWithDisabled,
        modelValue: '',
      })
      await wrapper.find('input').trigger('focus')
      const options = wrapper.findAll('li.dads-combobox__suggestion')
      await options[1].trigger('mousedown')
      expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    })
  })

  describe('required', () => {
    it('renders the required marker', () => {
      const wrapper = createWrapper({ label: '果物', required: true })
      expect(wrapper.find('.dads-combobox__required').exists()).toBe(true)
    })

    it('sets aria-required on the input', () => {
      const wrapper = createWrapper({ required: true })
      expect(wrapper.find('input').attributes('aria-required')).toBe('true')
    })

    it('renders the default 必須 label when required is true', () => {
      const wrapper = createWrapper({ label: '果物', required: true })
      expect(wrapper.find('.dads-combobox__required').text()).toBe('必須')
    })

    it('renders a custom requiredLabel when provided (i18n override)', () => {
      const wrapper = createWrapper({
        label: '果物',
        required: true,
        requiredLabel: 'Required',
      })
      expect(wrapper.find('.dads-combobox__required').text()).toBe('Required')
    })
  })

  describe('disabled', () => {
    it('sets the disabled attribute on the input', () => {
      const wrapper = createWrapper({ disabled: true })
      expect(wrapper.find('input').attributes('disabled')).toBeDefined()
    })

    it('applies the disabled modifier class', () => {
      const wrapper = createWrapper({ disabled: true })
      expect(wrapper.classes()).toContain('dads-combobox--disabled')
    })

    it('does not open the listbox', async () => {
      const wrapper = createWrapper({ disabled: true })
      await wrapper.find('input').trigger('focus')
      expect(wrapper.find('input').attributes('aria-expanded')).toBe('false')
    })
  })

  describe('readonly', () => {
    it('applies the readonly modifier class', () => {
      const wrapper = createWrapper({ readonly: true })
      expect(wrapper.classes()).toContain('dads-combobox--readonly')
    })

    it('does not open the listbox', async () => {
      const wrapper = createWrapper({ readonly: true })
      await wrapper.find('input').trigger('focus')
      expect(wrapper.find('input').attributes('aria-expanded')).toBe('false')
    })
  })

  describe('error / errorMessage', () => {
    it('renders the error message with role="alert"', () => {
      const wrapper = createWrapper({ errorMessage: '必須項目です' })
      const error = wrapper.find('.dads-combobox__error')
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
      expect(wrapper.classes()).toContain('dads-combobox--error')
      expect(wrapper.find('input').attributes('aria-invalid')).toBe('true')
    })

    it('hides the hint when an error message is shown', () => {
      const wrapper = createWrapper({ hint: 'ヒント', errorMessage: 'エラー' })
      expect(wrapper.find('.dads-combobox__hint').exists()).toBe(false)
      expect(wrapper.find('.dads-combobox__error').exists()).toBe(true)
    })
  })

  describe('hint', () => {
    it('renders the hint when provided', () => {
      const wrapper = createWrapper({ hint: 'メモ' })
      const hint = wrapper.find('.dads-combobox__hint')
      expect(hint.exists()).toBe(true)
      expect(hint.text()).toBe('メモ')
    })

    it('points aria-describedby at the hint id', () => {
      const wrapper = createWrapper({ hint: 'メモ' })
      const hintId = wrapper.find('.dads-combobox__hint').attributes('id')
      expect(wrapper.find('input').attributes('aria-describedby')).toBe(hintId)
    })
  })

  describe('placeholder', () => {
    it('renders the placeholder when no value is selected', () => {
      const wrapper = createWrapper({ placeholder: '選択または入力' })
      expect(wrapper.find('input').attributes('placeholder')).toBe('選択または入力')
    })

    it('clears the placeholder when chips are present in multiple mode', () => {
      const wrapper = createWrapper({
        multiple: true,
        modelValue: ['a'],
        placeholder: 'should hide',
      })
      expect(wrapper.find('input').attributes('placeholder')).toBe('')
    })
  })

  describe('events', () => {
    it('emits focus and blur', async () => {
      const wrapper = createWrapper()
      await wrapper.find('input').trigger('focus')
      await wrapper.find('input').trigger('blur')
      expect(wrapper.emitted('focus')).toHaveLength(1)
      expect(wrapper.emitted('blur')).toHaveLength(1)
    })
  })

  describe('items reactivity', () => {
    it('updates input display when modelValue changes after items match', async () => {
      const wrapper = createWrapper({ modelValue: 'a' })
      expect((wrapper.find('input').element as HTMLInputElement).value).toBe('Apple')
      await wrapper.setProps({ modelValue: 'b' })
      expect((wrapper.find('input').element as HTMLInputElement).value).toBe('Banana')
    })
  })

  describe('a11y (vitest-axe)', () => {
    it('has no violations with a visible label', async () => {
      const wrapper = createWrapper({ label: '果物', modelValue: null })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations with a hint message', async () => {
      const wrapper = createWrapper({
        label: '果物',
        hint: '頭文字を入力して候補を絞り込めます',
        modelValue: null,
      })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations when required', async () => {
      const wrapper = createWrapper({ label: '果物', required: true, modelValue: null })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations in error state with a message', async () => {
      const wrapper = createWrapper({
        label: '果物',
        errorMessage: '必須項目です',
        modelValue: null,
      })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations in disabled state', async () => {
      const wrapper = createWrapper({ label: '果物', disabled: true, modelValue: null })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations in multi-select mode with chips', async () => {
      const wrapper = createWrapper({
        label: '果物',
        multiple: true,
        modelValue: ['a', 'b'],
      })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })
  })
})
