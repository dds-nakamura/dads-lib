<script setup lang="ts">
import { computed, onMounted, ref, useAttrs, useId, watch } from 'vue'
import type { DadsCheckboxEmits, DadsCheckboxProps } from './DadsCheckbox.types'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<DadsCheckboxProps>(), {
  modelValue: false,
  indeterminate: false,
  size: 'md',
  disabled: false,
  required: false,
  error: false,
  requiredLabel: '※必須',
})

const emit = defineEmits<DadsCheckboxEmits>()

// Forward fallthrough ARIA / data-* attributes to the native <input> so that
// e.g. `aria-label` on the component lands on the focusable element rather
// than the wrapper. Keep `class` / `style` on the wrapper so consumer styling
// continues to work as expected.
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

// Generated once per instance so the `aria-describedby` ids stay stable across
// renders. Calling useId() inside a computed would re-run on every dependency
// change.
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
  'dads-checkbox-field',
  {
    'dads-checkbox-field--disabled': props.disabled,
    'dads-checkbox-field--error': isError.value,
  },
])

// Mirror the official `aria-invalid` accent hook. The visible control colours
// switch to the error palette via `.dads-checkbox__input[aria-invalid="true"]`.
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
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.checked)
  emit('change', event)
}

const onFocus = (event: FocusEvent) => emit('focus', event)
const onBlur = (event: FocusEvent) => emit('blur', event)
</script>

<template>
  <div :class="rootClasses" v-bind="wrapperForwardedAttrs">
    <label class="dads-checkbox" :data-size="size">
      <span class="dads-checkbox__checkbox">
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
      </span>
      <span v-if="label" class="dads-checkbox__label">
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

    <div v-if="hasFooter" class="dads-checkbox-field__footer">
      <p v-if="isError && errorMessage" :id="errorId" class="dads-checkbox-field__error-text">
        {{ errorMessage }}
      </p>
      <p v-else-if="hint" :id="hintId" class="dads-checkbox-field__support-text">{{ hint }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '../../styles/base' as base;

// =============================================================================
// Canonical DADS checkbox — faithful port of
// design-system-example-components-html/src/components/checkbox/checkbox.css.
// The visible control IS the native <input> (appearance:none); the check mark
// is drawn via `::before` with the official `clip-path` SVG path. No hidden
// input / pseudo-control indicator.
// =============================================================================

// Field wrapper hosts the optional per-item support / error text. The official
// single checkbox has no footer of its own (that lives on form-control-label /
// fieldset), so this layer is structural only.
.dads-checkbox-field {
  display: flex;
  flex-direction: column;
  gap: calc(4 / 16 * 1rem);
  font-family: var(--font-family-sans, 'Noto Sans JP', sans-serif);

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
}

.dads-checkbox {
  display: flex;
  align-items: start;
  gap: var(--_gap);
  width: fit-content;
  cursor: pointer;
}

.dads-checkbox:has(.dads-checkbox__label:not(:empty)) {
  padding-top: calc(8 / 16 * 1rem);
  padding-bottom: calc(8 / 16 * 1rem);
}

.dads-checkbox[data-size='sm'] {
  --_gap: calc(4 / 16 * 1rem);
  --_checkbox-size: calc(24 / 16 * 1rem);
  --_checkbox-border-width: calc(2 / 16 * 1rem);
  --_checkbox-scale: 1;
  --_label-padding-top: calc(1 / 16 * 1rem);
  --_label-font-size: calc(16 / 16 * 1rem);
}

.dads-checkbox[data-size='md'] {
  --_gap: calc(8 / 16 * 1rem);
  --_checkbox-size: calc(32 / 16 * 1rem);
  --_checkbox-border-width: calc(2 / 16 * 1rem);
  --_checkbox-scale: calc(20 / 14);
  --_label-padding-top: calc(4 / 16 * 1rem);
  --_label-font-size: calc(16 / 16 * 1rem);
}

.dads-checkbox[data-size='lg'] {
  --_gap: calc(8 / 16 * 1rem);
  --_checkbox-size: calc(44 / 16 * 1rem);
  --_checkbox-border-width: calc(3 / 16 * 1rem);
  --_checkbox-scale: calc(27 / 14);
  --_label-padding-top: calc(10 / 16 * 1rem);
  --_label-font-size: calc(17 / 16 * 1rem);
}

.dads-checkbox__checkbox {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  width: var(--_checkbox-size);
  height: var(--_checkbox-size);
  border-radius: 12.5%;
}

@media (hover: hover) {
  .dads-checkbox__checkbox:has(:not(:focus, :disabled, [aria-disabled='true']):hover) {
    background-color: var(--color-neutral-solid-gray-420, #949494);
  }
}

.dads-checkbox__input {
  --_base-color: var(--color-neutral-white, #fff);
  --_accent-color: var(--color-primitive-blue-900, #0017c1);
  --_accent-hover-color: var(--color-primitive-blue-1100, #00118f);
  --_border-color: var(--color-neutral-solid-gray-600, #767676);
  --_border-hover-color: var(--color-neutral-black, #000);
  --_check-color: var(--color-neutral-white, #fff);

  margin: 0;
  appearance: none;
  width: 75%;
  height: 75%;
  border-radius: calc(2 / 18 * 100%);
  background-color: var(--_base-color);
  background-clip: padding-box;
  border: var(--_checkbox-border-width) solid var(--_border-color);
  cursor: inherit;
}

.dads-checkbox__input:focus {
  outline: calc(4 / 16 * 1rem) solid var(--color-neutral-black, #000);
  outline-offset: calc(2 / 16 * 1rem);
  box-shadow: 0 0 0 calc(2 / 16 * 1rem) var(--color-primitive-yellow-300, #ffd43d);
}

@media (hover: hover) {
  .dads-checkbox__input:not(:disabled, [aria-disabled='true']):hover {
    border-color: var(--_border-hover-color);
  }
}

.dads-checkbox__input:is(:checked, :indeterminate) {
  border-color: var(--_accent-color);
  background-color: var(--_accent-color);
}

@media (hover: hover) {
  .dads-checkbox__input:is(:checked, :indeterminate):not(:disabled, [aria-disabled='true']):hover {
    border-color: var(--_accent-hover-color);
    background-color: var(--_accent-hover-color);
  }
}

.dads-checkbox__input::before {
  display: none;
  width: calc(14 / 16 * 1rem);
  height: calc(14 / 16 * 1rem);
  background-color: var(--_check-color);
  transform-origin: left top;
  transform: scale(var(--_checkbox-scale, 1));
  content: '';
}

.dads-checkbox__input:checked::before {
  display: block;
  clip-path: path('M5.6,11.2L12.65,4.15L11.25,2.75L5.6,8.4L2.75,5.55L1.35,6.95L5.6,11.2Z');
}

.dads-checkbox__input:indeterminate::before {
  display: block;
  clip-path: path('M2,6h10v2H2Z');
}

.dads-checkbox__input[aria-invalid='true'] {
  --_accent-color: var(--color-semantic-error-1, #ec0000);
  --_accent-hover-color: var(--color-primitive-red-1000, #b00000);
  --_border-color: var(--color-semantic-error-1, #ec0000);
  --_border-hover-color: var(--color-primitive-red-1000, #b00000);
}

.dads-checkbox__input:is(:disabled, [aria-disabled='true']) {
  --_base-color: var(--color-neutral-solid-gray-50, #f2f2f2);
  --_accent-color: var(--color-neutral-solid-gray-300, #d6d6d6);
  --_accent-hover-color: var(--color-neutral-solid-gray-300, #d6d6d6);
  --_border-color: var(--color-neutral-solid-gray-300, #d6d6d6);
  --_border-hover-color: var(--color-neutral-solid-gray-300, #d6d6d6);
  cursor: not-allowed;
}

.dads-checkbox__label {
  padding-top: var(--_label-padding-top);
  color: var(--color-neutral-solid-gray-800, #1a1a1a);
  font-weight: normal;
  font-size: var(--_label-font-size);
  line-height: 1.3;
  font-family: var(--font-family-sans, 'Noto Sans JP', sans-serif);
  letter-spacing: 0;
}

// Official requirement marker (matches DadsFormControlLabel __requirement):
// inline, normal weight, 16px, error-1 color, leading half-width space.
.dads-checkbox__requirement {
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

// Dim the standalone label text when the field is disabled.
.dads-checkbox-field--disabled .dads-checkbox__label {
  color: var(--color-neutral-solid-gray-420, #949494);
}

// -------------------- forced colors --------------------------------------
// Improve coverage per official checkbox.css: disabled → GrayText, check →
// HighlightText, plus Canvas for the disabled check fill.
// NOTE: plain @media (not base.dads-forced-colors) — the mixin emits a bare
// `forced-color-adjust: auto`, which is invalid at stylesheet root.
@media (forced-colors: active) {
  .dads-checkbox__input,
  .dads-checkbox__input[aria-invalid='true'] {
    --_accent-color: Highlight;
    --_accent-hover-color: Highlight;
    --_border-color: ButtonText;
    --_border-hover-color: ButtonText;
    --_check-color: HighlightText;
  }

  .dads-checkbox__input:is(:disabled, [aria-disabled='true']) {
    --_accent-color: GrayText;
    --_accent-hover-color: GrayText;
    --_border-color: GrayText;
    --_border-hover-color: GrayText;
    --_check-color: Canvas;
  }
}
</style>
