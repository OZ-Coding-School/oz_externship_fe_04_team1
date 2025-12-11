import { API_PATHS } from '@/constant/api'
import type { ApplyListDetail } from '@/types/applyListDetail'
import { axiosInstance } from '@/api/axios'

export const getApplyListDetailApi = async (
  id: number
): Promise<ApplyListDetail> => {
  const { data } = await axiosInstance.get(API_PATHS.APPLY.DETAIL.BASE(id))
  return data
}
export const deleteApplyListApi = async (id: number) => {
  const { data } = await axiosInstance.delete(API_PATHS.APPLY.DETAIL.BASE(id))
  return data
}
