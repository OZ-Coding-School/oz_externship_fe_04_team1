import type { UserInformation } from '@/types/userInformation'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

//로그인 정보
export type LoginState = 'GUEST' | 'USER'
interface AuthStore {
  //초기세팅값
  accessToken: string | null
  user: UserInformation | null
  loginState: LoginState

  //set함수
  setLoginState: (state: LoginState) => void //로그인상태와도 연결함
  setAccessToken: (token: string) => void
  setUser: (user: UserInformation) => void
  clearAuth: () => void
}

// 리프레쉬토큰으로 액세스토큰값 받아오기
export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      //초기값
      accessToken: null,
      user: null,
      loginState: 'GUEST',
      //set값
      setLoginState(state) {
        set({ loginState: state })
      },
      setAccessToken(token) {
        set({ accessToken: token })
      },
      setUser(user) {
        set({ user: user, loginState: 'USER' })
      },
      clearAuth() {
        set({
          user: null,
          accessToken: null,
          loginState: 'GUEST',
        })
      },
    }),
    {
      name: 'auth-storage',
      //user정보만 local에 저장하는 로직(분기처리)
      partialize: (state) => ({
        user: state.user,
        loginState: state.loginState,
      }),
    }
  )
)
