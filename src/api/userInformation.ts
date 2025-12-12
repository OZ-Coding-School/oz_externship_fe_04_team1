import { API_PATHS } from '@/constant/api'
import type { UserInformation } from '@/types/userInformation'
import { axiosInstance } from '@/api/axios'
import type { EditUserInformation } from '@/types/editUserInformation'

export const getUserInformationApi = async (): Promise<UserInformation[]> => {
  const { data } = await axiosInstance.get(API_PATHS.USER.GET)
  return data
}

export const patchUserInformationApi = async (data: EditUserInformation) => {
  const res = await axiosInstance.patch(API_PATHS.USER.GET, data)
  return res.data
}
