<script setup lang="ts">
import { computed } from 'vue'
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
    <i
      v-if="prependIcon && !loading"
      :class="['mdi', prependIcon, 'dads-button__icon', 'dads-button__icon--prepend']"
      aria-hidden="true"
    />
    <span class="dads-button__label">
      <slot />
    </span>
    <i
      v-if="appendIcon && !loading"
      :class="['mdi', appendIcon, 'dads-button__icon', 'dads-button__icon--append']"
      aria-hidden="true"
    />
  </component>
</template>

<style scoped lang="scss">
@use 'sass:list';
@use '../../styles/base' as base;
@use '../../styles/focus-ring' as ring;

$dads-button-colors: (
  primary: (
    --color-brand-primary,
    --color-brand-primary-hover,
    --color-brand-primary-active,
    --color-info-bg,
  ),
  success: (
    --color-success,
    --color-semantic-success-2,
    --color-semantic-success-2,
    --color-success-bg,
  ),
  error: (
    --color-error,
    --color-semantic-error-2,
    --color-semantic-error-2,
    --color-error-bg,
  ),
  warning: (
    --color-warning,
    --color-semantic-warning-orange-2,
    --color-semantic-warning-orange-2,
    --color-warning-bg,
  ),
  secondary: (
    --color-brand-secondary,
    --color-neutral-solid-gray-800,
    --color-neutral-solid-gray-900,
    --color-bg-subtle,
  ),
);

.dads-button {
  @include base.dads-reset-button;
  @include ring.dads-focus-ring;

  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-8, 0.5rem);
  border-radius: var(--border-radius-4, 0.25rem);
  font-family: var(--font-family-sans, 'Noto Sans JP', sans-serif);
  font-weight: 500;
  line-height: var(--line-height-150, 1.5);
  text-decoration: none;
  transition:
    background-color 0.15s ease,
    color 0.15s ease,
    border-color 0.15s ease,
    box-shadow 0.15s ease;

  // -------------------- size ----------------------------------------------
  &--lg {
    min-height: 3.5rem; // 56px
    padding: 0 var(--spacing-24, 1.5rem);
    font-size: var(--font-size-18, 1.125rem);
  }

  &--md {
    min-height: 2.5rem; // 40px
    padding: 0 var(--spacing-16, 1rem);
    font-size: var(--font-size-16, 1rem);
  }

  &--sm {
    min-height: 2rem; // 32px
    padding: 0 var(--spacing-12, 0.75rem);
    font-size: var(--font-size-14, 0.875rem);
  }

  &--xs {
    min-height: 1.75rem; // 28px
    padding: 0 var(--spacing-8, 0.5rem);
    font-size: var(--font-size-14, 0.875rem);
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
    cursor: not-allowed;
    opacity: 0.5;
    pointer-events: none;
  }

  // -------------------- variant × color generated rules -------------------
  @each $name, $tokens in $dads-button-colors {
    $base: list.nth($tokens, 1);
    $hover: list.nth($tokens, 2);
    $active: list.nth($tokens, 3);
    $bg-subtle: list.nth($tokens, 4);

    &--#{$name}.dads-button--solid-fill {
      background-color: var(#{$base});
      color: var(--color-text-on-primary, #fff);

      &:hover {
        background-color: var(#{$hover});
      }

      &:active {
        background-color: var(#{$active});
      }
    }

    &--#{$name}.dads-button--outline {
      background-color: transparent;
      color: var(#{$base});
      border: 1px solid var(#{$base});

      &:hover {
        background-color: var(#{$bg-subtle});
      }

      &:active {
        background-color: var(#{$bg-subtle});
        border-color: var(#{$hover});
        color: var(#{$hover});
      }
    }

    &--#{$name}.dads-button--text {
      background-color: transparent;
      color: var(#{$base});
      padding-left: var(--spacing-4, 0.25rem);
      padding-right: var(--spacing-4, 0.25rem);

      &:hover {
        text-decoration: underline;
        text-underline-offset: 2px;
      }

      &:active {
        background-color: var(#{$bg-subtle});
      }
    }
  }

  // -------------------- forced colors -------------------------------------
  @include base.dads-forced-colors {
    border: 1px solid CanvasText;
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
