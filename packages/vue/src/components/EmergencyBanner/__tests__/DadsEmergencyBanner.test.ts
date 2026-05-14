import { afterEach, describe, expect, it } from 'vitest'
import { enableAutoUnmount, mount } from '@vue/test-utils'
import { h, nextTick } from 'vue'
import DadsEmergencyBanner from '../DadsEmergencyBanner.vue'
import type { DadsEmergencyBannerProps } from '../DadsEmergencyBanner.types'

enableAutoUnmount(afterEach)

const createWrapper = (
  props: Partial<DadsEmergencyBannerProps> = {},
  slots: Record<string, unknown> = {},
) =>
  mount(DadsEmergencyBanner, {
    props: {
      message: '○○地区に避難準備情報が発令されました',
      ...props,
    } as DadsEmergencyBannerProps,
    slots,
  })

const findRoot = (wrapper: ReturnType<typeof createWrapper>) =>
  wrapper.find('.dads-emergency-banner')

describe('DadsEmergencyBanner', () => {
  describe('rendering', () => {
    it('renders by default (modelValue defaults to true)', () => {
      const wrapper = createWrapper()
      expect(findRoot(wrapper).exists()).toBe(true)
    })

    it('renders when modelValue is explicitly true', () => {
      const wrapper = createWrapper({ modelValue: true })
      expect(findRoot(wrapper).exists()).toBe(true)
    })

    it('does not render when modelValue is false', () => {
      const wrapper = createWrapper({ modelValue: false })
      expect(findRoot(wrapper).exists()).toBe(false)
    })

    it('hides after modelValue transitions to false', async () => {
      const wrapper = createWrapper({ modelValue: true })
      expect(findRoot(wrapper).exists()).toBe(true)
      await wrapper.setProps({ modelValue: false })
      await nextTick()
      expect(findRoot(wrapper).exists()).toBe(false)
    })
  })

  describe('content', () => {
    it('renders the required message text', () => {
      const wrapper = createWrapper({ message: '緊急のお知らせ本文' })
      const message = wrapper.find('.dads-emergency-banner__message')
      expect(message.exists()).toBe(true)
      expect(message.text()).toBe('緊急のお知らせ本文')
    })

    it('renders the title in the heading when provided', () => {
      const wrapper = createWrapper({ title: '【緊急】避難情報' })
      const heading = wrapper.find('.dads-emergency-banner__heading')
      expect(heading.exists()).toBe(true)
      expect(heading.text()).toContain('【緊急】避難情報')
    })

    it('omits the header when no title and no title slot is provided', () => {
      const wrapper = createWrapper()
      expect(wrapper.find('.dads-emergency-banner__header').exists()).toBe(false)
    })

    it('lets the default slot override the message prop', () => {
      const wrapper = createWrapper(
        { message: 'fallback' },
        { default: () => h('strong', 'スロットの本文') },
      )
      const message = wrapper.find('.dads-emergency-banner__message')
      expect(message.text()).toBe('スロットの本文')
      expect(message.text()).not.toContain('fallback')
    })
  })

  describe('link / action button', () => {
    it('renders the action link when linkLabel and linkHref are provided', () => {
      const wrapper = createWrapper({
        linkLabel: '指定避難所を確認する',
        linkHref: '/shelter',
      })
      const link = wrapper.find('a.dads-emergency-banner__button')
      expect(link.exists()).toBe(true)
      expect(link.text()).toBe('指定避難所を確認する')
      expect(link.attributes('href')).toBe('/shelter')
    })

    it('omits the action when only linkLabel is provided', () => {
      const wrapper = createWrapper({ linkLabel: 'クリック' })
      expect(wrapper.find('.dads-emergency-banner__action').exists()).toBe(false)
    })

    it('omits the action when only linkHref is provided', () => {
      const wrapper = createWrapper({ linkHref: '/shelter' })
      expect(wrapper.find('.dads-emergency-banner__action').exists()).toBe(false)
    })
  })

  describe('closable behaviour', () => {
    it('hides the close button by default (spec: not user-dismissable)', () => {
      const wrapper = createWrapper()
      expect(wrapper.find('.dads-emergency-banner__close').exists()).toBe(false)
    })

    it('shows the close button when closable is true', () => {
      const wrapper = createWrapper({ closable: true })
      expect(wrapper.find('.dads-emergency-banner__close').exists()).toBe(true)
    })

    it('emits update:modelValue=false when close button clicked', async () => {
      const wrapper = createWrapper({ closable: true })
      const btn = wrapper.find('.dads-emergency-banner__close')
      await btn.trigger('click')
      const events = wrapper.emitted('update:modelValue')
      expect(events?.[0]?.[0]).toBe(false)
    })

    it('emits "close" event when close button clicked', async () => {
      const wrapper = createWrapper({ closable: true })
      const btn = wrapper.find('.dads-emergency-banner__close')
      await btn.trigger('click')
      expect(wrapper.emitted('close')).toBeTruthy()
    })

    it('uses the default "閉じる" aria-label', () => {
      const wrapper = createWrapper({ closable: true })
      const btn = wrapper.find('.dads-emergency-banner__close')
      expect(btn.attributes('aria-label')).toBe('閉じる')
    })

    it('overrides aria-label via closeLabel prop', () => {
      const wrapper = createWrapper({ closable: true, closeLabel: 'Dismiss' })
      const btn = wrapper.find('.dads-emergency-banner__close')
      expect(btn.attributes('aria-label')).toBe('Dismiss')
    })
  })

  describe('accessibility', () => {
    it('sets role="alert" on the banner root', () => {
      const wrapper = createWrapper()
      expect(findRoot(wrapper).attributes('role')).toBe('alert')
    })

    it('sets aria-live="assertive" on the banner root', () => {
      const wrapper = createWrapper()
      expect(findRoot(wrapper).attributes('aria-live')).toBe('assertive')
    })

    it('uses the default aria-label "緊急情報"', () => {
      const wrapper = createWrapper()
      expect(findRoot(wrapper).attributes('aria-label')).toBe('緊急情報')
    })

    it('overrides aria-label via ariaLabel prop', () => {
      const wrapper = createWrapper({ ariaLabel: 'Emergency notice' })
      expect(findRoot(wrapper).attributes('aria-label')).toBe('Emergency notice')
    })
  })

  describe('icon', () => {
    it('renders the default mdi-alert icon', () => {
      const wrapper = createWrapper({ title: 'タイトル' })
      const icon = wrapper.find('.dads-emergency-banner__icon')
      expect(icon.exists()).toBe(true)
      expect(icon.classes()).toContain('mdi-alert')
    })

    it('renders a custom iconName when provided', () => {
      const wrapper = createWrapper({ title: 'タイトル', iconName: 'mdi-fire' })
      const icon = wrapper.find('.dads-emergency-banner__icon')
      expect(icon.classes()).toContain('mdi-fire')
      expect(icon.classes()).not.toContain('mdi-alert')
    })

    it('omits the icon when iconName is an empty string', () => {
      const wrapper = createWrapper({ title: 'タイトル', iconName: '' })
      expect(wrapper.find('.dads-emergency-banner__icon').exists()).toBe(false)
    })

    it('marks the icon as aria-hidden', () => {
      const wrapper = createWrapper({ title: 'タイトル' })
      const icon = wrapper.find('.dads-emergency-banner__icon')
      expect(icon.attributes('aria-hidden')).toBe('true')
    })
  })
})
