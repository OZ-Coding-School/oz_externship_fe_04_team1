import { API_PATHS } from '@/constant/api'
import { http, HttpResponse } from 'msw'
import { completeStudy } from './mockData'

export const completeStudyHandler = [
  http.get(API_PATHS.COMPLETE.STUDY.GET, () => {
    return HttpResponse.json(completeStudy)
  }),
]
