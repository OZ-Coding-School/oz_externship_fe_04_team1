import type {
  ResDetail,
  ReqCodeWithEmail,
  ReqCodeWithPhone,
  ReqEmailOnly,
  ReqInfo,
  ReqNicknameOnly,
  ReqPhoneOnly,
} from '@/types/signup'
import { axiosInstance } from '../axios'
import { API_PATHS } from '@/constant/api'

// 닉네임 중복 확인
export const checkNickname = async (
  data: ReqNicknameOnly
): Promise<ResDetail> => {
  const res = await axiosInstance.get(API_PATHS.SIGNUP.NICKNAME_CHECK.GET, {
    params: data,
  })
  return res.data
}

// 이메일 전송
export const sendEmail = async (data: ReqEmailOnly): Promise<ResDetail> => {
  const res = await axiosInstance.post(API_PATHS.SIGNUP.EMAIL_SEND.POST, data)

  return res.data
}

// 이메일 인증번호 확인
export const verifyEmailCode = async (data: ReqCodeWithEmail) => {
  const res = await axiosInstance.post(API_PATHS.SIGNUP.EMAIL_VERIFY.POST, data)

  return res.data
}

// SMS 전송
export const sendSms = async (data: ReqPhoneOnly): Promise<ResDetail> => {
  const res = await axiosInstance.post(API_PATHS.SIGNUP.SMS_SEND.POST, data)

  return res.data
}

// SMS 인증번호 확인
export const verifySmsCode = async (data: ReqCodeWithPhone) => {
  const res = await axiosInstance.post(API_PATHS.SIGNUP.SMS_VERIFY.POST, data)

  return res.data
}

// 회원가입 ( 날짜 형식 변경 - 컴포넌트에서 구현)
export const submitSignup = async (data: ReqInfo) => {
  const res = await axiosInstance.post(API_PATHS.SIGNUP.SUBMIT.POST, data)

  return res.data
}
