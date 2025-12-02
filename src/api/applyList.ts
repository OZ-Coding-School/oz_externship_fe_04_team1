import { API_PATHS } from '@/constant/api'
import type { ApplyList } from '@/types/applyList'
import { axiosInstance } from '@/api/axios'

export const getApplyListApi = async (): Promise<ApplyList[]> => {
  const { data } = await axiosInstance.get(API_PATHS.APPLY.LIST.GET)
  return data.results
}
