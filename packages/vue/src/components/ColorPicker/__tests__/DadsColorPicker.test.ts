import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import DadsColorPicker from '../DadsColorPicker.vue'
import { DADS_DEFAULT_SWATCHES } from '../DadsColorPicker.types'

const createWrapper = (
  props: Partial<{ modelValue: string; swatches: string[]; disabled: boolean; label: string }> = {},
) =>
  mount(DadsColorPicker, {
    props: {
      modelValue: '#000000',
      ...props,
    },
  })

describe('DadsColorPicker', () => {
  describe('rendering', () => {
    it('mounts with the modelValue color reflected in the native color input', () => {
      const wrapper = createWrapper({ modelValue: '#ff5500' })
      const colorInput = wrapper.find<HTMLInputElement>('input[type="color"]')
      expect(colorInput.exists()).toBe(true)
      // <input type="color"> always returns lowercase
      expect(colorInput.element.value).toBe('#ff5500')
    })

    it('renders the hex text input with the raw modelValue', () => {
      const wrapper = createWrapper({ modelValue: '#ABCDEF' })
      const hexInput = wrapper.find<HTMLInputElement>('input[type="text"]')
      expect(hexInput.exists()).toBe(true)
      expect(hexInput.element.value).toBe('#ABCDEF')
    })

    it('renders the default swatches when no override is provided', () => {
      const wrapper = createWrapper()
      const swatches = wrapper.findAll('.dads-color-picker__swatch')
      expect(swatches).toHaveLength(DADS_DEFAULT_SWATCHES.length)
    })

    it('renders custom swatches when provided', () => {
      const wrapper = createWrapper({ swatches: ['#111111', '#222222', '#333333'] })
      const swatches = wrapper.findAll('.dads-color-picker__swatch')
      expect(swatches).toHaveLength(3)
    })

    it('exposes an aria-label on the native color input', () => {
      const wrapper = createWrapper({ label: 'テキスト色' })
      const colorInput = wrapper.find('input[type="color"]')
      expect(colorInput.attributes('aria-label')).toBe('テキスト色')
    })

    it('falls back to a default aria-label when none is provided', () => {
      const wrapper = createWrapper()
      const colorInput = wrapper.find('input[type="color"]')
      expect(colorInput.attributes('aria-label')).toBe('色を選択')
    })
  })

  describe('selection state (aria-pressed)', () => {
    it('marks the matching swatch as aria-pressed=true', () => {
      const wrapper = createWrapper({ modelValue: '#000000' })
      const blackSwatch = wrapper.findAll('.dads-color-picker__swatch')[0]
      expect(blackSwatch?.attributes('aria-pressed')).toBe('true')
    })

    it('matches case-insensitively', () => {
      // First swatch is #000000; modelValue uppercase should still match.
      const wrapper = createWrapper({ modelValue: '#FF5500', swatches: ['#ff5500', '#000000'] })
      const swatches = wrapper.findAll('.dads-color-picker__swatch')
      expect(swatches[0]?.attributes('aria-pressed')).toBe('true')
      expect(swatches[1]?.attributes('aria-pressed')).toBe('false')
    })
  })

  describe('emit update:modelValue', () => {
    it('emits when the native color input changes', async () => {
      const wrapper = createWrapper()
      const colorInput = wrapper.find<HTMLInputElement>('input[type="color"]')
      colorInput.element.value = '#abcdef'
      await colorInput.trigger('input')
      const events = wrapper.emitted('update:modelValue')
      expect(events).toHaveLength(1)
      expect(events?.[0]?.[0]).toBe('#abcdef')
    })

    it('emits when a swatch is clicked', async () => {
      const wrapper = createWrapper({ swatches: ['#112233', '#445566'] })
      const swatches = wrapper.findAll('.dads-color-picker__swatch')
      await swatches[1]?.trigger('click')
      const events = wrapper.emitted('update:modelValue')
      expect(events).toHaveLength(1)
      expect(events?.[0]?.[0]).toBe('#445566')
    })

    it('emits a normalized lowercase value with leading #', async () => {
      const wrapper = createWrapper()
      const colorInput = wrapper.find<HTMLInputElement>('input[type="color"]')
      colorInput.element.value = '#FFAA00'
      await colorInput.trigger('input')
      expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toBe('#ffaa00')
    })

    it('emits only when the hex input parses as a complete #RRGGBB triplet', async () => {
      const wrapper = createWrapper()
      const hexInput = wrapper.find<HTMLInputElement>('input[type="text"]')

      hexInput.element.value = '#ff'
      await hexInput.trigger('input')
      expect(wrapper.emitted('update:modelValue')).toBeUndefined()

      hexInput.element.value = '#ff5500'
      await hexInput.trigger('input')
      expect(wrapper.emitted('update:modelValue')).toHaveLength(1)
    })
  })

  describe('disabled state', () => {
    it('marks the wrapper with --disabled', () => {
      const wrapper = createWrapper({ disabled: true })
      expect(wrapper.classes()).toContain('dads-color-picker--disabled')
    })

    it('disables both inputs and every swatch button', () => {
      const wrapper = createWrapper({ disabled: true })
      expect(wrapper.find<HTMLInputElement>('input[type="color"]').element.disabled).toBe(true)
      expect(wrapper.find<HTMLInputElement>('input[type="text"]').element.disabled).toBe(true)
      const swatches = wrapper.findAll<HTMLButtonElement>('.dads-color-picker__swatch')
      for (const s of swatches) expect(s.element.disabled).toBe(true)
    })

    it('does not emit when a swatch is clicked while disabled', async () => {
      const wrapper = createWrapper({ disabled: true })
      const firstSwatch = wrapper.find('.dads-color-picker__swatch')
      await firstSwatch.trigger('click')
      expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    })
  })
})
