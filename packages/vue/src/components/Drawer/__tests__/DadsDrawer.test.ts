import { afterEach, describe, expect, it, vi } from 'vitest'
import { enableAutoUnmount, mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import DadsDrawer from '../DadsDrawer.vue'
import DadsDrawerItem from '../DadsDrawerItem.vue'
import type { DadsDrawerItem as DadsDrawerItemType, DadsDrawerProps } from '../DadsDrawer.types'

enableAutoUnmount(afterEach)

const flatItems: DadsDrawerItemType[] = [
  { label: 'ホーム', href: '/', icon: 'mdi-home' },
  { label: 'タスク', href: '/tasks' },
  { label: '設定', icon: 'mdi-cog' },
]

const nestedItems: DadsDrawerItemType[] = [
  { label: 'ホーム', href: '/' },
  {
    label: 'プロジェクト',
    children: [
      { label: '一覧', href: '/projects' },
      { label: '新規作成', href: '/projects/new' },
    ],
  },
]

const createWrapper = (props: Partial<DadsDrawerProps> = {}) =>
  mount(DadsDrawer, {
    props: {
      modelValue: true,
      items: flatItems,
      ...props,
    } as DadsDrawerProps,
    attachTo: document.body,
  })

const queryDrawer = () => document.body.querySelector('.dads-drawer')

describe('DadsDrawer', () => {
  describe('rendering', () => {
    it('does not render the drawer when modelValue is false', () => {
      createWrapper({ modelValue: false })
      expect(queryDrawer()).toBeNull()
    })

    it('renders the drawer when modelValue is true', () => {
      createWrapper({ modelValue: true })
      expect(queryDrawer()).not.toBeNull()
    })

    it('teleports the drawer into the document.body subtree', () => {
      createWrapper()
      // Teleport target is document.body — the drawer must be reachable from
      // document.body's subtree, even if it lives outside the wrapper root.
      expect(document.body.contains(queryDrawer())).toBe(true)
    })

    it('renders the overlay element', () => {
      createWrapper()
      expect(document.body.querySelector('.dads-drawer__overlay')).not.toBeNull()
    })

    it('renders the panel element', () => {
      createWrapper()
      expect(document.body.querySelector('.dads-drawer__panel')).not.toBeNull()
    })
  })

  describe('a11y attributes', () => {
    it('sets role="dialog"', () => {
      createWrapper()
      expect(queryDrawer()?.getAttribute('role')).toBe('dialog')
    })

    it('sets aria-modal="true"', () => {
      createWrapper()
      expect(queryDrawer()?.getAttribute('aria-modal')).toBe('true')
    })

    it('falls back to "ナビゲーション" aria-label when title is missing', () => {
      createWrapper()
      expect(queryDrawer()?.getAttribute('aria-label')).toBe('ナビゲーション')
    })

    it('uses title as aria-label when provided', () => {
      createWrapper({ title: 'メインメニュー' })
      expect(queryDrawer()?.getAttribute('aria-label')).toBe('メインメニュー')
    })

    it('sets the close button aria-label to "閉じる" by default', () => {
      createWrapper()
      const closeBtn = document.body.querySelector('.dads-drawer__close')
      expect(closeBtn?.getAttribute('aria-label')).toBe('閉じる')
    })

    it('overrides the close button aria-label via closeLabel prop', () => {
      createWrapper({ closeLabel: 'Close menu' })
      const closeBtn = document.body.querySelector('.dads-drawer__close')
      expect(closeBtn?.getAttribute('aria-label')).toBe('Close menu')
    })
  })

  describe('title', () => {
    it('renders the title heading when provided', () => {
      createWrapper({ title: 'メインメニュー' })
      const title = document.body.querySelector('.dads-drawer__title')
      expect(title?.textContent).toBe('メインメニュー')
    })

    it('omits the title heading when prop is undefined', () => {
      createWrapper()
      expect(document.body.querySelector('.dads-drawer__title')).toBeNull()
    })
  })

  describe('items', () => {
    it('renders one item per entry', () => {
      const wrapper = createWrapper()
      expect(wrapper.findAllComponents(DadsDrawerItem)).toHaveLength(3)
    })

    it('renders an <a> for items with href', () => {
      createWrapper()
      const anchor = document.body.querySelector('a.dads-drawer__item-button')
      expect(anchor?.getAttribute('href')).toBe('/')
    })

    it('renders a <button> for items without href and without children', () => {
      createWrapper()
      const buttons = document.body.querySelectorAll('button.dads-drawer__item-button')
      // 1 close button + 1 settings (no href, no children) = 2 buttons
      expect(buttons.length).toBeGreaterThanOrEqual(1)
      const labels = Array.from(buttons).map((b) => b.textContent?.trim())
      expect(labels.some((l) => l?.includes('設定'))).toBe(true)
    })

    it('renders mdi icon class when item.icon is set', () => {
      createWrapper()
      const homeIcon = document.body.querySelector('.mdi-home')
      expect(homeIcon).not.toBeNull()
    })
  })

  describe('close interactions', () => {
    it('emits update:modelValue=false when close button is clicked', async () => {
      const wrapper = createWrapper()
      const closeBtn = document.body.querySelector('.dads-drawer__close') as HTMLButtonElement
      closeBtn.click()
      await nextTick()
      const events = wrapper.emitted('update:modelValue')
      expect(events?.[0]?.[0]).toBe(false)
    })

    it('emits update:modelValue=false when the overlay is clicked', async () => {
      const wrapper = createWrapper()
      const overlay = document.body.querySelector('.dads-drawer__overlay') as HTMLElement
      overlay.click()
      await nextTick()
      const events = wrapper.emitted('update:modelValue')
      expect(events?.[0]?.[0]).toBe(false)
    })

    it('emits update:modelValue=false on Esc keydown', async () => {
      const wrapper = createWrapper()
      const drawer = queryDrawer() as HTMLElement
      drawer.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
      await nextTick()
      const events = wrapper.emitted('update:modelValue')
      expect(events?.[0]?.[0]).toBe(false)
    })
  })

  describe('item click', () => {
    it('emits click:item with the item and event', async () => {
      const wrapper = createWrapper()
      const anchor = document.body.querySelector('a.dads-drawer__item-button') as HTMLAnchorElement
      anchor.click()
      await nextTick()
      const events = wrapper.emitted('click:item')
      expect(events).toBeTruthy()
      expect((events?.[0]?.[0] as DadsDrawerItemType).label).toBe('ホーム')
      expect(events?.[0]?.[1]).toBeInstanceOf(MouseEvent)
    })

    it('emits update:modelValue=false after clicking a leaf item (auto-close)', async () => {
      const wrapper = createWrapper()
      const anchor = document.body.querySelector('a.dads-drawer__item-button') as HTMLAnchorElement
      anchor.click()
      await nextTick()
      const events = wrapper.emitted('update:modelValue')
      expect(events?.[0]?.[0]).toBe(false)
    })

    it('does not emit click:item for disabled items', async () => {
      const items: DadsDrawerItemType[] = [{ label: '無効', href: '/x', disabled: true }]
      const wrapper = createWrapper({ items })
      const anchor = document.body.querySelector('a.dads-drawer__item-button') as HTMLAnchorElement
      anchor.click()
      await nextTick()
      expect(wrapper.emitted('click:item')).toBeFalsy()
    })

    it('does not auto-close when a disabled item is clicked', async () => {
      const items: DadsDrawerItemType[] = [{ label: '無効', href: '/x', disabled: true }]
      const wrapper = createWrapper({ items })
      const anchor = document.body.querySelector('a.dads-drawer__item-button') as HTMLAnchorElement
      anchor.click()
      await nextTick()
      expect(wrapper.emitted('update:modelValue')).toBeFalsy()
    })

    it('invokes the per-item onClick callback', async () => {
      const onClick = vi.fn()
      const items: DadsDrawerItemType[] = [{ label: 'コールバック', onClick }]
      createWrapper({ items })
      const button = document.body.querySelector(
        'button.dads-drawer__item-button',
      ) as HTMLButtonElement
      button.click()
      await nextTick()
      expect(onClick).toHaveBeenCalledTimes(1)
    })
  })

  describe('children (accordion)', () => {
    it('renders a <details> element for items with children', () => {
      createWrapper({ items: nestedItems })
      const details = document.body.querySelector('.dads-drawer__item-details')
      expect(details?.tagName).toBe('DETAILS')
    })

    it('renders nested items inside the children list', () => {
      createWrapper({ items: nestedItems })
      const childList = document.body.querySelector('.dads-drawer__item-children')
      const childItems = childList?.querySelectorAll('a.dads-drawer__item-button')
      expect(childItems?.length).toBe(2)
    })

    it('does not render <details> when an item has no children', () => {
      createWrapper({ items: flatItems })
      expect(document.body.querySelector('.dads-drawer__item-details')).toBeNull()
    })

    it('does not auto-close when a parent (with children) is clicked', async () => {
      const wrapper = createWrapper({ items: nestedItems })
      // Clicking the disclosure summary toggles the accordion; it must not
      // close the drawer because the user is exploring children.
      const summary = document.body.querySelector(
        'details.dads-drawer__item-details > summary',
      ) as HTMLElement
      summary.click()
      await nextTick()
      expect(wrapper.emitted('update:modelValue')).toBeFalsy()
    })

    it('bubbles click:item from nested children up to the drawer', async () => {
      const wrapper = createWrapper({ items: nestedItems })
      const childList = document.body.querySelector('.dads-drawer__item-children') as HTMLElement
      const firstChild = childList.querySelector('a.dads-drawer__item-button') as HTMLAnchorElement
      firstChild.click()
      await nextTick()
      const events = wrapper.emitted('click:item')
      expect(events).toBeTruthy()
      expect((events?.[0]?.[0] as DadsDrawerItemType).label).toBe('一覧')
    })
  })

  describe('disabled items', () => {
    it('omits href on disabled anchor items', () => {
      const items: DadsDrawerItemType[] = [{ label: '無効', href: '/x', disabled: true }]
      createWrapper({ items })
      const anchor = document.body.querySelector('a.dads-drawer__item-button') as HTMLAnchorElement
      // Vue renders attribute as undefined → element has no href attribute.
      expect(anchor.hasAttribute('href')).toBe(false)
      expect(anchor.getAttribute('aria-disabled')).toBe('true')
    })

    it('sets disabled attribute on disabled button items', () => {
      const items: DadsDrawerItemType[] = [{ label: '無効ボタン', disabled: true }]
      createWrapper({ items })
      const button = document.body.querySelector(
        'button.dads-drawer__item-button',
      ) as HTMLButtonElement
      expect(button.disabled).toBe(true)
    })
  })

  describe('focus management', () => {
    it('focuses the panel when the drawer opens', async () => {
      const wrapper = mount(DadsDrawer, {
        props: { modelValue: false, items: flatItems } as DadsDrawerProps,
        attachTo: document.body,
      })
      await wrapper.setProps({ modelValue: true })
      await nextTick()
      await nextTick()
      const panel = document.body.querySelector('.dads-drawer__panel') as HTMLElement
      expect(document.activeElement).toBe(panel)
    })

    it('restores focus to the previously active element on close', async () => {
      const trigger = document.createElement('button')
      trigger.textContent = 'open'
      document.body.appendChild(trigger)
      trigger.focus()
      expect(document.activeElement).toBe(trigger)

      const wrapper = mount(DadsDrawer, {
        props: { modelValue: false, items: flatItems } as DadsDrawerProps,
        attachTo: document.body,
      })
      await wrapper.setProps({ modelValue: true })
      await nextTick()
      await nextTick()
      await wrapper.setProps({ modelValue: false })
      await nextTick()
      expect(document.activeElement).toBe(trigger)
      trigger.remove()
    })

    it('traps Tab from the last focusable back to the first', async () => {
      const wrapper = mount(DadsDrawer, {
        props: { modelValue: false, items: flatItems } as DadsDrawerProps,
        attachTo: document.body,
      })
      await wrapper.setProps({ modelValue: true })
      await nextTick()
      await nextTick()

      const focusables = Array.from(
        document.body.querySelectorAll<HTMLElement>(
          '.dads-drawer__panel a[href], .dads-drawer__panel button:not([disabled])',
        ),
      )
      expect(focusables.length).toBeGreaterThan(1)
      const last = focusables[focusables.length - 1]
      const first = focusables[0]
      last.focus()
      expect(document.activeElement).toBe(last)

      const drawer = queryDrawer() as HTMLElement
      const event = new KeyboardEvent('keydown', {
        key: 'Tab',
        bubbles: true,
        cancelable: true,
      })
      drawer.dispatchEvent(event)
      await nextTick()
      expect(document.activeElement).toBe(first)
    })

    it('traps Shift+Tab from the panel back to the last focusable', async () => {
      const wrapper = mount(DadsDrawer, {
        props: { modelValue: false, items: flatItems } as DadsDrawerProps,
        attachTo: document.body,
      })
      await wrapper.setProps({ modelValue: true })
      await nextTick()
      await nextTick()

      const focusables = Array.from(
        document.body.querySelectorAll<HTMLElement>(
          '.dads-drawer__panel a[href], .dads-drawer__panel button:not([disabled])',
        ),
      )
      const last = focusables[focusables.length - 1]
      // Panel has focus by default after open.
      const drawer = queryDrawer() as HTMLElement
      const event = new KeyboardEvent('keydown', {
        key: 'Tab',
        shiftKey: true,
        bubbles: true,
        cancelable: true,
      })
      drawer.dispatchEvent(event)
      await nextTick()
      expect(document.activeElement).toBe(last)
    })
  })
})
