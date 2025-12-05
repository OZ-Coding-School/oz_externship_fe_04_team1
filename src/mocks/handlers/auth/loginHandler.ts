import { API_PATHS } from '@/constant/api'
import type { ReqLoginFormData } from '@/types/login'
import { http, HttpResponse } from 'msw'
import { userInfo } from './mockData'

export const loginHandlers = [
  //이메일 로그인
  http.post(API_PATHS.LOGIN.EMAIL.POST, async ({ request }) => {
    const { email, password } = (await request.json()) as ReqLoginFormData

    if (email !== userInfo.email || password !== userInfo.password) {
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
