<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, useId } from 'vue'
import type { DadsCarouselEmits, DadsCarouselProps } from './DadsCarousel.types'

const props = withDefaults(defineProps<DadsCarouselProps>(), {
  modelValue: 0,
  headingLevel: 2,
  ariaLabel: 'スライドショー',
  breakpointRem: 64,
  unit: 'スライド',
  showAllLabel: 'すべてのスライド',
  prevSlideAriaLabel: '前のスライド',
  nextSlideAriaLabel: '次のスライド',
  nextPreviewLabel: '次のスライド',
  stepNavAriaLabel: 'スライド選択',
})

const emit = defineEmits<DadsCarouselEmits>()

const generatedId = useId()
const headingId = `dads-carousel-heading-${generatedId}`

const total = computed(() => props.slides.length)

const headingTag = computed(() => `h${props.headingLevel}` as const)

// --------------------------------------------------------------------------
// Index / navigation (mirrors carousel.js next / prev / goTo).
// currentIndex is derived from the clamped modelValue so the component stays a
// controlled v-model. Emitting update:modelValue + change drives the change.
// --------------------------------------------------------------------------
const currentIndex = computed(() => {
  if (total.value === 0) return 0
  const raw = props.modelValue ?? 0
  if (raw < 0) return 0
  if (raw >= total.value) return total.value - 1
  return raw
})

const nextIndex = computed(() =>
  total.value === 0 ? 0 : (currentIndex.value + 1) % total.value,
)

const current = computed(() => props.slides[currentIndex.value])
const nextSlide = computed(() => props.slides[nextIndex.value])

const goTo = (index: number) => {
  if (index < 0 || index >= total.value) return
  if (index === currentIndex.value) return
  emit('update:modelValue', index)
  emit('change', index)
}

const next = () => {
  if (total.value === 0) return
  goTo((currentIndex.value + 1) % total.value)
}

const prev = () => {
  if (total.value === 0) return
  goTo((currentIndex.value + total.value - 1) % total.value)
}

// --------------------------------------------------------------------------
// Wide / narrow detection via ResizeObserver (replaces WidthObserver +
// @container in carousel.js). isWide = rootWidthPx / rootFontSizePx >=
// breakpointRem. happy-dom may lack ResizeObserver, so guard for it; when it
// is absent isWide stays false (narrow layout) and the DOM is still testable.
// CSS @container queries also drive the show/hide independently for the real
// browser; isWide only toggles the JS-owned ARIA on the main panel.
// --------------------------------------------------------------------------
const isWide = ref(false)
const rootRef = ref<HTMLElement | null>(null)
let resizeObserver: ResizeObserver | null = null

const measure = (widthPx: number) => {
  const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16
  isWide.value = widthPx / rootFontSize >= props.breakpointRem
}

onMounted(() => {
  if (typeof ResizeObserver === 'undefined' || !rootRef.value) return
  resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      const box = entry.borderBoxSize?.[0]
      const widthPx = box ? box.inlineSize : entry.contentRect.width
      measure(widthPx)
    }
  })
  resizeObserver.observe(rootRef.value)
})

onBeforeUnmount(() => {
  resizeObserver?.disconnect()
  resizeObserver = null
})

// --------------------------------------------------------------------------
// Step nav (mirrors CarouselStepNav). Selection tracks currentIndex; arrow
// keys move selection, focus the target tab, and request goTo.
// --------------------------------------------------------------------------
const stepRefs = ref<HTMLButtonElement[]>([])

const setStepRef = (el: Element | null, index: number) => {
  if (el) stepRefs.value[index] = el as HTMLButtonElement
}

const focusStep = (index: number) => {
  stepRefs.value[index]?.focus()
}

const onStepKeydown = (event: KeyboardEvent) => {
  if (total.value === 0) return
  let target: number | null = null
  if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
    target = (currentIndex.value + 1) % total.value
  } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
    target = (currentIndex.value + total.value - 1) % total.value
  }
  if (target === null) return
  event.preventDefault()
  goTo(target)
  focusStep(target)
}

// --------------------------------------------------------------------------
// "すべてのスライド" disclosure ordering (mirrors carousel.js slideContainer):
// slides after current, then slides before current. Each entry keeps its
// original 1-based number for the badge + visually-hidden label.
// --------------------------------------------------------------------------
const otherSlides = computed(() => {
  const indexed = props.slides.map((slide, index) => ({ slide, index, number: index + 1 }))
  return [...indexed.slice(currentIndex.value + 1), ...indexed.slice(0, currentIndex.value)]
})
</script>

<template>
  <div
    ref="rootRef"
    class="dads-carousel"
    role="region"
    :aria-labelledby="heading ? headingId : undefined"
    :aria-label="heading ? undefined : ariaLabel"
  >
    <div class="dads-carousel__inner">
      <component :is="headingTag" v-if="heading" :id="headingId" class="dads-carousel__heading">
        {{ heading }}
      </component>

      <div class="dads-carousel__panels">
        <div class="dads-carousel__panel-set">
          <p
            class="dads-carousel__number dads-carousel__panel-number"
            aria-current="true"
            aria-hidden="true"
          >
            {{ currentIndex + 1 }}
          </p>

          <div class="dads-carousel__main" aria-live="polite" aria-atomic="true">
            <div
              class="dads-carousel__main-panel"
              :role="isWide ? 'tabpanel' : undefined"
              :aria-label="isWide ? `${unit}${currentIndex + 1}` : undefined"
            >
              <component
                :is="current?.href ? 'a' : 'div'"
                class="dads-carousel__main-link"
                :href="current?.href"
                :target="current?.href ? current?.target : undefined"
                :rel="current?.href ? current?.rel : undefined"
              >
                <span class="dads-u-visually-hidden">{{ unit }}{{ currentIndex + 1 }}</span>
                <div class="dads-carousel__image-container">
                  <img
                    v-if="current"
                    :src="current.src"
                    :srcset="current.srcset"
                    :alt="current.alt"
                    :width="current.width"
                    :height="current.height"
                  />
                </div>
              </component>
            </div>
          </div>

          <p class="dads-carousel__next">
            <button type="button" @click="next">
              <span class="dads-carousel__next-image-container">
                <img
                  v-if="nextSlide"
                  :src="nextSlide.src"
                  :srcset="nextSlide.srcset"
                  alt=""
                  :width="nextSlide.width"
                  :height="nextSlide.height"
                />
              </span>
              <span class="dads-carousel__next-image-label">{{ nextPreviewLabel }}</span>
            </button>
          </p>

          <div class="dads-carousel__main-bg">
            <div>
              <img
                v-if="current"
                :src="current.src"
                :srcset="current.srcset"
                alt=""
                aria-hidden="true"
                :width="current.width"
                :height="current.height"
              />
            </div>
          </div>
          <div class="dads-carousel__next-bg">
            <div>
              <img
                v-if="nextSlide"
                :src="nextSlide.src"
                :srcset="nextSlide.srcset"
                alt=""
                aria-hidden="true"
                :width="nextSlide.width"
                :height="nextSlide.height"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="dads-carousel__controls">
        <div class="dads-carousel__step-nav-wrap">
          <ul
            class="dads-carousel__step-nav"
            role="tablist"
            :aria-label="stepNavAriaLabel"
            @keydown="onStepKeydown"
          >
            <li v-for="(slide, index) in slides" :key="index" role="presentation">
              <button
                :ref="(el) => setStepRef(el as Element | null, index)"
                class="dads-carousel__step dads-carousel__number"
                type="button"
                role="tab"
                :aria-selected="index === currentIndex ? 'true' : 'false'"
                :tabindex="index === currentIndex ? 0 : -1"
                @click="goTo(index)"
              >
                <span class="dads-u-visually-hidden">{{ unit }}</span>{{ index + 1 }}
              </button>
            </li>
          </ul>
        </div>

        <p class="dads-carousel__page-nav">
          <button type="button" @click="prev">
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
              <path
                d="m5.27 8 5.33-5.33-.93-.94L3.4 8l6.27 6.27.93-.94L5.27 8Z"
                fill="currentcolor"
              />
            </svg>
            <span class="dads-u-visually-hidden">{{ prevSlideAriaLabel }}</span>
          </button>
          <span>{{ currentIndex + 1 }} / {{ total }}</span>
          <button type="button" @click="next">
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
              <path
                d="m6 1.73-.93.94L10.4 8l-5.33 5.33.93.94L12.27 8 6 1.73Z"
                fill="currentcolor"
              />
            </svg>
            <span class="dads-u-visually-hidden">{{ nextSlideAriaLabel }}</span>
          </button>
        </p>

        <details class="dads-carousel__others dads-disclosure">
          <summary class="dads-disclosure__summary">
            <svg
              class="dads-disclosure__icon"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="11" fill="currentcolor" />
              <circle class="dads-disclosure__icon-circle" cx="12" cy="12" r="8" fill="currentcolor" />
              <path class="dads-disclosure__icon-triangle" d="M17 10H7L12 15L17 10Z" fill="Canvas" />
            </svg>
            {{ showAllLabel }}
          </summary>
          <div class="dads-carousel__others-content dads-disclosure__content">
            <ul>
              <li
                v-for="entry in otherSlides"
                :key="entry.index"
                class="dads-carousel__panel-set"
              >
                <p class="dads-carousel__number dads-carousel__panel-number" aria-hidden="true">
                  {{ entry.number }}
                </p>
                <div class="dads-carousel__main">
                  <component
                    :is="entry.slide.href ? 'a' : 'div'"
                    class="dads-carousel__main-link"
                    :href="entry.slide.href"
                    :target="entry.slide.href ? entry.slide.target : undefined"
                    :rel="entry.slide.href ? entry.slide.rel : undefined"
                  >
                    <span class="dads-u-visually-hidden">{{ unit }}{{ entry.number }}</span>
                    <div class="dads-carousel__image-container">
                      <img
                        :src="entry.slide.src"
                        :srcset="entry.slide.srcset"
                        :alt="entry.slide.alt"
                        :width="entry.slide.width"
                        :height="entry.slide.height"
                      />
                    </div>
                  </component>
                </div>
                <div class="dads-carousel__main-bg">
                  <div>
                    <img
                      :src="entry.slide.src"
                      :srcset="entry.slide.srcset"
                      alt=""
                      aria-hidden="true"
                      :width="entry.slide.width"
                      :height="entry.slide.height"
                    />
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </details>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
// ===========================================================================
// Ported verbatim from
// design-system-example-components-html/src/components/carousel/carousel.css
// plus the minimal disclosure rules the carousel relies on from
// .../disclosure/disclosure.css. Class names, @container queries, blur bg,
// focus rings, number badge [aria-current]/[aria-selected] colors and the
// :has([open]) expand rules are preserved.
//
// NOTE: the official `dads-carousel-step-nav { display:none }` custom-element
// show/hide is replicated on .dads-carousel__step-nav-wrap so the @container
// query still toggles the step nav.
// ===========================================================================

// visually-hidden ユーティリティ (公式 global.css の dads-u-visually-hidden 相当)。
.dads-carousel :deep(.dads-u-visually-hidden),
.dads-u-visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
  border: 0;
}

.dads-carousel {
  container-type: inline-size;
  display: block;
}

.dads-carousel__inner {
  position: relative;
  z-index: 0;
  box-sizing: border-box;
  max-width: calc(1024 / 16 * 1rem);
  color: var(--color-neutral-solid-gray-800);
  font-weight: normal;
  font-size: calc(16 / 16 * 1rem);
  line-height: 1.7;
  font-family: var(--font-family-sans);
  letter-spacing: 0.02em;
}

@container (min-width: 64rem) {
  .dads-carousel__inner {
    padding-right: calc(48 / 16 * 1rem);
    padding-left: calc(48 / 16 * 1rem);
  }
}

.dads-carousel__heading {
  margin-top: 0;
  margin-bottom: calc(16 / 16 * 1rem);
  font-size: calc(20 / 16 * 1rem);
  line-height: 1.5;
  font-weight: bold;
  letter-spacing: 0.02em;
}

@media (min-width: 30rem) {
  .dads-carousel__heading {
    font-size: calc(24 / 16 * 1rem);
  }
}

@media (min-width: 64rem) {
  .dads-carousel__heading {
    font-size: calc(32 / 16 * 1rem);
    letter-spacing: 0.01em;
  }
}

.dads-carousel__number {
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  width: calc(32 / 16 * 1rem);
  height: calc(32 / 16 * 1rem);
  border: 1px solid var(--color-neutral-solid-gray-800);
  border-radius: 50%;
  background-color: var(--color-neutral-white);
  padding: 0 0 calc(2 / 16 * 1rem);
  color: var(--color-neutral-solid-gray-800);
  font: inherit;
  font-weight: bold;
  font-size: calc(16 / 16 * 1rem);
  line-height: 1;
  letter-spacing: 0.02em;
}

.dads-carousel__number[aria-current='true'],
.dads-carousel__number[aria-selected='true'] {
  background-color: var(--color-neutral-solid-gray-800);
  color: var(--color-neutral-white);
  box-shadow: 0 0 0 2px var(--color-neutral-white);
  outline: 1px solid var(--color-neutral-solid-gray-800);
  outline-offset: 2px;
}

.dads-carousel__panel-set {
  display: grid;
  grid-template: 'main' auto / auto;
}

@container (min-width: 64rem) {
  .dads-carousel__panel-set {
    margin-right: calc(-48 / 16 * 1rem);
    margin-left: calc(-48 / 16 * 1rem);
    grid-template:
      'number main next .' auto /
      calc(48 / 16 * 1rem) 3fr 1fr calc(48 / 16 * 1rem);
  }
}

.dads-carousel__panel-set::before {
  grid-area: number;
  justify-self: center;
  display: none;
  border-right: 1px solid var(--color-neutral-black);
  height: 100%;
  content: '';
}

.dads-carousel__panel-number {
  grid-area: number;
  justify-self: center;
  display: none;
}

.dads-carousel__main-bg {
  position: relative;
  z-index: -1;
  grid-area: main;
  overflow: clip;
}

.dads-carousel__main-bg > div {
  position: absolute;
  inset: -50% 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  filter: blur(25px);
  transform: translate3d(0, 0, 0); /* for better performance on Safari */
}

.dads-carousel__main-bg > div img {
  width: auto;
  height: 200%;
}

.dads-carousel__main-bg > div::after {
  position: absolute;
  inset: 0;
  background-color: var(--color-neutral-white);
  mix-blend-mode: soft-light;
  content: '';
}

.dads-carousel__main {
  grid-area: main;
  position: relative;
  min-width: 0;
}

.dads-carousel__main-link {
  display: block;
}

@media (hover: hover) {
  .dads-carousel__main-link:any-link:hover:not(:focus-visible) {
    outline: calc(4 / 16 * 1rem) solid var(--color-primitive-blue-900);
    outline-offset: calc(-2 / 16 * 1rem);
  }

  .dads-carousel__main-link:any-link:hover:not(:focus-visible)::after {
    position: absolute;
    inset: 2px;
    box-shadow: inset 0 0 0 calc(2 / 16 * 1rem) var(--color-neutral-white);
    pointer-events: none;
    content: '';
  }
}

.dads-carousel__main-link:focus-visible {
  overflow: hidden;
  outline: calc(4 / 16 * 1rem) solid var(--color-neutral-black);
  outline-offset: calc(-2 / 16 * 1rem);
  border-radius: calc(8 / 16 * 1rem);
}

.dads-carousel__main-link:focus-visible::after {
  position: absolute;
  inset: 2px;
  box-shadow: inset 0 0 0 calc(2 / 16 * 1rem) var(--color-primitive-yellow-300);
  border-radius: calc(6 / 16 * 1rem);
  pointer-events: none;
  content: '';
}

.dads-carousel__image-container {
  display: grid;
  place-content: center;
  height: 100%;
  border-radius: inherit;
  outline: 2px solid var(--color-neutral-black);
  outline-offset: -2px;
}

.dads-carousel__image-container img {
  display: block;
  width: auto;
  max-width: 100%;
  height: auto;
}

.dads-carousel__next-bg {
  position: relative;
  z-index: -1;
  display: none;
  grid-area: next;
  overflow: clip;
}

.dads-carousel__next-bg > div {
  position: absolute;
  inset: -50% 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  filter: blur(25px);
  transform: translate3d(0, 0, 0); /* for better performance on Safari */
}

.dads-carousel__next-bg > div img {
  width: auto;
  height: 200%;
  max-width: none;
}

.dads-carousel__next-bg > div::after {
  position: absolute;
  inset: 0;
  background-color: var(--color-neutral-white);
  mix-blend-mode: soft-light;
  content: '';
}

@container (min-width: 64rem) {
  .dads-carousel__next-bg {
    display: block;
  }
}

.dads-carousel__next {
  grid-area: next;
  margin: 0;
  display: none;
  min-width: 0;
  border: 1px solid var(--color-neutral-solid-gray-420);
  border-left-width: 0;
  padding: calc(24 / 16 * 1rem);
}

@container (min-width: 64rem) {
  .dads-carousel__next {
    display: block;
  }
}

.dads-carousel__next > button {
  position: relative;
  border: 1px solid var(--color-neutral-solid-gray-420);
  background-color: var(--color-neutral-white);
  padding: 0;
  font: inherit;
  text-align: left;
  text-decoration: underline;
  text-decoration-thickness: calc(1 / 16 * 1rem);
  text-underline-offset: calc(3 / 16 * 1rem);
  cursor: pointer;
  touch-action: manipulation;
}

@media (hover: hover) {
  .dads-carousel__next > button:hover {
    outline: calc(4 / 16 * 1rem) solid var(--color-primitive-blue-900);
    outline-offset: -1px;
    text-decoration-thickness: calc(3 / 16 * 1rem);
  }

  .dads-carousel__next > button:hover:not(:focus-visible)::after {
    position: absolute;
    inset: 0;
    box-shadow: inset 0 0 0 calc(2 / 16 * 1rem) var(--color-neutral-white);
    pointer-events: none;
    content: '';
  }
}

.dads-carousel__next > button:focus-visible {
  outline: calc(4 / 16 * 1rem) solid var(--color-neutral-black);
  outline-offset: calc(2 / 16 * 1rem);
  border-radius: calc(4 / 16 * 1rem);
  box-shadow: 0 0 0 calc(2 / 16 * 1rem) var(--color-primitive-yellow-300);
}

.dads-carousel__next-image-container img {
  display: block;
  width: auto;
  max-width: 100%;
  height: auto;
}

.dads-carousel__next-image-label {
  display: block;
  border-top: 1px solid var(--color-neutral-solid-gray-420);
  padding: calc(16 / 16 * 1rem);
  font-weight: bold;
  font-size: calc(16 / 16 * 1rem);
  line-height: 1.7;
  letter-spacing: 0.02em;
  text-decoration-thickness: inherit;
}

.dads-carousel__controls {
  display: flex;
  align-items: center;
  column-gap: calc(20 / 16 * 1rem);
  padding: calc(12 / 16 * 1rem) 0;
}

@container (min-width: 64rem) {
  .dads-carousel__controls {
    column-gap: calc(32 / 16 * 1rem);
  }
}

.dads-carousel__others[open] {
  flex: 1;
}

.dads-carousel__others .dads-disclosure__summary {
  border-radius: calc(8 / 16 * 1rem);
  border: 1px solid var(--color-neutral-solid-gray-600);
  background-color: var(--color-neutral-white) !important;
  padding: calc(8 / 16 * 1rem) calc(12 / 16 * 1rem);
  cursor: pointer;
}

.dads-carousel__others-content.dads-disclosure__content {
  margin: calc(12 / 16 * 1rem) 0 0;
  padding-left: 0;
}

.dads-carousel__others-content > ul {
  display: grid;
  row-gap: calc(24 / 16 * 1rem);
  margin: 0;
  padding: 0;
  list-style-type: none;
}

.dads-carousel .dads-carousel__step-nav-wrap {
  display: none;
}

@container (min-width: 64rem) {
  .dads-carousel .dads-carousel__step-nav-wrap {
    display: flex;
  }
}

.dads-carousel__step-nav {
  position: relative;
  margin: 0;
  display: flex;
  justify-content: end;
  column-gap: calc(16 / 16 * 1rem);
  padding: 0;
  list-style-type: none;
}

.dads-carousel__step-nav > li {
  position: relative;
  flex-shrink: 0;
}

.dads-carousel__step-nav > li:not(:last-child)::before {
  position: absolute;
  top: 50%;
  left: 100%;
  width: calc(16 / 16 * 1rem);
  border-bottom: 1px solid var(--color-neutral-solid-gray-800);
  content: '';
}

.dads-carousel__step {
  position: relative;
}

.dads-carousel__step:not([aria-selected='true']) {
  text-decoration: underline;
  text-decoration-thickness: calc(1 / 16 * 1rem);
  text-underline-offset: calc(3 / 16 * 1rem);
}

.dads-carousel__step::after {
  position: absolute;
  inset: calc(-7 / 16 * 1rem);
  content: '';
}

@media (hover: hover) {
  .dads-carousel__step:not([aria-selected='true']):hover {
    text-decoration-thickness: calc(3 / 16 * 1rem);
    cursor: pointer;
  }
}

.dads-carousel__step:focus-visible {
  outline: calc(4 / 16 * 1rem) solid var(--color-neutral-black);
  outline-offset: calc(2 / 16 * 1rem);
  box-shadow: 0 0 0 calc(2 / 16 * 1rem) var(--color-primitive-yellow-300);
}

.dads-carousel__page-nav {
  flex-shrink: 0;
  position: relative;
  margin: 0;
  display: flex;
  justify-content: end;
  align-items: center;
  column-gap: calc(12 / 16 * 1rem);
  padding: 0;
}

@container (min-width: 64rem) {
  .dads-carousel__page-nav {
    display: none;
  }
}

.dads-carousel__page-nav > button {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: calc(24 / 16 * 1rem);
  height: calc(24 / 16 * 1rem);
  border: 1px solid var(--color-primitive-blue-1000);
  border-radius: 50%;
  background-color: var(--color-neutral-white);
  padding: 0;
  color: var(--color-primitive-blue-1000);
  cursor: pointer;
}

.dads-carousel__page-nav > button::after {
  position: absolute;
  inset: -100%;
  margin: auto;
  width: calc(44 / 16 * 1rem);
  height: calc(44 / 16 * 1rem);
  content: '';
}

.dads-carousel__page-nav > button:focus-visible {
  outline: calc(4 / 16 * 1rem) solid var(--color-neutral-black);
  outline-offset: calc(2 / 16 * 1rem);
  box-shadow: 0 0 0 calc(2 / 16 * 1rem) var(--color-primitive-yellow-300);
}

.dads-carousel__page-nav > span {
  text-box-trim: trim-both;
  text-box-edge: cap alphabetic;
}

.dads-carousel__others {
  order: -1;
}

// ---- 「すべてのスライド」展開中の disclosure 連動 (公式 :has([open])) -------

@container (min-width: 64rem) {
  .dads-carousel:has([open]) .dads-carousel__panel-set::before {
    display: block;
  }

  .dads-carousel:has([open]) .dads-carousel__panel-number {
    display: flex;
  }

  .dads-carousel:has([open]) .dads-carousel__next-bg {
    display: none;
  }

  .dads-carousel:has([open]) .dads-carousel__next {
    display: none;
  }

  .dads-carousel:has([open]) .dads-carousel__step-nav-wrap {
    display: none;
  }
}

.dads-carousel:has([open]) .dads-carousel__controls {
  padding-bottom: calc(56 / 16 * 1rem);
}

.dads-carousel:has([open]) .dads-carousel__page-nav {
  display: none;
}

// ---- disclosure summary icon (公式 disclosure.css の流用最小セット) ---------

.dads-disclosure__summary {
  display: flex;
  align-items: start;
  justify-content: start;
  gap: calc(8 / 16 * 1rem);
  width: fit-content;
  cursor: default;
  list-style-type: none;
}

@media (hover: hover) {
  .dads-disclosure__summary:hover {
    text-decoration: underline;
    text-underline-offset: calc(3 / 16 * 1rem);
  }
}

.dads-disclosure__summary:focus-visible {
  outline: calc(4 / 16 * 1rem) solid var(--color-neutral-black);
  outline-offset: calc(2 / 16 * 1rem);
  border-radius: calc(4 / 16 * 1rem);
  background-color: var(--color-primitive-yellow-300);
  box-shadow: 0 0 0 calc(2 / 16 * 1rem) var(--color-primitive-yellow-300);
}

.dads-disclosure__summary::marker {
  content: '';
}

.dads-disclosure__summary::-webkit-details-marker {
  display: none;
}

.dads-disclosure__icon {
  flex-shrink: 0;
  margin-top: calc((1lh - 24px) / 2);
  color: var(--color-primitive-blue-1000);
}

@media (forced-colors: active) {
  .dads-disclosure__icon {
    color: inherit;
  }
}

.dads-disclosure[open] .dads-disclosure__icon {
  rotate: 180deg;
}

@media (hover: hover) {
  .dads-disclosure__summary:hover .dads-disclosure__icon-circle {
    fill: Canvas;
  }

  .dads-disclosure__summary:hover .dads-disclosure__icon-triangle {
    fill: currentcolor;
  }
}

.dads-disclosure__content {
  padding-left: calc(32 / 16 * 1rem);
  margin: calc(16 / 16 * 1rem) 0;
}
</style>
