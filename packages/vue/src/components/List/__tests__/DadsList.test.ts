import { afterEach, describe, expect, it } from 'vitest'
import { enableAutoUnmount, mount } from '@vue/test-utils'
import { axe } from 'vitest-axe'
import DadsList from '../DadsList.vue'
import type { DadsListItem, DadsListProps } from '../DadsList.types'

enableAutoUnmount(afterEach)

const STRING_ITEMS = ['親項目A', '親項目B', '親項目C']

const NESTED_ITEMS: (string | DadsListItem)[] = [
  '親項目A',
  {
    label: '親項目B',
    children: ['子項目X', '子項目Y'],
  },
  {
    label: '親項目C',
    children: [
      'サブリストA',
      {
        label: 'サブリストB',
        children: ['孫項目α', '孫項目β'],
      },
    ],
  },
]

const createWrapper = (props: Partial<DadsListProps> = {}, slots: Record<string, string> = {}) =>
  mount(DadsList, {
    props: props as DadsListProps,
    slots,
  })

describe('DadsList', () => {
  describe('rendering', () => {
    it('renders a <ul> root element by default', () => {
      const wrapper = createWrapper({ items: STRING_ITEMS })
      expect(wrapper.element.tagName).toBe('UL')
    })

    it('renders a <ul> root element (never <ol>) when type="ordered"', () => {
      // Per the official DADS spec, numbered lists are still <ul> — the number
      // is emitted as copyable text, not an <ol> marker.
      const wrapper = createWrapper({ items: STRING_ITEMS, type: 'ordered' })
      expect(wrapper.element.tagName).toBe('UL')
    })

    it('applies the dads-list root class', () => {
      const wrapper = createWrapper({ items: STRING_ITEMS })
      expect(wrapper.classes()).toContain('dads-list')
    })

    it('renders one <li> per item when items is an array of strings', () => {
      const wrapper = createWrapper({ items: STRING_ITEMS })
      // Only direct children of the root list.
      const directLi = wrapper.element.querySelectorAll(':scope > li')
      expect(directLi).toHaveLength(STRING_ITEMS.length)
    })

    it('renders each string item label as the <li> text content', () => {
      const wrapper = createWrapper({ items: STRING_ITEMS })
      const lis = wrapper.findAll(':scope > li')
      STRING_ITEMS.forEach((label, index) => {
        expect(lis[index].text()).toBe(label)
      })
    })
  })

  describe('type / data-marker', () => {
    it('does not emit a data-marker attribute when type="unordered" (default)', () => {
      const wrapper = createWrapper({ items: STRING_ITEMS })
      expect(wrapper.attributes('data-marker')).toBeUndefined()
    })

    it('sets data-marker="number" when type="ordered"', () => {
      const wrapper = createWrapper({ items: STRING_ITEMS, type: 'ordered' })
      expect(wrapper.attributes('data-marker')).toBe('number')
    })

    it('toggles the data-marker attribute when the prop changes', async () => {
      const wrapper = createWrapper({ items: STRING_ITEMS, type: 'unordered' })
      expect(wrapper.attributes('data-marker')).toBeUndefined()
      await wrapper.setProps({ type: 'ordered' })
      expect(wrapper.attributes('data-marker')).toBe('number')
      await wrapper.setProps({ type: 'unordered' })
      expect(wrapper.attributes('data-marker')).toBeUndefined()
    })
  })

  describe('numbered list (type="ordered") text markers', () => {
    it('renders a copyable text marker span before each label', () => {
      const wrapper = createWrapper({ items: STRING_ITEMS, type: 'ordered' })
      const lis = wrapper.findAll(':scope > li')
      // Each <li> has a leading marker <span> and a label <span>.
      const firstSpans = lis[0].findAll(':scope > span')
      expect(firstSpans).toHaveLength(2)
      expect(firstSpans[0].classes()).toContain('dads-list__marker')
      expect(firstSpans[0].text()).toBe('1.')
      expect(firstSpans[1].text()).toBe('親項目A')
    })

    it('auto-numbers items sequentially starting at 1 by default', () => {
      const wrapper = createWrapper({ items: STRING_ITEMS, type: 'ordered' })
      const markers = wrapper.findAll('.dads-list__marker')
      expect(markers.map((m) => m.text())).toEqual(['1.', '2.', '3.'])
    })

    it('offsets auto-generated markers by `start`', () => {
      const wrapper = createWrapper({ items: STRING_ITEMS, type: 'ordered', start: 5 })
      const markers = wrapper.findAll('.dads-list__marker')
      expect(markers.map((m) => m.text())).toEqual(['5.', '6.', '7.'])
    })

    it('uses an explicit `marker` field when provided on the item', () => {
      const wrapper = createWrapper({
        items: [
          { label: '最初', marker: '①　' },
          { label: '次', marker: '②　' },
        ],
        type: 'ordered',
      })
      const markers = wrapper.findAll('.dads-list__marker')
      expect(markers.map((m) => m.text())).toEqual(['①', '②'])
    })

    it('does not render marker spans when type="unordered"', () => {
      const wrapper = createWrapper({ items: STRING_ITEMS, type: 'unordered' })
      expect(wrapper.findAll('.dads-list__marker')).toHaveLength(0)
    })

    it('ignores `start` when type="unordered"', () => {
      const wrapper = createWrapper({ items: STRING_ITEMS, type: 'unordered', start: 5 })
      expect(wrapper.findAll('.dads-list__marker')).toHaveLength(0)
      // No <ol>-style start attribute is emitted on the <ul>.
      expect(wrapper.attributes('start')).toBeUndefined()
    })

    it('never emits a native <ol> start attribute', () => {
      const wrapper = createWrapper({ items: STRING_ITEMS, type: 'ordered', start: 5 })
      expect(wrapper.attributes('start')).toBeUndefined()
    })
  })

  describe('items as objects with children (nested)', () => {
    it('renders a nested list inside the <li> when children are provided', () => {
      const wrapper = createWrapper({ items: NESTED_ITEMS })
      const directLi = Array.from(wrapper.element.querySelectorAll(':scope > li'))
      // Second item has children.
      const secondLi = directLi[1]
      const nested = secondLi.querySelector(':scope > ul')
      expect(nested).not.toBeNull()
      expect(nested!.tagName).toBe('UL')
      expect(nested!.classList.contains('dads-list')).toBe(true)
      // Two grandchildren.
      const grandLis = nested!.querySelectorAll(':scope > li')
      expect(grandLis).toHaveLength(2)
      expect(grandLis[0].textContent?.trim()).toBe('子項目X')
      expect(grandLis[1].textContent?.trim()).toBe('子項目Y')
    })

    it('keeps the parent label inline with its nested list (per DADS a11y guidance)', () => {
      const wrapper = createWrapper({ items: NESTED_ITEMS })
      const secondLi = wrapper.element.querySelectorAll(':scope > li')[1]
      // Parent <li> should contain BOTH the label text AND the nested <ul>
      // as direct children — not a sibling.
      expect(secondLi.textContent).toContain('親項目B')
      expect(secondLi.querySelector(':scope > ul')).not.toBeNull()
    })

    it('renders deeply nested children recursively', () => {
      const wrapper = createWrapper({ items: NESTED_ITEMS })
      const thirdLi = wrapper.element.querySelectorAll(':scope > li')[2]
      const secondLevel = thirdLi.querySelector(':scope > ul')
      expect(secondLevel).not.toBeNull()
      // サブリストB has its own children.
      const thirdLevel = secondLevel!
        .querySelectorAll(':scope > li')[1]
        .querySelector(':scope > ul')
      expect(thirdLevel).not.toBeNull()
      const grandLis = thirdLevel!.querySelectorAll(':scope > li')
      expect(grandLis).toHaveLength(2)
      expect(grandLis[0].textContent?.trim()).toBe('孫項目α')
    })

    it('propagates the type to nested lists (ordered → nested <ul data-marker="number">)', () => {
      const wrapper = createWrapper({ items: NESTED_ITEMS, type: 'ordered' })
      expect(wrapper.element.tagName).toBe('UL')
      expect(wrapper.attributes('data-marker')).toBe('number')
      const secondLi = wrapper.element.querySelectorAll(':scope > li')[1]
      const nested = secondLi.querySelector(':scope > ul')
      expect(nested).not.toBeNull()
      expect(nested!.tagName).toBe('UL')
      expect(nested!.getAttribute('data-marker')).toBe('number')
    })

    it('does not render a nested list when children is omitted or empty', () => {
      const wrapper = createWrapper({
        items: [{ label: 'no kids' }, { label: 'empty kids', children: [] }],
      })
      const lis = wrapper.element.querySelectorAll(':scope > li')
      expect(lis[0].querySelector(':scope > ul')).toBeNull()
      expect(lis[1].querySelector(':scope > ul')).toBeNull()
    })
  })

  describe('slot fallback', () => {
    it('renders the default slot when items is not provided', () => {
      const wrapper = createWrapper(
        {},
        {
          default: `<li class="custom-li">手書きアイテム</li>`,
        },
      )
      const customs = wrapper.findAll('.custom-li')
      expect(customs).toHaveLength(1)
      expect(customs[0].text()).toBe('手書きアイテム')
    })

    it('prefers items over the default slot when both are provided', () => {
      const wrapper = createWrapper(
        { items: STRING_ITEMS },
        { default: `<li class="should-not-render">ignored</li>` },
      )
      expect(wrapper.find('.should-not-render').exists()).toBe(false)
      expect(wrapper.findAll(':scope > li')).toHaveLength(STRING_ITEMS.length)
    })

    it('renders the slot when items is an empty array', () => {
      const wrapper = createWrapper(
        { items: [] },
        { default: `<li class="fallback">fallback</li>` },
      )
      expect(wrapper.find('.fallback').exists()).toBe(true)
    })

    it('renders custom marker spans inside slot-authored <li> (DADS numbered pattern)', () => {
      const wrapper = createWrapper(
        { type: 'ordered' },
        {
          default: `
            <li><span>1. </span><span>最初</span></li>
            <li><span>2. </span><span>次</span></li>
          `,
        },
      )
      const lis = wrapper.findAll(':scope > li')
      expect(lis).toHaveLength(2)
      expect(lis[0].findAll('span')).toHaveLength(2)
      expect(lis[0].findAll('span')[0].text()).toBe('1.')
    })
  })

  describe('reactivity', () => {
    it('updates rendered <li> count when items prop changes', async () => {
      const wrapper = createWrapper({ items: STRING_ITEMS })
      expect(wrapper.findAll(':scope > li')).toHaveLength(STRING_ITEMS.length)
      await wrapper.setProps({ items: ['only one'] })
      const lis = wrapper.findAll(':scope > li')
      expect(lis).toHaveLength(1)
      expect(lis[0].text()).toBe('only one')
    })

    it('falls back to the slot when items becomes undefined', async () => {
      const wrapper = mount(DadsList, {
        props: { items: STRING_ITEMS } as DadsListProps,
        slots: { default: `<li class="fallback">fallback</li>` },
      })
      expect(wrapper.find('.fallback').exists()).toBe(false)
      await wrapper.setProps({ items: undefined })
      expect(wrapper.find('.fallback').exists()).toBe(true)
    })

    it('toggles numbered markers when type switches from ordered to unordered', async () => {
      const wrapper = createWrapper({ items: STRING_ITEMS, type: 'ordered' })
      expect(wrapper.element.tagName).toBe('UL')
      expect(wrapper.findAll('.dads-list__marker')).toHaveLength(STRING_ITEMS.length)
      await wrapper.setProps({ type: 'unordered' })
      expect(wrapper.element.tagName).toBe('UL')
      expect(wrapper.findAll('.dads-list__marker')).toHaveLength(0)
    })
  })

  describe('semantics / accessibility', () => {
    it('uses a native <ul> so screen readers expose list semantics', () => {
      const wrapper = createWrapper({ items: STRING_ITEMS })
      expect(wrapper.element.tagName).toBe('UL')
    })

    it('keeps nested lists as descendants of their parent <li> (proper nesting)', () => {
      // Per DADS spec, the sub-list must sit INSIDE the parent <li>, never
      // as a sibling — assistive technologies rely on this to convey
      // hierarchy.
      const wrapper = createWrapper({ items: NESTED_ITEMS })
      const root = wrapper.element
      // The root <ul> must not contain another <ul> as a direct child.
      const directNested = root.querySelectorAll(':scope > ul')
      expect(directNested).toHaveLength(0)
    })

    it('emits numbers as copyable text content (not a CSS marker)', () => {
      // The key reason DADS avoids <ol>: the number must be selectable text.
      const wrapper = createWrapper({ items: STRING_ITEMS, type: 'ordered' })
      const firstLi = wrapper.findAll(':scope > li')[0]
      // The number lives in the DOM as real text content, not a ::marker.
      expect(firstLi.element.textContent).toContain('1.')
      expect(firstLi.element.textContent).toContain('親項目A')
    })
  })

  describe('spacing', () => {
    it('applies the spacing-4 modifier + data-spacing="4" by default', () => {
      const wrapper = createWrapper({ items: STRING_ITEMS })
      expect(wrapper.classes()).toContain('dads-list--spacing-4')
      expect(wrapper.attributes('data-spacing')).toBe('4')
    })

    it.each(['4', '8', '12'] as const)('applies dads-list--spacing-%s + data-spacing="%s"', (s) => {
      const wrapper = createWrapper({ items: STRING_ITEMS, spacing: s })
      expect(wrapper.classes()).toContain(`dads-list--spacing-${s}`)
      expect(wrapper.attributes('data-spacing')).toBe(s)
    })

    it('propagates spacing + data-spacing to nested lists', () => {
      const wrapper = createWrapper({ items: NESTED_ITEMS, spacing: '12' })
      const nested = wrapper.element.querySelectorAll(':scope > li')[1].querySelector(':scope > ul')
      expect(nested).not.toBeNull()
      expect(nested!.getAttribute('data-spacing')).toBe('12')
      expect(nested!.classList.contains('dads-list--spacing-12')).toBe(true)
    })
  })

  describe('nestingMarker', () => {
    it('does not apply the no-nesting-marker class by default', () => {
      const wrapper = createWrapper({ items: STRING_ITEMS })
      expect(wrapper.classes()).not.toContain('dads-list--no-nesting-marker')
    })

    it('applies the no-nesting-marker class when nestingMarker=false', () => {
      const wrapper = createWrapper({ items: STRING_ITEMS, nestingMarker: false })
      expect(wrapper.classes()).toContain('dads-list--no-nesting-marker')
    })
  })

  describe('a11y (vitest-axe)', () => {
    const mountInBody = (props: Partial<DadsListProps> = {}) =>
      mount(DadsList, { props: props as DadsListProps, attachTo: document.body })

    it('has no violations with a flat unordered list', async () => {
      const wrapper = mountInBody({ items: STRING_ITEMS })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations with a nested list (children)', async () => {
      const wrapper = mountInBody({ items: NESTED_ITEMS })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations with type="ordered"', async () => {
      const wrapper = mountInBody({ type: 'ordered', items: STRING_ITEMS })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations with spacing="12"', async () => {
      const wrapper = mountInBody({ items: STRING_ITEMS, spacing: '12' })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })
  })
})
