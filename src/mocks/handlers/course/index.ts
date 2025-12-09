import { API_PATHS } from '@/constant/api'
import { http, HttpResponse } from 'msw'

import { courseInformation } from './mockData'

export const courseInformationHandler = [
  http.get(API_PATHS.COURSE.GET, () => {
    return HttpResponse.json(courseInformation)
  }),
]
