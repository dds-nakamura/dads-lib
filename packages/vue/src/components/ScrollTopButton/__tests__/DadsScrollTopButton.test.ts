import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { enableAutoUnmount, mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { axe } from 'vitest-axe'
import DadsScrollTopButton from '../DadsScrollTopButton.vue'
import type { DadsScrollTopButtonProps } from '../DadsScrollTopButton.types'

enableAutoUnmount(afterEach)

// happy-dom does not implement a real layout engine, so `window.scrollY` is a
// settable own-property. We define it explicitly with a backing variable so
// individual tests can mutate it freely and the component reads the same
// value via `window.scrollY`.
let scrollYValue = 0

beforeEach(() => {
  scrollYValue = 0
  Object.defineProperty(window, 'scrollY', {
    configurable: true,
    get: () => scrollYValue,
  })
})

const setScrollY = async (value: number) => {
  scrollYValue = value
  // Dispatch a scroll event so the component's listener runs and updates
  // its internal reactive `scrollY` ref.
  window.dispatchEvent(new Event('scroll'))
  await nextTick()
}

const createWrapper = (props: DadsScrollTopButtonProps = {}) =>
  mount(DadsScrollTopButton, { props, attachTo: document.body })

describe('DadsScrollTopButton', () => {
  describe('rendering', () => {
    it('renders a native button element', () => {
      const wrapper = createWrapper()
      expect(wrapper.element.tagName).toBe('BUTTON')
    })

    it('has type="button" so it never submits an ancestor form', () => {
      const wrapper = createWrapper()
      expect(wrapper.attributes('type')).toBe('button')
    })

    it('applies the default position class (bottom-right)', () => {
      const wrapper = createWrapper()
      expect(wrapper.classes()).toContain('dads-scroll-top-button')
      expect(wrapper.classes()).toContain('dads-scroll-top-button--bottom-right')
    })

    it('renders an aria-hidden icon and a label slot fallback', () => {
      const wrapper = createWrapper()
      const icon = wrapper.find('.dads-scroll-top-button__icon')
      expect(icon.exists()).toBe(true)
      expect(icon.attributes('aria-hidden')).toBe('true')
      expect(wrapper.find('.dads-scroll-top-button__label').text()).toBe('トップへ')
    })
  })

  describe('visibility (showOffset)', () => {
    it('is hidden on initial render (scrollY = 0)', () => {
      const wrapper = createWrapper()
      // v-show toggles inline display:none, so the element exists but is
      // visually hidden. Assert via the style attribute.
      expect((wrapper.element as HTMLElement).style.display).toBe('none')
    })

    it('stays hidden while scrollY is below the default offset (200)', async () => {
      const wrapper = createWrapper()
      await setScrollY(150)
      expect((wrapper.element as HTMLElement).style.display).toBe('none')
    })

    it('becomes visible once scrollY exceeds the default offset', async () => {
      const wrapper = createWrapper()
      await setScrollY(250)
      expect((wrapper.element as HTMLElement).style.display).not.toBe('none')
    })

    it('respects a custom showOffset prop', async () => {
      const wrapper = createWrapper({ showOffset: 500 })
      await setScrollY(300)
      expect((wrapper.element as HTMLElement).style.display).toBe('none')
      await setScrollY(600)
      expect((wrapper.element as HTMLElement).style.display).not.toBe('none')
    })

    it('hides again when scrolling back above the threshold', async () => {
      const wrapper = createWrapper()
      await setScrollY(400)
      expect((wrapper.element as HTMLElement).style.display).not.toBe('none')
      await setScrollY(50)
      expect((wrapper.element as HTMLElement).style.display).toBe('none')
    })

    it('shows immediately on mount when the page is already scrolled', async () => {
      // Simulate a pre-scrolled page load (e.g. browser restored position).
      scrollYValue = 400
      const wrapper = createWrapper()
      await nextTick()
      expect((wrapper.element as HTMLElement).style.display).not.toBe('none')
    })
  })

  describe('click', () => {
    it('calls window.scrollTo with smooth behavior on click', async () => {
      const scrollToSpy = vi.spyOn(window, 'scrollTo').mockImplementation(() => {})
      const wrapper = createWrapper()
      await wrapper.trigger('click')
      expect(scrollToSpy).toHaveBeenCalledTimes(1)
      expect(scrollToSpy).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' })
      scrollToSpy.mockRestore()
    })

    it('emits a click event with the original MouseEvent', async () => {
      vi.spyOn(window, 'scrollTo').mockImplementation(() => {})
      const wrapper = createWrapper()
      await wrapper.trigger('click')
      const events = wrapper.emitted('click')
      expect(events).toHaveLength(1)
      expect(events?.[0]?.[0]).toBeInstanceOf(Event)
    })

    it('does not scroll or emit when disabled (native button skips handler)', async () => {
      // Native <button disabled> skips click handlers entirely in the browser
      // and in happy-dom, so the component's `handleClick` is never invoked.
      // We verify the absence of side effects rather than the internal guard.
      const scrollToSpy = vi.spyOn(window, 'scrollTo').mockImplementation(() => {})
      const wrapper = createWrapper({ disabled: true })
      await setScrollY(400)
      await wrapper.trigger('click')
      expect(scrollToSpy).not.toHaveBeenCalled()
      expect(wrapper.emitted('click')).toBeUndefined()
      scrollToSpy.mockRestore()
    })
  })

  describe('position prop', () => {
    it.each(['bottom-right', 'bottom-left'] as const)(
      'applies dads-scroll-top-button--%s class',
      (position) => {
        const wrapper = createWrapper({ position })
        expect(wrapper.classes()).toContain(`dads-scroll-top-button--${position}`)
      },
    )
  })

  describe('aria-label', () => {
    it('uses the default Japanese label when no prop is provided', () => {
      const wrapper = createWrapper()
      expect(wrapper.attributes('aria-label')).toBe('ページの先頭へ戻る')
    })

    it('reflects a custom ariaLabel prop', () => {
      const wrapper = createWrapper({ ariaLabel: 'Back to top' })
      expect(wrapper.attributes('aria-label')).toBe('Back to top')
    })
  })

  describe('disabled state', () => {
    it('sets the native disabled attribute', () => {
      const wrapper = createWrapper({ disabled: true })
      expect(wrapper.attributes('disabled')).toBeDefined()
    })
  })

  describe('lifecycle', () => {
    it('removes the scroll listener on unmount', () => {
      const removeSpy = vi.spyOn(window, 'removeEventListener')
      const wrapper = createWrapper()
      wrapper.unmount()
      // Find the call that targeted the scroll event so we don't accidentally
      // assert against unrelated listeners (e.g. from happy-dom internals).
      const scrollRemovals = removeSpy.mock.calls.filter((args) => args[0] === 'scroll')
      expect(scrollRemovals.length).toBeGreaterThanOrEqual(1)
      removeSpy.mockRestore()
    })

    it('does not respond to scroll events after unmount', async () => {
      const wrapper = createWrapper()
      wrapper.unmount()
      // After unmount the component is detached; dispatching scroll should
      // not throw nor mutate any state. We just assert it doesn't blow up.
      expect(() => {
        scrollYValue = 800
        window.dispatchEvent(new Event('scroll'))
      }).not.toThrow()
    })
  })

  describe('a11y (vitest-axe)', () => {
    it('has no violations with the default Japanese aria-label', async () => {
      const wrapper = createWrapper()
      // Force-show the button so axe inspects the visible state.
      await setScrollY(400)
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations when disabled', async () => {
      const wrapper = createWrapper({ disabled: true })
      await setScrollY(400)
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })
  })
})
