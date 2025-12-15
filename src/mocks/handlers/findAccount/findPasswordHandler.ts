import { API_PATHS } from '@/constant/api'
import type {
  ReqResetPassword,
  ReqVerifyEmailCode,
  ReqVerifyWithEmail,
} from '@/types/findAccount'
import { http, HttpResponse } from 'msw'
import { userInfo } from '../auth/mockData'

export const findPasswordHandlers = [
  // 이메일 전송
  http.post(
    API_PATHS.FIND_ACCOUNT.PASSWORD.SEND_EMAIL.POST,
    async ({ request }) => {
      const { email } = (await request.json()) as ReqVerifyWithEmail
      if (email !== userInfo.email) {
        return HttpResponse.json(
          {
            error_detail: {
              email: ['일치하는 사용자 정보가 없습니다.'],
            },
          },
          { status: 400 }
        )
      }
      return HttpResponse.json(
        {
          detail: '비밀번호 찾기를 위한 이메일 인증에 성공하였습니다.',
        },
        {
          status: 200,
        }
      )
    }
  ),

  // 인증 번호 검증
  http.post(
    API_PATHS.FIND_ACCOUNT.PASSWORD.VERIFY_CODE.POST,
    async ({ request }) => {
      const { code } = (await request.json()) as ReqVerifyEmailCode

      if (code !== '123456') {
        return HttpResponse.json(
          {
            error_detail: {
              code: ['유호하지 않은 인증코드입니다.'],
            },
          },
          {
            status: 400,
          }
        )
      }

      return HttpResponse.json(
        {
          detail: '비밀번호 찾기를 위한 이메일 인증에 성공하였습니다.',
        },
        {
          status: 200,
        }
      )
    }
  ),

  // 비밀번호 변경
  http.post(
    API_PATHS.FIND_ACCOUNT.PASSWORD.RESET_PASSWORD.POST,
    async ({ request }) => {
      const { email } = (await request.json()) as ReqResetPassword

      if (email !== userInfo.email) {
        return HttpResponse.json(
          {
            error_detail: {
              email: ['일치하는 사용자 정보가 없습니다.'],
            },
          },
          { status: 400 }
        )
      }

      return HttpResponse.json(
        {
          detail: '비밀번호 변경 성공',
        },
        { status: 200 }
      )
    }
  ),
]
