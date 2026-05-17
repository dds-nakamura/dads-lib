import { afterEach, describe, expect, it } from 'vitest'
import { enableAutoUnmount, mount } from '@vue/test-utils'
import { axe } from 'vitest-axe'
import DadsUtilityLink from '../DadsUtilityLink.vue'
import type { DadsUtilityLinkItem, DadsUtilityLinkProps } from '../DadsUtilityLink.types'

enableAutoUnmount(afterEach)

const sampleItems: DadsUtilityLinkItem[] = [
  { label: 'お問合わせ', href: '/contact' },
  { label: 'よくあるご質問', href: '/faq' },
  { label: 'プライバシーポリシー', href: '/privacy' },
]

const createWrapper = (props: Partial<DadsUtilityLinkProps> = {}) =>
  mount(DadsUtilityLink, {
    props: props as DadsUtilityLinkProps,
  })

describe('DadsUtilityLink', () => {
  describe('single-link mode rendering', () => {
    it('renders an <a> with dads-utility-link class when href + label are provided', () => {
      const wrapper = createWrapper({ href: '/contact', label: 'お問合わせ' })
      // Vue's v-if / v-else-if multi-root template renders as a fragment, which
      // vue-test-utils wraps in a host <div>. Query the actual element instead.
      const anchor = wrapper.find('a.dads-utility-link')
      expect(anchor.exists()).toBe(true)
      expect(anchor.element.tagName).toBe('A')
      expect(anchor.classes()).toContain('dads-utility-link')
    })

    it('renders the label inside a dads-utility-link__label span', () => {
      const wrapper = createWrapper({ href: '/contact', label: 'お問合わせ' })
      const label = wrapper.find('span.dads-utility-link__label')
      expect(label.exists()).toBe(true)
      expect(label.text()).toBe('お問合わせ')
    })

    it('sets the href attribute from props', () => {
      const wrapper = createWrapper({ href: '/contact', label: 'お問合わせ' })
      const anchor = wrapper.find('a.dads-utility-link')
      expect(anchor.attributes('href')).toBe('/contact')
    })

    it('does not render the root <a> when neither href nor label is provided', () => {
      // empty props -> nothing to render
      const wrapper = createWrapper({})
      expect(wrapper.find('a.dads-utility-link').exists()).toBe(false)
      expect(wrapper.find('ul.dads-utility-link-list').exists()).toBe(false)
    })
  })

  describe('external link behaviour', () => {
    it('adds target="_blank" and rel="noopener noreferrer" when external=true', () => {
      const wrapper = createWrapper({
        href: 'https://example.com',
        label: '外部サイト',
        external: true,
      })
      const anchor = wrapper.find('a.dads-utility-link')
      expect(anchor.attributes('target')).toBe('_blank')
      expect(anchor.attributes('rel')).toBe('noopener noreferrer')
    })

    it('omits target and rel for non-external links', () => {
      const wrapper = createWrapper({ href: '/contact', label: 'お問合わせ' })
      const anchor = wrapper.find('a.dads-utility-link')
      expect(anchor.attributes('target')).toBeUndefined()
      expect(anchor.attributes('rel')).toBeUndefined()
    })

    it('renders the tail-icon SVG with accessible label when external=true', () => {
      const wrapper = createWrapper({
        href: 'https://example.com',
        label: '外部サイト',
        external: true,
      })
      const tail = wrapper.find('svg.dads-utility-link__tail-icon')
      expect(tail.exists()).toBe(true)
      expect(tail.attributes('role')).toBe('img')
      expect(tail.attributes('aria-label')).toBe('新規タブで開きます')
    })

    it('does not render the tail-icon when external is falsy', () => {
      const wrapper = createWrapper({ href: '/contact', label: 'お問合わせ' })
      expect(wrapper.find('svg.dads-utility-link__tail-icon').exists()).toBe(false)
    })
  })

  describe('lead icon (iconName)', () => {
    it('renders an mdi-prefixed icon element when iconName is provided', () => {
      const wrapper = createWrapper({
        href: '/help',
        label: 'ヘルプ',
        iconName: 'mdi-help-circle-outline',
      })
      const icon = wrapper.find('i.dads-utility-link__lead-icon')
      expect(icon.exists()).toBe(true)
      expect(icon.classes()).toContain('mdi')
      expect(icon.classes()).toContain('mdi-help-circle-outline')
      expect(icon.attributes('aria-hidden')).toBe('true')
    })

    it('does not render a lead icon when iconName is omitted', () => {
      const wrapper = createWrapper({ href: '/contact', label: 'お問合わせ' })
      expect(wrapper.find('i.dads-utility-link__lead-icon').exists()).toBe(false)
    })
  })

  describe('list mode rendering (items)', () => {
    it('renders a <ul> with dads-utility-link-list class', () => {
      const wrapper = createWrapper({ items: sampleItems })
      const ul = wrapper.find('ul.dads-utility-link-list')
      expect(ul.exists()).toBe(true)
      expect(ul.element.tagName).toBe('UL')
      expect(ul.classes()).toContain('dads-utility-link-list')
    })

    it('renders one <li> per item', () => {
      const wrapper = createWrapper({ items: sampleItems })
      const lis = wrapper.findAll('li.dads-utility-link-list__item')
      expect(lis).toHaveLength(sampleItems.length)
    })

    it('renders an <a class="dads-utility-link"> per item with the correct href', () => {
      const wrapper = createWrapper({ items: sampleItems })
      const links = wrapper.findAll('a.dads-utility-link')
      expect(links).toHaveLength(sampleItems.length)
      expect(links[0]?.attributes('href')).toBe('/contact')
      expect(links[1]?.attributes('href')).toBe('/faq')
      expect(links[2]?.attributes('href')).toBe('/privacy')
    })

    it('renders the label text for each list item', () => {
      const wrapper = createWrapper({ items: sampleItems })
      const text = wrapper.text()
      for (const item of sampleItems) {
        expect(text).toContain(item.label)
      }
    })

    it('renders an empty <ul> with no items when items is an empty array', () => {
      const wrapper = createWrapper({ items: [] })
      const ul = wrapper.find('ul.dads-utility-link-list')
      expect(ul.exists()).toBe(true)
      expect(wrapper.findAll('li.dads-utility-link-list__item')).toHaveLength(0)
    })

    it('applies external attrs and tail-icon per item independently', () => {
      const wrapper = createWrapper({
        items: [
          { label: '内部', href: '/internal' },
          { label: '外部', href: 'https://example.com', external: true },
        ],
      })
      const links = wrapper.findAll('a.dads-utility-link')
      expect(links[0]?.attributes('target')).toBeUndefined()
      expect(links[1]?.attributes('target')).toBe('_blank')
      expect(links[1]?.attributes('rel')).toBe('noopener noreferrer')
      // Only the external item has a tail-icon
      expect(links[0]?.find('svg.dads-utility-link__tail-icon').exists()).toBe(false)
      expect(links[1]?.find('svg.dads-utility-link__tail-icon').exists()).toBe(true)
    })

    it('renders per-item lead icons only when iconName is provided', () => {
      const wrapper = createWrapper({
        items: [
          { label: 'ヘルプ', href: '/help', iconName: 'mdi-help-circle-outline' },
          { label: 'お問合わせ', href: '/contact' },
        ],
      })
      const links = wrapper.findAll('a.dads-utility-link')
      expect(links[0]?.find('i.dads-utility-link__lead-icon').exists()).toBe(true)
      expect(links[0]?.find('i.dads-utility-link__lead-icon').classes()).toContain(
        'mdi-help-circle-outline',
      )
      expect(links[1]?.find('i.dads-utility-link__lead-icon').exists()).toBe(false)
    })
  })

  describe('aria-label on list', () => {
    it('uses the default aria-label "ユーティリティリンク"', () => {
      const wrapper = createWrapper({ items: sampleItems })
      const ul = wrapper.find('ul.dads-utility-link-list')
      expect(ul.attributes('aria-label')).toBe('ユーティリティリンク')
    })

    it('overrides aria-label via the ariaLabel prop', () => {
      const wrapper = createWrapper({ items: sampleItems, ariaLabel: 'フッターリンク' })
      const ul = wrapper.find('ul.dads-utility-link-list')
      expect(ul.attributes('aria-label')).toBe('フッターリンク')
    })
  })

  describe('events', () => {
    it('emits click:item with index 0 in single-link mode', async () => {
      const wrapper = createWrapper({ href: '/contact', label: 'お問合わせ' })
      const anchor = wrapper.find('a.dads-utility-link')
      await anchor.trigger('click')
      const events = wrapper.emitted('click:item')
      expect(events).toHaveLength(1)
      const [item, index, event] = events?.[0] as [DadsUtilityLinkItem, number, MouseEvent]
      expect(item.label).toBe('お問合わせ')
      expect(item.href).toBe('/contact')
      expect(index).toBe(0)
      expect(event).toBeInstanceOf(Event)
    })

    it('emits click:item with the correct index in list mode', async () => {
      const wrapper = createWrapper({ items: sampleItems })
      const links = wrapper.findAll('a.dads-utility-link')
      await links[1]?.trigger('click')
      const events = wrapper.emitted('click:item')
      expect(events).toHaveLength(1)
      const [item, index] = events?.[0] as [DadsUtilityLinkItem, number, MouseEvent]
      expect(item).toEqual(sampleItems[1])
      expect(index).toBe(1)
    })

    it('emits click:item for the last item with the correct index', async () => {
      const wrapper = createWrapper({ items: sampleItems })
      const links = wrapper.findAll('a.dads-utility-link')
      await links[2]?.trigger('click')
      const events = wrapper.emitted('click:item')
      expect(events).toHaveLength(1)
      expect(events?.[0]?.[1]).toBe(2)
    })
  })

  describe('mode priority', () => {
    it('prefers items over single-link props when both are provided', () => {
      const wrapper = createWrapper({
        items: sampleItems,
        href: '/single',
        label: '単一リンク',
      })
      const ul = wrapper.find('ul.dads-utility-link-list')
      expect(ul.exists()).toBe(true)
      // No bare single-link anchor that points to /single should exist.
      const anchors = wrapper.findAll('a.dads-utility-link')
      const hrefs = anchors.map((a) => a.attributes('href'))
      expect(hrefs).not.toContain('/single')
      expect(wrapper.text()).not.toContain('単一リンク')
      expect(wrapper.text()).toContain('お問合わせ')
    })
  })

  describe('a11y (vitest-axe)', () => {
    const mountInBody = (props: Partial<DadsUtilityLinkProps>) =>
      mount(DadsUtilityLink, {
        props: props as DadsUtilityLinkProps,
        attachTo: document.body,
      })

    it('has no violations in single-link mode', async () => {
      const wrapper = mountInBody({ href: '/contact', label: 'お問合わせ' })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations with icon and external markers', async () => {
      const wrapper = mountInBody({
        href: 'https://example.com',
        label: '外部リソース',
        iconName: 'mdi-help-circle-outline',
        external: true,
      })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations in list mode', async () => {
      const wrapper = mountInBody({ items: sampleItems })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations with mixed external items in list mode', async () => {
      const wrapper = mountInBody({
        items: [
          { label: 'お問合わせ', href: '/contact' },
          { label: '外部サイト', href: 'https://example.com', external: true },
        ],
      })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })
  })
})
