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
    return HttpResponse.json(
      { access_token: 'abc' },
      {
        headers: {
          'Set-Cookie': 'refresh_token=fake_refresh_token',
        },
      }
    )
  }),

  // 토큰 갱신
  http.post(API_PATHS.REFRESH_TOKEN.POST, () => {
    // refresh token이 유효하다고 가정
    return HttpResponse.json({ access_token: 'new_token' }, { status: 200 })
  }),

  // 로그아웃
  http.post(API_PATHS.LOGOUT.POST, () => {
    return HttpResponse.json(
      { detail: '로그아웃 성공' },
      {
        status: 200,
        headers: {
          'Set-Cookie': 'refresh_token=',
        },
      }
    )
  }),
]
