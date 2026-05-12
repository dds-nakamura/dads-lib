/**
 * 上流 @digital-go-jp/tailwind-theme-plugin v0.3.4 は package.json の
 * `exports` フィールドに `types` condition を含めていないため、
 * moduleResolution: "Bundler" 配下では d.ts を解決できない。
 *
 * ローカルでモジュール宣言を補完して TS エラーを回避する。上流が
 * `exports['.'].types` を追加した時点で本ファイルは削除可能。
 *
 * 参考: https://github.com/digital-go-jp/tailwind-theme-plugin
 */

declare module '@digital-go-jp/tailwind-theme-plugin' {
  import type { PluginCreator, Config } from 'tailwindcss/types/config'

  const daPlugin: {
    handler: PluginCreator
    config?: Partial<Config>
  }

  export default daPlugin
}
