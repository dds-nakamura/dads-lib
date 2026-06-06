<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import { DadsHeaderContainer, DadsLanguageSelector } from '@dads/vue'

import { SUPPORTED_LOCALES, setLocale } from '@/i18n'

import AppSwitcher from './AppSwitcher.vue'
import UserMenu from './UserMenu.vue'

const { t, locale } = useI18n()

const emit = defineEmits<{ 'toggle-menu': [] }>()

const languageOptions = SUPPORTED_LOCALES.map((l) => ({ value: l.value, label: l.label }))

const currentLocale = computed(() => locale.value)

function onLanguageChange(value: string): void {
  setLocale(value)
}
</script>

<template>
  <DadsHeaderContainer
    variant="wide-slim"
    :logo-label="t('app.logoLabel')"
    logo-href="/"
    :menu-toggle-label="t('header.menuToggle')"
    @click:menu="emit('toggle-menu')"
  >
    <template #actions>
      <!-- アプリ選択アイコンボタン -->
      <AppSwitcher />
      <!-- ユーザードロップダウンメニュー (ログアウト含む) -->
      <UserMenu />
      <!-- ランゲージセレクター -->
      <DadsLanguageSelector
        :model-value="currentLocale"
        :options="languageOptions"
        :aria-label="t('header.languageLabel')"
        size="sm"
        @update:model-value="onLanguageChange"
      />
    </template>
  </DadsHeaderContainer>
</template>
