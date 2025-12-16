import { getUserInformationApi } from '@/api/userInformation'
import type { UserInformation } from '@/types/userInformation'
import { useQuery } from '@tanstack/react-query'

const useUserData = () => {
  return useQuery<UserInformation>({
    queryKey: ['userData'],
    queryFn: getUserInformationApi,
  })
}

export default useUserData
