<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, useId, watch } from 'vue'
import DadsIcon from '../Icon/DadsIcon.vue'
import type {
  DadsSelectEmits,
  DadsSelectItem,
  DadsSelectModelValue,
  DadsSelectProps,
  DadsSelectValue,
} from './DadsSelect.types'

const props = withDefaults(defineProps<DadsSelectProps>(), {
  items: () => [],
  itemValue: 'value',
  itemTitle: 'title',
  multiple: false,
  size: 'md',
  disabled: false,
  readonly: false,
  required: false,
  error: false,
  chips: true,
  formatRemoveAriaLabel: (title: string) => `${title} を削除`,
  requiredLabel: '必須',
})

const emit = defineEmits<DadsSelectEmits>()

// Generated once per instance so all the wired ids (label `for`, listbox,
// option, hint, error) stay stable across renders. Calling useId() inside a
// computed would re-run on every dependency change.
const generatedId = useId()
const triggerId = computed(() => props.id ?? `dads-select-${generatedId}`)
const listboxId = computed(() => `${triggerId.value}-listbox`)
const hintId = computed(() => `${triggerId.value}-hint`)
const errorId = computed(() => `${triggerId.value}-error`)
const getOptionId = (index: number) => `${triggerId.value}-option-${index}`

const isError = computed(() => props.error || !!props.errorMessage)

// Open / close state and the keyboard cursor (aria-activedescendant target).
const isOpen = ref(false)
const activeIndex = ref(-1)
const rootRef = ref<HTMLElement | null>(null)
const triggerRef = ref<HTMLButtonElement | null>(null)

// item-value / item-title prop lookups use the index signature on
// DadsSelectItem so callers can override the canonical 'value' / 'title' keys.
const getItemValue = (item: DadsSelectItem): DadsSelectValue =>
  item[props.itemValue] as DadsSelectValue
const getItemTitle = (item: DadsSelectItem): string => String(item[props.itemTitle] ?? '')

const isItemSelected = (item: DadsSelectItem): boolean => {
  const v = getItemValue(item)
  if (props.multiple) {
    return Array.isArray(props.modelValue) && props.modelValue.includes(v)
  }
  return props.modelValue === v
}

const selectedItems = computed<DadsSelectItem[]>(() => {
  if (!props.multiple || !Array.isArray(props.modelValue)) return []
  return props.modelValue
    .map((v) => props.items.find((item) => getItemValue(item) === v))
    .filter((item): item is DadsSelectItem => item !== undefined)
})

const selectedItem = computed<DadsSelectItem | null>(() => {
  if (props.multiple) return null
  if (props.modelValue === null || props.modelValue === undefined) return null
  return props.items.find((item) => getItemValue(item) === props.modelValue) ?? null
})

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
  'dads-select',
  `dads-select--${props.size}`,
  {
    'dads-select--disabled': props.disabled,
    'dads-select--readonly': props.readonly,
    'dads-select--error': isError.value,
    'dads-select--open': isOpen.value,
  },
])

const findFirstSelectedIndex = (): number => {
  for (let i = 0; i < props.items.length; i++) {
    if (isItemSelected(props.items[i])) return i
  }
  return -1
}

const findFirstEnabledIndex = (): number => props.items.findIndex((item) => !item.disabled)

const openListbox = () => {
  if (props.disabled || props.readonly || isOpen.value) return
  isOpen.value = true
  const fromSelected = findFirstSelectedIndex()
  activeIndex.value = fromSelected >= 0 ? fromSelected : findFirstEnabledIndex()
  emit('open')
}

const closeListbox = (returnFocus = false) => {
  if (!isOpen.value) return
  isOpen.value = false
  activeIndex.value = -1
  emit('close')
  if (returnFocus) triggerRef.value?.focus()
}

const toggleOpen = () => {
  if (props.disabled || props.readonly) return
  if (isOpen.value) closeListbox()
  else openListbox()
}

const emitChange = (next: DadsSelectModelValue) => {
  emit('update:modelValue', next)
  emit('change', next)
}

const selectItem = (item: DadsSelectItem) => {
  if (item.disabled) return
  const v = getItemValue(item)
  if (props.multiple) {
    const current = Array.isArray(props.modelValue) ? [...props.modelValue] : []
    const idx = current.indexOf(v)
    if (idx >= 0) current.splice(idx, 1)
    else current.push(v)
    emitChange(current)
    // Stay open so the user can pick more values.
  } else {
    emitChange(v)
    closeListbox(true)
  }
}

const removeItem = (item: DadsSelectItem) => {
  if (!props.multiple) return
  const v = getItemValue(item)
  const current = Array.isArray(props.modelValue) ? props.modelValue.filter((x) => x !== v) : []
  emitChange(current)
}

const moveActive = (direction: 1 | -1) => {
  if (props.items.length === 0) return
  const start = activeIndex.value
  let next = start
  for (let i = 0; i < props.items.length; i++) {
    next = (next + direction + props.items.length) % props.items.length
    if (!props.items[next].disabled) {
      activeIndex.value = next
      return
    }
  }
}

const moveToEdge = (edge: 'first' | 'last') => {
  const indices = edge === 'first' ? props.items.keys() : [...props.items.keys()].reverse()
  for (const i of indices) {
    if (!props.items[i].disabled) {
      activeIndex.value = i
      return
    }
  }
}

// Type-ahead: collect printable keys into a buffer and jump to the first
// matching option. The buffer resets after a quiet period so quick repeated
// keystrokes search by prefix while pauses act as a fresh search.
const TYPE_AHEAD_RESET_MS = 500
let typeBuffer = ''
let typeBufferTimer: ReturnType<typeof setTimeout> | null = null

const handleTypeAhead = (key: string) => {
  if (typeBufferTimer !== null) clearTimeout(typeBufferTimer)
  typeBuffer += key.toLowerCase()
  typeBufferTimer = setTimeout(() => {
    typeBuffer = ''
    typeBufferTimer = null
  }, TYPE_AHEAD_RESET_MS)

  const idx = props.items.findIndex(
    (item) => !item.disabled && getItemTitle(item).toLowerCase().startsWith(typeBuffer),
  )
  if (idx >= 0) activeIndex.value = idx
}

const onTriggerKeydown = (event: KeyboardEvent) => {
  if (props.disabled || props.readonly) return

  const { key } = event

  if (!isOpen.value) {
    if (key === 'ArrowDown' || key === 'ArrowUp' || key === 'Enter' || key === ' ') {
      event.preventDefault()
      openListbox()
      return
    }
    if (key.length === 1 && /\S/.test(key)) {
      event.preventDefault()
      openListbox()
      handleTypeAhead(key)
    }
    return
  }

  switch (key) {
    case 'Escape':
      event.preventDefault()
      closeListbox(true)
      break
    case 'Tab':
      // Let the browser move focus naturally, but close so screen readers
      // don't announce a stale listbox.
      closeListbox()
      break
    case 'ArrowDown':
      event.preventDefault()
      moveActive(1)
      break
    case 'ArrowUp':
      event.preventDefault()
      moveActive(-1)
      break
    case 'Home':
      event.preventDefault()
      moveToEdge('first')
      break
    case 'End':
      event.preventDefault()
      moveToEdge('last')
      break
    case 'Enter':
    case ' ':
      event.preventDefault()
      if (activeIndex.value >= 0) selectItem(props.items[activeIndex.value])
      break
    default:
      if (key.length === 1 && /\S/.test(key)) {
        event.preventDefault()
        handleTypeAhead(key)
      }
  }
}

// Listen on document so clicks inside dialogs / portals still close the
// listbox. The handler bails out when the click target lives inside our root.
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
  if (typeBufferTimer !== null) clearTimeout(typeBufferTimer)
})

// Close when disabled flips on so the listbox cannot stay open with a
// non-interactive trigger.
watch(
  () => props.disabled,
  (next) => {
    if (next) closeListbox()
  },
)

const onFocus = (event: FocusEvent) => emit('focus', event)
const onBlur = (event: FocusEvent) => emit('blur', event)
</script>

<template>
  <div ref="rootRef" :class="rootClasses">
    <label v-if="label" :for="triggerId" class="dads-select__label">
      {{ label }}
      <span v-if="required" class="dads-select__required" aria-hidden="true">{{
        requiredLabel
      }}</span>
    </label>

    <div class="dads-select__control">
      <button
        :id="triggerId"
        ref="triggerRef"
        type="button"
        class="dads-select__trigger"
        role="combobox"
        aria-haspopup="listbox"
        :aria-expanded="isOpen"
        :aria-controls="listboxId"
        :aria-activedescendant="activeOptionId"
        :aria-invalid="isError || undefined"
        :aria-required="required || undefined"
        :aria-describedby="describedBy"
        :disabled="disabled || undefined"
        :data-readonly="readonly || undefined"
        @click="toggleOpen"
        @keydown="onTriggerKeydown"
        @focus="onFocus"
        @blur="onBlur"
      >
        <DadsIcon
          v-if="prefixIcon"
          :name="prefixIcon"
          class="dads-select__prefix-icon"
          :size="20"
        />
        <span class="dads-select__value-wrap">
          <template v-if="multiple && selectedItems.length > 0 && chips">
            <span class="dads-select__tags">
              <span
                v-for="item in selectedItems"
                :key="String(getItemValue(item))"
                class="dads-select__tag"
              >
                <span class="dads-select__tag-text">{{ getItemTitle(item) }}</span>
                <button
                  type="button"
                  class="dads-select__tag-remove"
                  :aria-label="formatRemoveAriaLabel(getItemTitle(item))"
                  :disabled="disabled || readonly || undefined"
                  @click.stop="removeItem(item)"
                  @keydown.stop
                >
                  ×
                </button>
              </span>
            </span>
          </template>
          <template v-else-if="multiple && selectedItems.length > 0">
            <span class="dads-select__value">{{
              selectedItems.map((i) => getItemTitle(i)).join(', ')
            }}</span>
          </template>
          <template v-else-if="!multiple && selectedItem">
            <span class="dads-select__value">{{ getItemTitle(selectedItem) }}</span>
          </template>
          <template v-else>
            <span class="dads-select__placeholder">{{ placeholder }}</span>
          </template>
        </span>
        <DadsIcon
          name="keyboard_arrow_down"
          class="dads-select__icon"
          :class="{ 'dads-select__icon--open': isOpen }"
          :size="20"
        />
      </button>

      <ul
        v-show="isOpen"
        :id="listboxId"
        class="dads-select__listbox"
        role="listbox"
        :aria-multiselectable="multiple || undefined"
        tabindex="-1"
      >
        <li
          v-for="(item, index) in items"
          :id="getOptionId(index)"
          :key="String(getItemValue(item))"
          role="option"
          :aria-selected="isItemSelected(item)"
          :aria-disabled="item.disabled || undefined"
          :class="[
            'dads-select__option',
            {
              'dads-select__option--active': index === activeIndex,
              'dads-select__option--selected': isItemSelected(item),
              'dads-select__option--disabled': item.disabled,
            },
          ]"
          @click="selectItem(item)"
          @mouseenter="!item.disabled && (activeIndex = index)"
        >
          {{ getItemTitle(item) }}
        </li>
        <li
          v-if="items.length === 0"
          class="dads-select__option dads-select__option--empty"
          aria-disabled="true"
        >
          選択肢がありません
        </li>
      </ul>
    </div>

    <div v-if="hasFooter" class="dads-select__footer">
      <span v-if="isError && errorMessage" :id="errorId" class="dads-select__error" role="alert">{{
        errorMessage
      }}</span>
      <span v-else-if="hint" :id="hintId" class="dads-select__hint">{{ hint }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '../../styles/base' as base;
@use '../../styles/focus-ring' as ring;

.dads-select {
  display: flex;
  flex-direction: column;
  gap: calc(4 / 16 * 1rem);
  font-family: var(--font-family-sans, 'Noto Sans JP', sans-serif);
  color: var(--color-neutral-solid-gray-800, #333);
  line-height: 1.7;
  letter-spacing: 0.02em;
  position: relative;

  // -------------------- label & required marker --------------------------
  &__label {
    display: inline-flex;
    align-items: center;
    gap: calc(8 / 16 * 1rem);
    font-size: var(--font-size-16, 1rem);
    font-weight: 500;
    line-height: var(--line-height-150, 1.5);
  }

  &__required {
    background-color: var(--color-semantic-error-1, #ec0000);
    color: var(--color-neutral-white, #fff);
    font-size: var(--font-size-14, 0.875rem);
    font-weight: 700;
    padding: 2px 8px;
    border-radius: var(--border-radius-4, 0.25rem);
    line-height: 1.2;
  }

  // -------------------- control wrapper ----------------------------------
  // The focus ring lives on the wrapper so the trigger and listbox share the
  // highlight when the trigger is focused.
  &__control {
    position: relative;
    display: flex;
    background-color: var(--color-neutral-white, #fff);
    border: 1px solid var(--color-neutral-solid-gray-600, #666);
    border-radius: var(--border-radius-8, 0.5rem);
    transition:
      border-color 0.15s ease,
      box-shadow 0.15s ease;

    @include ring.dads-focus-ring-within;
  }

  // -------------------- trigger button -----------------------------------
  &__trigger {
    @include base.dads-reset-button;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: calc(8 / 16 * 1rem);
    width: 100%;
    text-align: left;
  }

  &__value-wrap {
    flex: 1;
    min-width: 0;
    display: flex;
    align-items: center;
    overflow: hidden;
  }

  &__prefix-icon {
    flex-shrink: 0;
    font-size: 1.25em;
    line-height: 1;
    color: var(--color-neutral-solid-gray-700, #4d4d4d);
    margin-inline-end: calc(8 / 16 * 1rem);
  }

  &__value {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__placeholder {
    color: var(--color-neutral-solid-gray-420, #999);
  }

  &__icon {
    flex-shrink: 0;
    color: var(--color-neutral-solid-gray-700, #4d4d4d);
    font-size: 1.25em;
    transition: transform 0.15s ease;
  }

  &__icon--open {
    transform: rotate(180deg);
  }

  // -------------------- chip tags (multiple) -----------------------------
  &__tags {
    display: flex;
    flex-wrap: wrap;
    gap: calc(4 / 16 * 1rem);
  }

  &__tag {
    display: inline-flex;
    align-items: center;
    gap: calc(4 / 16 * 1rem);
    background-color: var(--color-neutral-solid-gray-50, #f2f2f2);
    border: 1px solid var(--color-neutral-solid-gray-600, #666);
    border-radius: var(--border-radius-8, 0.5rem);
    padding: 0 calc(8 / 16 * 1rem);
    font-size: var(--font-size-14, 0.875rem);
    line-height: 1.6;
  }

  &__tag-remove {
    @include base.dads-reset-button;
    @include ring.dads-focus-ring;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1.25em;
    height: 1.25em;
    border-radius: 50%;
    color: var(--color-neutral-solid-gray-700, #4d4d4d);
    font-size: 1em;
    line-height: 1;

    &:hover:not(:disabled) {
      background-color: var(--color-neutral-solid-gray-50, rgba(0, 0, 0, 0.08));
    }
  }

  // -------------------- listbox ------------------------------------------
  &__listbox {
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
    right: 0;
    z-index: 10;
    margin: 0;
    padding: calc(4 / 16 * 1rem) 0;
    list-style: none;
    background-color: var(--color-neutral-white, #fff);
    border: 1px solid var(--color-neutral-solid-gray-420, #949494);
    border-radius: var(--border-radius-8, 0.5rem);
    box-shadow: var(--elevation-1);
    max-height: 16rem;
    overflow-y: auto;
  }

  &__option {
    padding: calc(8 / 16 * 1rem) calc(12 / 16 * 1rem);
    cursor: pointer;
    line-height: var(--line-height-150, 1.5);

    &--active {
      background-color: var(--color-neutral-solid-gray-50, rgba(0, 0, 0, 0.05));
    }

    &--selected {
      font-weight: 600;
      background-color: var(--color-primitive-blue-100, #d9e6ff);
      color: var(--color-primitive-blue-1000, #00118f);
    }

    &--selected.dads-select__option--active {
      background-color: var(--color-primitive-blue-200, #c5d7fb);
    }

    &--disabled {
      color: var(--color-neutral-solid-gray-420, #949494);
      cursor: not-allowed;
    }

    &--empty {
      color: var(--color-neutral-solid-gray-700, #4d4d4d);
      cursor: default;
      text-align: center;
    }
  }

  // -------------------- footer (hint / error) ----------------------------
  &__footer {
    display: flex;
    gap: calc(8 / 16 * 1rem);
    font-size: var(--font-size-14, 0.875rem);
    line-height: var(--line-height-150, 1.5);
  }

  &__hint {
    color: var(--color-neutral-solid-gray-700, #4d4d4d);
  }

  &__error {
    color: var(--color-semantic-error-1, #ec0000);
    font-weight: 500;
  }

  // -------------------- size ---------------------------------------------
  &--lg &__trigger {
    min-height: calc(3.5rem - 2px);
    font-size: var(--font-size-18, 1.125rem);
    padding: 0 calc(16 / 16 * 1rem);
  }

  &--md &__trigger {
    min-height: calc(3rem - 2px);
    font-size: var(--font-size-16, 1rem);
    padding: 0 calc(12 / 16 * 1rem);
  }

  &--sm &__trigger {
    min-height: calc(2.5rem - 2px);
    font-size: var(--font-size-14, 0.875rem);
    padding: 0 calc(12 / 16 * 1rem);
  }

  // -------------------- hover (interactive) ------------------------------
  &:not(.dads-select--readonly):not(.dads-select--disabled):not(.dads-select--error)
    .dads-select__control:hover {
    border-color: var(--color-neutral-black, #000);
  }

  // -------------------- readonly -----------------------------------------
  &--readonly &__control {
    border-style: dashed;
    background-color: var(--color-neutral-solid-gray-50, rgba(0, 0, 0, 0.05));
  }

  &--readonly &__trigger {
    cursor: not-allowed;
  }

  // -------------------- disabled -----------------------------------------
  // Official DADS form-control disabled palette: border gray-300, bg gray-50,
  // text gray-420 (no flat opacity dimming).
  &--disabled {
    pointer-events: none;
    color: var(--color-neutral-solid-gray-420, #949494);

    .dads-select__control {
      border-color: var(--color-neutral-solid-gray-300, #b3b3b3);
      background-color: var(--color-neutral-solid-gray-50, #f2f2f2);
    }

    .dads-select__trigger,
    .dads-select__placeholder,
    .dads-select__icon,
    .dads-select__prefix-icon {
      color: var(--color-neutral-solid-gray-420, #949494);
    }
  }

  // -------------------- error --------------------------------------------
  &--error &__control {
    border-color: var(--color-semantic-error-1, #ec0000);
  }

  // Invalid hover deepens to red-1000 (official select.css:60-63).
  &--error:not(.dads-select--disabled) &__control:hover {
    border-color: var(--color-primitive-red-1000, #a90000);
  }

  // -------------------- forced colors ------------------------------------
  @include base.dads-forced-colors {
    &__control {
      border: 1px solid CanvasText;
    }

    &__listbox {
      border: 1px solid CanvasText;
    }

    &__option--selected {
      background-color: Highlight;
      color: HighlightText;
    }
  }
}
</style>
