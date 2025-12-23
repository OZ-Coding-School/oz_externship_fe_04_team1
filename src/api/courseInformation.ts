import { API_PATHS } from '@/constant/api'
import { axiosInstance } from '@/api/axios'
import type { CourseListResponse, CourseSort } from '@/types/landingPage'

export const getCourseInformationApi = async (
  sort: CourseSort
): Promise<CourseListResponse> => {
  const res = await axiosInstance.get<CourseListResponse>(
    API_PATHS.COURSE.GET,
    {
      params: { sort },
    }
  )
  return res.data
}
