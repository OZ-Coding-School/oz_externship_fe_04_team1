import type { ReqLoginFormData, ResLoginData } from '@/types/login'
import { axiosInstance } from '../axios'
import { API_PATHS } from '@/constant/api'
import AuthStateStore from '@/store/authStateStore'

export const loginWithEmail = async (
  data: ReqLoginFormData
): Promise<ResLoginData> => {
  const res = await axiosInstance.post(API_PATHS.LOGIN.EMAIL.POST, data)

  const { access_token } = res.data
  AuthStateStore.getState().setAccessToken(access_token)

  return res.data
}
