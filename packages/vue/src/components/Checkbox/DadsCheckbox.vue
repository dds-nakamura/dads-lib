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
  requiredLabel: '※必須',
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
        <span
          v-if="required"
          class="dads-checkbox__requirement"
          data-required="true"
          aria-hidden="true"
          >{{ requiredLabel }}</span
        >
      </span>
    </label>

    <div v-if="hasFooter" class="dads-checkbox__footer">
      <p v-if="isError && errorMessage" :id="errorId" class="dads-checkbox__error-text">
        {{ errorMessage }}
      </p>
      <p v-else-if="hint" :id="hintId" class="dads-checkbox__support-text">{{ hint }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '../../styles/base' as base;
@use '../../styles/focus-ring' as focus-ring;

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
    line-height: 1.3;
    letter-spacing: 0;
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
    @include focus-ring.dads-focus-ring-style;
  }

  // -------------------- indicator (visible box) --------------------------
  &__indicator {
    position: relative;
    display: inline-flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    background-color: var(--color-neutral-white, #fff);
    border: 1px solid var(--color-neutral-solid-gray-600, #767676);
    border-radius: 12.5%;
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

  // Official requirement marker (matches DadsFormControlLabel __requirement):
  // inline, normal weight, 16px, error-1 color, leading half-width space.
  &__requirement {
    margin-left: calc(4 / 16 * 1rem);
    font-weight: normal;
    font-size: calc(16 / 16 * 1rem);

    &::before {
      content: ' ';
    }

    &[data-required='true'] {
      color: var(--color-semantic-error-1, #ec0000);
    }
  }

  // -------------------- footer (support-text / error-text) ---------------
  // Match the official form-control-label support/error typography & color.
  &__footer {
    font-size: calc(16 / 16 * 1rem);
  }

  &__support-text {
    margin-top: 0;
    margin-bottom: 0;
    color: var(--color-neutral-solid-gray-600, #666);
  }

  &__error-text {
    margin-top: 0;
    margin-bottom: 0;
    color: var(--color-semantic-error-1, #ec0000);
    line-height: 1.3;
    letter-spacing: 0;
  }

  // -------------------- size ---------------------------------------------
  // Box sizes / border widths / label font sizes follow the official spec
  // (checkbox.css: 24/32/44px box, 2/2/3px border, 16/16/17px label).
  &--lg &__indicator {
    width: calc(44 / 16 * 1rem); // 44px
    height: calc(44 / 16 * 1rem);
    border-width: calc(3 / 16 * 1rem);
  }
  &--lg &__label {
    font-size: calc(17 / 16 * 1rem);
  }

  &--md &__indicator {
    width: calc(32 / 16 * 1rem); // 32px
    height: calc(32 / 16 * 1rem);
    border-width: calc(2 / 16 * 1rem);
  }
  &--md &__label {
    font-size: var(--font-size-16, 1rem);
  }

  &--sm &__indicator {
    width: calc(24 / 16 * 1rem); // 24px
    height: calc(24 / 16 * 1rem);
    border-width: calc(2 / 16 * 1rem);
  }
  &--sm &__label {
    font-size: var(--font-size-16, 1rem);
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
  // Official disabled config (checkbox.css:132-138): base gray-50,
  // accent/border gray-300, label text gray-420 — not a blanket opacity dim.
  &--disabled {
    pointer-events: none;
  }
  &--disabled &__label {
    cursor: default;
    color: var(--color-neutral-solid-gray-420, #949494);
  }
  &--disabled &__indicator {
    background-color: var(--color-neutral-solid-gray-50, #f2f2f2);
    border-color: var(--color-neutral-solid-gray-300, #d6d6d6);
  }
  &--disabled.dads-checkbox--checked &__indicator,
  &--disabled.dads-checkbox--indeterminate &__indicator {
    background-color: var(--color-neutral-solid-gray-300, #d6d6d6);
    border-color: var(--color-neutral-solid-gray-300, #d6d6d6);
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
