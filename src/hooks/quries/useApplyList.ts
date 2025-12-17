import { getApplyListApi } from '@/api/applyList'
import type { ApplyList } from '@/types/applyList'
import { useInfiniteQuery } from '@tanstack/react-query'
const PAGE_SIZE = 6
const useApplyList = () => {
  return useInfiniteQuery<ApplyList>({
    queryKey: ['applyList', PAGE_SIZE],
    initialPageParam: null,
    queryFn: ({ pageParam }) =>
      getApplyListApi(pageParam as string | null, PAGE_SIZE),
    getNextPageParam: (lastPage) => {
      if (!lastPage.next) return undefined

      const url = new URL(lastPage.next, window.location.origin)
      // 실 api 연결시 window.location.origin 이거 제거
      return url.searchParams.get('cursor')
    },
  })
}
// 쿼리키는 상수로 추후에 처리 예정

export default useApplyList
