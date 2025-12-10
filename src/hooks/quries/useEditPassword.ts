import { patchUserPasswordApi } from '@/api/editPassword'
import { useMutation } from '@tanstack/react-query'

export const useEditPassword = () => {
  return useMutation({
    mutationFn: patchUserPasswordApi,
  })
}
