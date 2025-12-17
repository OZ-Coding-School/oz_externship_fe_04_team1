import { API_PATHS } from '@/constant/api'
import { axiosInstance } from '@/api/axios'

export const deleteBookmarkStudyApi = async (id: number) => {
  const data = await axiosInstance.delete(API_PATHS.BOOKMARK.STUDY.DELETE(id))
  return data
}
