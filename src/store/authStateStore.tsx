import { create } from 'zustand'
import { persist } from 'zustand/middleware'
type AuthState = {
  accessToken: string | null
  setAccessToken: (token: string | null) => void
}

const AuthStateStore = create(
  persist<AuthState>(
    (set) => ({
      accessToken: null,
      setAccessToken: (token) => set({ accessToken: token }),
    }),
    {
      name: 'auth-token',
    }
  )
)

export default AuthStateStore
