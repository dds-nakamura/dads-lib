<script setup lang="ts">
import { computed } from 'vue'
import type { DadsTableProps } from './DadsTable.types'

const props = withDefaults(defineProps<DadsTableProps>(), {
  stickyHeader: false,
  density: 'comfortable',
  bordered: false,
  striped: false,
  loading: false,
  skeletonRowCount: 3,
  skeletonColumnCount: 4,
  loadingLabel: '読み込み中',
})

const skeletonRows = computed(() => Array.from({ length: props.skeletonRowCount }, (_, i) => i))
const skeletonCols = computed(() => Array.from({ length: props.skeletonColumnCount }, (_, i) => i))

const wrapperClasses = computed(() => ({
  'dads-table-wrapper--sticky-header': props.stickyHeader,
}))

// stickyHeader is duplicated on the table so scoped descendant selectors
// (`.dads-table--sticky-header thead th`) can target the pinned cells without
// reaching across the scoping boundary into the wrapper.
const rootClasses = computed(() => [
  `dads-table--${props.density}`,
  {
    'dads-table--sticky-header': props.stickyHeader,
    'dads-table--bordered': props.bordered,
    'dads-table--striped': props.striped,
    'dads-table--loading': props.loading,
  },
])
</script>

<template>
  <div class="dads-table-wrapper" :class="wrapperClasses">
    <table class="dads-table" :class="rootClasses">
      <caption v-if="caption || $slots.caption" class="dads-table__caption">
        <slot name="caption">{{ caption }}</slot>
      </caption>
      <slot v-if="!loading" />
      <tbody v-else class="dads-table__skeleton-body" aria-busy="true" aria-live="polite">
        <tr v-for="row in skeletonRows" :key="row" class="dads-table__skeleton-row">
          <td v-for="col in skeletonCols" :key="col" class="dads-table__skeleton-cell">
            <span class="dads-table__skeleton-bar" aria-hidden="true" />
            <span class="dads-table__sr-only">{{ loadingLabel }}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped lang="scss">
@use '../../styles/base' as base;

.dads-table-wrapper {
  width: 100%;

  // Pinning thead via position: sticky requires a scrolling ancestor.
  // The wrapper provides one only when stickyHeader is enabled, otherwise
  // the table flows in its parent layout untouched.
  &--sticky-header {
    max-height: 100%;
    overflow-y: auto;
  }
}

.dads-table {
  width: 100%;
  border-collapse: collapse;
  font-family: var(--font-family-sans, 'Noto Sans JP', sans-serif);
  color: var(--color-text-primary, #1a1a1a);
  font-size: var(--font-size-16, 1rem);
  line-height: var(--line-height-150, 1.5);

  th,
  td {
    padding: var(--spacing-12, 0.75rem);
    text-align: left;
    border-bottom: 1px solid var(--color-border-default, rgba(0, 0, 0, 0.12));
    vertical-align: top;
  }

  thead th {
    background-color: var(--color-bg-subtle, rgba(0, 0, 0, 0.05));
    font-weight: 700;
  }

  // Caption sits above the table by default; styling keeps it readable
  // without overpowering header cells.
  &__caption {
    caption-side: top;
    padding: var(--spacing-8, 0.5rem) 0;
    text-align: left;
    color: var(--color-text-secondary, #4d4d4d);
    font-size: var(--font-size-14, 0.875rem);
  }

  // ----- density -----------------------------------------------------------
  // `comfortable` matches the base padding above; nothing to override.
  &--compact {
    th,
    td {
      padding: var(--spacing-8, 0.5rem);
      font-size: var(--font-size-14, 0.875rem);
    }
  }

  // ----- sticky-header -----------------------------------------------------
  // z-index keeps the pinned cell above striped row backgrounds during scroll.
  &--sticky-header thead th {
    position: sticky;
    top: 0;
    z-index: 1;
  }

  // ----- bordered ---------------------------------------------------------
  &--bordered {
    border: 1px solid var(--color-border-default, rgba(0, 0, 0, 0.12));
  }

  // ----- striped ----------------------------------------------------------
  // Even-row tint draws from the hover token to stay visually subordinate
  // to true hover/selection states the consumer may layer on top.
  &--striped tbody tr:nth-child(even) {
    background-color: var(--color-bg-hover, rgba(0, 0, 0, 0.04));
  }

  // ----- loading skeleton -------------------------------------------------
  // Replaces the body with placeholder rows that pulse subtly so users see
  // visual progress without reading specific values. We keep the table's
  // structural classes (density, striped, etc.) so transitions on / off
  // loading state don't jitter the layout.
  &__skeleton-bar {
    display: block;
    width: 100%;
    height: 0.875rem;
    border-radius: var(--border-radius-4, 0.25rem);
    background-color: var(--color-bg-subtle, rgba(0, 0, 0, 0.08));
    animation: dads-table-skeleton-pulse 1.4s ease-in-out infinite;
  }

  &__sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  // ----- forced-colors ----------------------------------------------------
  @include base.dads-forced-colors {
    th,
    td {
      border-bottom-color: CanvasText;
    }
    thead th {
      background-color: Canvas;
      color: CanvasText;
    }
    &--bordered {
      border-color: CanvasText;
    }
    &--striped tbody tr:nth-child(even) {
      background-color: Canvas;
    }
  }
}

@keyframes dads-table-skeleton-pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style>
