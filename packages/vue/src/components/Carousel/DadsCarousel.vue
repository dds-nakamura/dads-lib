<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, useId, watch } from 'vue'
import type { DadsCarouselEmits, DadsCarouselProps } from './DadsCarousel.types'

const props = withDefaults(defineProps<DadsCarouselProps>(), {
  modelValue: 0,
  type: 'key-visual',
  mode: 'single',
  visibleCount: 3,
  headingLevel: 2,
  autoPlay: false,
  interval: 5000,
  pauseOnHover: true,
  showArrows: true,
  showIndicators: true,
  loop: true,
  ariaLabel: 'カルーセル',
  prevSlideAriaLabel: '前のスライド',
  nextSlideAriaLabel: '次のスライド',
  slidePositionAriaLabel: 'スライド位置',
  formatSlideAriaLabel: (idx: number) => `スライド ${idx + 1}`,
})

// Dev-mode warning: official DADS specifies the carousel does NOT auto-play.
// We do not remove the prop (existing callers depend on it) but flag misuse
// so consumers can make an informed choice.
if (props.autoPlay && (import.meta as ImportMeta & { env?: { DEV?: boolean } }).env?.DEV) {
  console.warn(
    '[DadsCarousel] autoPlay は公式 DADS で非推奨です。' +
      'モーション過敏症ユーザーへの配慮として、手動操作を基本とすることを推奨します。',
  )
}

// Container type requires a heading per official spec — warn in dev when the
// caller forgets to pass one so the structural contract is enforceable.
if (
  props.type === 'container' &&
  !props.heading &&
  (import.meta as ImportMeta & { env?: { DEV?: boolean } }).env?.DEV
) {
  console.warn(
    '[DadsCarousel] type="container" は heading プロップを必須とします。' +
      'スライド群を囲むコンテナの見出しを必ず指定してください。',
  )
}

const emit = defineEmits<DadsCarouselEmits>()

defineSlots<{
  default(props: { index: number; isActive: boolean }): unknown
}>()

const generatedId = useId()
const baseId = computed(() => `dads-carousel-${generatedId}`)
const slideId = (idx: number) => `${baseId.value}-slide-${idx}`

const total = computed(() => Math.max(0, props.itemCount))

const clampIndex = (n: number): number => {
  if (total.value === 0) return 0
  if (n < 0) return 0
  if (n >= total.value) return Math.max(0, total.value - 1)
  return n
}

const safeIndex = computed(() => clampIndex(props.modelValue ?? 0))

const goTo = (next: number) => {
  if (total.value === 0) return
  let target: number
  if (props.loop) {
    target = ((next % total.value) + total.value) % total.value
  } else {
    target = clampIndex(next)
  }
  if (target === safeIndex.value) return
  emit('update:modelValue', target)
  emit('change', target)
}

const goNext = () => goTo(safeIndex.value + 1)
const goPrev = () => goTo(safeIndex.value - 1)

const canPrev = computed(() => props.loop || safeIndex.value > 0)
const canNext = computed(() => props.loop || safeIndex.value < total.value - 1)

// -------------------- autoPlay --------------------------------------------
let timerId: ReturnType<typeof setInterval> | null = null
const isPaused = ref(false)

const stopTimer = () => {
  if (timerId !== null) {
    clearInterval(timerId)
    timerId = null
  }
}

const startTimer = () => {
  stopTimer()
  if (!props.autoPlay || isPaused.value || total.value <= 1) return
  timerId = setInterval(() => {
    // When loop is disabled, stop at the last slide instead of wrapping.
    if (!props.loop && safeIndex.value >= total.value - 1) {
      stopTimer()
      return
    }
    goNext()
  }, props.interval)
}

const onMouseEnter = () => {
  if (!props.pauseOnHover) return
  isPaused.value = true
  stopTimer()
}

const onMouseLeave = () => {
  if (!props.pauseOnHover) return
  isPaused.value = false
  startTimer()
}

const onKeydown = (event: KeyboardEvent) => {
  switch (event.key) {
    case 'ArrowRight':
      event.preventDefault()
      goNext()
      break
    case 'ArrowLeft':
      event.preventDefault()
      goPrev()
      break
    default:
      return
  }
}

onMounted(() => {
  startTimer()
})

onBeforeUnmount(() => {
  stopTimer()
})

// Restart the timer whenever autoPlay / interval / item count changes.
watch(
  () => [props.autoPlay, props.interval, total.value],
  () => {
    startTimer()
  },
)

const indices = computed(() => Array.from({ length: total.value }, (_, idx) => idx))

const rootClasses = computed(() => [
  'dads-carousel',
  `dads-carousel--type-${props.type}`,
  `dads-carousel--mode-${props.mode}`,
])

const headingTag = computed(() => `h${props.headingLevel}` as const)

const hasShowAll = computed(() => Boolean(props.showAllLabel) && Boolean(props.showAllHref))

const isMulti = computed(() => props.mode === 'multi')

// Visible count clamped to [1, total]. In single mode we hard-code 1 so the
// viewport math below stays a single source of truth for both modes.
const effectiveVisible = computed(() => {
  if (!isMulti.value) return 1
  return Math.max(1, Math.min(props.visibleCount, total.value || 1))
})

// CSS custom properties drive the multi-mode layout: each slide gets a
// flex-basis of (100% / visible) and the track translates by (index * basis).
const multiTrackStyle = computed<Record<string, string> | undefined>(() => {
  if (!isMulti.value) return undefined
  return {
    '--dads-carousel-visible': String(effectiveVisible.value),
    transform: `translateX(calc(-${safeIndex.value} * (100% / var(--dads-carousel-visible))))`,
  }
})

const slideClasses = (idx: number) => [
  'dads-carousel__slide',
  {
    'dads-carousel__slide--active': idx === safeIndex.value,
  },
]

const indicatorClasses = (idx: number) => [
  'dads-carousel__indicator',
  {
    'dads-carousel__indicator--active': idx === safeIndex.value,
  },
]

const onIndicatorClick = (idx: number) => goTo(idx)

const slideAriaLabel = (idx: number) => `${idx + 1} / ${total.value}`
</script>

<template>
  <section
    :class="rootClasses"
    :aria-label="ariaLabel"
    aria-roledescription="carousel"
    tabindex="0"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
    @keydown="onKeydown"
  >
    <header v-if="heading || hasShowAll" class="dads-carousel__header">
      <component :is="headingTag" v-if="heading" class="dads-carousel__heading">
        {{ heading }}
      </component>
      <a v-if="hasShowAll" :href="showAllHref" class="dads-carousel__show-all">
        {{ showAllLabel }}
      </a>
    </header>
    <div class="dads-carousel__viewport" aria-live="polite">
      <div class="dads-carousel__track" :style="multiTrackStyle">
        <div
          v-for="idx in indices"
          :id="slideId(idx)"
          :key="idx"
          role="group"
          aria-roledescription="slide"
          :aria-label="slideAriaLabel(idx)"
          :aria-hidden="!isMulti && idx !== safeIndex ? 'true' : undefined"
          :class="slideClasses(idx)"
        >
          <slot :index="idx" :is-active="idx === safeIndex" />
        </div>
      </div>
    </div>

    <button
      v-if="showArrows && total > 1"
      type="button"
      class="dads-carousel__arrow dads-carousel__arrow--prev"
      :aria-label="prevSlideAriaLabel"
      :disabled="!canPrev || undefined"
      @click="goPrev"
    >
      <span aria-hidden="true">‹</span>
    </button>
    <button
      v-if="showArrows && total > 1"
      type="button"
      class="dads-carousel__arrow dads-carousel__arrow--next"
      :aria-label="nextSlideAriaLabel"
      :disabled="!canNext || undefined"
      @click="goNext"
    >
      <span aria-hidden="true">›</span>
    </button>

    <div
      v-if="showIndicators && total > 1"
      class="dads-carousel__indicators"
      role="tablist"
      :aria-label="slidePositionAriaLabel"
    >
      <button
        v-for="idx in indices"
        :key="idx"
        type="button"
        role="tab"
        :aria-selected="idx === safeIndex"
        :aria-controls="slideId(idx)"
        :aria-label="formatSlideAriaLabel(idx)"
        :class="indicatorClasses(idx)"
        @click="onIndicatorClick(idx)"
      >
        <span class="dads-carousel__indicator-dot" aria-hidden="true" />
      </button>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '../../styles/base' as base;
@use '../../styles/focus-ring' as ring;

.dads-carousel {
  @include ring.dads-focus-ring;

  position: relative;
  display: block;
  width: 100%;
  background-color: var(--color-neutral-white, #fff);
  border-radius: var(--border-radius-8, 0.5rem);
  overflow: hidden;
  font-family: var(--font-family-sans, 'Noto Sans JP', sans-serif);
  color: var(--color-neutral-solid-gray-800, #1a1a1a);

  // -------------------- type variants -----------------------------------
  // key-visual (default): full-bleed flagship area. No outer chrome — slide
  // content owns its own visual composition.
  // container: bounded panel with a header section above the viewport.
  &--type-container {
    border: 1px solid var(--color-neutral-solid-gray-420, #d6d6d6);
  }

  // -------------------- header (heading + show-all) ---------------------
  // Only rendered when at least one of heading or showAllLabel/Href is set.
  &__header {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: calc(8 / 16 * 1rem);
    padding: calc(16 / 16 * 1rem);
    border-bottom: 1px solid var(--color-neutral-solid-gray-420, #d6d6d6);

    .dads-carousel--type-key-visual & {
      // For key-visual type the header is optional and sits without divider.
      border-bottom: 0;
      padding-bottom: 0;
    }
  }

  &__heading {
    margin: 0;
    font-size: var(--font-size-20, 1.25rem);
    font-weight: 700;
    line-height: var(--line-height-130, 1.3);
  }

  &__show-all {
    color: var(--color-primitive-blue-900, #0017c1);
    text-decoration: underline;
    text-underline-offset: 2px;
    font-size: var(--font-size-14, 0.875rem);
    white-space: nowrap;

    &:hover {
      text-decoration: underline;
    }
  }

  // -------------------- viewport / slides --------------------------------
  &__viewport {
    position: relative;
    width: 100%;
    overflow: hidden;
  }

  // Track wraps every slide in a horizontal flex row. The single-mode CSS
  // relies on display: none for inactive slides and never reads the track's
  // own layout. Multi mode flips the track to flex and translates it.
  &__track {
    width: 100%;
  }

  &__slide {
    display: none;
    width: 100%;

    &--active {
      display: block;
    }
  }

  // -------------------- multi-mode layout --------------------------------
  // Render every slide in a flex row, each with a flex-basis derived from
  // --dads-carousel-visible (set inline). Translate the track to scroll the
  // active slide into view. Smooth transition makes the next/prev arrows
  // feel like a real horizontal scroll without manual scroll handling.
  &--mode-multi &__track {
    display: flex;
    transition: transform 0.25s ease;
    will-change: transform;
  }

  &--mode-multi &__slide {
    display: block;
    flex: 0 0 calc(100% / var(--dads-carousel-visible, 1));
    width: auto;
  }

  // -------------------- arrow buttons ------------------------------------
  &__arrow {
    @include base.dads-reset-button;
    @include ring.dads-focus-ring;

    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 2.75rem; // 44px hit-target
    height: 2.75rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: var(--font-size-24, 1.5rem);
    line-height: 1;
    color: var(--color-neutral-solid-gray-800, #1a1a1a);
    background-color: var(--color-neutral-white, rgba(255, 255, 255, 0.85));
    border: 1px solid var(--color-neutral-solid-gray-420, #d6d6d6);
    border-radius: 50%;
    transition: background-color 0.15s ease;

    &:hover {
      background-color: var(--color-neutral-solid-gray-50, rgba(0, 0, 0, 0.04));
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.4;
      pointer-events: none;
    }

    &--prev {
      left: calc(8 / 16 * 1rem);
    }

    &--next {
      right: calc(8 / 16 * 1rem);
    }
  }

  // -------------------- indicators ---------------------------------------
  &__indicators {
    display: flex;
    justify-content: center;
    gap: calc(8 / 16 * 1rem);
    padding: calc(8 / 16 * 1rem);
  }

  &__indicator {
    @include base.dads-reset-button;
    @include ring.dads-focus-ring;

    width: 1.25rem;
    height: 1.25rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
  }

  &__indicator-dot {
    display: block;
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background-color: var(--color-border-strong, rgba(0, 0, 0, 0.24));
    transition: background-color 0.15s ease;
  }

  &__indicator--active &__indicator-dot {
    background-color: var(--color-primitive-blue-900, #0017c1);
  }

  // -------------------- forced colors ------------------------------------
  @include base.dads-forced-colors {
    .dads-carousel__arrow {
      border-color: CanvasText;
      color: CanvasText;
      background-color: Canvas;
    }

    .dads-carousel__indicator-dot {
      background-color: CanvasText;
    }

    .dads-carousel__indicator--active .dads-carousel__indicator-dot {
      background-color: Highlight;
    }
  }
}
</style>
