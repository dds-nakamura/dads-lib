---
'@dads/vue': patch
---

build: Vite 7 → Vite 8 (Rolldown) へ移行

`@dads/vue` のビルド基盤を Vite 7.3.3 → Vite 8.0.14 にアップグレード。Vite 8 は Rollup + esbuild の二重バンドラを Rust 製の **Rolldown** に統一しており、当ライブラリでは以下の改善が確認できた:

- **ビルド時間**: 7.59s → 3.34s (約 2.27× 高速)
- **`dist/index.js`**: 214.94 kB → 185.59 kB (-13.7%, gzip 42.98 → 40.18 kB)
- **`dist/index.css`**: 209.58 kB → 206.14 kB (-1.6%, Lightning CSS による minify)

公開 API の変更なし、後方互換 100%。`dist/index.js` / `dist/index.css` / `dist/index.d.ts` のファイル構成は従来通り。

合わせて `vitest`: ^3.2.4 → ^4.0.0、`@vitest/coverage-v8`: ^3.2.4 → ^4.0.0 にも追従。`vite.config.ts` の `rollupOptions` を `rolldownOptions` にリネーム（Vite 8 の compat layer により両表記とも受理されるが、可読性のため）。`apps/docs` (VitePress 1.6.4) は VitePress 2.0 stable 待ちのため、Vite 7 のまま据え置き — pnpm の per-workspace 解決で Vite 7 / 8 が共存する構成。
