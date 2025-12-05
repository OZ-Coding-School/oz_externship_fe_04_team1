import { loginWithEmail } from '@/api/auth/login'
import type { LoginError, ReqLoginFormData, ResLoginData } from '@/types/login'
import { useMutation } from '@tanstack/react-query'

// 로그인
export const useLoginWithEmail = () => {
  return useMutation<ResLoginData, LoginError, ReqLoginFormData>({
    mutationFn: loginWithEmail,
  })
}
