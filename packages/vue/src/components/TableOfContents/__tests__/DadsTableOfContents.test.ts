import { afterEach, describe, expect, it } from 'vitest'
import { enableAutoUnmount, mount } from '@vue/test-utils'
import { axe } from 'vitest-axe'
import DadsTableOfContents from '../DadsTableOfContents.vue'
import type {
  DadsTableOfContentsItem,
  DadsTableOfContentsProps,
} from '../DadsTableOfContents.types'

enableAutoUnmount(afterEach)

const flatItems: DadsTableOfContentsItem[] = [
  { id: 'intro', label: 'はじめに' },
  { id: 'usage', label: '使い方' },
  { id: 'api', label: 'API' },
]

const nestedItems: DadsTableOfContentsItem[] = [
  {
    id: 'getting-started',
    label: 'Getting Started',
    children: [
      { id: 'install', label: 'インストール' },
      { id: 'setup', label: 'セットアップ' },
    ],
  },
  {
    id: 'reference',
    label: 'リファレンス',
    children: [{ id: 'props', label: 'Props' }],
  },
]

const createWrapper = (props: Partial<DadsTableOfContentsProps> = {}) =>
  mount(DadsTableOfContents, {
    props: {
      items: flatItems,
      ...props,
    } as DadsTableOfContentsProps,
  })

describe('DadsTableOfContents', () => {
  describe('rendering', () => {
    it('renders a nav element with dads-table-of-contents class', () => {
      const wrapper = createWrapper()
      expect(wrapper.element.tagName).toBe('NAV')
      expect(wrapper.classes()).toContain('dads-table-of-contents')
    })

    it('renders a top-level unordered list', () => {
      const wrapper = createWrapper()
      const list = wrapper.find('ul.dads-table-of-contents__list')
      expect(list.exists()).toBe(true)
    })

    it('renders one top-level <li> per item', () => {
      const wrapper = createWrapper()
      const items = wrapper
        .find('ul.dads-table-of-contents__list')
        .findAll(':scope > li.dads-table-of-contents__item')
      expect(items).toHaveLength(flatItems.length)
    })

    it('renders the label text for every item', () => {
      const wrapper = createWrapper()
      const text = wrapper.text()
      for (const item of flatItems) {
        expect(text).toContain(item.label)
      }
    })

    it('renders an anchor for every item', () => {
      const wrapper = createWrapper()
      const anchors = wrapper.findAll('a.dads-table-of-contents__link')
      expect(anchors).toHaveLength(flatItems.length)
    })

    it('renders nothing when items is empty', () => {
      const wrapper = createWrapper({ items: [] })
      expect(wrapper.findAll('li.dads-table-of-contents__item')).toHaveLength(0)
      expect(wrapper.findAll('a.dads-table-of-contents__link')).toHaveLength(0)
    })
  })

  describe('href resolution', () => {
    it('defaults href to "#${id}" when href is omitted', () => {
      const wrapper = createWrapper()
      const anchors = wrapper.findAll('a.dads-table-of-contents__link')
      expect(anchors[0]?.attributes('href')).toBe('#intro')
      expect(anchors[1]?.attributes('href')).toBe('#usage')
      expect(anchors[2]?.attributes('href')).toBe('#api')
    })

    it('uses the provided href verbatim when present', () => {
      const wrapper = createWrapper({
        items: [
          { id: 'intro', label: 'はじめに', href: '/intro' },
          { id: 'extern', label: '外部', href: 'https://example.com/x' },
        ],
      })
      const anchors = wrapper.findAll('a.dads-table-of-contents__link')
      expect(anchors[0]?.attributes('href')).toBe('/intro')
      expect(anchors[1]?.attributes('href')).toBe('https://example.com/x')
    })
  })

  describe('nested items', () => {
    it('renders a nested <ul> for items with children', () => {
      const wrapper = createWrapper({ items: nestedItems })
      const nestedLists = wrapper.findAll('ul.dads-table-of-contents__list--nested')
      expect(nestedLists).toHaveLength(nestedItems.length)
    })

    it('renders each child as an <a> with default "#${id}" href', () => {
      const wrapper = createWrapper({ items: nestedItems })
      const nestedAnchors = wrapper.findAll('a.dads-table-of-contents__link--nested')
      // 2 children under getting-started + 1 child under reference = 3 nested anchors
      expect(nestedAnchors).toHaveLength(3)
      expect(nestedAnchors[0]?.attributes('href')).toBe('#install')
      expect(nestedAnchors[1]?.attributes('href')).toBe('#setup')
      expect(nestedAnchors[2]?.attributes('href')).toBe('#props')
    })

    it('does not render a nested list for items without children', () => {
      const wrapper = createWrapper()
      const nestedLists = wrapper.findAll('ul.dads-table-of-contents__list--nested')
      expect(nestedLists).toHaveLength(0)
    })

    it('does not render a nested list for items with an empty children array', () => {
      const wrapper = createWrapper({
        items: [{ id: 'a', label: 'A', children: [] }],
      })
      const nestedLists = wrapper.findAll('ul.dads-table-of-contents__list--nested')
      expect(nestedLists).toHaveLength(0)
    })
  })

  describe('activeId / aria-current', () => {
    it('sets aria-current="location" on the matching top-level item', () => {
      const wrapper = createWrapper({ activeId: 'usage' })
      const anchors = wrapper.findAll('a.dads-table-of-contents__link')
      expect(anchors[0]?.attributes('aria-current')).toBeUndefined()
      expect(anchors[1]?.attributes('aria-current')).toBe('location')
      expect(anchors[2]?.attributes('aria-current')).toBeUndefined()
    })

    it('applies the active modifier class to the matching item / link', () => {
      const wrapper = createWrapper({ activeId: 'usage' })
      const items = wrapper.findAll('li.dads-table-of-contents__item')
      const activeItem = items.find((li) => li.text().includes('使い方'))
      expect(activeItem?.classes()).toContain('dads-table-of-contents__item--active')
      const activeLink = activeItem?.find('a.dads-table-of-contents__link')
      expect(activeLink?.classes()).toContain('dads-table-of-contents__link--active')
    })

    it('sets aria-current="location" on a matching nested child', () => {
      const wrapper = createWrapper({ items: nestedItems, activeId: 'setup' })
      const nestedAnchors = wrapper.findAll('a.dads-table-of-contents__link--nested')
      const target = nestedAnchors.find((a) => a.text() === 'セットアップ')
      expect(target?.attributes('aria-current')).toBe('location')
      // sibling should NOT be marked
      const sibling = nestedAnchors.find((a) => a.text() === 'インストール')
      expect(sibling?.attributes('aria-current')).toBeUndefined()
    })

    it('sets no aria-current when activeId is undefined', () => {
      const wrapper = createWrapper()
      const anchors = wrapper.findAll('a.dads-table-of-contents__link')
      for (const a of anchors) {
        expect(a.attributes('aria-current')).toBeUndefined()
      }
    })

    it('sets no aria-current when activeId does not match any item', () => {
      const wrapper = createWrapper({ activeId: 'nonexistent' })
      const anchors = wrapper.findAll('a.dads-table-of-contents__link')
      for (const a of anchors) {
        expect(a.attributes('aria-current')).toBeUndefined()
      }
    })
  })

  describe('aria-label', () => {
    it('defaults aria-label to "このページの目次"', () => {
      const wrapper = createWrapper()
      expect(wrapper.attributes('aria-label')).toBe('このページの目次')
    })

    it('overrides the aria-label via the ariaLabel prop', () => {
      const wrapper = createWrapper({ ariaLabel: 'On this page' })
      expect(wrapper.attributes('aria-label')).toBe('On this page')
    })
  })

  describe('events', () => {
    it('emits click:item with the item and MouseEvent when an anchor is clicked', async () => {
      const wrapper = createWrapper()
      const anchors = wrapper.findAll('a.dads-table-of-contents__link')
      await anchors[1]?.trigger('click')
      const events = wrapper.emitted('click:item')
      expect(events).toHaveLength(1)
      const [item, event] = events?.[0] as [DadsTableOfContentsItem, MouseEvent]
      expect(item).toEqual(flatItems[1])
      expect(event).toBeInstanceOf(Event)
    })

    it('emits click:item for a nested child click', async () => {
      const wrapper = createWrapper({ items: nestedItems })
      const nestedAnchors = wrapper.findAll('a.dads-table-of-contents__link--nested')
      const target = nestedAnchors.find((a) => a.text() === 'Props')
      await target?.trigger('click')
      const events = wrapper.emitted('click:item')
      expect(events).toHaveLength(1)
      const [item] = events?.[0] as [DadsTableOfContentsItem]
      expect(item.id).toBe('props')
    })
  })

  describe('a11y (vitest-axe)', () => {
    const mountInBody = (props: Partial<DadsTableOfContentsProps> = {}) =>
      mount(DadsTableOfContents, {
        props: { items: flatItems, ...props } as DadsTableOfContentsProps,
        attachTo: document.body,
      })

    it('has no violations with a flat TOC', async () => {
      const wrapper = mountInBody()
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations with a nested TOC', async () => {
      const wrapper = mountInBody({ items: nestedItems })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations with an active item', async () => {
      const wrapper = mountInBody({ activeId: 'usage' })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations with a custom aria-label', async () => {
      const wrapper = mountInBody({ ariaLabel: '本ページの目次' })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })
  })
})
