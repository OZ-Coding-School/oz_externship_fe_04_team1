export interface SendEmailRequest {
  email: string
}

export interface VerifyRequest {
  email: string
  code: string
}
