import { http, HttpResponse } from 'msw'
import { bookmarkAnnouncement } from './mockData'

export const deleteBookMarkAnnouncementHandler = [
  http.delete('/api/v1/recruitment-bookmarks/:id', ({ params }) => {
    const id = Number(params.id)

    const index = bookmarkAnnouncement.results.findIndex(
      (bookmark) => bookmark.id === id
    )

    if (index !== -1) {
      bookmarkAnnouncement.results.splice(index, 1)
      return HttpResponse.json({ success: true })
    }

    return HttpResponse.json({ message: 'Bookmark not found' }, { status: 404 })
  }),
]
