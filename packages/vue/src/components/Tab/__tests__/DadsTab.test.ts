import { afterEach, describe, expect, it } from 'vitest'
import { enableAutoUnmount, mount } from '@vue/test-utils'
import { axe } from 'vitest-axe'
import { nextTick } from 'vue'
import DadsTab from '../DadsTab.vue'
import type { DadsTabItem, DadsTabProps } from '../DadsTab.types'

enableAutoUnmount(afterEach)

const items: DadsTabItem[] = [
  { value: 'overview', label: '概要' },
  { value: 'details', label: '詳細' },
  { value: 'history', label: '履歴' },
]

const createWrapper = (props: Partial<DadsTabProps> = {}, slots: Record<string, string> = {}) =>
  mount(DadsTab, {
    props: { items, modelValue: 'overview', ...props } as DadsTabProps,
    slots,
    attachTo: document.body,
  })

describe('DadsTab', () => {
  describe('rendering', () => {
    it('renders a root element with the dads-tab class', () => {
      const wrapper = createWrapper()
      expect(wrapper.classes()).toContain('dads-tab')
    })

    it('renders a tablist with role="tablist"', () => {
      const wrapper = createWrapper()
      const tablist = wrapper.find('[role="tablist"]')
      expect(tablist.exists()).toBe(true)
      expect(tablist.classes()).toContain('dads-tab__list')
    })

    it('renders one tab button per item', () => {
      const wrapper = createWrapper()
      expect(wrapper.findAll('[role="tab"]')).toHaveLength(3)
    })

    it('renders one tabpanel per item', () => {
      const wrapper = createWrapper()
      expect(wrapper.findAll('[role="tabpanel"]')).toHaveLength(3)
    })

    it('renders the labels inside each tab', () => {
      const wrapper = createWrapper()
      const tabs = wrapper.findAll('[role="tab"]')
      expect(tabs[0].text()).toBe('概要')
      expect(tabs[1].text()).toBe('詳細')
      expect(tabs[2].text()).toBe('履歴')
    })
  })

  describe('ARIA attributes', () => {
    it('sets aria-selected only on the active tab', () => {
      const wrapper = createWrapper({ modelValue: 'details' })
      const tabs = wrapper.findAll('[role="tab"]')
      expect(tabs[0].attributes('aria-selected')).toBe('false')
      expect(tabs[1].attributes('aria-selected')).toBe('true')
      expect(tabs[2].attributes('aria-selected')).toBe('false')
    })

    it('wires aria-controls to the matching panel id', () => {
      const wrapper = createWrapper()
      const tabs = wrapper.findAll('[role="tab"]')
      const panels = wrapper.findAll('[role="tabpanel"]')
      tabs.forEach((tab, idx) => {
        expect(tab.attributes('aria-controls')).toBe(panels[idx].attributes('id'))
      })
    })

    it('wires aria-labelledby on each panel back to its tab id', () => {
      const wrapper = createWrapper()
      const tabs = wrapper.findAll('[role="tab"]')
      const panels = wrapper.findAll('[role="tabpanel"]')
      tabs.forEach((tab, idx) => {
        expect(panels[idx].attributes('aria-labelledby')).toBe(tab.attributes('id'))
      })
    })

    it('uses the default aria-label "タブ" when not provided', () => {
      const wrapper = createWrapper()
      const tablist = wrapper.find('[role="tablist"]')
      expect(tablist.attributes('aria-label')).toBe('タブ')
    })

    it('respects a custom aria-label', () => {
      const wrapper = createWrapper({ ariaLabel: '設定タブ' })
      expect(wrapper.find('[role="tablist"]').attributes('aria-label')).toBe('設定タブ')
    })
  })

  describe('roving tabindex', () => {
    it('sets tabindex=0 only on the active tab', () => {
      const wrapper = createWrapper({ modelValue: 'details' })
      const tabs = wrapper.findAll('[role="tab"]')
      expect(tabs[0].attributes('tabindex')).toBe('-1')
      expect(tabs[1].attributes('tabindex')).toBe('0')
      expect(tabs[2].attributes('tabindex')).toBe('-1')
    })

    it('updates tabindex when the active tab changes', async () => {
      const wrapper = createWrapper({ modelValue: 'overview' })
      await wrapper.setProps({ modelValue: 'history' })
      const tabs = wrapper.findAll('[role="tab"]')
      expect(tabs[0].attributes('tabindex')).toBe('-1')
      expect(tabs[2].attributes('tabindex')).toBe('0')
    })
  })

  describe('v-model', () => {
    it('emits update:modelValue on click', async () => {
      const wrapper = createWrapper({ modelValue: 'overview' })
      await wrapper.findAll('[role="tab"]')[1].trigger('click')
      expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toBe('details')
    })

    it('emits change on click', async () => {
      const wrapper = createWrapper({ modelValue: 'overview' })
      await wrapper.findAll('[role="tab"]')[2].trigger('click')
      expect(wrapper.emitted('change')?.[0]?.[0]).toBe('history')
    })

    it('does not emit when clicking the already active tab', async () => {
      const wrapper = createWrapper({ modelValue: 'overview' })
      await wrapper.findAll('[role="tab"]')[0].trigger('click')
      expect(wrapper.emitted('update:modelValue')).toBeUndefined()
      expect(wrapper.emitted('change')).toBeUndefined()
    })
  })

  describe('keyboard navigation', () => {
    it('moves to the next tab on ArrowRight', async () => {
      const wrapper = createWrapper({ modelValue: 'overview' })
      await wrapper.find('[role="tablist"]').trigger('keydown', { key: 'ArrowRight' })
      expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toBe('details')
    })

    it('moves to the previous tab on ArrowLeft', async () => {
      const wrapper = createWrapper({ modelValue: 'details' })
      await wrapper.find('[role="tablist"]').trigger('keydown', { key: 'ArrowLeft' })
      expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toBe('overview')
    })

    it('wraps from the last tab to the first on ArrowRight', async () => {
      const wrapper = createWrapper({ modelValue: 'history' })
      await wrapper.find('[role="tablist"]').trigger('keydown', { key: 'ArrowRight' })
      expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toBe('overview')
    })

    it('wraps from the first tab to the last on ArrowLeft', async () => {
      const wrapper = createWrapper({ modelValue: 'overview' })
      await wrapper.find('[role="tablist"]').trigger('keydown', { key: 'ArrowLeft' })
      expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toBe('history')
    })

    it('jumps to the first enabled tab on Home', async () => {
      const wrapper = createWrapper({ modelValue: 'history' })
      await wrapper.find('[role="tablist"]').trigger('keydown', { key: 'Home' })
      expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toBe('overview')
    })

    it('jumps to the last enabled tab on End', async () => {
      const wrapper = createWrapper({ modelValue: 'overview' })
      await wrapper.find('[role="tablist"]').trigger('keydown', { key: 'End' })
      expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toBe('history')
    })

    it('does nothing on Enter when on the active tab', async () => {
      const wrapper = createWrapper({ modelValue: 'overview' })
      await wrapper.find('[role="tablist"]').trigger('keydown', { key: 'Enter' })
      expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    })

    it('does nothing on Space when on the active tab', async () => {
      const wrapper = createWrapper({ modelValue: 'overview' })
      await wrapper.find('[role="tablist"]').trigger('keydown', { key: ' ' })
      expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    })

    it('ignores unrelated keys', async () => {
      const wrapper = createWrapper({ modelValue: 'overview' })
      await wrapper.find('[role="tablist"]').trigger('keydown', { key: 'a' })
      await wrapper.find('[role="tablist"]').trigger('keydown', { key: 'Escape' })
      expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    })

    it('moves focus to the newly selected tab', async () => {
      const wrapper = createWrapper({ modelValue: 'overview' })
      await wrapper.find('[role="tablist"]').trigger('keydown', { key: 'ArrowRight' })
      await wrapper.setProps({ modelValue: 'details' })
      await nextTick()
      expect(document.activeElement).toBe(wrapper.findAll('[role="tab"]')[1].element)
    })
  })

  describe('disabled tab handling', () => {
    const itemsWithDisabled: DadsTabItem[] = [
      { value: 'a', label: 'A' },
      { value: 'b', label: 'B', disabled: true },
      { value: 'c', label: 'C' },
    ]

    it('applies the disabled class to a disabled tab', () => {
      const wrapper = createWrapper({ items: itemsWithDisabled, modelValue: 'a' })
      const tabs = wrapper.findAll('[role="tab"]')
      expect(tabs[1].classes()).toContain('dads-tab__tab--disabled')
    })

    it('renders the native disabled attribute on a disabled tab', () => {
      const wrapper = createWrapper({ items: itemsWithDisabled, modelValue: 'a' })
      const tabs = wrapper.findAll('[role="tab"]')
      expect(tabs[1].attributes('disabled')).toBeDefined()
    })

    it('skips disabled tabs on ArrowRight', async () => {
      const wrapper = createWrapper({ items: itemsWithDisabled, modelValue: 'a' })
      await wrapper.find('[role="tablist"]').trigger('keydown', { key: 'ArrowRight' })
      expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toBe('c')
    })

    it('skips disabled tabs on ArrowLeft', async () => {
      const wrapper = createWrapper({ items: itemsWithDisabled, modelValue: 'c' })
      await wrapper.find('[role="tablist"]').trigger('keydown', { key: 'ArrowLeft' })
      expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toBe('a')
    })

    it('does not emit when clicking a disabled tab', async () => {
      const wrapper = createWrapper({ items: itemsWithDisabled, modelValue: 'a' })
      await wrapper.findAll('[role="tab"]')[1].trigger('click')
      expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    })
  })

  describe('lazy mount (keepAlive=false)', () => {
    it('marks non-active panels with hidden=true', () => {
      const wrapper = createWrapper({ modelValue: 'overview' })
      const panels = wrapper.findAll('[role="tabpanel"]')
      expect(panels[0].attributes('hidden')).toBeUndefined()
      expect(panels[1].attributes('hidden')).toBeDefined()
      expect(panels[2].attributes('hidden')).toBeDefined()
    })

    it('only renders slot content for the active panel', () => {
      const wrapper = createWrapper(
        { modelValue: 'overview' },
        {
          'panel-overview': '<p class="overview-content">Overview body</p>',
          'panel-details': '<p class="details-content">Details body</p>',
          'panel-history': '<p class="history-content">History body</p>',
        },
      )
      expect(wrapper.find('.overview-content').exists()).toBe(true)
      expect(wrapper.find('.details-content').exists()).toBe(false)
      expect(wrapper.find('.history-content').exists()).toBe(false)
    })

    it('renders the previously hidden slot content after switching tabs', async () => {
      const wrapper = createWrapper(
        { modelValue: 'overview' },
        {
          'panel-overview': '<p class="overview-content">Overview body</p>',
          'panel-details': '<p class="details-content">Details body</p>',
        },
      )
      expect(wrapper.find('.details-content').exists()).toBe(false)
      await wrapper.setProps({ modelValue: 'details' })
      expect(wrapper.find('.details-content').exists()).toBe(true)
    })
  })

  describe('keepAlive=true', () => {
    it('does not set hidden on inactive panels', () => {
      const wrapper = createWrapper({ modelValue: 'overview', keepAlive: true })
      const panels = wrapper.findAll('[role="tabpanel"]')
      panels.forEach((p) => {
        expect(p.attributes('hidden')).toBeUndefined()
      })
    })

    it('renders all panel slot content up front', () => {
      const wrapper = createWrapper(
        { modelValue: 'overview', keepAlive: true },
        {
          'panel-overview': '<p class="overview-content">Overview body</p>',
          'panel-details': '<p class="details-content">Details body</p>',
          'panel-history': '<p class="history-content">History body</p>',
        },
      )
      expect(wrapper.find('.overview-content').exists()).toBe(true)
      expect(wrapper.find('.details-content').exists()).toBe(true)
      expect(wrapper.find('.history-content').exists()).toBe(true)
    })

    it('uses inline display:none on inactive panels via v-show', () => {
      const wrapper = createWrapper({ modelValue: 'overview', keepAlive: true })
      const panels = wrapper.findAll('[role="tabpanel"]')
      // Active panel: not hidden via v-show → no inline display.
      const activeStyle = (panels[0].element as HTMLElement).style.display
      const inactiveStyle = (panels[1].element as HTMLElement).style.display
      expect(activeStyle).toBe('')
      expect(inactiveStyle).toBe('none')
    })
  })

  describe('id wiring', () => {
    it('produces unique tab/panel ids per instance', () => {
      const wrapper = mount({
        components: { DadsTab },
        data() {
          return { items, modelValue: 'overview' }
        },
        template: `
          <div>
            <DadsTab :items="items" v-model="modelValue" />
            <DadsTab :items="items" v-model="modelValue" />
          </div>
        `,
        attachTo: document.body,
      })
      const allTabs = wrapper.findAll('[role="tab"]')
      const ids = allTabs.map((t) => t.attributes('id'))
      expect(new Set(ids).size).toBe(ids.length)
    })
  })

  describe('value types', () => {
    it('handles numeric values for v-model and slot names', async () => {
      const numericItems: DadsTabItem[] = [
        { value: 1, label: 'One' },
        { value: 2, label: 'Two' },
      ]
      const wrapper = createWrapper(
        { items: numericItems, modelValue: 1 },
        {
          'panel-1': '<p class="one-content">One</p>',
          'panel-2': '<p class="two-content">Two</p>',
        },
      )
      expect(wrapper.find('.one-content').exists()).toBe(true)
      await wrapper.findAll('[role="tab"]')[1].trigger('click')
      expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toBe(2)
    })
  })

  describe('orientation', () => {
    it('defaults to horizontal and sets aria-orientation', () => {
      const wrapper = createWrapper()
      expect(wrapper.classes()).toContain('dads-tab--horizontal')
      expect(wrapper.find('[role="tablist"]').attributes('aria-orientation')).toBe('horizontal')
    })

    it('applies the vertical modifier class and aria-orientation when prop is vertical', () => {
      const wrapper = createWrapper({ orientation: 'vertical' })
      expect(wrapper.classes()).toContain('dads-tab--vertical')
      expect(wrapper.find('[role="tablist"]').attributes('aria-orientation')).toBe('vertical')
    })

    it('navigates horizontally with ArrowLeft/ArrowRight (default)', async () => {
      const wrapper = createWrapper()
      const list = wrapper.find('[role="tablist"]')
      await list.trigger('keydown', { key: 'ArrowRight' })
      expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toBe('details')
      await list.trigger('keydown', { key: 'ArrowUp' })
      // ArrowUp is a no-op for horizontal
      expect(wrapper.emitted('update:modelValue')).toHaveLength(1)
    })

    it('navigates vertically with ArrowUp/ArrowDown when orientation=vertical', async () => {
      const wrapper = createWrapper({ orientation: 'vertical' })
      const list = wrapper.find('[role="tablist"]')
      await list.trigger('keydown', { key: 'ArrowDown' })
      expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toBe('details')
      await list.trigger('keydown', { key: 'ArrowRight' })
      // ArrowRight is a no-op for vertical
      expect(wrapper.emitted('update:modelValue')).toHaveLength(1)
    })
  })

  describe('icon support', () => {
    it('renders an <i> with mdi class when item.icon is set', () => {
      const wrapper = createWrapper({
        items: [
          { value: 'a', label: 'A', icon: 'mdi-home' },
          { value: 'b', label: 'B' },
        ],
        modelValue: 'a',
      })
      const tabs = wrapper.findAll('[role="tab"]')
      const firstIcon = tabs[0].find('i.mdi')
      expect(firstIcon.exists()).toBe(true)
      expect(firstIcon.classes()).toContain('mdi-home')
      expect(firstIcon.attributes('aria-hidden')).toBe('true')
      // Second tab without icon
      expect(tabs[1].find('i.mdi').exists()).toBe(false)
    })

    it('keeps the label visible alongside the icon', () => {
      const wrapper = createWrapper({
        items: [{ value: 'a', label: 'Home', icon: 'mdi-home' }],
        modelValue: 'a',
      })
      const tab = wrapper.find('[role="tab"]')
      expect(tab.find('.dads-tab__label').text()).toBe('Home')
    })
  })

  describe('a11y (vitest-axe)', () => {
    const panelSlots = {
      'panel-overview': '<p>概要パネル</p>',
      'panel-details': '<p>詳細パネル</p>',
      'panel-history': '<p>履歴パネル</p>',
    }

    it('has no violations with a horizontal tablist', async () => {
      const wrapper = createWrapper({}, panelSlots)
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations with a vertical tablist', async () => {
      const wrapper = createWrapper({ orientation: 'vertical' }, panelSlots)
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations with icons', async () => {
      const wrapper = createWrapper(
        {
          items: [
            { value: 'home', label: 'ホーム', icon: 'mdi-home' },
            { value: 'settings', label: '設定', icon: 'mdi-cog' },
          ],
          modelValue: 'home',
        },
        { 'panel-home': '<p>ホーム</p>', 'panel-settings': '<p>設定</p>' },
      )
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations with a disabled tab', async () => {
      const wrapper = createWrapper(
        {
          items: [
            { value: 'a', label: 'A' },
            { value: 'b', label: 'B', disabled: true },
            { value: 'c', label: 'C' },
          ],
          modelValue: 'a',
        },
        { 'panel-a': '<p>A</p>', 'panel-b': '<p>B</p>', 'panel-c': '<p>C</p>' },
      )
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations with keepAlive panels', async () => {
      const wrapper = createWrapper({ keepAlive: true }, panelSlots)
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })
  })
})
