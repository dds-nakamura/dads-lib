<script setup lang="ts">
import { computed, useId } from 'vue'
import type {
  DadsTableControlEmits,
  DadsTableControlPreset,
  DadsTableControlProps,
} from './DadsTableControl.types'

const props = withDefaults(defineProps<DadsTableControlProps>(), {
  searchQuery: '',
  currentPage: 1,
  pageSize: 10,
  pageSizeOptions: () => [10, 25, 50, 100],
  searchPlaceholder: '検索',
  presets: () => [],
  showReset: true,
  resetLabel: '検索条件をリセット',
  showSearch: true,
  showPageSize: true,
  showPagination: true,
  ariaLabel: 'テーブルコントロール',
  searchLabel: '検索',
  pageSizeLabel: '表示件数',
  paginationAriaLabel: 'ページ送り',
  prevPageAriaLabel: '前のページ',
  currentPageAriaLabel: '現在のページ',
  nextPageAriaLabel: '次のページ',
  prevPageLabel: '前へ',
  nextPageLabel: '次へ',
  formatPageSizeOption: (n: number) => `${n} 件`,
  formatRangeLabel: (start: number, end: number, total: number) =>
    total === 0 ? '0 件' : `${start}-${end} / ${total} 件`,
})

const emit = defineEmits<DadsTableControlEmits>()

// Stable ids for label `for` / aria-controls wiring.
const generatedId = useId()
const searchId = computed(() => `dads-table-control-search-${generatedId}`)
const pageSizeId = computed(() => `dads-table-control-page-size-${generatedId}`)
const statusId = computed(() => `dads-table-control-status-${generatedId}`)

// totalPages is at least 1 even when totalItems === 0 so the indicator never
// reads "0 / 0" which is confusing for screen readers.
const totalPages = computed(() => {
  const size = Math.max(1, props.pageSize)
  return Math.max(1, Math.ceil(props.totalItems / size))
})

const isFirstPage = computed(() => props.currentPage <= 1)
const isLastPage = computed(() => props.currentPage >= totalPages.value)

// Clamp prev/next so emitted values stay within [1, totalPages].
const goToPrev = () => {
  if (isFirstPage.value) return
  emit('update:page', Math.max(1, props.currentPage - 1))
}

const goToNext = () => {
  if (isLastPage.value) return
  emit('update:page', Math.min(totalPages.value, props.currentPage + 1))
}

const onSearchInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:search', target.value)
}

const onPageSizeChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  const next = Number(target.value)
  if (!Number.isNaN(next)) {
    emit('update:pageSize', next)
    // After changing the page size the current page may exceed the new
    // totalPages — reset to page 1 to keep the parent in a valid state.
    if (props.currentPage > 1) emit('update:page', 1)
  }
}

const rangeStart = computed(() => {
  if (props.totalItems === 0) return 0
  return (props.currentPage - 1) * props.pageSize + 1
})

const rangeEnd = computed(() => {
  if (props.totalItems === 0) return 0
  return Math.min(props.totalItems, props.currentPage * props.pageSize)
})

const statusText = computed(() =>
  props.formatRangeLabel(rangeStart.value, rangeEnd.value, props.totalItems),
)

const onPresetClick = (preset: DadsTableControlPreset) => {
  emit('update:search', preset.query)
  emit('click:preset', preset)
}

const onReset = () => {
  if (!props.searchQuery) return
  emit('update:search', '')
  emit('reset')
}
</script>

<template>
  <div class="dads-table-control" role="group" :aria-label="ariaLabel">
    <!-- Top row: search + page-size selector. -->
    <div v-if="showSearch || showPageSize" class="dads-table-control__top">
      <div v-if="showSearch" class="dads-table-control__search">
        <label :for="searchId" class="dads-table-control__label">{{ searchLabel }}</label>
        <div class="dads-table-control__search-control">
          <i class="mdi mdi-magnify dads-table-control__search-icon" aria-hidden="true" />
          <input
            :id="searchId"
            class="dads-table-control__search-input"
            type="search"
            :value="searchQuery"
            :placeholder="searchPlaceholder"
            @input="onSearchInput"
          />
          <button
            v-if="showReset && searchQuery"
            type="button"
            class="dads-table-control__reset"
            :aria-label="resetLabel"
            @click="onReset"
          >
            <i class="mdi mdi-close-circle" aria-hidden="true" />
          </button>
        </div>
        <div v-if="presets.length > 0" class="dads-table-control__presets" role="list">
          <button
            v-for="(preset, idx) in presets"
            :key="`${preset.label}-${idx}`"
            type="button"
            role="listitem"
            class="dads-table-control__preset"
            :aria-pressed="searchQuery === preset.query"
            @click="onPresetClick(preset)"
          >
            {{ preset.label }}
          </button>
        </div>
      </div>

      <div v-if="showPageSize" class="dads-table-control__page-size">
        <label :for="pageSizeId" class="dads-table-control__label">{{ pageSizeLabel }}</label>
        <select
          :id="pageSizeId"
          class="dads-table-control__page-size-select"
          :value="pageSize"
          @change="onPageSizeChange"
        >
          <option v-for="opt in pageSizeOptions" :key="opt" :value="opt">
            {{ formatPageSizeOption(opt) }}
          </option>
        </select>
      </div>
    </div>

    <!-- Bottom row: range status + pagination buttons. -->
    <div v-if="showPagination" class="dads-table-control__pagination">
      <span :id="statusId" class="dads-table-control__status" aria-live="polite">
        {{ statusText }}
      </span>
      <div class="dads-table-control__buttons" role="navigation" :aria-label="paginationAriaLabel">
        <button
          type="button"
          class="dads-table-control__button dads-table-control__button--prev"
          :disabled="isFirstPage"
          :aria-label="prevPageAriaLabel"
          @click="goToPrev"
        >
          <i class="mdi mdi-chevron-left" aria-hidden="true" />
          {{ prevPageLabel }}
        </button>
        <span class="dads-table-control__page-indicator" :aria-label="currentPageAriaLabel">
          {{ currentPage }} / {{ totalPages }}
        </span>
        <button
          type="button"
          class="dads-table-control__button dads-table-control__button--next"
          :disabled="isLastPage"
          :aria-label="nextPageAriaLabel"
          @click="goToNext"
        >
          {{ nextPageLabel }}
          <i class="mdi mdi-chevron-right" aria-hidden="true" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '../../styles/base' as base;
@use '../../styles/focus-ring' as ring;

.dads-table-control {
  display: flex;
  flex-direction: column;
  gap: calc(12 / 16 * 1rem);
  font-family: var(--font-family-sans, 'Noto Sans JP', sans-serif);
  color: var(--color-neutral-solid-gray-800, #1a1a1a);
  font-size: var(--font-size-14, 0.875rem);
  line-height: var(--line-height-150, 1.5);

  // -------------------- top row (search + page-size) --------------------
  &__top {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    gap: calc(16 / 16 * 1rem);
  }

  &__search {
    flex: 1 1 240px;
    display: flex;
    flex-direction: column;
    gap: calc(4 / 16 * 1rem);
  }

  &__label {
    font-size: var(--font-size-14, 0.875rem);
    font-weight: 500;
    color: var(--color-neutral-solid-gray-700, #4d4d4d);
  }

  &__search-control {
    display: flex;
    align-items: center;
    background-color: var(--color-neutral-white, #fff);
    border: 1px solid var(--color-border-default, rgba(0, 0, 0, 0.1));
    border-radius: var(--border-radius-4, 0.25rem);

    @include ring.dads-focus-ring-within;
  }

  &__search-icon {
    padding: 0 calc(8 / 16 * 1rem) 0 calc(12 / 16 * 1rem);
    color: var(--color-neutral-solid-gray-700, #4d4d4d);
    font-size: 1.25em;
  }

  &__search-input {
    @include base.dads-reset-input;
    flex: 1;
    width: 100%;
    min-height: calc(2.5rem - 2px);
    padding: 0 calc(12 / 16 * 1rem) 0 calc(4 / 16 * 1rem);
    font-size: var(--font-size-14, 0.875rem);

    &:focus-visible {
      outline: none !important;
    }
  }

  // -------------------- reset button (search 横の ✕) --------------------
  &__reset {
    @include base.dads-reset-button;
    @include ring.dads-focus-ring;

    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1.75rem;
    height: 1.75rem;
    margin-right: calc(4 / 16 * 1rem);
    border-radius: 50%;
    background-color: transparent;
    color: var(--color-neutral-solid-gray-700, #4d4d4d);
    font-size: 1.1rem;
    cursor: pointer;

    &:hover {
      color: var(--color-neutral-solid-gray-800, #1a1a1a);
      background-color: var(--color-neutral-solid-gray-50, rgba(0, 0, 0, 0.04));
    }
  }

  // -------------------- preset chips (検索プリセット) --------------------
  &__presets {
    display: flex;
    flex-wrap: wrap;
    gap: calc(4 / 16 * 1rem);
    margin-top: calc(4 / 16 * 1rem);
  }

  &__preset {
    @include base.dads-reset-button;
    @include ring.dads-focus-ring;

    display: inline-flex;
    align-items: center;
    min-height: 1.75rem;
    padding: 0 calc(8 / 16 * 1rem);
    border: 1px solid var(--color-border-default, rgba(0, 0, 0, 0.12));
    border-radius: var(--border-radius-full, 999px);
    background-color: var(--color-neutral-white, #fff);
    color: var(--color-neutral-solid-gray-800, #1a1a1a);
    font-size: var(--font-size-12, 0.75rem);
    cursor: pointer;
    transition:
      background-color 0.15s ease,
      border-color 0.15s ease,
      color 0.15s ease;

    &:hover {
      background-color: var(--color-neutral-solid-gray-50, rgba(0, 0, 0, 0.04));
    }

    &[aria-pressed='true'] {
      background-color: var(--color-info-bg, rgba(0, 23, 193, 0.08));
      border-color: var(--color-primitive-blue-900, #0017c1);
      color: var(--color-primitive-blue-900, #0017c1);
    }
  }

  &__page-size {
    display: flex;
    flex-direction: column;
    gap: calc(4 / 16 * 1rem);
  }

  &__page-size-select {
    appearance: none;
    background-color: var(--color-neutral-white, #fff);
    border: 1px solid var(--color-border-default, rgba(0, 0, 0, 0.1));
    border-radius: var(--border-radius-4, 0.25rem);
    color: inherit;
    font: inherit;
    font-size: var(--font-size-14, 0.875rem);
    min-height: calc(2.5rem - 2px);
    padding: 0 calc(24 / 16 * 1rem) 0 calc(12 / 16 * 1rem);

    @include ring.dads-focus-ring;
  }

  // -------------------- bottom row (status + buttons) -------------------
  &__pagination {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: calc(12 / 16 * 1rem);
  }

  &__status {
    color: var(--color-neutral-solid-gray-700, #4d4d4d);
    font-variant-numeric: tabular-nums;
  }

  &__buttons {
    display: inline-flex;
    align-items: center;
    gap: calc(8 / 16 * 1rem);
  }

  &__button {
    @include base.dads-reset-button;
    @include ring.dads-focus-ring;

    display: inline-flex;
    align-items: center;
    gap: calc(4 / 16 * 1rem);
    min-height: 2rem;
    padding: 0 calc(12 / 16 * 1rem);
    border-radius: var(--border-radius-4, 0.25rem);
    border: 1px solid var(--color-border-default, rgba(0, 0, 0, 0.12));
    background-color: var(--color-neutral-white, #fff);
    color: var(--color-neutral-solid-gray-800, #1a1a1a);
    font-size: var(--font-size-14, 0.875rem);
    transition:
      background-color 0.15s ease,
      border-color 0.15s ease;

    &:hover:not(:disabled) {
      background-color: var(--color-neutral-solid-gray-50, rgba(0, 0, 0, 0.04));
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
      pointer-events: none;
    }
  }

  &__page-indicator {
    min-width: 4rem;
    text-align: center;
    color: var(--color-neutral-solid-gray-800, #1a1a1a);
    font-variant-numeric: tabular-nums;
  }

  // -------------------- forced-colors -----------------------------------
  @include base.dads-forced-colors {
    .dads-table-control__search-control,
    .dads-table-control__page-size-select,
    .dads-table-control__button {
      border: 1px solid CanvasText;
    }
  }
}
</style>
