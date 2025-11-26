import { API_PATHS } from '@/constant/api'
import { http, HttpResponse } from 'msw'
import { userInformation } from './mockData'

export const userInformationHandler = [
  http.get(API_PATHS.USER.GET, () => {
    return HttpResponse.json(userInformation)
  }),
]
