<script setup lang="ts">
import { computed } from 'vue'
import type {
  DadsBreadcrumbEmits,
  DadsBreadcrumbItem,
  DadsBreadcrumbProps,
} from './DadsBreadcrumb.types'

const props = withDefaults(defineProps<DadsBreadcrumbProps>(), {
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
        <span v-if="!entry.isLast" class="dads-breadcrumb__separator" aria-hidden="true">
          <!-- 既定は公式の inline SVG chevron。`separator` prop 指定時はその文字で上書き。 -->
          <svg
            v-if="!separator"
            class="dads-breadcrumb__separator-icon"
            width="12"
            height="12"
            viewBox="0 0 12 12"
            aria-hidden="true"
          >
            <path d="M4.5 11L4 10.5L8 6.5L4 2.5L4.5 2L9 6.5L4.5 11Z" fill="currentColor" />
          </svg>
          <template v-else>{{ separator }}</template>
        </span>
      </li>
    </ol>
  </nav>
</template>

<style scoped lang="scss">
@use '../../styles/base' as base;
@use '../../styles/focus-ring' as ring;

.dads-breadcrumb {
  font-family: var(--font-family-sans, 'Noto Sans JP', sans-serif);
  font-size: var(--font-size-16, 1rem);
  line-height: var(--line-height-170, 1.7);
  letter-spacing: 0.02em;
  color: var(--color-neutral-solid-gray-800, #333333);

  &__list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    column-gap: calc(4 / 16 * 1rem);
  }

  &__item {
    display: inline-flex;
    align-items: center;
    min-width: 0;
  }

  &__link {
    @include ring.dads-focus-ring-fill;

    color: var(--color-primitive-blue-1000, #00118f);
    text-decoration: underline;
    text-decoration-thickness: calc(1 / 16 * 1rem);
    text-underline-offset: calc(3 / 16 * 1rem);

    &:hover {
      color: var(--color-primitive-blue-900, #0017c1);
      text-decoration: underline;
      text-decoration-thickness: calc(3 / 16 * 1rem);
    }

    &:active {
      color: var(--color-primitive-orange-800, #c74700);
      text-decoration-thickness: calc(1 / 16 * 1rem);
    }
  }

  &__current {
    color: var(--color-neutral-solid-gray-800, #333333);

    &--disabled {
      color: var(--color-neutral-solid-gray-420, #949494);
      cursor: not-allowed;
    }
  }

  &__separator {
    display: inline-flex;
    align-items: center;
    margin: 0 calc(4 / 16 * 1rem);
    color: var(--color-neutral-solid-gray-900, #1a1a1a);
    user-select: none;
  }

  // Official inline SVG chevron separator (12×12, currentColor).
  &__separator-icon {
    display: inline-block;
    width: calc(12 / 16 * 1rem);
    height: calc(12 / 16 * 1rem);
    vertical-align: middle;
    color: var(--color-neutral-solid-gray-900, #1a1a1a);
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
