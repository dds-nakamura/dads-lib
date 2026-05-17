<script setup lang="ts">
import { computed, useId } from 'vue'
import type { DadsInputTextEmits, DadsInputTextProps } from './DadsInputText.types'

const props = withDefaults(defineProps<DadsInputTextProps>(), {
  type: 'text',
  size: 'md',
  disabled: false,
  readonly: false,
  required: false,
  error: false,
  align: 'vertical',
})

// Official DADS a11y guidance discourages both `placeholder` and `maxlength`:
//  - placeholder: low-contrast, disappears on focus, harms cognitive load
//  - maxlength: silently truncates user input without feedback
// We do not remove the props (callers may have valid reasons), but surface
// a one-time dev warning per mount so misuse is visible.
const __metaEnv = (import.meta as ImportMeta & { env?: { DEV?: boolean } }).env
if (__metaEnv?.DEV) {
  if (props.placeholder !== undefined) {
    console.warn(
      '[DadsInputText] placeholder は公式 DADS で非推奨です。' +
        'プレースホルダーテキストはフォーカス時に消え、コントラスト不足で読みにくく、' +
        '入力の手がかりとして機能しにくいため、`hint` プロップで代替してください。',
    )
  }
  if (props.maxlength !== undefined) {
    console.warn(
      '[DadsInputText] maxlength は公式 DADS で非推奨です。' +
        '入力が黙って切り詰められユーザーに通知されないため、' +
        '`counter` で残り文字数を表示しバックエンド検証で上限を伝える方式を検討してください。',
    )
  }
}

const emit = defineEmits<DadsInputTextEmits>()

// Generated once per instance so the label `for` and `aria-describedby` ids
// stay stable across renders. Calling useId() inside a computed would re-run
// on every dependency change.
const generatedId = useId()
const inputId = computed(() => props.id ?? `dads-input-text-${generatedId}`)
const hintId = computed(() => `${inputId.value}-hint`)
const errorId = computed(() => `${inputId.value}-error`)
const counterId = computed(() => `${inputId.value}-counter`)

const isError = computed(() => props.error || !!props.errorMessage)

const currentLength = computed(() => String(props.modelValue ?? '').length)

const describedBy = computed(() => {
  const ids: string[] = []
  if (isError.value && props.errorMessage) ids.push(errorId.value)
  else if (props.hint) ids.push(hintId.value)
  if (props.counter !== undefined) ids.push(counterId.value)
  return ids.length > 0 ? ids.join(' ') : undefined
})

const rootClasses = computed(() => [
  'dads-input-text',
  `dads-input-text--${props.size}`,
  `dads-input-text--align-${props.align}`,
  {
    'dads-input-text--disabled': props.disabled,
    'dads-input-text--readonly': props.readonly,
    'dads-input-text--error': isError.value,
  },
])

const inputAttrs = computed(() => ({
  name: props.name,
  placeholder: props.placeholder,
  autocomplete: props.autocomplete,
  maxlength: props.maxlength,
  inputmode: props.inputmode,
  disabled: props.disabled || undefined,
  readonly: props.readonly || undefined,
  'aria-invalid': isError.value || undefined,
  'aria-required': props.required || undefined,
  'aria-describedby': describedBy.value,
}))

const hasFooter = computed(
  () => (isError.value && !!props.errorMessage) || !!props.hint || props.counter !== undefined,
)

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const next: string | number = props.type === 'number' ? target.valueAsNumber : target.value
  emit('update:modelValue', Number.isNaN(next) ? '' : next)
}

const onChange = (event: Event) => emit('change', event)
const onFocus = (event: FocusEvent) => emit('focus', event)
const onBlur = (event: FocusEvent) => emit('blur', event)
</script>

<template>
  <div :class="rootClasses">
    <label v-if="label" :for="inputId" class="dads-input-text__label">
      {{ label }}
      <span v-if="required" class="dads-input-text__required" aria-hidden="true">必須</span>
    </label>

    <div class="dads-input-text__control">
      <i
        v-if="prependIcon"
        :class="['mdi', prependIcon, 'dads-input-text__icon', 'dads-input-text__icon--prepend']"
        aria-hidden="true"
      />
      <input
        :id="inputId"
        class="dads-input-text__input"
        :type="type"
        :value="modelValue"
        v-bind="inputAttrs"
        @input="onInput"
        @change="onChange"
        @focus="onFocus"
        @blur="onBlur"
      />
      <i
        v-if="appendIcon"
        :class="['mdi', appendIcon, 'dads-input-text__icon', 'dads-input-text__icon--append']"
        aria-hidden="true"
      />
    </div>

    <div v-if="hasFooter" class="dads-input-text__footer">
      <span
        v-if="isError && errorMessage"
        :id="errorId"
        class="dads-input-text__error"
        role="alert"
        >{{ errorMessage }}</span
      >
      <span v-else-if="hint" :id="hintId" class="dads-input-text__hint">{{ hint }}</span>
      <span v-if="counter !== undefined" :id="counterId" class="dads-input-text__counter"
        >{{ currentLength }} / {{ counter }}</span
      >
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '../../styles/base' as base;
@use '../../styles/focus-ring' as ring;

.dads-input-text {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4, 0.25rem);
  font-family: var(--font-family-sans, 'Noto Sans JP', sans-serif);
  color: var(--color-text-primary, #1a1a1a);

  // -------------------- alignment ---------------------------------------
  // vertical (default) stays as flex-direction: column.
  // horizontal-* variants swap to a label-row + control-column grid.
  &--align-horizontal-left,
  &--align-horizontal-right,
  &--align-fixed-label {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: start;
    gap: var(--spacing-4, 0.25rem) var(--spacing-12, 0.75rem);
  }

  &--align-horizontal-left &__label,
  &--align-horizontal-right &__label,
  &--align-fixed-label &__label {
    align-self: center;
    margin-bottom: 0;
  }

  &--align-horizontal-right &__label {
    text-align: end;
  }

  &--align-fixed-label {
    grid-template-columns: 8rem 1fr;
  }

  // The footer should span both columns regardless of alignment so it
  // doesn't squeeze under the label.
  &--align-horizontal-left &__footer,
  &--align-horizontal-right &__footer,
  &--align-fixed-label &__footer {
    grid-column: 2;
  }

  // -------------------- label & required marker --------------------------
  &__label {
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-8, 0.5rem);
    font-size: var(--font-size-16, 1rem);
    font-weight: 500;
    line-height: var(--line-height-150, 1.5);
  }

  &__required {
    background-color: var(--color-error, #ec0000);
    color: var(--color-text-on-primary, #fff);
    font-size: var(--font-size-14, 0.875rem);
    font-weight: 700;
    padding: 2px 8px;
    border-radius: var(--border-radius-4, 0.25rem);
    line-height: 1.2;
  }

  // -------------------- control wrapper ----------------------------------
  // The focus ring lives on the wrapper so prepend / append icons share the
  // highlight when the inner input is focused.
  &__control {
    position: relative;
    display: flex;
    align-items: stretch;
    background-color: var(--color-bg-surface, #fff);
    border: 1px solid var(--color-border-default, rgba(0, 0, 0, 0.1));
    border-radius: var(--border-radius-4, 0.25rem);
    transition:
      border-color 0.15s ease,
      box-shadow 0.15s ease;

    @include ring.dads-focus-ring-within;
  }

  // -------------------- input element ------------------------------------
  &__input {
    @include base.dads-reset-input;
    flex: 1;
    width: 100%;

    // The wrapper provides the focus ring via :focus-within. Suppress the
    // input's own :focus-visible outline so the global `:focus-visible` rule
    // in styles/_focus.scss doesn't draw a second blue ring inside the
    // wrapper. !important is required to win against the global !important.
    &:focus-visible {
      outline: none !important;
    }
  }

  // -------------------- icons --------------------------------------------
  &__icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: var(--color-text-secondary, #4d4d4d);
    font-size: 1.25em;
  }

  // -------------------- footer (hint / error / counter) ------------------
  &__footer {
    display: flex;
    justify-content: space-between;
    gap: var(--spacing-8, 0.5rem);
    font-size: var(--font-size-14, 0.875rem);
    line-height: var(--line-height-150, 1.5);
  }

  &__hint {
    color: var(--color-text-secondary, #4d4d4d);
  }

  &__error {
    color: var(--color-error, #ec0000);
    font-weight: 500;
  }

  &__counter {
    color: var(--color-text-secondary, #4d4d4d);
    margin-left: auto;
    font-variant-numeric: tabular-nums;
  }

  // -------------------- size ---------------------------------------------
  &--lg &__input {
    min-height: calc(3.5rem - 2px);
    font-size: var(--font-size-18, 1.125rem);
    padding: 0 var(--spacing-16, 1rem);
  }
  &--lg &__icon {
    padding: 0 var(--spacing-12, 0.75rem);
  }

  &--md &__input {
    min-height: calc(3rem - 2px);
    font-size: var(--font-size-16, 1rem);
    padding: 0 var(--spacing-12, 0.75rem);
  }
  &--md &__icon {
    padding: 0 var(--spacing-12, 0.75rem);
  }

  &--sm &__input {
    min-height: calc(2.5rem - 2px);
    font-size: var(--font-size-14, 0.875rem);
    padding: 0 var(--spacing-12, 0.75rem);
  }
  &--sm &__icon {
    padding: 0 var(--spacing-8, 0.5rem);
  }

  // When an icon is rendered, drop the input's leading/trailing padding so
  // the icon supplies it instead.
  &__icon--prepend + &__input {
    padding-left: 0;
  }
  &__input + &__icon--append {
    padding-left: 0;
  }

  // -------------------- hover (interactive) ------------------------------
  &:not(.dads-input-text--readonly):not(.dads-input-text--disabled):not(.dads-input-text--error)
    .dads-input-text__control:hover {
    border-color: var(--color-text-primary, #1a1a1a);
  }

  // -------------------- readonly -----------------------------------------
  &--readonly &__control {
    border-style: dashed;
    background-color: var(--color-bg-subtle, rgba(0, 0, 0, 0.05));
  }

  // -------------------- disabled -----------------------------------------
  &--disabled {
    pointer-events: none;
    opacity: 0.5;

    .dads-input-text__control {
      background-color: var(--color-bg-subtle, rgba(0, 0, 0, 0.05));
    }
  }

  // -------------------- error --------------------------------------------
  &--error &__control {
    border-color: var(--color-error, #ec0000);
  }

  // -------------------- forced colors ------------------------------------
  @include base.dads-forced-colors {
    &__control {
      border: 1px solid CanvasText;
    }
  }
}
</style>
