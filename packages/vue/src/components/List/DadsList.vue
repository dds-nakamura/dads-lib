<script setup lang="ts">
import { computed } from 'vue'
import type { DadsListItem, DadsListProps } from './DadsList.types'

const props = withDefaults(defineProps<DadsListProps>(), {
  type: 'unordered',
  spacing: '4',
  nestingMarker: true,
})

// The DADS HTML reference uses `data-marker="number"` on the `<ul>` to flip
// the visual treatment for numbered lists. We mirror that attribute so the
// same selectors work whether the consumer styles via tokens or via the
// vendored CSS directly.
const dataMarker = computed(() => (props.type === 'ordered' ? 'number' : undefined))

// Official DADS guidance discourages `<ol>` since the platform's number
// markers aren't exposed as copyable text. Surface a dev warning so callers
// can switch to type='unordered' + pre-rendered numbering when SR copyability
// matters.
if (
  props.type === 'ordered' &&
  (import.meta as ImportMeta & { env?: { DEV?: boolean } }).env?.DEV
) {
  console.warn(
    '[DadsList] type="ordered" は公式 DADS 推奨外です。' +
      '番号がコピー可能なテキストにならないため、type="unordered" + ' +
      'pre-rendered な番号付きラベルの利用を検討してください。',
  )
}

const rootClasses = computed(() => [
  'dads-list',
  `dads-list--spacing-${props.spacing}`,
  {
    'dads-list--no-nesting-marker': !props.nestingMarker,
  },
])

// Helper for templates — items can be plain strings or `DadsListItem`s; this
// normalises both shapes into `{ label, children }` so the template stays
// simple.
const toItem = (entry: string | DadsListItem): DadsListItem =>
  typeof entry === 'string' ? { label: entry } : entry

const hasItems = computed(() => Array.isArray(props.items) && props.items.length > 0)
</script>

<template>
  <component
    :is="type === 'ordered' ? 'ol' : 'ul'"
    :class="rootClasses"
    :data-marker="dataMarker"
    :data-spacing="spacing"
    :start="type === 'ordered' ? start : undefined"
  >
    <template v-if="hasItems">
      <li v-for="(entry, index) in items" :key="index">
        {{ toItem(entry).label }}
        <DadsList
          v-if="toItem(entry).children && toItem(entry).children!.length > 0"
          :type="type"
          :items="toItem(entry).children"
        />
      </li>
    </template>
    <slot v-else />
  </component>
</template>

<style scoped lang="scss">
@use '../../styles/base' as base;

.dads-list {
  margin-top: 0;
  margin-bottom: 0;
  padding-left: calc(32 / 16 * 1rem);
  font-family: var(--font-family-sans, 'Noto Sans JP', sans-serif);
  color: var(--color-neutral-solid-gray-800, #333);
  font-size: var(--font-size-16, 1rem);
  line-height: var(--line-height-150, 1.5);
  // The DADS reference resets list-style-type to `revert` so the browser's
  // default disc / circle / square cascade still kicks in for nested levels.
  list-style-type: revert;
  // Long URLs and identifiers should not break the layout.
  overflow-wrap: anywhere;

  // Per-item vertical rhythm. The DADS reference exposes 4 / 8 / 12px
  // spacing presets via `data-spacing`; the spacing prop selects one.
  &--spacing-4 > li {
    padding-top: calc(4 / 16 * 1rem);
    padding-bottom: calc(4 / 16 * 1rem);
  }
  &--spacing-8 > li {
    padding-top: calc(8 / 16 * 1rem);
    padding-bottom: calc(8 / 16 * 1rem);
  }
  &--spacing-12 > li {
    padding-top: calc(12 / 16 * 1rem);
    padding-bottom: calc(12 / 16 * 1rem);
  }

  // Nested level marker control: when `nestingMarker=false`, force the same
  // marker style on every level (disc only).
  &--no-nesting-marker,
  &--no-nesting-marker .dads-list {
    list-style-type: disc;
  }

  // ----- numbered (data-marker="number") ----------------------------------
  // Numbered lists in the DADS HTML reference use grid + custom <span>
  // markers so the number can be copied as text. We keep the `<ol>` route
  // here (the platform default) but flatten the marker styling so visual
  // alignment with the `<ul data-marker="number">` reference is consistent.
  &[data-marker='number'] {
    padding-left: calc(32 / 16 * 1rem);
    list-style-type: decimal;
  }

  // Nested lists hug the parent's spacing instead of inheriting the default
  // browser margin, matching the official CSS (margin-top: --_spacing,
  // margin-bottom: calc(-1 * --_spacing)). The spacing prop drives the value.
  &--spacing-4 .dads-list {
    margin-top: calc(4 / 16 * 1rem);
    margin-bottom: calc(-4 / 16 * 1rem);
  }
  &--spacing-8 .dads-list {
    margin-top: calc(8 / 16 * 1rem);
    margin-bottom: calc(-8 / 16 * 1rem);
  }
  &--spacing-12 .dads-list {
    margin-top: calc(12 / 16 * 1rem);
    margin-bottom: calc(-12 / 16 * 1rem);
  }

  // ----- forced colors ----------------------------------------------------
  @include base.dads-forced-colors {
    // Bullets / numbers should remain visible in Windows High Contrast.
    color: CanvasText;
  }
}
</style>
