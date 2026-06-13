<script setup lang="ts">
import { computed, useId } from 'vue'
import type { DadsProgressIndicatorProps } from './DadsProgressIndicator.types'

const props = withDefaults(defineProps<DadsProgressIndicatorProps>(), {
  type: 'stacked',
  indicator: 'linear',
  active: true,
  showPercentage: false,
})

const labelId = useId()

// Determinate when a numeric value is supplied; indeterminate (loop) otherwise.
const isIndeterminate = computed(() => props.value === undefined)

// Clamp the determinate value into [0, 100] so callers cannot push the bar past
// full or render a negative dashoffset.
const clampedValue = computed(() => {
  if (props.value === undefined) return undefined
  return Math.max(0, Math.min(100, props.value))
})

// Rounded integer used for the visible "(NN%)" readout and aria-valuenow.
const roundedValue = computed(() =>
  clampedValue.value === undefined ? undefined : Math.round(clampedValue.value),
)

// SVG dimensions follow the official html: stacked/underlay use the large form,
// inlined uses the compact form. Linear is a fixed-width line; spinner is a
// square ring.
const isInlined = computed(() => props.type === 'inlined')

const linearWidth = computed(() => (isInlined.value ? 80 : 240))
const spinnerSize = computed(() => (isInlined.value ? 24 : 48))
// Spinner geometry per official html (large 48 / compact 24 viewBoxes).
const spinnerGeometry = computed(() =>
  isInlined.value
    ? { cx: 12, cy: 12, r: 8, strokeWidth: 3, borderR: 9.5 }
    : { cx: 24, cy: 24, r: 22, strokeWidth: 4, borderR: 23.5 },
)

// The official CSS drives the bar via `--value` and `stroke-dashoffset`.
const valueStyle = computed(() =>
  clampedValue.value === undefined ? undefined : { '--value': String(clampedValue.value) },
)

// Accessible name: prefer the visible label (aria-labelledby), else ariaLabel.
const useLabelledBy = computed(() => Boolean(props.label))
</script>

<template>
  <div
    class="dads-progress-indicator"
    :class="{ 'dads-progress-indicator--inactive': !active }"
    :data-type="type"
    role="progressbar"
    aria-valuemin="0"
    aria-valuemax="100"
    :aria-valuenow="isIndeterminate ? undefined : roundedValue"
    :aria-labelledby="useLabelledBy ? labelId : undefined"
    :aria-label="useLabelledBy ? undefined : ariaLabel"
    :style="valueStyle"
  >
    <!-- Linear: rectangular SVG line bar + 1px blue-1200 underline accent. -->
    <svg
      v-if="indicator === 'linear'"
      class="dads-progress-indicator__linear"
      :width="linearWidth"
      height="4"
      :viewBox="`0 0 ${linearWidth} 4`"
      stroke="currentcolor"
      fill="none"
      aria-hidden="true"
      :data-indeterminate="isIndeterminate ? '' : undefined"
    >
      <line
        class="dads-progress-indicator__track"
        x1="0"
        y1="2"
        :x2="linearWidth"
        y2="2"
        stroke-width="4"
      />
      <line
        class="dads-progress-indicator__bar"
        x1="0"
        y1="2"
        :x2="linearWidth"
        y2="2"
        stroke-width="4"
        pathLength="100"
      />
      <line
        class="dads-progress-indicator__border"
        x1="0"
        y1="3.5"
        :x2="linearWidth"
        y2="3.5"
        stroke-width="1"
      />
    </svg>

    <!-- Spinner: nested <g> ring with cubic-bezier double-rotation animation. -->
    <svg
      v-else
      class="dads-progress-indicator__spinner"
      :width="spinnerSize"
      :height="spinnerSize"
      :viewBox="`0 0 ${spinnerSize} ${spinnerSize}`"
      stroke="currentcolor"
      fill="none"
      aria-hidden="true"
      :data-indeterminate="isIndeterminate ? '' : undefined"
    >
      <circle
        class="dads-progress-indicator__track"
        :cx="spinnerGeometry.cx"
        :cy="spinnerGeometry.cy"
        :r="spinnerGeometry.r"
        :stroke-width="spinnerGeometry.strokeWidth"
      />
      <g>
        <g>
          <circle
            class="dads-progress-indicator__bar"
            :cx="spinnerGeometry.cx"
            :cy="spinnerGeometry.cy"
            :r="spinnerGeometry.r"
            :stroke-width="spinnerGeometry.strokeWidth"
            pathLength="100"
          />
        </g>
      </g>
      <circle
        class="dads-progress-indicator__border"
        :cx="spinnerGeometry.cx"
        :cy="spinnerGeometry.cy"
        :r="spinnerGeometry.borderR"
        stroke-width="1"
      />
    </svg>

    <span v-if="label" :id="labelId" class="dads-progress-indicator__label">
      {{ label }}
      <span v-if="showPercentage && !isIndeterminate" class="dads-progress-indicator__percentage">
        (<span>{{ roundedValue }}</span
        >%)
      </span>
    </span>
  </div>
</template>

<style scoped lang="scss">
@use '../../styles/base' as base;

// Verbatim port of the official progress-indicator.css. The component renders
// the markup itself (Vue, not a web component), so the official
// `dads-progress-indicator:not([active])` host selector is reproduced via the
// `--inactive` modifier class instead.
.dads-progress-indicator {
  display: flex;
  gap: calc(16 / 16 * 1rem) calc(8 / 16 * 1rem);
  justify-content: center;
  align-items: center;
  color: var(--color-neutral-solid-gray-900);
  font-weight: normal;
  font-size: calc(16 / 16 * 1rem);
  line-height: 1.7;
  font-family: var(--font-family-sans);
  letter-spacing: 0.02em;

  &--inactive {
    display: none;
  }

  &--inactive * {
    animation: none !important;
  }

  &[data-type='stacked'] {
    flex-direction: column;
  }

  &[data-type='stacked-underlay'] {
    flex-direction: column;
    margin-right: auto;
    margin-left: auto;
    box-sizing: border-box;
    width: fit-content;
    border-radius: calc(16 / 16 * 1rem);
    border: 1px solid var(--color-neutral-solid-gray-500);
    background-color: var(--color-neutral-white);
  }

  &[data-type='stacked-underlay']:has(&__spinner, &__static) {
    min-width: calc(128 / 16 * 1rem);
    min-height: calc(128 / 16 * 1rem);
    padding: calc(16 / 16 * 1rem);
  }

  &[data-type='stacked-underlay']:has(&__linear) {
    padding: calc(24 / 16 * 1rem);
  }

  &__track {
    stroke: currentcolor;
    color: var(--color-primitive-blue-100);
  }

  &__bar {
    color: var(--color-primitive-blue-1200);
    stroke-dashoffset: calc(100 - clamp(0, var(--value, 35), 100));
  }

  &__border {
    color: var(--color-primitive-blue-1200);
  }

  // -------------------- Spinner type -------------------------------------
  &__spinner g {
    transform-origin: center;
  }

  &__spinner &__bar {
    stroke-dasharray: 100;
    transform: rotate(-90deg);
    transform-origin: center;
  }

  &__spinner[data-indeterminate] g {
    animation: dads-spinner-rotate 13s linear infinite;
  }

  &__spinner[data-indeterminate] g > g {
    animation: dads-spinner-group-rotate 2.5s linear infinite;
  }

  &__spinner[data-indeterminate] &__bar {
    animation:
      dads-spinner-bar-rotate 2.5s cubic-bezier(0.4, 0, 0.3, 1) infinite,
      dads-spinner-bar-dash 2.5s cubic-bezier(0.4, 0, 0.3, 1) infinite;
  }

  // -------------------- Linear type --------------------------------------
  &__linear &__bar {
    stroke-dasharray: 100;
  }

  &__linear[data-indeterminate] &__bar {
    stroke-dasharray: 35 65;
    animation: dads-linear-rotate 4s linear infinite;
  }

  // -------------------- Percentage display -------------------------------
  &__percentage span {
    display: inline-block;
    min-width: 2ch;
    text-align: right;
    letter-spacing: 0;
    font-variant-numeric: tabular-nums;
  }

  // -------------------- forced-colors ------------------------------------
  @include base.dads-forced-colors {
    .dads-progress-indicator__track {
      color: Canvas;
    }

    .dads-progress-indicator__bar,
    .dads-progress-indicator__border {
      color: CanvasText;
    }
  }
}

@keyframes dads-spinner-rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dads-spinner-group-rotate {
  0% {
    transform: rotate(0deg);
  }
  30% {
    transform: rotate(135deg);
  }
  100% {
    transform: rotate(180deg);
  }
}

@keyframes dads-spinner-bar-rotate {
  0% {
    transform: rotate(0deg);
  }
  4% {
    transform: rotate(0deg);
  }
  30% {
    transform: rotate(360deg);
    animation-timing-function: cubic-bezier(0.5, 0.4, 0.3, 0.9);
  }
  100% {
    transform: rotate(540deg);
  }
}

@keyframes dads-spinner-bar-dash {
  0% {
    stroke-dasharray: 8 92;
    stroke-dashoffset: 4;
  }
  30% {
    stroke-dasharray: 80 20;
    stroke-dashoffset: 40;
  }
  100% {
    stroke-dasharray: 8 92;
    stroke-dashoffset: 4;
  }
}

@keyframes dads-linear-rotate {
  0% {
    stroke-dashoffset: 100;
  }
  100% {
    stroke-dashoffset: -100;
  }
}

@media (prefers-reduced-motion: reduce) {
  .dads-progress-indicator__spinner,
  .dads-progress-indicator__spinner *,
  .dads-progress-indicator__linear,
  .dads-progress-indicator__linear * {
    animation: none !important;
  }
}
</style>
