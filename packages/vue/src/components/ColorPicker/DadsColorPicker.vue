<script setup lang="ts">
import { computed, useId } from 'vue'
import {
  DADS_DEFAULT_SWATCHES,
  type DadsColorPickerEmits,
  type DadsColorPickerProps,
} from './DadsColorPicker.types'

const props = withDefaults(defineProps<DadsColorPickerProps>(), {
  swatches: () => [...DADS_DEFAULT_SWATCHES],
  disabled: false,
  defaultAriaLabel: '色を選択',
  hexInputAriaLabel: 'HEXカラーコード',
  formatSwatchAriaLabel: (swatch: string) => `${swatch} を選択`,
})

const emit = defineEmits<DadsColorPickerEmits>()

// useId() returns a stable string per component instance, so the derived
// ids don't need to be reactive.
const generatedId = useId()
const inputId = `dads-color-picker-${generatedId}`
const hexId = `${inputId}-hex`

// Browser-native <input type="color"> requires lowercase hex with no alpha, so
// we normalize on read and emit normalized values back.
const normalize = (value: string): string => {
  if (!value) return '#000000'
  const trimmed = value.trim().toLowerCase()
  return trimmed.startsWith('#') ? trimmed : `#${trimmed}`
}

const colorInputValue = computed(() => normalize(props.modelValue))

const isValidHex = (value: string): boolean => /^#[0-9a-f]{6}$/i.test(value.trim())

const onColorInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', normalize(target.value))
}

const onHexInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  // Only emit when the value is a complete #RRGGBB triplet so the parent
  // does not see partially-typed garbage. The input field still shows the
  // raw value so the user can finish typing.
  if (isValidHex(target.value)) {
    emit('update:modelValue', normalize(target.value))
  }
}

const onSwatchClick = (color: string) => {
  if (props.disabled) return
  emit('update:modelValue', normalize(color))
}
</script>

<template>
  <div class="dads-color-picker" :class="{ 'dads-color-picker--disabled': disabled }">
    <div class="dads-color-picker__main">
      <label :for="inputId" class="dads-color-picker__swatch-label">
        <input
          :id="inputId"
          class="dads-color-picker__color-input"
          type="color"
          :value="colorInputValue"
          :disabled="disabled"
          :aria-label="label ?? defaultAriaLabel"
          @input="onColorInput"
        />
        <span
          class="dads-color-picker__swatch-preview"
          :style="{ backgroundColor: colorInputValue }"
          aria-hidden="true"
        />
      </label>
      <input
        :id="hexId"
        class="dads-color-picker__hex-input"
        type="text"
        :value="modelValue"
        :disabled="disabled"
        maxlength="7"
        spellcheck="false"
        autocomplete="off"
        :aria-label="hexInputAriaLabel"
        @input="onHexInput"
      />
    </div>

    <ul class="dads-color-picker__swatches" role="list">
      <li v-for="swatch in swatches" :key="swatch">
        <button
          type="button"
          class="dads-color-picker__swatch"
          :style="{ backgroundColor: swatch }"
          :disabled="disabled"
          :aria-label="formatSwatchAriaLabel(swatch)"
          :aria-pressed="normalize(swatch) === colorInputValue"
          @click="onSwatchClick(swatch)"
        />
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
@use '../../styles/base' as base;
@use '../../styles/focus-ring' as ring;

.dads-color-picker {
  display: flex;
  flex-direction: column;
  gap: calc(12 / 16 * 1rem);
  font-family: var(--font-family-sans, 'Noto Sans JP', sans-serif);
  color: var(--color-neutral-solid-gray-800, #1a1a1a);

  // -------------------- main row (preview + hex input) -------------------
  &__main {
    display: flex;
    align-items: center;
    gap: calc(12 / 16 * 1rem);
  }

  // The native color input opens the OS color picker but is visually noisy
  // across browsers. We hide it and surface a clean preview tile that owns
  // the focus ring instead.
  &__swatch-label {
    position: relative;
    display: inline-flex;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: var(--border-radius-4, 0.25rem);
    border: 1px solid var(--color-border-default, rgba(0, 0, 0, 0.2));
    overflow: hidden;
    cursor: pointer;
    @include ring.dads-focus-ring-within;
  }

  &__color-input {
    position: absolute;
    inset: 0;
    opacity: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
    border: 0;
    padding: 0;

    // The swatch label provides the focus ring via :focus-within. Suppress
    // the native input's own :focus-visible outline so the global
    // `:focus-visible` rule in styles/_focus.scss doesn't paint a second
    // blue ring on top of the hidden input. !important is required to win
    // against the global !important.
    &:focus-visible {
      outline: none !important;
    }
  }

  &__swatch-preview {
    flex: 1;
    background-clip: padding-box;
  }

  &__hex-input {
    @include base.dads-reset-input;
    @include ring.dads-focus-ring;

    flex: 1;
    min-height: 2.5rem;
    padding: 0 calc(12 / 16 * 1rem);
    border: 1px solid var(--color-border-default, rgba(0, 0, 0, 0.2));
    border-radius: var(--border-radius-4, 0.25rem);
    background-color: var(--color-neutral-white, #fff);
    font-family: var(--font-family-mono, 'SFMono-Regular', monospace);
    font-size: var(--font-size-16, 1rem);
    text-transform: uppercase;
  }

  // -------------------- swatch grid --------------------------------------
  &__swatches {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: calc(8 / 16 * 1rem);
    list-style: none;
    margin: 0;
    padding: 0;
  }

  &__swatch {
    @include base.dads-reset-button;
    @include ring.dads-focus-ring;

    width: 100%;
    aspect-ratio: 1 / 1;
    border-radius: var(--border-radius-4, 0.25rem);
    border: 1px solid var(--color-border-default, rgba(0, 0, 0, 0.2));
    transition: transform 0.1s ease;

    &:hover:not(:disabled) {
      transform: scale(1.05);
    }

    &[aria-pressed='true'] {
      // Inner ring distinguishes the selected swatch on top of the hex
      // background, which can be any color including pure white.
      box-shadow:
        inset 0 0 0 2px var(--color-neutral-white, #fff),
        inset 0 0 0 4px var(--color-neutral-solid-gray-800, #1a1a1a);
    }
  }

  // -------------------- disabled -----------------------------------------
  &--disabled {
    opacity: 0.5;
    pointer-events: none;
  }

  // -------------------- forced colors ------------------------------------
  @include base.dads-forced-colors {
    &__swatch,
    &__swatch-label,
    &__hex-input {
      border: 1px solid CanvasText;
    }
  }
}
</style>
