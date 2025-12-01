import { API_PATHS } from '@/constant/api'
import { http, HttpResponse } from 'msw'
import { bookMarkStudy } from './mockData'

export const bookmarkStudyHandler = [
  http.get(API_PATHS.BOOKMARK.STUDY.GET, () => {
    return HttpResponse.json({
      results: bookMarkStudy,
    })
  }),
]
