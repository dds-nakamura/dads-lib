<script setup lang="ts">
import type {
  DadsPageNavigationEmits,
  DadsPageNavigationItem,
  DadsPageNavigationProps,
} from './DadsPageNavigation.types'

const props = withDefaults(defineProps<DadsPageNavigationProps>(), {
  activeId: undefined,
  ariaLabel: 'このページの目次',
})

const emit = defineEmits<DadsPageNavigationEmits>()

// `href` が省略された項目は `#${id}` を自動で組み立てる。consumer 側で
// 外部 URL や別ページのアンカーを指したい場合のみ明示的に上書きできる。
const resolveHref = (item: DadsPageNavigationItem): string => item.href ?? `#${item.id}`

const isActive = (item: DadsPageNavigationItem): boolean =>
  props.activeId !== undefined && props.activeId === item.id

const handleClick = (item: DadsPageNavigationItem, event: MouseEvent) => {
  emit('click:item', item, event)
}
</script>

<template>
  <nav class="dads-page-navigation" :aria-label="ariaLabel">
    <ul class="dads-page-navigation__list">
      <li
        v-for="item in items"
        :key="item.id"
        class="dads-page-navigation__item"
        :class="{ 'dads-page-navigation__item--active': isActive(item) }"
      >
        <a
          class="dads-page-navigation__link"
          :class="{ 'dads-page-navigation__link--active': isActive(item) }"
          :href="resolveHref(item)"
          :aria-current="isActive(item) ? 'location' : undefined"
          @click="handleClick(item, $event)"
          >{{ item.label }}</a
        >
        <ul
          v-if="item.children && item.children.length > 0"
          class="dads-page-navigation__list dads-page-navigation__list--nested"
        >
          <li
            v-for="child in item.children"
            :key="child.id"
            class="dads-page-navigation__item dads-page-navigation__item--nested"
            :class="{ 'dads-page-navigation__item--active': isActive(child) }"
          >
            <a
              class="dads-page-navigation__link dads-page-navigation__link--nested"
              :class="{ 'dads-page-navigation__link--active': isActive(child) }"
              :href="resolveHref(child)"
              :aria-current="isActive(child) ? 'location' : undefined"
              @click="handleClick(child, $event)"
              >{{ child.label }}</a
            >
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>

<style scoped lang="scss">
@use '../../styles/base' as base;
@use '../../styles/focus-ring' as ring;

.dads-page-navigation {
  font-family: var(--font-family-sans, 'Noto Sans JP', sans-serif);
  font-size: var(--font-size-14, 0.875rem);
  line-height: var(--line-height-150, 1.5);
  color: var(--color-text-body, #333);

  &__list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: var(--spacing-4, 0.25rem);

    &--nested {
      margin-top: var(--spacing-4, 0.25rem);
      padding-left: var(--spacing-16, 1rem);
      border-left: 1px solid var(--color-border-default, rgba(0, 0, 0, 0.42));
    }
  }

  &__item {
    display: block;
    min-width: 0;

    &--nested {
      font-size: var(--font-size-14, 0.875rem);
    }

    &--active {
      font-weight: 700;
    }
  }

  &__link {
    @include ring.dads-focus-ring;

    display: block;
    color: var(--color-brand-primary, #0017c1);
    text-decoration: underline;
    text-underline-offset: 2px;
    border-radius: var(--border-radius-4, 0.25rem);
    padding: var(--spacing-4, 0.25rem) var(--spacing-8, 0.5rem);

    &:hover {
      color: var(--color-brand-primary-hover, #001a9c);
      text-decoration: underline;
    }

    &:active {
      color: var(--color-brand-primary-active, #001480);
    }

    &--active {
      color: var(--color-text-body, #333);
      font-weight: 700;
      background-color: var(--color-bg-selected, rgba(0, 23, 193, 0.08));
    }
  }

  // -------------------- forced colors -----------------------------------
  @include base.dads-forced-colors {
    .dads-page-navigation__link {
      color: LinkText;
    }

    .dads-page-navigation__link--active {
      color: CanvasText;
      background-color: Highlight;
    }

    .dads-page-navigation__list--nested {
      border-left-color: CanvasText;
    }
  }
}
</style>
