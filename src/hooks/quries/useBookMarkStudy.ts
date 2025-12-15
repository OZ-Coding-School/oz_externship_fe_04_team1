import { getBookmarkStudyApi } from '@/api/bookmarkStudy'
import type { BookMarkStudy } from '@/types/bookmarkStudy'
import { useInfiniteQuery } from '@tanstack/react-query'

const useBookmarkStudy = () => {
  return useInfiniteQuery<BookMarkStudy>({
    queryKey: ['bookmarkStudy'],
    initialPageParam: null,
    queryFn: ({ pageParam }) => getBookmarkStudyApi(pageParam as string | null),
    getNextPageParam: (lastPage) => {
      return lastPage.next ?? undefined
    },
  })
}
// 쿼리키는 상수로 추후에 처리 예정

export default useBookmarkStudy
