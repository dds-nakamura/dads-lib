<script setup lang="ts">
import DadsIcon from '../Icon/DadsIcon.vue'
import type {
  DadsGlobalMenuEmits,
  DadsGlobalMenuItem,
  DadsGlobalMenuProps,
} from './DadsGlobalMenu.types'

withDefaults(defineProps<DadsGlobalMenuProps>(), {
  ariaLabel: 'グローバルメニュー',
})

const emit = defineEmits<DadsGlobalMenuEmits>()

// 子メニューを持つ項目は `<button>` で描画する (HTML reference / Storybook
// の `hasSubmenu` ロジックに準拠)。それ以外で href があれば `<a>`。
// disabled は両者共通で抑止対象。
const hasChildren = (item: DadsGlobalMenuItem): boolean =>
  Array.isArray(item.children) && item.children.length > 0

const isAnchor = (item: DadsGlobalMenuItem): boolean => Boolean(item.href) && !hasChildren(item)

const handleClick = (item: DadsGlobalMenuItem, event: MouseEvent) => {
  if (item.disabled) {
    event.preventDefault()
    return
  }
  emit('click:item', item, event)
}
</script>

<template>
  <nav class="dads-global-menu-root" :aria-label="ariaLabel">
    <ul class="dads-global-menu">
      <li v-for="(item, idx) in items" :key="idx" class="dads-global-menu__item">
        <a
          v-if="isAnchor(item)"
          class="dads-global-menu__item-inner"
          :href="item.disabled ? undefined : item.href"
          :aria-current="item.active ? 'page' : undefined"
          :aria-disabled="item.disabled ? 'true' : undefined"
          :tabindex="item.disabled ? -1 : undefined"
          @click="handleClick(item, $event)"
        >
          <DadsIcon
            v-if="item.frontIcon"
            :name="item.frontIcon"
            class="dads-global-menu__front-icon"
            :size="24"
          />
          <span class="dads-global-menu__label">{{ item.label }}</span>
        </a>
        <button
          v-else
          type="button"
          class="dads-global-menu__item-inner"
          :disabled="item.disabled || undefined"
          :aria-current="item.active ? 'page' : undefined"
          :aria-haspopup="hasChildren(item) ? 'menu' : undefined"
          :aria-expanded="hasChildren(item) ? Boolean(item.expanded) : undefined"
          @click="handleClick(item, $event)"
        >
          <DadsIcon
            v-if="item.frontIcon"
            :name="item.frontIcon"
            class="dads-global-menu__front-icon"
            :size="24"
          />
          <span class="dads-global-menu__label">{{ item.label }}</span>
          <DadsIcon
            v-if="hasChildren(item)"
            name="keyboard_arrow_down"
            class="dads-global-menu__chevron"
            :size="16"
          />
        </button>
      </li>
    </ul>
  </nav>
</template>

<style scoped lang="scss">
@use '../../styles/base' as base;
@use '../../styles/focus-ring' as ring;

.dads-global-menu-root {
  display: block;
  font-family: var(--font-family-sans, 'Noto Sans JP', sans-serif);
}

.dads-global-menu {
  margin: 0;
  display: flex;
  align-items: stretch;
  flex-wrap: wrap;
  border-bottom: 1px solid var(--color-neutral-solid-gray-420, #d6d6d6);
  padding: 0;
  color: var(--color-neutral-solid-gray-900, #1a1a1a);
  list-style-type: none;
  font-weight: bold;
  font-size: 1rem;
  line-height: 1.3;
  letter-spacing: 0;

  &__item {
    display: flex;
    align-items: stretch;
    position: relative;
  }

  &__item-inner {
    @include base.dads-reset-button;
    // Menu items fill the focus background with yellow-300 and round the
    // corners by 4px, matching the official global-menu focus treatment.
    @include ring.dads-focus-ring-fill;

    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    box-sizing: border-box;
    min-height: 4rem; // 64px
    border: 0;
    background-color: transparent;
    padding: 1rem 1.25rem;
    color: inherit;
    font: inherit;
    text-decoration: none;
    cursor: pointer;

    &[aria-disabled='true'] {
      cursor: not-allowed;
      opacity: 0.5;
      pointer-events: none;
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
      pointer-events: none;
    }
  }

  &__front-icon {
    flex-shrink: 0;
    width: 1.5rem;
    height: 1.5rem;
    font-size: 1.5rem;
    line-height: 1;
  }

  &__label {
    display: inline-block;
  }

  &__chevron {
    margin-top: 0.25rem;
    box-sizing: content-box;
    flex-shrink: 0;
    width: 1rem;
    height: 1rem;
    font-size: 1rem;
    line-height: 1;
    transition: transform 0.15s ease;
  }

  // -------------------- hover --------------------------------------------
  @media (hover: hover) {
    &__item-inner:not([aria-disabled='true']):not(:disabled):hover {
      background-color: var(--color-neutral-solid-gray-50, #f3f4f5);
    }

    &__item-inner:not([aria-disabled='true']):not(:disabled):hover::after {
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      border-bottom: 2px solid var(--color-neutral-black, #000);
      content: '';
    }
  }

  // -------------------- current ------------------------------------------
  // Official global-menu.css decorates the current item for any `aria-current`
  // value (not just `page`), so the selector matches the attribute regardless
  // of its value. The DOM/aria output is unchanged; this only widens which
  // states pick up the current styling.
  &__item-inner[aria-current] {
    background-color: var(--color-neutral-white, #fff);
    color: var(--color-primitive-blue-1000, #00118f);

    &::after {
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      border-bottom: 4px solid var(--color-primitive-blue-900, #0017c1);
      content: '';
    }

    @media (hover: hover) {
      &:hover {
        color: var(--color-primitive-blue-900, #0017c1);
        text-decoration: underline;
        text-decoration-thickness: 0.0625rem;
        text-underline-offset: 0.1875rem;
      }
    }

    // Keep the white current background when focused so the yellow focus
    // fill does not erase the current indicator (official: current focus
    // restores the white background).
    &:focus-visible {
      background-color: var(--color-neutral-white, #fff);
    }
  }

  // -------------------- expanded chevron ---------------------------------
  &__item-inner[aria-expanded='true'] &__chevron {
    transform: rotate(180deg);
  }

  // -------------------- forced colors ------------------------------------
  @include base.dads-forced-colors {
    border-bottom: 1px solid CanvasText;

    &__item-inner[aria-current] {
      color: Highlight;

      &::after {
        border-bottom-color: Highlight;
      }
    }

    &__item-inner:disabled,
    &__item-inner[aria-disabled='true'] {
      color: GrayText;
    }
  }
}
</style>
