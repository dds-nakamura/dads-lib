<script setup lang="ts">
import { computed, useSlots } from 'vue'
import type { DadsDividerProps } from './DadsDivider.types'

const props = withDefaults(defineProps<DadsDividerProps>(), {
  orientation: 'horizontal',
  color: 'default',
})

const slots = useSlots()

// A label only makes sense for horizontal dividers — vertical orientation has
// no natural place to anchor centered text within a 1-px column. When the
// caller supplies a slot for a vertical divider we silently ignore it rather
// than crashing the layout.
const hasLabel = computed(() => Boolean(slots.default) && props.orientation === 'horizontal')

const rootClasses = computed(() => [
  `dads-divider--${props.orientation}`,
  `dads-divider--${props.color}`,
  {
    'dads-divider--with-label': hasLabel.value,
  },
])
</script>

<template>
  <div
    class="dads-divider"
    :class="rootClasses"
    role="separator"
    :aria-orientation="orientation"
    :aria-label="ariaLabel"
  >
    <template v-if="hasLabel">
      <span class="dads-divider__line" aria-hidden="true" />
      <span class="dads-divider__label"><slot /></span>
      <span class="dads-divider__line" aria-hidden="true" />
    </template>
    <template v-else>
      <span class="dads-divider__line" aria-hidden="true" />
    </template>
  </div>
</template>

<style scoped lang="scss">
@use '../../styles/base' as base;

.dads-divider {
  display: flex;
  align-items: center;
  gap: var(--spacing-8, 0.5rem);

  &__line {
    flex: 1 1 auto;
    // Background color is owned by the color modifiers below (`--default` /
    // `--strong`) so each variant lives in exactly one place — no base rule
    // to override and re-override.
  }

  &__label {
    flex: 0 0 auto;
    font-family: var(--font-family-sans, 'Noto Sans JP', sans-serif);
    font-size: var(--font-size-14, 0.875rem);
    line-height: var(--line-height-150, 1.5);
    color: var(--color-text-secondary, #555);
  }

  // -------------------- orientation --------------------------------------
  &--horizontal {
    flex-direction: row;
    width: 100%;
  }

  &--horizontal &__line {
    height: 1px;
    width: auto;
  }

  &--vertical {
    flex-direction: column;
    height: 100%;
  }

  &--vertical &__line {
    width: 1px;
    height: 100%;
  }

  // -------------------- color variants -----------------------------------
  // `--default` is the canonical state — listed explicitly so the modifier is
  // observable in tests and downstream overrides can target it without leaking
  // into the strong variant.
  &--default &__line {
    background-color: var(--color-border-default, rgba(0, 0, 0, 0.1));
  }

  &--strong &__line {
    background-color: var(--color-border-strong, rgba(0, 0, 0, 0.3));
  }

  // -------------------- forced colors ------------------------------------
  // High contrast mode replaces the tinted background with the system border
  // color so the line stays visible without relying on opacity tricks.
  @include base.dads-forced-colors {
    &__line {
      background-color: CanvasText;
    }

    &__label {
      color: CanvasText;
    }
  }
}
</style>
