import { http, HttpResponse } from 'msw'
import { bookMarkStudy } from './mockData'

export const deleteBookMarkStudytHandler = [
  http.delete('/api/v1/lecture-bookmarks/:id', ({ params }) => {
    const { id } = params
    let found = false
    const index = bookMarkStudy.results.findIndex((r) => r.id === Number(id))
    if (index !== -1) {
      bookMarkStudy.results.splice(index, 1)
      found = true
    }
    if (found) {
      return HttpResponse.json({ success: true })
    }
  }),
]
