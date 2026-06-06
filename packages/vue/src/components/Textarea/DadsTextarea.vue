<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, useId, watch } from 'vue'
import type { DadsTextareaEmits, DadsTextareaProps } from './DadsTextarea.types'

const props = withDefaults(defineProps<DadsTextareaProps>(), {
  size: 'md',
  rows: 3,
  resize: 'vertical',
  autoResize: false,
  minRows: 2,
  disabled: false,
  readonly: false,
  required: false,
  error: false,
  requiredLabel: '必須',
})

const emit = defineEmits<DadsTextareaEmits>()

const textareaRef = ref<HTMLTextAreaElement | null>(null)

// Generated once per instance so the label `for` and `aria-describedby` ids
// stay stable across renders. Calling useId() inside a computed would re-run
// on every dependency change.
const generatedId = useId()
const textareaId = computed(() => props.id ?? `dads-textarea-${generatedId}`)
const hintId = computed(() => `${textareaId.value}-hint`)
const errorId = computed(() => `${textareaId.value}-error`)
const counterId = computed(() => `${textareaId.value}-counter`)

const isError = computed(() => props.error || !!props.errorMessage)

const currentLength = computed(() => String(props.modelValue ?? '').length)

const effectiveRows = computed(() => (props.autoResize ? props.minRows : props.rows))

const effectiveResize = computed(() => (props.autoResize ? 'none' : props.resize))

const describedBy = computed(() => {
  const ids: string[] = []
  if (isError.value && props.errorMessage) ids.push(errorId.value)
  else if (props.hint) ids.push(hintId.value)
  if (props.counter !== undefined) ids.push(counterId.value)
  return ids.length > 0 ? ids.join(' ') : undefined
})

const rootClasses = computed(() => [
  'dads-textarea',
  `dads-textarea--${props.size}`,
  {
    'dads-textarea--disabled': props.disabled,
    'dads-textarea--readonly': props.readonly,
    'dads-textarea--error': isError.value,
  },
])

const textareaAttrs = computed(() => ({
  name: props.name,
  placeholder: props.placeholder,
  autocomplete: props.autocomplete,
  maxlength: props.maxlength,
  disabled: props.disabled || undefined,
  readonly: props.readonly || undefined,
  'aria-invalid': isError.value || undefined,
  'aria-required': props.required || undefined,
  'aria-describedby': describedBy.value,
}))

const hasFooter = computed(
  () => (isError.value && !!props.errorMessage) || !!props.hint || props.counter !== undefined,
)

let rafHandle: number | null = null

const adjustHeight = () => {
  rafHandle = null
  const el = textareaRef.value
  if (!el || !props.autoResize) return
  el.style.height = 'auto'
  const styles = window.getComputedStyle(el)
  const lineHeight = Number.parseFloat(styles.lineHeight) || 20
  const paddingY =
    (Number.parseFloat(styles.paddingTop) || 0) + (Number.parseFloat(styles.paddingBottom) || 0)
  const borderY =
    (Number.parseFloat(styles.borderTopWidth) || 0) +
    (Number.parseFloat(styles.borderBottomWidth) || 0)
  const min = props.minRows * lineHeight + paddingY + borderY
  const max =
    props.maxRows !== undefined
      ? props.maxRows * lineHeight + paddingY + borderY
      : Number.POSITIVE_INFINITY
  const next = Math.min(max, Math.max(min, el.scrollHeight))
  el.style.height = `${next}px`
}

const scheduleAdjust = () => {
  if (!props.autoResize) return
  if (rafHandle !== null) cancelAnimationFrame(rafHandle)
  rafHandle = requestAnimationFrame(adjustHeight)
}

onMounted(scheduleAdjust)

onBeforeUnmount(() => {
  if (rafHandle !== null) cancelAnimationFrame(rafHandle)
})

watch(() => props.modelValue, scheduleAdjust, { flush: 'post' })

const onInput = (event: Event) => {
  const target = event.target as HTMLTextAreaElement
  emit('update:modelValue', target.value)
}

const onChange = (event: Event) => emit('change', event)
const onFocus = (event: FocusEvent) => emit('focus', event)
const onBlur = (event: FocusEvent) => emit('blur', event)
</script>

<template>
  <div :class="rootClasses">
    <label v-if="label" :for="textareaId" class="dads-textarea__label">
      {{ label }}
      <span v-if="required" class="dads-textarea__required" aria-hidden="true">{{
        requiredLabel
      }}</span>
    </label>

    <div class="dads-textarea__control">
      <textarea
        :id="textareaId"
        ref="textareaRef"
        class="dads-textarea__input"
        :value="modelValue"
        :rows="effectiveRows"
        :style="{ resize: effectiveResize }"
        v-bind="textareaAttrs"
        @input="onInput"
        @change="onChange"
        @focus="onFocus"
        @blur="onBlur"
      />
    </div>

    <div v-if="hasFooter" class="dads-textarea__footer">
      <span
        v-if="isError && errorMessage"
        :id="errorId"
        class="dads-textarea__error"
        role="alert"
        >{{ errorMessage }}</span
      >
      <span v-else-if="hint" :id="hintId" class="dads-textarea__hint">{{ hint }}</span>
      <span v-if="counter !== undefined" :id="counterId" class="dads-textarea__counter"
        >{{ currentLength }} / {{ counter }}</span
      >
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '../../styles/base' as base;
@use '../../styles/focus-ring' as ring;

.dads-textarea {
  display: flex;
  flex-direction: column;
  gap: calc(4 / 16 * 1rem);
  font-family: var(--font-family-sans, 'Noto Sans JP', sans-serif);
  color: var(--color-neutral-solid-gray-800, #1a1a1a);
  letter-spacing: 0.02em;

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
  // The focus ring lives on the wrapper so the highlight envelopes the entire
  // textarea regardless of its current resize handle position.
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

  // -------------------- textarea element ---------------------------------
  &__input {
    @include base.dads-reset-input;
    flex: 1;
    width: 100%;
    line-height: var(--line-height-170, 1.7);

    // The wrapper provides the focus ring via :focus-within. Suppress the
    // textarea's own :focus-visible outline so the global `:focus-visible` rule
    // in styles/_focus.scss doesn't draw a second blue ring inside the
    // wrapper. !important is required to win against the global !important.
    &:focus-visible {
      outline: none !important;
    }
  }

  // -------------------- footer (hint / error / counter) ------------------
  &__footer {
    display: flex;
    justify-content: space-between;
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

  &__counter {
    color: var(--color-neutral-solid-gray-700, #4d4d4d);
    margin-left: auto;
    font-variant-numeric: tabular-nums;
  }

  // -------------------- size ---------------------------------------------
  &--lg &__input {
    font-size: var(--font-size-18, 1.125rem);
    padding: calc(12 / 16 * 1rem) calc(16 / 16 * 1rem);
  }

  &--md &__input {
    font-size: var(--font-size-16, 1rem);
    padding: calc(16 / 16 * 1rem);
  }

  &--sm &__input {
    font-size: var(--font-size-14, 0.875rem);
    padding: calc(8 / 16 * 1rem) calc(12 / 16 * 1rem);
  }

  // -------------------- hover (interactive) ------------------------------
  &:not(.dads-textarea--readonly):not(.dads-textarea--disabled):not(.dads-textarea--error)
    .dads-textarea__control:hover {
    border-color: var(--color-neutral-solid-gray-800, #1a1a1a);
  }

  // -------------------- readonly -----------------------------------------
  &--readonly &__control {
    border-style: dashed;
    background-color: var(--color-neutral-solid-gray-50, rgba(0, 0, 0, 0.05));
  }

  // -------------------- disabled -----------------------------------------
  &--disabled {
    pointer-events: none;

    .dads-textarea__control {
      border-color: var(--color-neutral-solid-gray-300, #b3b3b3);
      background-color: var(--color-neutral-solid-gray-50, #f2f2f2);
    }

    .dads-textarea__input {
      color: var(--color-neutral-solid-gray-420, #949494);
      resize: none;
    }
  }

  // -------------------- error --------------------------------------------
  &--error &__control {
    border-color: var(--color-semantic-error-1, #ec0000);
  }

  // error + hover: deepen the border to match the official red-1000 treatment.
  &--error:not(.dads-textarea--readonly):not(.dads-textarea--disabled)
    .dads-textarea__control:hover {
    border-color: var(--color-primitive-red-1000, #a90000);
  }

  // -------------------- forced colors ------------------------------------
  @include base.dads-forced-colors {
    &__control {
      border: 1px solid CanvasText;
    }

    &--disabled .dads-textarea__control {
      border-color: GrayText;
    }

    &--disabled .dads-textarea__input {
      color: GrayText;
    }
  }
}
</style>
