import {
  checkNickname,
  sendEmail,
  sendSms,
  submitSignup,
  verifyEmailCode,
  verifySmsCode,
} from '@/api/auth/signup'
import type { ApiError, ResNickname, ReqNicknameOnly } from '@/types/signup'
import { useMutation } from '@tanstack/react-query'

// 닉네임 중복 확인
export const useCheckNickname = () => {
  return useMutation<ResNickname, ApiError, ReqNicknameOnly>({
    mutationFn: checkNickname,
    retry: false,
  })
}

// 이메일 전송
export const useSendEmail = () => {
  return useMutation({
    mutationFn: sendEmail,
  })
}

// 이메일 인증 코드 전송
export const useVerifyEmailCode = () => {
  return useMutation({
    mutationFn: verifyEmailCode,
  })
}

// SMS 전송
export const useSendSms = () => {
  return useMutation({
    mutationFn: sendSms,
  })
}

// SMS 인증 코드 전송
export const useVerifySmsCode = () => {
  return useMutation({
    mutationFn: verifySmsCode,
  })
}

// 회원가입
export const useSubmitSignup = () => {
  return useMutation({
    mutationFn: submitSignup,
    retry: false,
  })
}
