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

// 이메일  전송
export const usePasswordResetWithEmail = () => {
  return useMutation<ResFindAccount, findAccount400Error, ReqVerifyWithEmail>({
    mutationFn: passwordResetWithEmail,
  })
}

// 이메일, 인증코드 전송
export const useVerifyPasswordResetCode = () => {
  return useMutation<ResFindAccount, findAccount400Error, ReqVerifyEmailCode>({
    mutationFn: verifyPasswordResetCode,
  })
}

// 이메일, 새 비밀번호 전송
export const useResetPassword = () => {
  return useMutation<ResFindAccount, findAccount400Error, ReqResetPassword>({
    mutationFn: resetPassword,
  })
}
