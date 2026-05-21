<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, useId, watch } from 'vue'
import DadsChip from '../Chip/DadsChip.vue'
import type {
  DadsComboboxEmits,
  DadsComboboxFilter,
  DadsComboboxItem,
  DadsComboboxModelValue,
  DadsComboboxProps,
  DadsComboboxValue,
} from './DadsCombobox.types'

const props = withDefaults(defineProps<DadsComboboxProps>(), {
  items: () => [],
  itemValue: 'value',
  itemTitle: 'title',
  multiple: false,
  size: 'md',
  disabled: false,
  readonly: false,
  required: false,
  error: false,
  requiredLabel: '必須',
})

const emit = defineEmits<DadsComboboxEmits>()

// One id per instance keeps label `for`, listbox, option, hint, and error
// references stable across renders.
const generatedId = useId()
const inputId = computed(() => props.id ?? `dads-combobox-${generatedId}`)
const listboxId = computed(() => `${inputId.value}-listbox`)
const hintId = computed(() => `${inputId.value}-hint`)
const errorId = computed(() => `${inputId.value}-error`)
const getOptionId = (index: number) => `${inputId.value}-option-${index}`

const isError = computed(() => props.error || !!props.errorMessage)

const inputRef = ref<HTMLInputElement | null>(null)
const rootRef = ref<HTMLElement | null>(null)
const isOpen = ref(false)
const activeIndex = ref(-1)
// Edit buffer for the input. In single mode it doubles as the rendered text
// once a value is committed; in multiple mode it always represents pending
// query text and clears after each chip is committed.
const inputValue = ref('')

// item-value / item-title prop lookups use the index signature on
// DadsComboboxItem so callers can override the canonical 'value' / 'title' keys.
const getItemValue = (item: DadsComboboxItem): DadsComboboxValue =>
  item[props.itemValue] as DadsComboboxValue
const getItemTitle = (item: DadsComboboxItem): string => String(item[props.itemTitle] ?? '')

const defaultFilter: DadsComboboxFilter = (item, query) => {
  if (!query) return true
  return getItemTitle(item).toLowerCase().includes(query.toLowerCase())
}

const filteredItems = computed<DadsComboboxItem[]>(() => {
  const fn = props.filter ?? defaultFilter
  return props.items.filter((item) => fn(item, inputValue.value))
})

// In multiple mode, modelValue is an array of values. The cast is safe because
// the prop type narrows to `DadsComboboxValue[]` once `Array.isArray` succeeds.
const currentArray = (): DadsComboboxValue[] =>
  Array.isArray(props.modelValue) ? (props.modelValue as DadsComboboxValue[]) : []

const selectedValues = computed<DadsComboboxValue[]>(() => (props.multiple ? currentArray() : []))

const selectedItem = computed<DadsComboboxItem | null>(() => {
  if (props.multiple) return null
  if (props.modelValue === null || props.modelValue === undefined || props.modelValue === '') {
    return null
  }
  return props.items.find((item) => getItemValue(item) === props.modelValue) ?? null
})

// Resolve the display label for an arbitrary stored value (used by chips
// when the value matches a known item — falls back to the raw string).
const titleForValue = (value: DadsComboboxValue): string => {
  const found = props.items.find((item) => getItemValue(item) === value)
  return found ? getItemTitle(found) : String(value)
}

const activeOptionId = computed(() =>
  isOpen.value && activeIndex.value >= 0 ? getOptionId(activeIndex.value) : undefined,
)

const describedBy = computed(() => {
  const ids: string[] = []
  if (isError.value && props.errorMessage) ids.push(errorId.value)
  else if (props.hint) ids.push(hintId.value)
  return ids.length > 0 ? ids.join(' ') : undefined
})

const hasFooter = computed(() => (isError.value && !!props.errorMessage) || !!props.hint)

const rootClasses = computed(() => [
  'dads-combobox',
  `dads-combobox--${props.size}`,
  {
    'dads-combobox--disabled': props.disabled,
    'dads-combobox--readonly': props.readonly,
    'dads-combobox--error': isError.value,
    'dads-combobox--open': isOpen.value,
    'dads-combobox--multiple': props.multiple,
  },
])

// Sync the displayed input text in single mode whenever the bound value
// changes externally. In multiple mode the input is always for query text,
// so we never overwrite it from the outside.
watch(
  () => [props.modelValue, props.items, props.multiple] as const,
  () => {
    if (props.multiple) return
    if (selectedItem.value) {
      inputValue.value = getItemTitle(selectedItem.value)
    } else if (props.modelValue === null || props.modelValue === undefined) {
      inputValue.value = ''
    } else {
      // Free-input value (no matching item): show the raw string.
      inputValue.value = String(props.modelValue)
    }
  },
  { immediate: true },
)

const findFirstEnabledIndex = (): number => filteredItems.value.findIndex((item) => !item.disabled)

const openListbox = () => {
  if (props.disabled || props.readonly || isOpen.value) return
  isOpen.value = true
  if (filteredItems.value.length === 0) {
    activeIndex.value = -1
  } else {
    activeIndex.value = findFirstEnabledIndex()
  }
}

const closeListbox = () => {
  if (!isOpen.value) return
  isOpen.value = false
  activeIndex.value = -1
}

const emitChange = (next: DadsComboboxModelValue) => {
  emit('update:modelValue', next)
  emit('change', next)
}

const moveActive = (direction: 1 | -1) => {
  const list = filteredItems.value
  if (list.length === 0) {
    activeIndex.value = -1
    return
  }
  const start = activeIndex.value < 0 ? (direction === 1 ? -1 : 0) : activeIndex.value
  let next = start
  for (let i = 0; i < list.length; i++) {
    next = (next + direction + list.length) % list.length
    if (!list[next].disabled) {
      activeIndex.value = next
      return
    }
  }
}

// Commit a selection. `raw` is either an item value (when picked from the
// list) or the literal input text (free-input path). When `raw` matches a
// known item (by value or title) we use that item's value; otherwise the raw
// string is committed verbatim.
const commit = (raw: string) => {
  const trimmed = raw.trim()
  if (!trimmed) return
  const matched = props.items.find(
    (it) => String(getItemValue(it)) === trimmed || getItemTitle(it) === trimmed,
  )
  if (matched && matched.disabled) return
  const value: DadsComboboxValue = matched ? getItemValue(matched) : trimmed

  if (props.multiple) {
    const current = currentArray()
    if (!current.some((v) => v === value)) {
      emitChange([...current, value])
    }
    inputValue.value = ''
    activeIndex.value = filteredItems.value.length > 0 ? findFirstEnabledIndex() : -1
  } else {
    emitChange(value)
    inputValue.value = matched ? getItemTitle(matched) : String(value)
    closeListbox()
  }
}

const removeChip = (value: DadsComboboxValue) => {
  if (!props.multiple) return
  emitChange(currentArray().filter((v) => v !== value))
}

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  inputValue.value = target.value
  if (!isOpen.value) isOpen.value = true
  // Reset the cursor: prefer first enabled match so Enter-immediately works.
  activeIndex.value = filteredItems.value.length > 0 ? findFirstEnabledIndex() : -1
}

const onKeydown = (event: KeyboardEvent) => {
  if (props.disabled || props.readonly) return

  const { key } = event

  switch (key) {
    case 'ArrowDown':
      event.preventDefault()
      if (!isOpen.value) {
        openListbox()
      } else {
        moveActive(1)
      }
      break
    case 'ArrowUp':
      event.preventDefault()
      if (!isOpen.value) {
        openListbox()
      } else {
        moveActive(-1)
      }
      break
    case 'Enter': {
      event.preventDefault()
      const list = filteredItems.value
      if (isOpen.value && activeIndex.value >= 0 && list[activeIndex.value]) {
        commit(String(getItemValue(list[activeIndex.value])))
      } else if (inputValue.value.trim()) {
        // Free-input fallback: commit the raw string verbatim.
        commit(inputValue.value)
      }
      break
    }
    case 'Escape':
      if (isOpen.value) {
        event.preventDefault()
        closeListbox()
      }
      break
    case 'Tab':
      // Let the browser move focus naturally, but close so screen readers
      // don't announce a stale listbox.
      closeListbox()
      break
    case 'Backspace': {
      // In multiple mode, deleting from an empty input pops the last chip —
      // a familiar shortcut from email-style token inputs.
      if (!props.multiple || inputValue.value !== '') break
      const arr = currentArray()
      if (arr.length > 0) emitChange(arr.slice(0, -1))
      break
    }
    default:
      break
  }
}

const onFocus = (event: FocusEvent) => {
  if (!props.disabled && !props.readonly) {
    openListbox()
  }
  emit('focus', event)
}

const onBlur = (event: FocusEvent) => {
  emit('blur', event)
}

const onControlMousedown = (event: MouseEvent) => {
  // Clicks on the chip area or empty control space should focus the input
  // without losing focus from a focused input (which would close the listbox).
  const target = event.target as HTMLElement | null
  if (target && target === inputRef.value) return
  // Don't steal a click destined for the close button inside a chip.
  if (target?.closest('.dads-chip__close')) return
  event.preventDefault()
  inputRef.value?.focus()
}

// Suggestion mousedown uses preventDefault so the input keeps focus through
// the click — otherwise blur would fire first and close the listbox before
// the click handler ran.
const onSuggestionMousedown = (event: MouseEvent, item: DadsComboboxItem) => {
  event.preventDefault()
  if (item.disabled) return
  commit(String(getItemValue(item)))
}

// Listen on document so clicks inside dialogs / portals still close the
// listbox. The handler bails out when the click target is inside our root.
const onDocumentPointerDown = (event: MouseEvent) => {
  if (!isOpen.value) return
  const target = event.target as Node | null
  if (target && rootRef.value && rootRef.value.contains(target)) return
  closeListbox()
}

onMounted(() => {
  document.addEventListener('pointerdown', onDocumentPointerDown, true)
})

onBeforeUnmount(() => {
  document.removeEventListener('pointerdown', onDocumentPointerDown, true)
})

// Close when disabled flips on so the listbox cannot stay open with a
// non-interactive control.
watch(
  () => props.disabled,
  (next) => {
    if (next) closeListbox()
  },
)
</script>

<template>
  <div ref="rootRef" :class="rootClasses">
    <label v-if="label" :for="inputId" class="dads-combobox__label">
      {{ label }}
      <span v-if="required" class="dads-combobox__required" aria-hidden="true">{{
        requiredLabel
      }}</span>
    </label>

    <div class="dads-combobox__control" @mousedown="onControlMousedown">
      <ul v-if="multiple && selectedValues.length > 0" class="dads-combobox__chip-list">
        <li v-for="value in selectedValues" :key="String(value)" class="dads-combobox__chip-item">
          <DadsChip
            size="sm"
            :closable="!disabled && !readonly"
            :disabled="disabled"
            @close="removeChip(value)"
          >
            {{ titleForValue(value) }}
          </DadsChip>
        </li>
      </ul>
      <input
        :id="inputId"
        ref="inputRef"
        class="dads-combobox__input"
        type="text"
        role="combobox"
        autocomplete="off"
        :name="name"
        :value="inputValue"
        :placeholder="multiple && selectedValues.length > 0 ? '' : placeholder"
        :disabled="disabled || undefined"
        :readonly="readonly || undefined"
        :aria-invalid="isError || undefined"
        :aria-required="required || undefined"
        :aria-describedby="describedBy"
        :aria-expanded="isOpen"
        :aria-controls="listboxId"
        :aria-activedescendant="activeOptionId"
        aria-autocomplete="list"
        @input="onInput"
        @keydown="onKeydown"
        @focus="onFocus"
        @blur="onBlur"
      />
    </div>

    <ul
      v-show="isOpen && filteredItems.length > 0"
      :id="listboxId"
      class="dads-combobox__suggestions"
      role="listbox"
      :aria-multiselectable="multiple || undefined"
    >
      <li
        v-for="(item, index) in filteredItems"
        :id="getOptionId(index)"
        :key="String(getItemValue(item))"
        role="option"
        :aria-selected="index === activeIndex"
        :aria-disabled="item.disabled || undefined"
        :class="[
          'dads-combobox__suggestion',
          {
            'dads-combobox__suggestion--active': index === activeIndex,
            'dads-combobox__suggestion--disabled': item.disabled,
          },
        ]"
        @mousedown="onSuggestionMousedown($event, item)"
        @mouseenter="!item.disabled && (activeIndex = index)"
      >
        {{ getItemTitle(item) }}
      </li>
    </ul>

    <div v-if="hasFooter" class="dads-combobox__footer">
      <span
        v-if="isError && errorMessage"
        :id="errorId"
        class="dads-combobox__error"
        role="alert"
        >{{ errorMessage }}</span
      >
      <span v-else-if="hint" :id="hintId" class="dads-combobox__hint">{{ hint }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '../../styles/base' as base;
@use '../../styles/focus-ring' as ring;

.dads-combobox {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4, 0.25rem);
  font-family: var(--font-family-sans, 'Noto Sans JP', sans-serif);
  color: var(--color-text-primary, #1a1a1a);
  position: relative;

  // -------------------- label & required marker --------------------------
  &__label {
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-8, 0.5rem);
    font-size: var(--font-size-16, 1rem);
    font-weight: 500;
    line-height: var(--line-height-150, 1.5);
  }

  &__required {
    background-color: var(--color-error, #ec0000);
    color: var(--color-text-on-primary, #fff);
    font-size: var(--font-size-14, 0.875rem);
    font-weight: 700;
    padding: 2px 8px;
    border-radius: var(--border-radius-4, 0.25rem);
    line-height: 1.2;
  }

  // -------------------- control wrapper ----------------------------------
  // The focus ring lives on the wrapper so the input and chips share the
  // highlight when the input is focused.
  &__control {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--spacing-4, 0.25rem);
    background-color: var(--color-bg-surface, #fff);
    border: 1px solid var(--color-border-default, rgba(0, 0, 0, 0.1));
    border-radius: var(--border-radius-4, 0.25rem);
    transition:
      border-color 0.15s ease,
      box-shadow 0.15s ease;
    cursor: text;

    @include ring.dads-focus-ring-within;
  }

  &__input {
    @include base.dads-reset-input;
    flex: 1;
    min-width: 6rem;
    width: auto;

    // The wrapper provides the focus ring via :focus-within. Suppress the
    // input's own :focus-visible outline so the global `:focus-visible` rule
    // in styles/_focus.scss doesn't draw a second blue ring inside the
    // wrapper. !important is required to win against the global !important.
    &:focus-visible {
      outline: none !important;
    }
  }

  // -------------------- chip list (multiple) -----------------------------
  &__chip-list {
    display: contents;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  &__chip-item {
    display: inline-flex;
  }

  // -------------------- suggestions listbox ------------------------------
  &__suggestions {
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
    right: 0;
    z-index: 10;
    margin: 0;
    padding: var(--spacing-4, 0.25rem) 0;
    list-style: none;
    background-color: var(--color-bg-surface, #fff);
    border: 1px solid var(--color-border-default, rgba(0, 0, 0, 0.1));
    border-radius: var(--border-radius-4, 0.25rem);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
    max-height: 16rem;
    overflow-y: auto;
  }

  &__suggestion {
    padding: var(--spacing-8, 0.5rem) var(--spacing-12, 0.75rem);
    cursor: pointer;
    line-height: var(--line-height-150, 1.5);

    &--active {
      background-color: var(--color-bg-subtle, rgba(0, 0, 0, 0.05));
    }

    &--disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  // -------------------- footer (hint / error) ----------------------------
  &__footer {
    display: flex;
    gap: var(--spacing-8, 0.5rem);
    font-size: var(--font-size-14, 0.875rem);
    line-height: var(--line-height-150, 1.5);
  }

  &__hint {
    color: var(--color-text-secondary, #4d4d4d);
  }

  &__error {
    color: var(--color-error, #ec0000);
    font-weight: 500;
  }

  // -------------------- size ---------------------------------------------
  &--lg &__control {
    min-height: calc(3.5rem - 2px);
    padding: var(--spacing-4, 0.25rem) var(--spacing-16, 1rem);
    font-size: var(--font-size-18, 1.125rem);
  }

  &--md &__control {
    min-height: calc(3rem - 2px);
    padding: var(--spacing-4, 0.25rem) var(--spacing-12, 0.75rem);
    font-size: var(--font-size-16, 1rem);
  }

  &--sm &__control {
    min-height: calc(2.5rem - 2px);
    padding: var(--spacing-4, 0.25rem) var(--spacing-12, 0.75rem);
    font-size: var(--font-size-14, 0.875rem);
  }

  // -------------------- hover (interactive) ------------------------------
  &:not(.dads-combobox--readonly):not(.dads-combobox--disabled):not(.dads-combobox--error)
    .dads-combobox__control:hover {
    border-color: var(--color-text-primary, #1a1a1a);
  }

  // -------------------- readonly -----------------------------------------
  &--readonly &__control {
    border-style: dashed;
    background-color: var(--color-bg-subtle, rgba(0, 0, 0, 0.05));
    cursor: not-allowed;
  }

  // -------------------- disabled -----------------------------------------
  &--disabled {
    pointer-events: none;
    opacity: 0.5;

    .dads-combobox__control {
      background-color: var(--color-bg-subtle, rgba(0, 0, 0, 0.05));
    }
  }

  // -------------------- error --------------------------------------------
  &--error &__control {
    border-color: var(--color-error, #ec0000);
  }

  // -------------------- forced colors ------------------------------------
  @include base.dads-forced-colors {
    &__control {
      border: 1px solid CanvasText;
    }

    &__suggestions {
      border: 1px solid CanvasText;
    }

    &__suggestion--active {
      background-color: Highlight;
      color: HighlightText;
    }
  }
}
</style>
