import { API_BASE_URL } from '@/constant/api'
import AuthStateStore from '@/store/authStateStore'
import axios from 'axios'
import LoginStateStore from '@/store/loginStateStore'
import { ROUTE_PATHS } from '@/constant/route'
import { refreshAccessToken } from './auth/login'

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

// 토큰이 있으면 헤더에 추가
axiosInstance.interceptors.request.use((config) => {
  const token = AuthStateStore.getState().accessToken
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        // 엑세스 토큰 재발급
        const response = await refreshAccessToken()
        const newAccessToken = response.data.access_token
        AuthStateStore.getState().setAccessToken(newAccessToken)

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`

        return axiosInstance(originalRequest)
      } catch (refreshError) {
        // 갱신 실패 시 토큰 제거
        AuthStateStore.getState().setAccessToken(null)
        LoginStateStore.getState().setLoginState('GUEST')

        // 로그인 페이지로 리다이렉트
        window.location.href = ROUTE_PATHS.LOGIN

        return Promise.reject(refreshError)
      }
    }

    if (error.response?.data) {
      return Promise.reject({
        ...error.response.data,
        statusCode: error.response.status,
      })
    }
    return Promise.reject(error)
  }
)
