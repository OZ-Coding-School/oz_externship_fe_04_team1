import { API_PATHS } from '@/constant/api'
import type { CompleteStudy } from '@/types/completeStudy'
import { axiosInstance } from '@/api/axios'
import type { EditReview } from '@/types/review'
export const getCompleteStudyApi = async (): Promise<CompleteStudy[]> => {
  const { data } = await axiosInstance.get(API_PATHS.COMPLETE.STUDY.GET)
  return data
}

export const postReviewApi = async ({
  group_id,
  data,
}: {
  group_id: number
  data: EditReview
}) => {
  const res = await axiosInstance.post(
    API_PATHS.COMPLETE.REVIEW.POST(group_id),
    data
  )
  return res.data
}

export const patchReviewApi = async ({
  group_id,
  review_id,
  data,
}: {
  group_id: number
  review_id: number
  data: EditReview
}) => {
  const res = await axiosInstance.patch(
    API_PATHS.COMPLETE.REVIEW.PATCH(group_id, review_id),
    data
  )
  return res.data
}
