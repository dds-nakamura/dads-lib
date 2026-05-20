import { afterEach, describe, expect, it, vi } from 'vitest'
import { enableAutoUnmount, mount } from '@vue/test-utils'
import { axe } from 'vitest-axe'
import { nextTick } from 'vue'
import DadsImageSlider from '../DadsImageSlider.vue'
import type { DadsImageSliderProps, DadsImageSliderSlide } from '../DadsImageSlider.types'

enableAutoUnmount(afterEach)

const slides: DadsImageSliderSlide[] = [
  { src: 'https://example.com/1.jpg', alt: 'Slide 1', caption: 'First' },
  { src: 'https://example.com/2.jpg', alt: 'Slide 2', caption: 'Second' },
  { src: 'https://example.com/3.jpg', alt: 'Slide 3' },
]

const createWrapper = (props: Partial<DadsImageSliderProps> = {}) =>
  mount(DadsImageSlider, {
    props: { slides, modelValue: 0, ...props } as DadsImageSliderProps,
    attachTo: document.body,
  })

describe('DadsImageSlider', () => {
  describe('rendering', () => {
    it('renders the root with .dads-image-slider class', () => {
      const wrapper = createWrapper()
      expect(wrapper.classes()).toContain('dads-image-slider')
    })

    it('renders one slide wrapper per item', () => {
      const wrapper = createWrapper()
      expect(wrapper.findAll('[aria-roledescription="slide"]')).toHaveLength(3)
    })

    it('renders an <img> per slide with alt text', () => {
      const wrapper = createWrapper()
      const imgs = wrapper.findAll('img')
      expect(imgs).toHaveLength(3)
      expect(imgs[0].attributes('alt')).toBe('Slide 1')
      expect(imgs[0].attributes('src')).toBe('https://example.com/1.jpg')
    })

    it('renders captions when provided', () => {
      const wrapper = createWrapper()
      const captions = wrapper.findAll('.dads-image-slider__caption')
      // Only the first 2 slides have captions.
      expect(captions).toHaveLength(2)
      expect(captions[0].text()).toBe('First')
    })

    it('marks the active slide with the active class', async () => {
      const wrapper = createWrapper({ modelValue: 1 })
      const wrapperSlides = wrapper.findAll('[aria-roledescription="slide"]')
      expect(wrapperSlides[0].classes()).not.toContain('dads-image-slider__slide--active')
      expect(wrapperSlides[1].classes()).toContain('dads-image-slider__slide--active')
      await wrapper.setProps({ modelValue: 2 })
      const updated = wrapper.findAll('[aria-roledescription="slide"]')
      expect(updated[2].classes()).toContain('dads-image-slider__slide--active')
    })

    it('marks non-active slides with aria-hidden="true"', () => {
      const wrapper = createWrapper({ modelValue: 0 })
      const wrapperSlides = wrapper.findAll('[aria-roledescription="slide"]')
      expect(wrapperSlides[0].attributes('aria-hidden')).toBeUndefined()
      expect(wrapperSlides[1].attributes('aria-hidden')).toBe('true')
      expect(wrapperSlides[2].attributes('aria-hidden')).toBe('true')
    })
  })

  describe('arrow buttons', () => {
    it('renders prev/next buttons by default', () => {
      const wrapper = createWrapper()
      expect(wrapper.find('.dads-image-slider__arrow--prev').exists()).toBe(true)
      expect(wrapper.find('.dads-image-slider__arrow--next').exists()).toBe(true)
    })

    it('hides arrows when showArrows=false', () => {
      const wrapper = createWrapper({ showArrows: false })
      expect(wrapper.find('.dads-image-slider__arrow--prev').exists()).toBe(false)
      expect(wrapper.find('.dads-image-slider__arrow--next').exists()).toBe(false)
    })

    it('emits update:modelValue going to the next slide on next click', async () => {
      const wrapper = createWrapper({ modelValue: 0 })
      await wrapper.find('.dads-image-slider__arrow--next').trigger('click')
      expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toBe(1)
      expect(wrapper.emitted('change')?.[0]?.[0]).toBe(1)
    })

    it('emits update:modelValue going to the previous slide on prev click', async () => {
      const wrapper = createWrapper({ modelValue: 2 })
      await wrapper.find('.dads-image-slider__arrow--prev').trigger('click')
      expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toBe(1)
    })
  })

  describe('loop behaviour', () => {
    it('wraps from last to first on next when loop=true', async () => {
      const wrapper = createWrapper({ modelValue: 2, loop: true })
      await wrapper.find('.dads-image-slider__arrow--next').trigger('click')
      expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toBe(0)
    })

    it('wraps from first to last on prev when loop=true', async () => {
      const wrapper = createWrapper({ modelValue: 0, loop: true })
      await wrapper.find('.dads-image-slider__arrow--prev').trigger('click')
      expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toBe(2)
    })

    it('disables next on the last slide when loop=false', () => {
      const wrapper = createWrapper({ modelValue: 2, loop: false })
      const nextBtn = wrapper.find('.dads-image-slider__arrow--next')
      expect(nextBtn.attributes('disabled')).toBeDefined()
    })

    it('disables prev on the first slide when loop=false', () => {
      const wrapper = createWrapper({ modelValue: 0, loop: false })
      const prevBtn = wrapper.find('.dads-image-slider__arrow--prev')
      expect(prevBtn.attributes('disabled')).toBeDefined()
    })

    it('does not emit when next is clicked on the last slide with loop=false', async () => {
      const wrapper = createWrapper({ modelValue: 2, loop: false })
      await wrapper.find('.dads-image-slider__arrow--next').trigger('click')
      expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    })
  })

  describe('indicators', () => {
    it('renders one indicator per slide by default', () => {
      const wrapper = createWrapper()
      expect(wrapper.findAll('.dads-image-slider__indicator')).toHaveLength(3)
    })

    it('hides indicators when showIndicators=false', () => {
      const wrapper = createWrapper({ showIndicators: false })
      expect(wrapper.find('.dads-image-slider__indicators').exists()).toBe(false)
    })

    it('marks aria-selected on the active indicator', () => {
      const wrapper = createWrapper({ modelValue: 1 })
      const indicators = wrapper.findAll('.dads-image-slider__indicator')
      expect(indicators[0].attributes('aria-selected')).toBe('false')
      expect(indicators[1].attributes('aria-selected')).toBe('true')
    })

    it('jumps to the clicked indicator', async () => {
      const wrapper = createWrapper({ modelValue: 0 })
      const indicators = wrapper.findAll('.dads-image-slider__indicator')
      await indicators[2].trigger('click')
      expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toBe(2)
    })

    it('does not emit when the active indicator is clicked', async () => {
      const wrapper = createWrapper({ modelValue: 1 })
      const indicators = wrapper.findAll('.dads-image-slider__indicator')
      await indicators[1].trigger('click')
      expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    })
  })

  describe('keyboard navigation', () => {
    it('advances to next on ArrowRight', async () => {
      const wrapper = createWrapper({ modelValue: 0 })
      await wrapper.trigger('keydown', { key: 'ArrowRight' })
      expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toBe(1)
    })

    it('goes back on ArrowLeft', async () => {
      const wrapper = createWrapper({ modelValue: 1 })
      await wrapper.trigger('keydown', { key: 'ArrowLeft' })
      expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toBe(0)
    })

    it('ignores unrelated keys', async () => {
      const wrapper = createWrapper({ modelValue: 0 })
      await wrapper.trigger('keydown', { key: 'a' })
      await wrapper.trigger('keydown', { key: 'Enter' })
      expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    })
  })

  describe('autoPlay', () => {
    it('advances slides on the interval when autoPlay=true', async () => {
      vi.useFakeTimers()
      try {
        const wrapper = createWrapper({ autoPlay: true, interval: 1000 })
        expect(wrapper.emitted('update:modelValue')).toBeUndefined()
        vi.advanceTimersByTime(1000)
        await nextTick()
        expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toBe(1)
      } finally {
        vi.useRealTimers()
      }
    })

    it('does not auto-advance when autoPlay=false', async () => {
      vi.useFakeTimers()
      try {
        const wrapper = createWrapper({ autoPlay: false, interval: 1000 })
        vi.advanceTimersByTime(5000)
        await nextTick()
        expect(wrapper.emitted('update:modelValue')).toBeUndefined()
      } finally {
        vi.useRealTimers()
      }
    })

    it('pauses on mouseenter when pauseOnHover=true', async () => {
      vi.useFakeTimers()
      try {
        const wrapper = createWrapper({
          autoPlay: true,
          interval: 1000,
          pauseOnHover: true,
        })
        await wrapper.trigger('mouseenter')
        vi.advanceTimersByTime(2000)
        await nextTick()
        expect(wrapper.emitted('update:modelValue')).toBeUndefined()
      } finally {
        vi.useRealTimers()
      }
    })

    it('restarts on mouseleave when pauseOnHover=true', async () => {
      vi.useFakeTimers()
      try {
        const wrapper = createWrapper({
          autoPlay: true,
          interval: 1000,
          pauseOnHover: true,
        })
        await wrapper.trigger('mouseenter')
        vi.advanceTimersByTime(2000)
        await wrapper.trigger('mouseleave')
        vi.advanceTimersByTime(1000)
        await nextTick()
        expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toBe(1)
      } finally {
        vi.useRealTimers()
      }
    })

    it('does not pause on hover when pauseOnHover=false', async () => {
      vi.useFakeTimers()
      try {
        const wrapper = createWrapper({
          autoPlay: true,
          interval: 1000,
          pauseOnHover: false,
        })
        await wrapper.trigger('mouseenter')
        vi.advanceTimersByTime(1000)
        await nextTick()
        expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toBe(1)
      } finally {
        vi.useRealTimers()
      }
    })

    it('clears the interval on unmount', async () => {
      vi.useFakeTimers()
      try {
        const clearSpy = vi.spyOn(globalThis, 'clearInterval')
        const wrapper = createWrapper({ autoPlay: true, interval: 1000 })
        wrapper.unmount()
        expect(clearSpy).toHaveBeenCalled()
        clearSpy.mockRestore()
      } finally {
        vi.useRealTimers()
      }
    })

    it('stops auto-advance at the last slide when loop=false', async () => {
      vi.useFakeTimers()
      try {
        const wrapper = createWrapper({
          autoPlay: true,
          interval: 1000,
          loop: false,
          modelValue: 2,
        })
        vi.advanceTimersByTime(5000)
        await nextTick()
        expect(wrapper.emitted('update:modelValue')).toBeUndefined()
      } finally {
        vi.useRealTimers()
      }
    })
  })

  describe('aria', () => {
    it('uses the default aria-label when not provided', () => {
      const wrapper = createWrapper()
      expect(wrapper.attributes('aria-label')).toBe('イメージスライダー')
    })

    it('respects a custom aria-label', () => {
      const wrapper = createWrapper({ ariaLabel: 'ギャラリー' })
      expect(wrapper.attributes('aria-label')).toBe('ギャラリー')
    })

    it('marks the root with aria-roledescription="carousel"', () => {
      const wrapper = createWrapper()
      expect(wrapper.attributes('aria-roledescription')).toBe('carousel')
    })

    it('labels the next/prev buttons in Japanese', () => {
      const wrapper = createWrapper()
      expect(wrapper.find('.dads-image-slider__arrow--prev').attributes('aria-label')).toBe(
        '前のスライド',
      )
      expect(wrapper.find('.dads-image-slider__arrow--next').attributes('aria-label')).toBe(
        '次のスライド',
      )
    })
  })

  // ----------------------------------------------------------------------
  // i18n — aria-label プロップの上書き (default: Japanese, override: English)
  // ----------------------------------------------------------------------
  describe('i18n aria-label overrides', () => {
    it('uses default Japanese aria-labels for prev/next arrows and indicators', () => {
      const wrapper = createWrapper()
      expect(wrapper.find('.dads-image-slider__arrow--prev').attributes('aria-label')).toBe(
        '前のスライド',
      )
      expect(wrapper.find('.dads-image-slider__arrow--next').attributes('aria-label')).toBe(
        '次のスライド',
      )
      expect(wrapper.find('.dads-image-slider__indicators').attributes('aria-label')).toBe(
        'スライド位置',
      )
      const inds = wrapper.findAll('.dads-image-slider__indicator')
      expect(inds[0].attributes('aria-label')).toBe('スライド 1')
      expect(inds[2].attributes('aria-label')).toBe('スライド 3')
    })

    it('allows overriding all aria-label props with English strings', () => {
      const wrapper = createWrapper({
        prevSlideAriaLabel: 'Previous slide',
        nextSlideAriaLabel: 'Next slide',
        slidePositionAriaLabel: 'Slide position',
        formatSlideAriaLabel: (i: number) => `Slide ${i + 1}`,
      })
      expect(wrapper.find('.dads-image-slider__arrow--prev').attributes('aria-label')).toBe(
        'Previous slide',
      )
      expect(wrapper.find('.dads-image-slider__arrow--next').attributes('aria-label')).toBe(
        'Next slide',
      )
      expect(wrapper.find('.dads-image-slider__indicators').attributes('aria-label')).toBe(
        'Slide position',
      )
      const inds = wrapper.findAll('.dads-image-slider__indicator')
      expect(inds[0].attributes('aria-label')).toBe('Slide 1')
      expect(inds[1].attributes('aria-label')).toBe('Slide 2')
      expect(inds[2].attributes('aria-label')).toBe('Slide 3')
    })
  })

  describe('heading + showAll', () => {
    it('does not render a header when neither heading nor showAll is set', () => {
      const wrapper = createWrapper()
      expect(wrapper.find('.dads-image-slider__header').exists()).toBe(false)
    })

    it('renders heading text inside an <h2> by default', () => {
      const wrapper = createWrapper({ heading: 'おすすめ画像' })
      expect(wrapper.find('h2.dads-image-slider__heading').text()).toBe('おすすめ画像')
    })

    it.each([1, 2, 3, 4, 5, 6] as const)('renders heading as h%i when level=%i', (level) => {
      const wrapper = createWrapper({ heading: 'T', headingLevel: level })
      expect(wrapper.find(`h${level}.dads-image-slider__heading`).exists()).toBe(true)
    })

    it('renders showAll link only when both label and href are provided', () => {
      const labelOnly = createWrapper({ showAllLabel: 'すべて' })
      expect(labelOnly.find('.dads-image-slider__show-all').exists()).toBe(false)
      const hrefOnly = createWrapper({ showAllHref: '/x' })
      expect(hrefOnly.find('.dads-image-slider__show-all').exists()).toBe(false)
      const both = createWrapper({ showAllLabel: 'すべて', showAllHref: '/x' })
      const link = both.find('a.dads-image-slider__show-all')
      expect(link.attributes('href')).toBe('/x')
      expect(link.text()).toBe('すべて')
    })
  })

  describe('a11y (vitest-axe)', () => {
    it('has no violations in the default configuration', async () => {
      const wrapper = createWrapper({ heading: 'おすすめのギャラリー' })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations with arrows and indicators', async () => {
      const wrapper = createWrapper({
        heading: 'お知らせ',
        showArrows: true,
        showIndicators: true,
      })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations with show-all link', async () => {
      const wrapper = createWrapper({
        heading: 'ピックアップ',
        showAllLabel: '一覧で見る',
        showAllHref: '/gallery',
      })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations with a custom aria-label and no heading', async () => {
      const wrapper = createWrapper({ ariaLabel: '画像ギャラリー' })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })
  })
})
