import { API_PATHS } from '@/constant/api'
import type { WithDraw } from '@/types/withDraw'
import { axiosInstance } from '@/api/axios'

export const deleteUserApi = async (data: WithDraw) => {
  const res = await axiosInstance.delete(API_PATHS.USER.GET, { params: data })
  return res.data
}
