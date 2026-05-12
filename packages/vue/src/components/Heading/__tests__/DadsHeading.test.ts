import { afterEach, describe, expect, it } from 'vitest'
import { enableAutoUnmount, mount } from '@vue/test-utils'
import DadsHeading from '../DadsHeading.vue'
import type { DadsHeadingProps } from '../DadsHeading.types'

enableAutoUnmount(afterEach)

const createWrapper = (
  props: DadsHeadingProps = {},
  slots: Record<string, string> = { default: '見出しテキスト' },
) =>
  mount(DadsHeading, {
    props,
    slots,
    attachTo: document.body,
  })

describe('DadsHeading', () => {
  describe('rendering', () => {
    it('renders a root element with the dads-heading class', () => {
      const wrapper = createWrapper()
      expect(wrapper.classes()).toContain('dads-heading')
    })

    it('renders the default slot inside the title element', () => {
      const wrapper = createWrapper({}, { default: 'こんにちは' })
      const title = wrapper.find('.dads-heading__title')
      expect(title.exists()).toBe(true)
      expect(title.text()).toBe('こんにちは')
    })

    it('defaults to an <h2> element when `as` is not specified', () => {
      const wrapper = createWrapper()
      expect(wrapper.find('h2.dads-heading__title').exists()).toBe(true)
    })

    it('defaults to level-2 styling when `as` and `level` are both unspecified', () => {
      const wrapper = createWrapper()
      expect(wrapper.classes()).toContain('dads-heading--level-2')
    })

    it('renders an <h1> element when as=h1', () => {
      const wrapper = createWrapper({ as: 'h1' })
      expect(wrapper.find('h1.dads-heading__title').exists()).toBe(true)
    })

    it('renders an <h2> element when as=h2', () => {
      const wrapper = createWrapper({ as: 'h2' })
      expect(wrapper.find('h2.dads-heading__title').exists()).toBe(true)
    })

    it('renders an <h3> element when as=h3', () => {
      const wrapper = createWrapper({ as: 'h3' })
      expect(wrapper.find('h3.dads-heading__title').exists()).toBe(true)
    })

    it('renders an <h4> element when as=h4', () => {
      const wrapper = createWrapper({ as: 'h4' })
      expect(wrapper.find('h4.dads-heading__title').exists()).toBe(true)
    })

    it('renders an <h5> element when as=h5', () => {
      const wrapper = createWrapper({ as: 'h5' })
      expect(wrapper.find('h5.dads-heading__title').exists()).toBe(true)
    })

    it('renders an <h6> element when as=h6', () => {
      const wrapper = createWrapper({ as: 'h6' })
      expect(wrapper.find('h6.dads-heading__title').exists()).toBe(true)
    })
  })

  describe('level synchronization with `as`', () => {
    it('synchronizes level=1 when as=h1 and no level provided', () => {
      const wrapper = createWrapper({ as: 'h1' })
      expect(wrapper.classes()).toContain('dads-heading--level-1')
    })

    it('synchronizes level=3 when as=h3 and no level provided', () => {
      const wrapper = createWrapper({ as: 'h3' })
      expect(wrapper.classes()).toContain('dads-heading--level-3')
    })

    it('synchronizes level=6 when as=h6 and no level provided', () => {
      const wrapper = createWrapper({ as: 'h6' })
      expect(wrapper.classes()).toContain('dads-heading--level-6')
    })
  })

  describe('independent `as` and `level`', () => {
    it('keeps an <h1> element while applying level-3 visual styling', () => {
      const wrapper = createWrapper({ as: 'h1', level: 3 })
      expect(wrapper.find('h1.dads-heading__title').exists()).toBe(true)
      expect(wrapper.classes()).toContain('dads-heading--level-3')
      expect(wrapper.classes()).not.toContain('dads-heading--level-1')
    })

    it('keeps an <h6> element while applying level-1 visual styling', () => {
      const wrapper = createWrapper({ as: 'h6', level: 1 })
      expect(wrapper.find('h6.dads-heading__title').exists()).toBe(true)
      expect(wrapper.classes()).toContain('dads-heading--level-1')
      expect(wrapper.classes()).not.toContain('dads-heading--level-6')
    })

    it('only applies one level modifier at a time', () => {
      const wrapper = createWrapper({ as: 'h2', level: 5 })
      const levelClasses = wrapper.classes().filter((c) => c.startsWith('dads-heading--level-'))
      expect(levelClasses).toEqual(['dads-heading--level-5'])
    })
  })

  describe('subtitle slot', () => {
    it('does not render the subtitle wrapper when the slot is empty', () => {
      const wrapper = createWrapper()
      expect(wrapper.find('.dads-heading__subtitle').exists()).toBe(false)
    })

    it('renders the subtitle slot in a <p> after the heading', () => {
      const wrapper = createWrapper({}, { default: 'タイトル', subtitle: '補足説明' })
      const subtitle = wrapper.find('p.dads-heading__subtitle')
      expect(subtitle.exists()).toBe(true)
      expect(subtitle.text()).toBe('補足説明')
    })

    it('places the subtitle after the heading element in document order', () => {
      const wrapper = createWrapper({ as: 'h2' }, { default: 'タイトル', subtitle: 'サブ' })
      const children = Array.from(wrapper.element.children)
      expect(children[0].tagName.toLowerCase()).toBe('h2')
      expect(children[1].tagName.toLowerCase()).toBe('p')
    })
  })

  describe('prepend-icon slot', () => {
    it('does not render the icon wrapper when the slot is empty', () => {
      const wrapper = createWrapper()
      expect(wrapper.find('.dads-heading__icon').exists()).toBe(false)
    })

    it('renders the prepend-icon slot inside the title with aria-hidden', () => {
      const wrapper = createWrapper(
        {},
        {
          default: 'タイトル',
          'prepend-icon': '<i class="custom-icon" />',
        },
      )
      const icon = wrapper.find('.dads-heading__icon')
      expect(icon.exists()).toBe(true)
      expect(icon.attributes('aria-hidden')).toBe('true')
      expect(icon.find('i.custom-icon').exists()).toBe(true)
    })

    it('places the icon before the heading text inside the title', () => {
      const wrapper = createWrapper(
        {},
        {
          default: 'タイトル',
          'prepend-icon': '<span class="ic">★</span>',
        },
      )
      const title = wrapper.find('.dads-heading__title')
      const firstChild = title.element.firstElementChild
      expect(firstChild?.classList.contains('dads-heading__icon')).toBe(true)
    })
  })

  describe('reactivity', () => {
    it('switches the rendered element when `as` changes', async () => {
      const wrapper = createWrapper({ as: 'h2' })
      expect(wrapper.find('h2.dads-heading__title').exists()).toBe(true)
      await wrapper.setProps({ as: 'h4' })
      expect(wrapper.find('h2.dads-heading__title').exists()).toBe(false)
      expect(wrapper.find('h4.dads-heading__title').exists()).toBe(true)
    })

    it('updates level synchronization when `as` changes and level is unset', async () => {
      const wrapper = createWrapper({ as: 'h2' })
      expect(wrapper.classes()).toContain('dads-heading--level-2')
      await wrapper.setProps({ as: 'h5' })
      expect(wrapper.classes()).toContain('dads-heading--level-5')
      expect(wrapper.classes()).not.toContain('dads-heading--level-2')
    })

    it('keeps an explicit `level` even when `as` changes', async () => {
      const wrapper = createWrapper({ as: 'h1', level: 4 })
      expect(wrapper.classes()).toContain('dads-heading--level-4')
      await wrapper.setProps({ as: 'h6' })
      expect(wrapper.classes()).toContain('dads-heading--level-4')
      expect(wrapper.find('h6.dads-heading__title').exists()).toBe(true)
    })

    it('reverts to `as`-derived level when `level` is cleared', async () => {
      const wrapper = createWrapper({ as: 'h2', level: 5 })
      expect(wrapper.classes()).toContain('dads-heading--level-5')
      await wrapper.setProps({ level: undefined })
      expect(wrapper.classes()).toContain('dads-heading--level-2')
    })
  })

  describe('multiple instances', () => {
    it('renders independently when used twice with different props', () => {
      const wrapper = mount(
        {
          components: { DadsHeading },
          template: `
            <div>
              <DadsHeading as="h1" :level="3">A</DadsHeading>
              <DadsHeading as="h6" :level="1">B</DadsHeading>
            </div>
          `,
        },
        { attachTo: document.body },
      )
      const headings = wrapper.findAll('.dads-heading')
      expect(headings).toHaveLength(2)
      expect(headings[0].find('h1').exists()).toBe(true)
      expect(headings[0].classes()).toContain('dads-heading--level-3')
      expect(headings[1].find('h6').exists()).toBe(true)
      expect(headings[1].classes()).toContain('dads-heading--level-1')
    })
  })
})
