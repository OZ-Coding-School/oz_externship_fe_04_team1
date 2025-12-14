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

export type FindEmailFormData = {
  name: string
  phone: string
}

export type FindPasswordFormData = {
  email: string
  password: string
  password_confirm: string
}

export type ReqResetPassword = {
  password: string
}

export type StepControlProps = {
  currentStep: StepIndicatorType
  setCurrentStep: Dispatch<SetStateAction<StepIndicatorType>>
}

export type CompleteStepProps = {
  currentStep: StepIndicatorType
}
