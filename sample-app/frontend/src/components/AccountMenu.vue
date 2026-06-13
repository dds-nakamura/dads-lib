<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, useId } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { DadsIcon } from '@dads/vue'

import { useCurrentUser } from '@/composables/useCurrentUser'

const { t } = useI18n()
const router = useRouter()
const { user, initial } = useCurrentUser()

const open = ref(false)
const rootRef = ref<HTMLElement | null>(null)
const triggerRef = ref<HTMLButtonElement | null>(null)
const menuId = useId()

function toggle(): void {
  open.value = !open.value
}

function close(returnFocus = false): void {
  if (!open.value) return
  open.value = false
  if (returnFocus) triggerRef.value?.focus()
}

function onLogout(): void {
  close()
  // ログアウト処理は実プロジェクトで実装する。ここでは login スタブへ遷移。
  void router.push({ name: 'login' })
}

function onDocumentPointerDown(event: MouseEvent): void {
  if (!open.value) return
  const target = event.target as Node | null
  if (target && rootRef.value?.contains(target)) return
  close()
}

function onKeydown(event: KeyboardEvent): void {
  if (event.key === 'Escape') {
    event.preventDefault()
    close(true)
  }
}

onMounted(() => {
  document.addEventListener('pointerdown', onDocumentPointerDown, true)
})

onBeforeUnmount(() => {
  document.removeEventListener('pointerdown', onDocumentPointerDown, true)
})
</script>

<template>
  <div ref="rootRef" class="account-menu" @keydown="onKeydown">
    <!-- 頭文字アバターのトリガー (枠なし) -->
    <button
      ref="triggerRef"
      type="button"
      class="account-menu__trigger"
      :aria-label="t('header.accountMenu')"
      :aria-controls="menuId"
      :aria-expanded="open"
      aria-haspopup="menu"
      @click="toggle"
    >
      <span class="account-menu__avatar" aria-hidden="true">{{ initial }}</span>
      <DadsIcon
        name="keyboard_arrow_down"
        class="account-menu__caret"
        :class="{ 'account-menu__caret--open': open }"
        :size="20"
      />
    </button>

    <div v-show="open" :id="menuId" class="account-menu__popup" role="menu">
      <!-- ユーザー情報ヘッダー (非インタラクティブ) -->
      <div class="account-menu__header">
        <span class="account-menu__name">{{ user.name }}</span>
        <span class="account-menu__email">{{ user.email }}</span>
      </div>
      <hr class="account-menu__divider" />
      <button type="button" class="account-menu__item" role="menuitem" @click="onLogout">
        <DadsIcon name="logout" class="account-menu__item-icon" :size="20" />
        <span>{{ t('header.logout') }}</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.account-menu {
  position: relative;
  display: inline-flex;
}

/* トリガー: 枠なし。アバター + キャレットのみ。 */
.account-menu__trigger {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-4, 0.25rem);
  padding: var(--spacing-4, 0.25rem);
  border: 0;
  background: transparent;
  border-radius: var(--border-radius-8, 0.5rem);
  cursor: pointer;
  color: var(--color-text-primary, #1a1a1a);
}

.account-menu__trigger:hover {
  background-color: var(--color-bg-hover, rgba(0, 0, 0, 0.05));
}

.account-menu__trigger:focus-visible {
  outline: 2px solid var(--color-primitive-blue-700, #0017c1);
  outline-offset: 2px;
}

.account-menu__avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background-color: var(--color-neutral-solid-gray-600, #5f6368);
  color: var(--color-neutral-white, #fff);
  font-size: var(--font-size-14, 0.875rem);
  font-weight: 700;
  line-height: 1;
}

.account-menu__caret {
  font-size: 1.25rem;
  color: var(--color-neutral-solid-gray-700, #4e5258);
  transition: transform 0.15s ease;
}

.account-menu__caret--open {
  transform: rotate(180deg);
}

/* ポップアップ */
.account-menu__popup {
  position: absolute;
  top: calc(100% + var(--spacing-4, 0.25rem));
  inset-inline-end: 0;
  z-index: 10;
  min-width: 16rem;
  background-color: var(--color-neutral-white, #fff);
  border: 1px solid var(--color-neutral-solid-gray-50, #e8e8e8);
  border-radius: var(--border-radius-8, 0.5rem);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  font-family: var(--font-family-sans, 'Noto Sans JP', sans-serif);
}

.account-menu__header {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2, 0.125rem);
  padding: var(--spacing-16, 1rem);
}

.account-menu__name {
  font-weight: 700;
  color: var(--color-primitive-blue-1000, #001a9c);
}

.account-menu__email {
  font-size: var(--font-size-14, 0.875rem);
  color: var(--color-neutral-solid-gray-700, #4e5258);
  word-break: break-all;
}

.account-menu__divider {
  margin: 0;
  border: 0;
  border-top: 1px solid var(--color-neutral-solid-gray-50, #e8e8e8);
}

.account-menu__item {
  display: flex;
  align-items: center;
  gap: var(--spacing-8, 0.5rem);
  width: 100%;
  padding: var(--spacing-12, 0.75rem) var(--spacing-16, 1rem);
  border: 0;
  background: transparent;
  color: inherit;
  font: inherit;
  text-align: start;
  cursor: pointer;
}

.account-menu__item:hover {
  background-color: var(--color-neutral-solid-gray-50, #f5f5f5);
}

.account-menu__item:focus-visible {
  outline: 2px solid var(--color-primitive-blue-700, #0017c1);
  outline-offset: -2px;
}

.account-menu__item-icon {
  font-size: 1.25rem;
}
</style>
