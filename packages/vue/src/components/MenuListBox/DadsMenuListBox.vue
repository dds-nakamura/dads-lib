<script setup lang="ts">
import { computed } from 'vue'
import type {
  DadsMenuListBoxEmits,
  DadsMenuListBoxItem,
  DadsMenuListBoxProps,
} from './DadsMenuListBox.types'

const props = defineProps<DadsMenuListBoxProps>()
const emit = defineEmits<DadsMenuListBoxEmits>()

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
</script>

<template>
  <div class="dads-menu-list-box">
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
</template>

<style scoped lang="scss">
@use '../../styles/base' as base;
@use '../../styles/focus-ring' as ring;

.dads-menu-list-box {
  position: relative;
  display: block;
  width: max-content;
  max-width: 100%;
  box-sizing: border-box;
  border-radius: var(--border-radius-8, 0.5rem);
  border: 1px solid var(--color-neutral-solid-gray-420, #69707d);
  background-color: var(--color-neutral-white, #fff);
  padding: var(--spacing-16, 1rem) 0;
  box-shadow: var(--elevation-1, 0 1px 2px rgba(0, 0, 0, 0.08));
  font-family: var(--font-family-sans, 'Noto Sans JP', sans-serif);
  color: var(--color-text-primary, var(--color-neutral-solid-gray-800, #1a1a1a));
  font-size: var(--font-size-16, 1rem);
  line-height: 1.3;

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
    border: 1px solid CanvasText;

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
