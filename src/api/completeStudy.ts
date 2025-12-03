import { API_PATHS } from '@/constant/api'
import type { CompleteStudy } from '@/types/completeStudy'
import { axiosInstance } from '@/api/axios'

export const getCompleteStudyApi = async (): Promise<CompleteStudy[]> => {
  const { data } = await axiosInstance.get(API_PATHS.COMPLETE.STUDY.GET)
  return data
}
