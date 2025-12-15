import { useSearchParams } from 'react-router'
import type { BookmarkAnnouncement } from '@/types/bookmarkAnnouncement'
export const useAnnouncementSearchFilter = (
  data: BookmarkAnnouncement['results']
) => {
  const [searchParams] = useSearchParams()
  const filteredData = data.filter((value) => {
    return value.recruitment.some((v) => {
      return v.title.includes(searchParams.get('search') ?? '')
    })
  })
  return filteredData
}
