import { afterEach, describe, expect, it } from 'vitest'
import { enableAutoUnmount, mount } from '@vue/test-utils'
import { axe } from 'vitest-axe'
import { nextTick } from 'vue'
import DadsDisclosure from '../DadsDisclosure.vue'
import type { DadsDisclosureProps } from '../DadsDisclosure.types'

enableAutoUnmount(afterEach)

const createWrapper = (
  props: Partial<DadsDisclosureProps> = {},
  slots: Record<string, string> = {},
) =>
  mount(DadsDisclosure, {
    props: { title: 'ダミーテキストとは何ですか？', ...props } as DadsDisclosureProps,
    slots,
    attachTo: document.body,
  })

describe('DadsDisclosure', () => {
  describe('rendering', () => {
    it('renders a <details> root with the dads-disclosure class', () => {
      const wrapper = createWrapper()
      expect(wrapper.element.tagName).toBe('DETAILS')
      expect(wrapper.classes()).toContain('dads-disclosure')
    })

    it('renders a <summary> with the title text', () => {
      const wrapper = createWrapper({ title: 'タイトル A' })
      const summary = wrapper.find('summary.dads-disclosure__summary')
      expect(summary.exists()).toBe(true)
      expect(summary.text()).toContain('タイトル A')
    })

    it('renders an icon SVG with aria-hidden inside summary', () => {
      const wrapper = createWrapper()
      const icon = wrapper.find('summary svg.dads-disclosure__icon')
      expect(icon.exists()).toBe(true)
      expect(icon.attributes('aria-hidden')).toBe('true')
    })

    it('renders default slot content inside the content region', () => {
      const wrapper = createWrapper({}, { default: '<p class="body">本文</p>' })
      const content = wrapper.find('.dads-disclosure__content')
      expect(content.exists()).toBe(true)
      expect(content.find('p.body').exists()).toBe(true)
      expect(content.text()).toContain('本文')
    })

    it('renders content region with role="region"', () => {
      const wrapper = createWrapper()
      const content = wrapper.find('.dads-disclosure__content')
      expect(content.attributes('role')).toBe('region')
    })
  })

  describe('open state — controlled (modelValue)', () => {
    it('is closed by default when modelValue is false', () => {
      const wrapper = createWrapper({ modelValue: false })
      expect((wrapper.element as HTMLDetailsElement).open).toBe(false)
      expect(wrapper.classes()).not.toContain('dads-disclosure--open')
    })

    it('is open when modelValue is true', () => {
      const wrapper = createWrapper({ modelValue: true })
      expect((wrapper.element as HTMLDetailsElement).open).toBe(true)
      expect(wrapper.classes()).toContain('dads-disclosure--open')
    })

    it('reflects aria-expanded on the summary', async () => {
      const wrapper = createWrapper({ modelValue: false })
      expect(wrapper.find('summary').attributes('aria-expanded')).toBe('false')
      await wrapper.setProps({ modelValue: true })
      expect(wrapper.find('summary').attributes('aria-expanded')).toBe('true')
    })

    it('emits update:modelValue when summary is clicked', async () => {
      const wrapper = createWrapper({ modelValue: false })
      await wrapper.find('summary').trigger('click')
      expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toBe(true)
    })

    it('emits false when re-clicking an open summary', async () => {
      const wrapper = createWrapper({ modelValue: true })
      await wrapper.find('summary').trigger('click')
      expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toBe(false)
    })

    it('syncs the native <details> open attribute when modelValue changes', async () => {
      const wrapper = createWrapper({ modelValue: false })
      const el = wrapper.element as HTMLDetailsElement
      expect(el.open).toBe(false)
      await wrapper.setProps({ modelValue: true })
      await nextTick()
      expect(el.open).toBe(true)
    })

    it('does not mutate internal state when controlled', async () => {
      const wrapper = createWrapper({ modelValue: false })
      await wrapper.find('summary').trigger('click')
      // Controlled mode: stays closed until parent updates modelValue.
      expect((wrapper.element as HTMLDetailsElement).open).toBe(false)
    })
  })

  describe('open state — uncontrolled (defaultOpen)', () => {
    it('starts closed when defaultOpen is unset', () => {
      const wrapper = createWrapper()
      expect((wrapper.element as HTMLDetailsElement).open).toBe(false)
    })

    it('starts open when defaultOpen=true', () => {
      const wrapper = createWrapper({ defaultOpen: true })
      expect((wrapper.element as HTMLDetailsElement).open).toBe(true)
      expect(wrapper.classes()).toContain('dads-disclosure--open')
    })

    it('toggles internal state on summary click', async () => {
      const wrapper = createWrapper({ defaultOpen: false })
      await wrapper.find('summary').trigger('click')
      expect((wrapper.element as HTMLDetailsElement).open).toBe(true)
      await wrapper.find('summary').trigger('click')
      expect((wrapper.element as HTMLDetailsElement).open).toBe(false)
    })

    it('still emits update:modelValue when uncontrolled', async () => {
      const wrapper = createWrapper({ defaultOpen: false })
      await wrapper.find('summary').trigger('click')
      expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toBe(true)
    })

    it('emits toggle event with the new open value', async () => {
      const wrapper = createWrapper({ defaultOpen: false })
      await wrapper.find('summary').trigger('click')
      expect(wrapper.emitted('toggle')?.[0]?.[0]).toBe(true)
      await wrapper.find('summary').trigger('click')
      expect(wrapper.emitted('toggle')?.[1]?.[0]).toBe(false)
    })
  })

  describe('disabled', () => {
    it('applies the --disabled class', () => {
      const wrapper = createWrapper({ disabled: true })
      expect(wrapper.classes()).toContain('dads-disclosure--disabled')
    })

    it('sets aria-disabled on the summary', () => {
      const wrapper = createWrapper({ disabled: true })
      expect(wrapper.find('summary').attributes('aria-disabled')).toBe('true')
    })

    it('removes summary from tab order with tabindex=-1', () => {
      const wrapper = createWrapper({ disabled: true })
      expect(wrapper.find('summary').attributes('tabindex')).toBe('-1')
    })

    it('does not emit update:modelValue when clicking a disabled summary', async () => {
      const wrapper = createWrapper({ disabled: true, defaultOpen: false })
      await wrapper.find('summary').trigger('click')
      expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    })

    it('does not toggle on Enter when disabled', async () => {
      const wrapper = createWrapper({ disabled: true, defaultOpen: false })
      await wrapper.find('summary').trigger('keydown', { key: 'Enter' })
      expect((wrapper.element as HTMLDetailsElement).open).toBe(false)
      expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    })
  })

  describe('keyboard activation', () => {
    it('toggles on Enter', async () => {
      const wrapper = createWrapper({ defaultOpen: false })
      await wrapper.find('summary').trigger('keydown', { key: 'Enter' })
      expect((wrapper.element as HTMLDetailsElement).open).toBe(true)
      expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toBe(true)
    })

    it('toggles on Space', async () => {
      const wrapper = createWrapper({ defaultOpen: false })
      await wrapper.find('summary').trigger('keydown', { key: ' ' })
      expect((wrapper.element as HTMLDetailsElement).open).toBe(true)
      expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toBe(true)
    })

    it('ignores unrelated keys', async () => {
      const wrapper = createWrapper({ defaultOpen: false })
      await wrapper.find('summary').trigger('keydown', { key: 'a' })
      await wrapper.find('summary').trigger('keydown', { key: 'Escape' })
      expect((wrapper.element as HTMLDetailsElement).open).toBe(false)
      expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    })
  })

  describe('ARIA wiring', () => {
    it('wires aria-controls on summary to content id', () => {
      const wrapper = createWrapper()
      const summary = wrapper.find('summary')
      const content = wrapper.find('.dads-disclosure__content')
      expect(summary.attributes('aria-controls')).toBe(content.attributes('id'))
    })

    it('wires aria-labelledby on content back to summary id', () => {
      const wrapper = createWrapper()
      const summary = wrapper.find('summary')
      const content = wrapper.find('.dads-disclosure__content')
      expect(content.attributes('aria-labelledby')).toBe(summary.attributes('id'))
    })

    it('produces unique ids per instance', () => {
      const wrapper = mount({
        components: { DadsDisclosure },
        template: `
          <div>
            <DadsDisclosure title="A" />
            <DadsDisclosure title="B" />
          </div>
        `,
        attachTo: document.body,
      })
      const summaries = wrapper.findAll('summary')
      const ids = summaries.map((s) => s.attributes('id'))
      expect(new Set(ids).size).toBe(ids.length)
    })
  })

  describe('a11y (vitest-axe)', () => {
    const mountInBody = (
      props: Partial<DadsDisclosureProps> = {},
      slots: Record<string, string> = { default: '<p>本文が入ります。</p>' },
    ) =>
      mount(DadsDisclosure, {
        props: { title: '詳細を見る', ...props } as DadsDisclosureProps,
        slots,
        attachTo: document.body,
      })

    it('has no violations when collapsed', async () => {
      const wrapper = mountInBody()
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations when initially open', async () => {
      const wrapper = mountInBody({ defaultOpen: true })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations when controlled-open', async () => {
      const wrapper = mountInBody({ modelValue: true })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations when disabled', async () => {
      const wrapper = mountInBody({ disabled: true })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })
  })
})
