import { http, HttpResponse } from 'msw'
import { bookMarkStudy } from './mockData'

export const deleteBookMarkStudytHandler = [
  http.delete('/api/v1/lecture-bookmarks/:id', ({ params }) => {
    const { id } = params
    const data = bookMarkStudy.find((item) => item.id === Number(id))
    return HttpResponse.json(data)
  }),
]
