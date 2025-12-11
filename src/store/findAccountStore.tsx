import { create } from 'zustand'

type FindAccountState = {
  name: string
  phoneNumber: string
  email: string
  setName: (name: string) => void
  setPhoneNumber: (phoneNumber: string) => void
  setEmail: (email: string) => void
  reset: () => void
}

const initialState = {
  name: '',
  phoneNumber: '',
  email: '',
  verificationCode: '',
}

const useFindAccountStore = create<FindAccountState>((set) => ({
  ...initialState,

  setName: (name) => set({ name }),
  setPhoneNumber: (phoneNumber) => set({ phoneNumber }),
  setEmail: (email) => set({ email }),

  reset: () => set(initialState),
}))

export default useFindAccountStore
