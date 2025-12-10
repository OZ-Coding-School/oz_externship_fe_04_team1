import { deleteUserApi } from '@/api/deleteUser'
import { useMutation } from '@tanstack/react-query'

export const useDeleteUser = () => {
  return useMutation({
    mutationFn: deleteUserApi,
  })
}
