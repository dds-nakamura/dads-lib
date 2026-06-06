import { afterEach, describe, expect, it } from 'vitest'
import { enableAutoUnmount, mount } from '@vue/test-utils'
import { axe } from 'vitest-axe'
import DadsIcon from '../DadsIcon.vue'
import { iconRegistry } from '../icon-registry'

enableAutoUnmount(afterEach)

describe('DadsIcon', () => {
  it('renders an <svg> with the registry path for a known name', () => {
    const wrapper = mount(DadsIcon, { props: { name: 'search' } })
    const svg = wrapper.find('svg.dads-icon')
    expect(svg.exists()).toBe(true)
    expect(svg.find('path').exists()).toBe(true)
    expect(svg.attributes('viewBox')).toBe(iconRegistry.search.viewBox)
    expect(svg.attributes('fill')).toBe('currentColor')
  })

  describe('size', () => {
    it('defaults to 24px', () => {
      const svg = mount(DadsIcon, { props: { name: 'close' } }).find('svg')
      expect(svg.attributes('width')).toBe('24px')
      expect(svg.attributes('height')).toBe('24px')
    })
    it('accepts a number (px)', () => {
      const svg = mount(DadsIcon, { props: { name: 'close', size: 16 } }).find('svg')
      expect(svg.attributes('width')).toBe('16px')
    })
    it('accepts a string as-is', () => {
      const svg = mount(DadsIcon, { props: { name: 'close', size: '1.5rem' } }).find('svg')
      expect(svg.attributes('width')).toBe('1.5rem')
    })
  })

  describe('accessibility', () => {
    it('is decorative (aria-hidden) without a label', () => {
      const svg = mount(DadsIcon, { props: { name: 'home' } }).find('svg')
      expect(svg.attributes('aria-hidden')).toBe('true')
      expect(svg.attributes('role')).toBeUndefined()
    })
    it('exposes role=img + aria-label when labelled', () => {
      const svg = mount(DadsIcon, { props: { name: 'home', label: 'ホーム' } }).find('svg')
      expect(svg.attributes('role')).toBe('img')
      expect(svg.attributes('aria-label')).toBe('ホーム')
      expect(svg.attributes('aria-hidden')).toBeUndefined()
    })
    it('has no axe violations (labelled)', async () => {
      const wrapper = mount(DadsIcon, { props: { name: 'settings', label: '設定' } })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })
  })

  it('renders an empty svg for an unknown name (no crash)', () => {
    const wrapper = mount(DadsIcon, { props: { name: 'no_such_icon_xyz' } })
    const svg = wrapper.find('svg')
    expect(svg.exists()).toBe(true)
    expect(svg.find('path').exists()).toBe(false)
  })
})
