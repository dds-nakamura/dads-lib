import { defineConfig, mergeConfig, type UserConfig } from 'vitest/config'
import viteConfig from './vite.config'

// vite 7 と vitest 3 で型定義が分岐するため、UserConfig として明示的にキャスト
// した上で mergeConfig に渡す。ランタイムの merge 動作は同一。
export default mergeConfig(
  viteConfig as UserConfig,
  defineConfig({
    test: {
      // 移行元 web-label-print と環境を合わせるため happy-dom を使う。
      // 一部テスト (DadsTextarea の auto-resize 計算) は happy-dom の
      // getComputedStyle().lineHeight が空文字を返す挙動に依存している。
      environment: 'happy-dom',
      globals: true,
      setupFiles: ['./test/setup.ts'],
      // テストはクラス名・属性・DOM 構造のみを検証し、computed style は見ない。
      // sass-embedded の dispatcher が複数 worker で torn-down 問題を起こすため
      // CSS 処理は skip する (vue template の静的 class は保持される)。
      css: false,
      coverage: {
        provider: 'v8',
        reporter: ['text', 'html', 'lcov'],
        include: ['src/components/**/*.{vue,ts}'],
        exclude: ['**/__tests__/**', '**/*.types.ts', '**/index.ts'],
      },
    },
  }),
)
