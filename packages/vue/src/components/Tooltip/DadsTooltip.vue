<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, useId, watch } from 'vue'
import type { DadsTooltipProps } from './DadsTooltip.types'

const props = withDefaults(defineProps<DadsTooltipProps>(), {
  position: 'top',
  openDelay: 0,
  closeDelay: 0,
  disabled: false,
})

// Stable id per instance so two tooltips on the same page don't collide.
const generatedId = useId()
const tooltipId = computed(() => props.id ?? `dads-tooltip-${generatedId}`)

const wrapRef = ref<HTMLElement | null>(null)
const tipRef = ref<HTMLElement | null>(null)
const isOpen = ref(false)
const positionStyle = ref<Record<string, string>>({})

// Module-scoped via closure rather than reactive — these are timer handles
// that the template never reads.
let openTimer: ReturnType<typeof setTimeout> | null = null
let closeTimer: ReturnType<typeof setTimeout> | null = null

const clearTimers = () => {
  if (openTimer !== null) {
    clearTimeout(openTimer)
    openTimer = null
  }
  if (closeTimer !== null) {
    clearTimeout(closeTimer)
    closeTimer = null
  }
}

const open = () => {
  if (props.disabled) return
  isOpen.value = true
}

const close = () => {
  isOpen.value = false
}

const onEnter = () => {
  if (props.disabled) return
  // A pending close from a prior leave should be aborted: the user is back.
  if (closeTimer !== null) {
    clearTimeout(closeTimer)
    closeTimer = null
  }
  if (isOpen.value) return
  if (props.openDelay > 0) {
    openTimer = setTimeout(() => {
      openTimer = null
      open()
    }, props.openDelay)
  } else {
    open()
  }
}

const onLeave = () => {
  // Cancel any pending open: user moved away before the tooltip showed up.
  if (openTimer !== null) {
    clearTimeout(openTimer)
    openTimer = null
  }
  if (!isOpen.value) return
  if (props.closeDelay > 0) {
    closeTimer = setTimeout(() => {
      closeTimer = null
      close()
    }, props.closeDelay)
  } else {
    close()
  }
}

const GAP = 8

const updatePosition = () => {
  const wrap = wrapRef.value
  const tip = tipRef.value
  if (!wrap || !tip) return
  const wrapRect = wrap.getBoundingClientRect()
  const tipRect = tip.getBoundingClientRect()
  const sx = window.scrollX
  const sy = window.scrollY
  let top = 0
  let left = 0
  switch (props.position) {
    case 'top':
      top = wrapRect.top - tipRect.height - GAP
      left = wrapRect.left + wrapRect.width / 2 - tipRect.width / 2
      break
    case 'top-start':
      top = wrapRect.top - tipRect.height - GAP
      left = wrapRect.left
      break
    case 'top-end':
      top = wrapRect.top - tipRect.height - GAP
      left = wrapRect.right - tipRect.width
      break
    case 'bottom':
      top = wrapRect.bottom + GAP
      left = wrapRect.left + wrapRect.width / 2 - tipRect.width / 2
      break
    case 'bottom-start':
      top = wrapRect.bottom + GAP
      left = wrapRect.left
      break
    case 'bottom-end':
      top = wrapRect.bottom + GAP
      left = wrapRect.right - tipRect.width
      break
    case 'left':
      top = wrapRect.top + wrapRect.height / 2 - tipRect.height / 2
      left = wrapRect.left - tipRect.width - GAP
      break
    case 'right':
      top = wrapRect.top + wrapRect.height / 2 - tipRect.height / 2
      left = wrapRect.right + GAP
      break
  }
  positionStyle.value = {
    top: `${top + sy}px`,
    left: `${left + sx}px`,
  }
}

// Recompute position whenever the tooltip is shown — the trigger could have
// moved since the last open (scroll, layout shift, etc.).
watch(isOpen, async (next) => {
  if (next) {
    await nextTick()
    updatePosition()
  }
})

const rootClasses = computed(() => [`dads-tooltip--${props.position}`])

const describedBy = computed(() => (isOpen.value && !props.disabled ? tooltipId.value : undefined))

onBeforeUnmount(() => {
  clearTimers()
})
</script>

<template>
  <span
    ref="wrapRef"
    class="dads-tooltip__trigger-wrap"
    :aria-describedby="describedBy"
    @mouseenter="onEnter"
    @mouseleave="onLeave"
    @focusin="onEnter"
    @focusout="onLeave"
  >
    <slot name="trigger" />
    <Teleport to="body">
      <Transition name="dads-tooltip">
        <div
          v-if="isOpen && !disabled"
          :id="tooltipId"
          ref="tipRef"
          class="dads-tooltip"
          :class="rootClasses"
          role="tooltip"
          :style="positionStyle"
        >
          <div class="dads-tooltip__content">
            <slot>{{ text }}</slot>
          </div>
          <span class="dads-tooltip__arrow" aria-hidden="true" />
        </div>
      </Transition>
    </Teleport>
  </span>
</template>

<style scoped lang="scss">
@use '../../styles/base' as base;

.dads-tooltip__trigger-wrap {
  display: inline-flex;
  // Align around the trigger's baseline so it doesn't disturb surrounding
  // typography (icons, inline buttons, etc.).
  vertical-align: middle;
}

.dads-tooltip {
  position: absolute;
  z-index: 1100;
  max-width: 16rem;
  padding: var(--spacing-8, 0.5rem) var(--spacing-12, 0.75rem);
  background-color: var(--color-bg-inverse, #1a1a1a);
  color: var(--color-text-inverse, #fff);
  border-radius: var(--border-radius-4, 0.25rem);
  font-family: var(--font-family-sans, 'Noto Sans JP', sans-serif);
  font-size: var(--font-size-14, 0.875rem);
  line-height: var(--line-height-150, 1.5);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  pointer-events: none;
  word-break: break-word;

  &__content {
    position: relative;
    z-index: 1;
  }

  // -------------------- arrow --------------------------------------------
  // Rotated square positioned half-outside the bubble. Each modifier slides
  // and re-orients it so the diamond points back at the trigger.
  &__arrow {
    position: absolute;
    width: 0.5rem;
    height: 0.5rem;
    background-color: inherit;
    transform: rotate(45deg);
  }

  // -------------------- top variants -------------------------------------
  &--top &__arrow,
  &--top-start &__arrow,
  &--top-end &__arrow {
    bottom: -0.25rem;
  }

  &--top &__arrow {
    left: 50%;
    margin-left: -0.25rem;
  }

  &--top-start &__arrow {
    left: 0.75rem;
  }

  &--top-end &__arrow {
    right: 0.75rem;
  }

  // -------------------- bottom variants ----------------------------------
  &--bottom &__arrow,
  &--bottom-start &__arrow,
  &--bottom-end &__arrow {
    top: -0.25rem;
  }

  &--bottom &__arrow {
    left: 50%;
    margin-left: -0.25rem;
  }

  &--bottom-start &__arrow {
    left: 0.75rem;
  }

  &--bottom-end &__arrow {
    right: 0.75rem;
  }

  // -------------------- left / right -------------------------------------
  &--left &__arrow {
    right: -0.25rem;
    top: 50%;
    margin-top: -0.25rem;
  }

  &--right &__arrow {
    left: -0.25rem;
    top: 50%;
    margin-top: -0.25rem;
  }

  // -------------------- forced colors ------------------------------------
  @include base.dads-forced-colors {
    border: 1px solid CanvasText;
    background-color: Canvas;
    color: CanvasText;

    &__arrow {
      border: 1px solid CanvasText;
      background-color: Canvas;
    }
  }
}

// -------------------- transition ---------------------------------------
.dads-tooltip-enter-active,
.dads-tooltip-leave-active {
  transition:
    opacity 0.15s ease,
    transform 0.15s ease;
}

.dads-tooltip-enter-from,
.dads-tooltip-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
