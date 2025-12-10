import { API_PATHS } from '@/constant/api'
import type { EditPassword } from '@/types/editPassword'
import { axiosInstance } from '@/api/axios'

export const patchUserPasswordApi = async (data: EditPassword) => {
  const res = await axiosInstance.patch(API_PATHS.USER.PATCH_PASSWORD, data)
  return res.data
}
