<script setup lang="ts">
import { computed } from 'vue'
import type { DadsListItem, DadsListProps } from './DadsList.types'

const props = withDefaults(defineProps<DadsListProps>(), {
  type: 'unordered',
  start: 1,
  spacing: '4',
  nestingMarker: true,
})

// The DADS HTML reference always renders a `<ul>` and flips numbered lists on
// via `data-marker="number"` (it never uses `<ol>`, because the `<ol>` marker
// is not copyable text). We mirror that attribute so the same selectors work
// whether the consumer styles via tokens or via the vendored CSS directly.
const isNumbered = computed(() => props.type === 'ordered')
const dataMarker = computed(() => (isNumbered.value ? 'number' : undefined))

const rootClasses = computed(() => [
  'dads-list',
  `dads-list--spacing-${props.spacing}`,
  {
    'dads-list--no-nesting-marker': !props.nestingMarker,
  },
])

// Helper for templates — items can be plain strings or `DadsListItem`s; this
// normalises both shapes into `{ label, marker?, children }` so the template
// stays simple.
const toItem = (entry: string | DadsListItem): DadsListItem =>
  typeof entry === 'string' ? { label: entry } : entry

// Marker text for a numbered item: an explicit `marker` wins, otherwise we
// generate `'<n>. '` from the item position offset by `start`. The number is
// emitted as plain text inside a `<span>` so it is copyable, per the official
// DADS accessibility guideline (項番はコピー可能なテキストにする / `<ol>` 不使用).
const markerFor = (item: DadsListItem, index: number): string =>
  item.marker ?? `${props.start + index}. `

const hasItems = computed(() => Array.isArray(props.items) && props.items.length > 0)
</script>

<template>
  <ul :class="rootClasses" :data-marker="dataMarker" :data-spacing="spacing">
    <template v-if="hasItems">
      <li v-for="(entry, index) in items" :key="index">
        <template v-if="isNumbered">
          <span class="dads-list__marker">{{ markerFor(toItem(entry), index) }}</span>
          <span>{{ toItem(entry).label }}</span>
        </template>
        <template v-else>{{ toItem(entry).label }}</template>
        <DadsList
          v-if="toItem(entry).children && toItem(entry).children!.length > 0"
          :type="type"
          :start="start"
          :spacing="spacing"
          :nesting-marker="nestingMarker"
          :items="toItem(entry).children"
        />
      </li>
    </template>
    <slot v-else />
  </ul>
</template>

<style scoped lang="scss">
@use '../../styles/base' as base;

// Font and color are intentionally NOT set here: the official DADS list.css
// omits them entirely and relies on inheritance from the surrounding context
// (global.css / parent). Pinning them would diverge from differing parent
// contexts.
.dads-list {
  margin-top: 0;
  margin-bottom: 0;
  padding-left: calc(32 / 16 * 1rem);
  // The DADS reference resets list-style-type to `revert` so the browser's
  // default disc / circle / square cascade still kicks in for nested levels.
  list-style-type: revert;
  // Long URLs and identifiers should not break the layout.
  overflow-wrap: anywhere;

  // Per-item vertical rhythm. The DADS reference drives spacing through a
  // `--_spacing` custom property selected by `data-spacing` (4 / 8 / 12px);
  // the spacing prop selects one. Defining it here (rather than only on `> li`)
  // lets nested lists pick up the same value for their margins.
  &--spacing-4 {
    --_spacing: calc(4 / 16 * 1rem);
  }
  &--spacing-8 {
    --_spacing: calc(8 / 16 * 1rem);
  }
  &--spacing-12 {
    --_spacing: calc(12 / 16 * 1rem);
  }

  & > li {
    padding-top: var(--_spacing, 0);
    padding-bottom: var(--_spacing, 0);
  }

  // Nested level marker control: when `nestingMarker=false`, force the same
  // marker style on every level (disc only).
  &--no-nesting-marker,
  &--no-nesting-marker .dads-list {
    list-style-type: disc;
  }

  // ----- numbered (data-marker="number") ----------------------------------
  // Numbered lists in the DADS HTML reference use grid + subgrid so the number
  // marker (plain copyable text) and the content align across rows. We mirror
  // that layout exactly: a leading column wide enough for the marker, then a
  // 1fr content column.
  &[data-marker='number'] {
    display: grid;
    grid-template-columns: minmax(calc(32 / 16 * 1rem), auto) 1fr;
    padding-left: 0;
    list-style-type: none;
  }

  &[data-marker='number'] > li,
  &[data-marker='number'] > li > a {
    display: grid;
    grid-column: 1 / -1;
    grid-template-columns: inherit;
    align-items: baseline;
  }

  &[data-marker='number'] > li > a > span {
    text-decoration-thickness: inherit;
  }

  // Content (and nested lists) live in the second column; the marker `<span>`
  // stays in the first.
  &[data-marker='number'] > li > :not(a, span) {
    grid-column: 2;
  }

  @supports (grid-template-columns: subgrid) {
    &[data-marker='number'] > li,
    &[data-marker='number'] > li > a {
      grid-template-columns: subgrid;
    }
  }

  // Nested lists hug the parent's spacing instead of inheriting the default
  // browser margin, matching the official CSS exactly:
  //   margin-top: var(--_spacing); margin-bottom: calc(-1 * var(--_spacing));
  // `--_spacing` cascades from the parent's `data-spacing`, so the rhythm
  // follows the spacing prop for every level.
  .dads-list {
    margin-top: var(--_spacing, 0);
    margin-bottom: calc(-1 * var(--_spacing, 0));
  }

  // ----- forced colors ----------------------------------------------------
  @include base.dads-forced-colors {
    // Bullets / numbers should remain visible in Windows High Contrast.
    color: CanvasText;
  }
}
</style>
