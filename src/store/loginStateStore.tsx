import { create } from 'zustand'
type LoginState = 'GUEST' | 'USER'
interface LoginStore {
  loginState: LoginState
  setLoginState: (set: LoginState) => void
}
// 로그인 상태를 저장하는 로직 => 추후 사용할때 setLoginState('USER')
const LoginStateStore = create<LoginStore>((set) => ({
  loginState: 'GUEST',
  setLoginState: (state) => {
    set({ loginState: state })
  },
}))
export default LoginStateStore
