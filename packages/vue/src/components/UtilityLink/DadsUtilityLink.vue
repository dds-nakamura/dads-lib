<script setup lang="ts">
import { computed } from 'vue'
import type {
  DadsUtilityLinkEmits,
  DadsUtilityLinkItem,
  DadsUtilityLinkProps,
} from './DadsUtilityLink.types'

const props = withDefaults(defineProps<DadsUtilityLinkProps>(), {
  ariaLabel: 'ユーティリティリンク',
  newTabAriaLabel: '新規タブで開きます',
})

const emit = defineEmits<DadsUtilityLinkEmits>()

/**
 * 単一リンクモードの props を 1 件分の `DadsUtilityLinkItem` に正規化する。
 * `href` / `label` のどちらも未指定なら描画対象なし (空配列を返す)。
 */
const normalizedItems = computed<DadsUtilityLinkItem[]>(() => {
  if (props.items !== undefined) return props.items
  if (props.href === undefined || props.label === undefined) return []
  return [
    {
      label: props.label,
      href: props.href,
      iconName: props.iconName,
      external: props.external,
    },
  ]
})

// リストモード (items が渡された) か単一リンクモードかで根本タグを切り替える。
const isListMode = computed(() => props.items !== undefined)

const handleClick = (item: DadsUtilityLinkItem, index: number, event: MouseEvent) => {
  emit('click:item', item, index, event)
}
</script>

<template>
  <!-- リストモード: <ul> の中に各 <a class="dads-utility-link"> を li で包んで配置 -->
  <ul v-if="isListMode" class="dads-utility-link-list" :aria-label="ariaLabel">
    <li
      v-for="(item, index) in normalizedItems"
      :key="`${item.href}-${index}`"
      class="dads-utility-link-list__item"
    >
      <a
        class="dads-utility-link"
        :href="item.href"
        :target="item.external ? '_blank' : undefined"
        :rel="item.external ? 'noopener noreferrer' : undefined"
        @click="handleClick(item, index, $event)"
      >
        <i
          v-if="item.iconName"
          :class="['mdi', item.iconName, 'dads-utility-link__lead-icon']"
          aria-hidden="true"
        />
        <span class="dads-utility-link__label">{{ item.label }}</span>
        <svg
          v-if="item.external"
          class="dads-utility-link__tail-icon"
          width="16"
          height="16"
          viewBox="0 0 48 48"
          fill="currentcolor"
          role="img"
          :aria-label="newTabAriaLabel"
        >
          <path d="M22 6V9H9V39H39V26H42V42H6V6H22ZM42 6V20H39V11.2L21 29L19 27L36.8 9H28V6H42Z" />
        </svg>
      </a>
    </li>
  </ul>

  <!-- 単一リンクモード: <a class="dads-utility-link"> を直接描画 -->
  <a
    v-else-if="normalizedItems.length === 1"
    class="dads-utility-link"
    :href="normalizedItems[0]!.href"
    :target="normalizedItems[0]!.external ? '_blank' : undefined"
    :rel="normalizedItems[0]!.external ? 'noopener noreferrer' : undefined"
    @click="handleClick(normalizedItems[0]!, 0, $event)"
  >
    <i
      v-if="normalizedItems[0]!.iconName"
      :class="['mdi', normalizedItems[0]!.iconName, 'dads-utility-link__lead-icon']"
      aria-hidden="true"
    />
    <span class="dads-utility-link__label">{{ normalizedItems[0]!.label }}</span>
    <svg
      v-if="normalizedItems[0]!.external"
      class="dads-utility-link__tail-icon"
      width="16"
      height="16"
      viewBox="0 0 48 48"
      fill="currentcolor"
      role="img"
      :aria-label="newTabAriaLabel"
    >
      <path d="M22 6V9H9V39H39V26H42V42H6V6H22ZM42 6V20H39V11.2L21 29L19 27L36.8 9H28V6H42Z" />
    </svg>
  </a>
</template>

<style scoped lang="scss">
@use '../../styles/base' as base;
@use '../../styles/focus-ring' as ring;

// ----------------------------------------------------------------------------
// list mode wrapper (ul). The official HTML reference (multiple.html) uses a
// flex container with baseline alignment and gap. We use <ul> here so the
// markup is semantically a list.
// ----------------------------------------------------------------------------
.dads-utility-link-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: calc(16 / 16 * 1rem);

  &__item {
    display: inline-flex;
    align-items: baseline;
    min-width: 0;
  }
}

// ----------------------------------------------------------------------------
// single link styling — mirrors design-system-example-components-html/
// src/components/utility-link/utility-link.css. All hard-coded values were
// replaced by design tokens where available.
// ----------------------------------------------------------------------------
.dads-utility-link {
  @include ring.dads-focus-ring;

  display: inline-flex;
  align-items: baseline;
  gap: calc(4 / 16 * 1rem);
  width: fit-content;
  font-family: var(--font-family-sans, 'Noto Sans JP', sans-serif);
  font-weight: normal;
  font-size: var(--font-size-16, 1rem);
  line-height: var(--line-height-130, 1.3);
  letter-spacing: 0;
  text-decoration: none;
  text-wrap: pretty;
  border-radius: var(--border-radius-4, 0.25rem);

  &__lead-icon {
    flex-shrink: 0;
    display: inline-block;
    width: 1rem;
    height: 1rem;
    font-size: 1rem;
    line-height: 1;
    color: var(--color-neutral-solid-gray-900, #1a1a1c);
    transform: translateY(0.15em);
  }

  &__label {
    color: var(--color-neutral-solid-gray-800, #424966);
    text-decoration: underline;
    text-decoration-thickness: 1px;
    text-underline-offset: 3px;
  }

  &:visited &__label {
    color: var(--color-neutral-solid-gray-800, #424966);
  }

  @media (hover: hover) {
    &:hover &__label {
      color: var(--color-neutral-solid-gray-800, #424966);
      text-decoration-thickness: 3px;
    }
  }

  &:active &__label {
    color: var(--color-neutral-solid-gray-800, #424966);
    text-decoration-thickness: 1px;
  }

  &__tail-icon {
    flex-shrink: 0;
    display: inline-block;
    width: 1rem;
    height: 1rem;
    color: var(--color-neutral-solid-gray-900, #1a1a1c);
    transform: translateY(0.15em);
  }

  // -------------------- forced colors -------------------------------------
  @include base.dads-forced-colors {
    &__label {
      color: LinkText;
    }

    &__lead-icon,
    &__tail-icon {
      color: LinkText;
    }
  }
}
</style>
