import { http, HttpResponse } from 'msw'
import { applyListDetail } from './mockData'

export const applyListDetailHandler = [
  http.get('/api/v1/applications/:id', ({ params }) => {
    const { id } = params
    const data = applyListDetail.find((item) => item.id === Number(id))
    return HttpResponse.json(data)
  }),
]

export const deleteApplyListHandler = [
  http.delete('/api/v1/applications/:id', ({ params }) => {
    const { id } = params
    const data = applyListDetail.find((item) => item.id === Number(id))
    return HttpResponse.json(data)
  }),
]
