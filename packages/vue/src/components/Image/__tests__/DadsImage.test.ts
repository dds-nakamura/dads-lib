import { afterEach, describe, expect, it } from 'vitest'
import { enableAutoUnmount, mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import DadsImage from '../DadsImage.vue'
import type { DadsImageProps } from '../DadsImage.types'

enableAutoUnmount(afterEach)

const SRC = 'https://example.com/photo.jpg'
const PLACEHOLDER = 'https://example.com/placeholder.jpg'

const createWrapper = (props: Partial<DadsImageProps> = {}) =>
  mount(DadsImage, {
    props: { src: SRC, alt: 'sample', ...props } as DadsImageProps,
  })

describe('DadsImage', () => {
  describe('rendering', () => {
    it('renders an <img> by default (no caption)', () => {
      const wrapper = createWrapper()
      expect(wrapper.element.tagName).toBe('IMG')
    })

    it('renders a <figure> wrapper when caption is provided', () => {
      const wrapper = createWrapper({ caption: 'A photo' })
      expect(wrapper.element.tagName).toBe('FIGURE')
      expect(wrapper.find('img').exists()).toBe(true)
    })

    it('applies the dads-image root class on the img', () => {
      const wrapper = createWrapper()
      expect(wrapper.classes()).toContain('dads-image')
    })

    it('applies the dads-image root class on the figure', () => {
      const wrapper = createWrapper({ caption: 'A photo' })
      expect(wrapper.classes()).toContain('dads-image')
    })
  })

  describe('src attribute', () => {
    it('passes the src prop to the img element', () => {
      const wrapper = createWrapper({ src: SRC })
      expect(wrapper.find('img').attributes('src')).toBe(SRC)
    })

    it('updates the rendered src when the prop changes', async () => {
      const wrapper = createWrapper()
      const next = 'https://example.com/other.jpg'
      await wrapper.setProps({ src: next })
      expect(wrapper.find('img').attributes('src')).toBe(next)
    })
  })

  describe('alt attribute', () => {
    it('passes a non-empty alt through to the img', () => {
      const wrapper = createWrapper({ alt: 'A descriptive label' })
      expect(wrapper.find('img').attributes('alt')).toBe('A descriptive label')
    })

    it('renders alt="" verbatim for decorative images', () => {
      const wrapper = createWrapper({ alt: '' })
      expect(wrapper.find('img').attributes('alt')).toBe('')
    })
  })

  describe('width / height', () => {
    it('forwards numeric width and height', () => {
      const wrapper = createWrapper({ width: 600, height: 400 })
      const img = wrapper.find('img')
      expect(img.attributes('width')).toBe('600')
      expect(img.attributes('height')).toBe('400')
    })

    it('forwards string width and height', () => {
      const wrapper = createWrapper({ width: '50%', height: 'auto' })
      const img = wrapper.find('img')
      expect(img.attributes('width')).toBe('50%')
      expect(img.attributes('height')).toBe('auto')
    })

    it('omits width/height attributes when not provided', () => {
      const wrapper = createWrapper()
      const img = wrapper.find('img')
      expect(img.attributes('width')).toBeUndefined()
      expect(img.attributes('height')).toBeUndefined()
    })
  })

  describe('loading attribute', () => {
    it('defaults loading to "lazy"', () => {
      const wrapper = createWrapper()
      expect(wrapper.find('img').attributes('loading')).toBe('lazy')
    })

    it('honors loading="eager" when explicitly set', () => {
      const wrapper = createWrapper({ loading: 'eager' })
      expect(wrapper.find('img').attributes('loading')).toBe('eager')
    })
  })

  describe('placeholder fallback', () => {
    it('swaps src to placeholder on @error when placeholder is provided', async () => {
      const wrapper = createWrapper({ placeholder: PLACEHOLDER })
      await wrapper.find('img').trigger('error')
      await nextTick()
      expect(wrapper.find('img').attributes('src')).toBe(PLACEHOLDER)
    })

    it('keeps the original src on error when no placeholder is provided', async () => {
      const wrapper = createWrapper()
      await wrapper.find('img').trigger('error')
      await nextTick()
      expect(wrapper.find('img').attributes('src')).toBe(SRC)
    })

    it('does not loop swapping when the placeholder itself errors', async () => {
      const wrapper = createWrapper({ placeholder: PLACEHOLDER })
      await wrapper.find('img').trigger('error')
      await nextTick()
      // Second error should keep us on the placeholder, not blank or original
      await wrapper.find('img').trigger('error')
      await nextTick()
      expect(wrapper.find('img').attributes('src')).toBe(PLACEHOLDER)
    })

    it('emits an "error" event when the image fails to load', async () => {
      const wrapper = createWrapper({ placeholder: PLACEHOLDER })
      await wrapper.find('img').trigger('error')
      expect(wrapper.emitted('error')).toBeTruthy()
    })

    it('emits a "load" event when the image loads', async () => {
      const wrapper = createWrapper()
      await wrapper.find('img').trigger('load')
      expect(wrapper.emitted('load')).toBeTruthy()
    })
  })

  describe('caption', () => {
    it('renders a <figcaption> when caption is provided', () => {
      const wrapper = createWrapper({ caption: 'Tokyo skyline' })
      const cap = wrapper.find('figcaption')
      expect(cap.exists()).toBe(true)
      expect(cap.text()).toBe('Tokyo skyline')
    })

    it('omits the <figcaption> element when caption is missing', () => {
      const wrapper = createWrapper()
      expect(wrapper.find('figcaption').exists()).toBe(false)
    })

    it('uses the dads-image__caption class on the caption', () => {
      const wrapper = createWrapper({ caption: 'Hello' })
      expect(wrapper.find('.dads-image__caption').exists()).toBe(true)
    })
  })

  describe('objectFit modifier', () => {
    it('applies the cover fit modifier by default', () => {
      const wrapper = createWrapper()
      expect(wrapper.classes()).toContain('dads-image--fit-cover')
    })

    it('applies the contain fit modifier', () => {
      const wrapper = createWrapper({ objectFit: 'contain' })
      expect(wrapper.classes()).toContain('dads-image--fit-contain')
    })

    it('applies the fill fit modifier', () => {
      const wrapper = createWrapper({ objectFit: 'fill' })
      expect(wrapper.classes()).toContain('dads-image--fit-fill')
    })

    it('applies the none fit modifier', () => {
      const wrapper = createWrapper({ objectFit: 'none' })
      expect(wrapper.classes()).toContain('dads-image--fit-none')
    })

    it('applies the fit modifier on the figure root when caption is set', () => {
      const wrapper = createWrapper({ caption: 'cap', objectFit: 'contain' })
      expect(wrapper.classes()).toContain('dads-image--fit-contain')
    })
  })
})
