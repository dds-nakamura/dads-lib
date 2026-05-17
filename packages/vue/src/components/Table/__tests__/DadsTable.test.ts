import { afterEach, describe, expect, it } from 'vitest'
import { enableAutoUnmount, mount } from '@vue/test-utils'
import { axe } from 'vitest-axe'
import DadsTable from '../DadsTable.vue'
import type { DadsTableProps } from '../DadsTable.types'

enableAutoUnmount(afterEach)

const TABLE_BODY = `
  <thead>
    <tr><th>Name</th><th>Age</th></tr>
  </thead>
  <tbody>
    <tr><td>Alice</td><td>30</td></tr>
    <tr><td>Bob</td><td>25</td></tr>
    <tr><td>Carol</td><td>40</td></tr>
    <tr><td>Dave</td><td>22</td></tr>
  </tbody>
`

const createWrapper = (
  props: DadsTableProps = {},
  slots: Record<string, string> = { default: TABLE_BODY },
) =>
  mount(DadsTable, {
    props,
    slots,
    attachTo: document.body,
  })

describe('DadsTable', () => {
  describe('rendering', () => {
    it('renders a wrapper div with the dads-table-wrapper class', () => {
      const wrapper = createWrapper()
      expect(wrapper.element.tagName).toBe('DIV')
      expect(wrapper.classes()).toContain('dads-table-wrapper')
    })

    it('renders a <table> inside the wrapper with the dads-table class', () => {
      const wrapper = createWrapper()
      const table = wrapper.find('table')
      expect(table.exists()).toBe(true)
      expect(table.classes()).toContain('dads-table')
    })

    it('renders the default slot content (thead/tbody) inside the table', () => {
      const wrapper = createWrapper()
      expect(wrapper.find('thead').exists()).toBe(true)
      expect(wrapper.find('tbody').exists()).toBe(true)
      expect(wrapper.findAll('tbody tr')).toHaveLength(4)
      expect(wrapper.find('thead th').text()).toBe('Name')
    })

    it('preserves the native <table> semantics (root div > table > thead/tbody)', () => {
      const wrapper = createWrapper()
      expect(wrapper.element.tagName).toBe('DIV')
      const table = wrapper.element.querySelector('table')
      expect(table).not.toBeNull()
      expect(table?.querySelector('thead')).not.toBeNull()
      expect(table?.querySelector('tbody')).not.toBeNull()
    })
  })

  describe('default props', () => {
    it('defaults density to comfortable', () => {
      const wrapper = createWrapper()
      const table = wrapper.find('table')
      expect(table.classes()).toContain('dads-table--comfortable')
      expect(table.classes()).not.toContain('dads-table--compact')
    })

    it('does not apply --sticky-header by default', () => {
      const wrapper = createWrapper()
      expect(wrapper.classes()).not.toContain('dads-table-wrapper--sticky-header')
      expect(wrapper.find('table').classes()).not.toContain('dads-table--sticky-header')
    })

    it('does not apply --bordered or --striped by default', () => {
      const wrapper = createWrapper()
      const table = wrapper.find('table')
      expect(table.classes()).not.toContain('dads-table--bordered')
      expect(table.classes()).not.toContain('dads-table--striped')
    })

    it('does not render a <caption> when neither prop nor slot is provided', () => {
      const wrapper = createWrapper()
      expect(wrapper.find('caption').exists()).toBe(false)
    })
  })

  describe('sticky-header', () => {
    it('adds the wrapper modifier when stickyHeader=true', () => {
      const wrapper = createWrapper({ stickyHeader: true })
      expect(wrapper.classes()).toContain('dads-table-wrapper--sticky-header')
    })

    it('adds the table modifier when stickyHeader=true', () => {
      const wrapper = createWrapper({ stickyHeader: true })
      expect(wrapper.find('table').classes()).toContain('dads-table--sticky-header')
    })
  })

  describe('density', () => {
    it('applies --comfortable class when density="comfortable"', () => {
      const wrapper = createWrapper({ density: 'comfortable' })
      expect(wrapper.find('table').classes()).toContain('dads-table--comfortable')
    })

    it('applies --compact class when density="compact"', () => {
      const wrapper = createWrapper({ density: 'compact' })
      const table = wrapper.find('table')
      expect(table.classes()).toContain('dads-table--compact')
      expect(table.classes()).not.toContain('dads-table--comfortable')
    })
  })

  describe('bordered', () => {
    it('applies the --bordered modifier when bordered=true', () => {
      const wrapper = createWrapper({ bordered: true })
      expect(wrapper.find('table').classes()).toContain('dads-table--bordered')
    })
  })

  describe('striped', () => {
    it('applies the --striped modifier when striped=true', () => {
      const wrapper = createWrapper({ striped: true })
      expect(wrapper.find('table').classes()).toContain('dads-table--striped')
    })
  })

  describe('caption', () => {
    it('renders a <caption> with the prop text when caption is provided', () => {
      const wrapper = createWrapper({ caption: '社員一覧' })
      const caption = wrapper.find('caption')
      expect(caption.exists()).toBe(true)
      expect(caption.text()).toBe('社員一覧')
      expect(caption.classes()).toContain('dads-table__caption')
    })

    it('renders a <caption> from the caption slot when provided', () => {
      const wrapper = createWrapper(
        {},
        {
          default: TABLE_BODY,
          caption: '<strong>カスタムキャプション</strong>',
        },
      )
      const caption = wrapper.find('caption')
      expect(caption.exists()).toBe(true)
      expect(caption.find('strong').exists()).toBe(true)
      expect(caption.text()).toBe('カスタムキャプション')
    })

    it('lets the caption slot override the caption prop', () => {
      const wrapper = createWrapper(
        { caption: 'プロップから' },
        {
          default: TABLE_BODY,
          caption: 'スロットから',
        },
      )
      expect(wrapper.find('caption').text()).toBe('スロットから')
    })
  })

  describe('combined props', () => {
    it('applies every modifier when all flags are enabled together', () => {
      const wrapper = createWrapper({
        stickyHeader: true,
        density: 'compact',
        bordered: true,
        striped: true,
      })
      const table = wrapper.find('table')
      expect(wrapper.classes()).toContain('dads-table-wrapper--sticky-header')
      expect(table.classes()).toContain('dads-table--sticky-header')
      expect(table.classes()).toContain('dads-table--compact')
      expect(table.classes()).toContain('dads-table--bordered')
      expect(table.classes()).toContain('dads-table--striped')
    })
  })

  describe('reactivity', () => {
    it('updates the density class when density prop changes', async () => {
      const wrapper = createWrapper({ density: 'comfortable' })
      expect(wrapper.find('table').classes()).toContain('dads-table--comfortable')
      await wrapper.setProps({ density: 'compact' })
      const table = wrapper.find('table')
      expect(table.classes()).toContain('dads-table--compact')
      expect(table.classes()).not.toContain('dads-table--comfortable')
    })

    it('toggles the sticky-header modifiers when the prop changes', async () => {
      const wrapper = createWrapper({ stickyHeader: false })
      expect(wrapper.classes()).not.toContain('dads-table-wrapper--sticky-header')
      await wrapper.setProps({ stickyHeader: true })
      expect(wrapper.classes()).toContain('dads-table-wrapper--sticky-header')
      expect(wrapper.find('table').classes()).toContain('dads-table--sticky-header')
    })

    it('starts/stops rendering the caption as the prop changes', async () => {
      const wrapper = createWrapper()
      expect(wrapper.find('caption').exists()).toBe(false)
      await wrapper.setProps({ caption: '後から指定' })
      expect(wrapper.find('caption').exists()).toBe(true)
      expect(wrapper.find('caption').text()).toBe('後から指定')
    })
  })

  describe('multiple instances', () => {
    it('renders independent class state for two tables', () => {
      const wrapper = mount(
        {
          components: { DadsTable },
          template: `
            <div>
              <DadsTable density="compact" sticky-header>
                <thead><tr><th>A</th></tr></thead>
                <tbody><tr><td>1</td></tr></tbody>
              </DadsTable>
              <DadsTable bordered>
                <thead><tr><th>B</th></tr></thead>
                <tbody><tr><td>2</td></tr></tbody>
              </DadsTable>
            </div>
          `,
        },
        { attachTo: document.body },
      )
      const tables = wrapper.findAll('table')
      expect(tables).toHaveLength(2)
      expect(tables[0].classes()).toContain('dads-table--compact')
      expect(tables[0].classes()).toContain('dads-table--sticky-header')
      expect(tables[1].classes()).toContain('dads-table--bordered')
      expect(tables[1].classes()).not.toContain('dads-table--sticky-header')
    })
  })

  describe('loading skeleton', () => {
    it('does not render the skeleton body by default', () => {
      const wrapper = mount(DadsTable)
      expect(wrapper.find('.dads-table__skeleton-body').exists()).toBe(false)
    })

    it('replaces the default slot with skeleton rows when loading=true', () => {
      const wrapper = mount(DadsTable, {
        props: { loading: true },
        slots: { default: '<tbody class="real-rows"><tr><td>data</td></tr></tbody>' },
      })
      expect(wrapper.find('.dads-table__skeleton-body').exists()).toBe(true)
      expect(wrapper.find('.real-rows').exists()).toBe(false)
    })

    it('renders the configured number of skeleton rows and columns', () => {
      const wrapper = mount(DadsTable, {
        props: { loading: true, skeletonRowCount: 5, skeletonColumnCount: 3 },
      })
      const rows = wrapper.findAll('.dads-table__skeleton-row')
      expect(rows).toHaveLength(5)
      expect(rows[0].findAll('.dads-table__skeleton-cell')).toHaveLength(3)
    })

    it('marks the skeleton body as aria-busy="true" + aria-live="polite"', () => {
      const wrapper = mount(DadsTable, { props: { loading: true } })
      const body = wrapper.find('.dads-table__skeleton-body')
      expect(body.attributes('aria-busy')).toBe('true')
      expect(body.attributes('aria-live')).toBe('polite')
    })
  })

  describe('a11y (vitest-axe)', () => {
    const mountInBody = (props: DadsTableProps = {}, slots = { default: TABLE_BODY }) =>
      mount(DadsTable, { props, slots, attachTo: document.body })

    it('has no violations with a basic table', async () => {
      const wrapper = mountInBody()
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations with a caption', async () => {
      const wrapper = mountInBody({ caption: '従業員一覧' })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations with sticky header', async () => {
      const wrapper = mountInBody({ stickyHeader: true, caption: 'スコア' })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations in compact density (bordered + striped)', async () => {
      const wrapper = mountInBody({
        caption: '統計',
        density: 'compact',
        bordered: true,
        striped: true,
      })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations in loading state', async () => {
      const wrapper = mountInBody({ caption: '読み込み中', loading: true })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })
  })
})
