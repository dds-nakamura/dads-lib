<script setup lang="ts">
import { nextTick, ref, useId, watch } from 'vue'
import type { DadsDialogEmits, DadsDialogProps } from './DadsDialog.types'

const props = withDefaults(defineProps<DadsDialogProps>(), {
  modelValue: false,
  size: 'md',
  persistent: false,
  closable: true,
  closeLabel: '閉じる',
})

const emit = defineEmits<DadsDialogEmits>()

const panelRef = ref<HTMLElement | null>(null)

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
  if (props.persistent) return
  close()
}

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

const collectFocusables = (): HTMLElement[] => {
  if (!panelRef.value) return []
  return Array.from(panelRef.value.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR))
}

const onTabTrap = (event: KeyboardEvent) => {
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
      panelRef.value?.focus()
      emit('open')
    } else if (previousActive) {
      previousActive.focus()
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
        :class="`dads-dialog--${size}`"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="title ? titleId : undefined"
        @keydown.esc="onEsc"
        @keydown="onTabTrap"
      >
        <div class="dads-dialog__overlay" aria-hidden="true" @click="onOverlayClick" />
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
  padding: var(--spacing-16, 1rem);
  font-family: var(--font-family-sans, 'Noto Sans JP', sans-serif);
  color: var(--color-text-primary, #1a1a1a);

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
    background-color: var(--color-bg-primary, #fff);
    border-radius: var(--border-radius-8, 0.5rem);
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.2);
    overflow: hidden;

    &:focus {
      outline: none;
    }
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
    gap: var(--spacing-8, 0.5rem);
    padding: var(--spacing-16, 1rem);
    border-bottom: 1px solid var(--color-border-divider, #e5e5e5);
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
    color: var(--color-text-primary, #1a1a1a);
    font-size: 1.5rem;
    margin-inline-start: auto;

    &:hover {
      background-color: var(--color-bg-subtle, #f5f5f5);
    }
  }

  // -------------------- body / footer ------------------------------------
  &__body {
    flex: 1 1 auto;
    padding: var(--spacing-16, 1rem);
    overflow-y: auto;
  }

  &__footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: var(--spacing-8, 0.5rem);
    padding: var(--spacing-16, 1rem);
    border-top: 1px solid var(--color-border-divider, #e5e5e5);
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
