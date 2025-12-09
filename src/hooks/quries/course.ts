import { useQuery } from '@tanstack/react-query'
import { getCourseInformationApi } from '@/api/courseInformation'

export const useGetCourses = () => {
  return useQuery({
    queryKey: ['courses'],
    queryFn: getCourseInformationApi,
  })
}
