<script setup lang="ts">
import type { DadsChipLabelProps } from './DadsChipLabel.types'

withDefaults(defineProps<DadsChipLabelProps>(), {
  color: 'gray',
  appearance: 'text',
})
</script>

<template>
  <span class="dads-chip-label" :data-color="color" :data-style="appearance">
    <span v-if="$slots.prepend" class="dads-chip-label__prepend" aria-hidden="true">
      <slot name="prepend" />
    </span>
    <span class="dads-chip-label__text">
      <slot />
    </span>
    <span v-if="$slots.append" class="dads-chip-label__append" aria-hidden="true">
      <slot name="append" />
    </span>
  </span>
</template>

<style scoped lang="scss">
@use '../../styles/base' as base;

// Ported verbatim from the official example
// (design-system-example-components-html/src/components/chip-label/chip-label.css).
// The component is a 32px-tall, 8px-radius rectangle with a single fixed
// typography. There is no size axis upstream — sizing is intentionally
// constant. The color axis is the 11 primitive hues (`data-color`) and the
// visual treatment is the 4 official styles (`data-style`).
.dads-chip-label {
  display: inline-grid;
  grid-template-columns: auto auto;
  align-items: baseline;
  align-content: center;
  box-sizing: border-box;
  min-height: calc(32 / 16 * 1rem);
  border-radius: calc(8 / 16 * 1rem);
  padding: calc(3 / 16 * 1rem) calc(7 / 16 * 1rem);
  font-weight: normal;
  font-size: calc(16 / 16 * 1rem);
  line-height: 1;
  font-family: var(--font-family-sans, 'Noto Sans JP', sans-serif);
  letter-spacing: 0.02em;
  overflow-wrap: anywhere;
}

.dads-chip-label[data-style='text'] {
  padding: calc(4 / 16 * 1rem) calc(8 / 16 * 1rem);
  color: var(--_text, #000);
}

.dads-chip-label[data-style='outline'] {
  border: 1px solid var(--_non-text, #000);
  color: var(--_text, #000);
}

.dads-chip-label[data-style='filled-outline'] {
  border: 1px solid var(--_non-text, #000);
  background-color: var(--_bg, #eee);
  color: var(--_text-dark, #000);
}

.dads-chip-label[data-style='fill'] {
  border: 1px solid transparent;
  background-color: var(--_non-text, #000);
  color: var(--color-neutral-white, #fff);
}

.dads-chip-label[data-color='gray'] {
  --_non-text: var(--color-neutral-solid-gray-700);
  --_bg: var(--color-neutral-solid-gray-50);
  --_text: var(--color-neutral-solid-gray-800);
  --_text-dark: var(--color-neutral-solid-gray-800);
}

.dads-chip-label[data-color='blue'] {
  --_non-text: var(--color-primitive-blue-700);
  --_bg: var(--color-primitive-blue-50);
  --_text: var(--color-primitive-blue-700);
  --_text-dark: var(--color-primitive-blue-800);
}

.dads-chip-label[data-color='light-blue'] {
  --_non-text: var(--color-primitive-light-blue-800);
  --_bg: var(--color-primitive-light-blue-50);
  --_text: var(--color-primitive-light-blue-800);
  --_text-dark: var(--color-primitive-light-blue-900);
}

.dads-chip-label[data-color='cyan'] {
  --_non-text: var(--color-primitive-cyan-900);
  --_bg: var(--color-primitive-cyan-50);
  --_text: var(--color-primitive-cyan-900);
  --_text-dark: var(--color-primitive-cyan-1000);
}

.dads-chip-label[data-color='green'] {
  --_non-text: var(--color-primitive-green-800);
  --_bg: var(--color-primitive-green-50);
  --_text: var(--color-primitive-green-800);
  --_text-dark: var(--color-primitive-green-900);
}

.dads-chip-label[data-color='lime'] {
  --_non-text: var(--color-primitive-lime-900);
  --_bg: var(--color-primitive-lime-50);
  --_text: var(--color-primitive-lime-900);
  --_text-dark: var(--color-primitive-lime-1000);
}

.dads-chip-label[data-color='yellow'] {
  --_non-text: var(--color-primitive-yellow-1000);
  --_bg: var(--color-primitive-yellow-50);
  --_text: var(--color-primitive-yellow-1000);
  --_text-dark: var(--color-primitive-yellow-1100);
}

.dads-chip-label[data-color='orange'] {
  --_non-text: var(--color-primitive-orange-900);
  --_bg: var(--color-primitive-orange-50);
  --_text: var(--color-primitive-orange-900);
  --_text-dark: var(--color-primitive-orange-1000);
}

.dads-chip-label[data-color='red'] {
  --_non-text: var(--color-primitive-red-900);
  --_bg: var(--color-primitive-red-50);
  --_text: var(--color-primitive-red-900);
  --_text-dark: var(--color-primitive-red-1000);
}

.dads-chip-label[data-color='magenta'] {
  --_non-text: var(--color-primitive-magenta-800);
  --_bg: var(--color-primitive-magenta-50);
  --_text: var(--color-primitive-magenta-800);
  --_text-dark: var(--color-primitive-magenta-900);
}

.dads-chip-label[data-color='purple'] {
  --_non-text: var(--color-primitive-purple-800);
  --_bg: var(--color-primitive-purple-50);
  --_text: var(--color-primitive-purple-800);
  --_text-dark: var(--color-primitive-purple-800);
}

// Icon slots. The official canonical alignment uses a single
// `.dads-chip-label__icon` (24px box, 1cap optical offset). Adopting that exact
// DOM/class is deferred (structural change); here we keep the prepend/append
// slot wrappers and apply the official 4px right gap + currentcolor fill so
// inline-SVG icons inherit the chip color.
.dads-chip-label__prepend,
.dads-chip-label__append,
.dads-chip-label__text {
  display: inline-flex;
  align-items: center;
}

.dads-chip-label__prepend {
  margin-right: calc(4 / 16 * 1rem);
}

.dads-chip-label__append {
  margin-left: calc(4 / 16 * 1rem);
}

.dads-chip-label__prepend :deep(svg),
.dads-chip-label__append :deep(svg) {
  fill: currentcolor;
  flex-shrink: 0;
}

.dads-chip-label[data-style='filled-outline'] .dads-chip-label__prepend,
.dads-chip-label[data-style='filled-outline'] .dads-chip-label__append {
  color: var(--_non-text, #000);
}

.dads-chip-label {
  @include base.dads-forced-colors {
    .dads-chip-label__prepend :deep(svg),
    .dads-chip-label__append :deep(svg) {
      fill: CanvasText;
    }
  }
}
</style>
