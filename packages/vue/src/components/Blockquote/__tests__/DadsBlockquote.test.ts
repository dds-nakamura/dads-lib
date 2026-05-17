import { afterEach, describe, expect, it } from 'vitest'
import { enableAutoUnmount, mount } from '@vue/test-utils'
import { axe } from 'vitest-axe'
import DadsBlockquote from '../DadsBlockquote.vue'
import type { DadsBlockquoteProps } from '../DadsBlockquote.types'

enableAutoUnmount(afterEach)

const createWrapper = (
  props: Partial<DadsBlockquoteProps> = {},
  slots: Record<string, string> = {},
) =>
  mount(DadsBlockquote, {
    props: props as DadsBlockquoteProps,
    slots,
  })

describe('DadsBlockquote', () => {
  describe('rendering', () => {
    it('renders a <blockquote> element', () => {
      const wrapper = createWrapper({ quote: 'Hello' })
      expect(wrapper.find('blockquote').exists()).toBe(true)
    })

    it('applies the dads-blockquote class to the <blockquote>', () => {
      const wrapper = createWrapper({ quote: 'Hello' })
      const bq = wrapper.find('blockquote')
      expect(bq.classes()).toContain('dads-blockquote')
    })

    it('mirrors the HTML reference DOM (blockquote > p)', () => {
      const wrapper = createWrapper({ quote: 'Reference text' })
      const p = wrapper.find('blockquote > p')
      expect(p.exists()).toBe(true)
      expect(p.text()).toBe('Reference text')
    })
  })

  describe('quote prop', () => {
    it('renders the quote prop inside a <p>', () => {
      const wrapper = createWrapper({ quote: 'これは引用文の例です。' })
      expect(wrapper.find('blockquote p').text()).toBe('これは引用文の例です。')
    })

    it('renders an empty <blockquote> when neither quote nor slot is provided', () => {
      const wrapper = createWrapper()
      const bq = wrapper.find('blockquote')
      expect(bq.exists()).toBe(true)
      expect(bq.text()).toBe('')
    })
  })

  describe('default slot', () => {
    it('renders default slot content inside the <blockquote>', () => {
      const wrapper = createWrapper({}, { default: '<p class="slot-content">Slot quote</p>' })
      expect(wrapper.find('blockquote .slot-content').exists()).toBe(true)
      expect(wrapper.find('blockquote .slot-content').text()).toBe('Slot quote')
    })

    it('default slot overrides the quote prop when both are provided', () => {
      const wrapper = createWrapper({ quote: 'From prop' }, { default: '<p>From slot</p>' })
      expect(wrapper.find('blockquote').text()).toBe('From slot')
      expect(wrapper.find('blockquote').text()).not.toContain('From prop')
    })

    it('supports multi-paragraph slot content (matches multiple-paragraphs.html)', () => {
      const wrapper = createWrapper({}, { default: '<p>段落1</p><p>段落2</p><p>段落3</p>' })
      const paragraphs = wrapper.findAll('blockquote > p')
      expect(paragraphs.length).toBe(3)
    })
  })

  describe('cite attribution', () => {
    it('does not render a <cite> element when cite prop is omitted', () => {
      const wrapper = createWrapper({ quote: 'Hello' })
      expect(wrapper.find('cite').exists()).toBe(false)
    })

    it('renders a <cite> element when cite prop is given', () => {
      const wrapper = createWrapper({ quote: 'Hello', cite: '出典: デジタル庁' })
      const cite = wrapper.find('cite')
      expect(cite.exists()).toBe(true)
      expect(cite.text()).toBe('出典: デジタル庁')
    })

    it('applies the dads-blockquote__cite class to the <cite>', () => {
      const wrapper = createWrapper({ quote: 'Hello', cite: 'Source' })
      expect(wrapper.find('cite').classes()).toContain('dads-blockquote__cite')
    })

    it('renders cite without an <a> when citeUrl is not provided', () => {
      const wrapper = createWrapper({ quote: 'Hello', cite: 'Plain source' })
      expect(wrapper.find('cite a').exists()).toBe(false)
      expect(wrapper.find('cite').text()).toBe('Plain source')
    })
  })

  describe('citeUrl link', () => {
    it('wraps the cite label in an <a> when citeUrl is provided', () => {
      const wrapper = createWrapper({
        quote: 'Hello',
        cite: 'デジタル庁',
        citeUrl: 'https://design.digital.go.jp/',
      })
      const link = wrapper.find('cite a')
      expect(link.exists()).toBe(true)
      expect(link.text()).toBe('デジタル庁')
    })

    it('sets the href to the citeUrl value', () => {
      const wrapper = createWrapper({
        quote: 'Hello',
        cite: 'デジタル庁',
        citeUrl: 'https://design.digital.go.jp/',
      })
      expect(wrapper.find('cite a').attributes('href')).toBe('https://design.digital.go.jp/')
    })

    it('applies the dads-blockquote__cite-link class to the link', () => {
      const wrapper = createWrapper({
        quote: 'Hello',
        cite: 'デジタル庁',
        citeUrl: 'https://design.digital.go.jp/',
      })
      expect(wrapper.find('cite a').classes()).toContain('dads-blockquote__cite-link')
    })

    it('does not render a <cite> when only citeUrl is set without cite', () => {
      const wrapper = createWrapper({
        quote: 'Hello',
        citeUrl: 'https://example.com/',
      })
      expect(wrapper.find('cite').exists()).toBe(false)
    })

    it('forwards citeUrl to the native blockquote `cite` attribute', () => {
      // The HTML spec lets `<blockquote>` carry a `cite` attribute pointing
      // to the source — we mirror that for machine readability.
      const wrapper = createWrapper({
        quote: 'Hello',
        cite: 'デジタル庁',
        citeUrl: 'https://design.digital.go.jp/',
      })
      expect(wrapper.find('blockquote').attributes('cite')).toBe('https://design.digital.go.jp/')
    })
  })

  describe('class names match the HTML reference', () => {
    it('uses exactly the dads-blockquote root class (no prefix mismatch)', () => {
      const wrapper = createWrapper({ quote: 'Hello' })
      // Must match the class name from
      //   design-system-example-components-html/src/components/blockquote/blockquote.css
      expect(wrapper.find('.dads-blockquote').exists()).toBe(true)
    })
  })

  describe('a11y (vitest-axe)', () => {
    const mountInBody = (props: Partial<DadsBlockquoteProps> = {}) =>
      mount(DadsBlockquote, { props: props as DadsBlockquoteProps, attachTo: document.body })

    it('has no violations with quote text only', async () => {
      const wrapper = mountInBody({ quote: '引用文の本文です。' })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations with cite (plain text)', async () => {
      const wrapper = mountInBody({ quote: '引用文', cite: '〇〇白書 2024' })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations with citeUrl link', async () => {
      const wrapper = mountInBody({
        quote: '引用文',
        cite: '公式サイト',
        citeUrl: 'https://example.com',
      })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })
  })
})
