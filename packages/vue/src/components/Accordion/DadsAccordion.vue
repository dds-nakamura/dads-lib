<script setup lang="ts">
import { computed, ref, useId, watch } from 'vue'
import type { DadsAccordionEmits, DadsAccordionProps } from './DadsAccordion.types'

const props = withDefaults(defineProps<DadsAccordionProps>(), {
  modelValue: undefined,
  defaultOpen: false,
  headingLevel: 3,
  disabled: false,
  backLink: false,
  backLinkLabel: undefined,
})

const emit = defineEmits<DadsAccordionEmits>()

// -------------------- ids --------------------------------------------------

const generatedId = useId()
const summaryId = computed(() => `dads-accordion-${generatedId}-summary`)

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

// -------------------- derived view state ----------------------------------

const headingTag = computed(() => `h${props.headingLevel}`)

const backLinkText = computed(() => props.backLinkLabel ?? `「${props.title}」の先頭に戻る`)
</script>

<template>
  <details
    ref="detailsRef"
    class="dads-accordion"
    :open="isOpen"
    :aria-disabled="disabled || undefined"
  >
    <summary
      :id="summaryId"
      class="dads-accordion__summary"
      :aria-expanded="isOpen"
      :aria-disabled="disabled || undefined"
      :tabindex="disabled ? -1 : 0"
      @click="onSummaryClick"
      @keydown="onSummaryKeydown"
    >
      <span class="dads-accordion__icon">
        <svg
          class="dads-accordion__icon-svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M3.3 7.3L12 16L20.7 7.3" fill="none" stroke="currentcolor" stroke-width="2" />
        </svg>
      </span>
      <component :is="headingTag">{{ title }}</component>
    </summary>
    <div class="dads-accordion__content">
      <slot />
      <a v-if="backLink" :href="`#${summaryId}`" class="dads-accordion__back-link">
        <svg
          class="dads-accordion__back-link-icon"
          width="24"
          height="24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M6 7V14.5C6 16.8 8.2 19 10.5 19C12.8 19 15 16.8 15 14.5V6M10.709 9.7L15 5.414L19.291 9.7"
            stroke="currentcolor"
            stroke-width="2"
          />
        </svg>
        {{ backLinkText }}
      </a>
    </div>
  </details>
</template>

<style scoped lang="scss">
// Scoped port of the official `accordion.css`
// (design-system-example-components-html/src/components/accordion/accordion.css).
// Class names, DOM structure, inline SVG, responsive media queries, focus,
// hover and back-link styles are reproduced 1:1.

.dads-accordion {
  --_icon-size: calc(20 / 16 * 1rem);
  border-bottom: 1px solid var(--color-neutral-solid-gray-420);
}

@media (min-width: 48rem) {
  .dads-accordion {
    --_icon-size: calc(32 / 16 * 1rem);
  }
}

.dads-accordion__summary {
  position: relative;
  display: block;
  padding: calc(8 / 16 * 1rem) calc(8 / 16 * 1rem) calc(8 / 16 * 1rem)
    calc(var(--_icon-size) + 0.75rem);
  color: var(--color-neutral-solid-gray-800);
  font-weight: normal;
  font-size: calc(16 / 16 * 1rem);
  line-height: 1.7;
  font-family: var(--font-family-sans);
  letter-spacing: 0.02em;
  cursor: default;
}

.dads-accordion__summary::marker {
  content: '';
}

.dads-accordion__summary::-webkit-details-marker {
  display: none;
}

@media (min-width: 48rem) {
  .dads-accordion__summary {
    padding: calc(16 / 16 * 1rem) calc(16 / 16 * 1rem) calc(16 / 16 * 1rem)
      calc(var(--_icon-size) + calc(20 / 16 * 1rem));
    font-size: calc(18 / 16 * 1rem);
    line-height: 1.6;
  }
}

@media (hover: hover) {
  .dads-accordion__summary:hover:not(:focus-visible) {
    background-color: var(--color-neutral-solid-gray-50);
  }
}

.dads-accordion__summary:focus-visible {
  outline: calc(4 / 16 * 1rem) solid var(--color-neutral-black);
  outline-offset: calc(2 / 16 * 1rem);
  border-radius: calc(4 / 16 * 1rem);
  background-color: var(--color-primitive-yellow-300);
  box-shadow: 0 0 0 calc(2 / 16 * 1rem) var(--color-primitive-yellow-300);
}

.dads-accordion__icon {
  position: absolute;
  top: calc(8 / 16 * 1rem);
  left: calc(2 / 16 * 1rem);
  margin-top: calc((1lh - var(--_icon-size)) / 2);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: var(--_icon-size);
  height: var(--_icon-size);
  border-radius: 50%;
  border: 1px solid currentcolor;
  background-color: var(--color-neutral-white);
  color: var(--color-primitive-blue-1000);
}

@media (min-width: 48rem) {
  .dads-accordion__icon {
    top: calc(14 / 16 * 1rem);
    left: calc(6 / 16 * 1rem);
  }
}

.dads-accordion[open] .dads-accordion__icon {
  transform: rotate(180deg);
}

@media (hover: hover) {
  .dads-accordion__summary:hover .dads-accordion__icon {
    outline: calc(2 / 16 * 1rem) solid currentcolor;
  }
}

.dads-accordion__icon-svg {
  margin-top: calc(2 / 16 * 1rem);
  width: calc(16 / 16 * 1rem);
  height: calc(16 / 16 * 1rem);
  pointer-events: none;
}

@media (min-width: 48rem) {
  .dads-accordion__icon-svg {
    width: auto;
    height: auto;
  }
}

.dads-accordion__summary :is(h1, h2, h3, h4, h5, h6) {
  margin: 0;
  font: inherit;
}

.dads-accordion__content {
  padding: calc(16 / 16 * 1rem) calc(8 / 16 * 1rem) calc(16 / 16 * 1rem)
    calc(var(--_icon-size) + 0.75rem);
}

@media (min-width: 48rem) {
  .dads-accordion__content {
    padding: calc(24 / 16 * 1rem) calc(16 / 16 * 1rem) calc(24 / 16 * 1rem)
      calc(var(--_icon-size) + 1.25rem);
  }
}

.dads-accordion__back-link:any-link {
  display: flex;
  align-items: flex-start;
  gap: calc(6 / 16 * 1rem);
  width: fit-content;
  color: var(--color-primitive-blue-1000);
  text-decoration: underline;
  text-decoration-thickness: calc(1 / 16 * 1rem);
  text-underline-offset: calc(3 / 16 * 1rem);
  text-spacing-trim: trim-start;
}

@media (hover: hover) {
  .dads-accordion__back-link:hover {
    color: var(--color-primitive-blue-900);
    text-decoration-thickness: calc(3 / 16 * 1rem);
  }
}

.dads-accordion__back-link:active {
  color: var(--color-primitive-orange-800);
  text-decoration-thickness: calc(1 / 16 * 1rem);
}

.dads-accordion__back-link:focus-visible {
  outline: calc(4 / 16 * 1rem) solid var(--color-neutral-black);
  outline-offset: calc(2 / 16 * 1rem);
  border-radius: calc(4 / 16 * 1rem);
  background-color: var(--color-primitive-yellow-300);
  box-shadow: 0 0 0 calc(2 / 16 * 1rem) var(--color-primitive-yellow-300);
}

.dads-accordion__back-link-icon {
  margin-top: calc((1lh - 24 / 16 * 1rem) / 2);
  flex-shrink: 0;
}

// -------------------- disabled --------------------------------------------
// Official accordion has no disabled state; the a3-deferred decision keeps the
// dimming affordance. Mirror DadsDisclosure: dim and block interaction.
.dads-accordion[aria-disabled='true'] {
  .dads-accordion__summary {
    cursor: not-allowed;
    opacity: 0.6;

    @media (hover: hover) {
      &:hover:not(:focus-visible) {
        background-color: transparent;
      }

      &:hover .dads-accordion__icon {
        outline: none;
      }
    }
  }
}
</style>
