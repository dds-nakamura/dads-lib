import { afterEach, describe, expect, it } from 'vitest'
import { enableAutoUnmount, mount } from '@vue/test-utils'
import { axe } from 'vitest-axe'
import DadsFormControlLabel from '../DadsFormControlLabel.vue'
import type { DadsFormControlLabelProps } from '../DadsFormControlLabel.types'

enableAutoUnmount(afterEach)

const createWrapper = (props: DadsFormControlLabelProps = {}, slots = {}) =>
  mount(DadsFormControlLabel, { props, slots, attachTo: document.body })

describe('DadsFormControlLabel', () => {
  describe('root element', () => {
    it('renders a <div> by default', () => {
      const wrapper = createWrapper({ label: 'ラベル' })
      expect(wrapper.find('div.dads-form-control-label').exists()).toBe(true)
      expect(wrapper.find('label.dads-form-control-label__label').exists()).toBe(true)
    })

    it('renders a <fieldset> + <legend> when as="fieldset"', () => {
      const wrapper = createWrapper({ as: 'fieldset', label: 'グループ' })
      expect(wrapper.find('fieldset.dads-form-control-label').exists()).toBe(true)
      expect(wrapper.find('legend.dads-form-control-label__label').exists()).toBe(true)
    })

    it('reflects the size via data-size', () => {
      const wrapper = createWrapper({ label: 'ラベル', size: 'lg' })
      expect(wrapper.find('.dads-form-control-label').attributes('data-size')).toBe('lg')
    })
  })

  describe('label', () => {
    it('applies `for` only on a single (div) control', () => {
      const single = createWrapper({ label: 'ラベル', labelFor: 'x' })
      expect(single.find('label').attributes('for')).toBe('x')
    })

    it('does not apply `for` on a legend', () => {
      const group = createWrapper({ as: 'fieldset', label: 'グループ', labelFor: 'x' })
      expect(group.find('legend').attributes('for')).toBeUndefined()
    })

    it('omits the label element when no label is provided', () => {
      const wrapper = createWrapper()
      expect(wrapper.find('.dads-form-control-label__label').exists()).toBe(false)
    })
  })

  describe('requirement marker', () => {
    it('renders ※必須 with data-required when required', () => {
      const wrapper = createWrapper({ label: 'ラベル', required: true })
      const req = wrapper.find('.dads-form-control-label__requirement')
      expect(req.exists()).toBe(true)
      expect(req.attributes('data-required')).toBe('true')
      expect(req.text()).toBe('※必須')
    })

    it('renders a custom requiredLabel', () => {
      const wrapper = createWrapper({ label: 'ラベル', required: true, requiredLabel: '※入力必須' })
      expect(wrapper.find('.dads-form-control-label__requirement').text()).toBe('※入力必須')
    })

    it('renders an optional marker without data-required', () => {
      const wrapper = createWrapper({ label: 'ラベル', optionalLabel: '任意' })
      const req = wrapper.find('.dads-form-control-label__requirement')
      expect(req.exists()).toBe(true)
      expect(req.attributes('data-required')).toBeUndefined()
      expect(req.text()).toBe('任意')
    })

    it('renders no marker by default', () => {
      const wrapper = createWrapper({ label: 'ラベル' })
      expect(wrapper.find('.dads-form-control-label__requirement').exists()).toBe(false)
    })
  })

  describe('support / error / status', () => {
    it('renders support text with id', () => {
      const wrapper = createWrapper({ label: 'L', supportText: '補足', supportTextId: 's1' })
      const p = wrapper.find('.dads-form-control-label__support-text')
      expect(p.text()).toBe('補足')
      expect(p.attributes('id')).toBe('s1')
    })

    it('renders error text with id', () => {
      const wrapper = createWrapper({ label: 'L', errorText: 'エラー', errorTextId: 'e1' })
      const p = wrapper.find('.dads-form-control-label__error-text')
      expect(p.text()).toBe('エラー')
      expect(p.attributes('id')).toBe('e1')
    })

    it('renders a status pill', () => {
      const wrapper = createWrapper({ label: 'L', status: '保存済み' })
      expect(wrapper.find('.dads-form-control-label__status').text()).toBe('保存済み')
    })
  })

  describe('slots', () => {
    it('renders default slot as the control', () => {
      const wrapper = createWrapper({ label: 'L' }, { default: '<input class="my-control" />' })
      expect(wrapper.find('.dads-form-control-label__control .my-control').exists()).toBe(true)
    })
  })

  describe('disabled', () => {
    it('reflects data-disabled', () => {
      const wrapper = createWrapper({ label: 'L', disabled: true })
      expect(wrapper.find('.dads-form-control-label').attributes('data-disabled')).toBe('true')
    })
  })

  describe('accessibility', () => {
    it('has no axe violations (single)', async () => {
      const wrapper = createWrapper(
        { label: 'お名前', labelFor: 'name', required: true, supportText: '補足' },
        { default: '<input id="name" type="text" />' },
      )
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })
  })
})
