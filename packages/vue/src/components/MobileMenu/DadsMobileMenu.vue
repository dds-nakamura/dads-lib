<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'
import DadsMenuList from '../MenuList/DadsMenuList.vue'
import DadsUtilityLink from '../UtilityLink/DadsUtilityLink.vue'
import type { DadsMenuListItem } from '../MenuList/DadsMenuList.types'
import type { DadsUtilityLinkItem } from '../UtilityLink/DadsUtilityLink.types'
import type { DadsMobileMenuEmits, DadsMobileMenuProps } from './DadsMobileMenu.types'

const props = withDefaults(defineProps<DadsMobileMenuProps>(), {
  modelValue: false,
  utilityItems: undefined,
  ariaLabel: 'モバイルメニュー',
  closeLabel: '閉じる',
  showCloseButton: true,
})

const emit = defineEmits<DadsMobileMenuEmits>()

const panelRef = ref<HTMLElement | null>(null)

// Track which element had focus when the menu opened so it can be restored on
// close — mirrors DadsDrawer / DadsModal focus-management semantics.
let previousActive: HTMLElement | null = null

const close = () => {
  emit('update:modelValue', false)
}

const onMenuItemClick = (item: DadsMenuListItem, event: MouseEvent) => {
  emit('click:item', item, event)
  // Auto-close on leaf navigation (no children) — same UX as DadsDrawer so the
  // user does not have to dismiss the menu manually after picking a destination.
  if (!item.children || item.children.length === 0) {
    close()
  }
}

const onUtilityItemClick = (item: DadsUtilityLinkItem, index: number, event: MouseEvent) => {
  emit('click:utility', item, index, event)
  close()
}

const FOCUSABLE_SELECTOR = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'

const collectFocusables = (): HTMLElement[] => {
  if (!panelRef.value) return []
  return Array.from(panelRef.value.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR))
}

const onTabTrap = (event: KeyboardEvent) => {
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
    <Transition name="dads-mobile-menu">
      <div
        v-if="modelValue"
        class="dads-mobile-menu"
        role="dialog"
        aria-modal="true"
        :aria-label="ariaLabel"
        @keydown.esc="close"
        @keydown.tab="onTabTrap"
      >
        <div class="dads-mobile-menu__overlay" aria-hidden="true" @click="close" />
        <div ref="panelRef" class="dads-mobile-menu__panel" tabindex="-1">
          <header v-if="showCloseButton" class="dads-mobile-menu__header">
            <button
              type="button"
              class="dads-mobile-menu__close"
              :aria-label="closeLabel"
              @click="close"
            >
              <svg
                class="dads-mobile-menu__close-icon"
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
            </button>
          </header>
          <nav class="dads-mobile-menu__nav" aria-label="メインナビゲーション">
            <DadsMenuList :items="items" type="box" @click:item="onMenuItemClick" />
          </nav>
          <div v-if="utilityItems && utilityItems.length > 0" class="dads-mobile-menu__utility">
            <DadsUtilityLink
              :items="utilityItems"
              aria-label="補助リンク"
              @click:item="onUtilityItemClick"
            />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped lang="scss">
@use '../../styles/base' as base;
@use '../../styles/focus-ring' as ring;

.dads-mobile-menu {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  font-family: var(--font-family-sans, 'Noto Sans JP', sans-serif);
  color: var(--color-neutral-solid-gray-800, #1a1a1c);

  // -------------------- overlay ------------------------------------------
  &__overlay {
    position: absolute;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.5);
  }

  // -------------------- panel --------------------------------------------
  // Full-width slide-down panel covering the viewport. On larger screens the
  // panel narrows but stays anchored to the top so the layout still reads as
  // a mobile-style menu attached to the Header.
  &__panel {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    max-height: 100vh;
    background-color: var(--color-background-base, #fff);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
    overflow-y: auto;

    &:focus {
      outline: none;
    }
  }

  // -------------------- header (close button row) ------------------------
  &__header {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: var(--spacing-8, 0.5rem);
    padding: var(--spacing-8, 0.5rem) var(--spacing-16, 1rem);
    border-bottom: 1px solid var(--color-neutral-solid-gray-100, #e5e5e5);
  }

  &__close {
    @include base.dads-reset-button;
    @include ring.dads-focus-ring;

    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem; // 40px touch target
    height: 2.5rem;
    border-radius: var(--border-radius-4, 0.25rem);
    color: var(--color-neutral-solid-gray-800, #1a1a1c);

    &:hover {
      background-color: var(--color-neutral-solid-gray-50, #f3f4f5);
    }
  }

  &__close-icon {
    width: 1.5rem;
    height: 1.5rem;
    color: currentcolor;
  }

  // -------------------- nav (main menu) ----------------------------------
  &__nav {
    flex: 1 1 auto;
    padding: var(--spacing-8, 0.5rem) 0;
  }

  // -------------------- utility links ------------------------------------
  &__utility {
    padding: var(--spacing-16, 1rem);
    border-top: 1px solid var(--color-neutral-solid-gray-100, #e5e5e5);
  }

  // -------------------- forced colors ------------------------------------
  @include base.dads-forced-colors {
    &__panel {
      border: 1px solid CanvasText;
    }

    &__close {
      border: 1px solid transparent;
    }
  }
}

// -------------------- transition ---------------------------------------
.dads-mobile-menu-enter-active,
.dads-mobile-menu-leave-active {
  transition: opacity 0.2s ease;

  .dads-mobile-menu__panel {
    transition: transform 0.2s ease;
  }
}

.dads-mobile-menu-enter-from,
.dads-mobile-menu-leave-to {
  opacity: 0;

  .dads-mobile-menu__panel {
    transform: translateY(-1rem);
  }
}
</style>
