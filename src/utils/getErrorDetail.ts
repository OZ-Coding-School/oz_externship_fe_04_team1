import type { findAccount400Error } from '@/types/findAccount'

export const getErrorDetail = (
  { error_detail }: findAccount400Error,
  custom_error_msg: string
) => {
  const errorMsg = Object.values(error_detail)?.[0]?.[0] || custom_error_msg
  return errorMsg
}
