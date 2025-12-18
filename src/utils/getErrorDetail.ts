import type { findAccount400Error } from '@/types/findAccount'

export const getErrorDetail = (
  error: findAccount400Error,
  custom_error_msg: string
): string => {
  // 400 에러
  if (error?.error_detail && typeof error.error_detail === 'object') {
    const errorMsg = Object.values(error.error_detail)?.[0]?.[0]
    return errorMsg
  }

  // 기본 에러 메시지
  return custom_error_msg
}
