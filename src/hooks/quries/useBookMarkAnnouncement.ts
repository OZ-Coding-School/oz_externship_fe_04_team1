import { getBookmarkAnnouncementApi } from '@/api/bookmarkAnnouncement'
import type { BookmarkAnnouncement } from '@/types/bookmarkAnnouncement'
import { useQuery } from '@tanstack/react-query'

const useBookmarkAnnouncement = () => {
  return useQuery<BookmarkAnnouncement[]>({
    queryKey: ['bookmarkAnnouncement'],
    queryFn: getBookmarkAnnouncementApi,
    initialData: [],
  })
}
// 쿼리키는 상수로 추후에 처리 예정

export default useBookmarkAnnouncement
