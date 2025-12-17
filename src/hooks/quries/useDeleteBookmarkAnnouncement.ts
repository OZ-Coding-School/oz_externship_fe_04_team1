import { deleteBookmarkAnnouncementApi } from '@/api/deleteBookmarkAnnouncement'
import { showToast } from '@/components/common/toast/Toast'
import { useMutation } from '@tanstack/react-query'

export const useDeleteBookmarkAnnouncement = () => {
  return useMutation({
    mutationFn: deleteBookmarkAnnouncementApi,
    onSuccess: () => {
      showToast.success('성공', '북마크가 제거되었습니다')
    },
  })
}
