import type { ReqLoginFormData, ResLoginData } from '@/types/login'
import { axiosInstance } from '../axios'
import { API_PATHS } from '@/constant/api'

export const loginWithEmail = async (
  data: ReqLoginFormData
): Promise<ResLoginData> => {
  const res = await axiosInstance.post(API_PATHS.LOGIN.EMAIL.POST, data)

  return res.data
}
