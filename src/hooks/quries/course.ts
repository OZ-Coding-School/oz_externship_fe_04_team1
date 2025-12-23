import { useQuery } from '@tanstack/react-query'
import { getCourseInformationApi } from '@/api/courseInformation'
import type { CourseSort } from '@/types/landingPage'

export const useGetCourses = (sort: CourseSort) => {
  return useQuery({
    queryKey: ['courses', sort],
    queryFn: () => getCourseInformationApi(sort),
    select: (data) => data.results,
  })
}
