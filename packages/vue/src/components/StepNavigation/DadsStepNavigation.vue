<script setup lang="ts">
import { computed } from 'vue'
import type {
  DadsStepNavigationEmits,
  DadsStepNavigationProps,
  DadsStepNavigationStep,
} from './DadsStepNavigation.types'

const props = withDefaults(defineProps<DadsStepNavigationProps>(), {
  orientation: 'horizontal',
  clickable: true,
  ariaLabel: 'ステップ',
})

const emit = defineEmits<DadsStepNavigationEmits>()

const rootClasses = computed(() => [
  'dads-step-navigation',
  `dads-step-navigation--${props.orientation}`,
])

const stepStatus = (step: DadsStepNavigationStep) => step.status ?? 'pending'

const itemClasses = (step: DadsStepNavigationStep) => [
  `dads-step-navigation__item--${stepStatus(step)}`,
]

const onStepClick = (step: DadsStepNavigationStep, index: number, event: MouseEvent) => {
  emit('click:step', step, index, event)
}
</script>

<template>
  <nav :class="rootClasses" :aria-label="ariaLabel">
    <ol class="dads-step-navigation__list">
      <li
        v-for="(step, idx) in steps"
        :key="idx"
        class="dads-step-navigation__item"
        :class="itemClasses(step)"
        :aria-current="stepStatus(step) === 'current' ? 'step' : undefined"
      >
        <component
          :is="clickable ? 'button' : 'div'"
          :type="clickable ? 'button' : undefined"
          :class="clickable ? 'dads-step-navigation__button' : 'dads-step-navigation__static'"
          @click="clickable ? onStepClick(step, idx, $event) : undefined"
        >
          <span class="dads-step-navigation__indicator" aria-hidden="true">
            <i v-if="stepStatus(step) === 'done'" class="mdi mdi-check" />
            <i v-else-if="stepStatus(step) === 'error'" class="mdi mdi-close" />
            <span v-else>{{ idx + 1 }}</span>
          </span>
          <span class="dads-step-navigation__title">{{ step.title }}</span>
        </component>
        <span
          v-if="idx < steps.length - 1"
          class="dads-step-navigation__connector"
          aria-hidden="true"
        />
      </li>
    </ol>
  </nav>
</template>

<style scoped lang="scss">
@use '../../styles/base' as base;
@use '../../styles/focus-ring' as ring;

.dads-step-navigation {
  font-family: var(--font-family-sans, 'Noto Sans JP', sans-serif);
  color: var(--color-neutral-solid-gray-800, #333);
  line-height: 1.7;
  letter-spacing: 0.02em;

  &__list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    gap: calc(8 / 16 * 1rem);
  }

  // -------------------- orientation --------------------------------------
  &--horizontal &__list {
    flex-direction: row;
    align-items: flex-start;
  }

  &--vertical &__list {
    flex-direction: column;
    align-items: flex-start;
  }

  // -------------------- item ---------------------------------------------
  &__item {
    position: relative;
    display: flex;
    flex: 1 1 auto;
    min-width: 0;
  }

  &--horizontal &__item {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  &--vertical &__item {
    flex-direction: row;
    align-items: flex-start;
    text-align: left;
  }

  // -------------------- button / static wrapper --------------------------
  &__button {
    @include base.dads-reset-button;
    @include ring.dads-focus-ring;
    display: inline-flex;
    gap: calc(8 / 16 * 1rem);
    align-items: center;
    border-radius: var(--border-radius-4, 0.25rem);
    padding: calc(4 / 16 * 1rem);
  }

  &--horizontal &__button {
    flex-direction: column;
  }

  &__static {
    display: inline-flex;
    gap: calc(8 / 16 * 1rem);
    align-items: center;
    padding: calc(4 / 16 * 1rem);
  }

  &--horizontal &__static {
    flex-direction: column;
  }

  // -------------------- indicator (circle) -------------------------------
  &__indicator {
    display: inline-flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    width: 2rem; // 32px
    height: 2rem;
    border-radius: 50%;
    border: 2px solid var(--color-neutral-solid-gray-600, #666);
    background-color: var(--color-neutral-white, #fff);
    color: var(--color-neutral-solid-gray-800, #333);
    font-size: var(--font-size-16, 1rem);
    font-weight: 700;
    line-height: 1.5;
    transition:
      background-color 0.15s ease,
      border-color 0.15s ease,
      color 0.15s ease;
  }

  // -------------------- title --------------------------------------------
  &__title {
    font-size: var(--font-size-16, 1rem);
    font-weight: 700;
    line-height: var(--line-height-170, 1.7);
    letter-spacing: 0.02em;
    color: var(--color-neutral-solid-gray-800, #333);
    word-break: break-word;
  }

  // -------------------- connector ----------------------------------------
  &__connector {
    flex: 1 0 auto;
  }

  &--horizontal &__connector {
    position: absolute;
    top: calc(calc(4 / 16 * 1rem) + 1rem);
    left: 50%;
    width: 100%;
    height: 0;
    border-top: 1px solid var(--color-neutral-solid-gray-600, #666);
    z-index: 0;
  }

  &--vertical &__connector {
    margin-left: calc(1rem + calc(4 / 16 * 1rem));
    width: 0;
    height: calc(16 / 16 * 1rem);
    border-left: 1px solid var(--color-neutral-solid-gray-600, #666);
  }

  // The button / indicator should sit above the connector line.
  &__button,
  &__static {
    position: relative;
    z-index: 1;
  }

  // -------------------- status: pending ---------------------------------
  &__item--pending &__indicator {
    background-color: var(--color-neutral-white, #fff);
    border-color: var(--color-neutral-solid-gray-600, #666);
    color: var(--color-neutral-solid-gray-800, #333);
  }

  // -------------------- status: current ---------------------------------
  // Official: aria-current draws a ring on the number (outline gray-800 +
  // offset + white shadow) over the reached (gray-800) fill.
  &__item--current &__indicator {
    background-color: var(--color-neutral-solid-gray-800, #333);
    border-color: var(--color-neutral-solid-gray-800, #333);
    color: var(--color-neutral-white, #fff);
    font-weight: 700;
    outline: calc(2 / 16 * 1rem) solid var(--color-neutral-solid-gray-800, #333);
    outline-offset: calc(2 / 16 * 1rem);
    box-shadow: 0 0 0 calc(2 / 16 * 1rem) var(--color-neutral-white, #fff);
  }

  &__item--current &__title {
    font-weight: 700;
  }

  // -------------------- status: done (reached) --------------------------
  &__item--done &__indicator {
    background-color: var(--color-neutral-solid-gray-800, #333);
    border-color: var(--color-neutral-solid-gray-800, #333);
    color: var(--color-neutral-white, #fff);
  }

  // -------------------- status: error -----------------------------------
  &__item--error &__indicator {
    background-color: var(--color-semantic-error-1, #ec0000);
    border-color: var(--color-semantic-error-1, #ec0000);
    color: var(--color-neutral-white, #fff);
  }

  &__item--error &__title {
    color: var(--color-semantic-error-1, #ec0000);
  }

  // -------------------- forced colors ------------------------------------
  @include base.dads-forced-colors {
    &__indicator {
      border: 1px solid CanvasText;
    }

    &__item--current &__indicator,
    &__item--done &__indicator {
      background-color: CanvasText;
      border-color: CanvasText;
      color: Canvas;
      forced-color-adjust: none;
    }

    &__item--error &__indicator {
      border-color: CanvasText;
      color: CanvasText;
    }

    &__connector {
      border-color: CanvasText;
    }
  }
}
</style>
