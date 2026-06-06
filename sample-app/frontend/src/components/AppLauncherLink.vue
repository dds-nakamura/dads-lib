<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

/**
 * アプリ選択ランチャーへの遷移先 URL。
 * 現在のホスト名の先頭サブドメインを除いたルートドメインを使い、
 * `https://app.<rootdomain>/launcher` を生成する。
 * localhost / IP / 単一ラベルのホストではフォールバックして `/launcher`。
 */
const launcherUrl = computed(() => {
  if (typeof window === 'undefined') return '/launcher'
  const host = window.location.hostname
  const labels = host.split('.')
  // localhost や IP、ドメインを構成できないケースはフォールバック。
  const isIp = /^\d+(\.\d+)*$/.test(host)
  if (host === 'localhost' || isIp || labels.length < 2) return '/launcher'
  // 先頭サブドメイン (例: admtool) を除いたルートドメイン。
  const rootDomain = labels.slice(1).join('.')
  return `https://app.${rootDomain}/launcher`
})
</script>

<template>
  <!-- アプリ選択リンク (プルダウンではなく画面遷移)。枠なしのアイコンリンク。 -->
  <a class="app-launcher-link" :href="launcherUrl" :aria-label="t('header.appLauncher')">
    <i class="mdi mdi-apps app-launcher-link__icon" aria-hidden="true" />
  </a>
</template>

<style scoped>
.app-launcher-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border: 0;
  border-radius: var(--border-radius-8, 0.5rem);
  color: var(--color-text-primary, #1a1a1a);
  text-decoration: none;
}

.app-launcher-link:hover {
  background-color: var(--color-bg-hover, rgba(0, 0, 0, 0.05));
}

.app-launcher-link:focus-visible {
  outline: 2px solid var(--color-primitive-blue-700, #0017c1);
  outline-offset: 2px;
}

.app-launcher-link__icon {
  font-size: 1.5rem;
}
</style>
