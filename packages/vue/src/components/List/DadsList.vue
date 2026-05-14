<script setup lang="ts">
import { computed } from 'vue'
import type { DadsListItem, DadsListProps } from './DadsList.types'

const props = withDefaults(defineProps<DadsListProps>(), {
  type: 'unordered',
})

// The DADS HTML reference uses `data-marker="number"` on the `<ul>` to flip
// the visual treatment for numbered lists. We mirror that attribute so the
// same selectors work whether the consumer styles via tokens or via the
// vendored CSS directly.
const dataMarker = computed(() => (props.type === 'ordered' ? 'number' : undefined))

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
    class="dads-list"
    :data-marker="dataMarker"
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
  padding-left: var(--spacing-32, 2rem);
  font-family: var(--font-family-sans, 'Noto Sans JP', sans-serif);
  color: var(--color-text-primary, #1a1a1a);
  font-size: var(--font-size-16, 1rem);
  line-height: var(--line-height-150, 1.5);
  // The DADS reference resets list-style-type to `revert` so the browser's
  // default disc / circle / square cascade still kicks in for nested levels.
  list-style-type: revert;
  // Long URLs and identifiers should not break the layout.
  overflow-wrap: anywhere;

  // Per-item vertical rhythm. The DADS reference exposes 4 / 8 / 12px
  // spacing presets via `data-spacing`; we default to the densest preset
  // (4px) so the component matches the reference out of the box.
  > li {
    padding-top: var(--spacing-4, 0.25rem);
    padding-bottom: var(--spacing-4, 0.25rem);
  }

  // ----- numbered (data-marker="number") ----------------------------------
  // Numbered lists in the DADS HTML reference use grid + custom <span>
  // markers so the number can be copied as text. We keep the `<ol>` route
  // here (the platform default) but flatten the marker styling so visual
  // alignment with the `<ul data-marker="number">` reference is consistent.
  &[data-marker='number'] {
    padding-left: var(--spacing-32, 2rem);
    list-style-type: decimal;
  }

  // Nested lists hug the parent's spacing instead of inheriting the default
  // browser margin, matching the official CSS.
  .dads-list {
    margin-top: var(--spacing-4, 0.25rem);
    margin-bottom: 0;
  }

  // ----- forced colors ----------------------------------------------------
  @include base.dads-forced-colors {
    // Bullets / numbers should remain visible in Windows High Contrast.
    color: CanvasText;
  }
}
</style>
