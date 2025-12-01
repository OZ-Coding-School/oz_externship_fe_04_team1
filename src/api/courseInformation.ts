import { API_PATHS } from '@/constant/api'
import { axiosInstance } from '@/api/axios'
import type { CourseCardProps } from '@/types/mypage'

export const getCourseInformationApi = async (): Promise<CourseCardProps[]> => {
  const { data } = await axiosInstance.get(API_PATHS.COURSE.GET)
  return data
}
