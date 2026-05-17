import { afterEach, describe, expect, it } from 'vitest'
import { enableAutoUnmount, mount } from '@vue/test-utils'
import { axe } from 'vitest-axe'
import DadsResourceList from '../DadsResourceList.vue'
import type { DadsResourceListItem, DadsResourceListProps } from '../DadsResourceList.types'

enableAutoUnmount(afterEach)

const sampleItems: DadsResourceListItem[] = [
  { title: '健康診断', description: '2025年度', date: '受診日：2025/04/30' },
  { title: '給与明細', description: '2025年10月分', date: '支給日：2025/11/14' },
  { title: '住民票', description: '電子証明書付き', date: '発行日：2025/03/14' },
]

const createWrapper = (props: Partial<DadsResourceListProps> = {}) =>
  mount(DadsResourceList, {
    props: {
      items: sampleItems,
      ...props,
    } as DadsResourceListProps,
  })

describe('DadsResourceList', () => {
  describe('rendering', () => {
    it('renders the root <ul> with the dads-resource-list-group class', () => {
      const wrapper = createWrapper()
      const root = wrapper.find('ul.dads-resource-list-group')
      expect(root.exists()).toBe(true)
    })

    it('renders one <li> per item', () => {
      const wrapper = createWrapper()
      const lis = wrapper.findAll('li.dads-resource-list-group__item')
      expect(lis).toHaveLength(sampleItems.length)
    })

    it('renders a .dads-resource-list block inside every <li>', () => {
      const wrapper = createWrapper()
      const cards = wrapper.findAll('.dads-resource-list')
      expect(cards).toHaveLength(sampleItems.length)
    })

    it('handles an empty items array gracefully', () => {
      const wrapper = createWrapper({ items: [] })
      expect(wrapper.find('ul.dads-resource-list-group').exists()).toBe(true)
      expect(wrapper.findAll('li.dads-resource-list-group__item')).toHaveLength(0)
    })
  })

  describe('title', () => {
    it('renders the title text inside .dads-resource-list__title', () => {
      const wrapper = createWrapper()
      const titles = wrapper.findAll('.dads-resource-list__title')
      expect(titles).toHaveLength(sampleItems.length)
      expect(titles[0]?.text()).toBe('健康診断')
      expect(titles[1]?.text()).toBe('給与明細')
      expect(titles[2]?.text()).toBe('住民票')
    })

    it('renders the title as an <h3> heading element', () => {
      const wrapper = createWrapper()
      const heading = wrapper.find('h3.dads-resource-list__title')
      expect(heading.exists()).toBe(true)
    })
  })

  describe('description', () => {
    it('renders description text inside .dads-resource-list__support when present', () => {
      const wrapper = createWrapper({
        items: [{ title: 'T', description: 'サポートテキスト' }],
      })
      const support = wrapper.find('.dads-resource-list__support')
      expect(support.exists()).toBe(true)
      expect(support.text()).toContain('サポートテキスト')
    })

    it('omits the support block when description is absent', () => {
      const wrapper = createWrapper({ items: [{ title: 'T' }] })
      expect(wrapper.find('.dads-resource-list__support').exists()).toBe(false)
    })
  })

  describe('href / anchor rendering', () => {
    it('renders the body as <a> when href is provided', () => {
      const wrapper = createWrapper({
        items: [{ title: 'リンク', href: 'https://example.com' }],
      })
      const link = wrapper.find('a.dads-resource-list__body')
      expect(link.exists()).toBe(true)
      expect(link.attributes('href')).toBe('https://example.com')
    })

    it('renders the body as <div> when href is absent', () => {
      const wrapper = createWrapper({ items: [{ title: '静的' }] })
      expect(wrapper.find('a.dads-resource-list__body').exists()).toBe(false)
      expect(wrapper.find('div.dads-resource-list__body').exists()).toBe(true)
    })

    it('mixes <a> and <div> bodies when items have heterogeneous href', () => {
      const wrapper = createWrapper({
        items: [{ title: 'リンク', href: '/x' }, { title: 'プレーン' }],
      })
      expect(wrapper.findAll('a.dads-resource-list__body')).toHaveLength(1)
      expect(wrapper.findAll('div.dads-resource-list__body')).toHaveLength(1)
    })
  })

  describe('thumbnail', () => {
    it('renders an <img> with the given src when thumbnail is set', () => {
      const wrapper = createWrapper({
        items: [{ title: 'T', thumbnail: '/img/sample.png' }],
      })
      const img = wrapper.find('img.dads-resource-list__thumbnail')
      expect(img.exists()).toBe(true)
      expect(img.attributes('src')).toBe('/img/sample.png')
    })

    it('renders the thumbnail with an empty alt attribute (decorative)', () => {
      const wrapper = createWrapper({
        items: [{ title: 'T', thumbnail: '/img/sample.png' }],
      })
      const img = wrapper.find('img.dads-resource-list__thumbnail')
      expect(img.attributes('alt')).toBe('')
    })

    it('omits the thumbnail element when not set', () => {
      const wrapper = createWrapper({ items: [{ title: 'T' }] })
      expect(wrapper.find('img.dads-resource-list__thumbnail').exists()).toBe(false)
    })
  })

  describe('date (sub)', () => {
    it('renders the date inside .dads-resource-list__sub when present', () => {
      const wrapper = createWrapper({
        items: [{ title: 'T', date: '受診日：2025/04/30' }],
      })
      const sub = wrapper.find('.dads-resource-list__sub')
      expect(sub.exists()).toBe(true)
      expect(sub.text()).toContain('受診日：2025/04/30')
    })

    it('omits the .dads-resource-list__sub block when date is absent', () => {
      const wrapper = createWrapper({ items: [{ title: 'T' }] })
      expect(wrapper.find('.dads-resource-list__sub').exists()).toBe(false)
    })
  })

  describe('tags', () => {
    it('renders one tag chip per entry in item.tags', () => {
      const wrapper = createWrapper({
        items: [{ title: 'T', tags: ['新着', 'PDF', '重要'] }],
      })
      const tags = wrapper.findAll('.dads-resource-list__tag')
      expect(tags).toHaveLength(3)
      expect(tags[0]?.text()).toBe('新着')
      expect(tags[1]?.text()).toBe('PDF')
      expect(tags[2]?.text()).toBe('重要')
    })

    it('omits the tags container when tags is absent or empty', () => {
      const wrapperA = createWrapper({ items: [{ title: 'T' }] })
      const wrapperB = createWrapper({ items: [{ title: 'T', tags: [] }] })
      expect(wrapperA.find('.dads-resource-list__tags').exists()).toBe(false)
      expect(wrapperB.find('.dads-resource-list__tags').exists()).toBe(false)
    })
  })

  describe('iconName', () => {
    it('renders an icon element with the mdi class when iconName is set and thumbnail is absent', () => {
      const wrapper = createWrapper({
        items: [{ title: 'T', iconName: 'mdi-file-document' }],
      })
      const icon = wrapper.find('.dads-resource-list__icon')
      expect(icon.exists()).toBe(true)
      expect(icon.classes()).toContain('mdi-file-document')
      expect(icon.attributes('aria-hidden')).toBe('true')
    })

    it('prefers thumbnail over iconName when both are provided', () => {
      const wrapper = createWrapper({
        items: [{ title: 'T', thumbnail: '/x.png', iconName: 'mdi-file' }],
      })
      expect(wrapper.find('img.dads-resource-list__thumbnail').exists()).toBe(true)
      expect(wrapper.find('.dads-resource-list__icon').exists()).toBe(false)
    })

    it('omits the icon when neither thumbnail nor iconName is provided', () => {
      const wrapper = createWrapper({ items: [{ title: 'T' }] })
      expect(wrapper.find('.dads-resource-list__icon').exists()).toBe(false)
    })
  })

  describe('variant (data-style)', () => {
    it('defaults to data-style="frame" on every row', () => {
      const wrapper = createWrapper()
      const cards = wrapper.findAll('.dads-resource-list')
      for (const card of cards) {
        expect(card.attributes('data-style')).toBe('frame')
      }
    })

    it('applies data-style="list" when variant="list" is passed', () => {
      const wrapper = createWrapper({ variant: 'list' })
      const cards = wrapper.findAll('.dads-resource-list')
      for (const card of cards) {
        expect(card.attributes('data-style')).toBe('list')
      }
    })
  })

  describe('aria semantics', () => {
    it('applies the ariaLabel prop to the root <ul>', () => {
      const wrapper = createWrapper({ ariaLabel: 'お知らせ一覧' })
      const root = wrapper.find('ul.dads-resource-list-group')
      expect(root.attributes('aria-label')).toBe('お知らせ一覧')
    })

    it('omits aria-label when not provided', () => {
      const wrapper = createWrapper()
      const root = wrapper.find('ul.dads-resource-list-group')
      expect(root.attributes('aria-label')).toBeUndefined()
    })
  })

  describe('kind / selected / disabled / action', () => {
    it('applies kind-information modifier by default', () => {
      const wrapper = createWrapper({ items: [{ title: 'A' }] })
      expect(wrapper.find('.dads-resource-list').classes()).toContain(
        'dads-resource-list--kind-information',
      )
    })

    it('applies kind-form modifier when item.kind="form"', () => {
      const wrapper = createWrapper({ items: [{ title: 'A', kind: 'form' }] })
      expect(wrapper.find('.dads-resource-list').classes()).toContain(
        'dads-resource-list--kind-form',
      )
    })

    it('applies selected modifier + aria-current when item.selected=true', () => {
      const wrapper = createWrapper({
        items: [{ title: 'A', href: '/a', selected: true }],
      })
      const row = wrapper.find('.dads-resource-list')
      expect(row.classes()).toContain('dads-resource-list--selected')
      const body = wrapper.find('.dads-resource-list__body')
      expect(body.attributes('aria-current')).toBe('true')
    })

    it('applies disabled modifier + aria-disabled when item.disabled=true', () => {
      const wrapper = createWrapper({
        items: [{ title: 'A', href: '/a', disabled: true }],
      })
      expect(wrapper.find('.dads-resource-list').classes()).toContain(
        'dads-resource-list--disabled',
      )
    })

    it('renders trailing action button when item.action is provided', () => {
      const wrapper = createWrapper({
        items: [
          {
            title: 'A',
            action: { label: 'ダウンロード', iconName: 'mdi-download' },
          },
        ],
      })
      const action = wrapper.find('button.dads-resource-list__action')
      expect(action.exists()).toBe(true)
      expect(action.attributes('aria-label')).toBe('ダウンロード')
      expect(action.find('i.mdi.mdi-download').exists()).toBe(true)
    })

    it('renders action as <a> when href is provided', () => {
      const wrapper = createWrapper({
        items: [{ title: 'A', action: { label: 'PDF', href: '/a.pdf' } }],
      })
      const link = wrapper.find('a.dads-resource-list__action')
      expect(link.exists()).toBe(true)
      expect(link.attributes('href')).toBe('/a.pdf')
    })

    it('emits click:action when action button is clicked', async () => {
      const wrapper = createWrapper({
        items: [{ title: 'A', action: { label: 'X' } }],
      })
      await wrapper.find('button.dads-resource-list__action').trigger('click')
      const emitted = wrapper.emitted('click:action')
      expect(emitted).toBeTruthy()
      expect(emitted?.[0]?.[1]).toBe(0)
    })

    it('emits click:item when the body is clicked', async () => {
      const wrapper = createWrapper({
        items: [{ title: 'A', href: '/a' }],
      })
      await wrapper.find('a.dads-resource-list__body').trigger('click')
      const emitted = wrapper.emitted('click:item')
      expect(emitted).toBeTruthy()
      expect(emitted?.[0]?.[1]).toBe(0)
    })
  })

  describe('a11y (vitest-axe)', () => {
    const mountInBody = (props: Partial<DadsResourceListProps> = {}) =>
      mount(DadsResourceList, {
        props: { items: sampleItems, ...props } as DadsResourceListProps,
        attachTo: document.body,
      })

    it('has no violations with a basic resource list', async () => {
      const wrapper = mountInBody()
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations with linked items (href)', async () => {
      const wrapper = mountInBody({
        items: sampleItems.map((item) => ({ ...item, href: '/details' })),
      })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations with style="list"', async () => {
      const wrapper = mountInBody({ style: 'list' })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations with thumbnails (decorative alt)', async () => {
      const wrapper = mountInBody({
        items: [
          {
            title: 'プレゼン資料',
            description: '令和5年度',
            thumbnail: 'https://example.com/thumb.png',
          },
        ],
      })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })
  })
})
