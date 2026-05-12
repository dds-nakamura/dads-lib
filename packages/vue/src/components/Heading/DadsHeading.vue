<script setup lang="ts">
import { computed } from 'vue'
import type { DadsHeadingLevel, DadsHeadingProps } from './DadsHeading.types'

const props = withDefaults(defineProps<DadsHeadingProps>(), {
  as: 'h2',
})

// Tag names are statically typed h1..h6, so charAt(1) is always a digit
// between 1 and 6.
const effectiveLevel = computed<DadsHeadingLevel>(() => {
  if (props.level !== undefined) return props.level
  return Number(props.as.charAt(1)) as DadsHeadingLevel
})

const rootClasses = computed(() => ['dads-heading', `dads-heading--level-${effectiveLevel.value}`])
</script>

<template>
  <div :class="rootClasses">
    <component :is="as" class="dads-heading__title">
      <span v-if="$slots['prepend-icon']" class="dads-heading__icon" aria-hidden="true">
        <slot name="prepend-icon" />
      </span>
      <slot />
    </component>
    <p v-if="$slots.subtitle" class="dads-heading__subtitle">
      <slot name="subtitle" />
    </p>
  </div>
</template>

<style scoped lang="scss">
@use '../../styles/base' as base;

.dads-heading {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4, 0.25rem);
  font-family: var(--font-family-sans, 'Noto Sans JP', sans-serif);
  color: var(--color-text-primary, #1a1a1a);

  // Reset the native h1..h6 margin so the gap to the subtitle is controlled
  // solely by the parent flex `gap` (not accumulated UA defaults).
  &__title {
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-8, 0.5rem);
    margin: 0;
  }

  &__icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  &__subtitle {
    margin: 0;
    color: var(--color-text-secondary, #4d4d4d);
    font-size: var(--font-size-14, 0.875rem);
    line-height: var(--line-height-150, 1.5);
  }

  // Level sizes mirror frontend/src/styles/_typography.scss h1..h6 so the
  // visual scale matches native heading tags when `level` is independent
  // from `as`.
  &--level-1 .dads-heading__title {
    font-size: var(--font-size-32, 2rem);
    line-height: var(--line-height-130, 1.3);
    font-weight: 700;
  }

  &--level-2 .dads-heading__title {
    font-size: var(--font-size-28, 1.75rem);
    line-height: var(--line-height-130, 1.3);
    font-weight: 700;
  }

  &--level-3 .dads-heading__title {
    font-size: var(--font-size-24, 1.5rem);
    line-height: var(--line-height-130, 1.3);
    font-weight: 700;
  }

  &--level-4 .dads-heading__title {
    font-size: var(--font-size-20, 1.25rem);
    line-height: var(--line-height-140, 1.4);
    font-weight: 700;
  }

  &--level-5 .dads-heading__title {
    font-size: var(--font-size-18, 1.125rem);
    line-height: var(--line-height-140, 1.4);
    font-weight: 700;
  }

  &--level-6 .dads-heading__title {
    font-size: var(--font-size-16, 1rem);
    line-height: var(--line-height-150, 1.5);
    font-weight: 700;
  }

  @include base.dads-forced-colors {
    color: CanvasText;

    .dads-heading__title {
      color: CanvasText;
    }

    .dads-heading__icon {
      color: CanvasText;
    }

    .dads-heading__subtitle {
      color: GrayText;
    }
  }
}
</style>
