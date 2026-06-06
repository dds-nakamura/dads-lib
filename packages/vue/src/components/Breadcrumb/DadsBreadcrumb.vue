<script setup lang="ts">
import { computed } from 'vue'
import type {
  DadsBreadcrumbEmits,
  DadsBreadcrumbItem,
  DadsBreadcrumbProps,
} from './DadsBreadcrumb.types'

const props = withDefaults(defineProps<DadsBreadcrumbProps>(), {
  separator: '》',
  ariaLabel: 'パンくずリスト',
})

const emit = defineEmits<DadsBreadcrumbEmits>()

// 最後の項目（現在地）は常に span として描画されるため、各項目の状態を
// 1 度の map で先に確定させる。テンプレート側からは派生フラグだけ参照する。
const renderedItems = computed(() =>
  props.items.map((item, index) => {
    const isLast = index === props.items.length - 1
    const isDisabled = !isLast && Boolean(item.disabled)
    const isLink = !isLast && Boolean(item.href) && !item.disabled
    return { item, index, isLast, isDisabled, isLink }
  }),
)

const handleClick = (item: DadsBreadcrumbItem, index: number, event: MouseEvent) => {
  emit('click:item', item, index, event)
}
</script>

<template>
  <nav class="dads-breadcrumb" :aria-label="ariaLabel">
    <ol class="dads-breadcrumb__list">
      <li v-for="entry in renderedItems" :key="entry.index" class="dads-breadcrumb__item">
        <a
          v-if="entry.isLink"
          :href="entry.item.href"
          class="dads-breadcrumb__link"
          @click="handleClick(entry.item, entry.index, $event)"
          >{{ entry.item.title }}</a
        >
        <span
          v-else
          :class="[
            'dads-breadcrumb__current',
            { 'dads-breadcrumb__current--disabled': entry.isDisabled },
          ]"
          :aria-current="entry.isLast ? 'page' : undefined"
          :aria-disabled="entry.isDisabled ? 'true' : undefined"
          >{{ entry.item.title }}</span
        >
        <span v-if="!entry.isLast" class="dads-breadcrumb__separator" aria-hidden="true">{{
          separator
        }}</span>
      </li>
    </ol>
  </nav>
</template>

<style scoped lang="scss">
@use '../../styles/base' as base;
@use '../../styles/focus-ring' as ring;

.dads-breadcrumb {
  font-family: var(--font-family-sans, 'Noto Sans JP', sans-serif);
  font-size: var(--font-size-14, 0.875rem);
  line-height: var(--line-height-150, 1.5);
  color: var(--color-neutral-solid-gray-800, #333);

  &__list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0;
  }

  &__item {
    display: inline-flex;
    align-items: center;
    min-width: 0;
  }

  &__link {
    @include ring.dads-focus-ring;

    color: var(--color-primitive-blue-900, #0017c1);
    text-decoration: underline;
    text-underline-offset: 2px;
    border-radius: var(--border-radius-4, 0.25rem);

    &:hover {
      color: var(--color-primitive-blue-1000, #001a9c);
      text-decoration: underline;
    }

    &:active {
      color: var(--color-primitive-blue-1200, #001480);
    }
  }

  &__current {
    color: var(--color-neutral-solid-gray-800, #333);
    font-weight: 500;

    &--disabled {
      color: var(--color-neutral-solid-gray-420, #999);
      cursor: not-allowed;
    }
  }

  &__separator {
    margin: 0 calc(8 / 16 * 1rem);
    color: var(--color-neutral-solid-gray-500, #69707d);
    user-select: none;
  }

  // -------------------- forced colors -----------------------------------
  @include base.dads-forced-colors {
    .dads-breadcrumb__link {
      color: LinkText;
    }

    .dads-breadcrumb__current {
      color: CanvasText;
    }

    .dads-breadcrumb__separator {
      color: CanvasText;
    }
  }
}
</style>
