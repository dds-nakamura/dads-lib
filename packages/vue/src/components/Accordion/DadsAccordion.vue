<script setup lang="ts">
import { computed, nextTick, ref, useId } from 'vue'
import type {
  DadsAccordionEmits,
  DadsAccordionItem,
  DadsAccordionProps,
} from './DadsAccordion.types'

const props = withDefaults(defineProps<DadsAccordionProps>(), {
  modelValue: () => '',
  type: 'single',
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

const itemClasses = (item: DadsAccordionItem) => [
  'dads-accordion__item',
  {
    'dads-accordion__item--open': isOpen(item.id),
    'dads-accordion__item--disabled': item.disabled,
  },
]
</script>

<template>
  <div class="dads-accordion">
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
            <i class="mdi" :class="isOpen(item.id) ? 'mdi-chevron-up' : 'mdi-chevron-down'" />
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
  color: var(--color-text-primary, #1a1a1a);
  border-top: 1px solid var(--color-border-divider, #d6d6d6);

  // -------------------- item ---------------------------------------------
  &__item {
    border-bottom: 1px solid var(--color-border-divider, #d6d6d6);

    &--disabled {
      color: var(--color-text-disabled, #999);
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
    @include ring.dads-focus-ring;

    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--spacing-12, 0.75rem);
    width: 100%;
    min-height: 3rem; // 48px keeps the touch target generous.
    padding: var(--spacing-12, 0.75rem) var(--spacing-16, 1rem);
    font-size: var(--font-size-16, 1rem);
    font-weight: 500;
    line-height: var(--line-height-150, 1.5);
    color: inherit;
    background-color: transparent;
    transition: background-color 0.15s ease;

    &:hover:not(:disabled) {
      background-color: var(--color-bg-subtle, #f0f0f0);
    }

    &:disabled {
      color: var(--color-text-disabled, #999);
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
    color: var(--color-text-secondary, #4d4d4d);
  }

  // -------------------- panel --------------------------------------------
  &__panel {
    padding: var(--spacing-12, 0.75rem) var(--spacing-16, 1rem) var(--spacing-16, 1rem);
    font-size: var(--font-size-16, 1rem);
    line-height: var(--line-height-150, 1.5);
    color: var(--color-text-primary, #1a1a1a);
  }

  // -------------------- forced colors ------------------------------------
  @include base.dads-forced-colors {
    border-top: 1px solid CanvasText;

    .dads-accordion__item {
      border-bottom: 1px solid CanvasText;
    }

    .dads-accordion__icon {
      color: CanvasText;
    }
  }
}
</style>
