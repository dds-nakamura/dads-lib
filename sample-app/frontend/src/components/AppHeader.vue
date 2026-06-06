<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import { DadsHeaderContainer, DadsLanguageSelector } from '@dads/vue'

import { SUPPORTED_LOCALES, setLocale } from '@/i18n'

import AccountMenu from './AccountMenu.vue'
import AppLauncherLink from './AppLauncherLink.vue'

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
      <!-- 1. ランゲージセレクター ("Language" 文字なし) -->
      <DadsLanguageSelector
        class="header-language"
        :model-value="currentLocale"
        :options="languageOptions"
        :aria-label="t('header.languageLabel')"
        opener-label=""
        size="sm"
        @update:model-value="onLanguageChange"
      />
      <!-- 2. アカウントメニュー (頭文字アバター / ログアウト) -->
      <AccountMenu />
      <!-- 3. アプリ選択リンク (launcher へ画面遷移) -->
      <AppLauncherLink />
    </template>
  </DadsHeaderContainer>
</template>

<style scoped>
/* ランゲージセレクターの "Language" テキストを非表示にする。
   アクセシブル名は aria-label 側で保持される。 */
.header-language :deep(.dads-language-selector__opener-text) {
  display: none;
}
</style>
