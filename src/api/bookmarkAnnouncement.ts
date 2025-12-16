import { API_PATHS } from '@/constant/api'
import type { BookmarkAnnouncement } from '@/types/bookmarkAnnouncement'
import { axiosInstance } from '@/api/axios'

export const getBookmarkAnnouncementApi = async (
  cursor: string | null = null,
  page_size: number
): Promise<BookmarkAnnouncement> => {
  const { data } = await axiosInstance.get(
    API_PATHS.BOOKMARK.ANNOUNCEMENT.GET,
    {
      params: {
        cursor,
        page_size,
      },
    }
  )
  return data
}
