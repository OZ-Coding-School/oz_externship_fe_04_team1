export type ReqLoginFormData = {
  email: string
  password: string
}

export type ResLoginData = {
  access_token: string
}

export type LoginError = {
  error_detail: string
}
