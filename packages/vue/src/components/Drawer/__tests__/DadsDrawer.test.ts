import { afterEach, beforeAll, describe, expect, it } from 'vitest'
import { enableAutoUnmount, mount } from '@vue/test-utils'
import { axe } from 'vitest-axe'
import { nextTick } from 'vue'
import DadsDrawer from '../DadsDrawer.vue'
import DadsHamburgerMenuButton from '../../HamburgerMenuButton/DadsHamburgerMenuButton.vue'
import type { DadsDrawerProps } from '../DadsDrawer.types'

enableAutoUnmount(afterEach)

// happy-dom は HTMLDialogElement.showModal/close と open 属性のリフレクションを
// 実装していないため、prototype に最小ポリフィルを当ててコンポーネント挙動を
// 観測可能にする。showModal は open=true、close は open=false + close イベント。
beforeAll(() => {
  const proto = HTMLDialogElement.prototype as unknown as {
    showModal?: () => void
    close?: () => void
  }
  if (typeof proto.showModal !== 'function') {
    proto.showModal = function showModal(this: HTMLDialogElement) {
      this.setAttribute('open', '')
    }
  }
  if (typeof proto.close !== 'function') {
    proto.close = function close(this: HTMLDialogElement) {
      this.removeAttribute('open')
      this.dispatchEvent(new Event('close'))
    }
  }
})

const createWrapper = (props: Partial<DadsDrawerProps> = {}) =>
  mount(DadsDrawer, {
    props: {
      modelValue: true,
      ...props,
    } as DadsDrawerProps,
    slots: {
      default: '<a href="/home">ホーム</a><a href="/tasks">タスク</a>',
    },
    attachTo: document.body,
  })

const queryDrawer = () => document.body.querySelector('dialog.dads-drawer') as HTMLDialogElement | null

describe('DadsDrawer', () => {
  describe('rendering', () => {
    it('renders a <dialog class="dads-drawer">', () => {
      createWrapper()
      const dialog = queryDrawer()
      expect(dialog).not.toBeNull()
      expect(dialog?.tagName).toBe('DIALOG')
    })

    it('opens (sets the open attribute) when modelValue is true', async () => {
      createWrapper({ modelValue: true })
      await nextTick()
      expect(queryDrawer()?.hasAttribute('open')).toBe(true)
    })

    it('does not set the open attribute when modelValue is false', async () => {
      createWrapper({ modelValue: false })
      await nextTick()
      expect(queryDrawer()?.hasAttribute('open')).toBe(false)
    })

    it('reacts to modelValue changes (false -> true opens)', async () => {
      const wrapper = createWrapper({ modelValue: false })
      expect(queryDrawer()?.hasAttribute('open')).toBe(false)
      await wrapper.setProps({ modelValue: true })
      await nextTick()
      expect(queryDrawer()?.hasAttribute('open')).toBe(true)
    })

    it('renders the default slot content inside .dads-drawer__body', () => {
      createWrapper()
      const body = document.body.querySelector('.dads-drawer__body')
      expect(body).not.toBeNull()
      expect(body?.querySelectorAll('a').length).toBe(2)
    })
  })

  describe('placement', () => {
    it('applies data-placement="left" by default', () => {
      createWrapper()
      expect(queryDrawer()?.getAttribute('data-placement')).toBe('left')
    })

    it('applies data-placement="right" when placement="right"', () => {
      createWrapper({ placement: 'right' })
      expect(queryDrawer()?.getAttribute('data-placement')).toBe('right')
    })
  })

  describe('accessible name', () => {
    it('renders a visually-hidden <h2> wired via aria-labelledby', () => {
      createWrapper({ title: 'メインメニュー' })
      const dialog = queryDrawer()
      const labelledby = dialog?.getAttribute('aria-labelledby')
      expect(labelledby).toBeTruthy()
      const heading = document.getElementById(labelledby as string)
      expect(heading?.tagName).toBe('H2')
      expect(heading?.classList.contains('dads-u-visually-hidden')).toBe(true)
      expect(heading?.textContent).toBe('メインメニュー')
    })

    it('falls back to the default accessible name "メニュー"', () => {
      createWrapper()
      const dialog = queryDrawer()
      const heading = document.getElementById(dialog?.getAttribute('aria-labelledby') as string)
      expect(heading?.textContent).toBe('メニュー')
    })
  })

  describe('close button', () => {
    it('renders a DadsHamburgerMenuButton in close (X) state', () => {
      const wrapper = createWrapper()
      const btn = wrapper.findComponent(DadsHamburgerMenuButton)
      expect(btn.exists()).toBe(true)
      // open state -> shows the close label
      expect(btn.text()).toContain('閉じる')
    })

    it('uses a custom closeLabel', () => {
      const wrapper = createWrapper({ closeLabel: 'Close menu' })
      const btn = wrapper.findComponent(DadsHamburgerMenuButton)
      expect(btn.text()).toContain('Close menu')
    })

    it('emits update:modelValue=false when the close button is clicked', async () => {
      const wrapper = createWrapper()
      const button = document.body.querySelector(
        '.dads-drawer__header button',
      ) as HTMLButtonElement
      button.click()
      await nextTick()
      expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toBe(false)
    })

    it('points aria-controls at the dialog id', () => {
      createWrapper()
      const dialog = queryDrawer()
      const button = document.body.querySelector('.dads-drawer__header button')
      expect(button?.getAttribute('aria-controls')).toBe(dialog?.id)
    })
  })

  describe('native close behavior', () => {
    it('emits update:modelValue=false on the dialog native close event', async () => {
      const wrapper = createWrapper({ modelValue: true })
      const dialog = queryDrawer() as HTMLDialogElement
      dialog.dispatchEvent(new Event('close'))
      await nextTick()
      expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toBe(false)
    })

    it('does not emit on close when already closed (no loop)', async () => {
      const wrapper = createWrapper({ modelValue: false })
      const dialog = queryDrawer() as HTMLDialogElement
      dialog.dispatchEvent(new Event('close'))
      await nextTick()
      expect(wrapper.emitted('update:modelValue')).toBeFalsy()
    })
  })

  describe('backdrop click', () => {
    it('emits update:modelValue=false when the click target is the dialog itself', async () => {
      const wrapper = createWrapper()
      const dialog = queryDrawer() as HTMLDialogElement
      dialog.dispatchEvent(new MouseEvent('click', { bubbles: true }))
      await nextTick()
      expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toBe(false)
    })

    it('does not emit when a child element is clicked', async () => {
      const wrapper = createWrapper()
      const body = document.body.querySelector('.dads-drawer__body') as HTMLElement
      body.dispatchEvent(new MouseEvent('click', { bubbles: true }))
      await nextTick()
      expect(wrapper.emitted('update:modelValue')).toBeFalsy()
    })
  })

  describe('a11y (vitest-axe)', () => {
    it('has no violations (left placement)', async () => {
      createWrapper({ title: 'メニュー' })
      const dialog = queryDrawer()
      expect(dialog).not.toBeNull()
      expect(await axe(dialog as Element)).toHaveNoViolations()
    })

    it('has no violations (right placement)', async () => {
      createWrapper({ title: 'フィルタ', placement: 'right' })
      const dialog = queryDrawer()
      expect(dialog).not.toBeNull()
      expect(await axe(dialog as Element)).toHaveNoViolations()
    })

    it('has no violations with a custom title', async () => {
      createWrapper({ title: 'メインメニュー' })
      const dialog = queryDrawer()
      expect(dialog).not.toBeNull()
      expect(await axe(dialog as Element)).toHaveNoViolations()
    })
  })
})
