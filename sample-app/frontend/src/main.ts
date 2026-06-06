import { createApp } from 'vue'

// DADS の本文フォント Noto Sans JP (--font-family-sans の先頭)。
// 自己ホスト (CDN 非依存)。必要な weight のみ読み込む。
import '@fontsource/noto-sans-jp/400.css'
import '@fontsource/noto-sans-jp/500.css'
import '@fontsource/noto-sans-jp/700.css'
// DADS デザイントークン (CSS 変数を :root に注入) → コンポーネント CSS の順で読み込む。
import '@dads/tokens/css'
import '@dads/vue/styles'
// コンポーネントが参照する Material Design Icons の webfont。
import '@mdi/font/css/materialdesignicons.css'
import './styles/global.css'

import App from './App.vue'
import { i18n, setLocale } from './i18n'
import { router } from './router'

// 初期 locale を <html lang> に反映。
setLocale(i18n.global.locale.value)

createApp(App).use(router).use(i18n).mount('#app')
