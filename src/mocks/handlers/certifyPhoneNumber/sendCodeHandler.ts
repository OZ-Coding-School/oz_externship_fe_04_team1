import { API_PATHS } from '@/constant/api'
import { http, HttpResponse } from 'msw'

export const sendCodeHandler = [
  http.post(API_PATHS.USER.SEND_CODE, () => {
    return HttpResponse.json({})
  }),
]
