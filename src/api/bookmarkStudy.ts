import { API_PATHS } from '@/constant/api'
import type { BookMarkStudy } from '@/types/bookmarkStudy'
import { axiosInstance } from '@/api/axios'

export const getBookmarkStudyApi = async (): Promise<BookMarkStudy[]> => {
  const { data } = await axiosInstance.get(API_PATHS.BOOKMARK.STUDY.GET)
  return data.results ?? []
}
