<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { DadsMenuListBox, type DadsMenuListBoxItem } from '@dads/vue'

const { t } = useI18n()

const open = ref(false)

// アプリ一覧はスタブ。実プロジェクトでは認可済みアプリ一覧で差し替える。
const apps: DadsMenuListBoxItem[] = [
  { label: 'App A', iconName: 'mdi-view-dashboard', href: '#' },
  { label: 'App B', iconName: 'mdi-chart-box', href: '#' },
  { label: 'App C', iconName: 'mdi-cog', href: '#' },
]
</script>

<template>
  <!-- アプリ選択アイコンボタン。triggerLabel はアクセシブル名として保持し、
       視覚的にはアイコンのみ表示する (icon-button-only.css 参照)。 -->
  <DadsMenuListBox
    v-model="open"
    class="icon-button-only"
    :items="apps"
    :trigger-label="t('header.appSwitcher')"
    trigger-icon="mdi-apps"
    placement="end"
    :aria-label="t('header.appSwitcher')"
  />
</template>

<style scoped>
/* trigger をアイコンのみ表示にする。ラベルは sr-only で読み上げ用に残す。 */
.icon-button-only :deep(.dads-menu-list-box__trigger-label) {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.icon-button-only :deep(.dads-menu-list-box__trigger-caret) {
  display: none;
}

/* trigger をアイコン幅に縮めた分、surface の max-width:100% が効いて
   メニュー項目が縦折り返しになるのを防ぐ。 */
.icon-button-only :deep(.dads-menu-list-box__surface) {
  max-width: none;
}
</style>
