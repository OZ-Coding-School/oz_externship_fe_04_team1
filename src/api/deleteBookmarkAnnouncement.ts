import { API_PATHS } from '@/constant/api'
import { axiosInstance } from '@/api/axios'

export const deleteBookmarkAnnouncementApi = async (uuid: string) => {
  const data = await axiosInstance.delete(
    API_PATHS.BOOKMARK.ANNOUNCEMENT.DELETE(uuid)
  )
  return data
}
