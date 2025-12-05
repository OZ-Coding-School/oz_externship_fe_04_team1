import { API_BASE_URL } from '@/constant/api'
import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
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
