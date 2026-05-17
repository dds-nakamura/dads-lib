import { afterEach, describe, expect, it } from 'vitest'
import { enableAutoUnmount, mount } from '@vue/test-utils'
import { axe } from 'vitest-axe'
import DadsMenuListBox from '../DadsMenuListBox.vue'
import type { DadsMenuListBoxItem, DadsMenuListBoxProps } from '../DadsMenuListBox.types'

enableAutoUnmount(afterEach)

const sampleItems: DadsMenuListBoxItem[] = [
  { label: 'メニュー項目1' },
  { label: 'メニュー項目2' },
  { label: 'メニュー項目3' },
]

const createWrapper = (props: Partial<DadsMenuListBoxProps> = {}) =>
  mount(DadsMenuListBox, {
    props: {
      items: sampleItems,
      ...props,
    } as DadsMenuListBoxProps,
  })

describe('DadsMenuListBox', () => {
  describe('rendering', () => {
    it('renders the dads-menu-list-box root container', () => {
      const wrapper = createWrapper()
      expect(wrapper.classes()).toContain('dads-menu-list-box')
    })

    it('renders a <ul role="menu"> as the list container', () => {
      const wrapper = createWrapper()
      const list = wrapper.find('ul.dads-menu-list-box__list')
      expect(list.exists()).toBe(true)
      expect(list.attributes('role')).toBe('menu')
    })

    it('renders one <li role="presentation"> per item', () => {
      const wrapper = createWrapper()
      const lis = wrapper.findAll('li.dads-menu-list-box__list-item')
      expect(lis).toHaveLength(sampleItems.length)
      for (const li of lis) {
        expect(li.attributes('role')).toBe('presentation')
      }
    })

    it('renders one menuitem element per item with the correct label text', () => {
      const wrapper = createWrapper()
      const items = wrapper.findAll('.dads-menu-list-box__item')
      expect(items).toHaveLength(sampleItems.length)
      expect(items[0]?.text()).toContain('メニュー項目1')
      expect(items[1]?.text()).toContain('メニュー項目2')
      expect(items[2]?.text()).toContain('メニュー項目3')
    })

    it('renders <button type="button"> when no href is provided', () => {
      const wrapper = createWrapper()
      const buttons = wrapper.findAll('button.dads-menu-list-box__item')
      expect(buttons).toHaveLength(sampleItems.length)
      for (const btn of buttons) {
        expect(btn.attributes('type')).toBe('button')
        expect(btn.attributes('role')).toBe('menuitem')
      }
    })

    it('handles an empty items array gracefully', () => {
      const wrapper = createWrapper({ items: [] })
      const items = wrapper.findAll('.dads-menu-list-box__item')
      expect(items).toHaveLength(0)
      expect(wrapper.find('ul.dads-menu-list-box__list').exists()).toBe(true)
    })
  })

  describe('description', () => {
    it('renders the description element when item.description is set', () => {
      const wrapper = createWrapper({
        items: [{ label: 'プロフィール', description: 'アカウント情報の編集' }],
      })
      const desc = wrapper.find('.dads-menu-list-box__item-description')
      expect(desc.exists()).toBe(true)
      expect(desc.text()).toBe('アカウント情報の編集')
    })

    it('omits the description element when item.description is absent', () => {
      const wrapper = createWrapper({ items: [{ label: 'プロフィール' }] })
      expect(wrapper.find('.dads-menu-list-box__item-description').exists()).toBe(false)
    })

    it('always renders the label element regardless of description presence', () => {
      const wrapper = createWrapper()
      const labels = wrapper.findAll('.dads-menu-list-box__item-label')
      expect(labels).toHaveLength(sampleItems.length)
    })
  })

  describe('icon', () => {
    it('renders an icon element when item.iconName is set', () => {
      const wrapper = createWrapper({ items: [{ label: 'ホーム', iconName: 'mdi-home' }] })
      const icon = wrapper.find('.dads-menu-list-box__item-icon')
      expect(icon.exists()).toBe(true)
      expect(icon.classes()).toContain('mdi-home')
      expect(icon.attributes('aria-hidden')).toBe('true')
    })

    it('omits the icon element when item.iconName is absent', () => {
      const wrapper = createWrapper({ items: [{ label: 'ホーム' }] })
      expect(wrapper.find('.dads-menu-list-box__item-icon').exists()).toBe(false)
    })
  })

  describe('active state', () => {
    it('applies the --active modifier on active items', () => {
      const wrapper = createWrapper({
        items: [{ label: '一覧' }, { label: '詳細', active: true }, { label: '設定' }],
      })
      const items = wrapper.findAll('.dads-menu-list-box__item')
      expect(items[0]?.classes()).not.toContain('dads-menu-list-box__item--active')
      expect(items[1]?.classes()).toContain('dads-menu-list-box__item--active')
      expect(items[2]?.classes()).not.toContain('dads-menu-list-box__item--active')
    })

    it('sets aria-current="page" on active items', () => {
      const wrapper = createWrapper({
        items: [{ label: 'A' }, { label: 'B', active: true }],
      })
      const items = wrapper.findAll('.dads-menu-list-box__item')
      expect(items[0]?.attributes('aria-current')).toBeUndefined()
      expect(items[1]?.attributes('aria-current')).toBe('page')
    })
  })

  describe('disabled state', () => {
    it('applies the --disabled modifier on disabled items', () => {
      const wrapper = createWrapper({
        items: [{ label: 'A' }, { label: 'B', disabled: true }],
      })
      const items = wrapper.findAll('.dads-menu-list-box__item')
      expect(items[1]?.classes()).toContain('dads-menu-list-box__item--disabled')
    })

    it('sets the disabled attribute on the native button for disabled items', () => {
      const wrapper = createWrapper({ items: [{ label: 'B', disabled: true }] })
      const btn = wrapper.find('button.dads-menu-list-box__item')
      expect(btn.attributes('disabled')).toBeDefined()
      expect(btn.attributes('aria-disabled')).toBe('true')
    })

    it('renders disabled href items as <span>-like buttons (not anchors)', () => {
      // Disabled + href: we deliberately render as <button> so the link cannot be
      // followed by mouse / keyboard.
      const wrapper = createWrapper({
        items: [{ label: 'B', href: '/b', disabled: true }],
      })
      expect(wrapper.find('a.dads-menu-list-box__item').exists()).toBe(false)
      expect(wrapper.find('button.dads-menu-list-box__item').exists()).toBe(true)
    })

    it('does not emit click:item when a disabled item is clicked', async () => {
      const wrapper = createWrapper({
        items: [{ label: 'A' }, { label: 'B', disabled: true }],
      })
      const items = wrapper.findAll('.dads-menu-list-box__item')
      await items[1]?.trigger('click')
      expect(wrapper.emitted('click:item')).toBeFalsy()
    })
  })

  describe('href / anchor rendering', () => {
    it('renders an <a> element for items with href', () => {
      const wrapper = createWrapper({
        items: [{ label: '外部', href: 'https://example.com' }],
      })
      const link = wrapper.find('a.dads-menu-list-box__item')
      expect(link.exists()).toBe(true)
      expect(link.attributes('href')).toBe('https://example.com')
      expect(link.attributes('role')).toBe('menuitem')
    })

    it('does not set the type attribute on anchor items', () => {
      const wrapper = createWrapper({
        items: [{ label: '外部', href: 'https://example.com' }],
      })
      const link = wrapper.find('a.dads-menu-list-box__item')
      expect(link.attributes('type')).toBeUndefined()
    })

    it('mixes <a> and <button> when items have heterogeneous href', () => {
      const wrapper = createWrapper({
        items: [{ label: 'リンク', href: '/x' }, { label: 'ボタン' }],
      })
      expect(wrapper.findAll('a.dads-menu-list-box__item')).toHaveLength(1)
      expect(wrapper.findAll('button.dads-menu-list-box__item')).toHaveLength(1)
    })
  })

  describe('aria semantics', () => {
    it('applies the aria-label prop to the <ul role="menu">', () => {
      const wrapper = createWrapper({ ariaLabel: 'グローバルメニュー' })
      const list = wrapper.find('ul.dads-menu-list-box__list')
      expect(list.attributes('aria-label')).toBe('グローバルメニュー')
    })

    it('omits aria-label on the list when not provided', () => {
      const wrapper = createWrapper()
      const list = wrapper.find('ul.dads-menu-list-box__list')
      expect(list.attributes('aria-label')).toBeUndefined()
    })

    it('uses role="menu" on the list and role="menuitem" on actionable items', () => {
      const wrapper = createWrapper()
      expect(wrapper.find('ul.dads-menu-list-box__list').attributes('role')).toBe('menu')
      const items = wrapper.findAll('.dads-menu-list-box__item')
      for (const item of items) {
        expect(item.attributes('role')).toBe('menuitem')
      }
    })
  })

  describe('click interactions', () => {
    it('emits click:item with the item, index, and MouseEvent when a button item is clicked', async () => {
      const wrapper = createWrapper()
      const items = wrapper.findAll('.dads-menu-list-box__item')
      await items[1]?.trigger('click')
      const emitted = wrapper.emitted('click:item')
      expect(emitted).toBeTruthy()
      expect(emitted?.[0]?.[0]).toEqual(sampleItems[1])
      expect(emitted?.[0]?.[1]).toBe(1)
      expect(emitted?.[0]?.[2]).toBeInstanceOf(Event)
    })

    it('emits click:item when an anchor item is clicked', async () => {
      const wrapper = createWrapper({
        items: [{ label: 'L', href: '/x' }],
      })
      const link = wrapper.find('a.dads-menu-list-box__item')
      await link.trigger('click')
      expect(wrapper.emitted('click:item')).toBeTruthy()
    })
  })

  // ----------------------------------------------------------------------
  // Opener mode — triggerLabel turns the component into a dropdown with an
  // opener button, hidden surface, v-model open state, and open/close events.
  // ----------------------------------------------------------------------
  describe('opener mode', () => {
    it('does not render the trigger button when triggerLabel is omitted', () => {
      const wrapper = createWrapper()
      expect(wrapper.find('.dads-menu-list-box__trigger').exists()).toBe(false)
    })

    it('renders the trigger button when triggerLabel is provided', () => {
      const wrapper = createWrapper({ triggerLabel: 'メニュー' })
      const trigger = wrapper.find('button.dads-menu-list-box__trigger')
      expect(trigger.exists()).toBe(true)
      expect(trigger.text()).toContain('メニュー')
    })

    it('renders the trigger icon when triggerIcon is provided', () => {
      const wrapper = createWrapper({ triggerLabel: 'メニュー', triggerIcon: 'mdi-menu' })
      const icon = wrapper.find('.dads-menu-list-box__trigger-icon')
      expect(icon.exists()).toBe(true)
      expect(icon.classes()).toContain('mdi-menu')
    })

    it('applies the trigger size modifier', () => {
      const wrapper = createWrapper({ triggerLabel: 'メニュー', triggerSize: 'lg' })
      expect(wrapper.find('.dads-menu-list-box__trigger').classes()).toContain(
        'dads-menu-list-box__trigger--lg',
      )
    })

    it('reflects open state via aria-expanded on the trigger', async () => {
      const wrapper = createWrapper({ triggerLabel: 'メニュー', modelValue: false })
      const trigger = wrapper.find('.dads-menu-list-box__trigger')
      expect(trigger.attributes('aria-expanded')).toBe('false')
      await wrapper.setProps({ modelValue: true })
      expect(trigger.attributes('aria-expanded')).toBe('true')
    })

    it('aria-controls points to the surface element', () => {
      const wrapper = createWrapper({ triggerLabel: 'メニュー', modelValue: true })
      const trigger = wrapper.find('.dads-menu-list-box__trigger')
      const surface = wrapper.find('.dads-menu-list-box__surface')
      expect(trigger.attributes('aria-controls')).toBe(surface.attributes('id'))
    })

    it('hides the surface via display: none when modelValue=false (v-show)', () => {
      const wrapper = createWrapper({ triggerLabel: 'メニュー', modelValue: false })
      const surface = wrapper.find('.dads-menu-list-box__surface')
      expect(surface.exists()).toBe(true)
      // v-show keeps the element in the DOM with display:none.
      expect((surface.element as HTMLElement).style.display).toBe('none')
    })

    it('shows the surface when modelValue=true', () => {
      const wrapper = createWrapper({ triggerLabel: 'メニュー', modelValue: true })
      const surface = wrapper.find('.dads-menu-list-box__surface')
      expect((surface.element as HTMLElement).style.display).not.toBe('none')
    })

    it('emits update:modelValue when the trigger is clicked (closed → open)', async () => {
      const wrapper = createWrapper({ triggerLabel: 'メニュー', modelValue: false })
      await wrapper.find('.dads-menu-list-box__trigger').trigger('click')
      const emitted = wrapper.emitted('update:modelValue')
      expect(emitted?.[0]?.[0]).toBe(true)
    })

    it('emits update:modelValue when the trigger is clicked (open → closed)', async () => {
      const wrapper = createWrapper({ triggerLabel: 'メニュー', modelValue: true })
      await wrapper.find('.dads-menu-list-box__trigger').trigger('click')
      const emitted = wrapper.emitted('update:modelValue')
      expect(emitted?.[0]?.[0]).toBe(false)
    })

    it('emits open event when modelValue transitions to true', async () => {
      const wrapper = createWrapper({ triggerLabel: 'メニュー', modelValue: false })
      await wrapper.setProps({ modelValue: true })
      expect(wrapper.emitted('open')).toBeTruthy()
    })

    it('emits close event when modelValue transitions to false', async () => {
      const wrapper = createWrapper({ triggerLabel: 'メニュー', modelValue: true })
      await wrapper.setProps({ modelValue: false })
      expect(wrapper.emitted('close')).toBeTruthy()
    })

    it('does not emit open/close on initial mount (only on real transitions)', () => {
      const wrapper = createWrapper({ triggerLabel: 'メニュー', modelValue: true })
      expect(wrapper.emitted('open')).toBeFalsy()
      expect(wrapper.emitted('close')).toBeFalsy()
    })

    it('applies the placement modifier (start by default)', () => {
      const wrapper = createWrapper({ triggerLabel: 'メニュー', modelValue: true })
      expect(wrapper.classes()).toContain('dads-menu-list-box--placement-start')
    })

    it('applies the end placement modifier when placement="end"', () => {
      const wrapper = createWrapper({
        triggerLabel: 'メニュー',
        modelValue: true,
        placement: 'end',
      })
      expect(wrapper.classes()).toContain('dads-menu-list-box--placement-end')
    })

    it('does not emit open/close in standalone mode (no opener)', async () => {
      // Without triggerLabel, the modelValue prop is irrelevant — no events
      // should fire even when it changes.
      const wrapper = createWrapper({ modelValue: false })
      await wrapper.setProps({ modelValue: true })
      expect(wrapper.emitted('open')).toBeFalsy()
    })
  })

  describe('standalone mode (no opener)', () => {
    it('always shows the surface even when modelValue=false', () => {
      const wrapper = createWrapper({ modelValue: false })
      const surface = wrapper.find('.dads-menu-list-box__surface')
      expect(surface.exists()).toBe(true)
      // No v-show display:none should be applied in standalone mode.
      expect((surface.element as HTMLElement).style.display).not.toBe('none')
    })
  })

  describe('a11y (vitest-axe)', () => {
    // The component is a non-landmark surface (used inside a nav / dialog by
    // callers); for axe to skip the `region` rule we mount inside a real
    // landmark wrapper rather than at the bare component root.
    const mountInLandmark = (props: Partial<DadsMenuListBoxProps> = {}) =>
      mount(
        {
          components: { DadsMenuListBox },
          props: ['boxProps'],
          template: `<nav aria-label="テスト用ナビ"><DadsMenuListBox v-bind="boxProps" /></nav>`,
        },
        {
          props: { boxProps: { items: sampleItems, ...props } },
          attachTo: document.body,
        },
      )

    it('has no violations in standalone mode with aria-label', async () => {
      const wrapper = mountInLandmark({ ariaLabel: 'メインメニュー' })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations with item descriptions and icons', async () => {
      const wrapper = mountInLandmark({
        ariaLabel: 'カテゴリ一覧',
        items: [
          { label: 'ホーム', iconName: 'mdi-home', description: 'トップページに戻ります' },
          { label: 'ニュース', iconName: 'mdi-newspaper', description: '最新のお知らせ' },
        ],
      })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations with an active item', async () => {
      const wrapper = mountInLandmark({
        ariaLabel: 'メニュー',
        items: [
          { label: 'ホーム', href: '/', active: true },
          { label: 'ニュース', href: '/news' },
        ],
      })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations with a disabled item', async () => {
      const wrapper = mountInLandmark({
        ariaLabel: 'メニュー',
        items: [
          { label: 'ホーム', href: '/' },
          { label: '準備中', disabled: true },
        ],
      })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations in opener mode when open', async () => {
      const wrapper = mountInLandmark({
        ariaLabel: 'ユーザーメニュー',
        triggerLabel: 'メニューを開く',
        modelValue: true,
      })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations in opener mode when closed', async () => {
      const wrapper = mountInLandmark({
        ariaLabel: 'ユーザーメニュー',
        triggerLabel: 'メニューを開く',
        modelValue: false,
      })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })
  })
})
