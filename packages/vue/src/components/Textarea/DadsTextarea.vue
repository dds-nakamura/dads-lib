<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, useId, watch } from 'vue'
import DadsFormControlLabel from '../FormControlLabel/DadsFormControlLabel.vue'
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
  requiredLabel: '※必須',
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

// The official form-control-label only renders error-text *or* support-text via
// its own slots, so we mirror that precedence: show the support text only when
// no error message is present.
const showSupportText = computed(() => !!props.hint && !(isError.value && !!props.errorMessage))
const showErrorText = computed(() => isError.value && !!props.errorMessage)

const describedBy = computed(() => {
  const ids: string[] = []
  if (showErrorText.value) ids.push(errorId.value)
  else if (showSupportText.value) ids.push(hintId.value)
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
  <DadsFormControlLabel
    as="div"
    :class="rootClasses"
    :size="size"
    :label="label"
    :label-for="textareaId"
    :required="required"
    :required-label="requiredLabel"
    :support-text="showSupportText ? hint : undefined"
    :support-text-id="hintId"
    :error-text="showErrorText ? errorMessage : undefined"
    :error-text-id="errorId"
    :disabled="disabled"
  >
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

    <p v-if="counter !== undefined" :id="counterId" class="dads-textarea__counter">
      {{ currentLength }} / {{ counter }}
    </p>
  </DadsFormControlLabel>
</template>

<style scoped lang="scss">
@use '../../styles/base' as base;
@use '../../styles/focus-ring' as ring;

.dads-textarea {
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

  // -------------------- counter (non-official, preserved) ----------------
  &__counter {
    margin: 0;
    margin-left: auto;
    color: var(--color-neutral-solid-gray-700, #4d4d4d);
    font-size: var(--font-size-14, 0.875rem);
    line-height: var(--line-height-150, 1.5);
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
