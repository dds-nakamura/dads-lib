import { afterEach, describe, expect, it } from 'vitest'
import { enableAutoUnmount, mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { axe } from 'vitest-axe'
import DadsModal from '../DadsModal.vue'
import type { DadsModalProps } from '../DadsModal.types'

enableAutoUnmount(afterEach)

const createWrapper = (props: Partial<DadsModalProps> = {}, slots: Record<string, string> = {}) =>
  mount(DadsModal, {
    props: {
      modelValue: true,
      ...props,
    } as DadsModalProps,
    slots,
    attachTo: document.body,
  })

const queryModal = () => document.body.querySelector('.dads-modal')
const queryPanel = () => document.body.querySelector('.dads-modal__panel') as HTMLElement | null
const queryOverlay = () => document.body.querySelector('.dads-modal__overlay') as HTMLElement | null
const queryCloseBtn = () =>
  document.body.querySelector('.dads-modal__close') as HTMLButtonElement | null

describe('DadsModal', () => {
  describe('rendering', () => {
    it('does not render the modal when modelValue is false', () => {
      createWrapper({ modelValue: false })
      expect(queryModal()).toBeNull()
    })

    it('renders the modal when modelValue is true', () => {
      createWrapper({ modelValue: true })
      expect(queryModal()).not.toBeNull()
    })

    it('teleports the modal into the document.body subtree', () => {
      createWrapper()
      expect(document.body.contains(queryModal())).toBe(true)
    })

    it('renders the overlay element', () => {
      createWrapper()
      expect(queryOverlay()).not.toBeNull()
    })

    it('renders the panel element', () => {
      createWrapper()
      expect(queryPanel()).not.toBeNull()
    })

    it('renders the body element wrapping the default slot', () => {
      createWrapper({}, { default: '<p class="content">Hello</p>' })
      const body = document.body.querySelector('.dads-modal__body')
      expect(body).not.toBeNull()
      expect(body?.querySelector('.content')?.textContent).toBe('Hello')
    })
  })

  describe('size variants', () => {
    it('applies the md modifier by default', () => {
      createWrapper()
      expect(queryModal()?.classList.contains('dads-modal--md')).toBe(true)
    })

    it('applies the sm modifier when size="sm"', () => {
      createWrapper({ size: 'sm' })
      expect(queryModal()?.classList.contains('dads-modal--sm')).toBe(true)
    })

    it('applies the lg modifier when size="lg"', () => {
      createWrapper({ size: 'lg' })
      expect(queryModal()?.classList.contains('dads-modal--lg')).toBe(true)
    })

    it('applies the fullscreen modifier when size="fullscreen"', () => {
      createWrapper({ size: 'fullscreen' })
      expect(queryModal()?.classList.contains('dads-modal--fullscreen')).toBe(true)
    })
  })

  describe('a11y attributes', () => {
    it('sets role="dialog"', () => {
      createWrapper()
      expect(queryModal()?.getAttribute('role')).toBe('dialog')
    })

    it('sets aria-modal="true"', () => {
      createWrapper()
      expect(queryModal()?.getAttribute('aria-modal')).toBe('true')
    })

    it('omits aria-labelledby when no title is provided', () => {
      createWrapper()
      expect(queryModal()?.hasAttribute('aria-labelledby')).toBe(false)
    })

    it('sets aria-labelledby pointing to the title id when title is provided', () => {
      createWrapper({ title: 'メインダイアログ' })
      const labelledBy = queryModal()?.getAttribute('aria-labelledby')
      expect(labelledBy).toBeTruthy()
      const title = document.body.querySelector('.dads-modal__title')
      expect(title?.id).toBe(labelledBy)
    })

    it('sets the close button aria-label to "閉じる" by default', () => {
      createWrapper()
      expect(queryCloseBtn()?.getAttribute('aria-label')).toBe('閉じる')
    })

    it('overrides the close button aria-label via closeLabel prop', () => {
      createWrapper({ closeLabel: 'Close dialog' })
      expect(queryCloseBtn()?.getAttribute('aria-label')).toBe('Close dialog')
    })
  })

  describe('title and slots', () => {
    it('renders the title heading when provided', () => {
      createWrapper({ title: '確認' })
      const title = document.body.querySelector('.dads-modal__title')
      expect(title?.textContent).toBe('確認')
    })

    it('omits the title heading when prop is undefined and no header slot', () => {
      createWrapper()
      expect(document.body.querySelector('.dads-modal__title')).toBeNull()
    })

    it('renders the header slot in place of the default title', () => {
      createWrapper({}, { header: '<div class="custom-header">Custom</div>' })
      const customHeader = document.body.querySelector('.custom-header')
      expect(customHeader?.textContent).toBe('Custom')
    })

    it('renders the footer slot when provided', () => {
      createWrapper({}, { footer: '<button class="ok">OK</button>' })
      const footer = document.body.querySelector('.dads-modal__footer')
      expect(footer).not.toBeNull()
      expect(footer?.querySelector('.ok')?.textContent).toBe('OK')
    })

    it('omits the footer element when no footer slot is provided', () => {
      createWrapper()
      expect(document.body.querySelector('.dads-modal__footer')).toBeNull()
    })
  })

  describe('close button', () => {
    it('renders the close button by default', () => {
      createWrapper()
      expect(queryCloseBtn()).not.toBeNull()
    })

    it('hides the close button when closable=false', () => {
      createWrapper({ closable: false })
      expect(queryCloseBtn()).toBeNull()
    })

    it('omits the entire header when closable=false and no title or header slot', () => {
      createWrapper({ closable: false })
      expect(document.body.querySelector('.dads-modal__header')).toBeNull()
    })
  })

  describe('close interactions', () => {
    it('emits update:modelValue=false when close button is clicked', async () => {
      const wrapper = createWrapper()
      queryCloseBtn()?.click()
      await nextTick()
      const events = wrapper.emitted('update:modelValue')
      expect(events?.[0]?.[0]).toBe(false)
    })

    it('emits close event when close button is clicked', async () => {
      const wrapper = createWrapper()
      queryCloseBtn()?.click()
      await nextTick()
      expect(wrapper.emitted('close')).toBeTruthy()
    })

    it('emits update:modelValue=false when overlay is clicked', async () => {
      const wrapper = createWrapper()
      queryOverlay()?.click()
      await nextTick()
      const events = wrapper.emitted('update:modelValue')
      expect(events?.[0]?.[0]).toBe(false)
    })

    it('emits update:modelValue=false on Esc keydown', async () => {
      const wrapper = createWrapper()
      const modal = queryModal() as HTMLElement
      modal.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
      await nextTick()
      const events = wrapper.emitted('update:modelValue')
      expect(events?.[0]?.[0]).toBe(false)
    })
  })

  describe('persistent mode', () => {
    it('does not emit update:modelValue when overlay is clicked while persistent', async () => {
      const wrapper = createWrapper({ persistent: true })
      queryOverlay()?.click()
      await nextTick()
      expect(wrapper.emitted('update:modelValue')).toBeFalsy()
    })

    it('does not emit update:modelValue on Esc while persistent', async () => {
      const wrapper = createWrapper({ persistent: true })
      const modal = queryModal() as HTMLElement
      modal.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
      await nextTick()
      expect(wrapper.emitted('update:modelValue')).toBeFalsy()
    })

    it('still emits update:modelValue=false from the close button while persistent', async () => {
      const wrapper = createWrapper({ persistent: true })
      queryCloseBtn()?.click()
      await nextTick()
      const events = wrapper.emitted('update:modelValue')
      expect(events?.[0]?.[0]).toBe(false)
    })
  })

  describe('focus management', () => {
    it('focuses the panel when the modal opens', async () => {
      const wrapper = mount(DadsModal, {
        props: { modelValue: false } as DadsModalProps,
        attachTo: document.body,
      })
      await wrapper.setProps({ modelValue: true })
      await nextTick()
      await nextTick()
      expect(document.activeElement).toBe(queryPanel())
    })

    it('emits open event when the modal opens', async () => {
      const wrapper = mount(DadsModal, {
        props: { modelValue: false } as DadsModalProps,
        attachTo: document.body,
      })
      await wrapper.setProps({ modelValue: true })
      await nextTick()
      await nextTick()
      expect(wrapper.emitted('open')).toBeTruthy()
    })

    it('restores focus to the previously active element on close', async () => {
      const trigger = document.createElement('button')
      trigger.textContent = 'open'
      document.body.appendChild(trigger)
      trigger.focus()
      expect(document.activeElement).toBe(trigger)

      const wrapper = mount(DadsModal, {
        props: { modelValue: false } as DadsModalProps,
        attachTo: document.body,
      })
      await wrapper.setProps({ modelValue: true })
      await nextTick()
      await nextTick()
      await wrapper.setProps({ modelValue: false })
      await nextTick()
      expect(document.activeElement).toBe(trigger)
      trigger.remove()
    })

    it('traps Tab from the last focusable back to the first', async () => {
      const wrapper = mount(DadsModal, {
        props: { modelValue: false } as DadsModalProps,
        slots: {
          default: '<button class="a">A</button><button class="b">B</button>',
        },
        attachTo: document.body,
      })
      await wrapper.setProps({ modelValue: true })
      await nextTick()
      await nextTick()

      const focusables = Array.from(
        document.body.querySelectorAll<HTMLElement>('.dads-modal__panel button:not([disabled])'),
      )
      expect(focusables.length).toBeGreaterThan(1)
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      last.focus()
      expect(document.activeElement).toBe(last)

      const modal = queryModal() as HTMLElement
      modal.dispatchEvent(
        new KeyboardEvent('keydown', {
          key: 'Tab',
          bubbles: true,
          cancelable: true,
        }),
      )
      await nextTick()
      expect(document.activeElement).toBe(first)
    })

    it('traps Shift+Tab from the panel back to the last focusable', async () => {
      const wrapper = mount(DadsModal, {
        props: { modelValue: false } as DadsModalProps,
        slots: {
          default: '<button class="a">A</button><button class="b">B</button>',
        },
        attachTo: document.body,
      })
      await wrapper.setProps({ modelValue: true })
      await nextTick()
      await nextTick()

      const focusables = Array.from(
        document.body.querySelectorAll<HTMLElement>('.dads-modal__panel button:not([disabled])'),
      )
      const last = focusables[focusables.length - 1]
      // Panel itself has focus right after open.
      const modal = queryModal() as HTMLElement
      modal.dispatchEvent(
        new KeyboardEvent('keydown', {
          key: 'Tab',
          shiftKey: true,
          bubbles: true,
          cancelable: true,
        }),
      )
      await nextTick()
      expect(document.activeElement).toBe(last)
    })

    it('keeps focus on the panel when no focusable children exist and Tab is pressed', async () => {
      const wrapper = mount(DadsModal, {
        props: {
          modelValue: false,
          closable: false,
        } as DadsModalProps,
        slots: { default: '<p>plain text</p>' },
        attachTo: document.body,
      })
      await wrapper.setProps({ modelValue: true })
      await nextTick()
      await nextTick()

      const modal = queryModal() as HTMLElement
      const panel = queryPanel()
      modal.dispatchEvent(
        new KeyboardEvent('keydown', {
          key: 'Tab',
          bubbles: true,
          cancelable: true,
        }),
      )
      await nextTick()
      expect(document.activeElement).toBe(panel)
    })

    it('ignores non-Tab keydowns in the trap handler', async () => {
      createWrapper(
        {},
        {
          default: '<button class="a">A</button><button class="b">B</button>',
        },
      )

      const focusables = Array.from(
        document.body.querySelectorAll<HTMLElement>('.dads-modal__panel button:not([disabled])'),
      )
      const last = focusables[focusables.length - 1]
      last.focus()

      const modal = queryModal() as HTMLElement
      modal.dispatchEvent(
        new KeyboardEvent('keydown', {
          key: 'a',
          bubbles: true,
          cancelable: true,
        }),
      )
      await nextTick()
      // Focus should not jump anywhere on a non-Tab key.
      expect(document.activeElement).toBe(last)
    })
  })

  describe('panel attributes', () => {
    it('sets tabindex="-1" on the panel so it can receive programmatic focus', () => {
      createWrapper()
      expect(queryPanel()?.getAttribute('tabindex')).toBe('-1')
    })

    it('sets aria-hidden="true" on the overlay so it is not announced', () => {
      createWrapper()
      expect(queryOverlay()?.getAttribute('aria-hidden')).toBe('true')
    })
  })

  // ----------------------------------------------------------------------
  // a11y — axe-core via vitest-axe. The modal Teleports into document.body
  // so we run axe against the teleported root (.dads-modal) rather than the
  // wrapper element (a Teleport placeholder).
  //
  // Modal-specific a11y contract verified here:
  //   - role="dialog" + aria-modal="true" + aria-labelledby (when title)
  //   - close button has aria-label
  //   - overlay is aria-hidden so it isn't announced
  //   - persistent / size variants don't introduce regressions
  // ----------------------------------------------------------------------
  describe('a11y (vitest-axe)', () => {
    it('has no violations with a title (aria-labelledby wired)', async () => {
      createWrapper({ title: '確認' }, { default: '<p>本当に削除しますか?</p>' })
      const modal = queryModal()
      expect(modal).not.toBeNull()
      expect(await axe(modal as Element)).toHaveNoViolations()
    })

    it('has no violations with a header slot — when caller supplies aria-label', async () => {
      // DadsModal's API contract: if `title` is omitted, the dialog has no
      // accessible name (aria-labelledby is conditional on `title`). For
      // headless usage where the caller renders their own header, the modal
      // root needs an externally-set aria-label. This test verifies axe is
      // satisfied in that fallback path.
      createWrapper(
        {},
        {
          header: '<h2>パスワード変更</h2>',
          default: '<p>新しいパスワードを入力してください</p>',
        },
      )
      const modal = queryModal()
      ;(modal as Element).setAttribute('aria-label', 'パスワード変更')
      expect(await axe(modal as Element)).toHaveNoViolations()
    })

    it('has no violations in persistent mode', async () => {
      createWrapper(
        { title: '保存中', persistent: true, closable: false },
        { default: '<p>処理中のためお待ちください</p>' },
      )
      const modal = queryModal()
      expect(await axe(modal as Element)).toHaveNoViolations()
    })

    it('has no violations with a footer slot', async () => {
      createWrapper(
        { title: '確認' },
        {
          default: '<p>続行しますか?</p>',
          footer: '<button type="button">キャンセル</button><button type="button">続行</button>',
        },
      )
      const modal = queryModal()
      expect(await axe(modal as Element)).toHaveNoViolations()
    })

    it('has no violations across size presets', async () => {
      for (const size of ['sm', 'md', 'lg', 'fullscreen'] as const) {
        const wrapper = createWrapper({ title: `Size ${size}`, size }, { default: '<p>x</p>' })
        const modal = queryModal()
        expect(await axe(modal as Element)).toHaveNoViolations()
        wrapper.unmount()
        await nextTick()
      }
    })
  })
})
