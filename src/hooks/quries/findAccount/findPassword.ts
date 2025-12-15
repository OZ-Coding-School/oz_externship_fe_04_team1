import {
  passwordResetWithEmail,
  resetPassword,
  verifyPasswordResetCode,
} from '@/api/findAccount/findPassword'
import type {
  findAccount400Error,
  ReqResetPassword,
  ReqVerifyEmailCode,
  ReqVerifyWithEmail,
  ResFindAccount,
} from '@/types/findAccount'
import { useMutation } from '@tanstack/react-query'

export const usePasswordResetWithEmail = () => {
  return useMutation<ResFindAccount, findAccount400Error, ReqVerifyWithEmail>({
    mutationFn: passwordResetWithEmail,
  })
}

export const useVerifyPasswordResetCode = () => {
  return useMutation<ResFindAccount, findAccount400Error, ReqVerifyEmailCode>({
    mutationFn: verifyPasswordResetCode,
  })
}

export const useResetPassword = () => {
  return useMutation<ResFindAccount, findAccount400Error, ReqResetPassword>({
    mutationFn: resetPassword,
  })
}
