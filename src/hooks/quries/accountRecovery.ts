import { useMutation } from '@tanstack/react-query'
import { sendEmailRequestApi, verifyRequestApi } from '@/api/accountRecovery'

export const useSendEmailRecovery = () => {
  return useMutation({
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
