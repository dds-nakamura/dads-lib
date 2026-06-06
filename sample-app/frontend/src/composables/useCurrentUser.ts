import { computed, readonly, ref } from 'vue'

/**
 * ログイン中ユーザーの情報。実プロジェクトでは認証ストア / API の戻り値に
 * 差し替える。テンプレートではスタブ値を返す。
 */
export interface CurrentUser {
  name: string
  email: string
}

// スタブ。実装時はストア (Pinia 等) や API から取得した値に置き換える。
const user = ref<CurrentUser>({
  name: '中村開発',
  email: 'nakamura_kouji@dds.co.jp',
})

export function useCurrentUser() {
  // 頭文字アバター用。サロゲートペア (絵文字等) も 1 文字として扱う。
  const initial = computed(() => {
    const name = user.value.name.trim()
    return name ? Array.from(name)[0] : '?'
  })

  function setUser(next: CurrentUser): void {
    user.value = next
  }

  return {
    user: readonly(user),
    initial,
    setUser,
  }
}
