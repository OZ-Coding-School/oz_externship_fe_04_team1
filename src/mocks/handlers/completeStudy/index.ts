import { API_PATHS } from '@/constant/api'
import { http, HttpResponse } from 'msw'
import { completeStudy } from './mockData'

export const completeStudyHandler = [
  http.get(API_PATHS.COMPLETE.STUDY.GET, () => {
    return HttpResponse.json(completeStudy)
  }),
]

export const postReviewHandler = [
  http.post('/api/v1/study-groups/:group_id/reviews', ({ params }) => {
    const { group_id } = params
    const data = completeStudy.find((item) => item.id === Number(group_id))
    return HttpResponse.json(data)
  }),
]
export const patchReviewHandler = [
  http.patch(
    '/api/v1/study-groups/:group_id/reviews/:review_id',
    ({ params }) => {
      const { group_id, review_id } = params
      const data = completeStudy.find(
        (item) =>
          item.id === Number(group_id) &&
          item.reviews.find((el) => el.id === Number(review_id))
      )
      return HttpResponse.json(data)
    }
  ),
]
