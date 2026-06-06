<script setup lang="ts">
import { computed } from 'vue'
import type {
  DadsHamburgerMenuButtonEmits,
  DadsHamburgerMenuButtonProps,
} from './DadsHamburgerMenuButton.types'

const props = withDefaults(defineProps<DadsHamburgerMenuButtonProps>(), {
  modelValue: false,
  disabled: false,
  openLabel: 'メニュー',
  closeLabel: '閉じる',
  size: 'md',
  variant: 'default',
})

const emit = defineEmits<DadsHamburgerMenuButtonEmits>()

const isOpen = computed(() => Boolean(props.modelValue))

const rootClasses = computed(() => [
  'dads-hamburger-menu-button',
  `dads-hamburger-menu-button--${props.size}`,
  `dads-hamburger-menu-button--variant-${props.variant}`,
  {
    'dads-hamburger-menu-button--open': isOpen.value,
  },
])

// icon-only variant suppresses the visible label but still exposes it to SR
// via aria-label so the button retains an accessible name.
const isIconOnly = computed(() => props.variant === 'icon-only')
const ariaLabel = computed(() => (isIconOnly.value ? label.value : undefined))

const label = computed(() => (isOpen.value ? props.closeLabel : props.openLabel))

const onClick = (event: MouseEvent) => {
  if (props.disabled) {
    event.preventDefault()
    return
  }
  emit('update:modelValue', !isOpen.value)
  emit('click', event)
}
</script>

<template>
  <button
    type="button"
    :class="rootClasses"
    :aria-expanded="isOpen"
    :aria-controls="ariaControls"
    :aria-label="ariaLabel"
    :disabled="disabled || undefined"
    @click="onClick"
  >
    <!-- メニュー閉（通常）→ 3 本線（ハンバーガー） -->
    <svg
      v-if="!isOpen"
      class="dads-hamburger-menu-button__icon"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M3 18V16H21V18H3ZM3 13V11H21V13H3ZM3 8V6H21V8H3Z" fill="currentcolor" />
    </svg>
    <!-- メニュー開 → ×（クローズ） -->
    <svg
      v-else
      class="dads-hamburger-menu-button__icon"
      width="24"
      height="24"
      viewBox="0 0 120 120"
      aria-hidden="true"
    >
      <path
        d="M32 95L25 88L53 60L25 32L32 25L60 53L88 25L95 32L67 60L95 88L88 95L60 67L32 95Z"
        fill="currentcolor"
      />
    </svg>
    <span v-if="!isIconOnly" class="dads-hamburger-menu-button__label">{{ label }}</span>
  </button>
</template>

<style scoped lang="scss">
@use '../../styles/base' as base;
@use '../../styles/focus-ring' as ring;

.dads-hamburger-menu-button {
  @include base.dads-reset-button;
  @include ring.dads-focus-ring-fill;

  display: inline-flex;
  align-items: center;
  column-gap: calc(4 / 16 * 1rem);
  width: fit-content;
  border: 0;
  border-radius: var(--border-radius-6, 0.375rem);
  background: transparent;
  color: var(--color-neutral-solid-gray-800, #333);
  font-family: var(--font-family-sans, 'Noto Sans JP', sans-serif);
  font-weight: normal;
  line-height: 1;
  letter-spacing: 0.02em;
  touch-action: manipulation;
  transition:
    background-color 0.15s ease,
    color 0.15s ease;

  // -------------------- size ----------------------------------------------
  &--lg {
    padding: calc(8 / 16 * 1rem) calc(16 / 16 * 1rem)
      calc(calc(8 / 16 * 1rem) + 0.125rem);
    font-size: var(--font-size-18, 1.125rem);
  }

  &--md {
    padding: calc(4 / 16 * 1rem) calc(12 / 16 * 1rem)
      calc(calc(4 / 16 * 1rem) + 0.125rem);
    font-size: var(--font-size-16, 1rem);
  }

  &--sm {
    column-gap: calc(4 / 16 * 1rem);
    padding: calc(4 / 16 * 1rem) calc(8 / 16 * 1rem);
    font-size: var(--font-size-14, 0.875rem);
  }

  // -------------------- icon ----------------------------------------------
  &__icon {
    margin-top: 0.125rem; // 2/16rem — vertical optical alignment with text
    width: 1.5rem; // 24/16rem
    height: 1.5rem;
    flex-shrink: 0;
    color: var(--color-neutral-black, #000);
  }

  &--sm &__icon {
    width: 1.25rem; // 20/16rem
    height: 1.25rem;
  }

  &--lg &__icon {
    width: 1.75rem; // 28/16rem
    height: 1.75rem;
  }

  // -------------------- label ---------------------------------------------
  &__label {
    display: inline-block;
  }

  // -------------------- variant ------------------------------------------
  // icon-only: square, no visible label (aria-label keeps it accessible).
  &--variant-icon-only {
    aspect-ratio: 1;
    padding: calc(8 / 16 * 1rem);
    column-gap: 0;
    justify-content: center;
  }

  // mobile-conditional: on narrow viewports, stack icon over label (vertical),
  // creating a square-ish tap target with a small caption underneath.
  @media (max-width: 47.99rem) {
    &--variant-mobile-conditional {
      flex-direction: column;
      column-gap: 0;
      row-gap: 0.125rem;
      padding: calc(4 / 16 * 1rem);
      aspect-ratio: 1;
      justify-content: center;
      min-width: 3rem;
    }

    &--variant-mobile-conditional &__label {
      font-size: var(--font-size-14, 0.875rem);
      line-height: 1.2;
    }
  }

  // -------------------- hover ---------------------------------------------
  @media (hover: hover) {
    &:hover:not(:disabled) {
      background-color: var(--color-neutral-solid-gray-50, #f2f2f2);
      text-decoration: underline;
      text-underline-offset: 0.1875rem; // 3/16rem
    }
  }

  // -------------------- disabled ------------------------------------------
  &:disabled,
  &[aria-disabled='true'] {
    cursor: not-allowed;
    opacity: 0.5;
    pointer-events: none;
  }

  // -------------------- forced colors -------------------------------------
  @include base.dads-forced-colors {
    border: 1px solid CanvasText;
    color: CanvasText;

    .dads-hamburger-menu-button__icon {
      color: currentcolor;
    }
  }
}
</style>
