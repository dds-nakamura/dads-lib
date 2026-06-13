<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'

import { DadsHeading } from '@dads/vue'

const { t } = useI18n()
</script>

<template>
  <main class="login">
    <DadsHeading as="h1" size="28">{{ t('login.heading') }}</DadsHeading>
    <p>{{ t('login.message') }}</p>
    <!-- ログイン画面は新規アプリ側で実装するためのスタブ。 -->
    <RouterLink to="/">{{ t('nav.dashboard') }}</RouterLink>
  </main>
</template>

<style scoped>
.login {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-16, 1rem);
  max-width: 24rem;
  margin: 0 auto;
  padding: var(--spacing-32, 2rem) var(--spacing-16, 1rem);
}
</style>
