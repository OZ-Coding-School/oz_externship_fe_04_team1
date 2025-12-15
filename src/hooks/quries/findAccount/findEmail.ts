import {
  findEmailByPhone,
  verifyUserIdentity,
} from '@/api/findAccount/findEmail'
import type {
  findAccount400Error,
  ReqVerifyPhoneCode,
  ReqVerifyUserIdentity,
  ResFindAccount,
  ResFindEmail,
} from '@/types/findAccount'
import { useMutation } from '@tanstack/react-query'

// 이름, 전화번호 전송
export const useVerifyUserIdentity = () => {
  return useMutation<
    ResFindAccount,
    findAccount400Error,
    ReqVerifyUserIdentity
  >({
    mutationFn: verifyUserIdentity,
  })
}

// 인증번호 보내기
export const useFindEmailByPhone = () => {
  return useMutation<ResFindEmail, findAccount400Error, ReqVerifyPhoneCode>({
    mutationFn: findEmailByPhone,
  })
}
