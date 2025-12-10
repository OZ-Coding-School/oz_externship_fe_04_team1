import { API_PATHS } from '@/constant/api'
import { http, HttpResponse } from 'msw'

export const deleteUserHandler = [
  http.delete(API_PATHS.USER.GET, () => {
    return HttpResponse.json()
  }),
]
