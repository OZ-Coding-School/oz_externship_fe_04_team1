import { API_PATHS } from '@/constant/api'
import { http, HttpResponse } from 'msw'
import { bookmarkAnnouncement } from './mockData'

export const bookmarkAonnouncementHandler = [
  http.get(API_PATHS.BOOKMARK.ANNOUNCEMENT.GET, () => {
    return HttpResponse.json({
      results: bookmarkAnnouncement,
    })
  }),
]
