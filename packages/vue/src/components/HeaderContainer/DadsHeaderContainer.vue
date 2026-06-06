<script setup lang="ts">
import { computed, useSlots } from 'vue'
import type {
  DadsHeaderContainerEmits,
  DadsHeaderContainerProps,
} from './DadsHeaderContainer.types'

const props = withDefaults(defineProps<DadsHeaderContainerProps>(), {
  sticky: true,
  showMenuToggle: true,
  menuToggleLabel: 'メニューを開く',
  navAriaLabel: 'メインナビゲーション',
  variant: 'wide-full',
})

const emit = defineEmits<DadsHeaderContainerEmits>()

const slots = useSlots()

const rootClasses = computed(() => [
  'dads-header-container',
  `dads-header-container--${props.variant}`,
  { 'dads-header-container--sticky': props.sticky },
])

// Logo is rendered from either the slot (rich content) or the convenience
// props. We render the wrapper only when one of those sources is present.
const hasLogo = computed(() => Boolean(slots.logo) || Boolean(props.logoLabel))

const onMenuClick = (event: MouseEvent) => emit('click:menu', event)
</script>

<template>
  <header :class="rootClasses">
    <div class="dads-header-container__inner">
      <button
        v-if="showMenuToggle"
        type="button"
        class="dads-header-container__menu-toggle"
        :aria-label="menuToggleLabel"
        @click="onMenuClick"
      >
        <i class="mdi mdi-menu" aria-hidden="true" />
      </button>
      <div v-if="hasLogo" class="dads-header-container__logo">
        <slot name="logo">
          <component
            :is="logoHref ? 'a' : 'strong'"
            :href="logoHref"
            class="dads-header-container__logo-text"
          >
            {{ logoLabel }}
          </component>
        </slot>
      </div>
      <nav v-if="$slots.nav" class="dads-header-container__nav" :aria-label="navAriaLabel">
        <slot name="nav" />
      </nav>
      <div v-if="$slots.utility" class="dads-header-container__utility">
        <slot name="utility" />
      </div>
      <div v-if="$slots.actions" class="dads-header-container__actions">
        <slot name="actions" />
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
@use '../../styles/base' as base;
@use '../../styles/focus-ring' as ring;

// Mobile / desktop boundary. The hamburger toggle is hidden at and above
// this width — keep in sync with the spec ("max-width: 768px 想定").
$dads-header-container-breakpoint: 768px;

.dads-header-container {
  background-color: var(--color-neutral-white, #fff);
  border-bottom: 1px solid var(--color-border-default, rgba(0, 0, 0, 0.1));
  font-family: var(--font-family-sans, 'Noto Sans JP', sans-serif);
  color: var(--color-neutral-solid-gray-800, #1a1a1a);

  // -------------------- sticky -------------------------------------------
  &--sticky {
    position: sticky;
    top: 0;
    // Keep the header above scrollable content but below dialog overlays.
    z-index: 100;
  }

  // -------------------- inner layout -------------------------------------
  &__inner {
    display: flex;
    align-items: center;
    gap: calc(16 / 16 * 1rem);
    min-height: 3.5rem; // 56px — comfortable touch target on mobile
    padding: 0 calc(16 / 16 * 1rem);
    margin: 0 auto;
    // The actions slot is pushed by `margin-left: auto`, so flex-wrap on
    // the inner row lets the actions drop onto a second line at sub-768px
    // viewports instead of pushing the document horizontally.
    flex-wrap: wrap;

    @media (max-width: 767px) {
      gap: calc(8 / 16 * 1rem);
      padding: calc(8 / 16 * 1rem) calc(12 / 16 * 1rem);
    }
  }

  // -------------------- variant ------------------------------------------
  // wide-full: full-width, generous height (default flagship layout).
  &--wide-full &__inner {
    max-width: none;
    min-height: 4rem; // 64px
  }

  // wide-slim: full-width but compact height for content-dense apps.
  &--wide-slim &__inner {
    max-width: none;
    min-height: 3rem; // 48px
  }

  // medium: centered content area with a sensible max-width.
  &--medium &__inner {
    max-width: 1280px;
    min-height: 3.5rem; // 56px
  }

  // compact: smallest header, mobile-aligned heights even on desktop.
  &--compact &__inner {
    max-width: none;
    min-height: 2.5rem; // 40px
    padding: 0 calc(12 / 16 * 1rem);
  }

  // -------------------- hamburger menu toggle (mobile only) --------------
  &__menu-toggle {
    @include base.dads-reset-button;
    @include ring.dads-focus-ring;

    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem; // 40px
    height: 2.5rem;
    border-radius: var(--border-radius-4, 0.25rem);
    font-size: 1.5rem;
    color: var(--color-neutral-solid-gray-800, #1a1a1a);
    transition: background-color 0.15s ease;

    &:hover {
      background-color: var(--color-neutral-solid-gray-50, rgba(0, 0, 0, 0.05));
    }

    @media (min-width: #{$dads-header-container-breakpoint}) {
      display: none;
    }
  }

  // -------------------- logo / nav / utility / actions slots ------------
  &__logo {
    display: inline-flex;
    align-items: center;
    flex-shrink: 0;
  }

  &__logo-text {
    display: inline-flex;
    align-items: center;
    color: inherit;
    text-decoration: none;
    font-weight: 700;

    &:hover[href] {
      text-decoration: underline;
    }
  }

  &__nav {
    display: flex;
    align-items: center;
    flex: 1;
    min-width: 0; // allow nav children to truncate instead of overflowing
  }

  // Utility area (utility-links / language-selector / search-box / login).
  // Sits between nav and actions in default markup order. Pushed right when
  // no nav consumes the flex slack.
  &__utility {
    display: inline-flex;
    align-items: center;
    gap: calc(8 / 16 * 1rem);
    flex-shrink: 0;
    flex-wrap: wrap;
    margin-left: auto;

    // compact variant hides utility to keep the header minimal.
    .dads-header-container--compact & {
      display: none;
    }
  }

  &__actions {
    display: inline-flex;
    align-items: center;
    gap: calc(8 / 16 * 1rem);
    flex-shrink: 0;
    flex-wrap: wrap;

    // When utility is rendered, it already consumed the margin-left:auto
    // push, so actions should sit immediately after it (no auto-push).
    .dads-header-container__utility ~ & {
      margin-left: 0;
    }
    // Otherwise (no utility), actions should be pushed to the end.
    margin-left: auto;

    @media (max-width: 767px) {
      gap: calc(4 / 16 * 1rem);
    }
  }

  // -------------------- forced colors ------------------------------------
  @include base.dads-forced-colors {
    border-bottom: 1px solid CanvasText;

    &__menu-toggle {
      border: 1px solid CanvasText;
    }
  }
}
</style>
