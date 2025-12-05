import { API_PATHS } from '@/constant/api'
import type { ReqEmailOnly } from '@/types/signup'
import { http, HttpResponse } from 'msw'
import { userInfo } from './mockData'

export const loginHandlers = [
  //이메일 로그인
  http.post(API_PATHS.LOGIN.EMAIL.POST, async ({ request }) => {
    const { email } = (await request.json()) as ReqEmailOnly

    if (email !== userInfo.email) {
      return HttpResponse.json(
        {
          error_detail: '이메일 또는 비밀번호가 일치하지 않습니다.',
        },
        { status: 400 }
      )
    }
    return HttpResponse.json({ access_token: 'abc' }, { status: 200 })
  }),
]
