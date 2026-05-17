<script setup lang="ts">
import { computed } from 'vue'
import type { DadsChipTagEmits, DadsChipTagProps } from './DadsChipTag.types'

const props = withDefaults(defineProps<DadsChipTagProps>(), {
  size: 'md',
  color: 'primary',
  closable: false,
  clickable: false,
  disabled: false,
  closeLabel: '削除',
})

const emit = defineEmits<DadsChipTagEmits>()

const rootClasses = computed(() => [
  'dads-chip-tag',
  `dads-chip-tag--${props.size}`,
  `dads-chip-tag--${props.color}`,
  {
    'dads-chip-tag--clickable': props.clickable,
  },
])

// `aria-disabled` is only meaningful when the tag itself is not a real
// `<button>` — native `disabled` already handles the clickable case.
const ariaDisabled = computed(() => (!props.clickable && props.disabled ? 'true' : undefined))

const onActivate = (event: MouseEvent) => {
  if (!props.clickable || props.disabled) {
    return
  }
  emit('click', event)
}

const onKeydown = (event: KeyboardEvent) => {
  if (!props.clickable || props.disabled) {
    return
  }
  // Native <button> already fires click for Enter/Space, but we also want the
  // emit to carry the original KeyboardEvent so consumers can introspect the
  // key. preventDefault on Space avoids page scroll.
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    emit('click', event)
  }
}

const onClose = (event: MouseEvent) => {
  if (props.disabled) {
    return
  }
  emit('close', event)
}
</script>

<template>
  <component
    :is="clickable ? 'button' : 'span'"
    :type="clickable ? 'button' : undefined"
    :class="rootClasses"
    :role="clickable ? 'button' : undefined"
    :tabindex="clickable && !disabled ? 0 : undefined"
    :disabled="clickable ? disabled || undefined : undefined"
    :aria-disabled="ariaDisabled"
    :aria-label="ariaLabel"
    @click="onActivate"
    @keydown="onKeydown"
  >
    <span v-if="$slots.prepend" class="dads-chip-tag__prepend" aria-hidden="true">
      <slot name="prepend" />
    </span>
    <span class="dads-chip-tag__label">
      <slot />
    </span>
    <span v-if="$slots.append && !closable" class="dads-chip-tag__append" aria-hidden="true">
      <slot name="append" />
    </span>
    <button
      v-if="closable"
      type="button"
      class="dads-chip-tag__close"
      :aria-label="closeLabel"
      :disabled="disabled"
      @click.stop="onClose"
    >
      <i class="mdi mdi-close" aria-hidden="true" />
    </button>
  </component>
</template>

<style scoped lang="scss">
@use 'sass:list';
@use '../../styles/base' as base;
@use '../../styles/focus-ring' as ring;

// Color tuple = (base, bg-subtle). `base` drives both the border / text and
// (when clickable) the active-state outline. `bg-subtle` paints the resting
// background so tags read as quiet labels rather than buttons.
$dads-chip-tag-colors: (
  primary: (
    --color-brand-primary,
    --color-info-bg,
  ),
  success: (
    --color-success,
    --color-success-bg,
  ),
  error: (
    --color-error,
    --color-error-bg,
  ),
  warning: (
    --color-warning,
    --color-warning-bg,
  ),
  secondary: (
    --color-brand-secondary,
    --color-bg-subtle,
  ),
);

.dads-chip-tag {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-4, 0.25rem);
  border-radius: var(--border-radius-pill, 999px);
  border: 1px solid transparent;
  font-family: var(--font-family-sans, 'Noto Sans JP', sans-serif);
  font-weight: 500;
  line-height: var(--line-height-150, 1.5);
  white-space: nowrap;
  vertical-align: middle;
  transition:
    background-color 0.15s ease,
    border-color 0.15s ease,
    color 0.15s ease,
    box-shadow 0.15s ease;

  // -------------------- size ----------------------------------------------
  &--lg {
    min-height: 2rem; // 32px
    padding: 0 var(--spacing-12, 0.75rem);
    font-size: var(--font-size-16, 1rem);
  }

  &--md {
    min-height: 1.75rem; // 28px
    padding: 0 var(--spacing-8, 0.5rem);
    font-size: var(--font-size-14, 0.875rem);
  }

  &--sm {
    min-height: 1.5rem; // 24px
    padding: 0 var(--spacing-8, 0.5rem);
    font-size: var(--font-size-12, 0.75rem);
  }

  // -------------------- slots ---------------------------------------------
  &__prepend,
  &__append {
    display: inline-flex;
    align-items: center;
    font-size: 1.1em;
    line-height: 1;
  }

  &__label {
    display: inline-flex;
    align-items: center;
  }

  // -------------------- close button --------------------------------------
  &__close {
    @include base.dads-reset-button;
    @include ring.dads-focus-ring;

    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1.25em;
    height: 1.25em;
    margin-left: var(--spacing-4, 0.25rem);
    margin-right: calc(var(--spacing-4, 0.25rem) * -1);
    border-radius: 50%;
    color: inherit;
    font-size: 1em;
    line-height: 1;
    transition: background-color 0.15s ease;

    &:hover {
      background-color: rgba(0, 0, 0, 0.08);
    }

    &:active {
      background-color: rgba(0, 0, 0, 0.12);
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
      pointer-events: none;
    }
  }

  // -------------------- clickable variant --------------------------------
  &--clickable {
    @include base.dads-reset-button;
    @include ring.dads-focus-ring;
    cursor: pointer;
  }

  // -------------------- disabled ------------------------------------------
  &:disabled,
  &[aria-disabled='true'] {
    cursor: not-allowed;
    opacity: 0.5;
    pointer-events: none;
  }

  // -------------------- color generated rules ----------------------------
  @each $name, $tokens in $dads-chip-tag-colors {
    $base: list.nth($tokens, 1);
    $bg: list.nth($tokens, 2);

    &--#{$name} {
      background-color: var(#{$bg});
      color: var(#{$base});
      border-color: var(#{$base});
    }

    &--#{$name}.dads-chip-tag--clickable {
      &:hover {
        background-color: var(#{$base});
        color: var(--color-text-on-primary, #fff);
      }

      &:active {
        background-color: var(#{$base});
        color: var(--color-text-on-primary, #fff);
      }
    }
  }

  // -------------------- forced colors -------------------------------------
  @include base.dads-forced-colors {
    border: 1px solid CanvasText;

    &__close {
      border: 1px solid CanvasText;
    }
  }
}
</style>
