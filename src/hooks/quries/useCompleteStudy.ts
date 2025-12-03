import { getCompleteStudyApi } from '@/api/completeStudy'
import type { CompleteStudy } from '@/types/completeStudy'
import { useQuery } from '@tanstack/react-query'

const useCompleteStudyData = () => {
  return useQuery<CompleteStudy[]>({
    queryKey: ['completeStudyData'],
    queryFn: getCompleteStudyApi,
    initialData: [],
  })
}

export default useCompleteStudyData
