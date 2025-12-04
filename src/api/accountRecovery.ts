import { API_PATHS } from '@/constant/api'
import { axiosInstance } from './axios'
// api 요청

export const sendEmailRequestApi = async (email: string) => {
  const { data } = await axiosInstance.post(
    API_PATHS.ACCOUNT_RECOVERY.SEND_EMAIL.POST,
    { email }
  )

  return data
}

export const verifyRequestApi = async (email: string, code: string) => {
  const { data } = await axiosInstance.post(
    API_PATHS.ACCOUNT_RECOVERY.VERIFY.POST,
    { email, code }
  )

  return data
}
