<script setup lang="ts">
import { computed } from 'vue'
import type {
  DadsResourceListEmits,
  DadsResourceListItem,
  DadsResourceListProps,
} from './DadsResourceList.types'

const props = withDefaults(defineProps<DadsResourceListProps>(), {
  variant: 'frame',
})

const emit = defineEmits<DadsResourceListEmits>()

// Pre-compute the per-item render flags so the template stays declarative.
const renderedItems = computed(() =>
  props.items.map((item, index) => ({
    item,
    index,
    isLink: Boolean(item.href) && !item.disabled,
    hasMedia: Boolean(item.thumbnail) || Boolean(item.iconName),
    hasTags: Array.isArray(item.tags) && item.tags.length > 0,
    kind: item.kind ?? 'information',
    rowClass: [
      'dads-resource-list',
      `dads-resource-list--kind-${item.kind ?? 'information'}`,
      {
        'dads-resource-list--selected': item.selected,
        'dads-resource-list--disabled': item.disabled,
      },
    ],
  })),
)

const isLinkItem = (item: DadsResourceListItem) => Boolean(item.href) && !item.disabled

const onItemClick = (item: DadsResourceListItem, index: number, event: MouseEvent) => {
  if (item.disabled) {
    event.preventDefault()
    return
  }
  emit('click:item', item, index, event)
}

const onActionClick = (item: DadsResourceListItem, index: number, event: MouseEvent) => {
  if (item.disabled) {
    event.preventDefault()
    return
  }
  emit('click:action', item, index, event)
}
</script>

<template>
  <ul class="dads-resource-list-group" :data-style="variant" :aria-label="ariaLabel">
    <li v-for="entry in renderedItems" :key="entry.index" class="dads-resource-list-group__item">
      <div :class="entry.rowClass" :data-style="variant">
        <component
          :is="isLinkItem(entry.item) ? 'a' : 'div'"
          :href="isLinkItem(entry.item) ? entry.item.href : undefined"
          :aria-current="entry.item.selected ? 'true' : undefined"
          :aria-disabled="entry.item.disabled || undefined"
          class="dads-resource-list__body"
          @click="onItemClick(entry.item, entry.index, $event)"
        >
          <img
            v-if="entry.item.thumbnail"
            class="dads-resource-list__thumbnail"
            :src="entry.item.thumbnail"
            alt=""
          />
          <i
            v-else-if="entry.item.iconName"
            :class="['mdi', entry.item.iconName, 'dads-resource-list__icon']"
            aria-hidden="true"
          />
          <div class="dads-resource-list__contents">
            <h3 class="dads-resource-list__title">{{ entry.item.title }}</h3>
            <div v-if="entry.item.description" class="dads-resource-list__support">
              <p>{{ entry.item.description }}</p>
            </div>
            <ul v-if="entry.hasTags" class="dads-resource-list__tags">
              <li
                v-for="(tag, tagIndex) in entry.item.tags"
                :key="tagIndex"
                class="dads-resource-list__tag"
              >
                {{ tag }}
              </li>
            </ul>
          </div>
          <div v-if="entry.item.date" class="dads-resource-list__sub">
            <p>{{ entry.item.date }}</p>
          </div>
        </component>
        <component
          :is="entry.item.action.href ? 'a' : 'button'"
          v-if="entry.item.action"
          :type="entry.item.action.href ? undefined : 'button'"
          :href="entry.item.action.href"
          :aria-label="entry.item.action.label"
          :disabled="!entry.item.action.href && entry.item.disabled ? true : undefined"
          class="dads-resource-list__action"
          @click="onActionClick(entry.item, entry.index, $event)"
        >
          <i
            v-if="entry.item.action.iconName"
            :class="['mdi', entry.item.action.iconName]"
            aria-hidden="true"
          />
          <span v-else>{{ entry.item.action.label }}</span>
        </component>
      </div>
    </li>
  </ul>
</template>

<style scoped lang="scss">
@use '../../styles/base' as base;
@use '../../styles/focus-ring' as ring;

// The outer `<ul>` simply stacks the items. Each row owns its own visual
// frame (.dads-resource-list) so the list itself stays unstyled.
.dads-resource-list-group {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  row-gap: var(--spacing-16, 1rem);

  // `list` mode squashes the rows together — the per-row bottom border draws
  // the divider, so the gap collapses to zero.
  &[data-style='list'] {
    row-gap: 0;
  }

  &__item {
    display: block;
  }
}

.dads-resource-list {
  display: flex;
  align-items: center;
  background: var(--color-neutral-white, #fff);
  color: var(--color-text-primary, var(--color-neutral-solid-gray-800, #1a1a1a));
  font-family: var(--font-family-sans, 'Noto Sans JP', sans-serif);
  overflow-wrap: anywhere;

  --_border-color: var(--color-neutral-solid-gray-420, #69707d);
  --_padding-block: var(--spacing-16, 1rem);
  --_padding-inline: var(--spacing-16, 1rem);

  &[data-style='list'] {
    border: 1px solid transparent;
    border-bottom-color: var(--_border-color);
  }

  &[data-style='frame'] {
    border-radius: var(--border-radius-16, 1rem);
    border: 1px solid var(--_border-color);
  }

  // ---------- body --------------------------------------------------------
  &__body {
    position: relative;
    z-index: 0;
    display: flex;
    flex-grow: 1;
    align-items: center;
    gap: var(--spacing-16, 1rem);
    outline-offset: calc(-1 / 16 * 1rem);
    border-radius: inherit;
    padding: var(--_padding-block) var(--_padding-inline);
    color: inherit;
    text-decoration: none;
  }

  // Clickable rows (anchor body) get the DADS focus ring on keyboard focus.
  a.dads-resource-list__body {
    @include ring.dads-focus-ring;

    @media (hover: hover) {
      &:hover {
        outline: calc(2 / 16 * 1rem) solid var(--color-neutral-black, #000);
        background: var(--color-neutral-solid-gray-50, #f5f5f5);
      }
    }
  }

  // ---------- media (thumbnail / icon) ------------------------------------
  &__thumbnail {
    flex-shrink: 0;
    width: calc(64 / 16 * 1rem);
    height: calc(64 / 16 * 1rem);
    object-fit: cover;
    border-radius: var(--border-radius-4, 0.25rem);
    background-color: var(--color-neutral-solid-gray-50, #f5f5f5);
  }

  &__icon {
    flex-shrink: 0;
    width: calc(40 / 16 * 1rem);
    height: calc(40 / 16 * 1rem);
    font-size: calc(32 / 16 * 1rem);
    line-height: 1;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: var(--color-text-secondary, var(--color-neutral-solid-gray-700, #595959));
  }

  // ---------- contents column --------------------------------------------
  &__contents {
    width: 0;
    display: flex;
    flex-grow: 1;
    flex-shrink: 1;
    flex-direction: column;
    gap: var(--spacing-4, 0.25rem);
    font-weight: normal;
    font-size: var(--font-size-16, 1rem);
    line-height: 1.3;
    letter-spacing: 0;
  }

  &__contents > * {
    max-width: 100%;
  }

  &__title {
    margin: 0;
    color: var(--color-text-primary, var(--color-neutral-solid-gray-900, #0f0f0f));
    font-weight: bold;
    font-size: var(--font-size-20, 1.25rem);
    line-height: 1.5;
    letter-spacing: 0.02em;
  }

  // When the body is a real anchor, the title inherits link color + underline
  // so the entire row reads as one large link target.
  a.dads-resource-list__body .dads-resource-list__title {
    color: var(--color-primitive-blue-1000, #001a9c);
    text-decoration: underline;
    text-decoration-thickness: calc(1 / 16 * 1rem);
    text-underline-offset: calc(3 / 16 * 1rem);
  }

  @media (hover: hover) {
    a.dads-resource-list__body:hover .dads-resource-list__title {
      color: var(--color-primitive-blue-900, #001480);
      text-decoration-thickness: calc(3 / 16 * 1rem);
    }
  }

  &__support > * {
    margin: 0;
    color: var(--color-text-secondary, var(--color-neutral-solid-gray-700, #595959));
    font-size: var(--font-size-14, 0.875rem);
    line-height: 1.4;
  }

  // ---------- tags --------------------------------------------------------
  &__tags {
    list-style: none;
    margin: var(--spacing-4, 0.25rem) 0 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-4, 0.25rem);
  }

  &__tag {
    display: inline-flex;
    align-items: center;
    padding: calc(2 / 16 * 1rem) var(--spacing-8, 0.5rem);
    border: 1px solid var(--color-neutral-solid-gray-420, #69707d);
    border-radius: calc(999 / 16 * 1rem);
    background-color: var(--color-neutral-white, #fff);
    color: var(--color-text-secondary, var(--color-neutral-solid-gray-700, #595959));
    font-size: var(--font-size-12, 0.75rem);
    line-height: 1.2;
  }

  // ---------- trailing sub slot (date) -----------------------------------
  &__sub {
    flex-shrink: 0;
    font-weight: normal;
    font-size: var(--font-size-16, 1rem);
    line-height: 1.3;
    letter-spacing: 0;
    color: var(--color-text-secondary, var(--color-neutral-solid-gray-700, #595959));
  }

  &__sub > * {
    margin: 0;
  }

  // ---------- kind + state ------------------------------------------------
  &--kind-form &__body {
    cursor: pointer;
  }

  &--selected {
    background-color: var(--color-info-bg, #e8eaf6);
    border-color: var(--color-brand-primary, #0017c1);
  }

  &--disabled {
    opacity: 0.6;
    pointer-events: none;
  }

  // ---------- trailing action button -------------------------------------
  &__action {
    @include base.dads-reset-button;
    @include ring.dads-focus-ring;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 2.75rem;
    min-height: 2.75rem;
    padding: 0 var(--spacing-12, 0.75rem);
    margin-inline: var(--spacing-8, 0.5rem);
    border-radius: var(--border-radius-4, 0.25rem);
    color: var(--color-brand-primary, #0017c1);
    background-color: transparent;
    font: inherit;
    font-size: 1.25rem;
    line-height: 1;
    cursor: pointer;
    text-decoration: none;
    flex-shrink: 0;

    &:hover {
      background-color: var(--color-info-bg, rgba(0, 23, 193, 0.06));
    }
  }

  // ---------- forced colors ---------------------------------------------
  @include base.dads-forced-colors {
    border-color: CanvasText;

    &[data-style='list'] {
      border-bottom-color: CanvasText;
    }

    &__tag {
      border-color: CanvasText;
    }

    a.dads-resource-list__body:focus-visible {
      outline: 2px solid CanvasText;
      outline-offset: 2px;
    }
  }
}
</style>
