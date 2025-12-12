import { API_PATHS } from '@/constant/api'
import { http, HttpResponse } from 'msw'

export const s3PresignedHandler = [
  http.get(API_PATHS.S3.GET, () => {
    return HttpResponse.json({
      upload_url: 'https://pbs.twimg.com/media/GPju6_VbcAEoF56.jpg',
      file_url: 'https://pbs.twimg.com/media/GPju6_VbcAEoF56.jpg',
    })
  }),
]
