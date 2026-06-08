<script setup lang="ts">
import { computed } from 'vue'
import type {
  DadsStepNavigationEmits,
  DadsStepNavigationProps,
  DadsStepNavigationStatus,
  DadsStepNavigationStep,
} from './DadsStepNavigation.types'

const props = withDefaults(defineProps<DadsStepNavigationProps>(), {
  orientation: 'horizontal',
  size: 'normal',
  clickable: true,
  ariaLabel: 'ステップ',
})

const emit = defineEmits<DadsStepNavigationEmits>()

const isCurrent = (index: number) => props.current === index

/**
 * Resolve the header element per official structure (`span` / `a` / `button`):
 * - `a`     — a non-current, non-disabled step with an `href`.
 * - `button`— a clickable step (or a disabled step, rendered as a disabled
 *             `<button>` so assistive tech announces it). The current step is
 *             never a button.
 * - `span`  — display-only steps (the current step, or `clickable=false`).
 */
const headerTag = (step: DadsStepNavigationStep, index: number) => {
  if (isCurrent(index)) return 'span'
  if (step.href != null && !step.disabled) return 'a'
  if (step.disabled) return 'button'
  if (props.clickable) return 'button'
  return 'span'
}

/** Visually-hidden state announcement per official playground-single.html. */
const STATE_LABEL: Partial<Record<DadsStepNavigationStatus, string>> = {
  completed: '完了',
  editing: '編集中',
  error: 'エラー',
  skipped: 'スキップされました',
}

/** Whether the state announcement is shown visibly (state-label) or
 *  visually hidden. Official: editing/error use a visible label, completed/
 *  skipped use a visually-hidden span. */
const isVisibleStateLabel = (status?: DadsStepNavigationStatus) =>
  status === 'editing' || status === 'error'

const reachedCount = computed(() => {
  if (props.reached != null) return props.reached
  return props.steps.filter((s) =>
    s.status === 'reached' ||
    s.status === 'completed' ||
    s.status === 'editing' ||
    s.status === 'error',
  ).length
})

const onStepClick = (step: DadsStepNavigationStep, index: number, event: MouseEvent) => {
  emit('click:step', step, index, event)
}
</script>

<template>
  <nav
    class="dads-step-navigation"
    :data-orientation="orientation"
    :data-size="size"
    :aria-label="ariaLabel"
  >
    <p class="dads-u-visually-hidden">
      全{{ steps.length }}ステップ中、{{ reachedCount }}ステップ目まで到達済み
    </p>
    <ul>
      <li
        v-for="(step, idx) in steps"
        :key="idx"
        class="dads-step-navigation__step"
        :data-state="step.status || undefined"
        :data-first="idx === 0 ? '' : undefined"
        :data-last="idx === steps.length - 1 ? '' : undefined"
        :aria-current="isCurrent(idx) ? 'step' : undefined"
      >
        <component
          :is="headerTag(step, idx)"
          class="dads-step-navigation__header"
          :type="headerTag(step, idx) === 'button' ? 'button' : undefined"
          :href="headerTag(step, idx) === 'a' ? step.href : undefined"
          :disabled="headerTag(step, idx) === 'button' && step.disabled ? true : undefined"
          @click="
            headerTag(step, idx) === 'button' || headerTag(step, idx) === 'a'
              ? onStepClick(step, idx, $event)
              : undefined
          "
        >
          <span class="dads-u-visually-hidden">ステップ</span>
          <span class="dads-step-navigation__number">
            {{ idx + 1 }}
            <span
              v-if="step.status === 'completed'"
              class="dads-step-navigation__state-icon"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="12" r="12" fill="#666" />
                <path d="M10 17.5 19.8 8l-1.5-1.5-8.1 8-4.1-4L4.5 12l5.6 5.5Z" fill="#fff" />
              </svg>
            </span>
            <span
              v-else-if="step.status === 'editing'"
              class="dads-step-navigation__state-icon"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M5.8 20c-.5 0-1-.2-1.3-.5-.3-.4-.5-.8-.5-1.3V5.6c0-.5.2-.9.5-1.3.4-.3.8-.5 1.3-.5h8L12 5.6H5.8v12.6h12.6V12l1.8-1.8v8c0 .5-.2 1-.5 1.3-.4.3-.8.5-1.3.5H5.8Zm3.6-5.4v-3.8l8.3-8.3a1.8 1.8 0 0 1 2.5 0l1.3 1.3.4.6a1.7 1.7 0 0 1 0 1.3c-.1.3-.2.5-.4.6l-8.3 8.3H9.4Zm1.8-1.8h1.3l5.2-5.2L17 7l-.7-.7-5.2 5.2v1.3Z"
                  fill="#333"
                />
              </svg>
            </span>
            <span
              v-else-if="step.status === 'error'"
              class="dads-step-navigation__state-icon"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M1 21 12 2l11 19H1Zm3.5-2h15L12 6 4.5 19Zm7.5-1c.3 0 .5-.1.7-.3.2-.2.3-.4.3-.7a1 1 0 0 0-.3-.7 1 1 0 0 0-.7-.3 1 1 0 0 0-.7.3 1 1 0 0 0-.3.7c0 .3.1.5.3.7.2.2.4.3.7.3Zm-1-3h2v-5h-2v5Z"
                  fill="#ec0000"
                />
              </svg>
            </span>
            <span
              v-if="step.status && STATE_LABEL[step.status] && isVisibleStateLabel(step.status)"
              class="dads-step-navigation__state-label"
            >
              {{ STATE_LABEL[step.status] }}
            </span>
            <span
              v-else-if="step.status && STATE_LABEL[step.status]"
              class="dads-u-visually-hidden"
            >
              {{ STATE_LABEL[step.status] }}
            </span>
          </span>
          <span class="dads-step-navigation__title">{{ step.title }}</span>
        </component>
        <p v-if="step.description" class="dads-step-navigation__description">
          {{ step.description }}
        </p>
      </li>
    </ul>
  </nav>
</template>

<style scoped lang="scss">
@use '../../styles/base' as base;

// Visually-hidden helper (the official global.css provides .dads-u-visually-hidden;
// reproduced here so scoped markup is self-contained).
.dads-u-visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  border: 0;
  padding: 0;
  overflow: hidden;
  white-space: nowrap;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
}

.dads-step-navigation {
  color: var(--color-neutral-solid-gray-800, #333);
  font-weight: normal;
  font-size: calc(16 / 16 * 1rem);
  font-family: var(--font-family-sans, 'Noto Sans JP', sans-serif);
  line-height: 1.7;
  letter-spacing: 0.02em;
  overflow-wrap: anywhere;
}

.dads-step-navigation[data-size='normal'] {
  --_number-size: calc(44 / 16 * 1rem);
  --_number-margin: calc(4 / 16 * 1rem);
  --_outline-width: calc(2 / 16 * 1rem);
  --_title-margin: calc(24 / 16 * 1rem);
  --_description-margin: calc(8 / 16 * 1rem);
}

.dads-step-navigation[data-size='small'] {
  --_number-size: calc(32 / 16 * 1rem);
  --_number-margin: calc(3 / 16 * 1rem);
  --_outline-width: calc(1 / 16 * 1rem);
  --_title-margin: calc(16 / 16 * 1rem);
  --_description-margin: calc(4 / 16 * 1rem);
}

.dads-step-navigation > ul {
  margin: 0;
  padding: 0;
  list-style-type: none;
}

.dads-step-navigation__step {
  position: relative;
  box-sizing: border-box;
}

.dads-step-navigation__step::before,
.dads-step-navigation__step::after {
  position: absolute;
  z-index: -1;
  content: '';
}

.dads-step-navigation__step[data-first]::before {
  display: none;
}

.dads-step-navigation__step[data-last]::after {
  display: none;
}

.dads-step-navigation__header {
  display: block;
  border: 0;
  background: none;
  padding: 0;
  color: inherit;
  font: inherit;
  text-wrap: pretty;
}

.dads-step-navigation__header:any-link,
.dads-step-navigation__header:enabled {
  text-decoration: underline;
  text-decoration-thickness: calc(1 / 16 * 1rem);
  text-underline-offset: calc(3 / 16 * 1rem);
}

@media (hover: hover) {
  .dads-step-navigation__header:any-link:hover,
  .dads-step-navigation__header:enabled:hover {
    text-decoration-thickness: calc(3 / 16 * 1rem);
    cursor: pointer;
  }
}

.dads-step-navigation__header:focus-visible {
  border-radius: 0;
  outline: 0;
  box-shadow: none;
}

.dads-step-navigation__number {
  position: relative;
  display: grid;
  place-content: center;
  margin: calc(4 / 16 * 1rem);
  box-sizing: border-box;
  width: fit-content;
  height: var(--_number-size);
  min-width: var(--_number-size);
  border: calc(2 / 16 * 1rem) solid;
  border-radius: 50%;
  background-color: var(--color-neutral-white, #fff);
  padding: 0 calc(2 / 16 * 1rem) calc(2 / 16 * 1rem);
  font-weight: bold;
  font-size: calc(20 / 16 * 1rem);
  line-height: 1.5;
  letter-spacing: 0.02em;
  text-decoration: inherit;
  text-decoration-thickness: inherit;
}

.dads-step-navigation[data-size='small'] .dads-step-navigation__number {
  margin: calc(3 / 16 * 1rem);
  border-width: calc(1 / 16 * 1rem);
  font-size: calc(16 / 16 * 1rem);
}

.dads-step-navigation__step[data-state='reached'] .dads-step-navigation__number {
  background-color: var(--color-neutral-solid-gray-800, #333);
  color: var(--color-neutral-white, #fff);
  border-color: var(--color-neutral-solid-gray-800, #333);
}

.dads-step-navigation__step[data-state='completed'] .dads-step-navigation__number {
  background-color: var(--color-neutral-solid-gray-50, #f2f2f2);
}

.dads-step-navigation__step[data-state='error'] .dads-step-navigation__number {
  color: var(--color-semantic-error-1, #ec0000);
}

.dads-step-navigation__step[data-state='skipped'] .dads-step-navigation__number {
  border-width: calc(1 / 16 * 1rem);
  border-style: dashed;
}

.dads-step-navigation__step[aria-current] .dads-step-navigation__number {
  outline: var(--_outline-width) solid var(--color-neutral-solid-gray-800, #333);
  outline-offset: calc(2 / 16 * 1rem);
  box-shadow: 0 0 0 calc(2 / 16 * 1rem) var(--color-neutral-white, #fff);
}

// NOTE: plain @media (not base.dads-forced-colors) — the mixin emits a bare
// `forced-color-adjust: auto`, which is invalid at stylesheet root.
@media (forced-colors: active) {
  .dads-step-navigation__step[data-state='reached'] .dads-step-navigation__number {
    background-color: CanvasText;
    color: Canvas;
    forced-color-adjust: none;
  }

  .dads-step-navigation__step[data-state='completed']
    .dads-step-navigation__state-icon
    circle {
    fill: CanvasText;
  }

  .dads-step-navigation__step[data-state='completed']
    .dads-step-navigation__state-icon
    path {
    fill: Canvas;
  }

  .dads-step-navigation__step[data-state='editing']
    .dads-step-navigation__state-icon
    path {
    fill: CanvasText;
  }

  .dads-step-navigation__step[data-state='error']
    .dads-step-navigation__state-icon
    path {
    fill: CanvasText;
  }
}

.dads-step-navigation__header:focus-visible .dads-step-navigation__number {
  outline: calc(4 / 16 * 1rem) solid var(--color-neutral-black, #000);
  outline-offset: calc(2 / 16 * 1rem);
  box-shadow: 0 0 0 calc(2 / 16 * 1rem) var(--color-primitive-yellow-300, #ffd43d);
}

.dads-step-navigation__state-icon {
  position: absolute;
  top: calc(-10 / 16 * 1rem);
  left: calc(50% + calc(6 / 16 * 1rem));
  border-radius: 50%;
  background-color: var(--color-neutral-white, #fff);
}

.dads-step-navigation[data-size='small'] .dads-step-navigation__state-icon {
  top: calc(-9 / 16 * 1rem);
  left: calc(50% + calc(4 / 16 * 1rem));
}

.dads-step-navigation__state-icon > svg {
  display: block;
  max-width: none;
}

.dads-step-navigation[data-size='small'] .dads-step-navigation__state-icon > svg {
  width: calc(20 / 16 * 1rem);
  height: calc(20 / 16 * 1rem);
}

.dads-step-navigation__state-label {
  position: absolute;
  inset: calc(100% + calc(8 / 16 * 1rem)) -100% 0;
  margin: 0 auto;
  width: 4em;
  height: 1.2em;
  background-color: var(--color-neutral-white, #fff);
  font-weight: normal;
  font-size: calc(14 / 16 * 1rem);
  line-height: 1.2;
  letter-spacing: 0;
  text-align: center;
}

.dads-step-navigation__title {
  display: block;
  font-weight: bold;
  font-size: calc(18 / 16 * 1rem);
  line-height: 1.6;
  letter-spacing: 0.02em;
  text-decoration-thickness: inherit;
}

.dads-step-navigation[data-size='small'] .dads-step-navigation__title {
  font-weight: bold;
  font-size: calc(16 / 16 * 1rem);
  line-height: 1.7;
  letter-spacing: 0.02em;
}

.dads-step-navigation__description {
  margin: var(--_description-margin) 0 0;
}

// Orientations

.dads-step-navigation[data-orientation='horizontal'] {
  overflow-x: auto;
  padding-top: calc(6 / 16 * 1rem);
  padding-bottom: calc(6 / 16 * 1rem);
}

.dads-step-navigation[data-orientation='horizontal'] > ul {
  display: flex;
}

.dads-step-navigation[data-orientation='vertical'] > ul {
  display: flex;
  flex-direction: column;
}

.dads-step-navigation[data-orientation='horizontal'] .dads-step-navigation__step {
  width: calc(var(--_step-width, 320) / 16 * 1rem);
  min-width: calc(var(--_step-min-width, 160) / 16 * 1rem);
  padding: 0 calc(16 / 16 * 1rem);
}

.dads-step-navigation[data-orientation='vertical'] .dads-step-navigation__step {
  flex: 1;
  padding-bottom: calc(24 / 16 * 1rem);
}

.dads-step-navigation[data-orientation='vertical'] .dads-step-navigation__step:last-child {
  padding-bottom: 0;
}

.dads-step-navigation[data-orientation='horizontal'] .dads-step-navigation__step::before {
  top: calc(var(--_number-size) / 2 + var(--_number-margin));
  right: 50%;
  width: 50%;
  border-bottom: calc(1 / 16 * 1rem) solid;
}

.dads-step-navigation[data-orientation='horizontal'] .dads-step-navigation__step::after {
  top: calc(var(--_number-size) / 2 + var(--_number-margin));
  left: 50%;
  width: 50%;
  border-bottom: calc(1 / 16 * 1rem) solid;
}

.dads-step-navigation[data-orientation='vertical'] .dads-step-navigation__step::before {
  left: calc(var(--_number-size) / 2 + var(--_number-margin));
  top: 0;
  height: calc(32 / 16 * 1rem);
  border-right: calc(1 / 16 * 1rem) solid;
}

.dads-step-navigation[data-orientation='vertical'] .dads-step-navigation__step::after {
  left: calc(var(--_number-size) / 2 + var(--_number-margin));
  bottom: 0;
  height: calc(100% - calc(32 / 16 * 1rem));
  border-right: calc(1 / 16 * 1rem) solid;
}

.dads-step-navigation[data-orientation='horizontal'] .dads-step-navigation__header {
  width: 100%;
  text-align: center;
}

.dads-step-navigation[data-orientation='vertical'] .dads-step-navigation__header {
  position: relative;
  display: flex;
  align-items: baseline;
  column-gap: calc(16 / 16 * 1rem);
  text-align: left;
}

.dads-step-navigation[data-orientation='horizontal'] .dads-step-navigation__number {
  margin-right: auto;
  margin-left: auto;
}

.dads-step-navigation[data-orientation='vertical'] .dads-step-navigation__number {
  flex-shrink: 0;
}

.dads-step-navigation[data-orientation='horizontal'] .dads-step-navigation__title {
  margin-top: var(--_title-margin);
}

.dads-step-navigation[data-orientation='vertical'] .dads-step-navigation__title {
  padding: calc(var(--_number-size) / 2 + var(--_number-margin) - 0.875rem) 0;
}

.dads-step-navigation[data-orientation='horizontal'] .dads-step-navigation__description {
  text-align: center;
}

.dads-step-navigation[data-orientation='vertical'] .dads-step-navigation__description {
  margin-top: calc(
    var(--_description-margin) - (var(--_number-size) / 2 + var(--_number-margin) - 0.875rem)
  );
  padding-left: calc(
    var(--_number-size) + var(--_number-margin) + var(--_number-margin) + calc(16 / 16 * 1rem)
  );
}
</style>
