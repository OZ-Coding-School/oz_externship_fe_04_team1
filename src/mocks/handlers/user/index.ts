import { API_PATHS } from '@/constant/api'
import { http, HttpResponse } from 'msw'
import { userInformation } from './mockData'
import { editUserInformation } from './mockData'
import type { EditUserInformation } from '@/types/editUserInformation'
export const userInformationHandler = [
  http.get(API_PATHS.USER.GET, ({ request }) => {
    const authToken = request.headers.get('Authorization')

    // 로그인 직후 받은 엑세스 토큰이면 401 반환 (만료된 것 처럼)
    if (authToken === 'Bearer abc') {
      return HttpResponse.json(
        { error_detail: 'Token expired' },
        { status: 401 }
      )
    }

    // 갱신된 new_token이면 정상 응답
    if (authToken === 'Bearer new_token') {
      return HttpResponse.json(userInformation, { status: 200 })
    }

    // 토큰이 없으면 401
    return HttpResponse.json({ error_detail: 'unauthorized' }, { status: 401 })
  }),
]

export const patchUserInformationHandler = [
  http.patch(API_PATHS.USER.GET, async ({ request }) => {
    const { nickname } = (await request.json()) as EditUserInformation
    if (nickname === editUserInformation.nickname) {
      return HttpResponse.json(
        {
          error_detail: {
            nickname: ['중복된 닉네임이 존재합니다'],
          },
        },
        { status: 409 }
      )
    }
    return HttpResponse.json({}, { status: 200 })
  }),
]
