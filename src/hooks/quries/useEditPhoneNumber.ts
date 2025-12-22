import { certifyPhoneNumberApi } from '@/api/certifyPhoneNumber'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useEditPhoneNumber = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: certifyPhoneNumberApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userData'] })
    },
  })
}
