import { API_PATHS } from '@/constant/api'
import { http, HttpResponse } from 'msw'
import { userInfo } from './mockData'
import type {
  ReqCodeWithEmail,
  ReqCodeWithPhone,
  ReqEmailOnly,
  ReqInfo,
} from '@/types/signup'

export const signupHandlers = [
  // 닉네임 중복
  http.get(API_PATHS.SIGNUP.NICKNAME_CHECK.GET, ({ request }) => {
    const url = new URL(request.url)
    const nickname = url.searchParams.get('nickname')

    // 닉네임이 없는 경우 (400 - ValidationError)
    if (!nickname) {
      return HttpResponse.json(
        {
          statusCode: 400,
          error_detail: {
            nickname: ['이 필드는 필수 항목입니다.'],
          },
        },
        { status: 400 }
      )
    }

    // 이미 사용 중인 닉네임 (409 - ConflictError)
    if (nickname === userInfo.nickname) {
      return HttpResponse.json(
        {
          statusCode: 409,
          error_detail: '중복된 닉네임이 존재합니다.',
        },
        { status: 409 }
      )
    }

    // 성공
    return HttpResponse.json(
      { detail: '사용 가능한 닉네임입니다.' },
      { status: 200 }
    )
  }),

  // 이메일 전송
  http.post(API_PATHS.SIGNUP.EMAIL_SEND.POST, async ({ request }) => {
    const { email } = (await request.json()) as ReqEmailOnly

    // 가입된 이메일인지 확인을 여기서? ( 그럼 회원가입 폼 제출 시 post 요청에서도 중복 확인하고 여기서도 확인?)
    // 근데 api 명세서에는 오류 코드에 400에러 밖에 없다..(필수 항목 체크..만)
    // 현재 api 명세서에는 오류 코드가 없음
    if (userInfo.email === email) {
      return HttpResponse.json(
        { error_detail: '이미 가입된 이메일입니다.' },
        { status: 409 }
      )
    }

    return HttpResponse.json(
      { detail: '회원가입을 위한 이메일 인증 코드가 전송되었습니다.' },
      { status: 200 }
    )
  }),

  // 이메일 인증 코드 전송
  http.post(API_PATHS.SIGNUP.EMAIL_VERIFY.POST, async ({ request }) => {
    const { code } = (await request.json()) as ReqCodeWithEmail

    const correctCode = '123456'

    // 인증번호가 틀린 경우
    // 현재 api 명세서에는 필수 항목 에러 코드만 명시되어있..음..
    if (correctCode !== code) {
      return HttpResponse.json(
        { error_detail: '인증번호가 일치하지 않습니다.' },
        { status: 400 }
      )
    }

    return HttpResponse.json(
      { detail: '회원가입을 위한 이메일 인증에 성공하였습니다.' },
      { status: 200 }
    )
  }),

  // SMS 전송
  http.post(API_PATHS.SIGNUP.SMS_SEND.POST, () => {
    // 전화번호는 중복 확인 불필요?

    return HttpResponse.json(
      { detail: '회원가입을 위한 휴대폰 인증 코드가 전송되었습니다.' },
      { status: 200 }
    )
  }),

  // SMS 인증 코드 전송
  http.post(API_PATHS.SIGNUP.SMS_VERIFY.POST, async ({ request }) => {
    const { code } = (await request.json()) as ReqCodeWithPhone

    const correctCode = '123456'

    // 인증번호가 틀린 경우
    // 이것도 현재 api 명세서에는 필수 항목 에러 코드만 명시되어있음
    if (correctCode !== code) {
      return HttpResponse.json(
        { error_detail: '인증번호가 일치하지 않습니다.' },
        { status: 400 }
      )
    }

    return HttpResponse.json(
      { detail: '회원가입을 위한 휴대폰 인증에 성공하였습니다.' },
      { status: 200 }
    )
  }),

  // 회원가입
  // 명세서에 409 에러는 이미 중복된 회원가입 내역이 있을 때 반환된다고 되어 있는데
  // 구체적으로 어떤 기준으로 기존 기록이 존재하는 경우 409를 반환하는지
  // -> 이메일 중복시 409에러가 뜬다.
  http.post(API_PATHS.SIGNUP.SUBMIT.POST, async ({ request }) => {
    const info = (await request.json()) as ReqInfo
    console.log('회원가입 시도: ', info)

    // 이메일 중복 체크
    if (userInfo.email === info.email) {
      return HttpResponse.json(
        { error_detail: '이미 중복된 회원가입 내역이 존재합니다.' },
        { status: 409 }
      )
    }

    return HttpResponse.json({ detail: '회원가입 완료' }, { status: 200 })
  }),
]
