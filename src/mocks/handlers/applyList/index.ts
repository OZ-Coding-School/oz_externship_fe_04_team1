import { API_PATHS } from '@/constant/api'
import { http, HttpResponse } from 'msw'
import { applyList } from './mockData'

export const applyListHandler = [
  http.get(API_PATHS.APPLY.LIST.GET, () => {
    return HttpResponse.json({
      results: applyList,
    })
  }),
]
