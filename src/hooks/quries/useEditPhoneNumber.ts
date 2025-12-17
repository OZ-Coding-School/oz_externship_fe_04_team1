import { certifyPhoneNumberApi } from '@/api/certifyPhoneNumber'
import { useMutation } from '@tanstack/react-query'

export const useEditPhoneNumber = () => {
  return useMutation({
    mutationFn: certifyPhoneNumberApi,
  })
}
