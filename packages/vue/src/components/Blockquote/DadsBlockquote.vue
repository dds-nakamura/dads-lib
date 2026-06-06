<script setup lang="ts">
import { computed, useSlots } from 'vue'
import type { DadsBlockquoteProps } from './DadsBlockquote.types'

const props = defineProps<DadsBlockquoteProps>()

const slots = useSlots()

// Slot content always wins over the `quote` prop so callers can embed rich
// markup (multiple paragraphs, lists, etc.) — see `multiple-paragraphs.html`
// and `with-list.html` in the HTML reference for the supported shapes.
const useSlot = computed(() => Boolean(slots.default))

// `<cite>` is only emitted when there is something to attribute. Wrapping the
// label in `<a>` is gated on `citeUrl` so a plain string citation (e.g. a book
// title) does not become a dangling empty link.
const hasCite = computed(() => Boolean(props.cite))
const hasCiteUrl = computed(() => Boolean(props.citeUrl))
</script>

<template>
  <div class="dads-blockquote-wrapper">
    <blockquote class="dads-blockquote" :cite="citeUrl">
      <slot v-if="useSlot" />
      <p v-else-if="quote">{{ quote }}</p>
    </blockquote>
    <cite v-if="hasCite" class="dads-blockquote__cite">
      <a v-if="hasCiteUrl" :href="citeUrl" class="dads-blockquote__cite-link">{{ cite }}</a>
      <template v-else>{{ cite }}</template>
    </cite>
  </div>
</template>

<style scoped lang="scss">
@use '../../styles/base' as base;

// The wrapper keeps `<blockquote>` and the trailing `<cite>` as a single block
// so they share the same left indent and break consistently on small screens.
.dads-blockquote-wrapper {
  display: block;
  margin: 0;

  // -------------------- forced colors ------------------------------------
  // In Windows High Contrast mode the tinted left border falls back to the
  // system text color so the visual indent stays detectable.
  @include base.dads-forced-colors {
    .dads-blockquote {
      border-left-color: CanvasText;
      color: CanvasText;
    }

    .dads-blockquote__cite {
      color: CanvasText;
    }

    .dads-blockquote__cite-link {
      color: LinkText;
    }
  }
}

.dads-blockquote {
  // Values mirror the HTML reference (`blockquote.css`):
  //   margin: 0 calc(40 / 16 * 1rem);
  //   border-left: 8px solid var(--color-neutral-solid-gray-536);
  //   padding: 8px 16px 8px 24px;
  margin: 0 calc(40 / 16 * 1rem);
  border-left: calc(8 / 16 * 1rem) solid var(--color-neutral-solid-gray-536, #767676);
  padding-top: calc(8 / 16 * 1rem);
  padding-right: calc(16 / 16 * 1rem);
  padding-bottom: calc(8 / 16 * 1rem);
  padding-left: calc(24 / 16 * 1rem);
  font-family: var(--font-family-sans, 'Noto Sans JP', sans-serif);
  color: var(--color-neutral-solid-gray-800, #1a1a1a);

  // Collapse the leading / trailing margin of the first / last child so the
  // quote sits flush against its own padding, matching the reference CSS.
  > *:first-child {
    margin-top: 0;
  }

  > *:last-child {
    margin-bottom: 0;
  }

  > p {
    margin: 0;
    font-size: var(--font-size-16, 1rem);
    line-height: var(--line-height-170, 1.7);
  }
}

.dads-blockquote__cite {
  display: block;
  margin-top: calc(8 / 16 * 1rem);
  // Indent the attribution to align with the quote text (border + left pad).
  margin-left: calc((40 + 8 + 24) / 16 * 1rem);
  font-style: italic;
  font-size: var(--font-size-14, 0.875rem);
  line-height: var(--line-height-150, 1.5);
  color: var(--color-neutral-solid-gray-700, #595959);
}

.dads-blockquote__cite-link {
  color: var(--color-primitive-blue-1000, #0017c1);
  text-decoration: underline;

  &:hover {
    color: var(--color-primitive-blue-900, #002dc1);
  }
}
</style>
