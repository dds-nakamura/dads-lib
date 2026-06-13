<script setup lang="ts">
import { computed, ref, useId } from 'vue'
import type { DadsFileUploadEmits, DadsFileUploadProps } from './DadsFileUpload.types'

const props = withDefaults(defineProps<DadsFileUploadProps>(), {
  multiple: false,
  disabled: false,
  readonly: false,
  required: false,
  error: false,
  buttonText: 'ファイルを選択',
  dropzoneText: 'またはここにファイルをドロップ',
  expandDropArea: false,
  showFileSize: true,
  requiredLabel: '必須',
  formatRemoveLabel: (name: string) => `${name} を削除`,
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
  {
    'dads-file-upload--disabled': props.disabled,
    'dads-file-upload--readonly': props.readonly,
    'dads-file-upload--error': isError.value,
    'dads-file-upload--expand-drop': props.expandDropArea,
    'dads-file-upload--dragover': isDragover.value && props.expandDropArea,
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
      <span v-if="required" class="dads-file-upload__required" aria-hidden="true">{{
        requiredLabel
      }}</span>
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
        <span v-if="showFileSize" class="dads-file-upload__file-size">{{
          formatSize(file.size)
        }}</span>
        <button
          type="button"
          class="dads-file-upload__remove"
          :aria-label="formatRemoveLabel(file.name)"
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
  gap: calc(8 / 16 * 1rem);
  font-family: var(--font-family-sans, 'Noto Sans JP', sans-serif);
  // Official root typography: 16px / line-height 1.7 / letter-spacing .02em
  // / overflow-wrap anywhere so long file names wrap inside the control.
  font-size: var(--font-size-16, 1rem);
  font-weight: normal;
  line-height: 1.7;
  letter-spacing: 0.02em;
  overflow-wrap: anywhere;
  color: var(--color-neutral-solid-gray-800, #333333);

  // -------------------- label & required marker --------------------------
  &__label {
    display: inline-flex;
    align-items: center;
    gap: calc(8 / 16 * 1rem);
    font-size: var(--font-size-16, 1rem);
    font-weight: 500;
    line-height: var(--line-height-150, 1.5);
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

  // -------------------- drop zone ----------------------------------------
  // The focus ring lives on the wrapper so the highlight surrounds the
  // entire interactive zone, including the trigger button and helper text.
  &__dropzone {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: calc(12 / 16 * 1rem);
    // Official drop area uses a single uniform size (no sm/md/lg variants).
    padding: calc(16 / 16 * 1rem) calc(24 / 16 * 1rem);
    // Official drop area: 1px SOLID gray-536 border, 8px radius, gray-50 fill.
    border: 1px solid var(--color-neutral-solid-gray-536, #767676);
    border-radius: var(--border-radius-8, 0.5rem);
    background-color: var(--color-neutral-solid-gray-50, #f2f2f2);
    transition:
      border-color 0.15s ease,
      background-color 0.15s ease,
      box-shadow 0.15s ease;

    @include ring.dads-focus-ring-within;

    // Official dragover: 4px green outline (inset) + green-50 background.
    &--dragover {
      outline: 4px solid var(--color-semantic-success-1, #2cac6e);
      outline-offset: -4px;
      background-color: var(--color-primitive-green-50, #e6f5ec);
    }
  }

  &__dropzone-text {
    color: var(--color-neutral-solid-gray-700, #4d4d4d);
  }

  // -------------------- trigger button -----------------------------------
  &__button {
    @include base.dads-reset-button;
    @include ring.dads-focus-ring;

    display: inline-flex;
    align-items: center;
    justify-content: center;
    // Mirrors the official outline button (data-type="outline"): blue-900
    // border/text, 8px radius, bold label, blue-200 hover fill.
    border: 1px solid var(--color-primitive-blue-900, #0017c1);
    border-radius: var(--border-radius-8, 0.5rem);
    color: var(--color-primitive-blue-900, #0017c1);
    background-color: transparent;
    // Uniform trigger sizing (mirrors official outline button data-size="md").
    min-height: 2.5rem;
    padding: 0 calc(16 / 16 * 1rem);
    font-weight: bold;
    line-height: var(--line-height-150, 1.5);
    transition:
      background-color 0.15s ease,
      color 0.15s ease,
      border-color 0.15s ease;

    &:hover {
      background-color: var(--color-primitive-blue-200, #c5d7fb);
    }

    // Official disabled outline button: gray-300 border, gray-50 fill,
    // gray-420 text (not a flat 0.5 opacity dim).
    &:disabled,
    &[aria-disabled='true'] {
      cursor: not-allowed;
      border-color: var(--color-neutral-solid-gray-300, #b3b3b3);
      background-color: var(--color-neutral-solid-gray-50, #f2f2f2);
      color: var(--color-neutral-solid-gray-420, #949494);
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
    gap: calc(4 / 16 * 1rem);
  }

  &__file-item {
    display: inline-flex;
    align-items: center;
    gap: calc(8 / 16 * 1rem);
    padding: calc(4 / 16 * 1rem) calc(8 / 16 * 1rem);
    background-color: var(--color-neutral-white, #fff);
    border: 1px solid var(--color-neutral-solid-gray-420, #949494);
    border-radius: var(--border-radius-4, 0.25rem);
    font-size: var(--font-size-14, 0.875rem);
  }

  &__file-name {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    // Official file name is bold.
    font-weight: bold;
  }

  &__file-size {
    // Official file meta uses gray-600.
    color: var(--color-neutral-solid-gray-600, #666666);
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
    color: var(--color-neutral-solid-gray-700, #4d4d4d);
    font-size: 1.125rem;
    line-height: 1;

    &:hover {
      background-color: var(--color-neutral-solid-gray-50, rgba(0, 0, 0, 0.05));
      color: var(--color-neutral-solid-gray-800, #1a1a1a);
    }
  }

  // -------------------- progress -----------------------------------------
  &__progress {
    width: 100%;
    height: 0.5rem;
    background-color: var(--color-neutral-solid-gray-50, rgba(0, 0, 0, 0.05));
    border-radius: var(--border-radius-4, 0.25rem);
    overflow: hidden;
  }

  &__progress-bar {
    height: 100%;
    background-color: var(--color-primitive-blue-900, #0017c1);
    transition: width 0.2s ease;
  }

  // -------------------- footer (hint / error) ----------------------------
  &__footer {
    display: flex;
    justify-content: space-between;
    gap: calc(8 / 16 * 1rem);
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

  // -------------------- readonly -----------------------------------------
  &--readonly &__dropzone {
    pointer-events: none;
    border-style: solid;
  }

  // -------------------- disabled -----------------------------------------
  // Per-element official disabled coloring (no flat opacity dim). The trigger
  // button keeps its own :disabled outline-button treatment above.
  &--disabled {
    pointer-events: none;

    .dads-file-upload__dropzone {
      border-color: var(--color-neutral-solid-gray-300, #b3b3b3);
      background-color: var(--color-neutral-solid-gray-50, #f2f2f2);
    }

    .dads-file-upload__dropzone-text {
      color: var(--color-neutral-solid-gray-420, #949494);
    }

    .dads-file-upload__file-name {
      color: var(--color-neutral-solid-gray-420, #949494);
    }

    .dads-file-upload__file-size {
      color: var(--color-neutral-solid-gray-420, #949494);
    }

    .dads-file-upload__remove {
      color: var(--color-neutral-solid-gray-420, #949494);
    }
  }

  // -------------------- error --------------------------------------------
  &--error &__dropzone {
    border-color: var(--color-semantic-error-1, #ec0000);
  }

  // -------------------- expandDropArea ----------------------------------
  // When the user drags any file over the page, the dropzone expands to
  // cover the viewport so the drop target is unmissable. Adds a translucent
  // overlay + highlighted border so it remains visually distinct from the
  // surrounding page content.
  &--expand-drop.dads-file-upload--dragover &__dropzone {
    position: fixed;
    inset: 0;
    z-index: 999;
    margin: 0;
    // Official viewport drop overlay uses the success-green treatment, not
    // brand blue: green-50 wash + 4px green outline.
    background-color: var(--color-primitive-green-50, #e6f5ec);
    border: 1px solid var(--color-semantic-success-1, #2cac6e);
    outline: 4px solid var(--color-semantic-success-1, #2cac6e);
    outline-offset: -4px;
    display: flex;
    align-items: center;
    justify-content: center;
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
