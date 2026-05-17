<script setup lang="ts">
import { computed } from 'vue'
import type {
  DadsEmergencyBannerEmits,
  DadsEmergencyBannerProps,
} from './DadsEmergencyBanner.types'

const props = withDefaults(defineProps<DadsEmergencyBannerProps>(), {
  modelValue: true,
  closable: false,
  closeLabel: '閉じる',
  iconName: 'mdi-alert',
  ariaLabel: '緊急情報',
  linkExternal: false,
})

const emit = defineEmits<DadsEmergencyBannerEmits>()

const timestampParts = computed(() => {
  if (props.timestamp === undefined) return null
  if (props.timestamp instanceof Date) {
    return {
      iso: props.timestamp.toISOString(),
      display: props.timestamp.toLocaleString(),
    }
  }
  return { iso: props.timestamp, display: props.timestamp }
})

// The banner is `role="alert"` + `aria-live="assertive"` unconditionally:
// the DADS spec restricts this component to life-or-property emergencies,
// so interrupting the screen reader is always appropriate. Unlike
// NotificationBanner there is no color taxonomy here that would justify
// switching to `polite`.
const onClose = () => {
  emit('update:modelValue', false)
  emit('close')
}
</script>

<template>
  <Transition name="dads-emergency-banner">
    <div
      v-if="modelValue"
      class="dads-emergency-banner"
      role="alert"
      aria-live="assertive"
      :aria-label="ariaLabel"
    >
      <p v-if="timestampParts" class="dads-emergency-banner__timestamp">
        <time :datetime="timestampParts.iso">{{ timestampParts.display }}</time>
      </p>
      <header v-if="title || $slots.title" class="dads-emergency-banner__header">
        <h2 class="dads-emergency-banner__heading">
          <i
            v-if="iconName"
            :class="['mdi', iconName, 'dads-emergency-banner__icon']"
            aria-hidden="true"
          />
          <slot name="title">{{ title }}</slot>
        </h2>
      </header>
      <div class="dads-emergency-banner__body">
        <p class="dads-emergency-banner__message">
          <slot>{{ message }}</slot>
        </p>
      </div>
      <div v-if="linkLabel && linkHref" class="dads-emergency-banner__action">
        <a
          class="dads-emergency-banner__button"
          :href="linkHref"
          :target="linkExternal ? '_blank' : undefined"
          :rel="linkExternal ? 'noopener noreferrer' : undefined"
        >
          {{ linkLabel }}
          <i
            v-if="linkExternal"
            class="mdi mdi-open-in-new dads-emergency-banner__external-icon"
            aria-hidden="true"
          />
          <span v-if="linkExternal" class="dads-emergency-banner__sr-only">
            （新規タブで開く）
          </span>
        </a>
      </div>
      <button
        v-if="closable"
        type="button"
        class="dads-emergency-banner__close"
        :aria-label="closeLabel"
        @click="onClose"
      >
        <i class="mdi mdi-close" aria-hidden="true" />
      </button>
    </div>
  </Transition>
</template>

<style scoped lang="scss">
@use '../../styles/base' as base;
@use '../../styles/focus-ring' as ring;

// The emergency banner pins itself to the top of the viewport and always
// occupies the first row of the page. z-index 9999 keeps it above
// app-level overlays (sticky headers, drawers) but below modals, which is
// the intended DADS layering per the spec.
.dads-emergency-banner {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9999;

  display: grid;
  row-gap: 0.5rem;
  border: 6px solid var(--color-semantic-warning-orange-1, #d97706);
  background-color: var(--color-neutral-white, #fff);
  padding: 0.875rem 0.625rem;
  color: var(--color-neutral-solid-gray-800, #333);
  font-family: var(--font-family-sans, 'Noto Sans JP', sans-serif);
  font-size: 1rem;
  line-height: 1.7;
  letter-spacing: 0.02em;

  @media (min-width: 48rem) {
    row-gap: 1rem;
    padding: 1.625rem;
  }

  &__header {
    display: grid;
    row-gap: 0.5rem;
  }

  &__timestamp {
    margin: 0;
    font-size: var(--font-size-14, 0.875rem);
    color: var(--color-neutral-solid-gray-700, #555);
    line-height: 1.4;
  }

  &__external-icon {
    font-size: 1em;
    line-height: 1;
    margin-inline-start: 0.25rem;
    vertical-align: middle;
  }

  &__sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  &__heading {
    margin: 0;
    font-weight: bold;
    font-size: 1.25rem;
    line-height: 1.5;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    @media (min-width: 48rem) {
      font-size: 1.5rem;
    }
  }

  &__icon {
    color: var(--color-semantic-error-1, #c8102e);
    font-size: 1.5rem;
    line-height: 1;
    flex-shrink: 0;
  }

  &__body {
    display: grid;
    row-gap: 0.5rem;

    @media (min-width: 48rem) {
      row-gap: 1rem;
      font-size: var(--font-size-20, 1.25rem);
      line-height: var(--line-height-150, 1.5);
    }
  }

  &__message {
    margin: 0;
  }

  &__action {
    padding-top: 0.5rem;

    @media (min-width: 48rem) {
      display: flex;
      justify-content: center;
      padding-top: 0.75rem;
      padding-bottom: 0.25rem;
    }
  }

  &__button {
    @include ring.dads-focus-ring;
    position: relative;
    display: block;
    box-sizing: border-box;
    width: 100%;
    border: 2px solid transparent;
    border-radius: 0.75rem;
    background-color: var(--color-semantic-error-1, #c8102e);
    padding: 1.125rem;
    color: var(--color-neutral-white, #fff);
    text-align: center;
    font-weight: bold;
    font-size: 1rem;
    line-height: 1;
    letter-spacing: 0.02em;
    text-decoration: none;

    @media (min-width: 48rem) {
      width: fit-content;
      min-width: 50%;
      border-width: 4px;
      border-radius: 1rem;
      padding: 1.25rem;
    }

    @media (hover: hover) {
      &:hover {
        background-color: var(--color-semantic-error-2, #a30d24);
        text-decoration: underline;
      }
    }

    // White inner border per DADS spec — gives the button a double-line
    // appearance that reads as "danger" even in monochrome contexts.
    &::after {
      position: absolute;
      inset: 0;
      border: 2px solid var(--color-neutral-white, #fff);
      border-radius: 0.625rem;
      content: '';
      pointer-events: none;

      @media (min-width: 48rem) {
        border-width: 4px;
        border-radius: 0.75rem;
      }
    }
  }

  &__close {
    @include base.dads-reset-button;
    @include ring.dads-focus-ring;

    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    border-radius: 0.25rem;
    color: var(--color-neutral-solid-gray-800, #333);
    font-size: 1.25rem;

    &:hover {
      background-color: rgba(0, 0, 0, 0.06);
    }
  }

  // Forced colors: hand control back to the OS so the banner remains
  // visible in high-contrast mode where our tokenised colors are ignored.
  @include base.dads-forced-colors {
    border: 6px solid CanvasText;

    .dads-emergency-banner__button::after {
      inset: 0.25rem;
      border-width: 2px;
      border-radius: 0.5rem;
    }
  }
}

// Soft fade so the appearance/disappearance of a banner-level interrupt
// doesn't visually slam the page. Kept short on purpose: emergencies
// should still feel immediate.
.dads-emergency-banner-enter-active,
.dads-emergency-banner-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.dads-emergency-banner-enter-from,
.dads-emergency-banner-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
