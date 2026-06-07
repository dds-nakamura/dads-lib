import { afterEach, describe, expect, it } from 'vitest'
import { enableAutoUnmount, mount } from '@vue/test-utils'
import { axe } from 'vitest-axe'
import DadsImageSlider from '../DadsImageSlider.vue'
import DadsCarousel from '../../Carousel/DadsCarousel.vue'
import type { DadsImageSliderProps, DadsImageSliderSlide } from '../DadsImageSlider.types'

// happy-dom lacks ResizeObserver; DadsImageSlider mounts a real DadsCarousel
// which observes its root on mount, so stub a no-op to avoid throwing.
class ResizeObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}
;(globalThis as unknown as { ResizeObserver: typeof ResizeObserver }).ResizeObserver =
  ResizeObserverStub as unknown as typeof ResizeObserver

enableAutoUnmount(afterEach)

const slides: DadsImageSliderSlide[] = [
  { src: '/carousel/image-1.webp', alt: 'スライド1の画像', href: '#link1', width: 696, height: 392 },
  { src: '/carousel/image-2.webp', alt: 'スライド2の画像', href: '#link2', width: 696, height: 392 },
  { src: '/carousel/image-3.webp', alt: 'スライド3の画像', href: '#link3', width: 696, height: 392 },
]

const createWrapper = (props: Partial<DadsImageSliderProps> = {}) =>
  mount(DadsImageSlider, {
    props: { slides, heading: 'ギャラリー', modelValue: 0, ...props } as DadsImageSliderProps,
    attachTo: document.body,
  })

describe('DadsImageSlider', () => {
  describe('thin wrapper over DadsCarousel', () => {
    it('renders a DadsCarousel as its single child', () => {
      const wrapper = createWrapper()
      expect(wrapper.findComponent(DadsCarousel).exists()).toBe(true)
    })

    it('applies the dads-image-slider class to the underlying carousel root', () => {
      const wrapper = createWrapper()
      const root = wrapper.find('.dads-carousel')
      expect(root.exists()).toBe(true)
      expect(root.classes()).toContain('dads-image-slider')
    })

    it('forwards slides to the carousel (one image per slide in the main + disclosure)', () => {
      const wrapper = createWrapper()
      // Main image (current slide) renders inside the image container.
      const mainImg = wrapper.find('.dads-carousel__main .dads-carousel__image-container img')
      expect(mainImg.exists()).toBe(true)
      expect(mainImg.attributes('alt')).toBe('スライド1の画像')
    })

    it('renders as a container-type region wired to the required heading', () => {
      const wrapper = createWrapper({ heading: 'ギャラリー' })
      const root = wrapper.find('.dads-carousel')
      expect(root.attributes('role')).toBe('region')
      const headingId = root.attributes('aria-labelledby')
      expect(headingId).toBeTruthy()
      const heading = wrapper.find('.dads-carousel__heading')
      expect(heading.text()).toBe('ギャラリー')
      expect(heading.attributes('id')).toBe(headingId)
    })

    it('honors headingLevel', () => {
      const wrapper = createWrapper({ heading: 'ギャラリー', headingLevel: 3 })
      expect(wrapper.find('h3.dads-carousel__heading').exists()).toBe(true)
    })
  })

  describe('v-model passthrough', () => {
    it('reflects modelValue as the current slide number', () => {
      const wrapper = createWrapper({ modelValue: 1 })
      const current = wrapper.find('.dads-carousel__panel-set .dads-carousel__panel-number')
      expect(current.text()).toBe('2')
    })

    it('re-emits update:modelValue from the carousel', async () => {
      const wrapper = createWrapper({ modelValue: 0 })
      // Click the narrow page-nav "next" button to advance.
      const nextButton = wrapper.findAll('.dads-carousel__page-nav > button').at(-1)!
      await nextButton.trigger('click')
      const events = wrapper.emitted('update:modelValue')
      expect(events?.[0]?.[0]).toBe(1)
    })

    it('re-emits change from the carousel', async () => {
      const wrapper = createWrapper({ modelValue: 0 })
      const nextButton = wrapper.findAll('.dads-carousel__page-nav > button').at(-1)!
      await nextButton.trigger('click')
      expect(wrapper.emitted('change')?.[0]?.[0]).toBe(1)
    })
  })

  describe('i18n label passthrough', () => {
    it('forwards showAllLabel to the disclosure summary', () => {
      const wrapper = createWrapper({ showAllLabel: 'All slides' })
      expect(wrapper.find('.dads-carousel__others .dads-disclosure__summary').text()).toContain(
        'All slides',
      )
    })

    it('forwards stepNavAriaLabel to the tablist', () => {
      const wrapper = createWrapper({ stepNavAriaLabel: 'Choose slide' })
      expect(wrapper.find('[role="tablist"]').attributes('aria-label')).toBe('Choose slide')
    })
  })

  describe('a11y (vitest-axe)', () => {
    it('has no violations with a heading and several slides', async () => {
      const wrapper = createWrapper()
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations with links on every slide', async () => {
      const wrapper = createWrapper({
        slides: [
          { src: '/carousel/image-1.webp', alt: '画像1', href: '#a' },
          { src: '/carousel/image-2.webp', alt: '画像2', href: '#b' },
        ],
      })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })
  })
})
