<script setup lang="ts">
import { computed, ref, useId } from 'vue'
import type { DadsFileUploadEmits, DadsFileUploadProps } from './DadsFileUpload.types'

const props = withDefaults(defineProps<DadsFileUploadProps>(), {
  size: 'md',
  multiple: false,
  disabled: false,
  readonly: false,
  required: false,
  error: false,
  buttonText: 'ファイルを選択',
  dropzoneText: 'またはここにファイルをドロップ',
})

const emit = defineEmits<DadsFileUploadEmits>()

const inputRef = ref<HTMLInputElement | null>(null)

// Generated once per instance so the label `for` and `aria-describedby` ids
// stay stable across renders. Calling useId() inside a computed would re-run
// on every dependency change.
const generatedId = useId()
const inputId = computed(() => props.id ?? `dads-file-upload-${generatedId}`)
const hintId = computed(() => `${inputId.value}-hint`)
const errorId = computed(() => `${inputId.value}-error`)

const isDragover = ref(false)

// Internal validation messages (accept / maxSize) take precedence over the
// caller-provided errorMessage so the user sees the actionable reason first.
const internalErrorMessage = ref<string | null>(null)

const effectiveError = computed(() => internalErrorMessage.value ?? props.errorMessage)
const isError = computed(() => props.error || !!effectiveError.value)

// `disabled` and `readonly` both fully suppress interaction. Centralising the
// check keeps the four DOM event handlers from drifting apart.
const isLocked = computed(() => props.disabled || props.readonly)

const currentFiles = computed<File[]>(() => {
  const v = props.modelValue
  if (v == null) return []
  return Array.isArray(v) ? v : [v]
})

const rootClasses = computed(() => [
  'dads-file-upload',
  `dads-file-upload--${props.size}`,
  {
    'dads-file-upload--disabled': props.disabled,
    'dads-file-upload--readonly': props.readonly,
    'dads-file-upload--error': isError.value,
  },
])

const describedBy = computed(() => {
  if (isError.value && effectiveError.value) return errorId.value
  if (props.hint) return hintId.value
  return undefined
})

const inputAttrs = computed(() => ({
  name: props.name,
  accept: props.accept,
  multiple: props.multiple || undefined,
  disabled: isLocked.value || undefined,
  required: props.required || undefined,
  'aria-invalid': isError.value || undefined,
  'aria-required': props.required || undefined,
  'aria-describedby': describedBy.value,
}))

const hasFooter = computed(() => (isError.value && !!effectiveError.value) || !!props.hint)

const matchesAccept = (file: File, patterns: string[]): boolean => {
  if (patterns.length === 0) return true
  return patterns.some((pattern) => {
    if (pattern.startsWith('.')) {
      return file.name.toLowerCase().endsWith(pattern.toLowerCase())
    }
    if (pattern.endsWith('/*')) {
      // MIME wildcard, e.g. "image/*" → starts with "image/"
      return file.type.startsWith(pattern.slice(0, -1))
    }
    return file.type === pattern
  })
}

const validateFiles = (incoming: File[]): string | null => {
  if (props.maxSize !== undefined) {
    const tooLarge = incoming.find((f) => f.size > props.maxSize!)
    if (tooLarge) return `${tooLarge.name} はサイズ上限を超えています`
  }
  if (props.accept) {
    const patterns = props.accept
      .split(',')
      .map((p) => p.trim())
      .filter(Boolean)
    const invalid = incoming.find((f) => !matchesAccept(f, patterns))
    if (invalid) return `${invalid.name} は許可された形式ではありません`
  }
  return null
}

// Bridges the public single-File / File[] contract to the internal File[]
// representation used by the file list and validation logic.
const emitModelValue = (files: File[]) => {
  if (props.multiple) emit('update:modelValue', files)
  else emit('update:modelValue', files[0] ?? null)
}

const acceptFiles = (incoming: File[]) => {
  if (isLocked.value || incoming.length === 0) return

  const err = validateFiles(incoming)
  if (err) {
    internalErrorMessage.value = err
    return
  }
  internalErrorMessage.value = null

  const next = props.multiple ? incoming : incoming.slice(0, 1)
  emit('change', next)
  emitModelValue(next)
}

const openDialog = () => {
  if (isLocked.value) return
  inputRef.value?.click()
}

const onInputChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const list = target.files
  if (!list) return
  acceptFiles(Array.from(list))
  // Reset so re-selecting the same file still fires `change`.
  target.value = ''
}

const onDragover = () => {
  if (isLocked.value) return
  isDragover.value = true
}

const onDragleave = () => {
  isDragover.value = false
}

const onDrop = (event: DragEvent) => {
  isDragover.value = false
  if (isLocked.value) return
  const list = event.dataTransfer?.files
  if (!list) return
  acceptFiles(Array.from(list))
}

const removeFile = (file: File) => {
  if (isLocked.value) return
  emit('remove', file)
  emitModelValue(currentFiles.value.filter((f) => f !== file))
  // Clear any previous validation error so the user can retry without
  // lingering rejection text.
  internalErrorMessage.value = null
}

const formatSize = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(1)} MB`
  return `${(bytes / 1024 / 1024 / 1024).toFixed(1)} GB`
}

const onFocus = (event: FocusEvent) => emit('focus', event)
const onBlur = (event: FocusEvent) => emit('blur', event)
</script>

<template>
  <div :class="rootClasses">
    <label v-if="label" :for="inputId" class="dads-file-upload__label">
      {{ label }}
      <span v-if="required" class="dads-file-upload__required" aria-hidden="true">必須</span>
    </label>

    <div
      class="dads-file-upload__dropzone"
      :class="{ 'dads-file-upload__dropzone--dragover': isDragover }"
      @dragover.prevent="onDragover"
      @dragleave.prevent="onDragleave"
      @drop.prevent="onDrop"
    >
      <button
        type="button"
        class="dads-file-upload__button"
        :disabled="isLocked"
        @click="openDialog"
      >
        {{ buttonText }}
      </button>
      <span class="dads-file-upload__dropzone-text">{{ dropzoneText }}</span>
      <input
        :id="inputId"
        ref="inputRef"
        type="file"
        class="dads-file-upload__input"
        v-bind="inputAttrs"
        @change="onInputChange"
        @focus="onFocus"
        @blur="onBlur"
      />
    </div>

    <ul v-if="currentFiles.length > 0" class="dads-file-upload__file-list">
      <li
        v-for="file in currentFiles"
        :key="`${file.name}-${file.size}-${file.lastModified}`"
        class="dads-file-upload__file-item"
      >
        <span class="dads-file-upload__file-name">{{ file.name }}</span>
        <span class="dads-file-upload__file-size">{{ formatSize(file.size) }}</span>
        <button
          type="button"
          class="dads-file-upload__remove"
          :aria-label="`${file.name} を削除`"
          :disabled="isLocked"
          @click="removeFile(file)"
        >
          ×
        </button>
      </li>
    </ul>

    <div
      v-if="progress !== undefined"
      class="dads-file-upload__progress"
      role="progressbar"
      :aria-valuenow="progress"
      aria-valuemin="0"
      aria-valuemax="100"
    >
      <div class="dads-file-upload__progress-bar" :style="{ width: `${progress}%` }" />
    </div>

    <div v-if="hasFooter" class="dads-file-upload__footer">
      <span
        v-if="isError && effectiveError"
        :id="errorId"
        class="dads-file-upload__error"
        role="alert"
        >{{ effectiveError }}</span
      >
      <span v-else-if="hint" :id="hintId" class="dads-file-upload__hint">{{ hint }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '../../styles/base' as base;
@use '../../styles/focus-ring' as ring;

.dads-file-upload {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-8, 0.5rem);
  font-family: var(--font-family-sans, 'Noto Sans JP', sans-serif);
  color: var(--color-text-primary, #1a1a1a);

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

  // -------------------- drop zone ----------------------------------------
  // The focus ring lives on the wrapper so the highlight surrounds the
  // entire interactive zone, including the trigger button and helper text.
  &__dropzone {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--spacing-12, 0.75rem);
    border: 1px dashed var(--color-border-default, rgba(0, 0, 0, 0.1));
    border-radius: var(--border-radius-4, 0.25rem);
    background-color: var(--color-bg-subtle, rgba(0, 0, 0, 0.05));
    transition:
      border-color 0.15s ease,
      background-color 0.15s ease,
      box-shadow 0.15s ease;

    @include ring.dads-focus-ring-within;

    &--dragover {
      border-color: var(--color-brand-primary, #0017c1);
      background-color: var(--color-info-bg, #e8eaf6);
    }
  }

  &__dropzone-text {
    color: var(--color-text-secondary, #4d4d4d);
  }

  // -------------------- trigger button -----------------------------------
  &__button {
    @include base.dads-reset-button;
    @include ring.dads-focus-ring;

    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--color-brand-primary, #0017c1);
    border-radius: var(--border-radius-4, 0.25rem);
    color: var(--color-brand-primary, #0017c1);
    background-color: transparent;
    font-weight: 500;
    line-height: var(--line-height-150, 1.5);
    transition:
      background-color 0.15s ease,
      color 0.15s ease,
      border-color 0.15s ease;

    &:hover {
      background-color: var(--color-info-bg, #e8eaf6);
    }

    &:disabled,
    &[aria-disabled='true'] {
      cursor: not-allowed;
      opacity: 0.5;
      pointer-events: none;
    }
  }

  // -------------------- hidden native input ------------------------------
  // `display: none` rather than `visibility: hidden` so the input does not
  // reserve layout space in the drop zone.
  &__input {
    display: none;
  }

  // -------------------- file list ----------------------------------------
  &__file-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: var(--spacing-4, 0.25rem);
  }

  &__file-item {
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-8, 0.5rem);
    padding: var(--spacing-4, 0.25rem) var(--spacing-8, 0.5rem);
    background-color: var(--color-bg-surface, #fff);
    border: 1px solid var(--color-border-default, rgba(0, 0, 0, 0.1));
    border-radius: var(--border-radius-4, 0.25rem);
    font-size: var(--font-size-14, 0.875rem);
  }

  &__file-name {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__file-size {
    color: var(--color-text-secondary, #4d4d4d);
    font-variant-numeric: tabular-nums;
  }

  &__remove {
    @include base.dads-reset-button;
    @include ring.dads-focus-ring;

    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    color: var(--color-text-secondary, #4d4d4d);
    font-size: 1.125rem;
    line-height: 1;

    &:hover {
      background-color: var(--color-bg-subtle, rgba(0, 0, 0, 0.05));
      color: var(--color-text-primary, #1a1a1a);
    }
  }

  // -------------------- progress -----------------------------------------
  &__progress {
    width: 100%;
    height: 0.5rem;
    background-color: var(--color-bg-subtle, rgba(0, 0, 0, 0.05));
    border-radius: var(--border-radius-4, 0.25rem);
    overflow: hidden;
  }

  &__progress-bar {
    height: 100%;
    background-color: var(--color-brand-primary, #0017c1);
    transition: width 0.2s ease;
  }

  // -------------------- footer (hint / error) ----------------------------
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

  // -------------------- size ---------------------------------------------
  &--lg &__dropzone {
    padding: var(--spacing-24, 1.5rem) var(--spacing-32, 2rem);
    font-size: var(--font-size-18, 1.125rem);
  }
  &--lg &__button {
    min-height: 3rem;
    padding: 0 var(--spacing-24, 1.5rem);
    font-size: var(--font-size-18, 1.125rem);
  }

  &--md &__dropzone {
    padding: var(--spacing-16, 1rem) var(--spacing-24, 1.5rem);
    font-size: var(--font-size-16, 1rem);
  }
  &--md &__button {
    min-height: 2.5rem;
    padding: 0 var(--spacing-16, 1rem);
    font-size: var(--font-size-16, 1rem);
  }

  &--sm &__dropzone {
    padding: var(--spacing-12, 0.75rem) var(--spacing-16, 1rem);
    font-size: var(--font-size-14, 0.875rem);
  }
  &--sm &__button {
    min-height: 2rem;
    padding: 0 var(--spacing-12, 0.75rem);
    font-size: var(--font-size-14, 0.875rem);
  }

  // -------------------- readonly -----------------------------------------
  &--readonly &__dropzone {
    pointer-events: none;
    border-style: solid;
  }

  // -------------------- disabled -----------------------------------------
  &--disabled {
    pointer-events: none;
    opacity: 0.5;
  }

  // -------------------- error --------------------------------------------
  &--error &__dropzone {
    border-color: var(--color-error, #ec0000);
  }

  // -------------------- forced colors ------------------------------------
  @include base.dads-forced-colors {
    &__dropzone {
      border: 1px dashed CanvasText;
    }

    &__button {
      border: 1px solid CanvasText;
    }

    &__file-item {
      border: 1px solid CanvasText;
    }
  }
}
</style>
