<script setup lang="ts">
import { computed, useSlots } from 'vue'
import type { DadsDividerProps } from './DadsDivider.types'

const props = withDefaults(defineProps<DadsDividerProps>(), {
  orientation: 'horizontal',
  color: 'default',
  variant: 'full-width',
  thickness: 1,
  lineStyle: 'solid',
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
  `dads-divider--${props.variant}`,
  `dads-divider--thickness-${props.thickness}`,
  `dads-divider--style-${props.lineStyle}`,
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
  gap: calc(8 / 16 * 1rem);

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
    color: var(--color-neutral-solid-gray-700, #555);
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
  // For solid lines: use background-color on the line element.
  // For dashed lines: switch to border-top (border-style supports dashed
  // while background-color cannot).
  &--default &__line {
    background-color: var(--color-neutral-solid-gray-420, #949494);
  }

  &--strong &__line {
    background-color: var(--color-neutral-solid-gray-536, #767676);
  }

  // -------------------- width variants -----------------------------------
  &--inset {
    padding-inline: calc(16 / 16 * 1rem);
  }

  // -------------------- thickness -----------------------------------------
  &--horizontal#{'.dads-divider--thickness-1'} &__line {
    height: 1px;
  }
  &--horizontal#{'.dads-divider--thickness-2'} &__line {
    height: 2px;
  }
  &--horizontal#{'.dads-divider--thickness-3'} &__line {
    height: 3px;
  }
  &--horizontal#{'.dads-divider--thickness-4'} &__line {
    height: 4px;
  }
  &--vertical#{'.dads-divider--thickness-1'} &__line {
    width: 1px;
  }
  &--vertical#{'.dads-divider--thickness-2'} &__line {
    width: 2px;
  }
  &--vertical#{'.dads-divider--thickness-3'} &__line {
    width: 3px;
  }
  &--vertical#{'.dads-divider--thickness-4'} &__line {
    width: 4px;
  }

  // -------------------- line style ---------------------------------------
  // Dashed lines need a border-style approach instead of background-color
  // because background-color cannot render dashes. The line element loses
  // its colored background and gains a colored border edge.
  &--style-dashed &__line {
    background-color: transparent !important;
  }

  &--style-dashed.dads-divider--horizontal &__line {
    border-top: 1px dashed var(--color-neutral-solid-gray-420, #949494);
    height: 0;
  }

  &--style-dashed.dads-divider--vertical &__line {
    border-left: 1px dashed var(--color-neutral-solid-gray-420, #949494);
    width: 0;
  }

  &--style-dashed.dads-divider--strong.dads-divider--horizontal &__line {
    border-top-color: var(--color-neutral-solid-gray-536, #767676);
  }

  &--style-dashed.dads-divider--strong.dads-divider--vertical &__line {
    border-left-color: var(--color-neutral-solid-gray-536, #767676);
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
