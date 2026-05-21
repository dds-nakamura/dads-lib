<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import type {
  DadsScrollTopButtonEmits,
  DadsScrollTopButtonProps,
} from './DadsScrollTopButton.types'

const props = withDefaults(defineProps<DadsScrollTopButtonProps>(), {
  showOffset: 200,
  ariaLabel: 'ページの先頭へ戻る',
  position: 'bottom-right',
  disabled: false,
  defaultLabel: 'トップへ',
})

const emit = defineEmits<DadsScrollTopButtonEmits>()

// Tracks current vertical scroll position. Updated by the throttled-via-event
// scroll listener below. Initialised to 0 (top of page) so SSR renders without
// crashing on the missing `window`.
const scrollY = ref(0)

// Visible only after the user has moved past the configured offset. Comparing
// strictly greater-than means showOffset=0 will reveal the button as soon as
// any scroll happens, while default (200) requires the user to demonstrate
// intent to scroll the page.
const isVisible = computed(() => scrollY.value > props.showOffset)

const rootClasses = computed(() => [
  'dads-scroll-top-button',
  `dads-scroll-top-button--${props.position}`,
])

const onScroll = () => {
  // Guard SSR / non-browser environments. In practice onMounted only fires in
  // the browser, but defensive coding keeps the unit tests simple.
  if (typeof window === 'undefined') return
  scrollY.value = window.scrollY
}

const handleClick = (event: MouseEvent) => {
  if (props.disabled) {
    event.preventDefault()
    return
  }
  if (typeof window !== 'undefined') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  emit('click', event)
}

onMounted(() => {
  if (typeof window === 'undefined') return
  // Sync once on mount so a page that loads pre-scrolled (e.g. browser
  // restored a scroll position) shows the button immediately.
  scrollY.value = window.scrollY
  window.addEventListener('scroll', onScroll, { passive: true })
})

onBeforeUnmount(() => {
  if (typeof window === 'undefined') return
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <button
    v-show="isVisible"
    type="button"
    :class="rootClasses"
    :aria-label="ariaLabel"
    :disabled="disabled"
    @click="handleClick"
  >
    <span class="dads-scroll-top-button__icon" aria-hidden="true">
      <!--
        Inline SVG so the component has zero font dependency. Stroke uses
        currentColor so the icon inherits text color from CSS tokens.
      -->
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        focusable="false"
      >
        <path
          d="M10 15V5M10 5L5 10M10 5L15 10"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </span>
    <span class="dads-scroll-top-button__label">
      <slot>{{ defaultLabel }}</slot>
    </span>
  </button>
</template>

<style scoped lang="scss">
@use '../../styles/base' as base;
@use '../../styles/focus-ring' as ring;

.dads-scroll-top-button {
  @include base.dads-reset-button;
  @include ring.dads-focus-ring;

  position: fixed;
  bottom: var(--spacing-24, 1.5rem);
  z-index: 1000;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-4, 0.25rem);
  min-width: 3rem;
  min-height: 3rem;
  padding: var(--spacing-8, 0.5rem) var(--spacing-12, 0.75rem);
  border-radius: var(--border-radius-circle, 9999px);
  background-color: var(--color-brand-primary, #0017c1);
  color: var(--color-text-on-primary, #fff);
  font-family: var(--font-family-sans, 'Noto Sans JP', sans-serif);
  font-size: var(--font-size-14, 0.875rem);
  font-weight: 500;
  line-height: var(--line-height-150, 1.5);
  box-shadow: var(--elevation-2, 0 4px 8px rgba(0, 0, 0, 0.12));
  transition:
    background-color 0.15s ease,
    box-shadow 0.15s ease,
    transform 0.15s ease;

  // -------------------- position modifiers --------------------------------
  &--bottom-right {
    right: var(--spacing-24, 1.5rem);
  }

  &--bottom-left {
    left: var(--spacing-24, 1.5rem);
  }

  // -------------------- interactive states --------------------------------
  &:hover {
    background-color: var(--color-brand-primary-hover, #002bb7);
  }

  &:active {
    background-color: var(--color-brand-primary-active, #00229f);
  }

  &:disabled,
  &[aria-disabled='true'] {
    cursor: not-allowed;
    opacity: 0.5;
    pointer-events: none;
  }

  // -------------------- internal parts ------------------------------------
  &__icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
  }

  &__label {
    font-size: var(--font-size-14, 0.875rem);
  }

  // -------------------- forced colors -------------------------------------
  @include base.dads-forced-colors {
    border: 1px solid CanvasText;
    background-color: ButtonFace;
    color: ButtonText;
  }
}
</style>
