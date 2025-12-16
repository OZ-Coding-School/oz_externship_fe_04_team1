import { getBookmarkAnnouncementApi } from '@/api/bookmarkAnnouncement'
import type { BookmarkAnnouncement } from '@/types/bookmarkAnnouncement'
import { useInfiniteQuery } from '@tanstack/react-query'
const PAGE_SIZE = 6
const useBookmarkAnnouncement = () => {
  return useInfiniteQuery<BookmarkAnnouncement>({
    queryKey: ['bookmarkAnnouncement', PAGE_SIZE],
    initialPageParam: null,
    queryFn: ({ pageParam }) =>
      getBookmarkAnnouncementApi(pageParam as string | null, PAGE_SIZE),
    getNextPageParam: (lastPage) => {
      if (!lastPage.next) return undefined

      const url = new URL(lastPage.next)
      return url.searchParams.get('cursor')
    },
  })
}

// 쿼리키는 상수로 추후에 처리 예정

export default useBookmarkAnnouncement
