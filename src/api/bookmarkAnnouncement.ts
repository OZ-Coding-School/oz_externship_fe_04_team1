import { API_PATHS } from '@/constant/api'
import type { BookmarkAnnouncement } from '@/types/bookmarkAnnouncement'
import { axiosInstance } from '@/api/axios'

export const getBookmarkAnnouncementApi = async (
  cursor: string | null = null
): Promise<BookmarkAnnouncement> => {
  const { data } = await axiosInstance.get(
    API_PATHS.BOOKMARK.ANNOUNCEMENT.GET,
    {
      params: {
        cursor,
        page_size: 6,
      },
    }
  )
  return data
}
