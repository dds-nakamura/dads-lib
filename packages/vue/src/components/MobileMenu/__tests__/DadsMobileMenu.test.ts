import { afterEach, describe, expect, it } from 'vitest'
import { enableAutoUnmount, mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import DadsMobileMenu from '../DadsMobileMenu.vue'
import DadsMenuList from '../../MenuList/DadsMenuList.vue'
import DadsUtilityLink from '../../UtilityLink/DadsUtilityLink.vue'
import type { DadsMenuListItem } from '../../MenuList/DadsMenuList.types'
import type { DadsUtilityLinkItem } from '../../UtilityLink/DadsUtilityLink.types'
import type { DadsMobileMenuProps } from '../DadsMobileMenu.types'

enableAutoUnmount(afterEach)

const flatItems: DadsMenuListItem[] = [
  { label: 'ホーム', href: '/' },
  { label: 'サービス', href: '/services' },
  { label: 'お知らせ', href: '/news' },
]

const utilityItems: DadsUtilityLinkItem[] = [
  { label: 'ログイン', href: '/login' },
  { label: 'お問い合わせ', href: '/contact' },
]

const createWrapper = (props: Partial<DadsMobileMenuProps> = {}) =>
  mount(DadsMobileMenu, {
    props: {
      modelValue: true,
      items: flatItems,
      ...props,
    } as DadsMobileMenuProps,
    attachTo: document.body,
  })

const queryMenu = () => document.body.querySelector('.dads-mobile-menu')

describe('DadsMobileMenu', () => {
  describe('rendering', () => {
    it('does not render the menu when modelValue is false', () => {
      createWrapper({ modelValue: false })
      expect(queryMenu()).toBeNull()
    })

    it('renders the menu when modelValue is true', () => {
      createWrapper({ modelValue: true })
      expect(queryMenu()).not.toBeNull()
    })

    it('teleports the menu into the document.body subtree', () => {
      createWrapper()
      expect(document.body.contains(queryMenu())).toBe(true)
    })

    it('renders the overlay element', () => {
      createWrapper()
      expect(document.body.querySelector('.dads-mobile-menu__overlay')).not.toBeNull()
    })

    it('renders the panel element', () => {
      createWrapper()
      expect(document.body.querySelector('.dads-mobile-menu__panel')).not.toBeNull()
    })
  })

  describe('a11y attributes', () => {
    it('sets role="dialog"', () => {
      createWrapper()
      expect(queryMenu()?.getAttribute('role')).toBe('dialog')
    })

    it('sets aria-modal="true"', () => {
      createWrapper()
      expect(queryMenu()?.getAttribute('aria-modal')).toBe('true')
    })

    it('uses default aria-label "モバイルメニュー"', () => {
      createWrapper()
      expect(queryMenu()?.getAttribute('aria-label')).toBe('モバイルメニュー')
    })

    it('uses custom aria-label when provided', () => {
      createWrapper({ ariaLabel: 'ナビゲーション' })
      expect(queryMenu()?.getAttribute('aria-label')).toBe('ナビゲーション')
    })

    it('sets the close button aria-label to "閉じる" by default', () => {
      createWrapper()
      const closeBtn = document.body.querySelector('.dads-mobile-menu__close')
      expect(closeBtn?.getAttribute('aria-label')).toBe('閉じる')
    })

    it('overrides the close button aria-label via closeLabel prop', () => {
      createWrapper({ closeLabel: 'Close menu' })
      const closeBtn = document.body.querySelector('.dads-mobile-menu__close')
      expect(closeBtn?.getAttribute('aria-label')).toBe('Close menu')
    })
  })

  describe('items rendering', () => {
    it('renders a DadsMenuList component for main items', () => {
      const wrapper = createWrapper()
      expect(wrapper.findComponent(DadsMenuList).exists()).toBe(true)
    })

    it('passes the items prop through to DadsMenuList', () => {
      const wrapper = createWrapper()
      const menuList = wrapper.findComponent(DadsMenuList)
      expect(menuList.props('items')).toEqual(flatItems)
    })

    it('renders one anchor per main item with href', () => {
      createWrapper()
      const anchors = document.body.querySelectorAll(
        '.dads-mobile-menu__nav a.dads-menu-list__item',
      )
      expect(anchors.length).toBe(3)
    })

    it('renders the item labels', () => {
      createWrapper()
      const labels = Array.from(
        document.body.querySelectorAll('.dads-mobile-menu__nav .dads-menu-list__label'),
      ).map((el) => el.textContent?.trim())
      expect(labels).toEqual(expect.arrayContaining(['ホーム', 'サービス', 'お知らせ']))
    })
  })

  describe('utilityItems', () => {
    it('does not render the utility region when utilityItems is undefined', () => {
      createWrapper()
      expect(document.body.querySelector('.dads-mobile-menu__utility')).toBeNull()
    })

    it('does not render the utility region when utilityItems is an empty array', () => {
      createWrapper({ utilityItems: [] })
      expect(document.body.querySelector('.dads-mobile-menu__utility')).toBeNull()
    })

    it('renders a DadsUtilityLink component when utilityItems is provided', () => {
      const wrapper = createWrapper({ utilityItems })
      expect(wrapper.findComponent(DadsUtilityLink).exists()).toBe(true)
    })

    it('renders one anchor per utility item', () => {
      createWrapper({ utilityItems })
      const anchors = document.body.querySelectorAll(
        '.dads-mobile-menu__utility a.dads-utility-link',
      )
      expect(anchors.length).toBe(2)
    })
  })

  describe('close interactions', () => {
    it('renders the close button by default', () => {
      createWrapper()
      expect(document.body.querySelector('.dads-mobile-menu__close')).not.toBeNull()
    })

    it('omits the close button when showCloseButton is false', () => {
      createWrapper({ showCloseButton: false })
      expect(document.body.querySelector('.dads-mobile-menu__close')).toBeNull()
    })

    it('emits update:modelValue=false when close button is clicked', async () => {
      const wrapper = createWrapper()
      const closeBtn = document.body.querySelector('.dads-mobile-menu__close') as HTMLButtonElement
      closeBtn.click()
      await nextTick()
      const events = wrapper.emitted('update:modelValue')
      expect(events?.[0]?.[0]).toBe(false)
    })

    it('emits update:modelValue=false when the overlay is clicked', async () => {
      const wrapper = createWrapper()
      const overlay = document.body.querySelector('.dads-mobile-menu__overlay') as HTMLElement
      overlay.click()
      await nextTick()
      const events = wrapper.emitted('update:modelValue')
      expect(events?.[0]?.[0]).toBe(false)
    })

    it('emits update:modelValue=false on Escape keydown', async () => {
      const wrapper = createWrapper()
      const menu = queryMenu() as HTMLElement
      menu.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
      await nextTick()
      const events = wrapper.emitted('update:modelValue')
      expect(events?.[0]?.[0]).toBe(false)
    })
  })

  describe('item click', () => {
    it('emits click:item with the item and event when a menu item is clicked', async () => {
      const wrapper = createWrapper()
      const anchor = document.body.querySelector(
        '.dads-mobile-menu__nav a.dads-menu-list__item',
      ) as HTMLAnchorElement
      anchor.click()
      await nextTick()
      const events = wrapper.emitted('click:item')
      expect(events).toBeTruthy()
      expect((events?.[0]?.[0] as DadsMenuListItem).label).toBe('ホーム')
      expect(events?.[0]?.[1]).toBeInstanceOf(MouseEvent)
    })

    it('auto-closes after clicking a leaf menu item', async () => {
      const wrapper = createWrapper()
      const anchor = document.body.querySelector(
        '.dads-mobile-menu__nav a.dads-menu-list__item',
      ) as HTMLAnchorElement
      anchor.click()
      await nextTick()
      const events = wrapper.emitted('update:modelValue')
      expect(events?.[0]?.[0]).toBe(false)
    })

    it('emits click:utility when a utility link is clicked', async () => {
      const wrapper = createWrapper({ utilityItems })
      const anchor = document.body.querySelector(
        '.dads-mobile-menu__utility a.dads-utility-link',
      ) as HTMLAnchorElement
      anchor.click()
      await nextTick()
      const events = wrapper.emitted('click:utility')
      expect(events).toBeTruthy()
      expect((events?.[0]?.[0] as DadsUtilityLinkItem).label).toBe('ログイン')
      expect(events?.[0]?.[1]).toBe(0)
    })
  })

  describe('focus management', () => {
    it('focuses the panel when the menu opens', async () => {
      const wrapper = mount(DadsMobileMenu, {
        props: { modelValue: false, items: flatItems } as DadsMobileMenuProps,
        attachTo: document.body,
      })
      await wrapper.setProps({ modelValue: true })
      await nextTick()
      await nextTick()
      const panel = document.body.querySelector('.dads-mobile-menu__panel') as HTMLElement
      expect(document.activeElement).toBe(panel)
    })

    it('restores focus to the previously active element on close', async () => {
      const trigger = document.createElement('button')
      trigger.textContent = 'open'
      document.body.appendChild(trigger)
      trigger.focus()
      expect(document.activeElement).toBe(trigger)

      const wrapper = mount(DadsMobileMenu, {
        props: { modelValue: false, items: flatItems } as DadsMobileMenuProps,
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
  })
})
