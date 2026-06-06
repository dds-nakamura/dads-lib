<script setup lang="ts">
import { computed, useId } from 'vue'
import DadsRadio from '../Radio/DadsRadio.vue'
import type {
  DadsRadioGroupEmits,
  DadsRadioGroupProps,
  DadsRadioGroupValue,
} from './DadsRadioGroup.types'

const props = withDefaults(defineProps<DadsRadioGroupProps>(), {
  direction: 'vertical',
  size: 'md',
  required: false,
  error: false,
  disabled: false,
  legendVisuallyHidden: false,
  requiredLabel: '必須',
})

const emit = defineEmits<DadsRadioGroupEmits>()

// Generated once per instance so element ids and the group `name` stay stable
// across renders. Two groups on the same page receive distinct names so the
// browser's single-selection behavior does not bleed across them.
const generatedId = useId()
const rootId = computed(() => props.id ?? `dads-radio-group-${generatedId}`)
const resolvedName = computed(() => props.name ?? `dads-radio-group-name-${generatedId}`)
const hintId = computed(() => `${rootId.value}-hint`)
const errorId = computed(() => `${rootId.value}-error`)

const isError = computed(() => props.error || !!props.errorMessage)

const describedBy = computed(() => {
  if (isError.value && props.errorMessage) return errorId.value
  if (props.hint) return hintId.value
  return undefined
})

const rootClasses = computed(() => [
  'dads-radio-group',
  `dads-radio-group--${props.direction}`,
  {
    'dads-radio-group--error': isError.value,
    'dads-radio-group--disabled': props.disabled,
  },
])

const hasFooter = computed(() => (isError.value && !!props.errorMessage) || !!props.hint)

const onSelect = (value: DadsRadioGroupValue) => {
  emit('update:modelValue', value)
  emit('change', value)
}
</script>

<template>
  <fieldset
    :id="rootId"
    :class="rootClasses"
    :disabled="disabled"
    :aria-invalid="isError || undefined"
    :aria-describedby="describedBy"
  >
    <legend
      v-if="legend"
      class="dads-radio-group__legend"
      :class="{ 'dads-radio-group__legend--visually-hidden': legendVisuallyHidden }"
    >
      {{ legend }}
      <span v-if="required" class="dads-radio-group__required" aria-hidden="true">{{
        requiredLabel
      }}</span>
    </legend>

    <div class="dads-radio-group__items">
      <DadsRadio
        v-for="item in items"
        :key="String(item.value)"
        :model-value="modelValue ?? null"
        :value="item.value"
        :label="item.label"
        :hint="item.hint"
        :description="item.description"
        :disabled="item.disabled || disabled"
        :size="size"
        :name="resolvedName"
        :error="isError"
        @update:model-value="onSelect"
      />
    </div>

    <div v-if="hasFooter" class="dads-radio-group__footer">
      <span
        v-if="isError && errorMessage"
        :id="errorId"
        class="dads-radio-group__error"
        role="alert"
        >{{ errorMessage }}</span
      >
      <span v-else-if="hint" :id="hintId" class="dads-radio-group__hint">{{ hint }}</span>
    </div>
  </fieldset>
</template>

<style scoped lang="scss">
.dads-radio-group {
  // Reset native fieldset chrome so we can compose with our own tokens.
  appearance: none;
  border: 0;
  margin: 0;
  padding: 0;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: calc(8 / 16 * 1rem);
  font-family: var(--font-family-sans, 'Noto Sans JP', sans-serif);
  color: var(--color-neutral-solid-gray-800, #1a1a1a);

  // -------------------- legend & required marker -------------------------
  &__legend {
    display: inline-flex;
    align-items: center;
    gap: calc(8 / 16 * 1rem);
    padding: 0;
    font-size: var(--font-size-16, 1rem);
    font-weight: 500;
    line-height: var(--line-height-150, 1.5);

    // Visually hide while keeping it in the a11y tree. Mirrors the canonical
    // "sr-only" pattern so screen readers still announce the group label.
    &--visually-hidden {
      position: absolute;
      width: 1px;
      height: 1px;
      margin: -1px;
      padding: 0;
      overflow: hidden;
      clip: rect(0 0 0 0);
      clip-path: inset(50%);
      white-space: nowrap;
      border: 0;
    }
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

  // -------------------- items wrapper ------------------------------------
  &__items {
    display: flex;
    gap: calc(12 / 16 * 1rem);
  }

  &--vertical &__items {
    flex-direction: column;
  }

  &--horizontal &__items {
    flex-direction: row;
    flex-wrap: wrap;
    gap: calc(16 / 16 * 1rem);
  }

  // -------------------- footer (hint / error) ---------------------------
  // Only one of hint / error renders at a time (v-if/v-else-if), so we just
  // need the typography here.
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

  // -------------------- error -------------------------------------------
  &--error &__legend {
    color: var(--color-semantic-error-1, #ec0000);
  }

  // -------------------- disabled ----------------------------------------
  // The native `fieldset[disabled]` attribute already disables descendant
  // form controls; each child Radio renders its own disabled token palette
  // (gray-50 / gray-300), matching official `fieldset[disabled]` behavior.
  // No flat opacity dim — that diverges from the official spec.
}
</style>
