import { afterEach, describe, expect, it } from 'vitest'
import { enableAutoUnmount, mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import DadsCard from '../DadsCard.vue'
import type { DadsCardProps } from '../DadsCard.types'

enableAutoUnmount(afterEach)

const createWrapper = (props: Partial<DadsCardProps> = {}, slots: Record<string, string> = {}) =>
  mount(DadsCard, {
    props: props as DadsCardProps,
    slots,
  })

describe('DadsCard', () => {
  describe('rendering', () => {
    it('renders a div by default (non-clickable)', () => {
      const wrapper = createWrapper()
      expect(wrapper.element.tagName).toBe('DIV')
    })

    it('applies the dads-card root class', () => {
      const wrapper = createWrapper()
      expect(wrapper.classes()).toContain('dads-card')
    })

    it('renders the body slot inside __body element', () => {
      const wrapper = createWrapper({}, { default: '<p class="content">Body content</p>' })
      const body = wrapper.find('.dads-card__body')
      expect(body.exists()).toBe(true)
      expect(body.find('.content').text()).toBe('Body content')
    })

    it('always renders the body element even when no default slot is provided', () => {
      const wrapper = createWrapper()
      expect(wrapper.find('.dads-card__body').exists()).toBe(true)
    })
  })

  describe('variants', () => {
    it('applies the outlined modifier by default', () => {
      const wrapper = createWrapper()
      expect(wrapper.classes()).toContain('dads-card--outlined')
    })

    it('applies the filled modifier when variant="filled"', () => {
      const wrapper = createWrapper({ variant: 'filled' })
      expect(wrapper.classes()).toContain('dads-card--filled')
      expect(wrapper.classes()).not.toContain('dads-card--outlined')
    })

    it('applies the elevated modifier when variant="elevated"', () => {
      const wrapper = createWrapper({ variant: 'elevated' })
      expect(wrapper.classes()).toContain('dads-card--elevated')
    })

    it('does not apply elevation modifier on outlined variant', () => {
      const wrapper = createWrapper({ variant: 'outlined', elevation: 5 })
      expect(wrapper.classes()).not.toContain('dads-card--elevation-5')
    })

    it('does not apply elevation modifier on filled variant', () => {
      const wrapper = createWrapper({ variant: 'filled', elevation: 5 })
      expect(wrapper.classes()).not.toContain('dads-card--elevation-5')
    })
  })

  describe('elevation', () => {
    it('applies the elevation-1 modifier by default for elevated variant', () => {
      const wrapper = createWrapper({ variant: 'elevated' })
      expect(wrapper.classes()).toContain('dads-card--elevation-1')
    })

    it('applies the elevation-3 modifier when elevation=3', () => {
      const wrapper = createWrapper({ variant: 'elevated', elevation: 3 })
      expect(wrapper.classes()).toContain('dads-card--elevation-3')
    })

    it('applies the elevation-8 modifier when elevation=8', () => {
      const wrapper = createWrapper({ variant: 'elevated', elevation: 8 })
      expect(wrapper.classes()).toContain('dads-card--elevation-8')
    })
  })

  describe('slots', () => {
    it('renders the header slot when provided', () => {
      const wrapper = createWrapper({}, { header: '<h3 class="title">Card title</h3>' })
      const header = wrapper.find('.dads-card__header')
      expect(header.exists()).toBe(true)
      expect(header.find('.title').text()).toBe('Card title')
    })

    it('omits the header element when no header slot is provided', () => {
      const wrapper = createWrapper()
      expect(wrapper.find('.dads-card__header').exists()).toBe(false)
    })

    it('renders the footer slot when provided', () => {
      const wrapper = createWrapper({}, { footer: '<button class="ok">OK</button>' })
      const footer = wrapper.find('.dads-card__footer')
      expect(footer.exists()).toBe(true)
      expect(footer.find('.ok').text()).toBe('OK')
    })

    it('omits the footer element when no footer slot is provided', () => {
      const wrapper = createWrapper()
      expect(wrapper.find('.dads-card__footer').exists()).toBe(false)
    })

    it('renders all three slots together', () => {
      const wrapper = createWrapper(
        {},
        {
          header: '<span class="h">H</span>',
          default: '<span class="b">B</span>',
          footer: '<span class="f">F</span>',
        },
      )
      expect(wrapper.find('.dads-card__header .h').exists()).toBe(true)
      expect(wrapper.find('.dads-card__body .b').exists()).toBe(true)
      expect(wrapper.find('.dads-card__footer .f').exists()).toBe(true)
    })
  })

  describe('clickable mode', () => {
    it('renders a button element when clickable=true', () => {
      const wrapper = createWrapper({ clickable: true })
      expect(wrapper.element.tagName).toBe('BUTTON')
    })

    it('sets type="button" on the clickable root', () => {
      const wrapper = createWrapper({ clickable: true })
      expect(wrapper.attributes('type')).toBe('button')
    })

    it('omits the type attribute when not clickable', () => {
      const wrapper = createWrapper({ clickable: false })
      expect(wrapper.attributes('type')).toBeUndefined()
    })

    it('applies the clickable modifier', () => {
      const wrapper = createWrapper({ clickable: true })
      expect(wrapper.classes()).toContain('dads-card--clickable')
    })

    it('does not apply the clickable modifier when clickable=false', () => {
      const wrapper = createWrapper()
      expect(wrapper.classes()).not.toContain('dads-card--clickable')
    })

    it('applies the ariaLabel when clickable=true', () => {
      const wrapper = createWrapper({ clickable: true, ariaLabel: '詳細を表示' })
      expect(wrapper.attributes('aria-label')).toBe('詳細を表示')
    })

    it('does not apply ariaLabel attribute when clickable=false', () => {
      const wrapper = createWrapper({ ariaLabel: '詳細を表示' })
      expect(wrapper.attributes('aria-label')).toBeUndefined()
    })
  })

  describe('click interactions', () => {
    it('emits click when a clickable card is clicked', async () => {
      const wrapper = createWrapper({ clickable: true })
      await wrapper.trigger('click')
      expect(wrapper.emitted('click')).toBeTruthy()
      expect(wrapper.emitted('click')?.[0]?.[0]).toBeInstanceOf(Event)
    })

    it('does not emit click when a non-clickable card is clicked', async () => {
      const wrapper = createWrapper({ clickable: false })
      await wrapper.trigger('click')
      expect(wrapper.emitted('click')).toBeFalsy()
    })

    it('emits click on Enter keydown when clickable=true', async () => {
      const wrapper = createWrapper({ clickable: true })
      await wrapper.trigger('keydown', { key: 'Enter' })
      await nextTick()
      expect(wrapper.emitted('click')).toBeTruthy()
    })

    it('emits click on Space keydown when clickable=true', async () => {
      const wrapper = createWrapper({ clickable: true })
      await wrapper.trigger('keydown', { key: ' ' })
      await nextTick()
      expect(wrapper.emitted('click')).toBeTruthy()
    })

    it('does not emit click on Enter keydown when clickable=false', async () => {
      const wrapper = createWrapper({ clickable: false })
      await wrapper.trigger('keydown', { key: 'Enter' })
      await nextTick()
      expect(wrapper.emitted('click')).toBeFalsy()
    })

    it('does not emit click on unrelated keys (e.g. "a")', async () => {
      const wrapper = createWrapper({ clickable: true })
      await wrapper.trigger('keydown', { key: 'a' })
      await nextTick()
      expect(wrapper.emitted('click')).toBeFalsy()
    })

    it('passes the original keyboard event in the emitted payload', async () => {
      const wrapper = createWrapper({ clickable: true })
      await wrapper.trigger('keydown', { key: 'Enter' })
      const payload = wrapper.emitted('click')?.[0]?.[0]
      expect(payload).toBeInstanceOf(KeyboardEvent)
    })
  })
})
