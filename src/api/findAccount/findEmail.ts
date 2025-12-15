import type {
  ReqVerifyPhoneCode,
  ReqVerifyUserIdentity,
} from '@/types/findAccount'
import { axiosInstance } from '../axios'
import { API_PATHS } from '@/constant/api'

export const verifyUserIdentity = async (data: ReqVerifyUserIdentity) => {
  const res = await axiosInstance.post(
    API_PATHS.FIND_ACCOUNT.EMAIL.IDENTITY.POST,
    data
  )

  return res.data
}

export const findEmailByPhone = async (data: ReqVerifyPhoneCode) => {
  const res = await axiosInstance.post(
    API_PATHS.FIND_ACCOUNT.EMAIL.VERIFY_CODE.POST,
    data
  )

  return res.data
}
