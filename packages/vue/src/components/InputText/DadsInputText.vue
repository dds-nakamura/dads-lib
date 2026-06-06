<script setup lang="ts">
import { computed, useId } from 'vue'
import DadsFormControlLabel from '../FormControlLabel/DadsFormControlLabel.vue'
import type { DadsInputTextEmits, DadsInputTextProps } from './DadsInputText.types'

const props = withDefaults(defineProps<DadsInputTextProps>(), {
  type: 'text',
  size: 'md',
  disabled: false,
  readonly: false,
  required: false,
  error: false,
  align: 'vertical',
  requiredLabel: '※必須',
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

// Field-label layer is delegated to DadsFormControlLabel. Map hint→support-text
// and errorMessage→error-text, keeping the stable ids so aria-describedby still
// resolves. Only one of support/error is shown at a time (error wins), matching
// the previous footer behaviour.
const supportText = computed(() => (isError.value && props.errorMessage ? undefined : props.hint))
const errorText = computed(() => (isError.value ? props.errorMessage : undefined))

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
  <DadsFormControlLabel
    :class="rootClasses"
    :size="size"
    :label="label"
    :label-for="inputId"
    :required="required"
    :required-label="requiredLabel"
    :support-text="supportText"
    :support-text-id="hintId"
    :error-text="errorText"
    :error-text-id="errorId"
    :disabled="disabled"
  >
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

    <span v-if="counter !== undefined" :id="counterId" class="dads-input-text__counter"
      >{{ currentLength }} / {{ counter }}</span
    >
  </DadsFormControlLabel>
</template>

<style scoped lang="scss">
@use '../../styles/base' as base;
@use '../../styles/focus-ring' as ring;

// The field-label layer (label / ※必須 / support-text / error-text) is owned
// by DadsFormControlLabel. This stylesheet only styles the input control,
// icons and the optional character counter.
.dads-input-text {
  font-family: var(--font-family-sans, 'Noto Sans JP', sans-serif);
  color: var(--color-neutral-solid-gray-800, #1a1a1a);
  line-height: 1.7;
  letter-spacing: 0.02em;

  // -------------------- control wrapper ----------------------------------
  // The focus ring lives on the wrapper so prepend / append icons share the
  // highlight when the inner input is focused.
  &__control {
    position: relative;
    display: flex;
    align-items: stretch;
    background-color: var(--color-neutral-white, #fff);
    border: 1px solid var(--color-neutral-solid-gray-600, #666);
    border-radius: var(--border-radius-8, 0.5rem);
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
    color: var(--color-neutral-solid-gray-700, #4d4d4d);
    font-size: 1.25em;
  }

  // -------------------- counter ------------------------------------------
  &__counter {
    align-self: flex-end;
    color: var(--color-neutral-solid-gray-700, #4d4d4d);
    font-size: var(--font-size-14, 0.875rem);
    line-height: var(--line-height-150, 1.5);
    font-variant-numeric: tabular-nums;
  }

  // -------------------- align (official label placement) -----------------
  // Official DADS allows horizontal label placement (input-text MD「横幅設定 /
  // 水平配置」): label (and support text) beside the control, optionally right-
  // aligned or with a fixed-width label column. The field-label layer now lives
  // in DadsFormControlLabel, so we re-establish these layouts with a grid on the
  // merged root, targeting the form-control-label parts via :deep. The control
  // wrapper uses `display: contents`, so `.dads-input-text__control` / counter
  // participate directly in this grid.
  &--align-horizontal-left,
  &--align-horizontal-right,
  &--align-fixed-label {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    align-items: start;
    column-gap: calc(16 / 16 * 1rem);
    row-gap: calc(4 / 16 * 1rem);

    :deep(.dads-form-control-label__label) {
      grid-column: 1;
      grid-row: 1;
      margin-bottom: 0;
      // align label baseline with the control on the first row
      align-self: center;
    }
    :deep(.dads-form-control-label__support-text) {
      grid-column: 1;
      grid-row: 2;
    }
    .dads-input-text__control {
      grid-column: 2;
      grid-row: 1 / span 2;
    }
    .dads-input-text__counter,
    :deep(.dads-form-control-label__error-text) {
      grid-column: 2;
    }
  }

  &--align-horizontal-right {
    :deep(.dads-form-control-label__label),
    :deep(.dads-form-control-label__support-text) {
      text-align: right;
    }
  }

  // Fixed-width label column so multiple stacked fields align their inputs.
  &--align-fixed-label {
    grid-template-columns: calc(128 / 16 * 1rem) minmax(0, 1fr);
  }

  // -------------------- size ---------------------------------------------
  &--lg &__input {
    min-height: calc(3.5rem - 2px);
    font-size: var(--font-size-16, 1rem);
    padding: 0 calc(16 / 16 * 1rem);
  }
  &--lg &__icon {
    padding: 0 calc(12 / 16 * 1rem);
  }

  &--md &__input {
    min-height: calc(3rem - 2px);
    font-size: var(--font-size-16, 1rem);
    padding: 0 calc(16 / 16 * 1rem);
  }
  &--md &__icon {
    padding: 0 calc(12 / 16 * 1rem);
  }

  &--sm &__input {
    min-height: calc(2.5rem - 2px);
    font-size: var(--font-size-16, 1rem);
    padding: 0 calc(16 / 16 * 1rem);
  }
  &--sm &__icon {
    padding: 0 calc(8 / 16 * 1rem);
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
    border-color: var(--color-neutral-black, #000);
  }

  // -------------------- readonly -----------------------------------------
  // Official input-text uses border-style:dashed only (no background change).
  &--readonly &__control {
    border-style: dashed;
  }

  // -------------------- disabled -----------------------------------------
  // Official disabled uses dedicated tokens (border gray-300 / bg gray-50 /
  // text gray-420) instead of opacity, which would degrade text contrast.
  &--disabled {
    pointer-events: none;
    color: var(--color-neutral-solid-gray-420, #949494);

    .dads-input-text__control {
      border-color: var(--color-neutral-solid-gray-300, #d9d9d9);
      background-color: var(--color-neutral-solid-gray-50, #f2f2f2);
    }

    .dads-input-text__input {
      color: var(--color-neutral-solid-gray-420, #949494);
    }
  }

  // -------------------- error --------------------------------------------
  &--error &__control {
    border-color: var(--color-semantic-error-1, #ec0000);
  }

  // Invalid + hover deepens the border, matching official red-1000.
  &--error:not(.dads-input-text--readonly):not(.dads-input-text--disabled)
    .dads-input-text__control:hover {
    border-color: var(--color-primitive-red-1000, #a30000);
  }

  // -------------------- forced colors ------------------------------------
  @include base.dads-forced-colors {
    &__control {
      border: 1px solid CanvasText;
    }

    &--disabled &__control {
      border-color: GrayText;
    }

    &--disabled &__input {
      color: GrayText;
    }
  }
}
</style>
