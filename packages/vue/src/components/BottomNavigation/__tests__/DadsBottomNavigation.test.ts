import { afterEach, describe, expect, it } from 'vitest'
import { enableAutoUnmount, mount } from '@vue/test-utils'
import DadsBottomNavigation from '../DadsBottomNavigation.vue'
import type {
  DadsBottomNavigationItem,
  DadsBottomNavigationProps,
} from '../DadsBottomNavigation.types'

enableAutoUnmount(afterEach)

const items: DadsBottomNavigationItem[] = [
  { id: 'home', label: 'ホーム', iconName: 'mdi-home' },
  { id: 'search', label: '検索', iconName: 'mdi-magnify' },
  { id: 'favorites', label: 'お気に入り', iconName: 'mdi-heart' },
  { id: 'profile', label: 'プロフィール', iconName: 'mdi-account' },
]

const createWrapper = (props: Partial<DadsBottomNavigationProps> = {}) =>
  mount(DadsBottomNavigation, {
    props: { items, modelValue: 'home', ...props } as DadsBottomNavigationProps,
    attachTo: document.body,
  })

describe('DadsBottomNavigation', () => {
  describe('rendering', () => {
    it('renders a <nav> element with the dads-bottom-navigation class', () => {
      const wrapper = createWrapper()
      const nav = wrapper.find('nav')
      expect(nav.exists()).toBe(true)
      expect(nav.classes()).toContain('dads-bottom-navigation')
    })

    it('renders one item per entry in items', () => {
      const wrapper = createWrapper()
      const buttons = wrapper.findAll('.dads-bottom-navigation__item')
      expect(buttons).toHaveLength(items.length)
    })

    it('renders labels for each item', () => {
      const wrapper = createWrapper()
      const labels = wrapper.findAll('.dads-bottom-navigation__label').map((n) => n.text())
      expect(labels).toEqual(['ホーム', '検索', 'お気に入り', 'プロフィール'])
    })

    it('renders an icon element per item with the mdi class and iconName', () => {
      const wrapper = createWrapper()
      const icons = wrapper.findAll('.dads-bottom-navigation__icon')
      expect(icons).toHaveLength(items.length)
      expect(icons[0].classes()).toContain('mdi')
      expect(icons[0].classes()).toContain('mdi-home')
      expect(icons[1].classes()).toContain('mdi-magnify')
    })

    it('marks icons as aria-hidden', () => {
      const wrapper = createWrapper()
      const icons = wrapper.findAll('.dads-bottom-navigation__icon')
      icons.forEach((icon) => {
        expect(icon.attributes('aria-hidden')).toBe('true')
      })
    })
  })

  describe('aria-label on <nav>', () => {
    it('uses the default aria-label "ボトムナビゲーション" when not provided', () => {
      const wrapper = createWrapper()
      expect(wrapper.find('nav').attributes('aria-label')).toBe('ボトムナビゲーション')
    })

    it('respects a custom aria-label', () => {
      const wrapper = createWrapper({ ariaLabel: 'メインナビゲーション' })
      expect(wrapper.find('nav').attributes('aria-label')).toBe('メインナビゲーション')
    })
  })

  describe('active state', () => {
    it('sets aria-current="page" only on the active item', () => {
      const wrapper = createWrapper({ modelValue: 'search' })
      const buttons = wrapper.findAll('.dads-bottom-navigation__item')
      expect(buttons[0].attributes('aria-current')).toBeUndefined()
      expect(buttons[1].attributes('aria-current')).toBe('page')
      expect(buttons[2].attributes('aria-current')).toBeUndefined()
      expect(buttons[3].attributes('aria-current')).toBeUndefined()
    })

    it('adds the active modifier class to the active item', () => {
      const wrapper = createWrapper({ modelValue: 'favorites' })
      const buttons = wrapper.findAll('.dads-bottom-navigation__item')
      expect(buttons[2].classes()).toContain('dads-bottom-navigation__item--active')
      expect(buttons[0].classes()).not.toContain('dads-bottom-navigation__item--active')
    })

    it('updates the active item when modelValue changes', async () => {
      const wrapper = createWrapper({ modelValue: 'home' })
      await wrapper.setProps({ modelValue: 'profile' })
      const buttons = wrapper.findAll('.dads-bottom-navigation__item')
      expect(buttons[3].attributes('aria-current')).toBe('page')
      expect(buttons[0].attributes('aria-current')).toBeUndefined()
    })

    it('renders no aria-current when modelValue is undefined', () => {
      const wrapper = createWrapper({ modelValue: undefined })
      const buttons = wrapper.findAll('.dads-bottom-navigation__item')
      buttons.forEach((b) => {
        expect(b.attributes('aria-current')).toBeUndefined()
      })
    })
  })

  describe('events', () => {
    it('emits update:modelValue with the clicked item id', async () => {
      const wrapper = createWrapper({ modelValue: 'home' })
      await wrapper.findAll('.dads-bottom-navigation__item')[1].trigger('click')
      expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toBe('search')
    })

    it('emits change with the clicked item id', async () => {
      const wrapper = createWrapper({ modelValue: 'home' })
      await wrapper.findAll('.dads-bottom-navigation__item')[2].trigger('click')
      expect(wrapper.emitted('change')?.[0]?.[0]).toBe('favorites')
    })

    it('emits both update:modelValue and change on a single click', async () => {
      const wrapper = createWrapper({ modelValue: 'home' })
      await wrapper.findAll('.dads-bottom-navigation__item')[3].trigger('click')
      expect(wrapper.emitted('update:modelValue')).toHaveLength(1)
      expect(wrapper.emitted('change')).toHaveLength(1)
    })
  })

  describe('disabled', () => {
    const itemsWithDisabled: DadsBottomNavigationItem[] = [
      { id: 'a', label: 'A', iconName: 'mdi-home' },
      { id: 'b', label: 'B', iconName: 'mdi-magnify', disabled: true },
      { id: 'c', label: 'C', iconName: 'mdi-heart' },
    ]

    it('applies the disabled modifier class to a disabled item', () => {
      const wrapper = createWrapper({ items: itemsWithDisabled, modelValue: 'a' })
      const buttons = wrapper.findAll('.dads-bottom-navigation__item')
      expect(buttons[1].classes()).toContain('dads-bottom-navigation__item--disabled')
    })

    it('renders the native disabled attribute on a disabled <button>', () => {
      const wrapper = createWrapper({ items: itemsWithDisabled, modelValue: 'a' })
      const buttons = wrapper.findAll('.dads-bottom-navigation__item')
      expect(buttons[1].attributes('disabled')).toBeDefined()
    })

    it('does not emit when clicking a disabled item', async () => {
      const wrapper = createWrapper({ items: itemsWithDisabled, modelValue: 'a' })
      // Native <button disabled> blocks click events entirely.
      await wrapper.findAll('.dads-bottom-navigation__item')[1].trigger('click')
      expect(wrapper.emitted('update:modelValue')).toBeUndefined()
      expect(wrapper.emitted('change')).toBeUndefined()
    })
  })

  describe('anchor mode (href)', () => {
    const anchorItems: DadsBottomNavigationItem[] = [
      { id: 'home', label: 'ホーム', iconName: 'mdi-home', href: '/' },
      { id: 'about', label: '紹介', iconName: 'mdi-information', href: '/about' },
      {
        id: 'contact',
        label: '連絡先',
        iconName: 'mdi-email',
        href: '/contact',
        disabled: true,
      },
    ]

    it('renders items with href as <a> elements', () => {
      const wrapper = createWrapper({ items: anchorItems, modelValue: 'home' })
      const anchors = wrapper.findAll('a.dads-bottom-navigation__item')
      expect(anchors).toHaveLength(3)
    })

    it('emits update:modelValue when an anchor item is clicked', async () => {
      const wrapper = createWrapper({ items: anchorItems, modelValue: 'home' })
      await wrapper.findAll('a.dads-bottom-navigation__item')[1].trigger('click')
      expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toBe('about')
    })

    it('sets aria-disabled and omits href on a disabled anchor', () => {
      const wrapper = createWrapper({ items: anchorItems, modelValue: 'home' })
      const anchors = wrapper.findAll('a.dads-bottom-navigation__item')
      expect(anchors[2].attributes('aria-disabled')).toBe('true')
      expect(anchors[2].attributes('href')).toBeUndefined()
      expect(anchors[2].attributes('tabindex')).toBe('-1')
    })

    it('does not emit when clicking a disabled anchor', async () => {
      const wrapper = createWrapper({ items: anchorItems, modelValue: 'home' })
      await wrapper.findAll('a.dads-bottom-navigation__item')[2].trigger('click')
      expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    })
  })
})
