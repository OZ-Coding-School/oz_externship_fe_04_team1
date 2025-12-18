import { API_PATHS } from '@/constant/api'
import { axiosInstance } from '@/api/axios'

export const deleteBookmarkAnnouncementApi = async (id: number) => {
  const data = await axiosInstance.delete(
    API_PATHS.BOOKMARK.ANNOUNCEMENT.DELETE(id)
  )
  return data
}
