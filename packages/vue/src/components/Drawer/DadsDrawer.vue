<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'
import DadsIcon from '../Icon/DadsIcon.vue'
import DadsDrawerItem from './DadsDrawerItem.vue'
import type {
  DadsDrawerEmits,
  DadsDrawerItem as DadsDrawerItemType,
  DadsDrawerProps,
} from './DadsDrawer.types'

const props = withDefaults(defineProps<DadsDrawerProps>(), {
  modelValue: false,
  closeLabel: '閉じる',
  defaultAriaLabel: 'ナビゲーション',
  navAriaLabel: 'ドロワーナビゲーション',
  placement: 'left',
})

const emit = defineEmits<DadsDrawerEmits>()

const panelRef = ref<HTMLElement | null>(null)

// Track which element had focus when the drawer opened so it can be restored
// on close. Module-scoped via closure rather than reactive — there is no UI
// concern that needs to react to changes here.
let previousActive: HTMLElement | null = null

const close = () => {
  emit('update:modelValue', false)
}

const onItemClick = (item: DadsDrawerItemType, event: MouseEvent) => {
  // DadsDrawerItem already filters out disabled clicks before emitting, so
  // by the time we get here the item is actionable.
  emit('click:item', item, event)
  if (item.onClick) item.onClick(event)
  // Leaf items navigate away or fire a callback — close the drawer to mirror
  // typical mobile drawer UX. Parents with children stay open so the user can
  // explore the accordion.
  if (!item.children) {
    close()
  }
}

const FOCUSABLE_SELECTOR = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'

const collectFocusables = (): HTMLElement[] => {
  if (!panelRef.value) return []
  return Array.from(panelRef.value.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR))
}

const onTab = (event: KeyboardEvent) => {
  const focusables = collectFocusables()
  if (focusables.length === 0) return
  const first = focusables[0]
  const last = focusables[focusables.length - 1]
  const active = document.activeElement as HTMLElement | null
  if (event.shiftKey) {
    if (active === first || active === panelRef.value) {
      event.preventDefault()
      last.focus()
    }
  } else if (active === last) {
    event.preventDefault()
    first.focus()
  }
}

watch(
  () => props.modelValue,
  async (open) => {
    if (open) {
      previousActive = document.activeElement as HTMLElement | null
      await nextTick()
      panelRef.value?.focus()
    } else if (previousActive) {
      previousActive.focus()
      previousActive = null
    }
  },
)
</script>

<template>
  <Teleport to="body">
    <Transition :name="`dads-drawer-${placement}`">
      <div
        v-if="modelValue"
        class="dads-drawer"
        :class="`dads-drawer--${placement}`"
        role="dialog"
        aria-modal="true"
        :aria-label="title || defaultAriaLabel"
        @keydown.esc="close"
        @keydown.tab="onTab"
      >
        <div class="dads-drawer__overlay" aria-hidden="true" @click="close" />
        <aside ref="panelRef" class="dads-drawer__panel" tabindex="-1">
          <header class="dads-drawer__header">
            <h2 v-if="title" class="dads-drawer__title">{{ title }}</h2>
            <button
              type="button"
              class="dads-drawer__close"
              :aria-label="closeLabel"
              @click="close"
            >
              <DadsIcon name="close" :size="24" />
            </button>
          </header>
          <nav class="dads-drawer__nav" :aria-label="navAriaLabel">
            <ul class="dads-drawer__list">
              <DadsDrawerItem
                v-for="(item, idx) in items"
                :key="idx"
                :item="item"
                @click:item="onItemClick"
              />
            </ul>
          </nav>
        </aside>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped lang="scss">
@use '../../styles/base' as base;
@use '../../styles/focus-ring' as ring;

.dads-drawer {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  font-family: var(--font-family-sans, 'Noto Sans JP', sans-serif);
  color: var(--color-neutral-solid-gray-800, #1a1a1a);
  line-height: 1.7; // --line-height-170
  letter-spacing: 0.02em;

  // -------------------- overlay ------------------------------------------
  &__overlay {
    position: absolute;
    inset: 0;
    // Official drawer dims the page via `::backdrop` with the
    // opacity-gray-100 token; our overlay div mirrors that value.
    background-color: var(--color-neutral-opacity-gray-100, rgba(0, 0, 0, 0.1));
  }

  // -------------------- panel --------------------------------------------
  &__panel {
    position: relative;
    display: flex;
    flex-direction: column;
    width: min(calc(288 / 16 * 1rem), 80vw); // official drawer width: 288px
    max-width: 100%;
    height: 100%;
    background-color: var(--color-neutral-white, #fff);
    box-shadow: var(--elevation-2);
    overflow-y: auto;

    &:focus {
      outline: none;
    }
  }

  // -------------------- placement ----------------------------------------
  // Default (`left`): the panel sits at the start of the flex row, matching
  // pre-2026-05 behavior. Explicit modifier kept for symmetry with right/full.
  &--left &__panel {
    margin-inline-end: auto;
  }

  &--right &__panel {
    margin-inline-start: auto;
  }

  &--full &__panel {
    width: 100%;
    max-width: 100%;
    box-shadow: none;
  }

  // -------------------- header / title / close --------------------------
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: calc(8 / 16 * 1rem);
    padding: calc(20 / 16 * 1rem) calc(16 / 16 * 1rem); // official: 20px 16px
    border-bottom: 1px solid var(--color-neutral-solid-gray-420, #949494);
  }

  &__title {
    margin: 0;
    font-size: var(--font-size-18, 1.125rem);
    font-weight: 700;
    line-height: var(--line-height-150, 1.5);
  }

  &__close {
    @include base.dads-reset-button;
    @include ring.dads-focus-ring;

    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: var(--border-radius-4, 0.25rem);
    color: var(--color-neutral-solid-gray-800, #1a1a1a);
    font-size: 1.5rem;

    &:hover {
      background-color: var(--color-neutral-solid-gray-50, #f5f5f5);
    }
  }

  // -------------------- nav / list ---------------------------------------
  &__nav {
    flex: 1 1 auto;
    padding: calc(8 / 16 * 1rem) 0;
  }

  &__list,
  &__item-children {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  // -------------------- item ---------------------------------------------
  &__item {
    display: block;
  }

  &__item-details {
    // Hide the user-agent disclosure triangle so we can ship our own chevron.
    > summary {
      list-style: none;

      &::-webkit-details-marker {
        display: none;
      }
    }

    &[open] > summary > .dads-drawer__item-chevron {
      transform: rotate(180deg);
    }
  }

  &__item-button {
    @include base.dads-reset-button;
    @include ring.dads-focus-ring;

    display: flex;
    align-items: center;
    gap: calc(12 / 16 * 1rem);
    width: 100%;
    padding: calc(12 / 16 * 1rem) calc(16 / 16 * 1rem);
    color: var(--color-neutral-solid-gray-800, #1a1a1a);
    text-decoration: none;
    font-size: var(--font-size-16, 1rem);
    line-height: 1.7; // official drawer body line-height (--line-height-170)

    &:hover {
      background-color: var(--color-neutral-solid-gray-50, #f5f5f5);
    }

    &:disabled,
    &[aria-disabled='true'] {
      cursor: not-allowed;
      opacity: 0.5;
      pointer-events: none;
    }
  }

  &__item-icon {
    font-size: 1.25em;
    line-height: 1;
  }

  &__item-label {
    flex: 1 1 auto;
    text-align: start;
  }

  &__item-chevron {
    font-size: 1.25em;
    line-height: 1;
    transition: transform 0.15s ease;
  }

  // Nested children inherit the indent so the hierarchy is visible.
  &__item-children &__item-button {
    padding-inline-start: calc(32 / 16 * 1rem);
  }

  // -------------------- forced colors -----------------------------------
  @include base.dads-forced-colors {
    &__panel {
      border: 1px solid CanvasText;
    }

    &__item-button {
      border: 1px solid transparent;
    }
  }
}

// -------------------- transitions (per placement) ----------------------
// Each placement gets its own named transition so the slide direction
// follows the visual position (left panels slide in from -X, right panels
// from +X, and full overlays just fade).
.dads-drawer-left-enter-active,
.dads-drawer-left-leave-active,
.dads-drawer-right-enter-active,
.dads-drawer-right-leave-active,
.dads-drawer-full-enter-active,
.dads-drawer-full-leave-active {
  transition: opacity 0.2s ease;

  .dads-drawer__panel {
    transition: transform 0.2s ease;
  }
}

.dads-drawer-left-enter-from,
.dads-drawer-left-leave-to {
  opacity: 0;

  .dads-drawer__panel {
    transform: translateX(-100%);
  }
}

.dads-drawer-right-enter-from,
.dads-drawer-right-leave-to {
  opacity: 0;

  .dads-drawer__panel {
    transform: translateX(100%);
  }
}

.dads-drawer-full-enter-from,
.dads-drawer-full-leave-to {
  opacity: 0;
}
</style>
