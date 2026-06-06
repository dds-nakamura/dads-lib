<script setup lang="ts">
import { computed, onMounted, ref, useAttrs, useId, watch } from 'vue'
import type { DadsCheckboxEmits, DadsCheckboxProps } from './DadsCheckbox.types'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<DadsCheckboxProps>(), {
  modelValue: false,
  indeterminate: false,
  size: 'md',
  disabled: false,
  readonly: false,
  required: false,
  error: false,
  requiredLabel: '必須',
})

const emit = defineEmits<DadsCheckboxEmits>()

// Forward fallthrough ARIA / data-* attributes to the native <input> so that
// e.g. `aria-label` on the component lands on the focusable element rather
// than the wrapper <div>. Keep `class` / `style` on the wrapper so consumer
// styling continues to work as expected.
const attrs = useAttrs()
const inputForwardedAttrs = computed(() => {
  const result: Record<string, unknown> = {}
  for (const key of Object.keys(attrs)) {
    if (key === 'class' || key === 'style' || key === 'id' || key.startsWith('on')) {
      continue
    }
    result[key] = attrs[key]
  }
  return result
})
const wrapperForwardedAttrs = computed(() => {
  const result: Record<string, unknown> = {}
  if (attrs.class !== undefined) result.class = attrs.class
  if (attrs.style !== undefined) result.style = attrs.style
  return result
})

const inputRef = ref<HTMLInputElement | null>(null)

// Generated once per instance so the label `for` and `aria-describedby` ids
// stay stable across renders. Calling useId() inside a computed would re-run
// on every dependency change.
const generatedId = useId()
const checkboxId = computed(() => props.id ?? `dads-checkbox-${generatedId}`)
const hintId = computed(() => `${checkboxId.value}-hint`)
const errorId = computed(() => `${checkboxId.value}-error`)

const isError = computed(() => props.error || !!props.errorMessage)

const describedBy = computed(() => {
  if (isError.value && props.errorMessage) return errorId.value
  if (props.hint) return hintId.value
  return undefined
})

const rootClasses = computed(() => [
  'dads-checkbox',
  `dads-checkbox--${props.size}`,
  {
    'dads-checkbox--checked': props.modelValue && !props.indeterminate,
    'dads-checkbox--indeterminate': props.indeterminate,
    'dads-checkbox--disabled': props.disabled,
    'dads-checkbox--readonly': props.readonly,
    'dads-checkbox--error': isError.value,
  },
])

const inputAttrs = computed(() => ({
  name: props.name,
  disabled: props.disabled || undefined,
  // `aria-checked="mixed"` overrides the native checked state announcement so
  // screen readers report the third "indeterminate" state correctly.
  'aria-checked': props.indeterminate ? ('mixed' as const) : undefined,
  'aria-invalid': isError.value || undefined,
  'aria-required': props.required || undefined,
  'aria-describedby': describedBy.value,
}))

const hasFooter = computed(() => (isError.value && !!props.errorMessage) || !!props.hint)

// HTML `indeterminate` is a DOM property, not an attribute — Vue template
// binding only updates attributes, so apply it imperatively on mount and
// whenever the prop changes.
const syncIndeterminate = () => {
  if (inputRef.value) {
    inputRef.value.indeterminate = props.indeterminate
  }
}

onMounted(syncIndeterminate)
watch(() => props.indeterminate, syncIndeterminate)

const onChange = (event: Event) => {
  // Native <input type="checkbox"> has no readonly concept, so we suppress the
  // model update ourselves while leaving the input focusable for keyboard
  // users. Reset the DOM checked state so it stays in sync with modelValue.
  if (props.readonly) {
    if (inputRef.value) {
      inputRef.value.checked = props.modelValue
    }
    return
  }
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.checked)
  emit('change', event)
}

const onFocus = (event: FocusEvent) => emit('focus', event)
const onBlur = (event: FocusEvent) => emit('blur', event)
</script>

<template>
  <div :class="rootClasses" v-bind="wrapperForwardedAttrs">
    <label class="dads-checkbox__label" :for="checkboxId">
      <input
        :id="checkboxId"
        ref="inputRef"
        type="checkbox"
        class="dads-checkbox__input"
        :checked="modelValue"
        :value="value"
        v-bind="{ ...inputAttrs, ...inputForwardedAttrs }"
        @change="onChange"
        @focus="onFocus"
        @blur="onBlur"
      />
      <span class="dads-checkbox__indicator" aria-hidden="true" />
      <span v-if="label" class="dads-checkbox__text">
        {{ label }}
        <span v-if="required" class="dads-checkbox__required" aria-hidden="true">{{
          requiredLabel
        }}</span>
      </span>
    </label>

    <div v-if="hasFooter" class="dads-checkbox__footer">
      <span
        v-if="isError && errorMessage"
        :id="errorId"
        class="dads-checkbox__error"
        role="alert"
        >{{ errorMessage }}</span
      >
      <span v-else-if="hint" :id="hintId" class="dads-checkbox__hint">{{ hint }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '../../styles/base' as base;

.dads-checkbox {
  display: flex;
  flex-direction: column;
  gap: calc(4 / 16 * 1rem);
  font-family: var(--font-family-sans, 'Noto Sans JP', sans-serif);
  color: var(--color-neutral-solid-gray-800, #1a1a1a);

  &__label {
    display: inline-flex;
    align-items: center;
    gap: calc(8 / 16 * 1rem);
    cursor: pointer;
    line-height: var(--line-height-150, 1.5);
  }

  // The native checkbox is visually hidden (not display:none) so it stays
  // focusable and announces its state to assistive tech.
  &__input {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: 0;
    padding: 0;
    border: 0;
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    overflow: hidden;
    white-space: nowrap;
  }

  // Project the keyboard focus indication onto the visible indicator since
  // the real input is hidden.
  &__input:focus-visible + &__indicator {
    outline: 2px solid var(--color-neutral-black, #000);
    outline-offset: 0;
    box-shadow: 0 0 0 4px var(--color-primitive-yellow-300, #ffd43d);
  }

  // -------------------- indicator (visible box) --------------------------
  &__indicator {
    position: relative;
    display: inline-flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    background-color: var(--color-neutral-white, #fff);
    border: 1px solid var(--color-border-default, rgba(0, 0, 0, 0.42));
    border-radius: var(--border-radius-4, 0.25rem);
    transition:
      background-color 0.15s ease,
      border-color 0.15s ease,
      box-shadow 0.15s ease;
  }

  &__indicator::before {
    content: '';
    position: absolute;
    width: 30%;
    height: 60%;
    border-right: 2px solid var(--color-neutral-white, #fff);
    border-bottom: 2px solid var(--color-neutral-white, #fff);
    transform: rotate(45deg) translate(-10%, -10%);
    opacity: 0;
  }

  &__indicator::after {
    content: '';
    position: absolute;
    width: 60%;
    height: 2px;
    background-color: var(--color-neutral-white, #fff);
    opacity: 0;
  }

  &--checked &__indicator,
  &--indeterminate &__indicator {
    background-color: var(--color-primitive-blue-900, #0017c1);
    border-color: var(--color-primitive-blue-900, #0017c1);
  }

  &--checked &__indicator::before {
    opacity: 1;
  }

  &--indeterminate &__indicator::after {
    opacity: 1;
  }

  // -------------------- label text + required marker --------------------
  &__text {
    display: inline-flex;
    align-items: center;
    gap: calc(8 / 16 * 1rem);
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

  // -------------------- footer (hint / error) ----------------------------
  &__footer {
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
  &--lg &__indicator {
    width: 1.5rem; // 24px
    height: 1.5rem;
  }
  &--lg &__label {
    font-size: var(--font-size-18, 1.125rem);
  }

  &--md &__indicator {
    width: 1.25rem; // 20px
    height: 1.25rem;
  }
  &--md &__label {
    font-size: var(--font-size-16, 1rem);
  }

  &--sm &__indicator {
    width: 1rem; // 16px
    height: 1rem;
  }
  &--sm &__label {
    font-size: var(--font-size-14, 0.875rem);
  }

  // -------------------- hover (interactive) ------------------------------
  &:not(.dads-checkbox--readonly):not(.dads-checkbox--disabled):not(.dads-checkbox--error)
    .dads-checkbox__label:hover
    .dads-checkbox__indicator {
    border-color: var(--color-neutral-solid-gray-800, #1a1a1a);
  }

  // -------------------- readonly -----------------------------------------
  &--readonly &__label {
    cursor: default;
  }
  &--readonly &__indicator {
    border-style: dashed;
    background-color: var(--color-neutral-solid-gray-50, rgba(0, 0, 0, 0.05));
  }

  // -------------------- disabled -----------------------------------------
  &--disabled {
    pointer-events: none;
    opacity: 0.5;
  }

  // -------------------- error --------------------------------------------
  &--error &__indicator {
    border-color: var(--color-semantic-error-1, #ec0000);
  }

  // -------------------- forced colors ------------------------------------
  @include base.dads-forced-colors {
    &__indicator {
      border: 1px solid CanvasText;
    }

    &--checked &__indicator,
    &--indeterminate &__indicator {
      background-color: Highlight;
      border-color: Highlight;
    }
  }
}
</style>
