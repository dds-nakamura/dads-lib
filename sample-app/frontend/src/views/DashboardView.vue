<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { DadsHeading } from '@dads/vue'

const { t } = useI18n()
</script>

<template>
  <section class="dashboard">
    <DadsHeading as="h1" size="32">{{ t('dashboard.heading') }}</DadsHeading>
    <!-- メインパネルは空。新規アプリのコンテンツをここに実装する。 -->
    <p class="dashboard__empty">{{ t('dashboard.empty') }}</p>
  </section>
</template>

<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-16, 1rem);
}

.dashboard__empty {
  color: var(--color-text-description, #5a5a5a);
}
</style>
