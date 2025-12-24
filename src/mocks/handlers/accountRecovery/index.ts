// import { http, HttpResponse } from 'msw'
// import { API_PATHS } from '@/constant/api'

// import type { SendEmailRequest, VerifyRequest } from '@/types/accountRecovery'

// export const accountRecoveryHandler = [
//   // 1. 이메일 전송
//   http.post(API_PATHS.ACCOUNT_RECOVERY.SEND_EMAIL.POST, async ({ request }) => {
//     // 로직
//     const body = (await request.json()) as SendEmailRequest

//     // 탈퇴한 계정이 아닐시
//     if (body.email !== 'leave@example.com') {
//       return HttpResponse.json(
//         { error_detail: '탈퇴한 계정이 아닙니다' },
//         { status: 400 }
//       )
//     }
//     return HttpResponse.json({
//       detail: '계정복구를 위한 이메일 인증 코드가 전송되었습니다',
//     })
//   }),

//   // 2. 인증 확인
//   http.post(API_PATHS.ACCOUNT_RECOVERY.VERIFY.POST, async ({ request }) => {
//     // 로직
//     const body = (await request.json()) as VerifyRequest

//     if (!body.email) {
//       return HttpResponse.json(
//         { error_detail: '이 필드는 필수 항목입니다' },
//         { status: 400 }
//       )
//     }
//     const VerifyCode = '123456'
//     if (VerifyCode !== body.code) {
//       return HttpResponse.json(
//         { error_detail: '인증번호가 일치하지 않습니다.' },
//         { status: 400 }
//       )
//     }
//     // 실패
//     return HttpResponse.json({ detail: '계정복구 완료' }, { status: 200 })
//   }),
// ]
