import { API_PATHS } from '@/constant/api'
import type { BookMarkStudy } from '@/types/bookmarkStudy'
import { axiosInstance } from '@/api/axios'

export const getBookmarkStudyApi = async (
  cursor: string | null = null
): Promise<BookMarkStudy> => {
  const { data } = await axiosInstance.get(API_PATHS.BOOKMARK.STUDY.GET, {
    params: {
      cursor,
      page_size: 6,
    },
  })
  return data
}
