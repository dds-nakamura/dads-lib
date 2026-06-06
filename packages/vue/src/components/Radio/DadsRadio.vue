<script setup lang="ts">
import { computed, useId } from 'vue'
import type { DadsRadioEmits, DadsRadioProps } from './DadsRadio.types'

const props = withDefaults(defineProps<DadsRadioProps>(), {
  size: 'md',
  disabled: false,
  required: false,
  error: false,
  requiredLabel: '必須',
})

const emit = defineEmits<DadsRadioEmits>()

// Generated once per instance so the label `for` and `aria-describedby` ids
// stay stable across renders. Calling useId() inside a computed would re-run
// on every dependency change.
const generatedId = useId()
const radioId = computed(() => props.id ?? `dads-radio-${generatedId}`)
const hintId = computed(() => `${radioId.value}-hint`)
const errorId = computed(() => `${radioId.value}-error`)
const descriptionId = computed(() => `${radioId.value}-description`)

const isError = computed(() => props.error || !!props.errorMessage)

const isChecked = computed(() => props.modelValue === props.value)

const describedBy = computed(() => {
  // Compose every available descriptor so screen readers announce the option's
  // own description plus the surrounding hint / error in source order.
  const ids: string[] = []
  if (props.description) ids.push(descriptionId.value)
  if (isError.value && props.errorMessage) ids.push(errorId.value)
  else if (props.hint) ids.push(hintId.value)
  return ids.length > 0 ? ids.join(' ') : undefined
})

const rootClasses = computed(() => [
  'dads-radio',
  `dads-radio--${props.size}`,
  {
    'dads-radio--checked': isChecked.value,
    'dads-radio--disabled': props.disabled,
    'dads-radio--error': isError.value,
  },
])

const inputAttrs = computed(() => ({
  disabled: props.disabled || undefined,
  'aria-invalid': isError.value || undefined,
  'aria-required': props.required || undefined,
  'aria-describedby': describedBy.value,
}))

const hasFooter = computed(() => (isError.value && !!props.errorMessage) || !!props.hint)

const onChange = (event: Event) => {
  emit('update:modelValue', props.value)
  emit('change', event)
}

const onFocus = (event: FocusEvent) => emit('focus', event)
const onBlur = (event: FocusEvent) => emit('blur', event)
</script>

<template>
  <div :class="rootClasses">
    <label class="dads-radio__label" :for="radioId">
      <input
        :id="radioId"
        type="radio"
        class="dads-radio__input"
        :name="name"
        :value="value"
        :checked="isChecked"
        v-bind="inputAttrs"
        @change="onChange"
        @focus="onFocus"
        @blur="onBlur"
      />
      <span class="dads-radio__indicator" aria-hidden="true" />
      <span v-if="label || required || description" class="dads-radio__text">
        <span class="dads-radio__title">
          <template v-if="label">{{ label }}</template>
          <span v-if="required" class="dads-radio__required" aria-hidden="true">{{
            requiredLabel
          }}</span>
        </span>
        <span v-if="description" :id="descriptionId" class="dads-radio__description">{{
          description
        }}</span>
      </span>
    </label>

    <div v-if="hasFooter" class="dads-radio__footer">
      <span v-if="isError && errorMessage" :id="errorId" class="dads-radio__error" role="alert">{{
        errorMessage
      }}</span>
      <span v-else-if="hint" :id="hintId" class="dads-radio__hint">{{ hint }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '../../styles/base' as base;
@use '../../styles/focus-ring' as ring;

.dads-radio {
  display: inline-flex;
  flex-direction: column;
  gap: calc(4 / 16 * 1rem);
  font-family: var(--font-family-sans, 'Noto Sans JP', sans-serif);
  color: var(--color-neutral-solid-gray-800, #1a1a1a);

  // -------------------- label wrapper ------------------------------------
  // `position: relative` anchors the absolutely-positioned input so its focus
  // ring lands on top of the visible indicator.
  &__label {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: calc(8 / 16 * 1rem);
    cursor: pointer;
    line-height: var(--line-height-150, 1.5);
  }

  // -------------------- input element ------------------------------------
  // Visually hidden but kept hit-testable so the native focus ring (a11y)
  // sits over the visible __indicator below.
  &__input {
    @include base.dads-reset-input;
    position: absolute;
    width: var(--dads-radio-size, 1.25rem);
    height: var(--dads-radio-size, 1.25rem);
    margin: 0;
    opacity: 0;
    cursor: inherit;

    @include ring.dads-focus-ring;
  }

  &__indicator {
    position: relative;
    display: inline-block;
    width: var(--dads-radio-size, 1.25rem);
    height: var(--dads-radio-size, 1.25rem);
    flex-shrink: 0;
    background-color: var(--color-neutral-white, #fff);
    border: 2px solid var(--color-border-default, rgba(0, 0, 0, 0.5));
    border-radius: 50%;
    transition:
      border-color 0.15s ease,
      background-color 0.15s ease;

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      margin: auto;
      width: 0;
      height: 0;
      border-radius: 50%;
      background-color: var(--color-primitive-blue-900, #0017c1);
      transition:
        width 0.15s ease,
        height 0.15s ease;
    }
  }

  // -------------------- text -------------------------------------------
  // The label / required marker share a row; an optional description sits on
  // the line below. Flex column so they stack neatly.
  &__text {
    display: inline-flex;
    flex-direction: column;
    gap: calc(4 / 16 * 1rem);
  }

  &__title {
    display: inline-flex;
    align-items: center;
    gap: calc(8 / 16 * 1rem);
  }

  &__description {
    color: var(--color-neutral-solid-gray-700, #4d4d4d);
    font-size: var(--font-size-14, 0.875rem);
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

  // -------------------- footer (hint / error) ---------------------------
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

  // -------------------- size --------------------------------------------
  &--lg {
    --dads-radio-size: 1.5rem;
    font-size: var(--font-size-18, 1.125rem);
  }
  &--md {
    --dads-radio-size: 1.25rem;
    font-size: var(--font-size-16, 1rem);
  }
  &--sm {
    --dads-radio-size: 1rem;
    font-size: var(--font-size-14, 0.875rem);
  }

  // -------------------- checked ----------------------------------------
  &--checked &__indicator {
    border-color: var(--color-primitive-blue-900, #0017c1);

    &::after {
      width: 50%;
      height: 50%;
    }
  }

  // -------------------- hover (interactive) ----------------------------
  &:not(.dads-radio--disabled):not(.dads-radio--error) &__label:hover &__indicator {
    border-color: var(--color-neutral-solid-gray-800, #1a1a1a);
  }

  // -------------------- disabled ---------------------------------------
  &--disabled {
    pointer-events: none;
    opacity: 0.5;
  }

  // -------------------- error ------------------------------------------
  &--error &__indicator {
    border-color: var(--color-semantic-error-1, #ec0000);
  }
  &--error.dads-radio--checked &__indicator::after {
    background-color: var(--color-semantic-error-1, #ec0000);
  }

  // -------------------- forced colors ----------------------------------
  @include base.dads-forced-colors {
    &__indicator {
      border: 2px solid CanvasText;
      background-color: Canvas;

      &::after {
        background-color: CanvasText;
      }
    }
  }
}
</style>
