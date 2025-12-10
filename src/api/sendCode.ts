import { API_PATHS } from '@/constant/api'
import { axiosInstance } from '@/api/axios'
import type { PhoneNumber } from '@/types/certifyNumber'
export const sendCodeApi = async (data: PhoneNumber) => {
  const res = await axiosInstance.post(API_PATHS.USER.SEND_CODE, data)
  return res.data
}
