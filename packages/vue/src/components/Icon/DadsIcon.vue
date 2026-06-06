<script setup lang="ts">
import { computed, watchEffect } from 'vue'
import { iconRegistry } from './icon-registry'
import type { DadsIconProps } from './DadsIcon.types'

const props = withDefaults(defineProps<DadsIconProps>(), {
  size: 24,
})

const def = computed(() => iconRegistry[props.name])

// Dev-only warning when an icon name is not in the bundled registry.
const __metaEnv = (import.meta as ImportMeta & { env?: { DEV?: boolean } }).env
if (__metaEnv?.DEV) {
  watchEffect(() => {
    if (!iconRegistry[props.name]) {
      console.warn(
        `[DadsIcon] アイコン "${props.name}" はレジストリに含まれていません。` +
          'Material Symbols 名を確認し、必要なら scripts/generate-icon-registry.mjs で追加してください。',
      )
    }
  })
}

const dimension = computed(() => (typeof props.size === 'number' ? `${props.size}px` : props.size))
const viewBox = computed(() => def.value?.viewBox ?? '0 -960 960 960')
const body = computed(() => def.value?.body ?? '')
</script>

<template>
  <!-- body はビルド時生成のアイコンレジストリ (Material Symbols SVG) 由来で、ユーザー入力を含まないため XSS リスクはない。 -->
  <!-- eslint-disable vue/no-v-html -->
  <svg
    class="dads-icon"
    xmlns="http://www.w3.org/2000/svg"
    :width="dimension"
    :height="dimension"
    :viewBox="viewBox"
    fill="currentColor"
    :role="label ? 'img' : undefined"
    :aria-label="label || undefined"
    :aria-hidden="label ? undefined : true"
    v-html="body"
  />
  <!-- eslint-enable vue/no-v-html -->
</template>

<style scoped>
.dads-icon {
  display: inline-block;
  flex-shrink: 0;
  vertical-align: middle;
  line-height: 0;
}
</style>
