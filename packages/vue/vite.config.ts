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
    rolldownOptions: {
      external: ['vue'],
      output: {
        globals: { vue: 'Vue' },
      },
    },
    sourcemap: true,
    cssCodeSplit: false,
    emptyOutDir: true,
  },
  // Vite 8 では Rolldown (Rust) が Rollup+esbuild を置換。
  // CSS minify はデフォルトの Lightning CSS を採用 (Vite 8 推奨)。
  // SCSS の modern API はデフォルト。sass-embedded ではなく
  // sass (dart-sass) を採用するのは、sass-embedded の async dispatcher が
  // vitest 並列実行で落ちる既知の問題があるため。
})
