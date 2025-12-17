export type ReqInfo = Omit<SignupFormValues, 'password_confirm' | 'emailCode' | 'smsCode'>

export type ReqEmailOnly = Pick<SignupFormValues, 'email'>

export type ReqPhoneOnly = Pick<SignupFormValues, 'phone_number'>

export type ReqCodeWithEmail = {
  email: string
  code: string
}

export type ReqCodeWithPhone = {
  phone_number: string
  code: string
}

export type SignupFormValues = {
  name: string
  nickname: string
  birthday: string
  gender: 'M' | 'F' | ''
  email: string
  phone_number: string
  password: string
  password_confirm: string
  emailCode: string
  smsCode: string
}
export interface SignupFormValuesWithValidation extends SignupFormValues {
  emailVerified: boolean | null
  smsVerified: boolean | null
  nicknameVerified: boolean | null
}

// 닉네임 관련 타입들
export type ReqNicknameOnly = Pick<SignupFormValues, 'nickname'>

// 400 에러
export type ValidationError = {
  statusCode: 400
  error_detail: {
    [field_name: string]: string[]
  }
}

// 409에러
export type ConflictError = {
  statusCode: 409
  error_detail: string
}

export type ApiError = ValidationError | ConflictError

export type ResNickname = {
  detail: string
}
