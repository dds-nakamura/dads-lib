<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, useId, watch } from 'vue'
import type {
  DadsImageSliderEmits,
  DadsImageSliderProps,
  DadsImageSliderSlide,
} from './DadsImageSlider.types'

const props = withDefaults(defineProps<DadsImageSliderProps>(), {
  modelValue: 0,
  autoPlay: false,
  interval: 5000,
  pauseOnHover: true,
  showArrows: true,
  showIndicators: true,
  loop: true,
  ariaLabel: 'イメージスライダー',
  headingLevel: 2,
})

const headingTag = computed(() => `h${props.headingLevel}` as const)
const hasShowAll = computed(() => Boolean(props.showAllLabel) && Boolean(props.showAllHref))
const hasHeader = computed(() => Boolean(props.heading) || hasShowAll.value)

const emit = defineEmits<DadsImageSliderEmits>()

const generatedId = useId()
const baseId = computed(() => `dads-image-slider-${generatedId}`)
const slideId = (idx: number) => `${baseId.value}-slide-${idx}`

const total = computed(() => props.slides.length)

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

// Restart the timer whenever autoPlay / interval / slide count changes.
watch(
  () => [props.autoPlay, props.interval, total.value],
  () => {
    startTimer()
  },
)

const indicatorClasses = (idx: number) => [
  'dads-image-slider__indicator',
  {
    'dads-image-slider__indicator--active': idx === safeIndex.value,
  },
]

const slideClasses = (idx: number) => [
  'dads-image-slider__slide',
  {
    'dads-image-slider__slide--active': idx === safeIndex.value,
  },
]

const onIndicatorClick = (idx: number) => goTo(idx)

const slideAriaLabel = (slide: DadsImageSliderSlide, idx: number) =>
  `${idx + 1} / ${total.value}: ${slide.alt}`
</script>

<template>
  <section
    class="dads-image-slider"
    :aria-label="ariaLabel"
    :aria-roledescription="'carousel'"
    tabindex="0"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
    @keydown="onKeydown"
  >
    <header v-if="hasHeader" class="dads-image-slider__header">
      <component :is="headingTag" v-if="heading" class="dads-image-slider__heading">
        {{ heading }}
      </component>
      <a v-if="hasShowAll" :href="showAllHref" class="dads-image-slider__show-all">
        {{ showAllLabel }}
      </a>
    </header>
    <div class="dads-image-slider__viewport" aria-live="polite">
      <div
        v-for="(slide, idx) in slides"
        :id="slideId(idx)"
        :key="idx"
        role="group"
        aria-roledescription="slide"
        :aria-label="slideAriaLabel(slide, idx)"
        :aria-hidden="idx === safeIndex ? undefined : 'true'"
        :class="slideClasses(idx)"
      >
        <img class="dads-image-slider__image" :src="slide.src" :alt="slide.alt" />
        <p v-if="slide.caption" class="dads-image-slider__caption">{{ slide.caption }}</p>
      </div>
    </div>

    <button
      v-if="showArrows && total > 1"
      type="button"
      class="dads-image-slider__arrow dads-image-slider__arrow--prev"
      aria-label="前のスライド"
      :disabled="!canPrev || undefined"
      @click="goPrev"
    >
      <span aria-hidden="true">‹</span>
    </button>
    <button
      v-if="showArrows && total > 1"
      type="button"
      class="dads-image-slider__arrow dads-image-slider__arrow--next"
      aria-label="次のスライド"
      :disabled="!canNext || undefined"
      @click="goNext"
    >
      <span aria-hidden="true">›</span>
    </button>

    <div
      v-if="showIndicators && total > 1"
      class="dads-image-slider__indicators"
      role="tablist"
      aria-label="スライド位置"
    >
      <button
        v-for="(_, idx) in slides"
        :key="idx"
        type="button"
        role="tab"
        :aria-selected="idx === safeIndex"
        :aria-controls="slideId(idx)"
        :aria-label="`スライド ${idx + 1}`"
        :class="indicatorClasses(idx)"
        @click="onIndicatorClick(idx)"
      >
        <span class="dads-image-slider__indicator-dot" aria-hidden="true" />
      </button>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '../../styles/base' as base;
@use '../../styles/focus-ring' as ring;

.dads-image-slider {
  @include ring.dads-focus-ring;

  position: relative;
  display: block;
  width: 100%;
  background-color: var(--color-bg-surface, #fff);
  border-radius: var(--border-radius-8, 0.5rem);
  overflow: hidden;
  font-family: var(--font-family-sans, 'Noto Sans JP', sans-serif);
  color: var(--color-text-primary, #1a1a1a);

  // -------------------- header (heading + show-all) ---------------------
  &__header {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: var(--spacing-8, 0.5rem);
    padding: var(--spacing-12, 0.75rem) var(--spacing-16, 1rem);
    border-bottom: 1px solid var(--color-border-divider, #d6d6d6);
  }

  &__heading {
    margin: 0;
    font-size: var(--font-size-20, 1.25rem);
    font-weight: 700;
    line-height: var(--line-height-130, 1.3);
  }

  &__show-all {
    color: var(--color-brand-primary, #0017c1);
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

  &__slide {
    display: none;
    width: 100%;

    &--active {
      display: block;
    }
  }

  &__image {
    display: block;
    width: 100%;
    height: auto;
    object-fit: cover;
  }

  &__caption {
    margin: 0;
    padding: var(--spacing-8, 0.5rem) var(--spacing-16, 1rem);
    font-size: var(--font-size-14, 0.875rem);
    line-height: var(--line-height-150, 1.5);
    color: var(--color-text-secondary, #4d4d4d);
    background-color: var(--color-bg-subtle, rgba(0, 0, 0, 0.04));
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
    color: var(--color-text-primary, #1a1a1a);
    background-color: var(--color-bg-surface, rgba(255, 255, 255, 0.85));
    border: 1px solid var(--color-border-divider, #d6d6d6);
    border-radius: 50%;
    transition: background-color 0.15s ease;

    &:hover {
      background-color: var(--color-bg-hover, rgba(0, 0, 0, 0.04));
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.4;
      pointer-events: none;
    }

    &--prev {
      left: var(--spacing-8, 0.5rem);
    }

    &--next {
      right: var(--spacing-8, 0.5rem);
    }
  }

  // -------------------- indicators ---------------------------------------
  &__indicators {
    display: flex;
    justify-content: center;
    gap: var(--spacing-8, 0.5rem);
    padding: var(--spacing-8, 0.5rem);
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
    background-color: var(--color-brand-primary, #0017c1);
  }

  // -------------------- forced colors ------------------------------------
  @include base.dads-forced-colors {
    .dads-image-slider__arrow {
      border-color: CanvasText;
      color: CanvasText;
      background-color: Canvas;
    }

    .dads-image-slider__indicator-dot {
      background-color: CanvasText;
    }

    .dads-image-slider__indicator--active .dads-image-slider__indicator-dot {
      background-color: Highlight;
    }
  }
}
</style>
