import { getBookmarkStudyApi } from '@/api/bookmarkStudy'
import type { BookMarkStudy } from '@/types/bookmarkStudy'
import { useQuery } from '@tanstack/react-query'

const useBookmarkStudy = () => {
  return useQuery<BookMarkStudy[]>({
    queryKey: ['bookmarkStudy'],
    queryFn: getBookmarkStudyApi,
    initialData: [],
  })
}
// 쿼리키는 상수로 추후에 처리 예정

export default useBookmarkStudy
