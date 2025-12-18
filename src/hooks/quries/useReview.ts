import { postReviewApi, patchReviewApi } from '@/api/completeStudy'
import { showToast } from '@/components/common/toast/Toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const usePostReview = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: postReviewApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['completeStudyData'] })
      showToast.success('성공', '리뷰가 작성되었습니다')
    },
  })
}

export const usePatchReview = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: patchReviewApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['completeStudyData'] })
      showToast.success('성공', '리뷰가 수정되었습니다')
    },
  })
}
