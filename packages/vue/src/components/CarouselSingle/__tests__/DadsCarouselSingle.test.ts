import { afterEach, describe, expect, it } from 'vitest'
import { enableAutoUnmount, mount } from '@vue/test-utils'
import { axe } from 'vitest-axe'
import DadsCarouselSingle from '../DadsCarouselSingle.vue'
import type { DadsCarouselSingleProps } from '../DadsCarouselSingle.types'

enableAutoUnmount(afterEach)

const baseProps: DadsCarouselSingleProps = {
  src: 'image-9.webp',
  alt: '写真：デジタル公園の大木',
}

const createWrapper = (props: Partial<DadsCarouselSingleProps> = {}) =>
  mount(DadsCarouselSingle, {
    props: { ...baseProps, ...props },
    attachTo: document.body,
  })

describe('DadsCarouselSingle', () => {
  describe('rendering', () => {
    it('renders the root .dads-carousel-single element', () => {
      const wrapper = createWrapper()
      expect(wrapper.find('.dads-carousel-single').exists()).toBe(true)
    })

    it('renders the image with .dads-carousel-single__image, src and alt', () => {
      const wrapper = createWrapper()
      const img = wrapper.find('.dads-carousel-single__image')
      expect(img.exists()).toBe(true)
      expect(img.attributes('src')).toBe('image-9.webp')
      expect(img.attributes('alt')).toBe('写真：デジタル公園の大木')
    })
  })

  describe('wrapper element (span vs a)', () => {
    it('uses <span class="...__link"> when no href is provided', () => {
      const wrapper = createWrapper()
      const link = wrapper.find('.dads-carousel-single__link')
      expect(link.exists()).toBe(true)
      expect(link.element.tagName).toBe('SPAN')
      expect(link.attributes('href')).toBeUndefined()
    })

    it('uses <a class="...__link" href> when href is provided', () => {
      const wrapper = createWrapper({ href: 'https://example.com' })
      const link = wrapper.find('.dads-carousel-single__link')
      expect(link.element.tagName).toBe('A')
      expect(link.attributes('href')).toBe('https://example.com')
    })

    it('passes through target and rel on the anchor', () => {
      const wrapper = createWrapper({
        href: 'https://example.com',
        target: '_blank',
        rel: 'noopener noreferrer',
      })
      const link = wrapper.find('.dads-carousel-single__link')
      expect(link.attributes('target')).toBe('_blank')
      expect(link.attributes('rel')).toBe('noopener noreferrer')
    })

    it('does not emit target/rel on the span when there is no href', () => {
      const wrapper = createWrapper({ target: '_blank', rel: 'noopener' })
      const link = wrapper.find('.dads-carousel-single__link')
      expect(link.element.tagName).toBe('SPAN')
      expect(link.attributes('target')).toBeUndefined()
      expect(link.attributes('rel')).toBeUndefined()
    })
  })

  describe('attribute passthrough', () => {
    it('passes through srcset', () => {
      const wrapper = createWrapper({ srcset: 'image-9@2x.webp 2x' })
      expect(wrapper.find('.dads-carousel-single__image').attributes('srcset')).toBe(
        'image-9@2x.webp 2x',
      )
    })

    it('passes through width and height', () => {
      const wrapper = createWrapper({ width: 1024, height: 392 })
      const img = wrapper.find('.dads-carousel-single__image')
      expect(img.attributes('width')).toBe('1024')
      expect(img.attributes('height')).toBe('392')
    })
  })

  describe('a11y (vitest-axe)', () => {
    it('has no violations without a link', async () => {
      const wrapper = createWrapper({ width: 1024, height: 392 })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations with a link', async () => {
      const wrapper = createWrapper({
        href: 'https://example.com',
        width: 1024,
        height: 392,
      })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })
  })
})
