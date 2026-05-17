import { afterEach, describe, expect, it } from 'vitest'
import { enableAutoUnmount, mount } from '@vue/test-utils'
import { axe } from 'vitest-axe'
import DadsTableControl from '../DadsTableControl.vue'
import type { DadsTableControlProps } from '../DadsTableControl.types'

enableAutoUnmount(afterEach)

const createWrapper = (props: Partial<DadsTableControlProps> = {}) =>
  mount(DadsTableControl, {
    props: { totalItems: 100, ...props } as DadsTableControlProps,
  })

const mountInBody = (props: Partial<DadsTableControlProps> = {}) =>
  mount(DadsTableControl, {
    props: { totalItems: 100, ...props } as DadsTableControlProps,
    attachTo: document.body,
  })

describe('DadsTableControl', () => {
  describe('rendering', () => {
    it('renders the root with the dads-table-control class', () => {
      const wrapper = createWrapper()
      expect(wrapper.classes()).toContain('dads-table-control')
    })

    it('renders search, page-size and pagination by default', () => {
      const wrapper = createWrapper()
      expect(wrapper.find('.dads-table-control__search').exists()).toBe(true)
      expect(wrapper.find('.dads-table-control__page-size').exists()).toBe(true)
      expect(wrapper.find('.dads-table-control__pagination').exists()).toBe(true)
    })

    it('renders the default page-size options', () => {
      const wrapper = createWrapper()
      const options = wrapper.findAll('.dads-table-control__page-size-select option')
      expect(options).toHaveLength(4)
      expect(options.map((o) => o.element.value)).toEqual(['10', '25', '50', '100'])
    })

    it('renders custom page-size options', () => {
      const wrapper = createWrapper({ pageSizeOptions: [5, 20] })
      const options = wrapper.findAll('.dads-table-control__page-size-select option')
      expect(options).toHaveLength(2)
      expect(options.map((o) => o.element.value)).toEqual(['5', '20'])
    })
  })

  describe('search input', () => {
    it('reflects searchQuery prop on the input', () => {
      const wrapper = createWrapper({ searchQuery: 'abc' })
      const input = wrapper.find<HTMLInputElement>('.dads-table-control__search-input')
      expect(input.element.value).toBe('abc')
    })

    it('emits update:search when typing', async () => {
      const wrapper = createWrapper()
      const input = wrapper.find('.dads-table-control__search-input')
      await input.setValue('hello')
      const events = wrapper.emitted('update:search')
      expect(events).toBeTruthy()
      expect(events?.[events.length - 1]?.[0]).toBe('hello')
    })

    it('uses the custom searchPlaceholder', () => {
      const wrapper = createWrapper({ searchPlaceholder: 'キーワード' })
      const input = wrapper.find('.dads-table-control__search-input')
      expect(input.attributes('placeholder')).toBe('キーワード')
    })
  })

  describe('pagination buttons', () => {
    it('emits update:page with the next page on next click', async () => {
      const wrapper = createWrapper({ currentPage: 2, pageSize: 10, totalItems: 50 })
      await wrapper.find('.dads-table-control__button--next').trigger('click')
      const events = wrapper.emitted('update:page')
      expect(events).toBeTruthy()
      expect(events?.[0]?.[0]).toBe(3)
    })

    it('emits update:page with the previous page on prev click', async () => {
      const wrapper = createWrapper({ currentPage: 3, pageSize: 10, totalItems: 50 })
      await wrapper.find('.dads-table-control__button--prev').trigger('click')
      const events = wrapper.emitted('update:page')
      expect(events).toBeTruthy()
      expect(events?.[0]?.[0]).toBe(2)
    })

    it('disables prev on the first page', () => {
      const wrapper = createWrapper({ currentPage: 1, pageSize: 10, totalItems: 50 })
      const prev = wrapper.find('.dads-table-control__button--prev')
      expect(prev.attributes('disabled')).toBeDefined()
    })

    it('disables next on the last page', () => {
      const wrapper = createWrapper({ currentPage: 5, pageSize: 10, totalItems: 50 })
      const next = wrapper.find('.dads-table-control__button--next')
      expect(next.attributes('disabled')).toBeDefined()
    })

    it('does not emit when clicking a disabled prev button', async () => {
      const wrapper = createWrapper({ currentPage: 1, pageSize: 10, totalItems: 50 })
      await wrapper.find('.dads-table-control__button--prev').trigger('click')
      expect(wrapper.emitted('update:page')).toBeUndefined()
    })
  })

  describe('page-size selector', () => {
    it('reflects the pageSize prop as the selected value', () => {
      const wrapper = createWrapper({ pageSize: 25 })
      const select = wrapper.find<HTMLSelectElement>('.dads-table-control__page-size-select')
      expect(select.element.value).toBe('25')
    })

    it('emits update:pageSize on change', async () => {
      const wrapper = createWrapper({ pageSize: 10 })
      const select = wrapper.find('.dads-table-control__page-size-select')
      await select.setValue('50')
      const events = wrapper.emitted('update:pageSize')
      expect(events).toBeTruthy()
      expect(events?.[0]?.[0]).toBe(50)
    })

    it('resets to page 1 when pageSize changes while not on page 1', async () => {
      const wrapper = createWrapper({ pageSize: 10, currentPage: 3 })
      const select = wrapper.find('.dads-table-control__page-size-select')
      await select.setValue('50')
      const pageEvents = wrapper.emitted('update:page')
      expect(pageEvents).toBeTruthy()
      expect(pageEvents?.[0]?.[0]).toBe(1)
    })
  })

  describe('totalPages computed', () => {
    it('shows the correct totalPages indicator', () => {
      const wrapper = createWrapper({ totalItems: 95, pageSize: 10, currentPage: 1 })
      // ceil(95 / 10) = 10
      expect(wrapper.find('.dads-table-control__page-indicator').text()).toBe('1 / 10')
    })

    it('falls back to 1 page when totalItems is 0', () => {
      const wrapper = createWrapper({ totalItems: 0, pageSize: 10, currentPage: 1 })
      expect(wrapper.find('.dads-table-control__page-indicator').text()).toBe('1 / 1')
    })
  })

  describe('status text', () => {
    it('shows the current row range', () => {
      const wrapper = createWrapper({ totalItems: 95, pageSize: 10, currentPage: 2 })
      expect(wrapper.find('.dads-table-control__status').text()).toBe('11-20 / 95 件')
    })

    it('clamps the upper bound to totalItems on the last page', () => {
      const wrapper = createWrapper({ totalItems: 95, pageSize: 10, currentPage: 10 })
      expect(wrapper.find('.dads-table-control__status').text()).toBe('91-95 / 95 件')
    })

    it('shows 0 件 when there are no items', () => {
      const wrapper = createWrapper({ totalItems: 0 })
      expect(wrapper.find('.dads-table-control__status').text()).toBe('0 件')
    })
  })

  describe('visibility flags', () => {
    it('hides the search input when showSearch is false', () => {
      const wrapper = createWrapper({ showSearch: false })
      expect(wrapper.find('.dads-table-control__search').exists()).toBe(false)
    })

    it('hides the pagination when showPagination is false', () => {
      const wrapper = createWrapper({ showPagination: false })
      expect(wrapper.find('.dads-table-control__pagination').exists()).toBe(false)
    })

    it('hides the page-size selector when showPageSize is false', () => {
      const wrapper = createWrapper({ showPageSize: false })
      expect(wrapper.find('.dads-table-control__page-size').exists()).toBe(false)
    })

    it('hides the entire top row when both showSearch and showPageSize are false', () => {
      const wrapper = createWrapper({ showSearch: false, showPageSize: false })
      expect(wrapper.find('.dads-table-control__top').exists()).toBe(false)
    })
  })

  describe('a11y (vitest-axe)', () => {
    it('has no violations in the default configuration', async () => {
      const wrapper = mountInBody()
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations with only the pagination shown', async () => {
      const wrapper = mountInBody({ showSearch: false, showPageSize: false })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })
  })

  describe('reset button', () => {
    it('is hidden when searchQuery is empty', () => {
      const wrapper = createWrapper({ searchQuery: '' })
      expect(wrapper.find('.dads-table-control__reset').exists()).toBe(false)
    })

    it('shows when searchQuery is non-empty (default showReset=true)', () => {
      const wrapper = createWrapper({ searchQuery: 'hello' })
      const btn = wrapper.find('.dads-table-control__reset')
      expect(btn.exists()).toBe(true)
      expect(btn.attributes('aria-label')).toBe('検索条件をリセット')
    })

    it('does not render when showReset=false even with a query present', () => {
      const wrapper = createWrapper({ searchQuery: 'hello', showReset: false })
      expect(wrapper.find('.dads-table-control__reset').exists()).toBe(false)
    })

    it('emits update:search with empty string + reset event on click', async () => {
      const wrapper = createWrapper({ searchQuery: 'tokyo' })
      await wrapper.find('.dads-table-control__reset').trigger('click')
      expect(wrapper.emitted('update:search')?.[0]).toEqual([''])
      expect(wrapper.emitted('reset')?.[0]).toEqual([])
    })

    it('honors custom resetLabel', () => {
      const wrapper = createWrapper({ searchQuery: 'x', resetLabel: 'Clear' })
      expect(wrapper.find('.dads-table-control__reset').attributes('aria-label')).toBe('Clear')
    })
  })

  describe('presets', () => {
    it('renders nothing when presets is empty (default)', () => {
      const wrapper = createWrapper()
      expect(wrapper.find('.dads-table-control__presets').exists()).toBe(false)
    })

    it('renders one button per preset', () => {
      const wrapper = createWrapper({
        presets: [
          { label: '東京', query: 'tokyo' },
          { label: '大阪', query: 'osaka' },
        ],
      })
      const btns = wrapper.findAll('.dads-table-control__preset')
      expect(btns).toHaveLength(2)
      expect(btns[0].text()).toBe('東京')
      expect(btns[1].text()).toBe('大阪')
    })

    it('marks the active preset with aria-pressed when its query matches searchQuery', () => {
      const wrapper = createWrapper({
        searchQuery: 'osaka',
        presets: [
          { label: '東京', query: 'tokyo' },
          { label: '大阪', query: 'osaka' },
        ],
      })
      const btns = wrapper.findAll('.dads-table-control__preset')
      expect(btns[0].attributes('aria-pressed')).toBe('false')
      expect(btns[1].attributes('aria-pressed')).toBe('true')
    })

    it('emits update:search and click:preset on preset click', async () => {
      const presets = [
        { label: '東京', query: 'tokyo' },
        { label: '大阪', query: 'osaka' },
      ]
      const wrapper = createWrapper({ presets })
      await wrapper.findAll('.dads-table-control__preset')[1].trigger('click')
      expect(wrapper.emitted('update:search')?.[0]).toEqual(['osaka'])
      expect(wrapper.emitted('click:preset')?.[0]).toEqual([presets[1]])
    })
  })
})
