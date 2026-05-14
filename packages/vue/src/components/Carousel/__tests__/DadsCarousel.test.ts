import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { enableAutoUnmount, mount } from '@vue/test-utils'
import { h } from 'vue'
import DadsCarousel from '../DadsCarousel.vue'
import type { DadsCarouselProps } from '../DadsCarousel.types'

enableAutoUnmount(afterEach)

const createWrapper = (
  props: Partial<DadsCarouselProps> = {},
  slots: Record<string, unknown> = {},
) =>
  mount(DadsCarousel, {
    props: { itemCount: 3, modelValue: 0, ...props } as DadsCarouselProps,
    slots,
    attachTo: document.body,
  })

describe('DadsCarousel', () => {
  describe('rendering', () => {
    it('renders a root element with the dads-carousel class', () => {
      const wrapper = createWrapper()
      expect(wrapper.classes()).toContain('dads-carousel')
    })

    it('renders a section with aria-roledescription="carousel"', () => {
      const wrapper = createWrapper()
      expect(wrapper.find('section').attributes('aria-roledescription')).toBe('carousel')
    })

    it('renders the default aria-label "カルーセル"', () => {
      const wrapper = createWrapper()
      expect(wrapper.find('section').attributes('aria-label')).toBe('カルーセル')
    })

    it('renders a custom aria-label', () => {
      const wrapper = createWrapper({ ariaLabel: 'おすすめ' })
      expect(wrapper.find('section').attributes('aria-label')).toBe('おすすめ')
    })

    it('renders itemCount slide groups', () => {
      const wrapper = createWrapper({ itemCount: 4 })
      expect(wrapper.findAll('[role="group"][aria-roledescription="slide"]')).toHaveLength(4)
    })

    it('marks only the active slide as not aria-hidden', () => {
      const wrapper = createWrapper({ modelValue: 1, itemCount: 3 })
      const slides = wrapper.findAll('[role="group"][aria-roledescription="slide"]')
      expect(slides[0].attributes('aria-hidden')).toBe('true')
      expect(slides[1].attributes('aria-hidden')).toBeUndefined()
      expect(slides[2].attributes('aria-hidden')).toBe('true')
    })
  })

  describe('default slot', () => {
    it('calls the default slot itemCount times with index and isActive', () => {
      const calls: Array<{ index: number; isActive: boolean }> = []
      const wrapper = mount(DadsCarousel, {
        props: { itemCount: 3, modelValue: 1 } as DadsCarouselProps,
        slots: {
          default: (slotProps: { index: number; isActive: boolean }) => {
            calls.push({ ...slotProps })
            return h('span', { class: `slot-${slotProps.index}` }, `Slide ${slotProps.index}`)
          },
        },
        attachTo: document.body,
      })

      expect(calls).toHaveLength(3)
      expect(calls[0]).toEqual({ index: 0, isActive: false })
      expect(calls[1]).toEqual({ index: 1, isActive: true })
      expect(calls[2]).toEqual({ index: 2, isActive: false })
      expect(wrapper.find('.slot-0').text()).toBe('Slide 0')
      expect(wrapper.find('.slot-2').text()).toBe('Slide 2')
    })

    it('updates isActive when modelValue changes', async () => {
      const wrapper = mount(DadsCarousel, {
        props: { itemCount: 3, modelValue: 0 } as DadsCarouselProps,
        slots: {
          default: ({ index, isActive }: { index: number; isActive: boolean }) =>
            h(
              'span',
              { class: `slot-${index}`, 'data-active': String(isActive) },
              String(isActive),
            ),
        },
        attachTo: document.body,
      })

      expect(wrapper.find('.slot-0').attributes('data-active')).toBe('true')
      await wrapper.setProps({ modelValue: 2 })
      expect(wrapper.find('.slot-0').attributes('data-active')).toBe('false')
      expect(wrapper.find('.slot-2').attributes('data-active')).toBe('true')
    })
  })

  describe('arrow navigation', () => {
    it('renders prev and next arrows when total > 1', () => {
      const wrapper = createWrapper()
      expect(wrapper.find('.dads-carousel__arrow--prev').exists()).toBe(true)
      expect(wrapper.find('.dads-carousel__arrow--next').exists()).toBe(true)
    })

    it('hides arrows when itemCount <= 1', () => {
      const wrapper = createWrapper({ itemCount: 1 })
      expect(wrapper.find('.dads-carousel__arrow--prev').exists()).toBe(false)
      expect(wrapper.find('.dads-carousel__arrow--next').exists()).toBe(false)
    })

    it('hides arrows when showArrows is false', () => {
      const wrapper = createWrapper({ showArrows: false })
      expect(wrapper.find('.dads-carousel__arrow--prev').exists()).toBe(false)
      expect(wrapper.find('.dads-carousel__arrow--next').exists()).toBe(false)
    })

    it('emits update:modelValue and change on next click', async () => {
      const wrapper = createWrapper({ modelValue: 0 })
      await wrapper.find('.dads-carousel__arrow--next').trigger('click')
      expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toBe(1)
      expect(wrapper.emitted('change')?.[0]?.[0]).toBe(1)
    })

    it('emits update:modelValue on prev click', async () => {
      const wrapper = createWrapper({ modelValue: 2 })
      await wrapper.find('.dads-carousel__arrow--prev').trigger('click')
      expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toBe(1)
    })
  })

  describe('indicator navigation', () => {
    it('renders one indicator per slide when total > 1', () => {
      const wrapper = createWrapper({ itemCount: 4 })
      expect(wrapper.findAll('.dads-carousel__indicator')).toHaveLength(4)
    })

    it('hides indicators when showIndicators is false', () => {
      const wrapper = createWrapper({ showIndicators: false })
      expect(wrapper.find('.dads-carousel__indicators').exists()).toBe(false)
    })

    it('marks the active indicator with aria-selected=true', () => {
      const wrapper = createWrapper({ modelValue: 2, itemCount: 3 })
      const inds = wrapper.findAll('.dads-carousel__indicator')
      expect(inds[0].attributes('aria-selected')).toBe('false')
      expect(inds[2].attributes('aria-selected')).toBe('true')
    })

    it('jumps to an arbitrary slide when clicking its indicator', async () => {
      const wrapper = createWrapper({ modelValue: 0, itemCount: 3 })
      const inds = wrapper.findAll('.dads-carousel__indicator')
      await inds[2].trigger('click')
      expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toBe(2)
    })

    it('does not emit when clicking the already-active indicator', async () => {
      const wrapper = createWrapper({ modelValue: 1 })
      const inds = wrapper.findAll('.dads-carousel__indicator')
      await inds[1].trigger('click')
      expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    })
  })

  describe('loop behaviour', () => {
    it('wraps forward from the last to the first slide when loop=true', async () => {
      const wrapper = createWrapper({ modelValue: 2, itemCount: 3, loop: true })
      await wrapper.find('.dads-carousel__arrow--next').trigger('click')
      expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toBe(0)
    })

    it('wraps backward from the first to the last slide when loop=true', async () => {
      const wrapper = createWrapper({ modelValue: 0, itemCount: 3, loop: true })
      await wrapper.find('.dads-carousel__arrow--prev').trigger('click')
      expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toBe(2)
    })

    it('disables the prev arrow at index 0 when loop=false', () => {
      const wrapper = createWrapper({ modelValue: 0, loop: false })
      expect(wrapper.find('.dads-carousel__arrow--prev').attributes('disabled')).toBeDefined()
    })

    it('disables the next arrow at the last slide when loop=false', () => {
      const wrapper = createWrapper({ modelValue: 2, itemCount: 3, loop: false })
      expect(wrapper.find('.dads-carousel__arrow--next').attributes('disabled')).toBeDefined()
    })

    it('does not emit past the boundary when loop=false', async () => {
      const wrapper = createWrapper({ modelValue: 0, itemCount: 3, loop: false })
      await wrapper.find('.dads-carousel__arrow--prev').trigger('click')
      expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    })
  })

  describe('keyboard navigation', () => {
    it('moves forward on ArrowRight', async () => {
      const wrapper = createWrapper({ modelValue: 0 })
      await wrapper.find('section').trigger('keydown', { key: 'ArrowRight' })
      expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toBe(1)
    })

    it('moves backward on ArrowLeft', async () => {
      const wrapper = createWrapper({ modelValue: 2 })
      await wrapper.find('section').trigger('keydown', { key: 'ArrowLeft' })
      expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toBe(1)
    })

    it('ignores unrelated keys', async () => {
      const wrapper = createWrapper({ modelValue: 0 })
      await wrapper.find('section').trigger('keydown', { key: 'a' })
      await wrapper.find('section').trigger('keydown', { key: 'Enter' })
      expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    })
  })

  describe('autoPlay', () => {
    beforeEach(() => {
      vi.useFakeTimers()
    })

    afterEach(() => {
      vi.useRealTimers()
    })

    it('advances to the next slide after `interval` ms when autoPlay=true', async () => {
      const wrapper = createWrapper({ modelValue: 0, autoPlay: true, interval: 1000 })
      vi.advanceTimersByTime(1000)
      await wrapper.vm.$nextTick()
      expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toBe(1)
    })

    it('does not auto-advance when autoPlay=false', async () => {
      const wrapper = createWrapper({ modelValue: 0, autoPlay: false, interval: 1000 })
      vi.advanceTimersByTime(5000)
      await wrapper.vm.$nextTick()
      expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    })

    it('stops the timer when itemCount <= 1', async () => {
      const wrapper = createWrapper({ itemCount: 1, autoPlay: true, interval: 1000 })
      vi.advanceTimersByTime(5000)
      await wrapper.vm.$nextTick()
      expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    })

    it('stops autoplay at the last slide when loop=false', async () => {
      const wrapper = createWrapper({
        modelValue: 1,
        itemCount: 2,
        autoPlay: true,
        interval: 1000,
        loop: false,
      })
      vi.advanceTimersByTime(5000)
      await wrapper.vm.$nextTick()
      expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    })
  })

  describe('pauseOnHover', () => {
    beforeEach(() => {
      vi.useFakeTimers()
    })

    afterEach(() => {
      vi.useRealTimers()
    })

    it('pauses the timer on mouseenter when pauseOnHover=true', async () => {
      const wrapper = createWrapper({
        autoPlay: true,
        interval: 1000,
        pauseOnHover: true,
      })
      await wrapper.find('section').trigger('mouseenter')
      vi.advanceTimersByTime(3000)
      await wrapper.vm.$nextTick()
      expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    })

    it('resumes the timer on mouseleave', async () => {
      const wrapper = createWrapper({
        autoPlay: true,
        interval: 1000,
        pauseOnHover: true,
      })
      await wrapper.find('section').trigger('mouseenter')
      vi.advanceTimersByTime(3000)
      await wrapper.find('section').trigger('mouseleave')
      vi.advanceTimersByTime(1000)
      await wrapper.vm.$nextTick()
      expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toBe(1)
    })

    it('does not pause when pauseOnHover=false', async () => {
      const wrapper = createWrapper({
        autoPlay: true,
        interval: 1000,
        pauseOnHover: false,
      })
      await wrapper.find('section').trigger('mouseenter')
      vi.advanceTimersByTime(1000)
      await wrapper.vm.$nextTick()
      expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toBe(1)
    })
  })

  describe('cleanup', () => {
    beforeEach(() => {
      vi.useFakeTimers()
    })

    afterEach(() => {
      vi.useRealTimers()
    })

    it('clears the autoPlay timer on unmount', async () => {
      const wrapper = createWrapper({ autoPlay: true, interval: 1000 })
      wrapper.unmount()
      vi.advanceTimersByTime(5000)
      // No errors and no emits after unmount.
      expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    })
  })

  describe('id wiring', () => {
    it('produces unique slide / indicator ids per instance', () => {
      const wrapper = mount(
        {
          components: { DadsCarousel },
          template: `
            <div>
              <DadsCarousel :item-count="2" />
              <DadsCarousel :item-count="2" />
            </div>
          `,
        },
        { attachTo: document.body },
      )
      const slides = wrapper.findAll('[role="group"][aria-roledescription="slide"]')
      const ids = slides.map((s) => s.attributes('id'))
      expect(new Set(ids).size).toBe(ids.length)
    })
  })
})
