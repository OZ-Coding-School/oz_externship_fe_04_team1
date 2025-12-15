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

export type ReqVerifyWithEmail = {
  email: string
}

export interface PasswordAuthStepProps extends StepControlProps {
  onVerifyWithEmail: (data: ReqVerifyWithEmail) => void
}

export type ReqVerifyEmailCode = {
  email: string
  code: string
}

export interface PasswordVerifyStepProps extends StepControlProps {
  setCurrentStep: Dispatch<SetStateAction<StepIndicatorType>>
  onVerifyCode: (data: ReqVerifyEmailCode) => void
}

export type ReqResetPassword = {
  email: string
  new_password: string
}

export interface PasswordCompleteStepProps extends StepControlProps {
  onResetPassword: (data: ReqResetPassword) => void
}

// 이메일 찾기
export type FindEmailFormData = {
  name: string
  phone: string
  code: string
}

export type ReqVerifyPhoneCode = {
  phone_number: string
  code: string
}

export interface EmailVerifyStepProps {
  currentStep: StepIndicatorType
  setCurrentStep: Dispatch<SetStateAction<StepIndicatorType>>
  onVerifyCode: (data: ReqVerifyPhoneCode) => void
}

export type EmailCompleteStepProps = {
  currentStep: StepIndicatorType
  email: string
}

export type ReqVerifyUserIdentity = {
  name: string
  phone_number: string
}

export interface EmailAuthStepProps extends StepControlProps {
  onVerifyUserIdentity: (data: ReqVerifyUserIdentity) => void
}

// 응답 타입
export type ResFindAccount = {
  detail: string
}

export type ResFindEmail = {
  detail: string
  email: string
}

// 에러 메시지
export type findAccount400Error = {
  error_detail: {
    [key: string]: string[]
  }
}
