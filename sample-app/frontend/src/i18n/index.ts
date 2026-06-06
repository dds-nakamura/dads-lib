import { createI18n } from 'vue-i18n'

import en from './locales/en'
import ja from './locales/ja'

/**
 * アプリがサポートする言語の一覧。`LanguageSelector` の options と
 * `<html lang>` 属性の制御に使う唯一の真実の源。
 */
export const SUPPORTED_LOCALES = [
  { value: 'ja', label: '日本語' },
  { value: 'en', label: 'English' },
] as const

export type AppLocale = (typeof SUPPORTED_LOCALES)[number]['value']

const FALLBACK_LOCALE: AppLocale = 'ja'

/**
 * ブラウザの言語設定からサポート対象の locale を判定する。
 * サポート外の場合はフォールバック (ja) を返す。
 */
export function detectBrowserLocale(): AppLocale {
  const browser = navigator.language.split('-')[0]
  const matched = SUPPORTED_LOCALES.find((l) => l.value === browser)
  return matched ? matched.value : FALLBACK_LOCALE
}

export const i18n = createI18n({
  legacy: false,
  locale: detectBrowserLocale(),
  fallbackLocale: FALLBACK_LOCALE,
  messages: { ja, en },
})

/**
 * locale を切り替え、`<html lang>` 属性も同期する。
 * `LanguageSelector` の `update:modelValue` から呼ぶ。
 */
export function setLocale(locale: string): void {
  i18n.global.locale.value = locale as AppLocale
  document.documentElement.lang = locale
}
