import { API_PATHS } from '@/constant/api'
import type { ApplyList } from '@/types/applyList'
import { axiosInstance } from '@/api/axios'

export const getApplyListApi = async (
  cursor: string | null = null,
  page_size: number
): Promise<ApplyList> => {
  const { data } = await axiosInstance.get(API_PATHS.APPLY.LIST.GET, {
    params: {
      cursor,
      page_size,
    },
  })
  return data
}
