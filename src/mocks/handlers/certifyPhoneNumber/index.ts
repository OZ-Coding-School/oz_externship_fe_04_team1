import { API_PATHS } from '@/constant/api'
import { http, HttpResponse } from 'msw'
import { certifyCodeNumber } from './mockData'
import type { CertifyNumber } from '@/types/certifyNumber'
export const certifyPhoneNumber = [
  http.patch(API_PATHS.USER.PATCH_PHONE_NUMBER, async ({ request }) => {
    const { phone_number, code } = (await request.json()) as CertifyNumber
    if (phone_number === certifyCodeNumber.phone_number) {
      return HttpResponse.json(
        {
          error_detail: '이미 등록된 휴대폰 번호입니다',
        },
        { status: 409 }
      )
    } else if (code !== certifyCodeNumber.code) {
      return HttpResponse.json(
        {
          error_detail: {
            code: ['휴대폰 인증 실패 - 인증코드가 유효하지 않습니다.'],
          },
        },
        { status: 400 }
      )
    }
    return HttpResponse.json(
      {
        message: '휴대폰 인증 성공',
        phone_number,
      },
      { status: 200 }
    )
  }),
]
