import { afterEach, describe, expect, it, vi } from 'vitest'
import { enableAutoUnmount, mount } from '@vue/test-utils'
import { defineComponent, h, nextTick } from 'vue'
import DadsTooltip from '../DadsTooltip.vue'
import type { DadsTooltipPosition, DadsTooltipProps } from '../DadsTooltip.types'

enableAutoUnmount(afterEach)

const createWrapper = (
  props: Partial<DadsTooltipProps> = {},
  slots: Record<string, string> = {
    trigger: '<button type="button">trigger</button>',
    default: 'tooltip-body',
  },
) =>
  mount(DadsTooltip, {
    props: props as DadsTooltipProps,
    slots,
    attachTo: document.body,
  })

const queryTooltip = () => document.body.querySelector('.dads-tooltip')
const queryWrap = () => document.body.querySelector('.dads-tooltip__trigger-wrap')
const queryTrigger = () => document.body.querySelector('.dads-tooltip__trigger-wrap button')

describe('DadsTooltip', () => {
  describe('rendering', () => {
    it('renders the trigger slot inside the wrap', () => {
      createWrapper()
      const trigger = queryTrigger()
      expect(trigger).not.toBeNull()
      expect(trigger?.textContent).toBe('trigger')
    })

    it('does not render the tooltip until opened', () => {
      createWrapper()
      expect(queryTooltip()).toBeNull()
    })

    it('renders the tooltip after mouseenter', async () => {
      createWrapper()
      ;(queryWrap() as HTMLElement).dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }))
      await nextTick()
      expect(queryTooltip()).not.toBeNull()
    })

    it('teleports the tooltip into document.body', async () => {
      createWrapper()
      ;(queryWrap() as HTMLElement).dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }))
      await nextTick()
      expect(document.body.contains(queryTooltip())).toBe(true)
    })

    it('renders an arrow element', async () => {
      createWrapper()
      ;(queryWrap() as HTMLElement).dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }))
      await nextTick()
      expect(document.body.querySelector('.dads-tooltip__arrow')).not.toBeNull()
    })
  })

  describe('content', () => {
    it('renders the text prop when no default slot is provided', async () => {
      mount(DadsTooltip, {
        props: { text: 'from-prop' } as DadsTooltipProps,
        slots: { trigger: '<button type="button">trigger</button>' },
        attachTo: document.body,
      })
      ;(queryWrap() as HTMLElement).dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }))
      await nextTick()
      expect(document.body.querySelector('.dads-tooltip__content')?.textContent?.trim()).toBe(
        'from-prop',
      )
    })

    it('default slot wins over the text prop', async () => {
      createWrapper(
        { text: 'ignored' },
        {
          trigger: '<button type="button">trigger</button>',
          default: 'from-slot',
        },
      )
      ;(queryWrap() as HTMLElement).dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }))
      await nextTick()
      expect(document.body.querySelector('.dads-tooltip__content')?.textContent?.trim()).toBe(
        'from-slot',
      )
    })
  })

  describe('hover interactions', () => {
    it('opens on mouseenter and closes on mouseleave', async () => {
      createWrapper()
      const wrap = queryWrap() as HTMLElement
      wrap.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }))
      await nextTick()
      expect(queryTooltip()).not.toBeNull()
      wrap.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }))
      await nextTick()
      expect(queryTooltip()).toBeNull()
    })
  })

  describe('focus interactions', () => {
    it('opens on focusin', async () => {
      createWrapper()
      ;(queryWrap() as HTMLElement).dispatchEvent(new FocusEvent('focusin', { bubbles: true }))
      await nextTick()
      expect(queryTooltip()).not.toBeNull()
    })

    it('closes on focusout', async () => {
      createWrapper()
      const wrap = queryWrap() as HTMLElement
      wrap.dispatchEvent(new FocusEvent('focusin', { bubbles: true }))
      await nextTick()
      expect(queryTooltip()).not.toBeNull()
      wrap.dispatchEvent(new FocusEvent('focusout', { bubbles: true }))
      await nextTick()
      expect(queryTooltip()).toBeNull()
    })
  })

  describe('disabled', () => {
    it('does not open on hover when disabled', async () => {
      createWrapper({ disabled: true })
      ;(queryWrap() as HTMLElement).dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }))
      await nextTick()
      expect(queryTooltip()).toBeNull()
    })

    it('does not open on focus when disabled', async () => {
      createWrapper({ disabled: true })
      ;(queryWrap() as HTMLElement).dispatchEvent(new FocusEvent('focusin', { bubbles: true }))
      await nextTick()
      expect(queryTooltip()).toBeNull()
    })

    it('omits aria-describedby when disabled', async () => {
      createWrapper({ disabled: true })
      ;(queryWrap() as HTMLElement).dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }))
      await nextTick()
      expect(queryWrap()?.hasAttribute('aria-describedby')).toBe(false)
    })
  })

  describe('positions', () => {
    const positions: DadsTooltipPosition[] = [
      'top',
      'top-start',
      'top-end',
      'bottom',
      'bottom-start',
      'bottom-end',
      'left',
      'right',
    ]

    it.each(positions)('applies the dads-tooltip--%s modifier class', async (position) => {
      createWrapper({ position })
      ;(queryWrap() as HTMLElement).dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }))
      await nextTick()
      const tip = queryTooltip()
      expect(tip?.classList.contains(`dads-tooltip--${position}`)).toBe(true)
    })

    it('defaults the position to top', async () => {
      createWrapper()
      ;(queryWrap() as HTMLElement).dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }))
      await nextTick()
      expect(queryTooltip()?.classList.contains('dads-tooltip--top')).toBe(true)
    })
  })

  describe('delays', () => {
    it('respects openDelay before showing', async () => {
      vi.useFakeTimers()
      try {
        createWrapper({ openDelay: 200 })
        ;(queryWrap() as HTMLElement).dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }))
        // Not open yet — the timer has been queued.
        await nextTick()
        expect(queryTooltip()).toBeNull()
        vi.advanceTimersByTime(200)
        await nextTick()
        expect(queryTooltip()).not.toBeNull()
      } finally {
        vi.useRealTimers()
      }
    })

    it('respects closeDelay before hiding', async () => {
      vi.useFakeTimers()
      try {
        createWrapper({ closeDelay: 200 })
        const wrap = queryWrap() as HTMLElement
        wrap.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }))
        await nextTick()
        expect(queryTooltip()).not.toBeNull()
        wrap.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }))
        await nextTick()
        // Still open: the close timer hasn't fired yet.
        expect(queryTooltip()).not.toBeNull()
        vi.advanceTimersByTime(200)
        await nextTick()
        expect(queryTooltip()).toBeNull()
      } finally {
        vi.useRealTimers()
      }
    })

    it('cancels a pending open when leaving before openDelay elapses', async () => {
      vi.useFakeTimers()
      try {
        createWrapper({ openDelay: 200 })
        const wrap = queryWrap() as HTMLElement
        wrap.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }))
        // User leaves while the tooltip is still queued — never show it.
        wrap.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }))
        vi.advanceTimersByTime(500)
        await nextTick()
        expect(queryTooltip()).toBeNull()
      } finally {
        vi.useRealTimers()
      }
    })

    it('cancels a pending close when re-entering before closeDelay elapses', async () => {
      vi.useFakeTimers()
      try {
        createWrapper({ closeDelay: 200 })
        const wrap = queryWrap() as HTMLElement
        wrap.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }))
        await nextTick()
        wrap.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }))
        // User came back — abort the close.
        wrap.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }))
        vi.advanceTimersByTime(500)
        await nextTick()
        expect(queryTooltip()).not.toBeNull()
      } finally {
        vi.useRealTimers()
      }
    })
  })

  describe('a11y', () => {
    it('sets role="tooltip" on the tooltip element', async () => {
      createWrapper()
      ;(queryWrap() as HTMLElement).dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }))
      await nextTick()
      expect(queryTooltip()?.getAttribute('role')).toBe('tooltip')
    })

    it('adds aria-describedby on the wrap when open', async () => {
      createWrapper()
      ;(queryWrap() as HTMLElement).dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }))
      await nextTick()
      const describedBy = queryWrap()?.getAttribute('aria-describedby')
      const tipId = queryTooltip()?.getAttribute('id')
      expect(describedBy).toBeTruthy()
      expect(describedBy).toBe(tipId)
    })

    it('removes aria-describedby when closed', async () => {
      createWrapper()
      const wrap = queryWrap() as HTMLElement
      wrap.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }))
      await nextTick()
      wrap.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }))
      await nextTick()
      expect(wrap.hasAttribute('aria-describedby')).toBe(false)
    })

    it('uses the explicit id prop when provided', async () => {
      createWrapper({ id: 'custom-id' })
      ;(queryWrap() as HTMLElement).dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }))
      await nextTick()
      expect(queryTooltip()?.getAttribute('id')).toBe('custom-id')
      expect(queryWrap()?.getAttribute('aria-describedby')).toBe('custom-id')
    })

    it('generates distinct ids for two tooltips on the same page', async () => {
      // Two independent instances must not collide on aria-describedby.
      const Harness = defineComponent({
        components: { DadsTooltip },
        render() {
          return h('div', [
            h(
              DadsTooltip,
              { text: 'one' },
              { trigger: () => h('button', { type: 'button' }, 'a') },
            ),
            h(
              DadsTooltip,
              { text: 'two' },
              { trigger: () => h('button', { type: 'button' }, 'b') },
            ),
          ])
        },
      })
      mount(Harness, { attachTo: document.body })
      const wraps = document.body.querySelectorAll('.dads-tooltip__trigger-wrap')
      expect(wraps.length).toBe(2)
      ;(wraps[0] as HTMLElement).dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }))
      ;(wraps[1] as HTMLElement).dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }))
      await nextTick()
      const ids = Array.from(document.body.querySelectorAll('.dads-tooltip')).map((el) =>
        el.getAttribute('id'),
      )
      expect(ids.length).toBe(2)
      expect(ids[0]).toBeTruthy()
      expect(ids[1]).toBeTruthy()
      expect(ids[0]).not.toBe(ids[1])
    })

    it('marks the arrow as aria-hidden', async () => {
      createWrapper()
      ;(queryWrap() as HTMLElement).dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }))
      await nextTick()
      expect(document.body.querySelector('.dads-tooltip__arrow')?.getAttribute('aria-hidden')).toBe(
        'true',
      )
    })
  })

  describe('positioning style', () => {
    it('writes top/left inline styles when opened', async () => {
      createWrapper({ position: 'bottom' })
      ;(queryWrap() as HTMLElement).dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }))
      // Multiple ticks: the open watcher waits one nextTick before reading the
      // tooltip's rect, then assigning to positionStyle requires another tick
      // for Vue to flush it back to the DOM.
      await nextTick()
      await nextTick()
      await nextTick()
      const tip = queryTooltip() as HTMLElement
      // jsdom returns 0-sized rects but we still expect the inline styles
      // to be assigned (the px values may be 0 or negative, that's fine).
      expect(tip.style.top.endsWith('px')).toBe(true)
      expect(tip.style.left.endsWith('px')).toBe(true)
    })
  })
})
