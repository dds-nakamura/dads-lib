import { afterEach, describe, expect, it } from 'vitest'
import { enableAutoUnmount, mount } from '@vue/test-utils'
import DadsMenuList from '../DadsMenuList.vue'
import type { DadsMenuListItem, DadsMenuListProps } from '../DadsMenuList.types'

enableAutoUnmount(afterEach)

const sampleItems: DadsMenuListItem[] = [
  { label: 'ホーム', href: '/' },
  { label: '商品', href: '/products' },
  { label: 'サポート', href: '/support' },
]

const createWrapper = (props: Partial<DadsMenuListProps> = {}) =>
  mount(DadsMenuList, {
    props: {
      items: sampleItems,
      ...props,
    } as DadsMenuListProps,
  })

describe('DadsMenuList', () => {
  // ---------------------------------------------------------------------------
  describe('rendering', () => {
    it('renders a <ul> with dads-menu-list class when ariaLabel is not provided', () => {
      const wrapper = createWrapper()
      expect(wrapper.element.tagName).toBe('UL')
      expect(wrapper.classes()).toContain('dads-menu-list')
    })

    it('renders one <li> per item', () => {
      const wrapper = createWrapper()
      const lis = wrapper.findAll('ul.dads-menu-list > li')
      expect(lis).toHaveLength(sampleItems.length)
    })

    it('renders the label text for every item', () => {
      const wrapper = createWrapper()
      const text = wrapper.text()
      for (const item of sampleItems) {
        expect(text).toContain(item.label)
      }
    })

    it('renders an empty <ul> when items is empty', () => {
      const wrapper = createWrapper({ items: [] })
      expect(wrapper.findAll('li')).toHaveLength(0)
      expect(wrapper.find('ul.dads-menu-list').exists()).toBe(true)
    })

    it('applies dads-menu-list__item class to every item element', () => {
      const wrapper = createWrapper()
      const items = wrapper.findAll('.dads-menu-list__item')
      expect(items).toHaveLength(sampleItems.length)
    })
  })

  // ---------------------------------------------------------------------------
  describe('props / variants', () => {
    it('renders items with default data-type="standard" and data-size="regular"', () => {
      const wrapper = createWrapper()
      const items = wrapper.findAll('.dads-menu-list__item')
      for (const item of items) {
        expect(item.attributes('data-type')).toBe('standard')
        expect(item.attributes('data-size')).toBe('regular')
      }
    })

    it('forwards type="box" and size="small" to items', () => {
      const wrapper = createWrapper({ type: 'box', size: 'small' })
      const items = wrapper.findAll('.dads-menu-list__item')
      for (const item of items) {
        expect(item.attributes('data-type')).toBe('box')
        expect(item.attributes('data-size')).toBe('small')
      }
    })

    it('renders an <a> for items with href and no disabled flag', () => {
      const wrapper = createWrapper()
      const anchors = wrapper.findAll('a.dads-menu-list__item')
      expect(anchors).toHaveLength(sampleItems.length)
      expect(anchors[0]?.attributes('href')).toBe('/')
      expect(anchors[1]?.attributes('href')).toBe('/products')
    })

    it('renders a <button type="button"> for items without href', () => {
      const wrapper = createWrapper({
        items: [{ label: 'アクション A' }, { label: 'アクション B' }],
      })
      const buttons = wrapper.findAll('button.dads-menu-list__item')
      expect(buttons).toHaveLength(2)
      for (const btn of buttons) {
        expect(btn.attributes('type')).toBe('button')
      }
    })

    it('renders a <button> when href is set but the item is disabled', () => {
      const wrapper = createWrapper({
        items: [{ label: '無効リンク', href: '/x', disabled: true }],
      })
      const buttons = wrapper.findAll('button.dads-menu-list__item')
      expect(buttons).toHaveLength(1)
      expect(buttons[0]?.attributes('disabled')).toBeDefined()
    })

    it('applies the --menu-list-indentation CSS variable when indentation > 0', () => {
      const wrapper = createWrapper({ indentation: 2 })
      const ul = wrapper.find('ul.dads-menu-list')
      const style = ul.attributes('style') || ''
      expect(style).toContain('--menu-list-indentation: 2')
    })

    it('does not set the --menu-list-indentation CSS variable when indentation is 0', () => {
      const wrapper = createWrapper()
      const ul = wrapper.find('ul.dads-menu-list')
      const style = ul.attributes('style') || ''
      expect(style).not.toContain('--menu-list-indentation')
    })
  })

  // ---------------------------------------------------------------------------
  describe('state attributes', () => {
    it('sets data-current and aria-current="page" on active items', () => {
      const wrapper = createWrapper({
        items: [
          { label: 'ホーム', href: '/' },
          { label: '現在のページ', href: '/now', active: true },
          { label: 'サポート', href: '/support' },
        ],
      })
      const active = wrapper.findAll('.dads-menu-list__item').at(1)
      expect(active?.attributes('data-current')).toBe('')
      expect(active?.attributes('aria-current')).toBe('page')
    })

    it('does not set data-current / aria-current on non-active items', () => {
      const wrapper = createWrapper()
      for (const item of wrapper.findAll('.dads-menu-list__item')) {
        expect(item.attributes('data-current')).toBeUndefined()
        expect(item.attributes('aria-current')).toBeUndefined()
      }
    })

    it('sets data-expanded and aria-expanded="true" on a button with expanded children', () => {
      const wrapper = createWrapper({
        items: [
          {
            label: '親メニュー',
            expanded: true,
            children: [{ label: '子メニュー', href: '/c' }],
          },
        ],
      })
      const parent = wrapper.find('button.dads-menu-list__item')
      expect(parent.attributes('data-expanded')).toBe('')
      expect(parent.attributes('aria-expanded')).toBe('true')
    })

    it('does not set aria-expanded on items without children', () => {
      const wrapper = createWrapper()
      for (const item of wrapper.findAll('.dads-menu-list__item')) {
        expect(item.attributes('aria-expanded')).toBeUndefined()
      }
    })

    it('disables the button element when disabled is true', () => {
      const wrapper = createWrapper({
        items: [{ label: '無効ボタン', disabled: true }],
      })
      const btn = wrapper.find('button.dads-menu-list__item')
      expect(btn.attributes('disabled')).toBeDefined()
    })
  })

  // ---------------------------------------------------------------------------
  describe('icons', () => {
    it('renders the front icon when frontIcon is set', () => {
      const wrapper = createWrapper({
        items: [{ label: 'ホーム', href: '/', frontIcon: 'mdi-home' }],
      })
      const icon = wrapper.find('.dads-menu-list__front-icon')
      expect(icon.exists()).toBe(true)
      expect(icon.classes()).toContain('mdi-home')
      expect(icon.attributes('aria-hidden')).toBe('true')
    })

    it('renders the end icon when endIcon is set', () => {
      const wrapper = createWrapper({
        items: [{ label: '展開', endIcon: 'mdi-chevron-down' }],
      })
      const icon = wrapper.find('.dads-menu-list__end-icon')
      expect(icon.exists()).toBe(true)
      expect(icon.classes()).toContain('mdi-chevron-down')
      expect(icon.attributes('aria-hidden')).toBe('true')
    })

    it('renders the tail icon with aria-label when tailIconLabel is provided', () => {
      const wrapper = createWrapper({
        items: [
          {
            label: '外部リンク',
            href: 'https://example.com',
            tailIcon: 'mdi-open-in-new',
            tailIconLabel: '新規タブで開きます',
          },
        ],
      })
      const icon = wrapper.find('.dads-menu-list__tail-icon')
      expect(icon.exists()).toBe(true)
      expect(icon.attributes('role')).toBe('img')
      expect(icon.attributes('aria-label')).toBe('新規タブで開きます')
      expect(icon.attributes('aria-hidden')).toBeUndefined()
    })

    it('marks the tail icon as aria-hidden when no label is provided', () => {
      const wrapper = createWrapper({
        items: [{ label: 'item', href: '/x', tailIcon: 'mdi-arrow-right' }],
      })
      const icon = wrapper.find('.dads-menu-list__tail-icon')
      expect(icon.exists()).toBe(true)
      expect(icon.attributes('aria-hidden')).toBe('true')
      expect(icon.attributes('aria-label')).toBeUndefined()
    })
  })

  // ---------------------------------------------------------------------------
  describe('nested items', () => {
    const nestedItems: DadsMenuListItem[] = [
      { label: '項目 1', href: '/1' },
      {
        label: '項目 2',
        expanded: true,
        children: [
          { label: '項目 2-1', href: '/2/1' },
          { label: '項目 2-2', href: '/2/2', active: true },
        ],
      },
      { label: '項目 3', href: '/3' },
    ]

    it('renders a nested <ul> inside the parent <li>', () => {
      const wrapper = createWrapper({ items: nestedItems })
      const nestedLists = wrapper.findAll('ul.dads-menu-list')
      // Root + nested child = 2
      expect(nestedLists.length).toBeGreaterThanOrEqual(2)
    })

    it('applies --menu-list-indentation: 1 to the nested <ul>', () => {
      const wrapper = createWrapper({ items: nestedItems })
      const nestedLists = wrapper.findAll('ul.dads-menu-list')
      const nested = nestedLists.at(1)
      const style = nested?.attributes('style') || ''
      expect(style).toContain('--menu-list-indentation: 1')
    })

    it('renders nested child item labels', () => {
      const wrapper = createWrapper({ items: nestedItems })
      const text = wrapper.text()
      expect(text).toContain('項目 2-1')
      expect(text).toContain('項目 2-2')
    })

    it('sets aria-current="page" on the active nested child', () => {
      const wrapper = createWrapper({ items: nestedItems })
      const allCurrent = wrapper.findAll('[aria-current="page"]')
      expect(allCurrent).toHaveLength(1)
      expect(allCurrent[0]?.text()).toContain('項目 2-2')
    })
  })

  // ---------------------------------------------------------------------------
  describe('events', () => {
    it('emits click:item when an anchor item is clicked', async () => {
      const wrapper = createWrapper()
      const anchors = wrapper.findAll('a.dads-menu-list__item')
      await anchors[1]?.trigger('click')
      const events = wrapper.emitted('click:item')
      expect(events).toHaveLength(1)
      const [item, event] = events?.[0] as [DadsMenuListItem, MouseEvent]
      expect(item).toEqual(sampleItems[1])
      expect(event).toBeInstanceOf(Event)
    })

    it('emits click:item when a button item is clicked', async () => {
      const wrapper = createWrapper({
        items: [{ label: 'アクション' }],
      })
      const btn = wrapper.find('button.dads-menu-list__item')
      await btn.trigger('click')
      expect(wrapper.emitted('click:item')).toHaveLength(1)
    })

    it('does not emit click:item when a disabled item is clicked', async () => {
      const wrapper = createWrapper({
        items: [{ label: '無効', href: '/x', disabled: true }],
      })
      const btn = wrapper.find('.dads-menu-list__item')
      await btn.trigger('click')
      expect(wrapper.emitted('click:item')).toBeUndefined()
    })

    it('bubbles click:item from nested children up to the root', async () => {
      const wrapper = createWrapper({
        items: [
          {
            label: '親',
            expanded: true,
            children: [{ label: '子', href: '/child' }],
          },
        ],
      })
      const child = wrapper.find('a.dads-menu-list__item')
      await child.trigger('click')
      const events = wrapper.emitted('click:item')
      expect(events).toHaveLength(1)
      const [item] = events?.[0] as [DadsMenuListItem]
      expect(item.label).toBe('子')
    })
  })

  // ---------------------------------------------------------------------------
  describe('a11y', () => {
    it('wraps the list in a <nav> with the provided aria-label', () => {
      const wrapper = createWrapper({ ariaLabel: 'サイトメニュー' })
      expect(wrapper.element.tagName).toBe('NAV')
      expect(wrapper.attributes('aria-label')).toBe('サイトメニュー')
      expect(wrapper.find('ul.dads-menu-list').exists()).toBe(true)
    })

    it('does not wrap in <nav> when ariaLabel is not provided', () => {
      const wrapper = createWrapper()
      expect(wrapper.element.tagName).toBe('UL')
    })

    it('renders icons as aria-hidden when no accessible name is requested', () => {
      const wrapper = createWrapper({
        items: [
          {
            label: 'ホーム',
            href: '/',
            frontIcon: 'mdi-home',
            endIcon: 'mdi-chevron-right',
          },
        ],
      })
      expect(wrapper.find('.dads-menu-list__front-icon').attributes('aria-hidden')).toBe('true')
      expect(wrapper.find('.dads-menu-list__end-icon').attributes('aria-hidden')).toBe('true')
    })

    it('exposes the disabled state via the native disabled attribute on buttons', () => {
      const wrapper = createWrapper({
        items: [{ label: '無効', disabled: true }],
      })
      const btn = wrapper.find('button.dads-menu-list__item')
      expect(btn.attributes('disabled')).toBeDefined()
    })
  })
})
