import { API_PATHS } from '@/constant/api'
import type { BookmarkAnnouncement } from '@/types/bookmarkAnnouncement'
import { axiosInstance } from '@/api/axios'

export const getBookmarkAnnouncementApi = async (): Promise<
  BookmarkAnnouncement[]
> => {
  const { data } = await axiosInstance.get(API_PATHS.BOOKMARK.ANNOUNCEMENT.GET)
  return data.results
}
