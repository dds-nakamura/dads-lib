<script setup lang="ts">
import DadsCarousel from '../Carousel/DadsCarousel.vue'
import type { DadsImageSliderEmits, DadsImageSliderProps } from './DadsImageSlider.types'

// DadsImageSlider は DadsCarousel の薄いラッパ。
// 公式 MD が image-slider を「カルーセルのコンテナ型・マルチ・幅狭サイズ」と
// 定義しているため、独自構造は持たず DadsCarousel へ委譲する。違いは
// 「見出し (heading) を必須にしたコンテナ型プリセット」である点のみ。
withDefaults(defineProps<DadsImageSliderProps>(), {
  modelValue: 0,
  headingLevel: 2,
})

const emit = defineEmits<DadsImageSliderEmits>()
</script>

<template>
  <DadsCarousel
    class="dads-image-slider"
    :slides="slides"
    :model-value="modelValue"
    :heading="heading"
    :heading-level="headingLevel"
    :breakpoint-rem="breakpointRem"
    :unit="unit"
    :show-all-label="showAllLabel"
    :prev-slide-aria-label="prevSlideAriaLabel"
    :next-slide-aria-label="nextSlideAriaLabel"
    :next-preview-label="nextPreviewLabel"
    :step-nav-aria-label="stepNavAriaLabel"
    @update:model-value="emit('update:modelValue', $event)"
    @change="emit('change', $event)"
  />
</template>
