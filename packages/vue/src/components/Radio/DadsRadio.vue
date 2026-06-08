<script setup lang="ts">
import { computed, useId } from 'vue'
import type { DadsRadioEmits, DadsRadioProps } from './DadsRadio.types'

const props = withDefaults(defineProps<DadsRadioProps>(), {
  size: 'md',
  disabled: false,
  error: false,
})

const emit = defineEmits<DadsRadioEmits>()

// Generated once per instance so the label `for` stays stable across renders.
const generatedId = useId()
const radioId = computed(() => props.id ?? `dads-radio-${generatedId}`)

const isChecked = computed(() => props.modelValue === props.value)

const onChange = (event: Event) => {
  emit('update:modelValue', props.value)
  emit('change', event)
}

const onFocus = (event: FocusEvent) => emit('focus', event)
const onBlur = (event: FocusEvent) => emit('blur', event)
</script>

<template>
  <label class="dads-radio" :data-size="size">
    <!--
      Canonical DADS structure (radio.css / all-radios.html):
        <label.dads-radio> > <span.dads-radio__radio> > <input.dads-radio__input>
                                                       + <span.dads-radio__label>
      The visible control IS the <input> styled via appearance:none — there is no
      hidden input + pseudo indicator. The `__radio` wrapper only centers the input
      and renders the hover background ring. Label / required / support / error are
      delegated to DadsFormControlLabel (DadsRadioGroup), matching official.
    -->
    <span class="dads-radio__radio">
      <input
        :id="radioId"
        type="radio"
        class="dads-radio__input"
        :name="name"
        :value="value"
        :checked="isChecked"
        :disabled="disabled || undefined"
        :aria-invalid="error || undefined"
        :aria-describedby="ariaDescribedby"
        @change="onChange"
        @focus="onFocus"
        @blur="onBlur"
      />
    </span>
    <span v-if="label" class="dads-radio__label">{{ label }}</span>
  </label>
</template>

<style scoped lang="scss">
@use '../../styles/base' as base;

// Faithful port of the official radio.css. The input itself is the visible
// control (appearance:none); the `__radio` wrapper centers it and draws the
// hover background ring.
.dads-radio {
  display: flex;
  align-items: start;
  gap: var(--_gap);
  width: fit-content;
  cursor: pointer;

  // Click target padding only when there is a visible label (radio.css:8-11).
  &:has(.dads-radio__label:not(:empty)) {
    padding-top: calc(8 / 16 * 1rem);
    padding-bottom: calc(8 / 16 * 1rem);
  }

  &[data-size='sm'] {
    --_gap: calc(4 / 16 * 1rem);
    --_radio-size: calc(24 / 16 * 1rem);
    --_radio-outer-size: calc(20 / 16 * 1rem);
    --_radio-inner-size: calc(10 / 16 * 1rem);
    --_radio-border-width: calc(2 / 16 * 1rem);
    --_label-padding-top: 1px;
    --_label-font-size: calc(16 / 16 * 1rem);
  }

  &[data-size='md'] {
    --_gap: calc(8 / 16 * 1rem);
    --_radio-size: calc(32 / 16 * 1rem);
    --_radio-outer-size: calc(26 / 16 * 1rem);
    --_radio-inner-size: calc(12 / 16 * 1rem);
    --_radio-border-width: calc(2 / 16 * 1rem);
    --_label-padding-top: calc(4 / 16 * 1rem);
    --_label-font-size: calc(16 / 16 * 1rem);
  }

  &[data-size='lg'] {
    --_gap: calc(12 / 16 * 1rem);
    --_radio-size: calc(44 / 16 * 1rem);
    --_radio-outer-size: calc(36 / 16 * 1rem);
    --_radio-inner-size: calc(16 / 16 * 1rem);
    --_radio-border-width: calc(3 / 16 * 1rem);
    --_label-padding-top: calc(10 / 16 * 1rem);
    --_label-font-size: calc(17 / 16 * 1rem);
  }

  // -------------------- centering wrapper -------------------------------
  &__radio {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    width: var(--_radio-size);
    height: var(--_radio-size);
    border-radius: 50%;
  }

  @media (hover: hover) {
    &__radio:has(:not(:focus, :disabled, [aria-disabled='true']):hover) {
      background-color: var(--color-neutral-solid-gray-420, #949494);
    }
  }

  // -------------------- visible control (the input itself) -------------
  &__input {
    --_base-color: var(--color-neutral-white, #fff);
    --_accent-color: var(--color-primitive-blue-900, #0017c1);
    --_accent-hover-color: var(--color-primitive-blue-1100, #00118f);
    --_border-color: var(--color-neutral-solid-gray-600, #666);
    --_border-hover-color: var(--color-neutral-black, #000);

    position: relative;
    margin: 0;
    appearance: none;
    width: var(--_radio-outer-size);
    height: var(--_radio-outer-size);
    border-radius: 51%;
    background-color: var(--_base-color);
    border: var(--_radio-border-width) solid var(--_border-color);
    cursor: inherit;
  }

  &__input:focus {
    outline: calc(4 / 16 * 1rem) solid var(--color-neutral-black, #000);
    outline-offset: calc(2 / 16 * 1rem);
    box-shadow: 0 0 0 calc(2 / 16 * 1rem) var(--color-primitive-yellow-300, #ffd43d);
  }

  @media (hover: hover) {
    &__input:not(:disabled, [aria-disabled='true']):hover {
      border-color: var(--_border-hover-color);
    }
  }

  &__input:checked {
    border-color: var(--_accent-color);
  }

  @media (hover: hover) {
    &__input:checked:not(:disabled, [aria-disabled='true']):hover {
      border-color: var(--_accent-hover-color);
    }
  }

  &__input:checked::before {
    position: absolute;
    inset: 0;
    margin: auto;
    width: var(--_radio-inner-size);
    height: var(--_radio-inner-size);
    border-radius: 51%;
    background-color: var(--_accent-color);
    content: '';
  }

  @media (hover: hover) {
    &__input:checked:not(:disabled, [aria-disabled='true']):hover::before {
      background-color: var(--_accent-hover-color);
    }
  }

  &__input[aria-invalid='true'] {
    --_accent-color: var(--color-semantic-error-1, #ec0000);
    --_accent-hover-color: var(--color-primitive-red-1000, #c00);
    --_border-color: var(--color-semantic-error-1, #ec0000);
    --_border-hover-color: var(--color-primitive-red-1000, #c00);
  }

  &__input:is(:disabled, [aria-disabled='true']) {
    --_base-color: var(--color-neutral-solid-gray-50, #f2f2f2);
    --_accent-color: var(--color-neutral-solid-gray-300, #b3b3b3);
    --_accent-hover-color: var(--color-neutral-solid-gray-300, #b3b3b3);
    --_border-color: var(--color-neutral-solid-gray-300, #b3b3b3);
    --_border-hover-color: var(--color-neutral-solid-gray-300, #b3b3b3);

    cursor: not-allowed;
  }

  @include base.dads-forced-colors {
    &__input,
    &__input[aria-invalid='true'] {
      --_accent-color: Highlight;
      --_accent-hover-color: Highlight;
      --_border-color: ButtonText;
      --_border-hover-color: ButtonText;
    }

    &__input:is(:disabled, [aria-disabled='true']) {
      --_accent-color: GrayText;
      --_accent-hover-color: GrayText;
      --_border-color: GrayText;
      --_border-hover-color: GrayText;
    }
  }

  // -------------------- label ------------------------------------------
  &__label {
    padding-top: var(--_label-padding-top);
    color: var(--color-neutral-solid-gray-800, #1a1a1a);
    font-weight: normal;
    font-size: var(--_label-font-size);
    line-height: 1.3;
    font-family: var(--font-family-sans, 'Noto Sans JP', sans-serif);
    letter-spacing: 0;
  }
}
</style>
