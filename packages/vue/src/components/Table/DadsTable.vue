<script setup lang="ts">
import { computed, useSlots } from 'vue'
import type { DadsTableBorder, DadsTableProps } from './DadsTable.types'

const props = withDefaults(defineProps<DadsTableProps>(), {
  dense: false,
  striped: false,
  hoverable: false,
  selectable: false,
  cellBorder: false,
  border: false,
})

const slots = useSlots()

// Caption can be supplied via prop or the `caption` slot. Either one promotes
// the root element to a <figure> (official with-caption.html structure).
const hasCaption = computed(() => Boolean(props.caption) || Boolean(slots.caption))
const rootTag = computed(() => (hasCaption.value ? 'figure' : 'div'))

// Container-level data attributes mirror the official boolean attributes
// (`data-size="dense"`, `data-row-stripe`, `data-row-hover-highlight`,
// `data-selectable`). Vue omits attributes bound to `undefined`/`false`,
// so we map "off" to undefined and "on" boolean attrs to an empty string.
const containerAttrs = computed(() => ({
  'data-size': props.dense ? 'dense' : undefined,
  'data-row-stripe': props.striped ? '' : undefined,
  'data-row-hover-highlight': props.hoverable ? '' : undefined,
  'data-selectable': props.selectable ? '' : undefined,
}))

// Normalize the string/boolean border API to the official attribute value:
//   false / undefined → undefined (attribute omitted)
//   true / ''         → '' (all edges, official empty-string form)
//   'bottom' etc.     → the string verbatim (space-separated edge keywords)
const normalizeBorder = (value: DadsTableBorder | undefined): string | undefined => {
  if (value === false || value === undefined) return undefined
  if (value === true) return ''
  return value
}

const tableAttrs = computed(() => ({
  'data-cell-border': normalizeBorder(props.cellBorder),
  'data-border': normalizeBorder(props.border),
}))
</script>

<template>
  <component :is="rootTag" class="dads-table" v-bind="containerAttrs">
    <figcaption v-if="hasCaption" class="dads-table__caption">
      <slot name="caption">{{ caption }}</slot>
    </figcaption>
    <table class="dads-table__table" v-bind="tableAttrs">
      <slot />
    </table>
  </component>
</template>

<style scoped lang="scss">
@use '../../styles/base' as base;

// =============================================================================
// Reproduced verbatim from the official table.css. Token references keep the
// official primitives; comma fallbacks preserve rendering when tokens are
// absent. No --spacing-* tokens (they do not exist upstream); calc(N/16*1rem).
//
// The table body (thead/tbody/th/td and the official header-cell classes) is
// supplied by the consumer through the default slot, so every selector that
// reaches into it is wrapped in :deep() to cross the scoping boundary.
// =============================================================================

.dads-table {
  --_border-color: var(--color-neutral-solid-gray-420, #949494);
  --_padding: calc(20 / 16 * 1rem) calc(16 / 16 * 1rem);
  margin: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  row-gap: calc(16 / 16 * 1rem);
  color: var(--color-neutral-solid-gray-800, #333333);
  font-weight: normal;
  font-size: calc(16 / 16 * 1rem);
  line-height: 1.7;
  font-family: var(--font-family-sans, 'Noto Sans JP', sans-serif);
  letter-spacing: 0.02em;

  &[data-size='dense'] {
    --_padding: calc(12 / 16 * 1rem) calc(16 / 16 * 1rem);
    line-height: 1.3;
  }

  // Caption lives in the component's own template — no :deep() needed.
  &__caption {
    font-weight: bold;
    font-size: calc(17 / 16 * 1rem);
  }

  // The <table> is in the component template; its cells / header classes come
  // from the slot, hence :deep() on the descendant parts.
  &__table {
    border-collapse: collapse;

    :deep(:is(td, th)) {
      padding: var(--_padding);
      text-align: left;
      vertical-align: baseline;
    }

    :deep(th) {
      font-weight: bold;
    }
  }

  :deep(.dads-table__col-header) {
    --_border-color: var(--color-neutral-solid-gray-500, #7f7f7f);
    background-color: var(--color-neutral-solid-gray-100, #e6e6e6);
    color: var(--color-neutral-solid-gray-900, #1a1a1a);
  }

  :deep(.dads-table__row-header) {
    --_border-color: var(--color-neutral-solid-gray-500, #7f7f7f);
    background-color: var(--color-neutral-solid-gray-100, #e6e6e6);
    color: var(--color-neutral-solid-gray-900, #1a1a1a);
  }

  // ----- Stripe -----------------------------------------------------------
  &[data-row-stripe] {
    --_border-color: var(--color-neutral-solid-gray-500, #7f7f7f);

    :deep(tr:nth-child(even)) {
      background-color: var(--color-neutral-solid-gray-50, #f2f2f2);
    }
  }

  // ----- Hover highlight ---------------------------------------------------
  &[data-row-hover-highlight] {
    --_border-color: var(--color-neutral-solid-gray-500, #7f7f7f);
  }

  @media (hover: hover) {
    &[data-row-hover-highlight] :deep(tr:hover) {
      background-color: var(--color-primitive-blue-50, #e8f1fe);
    }
  }

  // ----- Selectable (checkbox) --------------------------------------------
  &[data-selectable] {
    --_border-color: var(--color-neutral-solid-gray-500, #7f7f7f);

    :deep(tr:has(:checked)) {
      background-color: var(--color-primitive-blue-100, #d9e6ff);
    }
  }

  // ----- Utilities (edge borders, width, layout, bg) ----------------------
  // The data-* hooks live on slotted descendants (the <table>, <tbody>, <td>…).
  :deep([data-width='full']) {
    width: 100%;
  }

  :deep([data-layout='fixed']) {
    table-layout: fixed;
  }

  :deep([data-cell-border=''] :where(td, th)) {
    border: 1px solid var(--_border-color);
  }

  :deep([data-cell-border~='top'] :where(td, th)) {
    border-top: 1px solid var(--_border-color);
  }

  :deep([data-cell-border~='right'] :where(td, th)) {
    border-right: 1px solid var(--_border-color);
  }

  :deep([data-cell-border~='bottom'] :where(td, th)) {
    border-bottom: 1px solid var(--_border-color);
  }

  :deep([data-cell-border~='left'] :where(td, th)) {
    border-left: 1px solid var(--_border-color);
  }

  :deep([data-border='']) {
    border: 1px solid var(--_border-color);
  }

  :deep([data-border~='top']) {
    border-top: 1px solid var(--_border-color);
  }

  :deep([data-border~='right']) {
    border-right: 1px solid var(--_border-color);
  }

  :deep([data-border~='bottom']) {
    border-bottom: 1px solid var(--_border-color);
  }

  :deep([data-border~='left']) {
    border-left: 1px solid var(--_border-color);
  }

  :deep([data-border='hidden']) {
    border-style: hidden;
  }

  :deep([data-border~='top-hidden']) {
    border-top-style: hidden;
  }

  :deep([data-border~='right-hidden']) {
    border-right-style: hidden;
  }

  :deep([data-border~='bottom-hidden']) {
    border-bottom-style: hidden;
  }

  :deep([data-border~='left-hidden']) {
    border-left-style: hidden;
  }

  :deep([data-bg='white']) {
    background-color: var(--color-neutral-white, #ffffff);
  }

  :deep([data-bg='solid-gray-50']) {
    --_border-color: var(--color-neutral-solid-gray-500, #7f7f7f);
    background-color: var(--color-neutral-solid-gray-50, #f2f2f2);
  }

  :deep([data-bg='solid-gray-100']) {
    --_border-color: var(--color-neutral-solid-gray-500, #7f7f7f);
    background-color: var(--color-neutral-solid-gray-100, #e6e6e6);
  }

  :deep([data-bg='transparent']) {
    background-color: transparent;
  }

  // ----- Header cell black emphasis border --------------------------------
  // Symbolic 1px solid black under the last header row's column headers and at
  // the right edge of row headers. Must take precedence over [data-cell-border].
  :deep(:last-of-type > .dads-table__col-header) {
    border-bottom: 1px solid var(--color-neutral-black, #000000);
  }

  :deep(.dads-table__row-header:last-of-type) {
    border-right: 1px solid var(--color-neutral-black, #000000);
  }

  // ----- forced-colors ----------------------------------------------------
  @include base.dads-forced-colors {
    --_border-color: CanvasText;

    :deep(.dads-table__col-header),
    :deep(.dads-table__row-header) {
      background-color: Canvas;
      color: CanvasText;
    }

    :deep(:last-of-type > .dads-table__col-header) {
      border-bottom-color: CanvasText;
    }

    :deep(.dads-table__row-header:last-of-type) {
      border-right-color: CanvasText;
    }

    &[data-row-stripe] :deep(tr:nth-child(even)) {
      background-color: Canvas;
    }
  }
}
</style>
