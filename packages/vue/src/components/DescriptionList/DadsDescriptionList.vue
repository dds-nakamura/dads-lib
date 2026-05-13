<script setup lang="ts">
import { computed } from 'vue'
import type { DadsDescriptionListProps } from './DadsDescriptionList.types'

const props = withDefaults(defineProps<DadsDescriptionListProps>(), {
  layout: 'horizontal',
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
  margin: var(--spacing-16, 1rem) 0;
  font-family: var(--font-family-sans, 'Noto Sans JP', sans-serif);
  color: var(--color-text-primary, #1a1a1a);
  font-size: var(--font-size-16, 1rem);
  line-height: var(--line-height-150, 1.5);
  // Long words (URLs, IDs) should not punch out of the layout.
  overflow-wrap: anywhere;

  dt {
    font-weight: 700;
  }

  // Native <dl> default margin on <dd> would push descriptions out by 40px
  // on most engines; the DADS reference normalises this to 32px and the
  // horizontal layout overrides it to 0.
  dd {
    margin: 0;
  }

  // ----- marker: bullet ---------------------------------------------------
  &[data-marker='bullet'] dt {
    margin-left: var(--spacing-32, 2rem);
    display: list-item;
    list-style-type: disc;
  }

  // ----- marker: custom ---------------------------------------------------
  // Reserve a fixed inline-block slot for the consumer-supplied marker so
  // descriptions visually align with the example regardless of the marker's
  // intrinsic width.
  &[data-marker='custom'] dt > span:first-child {
    display: inline-block;
    min-width: var(--spacing-32, 2rem);
  }

  // ----- layout: vertical -------------------------------------------------
  // Each pair is its own block; <dd> stacks under <dt> with a small indent
  // matching the DADS reference (32px).
  &--vertical {
    display: grid;
    gap: var(--spacing-8, 0.5rem) 0;

    .dads-description-list__item {
      display: block;
    }

    dd {
      margin-left: var(--spacing-32, 2rem);
    }
  }

  // ----- layout: horizontal ----------------------------------------------
  // Each item is a two-column grid (term | description) that reflows to a
  // single column on narrow viewports so the layout stays readable on
  // phones.
  &--horizontal {
    display: grid;
    gap: var(--spacing-12, 0.75rem) 0;

    .dads-description-list__item {
      display: grid;
      grid-template-columns: minmax(8rem, 1fr) 3fr;
      gap: var(--spacing-16, 1rem);
      align-items: baseline;
    }

    dd {
      margin: 0;
    }

    @media (max-width: 599px) {
      .dads-description-list__item {
        grid-template-columns: 1fr;
        gap: var(--spacing-4, 0.25rem);
      }

      dd {
        margin-left: var(--spacing-16, 1rem);
      }
    }
  }

  // ----- bordered ---------------------------------------------------------
  // Visual separator between items; the last pair is not bordered to avoid
  // a hanging line at the bottom of the list.
  &--bordered {
    .dads-description-list__item {
      padding-bottom: var(--spacing-12, 0.75rem);
      border-bottom: 1px solid var(--color-border-default, rgba(0, 0, 0, 0.12));
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
