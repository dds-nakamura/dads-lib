<script setup lang="ts">
import { computed, useId } from 'vue'
import DadsButton from '../Button/DadsButton.vue'
import type { DadsSearchBoxEmits, DadsSearchBoxProps } from './DadsSearchBox.types'

const props = withDefaults(defineProps<DadsSearchBoxProps>(), {
  modelValue: '',
  size: 'md',
  disabled: false,
  readonly: false,
  required: false,
  error: false,
  buttonLabel: '検索',
})

const emit = defineEmits<DadsSearchBoxEmits>()

// One id per instance so the label `for` and aria references stay stable.
const generatedId = useId()
const inputId = computed(() => props.id ?? `dads-search-box-${generatedId}`)
const hintId = computed(() => `${inputId.value}-hint`)
const errorId = computed(() => `${inputId.value}-error`)

const isError = computed(() => props.error || !!props.errorMessage)

const describedBy = computed(() => {
  if (isError.value && props.errorMessage) return errorId.value
  if (props.hint) return hintId.value
  return undefined
})

const rootClasses = computed(() => [
  'dads-search-box',
  `dads-search-box--${props.size}`,
  {
    'dads-search-box--disabled': props.disabled,
    'dads-search-box--readonly': props.readonly,
    'dads-search-box--error': isError.value,
  },
])

const buttonSize = computed(() => props.size)

const hasFooter = computed(() => (isError.value && !!props.errorMessage) || !!props.hint)

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}

const onKeydown = (event: KeyboardEvent) => {
  // Enter submits the search. We preventDefault so a wrapping <form> doesn't
  // double-fire (the consumer can still listen to native submit if they wrap
  // the component, but the `search` event is the canonical entry point).
  if (event.key !== 'Enter' || event.isComposing) return
  if (props.disabled) return
  event.preventDefault()
  emit('search', props.modelValue ?? '')
}

const onButtonClick = () => {
  if (props.disabled) return
  emit('search', props.modelValue ?? '')
}

const onFocus = (event: FocusEvent) => emit('focus', event)
const onBlur = (event: FocusEvent) => emit('blur', event)
</script>

<template>
  <div :class="rootClasses">
    <label v-if="label" :for="inputId" class="dads-search-box__label">
      {{ label }}
      <span v-if="required" class="dads-search-box__required" aria-hidden="true">必須</span>
    </label>

    <div class="dads-search-box__row">
      <div class="dads-search-box__fields">
        <label class="dads-search-box__input">
          <svg
            class="dads-search-box__icon"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              d="m21 20.5-6-6a7.4 7.4 0 0 0 1.9-5A7.4 7.4 0 0 0 9.5 2 7.5 7.5 0 1 0 14 15.5l6 6 1-1ZM3.5 9.5a6 6 0 0 1 6-6 6 6 0 0 1 6 6 6 6 0 0 1-6 6 6 6 0 0 1-6-6Z"
              fill="currentcolor"
            />
          </svg>
          <span v-if="!label" class="dads-u-visually-hidden">{{ buttonLabel }}</span>
          <input
            :id="inputId"
            type="search"
            class="dads-search-box__field"
            :name="name"
            :value="modelValue"
            :placeholder="placeholder"
            :disabled="disabled || undefined"
            :readonly="readonly || undefined"
            :aria-invalid="isError || undefined"
            :aria-required="required || undefined"
            :aria-describedby="describedBy"
            @input="onInput"
            @keydown="onKeydown"
            @focus="onFocus"
            @blur="onBlur"
          />
        </label>
      </div>

      <DadsButton
        type="submit"
        variant="solid-fill"
        :size="buttonSize"
        :disabled="disabled"
        @click="onButtonClick"
      >
        {{ buttonLabel }}
      </DadsButton>
    </div>

    <div v-if="hasFooter" class="dads-search-box__footer">
      <span
        v-if="isError && errorMessage"
        :id="errorId"
        class="dads-search-box__error"
        role="alert"
        >{{ errorMessage }}</span
      >
      <span v-else-if="hint" :id="hintId" class="dads-search-box__hint">{{ hint }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '../../styles/base' as base;
@use '../../styles/focus-ring' as ring;

// Visually-hide helper. The HTML reference exposes a global
// `.dads-u-visually-hidden` utility; since this package is scoped, declare it
// locally so consumers don't need to pull a separate CSS file.
.dads-u-visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.dads-search-box {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4, 0.25rem);
  font-family: var(--font-family-sans, 'Noto Sans JP', sans-serif);
  color: var(--color-text-primary, #1a1a1a);

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

  // -------------------- horizontal row -----------------------------------
  // The fields wrapper grows, the button keeps its intrinsic width.
  &__row {
    display: flex;
    align-items: stretch;
    gap: var(--spacing-16, 1rem);
  }

  &__fields {
    position: relative;
    z-index: 0;
    display: flex;
    flex-grow: 1;
  }

  // -------------------- input wrapper ------------------------------------
  // The wrapper owns the border + focus ring so the leading icon shares the
  // highlight. The native input sits transparently on top.
  &__input {
    flex-grow: 1;
    position: relative;
    display: flex;
    align-items: stretch;
    background-color: var(--color-bg-surface, #fff);
    border: 1px solid var(--color-border-default, rgba(0, 0, 0, 0.1));
    border-radius: var(--border-radius-4, 0.25rem);
    transition:
      border-color 0.15s ease,
      box-shadow 0.15s ease;

    @include ring.dads-focus-ring-within;
  }

  &__icon {
    position: absolute;
    top: 0;
    bottom: 0;
    left: var(--spacing-16, 1rem);
    z-index: 1;
    margin: auto 0;
    width: 1.5rem;
    height: 1.5rem;
    color: var(--color-text-secondary, #4d4d4d);
    pointer-events: none;
  }

  &__field {
    @include base.dads-reset-input;
    flex: 1;
    width: 100%;
    box-sizing: border-box;
    padding-left: calc(var(--spacing-16, 1rem) + 2rem); // icon room
    padding-right: var(--spacing-16, 1rem);

    // Hide the WebKit / Chromium "x" so it doesn't collide with the icon.
    &::-webkit-search-cancel-button {
      display: none;
    }

    // The wrapper provides the focus ring via :focus-within. Suppress the
    // input's own :focus-visible outline so global focus styles don't draw a
    // second ring inside the wrapper.
    &:focus-visible {
      outline: none !important;
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
  &--lg &__field {
    min-height: calc(3.5rem - 2px);
    font-size: var(--font-size-18, 1.125rem);
  }

  &--md &__field {
    min-height: calc(3rem - 2px);
    font-size: var(--font-size-16, 1rem);
  }

  &--sm &__field {
    min-height: calc(2.5rem - 2px);
    font-size: var(--font-size-14, 0.875rem);
  }

  // -------------------- hover (interactive) ------------------------------
  &:not(.dads-search-box--readonly):not(.dads-search-box--disabled):not(.dads-search-box--error)
    .dads-search-box__input:hover {
    border-color: var(--color-text-primary, #1a1a1a);
  }

  // -------------------- readonly -----------------------------------------
  &--readonly &__input {
    border-style: dashed;
    background-color: var(--color-bg-subtle, rgba(0, 0, 0, 0.05));
  }

  // -------------------- disabled -----------------------------------------
  &--disabled {
    pointer-events: none;
    opacity: 0.5;

    .dads-search-box__input {
      background-color: var(--color-bg-subtle, rgba(0, 0, 0, 0.05));
    }
  }

  // -------------------- error --------------------------------------------
  &--error &__input {
    border-color: var(--color-error, #ec0000);
  }

  // -------------------- forced colors ------------------------------------
  @include base.dads-forced-colors {
    &__input {
      border: 1px solid CanvasText;
    }

    &__icon {
      color: CanvasText;
    }
  }
}
</style>
