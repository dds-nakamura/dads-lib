<script setup lang="ts">
import { computed } from 'vue'
import type { DadsCardEmits, DadsCardProps } from './DadsCard.types'

const props = withDefaults(defineProps<DadsCardProps>(), {
  variant: 'outlined',
  elevation: 1,
  clickable: false,
})

const emit = defineEmits<DadsCardEmits>()

// Elevation modifier is only added for the "elevated" variant; applying it
// to outlined / filled would give them an unwanted shadow.
const rootClasses = computed(() => [
  'dads-card',
  `dads-card--${props.variant}`,
  props.variant === 'elevated' && `dads-card--elevation-${props.elevation}`,
  props.clickable && 'dads-card--clickable',
])

const onActivate = (event: MouseEvent | KeyboardEvent) => {
  if (!props.clickable) return
  emit('click', event)
}

// Native <button> activates on Enter/Space in real browsers, but jsdom (used
// by Vitest) does not synthesize those clicks. Handling keydown explicitly
// makes both environments behave the same.
const onKeydown = (event: KeyboardEvent) => {
  if (!props.clickable) return
  if (event.key === 'Enter' || event.key === ' ' || event.key === 'Spacebar') {
    event.preventDefault()
    onActivate(event)
  }
}
</script>

<template>
  <component
    :is="clickable ? 'button' : 'div'"
    :type="clickable ? 'button' : undefined"
    :class="rootClasses"
    :aria-label="clickable ? ariaLabel : undefined"
    @click="onActivate"
    @keydown="onKeydown"
  >
    <div v-if="$slots.image" class="dads-card__image">
      <slot name="image" />
    </div>
    <header v-if="$slots.header" class="dads-card__header">
      <slot name="header" />
    </header>
    <div class="dads-card__body">
      <slot />
    </div>
    <div v-if="$slots.sub" class="dads-card__sub">
      <slot name="sub" />
    </div>
    <footer v-if="$slots.footer" class="dads-card__footer">
      <slot name="footer" />
    </footer>
  </component>
</template>

<style scoped lang="scss">
@use '../../styles/base' as base;
@use '../../styles/focus-ring' as ring;

.dads-card {
  display: flex;
  flex-direction: column;
  background-color: var(--color-neutral-white, #fff);
  border-radius: var(--border-radius-16, 1rem);
  font-family: var(--font-family-sans, 'Noto Sans JP', sans-serif);
  color: var(--color-neutral-solid-gray-800, #333);
  // Every card carries a visible border per the DADS spec
  // (「コンテナに必ず視認できるボーダー」). Variants only change the color.
  border: 1px solid var(--color-neutral-solid-gray-420, #949494);

  // -------------------- variants ----------------------------------------
  &--outlined {
    border-color: var(--color-neutral-solid-gray-420, #949494);
    transition:
      border-color 0.15s ease,
      box-shadow 0.15s ease;
  }

  &--filled {
    background-color: var(--color-neutral-solid-gray-50, #f2f2f2);
    border-color: var(--color-neutral-solid-gray-420, #949494);
  }

  // The elevated variant relies entirely on the &--elevation-{n} modifier
  // below for its shadow — one of those is always paired with --elevated.

  // Each elevation step references the matching token and falls back to a
  // progressively stronger shadow when the token is undefined.
  &--elevation-1 {
    box-shadow: var(--elevation-1, 0 1px 2px rgba(0, 0, 0, 0.08));
  }
  &--elevation-2 {
    box-shadow: var(--elevation-2, 0 1px 3px rgba(0, 0, 0, 0.12));
  }
  &--elevation-3 {
    box-shadow: var(--elevation-3, 0 2px 4px rgba(0, 0, 0, 0.14));
  }
  &--elevation-4 {
    box-shadow: var(--elevation-4, 0 3px 6px rgba(0, 0, 0, 0.16));
  }
  &--elevation-5 {
    box-shadow: var(--elevation-5, 0 4px 8px rgba(0, 0, 0, 0.18));
  }
  &--elevation-6 {
    box-shadow: var(--elevation-6, 0 6px 12px rgba(0, 0, 0, 0.2));
  }
  &--elevation-7 {
    box-shadow: var(--elevation-7, 0 8px 16px rgba(0, 0, 0, 0.22));
  }
  &--elevation-8 {
    box-shadow: var(--elevation-8, 0 12px 24px rgba(0, 0, 0, 0.24));
  }

  // -------------------- clickable ---------------------------------------
  &--clickable {
    @include base.dads-reset-button;
    @include ring.dads-focus-ring;

    width: 100%;
    text-align: inherit;
    transition:
      background-color 0.15s ease,
      border-color 0.15s ease,
      box-shadow 0.15s ease;

    &:hover {
      background-color: var(--color-neutral-solid-gray-50, #f2f2f2);
    }
  }

  // -------------------- slots / sections --------------------------------
  // Image region (top): no padding so the asset fills the card width.
  // Children (typically <img>) are sized by the caller; we just clip the
  // top corners so they follow the card's border-radius.
  &__image {
    overflow: hidden;
    border-top-left-radius: var(--border-radius-16, 1rem);
    border-top-right-radius: var(--border-radius-16, 1rem);

    > :first-child {
      display: block;
      width: 100%;
      height: auto;
    }
  }

  &__header {
    padding: calc(16 / 16 * 1rem) calc(24 / 16 * 1rem);
    border-bottom: 1px solid var(--color-neutral-solid-gray-420, #949494);
    color: var(--color-neutral-solid-gray-900, #1a1a1a);
    font-weight: bold;
    font-size: calc(20 / 16 * 1rem);
    line-height: var(--line-height-150, 1.5);
    letter-spacing: 0.02em;
  }

  // Sub area (between body and footer). Typically holds a link list or a
  // secondary action group per DADS spec.
  &__sub {
    padding: 0 calc(24 / 16 * 1rem) calc(12 / 16 * 1rem);
    border-top: 1px solid var(--color-neutral-solid-gray-420, #949494);
    padding-top: calc(12 / 16 * 1rem);
  }

  &__body {
    padding: calc(16 / 16 * 1rem) calc(24 / 16 * 1rem);
    flex: 1 1 auto;
    color: var(--color-neutral-solid-gray-800, #333);
    font-size: calc(16 / 16 * 1rem);
    line-height: var(--line-height-170, 1.7);
    letter-spacing: 0.02em;
  }

  &__footer {
    padding: calc(16 / 16 * 1rem) calc(24 / 16 * 1rem);
    border-top: 1px solid var(--color-neutral-solid-gray-420, #949494);
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: calc(8 / 16 * 1rem);
    // Wrap multiple slot children (e.g. an action group + a banner) onto
    // separate rows when the available width can no longer fit them.
    flex-wrap: wrap;

    // On narrow viewports we cannot rely on flex wrap alone — a nested
    // .card-actions group may itself be wider than the screen — so each
    // direct child takes the full row and stacks vertically.
    @media (max-width: 599px) {
      flex-direction: column;
      align-items: stretch;

      > * {
        width: 100%;
      }
    }
  }

  // -------------------- forced colors -----------------------------------
  @include base.dads-forced-colors {
    border: 1px solid CanvasText;

    &__header,
    &__footer {
      border-color: CanvasText;
    }
  }
}
</style>
