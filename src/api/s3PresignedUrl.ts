import { API_PATHS } from '@/constant/api'
import type { S3PresignedUrl } from '@/types/s3PresignedUrl'
import { axiosInstance } from '@/api/axios'

export const s3PresignedUrlApi = async (params: S3PresignedUrl) => {
  const res = await axiosInstance.get(API_PATHS.S3.GET, { params })
  return res.data
}
