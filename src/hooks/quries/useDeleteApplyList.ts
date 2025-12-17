import { deleteApplyListApi } from '@/api/applyListDetail'
import { showToast } from '@/components/common/toast/Toast'
import { useMutation } from '@tanstack/react-query'

export const useDeleteApplyList = () => {
  return useMutation({
    mutationFn: deleteApplyListApi,
    onSuccess: () => {
      showToast.success('성공', '지원 내역이 취소 되었습니다')
    },
  })
}
