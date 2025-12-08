import { API_BASE_URL } from '@/constant/api'
import AuthStateStore from '@/store/authStateStore'
import axios from 'axios'

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

// response.data에 statusCode를 추가해서 throw
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.data) {
      return Promise.reject({
        ...error.response.data,
        statusCode: error.response.status,
      })
    }
    return Promise.reject(error)
  }
)
