import { deleteBookmarkAnnouncementApi } from '@/api/deleteBookmarkAnnouncement'
import { showToast } from '@/components/common/toast/Toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useDeleteBookmarkAnnouncement = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteBookmarkAnnouncementApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookmarkAnnouncement'] })
      showToast.success('성공', '북마크가 제거되었습니다')
    },
  })
}
