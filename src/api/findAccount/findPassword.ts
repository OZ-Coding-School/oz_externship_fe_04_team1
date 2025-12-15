import type {
  ReqResetPassword,
  ReqVerifyEmailCode,
  ReqVerifyWithEmail,
} from '@/types/findAccount'
import { axiosInstance } from '../axios'
import { API_PATHS } from '@/constant/api'

export const passwordResetWithEmail = async (data: ReqVerifyWithEmail) => {
  const res = await axiosInstance.post(
    API_PATHS.FIND_ACCOUNT.PASSWORD.SEND_EMAIL.POST,
    data
  )

  return res.data
}

export const verifyPasswordResetCode = async (data: ReqVerifyEmailCode) => {
  const res = await axiosInstance.post(
    API_PATHS.FIND_ACCOUNT.PASSWORD.VERIFY_CODE.POST,
    data
  )

  return res.data
}

export const resetPassword = async (data: ReqResetPassword) => {
  const res = await axiosInstance.post(
    API_PATHS.FIND_ACCOUNT.PASSWORD.RESET_PASSWORD.POST,
    data
  )

  return res.data
}
