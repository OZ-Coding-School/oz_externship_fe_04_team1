import { API_PATHS } from '@/constant/api'
import type {
  ReqVerifyPhoneCode,
  ReqVerifyUserIdentity,
} from '@/types/findAccount'
import { http, HttpResponse } from 'msw'
import { userInfo } from '../auth/mockData'

// 전화번호 포맷 변환: 01012345678 -> 010-1234-5678
const formatPhoneNumber = (phone: string): string => {
  if (phone.length === 11) {
    return `${phone.slice(0, 3)}-${phone.slice(3, 7)}-${phone.slice(7, 11)}`
  }

  return phone
}

export const findEmailHandlers = [
  // 이름, 전화번호 보내기 ( 1단계 )
  http.post(API_PATHS.FIND_ACCOUNT.EMAIL.IDENTITY.POST, async ({ request }) => {
    const { name, phone_number } =
      (await request.json()) as ReqVerifyUserIdentity

    // 전화번호 포맷 변환
    const formattedPhone = formatPhoneNumber(phone_number)

    if (name !== userInfo.name) {
      // 400에러밖에 없음.. 일단 임시로 만듦
      return HttpResponse.json(
        {
          error_detail: {
            name: ['일치하는 사용자 정보가 없습니다.'],
          },
        },
        { status: 400 }
      )
    }
    if (formattedPhone !== userInfo.phone_number) {
      // 400에러밖에 없음.. 일단 임시로 만듦
      return HttpResponse.json(
        {
          error_detail: {
            phone_number: ['일치하는 사용자 정보가 없습니다.'],
          },
        },
        { status: 400 }
      )
    }

    return HttpResponse.json(
      {
        detail: '계정찾기를 위한 휴대폰 인증 코드가 전송되었습니다.',
      },
      {
        status: 200,
      }
    )
  }),

  // 이메일 찾기
  http.post(
    API_PATHS.FIND_ACCOUNT.EMAIL.VERIFY_CODE.POST,
    async ({ request }) => {
      const { phone_number, code } =
        (await request.json()) as ReqVerifyPhoneCode

      // 전화번호 포맷 변환
      const formattedPhone = formatPhoneNumber(phone_number)

      if (formattedPhone !== userInfo.phone_number || code !== '123456') {
        return HttpResponse.json({
          error_detail: {
            code: ['이메일 인증 실패 - 이메일 인증코드가 유효하지 않습니다.'],
          },
        })
      }

      return HttpResponse.json(
        {
          detail: '계정찾기 성공',
          email: 'hong@example.com',
        },
        { status: 200 }
      )
    }
  ),
]
