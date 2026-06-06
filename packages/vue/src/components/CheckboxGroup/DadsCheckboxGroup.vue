<script setup lang="ts">
import { computed, useId } from 'vue'
import DadsCheckbox from '../Checkbox/DadsCheckbox.vue'
import DadsFormControlLabel from '../FormControlLabel/DadsFormControlLabel.vue'
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
  requiredLabel: '※必須',
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

// Field-label layer is delegated to DadsFormControlLabel. Map hint→support-text
// and errorMessage→error-text, keeping the stable ids so aria-describedby still
// resolves. Only one of support/error is shown at a time (error wins), matching
// the previous footer behaviour.
const supportText = computed(() => (isError.value && props.errorMessage ? undefined : props.hint))
const errorText = computed(() => (isError.value ? props.errorMessage : undefined))

const rootClasses = computed(() => [
  'dads-checkbox-group',
  `dads-checkbox-group--${props.direction}`,
  {
    'dads-checkbox-group--error': isError.value,
    'dads-checkbox-group--disabled': props.disabled,
  },
])

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
  <DadsFormControlLabel
    :id="fieldsetId"
    as="fieldset"
    :class="rootClasses"
    :size="size"
    :label="legend"
    :required="required"
    :required-label="requiredLabel"
    :support-text="supportText"
    :support-text-id="hintId"
    :error-text="errorText"
    :error-text-id="errorId"
    :disabled="disabled || undefined"
    :aria-invalid="isError || undefined"
    :aria-describedby="describedBy"
  >
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
  </DadsFormControlLabel>
</template>

<style scoped lang="scss">
// The field-label layer (legend / ※必須 / support-text / error-text) is owned
// by DadsFormControlLabel. This stylesheet only lays out the checkbox items and
// keeps the disabled / forced-colors niceties for the group container.
.dads-checkbox-group {
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
}
</style>
