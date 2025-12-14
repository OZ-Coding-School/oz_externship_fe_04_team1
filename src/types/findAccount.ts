import type { Dispatch, SetStateAction } from 'react'

export enum FINDTYPE {
  FIND_EMAIL = 1,
  FIND_PASSWORD = 2,
}

export type StepIndicatorProps = {
  title: string
  subTitle: string
  type: FINDTYPE
}

export enum StepIndicatorType {
  AUTH = 1,
  VERIFY = 2,
  COMPLETE = 3,
}

export type StepControlProps = {
  currentStep: StepIndicatorType
  setCurrentStep: Dispatch<SetStateAction<StepIndicatorType>>
}

export type CompleteStepProps = {
  currentStep: StepIndicatorType
}

// 비밀번호 찾기
export type FindPasswordFormData = {
  email: string
  code: string
  password: string
  password_confirm: string
}

export type ReqVerifyEmailCode = {
  email: string
  code: string
}

export interface PasswordVerifyStepProps extends StepControlProps {
  onVerifyCode: (data: ReqVerifyEmailCode) => void
}

export type ReqResetPassword = {
  email: string
  new_password: string
}

export interface PasswordCompleteStepProps extends CompleteStepProps {
  onResetPassword: (data: ReqResetPassword) => void
}

// 이메일 찾기
export type FindEmailFormData = {
  name: string
  phone: string
  code: string
}

export type ReqVerifyPhoneCode = {
  phone: string
  code: string
}

export interface EmailVerifyStepProps extends StepControlProps {
  onVerifyCode: (data: ReqVerifyPhoneCode) => void
}
