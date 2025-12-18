import { create } from 'zustand'
import { persist } from 'zustand/middleware'
type LoginState = 'GUEST' | 'USER'
interface LoginStore {
  loginState: LoginState
  setLoginState: (set: LoginState) => void
}
// 로그인 상태를 저장하는 로직 => 추후 사용할때 setLoginState('USER')
const LoginStateStore = create(
  persist<LoginStore>(
    (set) => ({
      loginState: 'GUEST',
      hasHydrated: false,
      setLoginState: (state) => set({ loginState: state }),
    }),
    {
      name: 'login-state',
    }
  )
)
export default LoginStateStore
