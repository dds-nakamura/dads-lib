import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { enableAutoUnmount, mount } from '@vue/test-utils'
import { axe } from 'vitest-axe'
import { nextTick } from 'vue'
import DadsSelect from '../DadsSelect.vue'
import type { DadsSelectItem, DadsSelectProps } from '../DadsSelect.types'

enableAutoUnmount(afterEach)

const defaultItems: DadsSelectItem[] = [
  { value: 'a', title: 'Apple' },
  { value: 'b', title: 'Banana' },
  { value: 'c', title: 'Cherry' },
]

const itemsWithDisabled: DadsSelectItem[] = [
  { value: 'a', title: 'Apple' },
  { value: 'b', title: 'Banana', disabled: true },
  { value: 'c', title: 'Cherry' },
]

const createWrapper = (props: Partial<DadsSelectProps> = {}) =>
  mount(DadsSelect, {
    props: { items: defaultItems, ...props },
    attachTo: document.body,
  })

describe('DadsSelect', () => {
  describe('rendering', () => {
    it('renders a trigger button by default', () => {
      const wrapper = createWrapper()
      expect(wrapper.find('button.dads-select__trigger').exists()).toBe(true)
    })

    it('hides the listbox initially', () => {
      const wrapper = createWrapper()
      const listbox = wrapper.find('ul.dads-select__listbox')
      expect(listbox.exists()).toBe(true)
      expect(listbox.attributes('style')).toContain('display: none')
    })

    it('renders the label when provided', () => {
      const wrapper = createWrapper({ label: '果物' })
      const label = wrapper.find('label.dads-select__label')
      expect(label.exists()).toBe(true)
      expect(label.text()).toContain('果物')
    })

    it('does not render the footer when there is no hint or error', () => {
      const wrapper = createWrapper()
      expect(wrapper.find('.dads-select__footer').exists()).toBe(false)
    })
  })

  describe('size', () => {
    it.each(['lg', 'md', 'sm'] as const)('applies dads-select--%s class', (size) => {
      const wrapper = createWrapper({ size })
      expect(wrapper.classes()).toContain(`dads-select--${size}`)
    })
  })

  describe('open / close', () => {
    it('opens on trigger click', async () => {
      const wrapper = createWrapper()
      await wrapper.find('button').trigger('click')
      expect(wrapper.find('button').attributes('aria-expanded')).toBe('true')
      // v-show toggles `display: none` inline; once open, the style attribute
      // is either absent or has no display:none.
      const listboxStyle = wrapper.find('ul.dads-select__listbox').attributes('style') ?? ''
      expect(listboxStyle).not.toContain('display: none')
    })

    it('toggles closed on a second click', async () => {
      const wrapper = createWrapper()
      await wrapper.find('button').trigger('click')
      await wrapper.find('button').trigger('click')
      expect(wrapper.find('button').attributes('aria-expanded')).toBe('false')
    })

    it('opens with ArrowDown when closed', async () => {
      const wrapper = createWrapper()
      await wrapper.find('button').trigger('keydown', { key: 'ArrowDown' })
      expect(wrapper.find('button').attributes('aria-expanded')).toBe('true')
    })

    it('opens with Enter when closed', async () => {
      const wrapper = createWrapper()
      await wrapper.find('button').trigger('keydown', { key: 'Enter' })
      expect(wrapper.find('button').attributes('aria-expanded')).toBe('true')
    })

    it('closes on Escape and returns focus to the trigger', async () => {
      const wrapper = createWrapper()
      const button = wrapper.find('button').element as HTMLButtonElement
      button.focus()
      await wrapper.find('button').trigger('click')
      await wrapper.find('button').trigger('keydown', { key: 'Escape' })
      expect(wrapper.find('button').attributes('aria-expanded')).toBe('false')
      expect(document.activeElement).toBe(button)
    })

    it('closes on outside pointerdown', async () => {
      const wrapper = createWrapper()
      await wrapper.find('button').trigger('click')
      expect(wrapper.find('button').attributes('aria-expanded')).toBe('true')

      const outside = document.createElement('div')
      document.body.appendChild(outside)
      outside.dispatchEvent(new MouseEvent('pointerdown', { bubbles: true }))
      await nextTick()

      expect(wrapper.find('button').attributes('aria-expanded')).toBe('false')
      outside.remove()
    })

    it('closes on Tab keydown', async () => {
      const wrapper = createWrapper()
      await wrapper.find('button').trigger('click')
      await wrapper.find('button').trigger('keydown', { key: 'Tab' })
      expect(wrapper.find('button').attributes('aria-expanded')).toBe('false')
    })

    it('emits open and close events', async () => {
      const wrapper = createWrapper()
      await wrapper.find('button').trigger('click')
      await wrapper.find('button').trigger('keydown', { key: 'Escape' })
      expect(wrapper.emitted('open')).toHaveLength(1)
      expect(wrapper.emitted('close')).toHaveLength(1)
    })
  })

  describe('v-model (single)', () => {
    it('emits update:modelValue with the chosen value', async () => {
      const wrapper = createWrapper({ modelValue: null })
      await wrapper.find('button').trigger('click')
      const options = wrapper.findAll('li.dads-select__option')
      await options[1].trigger('click')
      expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toBe('b')
      expect(wrapper.emitted('change')?.[0]?.[0]).toBe('b')
    })

    it('renders the title of the currently selected value', () => {
      const wrapper = createWrapper({ modelValue: 'c' })
      expect(wrapper.find('.dads-select__value').text()).toBe('Cherry')
    })

    it('closes the listbox after selection', async () => {
      const wrapper = createWrapper({ modelValue: null })
      await wrapper.find('button').trigger('click')
      await wrapper.findAll('li.dads-select__option')[0].trigger('click')
      expect(wrapper.find('button').attributes('aria-expanded')).toBe('false')
    })
  })

  describe('v-model (multiple)', () => {
    it('emits an array containing the toggled value', async () => {
      const wrapper = createWrapper({ multiple: true, modelValue: [] })
      await wrapper.find('button').trigger('click')
      await wrapper.findAll('li.dads-select__option')[0].trigger('click')
      expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toEqual(['a'])
    })

    it('toggles values off when clicked again', async () => {
      const wrapper = createWrapper({
        multiple: true,
        modelValue: ['a', 'b'],
      })
      await wrapper.find('button').trigger('click')
      await wrapper.findAll('li.dads-select__option')[0].trigger('click')
      expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toEqual(['b'])
    })

    it('renders chip tags for each selected value', () => {
      const wrapper = createWrapper({
        multiple: true,
        modelValue: ['a', 'c'],
      })
      const tags = wrapper.findAll('.dads-select__tag')
      expect(tags).toHaveLength(2)
      expect(tags[0].text()).toContain('Apple')
      expect(tags[1].text()).toContain('Cherry')
    })

    it('removes a single tag when its × button is clicked', async () => {
      const wrapper = createWrapper({
        multiple: true,
        modelValue: ['a', 'b'],
      })
      await wrapper.find('.dads-select__tag-remove').trigger('click')
      expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toEqual(['b'])
    })

    it('keeps the listbox open after selection in multiple mode', async () => {
      const wrapper = createWrapper({ multiple: true, modelValue: [] })
      await wrapper.find('button').trigger('click')
      await wrapper.findAll('li.dads-select__option')[0].trigger('click')
      expect(wrapper.find('button').attributes('aria-expanded')).toBe('true')
    })

    it('sets aria-multiselectable on the listbox', async () => {
      const wrapper = createWrapper({ multiple: true })
      await wrapper.find('button').trigger('click')
      expect(wrapper.find('ul.dads-select__listbox').attributes('aria-multiselectable')).toBe(
        'true',
      )
    })
  })

  describe('keyboard navigation', () => {
    it('moves the cursor to the next option on ArrowDown', async () => {
      const wrapper = createWrapper()
      await wrapper.find('button').trigger('click')
      await wrapper.find('button').trigger('keydown', { key: 'ArrowDown' })
      const options = wrapper.findAll('li.dads-select__option')
      expect(options[1].classes()).toContain('dads-select__option--active')
    })

    it('moves the cursor to the previous option on ArrowUp', async () => {
      const wrapper = createWrapper()
      await wrapper.find('button').trigger('click')
      await wrapper.find('button').trigger('keydown', { key: 'ArrowDown' })
      await wrapper.find('button').trigger('keydown', { key: 'ArrowUp' })
      const options = wrapper.findAll('li.dads-select__option')
      expect(options[0].classes()).toContain('dads-select__option--active')
    })

    it('jumps to the first option on Home', async () => {
      const wrapper = createWrapper()
      await wrapper.find('button').trigger('click')
      await wrapper.find('button').trigger('keydown', { key: 'ArrowDown' })
      await wrapper.find('button').trigger('keydown', { key: 'ArrowDown' })
      await wrapper.find('button').trigger('keydown', { key: 'Home' })
      const options = wrapper.findAll('li.dads-select__option')
      expect(options[0].classes()).toContain('dads-select__option--active')
    })

    it('jumps to the last option on End', async () => {
      const wrapper = createWrapper()
      await wrapper.find('button').trigger('click')
      await wrapper.find('button').trigger('keydown', { key: 'End' })
      const options = wrapper.findAll('li.dads-select__option')
      expect(options[2].classes()).toContain('dads-select__option--active')
    })

    it('selects the active item on Enter', async () => {
      const wrapper = createWrapper({ modelValue: null })
      await wrapper.find('button').trigger('click')
      await wrapper.find('button').trigger('keydown', { key: 'ArrowDown' })
      await wrapper.find('button').trigger('keydown', { key: 'Enter' })
      expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toBe('b')
    })

    it('skips disabled items on ArrowDown', async () => {
      const wrapper = createWrapper({ items: itemsWithDisabled })
      await wrapper.find('button').trigger('click')
      // Initial active is index 0 (Apple). ArrowDown should skip Banana
      // (disabled) and land on Cherry.
      await wrapper.find('button').trigger('keydown', { key: 'ArrowDown' })
      const options = wrapper.findAll('li.dads-select__option')
      expect(options[2].classes()).toContain('dads-select__option--active')
    })
  })

  describe('type-ahead', () => {
    beforeEach(() => {
      vi.useFakeTimers()
    })
    afterEach(() => {
      vi.useRealTimers()
    })

    it('jumps to the first option whose title starts with the typed letter', async () => {
      const wrapper = createWrapper()
      await wrapper.find('button').trigger('click')
      await wrapper.find('button').trigger('keydown', { key: 'c' })
      const options = wrapper.findAll('li.dads-select__option')
      expect(options[2].classes()).toContain('dads-select__option--active')
    })

    it('combines successive letters within the buffer window', async () => {
      const items: DadsSelectItem[] = [
        { value: 1, title: 'Banana' },
        { value: 2, title: 'Banner' },
        { value: 3, title: 'Carrot' },
      ]
      const wrapper = createWrapper({ items })
      await wrapper.find('button').trigger('click')
      await wrapper.find('button').trigger('keydown', { key: 'b' })
      await wrapper.find('button').trigger('keydown', { key: 'a' })
      await wrapper.find('button').trigger('keydown', { key: 'n' })
      await wrapper.find('button').trigger('keydown', { key: 'n' })
      const options = wrapper.findAll('li.dads-select__option')
      expect(options[1].classes()).toContain('dads-select__option--active')
    })

    it('matches case-insensitively', async () => {
      const wrapper = createWrapper()
      await wrapper.find('button').trigger('click')
      await wrapper.find('button').trigger('keydown', { key: 'B' })
      const options = wrapper.findAll('li.dads-select__option')
      expect(options[1].classes()).toContain('dads-select__option--active')
    })
  })

  describe('item-value / item-title', () => {
    it('reads value and title from custom keys', () => {
      const items = [
        { id: 1, label: 'One' },
        { id: 2, label: 'Two' },
      ] as unknown as DadsSelectItem[]
      const wrapper = mount(DadsSelect, {
        props: {
          items,
          itemValue: 'id',
          itemTitle: 'label',
          modelValue: 2,
        },
      })
      expect(wrapper.find('.dads-select__value').text()).toBe('Two')
    })

    it('emits the value pulled from the custom value key', async () => {
      const items = [{ id: 99, label: 'Foo' }] as unknown as DadsSelectItem[]
      const wrapper = mount(DadsSelect, {
        props: { items, itemValue: 'id', itemTitle: 'label', modelValue: null },
        attachTo: document.body,
      })
      await wrapper.find('button').trigger('click')
      await wrapper.find('li.dads-select__option').trigger('click')
      expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toBe(99)
    })
  })

  describe('disabled item', () => {
    it('does not select on click', async () => {
      const wrapper = createWrapper({ items: itemsWithDisabled, modelValue: null })
      await wrapper.find('button').trigger('click')
      const options = wrapper.findAll('li.dads-select__option')
      await options[1].trigger('click')
      expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    })

    it('renders aria-disabled on the option', async () => {
      const wrapper = createWrapper({ items: itemsWithDisabled })
      await wrapper.find('button').trigger('click')
      const options = wrapper.findAll('li.dads-select__option')
      expect(options[1].attributes('aria-disabled')).toBe('true')
    })
  })

  describe('required', () => {
    it('renders the required marker', () => {
      const wrapper = createWrapper({ label: '果物', required: true })
      expect(wrapper.find('.dads-select__required').exists()).toBe(true)
    })

    it('sets aria-required on the trigger', () => {
      const wrapper = createWrapper({ required: true })
      expect(wrapper.find('button').attributes('aria-required')).toBe('true')
    })

    it('renders the default 必須 label when required is true', () => {
      const wrapper = createWrapper({ label: '果物', required: true })
      expect(wrapper.find('.dads-select__required').text()).toBe('必須')
    })

    it('renders a custom requiredLabel when provided (i18n override)', () => {
      const wrapper = createWrapper({
        label: '果物',
        required: true,
        requiredLabel: 'Required',
      })
      expect(wrapper.find('.dads-select__required').text()).toBe('Required')
    })
  })

  describe('disabled', () => {
    it('sets the disabled attribute on the trigger', () => {
      const wrapper = createWrapper({ disabled: true })
      expect(wrapper.find('button').attributes('disabled')).toBeDefined()
    })

    it('applies the disabled modifier class', () => {
      const wrapper = createWrapper({ disabled: true })
      expect(wrapper.classes()).toContain('dads-select--disabled')
    })

    it('does not open the listbox', async () => {
      const wrapper = createWrapper({ disabled: true })
      await wrapper.find('button').trigger('click')
      expect(wrapper.find('button').attributes('aria-expanded')).toBe('false')
    })
  })

  describe('readonly', () => {
    it('applies the readonly modifier class', () => {
      const wrapper = createWrapper({ readonly: true })
      expect(wrapper.classes()).toContain('dads-select--readonly')
    })

    it('does not open the listbox', async () => {
      const wrapper = createWrapper({ readonly: true })
      await wrapper.find('button').trigger('click')
      expect(wrapper.find('button').attributes('aria-expanded')).toBe('false')
    })
  })

  describe('error / errorMessage', () => {
    it('renders the error message with role="alert"', () => {
      const wrapper = createWrapper({ errorMessage: '必須項目です' })
      const error = wrapper.find('.dads-select__error')
      expect(error.exists()).toBe(true)
      expect(error.text()).toBe('必須項目です')
      expect(error.attributes('role')).toBe('alert')
    })

    it('sets aria-invalid when errorMessage is present', () => {
      const wrapper = createWrapper({ errorMessage: 'bad' })
      expect(wrapper.find('button').attributes('aria-invalid')).toBe('true')
    })

    it('honors the explicit error prop', () => {
      const wrapper = createWrapper({ error: true })
      expect(wrapper.classes()).toContain('dads-select--error')
      expect(wrapper.find('button').attributes('aria-invalid')).toBe('true')
    })

    it('hides the hint when an error message is shown', () => {
      const wrapper = createWrapper({ hint: 'ヒント', errorMessage: 'エラー' })
      expect(wrapper.find('.dads-select__hint').exists()).toBe(false)
      expect(wrapper.find('.dads-select__error').exists()).toBe(true)
    })
  })

  describe('hint', () => {
    it('renders the hint when provided', () => {
      const wrapper = createWrapper({ hint: 'メモ' })
      const hint = wrapper.find('.dads-select__hint')
      expect(hint.exists()).toBe(true)
      expect(hint.text()).toBe('メモ')
    })

    it('points aria-describedby at the hint id', () => {
      const wrapper = createWrapper({ hint: 'メモ' })
      const hintId = wrapper.find('.dads-select__hint').attributes('id')
      expect(wrapper.find('button').attributes('aria-describedby')).toBe(hintId)
    })
  })

  describe('placeholder', () => {
    it('renders the placeholder when no value is selected', () => {
      const wrapper = createWrapper({ placeholder: '選択してください' })
      expect(wrapper.find('.dads-select__placeholder').text()).toBe('選択してください')
    })

    it('hides the placeholder once a value is selected', () => {
      const wrapper = createWrapper({
        placeholder: '選択してください',
        modelValue: 'a',
      })
      expect(wrapper.find('.dads-select__placeholder').exists()).toBe(false)
    })
  })

  describe('id wiring', () => {
    it('uses the explicit id when provided', () => {
      const wrapper = createWrapper({ label: 'Field', id: 'my-select' })
      expect(wrapper.find('button').attributes('id')).toBe('my-select')
      expect(wrapper.find('label').attributes('for')).toBe('my-select')
    })

    it('auto-generates a unique id and links the label', () => {
      const wrapper = mount({
        components: { DadsSelect },
        template: `
          <div>
            <DadsSelect label="A" />
            <DadsSelect label="B" />
          </div>
        `,
      })
      const buttons = wrapper.findAll('button')
      const labels = wrapper.findAll('label')
      const idA = buttons[0].attributes('id')
      const idB = buttons[1].attributes('id')
      expect(idA).toBeTruthy()
      expect(idB).toBeTruthy()
      expect(idA).not.toBe(idB)
      expect(labels[0].attributes('for')).toBe(idA)
      expect(labels[1].attributes('for')).toBe(idB)
    })

    it('wires aria-controls to the listbox id', () => {
      const wrapper = createWrapper()
      const button = wrapper.find('button')
      const listbox = wrapper.find('ul.dads-select__listbox')
      expect(button.attributes('aria-controls')).toBe(listbox.attributes('id'))
    })
  })

  describe('aria-activedescendant', () => {
    it('points at the currently active option when open', async () => {
      const wrapper = createWrapper()
      await wrapper.find('button').trigger('click')
      await wrapper.find('button').trigger('keydown', { key: 'ArrowDown' })
      const options = wrapper.findAll('li.dads-select__option')
      expect(wrapper.find('button').attributes('aria-activedescendant')).toBe(
        options[1].attributes('id'),
      )
    })

    it('starts at the currently selected item when opening', async () => {
      const wrapper = createWrapper({ modelValue: 'c' })
      await wrapper.find('button').trigger('click')
      const options = wrapper.findAll('li.dads-select__option')
      expect(options[2].classes()).toContain('dads-select__option--active')
    })
  })

  describe('events', () => {
    it('emits focus and blur', async () => {
      const wrapper = createWrapper()
      await wrapper.find('button').trigger('focus')
      await wrapper.find('button').trigger('blur')
      expect(wrapper.emitted('focus')).toHaveLength(1)
      expect(wrapper.emitted('blur')).toHaveLength(1)
    })
  })

  describe('empty items', () => {
    it('renders the empty placeholder when items is empty', async () => {
      const wrapper = createWrapper({ items: [] })
      await wrapper.find('button').trigger('click')
      expect(wrapper.find('.dads-select__option--empty').exists()).toBe(true)
    })
  })

  describe('prefixIcon', () => {
    it('does not render the prefix icon when prop is omitted', () => {
      const wrapper = createWrapper()
      expect(wrapper.find('.dads-select__prefix-icon').exists()).toBe(false)
    })

    it('renders the prefix icon when prop is set', () => {
      const wrapper = createWrapper({ prefixIcon: 'mdi-magnify' })
      const icon = wrapper.find('.dads-select__prefix-icon')
      expect(icon.exists()).toBe(true)
      expect(icon.classes()).toContain('mdi-magnify')
      expect(icon.attributes('aria-hidden')).toBe('true')
    })
  })

  describe('chips (multiple)', () => {
    it('renders chips by default in multiple mode', () => {
      const wrapper = createWrapper({ multiple: true, modelValue: ['a', 'c'] })
      expect(wrapper.findAll('.dads-select__tag')).toHaveLength(2)
    })

    it('falls back to comma-separated text when chips=false', () => {
      const wrapper = createWrapper({ multiple: true, modelValue: ['a', 'c'], chips: false })
      expect(wrapper.findAll('.dads-select__tag')).toHaveLength(0)
      expect(wrapper.find('.dads-select__value').text()).toBe('Apple, Cherry')
    })
  })

  describe('i18n overrides (chip remove label)', () => {
    it('uses the default Japanese remove aria-label on chip × buttons', () => {
      const wrapper = createWrapper({
        multiple: true,
        modelValue: ['a', 'c'],
      })
      const removeButtons = wrapper.findAll('.dads-select__tag-remove')
      expect(removeButtons[0]?.attributes('aria-label')).toBe('Apple を削除')
      expect(removeButtons[1]?.attributes('aria-label')).toBe('Cherry を削除')
    })

    it('overrides the chip remove aria-label via formatRemoveAriaLabel', () => {
      const wrapper = createWrapper({
        multiple: true,
        modelValue: ['a', 'c'],
        formatRemoveAriaLabel: (title: string) => `Remove ${title}`,
      })
      const removeButtons = wrapper.findAll('.dads-select__tag-remove')
      expect(removeButtons[0]?.attributes('aria-label')).toBe('Remove Apple')
      expect(removeButtons[1]?.attributes('aria-label')).toBe('Remove Cherry')
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
        hint: 'いずれか選んでください',
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

    it('has no violations with a selected value', async () => {
      const wrapper = createWrapper({ label: '果物', modelValue: 'a' })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations in multiple mode with chips', async () => {
      const wrapper = createWrapper({
        label: '果物',
        multiple: true,
        modelValue: ['a', 'c'],
      })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })
  })
})
