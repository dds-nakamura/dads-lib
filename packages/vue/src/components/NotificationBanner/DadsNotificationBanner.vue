<script setup lang="ts">
import { computed } from 'vue'
import type {
  DadsNotificationBannerColor,
  DadsNotificationBannerEmits,
  DadsNotificationBannerProps,
} from './DadsNotificationBanner.types'

const props = withDefaults(defineProps<DadsNotificationBannerProps>(), {
  modelValue: true,
  color: 'info',
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

const onClose = () => {
  emit('update:modelValue', false)
  emit('close')
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
@use 'sass:list';
@use '../../styles/base' as base;
@use '../../styles/focus-ring' as ring;

// Color table: (foreground, background). Foreground is used for the icon /
// title accent; the body text uses --color-text-primary so it stays legible
// regardless of the tinted background.
$dads-notification-banner-colors: (
  success: (
    --color-success,
    --color-success-bg,
  ),
  error: (
    --color-error,
    --color-error-bg,
  ),
  warning: (
    --color-warning,
    --color-warning-bg,
  ),
  info: (
    --color-info,
    --color-info-bg,
  ),
  neutral: (
    --color-text-secondary,
    --color-bg-subtle,
  ),
);

.dads-notification-banner {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-12, 0.75rem);
  padding: var(--spacing-12, 0.75rem) var(--spacing-16, 1rem);
  border-radius: var(--border-radius-4, 0.25rem);
  border: 1px solid transparent;
  font-family: var(--font-family-sans, 'Noto Sans JP', sans-serif);
  color: var(--color-text-primary, #1a1a1a);
  line-height: var(--line-height-150, 1.5);

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
    margin-top: var(--spacing-4, 0.25rem);
  }

  &__message {
    margin: 0;
    font-size: var(--font-size-14, 0.875rem);
  }

  &__action {
    flex-shrink: 0;
    align-self: center;
  }

  &__close {
    @include base.dads-reset-button;
    @include ring.dads-focus-ring;

    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    border-radius: var(--border-radius-4, 0.25rem);
    color: var(--color-text-secondary, #555);
    font-size: 1.25rem;

    &:hover {
      background-color: rgba(0, 0, 0, 0.06);
    }
  }

  // -------------------- color variants -----------------------------------
  @each $name, $tokens in $dads-notification-banner-colors {
    $fg: list.nth($tokens, 1);
    $bg: list.nth($tokens, 2);

    &--#{$name} {
      background-color: var(#{$bg});
      border-color: var(#{$fg});
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
