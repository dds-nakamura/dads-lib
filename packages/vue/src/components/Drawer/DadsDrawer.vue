<script setup lang="ts">
import { onMounted, ref, useId, watch } from 'vue'
import DadsHamburgerMenuButton from '../HamburgerMenuButton/DadsHamburgerMenuButton.vue'
import type { DadsDrawerEmits, DadsDrawerProps } from './DadsDrawer.types'

const props = withDefaults(defineProps<DadsDrawerProps>(), {
  modelValue: false,
  // 公式 playground のアクセシブル名に合わせる。i18n 用に上書き可能。
  title: 'メニュー',
  placement: 'left',
  closeLabel: '閉じる',
})

const emit = defineEmits<DadsDrawerEmits>()

const dialogRef = ref<HTMLDialogElement | null>(null)

const generatedId = useId()
const dialogId = `dads-drawer-${generatedId}`
const headingId = `dads-drawer-heading-${generatedId}`

const close = () => {
  emit('update:modelValue', false)
}

// modelValue の状態をネイティブ <dialog> の showModal/close へ反映する。
// happy-dom など showModal を実装しない環境では open 属性で代替する。
const syncDialog = (open: boolean) => {
  const dialog = dialogRef.value
  if (!dialog) return
  if (open) {
    if (typeof dialog.showModal === 'function') {
      // 既に open の場合 showModal は例外を投げるため二重起動を避ける。
      if (!dialog.open) dialog.showModal()
    } else {
      dialog.setAttribute('open', '')
    }
  } else if (typeof dialog.close === 'function') {
    if (dialog.open) dialog.close()
  } else {
    dialog.removeAttribute('open')
  }
}

// 初期表示 (modelValue=true でマウント) を反映してから、以降の変化を追従する。
onMounted(() => syncDialog(props.modelValue))
watch(() => props.modelValue, syncDialog)

// ネイティブ close イベントは Esc / .close() の双方で発火する。これにより
// Esc-to-close を無償で得る。modelValue が既に false のとき (= こちら起点で
// 閉じた場合) は再発火させず無限ループを防ぐ。
const onClose = () => {
  if (props.modelValue) close()
}

// ネイティブ <dialog> は backdrop クリックでは閉じないため軽量ハンドラを追加。
// クリックが backdrop 領域 (= dialog 自身) に着地したときのみ閉じる。
const onClick = (event: MouseEvent) => {
  if (event.target === dialogRef.value) close()
}
</script>

<template>
  <dialog
    :id="dialogId"
    ref="dialogRef"
    class="dads-drawer"
    :data-placement="placement"
    :aria-labelledby="headingId"
    @close="onClose"
    @click="onClick"
  >
    <h2 :id="headingId" class="dads-u-visually-hidden">{{ title }}</h2>
    <div class="dads-drawer__header">
      <!-- eslint-disable vue/attribute-hyphenation -->
      <!-- ariaControls は HamburgerMenuButton の prop 名。aria- 前置のため
           vue-tsc は kebab (:aria-controls) を prop と認識せず camelCase 必須。 -->
      <DadsHamburgerMenuButton
        :model-value="true"
        :ariaControls="dialogId"
        :close-label="closeLabel"
        @click="close"
      />
      <!-- eslint-enable vue/attribute-hyphenation -->
    </div>
    <div class="dads-drawer__body">
      <slot />
    </div>
  </dialog>
</template>

<style scoped lang="scss">
// 公式 drawer.css を 1:1 で移植。DADS には --spacing-* 軸が無いため
// 余白は calc(N / 16 * 1rem) で表現する (公式と同じ手法)。
.dads-drawer {
  margin: unset;
  max-width: 100%;
  max-height: unset;
  box-sizing: border-box;
  width: calc(288 / 16 * 1rem);
  height: 100vh;
  height: 100dvh;
  box-shadow: var(--elevation-2);
  background-color: var(--color-neutral-white, #fff);
  border: 0;
  padding: 0;
  color: var(--color-neutral-solid-gray-800, #1a1a1a);
  font-weight: normal;
  font-size: calc(16 / 16 * 1rem);
  line-height: 1.7; // --line-height-170
  font-family: var(--font-family-sans, 'Noto Sans JP', sans-serif);
  letter-spacing: 0.02em;

  &[data-placement='right'] {
    left: auto;
    border-left: 1px solid transparent;
  }

  &[data-placement='left'] {
    right: auto;
    border-right: 1px solid transparent;
  }

  &[open] {
    display: grid;
    grid-template: 'header' auto 'body' 1fr / 1fr;
  }

  &::backdrop {
    background-color: var(--color-neutral-opacity-gray-100, rgba(0, 0, 0, 0.1));
  }

  // visually-hidden ユーティリティ (公式 global.css の dads-u-visually-hidden 相当)。
  // Vue パッケージには無いためスコープ内で標準レシピを再現する。
  .dads-u-visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
    border: 0;
  }

  &__header {
    display: flex;
    grid-area: header;
    padding: calc(20 / 16 * 1rem) calc(16 / 16 * 1rem);
  }

  &[data-placement='right'] &__header {
    justify-content: end;
  }

  &[data-placement='left'] &__header {
    justify-content: start;
  }

  &__body {
    grid-area: body;
    overflow: auto;
    overscroll-behavior: contain;
    scrollbar-gutter: stable;
  }
}

// 公式の forced-colors backdrop 強調。mixin はルートで使えない (bare
// forced-color-adjust を吐く) ため、素の @media ブロックで記述する。
@media (forced-colors: active) {
  .dads-drawer::backdrop {
    background-color: #000b;
  }
}
</style>
