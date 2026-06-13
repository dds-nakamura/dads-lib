<script setup lang="ts">
import { computed } from 'vue'
import DadsIcon from '../Icon/DadsIcon.vue'
import type { DadsMenuListEmits, DadsMenuListItem, DadsMenuListProps } from './DadsMenuList.types'

const props = withDefaults(defineProps<DadsMenuListProps>(), {
  type: 'standard',
  size: 'regular',
  indentation: 0,
  ariaLabel: undefined,
})

const emit = defineEmits<DadsMenuListEmits>()

// 子メニュー描画時、ルートと同じ type / size を継承して再帰的に
// `<DadsMenuList>` を埋め込む。
const childIndentation = computed(() => props.indentation + 1)

const rootStyle = computed<Record<string, string> | undefined>(() =>
  props.indentation > 0 ? { '--menu-list-indentation': String(props.indentation) } : undefined,
)

const isAnchor = (item: DadsMenuListItem) => Boolean(item.href) && !item.disabled

const itemAttrs = (item: DadsMenuListItem) => ({
  class: 'dads-menu-list__item',
  'data-type': props.type,
  'data-size': props.size,
  ...(item.active ? { 'data-current': '' } : {}),
  ...(item.expanded ? { 'data-expanded': '' } : {}),
})

const handleClick = (item: DadsMenuListItem, event: MouseEvent) => {
  if (item.disabled) {
    event.preventDefault()
    return
  }
  emit('click:item', item, event)
}

// 子からの click をルートまでバブリングさせ、消費側が常に DadsMenuList の
// `click:item` を購読すれば良いようにする。
const handleChildClick = (item: DadsMenuListItem, event: MouseEvent) => {
  emit('click:item', item, event)
}
</script>

<template>
  <component
    :is="ariaLabel ? 'nav' : 'ul'"
    v-if="ariaLabel"
    class="dads-menu-list-root"
    :aria-label="ariaLabel"
  >
    <ul class="dads-menu-list" :style="rootStyle">
      <li v-for="(item, idx) in items" :key="idx">
        <template v-if="item.divider">
          <div
            v-if="typeof item.divider === 'object' && item.divider.title"
            class="dads-menu-list__section"
            role="presentation"
          >
            <span class="dads-menu-list__section-title">{{ item.divider.title }}</span>
          </div>
          <hr v-else class="dads-menu-list__divider" />
        </template>
        <a
          v-else-if="isAnchor(item)"
          v-bind="itemAttrs(item)"
          :href="item.href"
          :aria-current="item.active ? 'page' : undefined"
          @click="handleClick(item, $event)"
        >
          <DadsIcon
            v-if="item.frontIcon"
            :name="item.frontIcon"
            class="dads-menu-list__front-icon"
            :size="20"
          />
          <span class="dads-menu-list__label">
            {{ item.label }}
            <DadsIcon
              v-if="item.tailIcon"
              :name="item.tailIcon"
              class="dads-menu-list__tail-icon"
              :size="16"
              :label="item.tailIconLabel || undefined"
            />
          </span>
          <DadsIcon
            v-if="item.endIcon"
            :name="item.endIcon"
            class="dads-menu-list__end-icon"
            :size="16"
          />
        </a>
        <button
          v-else
          type="button"
          v-bind="itemAttrs(item)"
          :disabled="item.disabled || undefined"
          :aria-current="item.active ? 'page' : undefined"
          :aria-expanded="
            item.children && item.children.length > 0 ? Boolean(item.expanded) : undefined
          "
          @click="handleClick(item, $event)"
        >
          <DadsIcon
            v-if="item.frontIcon"
            :name="item.frontIcon"
            class="dads-menu-list__front-icon"
            :size="20"
          />
          <span class="dads-menu-list__label">
            {{ item.label }}
            <DadsIcon
              v-if="item.tailIcon"
              :name="item.tailIcon"
              class="dads-menu-list__tail-icon"
              :size="16"
              :label="item.tailIconLabel || undefined"
            />
          </span>
          <DadsIcon
            v-if="item.endIcon"
            :name="item.endIcon"
            class="dads-menu-list__end-icon"
            :size="16"
          />
        </button>
        <DadsMenuList
          v-if="item.children && item.children.length > 0"
          :items="item.children"
          :type="type"
          :size="size"
          :indentation="childIndentation"
          @click:item="handleChildClick"
        />
      </li>
    </ul>
  </component>
  <ul v-else class="dads-menu-list" :style="rootStyle">
    <li v-for="(item, idx) in items" :key="idx">
      <template v-if="item.divider">
        <div
          v-if="typeof item.divider === 'object' && item.divider.title"
          class="dads-menu-list__section"
          role="presentation"
        >
          <span class="dads-menu-list__section-title">{{ item.divider.title }}</span>
        </div>
        <hr v-else class="dads-menu-list__divider" />
      </template>
      <a
        v-else-if="isAnchor(item)"
        v-bind="itemAttrs(item)"
        :href="item.href"
        :aria-current="item.active ? 'page' : undefined"
        @click="handleClick(item, $event)"
      >
        <DadsIcon
          v-if="item.frontIcon"
          :name="item.frontIcon"
          class="dads-menu-list__front-icon"
          :size="20"
        />
        <span class="dads-menu-list__label">
          {{ item.label }}
          <DadsIcon
            v-if="item.tailIcon"
            :name="item.tailIcon"
            class="dads-menu-list__tail-icon"
            :size="16"
            :label="item.tailIconLabel || undefined"
          />
        </span>
        <DadsIcon
          v-if="item.endIcon"
          :name="item.endIcon"
          class="dads-menu-list__end-icon"
          :size="16"
        />
      </a>
      <button
        v-else
        type="button"
        v-bind="itemAttrs(item)"
        :disabled="item.disabled || undefined"
        :aria-current="item.active ? 'page' : undefined"
        :aria-expanded="
          item.children && item.children.length > 0 ? Boolean(item.expanded) : undefined
        "
        @click="handleClick(item, $event)"
      >
        <DadsIcon
          v-if="item.frontIcon"
          :name="item.frontIcon"
          class="dads-menu-list__front-icon"
          :size="20"
        />
        <span class="dads-menu-list__label">
          {{ item.label }}
          <DadsIcon
            v-if="item.tailIcon"
            :name="item.tailIcon"
            class="dads-menu-list__tail-icon"
            :size="16"
            :label="item.tailIconLabel || undefined"
          />
        </span>
        <DadsIcon
          v-if="item.endIcon"
          :name="item.endIcon"
          class="dads-menu-list__end-icon"
          :size="16"
        />
      </button>
      <DadsMenuList
        v-if="item.children && item.children.length > 0"
        :items="item.children"
        :type="type"
        :size="size"
        :indentation="childIndentation"
        @click:item="handleChildClick"
      />
    </li>
  </ul>
</template>

<style scoped lang="scss">
@use '../../styles/base' as base;

.dads-menu-list-root {
  display: block;
}

.dads-menu-list {
  position: relative;
  z-index: 0;
  margin: 0;
  list-style-type: none;
  padding-left: 0;
  color: var(--color-neutral-solid-gray-800, #1a1a1c);
  font-weight: normal;
  font-size: 1rem;
  line-height: 1.3;
  font-family: var(--font-family-sans, 'Noto Sans JP', sans-serif);
  letter-spacing: 0;

  // -------------------- divider / section --------------------------------
  // Plain horizontal rule between menu groups.
  &__divider {
    margin: calc(8 / 16 * 1rem) calc(16 / 16 * 1rem);
    border: 0;
    border-top: 1px solid var(--color-neutral-solid-gray-420, #d6d6d6);
  }

  // Section header (divider + bold category title).
  &__section {
    padding: calc(8 / 16 * 1rem) calc(16 / 16 * 1rem) calc(4 / 16 * 1rem);
    border-top: 1px solid var(--color-neutral-solid-gray-420, #d6d6d6);
    margin-top: calc(4 / 16 * 1rem);
  }

  &__section-title {
    font-size: var(--font-size-14, 0.875rem);
    font-weight: 700;
    color: var(--color-neutral-solid-gray-700, #4d4d4d);
    text-transform: none;
    line-height: 1.4;
    letter-spacing: 0.04em;
  }

  &__item,
  &__item:any-link {
    display: flex;
    align-items: center;
    column-gap: 0.5rem;
    box-sizing: border-box;
    width: stretch;
    border: 0;
    background-color: transparent;
    padding-right: 1rem;
    padding-left: 1rem;
    color: inherit;
    text-align: left;
    font: inherit;
    letter-spacing: inherit;
    text-decoration: none;
    text-decoration-thickness: 0.0625rem;
    cursor: pointer;
  }

  &__item[data-size='regular'] {
    min-height: 2.75rem;
    padding-top: 0.625rem;
    padding-bottom: 0.625rem;
    line-height: 1.3;
  }

  &__item[data-size='small'] {
    min-height: 2.25rem;
    padding-top: 0.375rem;
    padding-bottom: 0.375rem;
    line-height: 1.2;
  }

  &__item[data-type='standard'] {
    margin-left: calc(1rem * var(--menu-list-indentation, 0));

    &[data-size='regular'] {
      border-radius: var(--border-radius-8, 0.5rem);
    }

    &[data-size='small'] {
      border-radius: var(--border-radius-4, 0.25rem);
    }
  }

  &__item[data-type='box'] {
    border-radius: 0;
    padding-left: calc(1rem + 1rem * var(--menu-list-indentation, 0));
  }

  &__item[data-current] {
    background-color: var(--color-primitive-blue-100, #d6e1ff);
    color: var(--color-primitive-blue-1000, #001a59);
    font-weight: bold;
  }

  // Highlight a parent item when one of its descendants is the current page,
  // matching the official `:has(+ * [data-current])` selector.
  &__item:has(+ * [data-current]) {
    background-color: var(--color-primitive-blue-50, #ebf0ff);
    color: var(--color-primitive-blue-1000, #001a59);
  }

  @media (hover: hover) {
    &__item:hover {
      background-color: var(--color-neutral-solid-gray-50, #f3f4f5);
      text-decoration: underline;
      text-underline-offset: 0.1875rem;
    }

    &__item[data-current]:hover,
    &__item:has(+ * [data-current]):hover {
      background-color: var(--color-primitive-blue-50, #ebf0ff);
      color: var(--color-primitive-blue-900, #002fa1);
    }
  }

  // Focus-visible follows the official menu-list spec: a common yellow-300
  // fill plus a variant-specific outline (standard = outset 4px, box = inset).
  // Current / parent-current items keep their blue background under focus.
  &__item:focus-visible {
    position: relative;
    z-index: 1;
    background-color: var(--color-primitive-yellow-300, #ffd43d);
  }

  &__item[data-type='standard']:focus-visible {
    outline: calc(4 / 16 * 1rem) solid var(--color-neutral-black, #000);
    outline-offset: calc(2 / 16 * 1rem);
    box-shadow: 0 0 0 calc(2 / 16 * 1rem) var(--color-primitive-yellow-300, #ffd43d);
  }

  &__item[data-type='box']:focus-visible {
    outline: calc(4 / 16 * 1rem) solid var(--color-neutral-black, #000);
    outline-offset: calc(-4 / 16 * 1rem);
    box-shadow: inset 0 0 0 calc(6 / 16 * 1rem) var(--color-primitive-yellow-300, #ffd43d);
  }

  &__item[data-current]:focus-visible {
    background-color: var(--color-primitive-blue-100, #d6e1ff);
  }

  &__item:has(+ * [data-current]):focus-visible {
    background-color: var(--color-primitive-blue-50, #ebf0ff);
  }

  &__item:focus:not(:focus-visible) {
    outline: none;
  }

  &__item:disabled,
  &__item[aria-disabled='true'] {
    cursor: not-allowed;
    opacity: 0.5;
    pointer-events: none;
  }

  &__front-icon {
    flex-shrink: 0;
    font-size: 1.25em;
    line-height: 1;
  }

  &__tail-icon {
    display: inline-block;
    vertical-align: -0.15em;
    font-size: 1em;
    line-height: 1;
  }

  &__end-icon {
    margin-top: 0.125rem;
    margin-right: -0.25rem;
    margin-left: auto;
    flex-shrink: 0;
    font-size: 1em;
    line-height: 1;
    transition: transform 0.15s ease;
  }

  &__item[data-expanded] &__end-icon {
    transform: rotate(180deg);
  }

  // -------------------- forced colors -----------------------------------
  @include base.dads-forced-colors {
    &__item {
      border: 1px solid transparent;
    }

    &__item[data-current] {
      color: HighlightText;
      background-color: Highlight;
    }
  }
}
</style>
