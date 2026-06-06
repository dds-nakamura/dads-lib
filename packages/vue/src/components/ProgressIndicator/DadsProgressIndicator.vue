<script setup lang="ts">
import { computed } from 'vue'
import type { DadsProgressIndicatorProps } from './DadsProgressIndicator.types'

const props = withDefaults(defineProps<DadsProgressIndicatorProps>(), {
  variant: 'linear',
  size: 'md',
  color: 'primary',
  showLabel: false,
})

// SVG geometry. The inner circle has r=16 inside a 36×36 viewBox so the
// 3px-wide stroke clears the box edges. circumference is fixed at runtime
// because the geometry never changes — only stroke-dashoffset moves.
const CIRCLE_RADIUS = 16
const circumference = 2 * Math.PI * CIRCLE_RADIUS

const isIndeterminate = computed(() => props.value === undefined)

// Clamp the determinate value into [0, 100] so callers cannot push the
// progress bar past full or render a negative width / negative dashOffset.
const clampedValue = computed(() => {
  if (props.value === undefined) return undefined
  return Math.max(0, Math.min(100, props.value))
})

// `100% - value%` so the dasharray "uncovers" the active arc as the value
// climbs. At value=0 the entire stroke is offset (invisible); at value=100
// the offset is 0 (full ring).
const dashOffset = computed(() => {
  if (clampedValue.value === undefined) return undefined
  return circumference * (1 - clampedValue.value / 100)
})

const rootClasses = computed(() => [
  'dads-progress-indicator',
  `dads-progress-indicator--${props.variant}`,
  `dads-progress-indicator--${props.size}`,
  `dads-progress-indicator--color-${props.color}`,
  {
    'dads-progress-indicator--indeterminate': isIndeterminate.value,
  },
])

// Default label text for determinate mode. Indeterminate mode has no value
// to display, so we fall back to the caller-supplied label (if any) only.
const displayLabel = computed(() => {
  if (props.label !== undefined) return props.label
  if (isIndeterminate.value) return ''
  return `${clampedValue.value}%`
})
</script>

<template>
  <div
    :class="rootClasses"
    role="progressbar"
    :aria-valuemin="isIndeterminate ? undefined : 0"
    :aria-valuemax="isIndeterminate ? undefined : 100"
    :aria-valuenow="isIndeterminate ? undefined : clampedValue"
    :aria-label="ariaLabel"
  >
    <template v-if="variant === 'linear'">
      <div class="dads-progress-indicator__bar">
        <div
          class="dads-progress-indicator__bar-fill"
          :style="isIndeterminate ? undefined : { width: `${clampedValue}%` }"
        />
      </div>
    </template>
    <template v-else>
      <svg class="dads-progress-indicator__circle-svg" viewBox="0 0 36 36" aria-hidden="true">
        <circle
          class="dads-progress-indicator__circle-track"
          cx="18"
          cy="18"
          :r="CIRCLE_RADIUS"
          fill="none"
          stroke-width="3"
        />
        <circle
          class="dads-progress-indicator__circle-fill"
          cx="18"
          cy="18"
          :r="CIRCLE_RADIUS"
          fill="none"
          stroke-width="3"
          :stroke-dasharray="circumference"
          :stroke-dashoffset="isIndeterminate ? undefined : dashOffset"
        />
      </svg>
    </template>

    <span v-if="showLabel && displayLabel" class="dads-progress-indicator__label">
      {{ displayLabel }}
    </span>
  </div>
</template>

<style scoped lang="scss">
@use '../../styles/base' as base;

.dads-progress-indicator {
  display: inline-flex;
  align-items: center;
  gap: calc(8 / 16 * 1rem);
  font-family: var(--font-family-sans, 'Noto Sans JP', sans-serif);
  font-size: var(--font-size-16, 1rem);
  line-height: var(--line-height-170, 1.7);
  letter-spacing: 0.02em;
  color: var(--color-neutral-solid-gray-900, #1a1a1c);

  // -------------------- linear bar ---------------------------------------
  &__bar {
    position: relative;
    flex: 1 1 auto;
    width: 100%;
    height: 0.5rem; // md default; size modifiers override below.
    background-color: var(--color-primitive-blue-100, #e8f1fe);
    border-radius: var(--border-radius-4, 0.25rem);
    overflow: hidden;
  }

  &__bar-fill {
    height: 100%;
    background-color: var(--color-primitive-blue-1200, #0017c1);
    border-radius: inherit;
    transition: width 0.2s ease;
  }

  // -------------------- circular svg -------------------------------------
  // rotate(-90deg) so the stroke begins at 12 o'clock and progresses
  // clockwise — matching most platform progress rings.
  &__circle-svg {
    transform: rotate(-90deg);
    overflow: visible;
  }

  &__circle-track {
    stroke: var(--color-primitive-blue-100, #e8f1fe);
  }

  &__circle-fill {
    stroke: var(--color-primitive-blue-1200, #0017c1);
    stroke-linecap: round;
    transition: stroke-dashoffset 0.2s ease;
  }

  // -------------------- label --------------------------------------------
  &__label {
    min-width: 2ch;
    text-align: right;
    font-size: var(--font-size-16, 1rem);
    line-height: var(--line-height-170, 1.7);
    color: var(--color-neutral-solid-gray-900, #1a1a1c);
    font-variant-numeric: tabular-nums;
  }

  // -------------------- variant: linear ----------------------------------
  &--linear {
    width: 100%;
  }

  // -------------------- variant: circular --------------------------------
  &--circular {
    width: auto;
  }

  // -------------------- size: linear -------------------------------------
  &--linear.dads-progress-indicator--lg &__bar {
    height: 0.75rem; // 12px
  }
  &--linear.dads-progress-indicator--md &__bar {
    height: 0.5rem; // 8px
  }
  &--linear.dads-progress-indicator--sm &__bar {
    height: 0.25rem; // 4px
  }

  // -------------------- size: circular -----------------------------------
  &--circular.dads-progress-indicator--lg &__circle-svg {
    width: 3.5rem; // 56px
    height: 3.5rem;
  }
  &--circular.dads-progress-indicator--md &__circle-svg {
    width: 2.5rem; // 40px
    height: 2.5rem;
  }
  &--circular.dads-progress-indicator--sm &__circle-svg {
    width: 1.5rem; // 24px
    height: 1.5rem;
  }

  // -------------------- indeterminate animations -------------------------
  &--indeterminate.dads-progress-indicator--linear &__bar-fill {
    width: 40%;
    animation: dads-progress-linear-indeterminate 1.5s ease-in-out infinite;
  }

  &--indeterminate.dads-progress-indicator--circular &__circle-svg {
    animation: dads-progress-circular-rotate 1.4s linear infinite;
  }

  &--indeterminate.dads-progress-indicator--circular &__circle-fill {
    stroke-dasharray: 80, 200; // ~80% covered, 200% offset cycle
    transition: none;
    animation: dads-progress-circular-dash 1.4s ease-in-out infinite;
  }

  // -------------------- color variants -----------------------------------
  // Each semantic color overrides both the linear fill background and the
  // circular fill stroke. Track / background remains the same blue-100 tint.
  // Selector names match the generated `--color-{primary|secondary|success|
  // error|warning}` modifier classes and reference real DADS tokens only.
  // The official progress indicator is single-color (blue-1200); the extra
  // semantic colors are an existing @dads/vue API kept here with real tokens.
  &--color-primary &__bar-fill {
    background-color: var(--color-primitive-blue-1200, #0017c1);
  }
  &--color-primary &__circle-fill {
    stroke: var(--color-primitive-blue-1200, #0017c1);
  }
  &--color-secondary &__bar-fill {
    background-color: var(--color-neutral-solid-gray-536, #595959);
  }
  &--color-secondary &__circle-fill {
    stroke: var(--color-neutral-solid-gray-536, #595959);
  }
  &--color-success &__bar-fill {
    background-color: var(--color-semantic-success-1, #00876f);
  }
  &--color-success &__circle-fill {
    stroke: var(--color-semantic-success-1, #00876f);
  }
  &--color-error &__bar-fill {
    background-color: var(--color-semantic-error-1, #ec0000);
  }
  &--color-error &__circle-fill {
    stroke: var(--color-semantic-error-1, #ec0000);
  }
  &--color-warning &__bar-fill {
    background-color: var(--color-semantic-warning-yellow-2, #c47600);
  }
  &--color-warning &__circle-fill {
    stroke: var(--color-semantic-warning-yellow-2, #c47600);
  }

  // -------------------- forced-colors ------------------------------------
  @include base.dads-forced-colors {
    &__bar {
      background-color: Canvas;
      border: 1px solid CanvasText;
    }
    &__bar-fill {
      background-color: CanvasText;
    }
    &__circle-track {
      stroke: Canvas;
    }
    &__circle-fill {
      stroke: CanvasText;
    }
    &__label {
      color: CanvasText;
    }
  }
}

// Slide a fixed-width fill across the bar for indeterminate progress.
// translateX(-100%) parks the fill just off-screen left; 250% lets it travel
// fully out the right side before looping.
@keyframes dads-progress-linear-indeterminate {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(250%);
  }
}

// Continuous rotation pairs with the dash animation below to produce the
// classic "expanding / contracting arc that orbits" indeterminate spinner.
@keyframes dads-progress-circular-rotate {
  0% {
    transform: rotate(-90deg);
  }
  100% {
    transform: rotate(270deg);
  }
}

@keyframes dads-progress-circular-dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 100, 200;
    stroke-dashoffset: -15;
  }
  100% {
    stroke-dasharray: 100, 200;
    stroke-dashoffset: -125;
  }
}
</style>
