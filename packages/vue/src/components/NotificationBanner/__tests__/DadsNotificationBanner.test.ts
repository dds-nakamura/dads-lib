import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { enableAutoUnmount, mount } from '@vue/test-utils'
import { axe } from 'vitest-axe'
import { h, nextTick } from 'vue'
import DadsNotificationBanner from '../DadsNotificationBanner.vue'
import type {
  DadsNotificationBannerColor,
  DadsNotificationBannerProps,
} from '../DadsNotificationBanner.types'

enableAutoUnmount(afterEach)

const createWrapper = (
  props: Partial<DadsNotificationBannerProps> = {},
  slots: Record<string, unknown> = {},
) =>
  mount(DadsNotificationBanner, {
    props: {
      message: 'デフォルトメッセージ',
      ...props,
    } as DadsNotificationBannerProps,
    slots,
  })

const findRoot = (wrapper: ReturnType<typeof createWrapper>) =>
  wrapper.find('.dads-notification-banner')

describe('DadsNotificationBanner', () => {
  describe('rendering', () => {
    it('renders the banner by default (modelValue defaults to true)', () => {
      const wrapper = createWrapper()
      expect(findRoot(wrapper).exists()).toBe(true)
    })

    it('renders the banner when modelValue is true', () => {
      const wrapper = createWrapper({ modelValue: true })
      expect(findRoot(wrapper).exists()).toBe(true)
    })

    it('does not render the banner when modelValue is false', () => {
      const wrapper = createWrapper({ modelValue: false })
      expect(findRoot(wrapper).exists()).toBe(false)
    })
  })

  describe('color variants', () => {
    const colors: DadsNotificationBannerColor[] = ['success', 'error', 'warning', 'info', 'neutral']

    for (const color of colors) {
      it(`applies the modifier class dads-notification-banner--${color}`, () => {
        const wrapper = createWrapper({ color })
        const root = findRoot(wrapper)
        expect(root.classes()).toContain(`dads-notification-banner--${color}`)
      })
    }

    it('defaults the color to "info" when no prop is passed', () => {
      const wrapper = createWrapper()
      expect(findRoot(wrapper).classes()).toContain('dads-notification-banner--info')
    })
  })

  describe('content', () => {
    it('renders the title when prop is provided', () => {
      const wrapper = createWrapper({ title: '保存しました' })
      const title = wrapper.find('.dads-notification-banner__title')
      expect(title.exists()).toBe(true)
      expect(title.text()).toBe('保存しました')
    })

    it('renders the message prop in the message paragraph', () => {
      const wrapper = createWrapper({ message: '保存に成功しました' })
      const message = wrapper.find('.dads-notification-banner__message')
      expect(message.exists()).toBe(true)
      expect(message.text()).toBe('保存に成功しました')
    })

    it('lets the default slot override the message prop', () => {
      const wrapper = createWrapper(
        { message: 'fallback' },
        { default: () => h('strong', 'スロット内容') },
      )
      const message = wrapper.find('.dads-notification-banner__message')
      expect(message.text()).toBe('スロット内容')
      expect(message.text()).not.toContain('fallback')
    })
  })

  describe('close interactions', () => {
    it('emits update:modelValue=false when close button is clicked', async () => {
      const wrapper = createWrapper()
      const closeBtn = wrapper.find('.dads-notification-banner__close')
      await closeBtn.trigger('click')
      const events = wrapper.emitted('update:modelValue')
      expect(events?.[0]?.[0]).toBe(false)
    })

    it('emits a "close" event when close button is clicked', async () => {
      const wrapper = createWrapper()
      const closeBtn = wrapper.find('.dads-notification-banner__close')
      await closeBtn.trigger('click')
      expect(wrapper.emitted('close')).toBeTruthy()
    })
  })

  describe('closable prop', () => {
    it('hides the close button when closable is false', () => {
      const wrapper = createWrapper({ closable: false })
      expect(wrapper.find('.dads-notification-banner__close').exists()).toBe(false)
    })

    it('shows the close button by default', () => {
      const wrapper = createWrapper()
      expect(wrapper.find('.dads-notification-banner__close').exists()).toBe(true)
    })
  })

  describe('closeLabel', () => {
    it('uses "閉じる" as the default close button aria-label', () => {
      const wrapper = createWrapper()
      const closeBtn = wrapper.find('.dads-notification-banner__close')
      expect(closeBtn.attributes('aria-label')).toBe('閉じる')
    })

    it('overrides the close button aria-label via closeLabel prop', () => {
      const wrapper = createWrapper({ closeLabel: 'Dismiss' })
      const closeBtn = wrapper.find('.dads-notification-banner__close')
      expect(closeBtn.attributes('aria-label')).toBe('Dismiss')
    })
  })

  describe('a11y role / aria-live', () => {
    it('uses role="alert" + aria-live="assertive" for color="error"', () => {
      const wrapper = createWrapper({ color: 'error' })
      const root = findRoot(wrapper)
      expect(root.attributes('role')).toBe('alert')
      expect(root.attributes('aria-live')).toBe('assertive')
    })

    it('uses role="alert" + aria-live="polite" for color="warning"', () => {
      const wrapper = createWrapper({ color: 'warning' })
      const root = findRoot(wrapper)
      expect(root.attributes('role')).toBe('alert')
      expect(root.attributes('aria-live')).toBe('polite')
    })

    it('uses role="status" + aria-live="polite" for color="success"', () => {
      const wrapper = createWrapper({ color: 'success' })
      const root = findRoot(wrapper)
      expect(root.attributes('role')).toBe('status')
      expect(root.attributes('aria-live')).toBe('polite')
    })

    it('uses role="status" + aria-live="polite" for color="info"', () => {
      const wrapper = createWrapper({ color: 'info' })
      const root = findRoot(wrapper)
      expect(root.attributes('role')).toBe('status')
      expect(root.attributes('aria-live')).toBe('polite')
    })

    it('uses role="status" + aria-live="polite" for color="neutral"', () => {
      const wrapper = createWrapper({ color: 'neutral' })
      const root = findRoot(wrapper)
      expect(root.attributes('role')).toBe('status')
      expect(root.attributes('aria-live')).toBe('polite')
    })
  })

  describe('icon slot / default icon', () => {
    it('renders the icon slot content when provided', () => {
      const wrapper = createWrapper({}, { icon: () => h('span', { class: 'custom-icon' }, 'X') })
      const iconWrap = wrapper.find('.dads-notification-banner__icon')
      expect(iconWrap.find('.custom-icon').exists()).toBe(true)
      expect(iconWrap.find('.mdi-information').exists()).toBe(false)
    })

    const defaultIconCases: Array<[DadsNotificationBannerColor, string]> = [
      ['success', 'mdi-check-circle'],
      ['error', 'mdi-alert-circle'],
      ['warning', 'mdi-alert'],
      ['info', 'mdi-information'],
      ['neutral', 'mdi-bell'],
    ]

    for (const [color, mdiClass] of defaultIconCases) {
      it(`renders the default ${mdiClass} icon for color=${color}`, () => {
        const wrapper = createWrapper({ color })
        const iconWrap = wrapper.find('.dads-notification-banner__icon')
        expect(iconWrap.find(`i.${mdiClass}`).exists()).toBe(true)
      })
    }
  })

  describe('action slot', () => {
    it('renders the action slot inside the action wrapper', () => {
      const wrapper = createWrapper(
        {},
        {
          action: () => h('button', { class: 'custom-action', type: 'button' }, '再試行'),
        },
      )
      const actionWrap = wrapper.find('.dads-notification-banner__action')
      expect(actionWrap.exists()).toBe(true)
      expect(actionWrap.find('button.custom-action').text()).toBe('再試行')
    })

    it('omits the action wrapper when no action slot is provided', () => {
      const wrapper = createWrapper()
      expect(wrapper.find('.dads-notification-banner__action').exists()).toBe(false)
    })
  })

  describe('reactivity', () => {
    it('hides the banner after modelValue switches to false', async () => {
      const wrapper = createWrapper({ modelValue: true })
      expect(findRoot(wrapper).exists()).toBe(true)
      await wrapper.setProps({ modelValue: false })
      await nextTick()
      expect(findRoot(wrapper).exists()).toBe(false)
    })
  })

  // ----------------------------------------------------------------------
  // style — DADS specifies 'standard' (tinted background + colored border)
  // and 'color-chip' (white background + left color accent bar).
  // ----------------------------------------------------------------------
  describe('style variant', () => {
    it('applies the standard style modifier by default', () => {
      const wrapper = createWrapper()
      expect(findRoot(wrapper).classes()).toContain('dads-notification-banner--style-standard')
    })

    it('applies the color-chip style modifier when style="color-chip"', () => {
      const wrapper = createWrapper({ style: 'color-chip' })
      expect(findRoot(wrapper).classes()).toContain('dads-notification-banner--style-color-chip')
      expect(findRoot(wrapper).classes()).not.toContain('dads-notification-banner--style-standard')
    })

    it('keeps the color modifier independent of the style modifier', () => {
      const wrapper = createWrapper({ color: 'success', style: 'color-chip' })
      const classes = findRoot(wrapper).classes()
      expect(classes).toContain('dads-notification-banner--success')
      expect(classes).toContain('dads-notification-banner--style-color-chip')
    })
  })

  // ----------------------------------------------------------------------
  // timestamp — rendered inside <time datetime>. Accepts string or Date.
  // ----------------------------------------------------------------------
  describe('timestamp', () => {
    it('does not render a timestamp element when prop is omitted', () => {
      const wrapper = createWrapper()
      expect(wrapper.find('.dads-notification-banner__timestamp').exists()).toBe(false)
    })

    it('renders a string timestamp as both visible text and datetime attribute', () => {
      const wrapper = createWrapper({ timestamp: '2026-05-17T10:30:00+09:00' })
      const time = wrapper.find('.dads-notification-banner__timestamp time')
      expect(time.exists()).toBe(true)
      expect(time.attributes('datetime')).toBe('2026-05-17T10:30:00+09:00')
      expect(time.text()).toBe('2026-05-17T10:30:00+09:00')
    })

    it('renders a Date timestamp with ISO datetime and locale-formatted text', () => {
      const d = new Date('2026-05-17T01:30:00Z')
      const wrapper = createWrapper({ timestamp: d })
      const time = wrapper.find('.dads-notification-banner__timestamp time')
      expect(time.attributes('datetime')).toBe(d.toISOString())
      expect(time.text()).toBe(d.toLocaleString())
    })
  })

  // ----------------------------------------------------------------------
  // persistKey — opt-in localStorage persistence of the closed state.
  // ----------------------------------------------------------------------
  describe('persistKey', () => {
    beforeEach(() => {
      window.localStorage.clear()
    })

    it('does not touch localStorage when persistKey is omitted', () => {
      const setSpy = vi.spyOn(Storage.prototype, 'setItem')
      const wrapper = createWrapper({ modelValue: true })
      // Manually close.
      wrapper.find('.dads-notification-banner__close').trigger('click')
      expect(setSpy).not.toHaveBeenCalled()
      setSpy.mockRestore()
    })

    it('writes "closed" to localStorage when closed with persistKey set', async () => {
      const wrapper = createWrapper({ modelValue: true, persistKey: 'notice-2026-05-17' })
      await wrapper.find('.dads-notification-banner__close').trigger('click')
      expect(window.localStorage.getItem('notice-2026-05-17')).toBe('closed')
    })

    it('emits update:modelValue=false on mount when persistKey is already closed', async () => {
      window.localStorage.setItem('notice-existing', 'closed')
      const wrapper = createWrapper({ modelValue: true, persistKey: 'notice-existing' })
      await nextTick()
      const events = wrapper.emitted('update:modelValue')
      expect(events?.[0]?.[0]).toBe(false)
    })

    it('does not emit on mount when persistKey is set but not yet closed', async () => {
      const wrapper = createWrapper({ modelValue: true, persistKey: 'notice-fresh' })
      await nextTick()
      expect(wrapper.emitted('update:modelValue')).toBeFalsy()
    })
  })

  describe('a11y (vitest-axe)', () => {
    it('has no violations with default info color', async () => {
      const wrapper = createWrapper({ message: 'システムメッセージ' })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it.each(['success', 'error', 'warning', 'info', 'neutral'] as const)(
      'has no violations with color=%s',
      async (color) => {
        const wrapper = createWrapper({ color, title: 'お知らせ', message: 'メッセージ本文' })
        expect(await axe(wrapper.element)).toHaveNoViolations()
      },
    )

    it('has no violations when not closable', async () => {
      const wrapper = createWrapper({ closable: false, message: 'お知らせ' })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations with color-chip style', async () => {
      const wrapper = createWrapper({
        style: 'color-chip',
        title: 'お知らせ',
        message: 'メッセージ本文',
      })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations with a timestamp', async () => {
      const wrapper = createWrapper({
        title: 'お知らせ',
        message: 'メッセージ本文',
        timestamp: '2026-05-17T10:00:00+09:00',
      })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })
  })
})
