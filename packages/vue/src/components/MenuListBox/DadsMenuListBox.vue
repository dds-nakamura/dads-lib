<script setup lang="ts">
import { computed, useId, watch } from 'vue'
import DadsIcon from '../Icon/DadsIcon.vue'
import type {
  DadsMenuListBoxEmits,
  DadsMenuListBoxItem,
  DadsMenuListBoxProps,
} from './DadsMenuListBox.types'

const props = withDefaults(defineProps<DadsMenuListBoxProps>(), {
  modelValue: false,
  triggerSize: 'md',
  triggerStyle: 'text',
  placement: 'start',
})
const emit = defineEmits<DadsMenuListBoxEmits>()

// Opener mode is detected by the presence of a trigger label. In standalone
// mode the popup is always visible regardless of modelValue, preserving the
// pre-2026-05 behaviour.
const hasOpener = computed(() => Boolean(props.triggerLabel))
const isOpen = computed(() => (hasOpener.value ? props.modelValue : true))

// Stable ids so the opener's aria-controls points at the popup and the menu
// can label itself from the opener (official uses aria-labelledby).
const popupId = useId()
const openerId = useId()

// Emit open / close lifecycle events only in Opener mode and only on real
// transitions (avoids spurious events on mount when modelValue starts true).
watch(
  () => props.modelValue,
  (open, prev) => {
    if (!hasOpener.value) return
    if (open === prev) return
    if (open) {
      emit('open')
    } else {
      emit('close')
    }
  },
)

const toggle = () => {
  if (!hasOpener.value) return
  emit('update:modelValue', !props.modelValue)
}

// Each item is paired up with derived flags once so that the template stays
// declarative and doesn't have to recompute booleans per attribute.
const renderedItems = computed(() =>
  props.items.map((item, index) => {
    const isLink = Boolean(item.href) && !item.disabled
    return { item, index, isLink }
  }),
)

const onItemClick = (item: DadsMenuListBoxItem, index: number, event: MouseEvent) => {
  if (item.disabled) {
    event.preventDefault()
    return
  }
  emit('click:item', item, index, event)
}

const rootClasses = computed(() => [
  'dads-menu-list-box',
  {
    'dads-menu-list-box--with-opener': hasOpener.value,
    [`dads-menu-list-box--placement-${props.placement}`]: hasOpener.value,
  },
])
</script>

<template>
  <div :class="rootClasses">
    <button
      v-if="hasOpener"
      :id="openerId"
      type="button"
      class="dads-menu-list-box__opener"
      :data-size="triggerSize"
      :data-style="triggerStyle"
      aria-haspopup="menu"
      :aria-expanded="isOpen ? 'true' : 'false'"
      :aria-controls="popupId"
      @click="toggle"
    >
      <DadsIcon
        v-if="triggerIcon"
        :name="triggerIcon"
        class="dads-menu-list-box__opener-icon"
        :size="20"
      />
      {{ triggerLabel }}
      <DadsIcon name="keyboard_arrow_down" class="dads-menu-list-box__opener-arrow" :size="16" />
    </button>
    <div v-show="isOpen" class="dads-menu-list-box__popup">
      <ul
        :id="popupId"
        class="dads-menu-list"
        role="menu"
        :aria-label="ariaLabel || undefined"
        :aria-labelledby="!ariaLabel && hasOpener ? openerId : undefined"
      >
        <li v-for="entry in renderedItems" :key="entry.index" role="presentation">
          <a
            v-if="entry.isLink"
            :href="entry.item.href"
            class="dads-menu-list__item"
            data-type="box"
            data-size="regular"
            role="menuitem"
            :aria-current="entry.item.active ? 'page' : undefined"
            :data-current="entry.item.active ? '' : undefined"
            @click="onItemClick(entry.item, entry.index, $event)"
          >
            <DadsIcon
              v-if="entry.item.iconName"
              :name="entry.item.iconName"
              class="dads-menu-list__front-icon"
              :size="24"
            />
            <span class="dads-menu-list__label">{{ entry.item.label }}</span>
          </a>
          <button
            v-else
            type="button"
            class="dads-menu-list__item"
            data-type="box"
            data-size="regular"
            role="menuitem"
            :disabled="entry.item.disabled"
            :aria-current="entry.item.active ? 'page' : undefined"
            :aria-disabled="entry.item.disabled || undefined"
            :data-current="entry.item.active ? '' : undefined"
            @click="onItemClick(entry.item, entry.index, $event)"
          >
            <DadsIcon
              v-if="entry.item.iconName"
              :name="entry.item.iconName"
              class="dads-menu-list__front-icon"
              :size="24"
            />
            <span class="dads-menu-list__label">{{ entry.item.label }}</span>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '../../styles/base' as base;

// =============================================================================
// MenuListBox — official markup parity.
// The popup item styles are ported from the shared menu-list.css (box variant)
// so the component renders the canonical `dads-menu-list` markup without
// importing the DadsMenuList component (lightweight T2 approach).
// =============================================================================

.dads-menu-list-box {
  position: relative;
  display: block;
  width: fit-content;
  color: var(--color-neutral-solid-gray-900, #1a1a1a);
  font-weight: normal;
  font-size: calc(16 / 16 * 1rem);
  line-height: 1.2;
  font-family: var(--font-family-sans, 'Noto Sans JP', sans-serif);
  letter-spacing: 0.02em;

  // -------------------- opener button (data-size / data-style) ----------
  &__opener {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    border-radius: calc(8 / 16 * 1rem);
    border: 0;
    background: transparent;
    padding-top: calc(4 / 16 * 1rem);
    padding-bottom: calc(4 / 16 * 1rem);
    color: inherit;
    font: inherit;
    letter-spacing: inherit;
    cursor: pointer;

    &[data-size='sm'] {
      min-height: calc(36 / 16 * 1rem);
      padding-right: calc(4 / 16 * 1rem);
      padding-left: calc(4 / 16 * 1rem);
      column-gap: calc(4 / 16 * 1rem);
    }

    &[data-size='md'] {
      min-height: calc(44 / 16 * 1rem);
      padding-right: calc(16 / 16 * 1rem);
      padding-left: calc(16 / 16 * 1rem);
      column-gap: calc(8 / 16 * 1rem);
    }

    &[data-style='outlined'] {
      border: 1px solid var(--color-neutral-solid-gray-420, #69707d);
      background-color: transparent;
    }

    &[data-style='filled'] {
      background-color: var(--color-neutral-solid-gray-50, #f5f5f5);
    }

    &[data-text-weight='bold'] {
      font-weight: bold;
    }

    @media (hover: hover) {
      &:hover {
        background-color: var(--color-neutral-solid-gray-50, #f5f5f5);
        text-decoration: underline;
        text-underline-offset: calc(3 / 16 * 1rem);
      }

      &[data-style='outlined']:hover {
        border-color: var(--color-neutral-black, #000);
      }

      &[data-style='filled']:hover {
        background-color: var(--color-neutral-solid-gray-100, #e6e6e6);
      }
    }

    &:focus-visible {
      outline: calc(4 / 16 * 1rem) solid var(--color-neutral-black, #000);
      outline-offset: calc(2 / 16 * 1rem);
      background-color: var(--color-primitive-yellow-300, #ffd43d);
      box-shadow: 0 0 0 calc(2 / 16 * 1rem) var(--color-primitive-yellow-300, #ffd43d);
    }

    &[data-style='filled']:focus-visible {
      background-color: var(--color-neutral-solid-gray-50, #f5f5f5);
    }

    &:focus:not(:focus-visible) {
      outline: none;
    }
  }

  &__opener-icon {
    flex-shrink: 0;
    width: calc(20 / 16 * 1rem);
    height: calc(20 / 16 * 1rem);
  }

  &__opener-arrow {
    margin-top: calc(4 / 16 * 1rem);
    flex-shrink: 0;
    width: calc(16 / 16 * 1rem);
    height: calc(16 / 16 * 1rem);
    transition: transform 0.15s ease;
  }

  &__opener[aria-expanded='true'] .dads-menu-list-box__opener-arrow {
    transform: rotate(180deg);
  }

  // -------------------- popup -------------------------------------------
  // In standalone mode (no opener) the popup lives inline as the only child.
  // In opener mode it is absolutely positioned beneath the opener.
  &__popup {
    box-sizing: border-box;
    width: max-content;
    max-height: calc((16 + 44 * 6.5) / 16 * 1rem);
    overflow-y: auto;
    // Official popup rounds only the leading side (8px 0 0 8px), hugging the
    // screen edge on the trailing side.
    border-radius: calc(8 / 16 * 1rem) 0 0 calc(8 / 16 * 1rem);
    border: 1px solid var(--color-neutral-solid-gray-420, #69707d);
    background-color: var(--color-neutral-white, #fff);
    padding: calc(16 / 16 * 1rem) 0;
    box-shadow: var(--elevation-1, 0 1px 2px rgba(0, 0, 0, 0.08));
  }

  &--with-opener &__popup {
    position: absolute;
    top: 100%;
    left: 0;
    margin-top: calc(4 / 16 * 1rem);
    z-index: 1;
  }

  &--placement-end &__popup {
    left: auto;
    right: 0;
    // Mirror the leading-side rounding so the rounded edge faces inward when
    // the popup is anchored to the trailing edge.
    border-radius: 0 calc(8 / 16 * 1rem) calc(8 / 16 * 1rem) 0;
  }

  // -------------------- shared menu-list (box variant) ------------------
  // Ported from menu-list.css so the popup uses the canonical class names
  // without importing the DadsMenuList component.
  .dads-menu-list {
    position: relative;
    z-index: 0;
    margin: 0;
    list-style-type: none;
    padding-left: 0;
    color: var(--color-neutral-solid-gray-800, #333);
    font-weight: normal;
    font-size: calc(16 / 16 * 1rem);
    line-height: 1.3;
    font-family: var(--font-family-sans, 'Noto Sans JP', sans-serif);
    letter-spacing: 0;
  }

  .dads-menu-list__item,
  .dads-menu-list__item:any-link {
    display: flex;
    align-items: center;
    column-gap: calc(8 / 16 * 1rem);
    box-sizing: border-box;
    width: -webkit-fill-available;
    width: -moz-available;
    width: stretch;
    border: 0;
    background-color: transparent;
    padding-right: calc(16 / 16 * 1rem);
    padding-left: calc(16 / 16 * 1rem);
    color: inherit;
    text-align: left;
    font: inherit;
    letter-spacing: inherit;
    text-decoration: none;
    text-decoration-thickness: calc(1 / 16 * 1rem);
    cursor: pointer;
  }

  .dads-menu-list__item[data-size='regular'] {
    min-height: calc(44 / 16 * 1rem);
    padding-top: calc(10 / 16 * 1rem);
    padding-bottom: calc(10 / 16 * 1rem);
    line-height: 1.3;
  }

  .dads-menu-list__item[data-size='small'] {
    min-height: calc(36 / 16 * 1rem);
    padding-top: calc(6 / 16 * 1rem);
    padding-bottom: calc(6 / 16 * 1rem);
    line-height: 1.2;
  }

  .dads-menu-list__item[data-type='box'] {
    border-radius: 0;
    padding-left: calc(16 / 16 * 1rem + 1rem * var(--menu-list-indentation, 0));
  }

  .dads-menu-list__item[data-current] {
    background-color: var(--color-primitive-blue-100, #e6efff);
    color: var(--color-primitive-blue-1000, #001a9c);
    font-weight: bold;
  }

  @media (hover: hover) {
    .dads-menu-list__item:hover {
      background-color: var(--color-neutral-solid-gray-50, #f5f5f5);
      text-decoration: underline;
      text-underline-offset: calc(3 / 16 * 1rem);
    }

    .dads-menu-list__item[data-current]:hover {
      background-color: var(--color-primitive-blue-50, #f0f5ff);
      color: var(--color-primitive-blue-900, #001480);
    }
  }

  .dads-menu-list__item:focus-visible {
    position: relative;
    z-index: 1;
    background-color: var(--color-primitive-yellow-300, #ffd43d);
  }

  .dads-menu-list__item[data-type='box']:focus-visible {
    outline: calc(4 / 16 * 1rem) solid var(--color-neutral-black, #000);
    outline-offset: calc(-4 / 16 * 1rem);
    box-shadow: inset 0 0 0 calc(6 / 16 * 1rem) var(--color-primitive-yellow-300, #ffd43d);
  }

  .dads-menu-list__item[data-current]:focus-visible {
    background-color: var(--color-primitive-blue-100, #e6efff);
  }

  // Disabled menu items: dim and block interaction. (Not present in the
  // official CSS but required for the disabled-item API.)
  .dads-menu-list__item:disabled,
  .dads-menu-list__item[aria-disabled='true'] {
    cursor: not-allowed;
    opacity: 0.5;
    pointer-events: none;
  }

  .dads-menu-list__front-icon {
    flex-shrink: 0;
  }

  // -------------------- forced colors -----------------------------------
  @include base.dads-forced-colors {
    &__popup {
      border: 1px solid CanvasText;
    }

    &__opener {
      border: 1px solid CanvasText;
    }

    .dads-menu-list__item {
      border: 1px solid transparent;

      &:focus-visible {
        outline: 2px solid CanvasText;
        outline-offset: -2px;
      }

      &[data-current] {
        border-color: CanvasText;
      }

      &:disabled,
      &[aria-disabled='true'] {
        color: GrayText;
      }
    }
  }
}
</style>
