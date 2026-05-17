<script setup lang="ts">
import { computed } from 'vue'
import type { DadsChipLabelProps } from './DadsChipLabel.types'

const props = withDefaults(defineProps<DadsChipLabelProps>(), {
  size: 'md',
  color: 'primary',
})

const rootClasses = computed(() => [
  'dads-chip-label',
  `dads-chip-label--${props.size}`,
  `dads-chip-label--${props.color}`,
])
</script>

<template>
  <span :class="rootClasses">
    <span v-if="$slots.prepend" class="dads-chip-label__prepend" aria-hidden="true">
      <slot name="prepend" />
    </span>
    <span class="dads-chip-label__text">
      <slot />
    </span>
    <span v-if="$slots.append" class="dads-chip-label__append" aria-hidden="true">
      <slot name="append" />
    </span>
  </span>
</template>

<style scoped lang="scss">
@use 'sass:list';
@use '../../styles/base' as base;

// Color tuple = (base, bg-subtle). Mirrors DadsChipTag so visual rhythm stays
// consistent across chip variants.
$dads-chip-label-colors: (
  primary: (
    --color-brand-primary,
    --color-info-bg,
  ),
  success: (
    --color-success,
    --color-success-bg,
  ),
  error: (
    --color-error,
    --color-error-bg,
  ),
  warning: (
    --color-warning,
    --color-warning-bg,
  ),
  secondary: (
    --color-brand-secondary,
    --color-bg-subtle,
  ),
);

.dads-chip-label {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-4, 0.25rem);
  border-radius: var(--border-radius-pill, 999px);
  border: 1px solid transparent;
  font-family: var(--font-family-sans, 'Noto Sans JP', sans-serif);
  font-weight: 500;
  line-height: var(--line-height-150, 1.5);
  white-space: nowrap;
  vertical-align: middle;

  // -------------------- size ----------------------------------------------
  &--lg {
    min-height: 2rem; // 32px
    padding: 0 var(--spacing-12, 0.75rem);
    font-size: var(--font-size-16, 1rem);
  }

  &--md {
    min-height: 1.75rem; // 28px
    padding: 0 var(--spacing-8, 0.5rem);
    font-size: var(--font-size-14, 0.875rem);
  }

  &--sm {
    min-height: 1.5rem; // 24px
    padding: 0 var(--spacing-8, 0.5rem);
    font-size: var(--font-size-12, 0.75rem);
  }

  // -------------------- slots ---------------------------------------------
  &__prepend,
  &__append {
    display: inline-flex;
    align-items: center;
    font-size: 1.1em;
    line-height: 1;
  }

  &__text {
    display: inline-flex;
    align-items: center;
  }

  // -------------------- color generated rules ----------------------------
  @each $name, $tokens in $dads-chip-label-colors {
    $base: list.nth($tokens, 1);
    $bg: list.nth($tokens, 2);

    &--#{$name} {
      background-color: var(#{$bg});
      color: var(#{$base});
      border-color: var(#{$base});
    }
  }

  // -------------------- forced colors -------------------------------------
  @include base.dads-forced-colors {
    border: 1px solid CanvasText;
  }
}
</style>
