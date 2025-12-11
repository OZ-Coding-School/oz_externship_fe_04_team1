import { http, HttpResponse } from 'msw'
import { bookmarkAnnouncement } from './mockData'

export const deleteBookMarkAnnouncementHandler = [
  http.delete('/api/v1/recruitment-bookmarks/:uuid', ({ params }) => {
    const { uuid } = params
    // recruitment 배열 안에서 uuid 찾기
    let found = false
    for (const bookmark of bookmarkAnnouncement) {
      const index = bookmark.recruitment.findIndex((r) => r.uuid === uuid)
      if (index !== -1) {
        bookmark.recruitment.splice(index, 1) // 삭제
        found = true
        break
      }
    }

    if (found) {
      return HttpResponse.json({ success: true })
    }
  }),
]
