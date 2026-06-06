<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import DadsMenuList from '../MenuList/DadsMenuList.vue'
import DadsUtilityLink from '../UtilityLink/DadsUtilityLink.vue'
import type { DadsMenuListItem } from '../MenuList/DadsMenuList.types'
import type { DadsUtilityLinkItem } from '../UtilityLink/DadsUtilityLink.types'
import type {
  DadsMobileMenuEmits,
  DadsMobileMenuItem,
  DadsMobileMenuProps,
} from './DadsMobileMenu.types'

const props = withDefaults(defineProps<DadsMobileMenuProps>(), {
  modelValue: false,
  type: 'accordion',
  utilityItems: undefined,
  ariaLabel: 'モバイルメニュー',
  navAriaLabel: 'メインナビゲーション',
  subLinksAriaLabel: '補助リンク',
  closeLabel: '閉じる',
  backLabel: '戻る',
  showCloseButton: true,
})

const emit = defineEmits<DadsMobileMenuEmits>()

const panelRef = ref<HTMLElement | null>(null)

const isSlide = computed(() => props.type === 'slide')

// slide-mode navigation stack. Each entry holds the items shown in that
// panel plus an optional label (used as the panel heading and the announce-
// able name for the back button). Stack is reset on close so each open starts
// at the root.
type SlidePanel = { label?: string; items: DadsMobileMenuItem[] }
const panelStack = ref<SlidePanel[]>([])

const currentPanel = computed<SlidePanel>(() => {
  if (panelStack.value.length === 0) {
    return { items: props.items }
  }
  return panelStack.value[panelStack.value.length - 1]
})

const canGoBack = computed(() => panelStack.value.length > 0)

// Track which element had focus when the menu opened so it can be restored on
// close — mirrors DadsDrawer / DadsDialog focus-management semantics.
let previousActive: HTMLElement | null = null

const close = () => {
  emit('update:modelValue', false)
}

// Accordion-mode click delegate — unchanged from the pre-slide behaviour.
const onAccordionItemClick = (item: DadsMenuListItem, event: MouseEvent) => {
  emit('click:item', item, event)
  // Auto-close on leaf navigation (no children) — same UX as DadsDrawer so the
  // user does not have to dismiss the menu manually after picking a destination.
  if (!item.children || item.children.length === 0) {
    close()
  }
}

// Slide-mode click delegate — parent items push a new panel onto the stack,
// leaves emit + close. The DOM in slide mode is custom (flat button list)
// rather than DadsMenuList, so we keep child traversal out of MenuList.
const onSlideItemClick = (item: DadsMobileMenuItem, event: MouseEvent) => {
  if (item.children && item.children.length > 0) {
    panelStack.value.push({ label: item.label, items: item.children })
    return
  }
  emit('click:item', item, event)
  close()
}

const goBack = () => {
  panelStack.value.pop()
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
      // Reset slide-mode stack so reopening always lands at the root.
      panelStack.value = []
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
        :class="['dads-mobile-menu', `dads-mobile-menu--type-${type}`]"
        role="dialog"
        aria-modal="true"
        :aria-label="ariaLabel"
        @keydown.esc="close"
        @keydown.tab="onTabTrap"
      >
        <div class="dads-mobile-menu__overlay" aria-hidden="true" @click="close" />
        <div ref="panelRef" class="dads-mobile-menu__panel" tabindex="-1">
          <header v-if="showCloseButton || (isSlide && canGoBack)" class="dads-mobile-menu__header">
            <button
              v-if="isSlide && canGoBack"
              type="button"
              class="dads-mobile-menu__back"
              :aria-label="backLabel"
              @click="goBack"
            >
              <i class="mdi mdi-chevron-left dads-mobile-menu__back-icon" aria-hidden="true" />
              <span>{{ backLabel }}</span>
            </button>
            <h2 v-if="isSlide && currentPanel.label" class="dads-mobile-menu__panel-title">
              {{ currentPanel.label }}
            </h2>
            <button
              v-if="showCloseButton"
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
          <nav class="dads-mobile-menu__nav" :aria-label="navAriaLabel">
            <!-- accordion mode (default): delegate to DadsMenuList which
                 expands children inline. -->
            <DadsMenuList
              v-if="!isSlide"
              :items="items"
              type="box"
              @click:item="onAccordionItemClick"
            />
            <!-- slide mode: render the current panel's items as a flat list.
                 Parent items show a chevron and push a new panel; leaves emit
                 and close. -->
            <ul v-else class="dads-mobile-menu__slide-list">
              <li
                v-for="(item, idx) in currentPanel.items"
                :key="idx"
                class="dads-mobile-menu__slide-item-wrap"
              >
                <a
                  v-if="item.href && (!item.children || item.children.length === 0)"
                  :href="item.href"
                  class="dads-mobile-menu__slide-item"
                  @click="onSlideItemClick(item, $event)"
                >
                  <span class="dads-mobile-menu__slide-item-label">{{ item.label }}</span>
                </a>
                <button
                  v-else
                  type="button"
                  class="dads-mobile-menu__slide-item"
                  :class="{
                    'dads-mobile-menu__slide-item--parent':
                      item.children && item.children.length > 0,
                  }"
                  @click="onSlideItemClick(item, $event)"
                >
                  <span class="dads-mobile-menu__slide-item-label">{{ item.label }}</span>
                  <i
                    v-if="item.children && item.children.length > 0"
                    class="mdi mdi-chevron-right dads-mobile-menu__slide-item-chevron"
                    aria-hidden="true"
                  />
                </button>
              </li>
            </ul>
          </nav>
          <div v-if="utilityItems && utilityItems.length > 0" class="dads-mobile-menu__utility">
            <DadsUtilityLink
              :items="utilityItems"
              :aria-label="subLinksAriaLabel"
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
    // Matches DadsDrawer / DadsDialog scrim: the official opacity-gray-100
    // overlay token, with a direct fallback for token-less consumers.
    background-color: var(--color-neutral-opacity-gray-100, rgba(0, 0, 0, 0.1));
  }

  // -------------------- panel --------------------------------------------
  &__panel {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    max-height: 100vh;
    background-color: var(--color-neutral-white, #fff);
    // Tokenized elevation, aligned with DadsDrawer's panel (--elevation-2).
    box-shadow: var(--elevation-2, 0 2px 12px 2px rgba(0, 0, 0, 0.1), 0 1px 6px 0 rgba(0, 0, 0, 0.3));
    overflow-y: auto;

    &:focus {
      outline: none;
    }
  }

  // -------------------- header (close + back row) -----------------------
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: calc(8 / 16 * 1rem);
    padding: calc(8 / 16 * 1rem) calc(16 / 16 * 1rem);
    border-bottom: 1px solid var(--color-neutral-solid-gray-100, #e5e5e5);
  }

  &__back {
    @include base.dads-reset-button;
    @include ring.dads-focus-ring;

    display: inline-flex;
    align-items: center;
    gap: calc(4 / 16 * 1rem);
    min-height: 2.5rem;
    padding: 0 calc(8 / 16 * 1rem);
    border-radius: var(--border-radius-4, 0.25rem);
    color: var(--color-neutral-solid-gray-800, #1a1a1c);
    font-size: var(--font-size-14, 0.875rem);
    margin-inline-end: auto;

    &:hover {
      background-color: var(--color-neutral-solid-gray-50, #f3f4f5);
    }
  }

  &__back-icon {
    font-size: 1.25em;
    line-height: 1;
  }

  &__panel-title {
    margin: 0;
    font-size: var(--font-size-16, 1rem);
    font-weight: 700;
    line-height: 1.4;
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
    margin-inline-start: auto;

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
    padding: calc(8 / 16 * 1rem) 0;
  }

  // -------------------- slide-mode list ----------------------------------
  &__slide-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
  }

  &__slide-item-wrap {
    display: block;
    border-bottom: 1px solid var(--color-neutral-solid-gray-50, #f3f4f5);
  }

  &__slide-item {
    @include base.dads-reset-button;
    @include ring.dads-focus-ring;

    display: flex;
    align-items: center;
    gap: calc(12 / 16 * 1rem);
    width: 100%;
    min-height: 3rem; // 48px touch target
    padding: calc(12 / 16 * 1rem) calc(16 / 16 * 1rem);
    color: inherit;
    text-decoration: none;
    text-align: start;
    font: inherit;

    &:hover {
      background-color: var(--color-neutral-solid-gray-50, #f3f4f5);
    }
  }

  &__slide-item-label {
    flex: 1 1 auto;
  }

  &__slide-item-chevron {
    font-size: 1.5em;
    line-height: 1;
    color: var(--color-neutral-solid-gray-700, #4a4a4a);
  }

  // -------------------- utility links ------------------------------------
  &__utility {
    padding: calc(16 / 16 * 1rem);
    border-top: 1px solid var(--color-neutral-solid-gray-100, #e5e5e5);
  }

  // -------------------- forced colors ------------------------------------
  @include base.dads-forced-colors {
    &__panel {
      border: 1px solid CanvasText;
    }

    &__close,
    &__back {
      border: 1px solid transparent;
    }

    &__slide-item {
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
