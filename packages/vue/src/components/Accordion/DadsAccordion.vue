<script setup lang="ts">
import { computed, nextTick, ref, useId } from 'vue'
import DadsIcon from '../Icon/DadsIcon.vue'
import type {
  DadsAccordionEmits,
  DadsAccordionItem,
  DadsAccordionProps,
} from './DadsAccordion.types'

const props = withDefaults(defineProps<DadsAccordionProps>(), {
  modelValue: () => '',
  type: 'single',
  size: 'm',
})

const emit = defineEmits<DadsAccordionEmits>()

const generatedId = useId()
const baseId = computed(() => `dads-accordion-${generatedId}`)

const headerRefs = ref<HTMLButtonElement[]>([])

// -------------------- open / closed state ---------------------------------

const isOpen = (id: string): boolean => {
  if (props.type === 'multiple') {
    return Array.isArray(props.modelValue) && props.modelValue.includes(id)
  }
  return props.modelValue === id
}

const toggle = (item: DadsAccordionItem) => {
  if (item.disabled) return
  if (props.type === 'multiple') {
    const current = Array.isArray(props.modelValue) ? props.modelValue : []
    const next = current.includes(item.id)
      ? current.filter((v) => v !== item.id)
      : [...current, item.id]
    emit('update:modelValue', next)
    return
  }
  // single mode: clicking the open panel closes it.
  emit('update:modelValue', props.modelValue === item.id ? '' : item.id)
}

// -------------------- keyboard navigation ---------------------------------

const focusHeader = (index: number) => {
  void nextTick(() => {
    headerRefs.value[index]?.focus()
  })
}

const onKeydown = (event: KeyboardEvent, currentIdx: number) => {
  // Indices of items that can receive focus.
  const enabledIndices = props.items
    .map((item, idx) => (item.disabled ? -1 : idx))
    .filter((idx) => idx >= 0)

  if (enabledIndices.length === 0) return

  const currentEnabledIdx = enabledIndices.indexOf(currentIdx)
  // Fallback to the first enabled header if the current one is disabled
  // (shouldn't usually happen, but keeps wrap-around math sane).
  const safeEnabledIdx = currentEnabledIdx === -1 ? 0 : currentEnabledIdx
  const len = enabledIndices.length

  let nextIdx: number
  switch (event.key) {
    case 'ArrowDown':
      nextIdx = enabledIndices[(safeEnabledIdx + 1) % len]
      break
    case 'ArrowUp':
      nextIdx = enabledIndices[(safeEnabledIdx - 1 + len) % len]
      break
    case 'Home':
      nextIdx = enabledIndices[0]
      break
    case 'End':
      nextIdx = enabledIndices[len - 1]
      break
    default:
      return
  }

  event.preventDefault()
  focusHeader(nextIdx)
}

// -------------------- id helpers ------------------------------------------

const headerId = (id: string) => `${baseId.value}-header-${id}`
const panelId = (id: string) => `${baseId.value}-panel-${id}`

// Icon edge length per size token, mirroring the `&__icon` font-size scale
// in the stylesheet (l 24 / m 20 / s 18 / xs 16).
const iconSize = computed(() => {
  switch (props.size) {
    case 'l':
      return 24
    case 's':
      return 18
    case 'xs':
      return 16
    case 'm':
    default:
      return 20
  }
})

const itemClasses = (item: DadsAccordionItem) => [
  'dads-accordion__item',
  {
    'dads-accordion__item--open': isOpen(item.id),
    'dads-accordion__item--disabled': item.disabled,
  },
]
</script>

<template>
  <div :class="['dads-accordion', `dads-accordion--size-${size}`]">
    <div v-for="(item, idx) in items" :key="item.id" :class="itemClasses(item)">
      <h3 class="dads-accordion__heading">
        <button
          :id="headerId(item.id)"
          ref="headerRefs"
          type="button"
          class="dads-accordion__header"
          :aria-expanded="isOpen(item.id)"
          :aria-controls="panelId(item.id)"
          :disabled="item.disabled || undefined"
          @click="toggle(item)"
          @keydown="onKeydown($event, idx)"
        >
          <span class="dads-accordion__title">{{ item.title }}</span>
          <span class="dads-accordion__icon" aria-hidden="true">
            <DadsIcon
              :name="isOpen(item.id) ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
              :size="iconSize"
            />
          </span>
        </button>
      </h3>
      <div
        v-show="isOpen(item.id)"
        :id="panelId(item.id)"
        role="region"
        class="dads-accordion__panel"
        :aria-labelledby="headerId(item.id)"
      >
        <slot :name="`panel-${item.id}`" />
        <p v-if="returnLink" class="dads-accordion__return-link">
          <a :href="returnLink.href">{{ returnLink.label }}</a>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '../../styles/base' as base;
@use '../../styles/focus-ring' as ring;

.dads-accordion {
  display: flex;
  flex-direction: column;
  font-family: var(--font-family-sans, 'Noto Sans JP', sans-serif);
  color: var(--color-neutral-solid-gray-800, #333333);

  // -------------------- item ---------------------------------------------
  // Official `accordion.css` draws only a bottom border per item (no top rule).
  &__item {
    border-bottom: 1px solid var(--color-neutral-solid-gray-420, #949494);

    &--disabled {
      color: var(--color-neutral-solid-gray-420, #949494);
    }
  }

  // -------------------- heading wrapper ----------------------------------
  // Reset native h3 spacing so the header button owns the rhythm.
  &__heading {
    margin: 0;
    padding: 0;
    font-size: inherit;
    font-weight: inherit;
  }

  // -------------------- header button ------------------------------------
  &__header {
    @include base.dads-reset-button;
    @include ring.dads-focus-ring-fill;

    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: calc(12 / 16 * 1rem);
    width: 100%;
    min-height: 3rem; // 48px keeps the touch target generous.
    padding: calc(12 / 16 * 1rem) calc(16 / 16 * 1rem);
    font-size: var(--font-size-16, 1rem);
    font-weight: normal;
    line-height: var(--line-height-170, 1.7);
    letter-spacing: 0.02em;
    color: inherit;
    background-color: transparent;
    transition: background-color 0.15s ease;

    &:hover:not(:disabled) {
      background-color: var(--color-neutral-solid-gray-50, #f2f2f2);
    }

    &:disabled {
      color: var(--color-neutral-solid-gray-420, #949494);
      cursor: not-allowed;
      opacity: 0.6;
    }
  }

  // -------------------- title --------------------------------------------
  &__title {
    flex: 1 1 auto;
    text-align: left;
  }

  // -------------------- icon ---------------------------------------------
  &__icon {
    flex: 0 0 auto;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: var(--font-size-20, 1.25rem);
    color: var(--color-primitive-blue-1000, #00118f);
  }

  // -------------------- size variants ------------------------------------
  // Per official DADS scale L/M/S/XS — drives header padding + icon size.
  &--size-l &__header {
    min-height: 4rem;
    padding: calc(16 / 16 * 1rem) calc(16 / 16 * 1rem);
    font-size: var(--font-size-18, 1.125rem);
  }
  &--size-l &__icon {
    font-size: var(--font-size-24, 1.5rem);
  }
  &--size-m &__header {
    min-height: 3rem;
    padding: calc(12 / 16 * 1rem) calc(16 / 16 * 1rem);
    font-size: var(--font-size-16, 1rem);
  }
  &--size-m &__icon {
    font-size: var(--font-size-20, 1.25rem);
  }
  &--size-s &__header {
    min-height: 2.5rem;
    padding: calc(8 / 16 * 1rem) calc(12 / 16 * 1rem);
    font-size: var(--font-size-14, 0.875rem);
  }
  &--size-s &__icon {
    font-size: var(--font-size-18, 1.125rem);
  }
  &--size-xs &__header {
    min-height: 2rem;
    padding: calc(4 / 16 * 1rem) calc(12 / 16 * 1rem);
    font-size: var(--font-size-14, 0.875rem);
  }
  &--size-xs &__icon {
    font-size: var(--font-size-16, 1rem);
  }

  // -------------------- return link -------------------------------------
  &__return-link {
    margin: calc(16 / 16 * 1rem) 0 0;
    text-align: end;

    a {
      color: var(--color-primitive-blue-1000, #00118f);
      text-decoration: underline;
      text-decoration-thickness: calc(1 / 16 * 1rem);
      text-underline-offset: calc(3 / 16 * 1rem);
      font-size: var(--font-size-14, 0.875rem);

      &:hover {
        color: var(--color-primitive-blue-900, #0017c1);
        text-decoration: underline;
        text-decoration-thickness: calc(3 / 16 * 1rem);
      }

      &:active {
        color: var(--color-primitive-orange-800, #c74700);
        text-decoration-thickness: calc(1 / 16 * 1rem);
      }
    }
  }

  // -------------------- panel --------------------------------------------
  &__panel {
    padding: calc(12 / 16 * 1rem) calc(16 / 16 * 1rem) calc(16 / 16 * 1rem);
    font-size: var(--font-size-16, 1rem);
    line-height: var(--line-height-170, 1.7);
    color: var(--color-neutral-solid-gray-800, #333333);
  }

  // -------------------- forced colors ------------------------------------
  @include base.dads-forced-colors {
    .dads-accordion__item {
      border-bottom: 1px solid CanvasText;
    }

    .dads-accordion__icon {
      color: CanvasText;
    }
  }
}
</style>
