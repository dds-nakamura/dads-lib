<script setup lang="ts">
import { computed } from 'vue'
import DadsIcon from '../Icon/DadsIcon.vue'
import type { DadsButtonEmits, DadsButtonProps } from './DadsButton.types'

const props = withDefaults(defineProps<DadsButtonProps>(), {
  variant: 'solid-fill',
  size: 'md',
  color: 'primary',
  disabled: false,
  loading: false,
  block: false,
  type: 'button',
})

const emit = defineEmits<DadsButtonEmits>()

const isAnchor = computed(() => props.href !== undefined)
const isInactive = computed(() => props.disabled || props.loading)

const rootTag = computed<'button' | 'a'>(() => (isAnchor.value ? 'a' : 'button'))

const rootClasses = computed(() => [
  'dads-button',
  `dads-button--${props.variant}`,
  `dads-button--${props.size}`,
  `dads-button--${props.color}`,
  {
    'dads-button--block': props.block,
    'dads-button--loading': props.loading,
  },
])

const buttonAttrs = computed(() => {
  if (isAnchor.value) {
    return {
      role: 'button',
      href: isInactive.value ? undefined : props.href,
      'aria-disabled': isInactive.value ? 'true' : undefined,
      'aria-busy': props.loading ? 'true' : undefined,
      'aria-label': props.ariaLabel,
      tabindex: isInactive.value ? -1 : undefined,
    }
  }

  return {
    type: props.type,
    disabled: props.disabled,
    'aria-busy': props.loading ? 'true' : undefined,
    'aria-label': props.ariaLabel,
  }
})

const handleClick = (event: MouseEvent) => {
  if (isInactive.value) {
    // Prevent navigation on disabled anchors. Native <button disabled> already
    // skips this handler entirely.
    event.preventDefault()
    return
  }
  emit('click', event)
}
</script>

<template>
  <component :is="rootTag" :class="rootClasses" v-bind="buttonAttrs" @click="handleClick">
    <span v-if="loading" class="dads-button__spinner" aria-hidden="true" />
    <DadsIcon
      v-if="prependIcon && !loading"
      :name="prependIcon"
      :size="20"
      class="dads-button__icon dads-button__icon--prepend"
    />
    <span class="dads-button__label">
      <slot />
    </span>
    <DadsIcon
      v-if="appendIcon && !loading"
      :name="appendIcon"
      :size="20"
      class="dads-button__icon dads-button__icon--append"
    />
  </component>
</template>

<style scoped lang="scss">
@use 'sass:list';
@use '../../styles/base' as base;
@use '../../styles/focus-ring' as ring;

// Official DADS button is single-color (blue / primary). The non-official
// success / error / warning / secondary entries — and their inert tokens that
// do not exist in design-tokens — were removed in Issue #18 柱A-3 / T6.
$dads-button-colors: (
  primary: (
    --color-primitive-blue-900,
    --color-primitive-blue-1000,
    --color-primitive-blue-1200,
    --color-primitive-blue-50,
  ),
);

.dads-button {
  @include base.dads-reset-button;
  @include ring.dads-focus-ring;

  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: calc(4 / 16 * 1rem);
  font-family: var(--font-family-sans, 'Noto Sans JP', sans-serif);
  font-weight: bold;
  line-height: var(--line-height-100, 1);
  letter-spacing: 0.02em;
  text-decoration: none;
  text-underline-offset: calc(3 / 16 * 1rem);
  transition:
    background-color 0.15s ease,
    color 0.15s ease,
    border-color 0.15s ease,
    box-shadow 0.15s ease;

  // -------------------- size ----------------------------------------------
  // Sizes follow the official example (button.css): per-size min-width /
  // min-height / border-radius / padding. sm & xs use an ::after pseudo to
  // guarantee a 44px tap target (MD accessibility requirement).
  &--lg {
    min-width: calc(136 / 16 * 1rem);
    min-height: calc(56 / 16 * 1rem);
    border-radius: var(--border-radius-8, 0.5rem);
    padding: calc(12 / 16 * 1rem) calc(16 / 16 * 1rem);
    font-size: var(--font-size-16, 1rem);
  }

  &--md {
    min-width: calc(96 / 16 * 1rem);
    min-height: calc(48 / 16 * 1rem);
    border-radius: var(--border-radius-8, 0.5rem);
    padding: calc(8 / 16 * 1rem) calc(16 / 16 * 1rem);
    font-size: var(--font-size-16, 1rem);
  }

  &--sm {
    position: relative;
    min-width: calc(80 / 16 * 1rem);
    min-height: calc(36 / 16 * 1rem);
    border-radius: var(--border-radius-6, 0.375rem);
    padding: calc(2 / 16 * 1rem) calc(12 / 16 * 1rem);
    font-size: var(--font-size-16, 1rem);

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      margin: auto;
      height: calc(44 / 16 * 1rem);
    }
  }

  &--xs {
    position: relative;
    min-width: calc(72 / 16 * 1rem);
    min-height: calc(28 / 16 * 1rem);
    border-radius: var(--border-radius-4, 0.25rem);
    padding: calc(2 / 16 * 1rem) calc(8 / 16 * 1rem);
    font-size: var(--font-size-14, 0.875rem);

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      margin: auto;
      height: calc(44 / 16 * 1rem);
    }
  }

  // -------------------- block ---------------------------------------------
  &--block {
    width: 100%;
  }

  // -------------------- icons / spinner -----------------------------------
  &__icon {
    font-size: 1.2em;
    line-height: 1;
  }

  &__spinner {
    width: 1em;
    height: 1em;
    border: 2px solid currentColor;
    border-top-color: transparent;
    border-radius: 50%;
    animation: dads-button-spin 0.8s linear infinite;
  }

  &--loading &__label {
    opacity: 0.7;
  }

  // -------------------- disabled ------------------------------------------
  // `pointer-events: none` keeps disabled anchors out of :hover/:active, so
  // the variant rules below can use plain :hover / :active without :not()
  // chains.
  &:disabled,
  &[aria-disabled='true'] {
    // Official spec uses a dedicated disabled palette (set per variant below)
    // rather than a uniform opacity dim, and keeps the default cursor.
    cursor: default;
    pointer-events: none;
  }

  // -------------------- variant × color generated rules -------------------
  @each $name, $tokens in $dads-button-colors {
    $base: list.nth($tokens, 1);
    $hover: list.nth($tokens, 2);
    $active: list.nth($tokens, 3);
    $bg-subtle: list.nth($tokens, 4);

    &--#{$name}.dads-button--solid-fill {
      // Transparent double border reserves layout space, matching the
      // official solid-fill button.
      border: 4px double transparent;
      background-color: var(#{$base});
      color: var(--color-neutral-white, #fff);

      &:hover {
        background-color: var(#{$hover});
        text-decoration: underline;
        text-decoration-thickness: calc(1 / 16 * 1rem);
      }

      &:active {
        background-color: var(#{$active});
        text-decoration: underline;
      }

      &:disabled,
      &[aria-disabled='true'] {
        background-color: var(--color-neutral-solid-gray-300, #b3b3b3);
        color: var(--color-neutral-solid-gray-50, #f2f2f2);
        text-decoration: none;
      }
    }

    &--#{$name}.dads-button--outline {
      background-color: var(--color-neutral-white, #fff);
      color: var(#{$base});
      border: 1px solid currentcolor;

      &:hover {
        background-color: var(#{$bg-subtle});
        color: var(#{$hover});
        text-decoration: underline;
        text-decoration-thickness: calc(1 / 16 * 1rem);
      }

      &:active {
        background-color: var(#{$bg-subtle});
        border-color: var(#{$hover});
        color: var(#{$hover});
        text-decoration: underline;
      }

      &:disabled,
      &[aria-disabled='true'] {
        background-color: var(--color-neutral-white, #fff);
        color: var(--color-neutral-solid-gray-300, #b3b3b3);
        text-decoration: none;
      }
    }

    &--#{$name}.dads-button--text {
      background-color: transparent;
      color: var(#{$base});
      text-decoration: underline;
      padding-left: calc(4 / 16 * 1rem);
      padding-right: calc(4 / 16 * 1rem);

      &:hover {
        color: var(#{$hover});
        text-decoration-thickness: calc(3 / 16 * 1rem);
      }

      &:active {
        background-color: var(#{$bg-subtle});
        color: var(#{$active});
      }

      &:disabled,
      &[aria-disabled='true'] {
        background-color: transparent;
        color: var(--color-neutral-solid-gray-300, #b3b3b3);
        text-decoration-thickness: revert;
      }
    }
  }

  // -------------------- forced colors -------------------------------------
  @include base.dads-forced-colors {
    border: 1px solid CanvasText;

    &:disabled,
    &[aria-disabled='true'] {
      border-color: GrayText;
      color: GrayText;
    }
  }
}

@keyframes dads-button-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
