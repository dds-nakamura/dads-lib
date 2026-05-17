<script setup lang="ts">
import { computed, useId, watch } from 'vue'
import type {
  DadsMenuListBoxEmits,
  DadsMenuListBoxItem,
  DadsMenuListBoxProps,
} from './DadsMenuListBox.types'

const props = withDefaults(defineProps<DadsMenuListBoxProps>(), {
  modelValue: false,
  triggerSize: 'md',
  placement: 'start',
})
const emit = defineEmits<DadsMenuListBoxEmits>()

// Opener mode is detected by the presence of a trigger label. In standalone
// mode the box is always visible regardless of modelValue, preserving the
// pre-2026-05 behaviour.
const hasOpener = computed(() => Boolean(props.triggerLabel))
const isOpen = computed(() => (hasOpener.value ? props.modelValue : true))

// Stable id so the opener's aria-controls points to the right box.
const surfaceId = useId()

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

const triggerClasses = computed(() => [
  'dads-menu-list-box__trigger',
  `dads-menu-list-box__trigger--${props.triggerSize}`,
])
</script>

<template>
  <div :class="rootClasses">
    <button
      v-if="hasOpener"
      type="button"
      :class="triggerClasses"
      :aria-expanded="isOpen ? 'true' : 'false'"
      :aria-controls="surfaceId"
      @click="toggle"
    >
      <i
        v-if="triggerIcon"
        :class="['mdi', triggerIcon, 'dads-menu-list-box__trigger-icon']"
        aria-hidden="true"
      />
      <span class="dads-menu-list-box__trigger-label">{{ triggerLabel }}</span>
      <i class="mdi mdi-chevron-down dads-menu-list-box__trigger-caret" aria-hidden="true" />
    </button>
    <div v-show="isOpen" :id="surfaceId" class="dads-menu-list-box__surface">
      <ul class="dads-menu-list-box__list" role="menu" :aria-label="ariaLabel">
        <li
          v-for="entry in renderedItems"
          :key="entry.index"
          class="dads-menu-list-box__list-item"
          role="presentation"
        >
          <a
            v-if="entry.isLink"
            :href="entry.item.href"
            class="dads-menu-list-box__item"
            :class="{
              'dads-menu-list-box__item--active': entry.item.active,
              'dads-menu-list-box__item--disabled': entry.item.disabled,
            }"
            role="menuitem"
            :aria-current="entry.item.active ? 'page' : undefined"
            :aria-disabled="entry.item.disabled || undefined"
            :data-current="entry.item.active ? '' : undefined"
            @click="onItemClick(entry.item, entry.index, $event)"
          >
            <i
              v-if="entry.item.iconName"
              :class="['mdi', entry.item.iconName, 'dads-menu-list-box__item-icon']"
              aria-hidden="true"
            />
            <span class="dads-menu-list-box__item-body">
              <span class="dads-menu-list-box__item-label">{{ entry.item.label }}</span>
              <span v-if="entry.item.description" class="dads-menu-list-box__item-description">
                {{ entry.item.description }}
              </span>
            </span>
          </a>
          <button
            v-else
            type="button"
            class="dads-menu-list-box__item"
            :class="{
              'dads-menu-list-box__item--active': entry.item.active,
              'dads-menu-list-box__item--disabled': entry.item.disabled,
            }"
            role="menuitem"
            :disabled="entry.item.disabled"
            :aria-current="entry.item.active ? 'page' : undefined"
            :aria-disabled="entry.item.disabled || undefined"
            :data-current="entry.item.active ? '' : undefined"
            @click="onItemClick(entry.item, entry.index, $event)"
          >
            <i
              v-if="entry.item.iconName"
              :class="['mdi', entry.item.iconName, 'dads-menu-list-box__item-icon']"
              aria-hidden="true"
            />
            <span class="dads-menu-list-box__item-body">
              <span class="dads-menu-list-box__item-label">{{ entry.item.label }}</span>
              <span v-if="entry.item.description" class="dads-menu-list-box__item-description">
                {{ entry.item.description }}
              </span>
            </span>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '../../styles/base' as base;
@use '../../styles/focus-ring' as ring;

.dads-menu-list-box {
  position: relative;
  display: inline-block;
  font-family: var(--font-family-sans, 'Noto Sans JP', sans-serif);
  color: var(--color-text-primary, var(--color-neutral-solid-gray-800, #1a1a1a));
  font-size: var(--font-size-16, 1rem);
  line-height: 1.3;

  // -------------------- trigger button ----------------------------------
  &__trigger {
    @include base.dads-reset-button;
    @include ring.dads-focus-ring;

    display: inline-flex;
    align-items: center;
    gap: var(--spacing-8, 0.5rem);
    padding: var(--spacing-8, 0.5rem) var(--spacing-12, 0.75rem);
    border: 1px solid var(--color-neutral-solid-gray-420, #69707d);
    border-radius: var(--border-radius-4, 0.25rem);
    background-color: var(--color-neutral-white, #fff);
    color: inherit;
    font: inherit;
    cursor: pointer;
    transition: background-color 0.15s ease;

    &:hover {
      background-color: var(--color-neutral-solid-gray-50, #f5f5f5);
    }

    // Indicate open state on the caret.
    &[aria-expanded='true'] .dads-menu-list-box__trigger-caret {
      transform: rotate(180deg);
    }

    &--sm {
      min-height: 2rem;
      padding: var(--spacing-4, 0.25rem) var(--spacing-8, 0.5rem);
      font-size: var(--font-size-14, 0.875rem);
    }

    &--md {
      min-height: 2.5rem;
      font-size: var(--font-size-16, 1rem);
    }

    &--lg {
      min-height: 3rem;
      padding: var(--spacing-12, 0.75rem) var(--spacing-16, 1rem);
      font-size: var(--font-size-18, 1.125rem);
    }
  }

  &__trigger-icon {
    font-size: 1.25em;
    line-height: 1;
  }

  &__trigger-label {
    flex: 1 1 auto;
  }

  &__trigger-caret {
    font-size: 1.25em;
    line-height: 1;
    transition: transform 0.15s ease;
  }

  // -------------------- surface (the boxed menu) ------------------------
  // In standalone mode (no opener), the surface lives inline as the only
  // child. In opener mode, it is absolutely positioned beneath the trigger.
  &__surface {
    width: max-content;
    max-width: 100%;
    box-sizing: border-box;
    border-radius: var(--border-radius-8, 0.5rem);
    border: 1px solid var(--color-neutral-solid-gray-420, #69707d);
    background-color: var(--color-neutral-white, #fff);
    padding: var(--spacing-16, 1rem) 0;
    box-shadow: var(--elevation-1, 0 1px 2px rgba(0, 0, 0, 0.08));
  }

  &--with-opener &__surface {
    position: absolute;
    top: 100%;
    margin-top: var(--spacing-4, 0.25rem);
    z-index: 10;
  }

  &--placement-start &__surface {
    inset-inline-start: 0;
  }

  &--placement-end &__surface {
    inset-inline-end: 0;
  }

  // -------------------- list --------------------------------------------
  &__list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
  }

  &__list-item {
    display: block;
  }

  // -------------------- item --------------------------------------------
  &__item {
    @include base.dads-reset-button;

    display: flex;
    align-items: flex-start;
    column-gap: var(--spacing-8, 0.5rem);
    box-sizing: border-box;
    width: 100%;
    min-height: calc(44 / 16 * 1rem);
    padding: var(--spacing-12, 0.75rem) var(--spacing-16, 1rem);
    border: 0;
    background-color: transparent;
    color: inherit;
    text-decoration: none;
    text-align: start;
    font: inherit;
    cursor: pointer;

    &:focus-visible {
      position: relative;
      z-index: 1;
      outline: calc(4 / 16 * 1rem) solid var(--color-neutral-black, #000);
      outline-offset: calc(-4 / 16 * 1rem);
      box-shadow: inset 0 0 0 calc(6 / 16 * 1rem) var(--color-primitive-yellow-300, #ffd43d);
      background-color: var(--color-primitive-yellow-300, #ffd43d);
    }

    @media (hover: hover) {
      &:hover:not(.dads-menu-list-box__item--disabled) {
        background-color: var(--color-neutral-solid-gray-50, #f5f5f5);
        text-decoration: underline;
        text-underline-offset: calc(3 / 16 * 1rem);
      }
    }

    &--active {
      background-color: var(--color-primitive-blue-100, #e6efff);
      color: var(--color-primitive-blue-1000, #001a9c);
      font-weight: bold;

      @media (hover: hover) {
        &:hover {
          background-color: var(--color-primitive-blue-50, #f0f5ff);
          color: var(--color-primitive-blue-900, #001480);
        }
      }
    }

    &--disabled {
      cursor: not-allowed;
      opacity: 0.5;
      pointer-events: none;
    }
  }

  &__item-icon {
    flex-shrink: 0;
    font-size: 1.25em;
    line-height: 1;
    margin-top: 0.125em;
  }

  &__item-body {
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    min-width: 0;
  }

  &__item-label {
    display: block;
    font-weight: inherit;
  }

  &__item-description {
    display: block;
    margin-top: calc(2 / 16 * 1rem);
    font-size: var(--font-size-14, 0.875rem);
    line-height: 1.4;
    font-weight: normal;
    color: var(--color-text-secondary, var(--color-neutral-solid-gray-700, #595959));
  }

  // -------------------- forced colors -----------------------------------
  @include base.dads-forced-colors {
    &__surface {
      border: 1px solid CanvasText;
    }

    &__trigger {
      border: 1px solid CanvasText;
    }

    &__item {
      border: 1px solid transparent;

      &:focus-visible {
        outline: 2px solid CanvasText;
        outline-offset: -2px;
      }

      &--active {
        border-color: CanvasText;
      }

      &--disabled {
        color: GrayText;
      }
    }
  }
}
</style>
