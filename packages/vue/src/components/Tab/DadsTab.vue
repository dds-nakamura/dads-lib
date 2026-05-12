<script setup lang="ts">
import { computed, nextTick, ref, useId } from 'vue'
import type { DadsTabEmits, DadsTabItem, DadsTabProps, DadsTabValue } from './DadsTab.types'

const props = withDefaults(defineProps<DadsTabProps>(), {
  keepAlive: false,
  ariaLabel: 'タブ',
})

const emit = defineEmits<DadsTabEmits>()

const generatedId = useId()
const baseId = computed(() => `dads-tab-${generatedId}`)

const tabRefs = ref<HTMLButtonElement[]>([])

const isActive = (item: DadsTabItem) => item.value === props.modelValue

const onSelect = (item: DadsTabItem) => {
  if (item.disabled || isActive(item)) return
  emit('update:modelValue', item.value)
  emit('change', item.value)
}

const focusTab = (index: number) => {
  void nextTick(() => {
    tabRefs.value[index]?.focus()
  })
}

const onKeydown = (event: KeyboardEvent) => {
  // Indices of items that can receive focus / activation.
  const enabledIndices = props.items
    .map((item, idx) => (item.disabled ? -1 : idx))
    .filter((idx) => idx >= 0)

  if (enabledIndices.length === 0) return

  const currentIdx = props.items.findIndex((item) => item.value === props.modelValue)
  const currentEnabledIdx = enabledIndices.indexOf(currentIdx)

  // When there is no valid current selection (modelValue missing / disabled),
  // both arrow keys converge on the first enabled tab.
  const safeEnabledIdx = currentEnabledIdx === -1 ? 0 : currentEnabledIdx
  const last = enabledIndices.length - 1

  let nextIdx: number | null = null

  switch (event.key) {
    case 'ArrowRight':
      nextIdx = enabledIndices[(safeEnabledIdx + 1) % enabledIndices.length]
      break
    case 'ArrowLeft':
      nextIdx = enabledIndices[(safeEnabledIdx - 1 + enabledIndices.length) % enabledIndices.length]
      break
    case 'Home':
      nextIdx = enabledIndices[0]
      break
    case 'End':
      nextIdx = enabledIndices[last]
      break
    case 'Enter':
    case ' ':
      // Active tab already owns focus; Enter / Space are no-ops.
      return
    default:
      return
  }

  if (nextIdx === currentIdx) return

  event.preventDefault()
  const nextItem = props.items[nextIdx]
  emit('update:modelValue', nextItem.value)
  emit('change', nextItem.value)
  focusTab(nextIdx)
}

const tabClasses = (item: DadsTabItem) => [
  'dads-tab__tab',
  {
    'dads-tab__tab--active': isActive(item),
    'dads-tab__tab--disabled': item.disabled,
  },
]

const tabId = (value: DadsTabValue) => `${baseId.value}-tab-${value}`
const panelId = (value: DadsTabValue) => `${baseId.value}-panel-${value}`
</script>

<template>
  <div class="dads-tab">
    <div role="tablist" class="dads-tab__list" :aria-label="ariaLabel" @keydown="onKeydown">
      <button
        v-for="item in items"
        :id="tabId(item.value)"
        :key="String(item.value)"
        ref="tabRefs"
        type="button"
        role="tab"
        :aria-selected="isActive(item)"
        :aria-controls="panelId(item.value)"
        :tabindex="isActive(item) ? 0 : -1"
        :disabled="item.disabled || undefined"
        :class="tabClasses(item)"
        @click="onSelect(item)"
      >
        {{ item.label }}
      </button>
    </div>

    <div class="dads-tab__panels">
      <div
        v-for="item in items"
        v-show="isActive(item)"
        :id="panelId(item.value)"
        :key="String(item.value)"
        role="tabpanel"
        :aria-labelledby="tabId(item.value)"
        :hidden="!keepAlive && !isActive(item) ? true : undefined"
        class="dads-tab__panel"
        :tabindex="0"
      >
        <slot v-if="keepAlive || isActive(item)" :name="`panel-${item.value}`" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '../../styles/base' as base;
@use '../../styles/focus-ring' as ring;

.dads-tab {
  display: flex;
  flex-direction: column;
  font-family: var(--font-family-sans, 'Noto Sans JP', sans-serif);
  color: var(--color-text-primary, #1a1a1a);

  // -------------------- tablist ------------------------------------------
  &__list {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-4, 0.25rem);
    border-bottom: 1px solid var(--color-border-divider, #d6d6d6);
  }

  // -------------------- tab button ---------------------------------------
  &__tab {
    @include base.dads-reset-button;
    @include ring.dads-focus-ring;

    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 2.75rem; // 44px
    padding: 0 var(--spacing-16, 1rem);
    font-size: var(--font-size-16, 1rem);
    font-weight: 500;
    line-height: var(--line-height-150, 1.5);
    color: var(--color-text-secondary, #4d4d4d);
    background-color: transparent;
    border-radius: var(--border-radius-4, 0.25rem) var(--border-radius-4, 0.25rem) 0 0;
    transition:
      color 0.15s ease,
      background-color 0.15s ease;

    // 2px underline drawn via ::after so it can sit on top of the list border.
    &::after {
      content: '';
      position: absolute;
      left: var(--spacing-8, 0.5rem);
      right: var(--spacing-8, 0.5rem);
      bottom: -1px;
      height: 2px;
      background-color: transparent;
      transition: background-color 0.15s ease;
    }

    &:hover {
      background-color: var(--color-bg-subtle, #f0f0f0);
      color: var(--color-text-primary, #1a1a1a);
    }

    // -------------------- active --------------------------------------
    &--active {
      color: var(--color-brand-primary, #0017c1);

      &::after {
        background-color: var(--color-brand-primary, #0017c1);
      }
    }

    // -------------------- disabled ------------------------------------
    &:disabled,
    &--disabled {
      color: var(--color-text-disabled, #999);
      cursor: not-allowed;
      pointer-events: none;
      opacity: 0.5;
    }
  }

  // -------------------- panels -------------------------------------------
  &__panels {
    flex: 1 1 auto;
  }

  &__panel {
    @include ring.dads-focus-ring;

    padding: var(--spacing-16, 1rem) 0;
  }

  // -------------------- forced colors ------------------------------------
  @include base.dads-forced-colors {
    .dads-tab__list {
      border-bottom: 1px solid CanvasText;
    }

    .dads-tab__tab--active::after {
      background-color: CanvasText;
    }
  }
}
</style>
