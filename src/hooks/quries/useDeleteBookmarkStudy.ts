import { deleteBookmarkStudyApi } from '@/api/deleteBookMarkStudy'
import { showToast } from '@/components/common/toast/Toast'
import { useMutation } from '@tanstack/react-query'

export const useDeleteBookmarkStudy = () => {
  return useMutation({
    mutationFn: deleteBookmarkStudyApi,
    onSuccess: () => {
      showToast.success('성공', '북마크가 제거되었습니다')
    },
  })
}
