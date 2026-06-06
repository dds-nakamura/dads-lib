<script setup lang="ts">
import { computed } from 'vue'
import DadsIcon from '../Icon/DadsIcon.vue'
import type {
  DadsPageNavigationEmits,
  DadsPageNavigationPageEntry,
  DadsPageNavigationProps,
} from './DadsPageNavigation.types'

const props = withDefaults(defineProps<DadsPageNavigationProps>(), {
  maxPageButtons: 7,
  showPrevNext: true,
  showFirstLast: false,
  prevLabel: '前のページ',
  nextLabel: '次のページ',
  firstLabel: '最初のページ',
  lastLabel: '最後のページ',
  ariaLabel: 'ページ送り',
  disabled: false,
})

const emit = defineEmits<DadsPageNavigationEmits>()

// Compute the page-number list to render, with `'ellipsis'` placeholders
// inserted to keep the first / last / current pages always visible when
// totalPages exceeds maxPageButtons.
const pages = computed<DadsPageNavigationPageEntry[]>(() => {
  const total = Math.max(1, Math.floor(props.totalPages))
  const max = Math.max(0, Math.floor(props.maxPageButtons))
  if (max <= 0) return []
  if (total <= max) return Array.from({ length: total }, (_, i) => i + 1)

  // Always-shown buttons: first, last, current ± window
  // Remaining slots after first/last are split around the current page.
  const innerSlots = Math.max(0, max - 2) // exclude first & last
  const half = Math.floor((innerSlots - 1) / 2)
  let start = Math.max(2, props.modelValue - half)
  let end = Math.min(total - 1, start + innerSlots - 1)
  if (end - start + 1 < innerSlots) {
    start = Math.max(2, end - innerSlots + 1)
  }

  const out: DadsPageNavigationPageEntry[] = [1]
  if (start > 2) out.push('ellipsis')
  for (let p = start; p <= end; p++) out.push(p)
  if (end < total - 1) out.push('ellipsis')
  out.push(total)
  return out
})

const isCurrent = (p: number) => p === props.modelValue

const isPrevDisabled = computed(() => props.disabled || props.modelValue <= 1)
const isNextDisabled = computed(() => props.disabled || props.modelValue >= props.totalPages)
const isFirstDisabled = isPrevDisabled
const isLastDisabled = isNextDisabled

const goTo = (target: number) => {
  if (props.disabled) return
  const clamped = Math.max(1, Math.min(props.totalPages, Math.floor(target)))
  if (clamped === props.modelValue) return
  emit('update:modelValue', clamped)
  emit('change', clamped)
}
</script>

<template>
  <nav class="dads-page-navigation" :aria-label="ariaLabel">
    <ul class="dads-page-navigation__list">
      <li v-if="showFirstLast" class="dads-page-navigation__item">
        <button
          type="button"
          class="dads-page-navigation__btn dads-page-navigation__btn--first"
          :disabled="isFirstDisabled || undefined"
          :aria-label="firstLabel"
          @click="goTo(1)"
        >
          <DadsIcon name="keyboard_double_arrow_left" :size="20" />
        </button>
      </li>
      <li v-if="showPrevNext" class="dads-page-navigation__item">
        <button
          type="button"
          class="dads-page-navigation__btn dads-page-navigation__btn--prev"
          :disabled="isPrevDisabled || undefined"
          @click="goTo(modelValue - 1)"
        >
          <DadsIcon name="chevron_left" :size="20" />
          <span class="dads-page-navigation__label">{{ prevLabel }}</span>
        </button>
      </li>
      <template v-for="(entry, idx) in pages" :key="`p-${idx}-${entry}`">
        <li v-if="entry === 'ellipsis'" class="dads-page-navigation__item">
          <span class="dads-page-navigation__ellipsis" aria-hidden="true">…</span>
        </li>
        <li v-else class="dads-page-navigation__item">
          <button
            type="button"
            class="dads-page-navigation__btn dads-page-navigation__btn--page"
            :class="{ 'is-active': isCurrent(entry) }"
            :aria-current="isCurrent(entry) ? 'page' : undefined"
            :disabled="disabled || undefined"
            @click="goTo(entry)"
          >
            {{ entry }}
          </button>
        </li>
      </template>
      <li v-if="showPrevNext" class="dads-page-navigation__item">
        <button
          type="button"
          class="dads-page-navigation__btn dads-page-navigation__btn--next"
          :disabled="isNextDisabled || undefined"
          @click="goTo(modelValue + 1)"
        >
          <span class="dads-page-navigation__label">{{ nextLabel }}</span>
          <DadsIcon name="chevron_right" :size="20" />
        </button>
      </li>
      <li v-if="showFirstLast" class="dads-page-navigation__item">
        <button
          type="button"
          class="dads-page-navigation__btn dads-page-navigation__btn--last"
          :disabled="isLastDisabled || undefined"
          :aria-label="lastLabel"
          @click="goTo(totalPages)"
        >
          <DadsIcon name="keyboard_double_arrow_right" :size="20" />
        </button>
      </li>
    </ul>
  </nav>
</template>

<style scoped lang="scss">
@use '../../styles/base' as base;
@use '../../styles/focus-ring' as ring;

.dads-page-navigation {
  display: block;
  font-family: var(--font-family-sans, 'Noto Sans JP', sans-serif);
  font-size: var(--font-size-14, 0.875rem);
  line-height: var(--line-height-170, 1.7);
  letter-spacing: 0.02em;
  color: var(--color-neutral-solid-gray-900, #1a1a1c);

  &__list {
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
    gap: calc(4 / 16 * 1rem);
    list-style: none;
    margin: 0;
    padding: 0;
  }

  &__item {
    display: flex;
  }

  &__btn {
    @include base.dads-reset-button;
    @include ring.dads-focus-ring;

    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: calc(4 / 16 * 1rem);
    box-sizing: border-box;
    min-width: 2rem;
    min-height: 2rem;
    border: 1px solid transparent;
    border-radius: var(--border-radius-4, 0.25rem);
    padding: calc(4 / 16 * 1rem) calc(8 / 16 * 1rem);
    background-color: transparent;
    color: var(--color-primitive-blue-900, #002fa1);
    font: inherit;
    text-decoration: none;
    cursor: pointer;

    @media (hover: hover) {
      &:not(:disabled):hover {
        background-color: var(--color-neutral-solid-gray-50, #f3f4f5);
      }
    }

    &:disabled {
      cursor: not-allowed;
      color: var(--color-neutral-solid-gray-420, #d6d6d6);
      pointer-events: none;
    }

    &--page.is-active {
      background-color: var(--color-primitive-blue-900, #002fa1);
      color: var(--color-neutral-white, #fff);
      font-weight: 700;
      cursor: default;

      @media (hover: hover) {
        &:hover {
          background-color: var(--color-primitive-blue-900, #002fa1);
        }
      }
    }
  }

  &__ellipsis {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 2rem;
    min-height: 2rem;
    padding: calc(4 / 16 * 1rem) calc(8 / 16 * 1rem);
    color: var(--color-neutral-solid-gray-420, #d6d6d6);
    user-select: none;
  }

  // -------------------- forced colors ------------------------------------
  @include base.dads-forced-colors {
    &__btn {
      color: LinkText;
      border: 1px solid CanvasText;

      &:disabled {
        color: GrayText;
        border-color: GrayText;
      }

      &--page.is-active {
        background-color: Highlight;
        color: HighlightText;
        border-color: Highlight;
      }
    }
  }
}
</style>
