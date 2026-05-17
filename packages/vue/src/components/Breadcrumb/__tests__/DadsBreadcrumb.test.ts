import { afterEach, describe, expect, it } from 'vitest'
import { enableAutoUnmount, mount } from '@vue/test-utils'
import { axe } from 'vitest-axe'
import DadsBreadcrumb from '../DadsBreadcrumb.vue'
import type { DadsBreadcrumbItem, DadsBreadcrumbProps } from '../DadsBreadcrumb.types'

enableAutoUnmount(afterEach)

const sampleItems: DadsBreadcrumbItem[] = [
  { title: 'ホーム', href: '/' },
  { title: '商品', href: '/products' },
  { title: '詳細' },
]

const createWrapper = (props: Partial<DadsBreadcrumbProps> = {}) =>
  mount(DadsBreadcrumb, {
    props: {
      items: sampleItems,
      ...props,
    } as DadsBreadcrumbProps,
  })

describe('DadsBreadcrumb', () => {
  describe('rendering', () => {
    it('renders a nav element with dads-breadcrumb class', () => {
      const wrapper = createWrapper()
      expect(wrapper.element.tagName).toBe('NAV')
      expect(wrapper.classes()).toContain('dads-breadcrumb')
    })

    it('renders an ordered list with dads-breadcrumb__list class', () => {
      const wrapper = createWrapper()
      const list = wrapper.find('ol.dads-breadcrumb__list')
      expect(list.exists()).toBe(true)
    })

    it('renders one li per item with dads-breadcrumb__item class', () => {
      const wrapper = createWrapper()
      const items = wrapper.findAll('li.dads-breadcrumb__item')
      expect(items).toHaveLength(sampleItems.length)
    })

    it('renders the title text for every item', () => {
      const wrapper = createWrapper()
      const text = wrapper.text()
      for (const item of sampleItems) {
        expect(text).toContain(item.title)
      }
    })
  })

  describe('href / element type', () => {
    it('renders an <a> for items with href that are not the last item', () => {
      const wrapper = createWrapper()
      const links = wrapper.findAll('a.dads-breadcrumb__link')
      // 3 items: first two have href, last has no href -> 2 links
      expect(links).toHaveLength(2)
      expect(links[0]?.attributes('href')).toBe('/')
      expect(links[1]?.attributes('href')).toBe('/products')
    })

    it('renders a <span> for items without href', () => {
      const wrapper = createWrapper({
        items: [{ title: 'ホーム' }, { title: '商品', href: '/products' }, { title: '詳細' }],
      })
      // First item has no href -> span. Plus last item -> 2 spans (current).
      const currents = wrapper.findAll('span.dads-breadcrumb__current')
      expect(currents).toHaveLength(2)
      // No anchor for the first item.
      const linkHrefs = wrapper.findAll('a.dads-breadcrumb__link').map((a) => a.attributes('href'))
      expect(linkHrefs).not.toContain(undefined)
      expect(linkHrefs).toEqual(['/products'])
    })

    it('renders a <span> for disabled items even when href is provided', () => {
      const wrapper = createWrapper({
        items: [
          { title: 'ホーム', href: '/' },
          { title: '商品', href: '/products', disabled: true },
          { title: '詳細' },
        ],
      })
      const links = wrapper.findAll('a.dads-breadcrumb__link')
      expect(links).toHaveLength(1)
      expect(links[0]?.attributes('href')).toBe('/')
      // Disabled item should have aria-disabled
      const disabledSpan = wrapper
        .findAll('span.dads-breadcrumb__current')
        .find((s) => s.text() === '商品')
      expect(disabledSpan?.attributes('aria-disabled')).toBe('true')
      expect(disabledSpan?.classes()).toContain('dads-breadcrumb__current--disabled')
    })

    it('always renders the last item as a <span> even when href is provided', () => {
      const wrapper = createWrapper({
        items: [
          { title: 'ホーム', href: '/' },
          { title: '詳細', href: '/detail' },
        ],
      })
      const links = wrapper.findAll('a.dads-breadcrumb__link')
      // Only the first item should be a link.
      expect(links).toHaveLength(1)
      expect(links[0]?.attributes('href')).toBe('/')
      const currents = wrapper.findAll('span.dads-breadcrumb__current')
      expect(currents).toHaveLength(1)
      expect(currents[0]?.text()).toBe('詳細')
    })
  })

  describe('aria attributes', () => {
    it('sets aria-current="page" on the last item', () => {
      const wrapper = createWrapper()
      const currents = wrapper.findAll('span.dads-breadcrumb__current')
      // Only one current span (the last item).
      expect(currents).toHaveLength(1)
      expect(currents[0]?.attributes('aria-current')).toBe('page')
      expect(currents[0]?.text()).toBe('詳細')
    })

    it('does not set aria-current on non-last span items', () => {
      const wrapper = createWrapper({
        items: [{ title: 'ホーム' }, { title: '商品' }, { title: '詳細' }],
      })
      const currents = wrapper.findAll('span.dads-breadcrumb__current')
      expect(currents).toHaveLength(3)
      // First two should not have aria-current, last should.
      expect(currents[0]?.attributes('aria-current')).toBeUndefined()
      expect(currents[1]?.attributes('aria-current')).toBeUndefined()
      expect(currents[2]?.attributes('aria-current')).toBe('page')
    })

    it('sets default aria-label to "パンくずリスト" on the nav element', () => {
      const wrapper = createWrapper()
      expect(wrapper.attributes('aria-label')).toBe('パンくずリスト')
    })

    it('overrides nav aria-label via the ariaLabel prop', () => {
      const wrapper = createWrapper({ ariaLabel: 'Site navigation' })
      expect(wrapper.attributes('aria-label')).toBe('Site navigation')
    })

    it('marks separators as aria-hidden="true"', () => {
      const wrapper = createWrapper()
      const separators = wrapper.findAll('.dads-breadcrumb__separator')
      for (const sep of separators) {
        expect(sep.attributes('aria-hidden')).toBe('true')
      }
    })
  })

  describe('separator', () => {
    it('uses "》" by default', () => {
      const wrapper = createWrapper()
      const separators = wrapper.findAll('.dads-breadcrumb__separator')
      expect(separators[0]?.text()).toBe('》')
    })

    it('renders n-1 separators for n items', () => {
      const wrapper = createWrapper()
      const separators = wrapper.findAll('.dads-breadcrumb__separator')
      expect(separators).toHaveLength(sampleItems.length - 1)
    })

    it('does not render a separator after the last item', () => {
      const wrapper = createWrapper()
      const lastItem = wrapper.findAll('li.dads-breadcrumb__item').at(-1)
      expect(lastItem?.find('.dads-breadcrumb__separator').exists()).toBe(false)
    })

    it('does not render a separator when there is only one item', () => {
      const wrapper = createWrapper({ items: [{ title: 'ホーム' }] })
      expect(wrapper.findAll('.dads-breadcrumb__separator')).toHaveLength(0)
    })

    it('renders no items and no separators when items is empty', () => {
      const wrapper = createWrapper({ items: [] })
      expect(wrapper.findAll('li.dads-breadcrumb__item')).toHaveLength(0)
      expect(wrapper.findAll('.dads-breadcrumb__separator')).toHaveLength(0)
    })

    it('respects a custom separator string', () => {
      const wrapper = createWrapper({ separator: '/' })
      const separators = wrapper.findAll('.dads-breadcrumb__separator')
      expect(separators).toHaveLength(2)
      for (const sep of separators) {
        expect(sep.text()).toBe('/')
      }
    })
  })

  describe('events', () => {
    it('emits click:item with the item, index, and MouseEvent when an anchor is clicked', async () => {
      const wrapper = createWrapper()
      const links = wrapper.findAll('a.dads-breadcrumb__link')
      await links[0]?.trigger('click')
      const events = wrapper.emitted('click:item')
      expect(events).toHaveLength(1)
      const [item, index, event] = events?.[0] as [DadsBreadcrumbItem, number, MouseEvent]
      expect(item).toEqual(sampleItems[0])
      expect(index).toBe(0)
      expect(event).toBeInstanceOf(Event)
    })

    it('emits click:item for the second link with index 1', async () => {
      const wrapper = createWrapper()
      const links = wrapper.findAll('a.dads-breadcrumb__link')
      await links[1]?.trigger('click')
      const events = wrapper.emitted('click:item')
      expect(events).toHaveLength(1)
      expect(events?.[0]?.[1]).toBe(1)
    })

    it('does not emit click:item when a disabled item span is clicked', async () => {
      const wrapper = createWrapper({
        items: [
          { title: 'ホーム', href: '/' },
          { title: '商品', href: '/products', disabled: true },
          { title: '詳細' },
        ],
      })
      const disabledSpan = wrapper
        .findAll('span.dads-breadcrumb__current')
        .find((s) => s.text() === '商品')
      await disabledSpan?.trigger('click')
      expect(wrapper.emitted('click:item')).toBeUndefined()
    })

    it('does not emit click:item when the last (current) item is clicked', async () => {
      const wrapper = createWrapper()
      const currents = wrapper.findAll('span.dads-breadcrumb__current')
      await currents[0]?.trigger('click')
      expect(wrapper.emitted('click:item')).toBeUndefined()
    })
  })

  describe('CSS classes / structure', () => {
    it('applies the dads-breadcrumb__link class to anchor elements', () => {
      const wrapper = createWrapper()
      const links = wrapper.findAll('a.dads-breadcrumb__link')
      expect(links.length).toBeGreaterThan(0)
      for (const link of links) {
        expect(link.classes()).toContain('dads-breadcrumb__link')
      }
    })

    it('applies the dads-breadcrumb__current class to current span', () => {
      const wrapper = createWrapper()
      const current = wrapper.find('span.dads-breadcrumb__current')
      expect(current.exists()).toBe(true)
      expect(current.classes()).toContain('dads-breadcrumb__current')
    })

    it('applies dads-breadcrumb__separator class to separator spans', () => {
      const wrapper = createWrapper()
      const separator = wrapper.find('span.dads-breadcrumb__separator')
      expect(separator.exists()).toBe(true)
      expect(separator.classes()).toContain('dads-breadcrumb__separator')
    })

    it('renders separators inside their own li (one per non-last item)', () => {
      const wrapper = createWrapper()
      const items = wrapper.findAll('li.dads-breadcrumb__item')
      // First two items have a separator, last does not.
      expect(items[0]?.find('.dads-breadcrumb__separator').exists()).toBe(true)
      expect(items[1]?.find('.dads-breadcrumb__separator').exists()).toBe(true)
      expect(items[2]?.find('.dads-breadcrumb__separator').exists()).toBe(false)
    })
  })

  describe('a11y (vitest-axe)', () => {
    const mountInBody = (props: Partial<DadsBreadcrumbProps> = {}) =>
      mount(DadsBreadcrumb, {
        props: { items: sampleItems, ...props } as DadsBreadcrumbProps,
        attachTo: document.body,
      })

    it('has no violations with default items', async () => {
      const wrapper = mountInBody()
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations with a custom separator', async () => {
      const wrapper = mountInBody({ separator: '>' })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations with a custom aria-label', async () => {
      const wrapper = mountInBody({ ariaLabel: '現在のページ位置' })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations with a disabled item', async () => {
      const wrapper = mountInBody({
        items: [
          { title: 'ホーム', href: '/' },
          { title: '準備中', disabled: true },
          { title: '詳細' },
        ],
      })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })
  })
})
