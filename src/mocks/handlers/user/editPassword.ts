import { API_PATHS } from '@/constant/api'
import { http, HttpResponse } from 'msw'

import { userInformation } from './mockData'

export const editPassWordHandler = [
  http.patch(API_PATHS.USER.PATCH_PASSWORD, () => {
    return HttpResponse.json(userInformation)
  }),
]
