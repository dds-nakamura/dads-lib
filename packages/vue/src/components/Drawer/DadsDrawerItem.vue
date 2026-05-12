<script setup lang="ts">
import { computed } from 'vue'
import type { DadsDrawerItem } from './DadsDrawer.types'

interface Props {
  item: DadsDrawerItem
}

interface Emits {
  (e: 'click:item', item: DadsDrawerItem, event: MouseEvent): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const hasChildren = computed(
  () => Array.isArray(props.item.children) && props.item.children.length > 0,
)

const isAnchor = computed(() => !hasChildren.value && !!props.item.href)

const itemClasses = computed(() => [
  'dads-drawer__item',
  {
    'dads-drawer__item--with-children': hasChildren.value,
    'dads-drawer__item--disabled': props.item.disabled,
  },
])

const onClick = (event: MouseEvent) => {
  if (props.item.disabled) {
    event.preventDefault()
    return
  }
  emit('click:item', props.item, event)
}

// Nested clicks pass straight through so DadsDrawer receives a single flat
// stream of click:item events regardless of nesting depth.
const onChildClick = (child: DadsDrawerItem, event: MouseEvent) => {
  emit('click:item', child, event)
}
</script>

<template>
  <li :class="itemClasses">
    <details v-if="hasChildren" class="dads-drawer__item-details">
      <summary class="dads-drawer__item-button">
        <i
          v-if="item.icon"
          :class="['mdi', item.icon, 'dads-drawer__item-icon']"
          aria-hidden="true"
        />
        <span class="dads-drawer__item-label">{{ item.label }}</span>
        <i class="mdi mdi-chevron-down dads-drawer__item-chevron" aria-hidden="true" />
      </summary>
      <ul class="dads-drawer__item-children">
        <DadsDrawerItem
          v-for="(child, idx) in item.children"
          :key="idx"
          :item="child"
          @click:item="onChildClick"
        />
      </ul>
    </details>
    <a
      v-else-if="isAnchor"
      :href="item.disabled ? undefined : item.href"
      class="dads-drawer__item-button"
      :aria-disabled="item.disabled || undefined"
      :tabindex="item.disabled ? -1 : undefined"
      @click="onClick"
    >
      <i
        v-if="item.icon"
        :class="['mdi', item.icon, 'dads-drawer__item-icon']"
        aria-hidden="true"
      />
      <span class="dads-drawer__item-label">{{ item.label }}</span>
    </a>
    <button
      v-else
      type="button"
      class="dads-drawer__item-button"
      :disabled="item.disabled"
      @click="onClick"
    >
      <i
        v-if="item.icon"
        :class="['mdi', item.icon, 'dads-drawer__item-icon']"
        aria-hidden="true"
      />
      <span class="dads-drawer__item-label">{{ item.label }}</span>
    </button>
  </li>
</template>
