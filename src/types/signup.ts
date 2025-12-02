export type ReqInfo = Omit<SignupFormValues, 'password_confirm'>

export type ReqEmailOnly = Pick<SignupFormValues, 'email'>

export type ReqPhoneOnly = Pick<SignupFormValues, 'phone_number'>

export type ReqNicknameOnly = Pick<SignupFormValues, 'nickname'>

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
}
export interface SignupFormValuesWithValidation extends SignupFormValues {
  emailVerified: boolean
  smsVerified: boolean
  nicknameVerified: boolean
}
