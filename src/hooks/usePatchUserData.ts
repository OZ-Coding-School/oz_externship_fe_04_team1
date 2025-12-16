import { patchUserInformationApi } from '@/api/userInformation'
import { useMutation, useQueryClient } from '@tanstack/react-query'
export const usePatchUserInformation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: patchUserInformationApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userData'] })
    },
  })
}
