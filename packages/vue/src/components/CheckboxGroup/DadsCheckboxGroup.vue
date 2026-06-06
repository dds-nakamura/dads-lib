<script setup lang="ts">
import { computed, useId } from 'vue'
import DadsCheckbox from '../Checkbox/DadsCheckbox.vue'
import type {
  DadsCheckboxGroupEmits,
  DadsCheckboxGroupProps,
  DadsCheckboxGroupValue,
} from './DadsCheckboxGroup.types'

const props = withDefaults(defineProps<DadsCheckboxGroupProps>(), {
  direction: 'vertical',
  size: 'md',
  required: false,
  error: false,
  disabled: false,
  requiredLabel: '必須',
})

const emit = defineEmits<DadsCheckboxGroupEmits>()

// Generated once per instance so the fieldset id and hint / error references
// stay stable across re-renders. Calling useId() inside a computed would
// re-run on every dependency change.
const generatedId = useId()
const fieldsetId = computed(() => props.id ?? `dads-checkbox-group-${generatedId}`)
const hintId = computed(() => `${fieldsetId.value}-hint`)
const errorId = computed(() => `${fieldsetId.value}-error`)

const isError = computed(() => props.error || !!props.errorMessage)

const describedBy = computed(() => {
  if (isError.value && props.errorMessage) return errorId.value
  if (props.hint) return hintId.value
  return undefined
})

const rootClasses = computed(() => [
  'dads-checkbox-group',
  `dads-checkbox-group--${props.direction}`,
  {
    'dads-checkbox-group--error': isError.value,
    'dads-checkbox-group--disabled': props.disabled,
  },
])

const hasFooter = computed(() => (isError.value && !!props.errorMessage) || !!props.hint)

const isItemChecked = (value: DadsCheckboxGroupValue) => props.modelValue?.includes(value) ?? false

const computeNext = (
  current: readonly DadsCheckboxGroupValue[],
  value: DadsCheckboxGroupValue,
  checked: boolean,
): DadsCheckboxGroupValue[] => {
  if (!checked) return current.filter((v) => v !== value)
  // Guard prevents duplicates if a child fires a redundant update
  // (e.g. controlled re-render race).
  if (current.includes(value)) return [...current]
  return [...current, value]
}

const onItemToggle = (value: DadsCheckboxGroupValue, checked: boolean) => {
  const next = computeNext(props.modelValue ?? [], value, checked)
  emit('update:modelValue', next)
  emit('change', next)
}
</script>

<template>
  <fieldset
    :id="fieldsetId"
    :class="rootClasses"
    :disabled="disabled || undefined"
    :aria-invalid="isError || undefined"
    :aria-describedby="describedBy"
  >
    <legend v-if="legend" class="dads-checkbox-group__legend">
      {{ legend }}
      <span v-if="required" class="dads-checkbox-group__required" aria-hidden="true">{{
        requiredLabel
      }}</span>
    </legend>
    <div class="dads-checkbox-group__items">
      <DadsCheckbox
        v-for="item in items"
        :key="String(item.value)"
        :model-value="isItemChecked(item.value)"
        :label="item.label"
        :hint="item.hint"
        :disabled="item.disabled || disabled"
        :size="size"
        :name="name"
        :value="item.value"
        :error="isError"
        @update:model-value="(checked: boolean) => onItemToggle(item.value, checked)"
      />
    </div>
    <div v-if="hasFooter" class="dads-checkbox-group__footer">
      <span
        v-if="isError && errorMessage"
        :id="errorId"
        class="dads-checkbox-group__error"
        role="alert"
        >{{ errorMessage }}</span
      >
      <span v-else-if="hint" :id="hintId" class="dads-checkbox-group__hint">{{ hint }}</span>
    </div>
  </fieldset>
</template>

<style scoped lang="scss">
@use '../../styles/base' as base;

.dads-checkbox-group {
  // Reset the user-agent fieldset chrome so the group renders flush.
  display: flex;
  flex-direction: column;
  gap: calc(8 / 16 * 1rem);
  margin: 0;
  padding: 0;
  border: 0;
  font-family: var(--font-family-sans, 'Noto Sans JP', sans-serif);
  color: var(--color-neutral-solid-gray-800, #1a1a1a);
  min-inline-size: 0; // fieldset defaults to min-inline-size: min-content

  // -------------------- legend & required marker -------------------------
  &__legend {
    display: inline-flex;
    align-items: center;
    gap: calc(8 / 16 * 1rem);
    font-size: var(--font-size-16, 1rem);
    // Official form-control-label legend typography: bold / 1.7 / 0.02em.
    font-weight: bold;
    line-height: 1.7;
    letter-spacing: 0.02em;
    padding: 0; // user-agent legends ship with horizontal padding
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

  // -------------------- items layout -------------------------------------
  &__items {
    display: flex;
  }

  &--vertical &__items {
    flex-direction: column;
    gap: calc(12 / 16 * 1rem);
  }

  &--horizontal &__items {
    flex-direction: row;
    flex-wrap: wrap;
    gap: calc(16 / 16 * 1rem);
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

  // -------------------- disabled -----------------------------------------
  // The native `<fieldset disabled>` already disables descendant form
  // controls; we only adjust the legend so it visually matches the children's
  // official disabled text colour (gray-420) rather than a blanket opacity dim.
  &--disabled &__legend {
    color: var(--color-neutral-solid-gray-420, #949494);
  }

  // -------------------- forced colors ------------------------------------
  @include base.dads-forced-colors {
    &__legend {
      color: CanvasText;
    }
  }
}
</style>
