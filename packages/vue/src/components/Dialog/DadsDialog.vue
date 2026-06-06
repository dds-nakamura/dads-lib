<script setup lang="ts">
import { computed, nextTick, ref, useId, watch } from 'vue'
import type { DadsDialogEmits, DadsDialogFocusTarget, DadsDialogProps } from './DadsDialog.types'

const props = withDefaults(defineProps<DadsDialogProps>(), {
  modelValue: false,
  size: 'md',
  variant: 'modal',
  persistent: false,
  closable: true,
  closeLabel: '閉じる',
})

const emit = defineEmits<DadsDialogEmits>()

const panelRef = ref<HTMLElement | null>(null)

const isModal = computed(() => props.variant === 'modal')

// Track which element had focus when the dialog opened so it can be restored
// on close. Module-scoped via closure rather than reactive — there is no UI
// concern that needs to react to changes here.
let previousActive: HTMLElement | null = null

// Stable id for aria-labelledby. Only attached to the rendered title element
// when the caller actually supplies a title (so screen readers do not chase a
// dangling reference).
const titleId = useId()

const close = () => {
  emit('update:modelValue', false)
  emit('close')
}

const onEsc = () => {
  if (props.persistent) return
  close()
}

const onOverlayClick = () => {
  // Non-modal dialogs don't render an opaque overlay, but the wrapper still
  // exists for layout — clicks on it should not dismiss the dialog because
  // the user might be aiming at underlying page content.
  if (!isModal.value) return
  if (props.persistent) return
  close()
}

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

const collectFocusables = (): HTMLElement[] => {
  if (!panelRef.value) return []
  return Array.from(panelRef.value.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR))
}

const resolveFocusTarget = (target: DadsDialogFocusTarget | undefined): HTMLElement | null => {
  if (!target) return null
  if (typeof target === 'string') {
    return document.querySelector<HTMLElement>(target)
  }
  return target
}

const onTabTrap = (event: KeyboardEvent) => {
  // Per WAI-ARIA APG: non-modal dialogs do not trap focus — the user must
  // be able to Tab into surrounding page content.
  if (!isModal.value) return
  if (event.key !== 'Tab') return
  const focusables = collectFocusables()
  if (focusables.length === 0) {
    // Nothing focusable inside — keep focus on the panel itself so it cannot
    // escape the dialog.
    event.preventDefault()
    panelRef.value?.focus()
    return
  }
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
      // Prefer the caller-supplied initial-focus target, falling back to the
      // panel so screen-reader users always land inside the dialog.
      const initial = resolveFocusTarget(props.initialFocus)
      ;(initial ?? panelRef.value)?.focus()
      emit('open')
    } else {
      // Prefer the caller-supplied return target. This is the only safe path
      // when the trigger was unmounted between open and close — otherwise
      // restoring focus to the (now-gone) previousActive would silently land
      // focus on `<body>`.
      const explicitReturn = resolveFocusTarget(props.returnFocusTo)
      if (explicitReturn) {
        explicitReturn.focus()
      } else if (previousActive) {
        previousActive.focus()
      }
      previousActive = null
    }
  },
)
</script>

<template>
  <Teleport to="body">
    <Transition name="dads-dialog">
      <div
        v-if="modelValue"
        class="dads-dialog"
        :class="[`dads-dialog--${size}`, `dads-dialog--${variant}`]"
        role="dialog"
        :aria-modal="isModal ? 'true' : undefined"
        :aria-labelledby="title ? titleId : undefined"
        @keydown.esc="onEsc"
        @keydown="onTabTrap"
      >
        <div
          v-if="isModal"
          class="dads-dialog__overlay"
          aria-hidden="true"
          @click="onOverlayClick"
        />
        <div ref="panelRef" class="dads-dialog__panel" tabindex="-1">
          <header v-if="title || $slots.header || closable" class="dads-dialog__header">
            <slot name="header">
              <h2 v-if="title" :id="titleId" class="dads-dialog__title">
                {{ title }}
              </h2>
            </slot>
            <button
              v-if="closable"
              type="button"
              class="dads-dialog__close"
              :aria-label="closeLabel"
              @click="close"
            >
              <i class="mdi mdi-close" aria-hidden="true" />
            </button>
          </header>
          <div class="dads-dialog__body">
            <slot />
          </div>
          <footer v-if="$slots.footer" class="dads-dialog__footer">
            <slot name="footer" />
          </footer>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped lang="scss">
@use '../../styles/base' as base;
@use '../../styles/focus-ring' as ring;

.dads-dialog {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: calc(16 / 16 * 1rem);
  font-family: var(--font-family-sans, 'Noto Sans JP', sans-serif);
  color: var(--color-neutral-solid-gray-800, #1a1a1a);

  // -------------------- overlay ------------------------------------------
  &__overlay {
    position: absolute;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.5);
  }

  // -------------------- panel --------------------------------------------
  &__panel {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    max-height: calc(100vh - 2rem);
    background-color: var(--color-neutral-white, #fff);
    border-radius: var(--border-radius-8, 0.5rem);
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.2);
    overflow: hidden;

    &:focus {
      outline: none;
    }
  }

  // -------------------- variant modifiers --------------------------------
  // Non-modal dialogs sit inline with surrounding content (no backdrop,
  // pointer-events: none on the wrapper so clicks pass through to the page),
  // while the panel itself accepts interaction.
  &--non-modal {
    background: transparent;
    pointer-events: none;
  }

  &--non-modal &__panel {
    pointer-events: auto;
  }

  // -------------------- size modifiers -----------------------------------
  &--sm &__panel {
    max-width: 400px;
  }

  &--md &__panel {
    max-width: 600px;
  }

  &--lg &__panel {
    max-width: 800px;
  }

  &--fullscreen {
    padding: 0;
  }

  &--fullscreen &__panel {
    max-width: 100vw;
    width: 100vw;
    height: 100vh;
    max-height: 100vh;
    border-radius: 0;
  }

  // -------------------- header / title / close --------------------------
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: calc(8 / 16 * 1rem);
    padding: calc(16 / 16 * 1rem);
    border-bottom: 1px solid var(--color-neutral-solid-gray-420, #e5e5e5);
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
    margin-inline-start: auto;

    &:hover {
      background-color: var(--color-neutral-solid-gray-50, #f5f5f5);
    }
  }

  // -------------------- body / footer ------------------------------------
  &__body {
    flex: 1 1 auto;
    padding: calc(16 / 16 * 1rem);
    overflow-y: auto;
  }

  &__footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: calc(8 / 16 * 1rem);
    padding: calc(16 / 16 * 1rem);
    border-top: 1px solid var(--color-neutral-solid-gray-420, #e5e5e5);
  }

  // -------------------- forced colors -----------------------------------
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
.dads-dialog-enter-active,
.dads-dialog-leave-active {
  transition: opacity 0.2s ease;

  .dads-dialog__panel {
    transition: transform 0.2s ease;
  }
}

.dads-dialog-enter-from,
.dads-dialog-leave-to {
  opacity: 0;

  .dads-dialog__panel {
    transform: scale(0.95);
  }
}
</style>
