<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

import { DadsMenuListBox, type DadsMenuListBoxItem } from '@dads/vue'

const { t } = useI18n()
const router = useRouter()

const open = ref(false)

// ラベルは locale 変更に追従させるため computed。アクションは locale 非依存の
// 安定キーで管理し、index で対応付ける。
const ACTIONS = ['profile', 'logout'] as const

const items = computed<DadsMenuListBoxItem[]>(() => [
  { label: t('header.profile'), iconName: 'mdi-account-cog' },
  { label: t('header.logout'), iconName: 'mdi-logout' },
])

function onSelect(_item: DadsMenuListBoxItem, index: number): void {
  open.value = false
  if (ACTIONS[index] === 'logout') {
    // ログアウト処理は新規アプリ側で実装する。ここでは login スタブへ遷移。
    void router.push({ name: 'login' })
  }
}
</script>

<template>
  <!-- ユーザードロップダウンメニュー。アイコンボタンで開閉する。 -->
  <DadsMenuListBox
    v-model="open"
    class="icon-button-only"
    :items="items"
    :trigger-label="t('header.userMenu')"
    trigger-icon="mdi-account-circle"
    placement="end"
    :aria-label="t('header.userMenu')"
    @click:item="onSelect"
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
