import { API_PATHS } from '@/constant/api'
import { http, HttpResponse } from 'msw'
import { bookmarkAnnouncement } from './mockData'

export const bookmarkAnnouncementHandler = [
  http.get(API_PATHS.BOOKMARK.ANNOUNCEMENT.GET, () => {
    return HttpResponse.json(bookmarkAnnouncement)
  }),
]
