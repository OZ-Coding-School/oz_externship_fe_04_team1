import { getApplyListApi } from '@/api/applyList'
import type { ApplyList } from '@/types/applyList'
import { useQuery } from '@tanstack/react-query'

const useApplyList = () => {
  return useQuery<ApplyList[]>({
    queryKey: ['applyList'],
    queryFn: getApplyListApi,
    initialData: [],
  })
}
// 쿼리키는 상수로 추후에 처리 예정

export default useApplyList
