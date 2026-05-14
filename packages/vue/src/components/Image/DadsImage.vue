<script setup lang="ts">
import { computed, ref } from 'vue'
import type { DadsImageEmits, DadsImageProps } from './DadsImage.types'

const props = withDefaults(defineProps<DadsImageProps>(), {
  loading: 'lazy',
  objectFit: 'cover',
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

// Reset the errored flag when props.src changes so the new image gets a
// fresh chance to load before falling back to the placeholder.
const onLoad = (event: Event) => {
  errored.value = false
  emit('load', event)
}

const onError = (event: Event) => {
  // Only flip into "use placeholder" mode once — otherwise a broken
  // placeholder URL would loop forever.
  if (!errored.value && props.placeholder) {
    errored.value = true
  }
  emit('error', event)
}

const rootClasses = computed(() => ['dads-image', `dads-image--fit-${props.objectFit}`])
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
  color: var(--color-text-primary, #1a1a1a);
  font-family: var(--font-family-sans, 'Noto Sans JP', sans-serif);

  &__img {
    display: block;
    max-width: 100%;
    height: auto;
    border-radius: var(--border-radius-4, 0.25rem);
    background-color: var(--color-bg-subtle, rgba(0, 0, 0, 0.04));
  }

  &__caption {
    margin-top: var(--spacing-8, 0.5rem);
    font-size: var(--font-size-14, 0.875rem);
    color: var(--color-text-secondary, #555);
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
</style>
