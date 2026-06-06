<script setup lang="ts">
import { computed, useSlots } from 'vue'
import type { DadsFormControlLabelProps } from './DadsFormControlLabel.types'

const props = withDefaults(defineProps<DadsFormControlLabelProps>(), {
  as: 'div',
  size: 'md',
  required: false,
  requiredLabel: '※必須',
  disabled: false,
})

const slots = useSlots()

// `<legend>` for grouped fieldsets, `<label>` for single controls.
const labelTag = computed(() => (props.as === 'fieldset' ? 'legend' : 'label'))
// `for` is only meaningful on a real <label> (single control).
const labelForAttr = computed(() => (props.as === 'div' ? props.labelFor : undefined))

const hasLabel = computed(() => !!props.label || !!slots.label)
const hasSupportText = computed(() => !!props.supportText || !!slots['support-text'])
const hasErrorText = computed(() => !!props.errorText || !!slots.error)
const hasStatus = computed(() => !!props.status || !!slots.status)
</script>

<template>
  <component
    :is="as"
    class="dads-form-control-label"
    :data-size="size"
    :data-disabled="disabled || undefined"
  >
    <component
      :is="labelTag"
      v-if="hasLabel"
      class="dads-form-control-label__label"
      :for="labelForAttr"
    >
      <slot name="label">{{ label }}</slot>
      <span
        v-if="required"
        class="dads-form-control-label__requirement"
        data-required="true"
        >{{ requiredLabel }}</span
      >
      <span v-else-if="optionalLabel" class="dads-form-control-label__requirement">{{
        optionalLabel
      }}</span>
      <span v-if="hasStatus" class="dads-form-control-label__status">
        <slot name="status">{{ status }}</slot>
      </span>
    </component>

    <p
      v-if="hasSupportText"
      :id="supportTextId"
      class="dads-form-control-label__support-text"
    >
      <slot name="support-text">{{ supportText }}</slot>
    </p>

    <div class="dads-form-control-label__control">
      <slot />
    </div>

    <p v-if="hasErrorText" :id="errorTextId" class="dads-form-control-label__error-text">
      <slot name="error">{{ errorText }}</slot>
    </p>
  </component>
</template>

<style scoped lang="scss">
@use '../../styles/base' as base;

// Faithful port of the official form-control-label.css.
.dads-form-control-label {
  margin: 0;
  display: flex;
  flex-direction: column;
  border: 0;
  padding: 0;
  min-inline-size: 0; // fieldset defaults to min-content
  color: var(--color-neutral-solid-gray-800, #333);
  font-weight: normal;
  font-size: calc(16 / 16 * 1rem);
  line-height: 1.7;
  font-family: var(--font-family-sans, 'Noto Sans JP', sans-serif);
  letter-spacing: 0.02em;

  &[data-size='sm'] {
    gap: calc(4 / 16 * 1rem);
  }
  &[data-size='md'],
  &[data-size='lg'] {
    gap: calc(8 / 16 * 1rem);
  }

  &__label {
    align-self: start;
    padding: 0;
    font-weight: bold;
  }
  &[data-size='sm'] &__label {
    font-size: calc(16 / 16 * 1rem);
  }
  &[data-size='md'] &__label {
    font-size: calc(17 / 16 * 1rem);
  }
  &[data-size='lg'] &__label {
    font-size: calc(18 / 16 * 1rem);
  }

  // <legend> variant tweaks.
  &__label:where(legend) {
    margin-bottom: calc(8 / 16 * 1rem);
    float: none;
  }

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

  &__status {
    margin-left: calc(4 / 16 * 1rem);
    display: inline-block;
    outline: 1px solid transparent;
    border-radius: calc(8 / 16 * 1rem);
    background-color: var(--color-neutral-solid-gray-536, #767676);
    padding: calc(8 / 16 * 1rem);
    color: var(--color-neutral-white, #fff);
    font-weight: normal;
    font-size: calc(16 / 16 * 1rem);
    line-height: 1;
    letter-spacing: 0.02em;
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

  // The control wrapper is structural only (no official styling).
  &__control {
    display: contents;
  }

  // Dim the label to match disabled controls (official relies on the control's
  // own disabled state; this is a small a11y nicety carried over from A-2).
  &[data-disabled] &__label {
    color: var(--color-neutral-solid-gray-420, #949494);
  }

  @include base.dads-forced-colors {
    &[data-disabled] &__label {
      color: GrayText;
    }
  }
}
</style>
