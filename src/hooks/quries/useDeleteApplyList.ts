import { deleteApplyListApi } from '@/api/applyListDetail'
import { showToast } from '@/components/common/toast/Toast'
import { useQueryClient, useMutation } from '@tanstack/react-query'

export const useDeleteApplyList = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteApplyListApi,
    onSuccess: () => {
      showToast.success('성공', '지원 내역이 취소 되었습니다')
      queryClient.invalidateQueries({ queryKey: ['applyList'] })
    },
  })
}
