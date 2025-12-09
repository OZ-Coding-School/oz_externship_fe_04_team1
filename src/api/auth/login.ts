import type { ReqLoginFormData, ResLoginData } from '@/types/login'
import { axiosInstance } from '../axios'
import { API_BASE_URL, API_PATHS } from '@/constant/api'
import AuthStateStore from '@/store/authStateStore'
import axios from 'axios'

export const loginWithEmail = async (
  data: ReqLoginFormData
): Promise<ResLoginData> => {
  const res = await axiosInstance.post(API_PATHS.LOGIN.EMAIL.POST, data)

  const { access_token } = res.data
  AuthStateStore.getState().setAccessToken(access_token)

  return res.data
}

export const refreshAccessToken = async () => {
  return await axios.post(
    `${API_BASE_URL}${API_PATHS.REFRESH_TOKEN.POST}`,
    {},
    { withCredentials: true }
  )
}

export const loginWithKakao = () => {
  window.location.href = API_PATHS.LOGIN.KAKAO.GET
}
