import { useMutation } from '@tanstack/react-query'
import { sendEmailRequestApi, verifyRequestApi } from '@/api/accountRecovery'
import type { ApiError } from '@/types/accountRecovery'
export const useSendEmailRecovery = () => {
  return useMutation<void, ApiError, string>({
    mutationFn: sendEmailRequestApi,
    retry: false,
  })
}

export const useVerifyCodeRecovery = () => {
  return useMutation({
    mutationFn: ({ email, code }: { email: string; code: string }) =>
      verifyRequestApi(email, code),
    retry: false,
  })
}
