<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'

import { DadsDrawer, DadsMenuList, type DadsDrawerItem, type DadsMenuListItem } from '@dads/vue'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()

// モバイル Drawer の開閉状態 (v-model)。
const open = defineModel<boolean>({ default: false })

// 固定メニュー用 (DadsMenuList) — current ハイライトを route に連動。
const menuItems = computed<DadsMenuListItem[]>(() => [
  {
    label: t('nav.dashboard'),
    href: '/',
    frontIcon: 'mdi-view-dashboard',
    active: route.name === 'dashboard',
  },
])

// Drawer 用 (DadsDrawerItem)。href は semantics 用に残しつつ SPA 遷移する。
const drawerItems = computed<DadsDrawerItem[]>(() => [
  {
    label: t('nav.dashboard'),
    href: '/',
    icon: 'mdi-view-dashboard',
  },
])

/**
 * href 付き項目を vue-router で SPA 遷移させる。`<a>` の既定挙動 (フルリロード)
 * を抑止し、修飾キー併用時 (新規タブ等) はブラウザ既定に委ねる。
 */
function navigate(item: DadsMenuListItem | DadsDrawerItem, event: MouseEvent): void {
  if (!item.href) return
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
  event.preventDefault()
  open.value = false
  void router.push(item.href)
}
</script>

<template>
  <!-- PC: 固定サイドメニューパネル (768px 以上で表示) -->
  <nav class="side-menu" :aria-label="t('nav.section')">
    <DadsMenuList :items="menuItems" type="box" @click:item="navigate" />
  </nav>

  <!-- モバイル: ハンバーガーから開く Drawer (768px 未満) -->
  <DadsDrawer
    v-model="open"
    :items="drawerItems"
    :title="t('nav.section')"
    :nav-aria-label="t('nav.section')"
    placement="left"
    @click:item="navigate"
  />
</template>

<style scoped>
.side-menu {
  display: none;
  width: 16rem;
  flex-shrink: 0;
  padding: var(--spacing-16, 1rem);
  border-right: 1px solid var(--color-border-divider, rgba(0, 0, 0, 0.1));
  background-color: var(--color-background-secondary, #f5f5f5);
}

/* PC 幅では固定パネルを表示し、Drawer は CSS では制御しない (modelValue が false 固定) */
@media (min-width: 768px) {
  .side-menu {
    display: block;
  }
}
</style>
