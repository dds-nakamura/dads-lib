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
  size: 'sm',
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
  <div ref="rootRef" class="dads-language-selector">
    <div class="dads-menu-list-box" :class="{ 'dads-menu-list-box--disabled': disabled }">
      <button
        :id="openerId"
        ref="openerRef"
        type="button"
        class="dads-menu-list-box__opener"
        :data-size="size"
        data-style="text"
        data-text-weight="normal"
        :aria-label="ariaLabel"
        :aria-controls="popupId"
        :aria-expanded="isOpen"
        aria-haspopup="menu"
        :disabled="disabled || undefined"
        @click="onOpenerClick"
        @keydown="onOpenerKeydown"
      >
        <svg
          class="dads-menu-list-box__opener-icon"
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
        {{ openerLabel }}
        <svg
          class="dads-menu-list-box__opener-arrow"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="currentcolor"
          aria-hidden="true"
        >
          <path d="m20.5 6.6-8 8-8-8L3.1 8l9.4 9.4L21.9 8l-1.4-1.4Z" />
        </svg>
      </button>

      <div v-show="isOpen" :id="popupId" class="dads-menu-list-box__popup">
        <ul
          ref="menuRef"
          class="dads-menu-list"
          role="menu"
          :aria-labelledby="openerId"
          @keydown="onMenuKeydown"
        >
          <li v-for="(option, index) in options" :key="option.value" role="presentation">
            <a
              :id="getMenuItemId(index)"
              :ref="setItemRef(index)"
              role="menuitem"
              class="dads-menu-list__item"
              :href="option.href ?? '#'"
              :lang="option.value"
              :hreflang="option.value"
              data-type="box"
              data-size="regular"
              :data-current="isItemCurrent(option) ? '' : undefined"
              :aria-current="isItemCurrent(option) ? 'true' : undefined"
              tabindex="-1"
              @click="selectOption(option, $event)"
            >
              <svg
                class="dads-menu-list__front-icon dads-language-selector__check"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentcolor"
                aria-hidden="true"
              >
                <path d="m9.5 18-5.7-5.7 1.5-1.4 4.2 4.3L18.7 6l1.4 1.4L9.5 18Z" />
              </svg>
              <span class="dads-menu-list__label">{{ option.label }}</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '../../styles/base' as base;

// 公式 language-selector は menu-list-box (opener + popup) と menu-list (items)
// の共有部品を合成する。軽量版方針のため component import はせず、公式
// menu-list-box.css / menu-list.css の正準スタイルを scoped に移植する。
// language-selector.css 本体は check 表示制御の 13 行のみ。

.dads-language-selector {
  display: block;
  width: fit-content;
}

.dads-language-selector__check {
  visibility: hidden;
}

// 公式: [aria-current] > .dads-language-selector__check { visibility: visible }
:deep([aria-current]) > .dads-language-selector__check {
  visibility: visible;
}

// ---------------------------------------------------------------------------
// menu-list-box.css (移植)
// ---------------------------------------------------------------------------
.dads-menu-list-box {
  position: relative;
  display: block;
  width: fit-content;
  color: var(--color-neutral-solid-gray-900);
  font-weight: normal;
  font-size: calc(16 / 16 * 1rem);
  line-height: 1.2;
  font-family: var(--font-family-sans);
  letter-spacing: 0.02em;
}

.dads-menu-list-box--disabled {
  pointer-events: none;
}

.dads-menu-list-box__opener {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  border-radius: calc(8 / 16 * 1rem);
  border: 0;
  background: transparent;
  padding-top: calc(4 / 16 * 1rem);
  padding-bottom: calc(4 / 16 * 1rem);
  font: inherit;
  letter-spacing: inherit;
  color: inherit;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.dads-menu-list-box__opener[data-size='sm'] {
  min-height: calc(36 / 16 * 1rem);
  padding-right: calc(4 / 16 * 1rem);
  padding-left: calc(4 / 16 * 1rem);
  column-gap: calc(4 / 16 * 1rem);
}

.dads-menu-list-box__opener[data-size='md'] {
  min-height: calc(44 / 16 * 1rem);
  padding-right: calc(16 / 16 * 1rem);
  padding-left: calc(16 / 16 * 1rem);
  column-gap: calc(8 / 16 * 1rem);
}

.dads-menu-list-box__opener[data-style='outlined'] {
  border: 1px solid var(--color-neutral-solid-gray-420);
  background-color: transparent;
}

.dads-menu-list-box__opener[data-style='filled'] {
  background-color: var(--color-neutral-solid-gray-50);
}

.dads-menu-list-box__opener[data-text-weight='bold'] {
  font-weight: bold;
}

@media (hover: hover) {
  .dads-menu-list-box__opener:hover:not(:disabled) {
    background-color: var(--color-neutral-solid-gray-50);
    text-decoration: underline;
    text-underline-offset: calc(3 / 16 * 1rem);
  }

  .dads-menu-list-box__opener[data-style='outlined']:hover:not(:disabled) {
    border-color: var(--color-neutral-black);
  }

  .dads-menu-list-box__opener[data-style='filled']:hover:not(:disabled) {
    background-color: var(--color-neutral-solid-gray-100);
  }
}

.dads-menu-list-box__opener:focus-visible {
  outline: calc(4 / 16 * 1rem) solid var(--color-neutral-black);
  outline-offset: calc(2 / 16 * 1rem);
  background-color: var(--color-primitive-yellow-300);
  box-shadow: 0 0 0 calc(2 / 16 * 1rem) var(--color-primitive-yellow-300);
}

.dads-menu-list-box__opener[data-style='filled']:focus-visible {
  background-color: var(--color-neutral-solid-gray-50);
}

.dads-menu-list-box__opener-icon {
  flex-shrink: 0;
  width: calc(20 / 16 * 1rem);
  height: calc(20 / 16 * 1rem);
}

.dads-menu-list-box__opener-arrow {
  margin-top: calc(4 / 16 * 1rem);
  flex-shrink: 0;
  width: calc(16 / 16 * 1rem);
  height: calc(16 / 16 * 1rem);
}

[aria-expanded='true'] > .dads-menu-list-box__opener-arrow {
  transform: rotate(180deg);
}

.dads-menu-list-box__popup {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1;
  box-sizing: border-box;
  width: max-content;
  max-height: calc((16 + 44 * 6.5) / 16 * 1rem);
  overflow-y: auto;
  border-radius: calc(8 / 16 * 1rem) 0 0 calc(8 / 16 * 1rem);
  border: 1px solid var(--color-neutral-solid-gray-420);
  background-color: var(--color-neutral-white);
  padding: calc(16 / 16 * 1rem) 0;
  box-shadow: var(--elevation-1);
}

// ---------------------------------------------------------------------------
// menu-list.css (移植 / box 型 item に必要な分)
// ---------------------------------------------------------------------------
.dads-menu-list {
  position: relative;
  z-index: 0;
  margin: 0;
  list-style-type: none;
  padding-left: 0;
  color: var(--color-neutral-solid-gray-800);
  font-weight: normal;
  font-size: calc(16 / 16 * 1rem);
  line-height: 1.3;
  font-family: var(--font-family-sans);
  letter-spacing: 0;
}

.dads-menu-list__item,
.dads-menu-list__item:any-link {
  display: flex;
  align-items: center;
  column-gap: calc(8 / 16 * 1rem);
  box-sizing: border-box;
  width: -webkit-fill-available;
  width: -moz-available;
  width: stretch;
  border: 0;
  background-color: transparent;
  padding-right: calc(16 / 16 * 1rem);
  padding-left: calc(16 / 16 * 1rem);
  color: inherit;
  text-align: left;
  font: inherit;
  letter-spacing: inherit;
  text-decoration: none;
  text-decoration-thickness: calc(1 / 16 * 1rem);
  cursor: pointer;
}

.dads-menu-list__item[data-size='regular'] {
  min-height: calc(44 / 16 * 1rem);
  padding-top: calc(10 / 16 * 1rem);
  padding-bottom: calc(10 / 16 * 1rem);
  line-height: 1.3;
}

.dads-menu-list__item[data-size='small'] {
  min-height: calc(36 / 16 * 1rem);
  padding-top: calc(6 / 16 * 1rem);
  padding-bottom: calc(6 / 16 * 1rem);
  line-height: 1.2;
}

.dads-menu-list__item[data-type='box'] {
  border-radius: 0;
  padding-left: calc(16 / 16 * 1rem + 1rem * var(--menu-list-indentation, 0));
}

.dads-menu-list__item[data-current] {
  background-color: var(--color-primitive-blue-100);
  color: var(--color-primitive-blue-1000);
  font-weight: bold;
}

@media (hover: hover) {
  .dads-menu-list__item:hover {
    background-color: var(--color-neutral-solid-gray-50);
    text-decoration: underline;
    text-underline-offset: calc(3 / 16 * 1rem);
  }

  .dads-menu-list__item[data-current]:hover {
    background-color: var(--color-primitive-blue-50);
    color: var(--color-primitive-blue-900);
  }
}

.dads-menu-list__item:focus-visible {
  position: relative;
  z-index: 1;
  background-color: var(--color-primitive-yellow-300);
}

.dads-menu-list__item[data-type='box']:focus-visible {
  outline: calc(4 / 16 * 1rem) solid var(--color-neutral-black);
  outline-offset: calc(-4 / 16 * 1rem);
  box-shadow: inset 0 0 0 calc(6 / 16 * 1rem) var(--color-primitive-yellow-300);
}

.dads-menu-list__item[data-current]:focus-visible {
  background-color: var(--color-primitive-blue-100);
}

.dads-menu-list__front-icon {
  flex-shrink: 0;
}

// ---------------------------------------------------------------------------
// forced-colors (公式超過だが害なし。a11y 補強として維持)
// ---------------------------------------------------------------------------
// 注: dads-forced-colors mixin は `forced-color-adjust` を裸の宣言として出すため
// セレクタ内 include 専用。ここはフラット移植なので素の @media を直接書く。
@media (forced-colors: active) {
  .dads-menu-list-box__opener,
  .dads-menu-list-box__popup {
    border: 1px solid CanvasText;
  }

  .dads-menu-list__item:hover,
  .dads-menu-list__item:focus-visible {
    background-color: Highlight;
    color: HighlightText;
  }
}
</style>
