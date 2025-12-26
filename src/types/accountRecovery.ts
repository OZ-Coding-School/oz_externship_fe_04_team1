import type { AxiosError } from 'axios'

export interface SendEmailRequest {
  email: string
}

export interface VerifyRequest {
  email: string
  code: string
}
export type ApiErrorBody = {
  error_detail?: Record<string, { error_detail: string[] }>
}

export type ApiError = AxiosError<ApiErrorBody>
