<script setup lang="ts">
import { computed } from 'vue'
import type { DadsDescriptionListProps } from './DadsDescriptionList.types'

const props = withDefaults(defineProps<DadsDescriptionListProps>(), {
  layout: 'vertical',
  marker: 'none',
  bordered: false,
})

// The marker variant is mirrored to `data-marker` on the root <dl> exactly
// like the official DADS HTML reference, so consumers using the framework's
// CSS get the same selectors. The "none" value is intentionally not echoed
// onto the DOM — the absence of the attribute is the default.
const dataMarker = computed(() => (props.marker === 'none' ? undefined : props.marker))

const rootClasses = computed(() => [
  'dads-description-list',
  `dads-description-list--${props.layout}`,
  {
    'dads-description-list--bordered': props.bordered,
  },
])
</script>

<template>
  <dl :class="rootClasses" :data-marker="dataMarker">
    <template v-if="items && items.length > 0">
      <div v-for="(item, index) in items" :key="index" class="dads-description-list__item">
        <dt>{{ item.term }}</dt>
        <dd>{{ item.description }}</dd>
      </div>
    </template>
    <slot v-else />
  </dl>
</template>

<style scoped lang="scss">
@use '../../styles/base' as base;

.dads-description-list {
  // The official example (description-list.css) makes the <dl> itself a grid
  // with an 8px row gap and indents each <dd> by 32px — a single canonical
  // vertical stack. There is no two-column / "horizontal" layout in DADS, so
  // the component now mirrors that single layout exactly.
  margin: calc(16 / 16 * 1rem) 0;
  display: grid;
  gap: calc(8 / 16 * 1rem) 0;
  font-family: var(--font-family-sans, 'Noto Sans JP', sans-serif);
  color: var(--color-neutral-solid-gray-800, #1a1a1a);
  font-size: var(--font-size-16, 1rem);
  line-height: var(--line-height-170, 1.7);
  // Long words (URLs, IDs) should not punch out of the layout.
  overflow-wrap: anywhere;

  dt {
    font-weight: 700;
  }

  // Each pair is a block so <dt>/<dd> stack vertically; <dd> is indented 32px
  // to match the DADS reference (description-list.css:24-26).
  .dads-description-list__item {
    display: block;
  }

  dd {
    margin: 0;
    margin-left: calc(32 / 16 * 1rem);
  }

  // ----- marker: bullet ---------------------------------------------------
  &[data-marker='bullet'] dt {
    margin-left: calc(32 / 16 * 1rem);
    display: list-item;
    list-style-type: disc;
  }

  // ----- marker: custom ---------------------------------------------------
  // Reserve a fixed inline-block slot for the consumer-supplied marker so
  // descriptions visually align with the example regardless of the marker's
  // intrinsic width.
  &[data-marker='custom'] dt > span:first-child {
    display: inline-block;
    min-width: calc(32 / 16 * 1rem);
  }

  // ----- bordered ---------------------------------------------------------
  // Visual separator between items; the last pair is not bordered to avoid
  // a hanging line at the bottom of the list.
  &--bordered {
    .dads-description-list__item {
      padding-bottom: calc(12 / 16 * 1rem);
      border-bottom: 1px solid var(--color-neutral-solid-gray-420, #949494);
    }

    .dads-description-list__item:last-child {
      padding-bottom: 0;
      border-bottom: 0;
    }
  }

  // ----- forced colors ----------------------------------------------------
  @include base.dads-forced-colors {
    &--bordered .dads-description-list__item {
      border-bottom-color: CanvasText;
    }
  }
}
</style>
