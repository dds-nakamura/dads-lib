import { afterEach, describe, expect, it } from 'vitest'
import { enableAutoUnmount, mount } from '@vue/test-utils'
import { axe } from 'vitest-axe'
import { nextTick } from 'vue'
import DadsMegaMenu from '../DadsMegaMenu.vue'
import type { DadsMegaMenuColumn, DadsMegaMenuProps } from '../DadsMegaMenu.types'

enableAutoUnmount(afterEach)

const sampleColumns: DadsMegaMenuColumn[] = [
  {
    heading: 'プロダクト',
    items: [
      { label: '概要', href: '/products' },
      { label: '機能一覧', href: '/products/features' },
      { label: '価格', href: '/products/pricing' },
    ],
  },
  {
    heading: 'リソース',
    items: [
      { label: 'ドキュメント', href: '/docs' },
      { label: 'ブログ', href: '/blog' },
    ],
  },
  {
    items: [{ label: '見出しなし', href: '/misc' }],
  },
]

const createWrapper = (props: Partial<DadsMegaMenuProps> = {}) =>
  mount(DadsMegaMenu, {
    props: {
      modelValue: false,
      triggerLabel: 'メニュー',
      columns: sampleColumns,
      ...props,
    } as DadsMegaMenuProps,
    attachTo: document.body,
  })

const getTrigger = (root: HTMLElement) =>
  root.querySelector('.dads-mega-menu__trigger') as HTMLButtonElement

const getPanel = (root: HTMLElement) => root.querySelector('.dads-mega-menu__panel') as HTMLElement

describe('DadsMegaMenu', () => {
  // -------------------- rendering --------------------------------------
  describe('rendering', () => {
    it('renders the root element with the dads-mega-menu class', () => {
      const wrapper = createWrapper()
      expect(wrapper.find('.dads-mega-menu').exists()).toBe(true)
    })

    it('renders the trigger button with the supplied label', () => {
      const wrapper = createWrapper({ triggerLabel: 'サービス' })
      const trigger = getTrigger(wrapper.element as HTMLElement)
      expect(trigger).not.toBeNull()
      expect(trigger.textContent?.includes('サービス')).toBe(true)
    })

    it('renders the panel hidden (v-show=false) when modelValue is false', () => {
      const wrapper = createWrapper({ modelValue: false })
      const panel = getPanel(wrapper.element as HTMLElement)
      // v-show toggles display:none — element is always in the DOM tree
      expect(panel).not.toBeNull()
      expect((panel as HTMLElement).style.display).toBe('none')
    })

    it('renders the panel visible when modelValue is true', async () => {
      const wrapper = createWrapper({ modelValue: true })
      await nextTick()
      const panel = getPanel(wrapper.element as HTMLElement)
      expect(panel).not.toBeNull()
      expect((panel as HTMLElement).style.display).not.toBe('none')
    })

    it('renders one column section per columns entry', async () => {
      const wrapper = createWrapper({ modelValue: true })
      await nextTick()
      const columns = (wrapper.element as HTMLElement).querySelectorAll('.dads-mega-menu__column')
      expect(columns.length).toBe(sampleColumns.length)
    })

    it('renders a heading for columns with a heading prop', async () => {
      const wrapper = createWrapper({ modelValue: true })
      await nextTick()
      const headings = (wrapper.element as HTMLElement).querySelectorAll('.dads-mega-menu__heading')
      // 2 columns have heading, 1 doesn't
      expect(headings.length).toBe(2)
      expect(headings[0].textContent).toBe('プロダクト')
      expect(headings[1].textContent).toBe('リソース')
    })

    it('renders a DadsMenuList inside each column', async () => {
      const wrapper = createWrapper({ modelValue: true })
      await nextTick()
      const lists = (wrapper.element as HTMLElement).querySelectorAll(
        '.dads-mega-menu__column .dads-menu-list',
      )
      expect(lists.length).toBe(sampleColumns.length)
    })

    it('renders every link from every column inside the panel', async () => {
      const wrapper = createWrapper({ modelValue: true })
      await nextTick()
      const anchors = (wrapper.element as HTMLElement).querySelectorAll(
        '.dads-mega-menu__panel a.dads-menu-list__item',
      )
      // 3 + 2 + 1 = 6 total items
      expect(anchors.length).toBe(6)
    })
  })

  // -------------------- a11y attributes --------------------------------
  describe('a11y attributes', () => {
    it('sets aria-expanded="false" on the trigger when closed', () => {
      const wrapper = createWrapper({ modelValue: false })
      const trigger = getTrigger(wrapper.element as HTMLElement)
      expect(trigger.getAttribute('aria-expanded')).toBe('false')
    })

    it('sets aria-expanded="true" on the trigger when open', async () => {
      const wrapper = createWrapper({ modelValue: true })
      await nextTick()
      const trigger = getTrigger(wrapper.element as HTMLElement)
      expect(trigger.getAttribute('aria-expanded')).toBe('true')
    })

    it('links the trigger to the panel via aria-controls', () => {
      const wrapper = createWrapper()
      const trigger = getTrigger(wrapper.element as HTMLElement)
      const panel = getPanel(wrapper.element as HTMLElement)
      const controls = trigger.getAttribute('aria-controls')
      expect(controls).toBeTruthy()
      expect(panel.id).toBe(controls)
    })

    it('sets aria-haspopup="dialog" on the trigger', () => {
      const wrapper = createWrapper()
      const trigger = getTrigger(wrapper.element as HTMLElement)
      expect(trigger.getAttribute('aria-haspopup')).toBe('dialog')
    })

    it('sets role="dialog" on the panel', () => {
      const wrapper = createWrapper()
      const panel = getPanel(wrapper.element as HTMLElement)
      expect(panel.getAttribute('role')).toBe('dialog')
    })

    it('falls back to triggerLabel-derived labelling when ariaLabel is missing', () => {
      const wrapper = createWrapper({ triggerLabel: 'メニュー' })
      const panel = getPanel(wrapper.element as HTMLElement)
      const trigger = getTrigger(wrapper.element as HTMLElement)
      // labelledby points at the trigger so the trigger label is announced
      expect(panel.getAttribute('aria-labelledby')).toBe(trigger.id)
    })

    it('uses ariaLabel when provided (and clears aria-labelledby)', () => {
      const wrapper = createWrapper({ ariaLabel: 'サイトナビゲーション' })
      const panel = getPanel(wrapper.element as HTMLElement)
      expect(panel.getAttribute('aria-label')).toBe('サイトナビゲーション')
      // labelledby should not be present when an explicit aria-label wins
      expect(panel.hasAttribute('aria-labelledby')).toBe(false)
    })
  })

  // -------------------- open / close interactions ----------------------
  describe('open / close interactions', () => {
    it('emits update:modelValue=true when the trigger is clicked while closed', async () => {
      const wrapper = createWrapper({ modelValue: false })
      const trigger = getTrigger(wrapper.element as HTMLElement)
      trigger.click()
      await nextTick()
      const events = wrapper.emitted('update:modelValue')
      expect(events?.[0]?.[0]).toBe(true)
    })

    it('emits update:modelValue=false when the trigger is clicked while open', async () => {
      const wrapper = createWrapper({ modelValue: true })
      const trigger = getTrigger(wrapper.element as HTMLElement)
      trigger.click()
      await nextTick()
      const events = wrapper.emitted('update:modelValue')
      expect(events?.[0]?.[0]).toBe(false)
    })

    it('emits update:modelValue=false on Escape keydown inside the panel', async () => {
      const wrapper = createWrapper({ modelValue: true })
      await nextTick()
      const panel = getPanel(wrapper.element as HTMLElement)
      panel.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true }),
      )
      await nextTick()
      const events = wrapper.emitted('update:modelValue')
      expect(events?.[0]?.[0]).toBe(false)
    })

    it('emits update:modelValue=false on Escape keydown on the trigger', async () => {
      const wrapper = createWrapper({ modelValue: true })
      const trigger = getTrigger(wrapper.element as HTMLElement)
      trigger.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true }),
      )
      await nextTick()
      const events = wrapper.emitted('update:modelValue')
      expect(events?.[0]?.[0]).toBe(false)
    })

    it('emits update:modelValue=false on click outside the root', async () => {
      const wrapper = createWrapper({ modelValue: true })
      const outside = document.createElement('div')
      document.body.appendChild(outside)
      outside.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, cancelable: true }))
      await nextTick()
      const events = wrapper.emitted('update:modelValue')
      expect(events?.[0]?.[0]).toBe(false)
      outside.remove()
    })

    it('does not close when clicking inside the panel', async () => {
      const wrapper = createWrapper({ modelValue: true })
      await nextTick()
      const panel = getPanel(wrapper.element as HTMLElement)
      panel.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, cancelable: true }))
      await nextTick()
      // No close event was emitted by pointerdown alone
      const events = wrapper.emitted('update:modelValue')
      expect(events).toBeFalsy()
    })

    it('opens via ArrowDown on the trigger', async () => {
      const wrapper = createWrapper({ modelValue: false })
      const trigger = getTrigger(wrapper.element as HTMLElement)
      trigger.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, cancelable: true }),
      )
      await nextTick()
      const events = wrapper.emitted('update:modelValue')
      expect(events?.[0]?.[0]).toBe(true)
    })

    it('toggles via Enter key on the trigger', async () => {
      const wrapper = createWrapper({ modelValue: false })
      const trigger = getTrigger(wrapper.element as HTMLElement)
      trigger.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true }),
      )
      await nextTick()
      const events = wrapper.emitted('update:modelValue')
      expect(events?.[0]?.[0]).toBe(true)
    })
  })

  // -------------------- v-model two-way --------------------------------
  describe('v-model two-way', () => {
    it('reacts to external modelValue changes', async () => {
      const wrapper = createWrapper({ modelValue: false })
      let panel = getPanel(wrapper.element as HTMLElement)
      expect((panel as HTMLElement).style.display).toBe('none')

      await wrapper.setProps({ modelValue: true })
      await nextTick()
      panel = getPanel(wrapper.element as HTMLElement)
      expect((panel as HTMLElement).style.display).not.toBe('none')
    })

    it('emits update:modelValue on item click (auto-close)', async () => {
      const wrapper = createWrapper({ modelValue: true })
      await nextTick()
      const firstLink = (wrapper.element as HTMLElement).querySelector(
        '.dads-mega-menu__panel a.dads-menu-list__item',
      ) as HTMLAnchorElement
      firstLink.click()
      await nextTick()
      const modelEvents = wrapper.emitted('update:modelValue')
      expect(modelEvents?.some((args) => args[0] === false)).toBe(true)
    })

    it('emits click:item with the clicked item payload', async () => {
      const wrapper = createWrapper({ modelValue: true })
      await nextTick()
      const firstLink = (wrapper.element as HTMLElement).querySelector(
        '.dads-mega-menu__panel a.dads-menu-list__item',
      ) as HTMLAnchorElement
      firstLink.click()
      await nextTick()
      const events = wrapper.emitted('click:item')
      expect(events).toBeTruthy()
      const payload = events?.[0]
      expect((payload?.[0] as { label: string }).label).toBe('概要')
      expect(payload?.[1]).toBeInstanceOf(MouseEvent)
    })
  })

  describe('a11y (vitest-axe)', () => {
    const createMegaMenu = (props: Partial<DadsMegaMenuProps> = {}) =>
      mount(DadsMegaMenu, {
        props: {
          triggerLabel: 'サービス',
          columns: sampleColumns,
          ...props,
        } as DadsMegaMenuProps,
        attachTo: document.body,
      })

    it('has no violations when closed', async () => {
      const wrapper = createMegaMenu({ modelValue: false })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations when open', async () => {
      const wrapper = createMegaMenu({ modelValue: true })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations with custom aria-label', async () => {
      const wrapper = createMegaMenu({ modelValue: true, ariaLabel: 'サイト全体メニュー' })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations with single-column layout', async () => {
      const wrapper = createMegaMenu({
        modelValue: true,
        columns: [{ heading: 'メニュー', items: [{ label: 'ホーム', href: '/' }] }],
      })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })
  })
})
