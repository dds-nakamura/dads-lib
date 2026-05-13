<script setup lang="ts">
import { computed, ref, useId, watch } from 'vue'
import type { DadsDisclosureEmits, DadsDisclosureProps } from './DadsDisclosure.types'

const props = withDefaults(defineProps<DadsDisclosureProps>(), {
  modelValue: undefined,
  disabled: false,
  defaultOpen: false,
})

const emit = defineEmits<DadsDisclosureEmits>()

// -------------------- ids --------------------------------------------------

const generatedId = useId()
const baseId = computed(() => `dads-disclosure-${generatedId}`)
const summaryId = computed(() => `${baseId.value}-summary`)
const contentId = computed(() => `${baseId.value}-content`)

// -------------------- controlled / uncontrolled state ---------------------

// When `modelValue` is undefined we operate in uncontrolled mode using a
// local ref seeded from `defaultOpen`.
const isControlled = computed(() => props.modelValue !== undefined)
const internalOpen = ref<boolean>(props.defaultOpen)

const isOpen = computed<boolean>(() =>
  isControlled.value ? Boolean(props.modelValue) : internalOpen.value,
)

// Keep the native `<details>` element in sync with state when the consumer
// changes `modelValue` externally.
const detailsRef = ref<HTMLDetailsElement | null>(null)
watch(isOpen, (next) => {
  if (detailsRef.value && detailsRef.value.open !== next) {
    detailsRef.value.open = next
  }
})

// -------------------- handlers --------------------------------------------

const setOpen = (next: boolean) => {
  if (!isControlled.value) {
    internalOpen.value = next
  }
  emit('update:modelValue', next)
  emit('toggle', next)
}

// The native <summary> click is what flips <details>. Intercept it so we can
// 1. block toggling when disabled, and 2. drive the open state through Vue
// instead of letting the browser race with our `watch`.
const onSummaryClick = (event: MouseEvent) => {
  event.preventDefault()
  if (props.disabled) return
  setOpen(!isOpen.value)
}

// Native <summary> already responds to Enter / Space, but since we suppressed
// the default click, we re-implement keyboard activation here for parity.
const onSummaryKeydown = (event: KeyboardEvent) => {
  if (event.key !== 'Enter' && event.key !== ' ') return
  event.preventDefault()
  if (props.disabled) return
  setOpen(!isOpen.value)
}

const rootClasses = computed(() => [
  'dads-disclosure',
  {
    'dads-disclosure--open': isOpen.value,
    'dads-disclosure--disabled': props.disabled,
  },
])
</script>

<template>
  <details
    ref="detailsRef"
    :class="rootClasses"
    :open="isOpen"
    :aria-disabled="disabled || undefined"
  >
    <summary
      :id="summaryId"
      class="dads-disclosure__summary"
      :aria-expanded="isOpen"
      :aria-controls="contentId"
      :aria-disabled="disabled || undefined"
      :tabindex="disabled ? -1 : 0"
      @click="onSummaryClick"
      @keydown="onSummaryKeydown"
    >
      <svg
        class="dads-disclosure__icon"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="11" fill="currentcolor" />
        <circle class="dads-disclosure__icon-circle" cx="12" cy="12" r="8" fill="currentcolor" />
        <path class="dads-disclosure__icon-triangle" d="M17 10H7L12 15L17 10Z" fill="Canvas" />
      </svg>
      <span class="dads-disclosure__title">{{ title }}</span>
    </summary>
    <div
      :id="contentId"
      class="dads-disclosure__content"
      role="region"
      :aria-labelledby="summaryId"
    >
      <slot />
    </div>
  </details>
</template>

<style scoped lang="scss">
@use '../../styles/base' as base;
@use '../../styles/focus-ring' as ring;

.dads-disclosure {
  font-family: var(--font-family-sans, 'Noto Sans JP', sans-serif);
  color: var(--color-text-primary, #1a1a1a);

  // -------------------- summary (toggle button) -------------------------
  &__summary {
    display: flex;
    align-items: start;
    justify-content: start;
    gap: var(--spacing-8, 0.5rem);
    width: fit-content;
    cursor: pointer;
    list-style-type: none;

    // Strip the native disclosure markers across browsers.
    &::marker {
      content: '';
    }

    &::-webkit-details-marker {
      display: none;
    }

    @include ring.dads-focus-ring;

    @media (hover: hover) {
      &:hover {
        text-decoration: underline;
        text-underline-offset: 0.1875rem; // 3/16rem
      }
    }
  }

  // -------------------- icon --------------------------------------------
  &__icon {
    flex-shrink: 0;
    margin-top: calc((1lh - 1.5rem) / 2);
    color: var(--color-primitive-blue-1000, #0017c1);
    transition: rotate 0.15s ease;
  }

  &--open &__icon {
    rotate: 180deg;
  }

  @media (hover: hover) {
    &__summary:hover &__icon-circle {
      fill: Canvas;
    }

    &__summary:hover &__icon-triangle {
      fill: currentcolor;
    }
  }

  // -------------------- title -------------------------------------------
  &__title {
    flex: 1 1 auto;
    font-size: var(--font-size-16, 1rem);
    line-height: var(--line-height-150, 1.5);
    color: inherit;
  }

  // -------------------- content panel -----------------------------------
  &__content {
    padding-left: 2rem; // 32/16rem — keeps body aligned past the icon.
    margin: var(--spacing-16, 1rem) 0;
    font-size: var(--font-size-16, 1rem);
    line-height: var(--line-height-150, 1.5);
    color: var(--color-text-primary, #1a1a1a);
  }

  // -------------------- disabled ----------------------------------------
  &--disabled {
    color: var(--color-text-disabled, #999);

    .dads-disclosure__summary {
      cursor: not-allowed;
      opacity: 0.6;

      @media (hover: hover) {
        &:hover {
          text-decoration: none;
        }
      }
    }

    .dads-disclosure__icon {
      color: var(--color-text-disabled, #999);
    }
  }

  // -------------------- forced colors -----------------------------------
  @include base.dads-forced-colors {
    .dads-disclosure__icon {
      color: CanvasText;
    }
  }
}
</style>
