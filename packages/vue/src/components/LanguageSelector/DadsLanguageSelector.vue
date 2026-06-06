<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useId, watch } from 'vue'
import type {
  DadsLanguageSelectorEmits,
  DadsLanguageSelectorOption,
  DadsLanguageSelectorProps,
} from './DadsLanguageSelector.types'

const props = withDefaults(defineProps<DadsLanguageSelectorProps>(), {
  options: () => [],
  disabled: false,
  size: 'md',
  colorScheme: 'light-blue',
  cornerShape: 'rounded',
  ariaLabel: '言語を選択',
  openerLabel: 'Language',
})

const emit = defineEmits<DadsLanguageSelectorEmits>()

// Generated once per instance so the opener / popup id pairing stays stable.
const generatedId = useId()
const openerId = computed(() => `dads-language-selector-opener-${generatedId}`)
const popupId = computed(() => `dads-language-selector-popup-${generatedId}`)
const getMenuItemId = (index: number) => `${openerId.value}-item-${index}`

const rootRef = ref<HTMLElement | null>(null)
const openerRef = ref<HTMLButtonElement | null>(null)
const menuRef = ref<HTMLElement | null>(null)
const menuItemRefs = ref<(HTMLAnchorElement | null)[]>([])

const isOpen = ref(false)

const isItemCurrent = (option: DadsLanguageSelectorOption): boolean =>
  props.modelValue !== undefined && props.modelValue === option.value

const rootClasses = computed(() => [
  'dads-language-selector',
  `dads-language-selector--${props.size}`,
  `dads-language-selector--${props.colorScheme}`,
  `dads-language-selector--corner-${props.cornerShape}`,
  {
    'dads-language-selector--disabled': props.disabled,
    'dads-language-selector--open': isOpen.value,
  },
])

const openMenu = () => {
  if (props.disabled || isOpen.value) return
  isOpen.value = true
  emit('open')
}

const closeMenu = (returnFocus = false) => {
  if (!isOpen.value) return
  isOpen.value = false
  emit('close')
  if (returnFocus) openerRef.value?.focus()
}

const toggleMenu = () => {
  if (isOpen.value) closeMenu()
  else void openMenu()
}

const selectOption = (option: DadsLanguageSelectorOption, event?: MouseEvent | KeyboardEvent) => {
  // The anchor has a default href="#" so prevent the page jump unless the
  // consumer supplies a real URL they want followed.
  if (!option.href && event) event.preventDefault()
  emit('update:modelValue', option.value)
  emit('change', option.value)
  closeMenu(true)
}

const focusMenuItem = (index: number) => {
  const item = menuItemRefs.value[index]
  item?.focus()
}

const focusFirstMenuItem = () => focusMenuItem(0)
const focusLastMenuItem = () => focusMenuItem(props.options.length - 1)

const currentMenuIndex = (): number => {
  const active = document.activeElement
  return menuItemRefs.value.findIndex((item) => item === active)
}

const focusNextMenuItem = () => {
  const idx = currentMenuIndex()
  if (idx < 0 || idx >= props.options.length - 1) focusFirstMenuItem()
  else focusMenuItem(idx + 1)
}

const focusPreviousMenuItem = () => {
  const idx = currentMenuIndex()
  if (idx <= 0) focusLastMenuItem()
  else focusMenuItem(idx - 1)
}

const onOpenerClick = (event: MouseEvent) => {
  event.preventDefault()
  toggleMenu()
}

const onOpenerKeydown = (event: KeyboardEvent) => {
  if (props.disabled) return
  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault()
      if (!isOpen.value) {
        openMenu()
        void nextTick(focusFirstMenuItem)
      } else {
        focusFirstMenuItem()
      }
      break
    case 'ArrowUp':
      event.preventDefault()
      if (!isOpen.value) {
        openMenu()
        void nextTick(focusLastMenuItem)
      } else {
        focusLastMenuItem()
      }
      break
    case 'Enter':
    case ' ':
      event.preventDefault()
      toggleMenu()
      break
  }
}

const onMenuKeydown = (event: KeyboardEvent) => {
  if (!isOpen.value) return
  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault()
      focusNextMenuItem()
      break
    case 'ArrowUp':
      event.preventDefault()
      focusPreviousMenuItem()
      break
    case 'Home':
      event.preventDefault()
      focusFirstMenuItem()
      break
    case 'End':
      event.preventDefault()
      focusLastMenuItem()
      break
    case 'Escape':
      event.preventDefault()
      closeMenu(true)
      break
    case 'Tab':
      // Let the browser move focus naturally, but close so screen readers
      // don't announce a stale menu.
      closeMenu()
      break
  }
}

// Listen on document so clicks inside dialogs / portals still close the menu.
const onDocumentPointerDown = (event: MouseEvent) => {
  if (!isOpen.value) return
  const target = event.target as Node | null
  if (target && rootRef.value && rootRef.value.contains(target)) return
  closeMenu()
}

onMounted(() => {
  document.addEventListener('pointerdown', onDocumentPointerDown, true)
})

onBeforeUnmount(() => {
  document.removeEventListener('pointerdown', onDocumentPointerDown, true)
})

// Close when disabled flips on so the menu can't be left open on a non-interactive control.
watch(
  () => props.disabled,
  (next) => {
    if (next) closeMenu()
  },
)

const setItemRef =
  (index: number) =>
  (el: unknown): void => {
    menuItemRefs.value[index] = (el as HTMLAnchorElement | null) ?? null
  }
</script>

<template>
  <div ref="rootRef" :class="rootClasses">
    <div class="dads-language-selector__box">
      <button
        :id="openerId"
        ref="openerRef"
        type="button"
        class="dads-language-selector__opener"
        :aria-label="ariaLabel"
        :aria-controls="popupId"
        :aria-expanded="isOpen"
        aria-haspopup="menu"
        :disabled="disabled || undefined"
        @click="onOpenerClick"
        @keydown="onOpenerKeydown"
      >
        <svg
          class="dads-language-selector__opener-icon"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentcolor"
          aria-hidden="true"
        >
          <path
            d="M12 21.5A9.5 9.5 0 0 1 2.5 12c0-5.2 4.3-9.5 9.5-9.5s9.6 4.3 9.5 9.5c0 5.2-4.3 9.5-9.5 9.5Zm0-1.5c1-1.3 1.7-2.8 2.1-4.3H10c.4 1.5 1 3 2.1 4.3Zm-2-.3c-.8-1.2-1.4-2.6-1.7-4H5c1 2 3 3.5 5.2 4Zm4 0c2.2-.5 4-2 5-4h-3.3c-.4 1.4-1 2.8-1.8 4Zm-9.7-5.5H8a13 13 0 0 1 0-4.4H4.3a8 8 0 0 0 0 4.4Zm5.2 0h5c.2-1.5.2-3 0-4.4h-5c-.2 1.5-.2 3 0 4.4Zm6.5 0h3.7a8 8 0 0 0 0-4.4H16c.2 1.5.2 3 0 4.4Zm-.3-5.9H19c-1-2-3-3.5-5.2-4 .8 1.2 1.4 2.6 1.8 4Zm-5.8 0H14A12 12 0 0 0 12 4a12 12 0 0 0-2.1 4.3Zm-5 0h3.4c.4-1.4 1-2.8 1.8-4-2.3.5-4.1 2-5.2 4Z"
          />
        </svg>
        <span class="dads-language-selector__opener-text">{{ openerLabel }}</span>
        <svg
          class="dads-language-selector__opener-arrow"
          :class="{ 'dads-language-selector__opener-arrow--open': isOpen }"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="currentcolor"
          aria-hidden="true"
        >
          <path d="m20.5 6.6-8 8-8-8L3.1 8l9.4 9.4L21.9 8l-1.4-1.4Z" />
        </svg>
      </button>

      <div v-show="isOpen" :id="popupId" class="dads-language-selector__popup">
        <ul
          ref="menuRef"
          class="dads-language-selector__menu"
          role="menu"
          :aria-labelledby="openerId"
          @keydown="onMenuKeydown"
        >
          <li
            v-for="(option, index) in options"
            :key="option.value"
            role="none"
            class="dads-language-selector__item-wrap"
          >
            <a
              :id="getMenuItemId(index)"
              :ref="setItemRef(index)"
              role="menuitem"
              class="dads-language-selector__item"
              :class="{ 'dads-language-selector__item--current': isItemCurrent(option) }"
              :href="option.href ?? '#'"
              :lang="option.value"
              :hreflang="option.value"
              :aria-current="isItemCurrent(option) ? 'true' : undefined"
              tabindex="-1"
              @click="selectOption(option, $event)"
            >
              <svg
                class="dads-language-selector__check"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentcolor"
                aria-hidden="true"
              >
                <path d="m9.5 18-5.7-5.7 1.5-1.4 4.2 4.3L18.7 6l1.4 1.4L9.5 18Z" />
              </svg>
              <span class="dads-language-selector__label">{{ option.label }}</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '../../styles/base' as base;
@use '../../styles/focus-ring' as ring;

.dads-language-selector {
  display: inline-block;
  width: fit-content;
  position: relative;
  font-family: var(--font-family-sans, 'Noto Sans JP', sans-serif);
  color: var(--color-text-primary, #1a1a1a);

  &__box {
    position: relative;
  }

  // -------------------- opener button ------------------------------------
  &__opener {
    @include base.dads-reset-button;
    @include ring.dads-focus-ring;
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-4, 0.25rem);
    padding: var(--spacing-4, 0.25rem) var(--spacing-8, 0.5rem);
    border-radius: var(--border-radius-4, 0.25rem);
    line-height: var(--line-height-150, 1.5);
    color: inherit;

    &:hover:not(:disabled) {
      background-color: var(--color-bg-hover, rgba(0, 0, 0, 0.05));
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  &__opener-icon {
    flex-shrink: 0;
  }

  &__opener-text {
    white-space: nowrap;
  }

  &__opener-arrow {
    flex-shrink: 0;
    transition: transform 0.15s ease;

    &--open {
      transform: rotate(180deg);
    }
  }

  // -------------------- popup container ----------------------------------
  &__popup {
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
    z-index: 10;
    min-width: 12rem;
    background-color: var(--color-bg-surface, #fff);
    border: 1px solid var(--color-border-default, rgba(0, 0, 0, 0.1));
    // 公式 (menu-list-box) のポップアップに合わせて 8px の角丸にする。
    border-radius: var(--border-radius-8, 0.5rem);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  }

  &__menu {
    margin: 0;
    padding: var(--spacing-4, 0.25rem) 0;
    list-style: none;
  }

  // -------------------- menu items ---------------------------------------
  &__item {
    display: flex;
    align-items: center;
    gap: var(--spacing-8, 0.5rem);
    padding: var(--spacing-8, 0.5rem) var(--spacing-12, 0.75rem);
    text-decoration: none;
    color: inherit;
    cursor: pointer;

    @include ring.dads-focus-ring;

    &:hover {
      background-color: var(--color-bg-subtle, rgba(0, 0, 0, 0.05));
    }
  }

  &__check {
    flex-shrink: 0;
    visibility: hidden;
  }

  &__item--current &__check,
  &__item[aria-current='true'] .dads-language-selector__check {
    visibility: visible;
  }

  &__label {
    flex: 1;
    white-space: nowrap;
  }

  // -------------------- size ---------------------------------------------
  &--lg &__opener {
    font-size: var(--font-size-18, 1.125rem);
    padding: var(--spacing-8, 0.5rem) var(--spacing-12, 0.75rem);
  }

  &--md &__opener {
    font-size: var(--font-size-16, 1rem);
  }

  &--sm &__opener {
    font-size: var(--font-size-14, 0.875rem);
    padding: 2px var(--spacing-8, 0.5rem);
  }

  // -------------------- color scheme -------------------------------------
  // Tinted opener / popup variants per DADS guidance. Hover surface and
  // selected-item color follow the chosen accent.
  &--light-blue &__opener {
    color: var(--color-brand-primary, #1a73e8);

    &:hover:not(:disabled) {
      background-color: var(--color-info-bg, rgba(26, 115, 232, 0.08));
    }
  }
  // 選択中項目は公式 (menu-list の data-current) に倣い、薄いアクセント色で
  // 背景を塗る。light-blue は公式既定の blue-100 / blue-1000 に合わせる。
  &--light-blue &__item--current {
    background-color: var(--color-primitive-blue-100, #e8f1ff);
    color: var(--color-primitive-blue-1000, #001a9c);
  }

  &--light-green &__opener {
    color: var(--color-success, #1f8a3a);

    &:hover:not(:disabled) {
      background-color: var(--color-success-bg, rgba(31, 138, 58, 0.08));
    }
  }
  &--light-green &__item--current {
    background-color: var(--color-success-bg, rgba(31, 138, 58, 0.1));
    color: var(--color-success, #1f8a3a);
  }

  &--light-gray &__opener {
    color: var(--color-text-primary, #1a1a1a);

    &:hover:not(:disabled) {
      background-color: var(--color-bg-subtle, rgba(0, 0, 0, 0.05));
    }
  }
  &--light-gray &__item--current {
    background-color: var(--color-neutral-solid-gray-50, #f2f2f2);
    color: var(--color-text-primary, #1a1a1a);
  }

  // -------------------- corner shape -------------------------------------
  &--corner-rounded &__opener {
    border-radius: var(--border-radius-4, 0.25rem);
  }

  &--corner-pill &__opener {
    border-radius: 9999px;
  }

  &--corner-square &__opener {
    border-radius: 0;
  }

  // -------------------- disabled -----------------------------------------
  &--disabled {
    pointer-events: none;
  }

  // -------------------- forced colors ------------------------------------
  @include base.dads-forced-colors {
    &__opener {
      border: 1px solid CanvasText;
    }

    &__popup {
      border: 1px solid CanvasText;
    }

    &__item:hover,
    &__item:focus-visible {
      background-color: Highlight;
      color: HighlightText;
    }
  }
}
</style>
