import { http, HttpResponse } from 'msw'
import { bookmarkAnnouncement } from './mockData'

export const deleteBookMarkAnnouncementHandler = [
  http.delete('/api/v1/recruitment-bookmarks/:uuid', ({ params }) => {
    const { uuid } = params

    const index = bookmarkAnnouncement.results.findIndex(
      (bookmark) => bookmark.recruitment.uuid === uuid
    )

    if (index !== -1) {
      bookmarkAnnouncement.results.splice(index, 1)
      return HttpResponse.json({ success: true })
    }

    return HttpResponse.json({ message: 'Bookmark not found' }, { status: 404 })
  }),
]
