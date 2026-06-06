<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, useId, watch } from 'vue'
import DadsMenuList from '../MenuList/DadsMenuList.vue'
import type { DadsMenuListItem } from '../MenuList/DadsMenuList.types'
import type { DadsMegaMenuEmits, DadsMegaMenuProps } from './DadsMegaMenu.types'

const props = withDefaults(defineProps<DadsMegaMenuProps>(), {
  modelValue: false,
  ariaLabel: undefined,
})

const emit = defineEmits<DadsMegaMenuEmits>()

// Stable ids so aria-controls / aria-labelledby remain consistent across renders.
const generatedId = useId()
const triggerId = computed(() => `dads-mega-menu-trigger-${generatedId}`)
const panelId = computed(() => `dads-mega-menu-panel-${generatedId}`)

const rootRef = ref<HTMLElement | null>(null)
const triggerRef = ref<HTMLButtonElement | null>(null)

const isOpen = computed(() => props.modelValue)

const open = () => {
  if (isOpen.value) return
  emit('update:modelValue', true)
}

const close = (returnFocus = false) => {
  if (!isOpen.value) return
  emit('update:modelValue', false)
  if (returnFocus) triggerRef.value?.focus()
}

const toggle = () => {
  if (isOpen.value) close()
  else open()
}

const onTriggerClick = (event: MouseEvent) => {
  event.preventDefault()
  toggle()
}

const onTriggerKeydown = (event: KeyboardEvent) => {
  switch (event.key) {
    case 'Enter':
    case ' ':
      event.preventDefault()
      toggle()
      break
    case 'ArrowDown':
      event.preventDefault()
      open()
      break
  }
}

const onPanelKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    event.preventDefault()
    close(true)
  }
}

// Item clicks bubble up from any column's DadsMenuList. Re-emit at the
// mega-menu level so consumers subscribe to a single source and auto-close.
const onMenuClick = (item: DadsMenuListItem, event: MouseEvent) => {
  emit('click:item', item, event)
  if (!item.disabled) close()
}

// Listen on document so clicks outside the root close the panel.
const onDocumentPointerDown = (event: MouseEvent) => {
  if (!isOpen.value) return
  const target = event.target as Node | null
  if (target && rootRef.value && rootRef.value.contains(target)) return
  close()
}

onMounted(() => {
  document.addEventListener('pointerdown', onDocumentPointerDown, true)
})

onBeforeUnmount(() => {
  document.removeEventListener('pointerdown', onDocumentPointerDown, true)
})

// Close on Escape even when focus is on the trigger (panel handles its own).
const onTriggerEscape = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && isOpen.value) {
    event.preventDefault()
    close(true)
  }
}

// External v-model flip → no extra work; computed `isOpen` follows automatically.
watch(
  () => props.modelValue,
  () => {
    // Intentionally empty — placeholder for future hooks (e.g. body scroll lock).
  },
)
</script>

<template>
  <div ref="rootRef" class="dads-mega-menu" :class="{ 'dads-mega-menu--open': isOpen }">
    <button
      :id="triggerId"
      ref="triggerRef"
      type="button"
      class="dads-mega-menu__trigger"
      :aria-expanded="isOpen"
      :aria-controls="panelId"
      aria-haspopup="dialog"
      @click="onTriggerClick"
      @keydown="onTriggerKeydown"
      @keydown.esc="onTriggerEscape"
    >
      <span class="dads-mega-menu__trigger-label">{{ triggerLabel }}</span>
      <svg
        class="dads-mega-menu__trigger-arrow"
        :class="{ 'dads-mega-menu__trigger-arrow--open': isOpen }"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="currentcolor"
        aria-hidden="true"
      >
        <path d="m20.5 6.6-8 8-8-8L3.1 8l9.4 9.4L21.9 8l-1.4-1.4Z" />
      </svg>
    </button>

    <div
      v-show="isOpen"
      :id="panelId"
      class="dads-mega-menu__panel"
      role="dialog"
      :aria-label="ariaLabel || triggerLabel"
      :aria-labelledby="ariaLabel ? undefined : triggerId"
      @keydown="onPanelKeydown"
    >
      <div class="dads-mega-menu__columns">
        <section v-for="(column, idx) in columns" :key="idx" class="dads-mega-menu__column">
          <h3 v-if="column.heading" class="dads-mega-menu__heading">
            {{ column.heading }}
          </h3>
          <DadsMenuList :items="column.items" @click:item="onMenuClick" />
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '../../styles/base' as base;
@use '../../styles/focus-ring' as ring;

.dads-mega-menu {
  position: relative;
  display: inline-block;
  font-family: var(--font-family-sans, 'Noto Sans JP', sans-serif);
  color: var(--color-neutral-solid-gray-900, #1a1a1c);

  // -------------------- trigger button -----------------------------------
  &__trigger {
    @include base.dads-reset-button;
    @include ring.dads-focus-ring;

    display: inline-flex;
    align-items: center;
    gap: calc(4 / 16 * 1rem);
    min-height: 2.75rem;
    padding: calc(8 / 16 * 1rem) calc(16 / 16 * 1rem);
    border-radius: var(--border-radius-4, 0.25rem);
    color: inherit;
    font-weight: 700;
    font-size: var(--font-size-16, 1rem);
    line-height: var(--line-height-150, 1.5);

    &:hover {
      background-color: var(--color-neutral-solid-gray-50, #f3f4f5);
    }
  }

  &__trigger-label {
    white-space: nowrap;
  }

  &__trigger-arrow {
    flex-shrink: 0;
    transition: transform 0.15s ease;

    &--open {
      transform: rotate(180deg);
    }
  }

  // -------------------- panel --------------------------------------------
  &__panel {
    position: absolute;
    top: calc(100% + 0.25rem);
    left: 0;
    z-index: 20;
    min-width: 16rem;
    background-color: var(--color-neutral-white, #fff);
    border: 1px solid var(--color-border-default, rgba(0, 0, 0, 0.1));
    border-radius: var(--border-radius-8, 0.5rem);
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.12);
    padding: calc(16 / 16 * 1rem);
  }

  // -------------------- columns layout -----------------------------------
  &__columns {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
    gap: calc(24 / 16 * 1rem);
  }

  &__column {
    display: flex;
    flex-direction: column;
    gap: calc(8 / 16 * 1rem);
    min-width: 12rem;
  }

  &__heading {
    margin: 0;
    padding: 0 calc(16 / 16 * 1rem);
    color: var(--color-neutral-solid-gray-700, #41464d);
    font-size: var(--font-size-14, 0.875rem);
    font-weight: 700;
    line-height: var(--line-height-150, 1.5);
    text-transform: none;
  }

  // -------------------- forced colors ------------------------------------
  @include base.dads-forced-colors {
    &__trigger {
      border: 1px solid CanvasText;
    }

    &__panel {
      border: 1px solid CanvasText;
    }
  }
}
</style>
