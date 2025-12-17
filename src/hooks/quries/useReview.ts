import { postReviewApi, patchReviewApi } from '@/api/completeStudy'
import { showToast } from '@/components/common/toast/Toast'
import { useMutation } from '@tanstack/react-query'

export const usePostReview = () => {
  return useMutation({
    mutationFn: postReviewApi,
    onSuccess: () => {
      showToast.success('성공', '리뷰가 작성되었습니다')
    },
  })
}

export const usePatchReview = () => {
  return useMutation({
    mutationFn: patchReviewApi,
    onSuccess: () => {
      showToast.success('성공', '리뷰가 수정되었습니다')
    },
  })
}
