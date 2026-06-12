import { afterEach, describe, expect, it } from 'vitest'
import { enableAutoUnmount, mount } from '@vue/test-utils'
import { axe } from 'vitest-axe'
import DadsTable from '../DadsTable.vue'
import type { DadsTableProps } from '../DadsTable.types'

enableAutoUnmount(afterEach)

// Body authored by the consumer using the official header-cell classes.
const COL_HEADER_BODY = `
  <thead>
    <tr>
      <th class="dads-table__col-header" scope="col">Name</th>
      <th class="dads-table__col-header" scope="col">Age</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>Alice</td><td>30</td></tr>
    <tr><td>Bob</td><td>25</td></tr>
    <tr><td>Carol</td><td>40</td></tr>
    <tr><td>Dave</td><td>22</td></tr>
  </tbody>
`

const ROW_HEADER_BODY = `
  <tbody>
    <tr>
      <th class="dads-table__row-header" scope="row">Alice</th>
      <td>30</td>
    </tr>
    <tr>
      <th class="dads-table__row-header" scope="row">Bob</th>
      <td>25</td>
    </tr>
  </tbody>
`

const createWrapper = (
  props: DadsTableProps = {},
  slots: Record<string, string> = { default: COL_HEADER_BODY },
) =>
  mount(DadsTable, {
    props,
    slots,
    attachTo: document.body,
  })

describe('DadsTable', () => {
  describe('canonical structure', () => {
    it('renders a <div class="dads-table"> container by default (no caption)', () => {
      const wrapper = createWrapper()
      expect(wrapper.element.tagName).toBe('DIV')
      expect(wrapper.classes()).toContain('dads-table')
    })

    it('renders the <table class="dads-table__table"> inside the container', () => {
      const wrapper = createWrapper()
      const table = wrapper.find('table')
      expect(table.exists()).toBe(true)
      expect(table.classes()).toContain('dads-table__table')
      // The table is a direct child of the .dads-table container.
      expect(wrapper.element.querySelector(':scope > table.dads-table__table')).not.toBeNull()
    })

    it('renders the default slot (thead/tbody) inside the table', () => {
      const wrapper = createWrapper()
      const table = wrapper.find('table')
      expect(table.find('thead').exists()).toBe(true)
      expect(table.find('tbody').exists()).toBe(true)
      expect(wrapper.findAll('tbody tr')).toHaveLength(4)
    })
  })

  describe('header cells', () => {
    it('preserves consumer column headers with class + scope="col"', () => {
      const wrapper = createWrapper()
      const headers = wrapper.findAll('th.dads-table__col-header')
      expect(headers).toHaveLength(2)
      headers.forEach((h) => expect(h.attributes('scope')).toBe('col'))
      expect(headers[0].text()).toBe('Name')
    })

    it('preserves consumer row headers with class + scope="row"', () => {
      const wrapper = createWrapper({}, { default: ROW_HEADER_BODY })
      const headers = wrapper.findAll('th.dads-table__row-header')
      expect(headers).toHaveLength(2)
      headers.forEach((h) => expect(h.attributes('scope')).toBe('row'))
    })
  })

  describe('default props', () => {
    it('emits no container/table state attributes by default', () => {
      const wrapper = createWrapper()
      const root = wrapper.element
      const table = wrapper.find('table').element
      expect(root.hasAttribute('data-size')).toBe(false)
      expect(root.hasAttribute('data-row-stripe')).toBe(false)
      expect(root.hasAttribute('data-row-hover-highlight')).toBe(false)
      expect(root.hasAttribute('data-selectable')).toBe(false)
      expect(table.hasAttribute('data-cell-border')).toBe(false)
      expect(table.hasAttribute('data-border')).toBe(false)
    })

    it('does not render a caption when neither prop nor slot is provided', () => {
      const wrapper = createWrapper()
      expect(wrapper.find('figcaption').exists()).toBe(false)
    })
  })

  describe('dense', () => {
    it('sets data-size="dense" on the container when dense=true', () => {
      const wrapper = createWrapper({ dense: true })
      expect(wrapper.element.getAttribute('data-size')).toBe('dense')
    })

    it('omits data-size when dense=false', () => {
      const wrapper = createWrapper({ dense: false })
      expect(wrapper.element.hasAttribute('data-size')).toBe(false)
    })
  })

  describe('striped', () => {
    it('sets the data-row-stripe attribute when striped=true', () => {
      const wrapper = createWrapper({ striped: true })
      expect(wrapper.element.hasAttribute('data-row-stripe')).toBe(true)
    })
  })

  describe('hoverable', () => {
    it('sets the data-row-hover-highlight attribute when hoverable=true', () => {
      const wrapper = createWrapper({ hoverable: true })
      expect(wrapper.element.hasAttribute('data-row-hover-highlight')).toBe(true)
    })
  })

  describe('selectable', () => {
    it('sets the data-selectable attribute when selectable=true', () => {
      const wrapper = createWrapper({ selectable: true })
      expect(wrapper.element.hasAttribute('data-selectable')).toBe(true)
    })
  })

  describe('cellBorder', () => {
    it('emits data-cell-border="bottom" for a string value', () => {
      const wrapper = createWrapper({ cellBorder: 'bottom' })
      expect(wrapper.find('table').attributes('data-cell-border')).toBe('bottom')
    })

    it('emits an empty data-cell-border for the boolean true (all edges)', () => {
      const wrapper = createWrapper({ cellBorder: true })
      expect(wrapper.find('table').attributes('data-cell-border')).toBe('')
    })

    it('omits data-cell-border when false', () => {
      const wrapper = createWrapper({ cellBorder: false })
      expect(wrapper.find('table').element.hasAttribute('data-cell-border')).toBe(false)
    })

    it('passes through a multi-edge string verbatim', () => {
      const wrapper = createWrapper({ cellBorder: 'top bottom' })
      expect(wrapper.find('table').attributes('data-cell-border')).toBe('top bottom')
    })
  })

  describe('border', () => {
    it('emits data-border for a string value', () => {
      const wrapper = createWrapper({ border: 'hidden' })
      expect(wrapper.find('table').attributes('data-border')).toBe('hidden')
    })

    it('emits an empty data-border for the boolean true (full outer border)', () => {
      const wrapper = createWrapper({ border: true })
      expect(wrapper.find('table').attributes('data-border')).toBe('')
    })

    it('omits data-border when false', () => {
      const wrapper = createWrapper({ border: false })
      expect(wrapper.find('table').element.hasAttribute('data-border')).toBe(false)
    })
  })

  describe('caption', () => {
    it('promotes the root to <figure> and renders a <figcaption> from the prop', () => {
      const wrapper = createWrapper({ caption: '社員一覧' })
      expect(wrapper.element.tagName).toBe('FIGURE')
      const caption = wrapper.find('figcaption')
      expect(caption.exists()).toBe(true)
      expect(caption.text()).toBe('社員一覧')
      expect(caption.classes()).toContain('dads-table__caption')
    })

    it('renders the caption slot (rich markup) and promotes to <figure>', () => {
      const wrapper = createWrapper(
        {},
        {
          default: COL_HEADER_BODY,
          caption: '<strong>カスタム</strong>',
        },
      )
      expect(wrapper.element.tagName).toBe('FIGURE')
      const caption = wrapper.find('figcaption')
      expect(caption.find('strong').exists()).toBe(true)
      expect(caption.text()).toBe('カスタム')
    })

    it('lets the caption slot override the caption prop', () => {
      const wrapper = createWrapper(
        { caption: 'プロップから' },
        {
          default: COL_HEADER_BODY,
          caption: 'スロットから',
        },
      )
      expect(wrapper.find('figcaption').text()).toBe('スロットから')
    })
  })

  describe('combined props', () => {
    it('applies every container + table attribute when enabled together', () => {
      const wrapper = createWrapper({
        dense: true,
        striped: true,
        hoverable: true,
        selectable: true,
        cellBorder: 'bottom',
        border: true,
        caption: '統計',
      })
      const root = wrapper.element
      const table = wrapper.find('table')
      expect(root.tagName).toBe('FIGURE')
      expect(root.getAttribute('data-size')).toBe('dense')
      expect(root.hasAttribute('data-row-stripe')).toBe(true)
      expect(root.hasAttribute('data-row-hover-highlight')).toBe(true)
      expect(root.hasAttribute('data-selectable')).toBe(true)
      expect(table.attributes('data-cell-border')).toBe('bottom')
      expect(table.attributes('data-border')).toBe('')
    })
  })

  describe('reactivity', () => {
    it('toggles data-size when dense changes', async () => {
      const wrapper = createWrapper({ dense: false })
      expect(wrapper.element.hasAttribute('data-size')).toBe(false)
      await wrapper.setProps({ dense: true })
      expect(wrapper.element.getAttribute('data-size')).toBe('dense')
    })

    it('switches the root tag between div and figure as caption changes', async () => {
      const wrapper = createWrapper()
      expect(wrapper.element.tagName).toBe('DIV')
      await wrapper.setProps({ caption: '後から指定' })
      expect(wrapper.element.tagName).toBe('FIGURE')
      expect(wrapper.find('figcaption').text()).toBe('後から指定')
    })

    it('updates data-cell-border as the prop changes', async () => {
      const wrapper = createWrapper({ cellBorder: 'bottom' })
      expect(wrapper.find('table').attributes('data-cell-border')).toBe('bottom')
      await wrapper.setProps({ cellBorder: true })
      expect(wrapper.find('table').attributes('data-cell-border')).toBe('')
    })
  })

  describe('multiple instances', () => {
    it('keeps independent attribute state for two tables', () => {
      const wrapper = mount(
        {
          components: { DadsTable },
          template: `
            <div>
              <DadsTable dense cell-border="bottom">
                <tbody><tr><td>1</td></tr></tbody>
              </DadsTable>
              <DadsTable striped>
                <tbody><tr><td>2</td></tr></tbody>
              </DadsTable>
            </div>
          `,
        },
        { attachTo: document.body },
      )
      const roots = wrapper.findAll('.dads-table')
      expect(roots).toHaveLength(2)
      expect(roots[0].attributes('data-size')).toBe('dense')
      expect(roots[0].find('table').attributes('data-cell-border')).toBe('bottom')
      expect(roots[1].element.hasAttribute('data-size')).toBe(false)
      expect(roots[1].element.hasAttribute('data-row-stripe')).toBe(true)
    })
  })

  describe('a11y (vitest-axe)', () => {
    const mountInBody = (props: DadsTableProps = {}, slots = { default: COL_HEADER_BODY }) =>
      mount(DadsTable, { props, slots, attachTo: document.body })

    it('has no violations with column headers', async () => {
      const wrapper = mountInBody()
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations with a caption (figure/figcaption)', async () => {
      const wrapper = mountInBody({ caption: '従業員一覧' })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations with row headers', async () => {
      const wrapper = mountInBody(
        { caption: '従業員', cellBorder: 'right' },
        {
          default: ROW_HEADER_BODY,
        },
      )
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations in dense + striped + bordered', async () => {
      const wrapper = mountInBody({
        caption: '統計',
        dense: true,
        striped: true,
        cellBorder: 'bottom',
      })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })
  })
})
