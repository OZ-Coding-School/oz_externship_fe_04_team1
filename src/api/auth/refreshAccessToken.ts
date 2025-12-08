import { API_BASE_URL, API_PATHS } from '@/constant/api'
import axios from 'axios'

export const refreshAccessToken = async () => {
  return await axios.post(
    `${API_BASE_URL}${API_PATHS.REFRESH_TOKEN.POST}`,
    {},
    { withCredentials: true }
  )
}
