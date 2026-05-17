import { afterEach, describe, expect, it } from 'vitest'
import { enableAutoUnmount, mount } from '@vue/test-utils'
import { axe } from 'vitest-axe'
import DadsPageNavigation from '../DadsPageNavigation.vue'
import type { DadsPageNavigationProps } from '../DadsPageNavigation.types'

enableAutoUnmount(afterEach)

const createWrapper = (props: Partial<DadsPageNavigationProps> = {}) =>
  mount(DadsPageNavigation, {
    props: {
      modelValue: 1,
      totalPages: 10,
      ...props,
    } as DadsPageNavigationProps,
  })

const pageButtonTexts = (wrapper: ReturnType<typeof createWrapper>) =>
  wrapper
    .findAll('.dads-page-navigation__btn--page')
    .map((b) => b.text())
    .concat(wrapper.findAll('.dads-page-navigation__ellipsis').map(() => '…'))

describe('DadsPageNavigation (pagination)', () => {
  describe('rendering', () => {
    it('renders a <nav> element with the dads-page-navigation class', () => {
      const wrapper = createWrapper()
      expect(wrapper.element.tagName).toBe('NAV')
      expect(wrapper.classes()).toContain('dads-page-navigation')
    })

    it('renders prev and next buttons by default', () => {
      const wrapper = createWrapper()
      expect(wrapper.find('.dads-page-navigation__btn--prev').exists()).toBe(true)
      expect(wrapper.find('.dads-page-navigation__btn--next').exists()).toBe(true)
    })

    it('hides first/last buttons by default', () => {
      const wrapper = createWrapper()
      expect(wrapper.find('.dads-page-navigation__btn--first').exists()).toBe(false)
      expect(wrapper.find('.dads-page-navigation__btn--last').exists()).toBe(false)
    })

    it('renders first/last buttons when showFirstLast is true', () => {
      const wrapper = createWrapper({ showFirstLast: true })
      expect(wrapper.find('.dads-page-navigation__btn--first').exists()).toBe(true)
      expect(wrapper.find('.dads-page-navigation__btn--last').exists()).toBe(true)
    })

    it('hides prev/next when showPrevNext is false', () => {
      const wrapper = createWrapper({ showPrevNext: false })
      expect(wrapper.find('.dads-page-navigation__btn--prev').exists()).toBe(false)
      expect(wrapper.find('.dads-page-navigation__btn--next').exists()).toBe(false)
    })
  })

  describe('page-number buttons', () => {
    it('renders all pages when totalPages <= maxPageButtons', () => {
      const wrapper = createWrapper({ totalPages: 5, maxPageButtons: 7 })
      const btns = wrapper.findAll('.dads-page-navigation__btn--page')
      expect(btns).toHaveLength(5)
      expect(btns.map((b) => b.text())).toEqual(['1', '2', '3', '4', '5'])
      expect(wrapper.findAll('.dads-page-navigation__ellipsis')).toHaveLength(0)
    })

    it('inserts ellipses when totalPages > maxPageButtons and current is in the middle', () => {
      const wrapper = createWrapper({ totalPages: 20, modelValue: 10, maxPageButtons: 7 })
      // Expected layout: 1 … 9 [10] 11 … 20
      const seq = pageButtonTexts(wrapper)
      // numeric buttons rendered + ellipsis count
      expect(wrapper.findAll('.dads-page-navigation__ellipsis')).toHaveLength(2)
      const numericTexts = wrapper.findAll('.dads-page-navigation__btn--page').map((b) => b.text())
      expect(numericTexts).toContain('1')
      expect(numericTexts).toContain('20')
      expect(numericTexts).toContain('10')
      expect(numericTexts).toContain('9')
      expect(numericTexts).toContain('11')
      // First number rendered must be 1
      expect(numericTexts[0]).toBe('1')
      // Last number rendered must be the total
      expect(numericTexts[numericTexts.length - 1]).toBe('20')
      // Page 5 (far from current) should not appear
      expect(seq).not.toContain('5')
    })

    it('hides page-number buttons entirely when maxPageButtons is 0', () => {
      const wrapper = createWrapper({ totalPages: 10, maxPageButtons: 0 })
      expect(wrapper.findAll('.dads-page-navigation__btn--page')).toHaveLength(0)
      expect(wrapper.findAll('.dads-page-navigation__ellipsis')).toHaveLength(0)
      // Prev/Next remain
      expect(wrapper.find('.dads-page-navigation__btn--prev').exists()).toBe(true)
      expect(wrapper.find('.dads-page-navigation__btn--next').exists()).toBe(true)
    })

    it('marks only the current page with aria-current="page"', () => {
      const wrapper = createWrapper({ totalPages: 5, modelValue: 3 })
      const btns = wrapper.findAll('.dads-page-navigation__btn--page')
      btns.forEach((b, i) => {
        if (i === 2) {
          expect(b.attributes('aria-current')).toBe('page')
        } else {
          expect(b.attributes('aria-current')).toBeUndefined()
        }
      })
    })

    it('renders only one page when totalPages is 1', () => {
      const wrapper = createWrapper({ totalPages: 1 })
      const btns = wrapper.findAll('.dads-page-navigation__btn--page')
      expect(btns).toHaveLength(1)
      expect(btns[0]?.text()).toBe('1')
    })
  })

  describe('disabled states', () => {
    it('disables prev button on the first page', () => {
      const wrapper = createWrapper({ modelValue: 1, totalPages: 5 })
      const prev = wrapper.find('.dads-page-navigation__btn--prev')
      expect(prev.attributes('disabled')).toBeDefined()
    })

    it('disables next button on the last page', () => {
      const wrapper = createWrapper({ modelValue: 5, totalPages: 5 })
      const next = wrapper.find('.dads-page-navigation__btn--next')
      expect(next.attributes('disabled')).toBeDefined()
    })

    it('disables all buttons when prop disabled is true', () => {
      const wrapper = createWrapper({ disabled: true, totalPages: 5 })
      const all = wrapper.findAll('button')
      expect(all.length).toBeGreaterThan(0)
      for (const b of all) {
        expect(b.attributes('disabled')).toBeDefined()
      }
    })
  })

  describe('events', () => {
    it('emits update:modelValue and change when a page button is clicked', async () => {
      const wrapper = createWrapper({ totalPages: 5, modelValue: 1 })
      const btns = wrapper.findAll('.dads-page-navigation__btn--page')
      await btns[2]?.trigger('click') // page 3
      expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([3])
      expect(wrapper.emitted('change')?.[0]).toEqual([3])
    })

    it('emits previous page when prev clicked', async () => {
      const wrapper = createWrapper({ totalPages: 5, modelValue: 3 })
      await wrapper.find('.dads-page-navigation__btn--prev').trigger('click')
      expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([2])
    })

    it('emits next page when next clicked', async () => {
      const wrapper = createWrapper({ totalPages: 5, modelValue: 3 })
      await wrapper.find('.dads-page-navigation__btn--next').trigger('click')
      expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([4])
    })

    it('emits first/last when those buttons are clicked', async () => {
      const wrapper = createWrapper({ totalPages: 10, modelValue: 5, showFirstLast: true })
      await wrapper.find('.dads-page-navigation__btn--first').trigger('click')
      expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([1])
      await wrapper.find('.dads-page-navigation__btn--last').trigger('click')
      expect(wrapper.emitted('update:modelValue')?.[1]).toEqual([10])
    })

    it('does not emit when clicking the current page button', async () => {
      const wrapper = createWrapper({ totalPages: 5, modelValue: 3 })
      const current = wrapper
        .findAll('.dads-page-navigation__btn--page')
        .find((b) => b.attributes('aria-current') === 'page')
      await current?.trigger('click')
      expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    })

    it('does not emit when disabled', async () => {
      const wrapper = createWrapper({ totalPages: 5, modelValue: 3, disabled: true })
      const btns = wrapper.findAll('.dads-page-navigation__btn--page')
      await btns[0]?.trigger('click')
      expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    })
  })

  describe('aria-label', () => {
    it('defaults aria-label to "ページ送り"', () => {
      const wrapper = createWrapper()
      expect(wrapper.attributes('aria-label')).toBe('ページ送り')
    })

    it('honors a custom ariaLabel', () => {
      const wrapper = createWrapper({ ariaLabel: 'Pagination' })
      expect(wrapper.attributes('aria-label')).toBe('Pagination')
    })
  })

  describe('labels', () => {
    it('uses default Japanese labels', () => {
      const wrapper = createWrapper({ showFirstLast: true })
      expect(wrapper.find('.dads-page-navigation__btn--prev').text()).toContain('前のページ')
      expect(wrapper.find('.dads-page-navigation__btn--next').text()).toContain('次のページ')
      expect(wrapper.find('.dads-page-navigation__btn--first').attributes('aria-label')).toBe(
        '最初のページ',
      )
      expect(wrapper.find('.dads-page-navigation__btn--last').attributes('aria-label')).toBe(
        '最後のページ',
      )
    })

    it('honors custom labels', () => {
      const wrapper = createWrapper({
        showFirstLast: true,
        prevLabel: 'Prev',
        nextLabel: 'Next',
        firstLabel: 'First',
        lastLabel: 'Last',
      })
      expect(wrapper.find('.dads-page-navigation__btn--prev').text()).toContain('Prev')
      expect(wrapper.find('.dads-page-navigation__btn--next').text()).toContain('Next')
    })
  })

  describe('a11y (vitest-axe)', () => {
    const mountInBody = (props: Partial<DadsPageNavigationProps> = {}) =>
      mount(DadsPageNavigation, {
        props: { modelValue: 1, totalPages: 10, ...props } as DadsPageNavigationProps,
        attachTo: document.body,
      })

    it('has no violations on the first page', async () => {
      const wrapper = mountInBody({ modelValue: 1, totalPages: 10 })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations in the middle of a range with ellipses', async () => {
      const wrapper = mountInBody({ modelValue: 5, totalPages: 20 })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations with first/last jump buttons', async () => {
      const wrapper = mountInBody({ modelValue: 3, totalPages: 10, showFirstLast: true })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations when disabled', async () => {
      const wrapper = mountInBody({ disabled: true })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations with totalPages=1 (single page)', async () => {
      const wrapper = mountInBody({ modelValue: 1, totalPages: 1 })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })
  })
})
