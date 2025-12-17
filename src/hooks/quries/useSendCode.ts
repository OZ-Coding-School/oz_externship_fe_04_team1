import { sendCodeApi } from '@/api/sendCode'
import { useMutation } from '@tanstack/react-query'

export const useSendCode = () => {
  return useMutation({
    mutationFn: sendCodeApi,
  })
}
