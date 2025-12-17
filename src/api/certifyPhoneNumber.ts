import { API_PATHS } from '@/constant/api'
import { axiosInstance } from '@/api/axios'
import type { CertifyNumber } from '@/types/certifyNumber'
export const certifyPhoneNumberApi = async (data: CertifyNumber) => {
  const res = await axiosInstance.patch(API_PATHS.USER.PATCH_PHONE_NUMBER, data)
  return res.data
}
