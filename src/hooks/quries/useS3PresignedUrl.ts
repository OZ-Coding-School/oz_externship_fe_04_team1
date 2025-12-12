import { s3PresignedUrlApi } from '@/api/s3PresignedUrl'
import type { S3PresignedUrl } from '@/types/s3PresignedUrl'
import { useQuery } from '@tanstack/react-query'

const useS3PresignedUrl = (params?: S3PresignedUrl) => {
  return useQuery({
    queryKey: ['s3PresignedUrl', params],
    queryFn: () => s3PresignedUrlApi(params!),
    enabled: !!params,
  })
}
// 쿼리키는 상수로 추후에 처리 예정

export default useS3PresignedUrl
