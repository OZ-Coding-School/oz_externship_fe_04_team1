import { getApplyListDetailApi } from '@/api/applyListDetail'
import type { ApplyListDetail } from '@/types/applyListDetail'
import { useQuery } from '@tanstack/react-query'

const useApplyListDetail = (id?: number | null) => {
  return useQuery<ApplyListDetail>({
    queryKey: ['applyListDetail', id],
    queryFn: () => getApplyListDetailApi(id!),
    enabled: !!id,
    // id가 있을 때만 쿼리 실행
  })
}
// 쿼리키는 상수로 추후에 처리 예정

export default useApplyListDetail
