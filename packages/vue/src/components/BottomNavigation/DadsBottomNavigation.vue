<script setup lang="ts">
import type {
  DadsBottomNavigationEmits,
  DadsBottomNavigationItem,
  DadsBottomNavigationProps,
} from './DadsBottomNavigation.types'

withDefaults(defineProps<DadsBottomNavigationProps>(), {
  modelValue: undefined,
  ariaLabel: 'ボトムナビゲーション',
})

const emit = defineEmits<DadsBottomNavigationEmits>()

const isActive = (item: DadsBottomNavigationItem, modelValue?: string) =>
  modelValue !== undefined && item.id === modelValue

const onSelect = (item: DadsBottomNavigationItem, event: Event) => {
  if (item.disabled) {
    event.preventDefault()
    return
  }
  emit('update:modelValue', item.id)
  emit('change', item.id)
}

const itemClasses = (item: DadsBottomNavigationItem, modelValue?: string) => [
  'dads-bottom-navigation__item',
  {
    'dads-bottom-navigation__item--active': isActive(item, modelValue),
    'dads-bottom-navigation__item--disabled': item.disabled,
  },
]
</script>

<template>
  <nav :aria-label="ariaLabel" class="dads-bottom-navigation">
    <ul class="dads-bottom-navigation__list">
      <li v-for="item in items" :key="item.id" class="dads-bottom-navigation__list-item">
        <a
          v-if="item.href !== undefined"
          :href="item.disabled ? undefined : item.href"
          :aria-current="isActive(item, modelValue) ? 'page' : undefined"
          :aria-disabled="item.disabled ? 'true' : undefined"
          :tabindex="item.disabled ? -1 : undefined"
          :class="itemClasses(item, modelValue)"
          @click="onSelect(item, $event)"
        >
          <i :class="['mdi', item.iconName, 'dads-bottom-navigation__icon']" aria-hidden="true" />
          <span class="dads-bottom-navigation__label">{{ item.label }}</span>
        </a>
        <button
          v-else
          type="button"
          :aria-current="isActive(item, modelValue) ? 'page' : undefined"
          :disabled="item.disabled || undefined"
          :class="itemClasses(item, modelValue)"
          @click="onSelect(item, $event)"
        >
          <i :class="['mdi', item.iconName, 'dads-bottom-navigation__icon']" aria-hidden="true" />
          <span class="dads-bottom-navigation__label">{{ item.label }}</span>
        </button>
      </li>
    </ul>
  </nav>
</template>

<style scoped lang="scss">
@use '../../styles/base' as base;
@use '../../styles/focus-ring' as ring;

.dads-bottom-navigation {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  background-color: var(--color-bg-surface, #fff);
  border-top: 1px solid var(--color-border-default, rgba(0, 0, 0, 0.1));
  font-family: var(--font-family-sans, 'Noto Sans JP', sans-serif);
  color: var(--color-text-secondary, #4d4d4d);

  // -------------------- list --------------------------------------------
  &__list {
    display: flex;
    align-items: stretch;
    justify-content: space-around;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  &__list-item {
    flex: 1 1 0;
    display: flex;
  }

  // -------------------- item (button / anchor) --------------------------
  &__item {
    @include base.dads-reset-button;
    @include ring.dads-focus-ring;

    display: inline-flex;
    flex: 1 1 auto;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-4, 0.25rem);
    min-height: 3.5rem; // 56px — comfortable touch target on mobile
    padding: var(--spacing-8, 0.5rem) var(--spacing-4, 0.25rem);
    font-size: var(--font-size-12, 0.75rem);
    line-height: var(--line-height-150, 1.5);
    color: inherit;
    background-color: transparent;
    text-decoration: none;
    transition:
      color 0.15s ease,
      background-color 0.15s ease;

    &:hover {
      background-color: var(--color-bg-subtle, rgba(0, 0, 0, 0.04));
      color: var(--color-text-primary, #1a1a1a);
    }

    // -------------------- active --------------------------------------
    &--active {
      color: var(--color-brand-primary, #0017c1);

      &:hover {
        color: var(--color-brand-primary, #0017c1);
      }
    }

    // -------------------- disabled ------------------------------------
    &:disabled,
    &[aria-disabled='true'],
    &--disabled {
      color: var(--color-text-disabled, #999);
      cursor: not-allowed;
      pointer-events: none;
      opacity: 0.5;
    }
  }

  // -------------------- icon / label ------------------------------------
  &__icon {
    font-size: 1.5rem;
    line-height: 1;
  }

  &__label {
    display: block;
    text-align: center;
  }

  // -------------------- forced colors -----------------------------------
  @include base.dads-forced-colors {
    border-top: 1px solid CanvasText;

    .dads-bottom-navigation__item--active {
      outline: 1px solid CanvasText;
    }
  }
}
</style>
