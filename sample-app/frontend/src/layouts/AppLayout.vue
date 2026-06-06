<script setup lang="ts">
import { ref } from 'vue'
import { RouterView } from 'vue-router'

import AppHeader from '@/components/AppHeader.vue'
import SideMenu from '@/components/SideMenu.vue'

// モバイル Drawer の開閉状態。ヘッダーのハンバーガーから切り替える。
const drawerOpen = ref(false)
</script>

<template>
  <div class="app-layout">
    <AppHeader @toggle-menu="drawerOpen = !drawerOpen" />

    <div class="app-layout__body">
      <SideMenu v-model="drawerOpen" />

      <main class="app-layout__main">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<style scoped>
.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.app-layout__body {
  display: flex;
  flex: 1;
  min-height: 0;
}

.app-layout__main {
  flex: 1;
  min-width: 0;
  padding: var(--spacing-24, 1.5rem);
}

@media (max-width: 767px) {
  .app-layout__main {
    padding: var(--spacing-16, 1rem);
  }
}
</style>
