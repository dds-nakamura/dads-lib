<script setup lang="ts">
import { computed, ref } from 'vue'
import type { DadsImageEmits, DadsImageProps } from './DadsImage.types'

const props = withDefaults(defineProps<DadsImageProps>(), {
  loading: 'lazy',
  objectFit: 'cover',
  showSkeleton: true,
})

const emit = defineEmits<DadsImageEmits>()

// We track the effective src locally so an @error swap to `placeholder`
// persists until props.src changes again. Using a ref instead of mutating
// the prop keeps Vue's reactivity model intact.
const errored = ref(false)
const effectiveSrc = computed(() => {
  if (errored.value && props.placeholder) return props.placeholder
  return props.src
})

// Track image load completion to drive the skeleton fade-out.
const loaded = ref(false)

// Reset the errored flag when props.src changes so the new image gets a
// fresh chance to load before falling back to the placeholder.
const onLoad = (event: Event) => {
  errored.value = false
  loaded.value = true
  emit('load', event)
}

const onError = (event: Event) => {
  // Only flip into "use placeholder" mode once — otherwise a broken
  // placeholder URL would loop forever.
  if (!errored.value && props.placeholder) {
    errored.value = true
  }
  // Treat error as "no longer loading" so the skeleton stops animating.
  loaded.value = true
  emit('error', event)
}

const rootClasses = computed(() => [
  'dads-image',
  `dads-image--fit-${props.objectFit}`,
  {
    'dads-image--loaded': loaded.value,
    'dads-image--skeleton': props.showSkeleton && !loaded.value,
  },
])
</script>

<template>
  <figure v-if="caption" :class="rootClasses">
    <img
      class="dads-image__img"
      :src="effectiveSrc"
      :alt="alt"
      :width="width"
      :height="height"
      :loading="loading"
      @error="onError"
      @load="onLoad"
    />
    <figcaption class="dads-image__caption">{{ caption }}</figcaption>
  </figure>
  <img
    v-else
    :class="[...rootClasses, 'dads-image__img']"
    :src="effectiveSrc"
    :alt="alt"
    :width="width"
    :height="height"
    :loading="loading"
    @error="onError"
    @load="onLoad"
  />
</template>

<style scoped lang="scss">
@use '../../styles/base' as base;

.dads-image {
  display: inline-block;
  margin: 0;
  max-width: 100%;
  color: var(--color-neutral-solid-gray-800, #1a1a1a);
  font-family: var(--font-family-sans, 'Noto Sans JP', sans-serif);

  &__img {
    display: block;
    max-width: 100%;
    height: auto;
    border-radius: var(--border-radius-4, 0.25rem);
    background-color: var(--color-neutral-solid-gray-50, rgba(0, 0, 0, 0.04));
    transition: opacity 0.2s ease;
  }

  // -------------------- skeleton (loading) -------------------------------
  // Animated shimmer rendered behind the still-transparent <img>. When the
  // image's `load` event fires, `dads-image--loaded` is added and the
  // shimmer / opacity transition resolve to the final image.
  &--skeleton,
  &--skeleton#{&}__img {
    background-color: var(--color-neutral-solid-gray-50, rgba(0, 0, 0, 0.04));
    background-image: linear-gradient(
      90deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.06) 50%,
      rgba(0, 0, 0, 0) 100%
    );
    background-size: 200% 100%;
    background-repeat: no-repeat;
    animation: dads-image-shimmer 1.4s linear infinite;
  }

  // Image starts transparent while skeleton is showing, then fades in.
  &--skeleton &__img,
  &--skeleton.dads-image__img {
    opacity: 0;
  }

  &--loaded &__img,
  &--loaded.dads-image__img {
    opacity: 1;
  }

  &__caption {
    margin-top: calc(8 / 16 * 1rem);
    font-size: var(--font-size-14, 0.875rem);
    color: var(--color-neutral-solid-gray-700, #555);
    line-height: 1.5;
  }

  // -------------------- object-fit modifiers ----------------------------
  // When the consumer fixes width AND height the object-fit policy matters;
  // for unsized images it is effectively a no-op which is fine.
  &--fit-cover &__img,
  &--fit-cover#{&}__img {
    object-fit: cover;
  }
  &--fit-contain &__img,
  &--fit-contain#{&}__img {
    object-fit: contain;
  }
  &--fit-fill &__img,
  &--fit-fill#{&}__img {
    object-fit: fill;
  }
  &--fit-none &__img,
  &--fit-none#{&}__img {
    object-fit: none;
  }

  // When the root *is* the <img> (no caption), the modifier sits directly
  // on the element, so the rule above using a descendant selector misses.
  // Apply object-fit directly to the root in that case.
  &.dads-image--fit-cover {
    object-fit: cover;
  }
  &.dads-image--fit-contain {
    object-fit: contain;
  }
  &.dads-image--fit-fill {
    object-fit: fill;
  }
  &.dads-image--fit-none {
    object-fit: none;
  }

  @include base.dads-forced-colors {
    &__img {
      border: 1px solid CanvasText;
    }
  }
}

@keyframes dads-image-shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>
