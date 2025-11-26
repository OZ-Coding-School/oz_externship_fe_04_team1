import { API_PATHS } from '@/constant/api'
import type { UserInformation } from '@/types/userInformation'
import { axiosInstance } from '@/api/axios'

export const getUserInformationApi = async (): Promise<UserInformation[]> => {
  const { data } = await axiosInstance.get(API_PATHS.USER.GET)
  return data
}
