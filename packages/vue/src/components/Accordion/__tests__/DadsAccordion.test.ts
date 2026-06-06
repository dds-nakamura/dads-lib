import { afterEach, describe, expect, it } from 'vitest'
import { enableAutoUnmount, mount } from '@vue/test-utils'
import { axe } from 'vitest-axe'
import { nextTick } from 'vue'
import DadsAccordion from '../DadsAccordion.vue'
import DadsIcon from '../../Icon/DadsIcon.vue'
import type { DadsAccordionItem, DadsAccordionProps } from '../DadsAccordion.types'

enableAutoUnmount(afterEach)

const items: DadsAccordionItem[] = [
  { id: 'a', title: 'Section A' },
  { id: 'b', title: 'Section B' },
  { id: 'c', title: 'Section C' },
]

const createWrapper = (
  props: Partial<DadsAccordionProps> = {},
  slots: Record<string, string> = {},
) =>
  mount(DadsAccordion, {
    props: { items, ...props } as DadsAccordionProps,
    slots,
    attachTo: document.body,
  })

describe('DadsAccordion', () => {
  describe('rendering', () => {
    it('renders a root element with the dads-accordion class', () => {
      const wrapper = createWrapper()
      expect(wrapper.classes()).toContain('dads-accordion')
    })

    it('renders one item per entry in items', () => {
      const wrapper = createWrapper()
      expect(wrapper.findAll('.dads-accordion__item')).toHaveLength(3)
    })

    it('wraps each header button in an h3', () => {
      const wrapper = createWrapper()
      const headings = wrapper.findAll('h3.dads-accordion__heading')
      expect(headings).toHaveLength(3)
      headings.forEach((h) => {
        expect(h.find('button.dads-accordion__header').exists()).toBe(true)
      })
    })

    it('renders the title text in each header', () => {
      const wrapper = createWrapper()
      const headers = wrapper.findAll('.dads-accordion__header')
      expect(headers[0].text()).toContain('Section A')
      expect(headers[1].text()).toContain('Section B')
      expect(headers[2].text()).toContain('Section C')
    })

    it('renders one panel per item with role="region"', () => {
      const wrapper = createWrapper()
      const panels = wrapper.findAll('.dads-accordion__panel')
      expect(panels).toHaveLength(3)
      panels.forEach((p) => {
        expect(p.attributes('role')).toBe('region')
      })
    })

    it('always uses a single keyboard_arrow_down chevron (rotation handled by CSS on open)', () => {
      const wrapper = createWrapper({ modelValue: 'a' })
      const icons = wrapper.findAllComponents(DadsIcon)
      for (const icon of icons) {
        expect(icon.props('name')).toBe('keyboard_arrow_down')
      }
      // The open item carries the --open modifier; CSS rotates its icon 180°.
      const openItem = wrapper.find('.dads-accordion__item--open')
      expect(openItem.exists()).toBe(true)
      expect(openItem.find('.dads-accordion__icon svg.dads-icon').exists()).toBe(true)
    })

    it('renders the chevron as an inline svg.dads-icon', () => {
      const wrapper = createWrapper({ modelValue: 'a' })
      expect(wrapper.findAll('.dads-accordion__icon svg.dads-icon')).toHaveLength(3)
    })
  })

  describe('ARIA attributes', () => {
    it('reflects open state in aria-expanded', () => {
      const wrapper = createWrapper({ modelValue: 'b' })
      const headers = wrapper.findAll('.dads-accordion__header')
      expect(headers[0].attributes('aria-expanded')).toBe('false')
      expect(headers[1].attributes('aria-expanded')).toBe('true')
      expect(headers[2].attributes('aria-expanded')).toBe('false')
    })

    it('wires aria-controls to the matching panel id', () => {
      const wrapper = createWrapper()
      const headers = wrapper.findAll('.dads-accordion__header')
      const panels = wrapper.findAll('.dads-accordion__panel')
      headers.forEach((h, idx) => {
        expect(h.attributes('aria-controls')).toBe(panels[idx].attributes('id'))
      })
    })

    it('wires aria-labelledby on each panel back to its header id', () => {
      const wrapper = createWrapper()
      const headers = wrapper.findAll('.dads-accordion__header')
      const panels = wrapper.findAll('.dads-accordion__panel')
      headers.forEach((h, idx) => {
        expect(panels[idx].attributes('aria-labelledby')).toBe(h.attributes('id'))
      })
    })
  })

  describe('single mode (default)', () => {
    it('marks only the matching item as open via the --open class', () => {
      const wrapper = createWrapper({ modelValue: 'b' })
      const itemNodes = wrapper.findAll('.dads-accordion__item')
      expect(itemNodes[0].classes()).not.toContain('dads-accordion__item--open')
      expect(itemNodes[1].classes()).toContain('dads-accordion__item--open')
      expect(itemNodes[2].classes()).not.toContain('dads-accordion__item--open')
    })

    it('hides inactive panels via v-show', () => {
      const wrapper = createWrapper({ modelValue: 'a' })
      const panels = wrapper.findAll('.dads-accordion__panel')
      expect((panels[0].element as HTMLElement).style.display).toBe('')
      expect((panels[1].element as HTMLElement).style.display).toBe('none')
      expect((panels[2].element as HTMLElement).style.display).toBe('none')
    })

    it('emits the new id when clicking a closed header', async () => {
      const wrapper = createWrapper({ modelValue: 'a' })
      await wrapper.findAll('.dads-accordion__header')[1].trigger('click')
      expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toBe('b')
    })

    it('emits an empty string when re-clicking the open header', async () => {
      const wrapper = createWrapper({ modelValue: 'a' })
      await wrapper.findAll('.dads-accordion__header')[0].trigger('click')
      expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toBe('')
    })

    it('opens the new panel when modelValue changes', async () => {
      const wrapper = createWrapper({ modelValue: 'a' })
      await wrapper.setProps({ modelValue: 'c' })
      const itemNodes = wrapper.findAll('.dads-accordion__item')
      expect(itemNodes[0].classes()).not.toContain('dads-accordion__item--open')
      expect(itemNodes[2].classes()).toContain('dads-accordion__item--open')
    })

    it('renders no panel as open when modelValue is empty', () => {
      const wrapper = createWrapper({ modelValue: '' })
      const panels = wrapper.findAll('.dads-accordion__panel')
      panels.forEach((p) => {
        expect((p.element as HTMLElement).style.display).toBe('none')
      })
    })
  })

  describe('multiple mode', () => {
    it('opens every panel listed in modelValue', () => {
      const wrapper = createWrapper({
        type: 'multiple',
        modelValue: ['a', 'c'],
      })
      const itemNodes = wrapper.findAll('.dads-accordion__item')
      expect(itemNodes[0].classes()).toContain('dads-accordion__item--open')
      expect(itemNodes[1].classes()).not.toContain('dads-accordion__item--open')
      expect(itemNodes[2].classes()).toContain('dads-accordion__item--open')
    })

    it('appends a clicked id to the open list', async () => {
      const wrapper = createWrapper({
        type: 'multiple',
        modelValue: ['a'],
      })
      await wrapper.findAll('.dads-accordion__header')[1].trigger('click')
      expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toEqual(['a', 'b'])
    })

    it('removes a clicked id when it is already open', async () => {
      const wrapper = createWrapper({
        type: 'multiple',
        modelValue: ['a', 'b'],
      })
      await wrapper.findAll('.dads-accordion__header')[0].trigger('click')
      expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toEqual(['b'])
    })

    it('treats an undefined modelValue as an empty open list', async () => {
      const wrapper = createWrapper({ type: 'multiple' })
      await wrapper.findAll('.dads-accordion__header')[2].trigger('click')
      expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toEqual(['c'])
    })
  })

  describe('disabled item handling', () => {
    const itemsWithDisabled: DadsAccordionItem[] = [
      { id: 'a', title: 'A' },
      { id: 'b', title: 'B', disabled: true },
      { id: 'c', title: 'C' },
    ]

    it('applies the --disabled class to a disabled item', () => {
      const wrapper = createWrapper({ items: itemsWithDisabled })
      const itemNodes = wrapper.findAll('.dads-accordion__item')
      expect(itemNodes[1].classes()).toContain('dads-accordion__item--disabled')
    })

    it('renders the native disabled attribute on a disabled header', () => {
      const wrapper = createWrapper({ items: itemsWithDisabled })
      const headers = wrapper.findAll('.dads-accordion__header')
      expect(headers[1].attributes('disabled')).toBeDefined()
    })

    it('does not emit when clicking a disabled header', async () => {
      const wrapper = createWrapper({ items: itemsWithDisabled })
      await wrapper.findAll('.dads-accordion__header')[1].trigger('click')
      expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    })

    it('skips disabled headers on ArrowDown', async () => {
      const wrapper = createWrapper({ items: itemsWithDisabled })
      const headers = wrapper.findAll('.dads-accordion__header')
      await headers[0].trigger('keydown', { key: 'ArrowDown' })
      await nextTick()
      expect(document.activeElement).toBe(headers[2].element)
    })

    it('skips disabled headers on ArrowUp', async () => {
      const wrapper = createWrapper({ items: itemsWithDisabled })
      const headers = wrapper.findAll('.dads-accordion__header')
      await headers[2].trigger('keydown', { key: 'ArrowUp' })
      await nextTick()
      expect(document.activeElement).toBe(headers[0].element)
    })
  })

  describe('keyboard navigation', () => {
    it('moves focus to the next header on ArrowDown', async () => {
      const wrapper = createWrapper()
      const headers = wrapper.findAll('.dads-accordion__header')
      await headers[0].trigger('keydown', { key: 'ArrowDown' })
      await nextTick()
      expect(document.activeElement).toBe(headers[1].element)
    })

    it('moves focus to the previous header on ArrowUp', async () => {
      const wrapper = createWrapper()
      const headers = wrapper.findAll('.dads-accordion__header')
      await headers[2].trigger('keydown', { key: 'ArrowUp' })
      await nextTick()
      expect(document.activeElement).toBe(headers[1].element)
    })

    it('wraps from the last header to the first on ArrowDown', async () => {
      const wrapper = createWrapper()
      const headers = wrapper.findAll('.dads-accordion__header')
      await headers[2].trigger('keydown', { key: 'ArrowDown' })
      await nextTick()
      expect(document.activeElement).toBe(headers[0].element)
    })

    it('wraps from the first header to the last on ArrowUp', async () => {
      const wrapper = createWrapper()
      const headers = wrapper.findAll('.dads-accordion__header')
      await headers[0].trigger('keydown', { key: 'ArrowUp' })
      await nextTick()
      expect(document.activeElement).toBe(headers[2].element)
    })

    it('jumps to the first header on Home', async () => {
      const wrapper = createWrapper()
      const headers = wrapper.findAll('.dads-accordion__header')
      await headers[2].trigger('keydown', { key: 'Home' })
      await nextTick()
      expect(document.activeElement).toBe(headers[0].element)
    })

    it('jumps to the last header on End', async () => {
      const wrapper = createWrapper()
      const headers = wrapper.findAll('.dads-accordion__header')
      await headers[0].trigger('keydown', { key: 'End' })
      await nextTick()
      expect(document.activeElement).toBe(headers[2].element)
    })

    it('ignores unrelated keys', async () => {
      const wrapper = createWrapper()
      const headers = wrapper.findAll('.dads-accordion__header')
      headers[0].element.focus()
      await headers[0].trigger('keydown', { key: 'a' })
      await headers[0].trigger('keydown', { key: 'Escape' })
      await nextTick()
      // Focus stays on the original header.
      expect(document.activeElement).toBe(headers[0].element)
    })

    it('does not emit update:modelValue on arrow keys', async () => {
      const wrapper = createWrapper({ modelValue: 'a' })
      const headers = wrapper.findAll('.dads-accordion__header')
      await headers[0].trigger('keydown', { key: 'ArrowDown' })
      await headers[0].trigger('keydown', { key: 'ArrowUp' })
      await headers[0].trigger('keydown', { key: 'Home' })
      await headers[0].trigger('keydown', { key: 'End' })
      expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    })
  })

  describe('slots', () => {
    it('renders the matching panel-{id} slot inside each panel', () => {
      const wrapper = createWrapper(
        { modelValue: 'a' },
        {
          'panel-a': '<p class="body-a">Body A</p>',
          'panel-b': '<p class="body-b">Body B</p>',
        },
      )
      const panels = wrapper.findAll('.dads-accordion__panel')
      expect(panels[0].find('.body-a').exists()).toBe(true)
      // panel-b slot still mounts (only display is toggled), but lives inside its own panel.
      expect(panels[1].find('.body-b').exists()).toBe(true)
      expect(panels[0].find('.body-b').exists()).toBe(false)
    })
  })

  describe('id wiring', () => {
    it('produces unique header/panel ids per instance', () => {
      const wrapper = mount({
        components: { DadsAccordion },
        data() {
          return { items, modelValue: 'a' }
        },
        template: `
          <div>
            <DadsAccordion :items="items" v-model="modelValue" />
            <DadsAccordion :items="items" v-model="modelValue" />
          </div>
        `,
        attachTo: document.body,
      })
      const allHeaders = wrapper.findAll('.dads-accordion__header')
      const ids = allHeaders.map((h) => h.attributes('id'))
      expect(new Set(ids).size).toBe(ids.length)
    })
  })

  describe('size', () => {
    it('applies the size-m modifier by default', () => {
      const wrapper = createWrapper()
      expect(wrapper.classes()).toContain('dads-accordion--size-m')
    })

    it.each(['l', 'm', 's', 'xs'] as const)('applies dads-accordion--size-%s', (s) => {
      const wrapper = createWrapper({ size: s })
      expect(wrapper.classes()).toContain(`dads-accordion--size-${s}`)
    })
  })

  describe('returnLink', () => {
    it('does not render a return link by default', () => {
      const wrapper = createWrapper({ modelValue: 'a' })
      expect(wrapper.find('.dads-accordion__return-link').exists()).toBe(false)
    })

    it('renders the return link in every open panel when prop is set', () => {
      const wrapper = createWrapper({
        modelValue: 'a',
        returnLink: { label: 'ページのトップへ戻る', href: '#top' },
      })
      const link = wrapper.find('.dads-accordion__return-link a')
      expect(link.exists()).toBe(true)
      expect(link.attributes('href')).toBe('#top')
      expect(link.text()).toBe('ページのトップへ戻る')
    })
  })

  describe('a11y (vitest-axe)', () => {
    it('has no violations when all panels are collapsed', async () => {
      const wrapper = createWrapper({ modelValue: '' })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations when a single panel is open', async () => {
      const wrapper = createWrapper(
        { modelValue: 'a' },
        {
          'panel-a': '<p>A の内容</p>',
          'panel-b': '<p>B の内容</p>',
          'panel-c': '<p>C の内容</p>',
        },
      )
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations in multiple mode with two panels open', async () => {
      const wrapper = createWrapper(
        { type: 'multiple', modelValue: ['a', 'c'] },
        {
          'panel-a': '<p>A の内容</p>',
          'panel-b': '<p>B の内容</p>',
          'panel-c': '<p>C の内容</p>',
        },
      )
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations with a disabled item', async () => {
      const wrapper = createWrapper({
        modelValue: '',
        items: [
          { id: 'a', title: 'A' },
          { id: 'b', title: 'B (準備中)', disabled: true },
        ],
      })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations with a return link in an open panel', async () => {
      const wrapper = createWrapper(
        {
          modelValue: 'a',
          returnLink: { label: 'ページのトップへ戻る', href: '#top' },
        },
        { 'panel-a': '<p>A の内容</p>' },
      )
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })
  })
})
