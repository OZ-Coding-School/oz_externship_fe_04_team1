import { patchUserInformationApi } from '@/api/userInformation'
import { useMutation } from '@tanstack/react-query'

export const usePatchUserInformation = () => {
  return useMutation({
    mutationFn: patchUserInformationApi,
  })
}
