import { afterEach, describe, expect, it } from 'vitest'
import { enableAutoUnmount, mount } from '@vue/test-utils'
import DadsGlobalMenu from '../DadsGlobalMenu.vue'
import type { DadsGlobalMenuItem, DadsGlobalMenuProps } from '../DadsGlobalMenu.types'

enableAutoUnmount(afterEach)

const sampleItems: DadsGlobalMenuItem[] = [
  { label: 'ホーム', href: '/' },
  { label: 'サービス', href: '/services' },
  { label: 'サポート', href: '/support' },
]

const createWrapper = (props: Partial<DadsGlobalMenuProps> = {}) =>
  mount(DadsGlobalMenu, {
    props: {
      items: sampleItems,
      ...props,
    } as DadsGlobalMenuProps,
  })

describe('DadsGlobalMenu', () => {
  // ---------------------------------------------------------------------------
  describe('rendering', () => {
    it('renders a <nav> root with default aria-label "グローバルメニュー"', () => {
      const wrapper = createWrapper()
      expect(wrapper.element.tagName).toBe('NAV')
      expect(wrapper.attributes('aria-label')).toBe('グローバルメニュー')
    })

    it('renders a <ul> with class dads-global-menu', () => {
      const wrapper = createWrapper()
      const ul = wrapper.find('ul.dads-global-menu')
      expect(ul.exists()).toBe(true)
    })

    it('renders one <li class="dads-global-menu__item"> per item', () => {
      const wrapper = createWrapper()
      const items = wrapper.findAll('li.dads-global-menu__item')
      expect(items).toHaveLength(sampleItems.length)
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
      expect(wrapper.find('ul.dads-global-menu').exists()).toBe(true)
    })
  })

  // ---------------------------------------------------------------------------
  describe('item element selection', () => {
    it('renders an <a class="dads-global-menu__item-inner"> for items with href and no children', () => {
      const wrapper = createWrapper()
      const anchors = wrapper.findAll('a.dads-global-menu__item-inner')
      expect(anchors).toHaveLength(sampleItems.length)
      expect(anchors[0]?.attributes('href')).toBe('/')
      expect(anchors[1]?.attributes('href')).toBe('/services')
    })

    it('renders a <button type="button"> for items without href', () => {
      const wrapper = createWrapper({
        items: [{ label: 'メニュー A' }, { label: 'メニュー B' }],
      })
      const buttons = wrapper.findAll('button.dads-global-menu__item-inner')
      expect(buttons).toHaveLength(2)
      for (const btn of buttons) {
        expect(btn.attributes('type')).toBe('button')
      }
    })

    it('renders a <button> when the item has children, even if href is set', () => {
      const wrapper = createWrapper({
        items: [
          {
            label: '製品',
            href: '/products',
            children: [{ label: '商品 A', href: '/products/a' }],
          },
        ],
      })
      const anchors = wrapper.findAll('a.dads-global-menu__item-inner')
      const buttons = wrapper.findAll('button.dads-global-menu__item-inner')
      expect(anchors).toHaveLength(0)
      expect(buttons).toHaveLength(1)
    })
  })

  // ---------------------------------------------------------------------------
  describe('active state', () => {
    it('sets aria-current="page" on the active item', () => {
      const wrapper = createWrapper({
        items: [
          { label: 'ホーム', href: '/' },
          { label: '現在地', href: '/now', active: true },
          { label: 'サポート', href: '/support' },
        ],
      })
      const all = wrapper.findAll('[aria-current="page"]')
      expect(all).toHaveLength(1)
      expect(all[0]?.text()).toContain('現在地')
    })

    it('does not set aria-current on non-active items', () => {
      const wrapper = createWrapper()
      for (const inner of wrapper.findAll('.dads-global-menu__item-inner')) {
        expect(inner.attributes('aria-current')).toBeUndefined()
      }
    })
  })

  // ---------------------------------------------------------------------------
  describe('disabled state', () => {
    it('disables the underlying <button> when a button item is disabled', () => {
      const wrapper = createWrapper({
        items: [{ label: '無効ボタン', disabled: true }],
      })
      const btn = wrapper.find('button.dads-global-menu__item-inner')
      expect(btn.attributes('disabled')).toBeDefined()
    })

    it('marks disabled anchor items with aria-disabled and removes href', () => {
      const wrapper = createWrapper({
        items: [{ label: '無効リンク', href: '/x', disabled: true }],
      })
      const a = wrapper.find('a.dads-global-menu__item-inner')
      expect(a.exists()).toBe(true)
      expect(a.attributes('aria-disabled')).toBe('true')
      expect(a.attributes('tabindex')).toBe('-1')
      expect(a.attributes('href')).toBeUndefined()
    })
  })

  // ---------------------------------------------------------------------------
  describe('children / aria-haspopup', () => {
    it('sets aria-haspopup="menu" on a button with children', () => {
      const wrapper = createWrapper({
        items: [
          {
            label: '製品',
            children: [{ label: '商品 A', href: '/a' }],
          },
        ],
      })
      const btn = wrapper.find('button.dads-global-menu__item-inner')
      expect(btn.attributes('aria-haspopup')).toBe('menu')
    })

    it('sets aria-expanded="false" by default on a parent button', () => {
      const wrapper = createWrapper({
        items: [
          {
            label: '製品',
            children: [{ label: '商品 A', href: '/a' }],
          },
        ],
      })
      const btn = wrapper.find('button.dads-global-menu__item-inner')
      expect(btn.attributes('aria-expanded')).toBe('false')
    })

    it('sets aria-expanded="true" when expanded is true', () => {
      const wrapper = createWrapper({
        items: [
          {
            label: '製品',
            expanded: true,
            children: [{ label: '商品 A', href: '/a' }],
          },
        ],
      })
      const btn = wrapper.find('button.dads-global-menu__item-inner')
      expect(btn.attributes('aria-expanded')).toBe('true')
    })

    it('renders a chevron icon when the item has children', () => {
      const wrapper = createWrapper({
        items: [
          {
            label: '製品',
            children: [{ label: '商品 A', href: '/a' }],
          },
        ],
      })
      const chevron = wrapper.find('.dads-global-menu__chevron')
      expect(chevron.exists()).toBe(true)
      expect(chevron.attributes('aria-hidden')).toBe('true')
    })

    it('does not set aria-haspopup / aria-expanded on items without children', () => {
      const wrapper = createWrapper()
      for (const inner of wrapper.findAll('.dads-global-menu__item-inner')) {
        expect(inner.attributes('aria-haspopup')).toBeUndefined()
        expect(inner.attributes('aria-expanded')).toBeUndefined()
      }
    })
  })

  // ---------------------------------------------------------------------------
  describe('icons', () => {
    it('renders the front icon when frontIcon is set', () => {
      const wrapper = createWrapper({
        items: [{ label: 'ホーム', href: '/', frontIcon: 'mdi-home' }],
      })
      const icon = wrapper.find('.dads-global-menu__front-icon')
      expect(icon.exists()).toBe(true)
      expect(icon.classes()).toContain('mdi-home')
      expect(icon.attributes('aria-hidden')).toBe('true')
    })

    it('does not render a front icon when frontIcon is not set', () => {
      const wrapper = createWrapper()
      expect(wrapper.find('.dads-global-menu__front-icon').exists()).toBe(false)
    })
  })

  // ---------------------------------------------------------------------------
  describe('events', () => {
    it('emits click:item when an anchor item is clicked', async () => {
      const wrapper = createWrapper()
      const anchors = wrapper.findAll('a.dads-global-menu__item-inner')
      await anchors[1]?.trigger('click')
      const events = wrapper.emitted('click:item')
      expect(events).toHaveLength(1)
      const [item, event] = events?.[0] as [DadsGlobalMenuItem, MouseEvent]
      expect(item).toEqual(sampleItems[1])
      expect(event).toBeInstanceOf(Event)
    })

    it('emits click:item when a button item is clicked', async () => {
      const wrapper = createWrapper({
        items: [{ label: 'アクション' }],
      })
      await wrapper.find('button.dads-global-menu__item-inner').trigger('click')
      expect(wrapper.emitted('click:item')).toHaveLength(1)
    })

    it('does not emit click:item when a disabled button is clicked', async () => {
      const wrapper = createWrapper({
        items: [{ label: '無効', disabled: true }],
      })
      await wrapper.find('button.dads-global-menu__item-inner').trigger('click')
      expect(wrapper.emitted('click:item')).toBeUndefined()
    })

    it('does not emit click:item when a disabled anchor is clicked', async () => {
      const wrapper = createWrapper({
        items: [{ label: '無効リンク', href: '/x', disabled: true }],
      })
      await wrapper.find('a.dads-global-menu__item-inner').trigger('click')
      expect(wrapper.emitted('click:item')).toBeUndefined()
    })
  })

  // ---------------------------------------------------------------------------
  describe('a11y', () => {
    it('applies a custom ariaLabel to the <nav> root', () => {
      const wrapper = createWrapper({ ariaLabel: 'メインメニュー' })
      expect(wrapper.attributes('aria-label')).toBe('メインメニュー')
    })

    it('exposes the disabled state via the native disabled attribute on buttons', () => {
      const wrapper = createWrapper({
        items: [{ label: '無効', disabled: true }],
      })
      const btn = wrapper.find('button.dads-global-menu__item-inner')
      expect(btn.attributes('disabled')).toBeDefined()
    })

    it('renders front icons as aria-hidden so screen readers skip them', () => {
      const wrapper = createWrapper({
        items: [{ label: 'ホーム', href: '/', frontIcon: 'mdi-home' }],
      })
      expect(wrapper.find('.dads-global-menu__front-icon').attributes('aria-hidden')).toBe('true')
    })
  })
})
