import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath } from 'node:url'

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: { vue: 'Vue' },
      },
    },
    sourcemap: true,
    cssCodeSplit: false,
    emptyOutDir: true,
  },
  // Vite 7 は SCSS の modern API がデフォルト。sass-embedded ではなく
  // sass (dart-sass) を採用するのは、sass-embedded の async dispatcher が
  // vitest 並列実行で落ちる既知の問題があるため。
})
