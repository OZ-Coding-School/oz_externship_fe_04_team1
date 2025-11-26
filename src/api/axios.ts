import { API_BASE_URL } from '@/constant/api'
import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})
