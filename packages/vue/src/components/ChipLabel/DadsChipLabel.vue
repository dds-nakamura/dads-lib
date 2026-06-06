<script setup lang="ts">
import { computed } from 'vue'
import type { DadsChipLabelProps } from './DadsChipLabel.types'

const props = withDefaults(defineProps<DadsChipLabelProps>(), {
  size: 'md',
  color: 'primary',
  appearance: 'filled',
})

const rootClasses = computed(() => [
  'dads-chip-label',
  `dads-chip-label--${props.size}`,
  `dads-chip-label--${props.color}`,
  `dads-chip-label--appearance-${props.appearance}`,
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
// S-1b token correction: the previous `--color-*-bg` / `--color-brand-secondary`
// tokens do not exist in design-tokens (always fell back to inert literals).
// Mapped to the official primitive `*-50` subtle backgrounds and accents
// (chip-label.css uses primitive `*-50` for `--_bg`). Keeps the 5-semantic
// public `color` API unchanged; the full 12-hue redesign is deferred to A3.
$dads-chip-label-colors: (
  primary: (
    --color-primitive-blue-900,
    --color-primitive-blue-50,
  ),
  success: (
    --color-semantic-success-1,
    --color-primitive-green-50,
  ),
  error: (
    --color-semantic-error-1,
    --color-primitive-red-50,
  ),
  warning: (
    --color-semantic-warning-orange-1,
    --color-primitive-orange-50,
  ),
  secondary: (
    --color-primitive-orange-800,
    --color-neutral-solid-gray-50,
  ),
);

.dads-chip-label {
  display: inline-flex;
  align-items: center;
  gap: calc(4 / 16 * 1rem);
  // Official chip-label is an 8px-radius rectangle, not a pill.
  border-radius: calc(8 / 16 * 1rem);
  border: 1px solid transparent;
  font-family: var(--font-family-sans, 'Noto Sans JP', sans-serif);
  // Official typography: normal weight, line-height 1, letter-spacing 0.02em.
  font-weight: normal;
  line-height: 1;
  letter-spacing: 0.02em;
  white-space: nowrap;
  vertical-align: middle;

  // -------------------- size ----------------------------------------------
  &--lg {
    min-height: 2rem; // 32px
    padding: 0 calc(12 / 16 * 1rem);
    font-size: var(--font-size-16, 1rem);
  }

  &--md {
    min-height: 1.75rem; // 28px
    padding: 0 calc(8 / 16 * 1rem);
    font-size: var(--font-size-14, 0.875rem);
  }

  &--sm {
    min-height: 1.5rem; // 24px
    padding: 0 calc(8 / 16 * 1rem);
    // --font-size-12 does not exist in design-tokens; DADS minimum is 14px.
    font-size: var(--font-size-14, 0.875rem);
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

  // -------------------- color × appearance generated rules ---------------
  @each $name, $tokens in $dads-chip-label-colors {
    $base: list.nth($tokens, 1);
    $bg: list.nth($tokens, 2);

    // filled: tinted background + colored text/border
    &--appearance-filled.dads-chip-label--#{$name} {
      background-color: var(#{$bg});
      color: var(#{$base});
      border-color: var(#{$base});
    }

    // outlined: transparent background + colored border + colored text
    &--appearance-outlined.dads-chip-label--#{$name} {
      background-color: transparent;
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
