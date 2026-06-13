import { afterEach, describe, expect, it } from 'vitest'
import { enableAutoUnmount, mount } from '@vue/test-utils'
import { axe } from 'vitest-axe'
import DadsDescriptionList from '../DadsDescriptionList.vue'
import type {
  DadsDescriptionListItem,
  DadsDescriptionListProps,
} from '../DadsDescriptionList.types'

enableAutoUnmount(afterEach)

const ITEMS: DadsDescriptionListItem[] = [
  { term: '氏名', description: '山田 太郎' },
  { term: '住所', description: '東京都千代田区永田町1-7-1' },
  { term: '連絡先', description: 'taro.yamada@example.go.jp' },
]

const createWrapper = (
  props: Partial<DadsDescriptionListProps> = {},
  slots: Record<string, string> = {},
) =>
  mount(DadsDescriptionList, {
    props: props as DadsDescriptionListProps,
    slots,
  })

describe('DadsDescriptionList', () => {
  describe('rendering', () => {
    it('renders a <dl> root element', () => {
      const wrapper = createWrapper({ items: ITEMS })
      expect(wrapper.element.tagName).toBe('DL')
    })

    it('applies the dads-description-list root class', () => {
      const wrapper = createWrapper({ items: ITEMS })
      expect(wrapper.classes()).toContain('dads-description-list')
    })

    it('renders one <dt> and one <dd> per item', () => {
      const wrapper = createWrapper({ items: ITEMS })
      expect(wrapper.findAll('dt')).toHaveLength(ITEMS.length)
      expect(wrapper.findAll('dd')).toHaveLength(ITEMS.length)
    })

    it('renders item term and description text in order', () => {
      const wrapper = createWrapper({ items: ITEMS })
      const dts = wrapper.findAll('dt')
      const dds = wrapper.findAll('dd')
      ITEMS.forEach((item, index) => {
        expect(dts[index].text()).toBe(item.term)
        expect(dds[index].text()).toBe(item.description)
      })
    })

    it('wraps each pair in a .dads-description-list__item element', () => {
      const wrapper = createWrapper({ items: ITEMS })
      const items = wrapper.findAll('.dads-description-list__item')
      expect(items).toHaveLength(ITEMS.length)
      // Every wrapper contains exactly one <dt> and one <dd> child.
      items.forEach((el) => {
        expect(el.findAll('dt')).toHaveLength(1)
        expect(el.findAll('dd')).toHaveLength(1)
      })
    })
  })

  describe('empty / default state', () => {
    it('renders an empty <dl> when neither items nor slot is provided', () => {
      const wrapper = createWrapper()
      expect(wrapper.element.tagName).toBe('DL')
      expect(wrapper.findAll('dt')).toHaveLength(0)
      expect(wrapper.findAll('dd')).toHaveLength(0)
    })

    it('renders an empty <dl> when items is an empty array', () => {
      const wrapper = createWrapper({ items: [] })
      expect(wrapper.findAll('.dads-description-list__item')).toHaveLength(0)
    })
  })

  describe('slot fallback', () => {
    it('renders the default slot when items is not provided', () => {
      const wrapper = createWrapper(
        {},
        {
          default: `
            <div class="dads-description-list__item">
              <dt>氏名</dt>
              <dd>山田 太郎</dd>
            </div>
            <div class="dads-description-list__item">
              <dt>住所</dt>
              <dd>東京都</dd>
            </div>
          `,
        },
      )
      expect(wrapper.findAll('dt')).toHaveLength(2)
      expect(wrapper.findAll('dd')).toHaveLength(2)
      expect(wrapper.findAll('dt')[0].text()).toBe('氏名')
    })

    it('prefers items over the default slot when both are provided', () => {
      const wrapper = createWrapper(
        { items: ITEMS },
        {
          default: `<div class="should-not-render"><dt>ignored</dt><dd>ignored</dd></div>`,
        },
      )
      expect(wrapper.find('.should-not-render').exists()).toBe(false)
      expect(wrapper.findAll('dt')).toHaveLength(ITEMS.length)
    })
  })

  describe('layout', () => {
    it('applies the --vertical modifier by default (the only official layout)', () => {
      const wrapper = createWrapper({ items: ITEMS })
      expect(wrapper.classes()).toContain('dads-description-list--vertical')
      // The non-official horizontal variant has been removed.
      expect(wrapper.classes()).not.toContain('dads-description-list--horizontal')
    })

    it('applies the --vertical modifier when layout="vertical" is explicit', () => {
      const wrapper = createWrapper({ items: ITEMS, layout: 'vertical' })
      expect(wrapper.classes()).toContain('dads-description-list--vertical')
    })
  })

  describe('marker', () => {
    it('does not emit a data-marker attribute when marker="none" (default)', () => {
      const wrapper = createWrapper({ items: ITEMS })
      expect(wrapper.attributes('data-marker')).toBeUndefined()
    })

    it('sets data-marker="bullet" when marker="bullet"', () => {
      const wrapper = createWrapper({ items: ITEMS, marker: 'bullet' })
      expect(wrapper.attributes('data-marker')).toBe('bullet')
    })

    it('sets data-marker="custom" when marker="custom"', () => {
      const wrapper = createWrapper({ items: ITEMS, marker: 'custom' })
      expect(wrapper.attributes('data-marker')).toBe('custom')
    })

    it('toggles the data-marker attribute when the prop changes', async () => {
      const wrapper = createWrapper({ items: ITEMS, marker: 'none' })
      expect(wrapper.attributes('data-marker')).toBeUndefined()
      await wrapper.setProps({ marker: 'bullet' })
      expect(wrapper.attributes('data-marker')).toBe('bullet')
      await wrapper.setProps({ marker: 'none' })
      expect(wrapper.attributes('data-marker')).toBeUndefined()
    })
  })

  describe('bordered', () => {
    it('does not apply the --bordered modifier by default', () => {
      const wrapper = createWrapper({ items: ITEMS })
      expect(wrapper.classes()).not.toContain('dads-description-list--bordered')
    })

    it('applies the --bordered modifier when bordered=true', () => {
      const wrapper = createWrapper({ items: ITEMS, bordered: true })
      expect(wrapper.classes()).toContain('dads-description-list--bordered')
    })
  })

  describe('semantics / accessibility', () => {
    it('renders a native <dl> so screen readers expose description-list semantics', () => {
      const wrapper = createWrapper({ items: ITEMS })
      expect(wrapper.element.tagName).toBe('DL')
    })

    it('keeps native <dt> and <dd> tags (not divs) so AT can pair term+definition', () => {
      const wrapper = createWrapper({ items: ITEMS })
      const dts = wrapper.findAll('dt')
      const dds = wrapper.findAll('dd')
      dts.forEach((dt) => expect(dt.element.tagName).toBe('DT'))
      dds.forEach((dd) => expect(dd.element.tagName).toBe('DD'))
    })

    it('keeps <dt>/<dd> as direct descendants of <dl> (wrapped in a <div> per spec)', () => {
      // The HTML reference wraps each pair in a <div class="...__item"> to keep
      // the styling grid simple; HTML5 explicitly permits <div> wrappers inside
      // <dl> for exactly this purpose.
      const wrapper = createWrapper({ items: ITEMS })
      const dl = wrapper.element as HTMLDListElement
      const children = Array.from(dl.children)
      children.forEach((child) => {
        expect(child.tagName).toBe('DIV')
        expect(child.classList.contains('dads-description-list__item')).toBe(true)
      })
    })
  })

  describe('combined props', () => {
    it('applies every modifier when layout=vertical + marker=bullet + bordered=true', () => {
      const wrapper = createWrapper({
        items: ITEMS,
        layout: 'vertical',
        marker: 'bullet',
        bordered: true,
      })
      expect(wrapper.classes()).toContain('dads-description-list--vertical')
      expect(wrapper.classes()).toContain('dads-description-list--bordered')
      expect(wrapper.attributes('data-marker')).toBe('bullet')
    })
  })

  describe('reactivity', () => {
    it('updates rendered <dt>/<dd> count when items prop changes', async () => {
      const wrapper = createWrapper({ items: ITEMS })
      expect(wrapper.findAll('dt')).toHaveLength(ITEMS.length)
      await wrapper.setProps({
        items: [
          { term: 'A', description: 'a' },
          { term: 'B', description: 'b' },
        ],
      })
      expect(wrapper.findAll('dt')).toHaveLength(2)
      expect(wrapper.findAll('dt')[0].text()).toBe('A')
    })

    it('falls back to the slot when items becomes undefined', async () => {
      const wrapper = mount(DadsDescriptionList, {
        props: { items: ITEMS } as DadsDescriptionListProps,
        slots: {
          default: `<div class="fallback"><dt>fallback</dt><dd>fallback-d</dd></div>`,
        },
      })
      expect(wrapper.find('.fallback').exists()).toBe(false)
      await wrapper.setProps({ items: undefined })
      expect(wrapper.find('.fallback').exists()).toBe(true)
    })
  })

  describe('a11y (vitest-axe)', () => {
    const mountInBody = (props: Partial<DadsDescriptionListProps> = {}) =>
      mount(DadsDescriptionList, {
        props: props as DadsDescriptionListProps,
        attachTo: document.body,
      })

    it('has no violations in the default (vertical) layout with items', async () => {
      const wrapper = mountInBody({ items: ITEMS })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations when layout="vertical" is explicit', async () => {
      const wrapper = mountInBody({ items: ITEMS, layout: 'vertical' })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations with bullet markers', async () => {
      const wrapper = mountInBody({ items: ITEMS, marker: 'bullet' })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations with bordered rows', async () => {
      const wrapper = mountInBody({ items: ITEMS, bordered: true })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })
  })
})
