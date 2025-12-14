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
