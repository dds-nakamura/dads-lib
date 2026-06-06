<script setup lang="ts">
import { computed, useSlots } from 'vue'
import type { DadsHeadingLevel, DadsHeadingProps } from './DadsHeading.types'

const props = withDefaults(defineProps<DadsHeadingProps>(), {
  as: 'h2',
})

const slots = useSlots()

// Tag names are statically typed h1..h6, so charAt(1) is always a digit
// between 1 and 6.
const effectiveLevel = computed<DadsHeadingLevel>(() => {
  if (props.level !== undefined) return props.level
  return Number(props.as.charAt(1)) as DadsHeadingLevel
})

const hasShoulder = computed(() => Boolean(props.shoulder) || Boolean(slots.shoulder))
const hasSubtitle = computed(() => Boolean(props.subtitle) || Boolean(slots.subtitle))
const hasChip = computed(() => Boolean(slots.chip))

// Per WHATWG HTML, <hgroup> can wrap a heading plus <p> elements for
// shoulder / subtitle. When neither is present we fall back to <div> to keep
// the DOM minimal and avoid an empty hgroup outline anomaly.
const rootTag = computed(() => (hasShoulder.value || hasSubtitle.value ? 'hgroup' : 'div'))

const rootClasses = computed(() => {
  const classes: (string | Record<string, boolean>)[] = [
    'dads-heading',
    `dads-heading--level-${effectiveLevel.value}`,
  ]
  if (props.size) classes.push(`dads-heading--size-${props.size}`)
  return classes
})
</script>

<template>
  <component :is="rootTag" :class="rootClasses">
    <p v-if="hasShoulder" class="dads-heading__shoulder">
      <slot name="shoulder">{{ shoulder }}</slot>
    </p>
    <component :is="as" class="dads-heading__title">
      <span v-if="$slots['prepend-icon'] || icon" class="dads-heading__icon" aria-hidden="true">
        <slot name="prepend-icon">
          <i v-if="icon" :class="['mdi', icon]" />
        </slot>
      </span>
      <span class="dads-heading__text">
        <slot />
      </span>
      <span v-if="hasChip" class="dads-heading__chip">
        <slot name="chip" />
      </span>
    </component>
    <p v-if="hasSubtitle" class="dads-heading__subtitle">
      <slot name="subtitle">{{ subtitle }}</slot>
    </p>
  </component>
</template>

<style scoped lang="scss">
@use '../../styles/base' as base;

.dads-heading {
  display: flex;
  flex-direction: column;
  gap: calc(4 / 16 * 1rem);
  font-family: var(--font-family-sans, 'Noto Sans JP', sans-serif);
  color: var(--color-neutral-solid-gray-800, #1a1a1a);

  &__shoulder {
    margin: 0;
    color: var(--color-neutral-solid-gray-700, #4d4d4d);
    font-size: var(--font-size-14, 0.875rem);
    line-height: var(--line-height-150, 1.5);
    font-weight: bold;
  }

  // Reset the native h1..h6 margin so the gap to the subtitle is controlled
  // solely by the parent flex `gap` (not accumulated UA defaults).
  &__title {
    display: inline-flex;
    align-items: center;
    gap: calc(8 / 16 * 1rem);
    margin: 0;
  }

  &__icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  &__text {
    display: inline-flex;
    align-items: center;
  }

  &__chip {
    display: inline-flex;
    align-items: center;
    margin-inline-start: calc(8 / 16 * 1rem);
    // Chip text should not inherit the heading's bold weight or large
    // font-size — let DadsChipLabel manage its own typography.
    font-weight: normal;
    font-size: var(--font-size-14, 0.875rem);
    line-height: 1.2;
  }

  &__subtitle {
    margin: 0;
    color: var(--color-neutral-solid-gray-700, #4d4d4d);
    font-size: var(--font-size-14, 0.875rem);
    line-height: var(--line-height-150, 1.5);
  }

  // Level sizes mirror frontend/src/styles/_typography.scss h1..h6 so the
  // visual scale matches native heading tags when `level` is independent
  // from `as`. The explicit `size` modifier (`--size-NN`) overrides these.
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

  // -------------------- explicit size overrides ---------------------------
  // 8 tokens from the DADS Figma scale (14 / 16 / 18 / 20 / 24 / 28 / 32 / 36).
  // Selector specificity matches `--level-N` so any of them wins over the
  // implicit level mapping.
  &--size-14 .dads-heading__title {
    font-size: var(--font-size-14, 0.875rem);
  }
  &--size-16 .dads-heading__title {
    font-size: var(--font-size-16, 1rem);
  }
  &--size-18 .dads-heading__title {
    font-size: var(--font-size-18, 1.125rem);
  }
  &--size-20 .dads-heading__title {
    font-size: var(--font-size-20, 1.25rem);
  }
  &--size-24 .dads-heading__title {
    font-size: var(--font-size-24, 1.5rem);
  }
  &--size-28 .dads-heading__title {
    font-size: var(--font-size-28, 1.75rem);
  }
  &--size-32 .dads-heading__title {
    font-size: var(--font-size-32, 2rem);
  }
  &--size-36 .dads-heading__title {
    font-size: var(--font-size-36, 2.25rem);
  }

  @include base.dads-forced-colors {
    color: CanvasText;

    .dads-heading__title {
      color: CanvasText;
    }

    .dads-heading__icon {
      color: CanvasText;
    }

    .dads-heading__shoulder,
    .dads-heading__subtitle {
      color: GrayText;
    }
  }
}
</style>
