import { afterEach, describe, expect, it } from 'vitest'
import { enableAutoUnmount, mount } from '@vue/test-utils'
import { axe } from 'vitest-axe'
import { nextTick } from 'vue'
import DadsAccordion from '../DadsAccordion.vue'
import type { DadsAccordionProps } from '../DadsAccordion.types'

enableAutoUnmount(afterEach)

const createWrapper = (
  props: Partial<DadsAccordionProps> = {},
  slots: Record<string, string> = {},
) =>
  mount(DadsAccordion, {
    props: { title: 'ダミーテキストとは何ですか？', ...props } as DadsAccordionProps,
    slots,
    attachTo: document.body,
  })

describe('DadsAccordion', () => {
  describe('rendering', () => {
    it('renders a <details> root with the dads-accordion class', () => {
      const wrapper = createWrapper()
      expect(wrapper.element.tagName).toBe('DETAILS')
      expect(wrapper.classes()).toContain('dads-accordion')
    })

    it('renders a <summary> with the dads-accordion__summary class', () => {
      const wrapper = createWrapper()
      const summary = wrapper.find('summary.dads-accordion__summary')
      expect(summary.exists()).toBe(true)
    })

    it('renders the title inside an <h3> heading by default', () => {
      const wrapper = createWrapper({ title: 'タイトル A' })
      const heading = wrapper.find('summary h3')
      expect(heading.exists()).toBe(true)
      expect(heading.text()).toBe('タイトル A')
    })

    it('renders the title with a custom heading level', () => {
      const wrapper = createWrapper({ title: 'タイトル B', headingLevel: 2 })
      expect(wrapper.find('summary h2').exists()).toBe(true)
      expect(wrapper.find('summary h3').exists()).toBe(false)
      expect(wrapper.find('summary h2').text()).toBe('タイトル B')
    })

    it('renders the official inline chevron SVG with aria-hidden', () => {
      const wrapper = createWrapper()
      const icon = wrapper.find('summary span.dads-accordion__icon svg.dads-accordion__icon-svg')
      expect(icon.exists()).toBe(true)
      expect(icon.attributes('aria-hidden')).toBe('true')
      expect(icon.find('path').attributes('d')).toBe('M3.3 7.3L12 16L20.7 7.3')
    })

    it('renders default slot content inside the content region', () => {
      const wrapper = createWrapper({}, { default: '<p class="body">本文</p>' })
      const content = wrapper.find('.dads-accordion__content')
      expect(content.exists()).toBe(true)
      expect(content.find('p.body').exists()).toBe(true)
      expect(content.text()).toContain('本文')
    })
  })

  describe('open state — controlled (modelValue)', () => {
    it('is closed by default when modelValue is false', () => {
      const wrapper = createWrapper({ modelValue: false })
      expect((wrapper.element as HTMLDetailsElement).open).toBe(false)
    })

    it('is open when modelValue is true', () => {
      const wrapper = createWrapper({ modelValue: true })
      expect((wrapper.element as HTMLDetailsElement).open).toBe(true)
    })

    it('reflects aria-expanded on the summary', async () => {
      const wrapper = createWrapper({ modelValue: false })
      expect(wrapper.find('summary').attributes('aria-expanded')).toBe('false')
      await wrapper.setProps({ modelValue: true })
      expect(wrapper.find('summary').attributes('aria-expanded')).toBe('true')
    })

    it('emits update:modelValue and toggle when summary is clicked', async () => {
      const wrapper = createWrapper({ modelValue: false })
      await wrapper.find('summary').trigger('click')
      expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toBe(true)
      expect(wrapper.emitted('toggle')?.[0]?.[0]).toBe(true)
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
    })

    it('toggles internal state on summary click', async () => {
      const wrapper = createWrapper({ defaultOpen: false })
      await wrapper.find('summary').trigger('click')
      expect((wrapper.element as HTMLDetailsElement).open).toBe(true)
      await wrapper.find('summary').trigger('click')
      expect((wrapper.element as HTMLDetailsElement).open).toBe(false)
    })

    it('emits both update:modelValue and toggle with the new value', async () => {
      const wrapper = createWrapper({ defaultOpen: false })
      await wrapper.find('summary').trigger('click')
      expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toBe(true)
      expect(wrapper.emitted('toggle')?.[0]?.[0]).toBe(true)
      await wrapper.find('summary').trigger('click')
      expect(wrapper.emitted('toggle')?.[1]?.[0]).toBe(false)
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
    })

    it('ignores unrelated keys', async () => {
      const wrapper = createWrapper({ defaultOpen: false })
      await wrapper.find('summary').trigger('keydown', { key: 'a' })
      expect((wrapper.element as HTMLDetailsElement).open).toBe(false)
      expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    })
  })

  describe('disabled', () => {
    it('sets aria-disabled on the root and summary', () => {
      const wrapper = createWrapper({ disabled: true })
      expect(wrapper.attributes('aria-disabled')).toBe('true')
      expect(wrapper.find('summary').attributes('aria-disabled')).toBe('true')
    })

    it('removes summary from tab order with tabindex=-1', () => {
      const wrapper = createWrapper({ disabled: true })
      expect(wrapper.find('summary').attributes('tabindex')).toBe('-1')
    })

    it('does not emit when clicking a disabled summary', async () => {
      const wrapper = createWrapper({ disabled: true, defaultOpen: false })
      await wrapper.find('summary').trigger('click')
      expect(wrapper.emitted('update:modelValue')).toBeUndefined()
      expect((wrapper.element as HTMLDetailsElement).open).toBe(false)
    })

    it('does not toggle on Enter when disabled', async () => {
      const wrapper = createWrapper({ disabled: true, defaultOpen: false })
      await wrapper.find('summary').trigger('keydown', { key: 'Enter' })
      expect((wrapper.element as HTMLDetailsElement).open).toBe(false)
      expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    })
  })

  describe('back-link', () => {
    it('does not render the back-link by default', () => {
      const wrapper = createWrapper()
      expect(wrapper.find('.dads-accordion__back-link').exists()).toBe(false)
    })

    it('renders the official back-link anchor with href to the summary id', () => {
      const wrapper = createWrapper({ backLink: true, title: 'よくある質問' })
      const link = wrapper.find('a.dads-accordion__back-link')
      const summaryId = wrapper.find('summary').attributes('id')
      expect(link.exists()).toBe(true)
      expect(link.attributes('href')).toBe(`#${summaryId}`)
      expect(link.text()).toContain('「よくある質問」の先頭に戻る')
      expect(link.find('svg.dads-accordion__back-link-icon').attributes('aria-hidden')).toBe('true')
    })

    it('overrides the back-link label with backLinkLabel', () => {
      const wrapper = createWrapper({ backLink: true, backLinkLabel: 'トップへ戻る' })
      const link = wrapper.find('a.dads-accordion__back-link')
      expect(link.text()).toContain('トップへ戻る')
      expect(link.text()).not.toContain('の先頭に戻る')
    })
  })

  describe('ids', () => {
    it('produces unique summary ids per instance', () => {
      const wrapper = mount({
        components: { DadsAccordion },
        template: `
          <div>
            <DadsAccordion title="A" />
            <DadsAccordion title="B" />
          </div>
        `,
        attachTo: document.body,
      })
      const ids = wrapper.findAll('summary').map((s) => s.attributes('id'))
      expect(new Set(ids).size).toBe(ids.length)
      expect(ids.every((id) => Boolean(id))).toBe(true)
    })
  })

  describe('a11y (vitest-axe)', () => {
    const mountInBody = (
      props: Partial<DadsAccordionProps> = {},
      slots: Record<string, string> = { default: '<p>本文が入ります。</p>' },
    ) =>
      mount(DadsAccordion, {
        props: { title: 'よくある質問', ...props } as DadsAccordionProps,
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

    it('has no violations when disabled', async () => {
      const wrapper = mountInBody({ disabled: true })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations with the back-link rendered', async () => {
      const wrapper = mountInBody({ defaultOpen: true, backLink: true })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })
  })
})
