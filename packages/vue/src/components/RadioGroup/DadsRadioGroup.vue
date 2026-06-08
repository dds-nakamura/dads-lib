<script setup lang="ts">
import { computed, useId } from 'vue'
import DadsRadio from '../Radio/DadsRadio.vue'
import DadsFormControlLabel from '../FormControlLabel/DadsFormControlLabel.vue'
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
  requiredLabel: '※必須',
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

// The shared form-control-label only knows about `sm` / `md` / `lg`. Radio's
// own size scale is the same set, so we can forward directly.
const labelSize = computed(() => props.size)

// Root modifier classes layered onto DadsFormControlLabel's fieldset. The
// label / required / support / error visuals are owned by form-control-label;
// these modifiers only drive the items layout + state hooks.
const rootClasses = computed(() => [
  'dads-radio-group',
  `dads-radio-group--${props.direction}`,
  {
    'dads-radio-group--error': isError.value,
    'dads-radio-group--disabled': props.disabled,
  },
])

const onSelect = (value: DadsRadioGroupValue) => {
  emit('update:modelValue', value)
  emit('change', value)
}

// Per-item description / hint are not part of the official radio markup — they
// belong to the form-control-label layer. We render them next to each radio
// using the official `dads-form-control-label__support-text` class and wire the
// radio input's `aria-describedby` at them so screen readers announce them.
const itemDescriptionId = (value: DadsRadioGroupValue) =>
  `${rootId.value}-item-${String(value)}-description`
const itemHintId = (value: DadsRadioGroupValue) => `${rootId.value}-item-${String(value)}-hint`

const itemDescribedBy = (item: { value: DadsRadioGroupValue; hint?: string; description?: string }) => {
  const ids: string[] = []
  if (item.description) ids.push(itemDescriptionId(item.value))
  if (item.hint) ids.push(itemHintId(item.value))
  return ids.length > 0 ? ids.join(' ') : undefined
}
</script>

<template>
  <DadsFormControlLabel
    :id="rootId"
    as="fieldset"
    :class="rootClasses"
    :size="labelSize"
    :label="legend"
    :required="required"
    :required-label="requiredLabel"
    :support-text="hint"
    :support-text-id="hintId"
    :error-text="isError && errorMessage ? errorMessage : undefined"
    :error-text-id="errorId"
    :disabled="disabled"
    :aria-invalid="isError || undefined"
    :aria-describedby="describedBy"
  >
    <template v-if="legend && legendVisuallyHidden" #label>
      <span class="dads-radio-group__legend-visually-hidden">{{ legend }}</span>
    </template>

    <div class="dads-radio-group__items">
      <div v-for="item in items" :key="String(item.value)" class="dads-radio-group__item">
        <DadsRadio
          :model-value="modelValue ?? null"
          :value="item.value"
          :label="item.label"
          :disabled="item.disabled || disabled"
          :size="size"
          :name="resolvedName"
          :error="isError"
          :aria-describedby="itemDescribedBy(item)"
          @update:model-value="onSelect"
        />
        <p
          v-if="item.description"
          :id="itemDescriptionId(item.value)"
          class="dads-radio__description dads-form-control-label__support-text"
        >
          {{ item.description }}
        </p>
        <p
          v-if="item.hint"
          :id="itemHintId(item.value)"
          class="dads-radio__support-text dads-form-control-label__support-text"
        >
          {{ item.hint }}
        </p>
      </div>
    </div>
  </DadsFormControlLabel>
</template>

<style scoped lang="scss">
// The label / ※必須 / support-text / error-text layer is delegated entirely to
// DadsFormControlLabel (official `dads-form-control-label`). Only the items
// layout (direction) and the visually-hidden legend helper remain here.
.dads-radio-group {
  &__items {
    display: flex;
  }

  // Each item groups its radio with the optional per-option description / hint
  // paragraphs (form-control-label support-text styling, indented under the
  // control). These paragraphs are the official `support-text` layer, not part
  // of the radio markup itself.
  &__item {
    display: flex;
    flex-direction: column;
  }

  // The radio's own gap/padding owns the spacing; the description/hint sit just
  // below, aligned with the label (control width + gap indent).
  .dads-radio__description,
  .dads-radio__support-text {
    margin: 0;
    color: var(--color-neutral-solid-gray-600, #666);
    font-size: calc(14 / 16 * 1rem);
    line-height: 1.5;
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

  // Keep the legend in the a11y tree while hiding it visually. Mirrors the
  // canonical "sr-only" pattern so screen readers still announce the group.
  &__legend-visually-hidden {
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
</style>
