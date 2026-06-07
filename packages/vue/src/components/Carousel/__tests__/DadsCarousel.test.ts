import { afterEach, describe, expect, it } from 'vitest'
import { enableAutoUnmount, mount } from '@vue/test-utils'
import { axe } from 'vitest-axe'
import DadsCarousel from '../DadsCarousel.vue'
import type { DadsCarouselProps, DadsCarouselSlide } from '../DadsCarousel.types'

// happy-dom lacks ResizeObserver; stub a no-op so onMounted does not throw.
// We do not exercise wide-mode container queries (they don't run in happy-dom);
// instead we assert the DOM/ARIA that is observable without layout.
class ResizeObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}
;(globalThis as unknown as { ResizeObserver: typeof ResizeObserver }).ResizeObserver =
  ResizeObserverStub as unknown as typeof ResizeObserver

enableAutoUnmount(afterEach)

const slides: DadsCarouselSlide[] = [
  { src: '/carousel/image-1.webp', alt: 'スライド1の画像', href: '#link1', width: 696, height: 392 },
  { src: '/carousel/image-2.webp', alt: 'スライド2の画像', href: '#link2', width: 696, height: 392 },
  { src: '/carousel/image-3.webp', alt: 'スライド3の画像', href: '#link3', width: 696, height: 392 },
  { src: '/carousel/image-4.webp', alt: 'スライド4の画像', href: '#link4', width: 696, height: 392 },
]

const createWrapper = (props: Partial<DadsCarouselProps> = {}) =>
  mount(DadsCarousel, {
    props: { slides, modelValue: 0, ...props } as DadsCarouselProps,
    attachTo: document.body,
  })

describe('DadsCarousel', () => {
  describe('rendering / region semantics', () => {
    it('renders a root element with role="region" and the dads-carousel class', () => {
      const wrapper = createWrapper()
      expect(wrapper.classes()).toContain('dads-carousel')
      expect(wrapper.attributes('role')).toBe('region')
    })

    it('uses ariaLabel for the region when no heading is set (default スライドショー)', () => {
      const wrapper = createWrapper()
      expect(wrapper.attributes('aria-label')).toBe('スライドショー')
      expect(wrapper.attributes('aria-labelledby')).toBeUndefined()
    })

    it('uses a custom ariaLabel', () => {
      const wrapper = createWrapper({ ariaLabel: 'おすすめ' })
      expect(wrapper.attributes('aria-label')).toBe('おすすめ')
    })

    it('renders a heading and wires aria-labelledby when heading is set', () => {
      const wrapper = createWrapper({ heading: '開催中のイベント' })
      const h = wrapper.find('h2.dads-carousel__heading')
      expect(h.exists()).toBe(true)
      expect(h.text()).toBe('開催中のイベント')
      expect(wrapper.attributes('aria-labelledby')).toBe(h.attributes('id'))
      expect(wrapper.attributes('aria-label')).toBeUndefined()
    })

    it.each([1, 2, 3, 4, 5, 6] as const)(
      'renders the heading as <h%i> when headingLevel=%i',
      (level) => {
        const wrapper = createWrapper({ heading: 'T', headingLevel: level })
        expect(wrapper.find(`h${level}.dads-carousel__heading`).exists()).toBe(true)
      },
    )

    it('does not render a heading by default', () => {
      const wrapper = createWrapper()
      expect(wrapper.find('.dads-carousel__heading').exists()).toBe(false)
    })
  })

  describe('current slide / number badge', () => {
    it('shows the current number badge as current+1 with aria-current', () => {
      const wrapper = createWrapper({ modelValue: 2 })
      const badge = wrapper.find('.dads-carousel__panel-number')
      expect(badge.text()).toBe('3')
      expect(badge.attributes('aria-current')).toBe('true')
      expect(badge.attributes('aria-hidden')).toBe('true')
    })

    it('renders the current slide image with its real alt', () => {
      const wrapper = createWrapper({ modelValue: 1 })
      const img = wrapper.find('.dads-carousel__main .dads-carousel__image-container img')
      expect(img.attributes('src')).toBe('/carousel/image-2.webp')
      expect(img.attributes('alt')).toBe('スライド2の画像')
    })

    it('wraps the main image in <a href> when href is set', () => {
      const wrapper = createWrapper({ modelValue: 0 })
      const link = wrapper.find('.dads-carousel__main-panel a.dads-carousel__main-link')
      expect(link.exists()).toBe(true)
      expect(link.attributes('href')).toBe('#link1')
    })

    it('renders the main link as a <div> (no <a>) when href is absent', () => {
      const noHref: DadsCarouselSlide[] = [
        { src: '/a.webp', alt: 'A' },
        { src: '/b.webp', alt: 'B' },
      ]
      const wrapper = createWrapper({ slides: noHref })
      const panel = wrapper.find('.dads-carousel__main-panel')
      expect(panel.find('a.dads-carousel__main-link').exists()).toBe(false)
      expect(panel.find('div.dads-carousel__main-link').exists()).toBe(true)
    })

    it('renders the visually-hidden main label as unit + number', () => {
      const wrapper = createWrapper({ modelValue: 2, unit: 'スライド' })
      const label = wrapper.find('.dads-carousel__main-panel .dads-u-visually-hidden')
      expect(label.text()).toBe('スライド3')
    })

    it('does not put role/aria-label on the main panel in narrow mode (default)', () => {
      const wrapper = createWrapper()
      const panel = wrapper.find('.dads-carousel__main-panel')
      expect(panel.attributes('role')).toBeUndefined()
      expect(panel.attributes('aria-label')).toBeUndefined()
    })

    it('clamps an out-of-range modelValue to the last slide', () => {
      const wrapper = createWrapper({ modelValue: 99 })
      expect(wrapper.find('.dads-carousel__panel-number').text()).toBe('4')
    })
  })

  describe('next preview', () => {
    it('points the next preview to the following slide with empty alt', () => {
      const wrapper = createWrapper({ modelValue: 0 })
      const img = wrapper.find('.dads-carousel__next-image-container img')
      expect(img.attributes('src')).toBe('/carousel/image-2.webp')
      expect(img.attributes('alt')).toBe('')
    })

    it('wraps the next preview to the first slide from the last index', () => {
      const wrapper = createWrapper({ modelValue: 3 })
      const img = wrapper.find('.dads-carousel__next-image-container img')
      expect(img.attributes('src')).toBe('/carousel/image-1.webp')
    })

    it('shows the next preview label (default 次のスライド)', () => {
      const wrapper = createWrapper()
      expect(wrapper.find('.dads-carousel__next-image-label').text()).toBe('次のスライド')
    })

    it('emits update:modelValue + change when clicking the next preview button', async () => {
      const wrapper = createWrapper({ modelValue: 0 })
      await wrapper.find('.dads-carousel__next > button').trigger('click')
      expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toBe(1)
      expect(wrapper.emitted('change')?.[0]?.[0]).toBe(1)
    })
  })

  describe('blur backgrounds', () => {
    it('renders blurred (alt="") current + next bg images', () => {
      const wrapper = createWrapper({ modelValue: 0 })
      const mainBg = wrapper.find('.dads-carousel__main-bg > div img')
      const nextBg = wrapper.find('.dads-carousel__next-bg > div img')
      expect(mainBg.attributes('src')).toBe('/carousel/image-1.webp')
      expect(mainBg.attributes('alt')).toBe('')
      expect(nextBg.attributes('src')).toBe('/carousel/image-2.webp')
      expect(nextBg.attributes('alt')).toBe('')
    })
  })

  describe('step nav (tablist)', () => {
    it('renders one tab per slide with the tablist aria-label', () => {
      const wrapper = createWrapper()
      const list = wrapper.find('.dads-carousel__step-nav')
      expect(list.attributes('role')).toBe('tablist')
      expect(list.attributes('aria-label')).toBe('スライド選択')
      expect(wrapper.findAll('.dads-carousel__step')).toHaveLength(4)
    })

    it('uses roving tabindex (selected=0, others=-1) and aria-selected', () => {
      const wrapper = createWrapper({ modelValue: 1 })
      const tabs = wrapper.findAll('.dads-carousel__step')
      expect(tabs[1].attributes('tabindex')).toBe('0')
      expect(tabs[1].attributes('aria-selected')).toBe('true')
      expect(tabs[0].attributes('tabindex')).toBe('-1')
      expect(tabs[0].attributes('aria-selected')).toBe('false')
      expect(tabs[2].attributes('tabindex')).toBe('-1')
    })

    it('renders the unit prefix as visually-hidden inside each tab', () => {
      const wrapper = createWrapper({ unit: 'スライド' })
      const tab = wrapper.findAll('.dads-carousel__step')[0]
      expect(tab.find('.dads-u-visually-hidden').text()).toBe('スライド')
      expect(tab.text()).toContain('1')
    })

    it('goes to a slide when clicking its tab', async () => {
      const wrapper = createWrapper({ modelValue: 0 })
      await wrapper.findAll('.dads-carousel__step')[2].trigger('click')
      expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toBe(2)
      expect(wrapper.emitted('change')?.[0]?.[0]).toBe(2)
    })

    it('does not emit when clicking the already-selected tab', async () => {
      const wrapper = createWrapper({ modelValue: 1 })
      await wrapper.findAll('.dads-carousel__step')[1].trigger('click')
      expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    })

    it('moves selection forward on ArrowRight / ArrowDown', async () => {
      const wrapper = createWrapper({ modelValue: 0 })
      await wrapper.find('.dads-carousel__step-nav').trigger('keydown', { key: 'ArrowRight' })
      expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toBe(1)

      const wrapper2 = createWrapper({ modelValue: 0 })
      await wrapper2.find('.dads-carousel__step-nav').trigger('keydown', { key: 'ArrowDown' })
      expect(wrapper2.emitted('update:modelValue')?.[0]?.[0]).toBe(1)
    })

    it('moves selection backward on ArrowLeft / ArrowUp', async () => {
      const wrapper = createWrapper({ modelValue: 2 })
      await wrapper.find('.dads-carousel__step-nav').trigger('keydown', { key: 'ArrowLeft' })
      expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toBe(1)

      const wrapper2 = createWrapper({ modelValue: 2 })
      await wrapper2.find('.dads-carousel__step-nav').trigger('keydown', { key: 'ArrowUp' })
      expect(wrapper2.emitted('update:modelValue')?.[0]?.[0]).toBe(1)
    })

    it('wraps forward from last to first via ArrowRight', async () => {
      const wrapper = createWrapper({ modelValue: 3 })
      await wrapper.find('.dads-carousel__step-nav').trigger('keydown', { key: 'ArrowRight' })
      expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toBe(0)
    })

    it('wraps backward from first to last via ArrowLeft', async () => {
      const wrapper = createWrapper({ modelValue: 0 })
      await wrapper.find('.dads-carousel__step-nav').trigger('keydown', { key: 'ArrowLeft' })
      expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toBe(3)
    })

    it('ignores unrelated keys', async () => {
      const wrapper = createWrapper({ modelValue: 0 })
      await wrapper.find('.dads-carousel__step-nav').trigger('keydown', { key: 'Enter' })
      expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    })
  })

  describe('page nav (narrow)', () => {
    it('renders "current / total" text', () => {
      const wrapper = createWrapper({ modelValue: 1 })
      expect(wrapper.find('.dads-carousel__page-nav > span').text()).toBe('2 / 4')
    })

    it('renders prev/next aria-labels (defaults)', () => {
      const wrapper = createWrapper()
      const hidden = wrapper.findAll('.dads-carousel__page-nav .dads-u-visually-hidden')
      expect(hidden[0].text()).toBe('前のスライド')
      expect(hidden[1].text()).toBe('次のスライド')
    })

    it('allows overriding prev/next aria-labels', () => {
      const wrapper = createWrapper({
        prevSlideAriaLabel: 'Previous',
        nextSlideAriaLabel: 'Next',
      })
      const hidden = wrapper.findAll('.dads-carousel__page-nav .dads-u-visually-hidden')
      expect(hidden[0].text()).toBe('Previous')
      expect(hidden[1].text()).toBe('Next')
    })

    it('prev button goes to the previous slide (wraps at 0)', async () => {
      const wrapper = createWrapper({ modelValue: 0 })
      await wrapper.findAll('.dads-carousel__page-nav > button')[0].trigger('click')
      expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toBe(3)
    })

    it('next button goes to the next slide (wraps at last)', async () => {
      const wrapper = createWrapper({ modelValue: 3 })
      await wrapper.findAll('.dads-carousel__page-nav > button')[1].trigger('click')
      expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toBe(0)
    })
  })

  describe('disclosure (すべてのスライド)', () => {
    it('renders the summary label (default すべてのスライド)', () => {
      const wrapper = createWrapper()
      expect(wrapper.find('.dads-carousel__others .dads-disclosure__summary').text()).toContain(
        'すべてのスライド',
      )
    })

    it('lists the OTHER slides in wrap order (after current, then before)', () => {
      const wrapper = createWrapper({ modelValue: 1 })
      const items = wrapper.findAll('.dads-carousel__others-content li')
      // current = index 1 → order: 2,3 (after) then 0 (before) → numbers 3,4,1
      expect(items).toHaveLength(3)
      const numbers = items.map((li) => li.find('.dads-carousel__panel-number').text())
      expect(numbers).toEqual(['3', '4', '1'])
    })

    it('keeps the original number badge on each listed slide (aria-hidden, no aria-current)', () => {
      const wrapper = createWrapper({ modelValue: 0 })
      const badge = wrapper.find('.dads-carousel__others-content li .dads-carousel__panel-number')
      expect(badge.attributes('aria-hidden')).toBe('true')
      expect(badge.attributes('aria-current')).toBeUndefined()
    })

    it('wires each listed slide to its href + visually-hidden label', () => {
      const wrapper = createWrapper({ modelValue: 0 })
      // first listed = slide index 1 (number 2)
      const firstLi = wrapper.findAll('.dads-carousel__others-content li')[0]
      const link = firstLi.find('a.dads-carousel__main-link')
      expect(link.attributes('href')).toBe('#link2')
      expect(firstLi.find('.dads-u-visually-hidden').text()).toBe('スライド2')
    })
  })

  describe('empty / single slide edge cases', () => {
    it('renders nothing fatal with a single slide', () => {
      const wrapper = createWrapper({ slides: [{ src: '/a.webp', alt: 'A' }] })
      expect(wrapper.find('.dads-carousel__panel-number').text()).toBe('1')
      // next preview wraps back to itself
      expect(wrapper.find('.dads-carousel__next-image-container img').attributes('src')).toBe(
        '/a.webp',
      )
      // no "other" slides
      expect(wrapper.findAll('.dads-carousel__others-content li')).toHaveLength(0)
    })
  })

  describe('a11y (vitest-axe)', () => {
    it('has no violations for the aria-label (key-visual) variant', async () => {
      const wrapper = createWrapper()
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations for the heading (container) variant', async () => {
      const wrapper = createWrapper({ heading: '開催中のイベント' })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })
  })
})
