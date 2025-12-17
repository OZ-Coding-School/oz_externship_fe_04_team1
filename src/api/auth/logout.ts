import { API_PATHS } from '@/constant/api'
import { axiosInstance } from '../axios'

export const logout = async () => {
  await axiosInstance.post(API_PATHS.LOGOUT.POST)
}
