import { useSearchParams } from 'react-router'
import type { BookMarkStudy } from '@/types/bookmarkStudy'
export const useStudySearchFilter = (data: BookMarkStudy['results']) => {
  const [searchParams] = useSearchParams()
  const filteredData = data.filter((val) => {
    return val.title.includes(searchParams.get('search') ?? '')
  })
  return filteredData
}
