import { deleteBookmarkStudyApi } from '@/api/deleteBookMarkStudy'
import { showToast } from '@/components/common/toast/Toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useDeleteBookmarkStudy = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteBookmarkStudyApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookmarkStudy'] })
      showToast.success('성공', '북마크가 제거되었습니다')
    },
  })
}
