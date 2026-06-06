<script setup lang="ts">
import { computed, onMounted } from 'vue'
import type {
  DadsNotificationBannerColor,
  DadsNotificationBannerEmits,
  DadsNotificationBannerProps,
} from './DadsNotificationBanner.types'

const props = withDefaults(defineProps<DadsNotificationBannerProps>(), {
  modelValue: true,
  color: 'info',
  style: 'standard',
  closable: true,
  closeLabel: '閉じる',
})

const emit = defineEmits<DadsNotificationBannerEmits>()

// Default mdi icons per color. The slot `icon` always wins, so this only
// matters when the consumer hasn't supplied one.
const DEFAULT_ICONS: Record<DadsNotificationBannerColor, string> = {
  success: 'mdi-check-circle',
  error: 'mdi-alert-circle',
  warning: 'mdi-alert',
  info: 'mdi-information',
  neutral: 'mdi-bell',
}

const defaultIconClass = computed(() => DEFAULT_ICONS[props.color])

const rootClasses = computed(() => [
  'dads-notification-banner',
  `dads-notification-banner--${props.color}`,
  `dads-notification-banner--style-${props.style}`,
])

// `alert` interrupts assistive tech right away; `status` waits until the user
// is idle. Use `alert` for errors and warnings (action required), and `status`
// for everything else (informational).
const ariaRole = computed(() =>
  props.color === 'error' || props.color === 'warning' ? 'alert' : 'status',
)

// Errors are the only state worth interrupting screen-reader output for.
// Warnings still use `polite` so they don't talk over the user's current task.
const ariaLive = computed(() => (props.color === 'error' ? 'assertive' : 'polite'))

// Resolve the timestamp into ISO + display strings exactly once per value
// change. Strings are passed through verbatim (caller decides format).
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

// localStorage persistence — opt-in via persistKey. Run on mount so SSR-
// rendered pages don't touch window.
onMounted(() => {
  if (!props.persistKey) return
  if (typeof window === 'undefined') return
  try {
    if (window.localStorage.getItem(props.persistKey) === 'closed') {
      emit('update:modelValue', false)
    }
  } catch {
    // localStorage can throw in privacy-restricted contexts (e.g. Safari
    // private browsing). Silently fall back to in-memory state.
  }
})

const onClose = () => {
  emit('update:modelValue', false)
  emit('close')
  if (props.persistKey && typeof window !== 'undefined') {
    try {
      window.localStorage.setItem(props.persistKey, 'closed')
    } catch {
      // See onMounted comment.
    }
  }
}
</script>

<template>
  <Transition name="dads-notification-banner">
    <div v-if="modelValue" :class="rootClasses" :role="ariaRole" :aria-live="ariaLive">
      <span class="dads-notification-banner__icon" aria-hidden="true">
        <slot name="icon">
          <i :class="['mdi', defaultIconClass]" />
        </slot>
      </span>
      <div class="dads-notification-banner__content">
        <p v-if="title" class="dads-notification-banner__title">
          {{ title }}
        </p>
        <p v-if="message || $slots.default" class="dads-notification-banner__message">
          <slot>{{ message }}</slot>
        </p>
        <p v-if="timestampParts" class="dads-notification-banner__timestamp">
          <time :datetime="timestampParts.iso">{{ timestampParts.display }}</time>
        </p>
      </div>
      <div v-if="$slots.action" class="dads-notification-banner__action">
        <slot name="action" />
      </div>
      <button
        v-if="closable"
        type="button"
        class="dads-notification-banner__close"
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

// Accent color per type. The official notification banner uses a white
// background for every type and conveys the type purely through the border /
// icon / title accent color (`--_base-color`). The body text stays
// --color-neutral-solid-gray-800 so it is always legible.
// All tokens below are real DADS tokens (no `--color-*-bg` / `--color-info`
// pseudo-tokens, which do not exist in the design system).
$dads-notification-banner-colors: (
  success: --color-semantic-success-2,
  error: --color-semantic-error-1,
  warning: --color-semantic-warning-yellow-2,
  info: --color-primitive-blue-900,
  neutral: --color-neutral-solid-gray-536,
);

.dads-notification-banner {
  display: flex;
  align-items: flex-start;
  gap: calc(16 / 16 * 1rem);
  padding: calc(12 / 16 * 1rem) calc(16 / 16 * 1rem);
  border-radius: var(--border-radius-12, 0.75rem);
  border: solid transparent;
  border-width: calc(3 / 16 * 1rem); // official: standard border = 3px
  background-color: var(--color-neutral-white, #fff);
  font-family: var(--font-family-sans, 'Noto Sans JP', sans-serif);
  color: var(--color-neutral-solid-gray-800, #1a1a1a);
  line-height: var(--line-height-170, 1.7);
  letter-spacing: 0.02em;

  &__icon {
    display: inline-flex;
    align-items: center;
    flex-shrink: 0;
    font-size: 1.25rem;
    line-height: 1;
    margin-top: 0.125rem; // optical alignment with first text line
  }

  &__content {
    flex: 1 1 auto;
    min-width: 0;
  }

  &__title {
    margin: 0;
    font-weight: 700;
    font-size: var(--font-size-16, 1rem);
  }

  // When both title and message render, give the message a small offset so
  // the two lines don't collapse together.
  &__title + &__message {
    margin-top: calc(4 / 16 * 1rem);
  }

  &__message {
    margin: 0;
    font-size: var(--font-size-14, 0.875rem);
  }

  &__timestamp {
    margin: calc(4 / 16 * 1rem) 0 0;
    font-size: var(--font-size-14, 0.875rem);
    color: var(--color-neutral-solid-gray-700, #4d4d4d);
    line-height: 1.4;
  }

  &__action {
    flex-shrink: 0;
    align-self: center;
  }

  &__close {
    @include base.dads-reset-button;
    @include ring.dads-focus-ring-fill;

    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    border-radius: var(--border-radius-8, 0.5rem); // official close = 8px
    color: var(--color-neutral-solid-gray-900, #1a1a1c);
    font-size: 1.25rem;

    &:hover {
      background-color: var(--color-neutral-solid-gray-50, #f3f4f5);
    }
  }

  // -------------------- color variants -----------------------------------
  @each $name, $fg in $dads-notification-banner-colors {
    // standard style: white background (from base) with a colored border.
    &--style-standard.dads-notification-banner--#{$name} {
      border-color: var(#{$fg});
    }

    // color-chip style: white background with a 2px border and a vertical
    // color bar on the inline-start edge rendered as an inset box-shadow,
    // matching the official 8px (SP) accent. Border stays 2px (official).
    &--style-color-chip.dads-notification-banner--#{$name} {
      border-color: var(--color-neutral-solid-gray-420, #d6d6d6);
      border-width: calc(2 / 16 * 1rem);
      box-shadow: inset calc(8 / 16 * 1rem) 0 0 0 var(#{$fg});
      padding-inline-start: calc(24 / 16 * 1rem);
    }

    &--#{$name} .dads-notification-banner__icon,
    &--#{$name} .dads-notification-banner__title {
      color: var(#{$fg});
    }
  }

  // -------------------- forced colors -----------------------------------
  @include base.dads-forced-colors {
    border: 1px solid CanvasText;
  }
}

// -------------------- transition --------------------------------------
.dads-notification-banner-enter-active,
.dads-notification-banner-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.dads-notification-banner-enter-from,
.dads-notification-banner-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
