import { afterEach, describe, expect, it } from 'vitest'
import { enableAutoUnmount, mount } from '@vue/test-utils'
import { axe } from 'vitest-axe'
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

  // ----------------------------------------------------------------------
  // hgroup wrapping — DADS specifies the heading is grouped with shoulder
  // and subtitle inside <hgroup> so SR users hear them as a single unit.
  // We render <hgroup> only when there is something to group; otherwise
  // <div> keeps the DOM minimal.
  // ----------------------------------------------------------------------
  describe('hgroup wrapping', () => {
    it('renders <div> as the root when neither shoulder nor subtitle is present', () => {
      const wrapper = createWrapper()
      expect(wrapper.element.tagName).toBe('DIV')
    })

    it('renders <hgroup> as the root when only shoulder is present', () => {
      const wrapper = createWrapper({ shoulder: 'カテゴリ' })
      expect(wrapper.element.tagName).toBe('HGROUP')
    })

    it('renders <hgroup> as the root when only subtitle is present', () => {
      const wrapper = createWrapper({ subtitle: '補足' })
      expect(wrapper.element.tagName).toBe('HGROUP')
    })

    it('renders <hgroup> as the root when both shoulder and subtitle are present', () => {
      const wrapper = createWrapper({ shoulder: 'カテゴリ', subtitle: '補足' })
      expect(wrapper.element.tagName).toBe('HGROUP')
    })
  })

  // ----------------------------------------------------------------------
  // shoulder — text rendered above the heading inside <hgroup>, supports
  // both prop (string convenience) and slot (custom markup).
  // ----------------------------------------------------------------------
  describe('shoulder', () => {
    it('does not render the shoulder element when neither prop nor slot is provided', () => {
      const wrapper = createWrapper()
      expect(wrapper.find('.dads-heading__shoulder').exists()).toBe(false)
    })

    it('renders the shoulder prop as a <p> before the heading', () => {
      const wrapper = createWrapper({ shoulder: 'カテゴリラベル' })
      const shoulder = wrapper.find('p.dads-heading__shoulder')
      expect(shoulder.exists()).toBe(true)
      expect(shoulder.text()).toBe('カテゴリラベル')
    })

    it('places the shoulder before the heading element in document order', () => {
      const wrapper = createWrapper({ as: 'h2', shoulder: 'カテゴリ' })
      const children = Array.from(wrapper.element.children)
      expect(children[0].classList.contains('dads-heading__shoulder')).toBe(true)
      expect(children[1].tagName.toLowerCase()).toBe('h2')
    })

    it('renders the shoulder slot in place of the prop value when both provided', () => {
      const wrapper = createWrapper(
        { shoulder: 'プロップ値' },
        { default: 'タイトル', shoulder: '<span class="custom">スロット値</span>' },
      )
      const shoulder = wrapper.find('.dads-heading__shoulder')
      expect(shoulder.find('.custom').text()).toBe('スロット値')
      // The prop string should NOT appear when the slot is used.
      expect(shoulder.text()).not.toBe('プロップ値')
    })
  })

  // ----------------------------------------------------------------------
  // subtitle prop — string convenience matching the slot variant.
  // ----------------------------------------------------------------------
  describe('subtitle prop', () => {
    it('renders the subtitle prop as a <p> after the heading', () => {
      const wrapper = createWrapper({ subtitle: 'プロップ補足' })
      const subtitle = wrapper.find('p.dads-heading__subtitle')
      expect(subtitle.exists()).toBe(true)
      expect(subtitle.text()).toBe('プロップ補足')
    })

    it('renders the subtitle slot in place of the prop value when both provided', () => {
      const wrapper = createWrapper(
        { subtitle: 'プロップ値' },
        { default: 'タイトル', subtitle: '<span class="custom">スロット値</span>' },
      )
      const subtitle = wrapper.find('.dads-heading__subtitle')
      expect(subtitle.find('.custom').text()).toBe('スロット値')
    })
  })

  // ----------------------------------------------------------------------
  // icon prop — MDI class convenience matching the prepend-icon slot.
  // ----------------------------------------------------------------------
  describe('icon prop', () => {
    it('renders the icon prop as <i class="mdi {icon}"> inside the icon wrapper', () => {
      const wrapper = createWrapper({ icon: 'mdi-information' })
      const icon = wrapper.find('.dads-heading__icon')
      expect(icon.exists()).toBe(true)
      expect(icon.find('i.mdi.mdi-information').exists()).toBe(true)
      expect(icon.attributes('aria-hidden')).toBe('true')
    })

    it('renders the prepend-icon slot in place of the icon prop when both provided', () => {
      const wrapper = createWrapper(
        { icon: 'mdi-information' },
        { default: 'タイトル', 'prepend-icon': '<span class="custom-svg">★</span>' },
      )
      const icon = wrapper.find('.dads-heading__icon')
      expect(icon.find('.custom-svg').exists()).toBe(true)
      // The MDI class wrapper should NOT appear when slot is used.
      expect(icon.find('i.mdi').exists()).toBe(false)
    })
  })

  // ----------------------------------------------------------------------
  // chip slot — inline badge alongside the heading text.
  // ----------------------------------------------------------------------
  describe('chip slot', () => {
    it('does not render the chip wrapper when the slot is empty', () => {
      const wrapper = createWrapper()
      expect(wrapper.find('.dads-heading__chip').exists()).toBe(false)
    })

    it('renders the chip slot inside the title element', () => {
      const wrapper = createWrapper(
        {},
        { default: 'タイトル', chip: '<span class="badge">NEW</span>' },
      )
      const title = wrapper.find('.dads-heading__title')
      const chip = title.find('.dads-heading__chip')
      expect(chip.exists()).toBe(true)
      expect(chip.find('.badge').text()).toBe('NEW')
    })

    it('places the chip after the heading text inside the title', () => {
      const wrapper = createWrapper(
        {},
        { default: 'タイトル', chip: '<span class="badge">NEW</span>' },
      )
      const title = wrapper.find('.dads-heading__title')
      const text = title.find('.dads-heading__text')
      const chip = title.find('.dads-heading__chip')
      // Chip should come AFTER text in DOM order.
      const titleChildren = Array.from(title.element.children)
      expect(titleChildren.indexOf(text.element)).toBeLessThan(titleChildren.indexOf(chip.element))
    })
  })

  // ----------------------------------------------------------------------
  // size prop — explicit font-size token from the DADS scale (14..36 px),
  // independent of level and as.
  // ----------------------------------------------------------------------
  describe('size prop', () => {
    it.each(['14', '16', '18', '20', '24', '28', '32', '36'] as const)(
      'applies the dads-heading--size-%s modifier when size=%s',
      (size) => {
        const wrapper = createWrapper({ size })
        expect(wrapper.classes()).toContain(`dads-heading--size-${size}`)
      },
    )

    it('does not apply a size modifier when size is unspecified', () => {
      const wrapper = createWrapper()
      const sizeClasses = wrapper.classes().filter((c) => c.startsWith('dads-heading--size-'))
      expect(sizeClasses).toEqual([])
    })

    it('keeps both level and size modifiers when both are set (size wins via CSS specificity)', () => {
      const wrapper = createWrapper({ level: 3, size: '20' })
      expect(wrapper.classes()).toContain('dads-heading--level-3')
      expect(wrapper.classes()).toContain('dads-heading--size-20')
    })
  })

  // ----------------------------------------------------------------------
  // Composition — shoulder + heading + chip + subtitle inside <hgroup>
  // ----------------------------------------------------------------------
  describe('composition with all parts', () => {
    it('renders shoulder + heading (with icon + chip) + subtitle inside <hgroup>', () => {
      const wrapper = createWrapper(
        { as: 'h1', shoulder: 'カテゴリA', subtitle: '補足説明', icon: 'mdi-bookmark' },
        { default: 'メインタイトル', chip: '<span class="badge">NEW</span>' },
      )
      expect(wrapper.element.tagName).toBe('HGROUP')
      const children = Array.from(wrapper.element.children)
      expect(children[0].classList.contains('dads-heading__shoulder')).toBe(true)
      expect(children[1].tagName.toLowerCase()).toBe('h1')
      expect(children[2].classList.contains('dads-heading__subtitle')).toBe(true)

      const title = wrapper.find('.dads-heading__title')
      expect(title.find('.dads-heading__icon i.mdi.mdi-bookmark').exists()).toBe(true)
      expect(title.find('.dads-heading__text').text()).toBe('メインタイトル')
      expect(title.find('.dads-heading__chip .badge').text()).toBe('NEW')
    })
  })

  describe('a11y (vitest-axe)', () => {
    it.each(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const)(
      'has no violations with as=%s',
      async (as) => {
        const wrapper = createWrapper({ as }, { default: '見出し' })
        expect(await axe(wrapper.element)).toHaveNoViolations()
      },
    )

    it('has no violations with shoulder + subtitle (hgroup wrapper)', async () => {
      const wrapper = createWrapper(
        { as: 'h1', shoulder: 'カテゴリA', subtitle: '補足説明' },
        { default: 'メインタイトル' },
      )
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations with an icon glyph', async () => {
      const wrapper = createWrapper({ as: 'h2', icon: 'mdi-bookmark' }, { default: 'タイトル' })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })
  })
})
